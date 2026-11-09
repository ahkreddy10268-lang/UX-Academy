/**
 * UX Academy content schema.
 *
 * Every piece of educational content is validated against these schemas by
 * `tests/content.test.ts`. Content lives in `/content` as typed TypeScript
 * modules; presentation lives in `/components` and `/app`. Never duplicate a
 * content record to show it in two places — reference it by slug or id.
 *
 * Rich text ("Rich") is a plain string supporting a deliberately small markup:
 *   **bold**   *emphasis*   `code`
 *   [[slug]] or [[slug|label]]   → link to a knowledge entry (validated)
 *   {{src:source-id}}            → inline citation to the source registry (validated)
 * Paragraphs are separate array items.
 */
import { z } from "zod";

/* ------------------------------------------------------------------ */
/* Controlled vocabularies                                             */
/* ------------------------------------------------------------------ */

export const KNOWLEDGE_TYPES = [
  "theory",
  "law",
  "principle",
  "heuristic",
  "rule-of-thumb",
  "framework",
  "model",
  "methodology",
  "method",
  "technique",
  "strategy",
  "formula",
  "metric",
  "standard",
  "guideline",
  "pattern",
  "anti-pattern",
  "concept",
  "cognitive-bias",
  "research-instrument",
  "tool",
  "discipline",
  "case-study",
  "historical-contribution",
  "emerging-concept",
] as const;
export type KnowledgeType = (typeof KNOWLEDGE_TYPES)[number];

export const DIFFICULTIES = ["beginner", "intermediate", "advanced"] as const;
export type Difficulty = (typeof DIFFICULTIES)[number];

export const EVIDENCE_CLASSES = [
  "original-empirical",
  "peer-reviewed",
  "established-theory",
  "official-standard",
  "professional-guideline",
  "practitioner-recommendation",
  "emerging-hypothesis",
  "contested",
] as const;
export type EvidenceClass = (typeof EVIDENCE_CLASSES)[number];

export const CONTENT_STATUSES = [
  "planned",
  "research-pending",
  "research-completed",
  "drafted",
  "reviewed",
  "published",
] as const;
export type ContentStatus = (typeof CONTENT_STATUSES)[number];

export const RELATION_TYPES = [
  "related-to",
  "derived-from",
  "applied-in",
  "contrasts-with",
  "measured-by",
  "developed-from",
  "influences",
  "complementary-to",
] as const;
export type RelationType = (typeof RELATION_TYPES)[number];

export const REFERENCE_ROLES = ["primary", "standard", "explanatory", "further"] as const;

export const SOURCE_TYPES = [
  "journal-article",
  "conference-paper",
  "book",
  "book-chapter",
  "standard",
  "official-documentation",
  "technical-report",
  "professional-article",
  "website",
] as const;

export const ACCESS_STATUSES = ["open", "paywalled", "partial", "unknown"] as const;

/**
 * How a source's bibliographic record was checked.
 * - "doi-verified": DOI resolved via Crossref and title/year matched (see scripts/verify-sources.ts).
 * - "url-checked": canonical URL fetched successfully in a research session.
 * - "bibliographic": recorded from established bibliographic knowledge; not yet machine-verified.
 * - "awaiting-verification": incomplete or uncertain record — do not rely on it.
 * The verification script overwrites this with machine evidence in content/sources/verification.json.
 */
export const VERIFICATION_STATUSES = [
  "doi-verified",
  "url-checked",
  "bibliographic",
  "awaiting-verification",
] as const;

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slugs are lowercase-kebab-case");
const rich = z.string().min(1);
const richBlock = z.array(rich).min(1);
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "dates are YYYY-MM-DD");

/* ------------------------------------------------------------------ */
/* Sources                                                             */
/* ------------------------------------------------------------------ */

export const sourceSchema = z.object({
  id: slug, // e.g. "fitts-1954" — first author surname + year (+ letter)
  title: z.string().min(1),
  authors: z.array(z.string()).default([]), // "Surname, I." form
  organisation: z.string().optional(),
  container: z.string().optional(), // journal, proceedings, book, website
  publisher: z.string().optional(),
  year: z.number().int().min(1800).max(2100).optional(),
  volume: z.string().optional(),
  issue: z.string().optional(),
  pages: z.string().optional(),
  doi: z
    .string()
    .regex(/^10\.\d{4,9}\/\S+$/, "DOI without https://doi.org/ prefix")
    .optional(),
  isbn: z.string().optional(),
  url: z.string().url().optional(),
  type: z.enum(SOURCE_TYPES),
  tier: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
  topics: z.array(z.string()).default([]),
  licence: z.string().optional(),
  access: z.enum(ACCESS_STATUSES).default("unknown"),
  verification: z.enum(VERIFICATION_STATUSES),
  lastVerifiedAt: isoDate.optional(),
  notes: z.string().optional(),
});
export type Source = z.infer<typeof sourceSchema>;

