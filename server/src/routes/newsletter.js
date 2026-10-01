import express from 'express';
import jwt from 'jsonwebtoken';
import { isDatabaseReady, query } from '../config/db.js';
import {
  sendWelcomeNewsletterEmail,
  sendNewBlogNotificationEmail,
  sendAdminNotificationEmail,
} from '../services/emailService.js';

const router = express.Router();

const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Unauthorized - No token provided' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    return next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

/**
 * POST /api/newsletter/subscribe
 * Public endpoint to subscribe to The Soul Blog newsletter.
 */
router.post('/subscribe', async (req, res) => {
  try {
    if (!isDatabaseReady()) {
      return res.status(503).json({ success: false, message: 'Subscription service is temporarily unavailable.' });
    }

    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const name = typeof req.body.name === 'string' && req.body.name.trim() ? req.body.name.trim() : 'Soul Blog Subscriber';
    const source = typeof req.body.source === 'string' ? req.body.source.trim() : 'blog_mini_newsletter';

    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    // 1. Insert or update in `subscribers` table
    await query(`
      INSERT INTO subscribers (email, name, status, source, subscribed_at, unsubscribed_at)
      VALUES ($1, $2, 'active', $3, NOW(), NULL)
      ON CONFLICT (email)
      DO UPDATE SET status = 'active', unsubscribed_at = NULL, name = EXCLUDED.name
    `, [email, name, source]);

    // 2. Also register in `inquiries` table for unified admin inbox tracking
    try {
      await query(`
        INSERT INTO inquiries (name, email, service, message, source, metadata)
        VALUES ($1, $2, 'Newsletter Subscription', 'Subscribed to The Soul Blog newsletter for Varanasi culture and travel stories.', $3, $4::jsonb)
      `, [name, email, source, JSON.stringify({ autoSubscribed: true })]);
    } catch (e) {
      // Inquiries insert is non-fatal if duplicate or soft fail
      console.warn('[Newsletter] Inquiries mirror warning:', e.message);
    }

    // 3. Send automated Welcome Email to the user asynchronously
    void sendWelcomeNewsletterEmail({ toEmail: email, name }).catch((err) => {
      console.error('[Newsletter] Welcome email error:', err);
    });

    // 4. Alert Admin asynchronously
    void sendAdminNotificationEmail({
      type: 'subscriber',
      data: { email, name, service: 'Newsletter Subscription' },
    }).catch(console.warn);

    return res.status(200).json({
      success: true,
      message: 'Thank you for subscribing! A welcome email has been sent to your inbox.',
      email,
    });
  } catch (err) {
    console.error('Error in /api/newsletter/subscribe:', err);
    return res.status(500).json({ success: false, message: 'Server error while processing subscription.' });
  }
});

/**
 * GET /api/newsletter/unsubscribe
 * Handles 1-click unsubscribe links from email footers.
 */
router.get('/unsubscribe', async (req, res) => {
  try {
    const email = typeof req.query.email === 'string' ? req.query.email.trim().toLowerCase() : '';
    if (email && isDatabaseReady()) {
      await query(`
        UPDATE subscribers
        SET status = 'unsubscribed', unsubscribed_at = NOW()
        WHERE email = $1
      `, [email]);
      console.log(`[Newsletter] Unsubscribed: ${email}`);
    }

    // Render a warm, graceful confirmation page
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Unsubscribed — SoilNSoul Travels</title>
        <style>
          body { margin: 0; padding: 40px 20px; background: #fbf6ed; color: #2a1712; font-family: -apple-system, sans-serif; display: grid; place-items: center; min-height: 80vh; text-align: center; }
          .card { max-width: 480px; background: #fff; padding: 48px 36px; border: 1px solid #ead8bc; border-radius: 12px; box-shadow: 0 12px 30px rgba(36,16,11,0.06); }
          h1 { font-family: Georgia, serif; font-size: 26px; color: #24100c; margin-top: 0; }
          p { font-size: 15px; line-height: 1.6; color: #594436; }
          a { display: inline-block; margin-top: 20px; background: #24100c; color: #d5ae62; padding: 12px 28px; text-decoration: none; border-radius: 999px; font-weight: bold; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>You have been unsubscribed.</h1>
          <p>We're sorry to see you go. ${email ? `<strong>${email}</strong> has been removed from The Soul Blog mailing list.` : 'You will no longer receive newsletter updates.'}</p>
          <p>You can resubscribe anytime on our website if you wish to rejoin our circle.</p>
          <a href="/">Return to SoilNSoul Travels &rarr;</a>
        </div>
      </body>
      </html>
    `);
  } catch (err) {
    console.error('Error in /api/newsletter/unsubscribe:', err);
    return res.status(500).send('Unable to process unsubscribe request.');
  }
});

/**
 * GET /api/newsletter/subscribers
 * Admin endpoint: list all subscribers with status and stats.
 */
router.get('/subscribers', verifyAdmin, async (req, res) => {
  try {
    if (!isDatabaseReady()) return res.status(503).json({ success: false, message: 'Database offline' });

    const [list, stats] = await Promise.all([
      query(`SELECT id, email, name, status, source, subscribed_at AS "subscribedAt", unsubscribed_at AS "unsubscribedAt" FROM subscribers ORDER BY subscribed_at DESC`),
      query(`SELECT COUNT(*)::int AS total, COUNT(*) FILTER (WHERE status = 'active')::int AS "activeCount", COUNT(*) FILTER (WHERE status = 'unsubscribed')::int AS "unsubscribedCount" FROM subscribers`),
    ]);

    return res.json({
      success: true,
      subscribers: list.rows,
      stats: stats.rows[0],
    });
  } catch (err) {
    console.error('Error fetching subscribers:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * POST /api/newsletter/broadcast
 * Admin endpoint: broadcast a blog story or newsletter to all active subscribers.
 */
router.post('/broadcast', verifyAdmin, async (req, res) => {
  try {
    if (!isDatabaseReady()) return res.status(503).json({ success: false, message: 'Database offline' });

    const { blogSlug, blogId } = req.body;
    let blog = null;

    if (blogSlug || blogId) {
      const bRes = await query(
        blogSlug ? `SELECT * FROM blogs WHERE slug = $1 LIMIT 1` : `SELECT * FROM blogs WHERE id = $1 LIMIT 1`,
        [blogSlug || blogId]
      );
      if (bRes.rows.length) {
        blog = bRes.rows[0];
      }
    }

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found to broadcast.' });
    }

    // Get all active subscriber emails
    const subsRes = await query(`SELECT email FROM subscribers WHERE status = 'active'`);
    const activeEmails = subsRes.rows.map((r) => r.email);

    if (!activeEmails.length) {
      return res.json({ success: true, message: 'No active subscribers found to email.', sentCount: 0 });
    }

    // Trigger broadcast
    const broadcastResult = await sendNewBlogNotificationEmail({
      toEmails: activeEmails,
      blog,
    });

    return res.json({
      success: true,
      message: `Broadcast dispatched to ${activeEmails.length} subscribers.`,
      sentCount: broadcastResult.sent,
      failedCount: broadcastResult.failed,
    });
  } catch (err) {
    console.error('Error in /api/newsletter/broadcast:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
