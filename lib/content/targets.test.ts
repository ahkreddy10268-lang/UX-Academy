import { describe, expect, it } from "vitest";
import { entryBySlug } from ".";
import type { KnowledgeEntry } from "./schema";
import { EVIDENCE_GROUP, evidenceTarget, visualTarget, type TargetContext } from "./targets";

const base = entryBySlug.get("heuristic-evaluation")!; // a published method entry, used as a template
const make = (over: Partial<KnowledgeEntry>): KnowledgeEntry => ({ ...base, ...over });
const ctx = (over: Partial<TargetContext> = {}): TargetContext => ({ hasPlate: true, hasDiagram: false, hasInteractive: false, verifiedPrimary: 0, verifiedAny: 0, ...over });
const refs = (k: number) => Array.from({ length: k }, (_, i) => ({ source: `s${i}`, role: "primary" as const }));
const adv = (evidence: number, debates: number) => ({ ...base.levels, advanced: { ...base.levels.advanced, evidence: Array(evidence).fill("x"), debates: Array(debates).fill("x"), alternativeModels: [] } });

describe("visual target (D-129)", () => {
  it("needs only a plate for principles, concepts, practices, standards and disciplines", () => {
    for (const t of ["principle", "concept", "pattern", "standard", "discipline"] as const) expect(visualTarget(make({ primaryType: t }), ctx()).met, t).toBe(true);
  });
  it("needs a detailed diagram for methods and models, never an interactive tool", () => {
    expect(visualTarget(make({ primaryType: "method" }), ctx()).missing).toEqual(["a detailed diagram"]);
    expect(visualTarget(make({ primaryType: "model" }), ctx({ hasDiagram: true })).met).toBe(true);
  });
  it("accepts a diagram or a calculator/lab for quantitative topics", () => {
    expect(visualTarget(make({ primaryType: "law", lab: undefined, formulas: [] }), ctx()).met).toBe(false);
    expect(visualTarget(make({ primaryType: "law", lab: "fitts-lab", formulas: [] }), ctx()).met).toBe(true);
    expect(visualTarget(make({ primaryType: "law", lab: undefined, formulas: [] }), ctx({ hasDiagram: true })).met).toBe(true);
  });
  it("always requires a plate", () => {
    expect(visualTarget(make({ primaryType: "concept" }), ctx({ hasPlate: false })).missing).toContain("plate");
  });
});

describe("evidence target (D-129)", () => {
  it("maps every evidence class to a group", () => {
    expect(Object.keys(EVIDENCE_GROUP)).toHaveLength(8);
  });
  it("holds established evidence to the full standard", () => {
    const e = make({ evidence: "peer-reviewed", references: refs(1), levels: adv(2, 1) });
    expect(evidenceTarget(e, ctx({ verifiedPrimary: 1 })).missing).toEqual(["two primary or standard sources"]);
    expect(evidenceTarget({ ...e, references: refs(2) }, ctx({ verifiedPrimary: 1 })).met).toBe(true);
  });
  it("does not require a debate or two primary sources for a guideline that documents its evidence honestly", () => {
    const e = make({ evidence: "practitioner-recommendation", references: refs(1), levels: adv(1, 0), evidenceNote: "Practitioner consensus; no controlled studies." });
    expect(evidenceTarget(e, ctx({ verifiedAny: 1 })).met).toBe(true);
  });
  it("requires contested topics to state the dispute", () => {
    const e = make({ evidence: "contested", references: refs(1), levels: adv(1, 0) });
    expect(evidenceTarget(e, ctx()).missing).toEqual(["a stated debate"]);
  });
  it("requires an evidence note for emerging topics", () => {
    const e = make({ evidence: "emerging-hypothesis", references: refs(1), levels: adv(1, 0), evidenceNote: "" });
    expect(evidenceTarget(e, ctx()).missing).toEqual(["an evidence note saying what is not yet known"]);
  });
});