export const referenceSchema = z.object({
  source: slug,
  role: z.enum(REFERENCE_ROLES),
  note: z.string().optional(), // what this source supports in the entry
  locator: z.string().optional(), // page, section, success criterion…
});
export type Reference = z.infer<typeof referenceSchema>;

/* ------------------------------------------------------------------ */
/* Learning activities                                                 */
/* ------------------------------------------------------------------ */

export const quizQuestionSchema = z.object({
  id: slug, // unique across the whole library, e.g. "fitts-q1"
  kind: z.enum(["multiple-choice", "true-false", "scenario", "formula", "critique"]),
  level: z.enum(DIFFICULTIES),
  prompt: rich,
  options: z
    .array(
      z.object({
        text: z.string().min(1),
        correct: z.boolean(),
        /** Why this option is right, or specifically why it is wrong. */
        explanation: z.string().min(1),
      }),
    )
    .min(2),
  /** Overall explanation shown after answering. */
  explanation: rich,
  /** Slug to revise if answered wrongly (defaults to the host entry). */
  revise: slug.optional(),
});
export type QuizQuestion = z.infer<typeof quizQuestionSchema>;

export const exerciseSchema = z.object({
  id: slug,
  kind: z.enum(["scenario", "assignment", "reflection", "calculation", "critique"]),
  level: z.enum(DIFFICULTIES),
  title: z.string().min(1),
  prompt: richBlock,
  deliverable: z.string().optional(),
  criteria: z.array(z.string()).default([]),
  exampleSolution: z.array(rich).optional(),
});
export type Exercise = z.infer<typeof exerciseSchema>;

export const flashcardSchema = z.object({
  id: slug,
  front: z.string().min(1),
  back: z.string().min(1),
});

/* ------------------------------------------------------------------ */
/* Type-specific extensions                                            */
/* ------------------------------------------------------------------ */

/** Calculators implemented in lib/formulas and registered in components/formula/registry.tsx */
export const CALCULATOR_IDS = [
  "fitts",
  "hick-hyman",
  "steering",
  "klm",
  "sus",
  "umux-lite",
  "nasa-tlx",
  "nps",
  "csat",
  "ces",
  "task-success",
  "time-on-task",
  "error-rate",
  "conversion-funnel",
  "retention-churn",
  "descriptive-stats",
  "confidence-interval-mean",
  "two-proportion-test",
  "effect-size",
  "sample-size",
  "problem-discovery",
  "correlation-regression",
  "contrast-ratio",
  "modular-scale",
  "grid-columns",
] as const;
export type CalculatorId = (typeof CALCULATOR_IDS)[number];

export const formulaSchema = z.object({
  id: slug,
  name: z.string().min(1),
  /** Display expression in plain Unicode, e.g. "MT = a + b · log₂(1 + D/W)" */
  expression: z.string().min(1),
  contributor: z.string().min(1),
  source: slug.optional(), // registry id of the original publication
  variables: z
    .array(
      z.object({
        symbol: z.string().min(1),
        name: z.string().min(1),
        unit: z.string().default("—"),
        description: z.string().min(1),
      }),
    )
    .min(1),
  resultUnit: z.string().min(1),
  assumptions: z.array(z.string()).min(1),
  conditions: z.array(z.string()).min(1),
  steps: z.array(z.string()).min(1),
  workedExample: z.object({
    given: z.array(z.string()).min(1),
    steps: z.array(z.string()).min(1),
    result: z.string().min(1),
  }),
  interpretation: richBlock,
  commonErrors: z.array(z.string()).min(1),
  limitations: z.array(z.string()).min(1),
  alternatives: z
    .array(z.object({ name: z.string(), expression: z.string(), note: z.string() }))
    .default([]),
  calculator: z.enum(CALCULATOR_IDS).optional(),
});
export type Formula = z.infer<typeof formulaSchema>;

export const methodDetailSchema = z.object({
  procedure: z.array(z.string()).min(1),
  participants: z.string(),
  duration: z.string(),
  inputs: z.array(z.string()).default([]),
  outputs: z.array(z.string()).default([]),
  /** generative = discover; evaluative = assess a design; both */
  purpose: z.enum(["generative", "evaluative", "both"]),
  data: z.enum(["qualitative", "quantitative", "mixed"]),
});

