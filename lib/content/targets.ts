/**
 * Maturity targets by what a topic is (D-129, docs/BALANCED_DEVELOPMENT_PLAN.md § 9.2).
 *
 * `maturity()` (completeness.ts) rates five dimensions against one universal
 * bar and is unchanged. This module answers a different question for the two
 * dimensions where one bar does not fit every topic:
 *  - Visual: which formats this *type* of knowledge needs as a minimum. A
 *    plate, a detailed diagram and an interactive tool are never required
 *    together; interactive tools are never required at all.
 *  - Evidence: what an honest evidence base looks like for this *evidence
 *    class*. Documented limitations count; they are not a deficit.
 * Reporting only: no gate or test depends on it.
 */
import { TYPE_FAMILY } from "./completeness";
import type { EvidenceClass, KnowledgeEntry } from "./schema";

export type TargetContext = { hasPlate: boolean; hasDiagram: boolean; hasInteractive: boolean; verifiedPrimary: number; verifiedAny: number };
export type TargetResult = { met: boolean; missing: string[] };

const n = (xs: unknown[] | undefined) => xs?.length ?? 0;

export type EvidenceGroup = "established" | "contested" | "emerging" | "guideline";
export const EVIDENCE_GROUP: Record<EvidenceClass, EvidenceGroup> = {
  "original-empirical": "established",
  "peer-reviewed": "established",
  "established-theory": "established",
  "official-standard": "established",
  contested: "contested",
  "emerging-hypothesis": "emerging",
  "professional-guideline": "guideline",
  "practitioner-recommendation": "guideline",
};

export function visualTarget(e: KnowledgeEntry, ctx: TargetContext): TargetResult {
  const missing: string[] = [];
  if (!ctx.hasPlate) missing.push("plate");
  const computes = ctx.hasInteractive || Boolean(e.lab) || e.formulas.some((f) => f.calculator);
  switch (TYPE_FAMILY[e.primaryType]) {
    case "quantitative":
      if (!ctx.hasDiagram && !computes) missing.push("a detailed diagram or a calculator/lab");
      break;
    case "procedural":
    case "explanatory":
      if (!ctx.hasDiagram) missing.push("a detailed diagram");
      break;
    default:
      break; // plate is the minimum; anything more only where it teaches
  }
  return { met: missing.length === 0, missing };
}

export function evidenceTarget(e: KnowledgeEntry, ctx: TargetContext): TargetResult {
  const primary = e.references.filter((r) => r.role === "primary" || r.role === "standard").length;
  const points = n(e.levels.advanced.evidence);
  const debate = n(e.levels.advanced.debates) + n(e.levels.advanced.alternativeModels) >= 1;
  const note = e.evidenceNote.trim().length > 0;
  const checks: [boolean, string][] = (() => {
    switch (EVIDENCE_GROUP[e.evidence]) {
      case "established":
        return [
          [primary >= 2, "two primary or standard sources"],
          [ctx.verifiedPrimary >= 1, "a machine-verified primary source"],
          [points >= 2, "two evidence points"],
          [note && debate, "a stated debate or competing model"],
        ];
      case "contested":
        return [
          [primary >= 1, "a primary source for the original claim"],
          [points >= 1, "an evidence point reporting the contrary or failed replication"],
          [debate, "a stated debate"],
          [note, "an evidence note naming the limitation"],
        ];
      case "emerging":
        return [
          [primary >= 1, "a primary or authoritative source"],
          [points >= 1, "an evidence point"],
          [note, "an evidence note saying what is not yet known"],
        ];
      case "guideline":
        return [
          [primary >= 1, "the originating publication as a primary source"],
          [ctx.verifiedAny >= 1, "a machine-verified source"],
          [points >= 1, "an evidence point"],
          [note, "an evidence note stating what kind of evidence supports it"],
        ];
    }
  })();
  const missing = checks.filter(([ok]) => !ok).map(([, label]) => label);
  return { met: missing.length === 0, missing };
}
