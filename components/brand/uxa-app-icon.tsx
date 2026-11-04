/**
 * UX Academy app icon — the gradient symbol on a rounded tile, exactly as in
 * brand/uxa-logo-kit-v0.1-draft/icons/app-icon-{light,dark}.svg (same tile,
 * radius, placement and gradients, built from the kit's path data).
 * Both tones are rendered and the theme picks one (.brand-only-light / -dark in
 * app/globals.css), so the icon follows light, dark and the manual theme switch.
 */
import { useId } from "react";
import { UXA } from "./uxa-logo-data";

const TILE = { light: "#F2F2F2", dark: "#0A0A0A" } as const;

function Tile({ tone, size, uid, title, decorative }: { tone: "light" | "dark"; size: number; uid: string; title: string; decorative: boolean }) {
  const id = `${uid}-${tone}`;
  return (
    <svg
      viewBox="0 0 1024 1024"
      width={size}
      height={size}
      className={tone === "light" ? "brand-only-light" : "brand-only-dark"}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : title}
      focusable="false"
    >
      <rect width="1024" height="1024" rx="229.069" fill={TILE[tone]} />
      <g transform="translate(153.6 332.8) scale(0.471579)">
        <defs>
          {UXA.pieces.map(([k]) => {
            const g = UXA.grads[k as keyof typeof UXA.grads];
            const stops = tone === "light" ? g.light : g.dark;
            return (
              <linearGradient key={k} id={`${id}-${k}`} gradientUnits="userSpaceOnUse" x1={g.c[0]} y1={g.c[1]} x2={g.c[2]} y2={g.c[3]}>
                {stops.map(([o, col, op], i) => (
                  <stop key={i} offset={o} stopColor={col} stopOpacity={op ?? undefined} />
                ))}
              </linearGradient>
            );
          })}
        </defs>
        {UXA.pieces.map(([k, d]) => (
          <path key={k} d={d} fill={`url(#${id}-${k})`} />
        ))}
      </g>
    </svg>
  );
}

export function UxaAppIcon({ size = 36, title = "UX Academy", decorative = false }: { size?: number; title?: string; decorative?: boolean }) {
  const uid = "uxai" + useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return (
    <span className="inline-flex shrink-0" style={{ width: size, height: size }}>
      <Tile tone="light" size={size} uid={uid} title={title} decorative={decorative} />
      <Tile tone="dark" size={size} uid={uid} title={title} decorative={decorative} />
    </span>
  );
}
