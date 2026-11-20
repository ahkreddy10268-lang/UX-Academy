"use client";

/**
 * The HSL colour wheel. The disc is drawn pixel by pixel from hslToRgb at the
 * current lightness, so what you see is exactly the model the palette uses:
 * hue is the angle (0° at the top, clockwise) and saturation the distance
 * from the centre. Markers show every palette colour at its own hue and
 * saturation; lines join them to show the harmony's shape.
 *
 * Input: pointer drag (touch scrolling is disabled only on the disc itself)
 * and arrow keys on the focused wheel. The hue, saturation and lightness
 * sliders beside it are the full accessible equivalent.
 */
import { useEffect, useRef, type KeyboardEvent, type PointerEvent } from "react";
import { hexToHsl, hslToRgb, wrapHue, type HSL } from "@/lib/formulas/colour";

const SIZE = 240; // canvas pixels (CSS scales the element responsively)

function position(h: number, s: number) {
  const a = ((h - 90) * Math.PI) / 180; // 0° at the top
  const r = (s / 100) * 48;
  return { x: 50 + r * Math.cos(a), y: 50 + r * Math.sin(a) };
}

export function ColourWheel({
  base,
  colours,
  baseIndex,
  onBase,
  describedBy,
}: {
  base: HSL;
  colours: string[];
  baseIndex: number;
  onBase: (hs: { h: number; s: number }) => void;
  describedBy: string;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const img = ctx.createImageData(SIZE, SIZE);
    const R = SIZE / 2;
    for (let y = 0; y < SIZE; y++)
      for (let x = 0; x < SIZE; x++) {
        const dx = x + 0.5 - R;
        const dy = y + 0.5 - R;
        const d = Math.hypot(dx, dy);
        const i = (y * SIZE + x) * 4;
        if (d > R) {
          img.data[i + 3] = 0;
          continue;
        }
        const h = wrapHue((Math.atan2(dy, dx) * 180) / Math.PI + 90);
        const { r, g, b } = hslToRgb({ h, s: (d / R) * 100, l: base.l });
        img.data[i] = r;
        img.data[i + 1] = g;
        img.data[i + 2] = b;
        img.data[i + 3] = d > R - 1 ? Math.round(255 * (R - d)) : 255; // soft edge
      }
    ctx.putImageData(img, 0, 0);
  }, [base.l]);

  const pick = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const s = Math.min(100, (Math.hypot(dx, dy) / (r.width / 2)) * 100);
    onBase({ h: Math.round(wrapHue((Math.atan2(dy, dx) * 180) / Math.PI + 90)), s: Math.round(s) });
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 1;
    const moves: Record<string, [number, number]> = { ArrowRight: [step, 0], ArrowLeft: [-step, 0], ArrowUp: [0, step], ArrowDown: [0, -step] };
    const m = moves[e.key];
    if (!m) return;
    e.preventDefault();
    onBase({ h: Math.round(wrapHue(base.h + m[0] * (e.shiftKey ? 1.5 : 1))), s: Math.max(0, Math.min(100, Math.round(base.s + m[1]))) });
  };

  const points = colours.map((hex) => {
    const c = hexToHsl(hex);
    return position(c.h, c.s);
  });
  const b = position(base.h, base.s);

  return (
    <div
      role="group"
      tabIndex={0}
      aria-roledescription="colour wheel"
      aria-label={`Colour wheel. Base hue ${Math.round(base.h)} degrees, saturation ${Math.round(base.s)} percent.`}
      aria-describedby={describedBy}
      onKeyDown={onKey}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        pick(e);
      }}
      onPointerMove={(e) => dragging.current && pick(e)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      className="relative mx-auto aspect-square w-full max-w-[18rem] cursor-crosshair touch-none select-none rounded-full outline-offset-4"
    >
      <canvas ref={canvas} width={SIZE} height={SIZE} aria-hidden className="h-full w-full rounded-full" />
      <svg viewBox="0 0 100 100" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        {points.length > 1 && <polygon points={points.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" stroke="var(--ink)" strokeWidth="0.6" strokeDasharray="1.6 1.2" vectorEffect="non-scaling-stroke" />}
        {points.map((p, i) => (
          <line key={`l${i}`} x1={50} y1={50} x2={p.x} y2={p.y} stroke="var(--surface)" strokeWidth="1.6" vectorEffect="non-scaling-stroke" opacity={0.85} />
        ))}
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={i === baseIndex ? 5.2 : 4.2} fill={colours[i]} stroke="var(--surface)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <circle cx={p.x} cy={p.y} r={i === baseIndex ? 6.4 : 5.2} fill="none" stroke="var(--ink)" strokeWidth={i === baseIndex ? 2 : 1} vectorEffect="non-scaling-stroke" />
            <text x={p.x} y={p.y - 7.5} textAnchor="middle" fontSize="5.5" fontWeight={600} fill="var(--ink)" stroke="var(--surface)" strokeWidth="2.4" paintOrder="stroke" style={{ fontFamily: "var(--font-plex-mono), monospace" }}>
              {i + 1}
            </text>
          </g>
        ))}
        <circle cx={b.x} cy={b.y} r={1.2} fill="var(--ink)" />
      </svg>
    </div>
  );
}
