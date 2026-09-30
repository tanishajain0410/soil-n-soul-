import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const frontendDir = path.resolve('c:/Users/ayush/OneDrive/Desktop/soil new ui/frontend');

async function deployExactClear() {
  console.log('Deploying exact clear logo favicon...');

  const officialSvg = fs.readFileSync(path.join(frontendDir, 'public/soil-n-soul-logo.svg'), 'utf8');
  const svgBody = officialSvg
    .replace(/<\?xml[\s\S]*?\?>/, '')
    .replace(/<svg[^>]*>/, '')
    .replace('</svg>', '')
    .trim();

  // 1. Vector SVG Favicon: exact logo viewBox tightly cropped (130 95 1940 545) with transparent background and subtle dark contour for light mode tabs
  const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="120 90 1960 555">
  <defs>
    <filter id="tab-contour" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="1" stdDeviation="6" flood-color="#000000" flood-opacity="0.9"/>
      <feDropShadow dx="0" dy="0" stdDeviation="2" flood-color="#000000" flood-opacity="0.95"/>
    </filter>
  </defs>
  <g filter="url(#tab-contour)">
    ${svgBody}
  </g>
</svg>`;

  fs.writeFileSync(path.join(frontendDir, 'app/icon.svg'), svgFavicon, 'utf8');
  fs.writeFileSync(path.join(frontendDir, 'public/icon.svg'), svgFavicon, 'utf8');
  fs.writeFileSync(path.join(frontendDir, 'public/favicon.svg'), svgFavicon, 'utf8');
  console.log('✓ Vector SVG favicons updated with tight crop & transparent background');

  // 2. Render PNGs with Puppeteer: edge-to-edge logo with transparent background
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // In HTML, render the exact logo filling 100% of the width
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        width: 512px;
        height: 512px;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .logo-wrap {
        width: 504px;
        height: 144px;
        display: flex;
        align-items: center;
        justify-content: center;
        filter: drop-shadow(0 2px 8px rgba(0,0,0,0.9)) drop-shadow(0 0 2px #000000);
      }
    </style>
  </head>
  <body>
    <div class="logo-wrap">
      <svg viewBox="120 90 1960 555" width="100%" height="100%">
        ${svgBody}
      </svg>
    </div>
  </body>
  </html>
  `;

  await page.setContent(html);

  const pngSizes = [512, 192, 180, 64, 48, 32, 16];
  const pngBuffers = {};

  for (const s of pngSizes) {
    await page.evaluate((size) => {
      document.body.style.transform = `scale(${size / 512})`;
      document.body.style.transformOrigin = '0 0';
      document.body.style.width = '512px';
      document.body.style.height = '512px';
    }, s);
    await page.setViewport({ width: s, height: s });
    const buf = await page.screenshot({ omitBackground: true, type: 'png' });
    pngBuffers[s] = buf;
  }

  await browser.close();

  // Save PNG files
  fs.writeFileSync(path.join(frontendDir, 'public/apple-icon.png'), pngBuffers[180]);
  fs.writeFileSync(path.join(frontendDir, 'public/apple-touch-icon.png'), pngBuffers[180]);
  fs.writeFileSync(path.join(frontendDir, 'public/icon-192.png'), pngBuffers[192]);
  fs.writeFileSync(path.join(frontendDir, 'public/icon-512.png'), pngBuffers[512]);
  fs.writeFileSync(path.join(frontendDir, 'public/favicon-32x32.png'), pngBuffers[32]);
  fs.writeFileSync(path.join(frontendDir, 'public/favicon-16x16.png'), pngBuffers[16]);

  // 3. Assemble Windows / Legacy Multi-res ICO file (16, 32, 48)
  const icoSizes = [16, 32, 48];
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0);
  icoHeader.writeUInt16LE(1, 2);
  icoHeader.writeUInt16LE(icoSizes.length, 4);

  let offset = 6 + (16 * icoSizes.length);
  const entryBuffers = [];

  for (const s of icoSizes) {
    const png = pngBuffers[s];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(s === 256 ? 0 : s, 0);
    entry.writeUInt8(s === 256 ? 0 : s, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    entryBuffers.push(entry);
    offset += png.length;
  }

  const icoBuffer = Buffer.concat([
    icoHeader,
    ...entryBuffers,
    ...icoSizes.map(s => pngBuffers[s])
  ]);

  fs.writeFileSync(path.join(frontendDir, 'app/favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(frontendDir, 'public/favicon.ico'), icoBuffer);

  // Sync to client/public
  const clientPublicDir = path.resolve(frontendDir, '../client/public');
  if (fs.existsSync(clientPublicDir)) {
    fs.copyFileSync(path.join(frontendDir, 'public/icon.svg'), path.join(clientPublicDir, 'icon.svg'));
    fs.copyFileSync(path.join(frontendDir, 'public/favicon.ico'), path.join(clientPublicDir, 'favicon.ico'));
    fs.copyFileSync(path.join(frontendDir, 'public/favicon-32x32.png'), path.join(clientPublicDir, 'favicon-32x32.png'));
    fs.copyFileSync(path.join(frontendDir, 'public/apple-icon.png'), path.join(clientPublicDir, 'apple-icon.png'));
  }

  console.log('✓ Edge-to-edge transparent exact logo deployed successfully!');
}

deployExactClear().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
