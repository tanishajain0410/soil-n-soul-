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

async function inspectPages() {
  const browser = await puppeteer.launch({ executablePath: edgePath, headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('=== PAGE-BY-PAGE AUDIT ===\n');

  for (const r of routes) {
    const url = 'http://localhost:3000' + r;
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await new Promise(res => setTimeout(res, 800));

    const data = await page.evaluate(() => {
      // 1. Heading check
      const h1s = Array.from(document.querySelectorAll('h1')).map(h => h.innerText.replace(/\s+/g, ' ').trim()).filter(Boolean);
      const h2s = Array.from(document.querySelectorAll('h2')).map(h => h.innerText.replace(/\s+/g, ' ').trim()).filter(Boolean);
      const dupH2 = h2s.filter((item, index) => h2s.indexOf(item) !== index);

      // 2. Nav, Footer, Floating Buttons
      const navCount = document.querySelectorAll('header, .sn-nav, .exp-nav-header').length;
      const footerCount = document.querySelectorAll('footer').length;
      const waCount = document.querySelectorAll('.floating-wa-btn').length;
      const callCount = document.querySelectorAll('.floating-call-btn').length;

      // 3. Images check
      const imgs = Array.from(document.querySelectorAll('img')).map(img => img.src);
      const brokenImgs = Array.from(document.querySelectorAll('img')).filter(img => img.naturalWidth === 0 && img.src && !img.src.includes('data:')).map(img => img.src);

      // 4. Overflow
      const overflow = document.documentElement.scrollWidth > window.innerWidth;

      // 5. Section titles/IDs
      const sections = Array.from(document.querySelectorAll('section')).map(s => s.id || s.getAttribute('aria-label') || s.className);

      // 6. Check for duplicate links or IDs
      const allIds = Array.from(document.querySelectorAll('[id]')).map(el => el.id);
      const dupIds = allIds.filter((item, index) => allIds.indexOf(item) !== index);

      return {
        h1Count: h1s.length,
        h1List: h1s,
        h2Count: h2s.length,
        dupH2: Array.from(new Set(dupH2)),
        navCount,
        footerCount,
        waCount,
        callCount,
        imgCount: imgs.length,
        brokenImgs,
        overflow,
        sectionsCount: sections.length,
        dupIds: Array.from(new Set(dupIds))
      };
    });

    console.log(`ROUTE: ${r}`);
    console.log(` - H1 (${data.h1Count}): ${JSON.stringify(data.h1List)}`);
    console.log(` - H2 count: ${data.h2Count} ${data.dupH2.length ? '| Duplicates: ' + JSON.stringify(data.dupH2) : '(No duplicate H2)'}`);
    console.log(` - Navs: ${data.navCount} | Footers: ${data.footerCount} | WA: ${data.waCount} | Call: ${data.callCount}`);
    console.log(` - Images: ${data.imgCount} | Broken: ${data.brokenImgs.length}`);
    console.log(` - Horizontal Overflow: ${data.overflow}`);
    console.log(` - Sections: ${data.sectionsCount}`);
    if (data.dupIds.length > 0) {
      console.log(` - DUPLICATE DOM IDs: ${JSON.stringify(data.dupIds)}`);
    } else {
      console.log(` - DOM IDs: Unique (0 duplicate IDs)`);
    }
    console.log('--------------------------------------------------');
  }

  await browser.close();
}

inspectPages().catch(e => console.error(e));
