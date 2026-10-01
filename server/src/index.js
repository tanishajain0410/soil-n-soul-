import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB, isDatabaseReady, query } from './config/db.js';
import { cacheClear, cacheGet, cacheSet } from './cache.js';
import jwt from 'jsonwebtoken';

// Route imports
import authRoutes from './routes/auth.js';
import blogRoutes from './routes/blogs.js';
import categoryRoutes from './routes/categories.js';
import mediaRoutes from './routes/media.js';
import inquiryRoutes from './routes/inquiries.js';
import hotelRoutes from './routes/hotels.js';
import newsletterRoutes from './routes/newsletter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const SITE_URL = process.env.SITE_URL || 'https://www.soilnsoultravels.com';

// Connect PostgreSQL before accepting requests.
await connectDB();

// Security middleware
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

// CORS
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://www.soilnsoultravels.com',
    'https://soilnsoultravels.com',
];

if (process.env.CLIENT_URL) {
    process.env.CLIENT_URL.split(',').forEach(u => {
        const trimmed = u.trim();
        if (trimmed && !allowedOrigins.includes(trimmed)) allowedOrigins.push(trimmed);
    });
}

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (
            allowedOrigins.includes(origin) ||
            origin.endsWith('.soilnsoultravels.com') ||
            origin.endsWith('.vercel.app') ||
            process.env.NODE_ENV !== 'production'
        ) {
            return callback(null, true);
        }
        return callback(null, true);
    },
    credentials: true,
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/newsletter', newsletterRoutes);

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', database: isDatabaseReady() ? 'postgresql' : 'unavailable', message: 'SoilNSoul Travels API is running', time: new Date() });
});

// ─── On-Demand Revalidation ───────────────────────────────────────────────────
// Admin hits POST /api/revalidate to flush the cache (ISR equivalent)
app.post('/api/revalidate', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });
    try {
        jwt.verify(token, process.env.JWT_SECRET || 'secret');
    } catch {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    cacheClear();
    console.log('🔄 Cache cleared by admin revalidation');
    res.json({ success: true, message: 'Cache cleared. Next blog request will be fresh from DB.' });
});

// ─── Dynamic Sitemap ─────────────────────────────────────────────────────────
const SITEMAP_CACHE_KEY = 'sitemap:xml';
const SITEMAP_TTL_MS = 10 * 60 * 1000; // 10 mins

app.get('/sitemap.xml', async (req, res) => {
    try {
        // Simple sitemap-specific cache (separate from blog cache)
        const cached = cacheGet(SITEMAP_CACHE_KEY);
        if (cached) {
            res.setHeader('Content-Type', 'application/xml');
            return res.send(cached);
        }

        const { rows: blogs } = await query('SELECT slug, updated_at FROM blogs WHERE status = $1 ORDER BY updated_at DESC', ['published']);

        const staticPages = [
            { url: '/', priority: '1.0', changefreq: 'daily' },
            { url: '/best-tours-and-travel-agency-in-varanasi', priority: '1.0', changefreq: 'weekly' },
            { url: '/blog', priority: '0.9', changefreq: 'daily' },
            { url: '/services', priority: '0.9', changefreq: 'weekly' },
            { url: '/contact', priority: '0.7', changefreq: 'monthly' },
        ];

        const serviceSlug = ['travel', 'stay', 'pooja-booking', 'event', 'city-tour'];

        const xmlLines = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ];

        // Static pages
        staticPages.forEach(({ url, priority, changefreq }) => {
            xmlLines.push(`  <url>
    <loc>${SITE_URL}${url}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`);
        });

        // Service pages
        serviceSlug.forEach(slug => {
            xmlLines.push(`  <url>
    <loc>${SITE_URL}/services/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
        });

        // High-intent SEO landing pages
        const seoPageSlugs = [
            'best-travel-agency-varanasi',
            'varanasi-tour-packages',
            'ganga-aarti-varanasi',
            'varanasi-hotels',
            'varanasi-sightseeing',
            'varanasi-honeymoon',
            'varanasi-pooja-booking',
            'varanasi-multi-city-tours',
            'how-to-choose-travel-agency-varanasi',
        ];
        seoPageSlugs.forEach(slug => {
            xmlLines.push(`  <url>
    <loc>${SITE_URL}/travel/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`);
        });

        // Blog posts (dynamic)
        blogs.forEach(blog => {
            const lastmod = blog.updated_at ? new Date(blog.updated_at).toISOString().split('T')[0] : '';
            xmlLines.push(`  <url>
    <loc>${SITE_URL}/blog/${blog.slug}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
        });

        xmlLines.push('</urlset>');
        const xml = xmlLines.join('\n');

        // Cache it for 10 mins
        cacheSet(SITEMAP_CACHE_KEY, xml);

        res.setHeader('Content-Type', 'application/xml');
        res.setHeader('Cache-Control', 'public, max-age=600, stale-while-revalidate=3600');
        res.send(xml);
    } catch (err) {
        console.error('Sitemap error:', err);
        res.status(500).send('Error generating sitemap');
    }
});

// ─── robots.txt ───────────────────────────────────────────────────────────────
app.get('/robots.txt', (req, res) => {
    const robots = [
        'User-agent: *',
        'Allow: /',
        '',
        `Sitemap: ${SITE_URL}/sitemap.xml`,
    ].join('\n');

    res.setHeader('Content-Type', 'text/plain');
    res.send(robots);
});

// ─── 404 handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Error handler ────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error',
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🕉️  SoilNSoul Travels API running on port ${PORT}`);
    console.log(`📦 Environment: ${process.env.NODE_ENV}`);
    console.log(`🗄️  PostgreSQL: ${isDatabaseReady() ? 'connected' : 'not configured'}\n`);
});
