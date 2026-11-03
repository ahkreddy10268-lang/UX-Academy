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

/** Level test: every quiz question from the level's published lessons, in lesson order. */
export default async function LevelTestPage({ params }: PageProps<"/learn/[id]/level/[n]">) {
  const { id, n } = await params;
  const path = learningPaths.find((p) => p.id === id);
  const stage = path?.stages[Number(n) - 1];
  if (!path || !stage) notFound();
  const entries = stage.steps.map((s) => entryBySlug.get(s)).filter((e) => e !== undefined);
  const questions = entries.flatMap((e) => e.quiz.map((q) => ({ ...q, entry: e.slug, entryTitle: e.title })));
  const links = linkMapFor(questions);
  for (const e of entries) links[e.slug] = resolveSlug(e.slug)!;
  const nextLevel = path.stages[Number(n)];

  return (
    <>
      <PageHeader
        eyebrow={`Level ${n} test · ${DIFFICULTY_LABEL[stage.level]} — ${LEVEL_PURPOSE[stage.level]}`}
        title={stage.title}
        crumbs={[{ href: "/learn", label: "Learn" }, { href: `/learn/${id}`, label: path.title }, { label: `Level ${n} test` }]}
        lede={`${questions.length} questions from ${entries.length} lessons. Every option explains itself; wrong answers point to the lesson to revisit. Results are saved to your revision queue.`}
      />
      <Container className="max-w-[52rem] pt-10">
        {questions.length ? <Quiz questions={questions} links={links} showSource /> : <p className="text-ink-2">This level has no published lessons yet.</p>}
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
