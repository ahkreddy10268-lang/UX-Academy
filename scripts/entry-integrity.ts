/**
 * Entry integrity report for a batch (used in every batch review):
 *   npx tsx scripts/entry-integrity.ts <slug> [<slug>…]
 * Per entry: taxonomy placement; cited sources missing from references and
 * references never cited; link, relation-target and prerequisite slugs not in
 * the taxonomy; outgoing and incoming relations (check their direction by
 * hand); quiz levels and questions without exactly one correct option; Level-2
 * figure sources outside the entry's references; visual-register record;
 * machine verification status of each reference. Report only: it never writes.
 */
import { entries, sourceById } from "../lib/content";
import verification from "../content/sources/verification.json";
import { domains } from "../content/taxonomy";
import { visualExplanations } from "../components/visual-explanations/registry";
import { visualRegister } from "../components/illustrations/visual-register";

const taxonomy = new Set<string>();
for (const d of domains) for (const s of d.subcategories) for (const i of s.items) taxonomy.add(i.slug);
const verified = verification as Record<string, { status?: string }>;

const slugs = process.argv.slice(2);
if (!slugs.length) {
  console.error("Usage: npx tsx scripts/entry-integrity.ts <slug> [<slug>…]");
  process.exit(2);
}
let problems = 0;
for (const slug of slugs) {
  const e = entries.find((x) => x.slug === slug);
  if (!e) {
    console.log(`\n== ${slug}: NO ENTRY`);
    problems++;
    continue;
  }
  const text = JSON.stringify(e);
  const cited = [...new Set([...text.matchAll(/\{\{src:([^}]+)\}\}/g)].map((m) => m[1]))];
  const refs = e.references.map((r) => r.source);
  const links = [...new Set([...text.matchAll(/\[\[([^|\]]+)/g)].map((m) => m[1]))];
  const missing = {
    citedNotReferenced: cited.filter((c) => !refs.includes(c)),
    referencedNotCited: refs.filter((r) => !cited.includes(r)),
    unknownSources: refs.filter((r) => !sourceById.has(r)),
    linksNotInTaxonomy: links.filter((l) => !taxonomy.has(l)),
    relationTargetsNotInTaxonomy: e.relations.map((r) => r.target).filter((t) => !taxonomy.has(t)),
    prerequisitesNotInTaxonomy: e.prerequisites.filter((p) => !taxonomy.has(p)),
    quizWithoutOneCorrect: e.quiz.filter((q) => q.options.filter((o) => o.correct).length !== 1).map((q) => q.id),
  };
  const figures = visualExplanations.filter((v) => v.slug === slug);
  const figureSourcesOutside = figures.flatMap((v) => v.sources.filter((s) => !refs.includes(s)).map((s) => `${v.id}:${s}`));
  const incoming = entries.flatMap((x) => x.relations.filter((r) => r.target === slug).map((r) => `${x.slug} → ${r.type}`));
  const count = Object.values(missing).reduce((n, xs) => n + xs.length, 0) + figureSourcesOutside.length + (slug in visualRegister ? 0 : 1);
  problems += count;

  console.log(`\n== ${slug} [${e.primaryType} · ${e.domain}/${e.subcategory} · ${e.evidence} · ${e.status}] in taxonomy: ${taxonomy.has(slug)}`);
  for (const [k, v] of Object.entries(missing)) if (v.length) console.log(`  ${k}: ${v.join(", ")}`);
  if (figureSourcesOutside.length) console.log(`  figureSourcesOutsideReferences: ${figureSourcesOutside.join(", ")}`);
  console.log(`  outgoing: ${e.relations.map((r) => `${r.type} → ${r.target}`).join("; ")}`);
  console.log(`  incoming: ${incoming.join("; ") || "none"}`);
  console.log(`  practice: ${e.exercises.length} exercises (${e.exercises.map((x) => `${x.kind}/${x.level}`).join(", ")}) · ${e.quiz.length} quiz at levels ${[...new Set(e.quiz.map((q) => q.level))].join("/")} · ${e.flashcards.length} flashcards`);
  console.log(`  Level-2 figures: ${figures.map((v) => v.id).join(", ") || "none"} · plate register: ${slug in visualRegister}`);
  console.log(`  verification: ${refs.map((r) => `${r}=${verified[r]?.status ?? "none"}`).join(", ")}`);
}
console.log(`\n${problems === 0 ? "✓ no integrity problems" : `✗ ${problems} problem(s)`} in ${slugs.length} entr${slugs.length === 1 ? "y" : "ies"}`);
process.exit(problems === 0 ? 0 : 1);
