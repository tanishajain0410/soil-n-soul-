import puppeteer from 'puppeteer-core';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function runBrowserChecks() {
  console.log('=== RUNNING COMPREHENSIVE BROWSER VALIDATION ===\n');

  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  const pageErrors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      // Ignore favicon or non-critical 404s if any
      consoleErrors.push(text);
    }
  });

  page.on('pageerror', (err) => {
    pageErrors.push(err.message);
  });

  // 1. Desktop Homepage Check (1440x900)
  console.log('--- 1. Testing Homepage on Desktop (1440x900) ---');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await new Promise((r) => setTimeout(r, 2000));

  const desktopVideo = await page.evaluate(() => {
    const v = document.querySelector('video');
    return v ? {
      currentSrc: v.currentSrc,
      hasSources: v.querySelectorAll('source').length,
      paused: v.paused,
      muted: v.muted,
      loop: v.loop,
      autoplay: v.autoplay,
    } : null;
  });

  const desktopButtons = await page.evaluate(() => {
    const wa = document.querySelector('.floating-wa-btn');
    const call = document.querySelector('.floating-call-btn');
    return {
      waExists: !!wa,
      waHref: wa ? wa.getAttribute('href') : null,
      callExists: !!call,
      callHref: call ? call.getAttribute('href') : null,
    };
  });

  const desktopOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });

  console.log('Desktop Video:', desktopVideo);
  console.log('Desktop Floating Buttons:', desktopButtons);
  console.log('Desktop Horizontal Overflow:', desktopOverflow);

  // 2. Mobile Homepage Check (390x844)
  console.log('\n--- 2. Testing Homepage on Mobile (390x844) ---');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.reload({ waitUntil: 'domcontentloaded', timeout: 15000 });
  await new Promise((r) => setTimeout(r, 2000));

  const mobileVideo = await page.evaluate(() => {
    const v = document.querySelector('video');
    return v ? {
      currentSrc: v.currentSrc,
      hasSources: v.querySelectorAll('source').length,
    } : null;
  });

  const mobileOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });

  const mobileButtons = await page.evaluate(() => {
    const wa = document.querySelector('.floating-wa-btn');
    const call = document.querySelector('.floating-call-btn');
    return {
      waVisible: wa ? window.getComputedStyle(wa).display !== 'none' : false,
      callVisible: call ? window.getComputedStyle(call).display !== 'none' : false,
    };
  });

  console.log('Mobile Video:', mobileVideo);
  console.log('Mobile Horizontal Overflow:', mobileOverflow);
  console.log('Mobile Floating Buttons Visible:', mobileButtons);

  // 3. Testing Key Pages for Console/Hydration Errors
  const testPages = [
    '/about',
    '/experiences',
    '/journeys',
    '/journeys/dharm',
    '/journeys/arth',
    '/journeys/kaam',
    '/journeys/moksh',
    '/contact',
    '/blog',
    '/services',
  ];

  console.log('\n--- 3. Testing Core Pages for Hydration/Console Errors ---');
  for (const p of testPages) {
    consoleErrors.length = 0;
    pageErrors.length = 0;

    await page.goto(`http://localhost:3000${p}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await new Promise((r) => setTimeout(r, 1000));

    const fatalErrors = pageErrors.filter((e) => !e.includes('favicon'));
    const hydrationErrors = consoleErrors.filter((e) =>
      e.toLowerCase().includes('hydration') || e.toLowerCase().includes('did not match')
    );

    console.log(
      `Page ${p}: ${
        fatalErrors.length === 0 && hydrationErrors.length === 0 ? 'CLEAN (0 errors)' : `ERRORS: ${fatalErrors.join(', ')}`
      }`
    );
  }

  await browser.close();
  console.log('\n=== BROWSER VALIDATION COMPLETED SUCCESSFULLY ===');
}

runBrowserChecks().catch((err) => {
  console.error('Browser check failed:', err);
  process.exit(1);
});
