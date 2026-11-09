import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EntryActions } from "@/components/entry/entry-actions";
import { ConceptIllustration } from "@/components/illustrations/concept-illustration";
import { ConceptExplorer } from "@/components/illustrations/interactive/explorers";
import { illustrationFor } from "@/components/illustrations/registry";
import { Quiz } from "@/components/practice/quiz";
import { Callout } from "@/components/ui/callout";
import { Breadcrumbs, Bullets, Container } from "@/components/ui/layout";
import { Rich, RichParagraphs } from "@/components/ui/rich";
import { VisualFigure } from "@/components/visual-explanations/figure";
import { visualsFor } from "@/components/visual-explanations/registry";
import { entryBySlug, learningPaths } from "@/lib/content";
import { linkMapFor, resolveSlug, richContext } from "@/lib/content/context";
import { catClass } from "@/lib/content/categories";
import { DIFFICULTY_LABEL, LEVEL_PURPOSE, TYPE_LABEL } from "@/lib/content/labels";
import { minutesForLevel } from "@/lib/content/learning";
import type { Difficulty } from "@/lib/content/schema";

/** Every (path, published step) pair is a lesson. */
function lessonsOf(pathId: string) {
  const p = learningPaths.find((x) => x.id === pathId);
  if (!p) return [];
  return p.stages.flatMap((s, si) => s.steps.filter((x) => entryBySlug.has(x)).map((slug) => ({ slug, stage: s, stageIndex: si })));
}

export function generateStaticParams() {
  return learningPaths.flatMap((p) => lessonsOf(p.id).map((l) => ({ id: p.id, slug: l.slug })));
}

export async function generateMetadata({ params }: PageProps<"/learn/[id]/lesson/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${entryBySlug.get(slug)?.title ?? "Lesson"} — lesson` };
}

