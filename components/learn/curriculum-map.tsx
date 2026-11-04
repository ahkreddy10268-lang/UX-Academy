"use client";
/**
 * Curriculum map: the path's progression at a glance. One column per level with
 * its purpose, counts, a dot per lesson (filled when completed in this browser)
 * and its test. It deliberately carries no lesson titles — those live, with
 * links, in "Lessons by level" below. Node state comes from local progress only.
 */
import Link from "next/link";
import { useLearner } from "@/lib/store/store";

export type MapLevel = {
  title: string;
  levelLabel: string;
  testHref?: string;
  lessonSlugs: string[];
  practiceItems: number;
  planned: number;
};

export function CurriculumMap({ levels }: { levels: MapLevel[] }) {
  const progress = useLearner((s) => s.progress);
  return (
    <ol aria-label="Curriculum map" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[repeat(auto-fit,minmax(13rem,1fr))]">
      {levels.map((lv, i) => {
        const done = lv.lessonSlugs.filter((s) => progress[s]?.completedAt).length;
        const started = lv.lessonSlugs.filter((s) => progress[s] && !progress[s].completedAt).length;
        const n = lv.lessonSlugs.length;
        return (
          <li key={lv.title} className="flex min-w-0 flex-col rounded-lg border border-rule bg-soft p-4">
            <p className="flex items-center gap-2">
              <span className="t-sub grid h-7 w-7 shrink-0 place-items-center rounded-md bg-accent-wash text-xs text-accent-ink">L{i + 1}</span>
              <span className="min-w-0">
                <span className="t-sub block text-sm leading-snug">{lv.title}</span>
                <span className="block text-xs text-ink-3">{lv.levelLabel}</span>
              </span>
            </p>
            <p className="tabular mt-3 text-xs text-ink-2">
              {n} {n === 1 ? "lesson" : "lessons"}
              {lv.practiceItems > 0 && ` · ${lv.practiceItems} practice items`}
            </p>
            <div aria-hidden className="mt-2 flex flex-wrap gap-1">
              {lv.lessonSlugs.map((s) => {
                const p = progress[s];
                return <span key={s} className={`h-2 w-4 rounded-full ${p?.completedAt ? "bg-ok" : p ? "bg-accent" : "bg-rule-strong"}`} />;
              })}
            </div>
            <p className="tabular mt-1.5 text-xs text-ink-3">
              {n === 0 ? "No published lessons yet" : done + started === 0 ? "Not started" : `${done} of ${n} completed${started ? ` · ${started} in progress` : ""}`}
            </p>
            {lv.planned > 0 && <p className="mt-1 text-xs text-ink-3">{lv.planned} more in development</p>}
            {lv.testHref && (
              <Link href={lv.testHref} className="tap mt-auto inline-flex items-center pt-3 text-sm font-medium text-accent-ink hover:underline">
                Level {i + 1} test →
              </Link>
            )}
          </li>
        );
      })}
    </ol>
  );
}
