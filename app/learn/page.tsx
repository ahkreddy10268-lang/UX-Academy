import type { Metadata } from "next";
import { PathCard } from "@/components/learn/path-card";
import { Container, PageHeader } from "@/components/ui/layout";
import Link from "next/link";
import { curriculumSequence, learningAreas } from "@/content/learning-areas";
import { domainById, entries, entryBySlug, learningPaths } from "@/lib/content";
import { pathStats } from "@/lib/content/learning";

export const metadata: Metadata = { title: "Learning paths" };

export default function LearnPage() {
  const all = learningPaths.map((p) => ({ p, stats: pathStats(p), written: p.stages.flatMap((s) => s.steps).filter((s) => entryBySlug.has(s)) }));
  // A lesson can sit in more than one path (Fitts's law is in two), so count each published lesson once.
  const lessons = new Set(all.flatMap((x) => x.written)).size;
  return (
    <>
      <PageHeader
        eyebrow="Learn"
        title="Learning paths"
        lede="Choose a learning path and build your knowledge step by step. Each path combines focused lessons, practical exercises and assessments. You can explore any topic in the Knowledge Library whenever you need it."
      >
        <dl className="mt-5 flex flex-wrap gap-2 text-sm text-ink-2 [&>div]:items-baseline [&>div]:rounded-full [&>div]:border [&>div]:border-rule [&>div]:bg-soft [&>div]:px-3 [&>div]:py-1">
          <div className="flex gap-2">
            <dt>Learning paths</dt>
            <dd className="t-sub tabular text-ink">{learningPaths.length}</dd>
          </div>
          <div className="flex gap-2">
            <dt>Published lessons</dt>
            <dd className="t-sub tabular text-ink">{lessons}</dd>
          </div>
        </dl>
      </PageHeader>
      <Container className="space-y-12 pb-4 pt-6">
        <section aria-labelledby="sequence">
          <p className="label">Suggested order</p>
          <h2 id="sequence" className="t-section mt-2 text-[1.5rem]">
            The core curriculum
          </h2>
          <ol className="mt-4 flex flex-wrap items-center gap-x-1 gap-y-2 text-sm">
            {curriculumSequence.map((s, i) => (
              <li key={s.href} className="flex items-center gap-1">
                {i > 0 && (
                  <span aria-hidden className="px-1 text-ink-3">
                    →
                  </span>
                )}
                <Link href={s.href} className="btn btn-secondary btn-sm">
                  <span className="font-mono text-[11px] text-ink-3">{String(i + 1).padStart(2, "0")}</span> {s.label}
                </Link>
              </li>
            ))}
          </ol>
          <p className="mt-3 max-w-read text-sm text-ink-2">Specialist paths for design systems, accessibility, AI UX and metrics branch off once the core is familiar.</p>
        </section>

        <section aria-labelledby="areas">
          <p className="label">Twelve areas</p>
          <h2 id="areas" className="t-section mt-2 text-[1.5rem]">
            Learning areas
          </h2>
          <p className="mt-1 max-w-read text-sm text-ink-2">Each area gathers the related subjects, paths and reference sections. Counts are published entries only; planned topics are listed in Domains &amp; Topics.</p>
          <ul className="mt-5 grid gap-px overflow-hidden rounded-lg border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {learningAreas.map((a) => {
              const n = entries.filter((e) => a.domains.includes(e.domain)).length;
              return (
                <li key={a.id} id={a.id} className="flex flex-col bg-surface p-4">
                  <p className="flex items-baseline justify-between gap-3">
                    <span className="t-sub text-ink">
                      <span className="mr-2 font-mono text-ink-3">{a.letter}</span>
                      {a.title}
                    </span>
                    {a.domains.length > 0 && <span className="shrink-0 font-mono text-[11px] text-ink-3">{n} published</span>}
                  </p>
                  <p className="mt-1 text-sm text-ink-2">{a.description}</p>
                  <p className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-3 text-sm">
                    {a.paths.map((pid) => {
                      const p = learningPaths.find((x) => x.id === pid)!;
                      return (
                        <Link key={pid} href={`/learn/${pid}`} className="link">
                          {p.title}
                        </Link>
                      );
                    })}
                    {a.domains.map((d) => (
                      <Link key={d} href={`/topics/${d}`} className="text-ink-2 underline decoration-rule-strong underline-offset-4 hover:text-ink">
                        {domainById.get(d)!.shortTitle} topics
                      </Link>
                    ))}
                    {a.links?.map(([href, label]) => (
                      <Link key={href} href={href} className="link">
                        {label}
                      </Link>
                    ))}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      </Container>
      <Container className="pb-12 pt-10">
        <h2 className="t-section mb-4 text-[1.5rem]">All learning paths</h2>
        {/* Container-query columns: 3 across by default, 4 only when each card keeps ≥ 17rem. */}
        <div className="@container">
          <ol className="grid gap-4 @2xl:grid-cols-2 @4xl:grid-cols-3 @[76rem]:grid-cols-4">
            {all.map(({ p, stats, written }) => (
              <li key={p.id}>
                <PathCard path={p} stats={stats} writtenSteps={written} />
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </>
  );
}
