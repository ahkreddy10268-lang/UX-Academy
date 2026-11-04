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
  const res = p.locator('section[aria-label=Results]');
  const firstPage = await res.locator('article svg[viewBox="0 0 400 300"]').count();
  check('library grid shows the first page of 24 cards, each with a plate', firstPage === 24, `${firstPage} plates`);
  await res.getByRole('button', { name: /^Show \d+ more$/ }).click();
  const plates = await res.locator('article svg[viewBox="0 0 400 300"]').count();
  check('"Show more" reveals every published card with its plate', plates >= 45, `${plates} plates`);
  check('featured card leads with the flagship concept', (await res.locator('article').first().textContent()).includes("Fitts"));

  // URL state restores filters and view
  await p.goto(BASE + '/library?type=law&view=list&level=beginner', { waitUntil: 'networkidle' });
  const filters = p.getByRole('group', { name: 'Filters' });
  check('URL restores type filter', (await filters.getByLabel('Type', { exact: true }).inputValue()) === 'law');
  check('URL restores view', (await p.getByRole('button', { name: 'List', exact: true }).getAttribute('aria-pressed')) === 'true');
  await p.getByRole('button', { name: 'Grid', exact: true }).click();
  await p.waitForTimeout(200);
  check('changing view updates URL without losing filters', /type=law/.test(p.url()) && /level=beginner/.test(p.url()) && !/view=/.test(p.url()), p.url());
  await p.goto(BASE + '/library', { waitUntil: 'networkidle' });
  await p.getByRole('navigation', { name: 'Browse by knowledge type' }).getByRole('button', { name: /^Heuristic/ }).click();
  await p.waitForTimeout(200);
  check('type strip sets the type filter and URL', /type=heuristic/.test(p.url()) && (await p.getByRole('navigation', { name: 'Browse by knowledge type' }).getByRole('button', { name: /^Heuristic/ }).getAttribute('aria-pressed')) === 'true', p.url());

  // Sort and subcategory are mirrored in the URL
  await p.goto(BASE + '/library', { waitUntil: 'networkidle' });
  await p.getByLabel('Sort', { exact: true }).selectOption('evidence');
  await p.waitForTimeout(200);
  check('sort is mirrored to the URL', /sort=evidence/.test(p.url()), p.url());
  const f2 = p.getByRole('group', { name: 'Filters' });
  check('subcategory is disabled until a subject is chosen', await f2.getByLabel('Subcategory').isDisabled());
  await f2.getByLabel('Subject', { exact: true }).selectOption('psychology');
  const subOpts = await f2.getByLabel('Subcategory').locator('option').count();
  check('choosing a subject enables its subcategories', (await f2.getByLabel('Subcategory').isEnabled()) && subOpts > 1, `${subOpts} options`);
  await f2.getByLabel('Subcategory').selectOption({ index: 1 });
  await p.waitForTimeout(200);
  check('subcategory filter is mirrored to the URL', /domain=psychology/.test(p.url()) && /sub=/.test(p.url()), p.url());

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
  await p.waitForURL('**/lesson/user-experience');
  check('next-lesson navigation advances within the path', p.url().endsWith('/lesson/user-experience'));
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

  // v3 shell: collapsible sidebar persists and shows tooltips when collapsed
  await p.goto(BASE + '/library', { waitUntil: 'networkidle' });
  await p.getByRole('button', { name: 'Collapse sidebar' }).click();
  await p.reload({ waitUntil: 'networkidle' });
  const sideW = await p.evaluate(() => document.querySelector('.app-sidebar').getBoundingClientRect().width);
  check('sidebar collapse persists across reload (76px)', (await p.evaluate(() => document.documentElement.dataset.sidebar)) === 'collapsed' && Math.round(sideW) === 76, `${sideW}px`);
  await p.locator('.app-sidebar a[href="/labs"]').hover();
  check('collapsed sidebar shows a tooltip with the label', await p.locator('.app-sidebar a[href="/labs"] .nav-tip').isVisible());
  check('collapsed nav keeps accessible names', (await p.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Formula Lab' }).count()) === 1);
  check('active page is marked in the sidebar', (await p.locator('.app-sidebar a[aria-current=page]').getAttribute('href')) === '/library');
  await p.getByRole('button', { name: 'Expand sidebar' }).click();
  check('sidebar expands again', (await p.evaluate(() => document.documentElement.dataset.sidebar)) === undefined);

  // Fitts explorer: direction of approach uses the width along the path
  await p.goto(BASE + '/library/fitts-law', { waitUntil: 'networkidle' });
  const ex = p.locator('section[aria-label="Fitts\'s law explorer"]');
  await ex.getByLabel('Direction of approach').fill('90');
  check('approach at 90° measures the target height (W′ = 120)', /W′ 120/.test(await ex.textContent()));

  // New labs
  await p.goto(BASE + '/labs/steering-lab', { waitUntil: 'networkidle' });
  await p.getByRole('button', { name: 'Start' }).click();
  check('steering lab shows a tunnel after Start', (await p.locator('[role=application] svg rect').count()) >= 3);
  await p.goto(BASE + '/labs/cvd-lab', { waitUntil: 'networkidle' });
  check('CVD lab renders typical vision and three dichromacies', (await p.locator('section[aria-label^="Typical"], section[aria-label^="Protanopia"], section[aria-label^="Deuteranopia"], section[aria-label^="Tritanopia"]').count()) === 4);
  await p.getByLabel('Hex value of Error').fill('#ffffff');
  check('CVD lab recomputes from edited colours', (await p.locator('section[aria-label^="Protanopia"]').textContent()).includes('#ffffff'));

  // v4 visual knowledge engine
  for (const [slug, n] of [['fitts-law', 2], ['double-diamond', 1], ['cognitive-load-theory', 2], ['information-architecture', 2], ['user-centred-design', 1], ['gestalt-principles', 2], ['heuristic-evaluation', 2]]) {
    await p.goto(BASE + '/library/' + slug, { waitUntil: 'networkidle' });
    const figs = p.locator('section[aria-labelledby=visual] > div > figure');
    check(`${slug}: ${n} detailed visual explanation(s) with title, takeaway and text version`, (await figs.count()) === n && (await figs.first().getByText('Take away').count()) === 1 && (await figs.first().getByText('Read this diagram as text').count()) === 1);
  }
  await p.goto(BASE + '/library/double-diamond', { waitUntil: 'networkidle' });
  const fig = p.locator('section[aria-labelledby=visual] figure').first();
  await fig.getByText('Read this diagram as text').click();
  check('text version of a diagram expands into an ordered reading', (await fig.locator('details ol li').count()) >= 3 && (await fig.locator('details ol li').first().isVisible()));
  const phaseCounts = await Promise.all(['Discover', 'Define', 'Develop', 'Deliver'].map((w) => fig.getByText(w, { exact: true }).count()));
  check('process diagram names all four phases as real text', phaseCounts.every((c) => c >= 1), phaseCounts.join(','));
  check('concept hero shows an at-a-glance takeaway', (await p.getByText('At a glance ·').count()) === 1);
  await p.goto(BASE + '/library?feature=visual', { waitUntil: 'networkidle' });
  check('library filters concepts that have a detailed diagram (9 after UI Design)', /^9 results/.test(await p.getByText(/^\d+ results?/).textContent()));
  await p.goto(BASE + '/learn/ux-fundamentals', { waitUntil: 'networkidle' });
  check('path page draws a curriculum map with a node per lesson', (await p.locator('ol[aria-label="Curriculum map"] > li').count()) >= 3);

  // Colour explorer and Jakob's law experiment
  await p.goto(BASE + '/labs/colour-lab', { waitUntil: 'networkidle' });
  const cx = p.locator('section[aria-label="Colour: hue, saturation, value explorer"]');
  await cx.getByRole('slider', { name: /^Saturation/ }).fill('100');
  await cx.getByRole('slider', { name: /^Value/ }).fill('100');
  await cx.getByRole('slider', { name: /^Hue/ }).fill('60');
  const yellow = await cx.locator('[aria-live=polite]').textContent();
  check('colour explorer: pure yellow has luminance 0.928 and fails white text', /#ffff00/.test(yellow) && /luminance 0\.928/.test(yellow) && /White text 1\.07:1 \(fails 3:1\)/.test(yellow), yellow.slice(0, 160));
  await cx.getByRole('button', { name: 'Reset' }).click();
  check('colour explorer resets to its starting colour', /#476bb3/.test(await cx.locator('[aria-live=polite]').textContent()));
  await p.goto(BASE + '/labs/jakob-lab', { waitUntil: 'networkidle' });
  await p.getByRole('button', { name: 'Start', exact: true }).click();
  const stage = p.locator('[aria-label="Mock shop page"]');
  for (let t = 0; t < 18; t++) {
    await stage.getByRole('button', { name: 'Start trial' }).click();
    const target = /find “(.+)”/.exec(await p.locator('p[aria-live=polite]').first().textContent())[1];
    const positions = await stage.getByRole('button', { name: target, exact: true }).count();
    if (positions !== 1) check(`Jakob trial ${t}: target appears exactly once`, false, String(positions));
    await stage.getByRole('button', { name: target, exact: true }).click();
  }
  check('Jakob lab: 16 scored trials split 8/8 by position, practice excluded', /Familiar \(top right\)8/.test((await p.locator('table').textContent()).replace(/\s+/g, '')) || /Familiar \(top right\)\s*8/.test(await p.locator('table').textContent()));
  check('Jakob lab explains its result', (await p.getByText('Interpreting your result').count()) === 1);

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
  for (const r of ['/', '/library', '/library/fitts-law', '/library/double-diamond', '/library/information-architecture', '/library/heuristic-evaluation', '/labs/jakob-lab', '/labs/colour-lab', '/learn/ux-fundamentals', '/learn/ux-fundamentals/lesson/usability', '/formulas', '/topics/psychology', '/labs/responsive-lab', '/glossary', '/me']) {
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
