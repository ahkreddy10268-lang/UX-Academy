/**
 * Rendering components used by pages. All server-renderable.
 *  - ConceptIllustration: the plate (or an honest typographic fallback) for a slug.
 *  - ConceptIllustrationCard / Hero: framed variants with the right aspect & palette.
 */
import { paletteFor, type Palette } from "@/lib/content/categories";
import type { PlateVariant } from "./illustration-types";
import { Plate, TypePlate } from "./plate";
import { illustrationFor, plateNumber } from "./registry";

export function ConceptIllustration({
  slug,
  title,
  domain,
  variant = "card",
  animate = false,
  decorative = false,
  className = "",
}: {
  slug: string;
  title: string;
  domain: string;
  variant?: PlateVariant;
  animate?: boolean;
  decorative?: boolean;
  className?: string;
}) {
  const entry = illustrationFor(slug);
  const palette: Palette = paletteFor(domain);
  if (!entry) return <TypePlate text={title} palette={palette} className={className} />;
  return <Plate entry={entry} variant={variant} animate={animate} palette={palette} number={plateNumber(slug)} decorative={decorative} className={className} />;
}

export function ConceptIllustrationCard(props: { slug: string; title: string; domain: string; className?: string }) {
  return <ConceptIllustration {...props} variant="card" decorative />;
}

export function ConceptIllustrationHero(props: { slug: string; title: string; domain: string; animate?: boolean; className?: string }) {
  return <ConceptIllustration {...props} variant="hero" />;
}
