/**
 * Parallel-then-merge flow: independent lanes that must not influence each
 * other (evaluators, raters, teams), converging into a merge step and onward.
 * Lanes sit side by side on wide containers and stack on narrow ones.
 */
import type { ReactNode } from "react";
import { FlowArrow } from "../primitives";

export type Lane = { label: string; content: ReactNode };

export function ParallelFlow({ start, lanes, laneNote, merge, after }: { start: ReactNode; lanes: Lane[]; laneNote: string; merge: ReactNode; after: ReactNode[] }) {
  return (
    <div className="space-y-2">
      <div className="rounded-lg border border-rule bg-soft p-3 text-sm">{start}</div>
      <FlowArrow fixed="down" />
      <section aria-label={laneNote} className="rounded-lg border border-dashed border-rule-strong p-3">
        <p className="label mb-2">{laneNote}</p>
        <ul className="grid gap-2 @xl:grid-cols-3">
          {lanes.map((l) => (
            <li key={l.label} className="rounded-md border border-rule bg-surface p-3">
              <p className="t-sub text-sm">{l.label}</p>
              <div className="mt-2">{l.content}</div>
            </li>
          ))}
        </ul>
      </section>
      <FlowArrow fixed="down" />
      <div className="rounded-lg border-2 border-c-ink bg-c-wash p-3 text-sm">{merge}</div>
      {after.map((a, i) => (
        <div key={i} className="space-y-2">
          <FlowArrow fixed="down" />
          <div className="rounded-lg border border-rule bg-surface p-3 text-sm">{a}</div>
        </div>
      ))}
    </div>
  );
}
