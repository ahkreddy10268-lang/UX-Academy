"use client";

import { useLearner } from "@/lib/store/store";

/** Progress over the written steps of a path, from local learning data. */
export function PathProgress({ steps }: { steps: string[] }) {
  const progress = useLearner((s) => s.progress);
  const done = steps.filter((s) => progress[s]?.completedAt).length;
  const started = steps.filter((s) => progress[s] && !progress[s].completedAt).length;
  const pct = steps.length ? Math.round((done / steps.length) * 100) : 0;
  return (
    <div>
      <div role="img" aria-label={`${done} of ${steps.length} written steps completed`} className="flex h-1.5 overflow-hidden rounded-full bg-sunken">
        <div className="bg-accent" style={{ width: `${pct}%` }} />
        <div className="bg-rule-strong" style={{ width: `${steps.length ? (started / steps.length) * 100 : 0}%` }} />
      </div>
      <p className="tabular mt-1.5 text-xs text-ink-3">
        {done} completed · {started} started · {steps.length - done - started} to go
      </p>
    </div>
  );
}

export function StepState({ slug }: { slug: string }) {
  const p = useLearner((s) => s.progress[slug]);
  if (p?.completedAt) return <span className="text-xs font-medium text-ok">Completed</span>;
  if (p) return <span className="text-xs text-ink-2">Started · {p.levels.length}/3 levels read</span>;
  return <span className="text-xs text-ink-3">Not started</span>;
}
