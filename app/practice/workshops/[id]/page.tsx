import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WorkshopResponse } from "@/components/practice/workshop-response";
import { Bullets, Container, PageHeader, SectionHeading } from "@/components/ui/layout";
import { RichParagraphs } from "@/components/ui/rich";
import { workshops } from "@/lib/content";
import { resolveSlug, richContext } from "@/lib/content/context";
import { DIFFICULTY_LABEL } from "@/lib/content/labels";

export function generateStaticParams() {
  return workshops.map((w) => ({ id: w.id }));
}

export async function generateMetadata({ params }: PageProps<"/practice/workshops/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: workshops.find((w) => w.id === id)?.title ?? "Workshop" };
}

export default async function WorkshopPage({ params }: PageProps<"/practice/workshops/[id]">) {
  const { id } = await params;
  const w = workshops.find((x) => x.id === id);
  if (!w) notFound();
  const ctx = richContext();
  return (
    <>
      <PageHeader eyebrow={`Workshop · ${DIFFICULTY_LABEL[w.level]} · ${w.duration}`} title={w.title} crumbs={[{ href: "/practice", label: "Practice" }, { href: "/practice#workshops", label: "Workshops" }, { label: w.title }]} />
      <Container className="max-w-[52rem] space-y-14 pt-10">
        <section>
          <SectionHeading kicker="Brief">The situation</SectionHeading>
          <RichParagraphs items={w.brief} ctx={ctx} />
        </section>
        {w.artefact && (
          <section>
            <SectionHeading kicker="Artefact">What you are working with</SectionHeading>
            <div className="formula whitespace-pre-line rounded-sm border border-rule bg-sunken p-5 text-sm leading-relaxed text-ink">{w.artefact}</div>
          </section>
        )}
        <section>
          <SectionHeading kicker="Tasks">What to do</SectionHeading>
          <ol className="space-y-3">
            {w.tasks.map((t, i) => (
              <li key={i} className="grid grid-cols-[2rem_1fr] gap-2">
                <span className="formula text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-ink-2">{t}</span>
              </li>
            ))}
          </ol>
          <p className="label mt-8">Deliverables</p>
          <Bullets className="mt-3 text-ink-2" items={w.deliverables} />
        </section>
        <section>
          <SectionHeading kicker="Assessment">What excellent looks like</SectionHeading>
          <dl className="divide-y divide-rule border-y border-rule">
            {w.criteria.map((c) => (
              <div key={c.criterion} className="grid gap-1 py-3 sm:grid-cols-[14rem_1fr] sm:gap-6">
                <dt className="font-medium">{c.criterion}</dt>
                <dd className="text-sm text-ink-2">{c.excellent}</dd>
              </div>
            ))}
          </dl>
        </section>
        {w.hints.length > 0 && (
          <details className="rounded-sm border border-rule p-5">
            <summary className="cursor-pointer font-medium">Hints (try without them first)</summary>
            <Bullets className="mt-3 text-sm text-ink-2" items={w.hints} />
          </details>
        )}
        <section>
          <SectionHeading kicker="Your work">Response</SectionHeading>
          <WorkshopResponse id={w.id} />
        </section>
        <section>
          <p className="label">Concepts this workshop applies</p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {w.concepts.map((c) => {
              const info = resolveSlug(c);
              return info ? (
                <li key={c}>
                  <Link className={info.planned ? "underline decoration-dotted" : "link"} href={info.href}>
                    {info.title}
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
        </section>
      </Container>
    </>
  );
}
