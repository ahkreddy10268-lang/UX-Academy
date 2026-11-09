import Link from "next/link";
import { DIFFICULTY_LABEL } from "@/lib/content/labels";
import type { PathStats } from "@/lib/content/learning";
import type { LearningPath } from "@/lib/content/schema";
import { PathArt, pathCat } from "./path-art";
import { PathProgress } from "./path-progress";

/**
 * Learning-path card (index). Deliberately light: illustration, levels, title, a
 * two-line description, one row of real counts and local progress. Objectives,
 * entry requirements and the curriculum live on the path page. Reading time is
 * an estimate from word count (lib/content/learning.ts) and is labelled as one.
 */
export function PathCard({ path, stats, writtenSteps }: { path: LearningPath; stats: PathStats; writtenSteps: string[] }) {
  const levels = [...new Set(path.stages.map((s) => s.level))];
  const practice = stats.questions + stats.exercises;
  return (
    <article className={`${pathCat(path.id)} card group relative flex h-full flex-col overflow-hidden`}>
      <div className="bg-c-wash p-3 pb-0">
        <div className="overflow-hidden rounded-t-md border border-b-0 border-rule">
          <PathArt id={path.id} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex flex-wrap gap-1.5 text-[11px] font-semibold">
          {levels.map((l) => (
            <span key={l} className="subject-tag">
              {DIFFICULTY_LABEL[l]}
            </span>
          ))}
        </p>
        <h3 className="t-sub mt-2.5 text-lg leading-snug group-hover:text-accent-ink">
          <Link href={`/learn/${path.id}`} className="after:absolute after:inset-0">
            {path.title}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-ink-2">{path.summary}</p>
        <p className="tabular mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-2">
          <span>{stats.lessons} {stats.lessons === 1 ? "lesson" : "lessons"}</span>
          {practice > 0 && <span>{practice} practice items</span>}
          {stats.lessons > 0 && stats.minutes > 0 && <span>Est. reading time ≈{stats.minutes} min</span>}
        </p>
        <div className="mt-auto flex flex-col gap-2 pt-4">
          {stats.planned > 0 && <p className="text-xs text-ink-3">{stats.planned} more {stats.planned === 1 ? "lesson" : "lessons"} in development</p>}
          <div className="border-t border-rule pt-3">
            <PathProgress steps={writtenSteps} compact />
          </div>
        </div>
      </div>
    </article>
  );
}
