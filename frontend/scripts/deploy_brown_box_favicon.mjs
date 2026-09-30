import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const frontendDir = path.resolve('c:/Users/ayush/OneDrive/Desktop/soil new ui/frontend');
const clientPublicDir = path.resolve(frontendDir, '../client/public');

async function deployBrownBoxFavicon() {
  console.log('🚀 Deploying heritage brown box favicon suite with exact Soil N Soul logo...');

  const rawSvg = fs.readFileSync(path.join(frontendDir, 'public/soil-n-soul-logo.svg'), 'utf8');
  const svgBody = rawSvg
    .replace(/<\?xml[\s\S]*?\?>/, '')
    .replace(/<svg[^>]*>/, '')
    .replace('</svg>', '')
    .trim();

  // 1. Vector SVG Favicon with warm heritage brown box & subtle gold border
  const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <radialGradient id="box-bg" cx="35%" cy="30%" r="85%">
      <stop offset="0%" stop-color="#3d2216"/>
      <stop offset="60%" stop-color="#26140d"/>
      <stop offset="100%" stop-color="#180b05"/>
    </radialGradient>
    <linearGradient id="box-gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ecd29b"/>
      <stop offset="50%" stop-color="#dfbf80"/>
      <stop offset="100%" stop-color="#a0742f"/>
    </linearGradient>
  </defs>

  <!-- Warm Heritage Brown Box Container -->
  <rect width="512" height="512" rx="100" fill="url(#box-bg)"/>
  <rect x="7" y="7" width="498" height="498" rx="93" fill="none" stroke="url(#box-gold)" stroke-width="5" stroke-opacity="0.65"/>

  <!-- Exact Soil N Soul Logo Centered Edge-to-Edge -->
  <g transform="translate(14, 186) scale(0.252) translate(-130, -90)">
    ${svgBody}
  </g>
</svg>`;

  fs.writeFileSync(path.join(frontendDir, 'app/icon.svg'), svgFavicon, 'utf8');
  fs.writeFileSync(path.join(frontendDir, 'public/icon.svg'), svgFavicon, 'utf8');
  fs.writeFileSync(path.join(frontendDir, 'public/favicon.svg'), svgFavicon, 'utf8');
  console.log('✓ Vector SVG favicons updated in app/ and public/');

  // 2. Render multi-size PNGs with Puppeteer
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
    </style>
  </head>
  <body>
    ${svgFavicon}
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
  console.log('✓ Multi-resolution PNGs generated (16px, 32px, 48px, 64px, 180px, 192px, 512px)');

  // 3. Assemble Multi-resolution ICO (16, 32, 48)
  const icoSizes = [16, 32, 48];
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // reserved
  icoHeader.writeUInt16LE(1, 2); // ICO type
  icoHeader.writeUInt16LE(icoSizes.length, 4); // count

  let offset = 6 + (16 * icoSizes.length);
  const entryBuffers = [];

  for (const s of icoSizes) {
    const png = pngBuffers[s];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(s === 256 ? 0 : s, 0);
    entry.writeUInt8(s === 256 ? 0 : s, 1);
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bpp
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
  console.log('✓ Multi-layer Windows/Chrome favicon.ico written to app/ and public/');

  // 4. Sync to client/public
  if (fs.existsSync(clientPublicDir)) {
    fs.copyFileSync(path.join(frontendDir, 'public/icon.svg'), path.join(clientPublicDir, 'icon.svg'));
    fs.copyFileSync(path.join(frontendDir, 'public/favicon.ico'), path.join(clientPublicDir, 'favicon.ico'));
    fs.copyFileSync(path.join(frontendDir, 'public/favicon-32x32.png'), path.join(clientPublicDir, 'favicon-32x32.png'));
    fs.copyFileSync(path.join(frontendDir, 'public/favicon-16x16.png'), path.join(clientPublicDir, 'favicon-16x16.png'));
    fs.copyFileSync(path.join(frontendDir, 'public/apple-icon.png'), path.join(clientPublicDir, 'apple-icon.png'));
    console.log('✓ All favicon assets synced to client/public/');
  }

  console.log('🎉 Brown box favicon suite deployed successfully across all sites!');
}

deployBrownBoxFavicon().catch(err => {
  console.error('Deployment error:', err);
  process.exit(1);
});
