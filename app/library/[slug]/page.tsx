import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EntryActions } from "@/components/entry/entry-actions";
import { ConceptIllustration } from "@/components/illustrations/concept-illustration";
import { ConceptExplorer } from "@/components/illustrations/interactive/explorers";
import { MotionFrame } from "@/components/illustrations/motion-toggle";
import { illustrationFor, plateNumber } from "@/components/illustrations/registry";
import { citationLine } from "@/components/entry/references";
import { FormulaBlock } from "@/components/entry/formula-block";
import { LevelTabs } from "@/components/entry/level-tabs";
import { NotesPanel } from "@/components/entry/notes-panel";
import { ReferenceList } from "@/components/entry/references";
import { PlannedTopic } from "@/components/entry/planned-topic";
import { Quiz } from "@/components/practice/quiz";
import { Breadcrumbs, Bullets, Container, SectionHeading } from "@/components/ui/layout";
import { DifficultyMark, EvidenceMark, StatusMark, TypeMark } from "@/components/ui/marks";
import { Rich, RichParagraphs } from "@/components/ui/rich";
import { domainById, edgesFor, entries, entryBySlug, knownSlugs, labById, sourceById, subcategoryTitle, taxonomyBySlug, titleFor, unlockedBy, verification } from "@/lib/content";
import { linkMapFor, resolveSlug, richContext } from "@/lib/content/context";
import { catClass } from "@/lib/content/categories";
import { EVIDENCE_DESCRIPTION, EVIDENCE_LABEL, EVIDENCE_ORDER, LEVEL_PURPOSE, RELATION_LABEL, TYPE_LABEL } from "@/lib/content/labels";
import { readingMinutes } from "@/lib/content/learning";
import { collectStrings, extractCitations, richToPlain } from "@/lib/content/rich";
import type { KnowledgeEntry } from "@/lib/content/schema";

