/** AI UX pattern library integrity (D-098). */
import { describe, expect, it } from "vitest";
import { aiMoments, aiPatternById, aiPatterns, knownSlugs, sourceById } from "../lib/content";
import { AI_MOMENTS } from "../lib/content/ai";

describe("AI UX pattern library", () => {
  it("has the seven moments in order", () => {
    expect(aiMoments.map((m) => m.id)).toEqual([...AI_MOMENTS]);
    expect(aiMoments.map((m) => m.n)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
  it("has unique pattern ids and at least two patterns per moment", () => {
    expect(new Set(aiPatterns.map((p) => p.id)).size).toBe(aiPatterns.length);
    for (const m of AI_MOMENTS) expect(aiPatterns.filter((p) => p.moment === m).length, m).toBeGreaterThanOrEqual(2);
  });
  it("relates only to existing patterns, never to itself", () => {
    for (const p of aiPatterns) for (const r of p.related) {
      expect(aiPatternById.has(r), `${p.id} → ${r}`).toBe(true);
      expect(r).not.toBe(p.id);
    }
  });
  it("links only to known taxonomy topics or entries", () => {
    for (const p of aiPatterns) for (const t of p.topics) expect(knownSlugs.has(t), `${p.id} → ${t}`).toBe(true);
  });
  it("rests only on sources in the registry", () => {
    for (const p of aiPatterns) for (const r of p.references) expect(sourceById.has(r.source), `${p.id} → ${r.source}`).toBe(true);
  });
});

describe("learning-path reference links", () => {
  it("point to existing AI patterns, design-system docs, guides and labs", async () => {
    const { learningPaths, aiPatternById: ai, systemDocs, guideById, labById } = await import("../lib/content");
    for (const p of learningPaths)
      for (const st of p.stages)
        for (const l of st.links) {
          const [, kind, a, b] = l.href.split("/");
          const ok = kind === "ai" ? ai.has(a) : kind === "guides" ? guideById.has(a) : kind === "labs" ? labById.has(a) : systemDocs.some((d) => d.section === a && d.id === b);
          expect(ok, `${p.id} → ${l.href}`).toBe(true);
        }
  });
});

describe("learning areas", () => {
  it("reference existing domains and paths, cover every domain, and use twelve letters", async () => {
    const { learningAreas } = await import("../content/learning-areas");
    const { domains, learningPaths } = await import("../lib/content");
    const ids = new Set(domains.map((d) => d.id));
    const paths = new Set(learningPaths.map((p) => p.id));
    expect(learningAreas.map((a) => a.letter).join("")).toBe("ABCDEFGHIJKL");
    for (const a of learningAreas) {
      for (const d of a.domains) expect(ids.has(d), `${a.id} → ${d}`).toBe(true);
      for (const p of a.paths) expect(paths.has(p), `${a.id} → ${p}`).toBe(true);
    }
    const covered = new Set(learningAreas.flatMap((a) => a.domains));
    expect([...ids].filter((d) => !covered.has(d))).toEqual([]);
  });
});
