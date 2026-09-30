import express from 'express';
import jwt from 'jsonwebtoken';
import { query } from '../config/db.js';

const router = express.Router();
const fields = `id AS "_id", name, description, image, whatsapp_message AS "whatsappMessage", created_at AS "createdAt", updated_at AS "updatedAt"`;
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET || 'secret'); return next(); }
  catch { return res.status(401).json({ success: false, message: 'Invalid token' }); }
};

router.get('/', async (req, res) => {
  try { const { rows } = await query(`SELECT ${fields} FROM hotels ORDER BY created_at DESC`); return res.json({ success: true, hotels: rows }); }
  catch (err) { return res.status(500).json({ success: false, message: err.message }); }
});

router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { name, description, image } = req.body;
    if (![name, description, image].every(value => typeof value === 'string' && value.trim())) return res.status(400).json({ success: false, message: 'Name, description, and image are required' });
    const message = req.body.whatsappMessage || `Hi, I am interested in booking ${name.trim()}.`;
    const { rows } = await query(`INSERT INTO hotels (name,description,image,whatsapp_message) VALUES ($1,$2,$3,$4) RETURNING ${fields}`, [name.trim(), description.trim(), image.trim(), message]);
    return res.status(201).json({ success: true, hotel: rows[0] });
  } catch (err) { return res.status(400).json({ success: false, message: err.message }); }
});

router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const columns = { name: 'name', description: 'description', image: 'image', whatsappMessage: 'whatsapp_message' };
    const keys = Object.keys(columns).filter(key => req.body[key] !== undefined);
    if (!keys.length) return res.status(400).json({ success: false, message: 'No valid update fields provided' });
    const values = keys.map(key => typeof req.body[key] === 'string' ? req.body[key].trim() : req.body[key]);
    const set = keys.map((key, index) => `${columns[key]}=$${index + 1}`);
    values.push(req.params.id);
    const { rows } = await query(`UPDATE hotels SET ${set.join(',')}, updated_at=NOW() WHERE id=$${values.length} RETURNING ${fields}`, values);
    if (!rows[0]) return res.status(404).json({ success: false, message: 'Hotel not found' });
    return res.json({ success: true, hotel: rows[0] });
  } catch (err) { return res.status(400).json({ success: false, message: err.message }); }
});

router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const result = await query('DELETE FROM hotels WHERE id=$1', [req.params.id]);
    if (!result.rowCount) return res.status(404).json({ success: false, message: 'Hotel not found' });
    return res.json({ success: true, message: 'Hotel deleted' });
  } catch (err) { return res.status(500).json({ success: false, message: err.message }); }
});

export default router;
