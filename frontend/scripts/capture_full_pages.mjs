import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const executablePath = fs.existsSync(chromePath) ? chromePath : edgePath;

const outDir = 'C:\\Users\\ayush\\.gemini\\antigravity-ide\\brain\\ba56e741-7d9d-4da1-8265-efa830ff67f4\\ui_full_screenshots';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const routes = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'experiences', path: '/experiences' },
  { name: 'journeys', path: '/journeys' },
  { name: 'blog', path: '/blog' },
  { name: 'contact', path: '/contact' }
];

async function scrollPage(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 450;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 60);
    });
  });
  await new Promise(res => setTimeout(res, 600));
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(res => setTimeout(res, 800));
}

async function captureFullPages() {
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  for (const r of routes) {
    const url = 'http://localhost:3001' + r.path;

    // Desktop Full Page
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 }).catch(() => {});
    await scrollPage(page);
    await page.screenshot({ path: path.join(outDir, `${r.name}_desktop_full.png`), fullPage: true });

    // Mobile Full Page
    await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 }).catch(() => {});
    await scrollPage(page);
    await page.screenshot({ path: path.join(outDir, `${r.name}_mobile_full.png`), fullPage: true });

    console.log(`Captured ${r.name}`);
  }

  await browser.close();
  console.log('All full pages captured successfully.');
}

captureFullPages().catch(err => {
  console.error(err);
  process.exit(1);
});
