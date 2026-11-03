import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/ui/layout";
import { CoverageBar } from "@/components/ui/coverage-bar";
import { domains } from "@/lib/content";
import { domainCoverage } from "@/lib/content/coverage";

export const metadata: Metadata = { title: "All subjects" };

export default function TopicsPage() {
  const cov = new Map(domainCoverage().map((c) => [c.id, c]));
  return (
    <>
      <PageHeader
        eyebrow="Subject index"
        title="The discipline, mapped"
        lede="Twenty subjects, from cognitive science to service design. The map is deliberately broader than what is written so far — every planned topic is labelled as such."
        crumbs={[{ href: "/library", label: "Library" }, { label: "All subjects" }]}
      />
      <Container className="pt-6">
        <ol className="grid gap-x-12 sm:grid-cols-2">
          {domains.map((d, i) => {
            const c = cov.get(d.id)!;
            return (
              <li key={d.id} className="border-b border-rule py-6">
                <div className="flex items-baseline gap-4">
                  <span className="formula w-6 shrink-0 text-sm text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                  <div className="min-w-0 flex-1">
                    <h2>
                      <Link href={`/topics/${d.id}`} className="display text-xl hover:text-accent-ink">
                        {d.title}
                      </Link>
                    </h2>
                    <p className="mt-1 text-sm text-ink-2">{d.description}</p>
                    <p className="mt-2 text-xs text-ink-3">{d.subcategories.map((s) => s.title).join(" · ")}</p>
                    <div className="mt-3 max-w-xs">
                      <CoverageBar published={c.published} total={c.total} label={d.title} />
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </>
  );
}
