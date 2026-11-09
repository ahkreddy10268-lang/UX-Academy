/**
 * Figure key for a plate's numbered markers (D-101). Real HTML text at reading
 * size, shown under the hero plate; the plate itself carries only geometry,
 * essential interface strings and the marker numerals.
 */
import { illustrationFor } from "./registry";

export function PlateKey({ slug, className = "" }: { slug: string; className?: string }) {
  const key = illustrationFor(slug)?.key;
  if (!key?.length) return null;
  return (
    <ol aria-label="Figure key" className={`grid gap-x-5 gap-y-1.5 text-sm sm:grid-cols-2 ${className}`}>
      {key.map((k) => (
        <li key={k.n} className="flex gap-2.5">
          <span aria-hidden className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink font-mono text-[11px] font-semibold text-surface">
            {k.n}
          </span>
          <span className="min-w-0 text-ink-2">
            <span className="sr-only">Marker {k.n}: </span>
            <span className="font-semibold text-ink">{k.label}</span>
            {k.detail && <> · {k.detail}</>}
          </span>
        </li>
      ))}
    </ol>
  );
}
