import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/ui/layout";
import { PracticeStats } from "@/components/practice/practice-stats";
import { allFlashcards, allQuestions, workshops } from "@/lib/content";
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
            <Link key={c.title} href={c.href} className="group bg-surface p-6 hover:bg-paper">
              <p className="label">{c.meta}</p>
              <h2 className="display mt-2 text-2xl group-hover:text-accent-ink">{c.title}</h2>
              <p className="mt-2 text-sm text-ink-2">{c.body}</p>
            </Link>
          ))}
        </div>

        <section id="workshops" aria-labelledby="ws" className="scroll-mt-24 pt-16">
          <h2 id="ws" className="display text-2xl">
            Design workshops
          </h2>
          <ul className="mt-4 divide-y divide-rule border-y border-rule">
            {workshops.map((w) => (
              <li key={w.id}>
                <Link href={`/practice/workshops/${w.id}`} className="group grid gap-1 py-4 sm:grid-cols-[minmax(0,1fr)_10rem_8rem] sm:items-baseline sm:gap-6">
                  <span className="font-medium text-ink group-hover:text-accent-ink">{w.title}</span>
                  <span className="text-sm text-ink-3">{DIFFICULTY_LABEL[w.level]}</span>
                  <span className="text-sm text-ink-3">{w.duration}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}
