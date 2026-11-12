/**
 * Guides (D-127): long-form learning experiences that compose published
 * entries instead of copying them. A guide adds narrative, interface mockups,
 * comparisons, a method walkthrough, a case study and an assessment; the
 * per-topic depth (analogies, practice rules, application by platform,
 * misconceptions, relations, quizzes, exercises) is read from the entries the
 * guide references by slug. Guides are documentation records: they do not
 * count towards taxonomy coverage.
 */
import { z } from "zod";
import { exerciseSchema, quizQuestionSchema } from "./schema";

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const rich = z.string().min(1);

/* ------------------------------------------------------------------ */
/* Mock interface language                                              */
/* ------------------------------------------------------------------ */
const tone = z.enum(["neutral", "ok", "error", "warn", "info"]);
const mark = z.number().int().min(1).max(9).optional();

export const mockElementSchema = z.discriminatedUnion("k", [
  z.object({ k: z.literal("heading"), text: z.string(), mark }),
  z.object({ k: z.literal("text"), text: z.string(), tone: tone.optional(), small: z.boolean().optional(), mark }),
  z.object({ k: z.literal("field"), label: z.string(), value: z.string().optional(), placeholder: z.string().optional(), state: z.enum(["error", "ok", "disabled"]).optional(), hint: z.string().optional(), mark }),
  z.object({ k: z.literal("buttons"), items: z.array(z.object({ text: z.string(), variant: z.enum(["primary", "secondary", "danger", "ghost", "link"]).optional(), state: z.enum(["busy", "disabled"]).optional() })).min(1), mark }),
  z.object({ k: z.literal("banner"), text: z.string(), tone, action: z.string().optional(), mark }),
  z.object({ k: z.literal("toast"), text: z.string(), action: z.string().optional(), mark }),
  z.object({ k: z.literal("list"), items: z.array(z.string()).min(1), checks: z.boolean().optional(), mark }),
  z.object({ k: z.literal("chips"), items: z.array(z.string()).min(1), active: z.number().int().optional(), mark }),
  z.object({ k: z.literal("metrics"), items: z.array(z.object({ label: z.string(), value: z.string() })).min(1), mark }),
  z.object({ k: z.literal("progress"), value: z.number().min(0).max(100), label: z.string(), mark }),
  z.object({ k: z.literal("nav"), items: z.array(z.string()).min(1), active: z.number().int().optional(), mark }),
  z.object({ k: z.literal("divider") }),
]);
export type MockElement = z.infer<typeof mockElementSchema>;

export const mockSchema = z.object({
  /** Screen title shown in the frame's title bar. */
  title: z.string(),
  device: z.enum(["web", "mobile"]).default("web"),
  elements: z.array(mockElementSchema).min(1),
  /** Text alternative: the mock itself is hidden from assistive technology. */
  alt: z.string().min(30),
  /** Numbered annotations matching `mark` on elements. */
  notes: z.array(z.object({ n: z.number().int().min(1).max(9), text: z.string() })).default([]),
});
export type Mock = z.infer<typeof mockSchema>;

/* ------------------------------------------------------------------ */
/* Guide                                                                */
/* ------------------------------------------------------------------ */
export const GUIDE_DEMOS = ["transfer", "save", "undo", "date"] as const;

const exampleSchema = z.object({ title: z.string(), description: rich, mock: mockSchema });

/** Content written in the guide for a heuristic that has no dedicated entry. */
const ownContentSchema = z.object({
  analogy: rich,
  scenario: rich,
  dos: z.array(rich).min(3),
  donts: z.array(rich).min(3),
  implementation: z.array(rich).min(3),
  web: z.array(rich).min(1),
  mobile: z.array(rich).min(1),
  enterprise: z.array(rich).min(1),
  mistakes: z.array(z.object({ myth: rich, reality: rich })).min(2),
  quiz: quizQuestionSchema,
  exercise: exerciseSchema,
});

