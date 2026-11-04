/**
 * Annotated interface: a simplified, realistic interface drawn in HTML with
 * numbered markers placed by the concept, beside a key that says what each
 * marked region does and what breaks if the cue is removed.
 */
import type { ReactNode } from "react";
import { Marker } from "../primitives";

export type Annotation = { n: number; title: string; text: ReactNode; ifBroken?: ReactNode };

/** A marker positioned on the mock. Place inside a `relative` element. */
export function Pin({ n, className = "" }: { n: number; className?: string }) {
  return (
    <span className={`absolute z-10 ${className}`}>
      <Marker n={n} />
    </span>
  );
}

export function AnnotatedInterface({ mock, notes, mockLabel }: { mock: ReactNode; notes: Annotation[]; mockLabel: string }) {
  return (
    <div className="grid gap-5 @2xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @2xl:items-start">
      <div role="img" aria-label={mockLabel} className="min-w-0 rounded-lg border border-rule bg-soft p-3 @md:p-5">
        {mock}
      </div>
      <ol className="min-w-0 space-y-2.5">
        {notes.map((a) => (
          <li key={a.n} className="flex gap-3 rounded-lg border border-rule bg-surface p-3">
            <Marker n={a.n} />
            <div className="min-w-0 text-sm">
              <p className="t-sub text-ink">{a.title}</p>
              <p className="mt-0.5 text-ink-2">{a.text}</p>
              {a.ifBroken && (
                <p className="mt-1.5 text-xs text-ink-2">
                  <span className="font-semibold text-ink">If broken: </span>
                  {a.ifBroken}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
