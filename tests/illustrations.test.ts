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

describe("Visual Learning System metadata (D-089)", async () => {
  const { visualRegister } = await import("../components/illustrations/visual-register");
  const { VISUAL_CATEGORIES, EXPLANATION_METHODS, METHOD_FOR_TYPE } = await import("../components/illustrations/visual-taxonomy");
  const { visualExplanations } = await import("../components/visual-explanations/registry");
  const cats = new Set<string>(VISUAL_CATEGORIES.map((c) => c.id));
  const methods = new Set<string>(EXPLANATION_METHODS.map((m) => m.id));
  it("defines exactly 12 categories and 5 methods", () => {
    expect(VISUAL_CATEGORIES).toHaveLength(12);
    expect(EXPLANATION_METHODS).toHaveLength(5);
  });
  it("has one register record per registered plate, and none for unknown slugs", () => {
    expect([...illustrations.keys()].filter((s) => !visualRegister[s])).toEqual([]);
    expect(Object.keys(visualRegister).filter((s) => !illustrations.has(s))).toEqual([]);
  });
  it("uses only valid categories and methods, and never repeats the primary as a secondary", () => {
    for (const [slug, v] of Object.entries(visualRegister)) {
      expect(cats.has(v.category), slug).toBe(true);
      expect(methods.has(v.method), slug).toBe(true);
      for (const c of v.secondary ?? []) expect(cats.has(c) && c !== v.category, slug).toBe(true);
      for (const m of v.secondaryMethods ?? []) expect(methods.has(m) && m !== v.method, slug).toBe(true);
      expect(v.note.length, slug).toBeGreaterThan(10);
    }
  });
  it("resolves a method for every Level-2 figure", () => {
    for (const v of visualExplanations) expect(methods.has(v.method ?? METHOD_FOR_TYPE[v.type]), v.id).toBe(true);
  });
  it("only marks a plate 'retain' in the earlier pastel style when the audit says it already fits", () => {
    const retainedPastel = Object.entries(visualRegister).filter(([s, v]) => v.review === "retain" && !illustrations.get(s)?.canvas).map(([s]) => s);
    expect(retainedPastel.sort()).toEqual(["confidence-intervals", "serial-position-effect"]);
  });
});
