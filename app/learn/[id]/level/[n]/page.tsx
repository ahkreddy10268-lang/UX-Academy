import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Quiz } from "@/components/practice/quiz";
import { Container, PageHeader } from "@/components/ui/layout";
import { entryBySlug, learningPaths } from "@/lib/content";
import { linkMapFor, resolveSlug } from "@/lib/content/context";
import { DIFFICULTY_LABEL, LEVEL_PURPOSE } from "@/lib/content/labels";

export function generateStaticParams() {
  return learningPaths.flatMap((p) => p.stages.map((_, i) => ({ id: p.id, n: String(i + 1) })));
}

export async function generateMetadata({ params }: PageProps<"/learn/[id]/level/[n]">): Promise<Metadata> {
  const { id, n } = await params;
  return { title: `Level ${n} test — ${learningPaths.find((p) => p.id === id)?.title ?? ""}` };
}

/** Level test: the level-matched questions from the level's published lessons, then an optional mixed-level revision set. */
export default async function LevelTestPage({ params }: PageProps<"/learn/[id]/level/[n]">) {
  const { id, n } = await params;
  const path = learningPaths.find((p) => p.id === id);
  const stage = path?.stages[Number(n) - 1];
  if (!path || !stage) notFound();
  const entries = stage.steps.map((s) => entryBySlug.get(s)).filter((e) => e !== undefined);
  const all = entries.flatMap((e) => e.quiz.map((q) => ({ ...q, entry: e.slug, entryTitle: e.title })));
  // Questions written for this level lead the test; the rest are a separate, labelled revision set.
  const questions = all.filter((q) => q.level === stage.level);
  const revision = all.filter((q) => q.level !== stage.level);
  const links = linkMapFor(all);
  for (const e of entries) links[e.slug] = resolveSlug(e.slug)!;
  const nextLevel = path.stages[Number(n)];

  return (
    <>
      <PageHeader
        eyebrow={`Level ${n} test · ${DIFFICULTY_LABEL[stage.level]} — ${LEVEL_PURPOSE[stage.level]}`}
        title={stage.title}
        crumbs={[{ href: "/learn", label: "Learn" }, { href: `/learn/${id}`, label: path.title }, { label: `Level ${n} test` }]}
        lede={`${questions.length} ${DIFFICULTY_LABEL[stage.level].toLowerCase()}-level ${questions.length === 1 ? "question" : "questions"} from ${entries.length} lessons${revision.length ? `, plus ${revision.length} optional revision ${revision.length === 1 ? "question" : "questions"} from other levels` : ""}. Every option explains itself; wrong answers point to the lesson to revisit. Results are saved to your revision queue.`}
      />
      <Container className="max-w-[52rem] pt-10">
        {questions.length > 0 && <Quiz questions={questions} links={links} showSource />}
        {questions.length === 0 && revision.length === 0 && <p className="text-ink-2">This level has no published lessons yet.</p>}
        {questions.length === 0 && revision.length > 0 && (
          <p className="text-ink-2">No published question is written for the {DIFFICULTY_LABEL[stage.level].toLowerCase()} level of these lessons yet. The revision set below uses questions written for other levels.</p>
        )}
        {revision.length > 0 && (
          <section aria-labelledby="revision" className={questions.length ? "mt-12 border-t border-rule pt-8" : "mt-8"}>
            <h2 id="revision" className="t-sub text-lg">
              Mixed-level revision (optional)
            </h2>
            <p className="mb-4 mt-1 text-sm text-ink-2">These questions were written for other levels, so they are not part of the level test above. Each shows its level.</p>
            <Quiz questions={revision} links={links} showSource />
          </section>
        )}
        <p className="mt-8 text-sm">
          {nextLevel ? (
            <Link className="link" href={`/learn/${id}`}>
              Continue to level {Number(n) + 1}: {nextLevel.title} →
            </Link>
          ) : (
            <Link className="link" href={`/learn/${id}`}>
              Back to the path overview →
            </Link>
          )}
        </p>
      </Container>
    </>
  );
}
