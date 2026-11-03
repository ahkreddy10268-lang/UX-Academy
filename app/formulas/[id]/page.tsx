import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FormulaBlock } from "@/components/entry/formula-block";
import { ReferenceList } from "@/components/entry/references";
import { ConceptIllustration } from "@/components/illustrations/concept-illustration";
import { hasIllustration } from "@/components/illustrations/registry";
import { Container, PageHeader, SectionHeading } from "@/components/ui/layout";
import { catClass } from "@/lib/content/categories";
import { entries, libraryFormulas, sourceById, standaloneFormulaById, taxonomyBySlug, titleFor, verification } from "@/lib/content";
import { richContext } from "@/lib/content/context";

export function generateStaticParams() {
  return libraryFormulas.map((f) => ({ id: f.id }));
}

function find(id: string) {
  for (const e of entries) {
    const f = e.formulas.find((x) => x.id === id);
    if (f) return { formula: f, references: e.references, host: e, summary: e.summary };
  }
  const s = standaloneFormulaById.get(id);
  if (s) return { formula: s, references: s.references, host: undefined, summary: s.summary };
  return undefined;
}

export async function generateMetadata({ params }: PageProps<"/formulas/[id]">): Promise<Metadata> {
  const { id } = await params;
  const f = find(id);
  return { title: f ? `${f.formula.name} — Formula Lab` : "Formula" };
}

export default async function FormulaPage({ params }: PageProps<"/formulas/[id]">) {
  const { id } = await params;
  const found = find(id);
  if (!found) notFound();
  const { formula, references, host, summary } = found;
  const ctx = richContext(references.map((r) => r.source));
  const topic = "topic" in formula ? (formula.topic as string) : undefined;
  const domain = host?.domain ?? (topic ? taxonomyBySlug.get(topic)?.domain : undefined) ?? "metrics";
  const plateSlug = host && hasIllustration(host.slug) ? host.slug : domain;

  return (
    <>
      <PageHeader
        eyebrow="Formula Lab"
        title={formula.name}
        lede={summary}
        cat={catClass(domain)}
        crumbs={[{ href: "/formulas", label: "Formula Lab" }, { label: formula.name }]}
        aside={<ConceptIllustration slug={plateSlug} title={host?.title ?? formula.name} domain={domain} variant={host ? "hero" : "card"} decorative={!host} />}
      >
        <p className="mt-4 text-sm text-ink-2">
          {host ? (
            <>
              Part of the entry{" "}
              <Link className="link" href={`/library/${host.slug}`}>
                {host.title}
              </Link>{" "}
              — read it for the concept, its evidence and its limits.
            </>
          ) : topic ? (
            <>
              Topic:{" "}
              <Link className="link" href={`/library/${topic}`}>
                {titleFor(topic) ?? topic}
              </Link>{" "}
              (a full knowledge entry is planned).
            </>
          ) : null}
        </p>
      </PageHeader>
      <Container className="max-w-[52rem] pt-10">
        <FormulaBlock formula={formula} ctx={ctx} headingLevel={2} />
        <section className="pt-16" aria-labelledby="refs">
          <SectionHeading id="refs" kicker="Sources">
            References
          </SectionHeading>
          <ReferenceList references={references} sources={sourceById} verification={verification} />
        </section>
      </Container>
    </>
  );
}
