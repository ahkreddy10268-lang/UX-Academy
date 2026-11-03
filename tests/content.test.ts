/**
 * Content integrity tests — the executable quality gate (spec Part 17).
 * Run: npm test
 */
import { describe, expect, it } from "vitest";
import {
  comparisons,
  domains,
  entries,
  glossary,
  knownSlugs,
  labById,
  learningPaths,
  sourceById,
  sources,
  standaloneFormulas,
  taxonomyItems,
  verification,
  workshops,
} from "../lib/content";
import { collectStrings, extractCitations, extractLinks } from "../lib/content/rich";

const dupes = (xs: string[]) => xs.filter((x, i) => xs.indexOf(x) !== i);

describe("taxonomy", () => {
  it("has unique domain ids", () => expect(dupes(domains.map((d) => d.id))).toEqual([]));
  it("has unique item slugs across all domains", () => expect(dupes(taxonomyItems.map((t) => t.slug))).toEqual([]));
  it("has unique subcategory ids within each domain", () => {
    for (const d of domains) expect(dupes(d.subcategories.map((s) => s.id)), d.id).toEqual([]);
  });
});

describe("sources", () => {
  it("has unique ids", () => expect(dupes(sources.map((s) => s.id))).toEqual([]));
  it("has unique DOIs", () => expect(dupes(sources.flatMap((s) => (s.doi ? [s.doi.toLowerCase()] : [])))).toEqual([]));
  it("has unique titles", () =>
    expect(dupes(sources.map((s) => s.title.toLowerCase().replace(/[^a-z0-9]/g, "")))).toEqual([]));
  it("has no DOI that failed machine verification", () => {
    const bad = sources.filter((s) => s.doi && ["doi-mismatch", "doi-not-found"].includes(verification[s.id]?.status));
    expect(bad.map((s) => `${s.id}: ${verification[s.id].status} — ${verification[s.id].registeredTitle ?? ""}`)).toEqual([]);
  });
  it("every journal article and conference paper has a DOI or URL", () => {
    const missing = sources.filter((s) => ["journal-article", "conference-paper"].includes(s.type) && !s.doi && !s.url);
    expect(missing.map((s) => s.id)).toEqual([]);
  });
});

describe("knowledge entries", () => {
  it("has unique ids and slugs", () => {
    expect(dupes(entries.map((e) => e.id))).toEqual([]);
    expect(dupes(entries.map((e) => e.slug))).toEqual([]);
  });

  it("belong to a valid domain and subcategory", () => {
    for (const e of entries) {
      const d = domains.find((x) => x.id === e.domain);
      expect(d, `${e.slug} domain ${e.domain}`).toBeDefined();
      expect(d!.subcategories.some((s) => s.id === e.subcategory), `${e.slug} subcategory ${e.subcategory}`).toBe(true);
    }
  });

  it("reference only existing sources", () => {
    for (const e of entries)
      for (const r of e.references) expect(sourceById.has(r.source), `${e.slug} → ${r.source}`).toBe(true);
  });

  it("have at least one primary or standard reference", () => {
    for (const e of entries)
      expect(e.references.some((r) => r.role === "primary" || r.role === "standard"), e.slug).toBe(true);
  });

  it("only link to known slugs (prerequisites, relations, [[links]])", () => {
    for (const e of entries) {
      for (const p of e.prerequisites) expect(knownSlugs.has(p), `${e.slug} prerequisite ${p}`).toBe(true);
      for (const r of e.relations) {
        expect(knownSlugs.has(r.target), `${e.slug} relation → ${r.target}`).toBe(true);
        expect(r.target, `${e.slug} relates to itself`).not.toBe(e.slug);
      }
      for (const link of collectStrings(e).flatMap(extractLinks))
        expect(knownSlugs.has(link), `${e.slug} links to unknown [[${link}]]`).toBe(true);
    }
  });

  it("cite only sources that are listed in the entry's references", () => {
    for (const e of entries) {
      const listed = new Set(e.references.map((r) => r.source));
      for (const c of collectStrings(e).flatMap(extractCitations))
        expect(listed.has(c), `${e.slug} cites {{src:${c}}} but does not list it in references`).toBe(true);
    }
  });

  it("have well-formed quizzes with exactly one correct option", () => {
    for (const e of entries)
      for (const q of e.quiz) {
        expect(q.options.filter((o) => o.correct).length, `${e.slug}/${q.id}`).toBe(1);
        if (q.kind === "true-false") expect(q.options.length, q.id).toBe(2);
        if (q.revise) expect(knownSlugs.has(q.revise), `${q.id} revise → ${q.revise}`).toBe(true);
      }
  });

  it("use globally unique activity ids", () => {
    const ids = entries.flatMap((e) => [...e.quiz.map((q) => q.id), ...e.exercises.map((x) => x.id), ...e.flashcards.map((f) => f.id), ...e.formulas.map((f) => `formula:${f.id}`)]);
    expect(dupes(ids)).toEqual([]);
  });

  it("link only to existing labs", () => {
    for (const e of entries) if (e.lab) expect(labById.has(e.lab), `${e.slug} lab ${e.lab}`).toBe(true);
  });

  it("formula sources exist", () => {
    for (const e of entries)
      for (const f of e.formulas) if (f.source) expect(sourceById.has(f.source), `${f.id} → ${f.source}`).toBe(true);
  });

  it("pass the full quality gate when published", () => {
    for (const e of entries.filter((x) => x.status === "published")) {
      const failed = Object.entries(e.quality).filter(([, v]) => !v).map(([k]) => k);
      expect(failed, `${e.slug} is published but fails: ${failed.join(", ")}`).toEqual([]);
      expect(e.quiz.length + e.exercises.length, `${e.slug} has no learning activities`).toBeGreaterThanOrEqual(3);
      expect(e.relations.length + e.prerequisites.length, `${e.slug} is isolated`).toBeGreaterThanOrEqual(3);
      expect(e.misconceptions.length, `${e.slug} has no misconceptions`).toBeGreaterThanOrEqual(1);
    }
  });

  it("have slugs that are not also different taxonomy items in another domain", () => {
    for (const e of entries) {
      const t = taxonomyItems.find((x) => x.slug === e.slug);
      if (t) expect(t.domain, `${e.slug} is in taxonomy domain ${t.domain} but entry says ${e.domain}`).toBe(e.domain);
    }
  });
});

