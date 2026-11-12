const { chromium, devices } = require('playwright');
const fs = require('fs');
const BASE = process.env.BASE_URL ?? 'http://localhost:3100';
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok: !!ok, detail });

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, acceptDownloads: true });
  const p = await ctx.newPage();
  const errors = [];
  p.on('pageerror', (e) => errors.push(e.message));

  // 1. Skip link is first focusable
  await p.goto(BASE + '/', { waitUntil: 'networkidle' });
  await p.keyboard.press('Tab');
  check('skip link first in tab order', (await p.evaluate(() => document.activeElement?.textContent)) === 'Skip to content');

  // 2. Command search via keyboard
  await p.keyboard.press('Escape');
  await p.locator('body').click({ position: { x: 5, y: 600 } });
  await p.keyboard.press('/');
  const input = p.locator('dialog').getByRole('combobox');
  await input.waitFor();
  await input.fill('fitts');
  await p.getByRole('option').first().waitFor({ timeout: 5000 });
  const firstOpt = await p.getByRole('option').first().textContent();
  check('search finds Fitts', /Fitts/.test(firstOpt), firstOpt.slice(0, 60));
  await input.press('Enter');
  await p.waitForURL('**/library/fitts-law');
  check('search Enter navigates to entry', p.url().endsWith('/library/fitts-law'));

  // full-text search: a term that only appears in body text
  await p.keyboard.press('/');
  await p.locator('dialog').getByRole('combobox').fill('reciprocal tapping');
  await p.getByRole('option').first().waitFor({ timeout: 5000 });
  check('full-text search hits body content', /Fitts/.test(await p.getByRole('option').first().textContent()));
  await p.keyboard.press('Escape');

  // 3. Level tabs + persistence
  await p.getByRole('tab', { name: /Systems Architect/ }).click();
  check('advanced panel visible', await p.locator('#panel-advanced').isVisible());
  check('beginner panel hidden', !(await p.locator('#panel-beginner').isVisible()));
  await p.getByRole('tab', { name: /Systems Architect/ }).press('ArrowLeft');
  check('arrow key moves to intermediate', (await p.getByRole('tab', { name: /Practitioner/ }).getAttribute('aria-selected')) === 'true');

  // 4. Bookmark + complete + notes
  await p.getByRole('button', { name: 'Save', exact: true }).click();
  await p.getByRole('button', { name: 'Mark complete' }).click();
  await p.getByLabel(/My notes on Fitts/).fill('Ratio of D to W is what matters.');
  await p.waitForTimeout(900);
  await p.reload({ waitUntil: 'networkidle' });
  check('bookmark persists after reload', (await p.getByRole('button', { name: 'Saved' }).getAttribute('aria-pressed')) === 'true');
  check('completion persists', await p.getByRole('button', { name: 'Completed' }).isVisible());
  check('note persists', (await p.getByLabel(/My notes on Fitts/).inputValue()) === 'Ratio of D to W is what matters.');
  check('level preference persists', (await p.getByRole('tab', { name: /Practitioner/ }).getAttribute('aria-selected')) === 'true');

  // 5. Calculator: Fitts D=300 W=20 → 4 bits
  const calc = p.getByRole('region', { name: /Fitts's law calculator/ });
  await calc.getByLabel('Distance D').fill('300');
  await calc.getByLabel('Width W').fill('20');
  check('Fitts calculator ID = 4 bits', (await calc.textContent()).includes('4 bits'));
  await calc.getByLabel('Width W').fill('0');
  check('Fitts calculator validates W > 0', /Width W must be greater than zero/.test(await calc.textContent()));
  await calc.getByRole('button', { name: 'Reset' }).click();
  check('Reset restores defaults', (await calc.getByLabel('Distance D').inputValue()) === '400');
  await calc.getByRole('button', { name: 'Save result' }).click();

  // 6. Quiz: answer the formula question correctly
  const quiz = p.locator('#practice').locator('..');
  const firstQ = p.locator('fieldset').filter({ hasText: 'Question 1' }).first();
  await p.getByRole('button', { name: /Both changes are equally effective/ }).click();
  check('quiz marks correct answer', await p.getByText('Correct.', { exact: true }).isVisible());
  await p.getByRole('button', { name: 'Next question' }).click();
  await p.getByRole('button', { name: /^A\s*True/ }).click();
  check('quiz shows wrong-answer feedback', await p.getByText(/Not quite — the answer is B/).isVisible());
  check('quiz links to revision', await p.getByText('Revise:').isVisible());

  // 7. Flashcards
  await p.getByRole('button', { name: /Add 3 flashcards/ }).click();
  await p.goto(BASE + '/practice/flashcards', { waitUntil: 'networkidle' });
  await p.getByRole('button', { name: 'Show answer' }).click();
  await p.getByRole('button', { name: /Remembered/ }).click();
  const fcText = await p.locator('main').textContent();
  check('flashcard review advances', /2 due|Nothing due/.test(fcText), fcText.match(/\d+ due/)?.[0]);

  // 8. SUS calculator default responses 4,2,4,1,4,2,5,2,4,2 → (3+3+3+4+3+3+4+3+3+3)=32 ×2.5 = 80
  await p.goto(BASE + '/formulas/sus-score', { waitUntil: 'networkidle' });
  check('SUS calculator = 80', /80/.test(await p.getByRole('region', { name: /System Usability Scale calculator/ }).textContent()));

  // 9. Contrast calculator default #4b4740 on #faf8f4 ≈ 8.70
  await p.goto(BASE + '/formulas/wcag-contrast-ratio', { waitUntil: 'networkidle' });
  check('contrast calculator ≈ 8.70:1', /8\.70 : 1/.test(await p.getByRole('region', { name: /contrast ratio calculator/i }).textContent()));

  // 10. Library filters
  await p.goto(BASE + '/library', { waitUntil: 'networkidle' });
  const before = await p.getByText(/^\d+ results?/).textContent();
  await p.getByRole('group', { name: 'Filters' }).getByLabel('Type', { exact: true }).selectOption('law');
  const after = await p.getByText(/^\d+ results?/).textContent();
  check('library type filter narrows results', parseInt(after) < parseInt(before) && parseInt(after) > 0, `${before} → ${after}`);
  await p.getByLabel('Search the library').fill('memory');
  await p.waitForTimeout(800);
  check('library search + filter combine', /result/.test(await p.getByText(/results?/).first().textContent()));

  // 11. My learning shows bookmark, note, calc; export works
  await p.goto(BASE + '/me', { waitUntil: 'networkidle' });
  const me = await p.locator('main').textContent();
  check('dashboard lists saved entry', me.includes("Fitts's Law"));
  check('dashboard shows saved calculation', me.includes('ID 3.459 bits'));
  const [dl] = await Promise.all([p.waitForEvent('download'), p.getByRole('button', { name: /Export backup/ }).click()]);
  const path = await dl.path();
  const json = JSON.parse(fs.readFileSync(path, 'utf8'));
  check('export contains bookmark and note', json.app === 'ux-academy' && json.data.bookmarks['fitts-law'] && json.data.notes['fitts-law']);
  const [ndl] = await Promise.all([p.waitForEvent('download'), p.getByRole('button', { name: /Export notes as Markdown/ }).click()]);
  check('markdown notes export', fs.readFileSync(await ndl.path(), 'utf8').includes('Ratio of D to W'));

  // 12. Import into a fresh context
  const ctx2 = await b.newContext();
  const p2 = await ctx2.newPage();
  await p2.goto(BASE + '/me', { waitUntil: 'networkidle' });
  p2.on('dialog', (d) => d.accept());
  await p2.locator('input[type=file]').setInputFiles(path);
  await p2.getByText('Backup imported.').waitFor({ timeout: 5000 });
  check('import restores data in another browser', (await p2.locator('main').textContent()).includes("Fitts's Law"));
  await ctx2.close();

  // 13. Theme toggle
  await p.getByRole('button', { name: /Theme:/ }).click();
  check('theme toggles to light', (await p.evaluate(() => document.documentElement.dataset.theme)) === 'light');
  await p.getByRole('button', { name: /Theme:/ }).click();
  check('theme toggles to dark', (await p.evaluate(() => document.documentElement.dataset.theme)) === 'dark');
  await p.reload({ waitUntil: 'networkidle' });
  check('theme persists without flash (set before paint)', (await p.evaluate(() => document.documentElement.dataset.theme)) === 'dark');
  await Promise.resolve();

  // 14. Graph focus
  await p.goto(BASE + '/graph?focus=fitts-law', { waitUntil: 'networkidle' });
  check('graph focus panel shows relations', (await p.locator('main aside').textContent()).includes('Steering'));

  // 15. Lab: Fitts experiment runs a trial
  await p.goto(BASE + '/labs/fitts-lab', { waitUntil: 'networkidle' });
  await p.getByRole('button', { name: 'Start experiment' }).click();
  for (let i = 0; i < 4; i++) {
    await p.getByRole('button', { name: 'Start trial' }).click();
    await p.locator('[data-target]').click();
  }
  check('Fitts lab records trials', (await p.locator('main').textContent()).includes('Trial 5 of 36'));

  // 15b. Async State Lab: error keeps input and offers retry; results are announced
  await p.goto(BASE + '/labs/async-state-lab', { waitUntil: 'networkidle' });
  await p.getByLabel('Response time').fill('300');
  await p.getByLabel('Filter loans').fill('eliot');
  await p.getByLabel('Simulate a network error').check();
  await p.getByRole('button', { name: 'Load loans' }).click();
  await p.getByRole('button', { name: 'Try again' }).waitFor({ timeout: 5000 });
  check('Async lab keeps input on error', (await p.getByLabel('Filter loans').inputValue()) === 'eliot');
  await p.getByLabel('Simulate a network error').uncheck();
  await p.getByRole('button', { name: 'Try again' }).click();
  await p.getByText('Your loans, 2').waitFor({ timeout: 5000 });
  const announced = await p.locator('main').textContent();
  check('Async lab retry resolves and announces count', announced.includes('2 loans shown for “eliot”.'));

  // 16. Mobile: menu
  const m = await b.newContext({ ...devices['iPhone 13'] });
  const mp = await m.newPage();
  await mp.goto(BASE + '/library/cognitive-load-theory', { waitUntil: 'networkidle' });
  const overflow = await mp.evaluate(() => document.documentElement.scrollWidth - 390);
  check('no horizontal scroll on mobile entry', overflow <= 0, `overflow ${overflow}px`);
  await mp.getByRole('button', { name: 'Menu' }).click();
  check('mobile menu opens', await mp.locator('#mobile-menu').isVisible());
  await mp.keyboard.press('Escape');
  check('mobile menu closes on Escape', !(await mp.locator('#mobile-menu').isVisible()));
  await Promise.resolve();
  for (const r of ['/', '/formulas/two-proportion-z-test', '/compare/ux-vs-ui', '/graph', '/labs/gestalt-lab', '/sources']) {
    await mp.goto(BASE + r, { waitUntil: 'networkidle' });
    const o = await mp.evaluate(() => document.documentElement.scrollWidth - 390);
    check(`no horizontal scroll on mobile ${r}`, o <= 0, `overflow ${o}px`);
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