export const standardDetailSchema = z.object({
  issuer: z.string(),
  version: z.string(),
  published: z.string(), // ISO date or year as published by the issuer
  status: z.string(), // exactly as the issuer states it, e.g. "W3C Recommendation"
  url: z.string().url(),
});

/* ------------------------------------------------------------------ */
/* Knowledge entry                                                     */
/* ------------------------------------------------------------------ */

export const qualityGateSchema = z.object({
  classification: z.boolean(),
  explanation: z.boolean(),
  research: z.boolean(),
  beginner: z.boolean(),
  professional: z.boolean(),
  examples: z.boolean(),
  limitations: z.boolean(),
  relationships: z.boolean(),
  sources: z.boolean(),
  activities: z.boolean(),
});
export type QualityGate = z.infer<typeof qualityGateSchema>;

export const knowledgeEntrySchema = z.object({
  /* 8.1 Identity */
  id: slug, // stable; never change once published
  slug: slug, // URL; may change (keep id stable)
  title: z.string().min(1),
  alternateNames: z.array(z.string()).default([]),
  summary: z.string().min(20).max(320), // one or two sentences — used in cards & search
  definition: rich, // precise professional definition
  primaryType: z.enum(KNOWLEDGE_TYPES),
  secondaryTypes: z.array(z.enum(KNOWLEDGE_TYPES)).default([]),
  domain: slug, // taxonomy domain id
  subcategory: slug, // taxonomy subcategory id within the domain
  tags: z.array(z.string()).default([]),
  difficulty: z.enum(DIFFICULTIES), // where the topic starts
  disciplines: z.array(z.string()).default([]),
  learningObjectives: z.array(z.string()).min(1),
  prerequisites: z.array(slug).default([]),

  /* 8.2–8.4 Three levels */
  levels: z.object({
    beginner: z.object({
      explanation: richBlock,
      analogy: rich.optional(),
      everydayExamples: z.array(z.string()).default([]),
      vocabulary: z.array(z.object({ term: z.string(), meaning: z.string() })).default([]),
    }),
    intermediate: z.object({
      explanation: richBlock,
      howItWorks: z.array(rich).default([]),
      implementation: z.array(z.string()).default([]),
      scenarios: z.array(z.string()).default([]),
    }),
    advanced: z.object({
      explanation: richBlock,
      evidence: z.array(rich).default([]),
      debates: z.array(rich).default([]),
      alternativeModels: z.array(rich).default([]),
    }),
  }),

  /* 8.5 Origin */
  origin: z
    .object({
      contributors: z.array(z.string()).default([]),
      period: z.string(),
      problem: rich,
      narrative: richBlock,
      /** Use when attribution is unclear or commonly misreported. */
      attributionNote: z.string().optional(),
    })
    .optional(),

  /* 8.6 Application */
  application: z.object({
    summary: richBlock,
    web: z.array(z.string()).default([]),
    mobile: z.array(z.string()).default([]),
    enterprise: z.array(z.string()).default([]),
    services: z.array(z.string()).default([]),
    steps: z.array(z.string()).default([]),
  }),

  /* 8.7 Appropriate use */
  whenToUse: z.array(z.string()).min(1),
  whenNotToUse: z.array(z.string()).min(1),
  advantages: z.array(z.string()).default([]),
  limitations: z.array(z.string()).min(1),
  misconceptions: z.array(z.object({ myth: z.string(), reality: rich })).default([]),

  /* 8.8 Connections — explicit, explained relationships only */
  relations: z
    .array(z.object({ target: slug, type: z.enum(RELATION_TYPES), note: z.string().min(10) }))
    .default([]),

  /* Type-specific */
  formulas: z.array(formulaSchema).default([]),
  method: methodDetailSchema.optional(),
  standard: standardDetailSchema.optional(),
  lab: slug.optional(), // interactive simulation id in content/labs

  /* 8.9 Practice */
  exercises: z.array(exerciseSchema).default([]),
  quiz: z.array(quizQuestionSchema).default([]),
  flashcards: z.array(flashcardSchema).default([]),

  /* 8.10 & 17 Evidence */
  references: z.array(referenceSchema).min(1),
  evidence: z.enum(EVIDENCE_CLASSES),
  evidenceNote: rich, // what the evidence does and does not support

  /* Governance */
  status: z.enum(CONTENT_STATUSES),
  quality: qualityGateSchema,
  lastVerifiedAt: isoDate,
  version: z.number().int().min(1).default(1),
});
export type KnowledgeEntry = z.infer<typeof knowledgeEntrySchema>;
export type KnowledgeEntryInput = z.input<typeof knowledgeEntrySchema>;

