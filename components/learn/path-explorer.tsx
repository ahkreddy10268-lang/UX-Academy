/**
 * Server wrapper for the path-level interactive (illustration family C). Only
 * paths whose subject is a layered structure get one; links are resolved here so
 * planned topics are labelled as planned, never as lessons.
 */
import { entryBySlug, taxonomyBySlug } from "@/lib/content";
import { LayerExplorer, type Layer } from "./art/layer-explorer";

type Spec = { name: string; does: string; decisions: string; slugs: string[]; art: number };
const SPECS: Record<string, { title: string; layers: Spec[] }> = {
  "ui-fundamentals": {
    title: "Interface layer explorer",
    layers: [
      { name: "Grid and layout", does: "Columns, margins and gutters decide where things can sit and how they line up across screens.", decisions: "Number of columns, gutter width, breakpoints.", slugs: ["grid-systems"], art: 0 },
      { name: "Type and spacing", does: "A type scale and a spacing scale give text and gaps consistent, related sizes.", decisions: "Scale ratio, line length, spacing steps.", slugs: ["modular-type-scale", "spacing-scales"], art: 1 },
      { name: "Colour and contrast", does: "Colour carries identity, emphasis and state; contrast decides whether text and controls can be seen.", decisions: "Palette roles, contrast ratios, state colours.", slugs: ["colour-contrast-ratio"], art: 2 },
      { name: "Components and hierarchy", does: "Controls and content blocks are assembled so the most important thing is seen first and related things group together.", decisions: "Emphasis, grouping, component states.", slugs: ["visual-hierarchy", "gestalt-principles"], art: 3 },
    ],
  },
  "design-systems": {
    title: "Design system layer explorer",
    layers: [
      { name: "Tokens", does: "Named values for colour, type, spacing and radius, the smallest shared decisions.", decisions: "Token names, primitive versus semantic roles, themes.", slugs: ["design-tokens", "semantic-tokens"], art: 4 },
      { name: "Components", does: "Reusable controls built from tokens, each with defined variants and states.", decisions: "Component boundaries, variants, interaction states.", slugs: ["component-architecture", "interaction-states"], art: 3 },
      { name: "Patterns", does: "Components combined to solve a recurring task, such as a form or an empty state.", decisions: "When to use which pattern, and how its parts behave together.", slugs: ["atomic-design", "empty-states"], art: 5 },
      { name: "Interface", does: "A product screen assembled from patterns; it changes when any layer below it changes.", decisions: "Composition and the exceptions the system does not yet cover.", slugs: ["design-governance"], art: 6 },
    ],
  },
};

export const hasPathExplorer = (id: string) => id in SPECS;

export function PathExplorer({ id }: { id: string }) {
  const spec = SPECS[id];
  if (!spec) return null;
  const layers: Layer[] = spec.layers.map((l) => ({
    name: l.name,
    does: l.does,
    decisions: l.decisions,
    art: l.art,
    links: l.slugs
      .filter((s) => entryBySlug.has(s) || taxonomyBySlug.has(s))
      .map((s) => ({ href: `/library/${s}`, label: entryBySlug.get(s)?.title ?? taxonomyBySlug.get(s)!.title, planned: !entryBySlug.has(s) || entryBySlug.get(s)!.status !== "published" })),
  }));
  return <LayerExplorer title={spec.title} layers={layers} />;
}
