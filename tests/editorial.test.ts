/**
 * Editorial gate (docs/EDITORIAL_STYLE_GUIDE.md). Catches the stock phrases and
 * repeated templates that make educational copy read as machine-generated.
 * It cannot judge quality — editors do — but it stops regressions.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { comparisons, domains, entries, glossary, labs, learningPaths, workshops } from "../lib/content";
import { collectStrings, richToPlain } from "../lib/content/rich";

/** Phrases with no place in UX Academy copy. Technical uses ("robust statistics", WCAG "Robust") are deliberately not listed. */
const BANNED: [RegExp, string][] = [
  [/\bin today'?s (fast-paced|digital|modern)\b/i, "in today's …"],
  [/\bfast-paced\b/i, "fast-paced"],
  [/\b(let'?s|we'?ll) (dive|delve|explore)\b/i, "let's dive/explore"],
  [/\bdelve\b/i, "delve"],
  [/\bat its core\b/i, "at its core"],
  [/\bit(?: is|'s) worth noting\b/i, "it is worth noting"],
  [/\bever-(evolving|changing) (landscape|world)\b/i, "ever-evolving landscape"],
  [/\bunlock the (power|potential)\b/i, "unlock the power"],
  [/\bseamless(ly)?\b/i, "seamless"],
  [/\bnext level\b/i, "next level"],
  [/\bcomprehensive guide\b/i, "comprehensive guide"],
  [/\bwhether you'?re a beginner\b/i, "whether you're a beginner"],
  [/\bin conclusion\b/i, "in conclusion"],
  [/\bgame[- ]chang/i, "game-changer"],
  [/\bnavigate the complexities\b/i, "navigate the complexities"],
  [/\b(revolutionary|cutting-edge|unparalleled|groundbreaking)\b/i, "hype adjective"],
  [/\bit(?: is|'s) important to (understand|note|remember)\b/i, "it's important to understand"],
];

const contentStrings = (): { where: string; text: string }[] => [
  ...entries.flatMap((e) => collectStrings(e).map((text) => ({ where: e.slug, text: richToPlain(text) }))),
  ...glossary.map((g) => ({ where: `glossary:${g.slug}`, text: g.definition })),
  ...learningPaths.flatMap((p) => [p.summary, p.audience, ...p.objectives, ...p.stages.map((s) => s.description)].map((text) => ({ where: `path:${p.id}`, text }))),
  ...comparisons.map((c) => ({ where: `compare:${c.id}`, text: richToPlain(c.summary) })),
  ...workshops.map((w) => ({ where: `workshop:${w.id}`, text: JSON.stringify(w) })),
  ...domains.map((d) => ({ where: `domain:${d.id}`, text: d.description })),
  ...labs.map((l) => ({ where: `lab:${l.id}`, text: [l.summary, ...l.assumptions].join(" ") })),
];

function uiFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return uiFiles(p);
    return /\.tsx$/.test(f) ? [p] : [];
  });
}

describe("editorial gate", () => {
  it("content contains none of the banned stock phrases", () => {
    const hits = contentStrings().flatMap(({ where, text }) => BANNED.filter(([re]) => re.test(text)).map(([, name]) => `${where}: “${name}”`));
    expect(hits).toEqual([]);
  });

  it("interface copy contains none of the banned stock phrases", () => {
    const root = new URL("..", import.meta.url).pathname;
    const hits = [...uiFiles(join(root, "app")), ...uiFiles(join(root, "components"))].flatMap((f) => {
      const src = readFileSync(f, "utf8");
      return BANNED.filter(([re]) => re.test(src)).map(([, name]) => `${f.replace(root, "")}: “${name}”`);
    });
    expect(hits).toEqual([]);
  });

  it("analogies do not fall back on one opening template", () => {
    const openers = entries.map((e) => e.levels.beginner.analogy ?? "").filter((a) => /^(Think of|It is like|It's like|Imagine)\b/.test(a));
    expect(openers.length, openers.join("\n")).toBeLessThanOrEqual(3);
  });

  it("summaries do not share a stock opening", () => {
    const starts = entries.map((e) => richToPlain(e.summary).split(/\s+/).slice(0, 3).join(" ").toLowerCase());
    const counts = starts.reduce<Record<string, number>>((a, s) => ((a[s] = (a[s] ?? 0) + 1), a), {});
    const repeated = Object.entries(counts).filter(([, n]) => n > 3);
    expect(repeated).toEqual([]);
  });
});
