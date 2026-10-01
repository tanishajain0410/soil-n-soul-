import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:3000';
const PUBLIC_DIR = path.join(process.cwd(), 'public');

const ROUTES_TO_CHECK = [
  { name: 'Homepage', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Experiences', path: '/experiences' },
  { name: 'Journeys', path: '/journeys' },
  { name: 'Dharm', path: '/journeys/dharm' },
  { name: 'Arth', path: '/journeys/arth' },
  { name: 'Kaam', path: '/journeys/kaam' },
  { name: 'Moksh', path: '/journeys/moksh' },
  { name: 'Contact', path: '/contact' },
  { name: 'Blog', path: '/blog' },
  { name: 'Services', path: '/services' },
];

async function run() {
  console.log('=== VERIFYING PRODUCTION FIXES ===\n');
  let failures = 0;

  // 1. Robots.txt
  console.log('--- Checking /robots.txt ---');
  try {
    const robotsRes = await fetch(`${BASE_URL}/robots.txt`);
    const robotsText = await robotsRes.text();
    console.log(`Status: ${robotsRes.status}`);
    const hasAdminDisallow = robotsText.includes('Disallow: /admin');
    const hasApiDisallow = robotsText.includes('Disallow: /api');
    console.log(`Disallow /admin: ${hasAdminDisallow ? 'PASS' : 'FAIL'}`);
    console.log(`Disallow /api: ${hasApiDisallow ? 'PASS' : 'FAIL'}`);
    if (!hasAdminDisallow || !hasApiDisallow) failures++;
  } catch (err) {
    console.error('Robots check error:', err);
    failures++;
  }

  // 2. Sitemap.xml
  console.log('\n--- Checking /sitemap.xml ---');
  try {
    const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
    const sitemapText = await sitemapRes.text();
    console.log(`Status: ${sitemapRes.status}`);
    const categories = ['/journeys/dharm', '/journeys/arth', '/journeys/kaam', '/journeys/moksh'];
    for (const cat of categories) {
      const exists = sitemapText.includes(cat);
      console.log(`Sitemap includes ${cat}: ${exists ? 'PASS' : 'FAIL'}`);
      if (!exists) failures++;
    }
  } catch (err) {
    console.error('Sitemap check error:', err);
    failures++;
  }

  // 3. Page checks
  console.log('\n--- Checking Pages & Floating Buttons & Images ---');
  for (const route of ROUTES_TO_CHECK) {
    try {
      const res = await fetch(`${BASE_URL}${route.path}`);
      if (res.status !== 200) {
        console.error(`FAIL: ${route.name} (${route.path}) returned status ${res.status}`);
        failures++;
        continue;
      }
      const html = await res.text();

      // Check floating buttons
      const hasWa = html.includes('floating-wa-btn') || html.includes('aria-label="Chat on WhatsApp"');
      const hasCall = html.includes('floating-call-btn') || html.includes('Call Us');

      // Check for broken local image paths
      const imgRegex = /(?:src|srcset)="([^"]+)"/g;
      let match;
      const checkedPaths = new Set();
      let missingImgs = 0;

      while ((match = imgRegex.exec(html)) !== null) {
        const fullSrc = match[1];
        const srcParts = fullSrc.split(',').map(s => s.trim().split(' ')[0]);
        for (const rawUrl of srcParts) {
          if (!rawUrl.startsWith('/') || rawUrl.startsWith('/_next/') || rawUrl.startsWith('data:')) {
            continue;
          }
          const cleanPath = rawUrl.split('?')[0];
          if (checkedPaths.has(cleanPath)) continue;
          checkedPaths.add(cleanPath);

          const localDiskPath = path.join(PUBLIC_DIR, decodeURIComponent(cleanPath));
          if (!fs.existsSync(localDiskPath)) {
            console.error(`  [${route.name}] Broken image path: ${cleanPath}`);
            missingImgs++;
            failures++;
          }
        }
      }

      console.log(`PASS: ${route.name} (${route.path}) | HTTP 200 | WA: ${hasWa} | Call: ${hasCall} | Images checked: ${checkedPaths.size} (missing: ${missingImgs})`);
    } catch (err) {
      console.error(`Error checking ${route.name}:`, err.message);
      failures++;
    }
  }

  // 4. Hero video check on Homepage
  console.log('\n--- Checking Homepage Hero Video Elements ---');
  try {
    const homeRes = await fetch(`${BASE_URL}/`);
    const homeHtml = await homeRes.text();
    const hasMobileMediaSource = homeHtml.includes('media="(max-width: 768px)"');
    const hasHeroMobileMp4 = homeHtml.includes('varanasi-hero-mobile.mp4');
    const hasHeroDesktopMp4 = homeHtml.includes('varanasi-hero.mp4');
    const hasDirectVideoSrc = /<video[^>]*src=/.test(homeHtml);

    console.log(`Mobile media query source: ${hasMobileMediaSource ? 'PASS' : 'FAIL'}`);
    console.log(`Mobile MP4 source included: ${hasHeroMobileMp4 ? 'PASS' : 'FAIL'}`);
    console.log(`Desktop MP4 source included: ${hasHeroDesktopMp4 ? 'PASS' : 'FAIL'}`);
    console.log(`No blocking direct <video src=...>: ${!hasDirectVideoSrc ? 'PASS (Properly responsive)' : 'FAIL (Hardcoded video src detected)'}`);

    if (!hasMobileMediaSource || !hasHeroMobileMp4 || !hasHeroDesktopMp4 || hasDirectVideoSrc) {
      failures++;
    }
  } catch (err) {
    console.error('Homepage video check error:', err);
    failures++;
  }

  // 5. Twitter & OG metadata check on Homepage
  console.log('\n--- Checking Twitter & OG Metadata ---');
  try {
    const homeRes = await fetch(`${BASE_URL}/`);
    const homeHtml = await homeRes.text();
    const hasTwitterCard = homeHtml.includes('twitter:card') && homeHtml.includes('summary_large_image');
    const hasTwitterImage = homeHtml.includes('twitter:image');
    const hasOgImage = homeHtml.includes('og:image');

    console.log(`Twitter card summary_large_image: ${hasTwitterCard ? 'PASS' : 'FAIL'}`);
    console.log(`Twitter image: ${hasTwitterImage ? 'PASS' : 'FAIL'}`);
    console.log(`OpenGraph image: ${hasOgImage ? 'PASS' : 'FAIL'}`);

    if (!hasTwitterCard || !hasTwitterImage || !hasOgImage) {
      failures++;
    }
  } catch (err) {
    console.error('Metadata check error:', err);
    failures++;
  }

  console.log(`\n=== VERIFICATION FINISHED: ${failures === 0 ? 'ALL CHECKS PASSED PERFECTLY' : `${failures} CHECKS FAILED`} ===`);
}

run();
