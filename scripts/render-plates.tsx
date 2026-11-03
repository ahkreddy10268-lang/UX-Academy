/**
 * Visual QA for the illustration system: renders every registered plate (card
 * + hero, light + dark) into a standalone HTML sheet and screenshots it.
 *   npx tsx scripts/render-plates.tsx [slug…] [--out dir]
 * Requires Playwright (pre-installed in cloud sessions). Output PNGs go to
 * --out (default: .plates/), which is git-ignored.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { createRequire } from "node:module";
import { renderToStaticMarkup } from "react-dom/server";
import { Plate } from "../components/illustrations/plate";
import { illustrations } from "../components/illustrations/registry";
import { domainById, entryBySlug, taxonomyBySlug } from "../lib/content";
import { paletteFor } from "../lib/content/categories";

const args = process.argv.slice(2);
const outIdx = args.indexOf("--out");
const out = resolve(outIdx >= 0 ? args[outIdx + 1] : join(import.meta.dirname, "..", ".plates"));
const only = args.filter((a, i) => !a.startsWith("--") && (outIdx < 0 || i !== outIdx + 1));
mkdirSync(out, { recursive: true });

const css = readFileSync(join(import.meta.dirname, "..", "app", "globals.css"), "utf8");
const domainOf = (slug: string) => entryBySlug.get(slug)?.domain ?? taxonomyBySlug.get(slug)?.domain ?? (domainById.has(slug) ? slug : "foundations");
const list = [...illustrations.values()].filter((e) => !only.length || only.includes(e.slug));

const cell = () =>
  list
    .map((e) => {
      const p = paletteFor(domainOf(e.slug));
      return `<figure><div class="pair">${renderToStaticMarkup(<Plate entry={e} variant="card" palette={p} decorative />)}${renderToStaticMarkup(
        <Plate entry={e} variant="hero" palette={p} number={1} />,
      )}</div><figcaption>${e.slug} · ${p}</figcaption></figure>`;
    })
    .join("");

for (const theme of ["light", "dark"] as const) {
  const html = `<!doctype html><html data-theme="${theme}"><head><meta charset="utf-8"><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Newsreader:ital,opsz@0,6..72;1,6..72&display=swap" rel="stylesheet"><style>${css}
  :root{--font-plex-mono:"IBM Plex Mono";--font-newsreader:"Newsreader"} body{background:var(--paper);color:var(--ink);font:13px system-ui;margin:24px}
  .sheet{display:grid;grid-template-columns:repeat(2,1fr);gap:28px} .pair{display:grid;grid-template-columns:1fr 1.6fr;gap:10px;align-items:start}
  figure{margin:0} figcaption{margin-top:6px;color:var(--ink-3);font-family:monospace}</style></head><body><div class="sheet">${cell()}</div></body></html>`;
  writeFileSync(join(out, `plates-${theme}.html`), html);
}

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const browser = await chromium.launch();
for (const theme of ["light", "dark"]) {
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  await page.goto("file://" + join(out, `plates-${theme}.html`));
  await page.waitForTimeout(800);
  await page.screenshot({ path: join(out, `plates-${theme}.png`), fullPage: true });
  await page.close();
}
await browser.close();
console.log(`${list.length} plates → ${out}/plates-{light,dark}.png`);
