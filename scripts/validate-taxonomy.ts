/**
 * Taxonomy and link integrity report for the terminal.
 *   npm run test:taxonomy
 *
 * Reuses the loader, the completeness gates and the coverage register, so it
 * can never disagree with the tests or the generated docs. The tests remain
 * the gate (tests/taxonomy.test.ts, tests/content.test.ts); this runner gives
 * a readable summary and exits 1 if any check fails.
 */
import { domains, entries, knownSlugs, taxonomyItems } from "../lib/content";
import { levelChecks } from "../lib/content/completeness";
import { domainCoverage } from "../lib/content/coverage";
import { DEPTH_LABEL } from "../lib/content/labels";
import { KNOWLEDGE_TYPES } from "../lib/content/schema";

const failures: string[] = [];
const fail = (msg: string) => failures.push(msg);
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const types = new Set<string>(KNOWLEDGE_TYPES);

/* 1. Every taxonomy topic has a well-formed, unique slug and a known type. */
const seen = new Set<string>();
for (const t of taxonomyItems) {
  if (!t.slug || !SLUG.test(t.slug)) fail(`taxonomy: "${t.title}" has a malformed slug "${t.slug}"`);
  if (seen.has(t.slug)) fail(`taxonomy: duplicate slug "${t.slug}"`);
  seen.add(t.slug);
  if (!types.has(t.type)) fail(`taxonomy: "${t.slug}" has unknown knowledge type "${t.type}"`);
}

/* 2. Every relation and prerequisite in an entry resolves to a known slug. */
let links = 0;
for (const e of entries) {
  for (const r of e.relations) {
    links++;
    if (!knownSlugs.has(r.target)) fail(`link: ${e.slug} → "${r.target}" (${r.type}) does not resolve`);
  }
  for (const p of e.prerequisites ?? []) {
    links++;
    if (!knownSlugs.has(p)) fail(`link: ${e.slug} prerequisite "${p}" does not resolve`);
  }
}

/* 3. Every published entry meets the content checks at all three reading depths. */
const published = entries.filter((e) => e.status === "published");
for (const e of published) {
  const levels = levelChecks(e);
  for (const level of ["beginner", "intermediate", "advanced"] as const) {
    for (const c of levels[level]) if (!c.ok) fail(`depth: ${e.slug} · ${DEPTH_LABEL[level]} · ${c.label}`);
  }
}

/* 4. Coverage by domain (published entries only; "addressed within" is not published). */
const rows = domainCoverage();
const total = rows.reduce((a, r) => a + r.total, 0);
const pub = rows.reduce((a, r) => a + r.published, 0);
const pct = (n: number, d: number) => (d ? ((100 * n) / d).toFixed(1) : "0.0") + "%";
const w = Math.max(...rows.map((r) => r.title.length), 6);

console.log("\nTaxonomy & link integrity\n");
console.log(`  Domains ${domains.length} · subcategories ${domains.reduce((a, d) => a + d.subcategories.length, 0)} · topics ${taxonomyItems.length}`);
console.log(`  Links checked ${links} · published entries checked at 3 depths ${published.length}\n`);
console.log(`  ${"Domain".padEnd(w)}  Topics  Published  Addressed  Coverage`);
console.log(`  ${"-".repeat(w)}  ------  ---------  ---------  --------`);
for (const r of rows) {
  console.log(`  ${r.title.padEnd(w)}  ${String(r.total).padStart(6)}  ${String(r.published).padStart(9)}  ${String(r.addressedWithin).padStart(9)}  ${pct(r.published, r.total).padStart(8)}`);
}
console.log(`  ${"-".repeat(w)}  ------  ---------  ---------  --------`);
console.log(`  ${"Total".padEnd(w)}  ${String(total).padStart(6)}  ${String(pub).padStart(9)}  ${String(rows.reduce((a, r) => a + r.addressedWithin, 0)).padStart(9)}  ${pct(pub, total).padStart(8)}\n`);

if (failures.length) {
  console.error(`✗ ${failures.length} problem${failures.length === 1 ? "" : "s"}:`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log("✓ All taxonomy, link and depth checks pass.\n");
