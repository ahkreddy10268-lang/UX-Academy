/**
 * Content completeness and maturity (docs/CONTENT_MODEL.md § Completeness).
 *
 * Two layers, both computed from the content itself — never entered by hand:
 *  1. GATES — type-specific structural requirements an entry must meet to be
 *     published (enforced by tests/content.test.ts). They check that the parts
 *     a learner needs for this *kind* of knowledge exist (a method has a
 *     procedure; a theory states competing accounts; a metric has its formula),
 *     not how long the prose is. No word counts.
 *  2. MATURITY — five separate dimensions rated basic / developing / complete,
 *     so depth gaps are visible without pretending to a numeric confidence.
 */
import type { KnowledgeEntry, KnowledgeType } from "./schema";

export type Check = { id: string; label: string; ok: boolean };

/** Families of knowledge types that need the same structural parts. */
export const TYPE_FAMILY: Record<KnowledgeType, "quantitative" | "procedural" | "explanatory" | "normative" | "standard" | "phenomenon" | "practice" | "discipline"> = {
  law: "quantitative",
  formula: "quantitative",
  metric: "quantitative",
  "research-instrument": "quantitative",
  method: "procedural",
  methodology: "procedural",
  technique: "practice",
  strategy: "practice",
  tool: "practice",
  pattern: "practice",
  "anti-pattern": "practice",
  theory: "explanatory",
  model: "explanatory",
  framework: "explanatory",
  principle: "normative",
  heuristic: "normative",
  "rule-of-thumb": "normative",
  guideline: "normative",
  standard: "standard",
  concept: "phenomenon",
  "cognitive-bias": "phenomenon",
  "emerging-concept": "phenomenon",
  discipline: "discipline",
  "case-study": "practice",
  "historical-contribution": "discipline",
};

const n = (xs: unknown[] | undefined) => xs?.length ?? 0;

/** Level-specific depth: what each level must contain to teach at that level. */
export function levelChecks(e: KnowledgeEntry): Record<"beginner" | "intermediate" | "advanced", Check[]> {
  const b = e.levels.beginner;
  const i = e.levels.intermediate;
  const a = e.levels.advanced;
  return {
    beginner: [
      { id: "b-explain", label: "Plain-language explanation in at least two steps", ok: n(b.explanation) >= 2 },
      { id: "b-anchor", label: "An analogy or everyday examples", ok: Boolean(b.analogy) || n(b.everydayExamples) >= 2 },
      { id: "b-terms", label: "Key vocabulary defined", ok: n(b.vocabulary) >= 3 },
    ],
    intermediate: [
      { id: "i-mechanism", label: "How it works (mechanism)", ok: n(i.howItWorks) >= 1 },
      { id: "i-apply", label: "Implementation guidance", ok: n(i.implementation) >= 2 },
      { id: "i-scenario", label: "At least one realistic scenario", ok: n(i.scenarios) >= 1 },
    ],
    advanced: [
      { id: "a-evidence", label: "Research evidence discussed", ok: n(a.evidence) >= 1 },
      { id: "a-critique", label: "Debates or competing models", ok: n(a.debates) + n(a.alternativeModels) >= 1 },
      { id: "a-explain", label: "Expert-level explanation", ok: n(a.explanation) >= 2 },
    ],
  };
}

