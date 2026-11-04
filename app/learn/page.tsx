import type { Metadata } from "next";
import { PathCard } from "@/components/learn/path-card";
import { Container, PageHeader } from "@/components/ui/layout";
import { entryBySlug, learningPaths } from "@/lib/content";
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
      <Container className="pb-12 pt-6">
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
