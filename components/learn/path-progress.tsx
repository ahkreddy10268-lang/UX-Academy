"use client";

import { useLearner } from "@/lib/store/store";

/**
 * Progress over the published steps of a path, from local learning data.
 * `compact` (index cards): "Not started" until the learner has begun, then a slim
 * bar and "N of M lessons". The full form (path page) keeps the three counts.
 */
export function PathProgress({ steps, compact = false }: { steps: string[]; compact?: boolean }) {
  const progress = useLearner((s) => s.progress);
  const done = steps.filter((s) => progress[s]?.completedAt).length;
  const started = steps.filter((s) => progress[s] && !progress[s].completedAt).length;
  const pct = steps.length ? Math.round((done / steps.length) * 100) : 0;
  if (compact && done + started === 0) return <p className="text-xs text-ink-3">Not started</p>;
  return (
    <div>
      <div role="img" aria-label={`${done} of ${steps.length} published lessons completed`} className="flex h-1.5 overflow-hidden rounded-full bg-sunken">
        <div className="bg-accent" style={{ width: `${pct}%` }} />
        <div className="bg-rule-strong" style={{ width: `${steps.length ? (started / steps.length) * 100 : 0}%` }} />
      </div>
      <p className="tabular mt-1.5 text-xs text-ink-3">
        {compact ? `${done} of ${steps.length} lessons${started ? ` · ${started} in progress` : ""}` : `${done} completed · ${started} started · ${steps.length - done - started} to go`}
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

/** Compact lesson status used in curriculum rows. */
export function LessonState({ slug }: { slug: string }) {
  const p = useLearner((s) => s.progress[slug]);
  if (p?.completedAt)
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-ok">
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
          <circle cx="6" cy="6" r="5.5" fill="currentColor" />
          <path d="M3.5 6.2l1.7 1.7 3.4-3.6" fill="none" stroke="var(--paper)" strokeWidth="1.5" />
        </svg>
        Done
      </span>
    );
  if (p) return <span className="text-xs text-ink-2">{p.levels.length}/3 levels read</span>;
  return <span className="text-xs text-ink-3">Not started</span>;
}
