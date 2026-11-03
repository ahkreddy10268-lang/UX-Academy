import type { Metadata } from "next";
import { ConceptIllustration } from "@/components/illustrations/concept-illustration";
import { CategoryTile } from "@/components/knowledge/knowledge-card";
import { Container, PageHeader } from "@/components/ui/layout";
import { domains } from "@/lib/content";
import { PALETTE_LABEL, paletteFor, type Palette } from "@/lib/content/categories";
import { domainCoverage } from "@/lib/content/coverage";

export const metadata: Metadata = { title: "All subjects" };

export default function TopicsPage() {
  const cov = new Map(domainCoverage().map((c) => [c.id, c]));
  // Group subjects by palette family so the colour system is legible as a map.
  const families = [...new Set(domains.map((d) => paletteFor(d.id)))] as Palette[];
  return (
    <>
      <PageHeader
        eyebrow="Subject index"
        title="The discipline, mapped"
        lede="Twenty subjects in eleven colour families, from perception to service design. The map is deliberately broader than what is written — every planned topic is labelled as such."
        crumbs={[{ href: "/library", label: "Library" }, { label: "All subjects" }]}
      />
      <Container className="space-y-14 pt-10">
        {families.map((f) => (
          <section key={f} aria-labelledby={`fam-${f}`} className={`cat-${f}`}>
            <h2 id={`fam-${f}`} className="flex items-center gap-2 t-sub text-base">
              <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-c" />
              {PALETTE_LABEL[f]}
            </h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {domains
                .filter((d) => paletteFor(d.id) === f)
                .map((d) => {
                  const c = cov.get(d.id)!;
                  return (
                    <li key={d.id}>
                      <CategoryTile id={d.id} title={d.title} description={d.description} published={c.published} total={c.total} plate={<ConceptIllustration slug={d.id} title={d.title} domain={d.id} decorative />} />
                    </li>
                  );
                })}
            </ul>
          </section>
        ))}
      </Container>
    </>
  );
}
