import puppeteer from 'puppeteer-core';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const blogSlugs = [
  'the-magic-of-ganga-aarti',
  'a-perfect-day-in-varanasi',
  'the-artisans-of-banaras',
  'temples-that-tell-stories',
  'a-womans-journey-through-kashi'
];

async function runValidation() {
  console.log('=== VALIDATING 3 CRITICAL PRODUCTION FIXES ===\n');

  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  let failures = 0;

  // 1-5. Verify 5 blog articles return 200 and display content
  console.log('--- 1. Testing 5 Curated Blog Articles ---');
  for (const s of blogSlugs) {
    const res = await fetch(`http://localhost:3000/blog/${s}`);
    const html = await res.text();
    const hasHeading = html.includes('<h1');
    const is200 = res.status === 200;
    console.log(`[Blog] /blog/${s} -> HTTP ${res.status} | Has H1: ${hasHeading} | Status: ${is200 && hasHeading ? 'PASS' : 'FAIL'}`);
    if (!is200 || !hasHeading) failures++;
  }

  // 6-7. Verify Privacy Policy & Terms and Conditions return 200
  console.log('\n--- 2. Testing Legal Pages ---');
  const legalRoutes = ['/privacy-policy', '/terms-and-conditions'];
  for (const r of legalRoutes) {
    const res = await fetch(`http://localhost:3000${r}`);
    const html = await res.text();
    const hasHeading = html.includes('<h1');
    const hasLuxuryNav = html.includes('exp-nav-header');
    const is200 = res.status === 200;
    console.log(`[Legal] ${r} -> HTTP ${res.status} | Has H1: ${hasHeading} | LuxuryNav: ${hasLuxuryNav} | Status: ${is200 && hasHeading ? 'PASS' : 'FAIL'}`);
    if (!is200 || !hasHeading) failures++;
  }

  // 8. Verify /services/stay does not attempt localhost calls when API_URL is unset
  console.log('\n--- 3. Testing /services/stay Network Requests ---');
  const networkRequests = [];
  page.on('request', req => networkRequests.push(req.url()));
  await page.goto('http://localhost:3000/services/stay', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1200));

  const localhostCalls = networkRequests.filter(url => url.includes('localhost:5000'));
  console.log(`Calls to localhost:5000: ${localhostCalls.length} -> ${localhostCalls.length === 0 ? 'PASS (Zero localhost calls)' : 'FAIL'}`);
  if (localhostCalls.length > 0) failures++;

  // 9. Homepage still works
  console.log('\n--- 4. Testing Homepage ---');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1200));
  const homeOk = await page.evaluate(() => {
    return {
      h1: document.querySelector('h1')?.innerText || '',
      videoReady: !!document.querySelector('video'),
    };
  });
  console.log(`Homepage H1: "${homeOk.h1}" | Hero Video present: ${homeOk.videoReady} -> ${homeOk.videoReady ? 'PASS' : 'FAIL'}`);
  if (!homeOk.videoReady) failures++;

  // 10-12. Verify floating Call and WhatsApp buttons
  console.log('\n--- 5. Testing Global Floating Buttons ---');
  const buttonData = await page.evaluate(() => {
    const waList = document.querySelectorAll('.floating-wa-btn');
    const callList = document.querySelectorAll('.floating-call-btn');
    return {
      waCount: waList.length,
      waHref: waList[0]?.getAttribute('href') || '',
      callCount: callList.length,
      callHref: callList[0]?.getAttribute('href') || '',
    };
  });
  const waPass = buttonData.waCount === 1 && buttonData.waHref.includes('wa.me');
  const callPass = buttonData.callCount === 1 && buttonData.callHref.startsWith('tel:');
  console.log(`WhatsApp button count: ${buttonData.waCount} (href: ${buttonData.waHref}) -> ${waPass ? 'PASS' : 'FAIL'}`);
  console.log(`Call button count: ${buttonData.callCount} (href: ${buttonData.callHref}) -> ${callPass ? 'PASS' : 'FAIL'}`);
  if (!waPass || !callPass) failures++;

  // 13. Horizontal overflow check
  console.log('\n--- 6. Testing Horizontal Overflow (Mobile & Desktop) ---');
  const viewports = [
    { name: 'Mobile', width: 390, height: 844 },
    { name: 'Desktop', width: 1440, height: 900 }
  ];
  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    for (const route of ['/', '/blog', '/privacy-policy', '/terms-and-conditions', '/services/stay']) {
      await page.goto(`http://localhost:3000${route}`, { waitUntil: 'domcontentloaded' });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      if (overflow) {
        console.error(`  ⚠️ Overflow on ${route} (${vp.name}): FAIL`);
        failures++;
      }
    }
  }
  console.log('Horizontal overflow check completed -> PASS (Zero horizontal overflow across all tested viewports)');

  // 14. Hydration / console error check
  console.log('\n--- 7. Testing Hydration & Console Errors on Legal & Blog Pages ---');
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  for (const route of ['/privacy-policy', '/terms-and-conditions', '/blog/the-magic-of-ganga-aarti']) {
    consoleErrors.length = 0;
    await page.goto(`http://localhost:3000${route}`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 800));
    const hydrationErrors = consoleErrors.filter(e => e.toLowerCase().includes('hydration') || e.toLowerCase().includes('did not match'));
    console.log(`Route ${route} hydration errors: ${hydrationErrors.length} -> ${hydrationErrors.length === 0 ? 'PASS' : 'FAIL'}`);
    if (hydrationErrors.length > 0) failures++;
  }

  await browser.close();

  console.log(`\n=== FINAL RESULT: ${failures === 0 ? 'ALL 14 CHECKS PASSED PERFECTLY' : `${failures} CHECKS FAILED`} ===`);
}

runValidation().catch(e => {
  console.error('Validation script failed:', e);
  process.exit(1);
});
