import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHeader } from "@/components/ui/layout";
import { CoverageBar } from "@/components/ui/coverage-bar";
import { EvidenceMark } from "@/components/ui/marks";
import { domainById, domains, itemsForSubcategory, learningPaths } from "@/lib/content";
import { domainCoverage } from "@/lib/content/coverage";
import { TYPE_LABEL } from "@/lib/content/labels";

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
  const paths = learningPaths.filter((p) => p.stages.some((s) => s.steps.some((step) => itemsForSubcategoryAll(id).has(step))));

  return (
    <>
      <PageHeader eyebrow={`Subject ${String(i + 1).padStart(2, "0")}`} title={d.title} lede={d.description} crumbs={[{ href: "/library", label: "Library" }, { href: "/topics", label: "All subjects" }, { label: d.shortTitle }]}>
        <div className="mt-6 max-w-xs">
          <CoverageBar published={cov.published} total={cov.total} label={d.title} />
        </div>
      </PageHeader>
      <Container className="lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
        <nav aria-label="Subcategories" className="hidden lg:block">
          <div className="sticky top-24 pt-10">
            <p className="label">In this subject</p>
            <ol className="mt-3 space-y-1 text-sm">
              {d.subcategories.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="block border-l border-rule py-1 pl-3 text-ink-2 hover:border-accent hover:text-ink">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
            {paths.length > 0 && (
              <>
                <p className="label mt-8">Learning paths</p>
                <ul className="mt-3 space-y-1 text-sm">
                  {paths.map((p) => (
                    <li key={p.id}>
                      <Link href={`/learn/${p.id}`} className="text-ink-2 hover:text-ink">
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </nav>
        <div className="min-w-0 space-y-14 pt-10">
          {d.subcategories.map((s) => {
            const items = itemsForSubcategory(d.id, s.id).sort((a, b) => Number(!!b.entry) - Number(!!a.entry) || a.title.localeCompare(b.title));
            const written = items.filter((x) => x.entry);
            const planned = items.filter((x) => !x.entry);
            return (
              <section key={s.id} aria-labelledby={s.id}>
                <h2 id={s.id} className="display scroll-mt-24 text-2xl">
                  {s.title}
                </h2>
                {s.description && <p className="mt-1 text-ink-2">{s.description}</p>}
                {written.length > 0 && (
                  <ul className="mt-5 divide-y divide-rule border-y border-rule">
                    {written.map((t) => (
                      <li key={t.slug} className="grid gap-1 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-6">
                        <div>
                          <span className="label !text-accent">{TYPE_LABEL[t.type]}</span>
                          <h3 className="mt-0.5">
                            <Link href={`/library/${t.slug}`} className="display text-lg hover:text-accent-ink">
                              {t.title}
                            </Link>
                          </h3>
                          <p className="mt-1 text-sm text-ink-2">{t.entry!.summary}</p>
                        </div>
                        <div className="sm:pt-5">
                          <EvidenceMark evidence={t.entry!.evidence} />
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                {planned.length > 0 && (
                  <div className="mt-5">
                    <p className="label">Planned · research pending</p>
                    <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
                      {planned.map((t) => (
                        <li key={t.slug}>
                          <Link href={`/library/${t.slug}`} className="text-ink-2 underline decoration-rule-strong decoration-dotted underline-offset-4 hover:text-ink">
                            {t.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </Container>
    </>
  );
}

function itemsForSubcategoryAll(domainId: string): Set<string> {
  const d = domainById.get(domainId)!;
  return new Set(d.subcategories.flatMap((s) => itemsForSubcategory(domainId, s.id).map((i) => i.slug)));
}
