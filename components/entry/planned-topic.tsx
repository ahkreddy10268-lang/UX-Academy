import Link from "next/link";
import { Breadcrumbs, Container } from "@/components/ui/layout";
import { TypeMark } from "@/components/ui/marks";
import { ConceptIllustration } from "@/components/illustrations/concept-illustration";
import { hasIllustration } from "@/components/illustrations/registry";
import { catClass } from "@/lib/content/categories";
import { domainById, entries, entryBySlug, glossary, graphEdges, subcategoryTitle, titleFor, type TaxonomyItem } from "@/lib/content";
import { TYPE_DESCRIPTION } from "@/lib/content/labels";

/** An honest page for a topic in the taxonomy that has no researched entry yet. */
export function PlannedTopic({ item }: { item: TaxonomyItem }) {
  const domain = domainById.get(item.domain)!;
  const mentionedBy = graphEdges.filter((e) => e.to === item.slug);
  const prereqOf = entries.filter((e) => e.prerequisites.includes(item.slug));
  const siblings = entries.filter((e) => e.domain === item.domain && e.subcategory === item.subcategory);
  const term = glossary.find((g) => g.slug === item.slug || g.seeAlso.includes(item.slug));

  return (
    <article>
      <header className={`${catClass(item.domain)} pt-6 sm:pt-8`}>
        <Container>
          <Breadcrumbs
            items={[
              { href: "/library", label: "Library" },
              { href: `/topics/${domain.id}`, label: domain.shortTitle },
              { href: `/topics/${domain.id}#${item.subcategory}`, label: subcategoryTitle(item.domain, item.subcategory) ?? "" },
              { label: item.title },
            ]}
          />
          <div className="mt-5 grid items-center gap-8 rounded-2xl border border-dashed border-rule-strong bg-soft p-5 sm:p-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className="max-w-3xl">
            <TypeMark type={item.type} />
            <h1 className="t-editorial mt-3 text-[2.3rem] text-ink-2 sm:text-[3rem]">{item.title}</h1>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-rule-strong bg-surface px-3 py-1 text-sm text-ink-2">Planned · research pending</p>
            {item.coveredBy && entryBySlug.get(item.coveredBy) && (
              <p className="mt-5 max-w-read rounded-lg border border-rule bg-surface p-3 text-ink">
                Explained within{" "}
                <Link className="link font-medium" href={`/library/${item.coveredBy}`}>
                  {entryBySlug.get(item.coveredBy)!.title}
                </Link>
                . It has no entry of its own yet; read it there in context.
              </p>
            )}
            <p className="mt-5 max-w-read text-ink-2">
              This topic is part of the academy&apos;s subject inventory but has not been researched and written as its own entry yet. Nothing on this page is
              presented as educational content. {TYPE_DESCRIPTION[item.type]}
            </p>
          </div>
          <figure className="hidden overflow-hidden rounded-xl border border-rule bg-surface lg:block">
            <ConceptIllustration slug={hasIllustration(item.slug) ? item.slug : item.domain} title={item.title} domain={item.domain} variant="card" decorative />
            <figcaption className="t-caption border-t border-rule bg-surface px-3 py-2">
              {hasIllustration(item.slug) ? "Concept plate drawn ahead of the entry" : `Subject plate · ${domain.title}`} — the topic itself is not yet researched.
            </figcaption>
          </figure>
          </div>
        </Container>
      </header>
      <Container className="max-w-3xl space-y-12 pb-12 pt-10">
        {term && (
          <section>
            <p className="label">Working definition from the glossary</p>
            <p className="prose-read mt-2">{term.definition}</p>
            <p className="mt-1 text-sm text-ink-3">
              <Link className="underline" href={`/glossary#${term.slug}`}>
                {term.term}
              </Link>{" "}
              — a short glossary definition, not a full entry.
            </p>
          </section>
        )}
        {(mentionedBy.length > 0 || prereqOf.length > 0) && (
          <section>
            <p className="label">Already connected from</p>
            <ul className="mt-3 divide-y divide-rule border-y border-rule">
              {prereqOf.map((e) => (
                <li key={`p-${e.slug}`} className="py-3 text-sm">
                  <Link className="link font-medium" href={`/library/${e.slug}`}>
                    {e.title}
                  </Link>{" "}
                  <span className="text-ink-2">lists this as a prerequisite.</span>
                </li>
              ))}
              {mentionedBy.map((r) => (
                <li key={`${r.from}-${r.type}`} className="py-3 text-sm">
                  <Link className="link font-medium" href={`/library/${r.from}`}>
                    {titleFor(r.from)}
                  </Link>
                  <span className="text-ink-2"> — {r.note}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
        {siblings.length > 0 && (
          <section>
            <p className="label">Published in the same subcategory</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <Link className="link" href={`/library/${s.slug}`}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        <p className="text-sm text-ink-3">
          See <Link className="underline" href="/coverage">content coverage</Link> for what is planned, in progress and published.
        </p>
      </Container>
    </article>
  );
}