export default async function LessonPage({ params }: PageProps<"/learn/[id]/lesson/[slug]">) {
  const { id, slug } = await params;
  const path = learningPaths.find((p) => p.id === id);
  const e = entryBySlug.get(slug);
  const lessons = lessonsOf(id);
  const index = lessons.findIndex((l) => l.slug === slug);
  if (!path || !e || index < 0) notFound();
  const { stage, stageIndex } = lessons[index];
  const level: Difficulty = stage.level;
  const prev = lessons[index - 1];
  const next = lessons[index + 1];
  const ctx = richContext(e.references.map((r) => r.source));
  const explorer = illustrationFor(slug)?.explorer;
  const lv = e.levels[level];
  // Level-matched material only. If this entry has none at this level, fall back to
  // other-level material but say so (mixedQuiz / mixedExercise label it on the page).
  const checks = e.quiz.filter((q) => q.level === level);
  const mixedQuiz = checks.length === 0 && e.quiz.length > 0;
  const questions = (mixedQuiz ? e.quiz : checks).slice(0, 3);
  const matchedExercise = e.exercises.find((x) => x.level === level);
  const mixedExercise = !matchedExercise && e.exercises.length > 0;
  const exercise = matchedExercise ?? e.exercises[0];
  // The entry's first registered Level-2 figure is its primary visual; further figures stay on the library page.
  const visuals = visualsFor(slug);
  const mainVisual = visuals[0];
  const links = { ...linkMapFor(questions), [e.slug]: resolveSlug(e.slug)! };

  return (
    <article className={catClass(e.domain)}>
      <Container className="pt-6 sm:pt-8">
        <Breadcrumbs items={[{ href: "/learn", label: "Learn" }, { href: `/learn/${id}`, label: path.title }, { href: `/learn/${id}`, label: `Level ${stageIndex + 1}` }, { label: e.title }]} />
        {/* lesson progress rail */}
        <ol className="mt-6 flex gap-1" aria-label={`Lesson ${index + 1} of ${lessons.length}`}>
          {lessons.map((l, i) => (
            <li key={l.slug} className="flex-1">
              <Link href={`/learn/${id}/lesson/${l.slug}`} aria-current={i === index ? "step" : undefined} aria-label={`Lesson ${i + 1}: ${entryBySlug.get(l.slug)!.title}`} className="group hidden py-[9px] sm:block">
                <span aria-hidden className={`block h-1.5 rounded-full group-hover:opacity-80 ${i === index ? "bg-c" : i < index ? "bg-ink-3" : "bg-rule"}`} />
              </Link>
              {/* On phones the segments are too narrow to tap precisely (WCAG 2.5.8), so the rail is a static bar; Previous/Next below navigate. */}
              <span aria-hidden className={`block h-1.5 rounded-full sm:hidden ${i === index ? "bg-c" : i < index ? "bg-ink-3" : "bg-rule"}`} />
            </li>
          ))}
        </ol>
      </Container>

      <Container className="pb-10 pt-6">
        <div className="relative grid items-center gap-8 overflow-hidden rounded-2xl border border-rule bg-surface p-5 shadow-card sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-12">
        <div className="min-w-0">
          <p className="label !text-c-ink">
            Lesson {index + 1} of {lessons.length} · Level {stageIndex + 1} · {DIFFICULTY_LABEL[level]} — {LEVEL_PURPOSE[level]}
          </p>
          <h1 className="t-editorial mt-3 text-[2.3rem] sm:text-[3rem]">{e.title}</h1>
          <p className="t-lede-serif mt-4 text-lg">
            <Rich text={e.summary} ctx={ctx} />
          </p>
          <p className="mt-4 text-sm text-ink-2">
            {TYPE_LABEL[e.primaryType]} · est. reading ≈ {minutesForLevel(e, level)} min at this level · {questions.length} knowledge {questions.length === 1 ? "check" : "checks"}
          </p>
        </div>
        <figure className="overflow-hidden rounded-xl border border-rule bg-surface shadow-raise">
          <ConceptIllustration slug={e.slug} title={e.title} domain={e.domain} variant="hero" />
        </figure>
        </div>
      </Container>

      <Container className="max-w-[46rem] space-y-14 pb-6">
        <section aria-labelledby="objectives" className="rounded-lg border border-rule bg-soft p-5">
          <h2 id="objectives" className="t-sub text-base">
            In this lesson you will
          </h2>
          <Bullets className="mt-3 text-ink-2" items={e.learningObjectives.slice(0, 3)} />
        </section>

        <section aria-labelledby="learn">
          <h2 id="learn" className="t-section text-[1.5rem]">
            {level === "beginner" ? "The idea" : level === "intermediate" ? "Applying it" : "Analysing it"}
          </h2>
          <RichParagraphs className="mt-4" items={lv.explanation} ctx={ctx} />
          {"analogy" in lv && lv.analogy && (
            <Callout role="analogy" className="mt-8">
              <p className="t-quote text-lg">
                <Rich text={lv.analogy} ctx={ctx} />
              </p>
            </Callout>
          )}
          {"implementation" in lv && lv.implementation.length > 0 && (
            <Callout role="application" label="Do this in practice" className="mt-8">
              <Bullets className="text-ink" items={lv.implementation.map((x, i) => <Rich key={i} text={x} ctx={ctx} />)} />
            </Callout>
          )}
          {"debates" in lv && lv.debates.length > 0 && (
            <div className="mt-8">
              <p className="label">Open questions</p>
              <RichParagraphs className="mt-3" items={lv.debates} ctx={ctx} />
            </div>
          )}
        </section>

        {mainVisual && (
          <section aria-labelledby="see">
            <h2 id="see" className="t-section text-[1.5rem]">
              See how it works
            </h2>
            <div className="mt-4">
              <VisualFigure v={mainVisual} />
            </div>
            {visuals.length > 1 && (
              <p className="mt-3 text-sm text-ink-2">
                {visuals.length - 1} more {visuals.length === 2 ? "diagram" : "diagrams"} in the{" "}
                <Link href={`/library/${e.slug}#visual`} className="link">
                  full entry
                </Link>
                .
              </p>
            )}
          </section>
        )}

        {explorer && (
          <section aria-labelledby="try">
            <h2 id="try" className="t-section text-[1.5rem]">
              Try it
            </h2>
            <div className="mt-4">
              <ConceptExplorer id={explorer} />
            </div>
          </section>
        )}

        {e.misconceptions[0] && (
          <section aria-labelledby="watch" className="cat-rose rounded-lg bg-c-wash p-5">
            <h2 id="watch" className="t-sub text-base">
              Watch out for
            </h2>
            <p className="mt-2 font-medium text-ink">{e.misconceptions[0].myth}</p>
            <p className="mt-1 text-ink-2">
              <Rich text={e.misconceptions[0].reality} ctx={ctx} />
            </p>
          </section>
        )}

        {questions.length > 0 && (
          <section aria-labelledby="check">
            <h2 id="check" className="t-section text-[1.5rem]">
              Knowledge check
            </h2>
            {mixedQuiz && <p className="mt-2 text-sm text-ink-2">Revision from other levels — this lesson has no question written for the {DIFFICULTY_LABEL[level].toLowerCase()} level yet.</p>}
            <div className="mt-4">
              <Quiz questions={questions.map((q) => ({ ...q, entry: e.slug }))} links={Object.fromEntries(Object.entries(links).filter(([, v]) => v))} />
            </div>
          </section>
        )}

        {exercise && (
          <section aria-labelledby="exercise" className="rounded-lg border border-rule bg-surface p-5 shadow-card">
            <p className="label">
              {mixedExercise ? "Revision exercise" : "Exercise"} · {exercise.kind}
              {mixedExercise && ` · written for the ${DIFFICULTY_LABEL[exercise.level].toLowerCase()} level`}
            </p>
            <h2 id="exercise" className="t-sub mt-1 text-lg">
              {exercise.title}
            </h2>
            <RichParagraphs className="mt-3 !text-base" items={exercise.prompt} ctx={ctx} />
            {exercise.criteria.length > 0 && <Bullets className="mt-3 text-sm text-ink-2" items={exercise.criteria} />}
          </section>
        )}

        <section aria-label="Finish the lesson" className="flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-6">
          <EntryActions slug={e.slug} cards={e.flashcards.map((c) => ({ id: c.id }))} />
          <Link href={`/library/${e.slug}`} className="link tap text-sm">
            Read the full entry, evidence and references →
          </Link>
        </section>

        <nav aria-label="Lesson navigation" className="grid grid-cols-2 gap-4 text-sm">
          <div>
            {prev && (
              <Link href={`/learn/${id}/lesson/${prev.slug}`} className="group block rounded-lg border border-rule p-4 hover:border-rule-strong hover:shadow-hover">
                <span className="label">Previous lesson</span>
                <span className="mt-1 block text-ink group-hover:text-accent-ink">← {entryBySlug.get(prev.slug)!.title}</span>
              </Link>
            )}
          </div>
          <div className="text-right">
            {next ? (
              <Link href={`/learn/${id}/lesson/${next.slug}`} className="group block rounded-lg border border-rule p-4 hover:border-rule-strong hover:shadow-hover">
                <span className="label">{next.stageIndex !== stageIndex ? `Next: level ${next.stageIndex + 1}` : "Next lesson"}</span>
                <span className="mt-1 block text-ink group-hover:text-accent-ink">{entryBySlug.get(next.slug)!.title} →</span>
              </Link>
            ) : (
              <Link href={`/learn/${id}/level/${stageIndex + 1}`} className="group block rounded-lg border border-rule p-4 hover:border-rule-strong hover:shadow-hover">
                <span className="label">Finish</span>
                <span className="mt-1 block text-ink group-hover:text-accent-ink">Take the level {stageIndex + 1} test →</span>
              </Link>
            )}
          </div>
        </nav>
      </Container>
    </article>
  );
}