describe("collections", () => {
  it("glossary terms are unique and link to known slugs", () => {
    expect(dupes(glossary.map((g) => g.slug))).toEqual([]);
    for (const g of glossary) {
      for (const s of g.seeAlso) expect(knownSlugs.has(s), `glossary ${g.slug} → ${s}`).toBe(true);
      if (g.source) expect(sourceById.has(g.source), `glossary ${g.slug} source ${g.source}`).toBe(true);
    }
  });

  it("comparisons reference known slugs and sources", () => {
    expect(dupes(comparisons.map((c) => c.id))).toEqual([]);
    for (const c of comparisons) {
      for (const side of [c.a, c.b]) if (side.slug) expect(knownSlugs.has(side.slug), `${c.id} → ${side.slug}`).toBe(true);
      for (const r of c.references) expect(sourceById.has(r.source), `${c.id} → ${r.source}`).toBe(true);
      for (const link of collectStrings(c).flatMap(extractLinks)) expect(knownSlugs.has(link), `${c.id} [[${link}]]`).toBe(true);
    }
  });

  it("workshops reference known concepts", () => {
    expect(dupes(workshops.map((w) => w.id))).toEqual([]);
    for (const w of workshops) for (const c of w.concepts) expect(knownSlugs.has(c), `${w.id} → ${c}`).toBe(true);
  });

  it("learning paths reference known slugs, labs and workshops", () => {
    const practiceIds = new Set([...workshops.map((w) => w.id), ...labById.keys()]);
    for (const p of learningPaths)
      for (const s of p.stages) {
        for (const step of s.steps) expect(knownSlugs.has(step), `${p.id} → ${step}`).toBe(true);
        for (const pr of s.practice) expect(practiceIds.has(pr), `${p.id} practice → ${pr}`).toBe(true);
      }
  });

  it("standalone formulas reference known topics and sources", () => {
    for (const f of standaloneFormulas) {
      expect(knownSlugs.has(f.topic), `${f.id} topic ${f.topic}`).toBe(true);
      for (const r of f.references) expect(sourceById.has(r.source), `${f.id} → ${r.source}`).toBe(true);
    }
    const entryFormulaIds = entries.flatMap((e) => e.formulas.map((f) => f.id));
    expect(dupes([...entryFormulaIds, ...standaloneFormulas.map((f) => f.id)])).toEqual([]);
  });

  it("labs reference known concepts", () => {
    for (const lab of labById.values())
      for (const c of lab.concepts) expect(knownSlugs.has(c), `${lab.id} → ${c}`).toBe(true);
  });
});
