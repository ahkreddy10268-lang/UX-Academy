/** Coverage register — computed from real content only. */
import { researchLedger } from "../../content/topic-ledger";
import { domains, entries, itemsForSubcategory, type TaxonomyItem } from "./index";
import { CONTENT_STATUSES, type ContentStatus } from "./schema";

import { TOPIC_STATUSES, type TopicStatus } from "./topic-status";
export { TOPIC_STATUSES, TOPIC_STATUS_LABEL, type TopicStatus } from "./topic-status";

/** One explicit status per taxonomy topic, from the content itself. */
export function topicStatus(i: TaxonomyItem): TopicStatus {
  const s: ContentStatus | undefined = i.entry?.status ?? researchLedger[i.slug]?.status;
  if (s === "published") return "published";
  if (s === "reviewed") return "reviewed";
  if (s === "drafted") return "drafted";
  if (s === "research-pending" || s === "research-completed") return "research";
  return i.coveredBy ? "addressed" : "planned";
}

export type CoverageRow = {
  id: string;
  title: string;
  total: number;
  byStatus: Record<ContentStatus, number>;
  published: number;
  byTopicStatus: Record<TopicStatus, number>;
  /** Topics without their own entry that a published entry already explains (taxonomy `coveredBy`). Not counted as published. */
  addressedWithin: number;
};

function emptyTopic(): Record<TopicStatus, number> {
  return Object.fromEntries(TOPIC_STATUSES.map((s) => [s, 0])) as Record<TopicStatus, number>;
}

function emptyStatus(): Record<ContentStatus, number> {
  return Object.fromEntries(CONTENT_STATUSES.map((s) => [s, 0])) as Record<ContentStatus, number>;
}

export function domainCoverage(): (CoverageRow & { subcategories: CoverageRow[] })[] {
  return domains.map((d) => {
    const subs = d.subcategories.map((s) => {
      const items = itemsForSubcategory(d.id, s.id);
      const byStatus = emptyStatus();
      const byTopicStatus = emptyTopic();
      for (const i of items) {
        byStatus[i.entry?.status ?? researchLedger[i.slug]?.status ?? "planned"]++;
        byTopicStatus[topicStatus(i)]++;
      }
      const addressedWithin = items.filter((i) => !i.entry && i.coveredBy).length;
      return { id: s.id, title: s.title, total: items.length, byStatus, byTopicStatus, published: byStatus.published, addressedWithin };
    });
    const byStatus = emptyStatus();
    const byTopicStatus = emptyTopic();
    subs.forEach((s) => {
      CONTENT_STATUSES.forEach((k) => (byStatus[k] += s.byStatus[k]));
      TOPIC_STATUSES.forEach((k) => (byTopicStatus[k] += s.byTopicStatus[k]));
    });
    return { id: d.id, title: d.title, total: subs.reduce((a, s) => a + s.total, 0), byStatus, byTopicStatus, published: byStatus.published, addressedWithin: subs.reduce((a, s) => a + s.addressedWithin, 0), subcategories: subs };
  });
}

export function qualitySummary() {
  const gates = ["classification", "explanation", "research", "beginner", "professional", "examples", "limitations", "relationships", "sources", "activities"] as const;
  return gates.map((g) => ({ gate: g, passing: entries.filter((e) => e.quality[g]).length, total: entries.length }));
}
