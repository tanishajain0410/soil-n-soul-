import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getClient, isDatabaseReady, query } from '../config/db.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password are required' });
    if (!isDatabaseReady()) return res.status(503).json({ success: false, message: 'Admin database is unavailable' });
    const { rows } = await query('SELECT id, password_hash, role FROM admins WHERE email = $1 LIMIT 1', [email]);
    const admin = rows[0];
    if (!admin || !(await bcrypt.compare(password, admin.password_hash))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    await query('UPDATE admins SET last_login = NOW(), updated_at = NOW() WHERE id = $1', [admin.id]);
    const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    return res.json({ success: true, token });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/setup', async (req, res) => {
  if (!isDatabaseReady()) return res.status(503).json({ success: false, message: 'Admin database is unavailable' });
  let client;
  try {
    const { name, password } = req.body;
    const email = String(req.body.email || '').trim().toLowerCase();
    if (!String(name || '').trim() || !email || String(password || '').length < 6) {
      return res.status(400).json({ success: false, message: 'Name, email, and a password of at least 6 characters are required' });
    }
    client = await getClient();
    await client.query('BEGIN');
    await client.query('LOCK TABLE admins IN EXCLUSIVE MODE');
    const { rows } = await client.query('SELECT COUNT(*)::int AS count FROM admins');
    if (rows[0].count) {
      await client.query('ROLLBACK');
      return res.status(400).json({ success: false, message: 'Admin already exists' });
    }
    const passwordHash = await bcrypt.hash(String(password), 12);
    await client.query('INSERT INTO admins (name,email,password_hash) VALUES ($1,$2,$3)', [String(name).trim(), email, passwordHash]);
    await client.query('COMMIT');
    return res.status(201).json({ success: true, message: 'Admin created successfully' });
  } catch (err) {
    if (client) await client.query('ROLLBACK').catch(() => {});
    return res.status(400).json({ success: false, message: err.message });
  } finally {
    client?.release();
  }
});

export default router;
