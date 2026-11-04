/*
 * Keyboard-only paths and accessibility-tree structure.
 * Every interaction below is driven by key presses only (no mouse), and the
 * structural checks read Chromium's accessibility tree (what assistive
 * technology is given). This is NOT a screen-reader test: it cannot tell how
 * VoiceOver, NVDA or TalkBack actually announce or navigate the page.
 */
const { chromium, devices } = require('playwright');
const BASE = process.env.BASE_URL ?? 'http://localhost:3100';
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok: !!ok, detail });
const active = (p) => p.evaluate(() => {
  const el = document.activeElement;
  return { tag: el?.tagName, name: (el?.getAttribute('aria-label') || el?.textContent || '').trim().slice(0, 60), id: el?.id, outline: el ? getComputedStyle(el).outlineStyle : '' };
});
async function tabUntil(p, pred, max = 80) {
  for (let i = 0; i < max; i++) {
    await p.keyboard.press('Tab');
    const a = await active(p);
    if (pred(a)) return a;
  }
  return null;
}

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  p.on('pageerror', (e) => errors.push(e.message));

  // 1. Skip link → main
  await p.goto(BASE + '/library/fitts-law', { waitUntil: 'networkidle' });
  await p.keyboard.press('Tab');
  let a = await active(p);
  check('first Tab reaches the skip link', /Skip to content/.test(a.name), a.name);
  await p.keyboard.press('Enter');
  check('skip link moves to main content', (await p.evaluate(() => location.hash)) === '#main');

  // 2. Sidebar reachable, current page exposed, focus visible
  await p.goto(BASE + '/library', { waitUntil: 'networkidle' });
  a = await tabUntil(p, (x) => x.tag === 'A' && x.name.startsWith('Formula Lab'));
  check('sidebar links are reachable by Tab', a !== null);
  check('focused nav link shows a visible focus outline', a && a.outline !== 'none', a?.outline);
  check('current page is exposed as aria-current', (await p.locator('nav[aria-label=Primary] a[aria-current=page]').textContent()).includes('Knowledge Library'));

  // 3. Collapse sidebar by keyboard; tooltip on focus; names kept
  a = await tabUntil(p, (x) => /Collapse sidebar/.test(x.name));
  check('collapse control is reachable by Tab', a !== null);
  await p.keyboard.press('Enter');
  check('Enter collapses the sidebar', (await p.evaluate(() => document.documentElement.dataset.sidebar)) === 'collapsed');
  await p.locator('.app-sidebar a[href="/labs"]').focus();
  check('collapsed nav shows its label as a tooltip on keyboard focus', await p.locator('.app-sidebar a[href="/labs"] .nav-tip').isVisible());
  check('tooltip does not double the accessible name ("Labs", not "Labs Labs")', (await p.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Labs', exact: true }).count()) === 1);
  await p.locator('.app-sidebar button[aria-label="Expand sidebar"]').focus();
  await p.keyboard.press('Enter');

  // 4. Search dialog by keyboard
  await p.goto(BASE + '/', { waitUntil: 'networkidle' });
  await p.keyboard.press('/');
  const dlg = p.getByRole('dialog', { name: 'Search UX Academy' });
  check('"/" opens the search dialog', await dlg.isVisible());
  await p.keyboard.type('double diamond');
  await dlg.getByRole('option').first().waitFor({ timeout: 15000 });
  await p.keyboard.press('ArrowDown');
  await p.keyboard.press('ArrowUp');
  await p.keyboard.press('Enter');
  await p.waitForURL(/double-diamond/, { timeout: 10000 }).catch(() => {});
  check('arrow keys + Enter open a search result', /\/library\/double-diamond/.test(p.url()), p.url());

  // 5. Visual figure text version by keyboard
  const summary = p.locator('section[aria-labelledby=visual] figure summary').first();
  await summary.focus();
  await p.keyboard.press('Enter');
  check('"Read this diagram as text" opens with Enter', await p.locator('section[aria-labelledby=visual] figure details').first().evaluate((d) => d.open));

  // 6. Explorer sliders by keyboard (Fitts and colour)
  await p.goto(BASE + '/library/fitts-law', { waitUntil: 'networkidle' });
  const ex = p.locator('section[aria-label="Fitts\'s law explorer"]');
  await ex.getByRole('slider', { name: /^Direction of approach/ }).focus();
  await p.keyboard.press('End');
  check('approach slider operable with End key (W′ = 120)', /W′ 120/.test(await ex.textContent()));
  await p.goto(BASE + '/library/colour-contrast-ratio', { waitUntil: 'networkidle' });
  const cx = p.locator('section[aria-label="Colour: hue, saturation, value explorer"]');
  await cx.getByRole('slider', { name: /^Hue/ }).focus();
  await p.keyboard.press('Home');
  await cx.getByRole('slider', { name: /^Saturation/ }).focus();
  await p.keyboard.press('End');
  await cx.getByRole('slider', { name: /^Value/ }).focus();
  await p.keyboard.press('End');
  check('colour sliders operable by keyboard (Home/End → #ff0000)', /#ff0000/.test(await cx.locator('[aria-live=polite]').textContent()));
  check('colour readout is a live region', (await cx.locator('[aria-live=polite]').count()) === 1);

  // 7. Library controls by keyboard
  await p.goto(BASE + '/library', { waitUntil: 'networkidle' });
  await p.getByRole('button', { name: 'List', exact: true }).focus();
  await p.keyboard.press('Space');
  await p.waitForFunction(() => /view=list/.test(location.search), null, { timeout: 5000 }).catch(() => {});
  check('view toggle operable with Space', /view=list/.test(p.url()) && (await p.getByRole('button', { name: 'List', exact: true }).getAttribute('aria-pressed')) === 'true', p.url());
  await p.getByRole('group', { name: 'Filters' }).getByLabel('Includes').focus();
  await p.keyboard.press('ArrowDown');
  await p.keyboard.press('ArrowDown');
  await p.keyboard.press('ArrowDown');
  await p.waitForTimeout(200);
  check('filter select operable with arrow keys', /feature=/.test(p.url()), p.url());

  // 8. Jakob lab can be started and answered from the keyboard (and says timing assumes a pointer)
  await p.goto(BASE + '/labs/jakob-lab', { waitUntil: 'networkidle' });
  await p.getByRole('button', { name: 'Start', exact: true }).focus();
  await p.keyboard.press('Enter');
  await p.getByRole('button', { name: 'Start trial' }).focus();
  await p.keyboard.press('Enter');
  const prompt = await p.locator('p[aria-live=polite]').first().textContent();
  const target = /find “(.+)”/.exec(prompt)?.[1];
  await p.locator('[aria-label="Mock shop page"]').getByRole('button', { name: target, exact: true }).focus();
  await p.keyboard.press('Enter');
  check('Jakob lab trial can be completed by keyboard', /ms/.test(await p.locator('p[aria-live=assertive]').textContent()));

  // 9. Mobile drawer: focus moves in, is contained, Escape returns focus
  const m = await b.newContext({ ...devices['iPhone 13'] });
  const mp = await m.newPage();
  await mp.goto(BASE + '/library', { waitUntil: 'networkidle' });
  await mp.getByRole('button', { name: 'Menu' }).focus();
  await mp.keyboard.press('Enter');
  a = await active(mp);
  check('opening the drawer moves focus into it', /Close/.test(a.name), a.name);
  // A native modal <dialog> makes the page behind it inert. Tabbing past the last item may move focus to the
  // browser's own UI (document.activeElement becomes <body>); what must never happen is focus landing on page content behind.
  let leakedTo = '';
  for (let i = 0; i < 30; i++) {
    await mp.keyboard.press('Tab');
    const where = await mp.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return 'browser';
      return el.closest('#mobile-menu') ? 'drawer' : el.tagName + ':' + (el.textContent || '').trim().slice(0, 30);
    });
    if (where !== 'drawer' && where !== 'browser') { leakedTo = where; break; }
  }
  check('focus never reaches page content behind the open drawer (modal, inert background)', leakedTo === '', leakedTo);
  await mp.keyboard.press('Escape');
  a = await active(mp);
  check('Escape closes the drawer and returns focus to Menu', !(await mp.locator('#mobile-menu').isVisible()) && /Menu/.test(a.name), a.name);
  await m.close();

  // 10. Accessibility-tree structure on key pages
  const pages = ['/', '/library', '/library/fitts-law', '/library/double-diamond', '/library/heuristic-evaluation', '/learn/ux-fundamentals', '/formulas/fitts-shannon', '/labs/jakob-lab', '/labs/colour-lab', '/me'];
  for (const url of pages) {
    await p.goto(BASE + url, { waitUntil: 'networkidle' });
    const s = await p.evaluate(() => {
      const hs = [...document.querySelectorAll('main h1, main h2, main h3, main h4')].filter((h) => h.offsetParent !== null || h.closest('details'));
      const levels = hs.map((h) => +h.tagName[1]);
      const skips = levels.filter((l, i) => i > 0 && l > levels[i - 1] + 1).length;
      const h1 = document.querySelectorAll('main h1').length;
      const navs = [...document.querySelectorAll('nav')].filter((n) => n.offsetParent !== null).map((n) => n.getAttribute('aria-label') || '');
      const dupNav = navs.length !== new Set(navs).size;
      const unnamedImg = [...document.querySelectorAll('[role=img], svg[role=img]')].filter((e) => !e.getAttribute('aria-label') && !e.querySelector('title') && !e.getAttribute('aria-labelledby')).length;
      const unnamedBtn = [...document.querySelectorAll('button')].filter((x) => !(x.getAttribute('aria-label') || x.textContent.trim())).length;
      return { h1, skips, dupNav, navs, unnamedImg, unnamedBtn, main: document.querySelectorAll('main').length };
    });
    check(`${url}: one main, one h1, no heading-level skips`, s.main === 1 && s.h1 === 1 && s.skips === 0, JSON.stringify({ h1: s.h1, skips: s.skips }));
    check(`${url}: every image role and button has a name; nav landmarks uniquely named`, s.unnamedImg === 0 && s.unnamedBtn === 0 && !s.dupNav, JSON.stringify({ img: s.unnamedImg, btn: s.unnamedBtn, navs: s.navs }));
  }

  // 11. Aria snapshot of one Level-2 figure (what AT receives)
  await p.goto(BASE + '/library/double-diamond', { waitUntil: 'networkidle' });
  const snap = await p.locator('section[aria-labelledby=visual] figure').first().ariaSnapshot();
  check('process diagram exposes its phases, decision and takeaway to the accessibility tree', ['Discover', 'Define', 'Develop', 'Deliver', 'Decision', 'Take away'].every((w) => snap.includes(w)));

  check('no uncaught page errors', errors.length === 0, errors.join(' | '));
  for (const r of results) console.log(r.ok ? 'PASS' : 'FAIL', r.name, r.detail ? `(${r.detail})` : '');
  console.log(`${results.filter((r) => r.ok).length}/${results.length} passed`);
  await b.close();
})().catch((e) => {
  for (const r of results) console.log(r.ok ? 'PASS' : 'FAIL', r.name, r.detail ? `(${r.detail})` : '');
  console.error('ABORTED:', e.message.split('\n')[0]);
  process.exit(1);
});
