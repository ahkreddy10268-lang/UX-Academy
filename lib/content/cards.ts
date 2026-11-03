/** Builds card data from content (server). */
import type { CardData } from "@/components/knowledge/knowledge-card";
import { domainById, entries, entryBySlug, taxonomyItems } from "./index";
import { richToPlain } from "./rich";
import type { KnowledgeEntry } from "./schema";

export function cardFor(e: KnowledgeEntry): CardData {
  return {
    slug: e.slug,
    title: e.title,
    summary: richToPlain(e.summary),
    type: e.primaryType,
    domain: e.domain,
    subject: domainById.get(e.domain)?.shortTitle ?? e.domain,
    difficulty: e.difficulty,
    evidence: e.evidence,
    expression: e.formulas[0]?.expression,
    hasLab: Boolean(e.lab),
    hasCalculator: e.formulas.some((f) => f.calculator),
  };
}

export function cardForSlug(slug: string): CardData | undefined {
  const e = entryBySlug.get(slug);
  if (e) return cardFor(e);
  const t = taxonomyItems.find((x) => x.slug === slug);
  if (!t) return undefined;
  return { slug, title: t.title, summary: "", type: t.type, domain: t.domain, subject: domainById.get(t.domain)?.shortTitle ?? t.domain, planned: true };
}

export const publishedCards = () => entries.filter((e) => e.status === "published").map(cardFor);
