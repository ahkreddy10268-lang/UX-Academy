/**
 * Design-system documentation schema (D-099). Documents UX Academy's own
 * foundations, components and patterns as implemented (tokens in
 * app/globals.css, components in /components). Live examples are rendered from
 * the real classes by components/system/examples.tsx.
 */
import { z } from "zod";

export const SYSTEM_SECTIONS = ["foundations", "components", "patterns"] as const;
export type SystemSection = (typeof SYSTEM_SECTIONS)[number];

const row = z.object({ name: z.string(), description: z.string() });

export const systemDocSchema = z.object({
  section: z.enum(SYSTEM_SECTIONS),
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string(),
  summary: z.string().min(30).max(240),
  purpose: z.string().min(30),
  principles: z.array(z.string()).default([]),
  /** Components: parts. Patterns: the components involved. */
  anatomy: z.array(row).default([]),
  variants: z.array(row).default([]),
  states: z.array(row).default([]),
  usage: z.array(z.string()).min(1),
  avoid: z.array(z.string()).default([]),
  doDont: z.object({ do: z.array(z.string()).min(1), dont: z.array(z.string()).min(1) }),
  accessibility: z.array(z.string()).min(1),
  responsive: z.array(z.string()).default([]),
  implementation: z.array(z.string()).min(1),
  /** Patterns only: the recurring problem and user context. */
  problem: z.string().optional(),
  example: z.string().optional(),
  related: z.array(z.string()).default([]),
});
export type SystemDoc = z.infer<typeof systemDocSchema>;
export type SystemDocInput = z.input<typeof systemDocSchema>;
