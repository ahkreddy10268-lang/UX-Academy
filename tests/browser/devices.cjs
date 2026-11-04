/*
 * Device EMULATION pass (Playwright device descriptors: viewport, DPR, touch,
 * mobile user agent) — not a substitute for real hardware. Checks horizontal
 * overflow, tap-to-open navigation, touch operation of an explorer, and
 * WCAG 2.2 SC 2.5.8 target size (≥ 24 × 24 CSS px, inline text links exempt).
 */
const { chromium, devices } = require('playwright');
const BASE = process.env.BASE_URL ?? 'http://localhost:3100';
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok: !!ok, detail });
const DEVICES = ['iPhone SE', 'iPhone 13', 'Pixel 7', 'Galaxy S9+', 'iPad Mini', 'iPad Pro 11 landscape'];
const PAGES = ['/', '/library', '/library/fitts-law', '/library/double-diamond', '/library/heuristic-evaluation', '/library/gestalt-principles', '/learn/ux-fundamentals', '/learn/ux-fundamentals/lesson/usability', '/formulas', '/formulas/fitts-shannon', '/labs', '/labs/colour-lab', '/labs/jakob-lab', '/labs/steering-lab', '/graph', '/glossary', '/practice', '/me', '/sources'];

(async () => {
  const b = await chromium.launch();
  for (const name of DEVICES) {
    const d = devices[name];
    const ctx = await b.newContext({ ...d });
    const p = await ctx.newPage();
    const errors = [];
    p.on('pageerror', (e) => errors.push(e.message));
    const small = new Set();
    for (const url of PAGES) {
      await p.goto(BASE + url, { waitUntil: 'networkidle' });
      const o = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      check(`${name} ${url}: no horizontal scroll`, o <= 0, `${o}px`);
      const tiny = await p.evaluate(() =>
        [...document.querySelectorAll('a, button, input, select, summary, [role=button]')]
          .filter((el) => el.offsetParent !== null && !el.closest('[aria-hidden=true]'))
          .filter((el) => {
            // inline links inside running text are exempt (2.5.8 "inline" exception)
            if (el.tagName === 'A' && el.closest('p, li, dd, td, figcaption') && getComputedStyle(el).display === 'inline') return false;
            // a checkbox or radio inside its <label>: the whole label is the target
            const host = el.matches('input[type=checkbox], input[type=radio]') && el.closest('label') ? el.closest('label') : el;
            const r = host.getBoundingClientRect();
            if (r.width <= 2 || r.height <= 2 || getComputedStyle(el).clipPath !== 'none') return false; // visually hidden until focused (skip link)
            return r.width < 24 || r.height < 24;
          })
          .map((el) => `${el.tagName.toLowerCase()}:${(el.getAttribute('aria-label') || el.textContent || el.getAttribute('type') || '').trim().slice(0, 24)}`),
      );
      tiny.forEach((t) => small.add(`${url} ${t}`));
    }
    check(`${name}: interactive targets ≥ 24 × 24 px (except inline links)`, small.size === 0, [...small].join(' | '));
    if (d.viewport.width < 1024) {
      await p.goto(BASE + '/library', { waitUntil: 'networkidle' });
      await p.getByRole('button', { name: 'Menu' }).tap();
      check(`${name}: tapping Menu opens the navigation drawer`, await p.locator('#mobile-menu').isVisible());
      await p.getByRole('button', { name: 'Close' }).tap();
    }
    // touch operation of a slider (tap near the track's right end)
    await p.goto(BASE + '/labs/colour-lab', { waitUntil: 'networkidle' });
    const slider = p.getByRole('slider', { name: /^Value/ });
    const box = await slider.boundingBox();
    await slider.tap({ position: { x: box.width - 2, y: box.height / 2 } });
    const v = await slider.inputValue();
    check(`${name}: explorer slider responds to a tap`, +v >= 95, `value ${v}`);
    check(`${name}: no uncaught errors`, errors.length === 0, errors.join(' | '));
    await ctx.close();
  }
  for (const r of results) console.log(r.ok ? 'PASS' : 'FAIL', r.name, r.detail ? `(${r.detail})` : '');
  console.log(`${results.filter((r) => r.ok).length}/${results.length} passed`);
  await b.close();
})().catch((e) => {
  for (const r of results) console.log(r.ok ? 'PASS' : 'FAIL', r.name, r.detail ? `(${r.detail})` : '');
  console.error('ABORTED:', e.message.split('\n')[0]);
  process.exit(1);
});
