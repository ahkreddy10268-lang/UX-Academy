/**
 * Illustration system types. Illustrations are "plates": original SVG
 * diagrams drawn on a 400 × 300 canvas that explain a concept's mechanism
 * (see docs/ILLUSTRATION_SYSTEM.md). They are colour-agnostic — they read the
 * context palette from CSS variables (--c, --c-ink, --c-soft, --c-wash) set
 * by a .cat-* ancestor — and contain no hooks, so they render on the server.
 */
import type { ReactNode } from "react";

export type PlateVariant = "thumb" | "card" | "hero";

export type ArtProps = {
  /** Show measurement annotations and labels (hero / visual-explanation use). */
  detail: boolean;
  /** Run educational motion (only ever when the plate is the hero). */
  animate: boolean;
  /** Plate-unique id prefix for gradient and pattern references (viz canvas). */
  uid?: string;
};

export type ExplorerId = "fitts" | "hick" | "peak-end" | "chunking" | "gestalt" | "cognitive-load" | "signifiers" | "colour" | "hci-methods";

export type IllustrationEntry = {
  /** Knowledge slug, taxonomy slug or domain id this plate illustrates. */
  slug: string;
  /** Short accessible name, e.g. "Fitts's law plate". */
  title: string;
  /** What the drawing shows, written for someone who cannot see it. */
  description: string;
  Art: (p: ArtProps) => ReactNode;
  /** True when the plate has meaningful motion in its hero variant. */
  animated?: boolean;
  /** Interactive explorer available on the concept page. */
  explorer?: ExplorerId;
  /** "viz": the dark technical editorial canvas (illustration v6, D-086); default: the pastel editorial plate. */
  canvas?: "viz";
};

export const W = 400;
export const H = 300;
