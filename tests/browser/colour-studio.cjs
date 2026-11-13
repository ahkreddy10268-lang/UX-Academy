// Colour Studio interaction checks (run against `next start`; see README).
const { chromium } = require('playwright');
const BASE = process.env.BASE_URL ?? 'http://localhost:3100';
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok: !!ok, detail });

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, permissions: ['clipboard-read', 'clipboard-write'] });
  const p = await ctx.newPage();
  const errors = [];
  p.on('pageerror', (e) => errors.push(e.message));
  p.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await p.goto(BASE + '/labs/colour-studio', { waitUntil: 'networkidle' });

  const swatchHexes = () => p.locator('#cs-panel-palette ul').first().locator('li input.formula:not([type=number])').evaluateAll((els) => els.map((e) => e.value));
  const panel = p.locator('#cs-panel-palette');

  // tabs: keyboard
  await p.getByRole('tab', { name: /Palette Studio/ }).focus();
  await p.keyboard.press('ArrowRight');
  check('arrow key moves to Contrast tab', (await p.getByRole('tab', { name: /Colour Contrast/ }).getAttribute('aria-selected')) === 'true');
  await p.keyboard.press('Home');
  check('Home returns to Palette tab', (await p.getByRole('tab', { name: /Palette Studio/ }).getAttribute('aria-selected')) === 'true');

  // default analogous palette: five colours, five markers
  check('default palette has 5 colours', (await swatchHexes()).length === 5);
  const markers = () => p.locator('[aria-roledescription="colour wheel"] svg text').count();
  check('wheel shows a marker per colour', (await markers()) === 5);

  // harmony change updates swatches and wheel
  await panel.getByRole('button', { name: 'Triadic' }).click();
  const tri = await swatchHexes();
  check('triadic gives 3 colours and 3 markers', tri.length === 3 && (await markers()) === 3, tri.join(' '));
  check('triadic chip is pressed', (await panel.getByRole('button', { name: 'Triadic' }).getAttribute('aria-pressed')) === 'true');

  // wheel keyboard changes hue
  const hue = panel.getByRole('slider', { name: 'Hue' });
  const h0 = Number(await hue.inputValue());
  await p.locator('[aria-roledescription="colour wheel"]').focus();
  for (let i = 0; i < 5; i++) await p.keyboard.press('ArrowRight');
  const h1 = Number(await hue.inputValue());
  check('wheel arrow keys change hue by 5°', (h1 - h0 + 360) % 360 === 5, `${h0} → ${h1}`);
  check('swatches follow the hue change', (await swatchHexes())[0] !== tri[0]);

  // wheel pointer drag
  const box = await p.locator('[aria-roledescription="colour wheel"]').boundingBox();
  await p.mouse.click(box.x + box.width / 2, box.y + 6); // top edge = hue 0, full saturation
  check('clicking the top of the wheel sets hue ≈ 0 and saturation ≈ 100', [0, 1, 359].includes(Number(await hue.inputValue())) && Number(await panel.getByRole('slider', { name: 'Saturation' }).inputValue()) >= 90);

  // edit one swatch: invalid keeps the colour, valid updates only it and the preview
  const before = await swatchHexes();
  const field = panel.getByLabel('Colour 2', { exact: true });
  await field.fill('#12');
  check('invalid hex shows an error', await panel.getByText(/is not a hex colour/).first().isVisible());
  check('invalid hex does not change the palette', JSON.stringify((await swatchHexes()).filter((_, i) => i !== 1)) === JSON.stringify(before.filter((_, i) => i !== 1)));
  await field.fill('#e9c46a');
  await field.press('Enter');
  const after = await swatchHexes();
  check('valid edit changes only that colour', after[1] === '#e9c46a' && after[0] === before[0] && after[2] === before[2], after.join(' '));
  check('edited swatch is marked', await panel.getByText('Edited').first().isVisible());

  // preview updates from roles: secondary role = colour 2 by default → outline of the Return button
  const outline = await panel.locator('[role="img"][aria-label^="Interface preview"]').getAttribute('aria-label');
  check('interface preview uses the edited colour', outline.includes('secondary #e9c46a'), outline.slice(0, 120));
  await panel.getByLabel('Primary action').selectOption('#1c1b19');
  check('assigning a role updates the preview', (await panel.locator('[role="img"][aria-label^="Interface preview"]').getAttribute('aria-label')).includes('primary #1c1b19'));

  // restore
  await panel.getByRole('button', { name: 'Restore generated colours' }).click();
  check('restore brings back the generated colour', (await swatchHexes())[1] !== '#e9c46a');

  // copy
  await panel.getByRole('button', { name: 'Copy all HEX' }).click();
  const clip = await p.evaluate(() => navigator.clipboard.readText());
  check('Copy all HEX copies the current palette', clip === (await swatchHexes()).join(', '), clip);

  // exports reflect current state
  const pre = panel.getByLabel('CSS variables');
  const css = await pre.textContent();
  const now = await swatchHexes();
  check('CSS export contains every current colour', now.every((h, i) => css.includes(`--palette-${i + 1}: ${h};`)));
  check('CSS export contains the role variables', css.includes('--color-primary: #1c1b19;'));
  await panel.getByRole('button', { name: 'JSON', exact: true }).click();
  const json = JSON.parse(await panel.getByLabel('Palette JSON').textContent());
  check('JSON export is valid and current', json.colours.map((c) => c.hex).join() === now.join());

  // contrast
  await p.getByRole('tab', { name: /Colour Contrast/ }).click();
  const cp = p.locator('#cs-panel-contrast');
  await cp.getByLabel('Foreground (text or icon)', { exact: true }).fill('#777777');
  await cp.getByLabel('Background', { exact: true }).fill('#ffffff');
  await p.waitForTimeout(100);
  let st = await cp.getByRole('status').textContent();
  check('#777 on white: 4.47, normal fails, large passes', /4\.47:1/.test(st) && /Normal text fails/.test(st) && /Large text passes/.test(st), st);
  await cp.getByLabel('Foreground (text or icon)', { exact: true }).fill('#007bc8');
  await p.waitForTimeout(100);
  st = await cp.getByRole('status').textContent();
  check('#007bc8 (4.4995) shows 4.49 and fails normal text', /4\.49:1/.test(st) && /Normal text fails/.test(st), st);
  await cp.getByRole('button', { name: /Swap/ }).click();
  check('swap exchanges colours', (await cp.getByLabel('Foreground (text or icon)', { exact: true }).inputValue()) === '#ffffff');
  await cp.getByLabel('Foreground (text or icon)', { exact: true }).fill('#000000');
  await p.waitForTimeout(100);
  check('black on #007bc8 updates the ratio', /Contrast ratio 4\.66:1|Contrast ratio 4\.6/.test(await cp.getByRole('status').textContent()), await cp.getByRole('status').textContent());

  // image extraction: a generated 3-colour PNG and an invalid file
  await p.getByRole('tab', { name: /Image Extraction/ }).click();
  const png = await p.evaluate(() => {
    const c = document.createElement('canvas');
    c.width = 100;
    c.height = 10;
    const x = c.getContext('2d');
    x.fillStyle = '#c81e1e'; x.fillRect(0, 0, 60, 10);
    x.fillStyle = '#1428c8'; x.fillRect(60, 0, 30, 10);
    x.fillStyle = '#f0f0f0'; x.fillRect(90, 0, 10, 10);
    return c.toDataURL('image/png').split(',')[1];
  });
  const fileInput = p.locator('#cs-panel-image input[type="file"]');
  await fileInput.setInputFiles({ name: 'three.png', mimeType: 'image/png', buffer: Buffer.from(png, 'base64') });
  await p.locator('#cs-panel-image').getByLabel('Number of colours: 5').fill('3');
  await p.waitForTimeout(300);
  const ex = await p.locator('#cs-panel-image li input.formula').evaluateAll((els) => els.map((e) => e.value));
  check('extracts the three colours of the image, largest first', ex.join() === '#c81e1e,#1428c8,#f0f0f0', ex.join());
  check('image shown with alt text', (await p.locator('#cs-panel-image img').getAttribute('alt')).includes('three.png'));
  await p.locator('#cs-panel-image').getByRole('button', { name: 'Use as palette' }).click();
  check('extracted colours become the palette', (await swatchHexes()).join() === '#c81e1e,#1428c8,#f0f0f0');
  await p.getByRole('tab', { name: /Image Extraction/ }).click();
  await fileInput.setInputFiles({ name: 'notes.txt', mimeType: 'text/plain', buffer: Buffer.from('hello') });
  check('non-image file is rejected with a message', await p.locator('#cs-panel-image').getByRole('alert').isVisible());
  await fileInput.setInputFiles({ name: 'broken.png', mimeType: 'image/png', buffer: Buffer.from('not really a png') });
  await p.waitForTimeout(300);
  check('corrupt image is rejected with a message', /could not be read as an image/.test(await p.locator('#cs-panel-image').getByRole('alert').textContent()));

  // gradient: preview and CSS agree
  await p.getByRole('tab', { name: /Gradient Studio/ }).click();
  const gp = p.locator('#cs-panel-gradient');
  await gp.getByRole('button', { name: 'Diagonal' }).click();
  await gp.getByLabel('Stop 2 colour', { exact: true }).fill('#2a9d8f');
  await gp.getByLabel('Stop 2 colour', { exact: true }).press('Enter');
  const gcss = await gp.getByLabel('Gradient CSS').textContent();
  check('gradient CSS reflects direction and edited stop', gcss.includes('linear-gradient(135deg, #264653 0%, #2a9d8f 100%)'), gcss);
  const bgImg = await gp.locator('[role="img"]').evaluate((e) => getComputedStyle(e).backgroundImage);
  check('preview renders the same gradient', bgImg.includes('135deg') && bgImg.includes('rgb(38, 70, 83)') && bgImg.includes('rgb(42, 157, 143)'), bgImg);
  await gp.getByRole('button', { name: 'Add stop' }).click();
  check('adding a stop adds it to the CSS', ((await gp.getByLabel('Gradient CSS').textContent()).match(/#/g) || []).length === 3);

  // save and restore in this browser
  await p.getByRole('tab', { name: /Palette Studio/ }).click();
  await panel.getByRole('button', { name: 'Save in this browser' }).click();
  const savedPalette = await swatchHexes();
  await panel.getByRole('button', { name: 'Complementary', exact: true }).click();
  await panel.getByRole('button', { name: 'Restore saved palette' }).click();
  check('restore saved palette brings back the saved colours', (await swatchHexes()).join() === savedPalette.join());

  check('no console or page errors', errors.length === 0, errors.slice(0, 3).join(' | '));

  // narrow screens
  for (const w of [390, 768]) {
    const m = await (await b.newContext({ viewport: { width: w, height: 800 } })).newPage();
    await m.goto(BASE + '/labs/colour-studio', { waitUntil: 'networkidle' });
    for (const t of ['Palette Studio', 'Colour Contrast', 'Image Extraction', 'Gradient Studio']) {
      await m.getByRole('tab', { name: new RegExp(t) }).click();
      const over = await m.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      check(`no horizontal overflow at ${w}px on ${t}`, over <= 0, `+${over}px`);
    }
    await m.getByRole('tab', { name: /Palette Studio/ }).click();
    const wb = await m.locator('[aria-roledescription="colour wheel"]').boundingBox();
    check(`wheel usable size at ${w}px`, wb.width >= 200, `${Math.round(wb.width)}px`);
  }

  await b.close();
  for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'} ${r.name}${r.detail ? ' — ' + r.detail : ''}`);
  const failed = results.filter((r) => !r.ok).length;
  console.log(`${results.length - failed}/${results.length} passed`);
  process.exit(failed ? 1 : 0);
})();
