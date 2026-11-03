import type { Metadata } from "next";
import { ConceptIllustration } from "@/components/illustrations/concept-illustration";
import { PathCard } from "@/components/learn/path-card";
import { Container, PageHeader } from "@/components/ui/layout";
import { entryBySlug, learningPaths } from "@/lib/content";
import { pathStats } from "@/lib/content/learning";

export const metadata: Metadata = { title: "Learning paths" };

export default function LearnPage() {
  const all = learningPaths.map((p) => ({ p, stats: pathStats(p) }));
  const lessons = all.reduce((n, x) => n + x.stats.lessons, 0);
  return (
    <>
      <PageHeader
        eyebrow="Learn"
        title="Structured paths through the discipline"
        lede="Each path climbs three levels — understand, apply, analyse — through short lessons, knowledge checks and a test at the end of every level. The library stays open: paths give an order, not a gate."
      >
        <dl className="mt-5 flex flex-wrap gap-2 text-sm text-ink-2 [&>div]:items-baseline [&>div]:rounded-full [&>div]:border [&>div]:border-rule [&>div]:bg-soft [&>div]:px-3 [&>div]:py-1">
          <div className="flex gap-2">
            <dt>Paths</dt>
            <dd className="t-sub tabular text-ink">{learningPaths.length}</dd>
          </div>
          <div className="flex gap-2">
            <dt>Lesson slots written</dt>
            <dd className="t-sub tabular text-ink">{lessons}</dd>
          </div>
          <div className="flex gap-2">
            <dt>Levels</dt>
            <dd className="t-sub tabular text-ink">{all.reduce((n, x) => n + x.stats.levels, 0)}</dd>
          </div>
        </dl>
      </PageHeader>
      <Container className="pb-12 pt-6">
        <ol className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {all.map(({ p, stats }, i) => {
            const first = stats.firstPublished;
            return (
              <li key={p.id}>
                <PathCard
                  detail="full"
                  index={i}
                  path={p}
                  stats={stats}
                  domain={first?.domain ?? "foundations"}
                  writtenSteps={p.stages.flatMap((s) => s.steps).filter((s) => entryBySlug.has(s))}
                  plate={first ? <ConceptIllustration slug={first.slug} title={first.title} domain={first.domain} decorative /> : <ConceptIllustration slug="emerging" title={p.title} domain="emerging" decorative />}
                />
              </li>
            );
          })}
        </ol>
      </Container>
    </>
  );
}
