import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { closeDB, connectDB, getClient } from './src/config/db.js';

const ADMIN_NAME = process.env.ADMIN_NAME || 'SoilNSoul Travels Admin';
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@soilnsoul.in').trim().toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
if (!ADMIN_PASSWORD || ADMIN_PASSWORD.length < 6) throw new Error('Set ADMIN_PASSWORD to at least 6 characters before running this script.');

async function seed() {
  if (!await connectDB()) throw new Error('PostgreSQL connection failed. Check DATABASE_URL.');
  const client = await getClient();
  try {
    await client.query('BEGIN');
    await client.query('LOCK TABLE admins IN EXCLUSIVE MODE');
    const { rows } = await client.query('SELECT id FROM admins WHERE email = $1 LIMIT 1', [ADMIN_EMAIL]);
    if (rows[0]) {
      console.log(`Admin account ${ADMIN_EMAIL} already exists.`);
      await client.query('ROLLBACK');
      return;
    }
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await client.query('INSERT INTO admins (name,email,password_hash) VALUES ($1,$2,$3)', [ADMIN_NAME, ADMIN_EMAIL, passwordHash]);
    await client.query('COMMIT');
    console.log(`Admin account ${ADMIN_EMAIL} created. Sign in at /hakunamata.`);
  } catch (error) {
    await client.query('ROLLBACK').catch(() => {});
    throw error;
  } finally {
    client.release();
  }
}

seed().catch((error) => {
  console.error('Admin seed failed:', error.message);
  process.exitCode = 1;
}).finally(() => closeDB().catch(() => {}));
