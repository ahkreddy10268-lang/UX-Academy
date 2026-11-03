import Link from "next/link";
import type { ReactNode } from "react";
import { catClass } from "@/lib/content/categories";
import { DIFFICULTY_LABEL } from "@/lib/content/labels";
import type { PathStats } from "@/lib/content/learning";
import type { LearningPath } from "@/lib/content/schema";
import { PathProgress } from "./path-progress";

/** Learning path card: thumbnail plate, levels as a stepped ladder, real counts, local progress. */
export function PathCard({ path, stats, plate, domain, writtenSteps, index }: { path: LearningPath; stats: PathStats; plate: ReactNode; domain: string; writtenSteps: string[]; index?: number }) {
  return (
    <article className={`${catClass(domain)} group relative flex h-full flex-col overflow-hidden rounded-sm border border-rule bg-surface lift hover:border-ink-3`}>
      <div className="relative border-b border-rule">
        {plate}
        {index !== undefined && <span className="formula absolute left-3 top-3 rounded-xs bg-surface/90 px-1.5 py-0.5 text-xs text-ink-2">Path {String(index + 1).padStart(2, "0")}</span>}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="t-section text-xl group-hover:text-accent-ink">
          <Link href={`/learn/${path.id}`} className="after:absolute after:inset-0">
            {path.title}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-ink-2">{path.summary}</p>
        <ol className="mt-4 flex gap-1" aria-label="Levels">
          {path.stages.map((s, i) => (
            <li key={s.title} className="flex-1">
              <span className="block h-1 rounded-full bg-c" style={{ opacity: 0.35 + (i / Math.max(1, path.stages.length - 1)) * 0.65 }} />
              <span className="mt-1 block truncate text-[11px] text-ink-3">
                L{i + 1} · {DIFFICULTY_LABEL[s.level]}
              </span>
            </li>
          ))}
        </ol>
        <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-2">
          <div>
            <dt className="sr-only">Lessons</dt>
            <dd>
              <span className="formula text-ink">{stats.lessons}</span> lessons{stats.planned ? ` + ${stats.planned} planned` : ""}
            </dd>
          </div>
          <div>
            <dt className="sr-only">Practice</dt>
            <dd>
              <span className="formula text-ink">{stats.questions + stats.exercises}</span> exercises
            </dd>
          </div>
          <div>
            <dt className="sr-only">Reading time</dt>
            <dd>
              ≈ <span className="formula text-ink">{stats.minutes}</span> min reading
            </dd>
          </div>
        </dl>
        <div className="mt-auto pt-4">
          <PathProgress steps={writtenSteps} />
        </div>
      </div>
    </article>
  );
}
