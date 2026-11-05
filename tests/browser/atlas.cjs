// Knowledge Atlas (/topics) and the Domains & Topics nav item, against `next start`.
// Covers: sidebar link and active state, collapsed tooltip, mobile drawer, totals,
// expand/collapse with aria-expanded, search revealing branches, alias search,
// status filter, URL state with back/forward, clear, keyboard operation, focus
// after filtering, 390px overflow and target size, and domain-page breadcrumb.
const { chromium, devices } = require('playwright');
const BASE = process.env.BASE_URL ?? 'http://localhost:3100';
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok: !!ok, detail });

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  const errors = [];
  p.on('pageerror', (e) => errors.push(e.message));

  // Navigation
  await p.goto(BASE + '/library', { waitUntil: 'networkidle' });
  const side = p.getByRole('navigation', { name: 'Primary' });
  check('sidebar has a Domains & Topics link to /topics', (await side.getByRole('link', { name: 'Domains & Topics' }).getAttribute('href')) === '/topics');
  check('/library: Knowledge Library is current', (await side.getByRole('link', { name: 'Knowledge Library' }).getAttribute('aria-current')) === 'page');
  check('/library: Domains & Topics not current', (await side.getByRole('link', { name: 'Domains & Topics' }).getAttribute('aria-current')) === null);
  await side.getByRole('link', { name: 'Domains & Topics' }).click();
  await p.waitForURL('**/topics');
  await p.getByRole('heading', { level: 1, name: 'Knowledge Atlas' }).waitFor();
  check('clicking it opens the Knowledge Atlas', true);
  check('/topics: Domains & Topics is current', (await side.getByRole('link', { name: 'Domains & Topics' }).getAttribute('aria-current')) === 'page');
  check('/topics: Knowledge Library not current', (await side.getByRole('link', { name: 'Knowledge Library' }).getAttribute('aria-current')) === null);

  // Totals (read from the page and compared with the rendered tree)
  const stat = async (label) => Number(await p.locator('dl dt', { hasText: new RegExp(`^${label}$`) }).locator('xpath=following-sibling::dd').first().textContent());
  const [nd, ns, nt, npub, nadd, npl] = [await stat('Domains'), await stat('Subcategories'), await stat('Topics'), await stat('Published entries'), await stat('Addressed within'), await stat('Planned')];
  const domainItems = p.getByRole('list', { name: 'Domains' }).locator(':scope > li');
  check('one domain section per domain', (await domainItems.count()) === nd, `${nd}`);
  check('status totals reconcile with topic count', npub + nadd + npl <= nt && nt > 0, `${npub}+${nadd}+${npl} of ${nt}`);
  check('domains collapsed by default (no topic links visible)', (await p.locator('[aria-label^="Topics in"] a:visible').count()) === 0);

  // Expand all → every subcategory and topic rendered
  await p.getByRole('button', { name: 'Expand all domains' }).click();
  const subCount = await p.locator('[aria-label^="Subcategories of"] > li').count();
  const topicCount = await p.locator('[aria-label^="Topics in"] > li').count();
  check('expand all: every subcategory present', subCount === ns, `${subCount}/${ns}`);
  check('expand all: every topic present', topicCount === nt, `${topicCount}/${nt}`);
  await p.getByRole('button', { name: 'Collapse all' }).click();

  // One domain by keyboard
  const first = p.getByRole('list', { name: 'Domains' }).locator('h3 button').first();
  await first.focus();
  check('domain toggle starts collapsed', (await first.getAttribute('aria-expanded')) === 'false');
  await p.keyboard.press('Enter');
  check('Enter expands a domain', (await first.getAttribute('aria-expanded')) === 'true');
  const panelId = await first.getAttribute('aria-controls');
  check('aria-controls points at a visible panel', await p.locator(`[id="${panelId}"]`).isVisible());
  await p.keyboard.press('Space');
  check('Space collapses it again', (await first.getAttribute('aria-expanded')) === 'false');

  // Search reveals branches
  const q = p.getByLabel('Search the atlas');
  await q.fill('feedback');
  await p.waitForURL(/q=feedback/);
  const visibleTopics = p.locator('[aria-label^="Topics in"] a:visible');
  check('search reveals matching topics without manual expansion', (await visibleTopics.count()) > 0, `${await visibleTopics.count()}`);
  check('matches are emphasised', (await p.locator('mark', { hasText: /feedback/i }).count()) > 0);
  check('focus stays in the search box while filtering', await q.evaluate((el) => el === document.activeElement));
  check('result count announced in a status region', /match/.test(await p.getByRole('status').first().textContent()));

  // Alias search (Conversation Design → Conversational UX)
  await q.fill('conversation design');
  await p.waitForTimeout(150);
  check('aliases are searchable', (await p.locator('[aria-label^="Topics in"] a:visible', { hasText: /also:/ }).count()) > 0);

  // Status filter + URL + back/forward
  await q.fill('');
  await p.getByRole('search', { name: 'Find a topic' }).getByLabel('Status', { exact: true }).selectOption('planned');
  await p.waitForURL(/status=planned/);
  await p.getByRole('search', { name: 'Find a topic' }).getByRole('status').filter({ hasText: `${npl} topics` }).waitFor();
  const tags = await p.locator('[aria-label^="Topics in"] a:visible').allTextContents();
  check('status filter shows only planned topics', tags.length === npl && tags.every((t) => /Planned/.test(t)), `${tags.length}/${npl}`);
  await p.getByRole('search', { name: 'Find a topic' }).getByLabel('Status', { exact: true }).selectOption('published');
  await p.waitForURL(/status=published/);
  await p.getByRole('search', { name: 'Find a topic' }).getByRole('status').filter({ hasText: `${npub} topics` }).waitFor();
  check('published filter count matches header', (await p.locator('[aria-label^="Topics in"] a:visible').count()) === npub);
  await p.goBack();
  await p.waitForURL(/status=planned/);
  check('back restores the previous filter', (await p.getByRole('search', { name: 'Find a topic' }).getByLabel('Status', { exact: true }).inputValue()) === 'planned');
  await p.goForward();
  await p.waitForURL(/status=published/);
  check('forward restores the next filter', (await p.getByRole('search', { name: 'Find a topic' }).getByLabel('Status', { exact: true }).inputValue()) === 'published');
  await p.getByRole('button', { name: 'Clear search and filters' }).click();
  await p.waitForURL((u) => !u.search);
  await p.getByRole('button', { name: 'Expand all domains' }).waitFor();
  check('clear restores the full directory', (await domainItems.count()) === nd && (await p.getByRole('button', { name: 'Expand all domains' }).isVisible()));

  // Shared URL and invalid parameters
  await p.goto(BASE + '/topics?q=accessibility&domain=accessibility&status=bogus', { waitUntil: 'networkidle' });
  check('shared URL applies q and domain', (await domainItems.count()) === 1 && (await p.getByLabel('Search the atlas').inputValue()) === 'accessibility');
  check('invalid status parameter is ignored', (await p.getByRole('search', { name: 'Find a topic' }).getByLabel('Status', { exact: true }).inputValue()) === '');

  // Addressed-within topic links to its parent entry
  await p.goto(BASE + '/topics?status=addressed', { waitUntil: 'networkidle' });
  const addr = p.locator('[aria-label^="Topics in"] a:visible').first();
  check('addressed-within rows name their parent entry', /Explained in/.test(await addr.textContent()));

  // Domain page breadcrumb back to the atlas
  await p.goto(BASE + '/topics/foundations', { waitUntil: 'networkidle' });
  check('domain page breadcrumb links to the Knowledge Atlas', (await p.getByRole('navigation', { name: 'Breadcrumb' }).getByRole('link', { name: 'Knowledge Atlas' }).getAttribute('href')) === '/topics');
  check('domain page keeps Domains & Topics current', (await side.getByRole('link', { name: 'Domains & Topics' }).getAttribute('aria-current')) === 'page');

  // Collapsed sidebar tooltip
  await p.getByRole('button', { name: 'Collapse sidebar' }).click();
  const link = side.getByRole('link', { name: 'Domains & Topics' });
  await link.hover();
  const tip = link.locator('.nav-tip');
  check('collapsed sidebar shows a Domains & Topics tooltip', (await tip.isVisible()) && (await tip.textContent()) === 'Domains & Topics');
  check('collapsed link keeps its accessible name', (await link.getAttribute('aria-current')) === 'page');
  await p.getByRole('button', { name: 'Expand sidebar' }).click();

  // Mobile drawer + 390px layout
  const m = await b.newPage({ ...devices['iPhone 13'] });
  await m.goto(BASE + '/library', { waitUntil: 'networkidle' });
  await m.getByRole('button', { name: /Menu/ }).click();
  const drawer = m.getByRole('dialog', { name: 'Navigation' });
  await drawer.getByRole('link', { name: 'Domains & Topics' }).click();
  await m.waitForURL('**/topics');
  await m.waitForTimeout(200);
  check('mobile drawer link opens the atlas and closes the drawer', !(await drawer.isVisible()));
  await m.getByRole('button', { name: 'Expand all domains' }).click();
  const overflow = await m.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  check('no horizontal scroll at 390px with everything expanded', overflow <= 0, `${overflow}px`);
  const small = await m.evaluate(() =>
    [...document.querySelectorAll('[role="search"] button, [role="search"] select, [role="search"] input, h3 button, h4 button, [aria-label^="Topics in"] a')]
      .filter((el) => el.offsetParent)
      .map((el) => el.getBoundingClientRect())
      .filter((r) => r.width < 24 || r.height < 24).length,
  );
  check('controls and topic rows are at least 24 × 24 px', small === 0, `${small} small`);
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
