import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ConceptIllustration } from "@/components/illustrations/concept-illustration";
import { CurriculumMap } from "@/components/learn/curriculum-map";
import { PathArt, pathCat } from "@/components/learn/path-art";
import { PathExplorer, hasPathExplorer } from "@/components/learn/path-explorer";
import { LessonState, PathProgress } from "@/components/learn/path-progress";
import { Bullets, Container, PageHeader } from "@/components/ui/layout";
import { entryBySlug, labById, learningPaths, taxonomyBySlug, workshops } from "@/lib/content";
import { catClass } from "@/lib/content/categories";
import { DIFFICULTY_LABEL, LEVEL_PURPOSE, TYPE_LABEL } from "@/lib/content/labels";
import { levelQuestionCounts, pathStats, readingMinutes, stageStats } from "@/lib/content/learning";

export function generateStaticParams() {
  return learningPaths.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps<"/learn/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: learningPaths.find((p) => p.id === id)?.title ?? "Learning path" };
}

/** "6 questions at this level · 12 optional revision questions from other levels". */
function testLine(stage: (typeof learningPaths)[number]["stages"][number]) {
  const { matching, other } = levelQuestionCounts(stage);
  const q = (n: number) => `${n} ${n === 1 ? "question" : "questions"}`;
  return [matching ? `${q(matching)} at this level` : "No questions written for this level yet", other ? `${q(other)} of optional mixed-level revision` : ""].filter(Boolean).join(" · ");
}

