/**
 * Tree testing — reading the per-task metrics together. Each row is a pattern
 * in success, directness, first clicks and destinations, what it most likely
 * means about the tree, and the change to test next. Restates
 * content/knowledge/research/tree-testing.ts (NN/g's guidance on interpreting
 * results). Text is real HTML; on narrow containers each row stacks as
 * pattern → reading → change, in that order, so nothing depends on columns.
 */
type Row = { pattern: string; signals: string[]; reading: string; change: string; tone?: "ok" | "error" };

const ROWS: Row[] = [
  {
    pattern: "Found, and found directly",
    signals: ["High success", "High directness"],
    reading: "Labels and placement match what people expect for this task.",
    change: "Keep; use as a benchmark for the next version.",
    tone: "ok",
  },
  {
    pattern: "Found, after wandering",
    signals: ["High success", "Low directness or long time"],
    reading: "The answer is findable, but people try other places first — effort the success rate hides.",
    change: "Check first clicks for the competing category; clarify labels or add a cross-link.",
  },
  {
    pattern: "Right start, wrong end",
    signals: ["Correct first clicks", "Low success", "Destinations split among siblings"],
    reading: "The top level works; the sub-categories under it overlap or are unclear.",
    change: "Make sibling labels more distinct; retest the same task.",
  },
  {
    pattern: "Scattered starts",
    signals: ["First clicks spread across several top categories"],
    reading: "Top-level categories overlap for this content.",
    change: "Cross-list the item, or, if it recurs across tasks, revisit the organisation scheme (a card sort can help).",
  },
  {
    pattern: "Confident and wrong",
    signals: ["Low success", "High directness to a wrong answer"],
    reading: "A label strongly suggests the wrong place — a direct failure, worse than wandering.",
    change: "Relabel the misleading category, or move or cross-list the item where people went.",
    tone: "error",
  },
  {
    pattern: "Two correct homes",
    signals: ["Several correct answers marked", "Destinations show which are used"],
    reading: "A location that almost nobody chooses is not earning its place.",
    change: "Keep cross-listing only where a substantial share of people look.",
  },
];

export function TreeTestReadings() {
  return (
    <div className="space-y-3">
      <p className="rounded-lg border border-rule bg-surface p-3 text-sm text-ink">
        <span className="font-semibold">Read the metrics together, task by task.</span> Success says whether people got there; directness and time say how hard it was; first clicks say where they expected it; destinations say where they settled.
      </p>
      <ol className="space-y-2" aria-label="Result patterns, what they mean and what to change">
        {ROWS.map((r, i) => (
          <li
            key={r.pattern}
            className={`grid min-w-0 gap-x-4 gap-y-1.5 rounded-lg border bg-surface p-3.5 @2xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)_minmax(0,1.3fr)] ${r.tone === "ok" ? "border-ok/50" : r.tone === "error" ? "border-error/50" : "border-rule-strong"}`}
          >
            <div className="min-w-0">
              <p className="flex flex-wrap items-baseline gap-x-2">
                <span className="formula text-sm text-accent">{i + 1}</span>
                <span className="t-sub text-base text-ink">{r.pattern}</span>
              </p>
              {r.tone && <p className={`label mt-0.5 ${r.tone === "ok" ? "!text-ok" : "!text-error"}`}>{r.tone === "ok" ? "Working" : "Worst case"}</p>}
              <ul className="mt-1.5 flex flex-wrap gap-1.5" aria-label="Signals">
                {r.signals.map((s) => (
                  <li key={s} className="rounded-sm border border-rule-strong bg-soft px-2 py-0.5 text-xs text-ink">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <p className="min-w-0 text-sm text-ink">
              <span className="label block">Likely meaning</span>
              {r.reading}
            </p>
            <p className="min-w-0 text-sm text-ink-2">
              <span className="label block">Change and retest</span>
              {r.change}
            </p>
          </li>
        ))}
      </ol>
      <p className="text-xs text-ink-2">Tree tests remove search, content and visual design, so scores describe the hierarchy, not the finished product. Compare against your previous tree on the same tasks.</p>
    </div>
  );
}
