import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SystemExample, hasSystemExample } from "@/components/system/examples";
import { DefinitionTable, DoDont, DocLayout, DocSection, PrevNext, type TocItem } from "@/components/ui/doc-layout";
import { Bullets, Container, PageHeader } from "@/components/ui/layout";
import { systemDocFor, systemDocs } from "@/lib/content";

export function generateStaticParams() {
  return systemDocs.map((d) => ({ section: d.section, id: d.id }));
}

const SECTION_TITLE: Record<string, string> = { foundations: "Foundations", components: "Components", patterns: "Patterns" };

export async function generateMetadata({ params }: PageProps<"/system/[section]/[id]">): Promise<Metadata> {
  const { section, id } = await params;
  const d = systemDocFor(section, id);
  return { title: d ? `${d.title} · Design system` : "Design system", description: d?.summary };
}

export default async function SystemDocPage({ params }: PageProps<"/system/[section]/[id]">) {
  const { section, id } = await params;
  const d = systemDocFor(section, id);
  if (!d) notFound();
  const list = systemDocs.filter((x) => x.section === d.section);
  const i = list.findIndex((x) => x.id === d.id);
  const prev = list[i - 1];
  const next = list[i + 1];
  const example = hasSystemExample(d.example);
  const related = d.related.map((r) => systemDocs.find((x) => x.id === r)).filter((x) => x !== undefined);

  const toc: TocItem[] = [
    ["overview", "Overview"],
    ...(example ? ([["example", "Example"]] as TocItem[]) : []),
    ...(d.anatomy.length ? ([["anatomy", d.section === "patterns" ? "Pattern anatomy" : "Anatomy"]] as TocItem[]) : []),
    ...(d.variants.length ? ([["variants", "Variants"]] as TocItem[]) : []),
    ...(d.states.length ? ([["states", "States"]] as TocItem[]) : []),
    ["usage", "Usage"],
    ["accessibility", "Accessibility"],
    ["implementation", "Implementation"],
  ];

  return (
    <>
      <PageHeader
        eyebrow={`Design system · ${SECTION_TITLE[d.section]}`}
        title={d.title}
        lede={d.summary}
        crumbs={[{ href: "/system", label: "Design system" }, { href: `/system#${d.section}`, label: SECTION_TITLE[d.section] }, { label: d.title }]}
      />
      <Container className="pb-14 pt-8">
        <DocLayout toc={toc}>
          <DocSection id="overview" kicker="Purpose" title="Overview">
            {d.problem && (
              <p className="max-w-read rounded-md border border-rule bg-soft px-4 py-3 text-sm text-ink-2">
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-ink">Problem · </span>
                {d.problem}
              </p>
            )}
            <p className="max-w-read text-read leading-relaxed">{d.purpose}</p>
            {d.principles.length > 0 && (
              <div>
                <p className="label">Principles</p>
                <Bullets className="mt-2 max-w-read text-sm" items={d.principles} />
              </div>
            )}
          </DocSection>

          {example && (
            <DocSection id="example" kicker="Live" title="Example">
              <SystemExample id={d.example!} />
            </DocSection>
          )}

          {d.anatomy.length > 0 && (
            <DocSection id="anatomy" kicker="Parts" title={d.section === "patterns" ? "Pattern anatomy" : "Anatomy"}>
              <DefinitionTable head={["Part", "Description"]} rows={d.anatomy.map((a) => [a.name, a.description])} />
            </DocSection>
          )}
          {d.variants.length > 0 && (
            <DocSection id="variants" kicker="Options" title="Variants">
              <DefinitionTable head={["Variant", "Use"]} rows={d.variants.map((a) => [a.name, a.description])} />
            </DocSection>
          )}
          {d.states.length > 0 && (
            <DocSection id="states" kicker="Interaction" title="States">
              <DefinitionTable head={["State", "Behaviour"]} rows={d.states.map((a) => [a.name, a.description])} />
            </DocSection>
          )}

          <DocSection id="usage" kicker="Guidelines" title="Usage">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="label">Use it</p>
                <Bullets className="mt-2 text-sm" items={d.usage} />
              </div>
              {d.avoid.length > 0 && (
                <div>
                  <p className="label">Avoid</p>
                  <Bullets className="mt-2 text-sm" items={d.avoid} />
                </div>
              )}
            </div>
            <DoDont good={d.doDont.do} poor={d.doDont.dont} />
          </DocSection>

          <DocSection id="accessibility" kicker="Inclusive by default" title="Accessibility and responsive behaviour">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="label">Accessibility</p>
                <Bullets className="mt-2 text-sm" items={d.accessibility} />
              </div>
              {d.responsive.length > 0 && (
                <div>
                  <p className="label">Responsive</p>
                  <Bullets className="mt-2 text-sm" items={d.responsive} />
                </div>
              )}
            </div>
          </DocSection>

          <DocSection id="implementation" kicker="Code" title="Implementation">
            <Bullets className="max-w-read text-sm text-ink-2" items={d.implementation} />
            {related.length > 0 && (
              <p className="flex flex-wrap items-center gap-2 text-sm">
                <span className="label">Related</span>
                {related.map((r) => (
                  <Link key={r.id} href={`/system/${r.section}/${r.id}`} className="btn btn-secondary btn-sm">
                    {r.title}
                  </Link>
                ))}
              </p>
            )}
          </DocSection>

          <PrevNext prev={prev && { href: `/system/${prev.section}/${prev.id}`, label: prev.title }} next={next && { href: `/system/${next.section}/${next.id}`, label: next.title }} />
        </DocLayout>
      </Container>
    </>
  );
}
