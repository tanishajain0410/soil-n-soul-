import pg from 'pg';

const { Pool } = pg;
let pool;
let connected = false;

const schema = `
CREATE TABLE IF NOT EXISTS admins (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
  avatar TEXT NOT NULL DEFAULT '', last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL, phone TEXT NOT NULL DEFAULT '', email TEXT NOT NULL DEFAULT '',
  service TEXT NOT NULL DEFAULT 'General Inquiry', dates TEXT NOT NULL DEFAULT '', guests TEXT NOT NULL DEFAULT '',
  origin TEXT NOT NULL DEFAULT '', interests TEXT NOT NULL DEFAULT '', message TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'resolved', 'archived')),
  source TEXT NOT NULL DEFAULT 'website', notes TEXT NOT NULL DEFAULT '', metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS inquiries_status_idx ON inquiries (status);
CREATE TABLE IF NOT EXISTS blogs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL, slug TEXT NOT NULL UNIQUE, excerpt TEXT NOT NULL, content TEXT NOT NULL,
  banner_image TEXT NOT NULL DEFAULT '', category TEXT NOT NULL DEFAULT 'General',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  tags JSONB NOT NULL DEFAULT '[]'::jsonb, seo_title TEXT NOT NULL DEFAULT '',
  seo_description TEXT NOT NULL DEFAULT '', seo_keywords JSONB NOT NULL DEFAULT '[]'::jsonb,
  published BOOLEAN NOT NULL DEFAULT FALSE,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS blogs_is_featured_idx ON blogs (is_featured);
CREATE INDEX IF NOT EXISTS blogs_status_created_at_idx ON blogs (status, created_at DESC);
CREATE TABLE IF NOT EXISTS hotels (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL, description TEXT NOT NULL, image TEXT NOT NULL, whatsapp_message TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS subscribers (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL DEFAULT 'Soul Blog Subscriber',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  source TEXT NOT NULL DEFAULT 'blog_newsletter',
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS subscribers_email_idx ON subscribers (email);
CREATE INDEX IF NOT EXISTS subscribers_status_idx ON subscribers (status);
`;

export async function connectDB() {
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️ DATABASE_URL is not configured. PostgreSQL-backed admin features are unavailable.');
    return false;
  }
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: Number(process.env.PG_POOL_MAX || 10),
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 8_000,
    ssl: process.env.PGSSL === 'disable' ? false : { rejectUnauthorized: process.env.PGSSL_REJECT_UNAUTHORIZED === 'true' },
  });
  try {
    await pool.query('SELECT 1');
    await pool.query(schema);
    await pool.query('ALTER TABLE blogs ADD COLUMN IF NOT EXISTS is_featured BOOLEAN NOT NULL DEFAULT FALSE;');
    connected = true;
    console.log('✅ PostgreSQL connected; admin schema is ready.');
    return true;
  } catch (error) {
    connected = false;
    await pool.end().catch(() => {});
    pool = undefined;
    console.error(`❌ PostgreSQL connection error: ${error.message}`);
    return false;
  }
}

export const isDatabaseReady = () => connected && Boolean(pool);

export function query(text, params) {
  if (!isDatabaseReady()) throw new Error('PostgreSQL is not connected. Configure DATABASE_URL and restart the API.');
  return pool.query(text, params);
}

export function getClient() {
  if (!isDatabaseReady()) throw new Error('PostgreSQL is not connected. Configure DATABASE_URL and restart the API.');
  return pool.connect();
}

export async function closeDB() {
  connected = false;
  if (pool) await pool.end();
  pool = undefined;
}

export { schema };
