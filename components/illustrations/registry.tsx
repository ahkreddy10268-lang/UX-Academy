/**
 * Central illustration registry: knowledge / taxonomy slug or domain id → plate.
 * Kept separate from the academic content schema on purpose — content never
 * imports presentation. Fragments live in ./registry/*.ts so plates can be
 * authored in parallel without merge conflicts.
 */
import { corePlates } from "./concepts/core-plates";
import { fittsLaw } from "./concepts/fitts-law";
import type { IllustrationEntry } from "./illustration-types";
import { fragments } from "./registry/_fragments";

const all: IllustrationEntry[] = [fittsLaw, ...corePlates, ...fragments];

const map = new Map<string, IllustrationEntry>();
for (const e of all) {
  if (map.has(e.slug)) throw new Error(`Duplicate illustration for "${e.slug}"`);
  map.set(e.slug, e);
}

export const illustrations: ReadonlyMap<string, IllustrationEntry> = map;
export const illustrationFor = (slug: string): IllustrationEntry | undefined => map.get(slug);
export const hasIllustration = (slug: string) => map.has(slug);

/** Stable plate numbers for the atlas, in registry order. */
const numbers = new Map(all.map((e, i) => [e.slug, i + 1]));
export const plateNumber = (slug: string) => numbers.get(slug);
