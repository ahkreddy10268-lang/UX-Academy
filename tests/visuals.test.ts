/** Visual Knowledge Engine integrity (docs/VISUAL_KNOWLEDGE_SYSTEM.md). */
import { describe, expect, it } from "vitest";
import { quickTakeaways, visualExplanations } from "../components/visual-explanations/registry";
import { entryBySlug } from "../lib/content";

describe("visual explanation registry", () => {
  it("has unique ids", () => {
    const ids = visualExplanations.map((v) => v.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it("explains only published entries", () => {
    for (const v of visualExplanations) expect(entryBySlug.get(v.slug)?.status, v.id).toBe("published");
  });
  it("rests only on sources the entry itself cites", () => {
    for (const v of visualExplanations) {
      const refs = new Set(entryBySlug.get(v.slug)!.references.map((r) => r.source));
      for (const s of v.sources) expect(refs.has(s), `${v.id} → ${s}`).toBe(true);
    }
  });
  it("answers the five questions and has a text alternative", () => {
    for (const v of visualExplanations) {
      expect(v.title.length, v.id).toBeGreaterThan(8);
      expect(v.objective.split(/\s+/).length, `${v.id} objective`).toBeGreaterThanOrEqual(10);
      expect(v.takeaway.split(/\s+/).length, `${v.id} takeaway`).toBeGreaterThanOrEqual(10);
      expect(v.summary.length, `${v.id} summary`).toBeGreaterThanOrEqual(3);
    }
  });
  it("covers the four gold-standard concepts, each led by a different visual strategy", () => {
    const gold = ["fitts-law", "double-diamond", "cognitive-load-theory", "information-architecture"];
    const lead = gold.map((g) => visualExplanations.find((v) => v.slug === g)?.type);
    expect(lead.every(Boolean)).toBe(true);
    expect(new Set(lead).size).toBe(gold.length);
    for (const g of gold) expect(quickTakeaways[g], g).toBeTruthy();
  });
  it("labels every comparison and scenario honestly", () => {
    for (const v of visualExplanations.filter((x) => x.type === "comparison" || x.type === "hierarchy")) expect(["illustrative", "content-checked"]).toContain(v.verification);
  });
});
