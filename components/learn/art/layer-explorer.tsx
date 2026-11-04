"use client";
/**
 * Illustration family C: an interactive exploded stack. The learner chooses a
 * layer; it lifts and the others recede, and the panel says what decisions live
 * on that layer and where to study it. Radio inputs give keyboard and touch
 * control; motion is a short lift that is switched off under reduced motion
 * (motion-safe), and the static state is complete without it.
 */
import { useId, useState, type ReactNode } from "react";
import { IsoBox, V, plane, type Pt } from "@/components/illustrations/system/kit";

export type LayerLink = { href: string; label: string; planned: boolean };
export type Layer = { name: string; does: string; decisions: string; links: LayerLink[]; art: number };

const o: Pt = [150, 132];
const LAYER_ART: ReactNode[] = [
  // 0 grid
  <g key="0">
    {Array.from({ length: 6 }, (_, i) => (
      <rect key={i} x={6 + i * 11.6} y={6} width={8.6} height={52} fill={V.right} opacity={0.5} />
    ))}
  </g>,
  // 1 type and spacing
  <g key="1">
    <rect x={8} y={8} width={34} height={7} rx={1} fill={V.edge} opacity={0.85} />
    <rect x={8} y={19} width={52} height={3} rx={1.5} fill={V.mid} />
    <rect x={8} y={25} width={46} height={3} rx={1.5} fill={V.mid} />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={8 + i * 9} y={38} width={4 + i * 2} height={4 + i * 2} fill={V.left} className="h" />
    ))}
  </g>,
  // 2 colour
  <g key="2">
    {[V.focal, V.focalL, V.right, V.left, V.top].map((f, i) => (
      <rect key={i} x={8 + i * 13} y={10} width={10} height={10} rx={2} fill={f} className="e" />
    ))}
    <rect x={8} y={30} width={30} height={20} rx={2} fill={V.edge} />
    <rect x={14} y={38} width={18} height={3} rx={1.5} fill={V.hi} />
  </g>,
  // 3 components
  <g key="3">
    <rect x={8} y={8} width={44} height={10} rx={2} fill={V.hi} className="e" />
    <rect x={8} y={24} width={26} height={9} rx={4.5} fill={V.edge} />
    <rect x={40} y={25} width={14} height={7} rx={3.5} fill={V.hi} className="e" />
    <circle cx={50.5} cy={28.5} r={2.6} fill={V.focal} className="e" />
    <rect x={8} y={40} width={58} height={16} rx={2} fill={V.hi} className="e" />
  </g>,
  // 4 tokens
  <g key="4">
    {[V.focal, V.focalL, V.right, V.edge].map((f, i) => (
      <rect key={i} x={8 + i * 12} y={8} width={9} height={9} rx={1.8} fill={f} className="e" />
    ))}
    {[3, 5, 8, 12, 16].map((s, i) => (
      <rect key={i} x={8 + i * 12} y={26} width={s * 0.6} height={8} fill={V.right} className="h" />
    ))}
    {[1, 3, 5].map((r, i) => (
      <rect key={i} x={8 + i * 16} y={42} width={12} height={10} rx={r} fill={V.hi} className="e" />
    ))}
  </g>,
  // 5 pattern (a form built from components)
  <g key="5">
    <rect x={8} y={6} width={56} height={52} rx={2} fill={V.hi} className="e" />
    <rect x={14} y={12} width={24} height={3} rx={1.5} fill={V.mid} />
    <rect x={14} y={19} width={44} height={7} rx={1.2} fill={V.top} className="h" />
    <rect x={14} y={30} width={44} height={7} rx={1.2} fill={V.top} className="h" />
    <rect x={14} y={44} width={22} height={8} rx={4} fill={V.focal} className="e" />
  </g>,
  // 6 interface (a whole screen)
  <g key="6">
    <rect x={4} y={4} width={64} height={56} rx={2} fill={V.hi} className="e" />
    <rect x={4} y={4} width={64} height={7} fill={V.top} className="h" />
    <rect x={8} y={15} width={26} height={4} rx={1} fill={V.edge} opacity={0.85} />
    <rect x={8} y={23} width={56} height={14} rx={2} fill={V.left} className="h" />
    <rect x={8} y={41} width={26} height={15} rx={2} fill={V.hi} className="h" />
    <rect x={38} y={41} width={26} height={15} rx={2} fill={V.hi} className="h" />
    <rect x={11} y={50} width={10} height={4} rx={2} fill={V.focal} />
  </g>,
];

export function LayerExplorer({ title, layers }: { title: string; layers: Layer[] }) {
  const name = useId();
  const [sel, setSel] = useState(layers.length - 1);
  const gap = 30;
  const L = layers[sel];
  return (
    <section aria-label={title} className="overflow-hidden rounded-xl border border-rule bg-surface shadow-card">
      <div className="grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="flex items-center border-b border-rule bg-c-wash md:border-b-0 md:border-r">
          <svg viewBox="70 12 160 200" className="ill block h-auto w-full" aria-hidden focusable="false">
            {layers.map((l, i) => {
              const z = i * gap;
              const active = i === sel;
              return (
                <g key={l.name} className="motion-safe:transition-[transform,opacity] motion-safe:duration-300" style={{ transform: `translateY(${active ? -10 : 0}px)`, opacity: active ? 1 : 0.5 }}>
                  <IsoBox o={o} x={0} y={0} z={z} w={74} d={64} h={2} tone={active ? "focal" : "neutral"} />
                  <g transform={plane.top(o, 0, 0, z + 2)}>{LAYER_ART[l.art]}</g>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="flex flex-col gap-4 p-5">
          <fieldset>
            <legend className="label mb-2">Explore · choose a layer</legend>
            <div className="flex flex-col-reverse gap-1.5">
              {layers.map((l, i) => (
                <label key={l.name} className={`tap flex cursor-pointer items-center gap-2.5 rounded-md border px-3 py-1.5 text-sm ${i === sel ? "border-accent bg-accent-wash text-ink" : "border-rule text-ink-2 hover:border-rule-strong"}`}>
                  <input type="radio" name={name} checked={i === sel} onChange={() => setSel(i)} />
                  <span className="formula text-xs text-ink-3">{i + 1}</span>
                  <span className="font-medium">{l.name}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div aria-live="polite" className="rounded-md bg-soft p-3.5 text-sm ring-1 ring-rule">
            <p className="t-sub text-ink">{L.name}</p>
            <p className="mt-1 text-ink-2">{L.does}</p>
            <p className="mt-2 text-ink-2">
              <span className="font-semibold text-ink">Decisions here: </span>
              {L.decisions}
            </p>
            {L.links.length > 0 && (
              <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                {L.links.map((k) => (
                  <a key={k.href} href={k.href} className="link tap inline-flex min-h-6 items-center">
                    {k.label}
                    {k.planned && <span className="text-ink-3"> (planned topic)</span>}
                  </a>
                ))}
              </p>
            )}
          </div>
        </div>
      </div>
      <p className="border-t border-rule bg-soft px-5 py-3 text-xs text-ink-3">A schematic of how an interface is built up, not a specification: real products blur the layers, and each layer constrains the ones above it.</p>
    </section>
  );
}
