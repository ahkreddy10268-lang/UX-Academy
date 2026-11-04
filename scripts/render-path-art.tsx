/**
 * Visual QA for learning-path artwork: renders every path scene (light + dark)
 * into a sheet and screenshots it at 2x.
 *   npx tsx scripts/render-path-art.tsx [outDir]            render the QA sheet
 *   npx tsx scripts/render-path-art.tsx --measure            measure each scene and rewrite components/learn/art/fit.ts
 * Output defaults to .plates/ (git-ignored).
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join, resolve } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { PathArt, pathCat } from "../components/learn/path-art";
import { learningPaths } from "../lib/content";

const args = process.argv.slice(2);
const out = resolve(args.find((a) => !a.startsWith("--")) ?? join(import.meta.dirname, "..", ".plates"));
mkdirSync(out, { recursive: true });
const css = readFileSync(join(import.meta.dirname, "..", "app", "globals.css"), "utf8");
const cells = learningPaths.map((p) => `<figure data-id="${p.id}" class="${pathCat(p.id)}"><div class="card">${renderToStaticMarkup(<PathArt id={p.id} />)}</div><figcaption>${p.id}</figcaption></figure>`).join("");
for (const theme of ["light", "dark"]) {
  writeFileSync(join(out, `path-art-${theme}.html`), `<!doctype html><html data-theme="${theme}"><head><meta charset="utf-8"><style>${css} :root{--font-plex-mono:ui-monospace} body{background:var(--paper);margin:24px;font:13px system-ui;color:var(--ink)} .row{display:grid;grid-template-columns:repeat(4,340px);gap:18px} figure{margin:0} .card{border-radius:12px;overflow:hidden;border:1px solid var(--rule)} figcaption{margin-top:4px;color:var(--ink-3);font-family:monospace}</style></head><body><div class="row">${cells}</div></body></html>`);
}
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const b = await chromium.launch();
if (args.includes("--measure")) {
  const p = await b.newPage({ viewport: { width: 1480, height: 900 } });
  await p.goto("file://" + join(out, "path-art-light.html"));
  const boxes: { id: string; x: number; y: number; w: number; h: number }[] = await p.evaluate(() =>
    [...document.querySelectorAll("figure[data-id]")].map((f) => {
      const g = f.querySelector("svg > g") as SVGGElement;
      g.removeAttribute("transform");
      const r = g.getBBox();
      return { id: (f as HTMLElement).dataset.id!, x: r.x, y: r.y, w: r.width, h: r.height };
    }),
  );
  const M = 18;
  const lines = boxes.map((r) => {
    const k = Math.min((400 - 2 * M) / r.w, (300 - 2 * M) / r.h, 2.1);
    const dx = (400 - r.w * k) / 2 - r.x * k;
    const dy = (300 - r.h * k) / 2 - r.y * k;
    return `  "${r.id}": { k: ${k.toFixed(3)}, dx: ${dx.toFixed(1)}, dy: ${dy.toFixed(1)} },`;
  });
  const file = join(import.meta.dirname, "..", "components", "learn", "art", "fit.ts");
  const src = readFileSync(file, "utf8");
  writeFileSync(file, src.replace(/export const FIT: Record<string, Fit> = \{[\s\S]*\};/, `export const FIT: Record<string, Fit> = {\n${lines.join("\n")}\n};`));
  console.log(lines.join("\n"));
  await b.close();
  process.exit(0);
}
for (const theme of ["light", "dark"]) {
  const p = await b.newPage({ viewport: { width: 1480, height: 900 }, deviceScaleFactor: 2 });
  await p.goto("file://" + join(out, `path-art-${theme}.html`));
  await p.screenshot({ path: join(out, `path-art-${theme}.png`), fullPage: true });
}
await b.close();
console.log(`${learningPaths.length} scenes → ${out}/path-art-{light,dark}.png`);
