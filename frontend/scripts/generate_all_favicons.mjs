import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const frontendDir = path.resolve('c:/Users/ayush/OneDrive/Desktop/soil new ui/frontend');

async function buildAllFavicons() {
  console.log('Generating complete Soil N Soul favicon suite...');

  const officialSvg = fs.readFileSync(path.join(frontendDir, 'public/soil-n-soul-logo.svg'), 'utf8');
  const cleanedSvg = officialSvg
    .replace(/<\?xml[\s\S]*?\?>/, '')
    .replace('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="2172" height="724">', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2172 724" width="100%" height="100%">')
    .trim();

  // 1. Vector SVG Favicon Content
  const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <radialGradient id="sns-dark-bg" cx="35%" cy="30%" r="85%">
      <stop offset="0%" stop-color="#26150e"/>
      <stop offset="65%" stop-color="#140d09"/>
      <stop offset="100%" stop-color="#0a0503"/>
    </radialGradient>
    <linearGradient id="sns-gold-ring" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f0d59e" stop-opacity="0.75"/>
      <stop offset="50%" stop-color="#dfbf80" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#b88636" stop-opacity="0.65"/>
    </linearGradient>
  </defs>

  <!-- Luxury rounded earthen container -->
  <rect width="512" height="512" rx="116" fill="url(#sns-dark-bg)"/>
  <rect x="8" y="8" width="496" height="496" rx="108" fill="none" stroke="url(#sns-gold-ring)" stroke-width="4.5"/>

  <!-- Centered official Soil N Soul logo with Trishul & Sun -->
  <g transform="translate(32, 181) scale(0.20626)">
    ${cleanedSvg}
  </g>
</svg>`;

  fs.writeFileSync(path.join(frontendDir, 'app/icon.svg'), svgFavicon, 'utf8');
  fs.writeFileSync(path.join(frontendDir, 'public/icon.svg'), svgFavicon, 'utf8');
  fs.writeFileSync(path.join(frontendDir, 'public/favicon.svg'), svgFavicon, 'utf8');
  console.log('✓ Vector SVG favicons generated (app/icon.svg, public/icon.svg, public/favicon.svg)');

  // 2. Render PNG sizes with Puppeteer
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

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
      .badge {
        width: 512px;
        height: 512px;
        border-radius: 116px;
        background: radial-gradient(circle at 35% 30%, #26150e 0%, #140d09 65%, #0a0503 100%);
        border: 4.5px solid rgba(223, 191, 128, 0.5);
        box-shadow: 0 16px 40px rgba(0,0,0,0.7), inset 0 0 50px rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 36px 32px;
        overflow: hidden;
      }
      .svg-wrap {
        width: 448px;
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        filter: drop-shadow(0 6px 16px rgba(0,0,0,0.5));
      }
    </style>
  </head>
  <body>
    <div class="badge">
      <div class="svg-wrap">
        ${cleanedSvg}
      </div>
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
  console.log('✓ PNG favicons generated (512x512, 192x192, 180x180, 32x32, 16x16)');

  // 3. Assemble Windows / Legacy Multi-res ICO file (16, 32, 48)
  const icoSizes = [16, 32, 48];
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // Reserved
  icoHeader.writeUInt16LE(1, 2); // Type: 1 = ICO
  icoHeader.writeUInt16LE(icoSizes.length, 4); // Count

  let offset = 6 + (16 * icoSizes.length);
  const entryBuffers = [];

  for (const s of icoSizes) {
    const png = pngBuffers[s];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(s === 256 ? 0 : s, 0); // Width
    entry.writeUInt8(s === 256 ? 0 : s, 1); // Height
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(png.length, 8); // Size
    entry.writeUInt32LE(offset, 12); // Offset
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
  console.log('✓ Multi-resolution favicon.ico generated for app/ and public/');

  // Clean up any temporary test files
  const testFiles = ['public/test-512.png', 'public/test-192.png', 'public/test-32.png'];
  for (const tf of testFiles) {
    const fullTf = path.join(frontendDir, tf);
    if (fs.existsSync(fullTf)) fs.unlinkSync(fullTf);
  }

  console.log('✨ All favicon suites deployed successfully!');
}

buildAllFavicons().catch(err => {
  console.error('Fatal favicon error:', err);
  process.exit(1);
});
