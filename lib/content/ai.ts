/**
 * AI UX pattern library schema (D-098). Patterns are documentation records,
 * not knowledge entries: they do not count towards taxonomy coverage. Each is
 * grounded in published guidance (references) and labelled with an evidence
 * class; the demos are local simulations with mock data.
 */
import { z } from "zod";

export const AI_MOMENTS = ["discover", "ask", "wait", "read", "refine", "trust", "delegate"] as const;
export type AiMomentId = (typeof AI_MOMENTS)[number];

export const AI_DEMOS = ["prompts", "composer", "wait", "sources", "refine", "recover", "approval"] as const;
export type AiDemoId = (typeof AI_DEMOS)[number];

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const aiMomentSchema = z.object({
  id: z.enum(AI_MOMENTS),
  n: z.number().int().min(1).max(7),
  title: z.string(),
  question: z.string(),
  summary: z.string().min(40),
  risk: z.string().min(20),
});
export type AiMoment = z.infer<typeof aiMomentSchema>;

export const aiPatternSchema = z.object({
  id: slug,
  title: z.string(),
  moment: z.enum(AI_MOMENTS),
  summary: z.string().min(40).max(260),
  problem: z.string().min(40),
  why: z.string().min(40),
  how: z.array(z.string()).min(2),
  whenToUse: z.array(z.string()).min(1),
  whenNotToUse: z.array(z.string()).min(1),
  anatomy: z.array(z.object({ part: z.string(), role: z.string() })).min(2),
  behaviour: z.array(z.string()).min(1),
  states: z.array(z.object({ name: z.string(), description: z.string() })).min(2),
  good: z.array(z.string()).min(1),
  poor: z.array(z.string()).min(1),
  accessibility: z.array(z.string()).min(1),
  responsive: z.array(z.string()).min(1),
  checklist: z.array(z.string()).min(3),
  related: z.array(slug).default([]),
  topics: z.array(slug).default([]),
  demo: z.enum(AI_DEMOS).optional(),
  evidence: z.enum(["professional-guideline", "practitioner-recommendation", "emerging-hypothesis"]),
  evidenceNote: z.string().min(30),
  references: z.array(z.object({ source: slug, note: z.string(), locator: z.string().optional() })).min(1),
});
export type AiPattern = z.infer<typeof aiPatternSchema>;
export type AiPatternInput = z.input<typeof aiPatternSchema>;
