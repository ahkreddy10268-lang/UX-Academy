/**
 * Knowledge Atlas (`/topics`): the whole frozen taxonomy as a minimal,
 * serialisable tree — Domain → Subcategory → Topic — with each topic's
 * computed status and destination. Built only from `content/taxonomy.ts` via
 * the content loader and `topicStatus()`; nothing here restates the taxonomy.
 * `filterAtlas` is pure so the client explorer and the tests share one
 * definition of what a search or filter shows.
 */
import { domains, entryBySlug, itemsForSubcategory } from "./index";
import { paletteFor } from "./categories";
import { topicStatus } from "./coverage";
import type { Atlas, AtlasDomain } from "./atlas-filter";
import { TYPE_LABEL } from "./labels";

export * from "./atlas-filter";

export function buildAtlas(): Atlas {
  const used = new Set<string>();
  const out: AtlasDomain[] = domains.map((d, i) => ({
    id: d.id,
    n: i + 1,
    title: d.title,
    shortTitle: d.shortTitle,
    description: d.description,
    palette: paletteFor(d.id),
    subcategories: d.subcategories.map((s) => ({
      id: s.id,
      title: s.title,
      topics: itemsForSubcategory(d.id, s.id).map((t) => {
        used.add(t.type);
        const status = topicStatus(t);
        const parent = status === "addressed" && t.coveredBy ? entryBySlug.get(t.coveredBy) : undefined;
        return {
          slug: t.slug,
          title: t.title,
          type: t.type,
          status,
          href: parent ? `/library/${parent.slug}` : `/library/${t.slug}`,
          ...(t.aliases?.length ? { aliases: t.aliases } : {}),
          ...(parent ? { coveredBy: { slug: parent.slug, title: parent.title } } : {}),
        };
      }),
    })),
  }));
  const typeLabels = Object.fromEntries([...used].sort((a, b) => TYPE_LABEL[a as keyof typeof TYPE_LABEL].localeCompare(TYPE_LABEL[b as keyof typeof TYPE_LABEL])).map((t) => [t, TYPE_LABEL[t as keyof typeof TYPE_LABEL]]));
  return { domains: out, typeLabels };
}

