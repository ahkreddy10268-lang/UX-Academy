import type { Metadata } from "next";
import { QuizBuilder } from "@/components/practice/quiz-builder";
import { Container, PageHeader } from "@/components/ui/layout";
import { allQuestions, domains } from "@/lib/content";
import { resolveSlug } from "@/lib/content/context";
import { linkMapFor } from "@/lib/content/context";

export const metadata: Metadata = { title: "Quiz" };

export default function QuizPage() {
  const links = linkMapFor(allQuestions);
  for (const q of allQuestions) {
    for (const s of [q.entry, q.revise]) if (s && !links[s]) {
      const info = resolveSlug(s);
      if (info) links[s] = info;
    }
  }
  const used = new Set(allQuestions.map((q) => q.domain));
  return (
    <>
      <PageHeader eyebrow="Practice · Quiz" title="Test your understanding" crumbs={[{ href: "/practice", label: "Practice" }, { label: "Quiz" }]} lede="Mixed questions interleave topics — harder in the moment, better for long-term retention than practising one topic at a time." />
      <Container className="max-w-[52rem] pt-10">
        <QuizBuilder
          questions={allQuestions.map((q) => ({ ...q }))}
          links={links}
          domains={domains.filter((d) => used.has(d.id)).map((d) => ({ id: d.id, title: d.title }))}
        />
      </Container>
    </>
  );
}
