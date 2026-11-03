const { chromium } = require('playwright');
const axePath = process.env.AXE_PATH; if (!axePath) { console.error('Set AXE_PATH to axe.min.js (npm pack axe-core, then extract).'); process.exit(2); }
const BASE = process.env.BASE_URL ?? 'http://localhost:3100';
(async () => {
  const b = await chromium.launch();
  const routes = process.argv.slice(2);
  let total = 0;
  for (const scheme of ['light', 'dark']) {
    const p = await b.newPage({ viewport: { width: 1280, height: 900 }, colorScheme: scheme });
    for (const r of routes) {
      await p.goto(BASE + r, { waitUntil: 'networkidle' });
      await p.addScriptTag({ path: axePath });
      const res = await p.evaluate(async () => (await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] } })).violations.map(v => ({ id: v.id, impact: v.impact, n: v.nodes.length, ex: v.nodes.slice(0, 2).map(n => n.target.join(' ') + ' :: ' + (n.failureSummary || '').split('\n').slice(1, 2).join('')) })));
      total += res.length;
      if (res.length) console.log(`[${scheme}] ${r}`, JSON.stringify(res, null, 1));
    }
    await p.close();
  }
  console.log('violations:', total);
  await b.close();
})();
