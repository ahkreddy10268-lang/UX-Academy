import Link from "next/link";
import type { ReactNode } from "react";
import { catClass } from "@/lib/content/categories";
import { DIFFICULTY_LABEL } from "@/lib/content/labels";
import type { PathStats } from "@/lib/content/learning";
import type { LearningPath } from "@/lib/content/schema";
import { PathProgress } from "./path-progress";

/**
 * Learning path card: pastel plate, level ladder, objectives, entry requirements,
 * real counts and local progress. Reading time is an estimate from word count
 * (lib/content/learning.ts) and is labelled as one.
 */
export function PathCard({
  path,
  stats,
  plate,
  domain,
  writtenSteps,
  index,
  detail = "standard",
}: {
  path: LearningPath;
  stats: PathStats;
  plate: ReactNode;
  domain: string;
  writtenSteps: string[];
  index?: number;
  detail?: "standard" | "full";
}) {
  const levels = [...new Set(path.stages.map((s) => s.level))];
  return (
    <article className={`${catClass(domain)} card group relative flex h-full flex-col overflow-hidden`}>
      <div className="relative bg-c-wash px-3 pt-3">
        <div className="overflow-hidden rounded-t-md border border-b-0 border-rule">{plate}</div>
        {index !== undefined && (
          <span className="formula absolute left-5 top-5 rounded-xs bg-surface/90 px-1.5 py-0.5 text-xs text-ink-2">Path {String(index + 1).padStart(2, "0")}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex flex-wrap gap-1.5 text-[11px] font-semibold">
          {levels.map((l) => (
            <span key={l} className="rounded-full bg-c-wash px-2 py-0.5 text-c-ink">
              {DIFFICULTY_LABEL[l]}
            </span>
          ))}
        </p>
        <h3 className="t-sub mt-2.5 text-lg leading-snug group-hover:text-accent-ink">
          <Link href={`/learn/${path.id}`} className="after:absolute after:inset-0">
            {path.title}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-ink-2">{path.summary}</p>
        {detail === "full" && (
          <div className="mt-4 space-y-3 text-sm">
            <div>
              <p className="label">You will be able to</p>
              <ul className="mt-1.5 space-y-1 text-ink-2">
                {path.objectives.slice(0, 3).map((o) => (
                  <li key={o} className="flex gap-2">
                    <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-c" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label">Entry requirements</p>
              <p className="mt-1 text-ink-2">{path.prerequisites.length ? path.prerequisites.join(" · ") : "None — starts from first principles."}</p>
            </div>
          </div>
        )}
        <dl className="tabular mt-4 grid grid-cols-3 gap-2 rounded-sm bg-soft p-2.5 text-center text-xs text-ink-2">
          <div>
            <dt>Lessons</dt>
            <dd className="t-sub text-base text-ink">{stats.lessons}</dd>
          </div>
          <div>
            <dt>Practice</dt>
            <dd className="t-sub text-base text-ink">{stats.questions + stats.exercises}</dd>
          </div>
          <div>
            <dt>
              Reading<span className="sr-only"> time, estimated from word count</span>
            </dt>
            <dd className="t-sub text-base text-ink">≈{stats.minutes}m</dd>
          </div>
        </dl>
        {stats.planned > 0 && <p className="mt-2 text-xs text-ink-3">+ {stats.planned} planned lessons not yet written</p>}
        <div className="mt-auto pt-4">
          <PathProgress steps={writtenSteps} />
        </div>
      </div>
    </article>
  );
}
