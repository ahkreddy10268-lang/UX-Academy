import type { ReactNode } from "react";
import { Rich, type RichContext } from "@/components/ui/rich";
import { RULE_KIND_LABEL } from "@/lib/content/labels";
import type { PracticeBlock as Practice } from "@/lib/content/schema";

const LANGUAGE_LABEL = { json: "JSON", css: "CSS", ts: "TypeScript", text: "Text" } as const;

/**
 * Renders an entry's optional practice block: do / don't columns with the
 * reason and rule kind for each item, then worked examples as code. Server
 * component; colour is never the only signal (✓/✕ and the column labels).
 */
export function PracticeBlock({ practice, ctx }: { practice: Practice; ctx: RichContext }) {
  const column = (items: Practice["dos"], ok: boolean): ReactNode => (
    <div className={`min-w-0 rounded-md border p-4 ${ok ? "border-ok/40 bg-ok-wash" : "border-error/40 bg-error-wash"}`}>
      <h3 className={`flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.08em] ${ok ? "text-ok" : "text-error"}`}>
        <span aria-hidden>{ok ? "✓" : "✕"}</span>
        {ok ? "Do" : "Don't"}
      </h3>
      <ul className="mt-3 space-y-4">
        {items.map((item, i) => (
          <li key={i} className="text-sm">
            <p className="font-medium text-ink">
              <Rich text={item.text} ctx={ctx} />
            </p>
            <p className="mt-1 text-ink-2">
              <span className="sr-only">Why: </span>
              <Rich text={item.why} ctx={ctx} />
            </p>
            {item.kind && <p className="label mt-1.5 !text-ink-3">{RULE_KIND_LABEL[item.kind]}</p>}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      <div className="grid gap-3 md:grid-cols-2">
        {column(practice.dos, true)}
        {column(practice.donts, false)}
      </div>
      {practice.examples.length > 0 && (
        <div className="mt-10 space-y-8">
          <h3 id="worked-examples" className="t-sub scroll-mt-24 text-lg">
            Worked examples
          </h3>
          {practice.examples.map((x, i) => (
            <figure key={i} className="min-w-0">
              <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="font-medium text-ink">{x.title}</span>
                <span className="label">{LANGUAGE_LABEL[x.language]}</span>
              </figcaption>
              <pre
                tabIndex={0}
                aria-label={`${x.title} (${LANGUAGE_LABEL[x.language]})`}
                className="formula mt-2 max-h-[32rem] overflow-auto rounded-md border border-rule bg-soft p-4 text-xs leading-relaxed text-ink"
              >
                <code>{x.code}</code>
              </pre>
              {x.caption && (
                <p className="mt-2 text-sm text-ink-2">
                  <Rich text={x.caption} ctx={ctx} />
                </p>
              )}
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