/** Type-specific gate: the parts this kind of knowledge cannot do without. */
export function typeChecks(e: KnowledgeEntry): Check[] {
  const fam = TYPE_FAMILY[e.primaryType];
  const primaryRefs = e.references.filter((r) => r.role === "primary" || r.role === "standard").length;
  const common: Check[] = [
    { id: "primary-source", label: "At least one primary or standard source", ok: primaryRefs >= 1 },
    { id: "limits", label: "Limitations stated", ok: n(e.limitations) >= 2 },
    { id: "misreadings", label: "When not to use it", ok: n(e.whenNotToUse) >= 1 },
    { id: "relations", label: "Connected to at least three topics", ok: n(e.relations) + n(e.prerequisites) >= 3 },
    { id: "practice", label: "Quiz questions at two or more levels", ok: new Set(e.quiz.map((q) => q.level)).size >= 2 },
  ];
  const specific: Check[] = (() => {
    switch (fam) {
      case "quantitative":
        return [{ id: "formula", label: "Formula with variables and a worked example", ok: e.formulas.length >= 1 }];
      case "procedural":
        return [
          { id: "procedure", label: "Method detail: procedure, participants, duration, outputs", ok: Boolean(e.method) },
          { id: "steps", label: "Practical steps", ok: n(e.application.steps) >= 3 },
        ];
      case "practice":
        return [{ id: "steps", label: "Practical steps", ok: n(e.application.steps) >= 3 }];
      case "explanatory":
        return [
          { id: "origin", label: "Origin and contributors", ok: Boolean(e.origin) },
          { id: "alternatives", label: "Competing or alternative models", ok: n(e.levels.advanced.alternativeModels) >= 1 },
        ];
      case "normative":
        return [
          { id: "misconceptions", label: "Common misreadings corrected", ok: n(e.misconceptions) >= 1 },
          { id: "origin", label: "Origin (who proposed it, on what basis)", ok: Boolean(e.origin) },
        ];
      case "standard":
        return [{ id: "standard", label: "Standard detail: issuer, version, status, official link", ok: Boolean(e.standard) }];
      case "phenomenon":
        return [
          { id: "evidence", label: "Evidence for the effect, including replication status", ok: n(e.levels.advanced.evidence) >= 1 },
          { id: "misconceptions", label: "Common misreadings corrected", ok: n(e.misconceptions) >= 1 },
        ];
      case "discipline":
        return [
          { id: "origin", label: "History of the discipline", ok: Boolean(e.origin) },
          { id: "scope", label: "Scope across contexts (web, mobile, enterprise, services)", ok: [e.application.web, e.application.mobile, e.application.enterprise, e.application.services].filter((x) => n(x) > 0).length >= 3 },
        ];
    }
  })();
  return [...common, ...specific];
}

export type MaturityLevel = "basic" | "developing" | "complete";
export type Maturity = Record<"explanation" | "evidence" | "practice" | "visual" | "editorial", MaturityLevel>;

const rate = (passed: number, total: number): MaturityLevel => (passed === total ? "complete" : passed >= Math.ceil(total / 2) ? "developing" : "basic");

/**
 * Five independent maturity dimensions. Inputs that live outside the entry
 * (plates, diagrams, explorers, source verification) are passed in, so the
 * content layer never imports presentation code.
 */
export function maturity(
  e: KnowledgeEntry,
  ctx: { hasPlate: boolean; hasDiagram: boolean; hasInteractive: boolean; verifiedPrimary: number; awaitingVerification: number },
): Maturity {
  const lv = levelChecks(e);
  const all = [...lv.beginner, ...lv.intermediate, ...lv.advanced];
  const primary = e.references.filter((r) => r.role === "primary" || r.role === "standard").length;
  const evidence = [primary >= 2, ctx.verifiedPrimary >= 1, n(e.levels.advanced.evidence) >= 2, e.evidenceNote.length > 0 && n(e.levels.advanced.debates) >= 1];
  const practice = [n(e.quiz) >= 3, new Set(e.quiz.map((q) => q.level)).size === 3, n(e.exercises) >= 2, n(e.flashcards) >= 3];
  const visual = [ctx.hasPlate, ctx.hasDiagram, ctx.hasInteractive || Boolean(e.lab) || e.formulas.some((f) => f.calculator)];
  const editorial = [e.status === "published", Object.values(e.quality).every(Boolean), ctx.awaitingVerification === 0, Boolean(e.lastVerifiedAt)];
  return {
    explanation: rate(all.filter((c) => c.ok).length, all.length),
    evidence: rate(evidence.filter(Boolean).length, evidence.length),
    practice: rate(practice.filter(Boolean).length, practice.length),
    visual: rate(visual.filter(Boolean).length, visual.length),
    editorial: rate(editorial.filter(Boolean).length, editorial.length),
  };
}
