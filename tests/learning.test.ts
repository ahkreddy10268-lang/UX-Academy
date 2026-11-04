import { describe, expect, it } from "vitest";
import { entryBySlug, learningPaths } from "@/lib/content";
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

  it("every path has its own artwork palette entry", () => {
    for (const p of learningPaths) expect(PATH_PALETTE[p.id], p.id).toBeDefined();
  });

  it("a lesson's primary visual belongs to that lesson", () => {
    for (const p of learningPaths) for (const s of p.stages) for (const slug of s.steps) for (const v of visualsFor(slug)) expect(v.slug).toBe(slug);
  });
});