export function generateStaticParams() {
  return [...knownSlugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/library/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const e = entryBySlug.get(slug);
  if (e) return { title: e.title, description: e.summary };
  const t = taxonomyBySlug.get(slug);
  return { title: t ? `${t.title} (planned)` : "Not found" };
}

export default async function EntryPage({ params }: PageProps<"/library/[slug]">) {
  const { slug } = await params;
  const entry = entryBySlug.get(slug);
  if (!entry) {
    const planned = taxonomyBySlug.get(slug);
    if (!planned) notFound();
    return <PlannedTopic item={planned} />;
  }
  return <Entry entry={entry} />;
}

function Entry({ entry: e }: { entry: KnowledgeEntry }) {
  const domain = domainById.get(e.domain)!;
  const citeOrder = e.references.map((r) => r.source);
  const ctx = richContext(citeOrder);
  const { outgoing, incoming } = edgesFor(e.slug);
  const unlocks = unlockedBy(e.slug);
  const lab = e.lab ? labById.get(e.lab) : undefined;
  const siblings = entries.filter((x) => x.domain === e.domain && x.subcategory === e.subcategory);
  const pos = siblings.findIndex((x) => x.slug === e.slug);
  const prev = siblings[pos - 1];
  const next = siblings[pos + 1];

  const quizLinks = { ...linkMapFor(e.quiz), [e.slug]: resolveSlug(e.slug)! };
  for (const q of e.quiz) if (q.revise && resolveSlug(q.revise)) quizLinks[q.revise] = resolveSlug(q.revise)!;

  const plate = illustrationFor(e.slug);
  const explorer = plate?.explorer;
  const toc = [
    ["definition", "Definition"],
    ...(explorer ? [["visual", "Visual explanation"]] : []),
    ["explanation", "Explanation"],
    ...(e.formulas.length ? [["formula", "Formula & calculator"]] : []),
    ...(e.method ? [["method", "Method"]] : []),
    ...(e.standard ? [["standard", "Standard"]] : []),
    ...(e.origin ? [["origin", "Origin"]] : []),
    ["application", "Application"],
    ["use", "When to use"],
    ["connections", "Connections"],
    ["practice", "Practice"],
    ["evidence", "Evidence & references"],
    ["notes", "My notes"],
  ] as [string, string][];

  const lv = e.levels;
  const panels = {
    beginner: (
      <div className="space-y-8">
        <RichParagraphs items={lv.beginner.explanation} ctx={ctx} />
        {lv.beginner.analogy && (
          <aside className="border-l-2 border-accent pl-5">
            <p className="label">An analogy</p>
            <p className="prose-read mt-2 italic text-ink-2">
              <Rich text={lv.beginner.analogy} ctx={ctx} />
            </p>
          </aside>
        )}
        {lv.beginner.everydayExamples.length > 0 && (
          <div>
            <p className="label">Everyday examples</p>
            <Bullets className="mt-3 text-ink-2" items={lv.beginner.everydayExamples.map((x, i) => <Rich key={i} text={x} ctx={ctx} />)} />
          </div>
        )}
        {lv.beginner.vocabulary.length > 0 && (
          <div>
            <p className="label">Vocabulary</p>
            <dl className="mt-3 divide-y divide-rule border-y border-rule">
              {lv.beginner.vocabulary.map((v) => (
                <div key={v.term} className="grid gap-1 py-2.5 sm:grid-cols-[11rem_1fr] sm:gap-4">
                  <dt className="font-medium text-ink">{v.term}</dt>
                  <dd className="text-ink-2">{v.meaning}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    ),
    intermediate: (
      <div className="space-y-8">
        <RichParagraphs items={lv.intermediate.explanation} ctx={ctx} />
        {lv.intermediate.howItWorks.length > 0 && (
          <div>
            <p className="label">How it works</p>
            <RichParagraphs className="mt-3" items={lv.intermediate.howItWorks} ctx={ctx} />
          </div>
        )}
        {lv.intermediate.implementation.length > 0 && (
          <div>
            <p className="label">Implementation guidance</p>
            <Bullets className="mt-3 text-ink-2" items={lv.intermediate.implementation.map((x, i) => <Rich key={i} text={x} ctx={ctx} />)} />
          </div>
        )}
        {lv.intermediate.scenarios.length > 0 && (
          <div>
            <p className="label">Common scenarios</p>
            <Bullets className="mt-3 text-ink-2" items={lv.intermediate.scenarios.map((x, i) => <Rich key={i} text={x} ctx={ctx} />)} />
          </div>
        )}
      </div>
    ),
    advanced: (
      <div className="space-y-8">
        <RichParagraphs items={lv.advanced.explanation} ctx={ctx} />
        {lv.advanced.evidence.length > 0 && (
          <div>
            <p className="label">Research evidence</p>
            <RichParagraphs className="mt-3" items={lv.advanced.evidence} ctx={ctx} />
          </div>
        )}
        {lv.advanced.debates.length > 0 && (
          <div>
            <p className="label">Debates & open questions</p>
            <RichParagraphs className="mt-3" items={lv.advanced.debates} ctx={ctx} />
          </div>
        )}
        {lv.advanced.alternativeModels.length > 0 && (
          <div>
            <p className="label">Alternative & competing models</p>
            <RichParagraphs className="mt-3" items={lv.advanced.alternativeModels} ctx={ctx} />
          </div>
        )}
      </div>
    ),
  };

  const relationGroups = Object.entries(
    outgoing
      .filter((o) => o.type !== "prerequisite-of")
      .reduce<Record<string, typeof outgoing>>((acc, o) => ((acc[o.type] ??= []).push(o), acc), {}),
  );
  const backlinks = incoming.filter((i) => i.type !== "prerequisite-of");

  return (
    <article>
      <header className={`${catClass(e.domain)} border-b border-rule`}>
        <div aria-hidden className="h-1 bg-c" />
        <Container className="pb-10 pt-8 sm:pt-10">
          <Breadcrumbs
            items={[
              { href: "/library", label: "Library" },
              { href: `/topics/${domain.id}`, label: domain.shortTitle },
              { href: `/topics/${domain.id}#${e.subcategory}`, label: subcategoryTitle(e.domain, e.subcategory) ?? e.subcategory },
              { label: e.title },
            ]}
          />
          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
            <div className="rise-in">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <TypeMark type={e.primaryType} secondary={e.secondaryTypes} />
                <span className="flex items-center gap-1.5 text-xs text-c-ink">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-c" />
                  {domain.shortTitle}
                </span>
              </p>
              <h1 className="t-page mt-3 text-4xl sm:text-5xl">{e.title}</h1>
              {e.alternateNames.length > 0 && <p className="mt-3 text-sm text-ink-3">Also known as {e.alternateNames.join(" · ")}</p>}
              <p className="t-lede mt-5 text-xl">
                <Rich text={e.summary} ctx={ctx} />
              </p>
              <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-rule pt-5 text-sm">
                <div>
                  <dt className="label">Evidence</dt>
                  <dd className="mt-1">
                    <a href="#evidence" className="hover:underline">
                      <EvidenceMark evidence={e.evidence} />
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="label">Starts at</dt>
                  <dd className="mt-1">
                    <DifficultyMark level={e.difficulty} />
                  </dd>
                </div>
                <div>
                  <dt className="label">Reading</dt>
                  <dd className="tabular mt-1 text-ink-2">≈ {readingMinutes(e)} min · 3 levels</dd>
                </div>
                <div>
                  <dt className="label">Verified</dt>
                  <dd className="tabular mt-1 flex flex-wrap items-center gap-2 text-ink-2">
                    {e.lastVerifiedAt}
                    {e.status !== "published" && <StatusMark status={e.status} />}
                  </dd>
                </div>
              </dl>
              <div className="mt-6">
                <EntryActions slug={e.slug} cards={e.flashcards.map((c) => ({ id: c.id }))} />
              </div>
            </div>
            <figure className="rise-in">
              <div className="overflow-hidden rounded-sm border border-rule">
                {plate?.animated ? (
                  <MotionFrame label={e.title}>
                    <ConceptIllustration slug={e.slug} title={e.title} domain={e.domain} variant="hero" animate />
                  </MotionFrame>
                ) : (
                  <ConceptIllustration slug={e.slug} title={e.title} domain={e.domain} variant="hero" />
                )}
              </div>
              <figcaption className="t-caption mt-2 flex justify-between gap-4">
                <span>
                  {plateNumber(e.slug) ? <span className="formula">Pl. {String(plateNumber(e.slug)).padStart(2, "0")} — </span> : null}
                  {e.title}
                  {plate ? "" : " · typographic placeholder (no plate drawn yet)"}
                </span>
                {explorer && (
                  <a href="#visual" className="link">
                    Explore it interactively ↓
                  </a>
                )}
              </figcaption>
            </figure>
          </div>
        </Container>
      </header>

      <Container className="lg:grid lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-16">
        <div className="min-w-0 max-w-[46rem]">
          <details className="mt-6 rounded-sm border border-rule lg:hidden">
            <summary className="cursor-pointer px-4 py-3 text-sm font-medium">On this page</summary>
            <TocList toc={toc} />
          </details>

          <section aria-labelledby="definition" className="pt-12">
            <SectionHeading id="definition" kicker="Definition">
              What it is
            </SectionHeading>
            <div className="rounded-sm border border-rule bg-surface p-6">
              <p className="prose-read">
                <Rich text={e.definition} ctx={ctx} />
              </p>
            </div>
            <div className="mt-8">
              <p className="label">You will be able to</p>
              <Bullets className="mt-3 text-ink-2" items={e.learningObjectives} />
            </div>
            {e.prerequisites.length > 0 && (
              <p className="mt-6 text-sm text-ink-2">
                <span className="font-medium text-ink">Learn first: </span>
                {e.prerequisites.map((p, i) => {
                  const info = resolveSlug(p)!;
                  return (
                    <span key={p}>
                      {i > 0 && ", "}
                      <Link className={info.planned ? "underline decoration-dotted" : "link"} href={info.href}>
                        {info.title}
                      </Link>
                    </span>
                  );
                })}
              </p>
            )}
          </section>

          {explorer && (
            <section aria-labelledby="visual" className={`${catClass(e.domain)} pt-16`}>
              <SectionHeading id="visual" kicker="Visual explanation">
                See it change
              </SectionHeading>
              <ConceptExplorer id={explorer} />
            </section>
          )}

          <section aria-labelledby="explanation" className="pt-16">
            <SectionHeading id="explanation" kicker="Explanation at three depths">
              Understand it
            </SectionHeading>
            <p className="mb-4 text-sm text-ink-3">
              Choose a depth: {Object.entries(LEVEL_PURPOSE).map(([k, v]) => `${k} — ${v.toLowerCase()}`).join(" · ")}. Your choice is remembered across entries.
            </p>
            <LevelTabs slug={e.slug} panels={panels} />
          </section>

          {e.formulas.length > 0 && (
            <section aria-labelledby="formula" className="pt-16">
              <SectionHeading id="formula" kicker="Formula Lab">
                The mathematics
              </SectionHeading>
              <div className="space-y-16">
                {e.formulas.map((f) => (
                  <div key={f.id} id={`formula-${f.id}`}>
                    <FormulaBlock formula={f} ctx={ctx} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {e.method && (
            <section aria-labelledby="method" className="pt-16">
              <SectionHeading id="method" kicker="Method">
                How to run it
              </SectionHeading>
              <dl className="grid gap-x-8 gap-y-4 border-y border-rule py-5 text-sm sm:grid-cols-2">
                {[
                  ["Purpose", e.method.purpose === "both" ? "Generative and evaluative" : e.method.purpose === "generative" ? "Generative (discover)" : "Evaluative (assess a design)"],
                  ["Data", e.method.data],
                  ["Participants", e.method.participants],
                  ["Typical duration", e.method.duration],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="label">{k}</dt>
                    <dd className="mt-1 text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="label mt-8">Procedure</p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-ink-2 marker:text-ink-3">
                {e.method.procedure.map((s, i) => (
                  <li key={i}>
                    <Rich text={s} ctx={ctx} />
                  </li>
                ))}
              </ol>
              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <div>
                  <p className="label">Inputs</p>
                  <Bullets className="mt-3 text-ink-2" items={e.method.inputs} />
                </div>
                <div>
                  <p className="label">Outputs</p>
                  <Bullets className="mt-3 text-ink-2" items={e.method.outputs} />
                </div>
              </div>
            </section>
          )}

          {e.standard && (
            <section aria-labelledby="standard" className="pt-16">
              <SectionHeading id="standard" kicker="Standard">
                Status & version
              </SectionHeading>
              <dl className="grid gap-x-8 gap-y-4 border-y border-rule py-5 text-sm sm:grid-cols-2">
                {[
                  ["Issuer", e.standard.issuer],
                  ["Version", e.standard.version],
                  ["Published", e.standard.published],
                  ["Status", e.standard.status],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="label">{k}</dt>
                    <dd className="mt-1 text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-sm">
                <a className="link" href={e.standard.url} target="_blank" rel="noopener noreferrer">
                  Official text ↗
                </a>
              </p>
            </section>
          )}

          {lab && (
            <aside className="mt-16 flex flex-col gap-4 rounded-sm border border-rule bg-sunken p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="label">Interactive lab</p>
                <p className="display mt-1 text-lg">{lab.title}</p>
                <p className="mt-1 text-sm text-ink-2">{lab.summary}</p>
              </div>
              <Link href={`/labs/${lab.id}`} className="inline-flex h-10 shrink-0 items-center rounded-sm bg-ink px-4 text-sm font-medium text-paper hover:bg-ink-2">
                Open the lab
              </Link>
            </aside>
          )}

          {e.origin && (
            <section aria-labelledby="origin" className="pt-16">
              <SectionHeading id="origin" kicker="Origin & development">
                Where it came from
              </SectionHeading>
              <dl className="mb-6 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="label">Contributors</dt>
                  <dd className="mt-1 text-ink">{e.origin.contributors.join(", ") || "Unclear attribution"}</dd>
                </div>
                <div>
                  <dt className="label">Period</dt>
                  <dd className="mt-1 text-ink">{e.origin.period}</dd>
                </div>
              </dl>
              <p className="prose-read text-ink-2">
                <span className="font-medium text-ink">The problem it addressed. </span>
                <Rich text={e.origin.problem} ctx={ctx} />
              </p>
              <RichParagraphs className="mt-4" items={e.origin.narrative} ctx={ctx} />
              {e.origin.attributionNote && (
                <p className="mt-5 border-l-2 border-warn pl-4 text-sm text-ink-2">
                  <span className="font-medium text-ink">Attribution note. </span>
                  {e.origin.attributionNote}
                </p>
              )}
            </section>
          )}

          <section aria-labelledby="application" className="pt-16">
            <SectionHeading id="application" kicker="Application">
              Use it in design work
            </SectionHeading>
            <RichParagraphs items={e.application.summary} ctx={ctx} />
            <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {(
                [
                  ["Web", e.application.web],
                  ["Mobile", e.application.mobile],
                  ["Enterprise", e.application.enterprise],
                  ["Digital services", e.application.services],
                ] as const
              )
                .filter(([, xs]) => xs.length)
                .map(([label, xs]) => (
                  <div key={label}>
                    <p className="label">{label}</p>
                    <Bullets className="mt-3 text-sm text-ink-2" items={xs.map((x, i) => <Rich key={i} text={x} ctx={ctx} />)} />
                  </div>
                ))}
            </div>
            {e.application.steps.length > 0 && (
              <div className="mt-10">
                <p className="label">Practical steps</p>
                <ol className="mt-3 space-y-3">
                  {e.application.steps.map((s, i) => (
                    <li key={i} className="grid grid-cols-[2rem_1fr] gap-2">
                      <span className="formula text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-ink-2">
                        <Rich text={s} ctx={ctx} />
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </section>

          <section aria-labelledby="use" className="pt-16">
            <SectionHeading id="use" kicker="Appropriate use">
              When to use it — and when not to
            </SectionHeading>
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <p className="label !text-ok">Use when</p>
                <Bullets className="mt-3 text-ink-2" items={e.whenToUse.map((x, i) => <Rich key={i} text={x} ctx={ctx} />)} />
              </div>
              <div>
                <p className="label !text-accent-ink">Avoid when</p>
                <Bullets className="mt-3 text-ink-2" items={e.whenNotToUse.map((x, i) => <Rich key={i} text={x} ctx={ctx} />)} />
              </div>
              {e.advantages.length > 0 && (
                <div>
                  <p className="label">Advantages</p>
                  <Bullets className="mt-3 text-ink-2" items={e.advantages.map((x, i) => <Rich key={i} text={x} ctx={ctx} />)} />
                </div>
              )}
              <div>
                <p className="label">Limitations</p>
                <Bullets className="mt-3 text-ink-2" items={e.limitations.map((x, i) => <Rich key={i} text={x} ctx={ctx} />)} />
              </div>
            </div>
            {e.misconceptions.length > 0 && (
              <div className="mt-10">
                <p className="label">Common misunderstandings</p>
                <dl className="mt-3 divide-y divide-rule border-y border-rule">
                  {e.misconceptions.map((m, i) => (
                    <div key={i} className="py-4">
                      <dt className="font-medium text-ink">
                        <span className="mr-2 text-accent" aria-hidden>
                          ✕
                        </span>
                        <span className="sr-only">Myth: </span>
                        {m.myth}
                      </dt>
                      <dd className="mt-1.5 pl-6 text-ink-2">
                        <span className="sr-only">Reality: </span>
                        <Rich text={m.reality} ctx={ctx} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </section>

          <section aria-labelledby="connections" className="pt-16">
            <SectionHeading id="connections" kicker="Connections">
              How it relates
            </SectionHeading>
            <div className="space-y-8">
              {unlocks.length > 0 && (
                <div>
                  <p className="label">Leads on to</p>
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                    {unlocks.map((u) => (
                      <li key={u.slug}>
                        <Link className="link" href={`/library/${u.slug}`}>
                          {u.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {relationGroups.map(([type, rels]) => (
                <div key={type}>
                  <p className="label">{RELATION_LABEL[type as keyof typeof RELATION_LABEL]}</p>
                  <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                    {rels.map((r) => {
                      const info = resolveSlug(r.to)!;
                      const target = entryBySlug.get(r.to);
                      const t = target ?? taxonomyBySlug.get(r.to);
                      return (
                        <li key={r.to} className={`${catClass(t?.domain ?? e.domain)} relative grid grid-cols-[4.5rem_minmax(0,1fr)] gap-3 rounded-sm border p-3 ${info.planned ? "border-dashed border-rule-strong" : "border-rule bg-surface lift hover:border-ink-3"}`}>
                          <div className="overflow-hidden rounded-xs border border-rule">
                            {target ? <ConceptIllustration slug={target.slug} title={target.title} domain={target.domain} decorative /> : <div className="aspect-[4/3] bg-c-wash" />}
                          </div>
                          <div className="min-w-0">
                            <Link href={info.href} className={`after:absolute after:inset-0 ${info.planned ? "text-ink-2" : "t-sub text-ink hover:text-accent-ink"}`}>
                              {info.title}
                            </Link>
                            <p className="text-[11px] uppercase tracking-[0.08em] text-ink-3">{info.planned ? "planned topic" : TYPE_LABEL[target!.primaryType]}</p>
                            <p className="mt-1 text-sm text-ink-2">{r.note}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
              {backlinks.length > 0 && (
                <div>
                  <p className="label">Referenced by</p>
                  <ul className="mt-3 divide-y divide-rule border-y border-rule">
                    {backlinks.map((r) => (
                      <li key={r.from + r.type} className="grid gap-1 py-3 sm:grid-cols-[13rem_1fr] sm:gap-4">
                        <Link href={`/library/${r.from}`} className="link font-medium">
                          {titleFor(r.from)}
                        </Link>
                        <span className="text-sm text-ink-2">
                          <span className="text-ink-3">{RELATION_LABEL[r.type]} this · </span>
                          {r.note}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="text-sm">
                <Link className="link" href={`/graph?focus=${e.slug}`}>
                  See {e.title} in the knowledge graph →
                </Link>
              </p>
            </div>
          </section>

          <section aria-labelledby="practice" className="pt-16">
            <SectionHeading id="practice" kicker="Practice">
              Test and apply it
            </SectionHeading>
            {e.quiz.length > 0 && (
              <div>
                <p className="label mb-3">Check your understanding</p>
                <Quiz
                  questions={e.quiz.map((q) => ({ ...q, entry: e.slug }))}
                  links={Object.fromEntries(Object.entries(quizLinks).filter(([, v]) => v))}
                />
              </div>
            )}
            {e.exercises.length > 0 && (
              <div className="mt-12">
                <p className="label mb-3">Exercises</p>
                <div className="divide-y divide-rule border-y border-rule">
                  {e.exercises.map((x) => (
                    <details key={x.id} className="group py-4">
                      <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4">
                        <span>
                          <span className="font-medium text-ink group-open:text-accent-ink">{x.title}</span>
                          <span className="ml-3 text-xs text-ink-3">
                            {x.kind} · {x.level}
                          </span>
                        </span>
                        <span aria-hidden className="text-ink-3 group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <div className="mt-4 space-y-4">
                        <RichParagraphs items={x.prompt} ctx={ctx} className="!text-base" />
                        {x.deliverable && (
                          <p className="text-sm text-ink-2">
                            <span className="font-medium text-ink">Deliverable: </span>
                            {x.deliverable}
                          </p>
                        )}
                        {x.criteria.length > 0 && (
                          <div>
                            <p className="label">Evaluation criteria</p>
                            <Bullets className="mt-2 text-sm text-ink-2" items={x.criteria} />
                          </div>
                        )}
                        {x.exampleSolution && (
                          <details className="rounded-sm bg-sunken p-4">
                            <summary className="cursor-pointer text-sm font-medium">Show an example solution</summary>
                            <RichParagraphs items={x.exampleSolution} ctx={ctx} className="mt-3 !text-base" />
                          </details>
                        )}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section aria-labelledby="evidence" className="pt-16">
            <SectionHeading id="evidence" kicker="Evidence">
              How well supported is this?
            </SectionHeading>
            <div className="overflow-hidden rounded-sm border border-rule bg-surface">
              <div className="border-b border-rule p-5">
                <p className="label">Evidence ledger</p>
                <ol className="mt-3 grid grid-cols-2 gap-1 sm:grid-cols-4" aria-label="Evidence scale, strongest to most contested">
                  {EVIDENCE_ORDER.map((ev) => (
                    <li key={ev} aria-current={ev === e.evidence ? "true" : undefined} className={`rounded-xs border px-1.5 py-1.5 text-[11px] leading-tight ${ev === e.evidence ? "border-ink bg-ink text-paper" : "border-rule text-ink-3"}`}>
                      {EVIDENCE_LABEL[ev]}
                    </li>
                  ))}
                </ol>
                <p className="mt-3 text-sm text-ink-2">
                  <span className="font-medium text-ink">{EVIDENCE_LABEL[e.evidence]}.</span> {EVIDENCE_DESCRIPTION[e.evidence]}
                </p>
              </div>
              <div className="grid gap-0 md:grid-cols-2">
                <div className="border-b border-rule p-5 md:border-b-0 md:border-r">
                  <p className="t-sub text-sm">What the evidence supports — and what it does not</p>
                  <p className="prose-read mt-2 !text-base">
                    <Rich text={e.evidenceNote} ctx={ctx} />
                  </p>
                </div>
                <div className="p-5">
                  <p className="t-sub text-sm">Original research</p>
                  <ul className="mt-2 space-y-2 text-sm">
                    {e.references
                      .filter((r) => r.role === "primary" || r.role === "standard")
                      .map((r) => {
                        const src = sourceById.get(r.source)!;
                        return (
                          <li key={r.source}>
                            <a href={`#ref-${r.source}`} className="hover:underline">
                              <span className="text-ink-2">{citationLine(src)}</span> <span className="font-serif italic text-ink">{src.title}</span>
                            </a>
                          </li>
                        );
                      })}
                  </ul>
                  <p className="t-sub mt-5 text-sm">Key limitations</p>
                  <Bullets className="mt-2 text-sm text-ink-2" items={e.limitations.slice(0, 3).map((x, i) => <Rich key={i} text={x} ctx={ctx} />)} />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <ReferenceList references={e.references} sources={sourceById} verification={verification} />
            </div>
            <p className="mt-8 text-xs text-ink-3">
              Content version {e.version} · last verified {e.lastVerifiedAt} ·{" "}
              <Link href="/method" className="underline">
                how evidence is classified
              </Link>
            </p>
          </section>

          <section aria-labelledby="notes" className="pt-16">
            <h2 id="notes" className="sr-only">
              My notes
            </h2>
            <NotesPanel slug={e.slug} title={e.title} />
          </section>

          {(prev || next) && (
            <nav aria-label="More in this subcategory" className="mt-16 grid grid-cols-2 gap-4 border-t border-rule pt-6 text-sm">
              <div>
                {prev && (
                  <Link href={`/library/${prev.slug}`} className="group">
                    <span className="label">Previous</span>
                    <span className="mt-1 block text-ink group-hover:text-accent-ink">← {prev.title}</span>
                  </Link>
                )}
              </div>
              <div className="text-right">
                {next && (
                  <Link href={`/library/${next.slug}`} className="group">
                    <span className="label">Next</span>
                    <span className="mt-1 block text-ink group-hover:text-accent-ink">{next.title} →</span>
                  </Link>
                )}
              </div>
            </nav>
          )}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 pt-12">
            <p className="label">On this page</p>
            <TocList toc={toc} />
            <CitedCount e={e} />
          </div>
        </aside>
      </Container>
    </article>
  );
}

function TocList({ toc }: { toc: [string, string][] }) {
  return (
    <ol className="space-y-1 px-4 pb-3 pt-2 text-sm lg:px-0 lg:pt-3">
      {toc.map(([id, label]) => (
        <li key={id}>
          <a href={`#${id}`} className="block border-l border-rule py-1 pl-3 text-ink-2 hover:border-accent hover:text-ink">
            {label}
          </a>
        </li>
      ))}
    </ol>
  );
}

function CitedCount({ e }: { e: KnowledgeEntry }) {
  const inline = new Set(collectStrings(e).flatMap(extractCitations)).size;
  const primary = e.references.filter((r) => r.role === "primary" || r.role === "standard").length;
  return (
    <p className="mt-6 border-t border-rule pt-4 text-xs leading-relaxed text-ink-3">
      {e.references.length} references · {primary} primary or standard · {inline} cited inline.
      <span className="sr-only">{richToPlain(e.summary)}</span>
    </p>
  );
}
