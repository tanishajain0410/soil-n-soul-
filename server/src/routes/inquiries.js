import express from 'express';
import jwt from 'jsonwebtoken';
import { isDatabaseReady, query } from '../config/db.js';

const router = express.Router();
const fields = `id AS "_id", name, phone, email, service, dates, guests, origin, interests, message, status, source, notes, metadata, created_at AS "createdAt", updated_at AS "updatedAt"`;
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Unauthorized - No token provided' });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET || 'secret'); return next(); }
  catch { return res.status(401).json({ success: false, message: 'Invalid or expired token' }); }
};

router.post('/', async (req, res) => {
  try {
    if (!isDatabaseReady()) return res.status(503).json({ success: false, message: 'Inquiry service is currently unavailable. Please try again shortly.' });
    const val = (key, fallback = '') => req.body[key] == null ? fallback : typeof req.body[key] === 'string' ? req.body[key].trim() : String(req.body[key]);
    const name = val('name'); const phone = val('phone'); const email = val('email');
    if (!name) return res.status(400).json({ success: false, message: 'Name is required' });
    if (!phone && !email) return res.status(400).json({ success: false, message: 'Either phone number or email is required' });
    const interestValue = req.body.interests;
    const interests = typeof interestValue === 'string' ? interestValue.trim() : interestValue == null ? '' : JSON.stringify(interestValue);
    const metadata = req.body.metadata && typeof req.body.metadata === 'object' ? JSON.stringify(req.body.metadata) : '{}';
    const { rows } = await query(`INSERT INTO inquiries (name,phone,email,service,dates,guests,origin,interests,message,source,metadata)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11::jsonb) RETURNING ${fields}`,
    [name, phone, email, val('service', 'General Inquiry'), val('dates'), val('guests'), val('origin'), interests, val('message'), val('source', 'website'), metadata]);
    return res.status(201).json({ success: true, message: 'Inquiry saved successfully', inquiry: rows[0] });
  } catch (err) {
    console.error('Error creating inquiry:', err);
    return res.status(500).json({ success: false, message: err.message || 'Server error while saving inquiry' });
  }
});

router.get('/', verifyAdmin, async (req, res) => {
  try {
    const params = []; const filters = [];
    if (req.query.status && req.query.status !== 'all') { params.push(String(req.query.status)); filters.push(`status = $${params.length}`); }
    if (req.query.search && String(req.query.search).trim()) {
      params.push(`%${String(req.query.search).trim()}%`); const n = params.length;
      filters.push(`(name ILIKE $${n} OR phone ILIKE $${n} OR email ILIKE $${n} OR service ILIKE $${n} OR message ILIKE $${n} OR origin ILIKE $${n})`);
    }
    const where = filters.length ? `WHERE ${filters.join(' AND ')}` : '';
    const [list, stats] = await Promise.all([
      query(`SELECT ${fields} FROM inquiries ${where} ORDER BY created_at DESC`, params),
      query(`SELECT COUNT(*)::int AS total, COUNT(*) FILTER (WHERE status='new')::int AS "newCount",
        COUNT(*) FILTER (WHERE status='contacted')::int AS "contactedCount",
        COUNT(*) FILTER (WHERE status='resolved')::int AS "resolvedCount" FROM inquiries`),
    ]);
    return res.json({ success: true, inquiries: list.rows, stats: stats.rows[0] });
  } catch (err) {
    console.error('Error fetching inquiries:', err);
    return res.status(500).json({ success: false, message: 'Server error while fetching inquiries' });
  }
});

router.patch('/:id', verifyAdmin, async (req, res) => {
  try {
    const sets = []; const params = [];
    if (req.body.status !== undefined) {
      if (!['new', 'contacted', 'resolved', 'archived'].includes(req.body.status)) return res.status(400).json({ success: false, message: 'Invalid status' });
      params.push(req.body.status); sets.push(`status=$${params.length}`);
    }
    if (typeof req.body.notes === 'string') { params.push(req.body.notes); sets.push(`notes=$${params.length}`); }
    if (!sets.length) return res.status(400).json({ success: false, message: 'No valid update fields provided' });
    params.push(req.params.id);
    const { rows } = await query(`UPDATE inquiries SET ${sets.join(',')}, updated_at=NOW() WHERE id=$${params.length} RETURNING ${fields}`, params);
    if (!rows[0]) return res.status(404).json({ success: false, message: 'Inquiry not found' });
    return res.json({ success: true, message: 'Inquiry updated successfully', inquiry: rows[0] });
  } catch (err) { return res.status(500).json({ success: false, message: err.message }); }
});

router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const result = await query('DELETE FROM inquiries WHERE id=$1', [req.params.id]);
    if (!result.rowCount) return res.status(404).json({ success: false, message: 'Inquiry not found' });
    return res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (err) { return res.status(500).json({ success: false, message: err.message }); }
});

export default router;
