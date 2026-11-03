/**
 * Subject → visual palette. Purely presentational identity: a palette never
 * implies anything about evidence (evidence keeps its own neutral glyph).
 * Client-safe (no content imports).
 */
export type Palette = "core" | "rose" | "violet" | "teal" | "blue" | "amber" | "green" | "peach" | "cyan" | "indigo" | "slate";

export const DOMAIN_PALETTE: Record<string, Palette> = {
  foundations: "core",
  "laws-effects": "rose",
  heuristics: "rose",
  psychology: "violet",
  research: "teal",
  frameworks: "amber",
  ia: "cyan",
  interaction: "cyan",
  visual: "peach",
  "type-colour": "peach",
  "design-systems": "peach",
  accessibility: "green",
  content: "amber",
  product: "indigo",
  service: "slate",
  metrics: "blue",
  dataviz: "blue",
  ethics: "green",
  emerging: "indigo",
  practice: "slate",
};

/** Families as presented to learners (one name per palette). */
export const PALETTE_LABEL: Record<Palette, string> = {
  core: "Foundations",
  rose: "UX laws & heuristics",
  violet: "Psychology & cognition",
  teal: "Research methods",
  blue: "Formulas & measurement",
  amber: "Frameworks & content",
  green: "Accessibility & ethics",
  peach: "Visual & systems design",
  cyan: "Interaction & IA",
  indigo: "Product & emerging",
  slate: "Service & practice",
};

export const paletteFor = (domain: string): Palette => DOMAIN_PALETTE[domain] ?? "core";
export const catClass = (domain: string) => `cat-${paletteFor(domain)}`;
