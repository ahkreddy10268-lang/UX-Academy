/**
 * Domain / subcategory completion report. Joins the taxonomy with the five
 * maturity dimensions (lib/content/completeness.ts) so a gap shows where it is:
 * missing topics, missing research, thin practice, no visual. Everything is
 * computed from the content; presentation registries are used only to answer
 * "does this entry have a plate / diagram / explorer".
 */
import { hasVisuals } from "@/components/visual-explanations/registry";
import { illustrations } from "@/components/illustrations/registry";
import { researchLedger } from "../content/topic-ledger";
import { domains, itemsForSubcategory, sources, verification, type TaxonomyItem } from "./content";
import { maturity, type Maturity } from "./content/completeness";
import { evidenceTarget, visualTarget, type TargetResult } from "./content/targets";
import { topicStatus } from "./content/coverage";
import type { KnowledgeEntry } from "./content/schema";

const DIMENSIONS = ["explanation", "evidence", "practice", "visual", "editorial"] as const;
export type Dimension = (typeof DIMENSIONS)[number];

export function maturityOf(e: KnowledgeEntry): Maturity {
  const verifiedPrimary = e.references.filter((r) => (r.role === "primary" || r.role === "standard") && ["doi-verified", "url-reachable"].includes(verification[r.source]?.status ?? "")).length;
  const awaitingVerification = e.references.filter((r) => sources.find((s) => s.id === r.source)?.verification === "awaiting-verification").length;
  const plate = illustrations.get(e.slug);
  return maturity(e, { hasPlate: Boolean(plate), hasDiagram: hasVisuals(e.slug), hasInteractive: Boolean(plate?.explorer), verifiedPrimary, awaitingVerification });
}

/** Visual and evidence targets by type and evidence class (D-129); reporting only. */
export function targetsOf(e: KnowledgeEntry): { visual: TargetResult; evidence: TargetResult } {
  const ok = (id: string) => ["doi-verified", "url-reachable"].includes(verification[id]?.status ?? "");
  const plate = illustrations.get(e.slug);
  const ctx = {
    hasPlate: Boolean(plate),
    hasDiagram: hasVisuals(e.slug),
    hasInteractive: Boolean(plate?.explorer),
    verifiedPrimary: e.references.filter((r) => (r.role === "primary" || r.role === "standard") && ok(r.source)).length,
    verifiedAny: e.references.filter((r) => ok(r.source)).length,
  };
  return { visual: visualTarget(e, ctx), evidence: evidenceTarget(e, ctx) };
}

export type Completion = {
  id: string;
  title: string;
  total: number;
  published: number;
  planned: number;
  /** Topics whose research is complete or further along (research-completed, drafted, reviewed, published). */
  researchDone: number;
  /** Published entries rated "complete" on each dimension. */
  complete: Record<Dimension, number>;
};

function completionOf(id: string, title: string, items: TaxonomyItem[]): Completion {
  const pub = items.filter((i) => i.entry?.status === "published");
  const complete = Object.fromEntries(DIMENSIONS.map((d) => [d, 0])) as Record<Dimension, number>;
  for (const i of pub) {
    const m = maturityOf(i.entry!);
    for (const d of DIMENSIONS) if (m[d] === "complete") complete[d]++;
  }
  const status = (i: TaxonomyItem) => i.entry?.status ?? researchLedger[i.slug]?.status;
  return {
    id,
    title,
    total: items.length,
    published: pub.length,
    planned: items.filter((i) => topicStatus(i) === "planned").length,
    researchDone: items.filter((i) => ["research-completed", "drafted", "reviewed", "published"].includes(status(i) ?? "")).length,
    complete,
  };
}

export function completionReport(): (Completion & { subcategories: Completion[] })[] {
  return domains.map((d) => {
    const subs = d.subcategories.map((s) => completionOf(s.id, s.title, itemsForSubcategory(d.id, s.id)));
    const all = d.subcategories.flatMap((s) => itemsForSubcategory(d.id, s.id));
    return { ...completionOf(d.id, d.title, all), subcategories: subs };
  });
}
