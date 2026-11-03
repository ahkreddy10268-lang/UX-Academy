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
        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-ink-2">
          <div className="flex gap-2">
            <dt>Paths</dt>
            <dd className="formula text-ink">{learningPaths.length}</dd>
          </div>
          <div className="flex gap-2">
            <dt>Lesson slots written</dt>
            <dd className="formula text-ink">{lessons}</dd>
          </div>
          <div className="flex gap-2">
            <dt>Levels</dt>
            <dd className="formula text-ink">{all.reduce((n, x) => n + x.stats.levels, 0)}</dd>
          </div>
        </dl>
      </PageHeader>
      <Container className="pt-10">
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {all.map(({ p, stats }, i) => {
            const first = stats.firstPublished;
            return (
              <li key={p.id}>
                <PathCard
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
