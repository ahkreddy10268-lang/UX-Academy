/**
 * Guide integrity (D-127). A guide composes published entries by slug, so
 * every reference it makes — entries, quiz questions, exercises, sources,
 * links and heuristic numbers — must resolve.
 */
import { describe, expect, it } from "vitest";
import { entryBySlug, guides, knownSlugs, sourceById } from "../lib/content";
import { collectStrings, extractCitations, extractLinks } from "../lib/content/rich";

describe.each(guides.map((g) => [g.id, g] as const))("guide %s", (_, g) => {
  it("has ten heuristics numbered 1–10 in order", () => {
    expect(g.heuristics.map((h) => h.n)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("is anchored on a published entry", () => {
    expect(entryBySlug.get(g.entry)?.status).toBe("published");
  });

  it("gives each heuristic either a published entry or an addressed-in entry plus its own content", () => {
    for (const h of g.heuristics) {
      const hasEntry = Boolean(h.entry);
      const hasOwn = Boolean(h.addressedIn && h.own);
      expect(hasEntry !== hasOwn, `heuristic ${h.n}`).toBe(true);
      const slug = h.entry ?? h.addressedIn!;
      expect(entryBySlug.get(slug)?.status, `heuristic ${h.n} → ${slug}`).toBe("published");
      if (h.entry) {
        const e = entryBySlug.get(h.entry)!;
        if (h.check) expect(e.quiz.some((q) => q.id === h.check), `${h.n} check ${h.check}`).toBe(true);
        if (h.exercise) expect(e.exercises.some((x) => x.id === h.exercise), `${h.n} exercise ${h.exercise}`).toBe(true);
        expect(e.guide?.id, `${h.entry} links back to the guide`).toBe(g.id);
        expect(e.guide?.anchor).toBe(`h${h.n}`);
      }
      expect(h.related.every((r) => r.n !== h.n), `heuristic ${h.n} relates to itself`).toBe(true);
    }
  });

  it("draws assessment questions from entries that exist, with unique ids", () => {
    const all = new Set(entries().flatMap((e) => e.quiz.map((q) => q.id)));
    for (const id of g.assessment.fromEntries) expect(all.has(id), id).toBe(true);
    const own = g.assessment.questions.map((q) => q.id);
    expect(new Set(own).size).toBe(own.length);
    for (const id of own) expect(all.has(id), `${id} collides with an entry question`).toBe(false);
    for (const q of g.assessment.questions) expect(q.options.filter((o) => o.correct).length, q.id).toBeGreaterThanOrEqual(1);
  });

  it("cites only sources that are registered and listed in its references", () => {
    const refs = new Set(g.references.map((r) => r.source));
    for (const r of refs) expect(sourceById.has(r), r).toBe(true);
    const cited = collectStrings(g).flatMap(extractCitations);
    for (const c of cited) expect(refs.has(c), `{{src:${c}}} not in the guide's references`).toBe(true);
  });

  it("links only to known slugs", () => {
    for (const s of collectStrings(g).flatMap(extractLinks)) expect(knownSlugs.has(s), `[[${s}]]`).toBe(true);
  });

  it("uses valid, distinct heuristic numbers in comparisons and the case study", () => {
    for (const c of g.comparisons) expect(c.a, c.id).not.toBe(c.b);
    expect(new Set(g.comparisons.map((c) => c.id)).size).toBe(g.comparisons.length);
    const f = g.caseStudy.findings;
    expect(f.length).toBeGreaterThanOrEqual(10);
    expect(new Set(f.map((x) => x.id)).size).toBe(f.length);
    for (const x of f) expect(x.also.includes(x.heuristic), x.id).toBe(false);
  });

  it("gives every mock a text alternative and numbered notes that match its marks", () => {
    const mocks = [...g.heuristics.flatMap((h) => [h.bad.mock, h.good.mock]), ...g.caseStudy.findings.flatMap((x) => [x.before, x.after])];
    for (const m of mocks) {
      expect(m.alt.length, m.title).toBeGreaterThanOrEqual(30);
      const marks = m.elements.flatMap((el) => ("mark" in el && el.mark ? [el.mark] : []));
      const notes = m.notes.map((n) => n.n);
      expect([...marks].sort(), `${m.title}: marks and notes`).toEqual([...notes].sort());
    }
  });
});

function entries() {
  return [...entryBySlug.values()];
}
