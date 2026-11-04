/**
 * Iterative cycle for processes that loop until a criterion is met (e.g. ISO
 * 9241-210 human-centred design). Four activities sit on a ring around a hub
 * of principles that apply throughout; below the ring a decision either exits
 * or sends the team back. Wide containers draw the ring (2 × 2 with arrows);
 * narrow ones read it as a numbered sequence with a return path.
 */
import type { ReactNode } from "react";
import { FlowArrow, Marker } from "../primitives";

export type CycleActivity = { name: string; methods: string[]; output: string };

function Activity({ a, n }: { a: CycleActivity; n: number }) {
  return (
    <div className="h-full rounded-lg border border-rule bg-surface p-3.5">
      <p className="flex items-start gap-2">
        <Marker n={n} tone="c" />
        <span className="t-sub text-sm leading-snug text-ink">{a.name}</span>
      </p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.06em] text-ink-3">Typical methods</p>
      <p className="mt-0.5 text-sm text-ink-2">{a.methods.join(" · ")}</p>
      <p className="mt-2 border-t border-rule pt-2 text-xs text-ink-2">
        <span className="font-semibold text-ink">Output:</span> {a.output}
      </p>
    </div>
  );
}

const ring = "hidden @3xl:flex items-center justify-center";
const seq = "flex justify-center @3xl:hidden";

export function ProcessCycle({ entry, activities, hub, decision, footer }: { entry: string; activities: [CycleActivity, CycleActivity, CycleActivity, CycleActivity]; hub: { title: string; points: string[] }; decision: { question: string; yes: string; no: string }; footer?: ReactNode }) {
  const [a1, a2, a3, a4] = activities;
  return (
    <div className="space-y-3">
      <p className="flex items-center gap-2 text-sm text-ink-2">
        <span className="rounded-full border border-rule-strong bg-soft px-2.5 py-0.5 text-xs font-semibold text-ink">Start</span>
        {entry}
      </p>
      <ol className="grid gap-2 @3xl:grid-cols-[minmax(0,1fr)_10rem_minmax(0,1fr)] @3xl:grid-rows-[auto_auto_auto] @3xl:gap-y-1">
        <li className="@3xl:col-start-2 @3xl:row-start-2 @3xl:self-center" aria-label={`${hub.title}: ${hub.points.join("; ")}`}>
          <div className="rounded-xl border-2 border-c-ink bg-c-wash px-3 py-3 text-center">
            <p className="t-sub text-xs text-c-ink">{hub.title}</p>
            <ul className="mt-1.5 hidden space-y-1 text-xs leading-snug text-ink-2 @3xl:block">
              {hub.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className="mt-1 text-xs text-ink-2 @3xl:hidden">{hub.points.join(" · ")}</p>
          </div>
        </li>
        <li className="@3xl:col-start-1 @3xl:row-start-1">
          <Activity a={a1} n={1} />
        </li>
        <li aria-hidden className={`${ring} @3xl:col-start-2 @3xl:row-start-1`}>
          <FlowArrow fixed="right" />
        </li>
        <li aria-hidden className={seq}>
          <FlowArrow />
        </li>
        <li className="@3xl:col-start-3 @3xl:row-start-1">
          <Activity a={a2} n={2} />
        </li>
        <li aria-hidden className={`${ring} @3xl:col-start-3 @3xl:row-start-2 py-1`}>
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-ink-3" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v17M6 14l6 6 6-6" />
          </svg>
        </li>
        <li aria-hidden className={seq}>
          <FlowArrow />
        </li>
        <li className="@3xl:col-start-3 @3xl:row-start-3">
          <Activity a={a3} n={3} />
        </li>
        <li aria-hidden className={`${ring} @3xl:col-start-2 @3xl:row-start-3`}>
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-ink-3" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12H4M10 6l-6 6 6 6" />
          </svg>
        </li>
        <li aria-hidden className={seq}>
          <FlowArrow />
        </li>
        <li className="@3xl:col-start-1 @3xl:row-start-3">
          <Activity a={a4} n={4} />
        </li>
        <li aria-hidden className={`${ring} @3xl:col-start-1 @3xl:row-start-2 flex-col gap-0.5 py-1 text-[11px] font-medium text-accent-ink`}>
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3">
            <path d="M12 21V4M6 10l6-6 6 6" />
          </svg>
          iterate
        </li>
      </ol>
      <div className="grid gap-2 rounded-lg border-2 border-accent bg-accent-wash p-3.5 text-sm @2xl:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)] @2xl:items-center">
        <p className="t-sub text-ink">After 4 · {decision.question}</p>
        <p className="text-ink">
          <span className="font-semibold text-ok">Yes → </span>
          {decision.yes}
        </p>
        <p className="text-ink">
          <span className="font-semibold text-accent-ink">No → </span>
          {decision.no}
        </p>
      </div>
      {footer}
    </div>
  );
}
