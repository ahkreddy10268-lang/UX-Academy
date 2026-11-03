import type { Metadata } from "next";
import { Suspense } from "react";
import { LibraryExplorer, type LibraryDoc } from "@/components/library/library-explorer";
import { Container, PageHeader } from "@/components/ui/layout";
import { domains, entries, taxonomyItems } from "@/lib/content";

export const metadata: Metadata = { title: "Knowledge Library" };

export default function LibraryPage() {
  const docs: LibraryDoc[] = [
    ...entries.map((e) => ({
      slug: e.slug,
      title: e.title,
      summary: e.summary,
      type: e.primaryType,
      secondary: e.secondaryTypes,
      domain: e.domain,
      subcategory: e.subcategory,
      difficulty: e.difficulty,
      evidence: e.evidence,
      status: e.status,
      alt: e.alternateNames,
      hasFormula: e.formulas.length > 0,
      hasLab: Boolean(e.lab),
    })),
    ...taxonomyItems
      .filter((t) => !t.entry)
      .map((t) => ({ slug: t.slug, title: t.title, summary: "", type: t.type, secondary: [], domain: t.domain, subcategory: t.subcategory, status: "planned" as const, alt: [] })),
  ].sort((a, b) => a.title.localeCompare(b.title, "en", { sensitivity: "base" }));

  const domainOptions = domains.map((d) => ({ id: d.id, title: d.title, subcategories: d.subcategories.map((s) => ({ id: s.id, title: s.title })) }));
  const published = entries.filter((e) => e.status === "published").length;

  return (
    <>
      <PageHeader
        eyebrow="Knowledge Library"
        title="Every concept, classified and connected"
        lede={
          <>
            {published} researched entries and {taxonomyItems.filter((t) => !t.entry).length} planned topics across {domains.length} subjects. Filter by what something
            <em> is</em> — a law, a method, a metric — and by how strong its evidence is.
          </>
        }
      />
      <Container className="pt-10">
        <Suspense fallback={<p className="text-ink-3">Loading library…</p>}>
          <LibraryExplorer docs={docs} domains={domainOptions} />
        </Suspense>
      </Container>
    </>
  );
}
