const { chromium } = require('playwright');
const routes = process.argv.slice(2);
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  let bad = 0;
  for (const r of routes) {
    const errs = [];
    const onErr = (e) => errs.push('pageerror: ' + e.message);
    const onCon = (m) => m.type() === 'error' && errs.push('console: ' + m.text());
    const onResp = (res) => res.status() >= 400 && errs.push(`${res.status()} ${res.url()}`);
    p.on('pageerror', onErr);
    p.on('console', onCon);
    p.on('response', onResp);
    const res = await p.goto((process.env.BASE_URL ?? 'http://localhost:3100') + r, { waitUntil: 'networkidle' });
    await p.waitForTimeout(150);
    const h1 = await p.locator('h1').first().textContent().catch(() => '(no h1)');
    if (res.status() >= 400 || errs.length) bad++;
    console.log(res.status(), r, '|', (h1 || '').trim().slice(0, 60), errs.length ? '\n   ' + [...new Set(errs)].join('\n   ') : '');
    p.off('pageerror', onErr);
    p.off('console', onCon);
    p.off('response', onResp);
  }
  console.log('pages with problems:', bad);
  await b.close();
})();
