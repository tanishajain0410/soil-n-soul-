import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const frontendDir = path.resolve('c:/Users/ayush/OneDrive/Desktop/soil new ui/frontend');

async function testBrownBox() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();

  const userImgB64 = fs.readFileSync('C:/Users/ayush/.gemini/antigravity-ide/brain/9b40dd33-7d41-4f58-b457-33b16a728ef4/.user_uploaded/media_1790768964836.png').toString('base64');

  const officialSvg = fs.readFileSync(path.join(frontendDir, 'public/soil-n-soul-logo.svg'), 'utf8');
  const svgBody = officialSvg.replace(/<\?xml[\s\S]*?\?>/, '').replace(/<svg[^>]*>/, '').replace('</svg>', '').trim();

  // Test different brown box variations
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { background: #1a1a1a; color: #fff; font-family: sans-serif; padding: 20px; }
      .row { display: flex; gap: 24px; margin-bottom: 24px; }
      .card { background: #262626; border-radius: 12px; padding: 16px; width: 280px; text-align: center; }
      .tab-bar-dark { background: #202124; padding: 8px 12px; border-radius: 8px 8px 0 0; display: flex; align-items: center; gap: 8px; margin: 8px auto; width: 200px; font-size: 11px; text-align: left; }
      .tab-bar-light { background: #dee1e6; color: #000; padding: 8px 12px; border-radius: 8px 8px 0 0; display: flex; align-items: center; gap: 8px; margin: 8px auto; width: 200px; font-size: 11px; text-align: left; }
      .icon-slot { width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; }
      .icon-slot-32 { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; }
      .preview-box { width: 128px; height: 128px; margin: 10px auto; display: flex; align-items: center; justify-content: center; border-radius: 24px; overflow: hidden; border: 1px solid rgba(223,191,128,0.3); }
    </style>
  </head>
  <body>
    <h2>Brown Box Favicon Tests for Soil N Soul</h2>
    <div class="row">

      <!-- V1: Pure Crisp Vector, Edge to Edge in Brown Square -->
      <div class="card">
        <h3 style="color: #dfbf80; margin: 0; font-size: 13px;">V1: Vector Edge-to-Edge in Brown Box</h3>
        <p style="font-size: 10px; color: #aaa;">Warm brown #2b1810 with razor-sharp vector</p>
        
        <div class="preview-box" style="background: radial-gradient(circle, #381f14 0%, #24130b 100%);">
          <div style="width: 120px;">
            <svg viewBox="120 90 1960 555" width="100%">
              ${svgBody}
            </svg>
          </div>
        </div>

        <p style="font-size: 11px; margin: 6px 0; font-weight: bold;">At 16x16 Tab:</p>
        <div class="tab-bar-dark">
          <div class="icon-slot" style="background: #2b1810; border-radius: 3px; padding: 1px;">
            <svg viewBox="120 90 1960 555" width="100%" height="100%">
              ${svgBody}
            </svg>
          </div>
          <span>SoilNSoul Travels</span>
        </div>
        <div class="tab-bar-light">
          <div class="icon-slot" style="background: #2b1810; border-radius: 3px; padding: 1px;">
            <svg viewBox="120 90 1960 555" width="100%" height="100%">
              ${svgBody}
            </svg>
          </div>
          <span>SoilNSoul Travels</span>
        </div>
      </div>

      <!-- V2: High-Contrast Bold Vector in Rich Brown Box -->
      <div class="card">
        <h3 style="color: #dfbf80; margin: 0; font-size: 13px;">V2: Bold Contrast in Warm Brown Box</h3>
        <p style="font-size: 10px; color: #aaa;">Bold stroke tuning so letters don't disappear at 16px</p>
        
        <div class="preview-box" style="background: radial-gradient(circle at 35% 30%, #3e2217 0%, #25140b 100%);">
          <div style="width: 122px;">
            <svg viewBox="120 90 1960 555" width="100%">
              <g stroke="#ffffff" stroke-width="8" stroke-linejoin="round" paint-order="stroke fill">
                ${svgBody}
              </g>
            </svg>
          </div>
        </div>

        <p style="font-size: 11px; margin: 6px 0; font-weight: bold;">At 16x16 Tab:</p>
        <div class="tab-bar-dark">
          <div class="icon-slot" style="background: #25140b; border-radius: 3px; padding: 1px; border: 1px solid rgba(223,191,128,0.3);">
            <svg viewBox="120 90 1960 555" width="100%" height="100%">
              <g stroke="#ffffff" stroke-width="12" stroke-linejoin="round" paint-order="stroke fill">
                ${svgBody}
              </g>
            </svg>
          </div>
          <span>SoilNSoul Travels</span>
        </div>
        <div class="tab-bar-light">
          <div class="icon-slot" style="background: #25140b; border-radius: 3px; padding: 1px; border: 1px solid rgba(223,191,128,0.3);">
            <svg viewBox="120 90 1960 555" width="100%" height="100%">
              <g stroke="#ffffff" stroke-width="12" stroke-linejoin="round" paint-order="stroke fill">
                ${svgBody}
              </g>
            </svg>
          </div>
          <span>SoilNSoul Travels</span>
        </div>
      </div>

      <!-- V3: The Exact Uploaded Image Scaled to Fill Width -->
      <div class="card">
        <h3 style="color: #dfbf80; margin: 0; font-size: 13px;">V3: Direct Uploaded Image</h3>
        <p style="font-size: 10px; color: #aaa;">Exact pixels from uploaded image file</p>
        
        <div class="preview-box" style="background: #25140b;">
          <img src="data:image/png;base64,${userImgB64}" style="width: 124px; height: auto;" />
        </div>

        <p style="font-size: 11px; margin: 6px 0; font-weight: bold;">At 16x16 Tab:</p>
        <div class="tab-bar-dark">
          <div class="icon-slot" style="background: #25140b; border-radius: 3px; overflow: hidden;">
            <img src="data:image/png;base64,${userImgB64}" style="width: 16px; height: auto;" />
          </div>
          <span>SoilNSoul Travels</span>
        </div>
        <div class="tab-bar-light">
          <div class="icon-slot" style="background: #25140b; border-radius: 3px; overflow: hidden;">
            <img src="data:image/png;base64,${userImgB64}" style="width: 16px; height: auto;" />
          </div>
          <span>SoilNSoul Travels</span>
        </div>
      </div>

    </div>
  </body>
  </html>
  `;

  await page.setContent(html);
  await page.setViewport({ width: 920, height: 480 });
  await page.screenshot({ path: path.join(frontendDir, 'public/brown_box_test.png') });
  await browser.close();
  console.log('Saved brown_box_test.png');
}

testBrownBox().catch(console.error);
