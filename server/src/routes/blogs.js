import express from 'express';
import jwt from 'jsonwebtoken';
import { query } from '../config/db.js';
import { cacheGet, cacheSet, cacheClear } from '../cache.js';
import { sendNewBlogNotificationEmail } from '../services/emailService.js';

const router = express.Router();
const allKey = 'blogs:all';
const fields = `id AS "_id", title, slug, excerpt, content, banner_image AS "bannerImage", category, status, tags, seo_title AS "seoTitle", seo_description AS "seoDescription", seo_keywords AS "seoKeywords", published, is_featured AS "isFeatured", created_at AS "createdAt", updated_at AS "updatedAt"`;
const columns = { title: 'title', slug: 'slug', excerpt: 'excerpt', content: 'content', bannerImage: 'banner_image', category: 'category', status: 'status', tags: 'tags', seoTitle: 'seo_title', seoDescription: 'seo_description', seoKeywords: 'seo_keywords', published: 'published', isFeatured: 'is_featured' };

const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET || 'secret'); return next(); }
  catch { return res.status(401).json({ success: false, message: 'Invalid token' }); }
};

function normalize(input, creating = false) {
  const data = { ...input };
  if (data.title && !data.slug) data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  for (const key of ['tags', 'seoKeywords']) {
    if (typeof data[key] === 'string') data[key] = data[key].split(',').map(x => x.trim()).filter(Boolean);
    if (creating && data[key] == null) data[key] = [];
  }
  if (data.status !== undefined) data.published = data.status === 'published';
  else if (data.published !== undefined) data.status = data.published ? 'published' : 'draft';
  if (data.isFeatured !== undefined) data.isFeatured = Boolean(data.isFeatured);
  else if (data.featured !== undefined) data.isFeatured = Boolean(data.featured);
  if (creating) Object.assign(data, {
    bannerImage: data.bannerImage ?? '',
    category: data.category ?? 'General',
    status: data.status ?? 'draft',
    seoTitle: data.seoTitle ?? '',
    seoDescription: data.seoDescription ?? '',
    published: data.published ?? false,
    isFeatured: data.isFeatured ?? false,
  });
  return data;
}

router.get('/', async (req, res) => {
  try {
    const cached = cacheGet(allKey);
    if (cached) return res.setHeader('X-Cache', 'HIT').json({ success: true, blogs: cached });
    const { rows } = await query(`SELECT ${fields} FROM blogs ORDER BY created_at DESC`);
    cacheSet(allKey, rows);
    return res.setHeader('X-Cache', 'MISS').json({ success: true, blogs: rows });
  } catch (err) { return res.status(500).json({ success: false, message: err.message }); }
});

router.get('/:slug', async (req, res) => {
  try {
    const key = `blogs:slug:${req.params.slug}`; const cached = cacheGet(key);
    if (cached) return res.setHeader('X-Cache', 'HIT').json({ success: true, blog: cached });
    const { rows } = await query(`SELECT ${fields} FROM blogs WHERE slug=$1 LIMIT 1`, [req.params.slug]);
    if (!rows[0]) return res.status(404).json({ success: false, message: 'Blog not found' });
    cacheSet(key, rows[0]);
    return res.setHeader('X-Cache', 'MISS').json({ success: true, blog: rows[0] });
  } catch (err) { return res.status(500).json({ success: false, message: err.message }); }
});

