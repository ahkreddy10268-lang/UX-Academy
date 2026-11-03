"use client";
/**
 * Visual curriculum map: each level is a column of lesson nodes joined by a
 * line, ending in its level test. Node state comes from local progress only.
 * The ordered list structure is the accessible reading; the drawing is CSS.
 */
import Link from "next/link";
import { useLearner } from "@/lib/store/store";

export type MapLevel = { title: string; levelLabel: string; testHref?: string; lessons: { slug: string; title: string; href: string }[]; planned: number };

export function CurriculumMap({ levels }: { levels: MapLevel[] }) {
  const progress = useLearner((s) => s.progress);
  return (
    <ol aria-label="Curriculum map" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[repeat(auto-fit,minmax(13rem,1fr))]">
      {levels.map((lv, i) => (
        <li key={lv.title} className="min-w-0 rounded-lg border border-rule bg-soft p-4">
          <p className="flex items-center gap-2">
            <span className="t-sub grid h-7 w-7 place-items-center rounded-md bg-accent-wash text-xs text-accent-ink">L{i + 1}</span>
            <span className="min-w-0">
              <span className="t-sub block truncate text-sm">{lv.title}</span>
              <span className="block text-xs text-ink-3">{lv.levelLabel}</span>
            </span>
          </p>
          <ol className="relative mt-3 space-y-1.5 before:absolute before:bottom-2 before:left-[0.6rem] before:top-2 before:w-px before:bg-rule-strong">
            {lv.lessons.map((l) => {
              const p = progress[l.slug];
              const state = p?.completedAt ? "done" : p ? "started" : "todo";
              return (
                <li key={l.slug} className="relative flex items-center gap-2.5">
                  <span
                    aria-hidden
                    className={`relative z-10 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${state === "done" ? "border-ok bg-ok" : state === "started" ? "border-accent bg-surface" : "border-rule-strong bg-surface"}`}
                  >
                    {state === "done" && (
                      <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="var(--surface)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="m2.5 6.2 2.2 2.2 4.8-5" />
                      </svg>
                    )}
                    {state === "started" && <span className="h-2 w-2 rounded-full bg-accent" />}
                  </span>
                  <Link href={l.href} className="min-w-0 truncate text-sm text-ink hover:text-accent-ink hover:underline">
                    {l.title}
                  </Link>
                  <span className="sr-only">{state === "done" ? "(completed)" : state === "started" ? "(started)" : "(not started)"}</span>
                </li>
              );
            })}
            {lv.testHref && (
              <li className="relative flex items-center gap-2.5">
                <span aria-hidden className="relative z-10 grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 border-accent bg-accent-wash text-[10px] font-bold text-accent-ink">
                  ✓
                </span>
                <Link href={lv.testHref} className="text-sm font-medium text-accent-ink hover:underline">
                  Level {i + 1} test
                </Link>
              </li>
            )}
          </ol>
          {lv.planned > 0 && <p className="mt-2 pl-7 text-xs text-ink-3">+ {lv.planned} planned, not yet written</p>}
        </li>
      ))}
    </ol>
  );
}
