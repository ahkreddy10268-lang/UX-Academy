import type { Metadata } from "next";
import Link from "next/link";
import { PathProgress } from "@/components/learn/path-progress";
import { Container, PageHeader } from "@/components/ui/layout";
import { entryBySlug, learningPaths } from "@/lib/content";

export const metadata: Metadata = { title: "Learning paths" };

export default function LearnPage() {
  return (
    <>
      <PageHeader
        eyebrow="Learn"
        title="Structured paths through the discipline"
        lede="Each path moves from understanding to application to critical evaluation. You don't have to follow them — the library is open — but they give the order that makes later ideas easier."
      />
      <Container className="pt-6">
        <ol className="divide-y divide-rule">
          {learningPaths.map((p, i) => {
            const steps = p.stages.flatMap((s) => s.steps);
            const written = steps.filter((s) => entryBySlug.has(s));
            return (
              <li key={p.id} className="grid gap-3 py-7 md:grid-cols-[3rem_minmax(0,1fr)_16rem] md:gap-6">
                <span className="formula text-sm text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2>
                    <Link href={`/learn/${p.id}`} className="display text-2xl hover:text-accent-ink">
                      {p.title}
                    </Link>
                  </h2>
                  <p className="mt-1 max-w-read text-ink-2">{p.summary}</p>
                  <p className="mt-2 text-xs text-ink-3">
                    {p.stages.map((s) => s.title).join(" → ")} · {written.length} of {steps.length} steps written
                  </p>
                </div>
                <div className="md:pt-2">
                  <PathProgress steps={written} />
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </>
  );
}
