import puppeteer from 'puppeteer-core';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const routes = [
  '/',
  '/about',
  '/contact',
  '/experiences',
  '/journeys',
  '/journeys/dharm',
  '/journeys/arth',
  '/journeys/kaam',
  '/journeys/moksh',
  '/journeys/the-sacred-morning',
  '/blog',
  '/services',
  '/best-tours-and-travel-agency-in-varanasi'
];

async function checkSeo() {
  const browser = await puppeteer.launch({ executablePath: edgePath, headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  console.log('=== SEO METADATA AUDIT ===\n');

  for (const r of routes) {
    await page.goto('http://localhost:3000' + r, { waitUntil: 'domcontentloaded' });
    const seo = await page.evaluate(() => {
      const title = document.title;
      const desc = document.querySelector('meta[name="description"]')?.getAttribute('content');
      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
      const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
      const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content');
      const twitterCard = document.querySelector('meta[name="twitter:card"]')?.getAttribute('content');
      const twitterImage = document.querySelector('meta[name="twitter:image"]')?.getAttribute('content');
      const missingAlt = Array.from(document.querySelectorAll('img')).filter(i => !i.hasAttribute('alt')).length;
      return { title, desc, canonical, ogTitle, ogImage, twitterCard, twitterImage, missingAlt };
    });

    console.log(`ROUTE: ${r}`);
    console.log(` - Title: ${seo.title}`);
    console.log(` - Description: ${seo.desc ? seo.desc.slice(0, 70) + '...' : 'MISSING'}`);
    console.log(` - Canonical: ${seo.canonical || 'MISSING'}`);
    console.log(` - OG Image: ${seo.ogImage || 'MISSING'}`);
    console.log(` - Twitter Image: ${seo.twitterImage || 'MISSING'}`);
    console.log(` - Images missing alt: ${seo.missingAlt}`);
    console.log('--------------------------------------------------');
  }

  await browser.close();
}
checkSeo().catch(e => console.error(e));
