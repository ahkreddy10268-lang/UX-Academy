import * as React from "react";
import { UXA } from "./uxa-logo-data";

/**
 * UX Academy logo — DRAFT v0.1 (pending approval of the reconstructed master).
 * Copied from brand/uxa-logo-kit-v0.1-draft/components/react (the kit is the
 * source of truth; regenerate there, then copy). In the product UI use
 * tone="current" so the mark takes the theme ink (text-ink) in light and dark.
 *
 * variant    full (stacked lockup) | symbol | wordmark
 * tone       on-light (black / dark gradient) | on-dark (white / reversed gradient)
 *            | current (flat, inherits CSS `color` — use only with black or white)
 * treatment  gradient (primary) | flat. Gradient falls back to flat below 120 px symbol width.
 * cut        auto | standard | small | xs. Auto picks by rendered size:
 *            xs < 40 px, small 40–95 px, standard >= 96 px (symbol width).
 * Pass `width` OR `height` (px). Aspect ratio is always locked.
 */
export type UxaLogoVariant = "full" | "symbol" | "wordmark";
export type UxaLogoTone = "on-light" | "on-dark" | "current";
export type UxaLogoTreatment = "gradient" | "flat";
export type UxaLogoCut = "auto" | "standard" | "small" | "xs";

export interface UxaLogoProps
  extends Omit<React.SVGProps<SVGSVGElement>, "width" | "height" | "viewBox" | "children"> {
  variant?: UxaLogoVariant;
  tone?: UxaLogoTone;
  treatment?: UxaLogoTreatment;
  cut?: UxaLogoCut;
  width?: number;
  height?: number;
  /** Adds the mandatory clear space inside the SVG box (½ module on every side). */
  withClearSpace?: boolean;
  /** Accessible name. Ignored when decorative. */
  title?: string;
  /** Hide from assistive tech (e.g. when a visible "UX-Academy" label sits next to it). */
  decorative?: boolean;
}

const { W, H, wm, lockup, rules } = UXA;
const CLEAR = rules.clearSpace;

function box(variant: UxaLogoVariant) {
  if (variant === "symbol") return { w: W, h: H };
  if (variant === "wordmark") return { w: wm.w, h: wm.h };
  return { w: lockup.w, h: lockup.h };
}

export function UxaLogo({
  variant = "full",
  tone = "on-light",
  treatment = "gradient",
  cut = "auto",
  width,
  height,
  withClearSpace = false,
  title = "UX Academy",
  decorative = false,
  ...rest
}: UxaLogoProps) {
  const rawId = React.useId();
  const uid = "uxa" + rawId.replace(/[^a-zA-Z0-9_-]/g, "");

  const b = box(variant);
  const pad = withClearSpace ? CLEAR : 0;
  const vw = b.w + pad * 2;
  const vh = b.h + pad * 2;

  // rendered size (aspect ratio locked)
  let pxW: number | undefined = width;
  let pxH: number | undefined = height;
  if (pxW != null && pxH == null) pxH = (pxW * vh) / vw;
  if (pxH != null && pxW == null) pxW = (pxH * vw) / vh;

  // symbol width in px drives size-aware rules
  const symPx = pxW != null ? (pxW * W) / vw : undefined;
  let tr: UxaLogoTreatment = treatment;
  if (tone === "current") tr = "flat";
  if (tr === "gradient" && symPx != null && symPx < rules.minGradientPx) tr = "flat";
  const c: Exclude<UxaLogoCut, "auto"> =
    cut !== "auto" ? cut : symPx == null ? "standard" : symPx < rules.minSmallPx ? "xs" : symPx < rules.minFlatStandardPx ? "small" : "standard";

  const ink = tone === "on-dark" ? "#FFFFFF" : tone === "current" ? "currentColor" : "#000000";
  const reverse = tone === "on-dark";

  const symbol =
    tr === "gradient" ? (
      <>
        <defs>
          {UXA.pieces.map(([k]) => {
            const g = UXA.grads[k as keyof typeof UXA.grads];
            const stops = reverse ? g.dark : g.light;
            return (
              <linearGradient key={k} id={`${uid}-${k}`} gradientUnits="userSpaceOnUse"
                x1={g.c[0]} y1={g.c[1]} x2={g.c[2]} y2={g.c[3]}>
                {stops.map(([o, col, op], i) => (
                  <stop key={i} offset={o} stopColor={col} stopOpacity={op ?? undefined} />
                ))}
              </linearGradient>
            );
          })}
        </defs>
        {UXA.pieces.map(([k, d]) => (
          <path key={k} d={d} fill={`url(#${uid}-${k})`} />
        ))}
      </>
    ) : (
      <path d={UXA.flat[c]} fill={ink} />
    );

  let body: React.ReactNode;
  if (variant === "symbol") body = symbol;
  else if (variant === "wordmark") body = <path d={wm.d} fill={ink} />;
  else
    body = (
      <>
        <g transform={`translate(${(lockup.w - W) / 2} 0)`}>{symbol}</g>
        <g transform={`translate(${(lockup.w - wm.w) / 2} ${H + lockup.gap})`}>
          <path d={wm.d} fill={ink} />
        </g>
      </>
    );

  const a11y = decorative
    ? { "aria-hidden": true as const, focusable: "false" as const }
    : { role: "img", "aria-labelledby": `${uid}-t` };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`${-pad} ${-pad} ${vw} ${vh}`}
      width={pxW}
      height={pxH}
      preserveAspectRatio="xMidYMid meet"
      data-uxa-variant={variant}
      data-uxa-cut={variant === "wordmark" ? undefined : tr === "flat" ? c : "gradient"}
      {...a11y}
      {...rest}
    >
      {!decorative && <title id={`${uid}-t`}>{title}</title>}
      {body}
    </svg>
  );
}

export default UxaLogo;
