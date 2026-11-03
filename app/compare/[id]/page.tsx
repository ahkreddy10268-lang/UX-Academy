import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReferenceList } from "@/components/entry/references";
import { Bullets, Container, PageHeader, SectionHeading } from "@/components/ui/layout";
import { Rich } from "@/components/ui/rich";
import { comparisons, sourceById, verification } from "@/lib/content";
import { resolveSlug, richContext } from "@/lib/content/context";

export function generateStaticParams() {
  return comparisons.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: PageProps<"/compare/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: comparisons.find((c) => c.id === id)?.title ?? "Comparison" };
}

export default async function ComparisonPage({ params }: PageProps<"/compare/[id]">) {
  const { id } = await params;
  const c = comparisons.find((x) => x.id === id);
  if (!c) notFound();
  const ctx = richContext(c.references.map((r) => r.source));
  const side = (s: { label: string; slug?: string }) => {
    const info = s.slug ? resolveSlug(s.slug) : undefined;
    return info ? (
      <Link href={info.href} className={info.planned ? "underline decoration-dotted" : "link"}>
        {s.label}
      </Link>
    ) : (
      s.label
    );
  };
  return (
    <>
      <PageHeader eyebrow="Comparison" title={c.title} crumbs={[{ href: "/compare", label: "Comparisons" }, { label: c.title }]} lede={<Rich text={c.summary} ctx={ctx} />} />
      <Container className="max-w-[60rem] space-y-14 pt-10">
        <div className="overflow-x-auto" tabIndex={0} role="group" aria-label="Comparison table">
          <table className="w-full min-w-[36rem] text-left">
            <caption className="sr-only">
              {c.a.label} compared with {c.b.label}
            </caption>
            <thead>
              <tr className="border-b-2 border-ink">
                <th scope="col" className="w-48 py-3 pr-4 text-sm font-medium text-ink-3">
                  Dimension
                </th>
                <th scope="col" className="display py-3 pr-6 text-xl">
                  {side(c.a)}
                </th>
                <th scope="col" className="display py-3 text-xl">
                  {side(c.b)}
                </th>
              </tr>
            </thead>
            <tbody>
              {c.dimensions.map((d) => (
                <tr key={d.dimension} className="border-b border-rule align-top">
                  <th scope="row" className="py-3 pr-4 text-sm font-medium text-ink">
                    {d.dimension}
                  </th>
                  <td className="py-3 pr-6 text-ink-2">
                    <Rich text={d.a} ctx={ctx} />
                  </td>
                  <td className="py-3 text-ink-2">
                    <Rich text={d.b} ctx={ctx} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <p className="label">Choose {c.a.label} when</p>
            <Bullets className="mt-3 text-ink-2" items={c.chooseA.map((x, i) => <Rich key={i} text={x} ctx={ctx} />)} />
          </div>
          <div>
            <p className="label">Choose {c.b.label} when</p>
            <Bullets className="mt-3 text-ink-2" items={c.chooseB.map((x, i) => <Rich key={i} text={x} ctx={ctx} />)} />
          </div>
        </div>
        <section>
          <SectionHeading kicker="Together">How they work together</SectionHeading>
          <p className="prose-read">
            <Rich text={c.together} ctx={ctx} />
          </p>
        </section>
        {c.references.length > 0 && (
          <section>
            <SectionHeading kicker="Sources">References</SectionHeading>
            <ReferenceList references={c.references} sources={sourceById} verification={verification} />
          </section>
        )}
      </Container>
    </>
  );
}
