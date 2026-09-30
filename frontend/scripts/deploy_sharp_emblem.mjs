import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const frontendDir = path.resolve('c:/Users/ayush/OneDrive/Desktop/soil new ui/frontend');

async function deploySharpEmblem() {
  console.log('Deploying ultra-sharp Soil N Soul emblem favicon...');

  const officialSvg = fs.readFileSync(path.join(frontendDir, 'public/soil-n-soul-logo.svg'), 'utf8');

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setContent(`<!DOCTYPE html><html><body>${officialSvg}</body></html>`);

  const { trishulHtml, sunHtml } = await page.evaluate(() => {
    const paths = Array.from(document.querySelectorAll('path'));
    const trishulPaths = paths.filter(p => {
      const tr = p.getAttribute('transform') || '';
      const m = tr.match(/translate\(([\d.]+)/);
      return m && parseFloat(m[1]) > 1800;
    });
    const sunPaths = paths.filter(p => {
      const tr = p.getAttribute('transform') || '';
      const m = tr.match(/translate\(([\d.]+),\s*([\d.]+)/);
      return m && parseFloat(m[1]) >= 540 && parseFloat(m[1]) <= 760 && parseFloat(m[2]) < 310;
    });

    return {
      trishulHtml: trishulPaths.map(p => p.outerHTML).join('\n'),
      sunHtml: sunPaths.map(p => p.outerHTML).join('\n')
    };
  });

  // 1. Vector SVG Favicon: Ultra-sharp Golden Trishul & Sun Emblem
  // Fits 512x512 with proper bold stroke for crisp 16x16 tab rendering
  const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <filter id="emblem-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="6" flood-color="#000000" flood-opacity="0.85"/>
      <feDropShadow dx="0" dy="0" stdDeviation="2" flood-color="#000000" flood-opacity="0.95"/>
    </filter>
  </defs>
  <g filter="url(#emblem-shadow)" stroke="#F5A036" stroke-width="12" stroke-linejoin="round">
    <!-- Radiant Sun centered at top -->
    <g transform="translate(256, 95) scale(0.72) translate(-647, -204)">
      ${sunHtml}
    </g>
    <!-- Sacred Golden Trishul centered -->
    <g transform="translate(256, 312) scale(0.74) translate(-1932, -390)">
      ${trishulHtml}
    </g>
  </g>
</svg>`;

  fs.writeFileSync(path.join(frontendDir, 'app/icon.svg'), svgFavicon, 'utf8');
  fs.writeFileSync(path.join(frontendDir, 'public/icon.svg'), svgFavicon, 'utf8');
  fs.writeFileSync(path.join(frontendDir, 'public/favicon.svg'), svgFavicon, 'utf8');
  console.log('✓ Vector SVG favicons updated with crisp emblem');

  // 2. Render multi-size PNGs
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
      .icon-wrap {
        width: 512px;
        height: 512px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </style>
  </head>
  <body>
    <div class="icon-wrap">
      ${svgFavicon}
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

  // 3. Assemble Multi-resolution ICO (16, 32, 48)
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

  console.log('✓ Ultra-sharp emblem favicon deployed successfully!');
}

deploySharpEmblem().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
