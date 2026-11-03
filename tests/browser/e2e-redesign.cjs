/* Interaction checks for the visual redesign (plates, explorers, library URL state, lessons). */
const { chromium, devices } = require('playwright');
const BASE = process.env.BASE_URL ?? 'http://localhost:3100';
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok: !!ok, detail });

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  const p = await ctx.newPage();
  const errors = [];
  p.on('pageerror', (e) => errors.push(e.message));

  // Library grid with plates
  await p.goto(BASE + '/library', { waitUntil: 'networkidle' });
  const plates = await p.locator('section[aria-label=Results] article svg[viewBox="0 0 400 300"]').count();
  check('library grid renders a plate per published card', plates >= 45, `${plates} plates`);

  // URL state restores filters and view
  await p.goto(BASE + '/library?type=law&view=list&level=beginner', { waitUntil: 'networkidle' });
  check('URL restores type filter', (await p.locator('#' + (await p.locator('aside[aria-label=Filters] select').nth(1).getAttribute('id'))).inputValue()) === 'law');
  check('URL restores view', (await p.getByRole('button', { name: 'List', exact: true }).getAttribute('aria-pressed')) === 'true');
  await p.getByRole('button', { name: 'Grid', exact: true }).click();
  await p.waitForTimeout(200);
  check('changing view updates URL without losing filters', /type=law/.test(p.url()) && /level=beginner/.test(p.url()) && !/view=/.test(p.url()), p.url());
  await p.goto(BASE + '/library', { waitUntil: 'networkidle' });
  await p.getByRole('button', { name: /^Heuristic/ }).click();
  await p.waitForTimeout(200);
  check('type strip sets the type filter and URL', /type=heuristic/.test(p.url()) && (await p.getByRole('button', { name: /^Heuristic/ }).getAttribute('aria-pressed')) === 'true', p.url());

  // Card bookmark persists to My learning
  await p.goto(BASE + '/library', { waitUntil: 'networkidle' });
  await p.getByRole('button', { name: 'Save Card Sorting' }).click();
  await p.goto(BASE + '/me', { waitUntil: 'networkidle' });
  check('card bookmark appears in My learning', (await p.locator('#saved').locator('..').textContent()).includes('Card Sorting'));

  // Concept explorer uses lib/formulas
  await p.goto(BASE + '/library/fitts-law', { waitUntil: 'networkidle' });
  const dSlider = p.getByRole('slider', { name: 'Distance D' });
  await dSlider.focus();
  await p.keyboard.press('End');
  check('Fitts explorer recomputes ID from slider (log2(320/32+1) = 3.46)', /ID = 3\.46 bits/.test(await p.locator('section[aria-label="Fitts\'s law explorer"]').textContent()));
  const pause = p.getByRole('button', { name: /Pause animation/ });
  await pause.click();
  check('pause control stops hero animation', (await p.locator('[data-paused="true"]').count()) === 1 && (await p.getByRole('button', { name: /Play animation/ }).getAttribute('aria-pressed')) === 'true');
  check('hero plate has accessible name and description', (await p.locator('header svg[role=img] title').first().textContent()).includes("Fitts"));

  // Formula curve data table
  const showData = p.getByRole('button', { name: 'Show data' }).first();
  await showData.click();
  check('formula curve exposes its data as a table', await p.getByRole('group', { name: 'Curve data' }).isVisible());

  // Lessons and level test
  await p.goto(BASE + '/learn/ux-fundamentals', { waitUntil: 'networkidle' });
  await p.getByRole('link', { name: 'Start with lesson 1' }).click();
  await p.waitForURL('**/lesson/usability');
  check('lesson page shows knowledge check', await p.getByRole('heading', { name: 'Knowledge check' }).isVisible());
  await p.getByRole('link', { name: /Next lesson/ }).click();
  await p.waitForURL('**/lesson/user-centred-design');
  check('next-lesson navigation advances within the path', p.url().endsWith('/lesson/user-centred-design'));
  await p.goto(BASE + '/learn/ux-fundamentals/level/1', { waitUntil: 'networkidle' });
  check('level test draws questions from the level', /Question 1 of \d+/.test(await p.locator('main').textContent()));

  // Glossary filter and formula search
  await p.goto(BASE + '/glossary', { waitUntil: 'networkidle' });
  await p.getByLabel('Filter terms').fill('heuristic');
  check('glossary filter narrows terms', /^\d+ of 114$/.test((await p.getByText(/of 114$/).textContent()).trim()) && !(await p.getByText('114 of 114').count()));
  await p.goto(BASE + '/formulas', { waitUntil: 'networkidle' });
  await p.getByLabel('Find a formula').fill('SUS');
  check('formula search filters the index', (await p.locator('main h3').count()) >= 1 && (await p.locator('main h3').count()) <= 3, `${await p.locator('main h3').count()} shown`);

  // Graph uses subject palettes
  await p.goto(BASE + '/graph', { waitUntil: 'networkidle' });
  check('graph nodes carry subject palettes', (await p.locator('svg g[class*="cat-"]').count()) > 40);

  // Reduced motion disables plate animation
  const rm = await b.newContext({ reducedMotion: 'reduce' });
  const rp = await rm.newPage();
  await rp.goto(BASE + '/', { waitUntil: 'networkidle' });
  const anim = await rp.evaluate(() => getComputedStyle(document.querySelector('.anim-travel')).animationName);
  check('prefers-reduced-motion disables animations', anim === 'none', anim);
  await rm.close();

  // Mobile filter drawer
  const m = await b.newContext({ ...devices['iPhone 13'] });
  const mp = await m.newPage();
  await mp.goto(BASE + '/library', { waitUntil: 'networkidle' });
  await mp.getByRole('button', { name: /^Filters/ }).click();
  const dlg = mp.getByRole('dialog', { name: 'Filters' });
  check('mobile filter drawer opens', await dlg.isVisible());
  await dlg.getByLabel('Subject').selectOption('psychology');
  await dlg.getByRole('button', { name: /^Show \d+ results?$/ }).click();
  check('drawer applies filter and closes', !(await dlg.isVisible()) && /domain=psychology/.test(mp.url()), mp.url());
  for (const r of ['/', '/library', '/library/fitts-law', '/learn/ux-fundamentals', '/learn/ux-fundamentals/lesson/usability', '/formulas', '/topics/psychology', '/labs/responsive-lab', '/glossary', '/me']) {
    await mp.goto(BASE + r, { waitUntil: 'networkidle' });
    const o = await mp.evaluate(() => document.documentElement.scrollWidth - 390);
    check(`no horizontal scroll at 390px ${r}`, o <= 0, `${o}px`);
  }
  await m.close();

  check('no uncaught page errors', errors.length === 0, errors.join(' | '));
  for (const r of results) console.log(r.ok ? 'PASS' : 'FAIL', r.name, r.detail ? `(${r.detail})` : '');
  console.log(`${results.filter((r) => r.ok).length}/${results.length} passed`);
  await b.close();
})().catch((e) => {
  for (const r of results) console.log(r.ok ? 'PASS' : 'FAIL', r.name, r.detail ? `(${r.detail})` : '');
  console.error('ABORTED:', e.message.split('\n')[0]);
  process.exit(1);
});
