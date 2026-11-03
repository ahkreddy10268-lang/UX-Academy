import type { Metadata } from "next";
import { Suspense } from "react";
import { ConceptIllustration } from "@/components/illustrations/concept-illustration";
import { LibraryExplorer, type LibraryDoc } from "@/components/library/library-explorer";
import { hasVisuals } from "@/components/visual-explanations/registry";
import { Container, PageHeader } from "@/components/ui/layout";
import { domains, entries, graphEdges, taxonomyItems } from "@/lib/content";
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
      hasVisual: hasVisuals(e.slug),
      method: e.method ? { purpose: e.method.purpose, data: e.method.data } : undefined,
      refs: e.references.length,
      connections: graphEdges.filter((g) => g.from === e.slug || g.to === e.slug).length,
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
      <PageHeader
        eyebrow="Knowledge Library"
        title="Every concept, classified and connected"
        lede={
          <>
            Filter by what something <em>is</em> — a law, a method, a metric — by subject, level and the strength of its evidence. Planned topics
            appear only when you ask for them, always labelled as not yet researched.
          </>
        }
      >
        <dl className="mt-5 flex flex-wrap gap-2">
          {(
            [
              [published.length, "published"],
              [planned.length, "planned"],
              [domains.length, "subjects"],
            ] as const
          ).map(([n, l]) => (
            <div key={l} className="flex items-baseline gap-1.5 rounded-full border border-rule bg-soft px-3 py-1 text-sm">
              <dd className="t-sub tabular text-ink">{n}</dd>
              <dt className="text-ink-2">{l}</dt>
            </div>
          ))}
        </dl>
      </PageHeader>
      <Container className="pb-12 pt-6">
        <Suspense fallback={<p className="text-ink-3">Loading library…</p>}>
          <LibraryExplorer
            docs={docs}
            domains={domains.map((d) => ({ id: d.id, title: d.title, short: d.shortTitle }))}
            subcategories={domains.flatMap((d) => d.subcategories.map((s) => ({ id: s.id, title: s.title, domain: d.id })))}
            plates={plates}
            typeCounts={typeCounts}
          />
        </Suspense>
      </Container>
    </>
  );
}
