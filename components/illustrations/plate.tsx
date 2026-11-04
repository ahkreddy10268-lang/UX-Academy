/**
 * The plate frame: tinted graph-paper field + the concept drawing.
 * Server component (no hooks). Colour comes from the nearest .cat-* ancestor,
 * or from the `palette` prop.
 */
import { useId } from "react";
import type { Palette } from "@/lib/content/categories";
import type { IllustrationEntry, PlateVariant } from "./illustration-types";
import { H, W } from "./illustration-types";
import { C } from "./primitives";

export function Plate({
  entry,
  variant = "card",
  animate = false,
  palette,
  className = "",
  decorative = false,
}: {
  entry: IllustrationEntry;
  variant?: PlateVariant;
  animate?: boolean;
  palette?: Palette;
  /** Plate number — rendered by the caller as a figure caption, kept for API stability. */
  number?: number;
  className?: string;
  /** When the same information is already in adjacent text (e.g. a card title). */
  decorative?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const detail = variant === "hero";
  const { Art } = entry;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`ill block h-auto w-full ${palette ? `cat-${palette}` : ""} ${className}`}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-labelledby={decorative ? undefined : `${uid}-t ${uid}-d`}
      preserveAspectRatio="xMidYMid meet"
    >
      {!decorative && (
        <>
          <title id={`${uid}-t`}>{entry.title}</title>
          <desc id={`${uid}-d`}>{entry.description}</desc>
        </>
      )}
      <defs>
        <pattern id={`${uid}-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r={variant === "thumb" ? 0 : 0.9} fill={C.ink} opacity="0.22" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill={C.wash} />
      <rect width={W} height={H} fill={`url(#${uid}-grid)`} />
      <g>
        <Art detail={detail} animate={animate && variant === "hero"} />
      </g>
    </svg>
  );
}

/** Fallback for subjects without a plate: a typographic monogram on the wash. Honest, not a fake illustration. */
export function TypePlate({ text, palette, className = "" }: { text: string; palette?: Palette; className?: string }) {
  const initials = text
    .replace(/[^A-Za-z ]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={`block h-auto w-full ${palette ? `cat-${palette}` : ""} ${className}`} aria-hidden>
      <rect width={W} height={H} fill={C.wash} />
      <text x={W / 2} y={H / 2 + 34} textAnchor="middle" fill={C.soft} fontSize="120" fontFamily="var(--font-newsreader), serif" fontStyle="italic">
        {initials}
      </text>
    </svg>
  );
}
