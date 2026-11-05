import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AtlasExplorer } from "@/components/topics/atlas-explorer";
import { Container, PageHeader } from "@/components/ui/layout";
import { buildAtlas, countTopics, domainTopics } from "@/lib/content/atlas";

export const metadata: Metadata = {
  title: "Knowledge Atlas",
  description: "Every domain, subcategory and topic in UX Academy, with what is published and what is still planned.",
};

/** Server-rendered directory shown before the explorer hydrates (and without JavaScript). */
function StaticDirectory({ atlas }: { atlas: ReturnType<typeof buildAtlas> }) {
  return (
    <ol className="space-y-2" aria-label="Domains">
      {atlas.domains.map((d) => {
        const ts = domainTopics(d);
        const c = countTopics(ts);
        return (
          <li key={d.id} className={`cat-${d.palette} flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-lg border border-rule bg-surface p-3`}>
            <span aria-hidden className="tabular text-xs font-semibold text-c-ink">
              {String(d.n).padStart(2, "0")}
            </span>
            <Link href={`/topics/${d.id}`} className="t-sub text-ink hover:text-accent-ink">
              {d.title}
            </Link>
            <span className="tabular text-xs text-ink-3">
              {d.subcategories.length} {d.subcategories.length === 1 ? "subcategory" : "subcategories"} · {ts.length} topics · {c.published} published · {c.planned} planned
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export default function TopicsPage() {
  const atlas = buildAtlas();
  const all = atlas.domains.flatMap(domainTopics);
  const c = countTopics(all);
  const subs = atlas.domains.reduce((a, d) => a + d.subcategories.length, 0);
  const inProgress = c.research + c.drafted + c.reviewed;
  const stats: [string, number][] = [
    ["Domains", atlas.domains.length],
    ["Subcategories", subs],
    ["Topics", all.length],
    ["Published entries", c.published],
    ["Addressed within", c.addressed],
    ["Planned", c.planned],
  ];

  return (
    <>
      <PageHeader
        eyebrow="Domains & Topics"
        title="Knowledge Atlas"
        lede="Explore the disciplines, subjects and concepts that make up UX Academy. From foundational principles to advanced research and emerging disciplines, everything is organised into one connected knowledge map."
        crumbs={[{ href: "/", label: "Home" }, { label: "Knowledge Atlas" }]}
      >
        <div className="@container mt-6">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 @5xl:grid-cols-6">
          {stats.map(([label, n]) => (
            <div key={label} className="min-w-0">
              <dt className="text-xs text-ink-3">{label}</dt>
              <dd className="tabular t-sub text-2xl text-ink">{n}</dd>
            </div>
          ))}
        </dl>
        </div>
        <p className="mt-3 max-w-read text-sm text-ink-2">
          Every topic has exactly one status. {c.published} published + {c.addressed} addressed within another entry + {c.planned} planned
          {inProgress ? ` + ${inProgress} in research, drafted or reviewed` : ""} = {all.length} topics. Only published entries count as written content.
        </p>
      </PageHeader>

      <Container className="@container space-y-8 pt-8">
        <nav aria-label="Other ways in" className="grid gap-3 text-sm @3xl:grid-cols-3">
          <p className="rounded-md border border-rule-strong bg-soft p-3 text-ink-2">
            <span className="t-sub block text-ink">You are here: Knowledge Atlas</span>
            How the whole discipline is organised, and where every topic belongs.
          </p>
          <Link href="/learn" className="rounded-md border border-rule bg-surface p-3 text-ink-2 hover:border-ink-3 hover:shadow-hover">
            <span className="t-sub block text-ink">Learn →</span>
            Structured paths from beginner to advanced.
          </Link>
          <Link href="/library" className="rounded-md border border-rule bg-surface p-3 text-ink-2 hover:border-ink-3 hover:shadow-hover">
            <span className="t-sub block text-ink">Knowledge Library →</span>
            Search, filter and read individual entries.
          </Link>
        </nav>

        <section aria-labelledby="atlas-directory">
          <h2 id="atlas-directory" className="t-section text-2xl">
            All domains
          </h2>
          <p className="mt-1 text-sm text-ink-2">Open a domain to see its subcategories and every topic, with its type and status. Search reveals matches in every domain.</p>
          <div className="mt-4">
            <Suspense fallback={<StaticDirectory atlas={atlas} />}>
              <AtlasExplorer atlas={atlas} />
            </Suspense>
          </div>
        </section>
      </Container>
    </>
  );
}
