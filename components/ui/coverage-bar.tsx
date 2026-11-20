/**
 * A thin proportional bar: the share of a subject's topics that have their own
 * published entry. Always paired with numbers in text. When `addressed` and
 * `planned` are given, a second line accounts for every topic: topics explained
 * within another entry are never counted as published, and never as planned.
 */
export function CoverageBar({
  published,
  total,
  label,
  addressed,
  planned,
}: {
  published: number;
  total: number;
  label: string;
  addressed?: number;
  planned?: number;
}) {
  const pct = total ? Math.round((published / total) * 100) : 0;
  const full = addressed !== undefined && planned !== undefined;
  const inProgress = full ? total - published - addressed - planned : 0;
  return (
    <div>
      <div
        role="img"
        aria-label={`${label}: ${published} of ${total} topics have their own published entry (${pct}%)`}
        className="h-1.5 w-full overflow-hidden rounded-full bg-sunken"
      >
        <div className="h-full bg-accent" style={{ width: `${Math.max(pct, published ? 2 : 0)}%` }} />
      </div>
      <p className="tabular mt-1.5 text-xs text-ink-3">
        {published} of {total} with their own entry · {pct}%
      </p>
      {full && (
        <p className="tabular mt-0.5 text-xs text-ink-3">
          {addressed} addressed within another entry · {inProgress > 0 ? `${inProgress} in progress · ` : ""}
          {planned} planned · {published + addressed} of {total} accounted for
        </p>
      )}
    </div>
  );
}
