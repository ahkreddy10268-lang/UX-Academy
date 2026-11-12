import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReferenceList } from "@/components/entry/references";
import { GuideDemo } from "@/components/guide/demos";
import { ExerciseBlock, HeuristicChapter, chapterData } from "@/components/guide/heuristic-chapter";
import { MockScreen } from "@/components/guide/mock-screen";
import { ConceptIllustration } from "@/components/illustrations/concept-illustration";
import { Quiz, type QuizItem } from "@/components/practice/quiz";
import { Callout } from "@/components/ui/callout";
import { DefinitionTable, DocLayout, DocSection, type TocItem } from "@/components/ui/doc-layout";
import { Container, PageHeader } from "@/components/ui/layout";
import { Rich, RichParagraphs } from "@/components/ui/rich";
import { entryBySlug, guideById, guides, sourceById, verification } from "@/lib/content";
import { linkMapFor, richContext } from "@/lib/content/context";

export function generateStaticParams() {
  return guides.map((g) => ({ id: g.id }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[id]">): Promise<Metadata> {
  const { id } = await params;
  const g = guideById.get(id);
  return { title: g ? `${g.title} · Guide` : "Guide", description: g?.hero.lede };
}

const SEVERITY_LABEL = ["Not a problem", "Cosmetic", "Minor", "Major", "Catastrophe"];

export default async function GuidePage({ params }: PageProps<"/guides/[id]">) {
  const { id } = await params;
  const g = guideById.get(id);
  if (!g) notFound();
  const host = entryBySlug.get(g.entry)!;
  const ctx = richContext(g.references.map((r) => r.source));
  const names = Object.fromEntries(g.heuristics.map((h) => [h.n, h.name])) as Record<number, string>;
  const chapters = g.heuristics.map((h) => ({ h, data: chapterData(h, entryBySlug) }));

  const entryQuestions: QuizItem[] = g.assessment.fromEntries.flatMap((qid) => {
    for (const e of entryBySlug.values()) {
      const q = e.quiz.find((x) => x.id === qid);
      if (q) return [{ ...q, entry: e.slug, entryTitle: e.title }];
    }
    return [];
  });
  const assessment: QuizItem[] = [...g.assessment.questions.map((q) => ({ ...q, entry: g.entry, entryTitle: host.title })), ...entryQuestions];
  const exercises = chapters.flatMap(({ h, data }) => (data.exercise ? [{ n: h.n, ex: data.exercise }] : []));
  const counts = [0, 1, 2, 3, 4].map((s) => g.caseStudy.findings.filter((f) => f.severity === s).length);
  const references = g.references.map((r) => ({ ...r, role: "explanatory" as const }));

  const toc: TocItem[] = [
    ["story", "1 · A problem story"],
    ["framework", "2 · The framework"],
    ["overview", "The ten at a glance"],
    ...g.heuristics.map((h) => [`h${h.n}`, `${h.n}. ${h.name}`] as [string, string]),
    ["compare", "Telling them apart"],
    ["process", "Running an evaluation"],
    ["severity", "Rating severity"],
    ["case-study", "Case study"],
    ["report", "Writing the report"],
    ["advanced", "Advanced topics"],
    ["mistakes", "Common mistakes"],
    ["practice", "Practice exercises"],
    ["assessment", "Final assessment"],
    ["sources", "Sources"],
  ];

  return (
    <>
      <PageHeader
        eyebrow={g.hero.eyebrow}
        title={g.hero.headline}
        lede={g.hero.lede}
        crumbs={[{ href: "/guides", label: "Guides" }, { label: g.title }]}
        editorial
        aside={<ConceptIllustration slug={g.entry} title={host.title} domain={host.domain} variant="hero" decorative />}
      >
        <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <div>
            <dt className="label inline">Time </dt>
            <dd className="inline text-ink">about {Math.round(g.hero.minutes / 60)} hours, in chapters</dd>
          </div>
          <div>
            <dt className="label inline">Level </dt>
            <dd className="inline text-ink">{g.hero.levels}</dd>
          </div>
        </dl>
        <div className="mt-5 flex flex-wrap gap-2">
          <a href="#story" className="btn btn-primary">
            Start with the story
          </a>
          <a href="#overview" className="btn btn-secondary">
            Jump to the ten heuristics
          </a>
          <Link href="/labs/heuristic-report-lab" className="btn btn-tertiary">
            Open the report lab
          </Link>
        </div>
      </PageHeader>

      <Container className="pb-14 pt-8">
        <div className="mb-8 rounded-lg border border-rule bg-soft p-5">
          <p className="label">By the end you will be able to</p>
          <ul className="mt-2 grid gap-x-8 gap-y-1.5 text-sm text-ink md:grid-cols-2">
            {g.hero.outcomes.map((o) => (
              <li key={o} className="flex gap-2">
                <span aria-hidden className="text-ok">
                  ✓
                </span>
                {o}
              </li>
            ))}
          </ul>
        </div>

        <details className="mb-8 rounded-md border border-rule bg-surface lg:hidden">
          <summary className="tap flex cursor-pointer items-center px-4 py-2.5 text-sm font-medium text-ink">Contents</summary>
          <nav aria-label="Guide contents" className="border-t border-rule px-4 py-3">
            <ol className="grid gap-1 text-sm sm:grid-cols-2">
              {toc.map(([tid, label]) => (
                <li key={tid}>
                  <a href={`#${tid}`} className="flex min-h-6 items-center text-ink-2 hover:text-ink">
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </details>

        <DocLayout toc={toc}>
          {/* Chapter 1 */}
          <DocSection id="story" kicker="Chapter 1 · The problem" title={g.story.title}>
            <p className="t-lede max-w-read text-lg">{g.story.question}</p>
            <RichParagraphs items={g.story.setup} ctx={ctx} />
            <p className="label">Hypothetical scenario · try it yourself</p>
            <GuideDemo id="transfer" />
            <div className="rounded-md border border-rule bg-surface p-4">
              <p className="label">Before reading on, think about</p>
              <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm text-ink marker:font-mono marker:text-ink-3">
                {g.story.prompts.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ol>
            </div>
            <details className="rounded-md border border-rule bg-soft px-4 py-3">
              <summary className="tap cursor-pointer text-sm font-medium text-ink">What went wrong, and which principles explain it</summary>
              <RichParagraphs items={g.story.debrief} ctx={ctx} className="mt-3" />
            </details>
            <Callout landmark={false} role="note" label="The point">
              <p className="text-sm leading-relaxed">
                <Rich text={g.story.takeaway} ctx={ctx} />
              </p>
            </Callout>
          </DocSection>

          {/* Chapter 2 */}
          <DocSection id="framework" kicker="Chapter 2 · The framework" title={g.framework.question}>
            <RichParagraphs items={g.framework.body} ctx={ctx} />
            <ol className="relative space-y-5 border-l border-rule pl-5">
              {g.framework.timeline.map((t) => (
                <li key={t.year + t.title}>
                  <span aria-hidden className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full border border-ink bg-surface" />
                  <p className="formula text-sm text-ink-3">{t.year}</p>
                  <p className="font-semibold text-ink">{t.title}</p>
                  <p className="mt-1 max-w-read text-sm leading-relaxed text-ink-2">
                    <Rich text={t.detail} ctx={ctx} />
                  </p>
                </li>
              ))}
            </ol>
            <div className="rounded-md border border-rule bg-surface p-4">
              <p className="label">The original nine principles (Molich and Nielsen, 1990)</p>
              <ol className="mt-2 grid list-decimal gap-x-8 gap-y-1 pl-5 text-sm text-ink marker:font-mono marker:text-ink-3 md:grid-cols-2">
                {g.framework.original.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ol>
            </div>
            <Callout landmark={false} role="limitation" label="What the heuristics are, and are not">
              <p className="text-sm leading-relaxed">
                <Rich text={g.framework.takeaway} ctx={ctx} />
              </p>
            </Callout>
          </DocSection>

          {/* Overview */}
          <DocSection id="overview" kicker="Chapter 3 · The ten" title="The ten heuristics at a glance">
            <ol className="grid gap-3 sm:grid-cols-2">
              {g.heuristics.map((h) => (
                <li key={h.n} className="min-w-0">
                  <a href={`#h${h.n}`} className="card flex h-full gap-3 p-4">
                    <span aria-hidden className="formula text-2xl leading-none text-ink-3">
                      {String(h.n).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold text-ink">{h.name}</span>
                      <span className="mt-1 block text-sm text-ink-2">{h.oneLiner}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </DocSection>

          {/* Ten chapters */}
          <div className="space-y-14">
            {chapters.map(({ h, data }) => (
              <HeuristicChapter key={h.n} h={h} data={data} names={names} ctx={ctx} />
            ))}
          </div>

          {/* Comparisons */}
          <DocSection id="compare" kicker="Part 6 · Comparisons" title="Telling similar heuristics apart">
            <p className="max-w-read text-sm text-ink-2">Several heuristics describe neighbouring ideas. Each pair below names the difference, then tests it on one scenario.</p>
            <div className="space-y-4">
              {g.comparisons.map((c) => (
                <details key={c.id} id={`compare-${c.id}`} className="scroll-mt-24 rounded-md border border-rule bg-surface">
                  <summary className="tap cursor-pointer px-4 py-3 font-semibold text-ink">
                    {c.a}. {names[c.a]} <span className="font-normal text-ink-3">vs</span> {c.b}. {names[c.b]}
                  </summary>
                  <div className="space-y-4 border-t border-rule px-4 py-4">
                    <DefinitionTable
                      head={["Heuristic", "What it asks"]}
                      rows={[
                        [`${c.a}. ${names[c.a]}`, <Rich key="a" text={c.aDefinition} ctx={ctx} />],
                        [`${c.b}. ${names[c.b]}`, <Rich key="b" text={c.bDefinition} ctx={ctx} />],
                      ]}
                    />
                    <p className="max-w-read text-sm leading-relaxed text-ink">
                      <span className="font-semibold">The difference. </span>
                      <Rich text={c.difference} ctx={ctx} />
                    </p>
                    <Callout landmark={false} role="example" label="One scenario, two lenses">
                      <p className="text-sm leading-relaxed">
                        <Rich text={c.scenario} ctx={ctx} />
                      </p>
                      <ul className="mt-2 space-y-1.5 text-sm leading-relaxed">
                        <li>
                          <span className="font-semibold">{names[c.a]}: </span>
                          <Rich text={c.aApplies} ctx={ctx} />
                        </li>
                        <li>
                          <span className="font-semibold">{names[c.b]}: </span>
                          <Rich text={c.bApplies} ctx={ctx} />
                        </li>
                      </ul>
                    </Callout>
                    <p className="text-sm font-medium text-ink">{c.takeaway}</p>
                  </div>
                </details>
              ))}
            </div>
            <RichParagraphs items={g.overlap} ctx={ctx} />
          </DocSection>

          {/* Process */}
          <DocSection id="process" kicker="Part 7 · Method" title={g.process.question}>
            <RichParagraphs items={g.process.intro} ctx={ctx} />
            <ol className="space-y-4">
              {g.process.stages.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3 rounded-md border border-rule bg-surface p-4">
                  <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full bg-ink font-mono text-sm font-semibold text-surface">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-ink">
                      <span className="sr-only">Stage {i + 1}: </span>
                      {s.title}
                    </p>
                    <p className="text-sm text-ink-2">{s.goal}</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-ink marker:text-ink-3">
                      {s.points.map((p, k) => (
                        <li key={k}>
                          <Rich text={p} ctx={ctx} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
            <Callout landmark={false} role="application" label="The point">
              <p className="text-sm leading-relaxed">
                <Rich text={g.process.takeaway} ctx={ctx} />
              </p>
            </Callout>
          </DocSection>

          {/* Severity */}
          <DocSection id="severity" kicker="Part 8 · Prioritising" title="Rating severity">
            <RichParagraphs items={g.severity.intro} ctx={ctx} />
            <div className="relative overflow-x-auto rounded-md border border-rule" tabIndex={0} role="group" aria-label="Severity scale">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <caption className="sr-only">Nielsen&rsquo;s severity rating scale, 0 to 4</caption>
                <thead className="bg-soft">
                  <tr>
                    {["Rating", "Meaning", "Example from the case study"].map((h) => (
                      <th key={h} scope="col" className="label px-4 py-2.5 !text-ink-2">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule align-top">
                  {g.severity.scale.map((s) => (
                    <tr key={s.rating}>
                      <th scope="row" className="whitespace-nowrap px-4 py-2.5 font-semibold text-ink">
                        <span className="formula">{s.rating}</span> · {s.label}
                      </th>
                      <td className="px-4 py-2.5 text-ink">{s.meaning}</td>
                      <td className="px-4 py-2.5 text-ink-2">{s.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {g.severity.factors.map((f) => (
                <div key={f.name} className="rounded-md border border-rule bg-surface p-4">
                  <p className="label">{f.name}</p>
                  <p className="mt-1 text-sm text-ink">{f.question}</p>
                </div>
              ))}
            </div>
            <Callout landmark={false} role="limitation">
              <ul className="space-y-1.5 text-sm leading-relaxed">
                {g.severity.caveats.map((c, i) => (
                  <li key={i}>
                    <Rich text={c} ctx={ctx} />
                  </li>
                ))}
              </ul>
            </Callout>
          </DocSection>

          {/* Case study */}
          <DocSection id="case-study" kicker="Part 9 · Case study · fictional" title={`Evaluating ${g.caseStudy.product}`}>
            <RichParagraphs items={g.caseStudy.brief} ctx={ctx} />
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-md border border-rule bg-surface p-4">
                <dt className="label">Users</dt>
                <dd className="mt-1 text-ink">{g.caseStudy.users}</dd>
              </div>
              <div className="rounded-md border border-rule bg-surface p-4">
                <dt className="label">Tasks walked through</dt>
                <dd className="mt-1">
                  <ol className="list-decimal space-y-0.5 pl-5 text-ink">
                    {g.caseStudy.tasks.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ol>
                </dd>
              </div>
            </dl>
            <div>
              <p className="label">Findings by severity</p>
              <ul className="mt-2 space-y-1.5 text-sm" aria-label="Number of findings at each severity rating">
                {[4, 3, 2, 1, 0]
                  .filter((s) => counts[s] > 0)
                  .map((s) => (
                    <li key={s} className="grid grid-cols-[9rem_minmax(0,1fr)_2rem] items-center gap-3">
                      <span className="text-ink">
                        <span className="formula">{s}</span> · {SEVERITY_LABEL[s]}
                      </span>
                      <span aria-hidden className="h-2.5 rounded-full bg-ink" style={{ width: `${(counts[s] / g.caseStudy.findings.length) * 100}%` }} />
                      <span className="formula text-right text-ink">{counts[s]}</span>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="space-y-3">
              {g.caseStudy.findings.map((f) => (
                <details key={f.id} id={`finding-${f.id.toLowerCase()}`} className="scroll-mt-24 rounded-md border border-rule bg-surface">
                  <summary className="tap flex cursor-pointer flex-wrap items-center gap-x-3 gap-y-1 px-4 py-3">
                    <span className="formula text-sm text-ink-3">{f.id}</span>
                    <span className="min-w-0 flex-1 font-semibold text-ink">{f.screen}</span>
                    <span className="rounded-xs border border-rule-strong px-1.5 py-0.5 font-mono text-[11px] text-ink">
                      Severity {f.severity} · {SEVERITY_LABEL[f.severity]}
                    </span>
                    <span className="w-full text-sm text-ink-2">
                      Heuristic {f.heuristic}. {names[f.heuristic]}
                      {f.also.length > 0 && ` · also ${f.also.join(", ")}`}
                    </span>
                  </summary>
                  <div className="space-y-4 border-t border-rule px-4 py-4">
                    <dl className="grid gap-3 text-sm md:grid-cols-2">
                      {([
                        ["Task", f.task],
                        ["Observation", f.observation],
                        ["Why it violates the heuristic", f.why],
                        ["User impact", f.impact],
                        ["Recommendation", f.recommendation],
                        ["Expected outcome", f.outcome],
                      ] as const).map(([k, v]) => (
                        <div key={k} className="min-w-0">
                          <dt className="label">{k}</dt>
                          <dd className="mt-1 leading-relaxed text-ink">
                            <Rich text={v} ctx={ctx} />
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <div className="grid gap-6 md:grid-cols-2">
                      <MockScreen mock={f.before} verdict="before" />
                      <MockScreen mock={f.after} verdict="after" />
                    </div>
                  </div>
                </details>
              ))}
            </div>
            <RichParagraphs items={g.caseStudy.summary} ctx={ctx} />
          </DocSection>

          {/* Report */}
          <DocSection id="report" kicker="Part 10 · Reporting" title="Writing the evaluation report">
            <p className="max-w-read text-sm text-ink-2">A finding is only useful if someone else can understand, reproduce and act on it. Record these fields for each one.</p>
            <DefinitionTable head={["Field", "What to record"]} rows={g.reportFields.map((f) => [f.field, f.description])} />
            <div className="flex flex-wrap items-center gap-3 rounded-md border border-rule bg-soft p-4">
              <p className="min-w-0 flex-1 text-sm text-ink">Practise with the Heuristic Evaluation Report lab: add findings, see them prioritised, load this case study as a worked example, and export Markdown or CSV.</p>
              <Link href="/labs/heuristic-report-lab" className="btn btn-primary btn-sm">
                Open the report lab
              </Link>
            </div>
          </DocSection>

          {/* Advanced */}
          <DocSection id="advanced" kicker="Part 11 · Beyond the basics" title="Advanced topics">
            <div className="space-y-3">
              {g.advanced.map((a) => (
                <details key={a.title} className="rounded-md border border-rule bg-surface">
                  <summary className="tap cursor-pointer px-4 py-3 font-semibold text-ink">{a.title}</summary>
                  <RichParagraphs items={a.body} ctx={ctx} className="border-t border-rule px-4 py-3 text-sm" />
                </details>
              ))}
            </div>
          </DocSection>

          {/* Mistakes */}
          <DocSection id="mistakes" kicker="Pitfalls" title="Common mistakes when using the heuristics">
            <div className="space-y-3">
              {g.mistakes.map((m) => (
                <Callout landmark={false} key={m.mistake} role="misconception">
                  <p className="text-sm font-semibold text-ink">{m.mistake}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-2">
                    <Rich text={m.correction} ctx={ctx} />
                  </p>
                </Callout>
              ))}
            </div>
          </DocSection>

          {/* Practice */}
          <DocSection id="practice" kicker="Practice" title="Practice exercises">
            <p className="max-w-read text-sm text-ink-2">The applied exercise from each chapter, collected in one place. Work through them in order, or pick the heuristics you find hardest.</p>
            <div className="space-y-3">
              {exercises.map(({ n, ex }) => (
                <details key={ex.id} className="rounded-md border border-rule bg-surface">
                  <summary className="tap cursor-pointer px-4 py-3 text-sm">
                    <span className="label mr-2">H{n}</span>
                    <span className="font-semibold text-ink">{ex.title}</span>
                  </summary>
                  <div className="border-t border-rule p-3">
                    <ExerciseBlock ex={ex} ctx={ctx} />
                  </div>
                </details>
              ))}
            </div>
          </DocSection>

          {/* Assessment */}
          <DocSection id="assessment" kicker="Assessment" title="Final assessment">
            <p className="max-w-read text-sm text-ink-2">
              <Rich text={g.assessment.intro} ctx={ctx} />
            </p>
            <Quiz questions={assessment} links={linkMapFor(assessment)} showSource />
          </DocSection>

          {/* Sources */}
          <DocSection id="sources" kicker="Evidence" title="Sources">
            <p className="max-w-read text-sm text-ink-2">Sources the guide itself cites. Each heuristic&rsquo;s full entry lists the further sources behind its analogy, practice rules and examples.</p>
            <ReferenceList references={references} sources={sourceById} verification={verification} />
          </DocSection>
        </DocLayout>
      </Container>
    </>
  );
}
