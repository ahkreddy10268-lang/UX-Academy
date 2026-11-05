/** Illustration system integrity: coverage, registry hygiene, accessibility text. */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { illustrations } from "../components/illustrations/registry";
import { domains, entries, knownSlugs } from "../lib/content";

const domainIds = new Set(domains.map((d) => d.id));

describe("illustration registry", () => {
  it("has a plate for every published entry", () => {
    const missing = entries.filter((e) => e.status === "published" && !illustrations.has(e.slug)).map((e) => e.slug);
    expect(missing).toEqual([]);
  });
  it("has a subject plate for every domain", () => {
    expect(domains.filter((d) => !illustrations.has(d.id)).map((d) => d.id)).toEqual([]);
  });
  it("only registers plates for known slugs or domain ids", () => {
    const unknown = [...illustrations.keys()].filter((s) => !knownSlugs.has(s) && !domainIds.has(s));
    expect(unknown).toEqual([]);
  });
  it("gives every plate a title and a substantive description", () => {
    for (const p of illustrations.values()) {
      expect(p.title.length, p.slug).toBeGreaterThan(4);
      expect(p.description.split(/\s+/).length, `${p.slug} description too short`).toBeGreaterThanOrEqual(12);
    }
  });
  it("uses explorers only from the implemented set", () => {
    const ok = new Set(["fitts", "hick", "peak-end", "chunking", "gestalt", "cognitive-load", "signifiers", "colour", "hci-methods"]);
    for (const p of illustrations.values()) if (p.explorer) expect(ok.has(p.explorer), p.slug).toBe(true);
  });
});

describe("dark technical editorial system (illustration v6, D-086)", () => {
  const read = (p: string) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");
  const V6_FILES = ["components/illustrations/system/viz.tsx", "components/illustrations/concepts/viz-plates.tsx", "components/visual-explanations/concepts/accessibility-concept.tsx"];
  it("v6 files take colour only from tokens (no hex, rgb or hsl literals)", () => {
    for (const f of V6_FILES) expect(read(f).match(/#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(/g) ?? [], f).toEqual([]);
  });
  it("v6 plates do not use the human Figure primitive", () => {
    expect(read("components/illustrations/concepts/viz-plates.tsx")).not.toMatch(/\bFigure\b/);
  });
  it("the accessibility pilot plate uses the viz canvas", () => {
    expect(illustrations.get("accessibility-concept")?.canvas).toBe("viz");
  });
});
