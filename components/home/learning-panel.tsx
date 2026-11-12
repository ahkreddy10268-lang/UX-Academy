"use client";

import Link from "next/link";
import { Icon } from "@/components/shell/icons";
import { DEPTH_LABEL } from "@/lib/content/labels";
import { isDue, useLearner } from "@/lib/store/store";

export type PanelPath = { id: string; title: string; steps: string[] };
type Props = { titles: Record<string, string>; paths: PanelPath[]; starters: string[] };

/**
 * Home "continue learning" panel. Everything shown is read from this browser's
 * local learning data; with no history it says so and offers a first step —
 * it never fills itself with sample numbers.
 */
export function LearningPanel({ titles, paths, starters }: Props) {
  const history = useLearner((s) => s.history);
  const progress = useLearner((s) => s.progress);
  const level = useLearner((s) => s.prefs.level);
  const due = useLearner((s) => Object.values(s.cards).filter(isDue).length);
  const bookmarks = useLearner((s) => Object.keys(s.bookmarks).length);

  const last = history[0];
  const completed = Object.values(progress).filter((p) => p.completedAt).length;
  const title = (slug: string) => titles[slug] ?? slug.replace(/-/g, " ");

  if (!last) {
    return (
      <section aria-labelledby="continue" className="panel grid gap-6 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-center">
        <div>
          <p className="label">Your learning</p>
          <h2 id="continue" className="t-section mt-2 text-xl">
            Nothing recorded yet
          </h2>
          <p className="mt-2 text-sm text-ink-2">
            Progress, saved concepts and flashcards appear here once you start. They are stored only in this browser.
          </p>
        </div>
        <ol className="grid gap-2 sm:grid-cols-3">
          {starters.map((slug, i) => (
            <li key={slug}>
              <Link
                href={`/library/${slug}`}
                className="group flex h-full items-start gap-3 rounded-md border border-rule bg-soft p-3 hover:border-rule-strong"
              >
                <span className="formula grid h-7 w-7 shrink-0 place-items-center rounded-xs bg-accent-wash text-xs text-accent-ink">{i + 1}</span>
                <span className="text-sm font-medium text-ink group-hover:text-accent-ink">{title(slug)}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  const read = progress[last.slug]?.levels.length ?? 0;
  const path = paths.find((p) => p.steps.includes(last.slug));
  const next = path?.steps.find((s) => !progress[s]?.completedAt && s !== last.slug);
  const pathDone = path ? path.steps.filter((s) => progress[s]?.completedAt).length : 0;

  return (
    <section aria-labelledby="continue" className="panel overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-5 py-3.5 sm:px-6">
        <h2 id="continue" className="t-sub text-base">
          Continue learning
        </h2>
        <Link href="/me" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-ink hover:underline">
          My Learning <Icon name="arrow-right" size={16} />
        </Link>
      </div>
      <div className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-surface p-5">
          <p className="label">Last concept</p>
          <Link href={`/library/${last.slug}`} className="t-sub mt-2 block text-base text-ink hover:text-accent-ink">
            {title(last.slug)}
          </Link>
          <div className="mt-3" role="img" aria-label={`${read} of 3 levels read`}>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className={`h-1.5 flex-1 rounded-full ${i < read ? "bg-accent" : "bg-sunken"}`} />
              ))}
            </div>
            <p className="tabular mt-1.5 text-xs text-ink-3">{read}/3 levels read</p>
          </div>
        </div>
        <div className="bg-surface p-5">
          <p className="label">Reading level</p>
          <p className="t-sub mt-2 text-base">{DEPTH_LABEL[level]}</p>
          <p className="mt-1 text-xs text-ink-3">The depth concept pages open at. Change it on any concept.</p>
        </div>
        <div className="bg-surface p-5">
          <p className="label">{path ? path.title : "Learning path"}</p>
          {path ? (
            <>
              <p className="tabular mt-2 text-base">
                <span className="t-sub">{pathDone}</span> <span className="text-ink-2">of {path.steps.length} lessons completed</span>
              </p>
              {next ? (
                <Link href={`/learn/${path.id}/lesson/${next}`} className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-accent-ink hover:underline">
                  Next: {title(next)} <Icon name="arrow-right" size={16} />
                </Link>
              ) : (
                <p className="mt-2 text-sm text-ok">Every written lesson completed.</p>
              )}
            </>
          ) : (
            <p className="mt-2 text-sm text-ink-2">
              This concept is not part of a path yet.{" "}
              <Link href="/learn" className="link">
                Choose a path
              </Link>
            </p>
          )}
        </div>
        <div className="bg-surface p-5">
          <p className="label">Your workspace</p>
          <ul className="tabular mt-2 space-y-1 text-sm text-ink-2">
            <li>
              <span className="t-sub text-ink">{completed}</span> concepts completed
            </li>
            <li>
              <span className="t-sub text-ink">{bookmarks}</span> saved
            </li>
            <li>
              {due > 0 ? (
                <Link href="/practice/flashcards" className="link">
                  {due} flashcards due
                </Link>
              ) : (
                <>
                  <span className="t-sub text-ink">0</span> flashcards due
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