export default async function PathPage({ params }: PageProps<"/learn/[id]">) {
  const { id } = await params;
  const p = learningPaths.find((x) => x.id === id);
  if (!p) notFound();
  const stats = pathStats(p);
  const written = p.stages.flatMap((s) => s.steps).filter((s) => entryBySlug.has(s));
  const firstLesson = written[0];

  return (
    <>
      <PageHeader
        cat={pathCat(p.id)}
        eyebrow="Learning path"
        title={p.title}
        lede={p.summary}
        crumbs={[{ href: "/learn", label: "Learn" }, { label: p.title }]}
        aside={<PathArt id={p.id} />}
      >
        <dl className="mt-6 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-lg bg-rule ring-1 ring-rule sm:grid-cols-4 [&>div]:bg-surface [&>div]:px-3.5 [&>div]:py-2.5">
          {[
            [stats.levels, "levels"],
            [stats.lessons, "lessons"],
            [stats.questions + stats.exercises, "practice items"],
            [`≈${stats.minutes}`, "min est. reading"],
          ].map(([n, l]) => (
            <div key={l} className="flex flex-col-reverse">
              <dt className="text-xs text-ink-2">
                {l}
                {l === "min est. reading" && <span className="sr-only"> (estimated from word count)</span>}
              </dt>
              <dd className="t-sub tabular text-xl text-ink">{n}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 max-w-sm rounded-md bg-surface/70 p-3">
          <PathProgress steps={written} />
        </div>
        {firstLesson && (
          <Link href={`/learn/${p.id}/lesson/${firstLesson}`} className="mt-6 inline-flex h-11 items-center rounded-sm bg-accent px-5 font-medium text-surface hover:bg-accent-ink">
            Start with lesson 1
          </Link>
        )}
      </PageHeader>

      <Container className="lg:grid lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
        <div className="min-w-0 pt-10">
          {hasPathExplorer(p.id) && (
            <section aria-labelledby="layers" className={`${pathCat(p.id)} mb-12`}>
              <h2 id="layers" className="t-section text-2xl">
                See how the layers build up
              </h2>
              <p className="mb-4 mt-1 text-sm text-ink-3">Choose a layer to see what it decides and where to study it.</p>
              <PathExplorer id={p.id} />
            </section>
          )}
          <h2 className="t-section text-2xl">Curriculum map</h2>
          <p className="mt-1 text-sm text-ink-3">How the path progresses, level by level. Lesson details are listed below; filled bars are lessons you have completed in this browser.</p>
          <div className="mt-4">
            <CurriculumMap
              levels={p.stages.map((s, si) => ({
                title: s.title,
                levelLabel: `${DIFFICULTY_LABEL[s.level]} · ${LEVEL_PURPOSE[s.level]}`,
                testHref: stageStats(s).questions > 0 ? `/learn/${p.id}/level/${si + 1}` : undefined,
                lessonSlugs: s.steps.filter((x) => entryBySlug.has(x)),
                practiceItems: stageStats(s).questions + stageStats(s).exercises,
                planned: s.steps.filter((x) => !entryBySlug.has(x)).length,
              }))}
            />
          </div>
          <h2 className="t-section mt-12 text-2xl">Lessons by level</h2>
          <p className="mt-1 text-sm text-ink-3">
            {stats.lessons} lessons{stats.planned ? ` · ${stats.planned} more ${stats.planned === 1 ? "topic" : "topics"} shown for context, in development` : ""}
          </p>
          <ol className="mt-6 space-y-4">
            {p.stages.map((s, si) => {
              const st = stageStats(s);
              let n = 0;
              return (
                <li key={s.title}>
                  <details open={si === 0} className="group overflow-hidden rounded-lg border border-rule bg-surface shadow-card">
                    <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4">
                      <span className="t-sub grid h-10 w-10 shrink-0 place-items-center rounded-md bg-accent-wash text-sm text-accent-ink">L{si + 1}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block t-sub text-base text-ink">{s.title}</span>
                        <span className="block text-xs text-ink-3">
                          {DIFFICULTY_LABEL[s.level]} — {LEVEL_PURPOSE[s.level]} · {st.lessons} lessons · {st.questions + st.exercises} practice items · est. reading ≈ {st.minutes} min
                        </span>
                      </span>
                      <span aria-hidden className="text-ink-3 transition-transform group-open:rotate-90">
                        ›
                      </span>
                    </summary>
                    <div className="border-t border-rule">
                      <p className="px-5 pt-3 text-sm text-ink-2">{s.description}</p>
                      <ul className="mt-2">
                        {s.steps.map((slug) => {
                          const e = entryBySlug.get(slug);
                          const t = taxonomyBySlug.get(slug);
                          if (!e)
                            return (
                              <li key={slug} className="flex items-center gap-4 border-t border-dashed border-rule px-5 py-3 text-sm text-ink-3">
                                <span className="w-12 shrink-0" />
                                <Link href={`/library/${slug}`} className="tap flex-1 underline decoration-dotted underline-offset-4 hover:text-ink">
                                  {t?.title}
                                </Link>
                                <span className="text-xs">in development</span>
                              </li>
                            );
                          n++;
                          return (
                            <li key={slug} className={`${catClass(e.domain)} relative flex items-center gap-4 border-t border-rule px-5 py-3 hover:bg-soft`}>
                              <span className="w-14 shrink-0 overflow-hidden rounded-xs border border-rule">
                                <ConceptIllustration slug={e.slug} title={e.title} domain={e.domain} decorative />
                              </span>
                              <span className="min-w-0 flex-1">
                                <Link href={`/learn/${p.id}/lesson/${slug}`} className="t-sub text-sm text-ink after:absolute after:inset-0 hover:text-accent-ink">
                                  {n}. {e.title}
                                </Link>
                                <span className="block text-xs text-ink-3">
                                  {TYPE_LABEL[e.primaryType]} · {e.quiz.length + e.exercises.length} practice items · est. reading ≈ {readingMinutes(e)} min
                                </span>
                              </span>
                              <LessonState slug={slug} />
                            </li>
                          );
                        })}
                        {st.questions > 0 && (
                          <li className="relative flex items-center gap-4 border-t border-rule bg-soft px-5 py-3">
                            <span aria-hidden className="formula grid w-12 shrink-0 place-items-center text-lg text-accent-ink">
                              ✓
                            </span>
                            <span className="flex-1">
                              <Link href={`/learn/${p.id}/level/${si + 1}`} className="t-sub text-sm text-ink after:absolute after:inset-0 hover:text-accent-ink">
                                Level {si + 1} test
                              </Link>
                              <span className="block text-xs text-ink-3">{testLine(s)}</span>
                            </span>
                          </li>
                        )}
                      </ul>
                      {s.practice.length > 0 && (
                        <p className="border-t border-rule px-5 py-3 text-sm">
                          <span className="label mr-2">Practise</span>
                          {s.practice.map((pr, i) => {
                            const lab = labById.get(pr);
                            const ws = workshops.find((w) => w.id === pr);
                            return (
                              <span key={pr}>
                                {i > 0 && " · "}
                                <Link className="link" href={lab ? `/labs/${pr}` : `/practice/workshops/${pr}`}>
                                  {lab?.title ?? ws?.title}
                                </Link>
                              </span>
                            );
                          })}
                        </p>
                      )}
                    </div>
                  </details>
                </li>
              );
            })}
          </ol>
        </div>
        <aside className="pb-12 pt-10">
          <div className="space-y-0 rounded-lg border border-rule bg-soft p-5 lg:sticky lg:top-24">
            <p className="label">For</p>
            <p className="mt-1 text-sm text-ink-2">{p.audience}</p>
            <p className="label mt-6">You will be able to</p>
            <Bullets className="mt-2 text-sm text-ink-2" items={p.objectives} />
            <p className="label mt-6">Entry requirements</p>
            <p className="mt-1 text-sm text-ink-2">{p.prerequisites.length ? p.prerequisites.join("; ") : "None — starts from first principles."}</p>
            <p className="label mt-6">Complete when</p>
            <Bullets className="mt-2 text-sm text-ink-2" items={p.completion} />
          </div>
        </aside>
      </Container>
    </>
  );
}
