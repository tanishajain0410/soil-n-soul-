import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const executablePath = fs.existsSync(chromePath) ? chromePath : edgePath;

const outDir = 'C:\\Users\\ayush\\.gemini\\antigravity-ide\\brain\\ba56e741-7d9d-4da1-8265-efa830ff67f4\\ui_screenshots';
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

async function inspectPages() {
  console.log('Launching browser with:', executablePath);
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const report = {};

  for (const r of routes) {
    report[r.name] = { desktop: {}, mobile: {} };
    const url = 'http://localhost:3001' + r.path;

    // Desktop
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await new Promise(res => setTimeout(res, 1200));

    await page.screenshot({ path: path.join(outDir, `${r.name}_desktop.png`), fullPage: false });

    const desktopData = await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('section, main > div, .sn-wrap, header'));
      const secData = sections.slice(0, 15).map(s => {
        const style = window.getComputedStyle(s);
        const rect = s.getBoundingClientRect();
        return {
          tag: s.tagName,
          className: s.className ? s.className.toString().slice(0, 50) : '',
          height: Math.round(rect.height),
          paddingTop: style.paddingTop,
          paddingBottom: style.paddingBottom,
          marginTop: style.marginTop,
          marginBottom: style.marginBottom,
        };
      });

      const headings = Array.from(document.querySelectorAll('h1, h2, h3')).slice(0, 15).map(h => {
        const style = window.getComputedStyle(h);
        return {
          tag: h.tagName,
          text: (h.textContent || '').trim().slice(0, 30),
          fontSize: style.fontSize,
          lineHeight: style.lineHeight,
          marginBottom: style.marginBottom,
        };
      });

      const buttons = Array.from(document.querySelectorAll('a[class*="btn"], button[class*="btn"], a[class*="cta"], button[class*="cta"]')).slice(0, 10).map(b => {
        const style = window.getComputedStyle(b);
        return {
          text: (b.textContent || '').trim().slice(0, 25),
          fontSize: style.fontSize,
          padding: `${style.paddingTop} ${style.paddingRight}`,
          height: style.height
        };
      });

      return { secData, headings, buttons, scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth };
    });
    report[r.name].desktop = desktopData;

    // Mobile
    await page.setViewport({ width: 375, height: 812, isMobile: true });
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await new Promise(res => setTimeout(res, 1200));

    await page.screenshot({ path: path.join(outDir, `${r.name}_mobile.png`), fullPage: false });

    const mobileData = await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('section, main > div, .sn-wrap, header'));
      const secData = sections.slice(0, 15).map(s => {
        const style = window.getComputedStyle(s);
        const rect = s.getBoundingClientRect();
        return {
          tag: s.tagName,
          className: s.className ? s.className.toString().slice(0, 50) : '',
          height: Math.round(rect.height),
          paddingTop: style.paddingTop,
          paddingBottom: style.paddingBottom,
          marginTop: style.marginTop,
          marginBottom: style.marginBottom,
        };
      });

      const headings = Array.from(document.querySelectorAll('h1, h2, h3')).slice(0, 15).map(h => {
        const style = window.getComputedStyle(h);
        return {
          tag: h.tagName,
          text: (h.textContent || '').trim().slice(0, 30),
          fontSize: style.fontSize,
          lineHeight: style.lineHeight,
          marginBottom: style.marginBottom,
        };
      });

      const buttons = Array.from(document.querySelectorAll('a[class*="btn"], button[class*="btn"], a[class*="cta"], button[class*="cta"]')).slice(0, 10).map(b => {
        const style = window.getComputedStyle(b);
        return {
          text: (b.textContent || '').trim().slice(0, 25),
          fontSize: style.fontSize,
          padding: `${style.paddingTop} ${style.paddingRight}`,
          height: style.height
        };
      });

      return { secData, headings, buttons, scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth };
    });
    report[r.name].mobile = mobileData;
  }

  await browser.close();
  fs.writeFileSync(path.join(outDir, 'audit_report.json'), JSON.stringify(report, null, 2));
  console.log('UI inspection complete. Report and screenshots saved to:', outDir);
}

inspectPages().catch(err => {
  console.error('Error during UI inspection:', err);
  process.exit(1);
});