router.post('/', verifyAdmin, async (req, res) => {
  try {
    const data = normalize(req.body, true);
    for (const key of ['title', 'slug', 'excerpt', 'content']) if (!String(data[key] || '').trim()) return res.status(400).json({ success: false, message: `${key} is required` });
    if (data.isFeatured) {
      await query(`UPDATE blogs SET is_featured = FALSE WHERE is_featured = TRUE`);
    }
    const keys = Object.keys(columns).filter(key => data[key] !== undefined);
    const vals = keys.map(key => ['tags', 'seoKeywords'].includes(key) ? JSON.stringify(data[key]) : data[key]);
    const names = keys.map(key => columns[key]);
    const marks = keys.map((key, i) => `$${i + 1}${['tags', 'seoKeywords'].includes(key) ? '::jsonb' : ''}`);
    const { rows } = await query(`INSERT INTO blogs (${names.join(',')}) VALUES (${marks.join(',')}) RETURNING ${fields}`, vals);
    cacheClear();

    // Automatically notify active subscribers when published
    if (rows[0] && rows[0].status === 'published' && req.body.notifySubscribers !== false) {
      query(`SELECT email FROM subscribers WHERE status = 'active'`)
        .then(({ rows: subs }) => {
          const emails = subs.map(s => s.email);
          if (emails.length) {
            void sendNewBlogNotificationEmail({ toEmails: emails, blog: rows[0] }).catch(console.error);
          }
        })
        .catch(console.warn);
    }

    return res.status(201).json({ success: true, blog: rows[0] });
  } catch (err) { return res.status(400).json({ success: false, message: err.code === '23505' ? 'A blog with this slug already exists' : err.message }); }
});

router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const data = normalize(req.body);
    if (data.isFeatured) {
      await query(`UPDATE blogs SET is_featured = FALSE WHERE is_featured = TRUE`);
    }
    const keys = Object.keys(columns).filter(key => data[key] !== undefined);
    if (!keys.length) return res.status(400).json({ success: false, message: 'No valid update fields provided' });
    const vals = keys.map(key => ['tags', 'seoKeywords'].includes(key) ? JSON.stringify(data[key]) : data[key]);
    const set = keys.map((key, i) => `${columns[key]}=$${i + 1}${['tags', 'seoKeywords'].includes(key) ? '::jsonb' : ''}`);
    vals.push(req.params.id);
    const { rows } = await query(`UPDATE blogs SET ${set.join(',')}, updated_at=NOW() WHERE id=$${vals.length} RETURNING ${fields}`, vals);
    if (!rows[0]) return res.status(404).json({ success: false, message: 'Blog not found' });
    cacheClear();

    // Optionally notify active subscribers on update when requested or published
    if (rows[0] && rows[0].status === 'published' && req.body.notifySubscribers === true) {
      query(`SELECT email FROM subscribers WHERE status = 'active'`)
        .then(({ rows: subs }) => {
          const emails = subs.map(s => s.email);
          if (emails.length) {
            void sendNewBlogNotificationEmail({ toEmails: emails, blog: rows[0] }).catch(console.error);
          }
        })
        .catch(console.warn);
    }

    return res.json({ success: true, blog: rows[0] });
  } catch (err) { return res.status(400).json({ success: false, message: err.code === '23505' ? 'A blog with this slug already exists' : err.message }); }
});

/**
 * PATCH /api/blogs/:id/feature
 * Admin 1-click endpoint: Set or toggle a blog as the primary featured story
 */
router.patch('/:id/feature', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const shouldFeature = req.body.featured !== undefined ? Boolean(req.body.featured) : true;

    if (shouldFeature) {
      await query(`UPDATE blogs SET is_featured = FALSE WHERE is_featured = TRUE`);
      const { rows } = await query(`UPDATE blogs SET is_featured = TRUE, updated_at = NOW() WHERE id = $1 RETURNING ${fields}`, [id]);
      if (!rows[0]) return res.status(404).json({ success: false, message: 'Blog not found' });
      cacheClear();
      return res.json({ success: true, message: 'Story marked as Featured Article', blog: rows[0] });
    } else {
      const { rows } = await query(`UPDATE blogs SET is_featured = FALSE, updated_at = NOW() WHERE id = $1 RETURNING ${fields}`, [id]);
      if (!rows[0]) return res.status(404).json({ success: false, message: 'Blog not found' });
      cacheClear();
      return res.json({ success: true, message: 'Story removed from Featured', blog: rows[0] });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const result = await query('DELETE FROM blogs WHERE id=$1', [req.params.id]);
    if (!result.rowCount) return res.status(404).json({ success: false, message: 'Blog not found' });
    cacheClear();
    return res.json({ success: true, message: 'Blog deleted' });
  } catch (err) { return res.status(500).json({ success: false, message: err.message }); }
});

export default router;