/* ------------------------------------------------------------------ */
/* Taxonomy                                                            */
/* ------------------------------------------------------------------ */

export const taxonomyItemSchema = z.object({
  slug: slug,
  title: z.string(),
  type: z.enum(KNOWLEDGE_TYPES),
  /**
   * The published entry that already explains this topic as part of a larger
   * whole (e.g. primacy effect → serial-position effect). Such topics are
   * reported as "addressed within", never as published, and keep their URL so
   * links do not break. Writing a dedicated entry later overrides it.
   */
  coveredBy: slug.optional(),
  /** Other names for the same topic (synonyms, abbreviations, merged topics). Searchable; the slug stays canonical. */
  aliases: z.array(z.string()).optional(),
});

export const subcategorySchema = z.object({
  id: slug,
  title: z.string(),
  description: z.string().optional(),
  items: z.array(taxonomyItemSchema),
});

export const domainSchema = z.object({
  id: slug,
  title: z.string(),
  shortTitle: z.string(),
  description: z.string(),
  subcategories: z.array(subcategorySchema).min(1),
});
export type Domain = z.infer<typeof domainSchema>;

/* ------------------------------------------------------------------ */
/* Learning paths, comparisons, glossary, workshops, labs              */
/* ------------------------------------------------------------------ */

export const learningPathSchema = z.object({
  id: slug,
  title: z.string(),
  summary: z.string(),
  audience: z.string(),
  objectives: z.array(z.string()).min(1),
  prerequisites: z.array(z.string()).default([]),
  stages: z
    .array(
      z.object({
        title: z.string(),
        level: z.enum(DIFFICULTIES),
        description: z.string(),
        steps: z.array(slug).min(1), // entry slugs or planned taxonomy slugs
        practice: z.array(z.string()).default([]), // lab ids, workshop ids
        /** Reference pages for the stage inside the site: AI patterns (/ai/…) or design-system docs (/system/…). Validated by tests. */
        links: z.array(z.object({ href: z.string().regex(/^\/(ai|system)\//), label: z.string() })).default([]),
      }),
    )
    .min(1),
  completion: z.array(z.string()).min(1),
});
export type LearningPath = z.infer<typeof learningPathSchema>;
export type LearningPathInput = z.input<typeof learningPathSchema>;

export const comparisonSchema = z.object({
  id: slug,
  title: z.string(),
  a: z.object({ label: z.string(), slug: slug.optional() }),
  b: z.object({ label: z.string(), slug: slug.optional() }),
  summary: rich,
  dimensions: z
    .array(z.object({ dimension: z.string(), a: z.string(), b: z.string() }))
    .min(3),
  chooseA: z.array(z.string()).min(1),
  chooseB: z.array(z.string()).min(1),
  together: rich,
  references: z.array(referenceSchema).default([]),
});
export type Comparison = z.infer<typeof comparisonSchema>;

export const glossaryTermSchema = z.object({
  term: z.string(),
  slug: slug,
  definition: z.string(),
  seeAlso: z.array(slug).default([]), // entry slugs
  source: slug.optional(),
});
export type GlossaryTerm = z.infer<typeof glossaryTermSchema>;

export const workshopSchema = z.object({
  id: slug,
  title: z.string(),
  level: z.enum(DIFFICULTIES),
  duration: z.string(),
  brief: richBlock,
  artefact: z.string().optional(), // describes the provided broken artefact
  tasks: z.array(z.string()).min(1),
  deliverables: z.array(z.string()).min(1),
  criteria: z.array(z.object({ criterion: z.string(), excellent: z.string() })).min(1),
  concepts: z.array(slug).min(1),
  hints: z.array(z.string()).default([]),
});
export type Workshop = z.infer<typeof workshopSchema>;

/** A formula/metric that is not (yet) attached to a full knowledge entry. */
export const standaloneFormulaSchema = formulaSchema.extend({
  topic: slug, // taxonomy item slug or entry slug it belongs to
  summary: z.string().min(20),
  references: z.array(referenceSchema).min(1),
  calculator: z.enum(CALCULATOR_IDS),
});
export type StandaloneFormula = z.infer<typeof standaloneFormulaSchema>;
