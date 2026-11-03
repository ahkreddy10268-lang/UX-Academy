/**
 * Content loader. Parses every content module once (zod), builds lookup maps
 * and derives the knowledge graph. Server-only in practice: it is imported by
 * server components and route handlers; client components receive plain props.
 */
import { rawEntries } from "../../content/knowledge/_index";
import { rawSources } from "../../content/sources/_index";
import verificationJson from "../../content/sources/verification.json";
import { domains } from "../../content/taxonomy";
import { glossary as rawGlossary } from "../../content/glossary";
import { comparisons as rawComparisons } from "../../content/comparisons";
import { workshops as rawWorkshops } from "../../content/workshops";
import { learningPaths as rawPaths } from "../../content/learning-paths";
import { standaloneFormulas as rawFormulas } from "../../content/formulas";
import { labs } from "../../content/labs";
import {
  comparisonSchema,
  glossaryTermSchema,
  knowledgeEntrySchema,
  learningPathSchema,
  sourceSchema,
  standaloneFormulaSchema,
  workshopSchema,
  type Domain,
  type KnowledgeEntry,
  type KnowledgeType,
  type RelationType,
  type Source,
} from "./schema";

function parseAll<T>(label: string, schema: { safeParse: (v: unknown) => { success: boolean; data?: T; error?: { issues: { path: PropertyKey[]; message: string }[] } } }, items: unknown[], key: (v: unknown) => string): T[] {
  return items.map((item) => {
    const r = schema.safeParse(item);
    if (!r.success) {
      const issues = r.error!.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`).join("\n");
      throw new Error(`Invalid ${label} "${key(item)}":\n${issues}`);
    }
    return r.data as T;
  });
}
const keyOf = (v: unknown) => String((v as { id?: string; slug?: string })?.id ?? (v as { slug?: string })?.slug ?? "?");

export const entries: KnowledgeEntry[] = parseAll<KnowledgeEntry>("entry", knowledgeEntrySchema, rawEntries, keyOf).sort((a, b) =>
  a.title.localeCompare(b.title),
);
export const sources: Source[] = parseAll<Source>("source", sourceSchema, rawSources, keyOf);
export const glossary = parseAll("glossary term", glossaryTermSchema, rawGlossary, keyOf).sort((a, b) => a.term.localeCompare(b.term));
export const comparisons = parseAll("comparison", comparisonSchema, rawComparisons, keyOf);
export const workshops = parseAll("workshop", workshopSchema, rawWorkshops, keyOf);
export const learningPaths = parseAll("learning path", learningPathSchema, rawPaths, keyOf);
export const standaloneFormulas = parseAll("formula", standaloneFormulaSchema, rawFormulas, keyOf);
export { domains, labs };

/* ------------------------------------------------------------------ */
/* Lookups                                                             */
/* ------------------------------------------------------------------ */

export const entryBySlug = new Map(entries.map((e) => [e.slug, e]));
export const sourceById = new Map(sources.map((s) => [s.id, s]));
export const domainById = new Map(domains.map((d) => [d.id, d]));
export const labById = new Map(labs.map((l) => [l.id, l]));

export type VerificationRecord = {
  status: "doi-verified" | "doi-mismatch" | "doi-not-found" | "url-reachable" | "url-unreachable";
  checkedAt: string;
  registeredTitle?: string;
  registeredYear?: number;
  registeredContainer?: string;
  similarity?: number;
  httpStatus?: number;
  detail?: string;
};
export const verification = verificationJson as Record<string, VerificationRecord>;

export type TaxonomyItem = {
  slug: string;
  title: string;
  type: KnowledgeType;
  domain: string;
  subcategory: string;
  entry?: KnowledgeEntry;
};

export const taxonomyItems: TaxonomyItem[] = domains.flatMap((d) =>
  d.subcategories.flatMap((s) =>
    s.items.map((i) => {
      const entry = entryBySlug.get(i.slug);
      // A written entry's own classification wins over the taxonomy placeholder.
      return { ...i, type: entry?.primaryType ?? i.type, domain: d.id, subcategory: s.id, entry };
    }),
  ),
);
export const taxonomyBySlug = new Map(taxonomyItems.map((t) => [t.slug, t]));

/** Entries that are not listed in the taxonomy still belong to their domain/subcategory. */
export function itemsForSubcategory(domainId: string, subId: string): TaxonomyItem[] {
  const listed = taxonomyItems.filter((t) => t.domain === domainId && t.subcategory === subId);
  const extra = entries
    .filter((e) => e.domain === domainId && e.subcategory === subId && !taxonomyBySlug.has(e.slug))
    .map((e) => ({ slug: e.slug, title: e.title, type: e.primaryType, domain: domainId, subcategory: subId, entry: e }));
  return [...listed, ...extra];
}

export function titleFor(slug: string): string | undefined {
  return entryBySlug.get(slug)?.title ?? taxonomyBySlug.get(slug)?.title;
}

export function hrefFor(slug: string): string | undefined {
  if (entryBySlug.has(slug)) return `/library/${slug}`;
  if (taxonomyBySlug.has(slug)) return `/library/${slug}`; // planned topic page
  return undefined;
}

export function domainOf(e: { domain: string }): Domain | undefined {
  return domainById.get(e.domain);
}

export function subcategoryTitle(domainId: string, subId: string): string | undefined {
  return domainById.get(domainId)?.subcategories.find((s) => s.id === subId)?.title;
}

/** Every slug that may be the target of a link or path step. */
export const knownSlugs = new Set<string>([...entries.map((e) => e.slug), ...taxonomyItems.map((t) => t.slug)]);

/* ------------------------------------------------------------------ */
/* Knowledge graph                                                     */
/* ------------------------------------------------------------------ */

export type EdgeType = RelationType | "prerequisite-of";
export type GraphEdge = { from: string; to: string; type: EdgeType; note: string };

export const graphEdges: GraphEdge[] = entries.flatMap((e) => [
  ...e.prerequisites.map((p) => ({
    from: p,
    to: e.slug,
    type: "prerequisite-of" as const,
    note: `${titleFor(p) ?? p} is recommended before ${e.title}.`,
  })),
  ...e.relations.map((r) => ({ from: e.slug, to: r.target, type: r.type, note: r.note })),
]);

export function edgesFor(slug: string) {
  return {
    outgoing: graphEdges.filter((g) => g.from === slug),
    incoming: graphEdges.filter((g) => g.to === slug),
  };
}

/** Entries that list this slug as a prerequisite (what this unlocks). */
export function unlockedBy(slug: string): KnowledgeEntry[] {
  return entries.filter((e) => e.prerequisites.includes(slug));
}

/** All formulas in the library: those on entries and the standalone ones. */
export type LibraryFormula = {
  id: string;
  name: string;
  expression: string;
  calculator?: string;
  host: { slug: string; title: string; hasEntry: boolean };
  summary: string;
};
export const libraryFormulas: LibraryFormula[] = [
  ...entries.flatMap((e) =>
    e.formulas.map((f) => ({
      id: f.id,
      name: f.name,
      expression: f.expression,
      calculator: f.calculator,
      host: { slug: e.slug, title: e.title, hasEntry: true },
      summary: e.summary,
    })),
  ),
  ...standaloneFormulas.map((f) => ({
    id: f.id,
    name: f.name,
    expression: f.expression,
    calculator: f.calculator,
    host: { slug: f.topic, title: titleFor(f.topic) ?? f.name, hasEntry: entryBySlug.has(f.topic) },
    summary: f.summary,
  })),
].sort((a, b) => a.name.localeCompare(b.name));

export const standaloneFormulaById = new Map(standaloneFormulas.map((f) => [f.id, f]));

/** All quiz questions across the library, tagged with their host entry. */
export const allQuestions = entries.flatMap((e) =>
  e.quiz.map((q) => ({ ...q, entry: e.slug, entryTitle: e.title, domain: e.domain })),
);

export const allFlashcards = entries.flatMap((e) =>
  e.flashcards.map((c) => ({ ...c, entry: e.slug, entryTitle: e.title })),
);
