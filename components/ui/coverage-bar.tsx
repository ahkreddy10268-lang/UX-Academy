/** A thin proportional bar: published share of a subject's inventory. Always paired with numbers in text. */
export function CoverageBar({ published, total, label }: { published: number; total: number; label: string }) {
  const pct = total ? Math.round((published / total) * 100) : 0;
  return (
    <div>
      <div
        role="img"
        aria-label={`${label}: ${published} of ${total} topics have published entries (${pct}%)`}
        className="h-1.5 w-full overflow-hidden rounded-full bg-sunken"
      >
        <div className="h-full bg-accent" style={{ width: `${Math.max(pct, published ? 2 : 0)}%` }} />
      </div>
      <p className="tabular mt-1.5 text-xs text-ink-3">
        {published} of {total} written · {pct}%
      </p>
    </div>
  );
}
