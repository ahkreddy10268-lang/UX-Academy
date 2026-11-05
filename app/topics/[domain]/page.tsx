import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ConceptIllustration } from "@/components/illustrations/concept-illustration";
import { KnowledgeCard } from "@/components/knowledge/knowledge-card";
import { PathCard } from "@/components/learn/path-card";
import { CoverageBar } from "@/components/ui/coverage-bar";
import { Container, PageHeader } from "@/components/ui/layout";
import { domainById, domains, entryBySlug, itemsForSubcategory, learningPaths } from "@/lib/content";
import { cardFor } from "@/lib/content/cards";
import { catClass, PALETTE_LABEL, paletteFor } from "@/lib/content/categories";
import { domainCoverage, topicStatus } from "@/lib/content/coverage";
import { StatusTag } from "@/components/topics/status-tag";
import { TYPE_LABEL } from "@/lib/content/labels";
import { pathStats } from "@/lib/content/learning";

export function generateStaticParams() {
  return domains.map((d) => ({ domain: d.id }));
}

export async function generateMetadata({ params }: PageProps<"/topics/[domain]">): Promise<Metadata> {
  const { domain } = await params;
  return { title: domainById.get(domain)?.title ?? "Subject" };
}

export default async function DomainPage({ params }: PageProps<"/topics/[domain]">) {
  const { domain: id } = await params;
  const d = domainById.get(id);
  if (!d) notFound();
  const cov = domainCoverage().find((c) => c.id === id)!;
  const i = domains.findIndex((x) => x.id === id);
  const slugs = new Set(d.subcategories.flatMap((s) => itemsForSubcategory(id, s.id).map((x) => x.slug)));
  const paths = learningPaths.filter((p) => p.stages.some((s) => s.steps.some((step) => slugs.has(step))));
  const prev = domains[i - 1];
  const next = domains[i + 1];

  return (
    <>
      <PageHeader
        cat={catClass(id)}
        eyebrow={`Subject ${String(i + 1).padStart(2, "0")} · ${PALETTE_LABEL[paletteFor(id)]}`}
        title={d.title}
        lede={d.description}
        crumbs={[{ href: "/topics", label: "Knowledge Atlas" }, { label: d.shortTitle }]}
        aside={<ConceptIllustration slug={id} title={d.title} domain={id} variant="hero" />}
      >
        <div className="mt-6 max-w-xs">
          <CoverageBar published={cov.published} total={cov.total} label={d.title} />
        </div>
        <nav aria-label="Subcategories" className="mt-6 flex flex-wrap gap-2">
          {d.subcategories.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="rounded-xs border border-rule bg-surface px-2.5 py-1 text-sm text-ink-2 hover:border-ink-3 hover:text-ink">
              {s.title}
            </a>
          ))}
        </nav>
      </PageHeader>

      <Container className="space-y-16 pt-12">
        {d.subcategories.map((s) => {
          const items = itemsForSubcategory(d.id, s.id).sort((a, b) => a.title.localeCompare(b.title));
          const written = items.filter((x) => x.entry);
          const planned = items.filter((x) => !x.entry);
          return (
            <section key={s.id} aria-labelledby={s.id} className="scroll-mt-24">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-rule pb-3">
                <h2 id={s.id} className="t-section scroll-mt-24 text-2xl">
                  {s.title}
                </h2>
                <p className="text-sm text-ink-3">
                  {written.length} published · {planned.length} not yet published
                </p>
              </div>
              {s.description && <p className="mt-3 max-w-read text-ink-2">{s.description}</p>}
              {written.length > 0 && (
                <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {written.map((t) => (
                    <li key={t.slug}>
                      <KnowledgeCard d={cardFor(t.entry!)} plate={<ConceptIllustration slug={t.slug} title={t.title} domain={t.entry!.domain} decorative />} />
                    </li>
                  ))}
                </ul>
              )}
              {planned.length > 0 && (
                <div className="mt-6">
                  <p className="label">Not yet published</p>
                  <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-2">
                    {planned.map((t) => {
                      const status = topicStatus(t);
                      const parent = status === "addressed" && t.coveredBy ? entryBySlug.get(t.coveredBy) : undefined;
                      return (
                        <li key={t.slug}>
                          <Link href={parent ? `/library/${parent.slug}` : `/library/${t.slug}`} className="inline-flex flex-wrap items-center gap-1.5 rounded-xs border border-dashed border-rule-strong px-2 py-1 text-sm text-ink-2 hover:border-ink-3 hover:text-ink">
                            {t.title}
                            <span className="text-[11px] text-ink-3">{TYPE_LABEL[t.type]}</span>
                            <StatusTag status={status} />
                            {parent && <span className="text-[11px] text-ink-3">in {parent.title}</span>}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </section>
          );
        })}

        {paths.length > 0 && (
          <section aria-labelledby="paths">
            <h2 id="paths" className="t-section text-2xl">
              Learning paths through this subject
            </h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {paths.slice(0, 8).map((p) => {
                const stats = pathStats(p);
                return (
                  <li key={p.id}>
                    <PathCard
                      path={p}
                      stats={stats}
                      writtenSteps={p.stages.flatMap((s) => s.steps).filter((x) => entryBySlug.has(x))}
                    />
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <p className="text-sm">
          <Link className="link" href={`/topics?domain=${id}`}>
            ← All topics in this domain in the Knowledge Atlas
          </Link>
        </p>
        <nav aria-label="Adjacent subjects" className="grid grid-cols-2 gap-4 border-t border-rule pt-6 text-sm">
          <div>{prev && <Link href={`/topics/${prev.id}`} className="hover:text-accent-ink">← {prev.title}</Link>}</div>
          <div className="text-right">{next && <Link href={`/topics/${next.id}`} className="hover:text-accent-ink">{next.title} →</Link>}</div>
        </nav>
      </Container>
    </>
  );
}