export const guideHeuristicSchema = z.object({
  n: z.number().int().min(1).max(10),
  name: z.string(),
  /** Dedicated published entry for this heuristic, if one exists. */
  entry: slug.optional(),
  /** Entry that explains the heuristic when it has no dedicated one. */
  addressedIn: slug.optional(),
  oneLiner: z.string().min(10).max(140),
  everyday: rich,
  why: rich,
  psychology: rich,
  behaviour: rich,
  bad: exampleSchema,
  good: exampleSchema,
  demo: z.enum(GUIDE_DEMOS).optional(),
  consequences: z.array(rich).min(2),
  accessibility: z.array(rich).min(2),
  checklist: z.array(z.string()).min(4),
  related: z.array(z.object({ n: z.number().int().min(1).max(10), difference: rich })).min(1),
  /** Question id from the entry used as this chapter's knowledge check. */
  check: slug.optional(),
  /** Exercise id from the entry used as this chapter's applied exercise. */
  exercise: slug.optional(),
  own: ownContentSchema.optional(),
});
export type GuideHeuristic = z.infer<typeof guideHeuristicSchema>;

export const guideSchema = z.object({
  id: slug,
  title: z.string(),
  entry: slug,
  hero: z.object({
    eyebrow: z.string(),
    headline: z.string(),
    lede: z.string().min(40),
    outcomes: z.array(z.string()).min(4),
    minutes: z.number().int().min(10),
    levels: z.string(),
  }),
  story: z.object({
    title: z.string(),
    question: z.string(),
    setup: z.array(rich).min(2),
    prompts: z.array(z.string()).min(3),
    debrief: z.array(rich).min(3),
    takeaway: rich,
  }),
  framework: z.object({
    question: z.string(),
    body: z.array(rich).min(3),
    timeline: z.array(z.object({ year: z.string(), title: z.string(), detail: rich })).min(3),
    original: z.array(z.string()).min(9),
    takeaway: rich,
  }),
  heuristics: z.array(guideHeuristicSchema).length(10),
  comparisons: z.array(
    z.object({
      id: slug,
      a: z.number().int().min(1).max(10),
      b: z.number().int().min(1).max(10),
      aDefinition: rich,
      bDefinition: rich,
      difference: rich,
      scenario: rich,
      aApplies: rich,
      bApplies: rich,
      takeaway: z.string(),
    }),
  ).min(7),
  overlap: z.array(rich).min(1),
  process: z.object({
    question: z.string(),
    intro: z.array(rich).min(1),
    stages: z.array(z.object({ title: z.string(), goal: z.string(), points: z.array(rich).min(3) })).length(7),
    takeaway: rich,
  }),
  severity: z.object({
    intro: z.array(rich).min(1),
    scale: z.array(z.object({ rating: z.number().int().min(0).max(4), label: z.string(), meaning: z.string(), example: z.string() })).length(5),
    factors: z.array(z.object({ name: z.string(), question: z.string() })).min(3),
    caveats: z.array(rich).min(2),
  }),
  caseStudy: z.object({
    product: z.string(),
    brief: z.array(rich).min(2),
    users: z.string(),
    tasks: z.array(z.string()).min(3),
    findings: z
      .array(
        z.object({
          id: z.string().regex(/^F\d{2}$/),
          screen: z.string(),
          task: z.string(),
          observation: rich,
          heuristic: z.number().int().min(1).max(10),
          also: z.array(z.number().int().min(1).max(10)).default([]),
          why: rich,
          impact: rich,
          severity: z.number().int().min(0).max(4),
          recommendation: rich,
          outcome: rich,
          before: mockSchema,
          after: mockSchema,
        }),
      )
      .min(10),
    summary: z.array(rich).min(2),
  }),
  reportFields: z.array(z.object({ field: z.string(), description: z.string() })).min(8),
  advanced: z.array(z.object({ title: z.string(), body: z.array(rich).min(1) })).min(8),
  mistakes: z.array(z.object({ mistake: z.string(), correction: rich })).min(5),
  assessment: z.object({
    intro: rich,
    questions: z.array(quizQuestionSchema).min(6),
    /** Further questions drawn from entries by id. */
    fromEntries: z.array(slug).default([]),
  }),
  references: z.array(z.object({ source: slug, note: z.string(), locator: z.string().optional() })).min(5),
});
export type Guide = z.infer<typeof guideSchema>;
export type GuideInput = z.input<typeof guideSchema>;
