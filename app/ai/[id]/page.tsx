import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AiDemo } from "@/components/ai/demos";
import { citationLine } from "@/components/entry/references";
import { Checklist, DefinitionTable, DoDont, DocLayout, DocSection, PrevNext, type TocItem } from "@/components/ui/doc-layout";
import { Bullets, Container, PageHeader } from "@/components/ui/layout";
import { EvidenceMark } from "@/components/ui/marks";
import { aiMoments, aiPatternById, aiPatterns, sourceById } from "@/lib/content";
import { resolveSlug } from "@/lib/content/context";

export function generateStaticParams() {
  return aiPatterns.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps<"/ai/[id]">): Promise<Metadata> {
  const { id } = await params;
  const p = aiPatternById.get(id);
  return { title: p ? `${p.title} · AI UX patterns` : "AI UX pattern", description: p?.summary };
}

export default async function AiPatternPage({ params }: PageProps<"/ai/[id]">) {
  const { id } = await params;
  const p = aiPatternById.get(id);
  if (!p) notFound();
  const moment = aiMoments.find((m) => m.id === p.moment)!;
  const i = aiPatterns.findIndex((x) => x.id === p.id);
  const prev = aiPatterns[i - 1];
  const next = aiPatterns[i + 1];
  const topics = p.topics.map((t) => ({ slug: t, info: resolveSlug(t) })).filter((t) => t.info);

  const toc: TocItem[] = [
    ["problem", "Problem"],
    ["how", "How it works"],
    ...(p.demo ? ([["demo", "Live demo"]] as TocItem[]) : []),
    ["use", "When to use"],
    ["anatomy", "Anatomy"],
    ["states", "Behaviour and states"],
    ["examples", "Good and poor examples"],
    ["accessibility", "Accessibility"],
    ["checklist", "Checklist"],
    ["related", "Related"],
    ["sources", "Sources and evidence"],
  ];

  return (
    <>
      <PageHeader
        eyebrow={`AI UX pattern · Moment 0${moment.n} · ${moment.title}`}
        title={p.title}
        lede={p.summary}
        crumbs={[{ href: "/ai", label: "AI UX patterns" }, { href: `/ai#${moment.id}`, label: moment.title }, { label: p.title }]}
        editorial
      >
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <EvidenceMark evidence={p.evidence} />
          {p.demo && (
            <a href="#demo" className="btn btn-secondary btn-sm">
              Try the live demo ↓
            </a>
          )}
        </div>
      </PageHeader>

      <Container className="pb-14 pt-8">
        <DocLayout toc={toc}>
          <DocSection id="problem" kicker="Why it exists" title="The problem it solves">
            <p className="max-w-read text-read leading-relaxed">{p.problem}</p>
            <p className="max-w-read text-ink-2">{p.why}</p>
          </DocSection>

          <DocSection id="how" kicker="Mechanism" title="How it works">
            <ol className="max-w-read list-decimal space-y-2 pl-5 marker:font-mono marker:text-ink-3">
              {p.how.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ol>
          </DocSection>

          {p.demo && (
            <DocSection id="demo" kicker="Interactive" title="Live demo">
              <p className="max-w-read text-sm text-ink-2">A working simulation with local example data: no AI service is called. Switch the preview between phone, tablet and desktop widths, and use the controls to reach each state.</p>
              <AiDemo id={p.demo} />
            </DocSection>
          )}

          <DocSection id="use" kicker="Appropriate use" title="When to use it, and when not to">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="label">Use it for</p>
                <Bullets className="mt-2 text-sm" items={p.whenToUse} />
              </div>
              <div>
                <p className="label">Avoid it for</p>
                <Bullets className="mt-2 text-sm" items={p.whenNotToUse} />
              </div>
            </div>
          </DocSection>

          <DocSection id="anatomy" kicker="Parts" title="Anatomy">
            <DefinitionTable head={["Part", "Role"]} rows={p.anatomy.map((a) => [a.part, a.role])} />
          </DocSection>

          <DocSection id="states" kicker="Interaction" title="Behaviour and states">
            <Bullets className="max-w-read text-sm" items={p.behaviour} />
            <DefinitionTable head={["State", "What the person sees"]} rows={p.states.map((s) => [s.name, s.description])} />
          </DocSection>

          <DocSection id="examples" kicker="Applications" title="Good and poor examples">
            <DoDont good={p.good} poor={p.poor} goodLabel="Good" poorLabel="Poor" />
            <p className="text-xs text-ink-3">Examples are illustrative, written for this library.</p>
          </DocSection>

          <DocSection id="accessibility" kicker="Inclusive by default" title="Accessibility and responsive behaviour">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="label">Accessibility</p>
                <Bullets className="mt-2 text-sm" items={p.accessibility} />
              </div>
              <div>
                <p className="label">Phones, tablets, desktop</p>
                <Bullets className="mt-2 text-sm" items={p.responsive} />
              </div>
            </div>
          </DocSection>

          <DocSection id="checklist" kicker="Apply it" title="Practical checklist">
            <Checklist items={p.checklist} />
          </DocSection>

          <DocSection id="related" kicker="Connections" title="Related patterns and topics">
            <ul className="flex flex-wrap gap-2">
              {p.related.map((r) => (
                <li key={r}>
                  <Link className="btn btn-secondary btn-sm" href={`/ai/${r}`}>
                    {aiPatternById.get(r)!.title}
                  </Link>
                </li>
              ))}
            </ul>
            {topics.length > 0 && (
              <p className="text-sm text-ink-2">
                Topics:{" "}
                {topics.map((t, k) => (
                  <span key={t.slug}>
                    {k > 0 && " · "}
                    <Link href={t.info!.href} className={t.info!.planned ? "underline decoration-dotted underline-offset-4" : "link"}>
                      {t.info!.title}
                    </Link>
                    {t.info!.planned && <span className="text-ink-3"> (planned)</span>}
                  </span>
                ))}
              </p>
            )}
          </DocSection>

          <DocSection id="sources" kicker="Evidence" title="Sources and evidence">
            <p className="max-w-read text-sm text-ink-2">
              <span className="mr-2 align-middle">
                <EvidenceMark evidence={p.evidence} />
              </span>
              {p.evidenceNote}
            </p>
            <ol className="divide-y divide-rule rounded-md border border-rule bg-surface">
              {p.references.map((r) => {
                const s = sourceById.get(r.source)!;
                return (
                  <li key={r.source + (r.locator ?? "")} className="px-4 py-3 text-sm">
                    <p className="text-ink">
                      {citationLine(s)}. {s.url ? (
                        <a className="link" href={s.url} rel="noopener">
                          <em>{s.title}</em>
                        </a>
                      ) : (
                        <em>{s.title}</em>
                      )}
                      {r.locator && <span className="text-ink-3"> · {r.locator}</span>}
                    </p>
                    <p className="mt-0.5 text-ink-2">{r.note}</p>
                  </li>
                );
              })}
            </ol>
          </DocSection>

          <PrevNext prev={prev && { href: `/ai/${prev.id}`, label: prev.title }} next={next && { href: `/ai/${next.id}`, label: next.title }} />
        </DocLayout>
      </Container>
    </>
  );
}
