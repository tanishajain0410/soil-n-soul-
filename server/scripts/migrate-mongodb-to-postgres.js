import 'dotenv/config';
import mongoose from 'mongoose';
import { closeDB, connectDB, getClient } from '../src/config/db.js';

const sourceUri = process.env.MONGODB_MIGRATION_URI || process.env.MONGO_URI;
if (!sourceUri) throw new Error('Set MONGODB_MIGRATION_URI to the existing MongoDB connection string.');
if (!process.env.DATABASE_URL) throw new Error('Set DATABASE_URL to the target PostgreSQL connection string.');

const toText = (value, fallback = '') => value == null ? fallback : String(value);
const toIso = (value) => value ? new Date(value) : new Date();
const collection = (name) => mongoose.connection.db.collection(name);

async function migrate() {
  await mongoose.connect(sourceUri, { serverSelectionTimeoutMS: 10_000 });
  if (!await connectDB()) throw new Error('Could not connect to the PostgreSQL destination.');

  const admins = await collection('admins').find({}).toArray();
  const inquiries = await collection('inquiries').find({}).toArray();
  const blogs = await collection('blogs').find({}).toArray();
  const hotels = await collection('hotels').find({}).toArray();
  const client = await getClient();

  try {
    await client.query('BEGIN');
    for (const row of admins) {
      await client.query(`INSERT INTO admins (id,name,email,password_hash,role,avatar,last_login,created_at,updated_at)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) ON CONFLICT (id) DO NOTHING`, [
        toText(row._id), toText(row.name), toText(row.email).toLowerCase(), toText(row.password),
        ['admin', 'editor'].includes(row.role) ? row.role : 'admin', toText(row.avatar), row.lastLogin || null,
        toIso(row.createdAt), toIso(row.updatedAt),
      ]);
    }
    for (const row of inquiries) {
      const metadata = row.metadata && typeof row.metadata === 'object' ? JSON.stringify(row.metadata) : '{}';
      await client.query(`INSERT INTO inquiries (id,name,phone,email,service,dates,guests,origin,interests,message,status,source,notes,metadata,created_at,updated_at)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14::jsonb,$15,$16) ON CONFLICT (id) DO NOTHING`, [
        toText(row._id), toText(row.name), toText(row.phone), toText(row.email), toText(row.service, 'General Inquiry'),
        toText(row.dates), toText(row.guests), toText(row.origin), toText(row.interests), toText(row.message),
        ['new', 'contacted', 'resolved', 'archived'].includes(row.status) ? row.status : 'new',
        toText(row.source, 'website'), toText(row.notes), metadata, toIso(row.createdAt), toIso(row.updatedAt),
      ]);
    }
    for (const row of blogs) {
      const status = ['draft', 'published'].includes(row.status) ? row.status : row.published ? 'published' : 'draft';
      await client.query(`INSERT INTO blogs (id,title,slug,excerpt,content,banner_image,category,status,tags,seo_title,seo_description,seo_keywords,published,created_at,updated_at)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb,$10,$11,$12::jsonb,$13,$14,$15) ON CONFLICT (id) DO NOTHING`, [
        toText(row._id), toText(row.title), toText(row.slug), toText(row.excerpt), toText(row.content),
        toText(row.bannerImage), toText(row.category, 'General'), status,
        JSON.stringify(Array.isArray(row.tags) ? row.tags : []), toText(row.seoTitle), toText(row.seoDescription),
        JSON.stringify(Array.isArray(row.seoKeywords) ? row.seoKeywords : []), status === 'published',
        toIso(row.createdAt), toIso(row.updatedAt),
      ]);
    }
    for (const row of hotels) {
      await client.query(`INSERT INTO hotels (id,name,description,image,whatsapp_message,created_at,updated_at)
        VALUES ($1,$2,$3,$4,$5,$6,$7) ON CONFLICT (id) DO NOTHING`, [
        toText(row._id), toText(row.name), toText(row.description), toText(row.image), toText(row.whatsappMessage),
        toIso(row.createdAt), toIso(row.updatedAt),
      ]);
    }
    await client.query('COMMIT');
    console.log(`Migration complete: ${admins.length} admins, ${inquiries.length} inquiries, ${blogs.length} blogs, ${hotels.length} hotels read from MongoDB.`);
  } catch (error) {
    await client.query('ROLLBACK').catch(() => {});
    throw error;
  } finally {
    client.release();
    await mongoose.disconnect();
  }
}

migrate().catch((error) => {
  console.error('MongoDB to PostgreSQL migration failed:', error.message);
  process.exitCode = 1;
}).finally(async () => {
  await mongoose.disconnect().catch(() => {});
  await closeDB().catch(() => {});
});
