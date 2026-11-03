/** Coverage register — computed from real content only. */
import { domains, entries, itemsForSubcategory } from "./index";
import { CONTENT_STATUSES, type ContentStatus } from "./schema";

export type CoverageRow = {
  id: string;
  title: string;
  total: number;
  byStatus: Record<ContentStatus, number>;
  published: number;
};

function emptyStatus(): Record<ContentStatus, number> {
  return Object.fromEntries(CONTENT_STATUSES.map((s) => [s, 0])) as Record<ContentStatus, number>;
}

export function domainCoverage(): (CoverageRow & { subcategories: CoverageRow[] })[] {
  return domains.map((d) => {
    const subs = d.subcategories.map((s) => {
      const items = itemsForSubcategory(d.id, s.id);
      const byStatus = emptyStatus();
      for (const i of items) byStatus[i.entry?.status ?? "planned"]++;
      return { id: s.id, title: s.title, total: items.length, byStatus, published: byStatus.published };
    });
    const byStatus = emptyStatus();
    subs.forEach((s) => CONTENT_STATUSES.forEach((k) => (byStatus[k] += s.byStatus[k])));
    return { id: d.id, title: d.title, total: subs.reduce((a, s) => a + s.total, 0), byStatus, published: byStatus.published, subcategories: subs };
  });
}

export function qualitySummary() {
  const gates = ["classification", "explanation", "research", "beginner", "professional", "examples", "limitations", "relationships", "sources", "activities"] as const;
  return gates.map((g) => ({ gate: g, passing: entries.filter((e) => e.quality[g]).length, total: entries.length }));
}
