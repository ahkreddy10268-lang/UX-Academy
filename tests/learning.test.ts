import { describe, expect, it } from "vitest";
import { entryBySlug, learningPaths, taxonomyItems } from "@/lib/content";
import { levelQuestionCounts, stageStats } from "@/lib/content/learning";
import { visualsFor } from "@/components/visual-explanations/registry";
import { PATH_PALETTE } from "@/components/learn/path-art";

describe("learning paths", () => {
  it("level-test counts split every question into matching or other-level, never dropping or duplicating one", () => {
    for (const p of learningPaths)
      for (const s of p.stages) {
        const { matching, other } = levelQuestionCounts(s);
        expect(matching + other, `${p.id}/${s.title}`).toBe(stageStats(s).questions);
        const direct = s.steps.reduce((n, slug) => n + (entryBySlug.get(slug)?.quiz.filter((q) => q.level === s.level).length ?? 0), 0);
        expect(matching).toBe(direct);
      }
  });

  it("the design-systems path places every Design Systems topic exactly once (five-stage restructure, D-122)", () => {
    const path = learningPaths.find((p) => p.id === "design-systems")!;
    expect(path.stages.length).toBe(5);
    const steps = path.stages.flatMap((s) => s.steps);
    const domainSlugs = taxonomyItems.filter((t) => t.domain === "design-systems").map((t) => t.slug);
    const placed = steps.filter((slug) => domainSlugs.includes(slug));
    expect(domainSlugs.length).toBe(29);
    expect([...placed].sort()).toEqual([...domainSlugs].sort()); // no omissions
    expect(new Set(steps).size).toBe(steps.length); // no duplicates, including supporting topics
  });

  it("every path has its own artwork palette entry", () => {
    for (const p of learningPaths) expect(PATH_PALETTE[p.id], p.id).toBeDefined();
  });

  it("a lesson's primary visual belongs to that lesson", () => {
    for (const p of learningPaths) for (const s of p.stages) for (const slug of s.steps) for (const v of visualsFor(slug)) expect(v.slug).toBe(slug);
  });
});

describe("learning-path artwork", async () => {
  const { hasPathArt } = await import("@/components/learn/path-art");
  const { FIT } = await import("@/components/learn/art/fit");
  it("every path has its own scene and a measured fit inside the canvas", () => {
    for (const p of learningPaths) {
      expect(hasPathArt(p.id), p.id).toBe(true);
      const f = FIT[p.id];
      expect(f, p.id).toBeDefined();
      expect(f.k, `${p.id} scale`).toBeGreaterThan(0.6);
      expect(f.k, `${p.id} scale`).toBeLessThanOrEqual(2.1);
    }
  });
});
