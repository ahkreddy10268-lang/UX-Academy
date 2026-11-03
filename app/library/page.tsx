import type { Metadata } from "next";
import { Suspense } from "react";
import { ConceptIllustration } from "@/components/illustrations/concept-illustration";
import { LibraryExplorer, type LibraryDoc } from "@/components/library/library-explorer";
import { Container } from "@/components/ui/layout";
import { domains, entries, taxonomyItems } from "@/lib/content";
import { TYPE_DESCRIPTION, TYPE_LABEL } from "@/lib/content/labels";
import { richToPlain } from "@/lib/content/rich";

export const metadata: Metadata = { title: "Knowledge Library" };

/** Types offered as discovery shortcuts, in the order a learner meets them. */
const DISCOVERY_TYPES = ["law", "theory", "principle", "heuristic", "concept", "model", "framework", "method", "technique", "research-instrument", "metric", "formula", "standard", "cognitive-bias", "pattern", "strategy"] as const;

export default function LibraryPage() {
  const published = entries.filter((e) => e.status === "published");
  const planned = taxonomyItems.filter((t) => !t.entry);
  const subject = new Map(domains.map((d) => [d.id, d.shortTitle]));

  const docs: LibraryDoc[] = [
    ...entries.map((e) => ({
      slug: e.slug,
      title: e.title,
      summary: richToPlain(e.summary),
      type: e.primaryType,
      secondary: e.secondaryTypes,
      domain: e.domain,
      subject: subject.get(e.domain) ?? e.domain,
      subcategory: e.subcategory,
      difficulty: e.difficulty,
      evidence: e.evidence,
      status: e.status,
      alt: e.alternateNames,
      expression: e.formulas[0]?.expression,
      hasCalculator: e.formulas.some((f) => f.calculator),
      hasLab: Boolean(e.lab),
      method: e.method ? e.method.purpose : undefined,
    })),
    ...planned.map((t) => ({ slug: t.slug, title: t.title, summary: "", type: t.type, secondary: [], domain: t.domain, subject: subject.get(t.domain) ?? t.domain, subcategory: t.subcategory, status: "planned" as const, alt: [] })),
  ].sort((a, b) => a.title.localeCompare(b.title, "en", { sensitivity: "base" }));

  // Plates are rendered here, on the server, and handed to the client explorer as nodes.
  const plates = Object.fromEntries(published.map((e) => [e.slug, <ConceptIllustration key={e.slug} slug={e.slug} title={e.title} domain={e.domain} decorative />]));

  const typeCounts = DISCOVERY_TYPES.map((t) => ({
    type: t,
    label: TYPE_LABEL[t],
    description: TYPE_DESCRIPTION[t],
    count: published.filter((e) => e.primaryType === t).length,
  })).filter((t) => t.count > 0);

  return (
    <>
      <header className="border-b border-rule">
        <Container className="grid gap-8 pb-10 pt-12 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
          <div>
            <p className="label">Knowledge Library</p>
            <h1 className="t-page mt-3 text-4xl sm:text-5xl">Every concept, classified and connected</h1>
            <p className="t-lede mt-4 max-w-2xl text-lg">
              Filter by what something <em>is</em> — a law, a method, a metric — by subject, level and the strength of its evidence. Planned topics are shown only when you ask for them,
              and always labelled as not yet researched.
            </p>
          </div>
          <dl className="grid grid-cols-3 gap-4 border-t border-rule pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            {[
              [published.length, "published"],
              [planned.length, "planned"],
              [domains.length, "subjects"],
            ].map(([n, l]) => (
              <div key={l} className="flex flex-col-reverse">
                <dt className="t-caption">{l}</dt>
                <dd className="formula text-3xl text-ink">{n}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </header>
      <Container className="pt-8">
        <Suspense fallback={<p className="text-ink-3">Loading library…</p>}>
          <LibraryExplorer docs={docs} domains={domains.map((d) => ({ id: d.id, title: d.title }))} plates={plates} typeCounts={typeCounts} />
        </Suspense>
      </Container>
    </>
  );
}
