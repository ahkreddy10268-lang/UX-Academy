/**
 * Process diagram for methodologies whose phases alternate between opening up
 * (diverge) and narrowing down (converge). Phases are real text in a grid; on
 * wide screens groups sit side by side under a drawn diamond, on phones they
 * stack vertically and the arrows turn downwards. Iteration is drawn as a
 * return path, so the diagram never implies a strictly linear process.
 */
import type { ReactNode } from "react";
import { FlowArrow, Marker, Tag } from "../primitives";

export type Phase = { name: string; mode: "diverge" | "converge"; question: string; activities: string[]; output: string };
export type PhaseGroup = { label: string; sublabel: string; phases: Phase[] };

function ModeGlyph({ mode }: { mode: Phase["mode"] }) {
  // A wedge that widens (diverge) or narrows (converge), read left to right.
  return (
    <svg viewBox="0 0 40 20" className="h-4 w-8 text-c-ink" aria-hidden>
      <path d={mode === "diverge" ? "M2 10 L38 2 M2 10 L38 18" : "M2 2 L38 10 M2 18 L38 10"} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

function Diamond({ label, sublabel }: { label: string; sublabel: string }) {
  return (
    <div className="relative grid h-20 place-items-center">
      <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
        <path d="M2 30 L100 3 L198 30 L100 57 Z" className="fill-c-wash stroke-c-ink" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
      </svg>
      <p className="relative text-center">
        <span className="t-sub block text-sm text-c-ink">{label}</span>
        <span className="block text-xs text-ink-2">{sublabel}</span>
      </p>
    </div>
  );
}

export function ProcessTimeline({ groups, gate, loop, footer }: { groups: PhaseGroup[]; gate?: { title: string; detail: string }; loop?: string; footer?: ReactNode }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 @3xl:flex-row @3xl:items-stretch">
        {groups.map((g, gi) => (
          <div key={g.label} className="contents">
            {gi > 0 && gate && (
              <div className="flex items-center justify-center @3xl:w-28 @3xl:shrink-0">
                <div className="w-full rounded-lg border-2 border-accent bg-accent-wash p-3 text-center @3xl:py-6">
                  <p className="label !text-accent-ink">Decision</p>
                  <p className="t-sub mt-1 text-sm text-ink">{gate.title}</p>
                  <p className="mt-1 text-xs text-ink-2">{gate.detail}</p>
                </div>
              </div>
            )}
            <section aria-label={`${g.label}: ${g.sublabel}`} className="min-w-0 flex-1">
              <Diamond label={g.label} sublabel={g.sublabel} />
              <ol className="mt-3 grid gap-2 @6xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
                {g.phases.map((p, pi) => {
                  const n = groups.slice(0, gi).reduce((k, x) => k + x.phases.length, 0) + pi + 1;
                  return (
                    <li key={p.name} className="contents">
                      {pi > 0 && (
                        <span className="flex items-center justify-center">
                          <FlowArrow turn="@6xl:rotate-0" />
                        </span>
                      )}
                      <div className="rounded-lg border border-rule bg-surface p-3.5">
                        <div className="flex items-center justify-between gap-2">
                          <p className="flex items-center gap-2">
                            <Marker n={n} tone="c" />
                            <span className="t-sub text-base text-ink">{p.name}</span>
                          </p>
                          <span className="flex items-center gap-1">
                            <ModeGlyph mode={p.mode} />
                            <Tag tone="c">{p.mode === "diverge" ? "open up" : "narrow down"}</Tag>
                          </span>
                        </div>
                        <p className="mt-2 text-sm italic text-ink-2">{p.question}</p>
                        <ul className="mt-2 space-y-1 text-sm text-ink">
                          {p.activities.map((a) => (
                            <li key={a} className="flex gap-2">
                              <span aria-hidden className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-c-ink" />
                              {a}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-3 border-t border-rule pt-2 text-xs text-ink-2">
                          <span className="font-semibold text-ink">Output:</span> {p.output}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          </div>
        ))}
      </div>
      {loop && (
        <div className="flex items-start gap-3 rounded-lg border border-dashed border-rule-strong bg-soft p-3 text-sm text-ink-2">
          <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-accent-ink" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M20 12a8 8 0 1 1-2.34-5.66M20 4v5h-5" />
          </svg>
          <p>
            <span className="font-semibold text-ink">Not a straight line. </span>
            {loop}
          </p>
        </div>
      )}
      {footer}
    </div>
  );
}
