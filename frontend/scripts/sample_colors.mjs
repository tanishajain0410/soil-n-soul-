import puppeteer from 'puppeteer-core';
import fs from 'fs';

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function getColors() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  const b64 = fs.readFileSync('C:/Users/ayush/.gemini/antigravity-ide/brain/9b40dd33-7d41-4f58-b457-33b16a728ef4/.user_uploaded/media_1790768964836.png').toString('base64');
  
  await page.setContent(`
    <img id="img" src="data:image/png;base64,${b64}" />
    <canvas id="cv"></canvas>
  `);

  const colors = await page.evaluate(() => {
    const img = document.getElementById('img');
    const cv = document.getElementById('cv');
    cv.width = img.naturalWidth;
    cv.height = img.naturalHeight;
    const ctx = cv.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const coords = [
      [5, 5], [50, 5], [100, 5], [150, 5], [205, 5],
      [5, 35], [205, 35],
      [5, 65], [100, 65], [205, 65]
    ];
    return coords.map(([x, y]) => {
      const d = ctx.getImageData(x, y, 1, 1).data;
      return { x, y, hex: '#' + [d[0], d[1], d[2]].map(c => c.toString(16).padStart(2, '0')).join('') };
    });
  });

  console.log('Sampled background colors:', colors);
  await browser.close();
}
getColors().catch(console.error);
