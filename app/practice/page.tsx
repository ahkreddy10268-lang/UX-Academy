import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/ui/layout";
import { PracticeStats } from "@/components/practice/practice-stats";
import { ConceptIllustration } from "@/components/illustrations/concept-illustration";
import { allFlashcards, allQuestions, entryBySlug, taxonomyBySlug, workshops } from "@/lib/content";
import { catClass } from "@/lib/content/categories";
import { DIFFICULTY_LABEL } from "@/lib/content/labels";

export const metadata: Metadata = { title: "Practice" };

export default function PracticePage() {
  return (
    <>
      <PageHeader
        eyebrow="Practice"
        title="Retrieve, apply, revise"
        lede="Reading builds familiarity; retrieval builds memory. Quizzes test understanding with explained answers, flashcards space your reviews over days, and workshops make you do the work."
      />
      <Container className="pt-10">
        <PracticeStats totalCards={allFlashcards.length} />
        <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-rule bg-rule md:grid-cols-3">
          {[
            { href: "/practice/quiz", title: "Quiz", meta: `${allQuestions.length} questions across the library`, body: "Build a mixed quiz by subject and level. Every option explains why it is right or wrong, and wrong answers point you to what to revise." },
            { href: "/practice/flashcards", title: "Flashcards", meta: `${allFlashcards.length} cards available`, body: "Spaced review with the Leitner system: remembered cards move to longer intervals; forgotten cards return tomorrow." },
            { href: "#workshops", title: "Workshops", meta: `${workshops.length} practical briefs`, body: "Redesign, evaluate, plan and critique, with complete artefacts to work on and criteria for what excellent looks like." },
          ].map((c) => (
            <Link key={c.title} href={c.href} className="group bg-surface p-6 hover:bg-soft">
              <p className="label">{c.meta}</p>
              <h2 className="t-section mt-2 text-2xl group-hover:text-accent-ink">{c.title}</h2>
              <p className="mt-2 text-sm text-ink-2">{c.body}</p>
            </Link>
          ))}
        </div>

        <section id="workshops" aria-labelledby="ws" className="scroll-mt-24 pt-16">
          <h2 id="ws" className="t-section text-[1.75rem]">
            Design workshops
          </h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {workshops.map((w) => {
              const c = entryBySlug.get(w.concepts.find((x) => entryBySlug.has(x)) ?? "");
              const domain = c?.domain ?? taxonomyBySlug.get(w.concepts[0])?.domain ?? "practice";
              return (
                <li key={w.id}>
                  <article className={`${catClass(domain)} group relative flex h-full flex-col overflow-hidden rounded-sm border border-rule bg-surface lift hover:border-ink-3`}>
                    <div className="border-b border-rule">
                      <ConceptIllustration slug={c?.slug ?? domain} title={w.title} domain={domain} decorative />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <p className="label">
                        Workshop · {DIFFICULTY_LABEL[w.level]} · {w.duration}
                      </p>
                      <h3 className="t-section mt-1.5 text-lg group-hover:text-accent-ink">
                        <Link href={`/practice/workshops/${w.id}`} className="after:absolute after:inset-0">
                          {w.title}
                        </Link>
                      </h3>
                      <p className="mt-auto pt-3 text-xs text-ink-3">
                        {w.tasks.length} tasks · {w.deliverables.length} deliverables · {w.criteria.length} assessment criteria
                      </p>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </section>
      </Container>
    </>
  );
}
