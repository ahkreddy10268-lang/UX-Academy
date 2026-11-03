import Link from "next/link";
import { citationLine } from "@/components/entry/references";
import { LearningPanel } from "@/components/home/learning-panel";
import { ConceptIllustration } from "@/components/illustrations/concept-illustration";
import { HomeHeroArt } from "@/components/illustrations/home-hero-art";
import { CategoryTile, KnowledgeCard } from "@/components/knowledge/knowledge-card";
import { PathCard } from "@/components/learn/path-card";
import { HeroSearch } from "@/components/search/hero-search";
import { Icon } from "@/components/shell/icons";
import { Container } from "@/components/ui/layout";
import { EvidenceMark } from "@/components/ui/marks";
import { domainById, entries, entryBySlug, graphEdges, labs, learningPaths, libraryFormulas, sourceById, sources, verification } from "@/lib/content";
import { cardFor } from "@/lib/content/cards";
import { catClass } from "@/lib/content/categories";
import { domainCoverage } from "@/lib/content/coverage";
import { EVIDENCE_LABEL, EVIDENCE_ORDER, TYPE_LABEL } from "@/lib/content/labels";
import { pathStats } from "@/lib/content/learning";
import { richToPlain } from "@/lib/content/rich";

const DISCIPLINES = ["laws-effects", "psychology", "research", "interaction", "visual", "accessibility", "design-systems", "metrics", "frameworks", "product"];
const FEATURED_PATHS = ["ux-fundamentals", "cognitive-psychology", "ux-research", "accessibility"];
const LAB_PREVIEW = ["fitts-lab", "serial-position-lab", "contrast-lab"];
/** One concept per kind of evidence story: replicated law, misapplied finding, contested effect, practitioner heuristic. */
const EVIDENCE_EXAMPLES = ["fitts-law", "millers-law", "jakobs-law", "choice-overload"];
const STARTERS = ["usability", "mental-models", "cognitive-load-theory"];

function SectionHead({ id, kicker, title, href, linkLabel }: { id: string; kicker: string; title: string; href?: string; linkLabel?: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="label">{kicker}</p>
        <h2 id={id} className="t-section mt-1.5 text-[1.5rem] sm:text-[1.65rem]">
          {title}
        </h2>
      </div>
      {href && (
        <Link href={href} className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-ink hover:underline">
          {linkLabel} <Icon name="arrow-right" size={16} />
        </Link>
      )}
    </div>
  );
}

export default function Home() {
  const cov = new Map(domainCoverage().map((c) => [c.id, c]));
  const published = entries.filter((e) => e.status === "published");
  const verified = sources.filter((s) => verification[s.id]?.status === "doi-verified").length;
  const fitts = entryBySlug.get("fitts-law")!;
  const titles = Object.fromEntries(entries.map((e) => [e.slug, e.title]));
  const panelPaths = learningPaths.map((p) => ({ id: p.id, title: p.title, steps: p.stages.flatMap((s) => s.steps).filter((s) => entryBySlug.has(s)) }));
  const stats = [
    { n: published.length, label: "researched concepts" },
    { n: libraryFormulas.length, label: "formulas" },
    { n: labs.length, label: "interactive labs" },
    { n: verified, label: "DOIs verified" },
  ];

  return (
    <div className="space-y-12 pb-12 sm:space-y-16">
      {/* ---------------- Hero ---------------- */}
      <Container className="pt-4 sm:pt-6">
        <section aria-labelledby="hero" className="bg-hero relative overflow-hidden rounded-2xl">
          <div className="grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12 lg:p-12">
            <div className="rise-in min-w-0">
              <p className="label !text-ink-2">A personal academy for the design discipline</p>
              <h1 id="hero" className="t-hero mt-4 text-[2.4rem] sm:text-[3.2rem] lg:text-[3.6rem]">
                Understand the principles behind <span className="t-editorial italic text-accent-ink">better experiences.</span>
              </h1>
              <p className="t-lede mt-5 max-w-[34rem] text-base sm:text-lg">
                Concepts from psychology, research, interaction and visual design — explained at three depths, drawn as diagrams you can
                manipulate, and labelled by the strength of their evidence.
              </p>
              <div className="mt-7 max-w-xl">
                <HeroSearch placeholder="Search concepts, formulas, methods…" />
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/library" className="inline-flex h-11 items-center gap-2 rounded-sm bg-accent px-5 font-medium text-surface shadow-card hover:bg-accent-ink">
                  Browse the library <Icon name="arrow-right" size={18} />
                </Link>
                <Link href="/learn" className="inline-flex h-11 items-center rounded-sm border border-rule-strong bg-surface px-5 font-medium text-ink hover:border-ink-3">
                  Start a learning path
                </Link>
              </div>
            </div>
            <figure className="rise-in min-w-0">
              <div className="overflow-hidden rounded-xl border border-rule bg-surface shadow-raise">
                <HomeHeroArt />
              </div>
              <figcaption className="t-caption mt-3 !text-ink-2">Fig. 1 — Four disciplines feed one practice. {graphEdges.length} connections between concepts are explained, not just drawn.</figcaption>
            </figure>
          </div>
          <dl className="grid grid-cols-2 border-t border-ink/10 bg-surface/55 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="px-6 py-4 sm:px-10 lg:px-12">
                <dt className="text-xs text-ink-2">{s.label}</dt>
                <dd className="t-page tabular mt-0.5 text-2xl">{s.n}</dd>
              </div>
            ))}
          </dl>
        </section>
      </Container>

      {/* ---------------- Continue learning (local data only) ---------------- */}
      <Container>
        <LearningPanel titles={titles} paths={panelPaths} starters={STARTERS} />
      </Container>

      {/* ---------------- Subjects ---------------- */}
      <Container>
        <section aria-labelledby="subjects">
          <SectionHead id="subjects" kicker="Explore by subject" title="Ten disciplines, each with its own field of colour" href="/topics" linkLabel={`All ${domainById.size} subjects`} />
          <p className="mt-2 max-w-2xl text-sm text-ink-2">Colour tells you where you are in the discipline. It never tells you how true something is — that is the evidence mark’s job.</p>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-5">
            {DISCIPLINES.map((id) => {
              const d = domainById.get(id)!;
              const c = cov.get(id)!;
              return (
                <li key={id}>
                  <CategoryTile id={id} title={d.title} description={d.description} published={c.published} total={c.total} plate={<ConceptIllustration slug={id} title={d.title} domain={id} decorative />} />
                </li>
              );
            })}
          </ul>
        </section>
      </Container>

      {/* ---------------- Featured concept ---------------- */}
      <Container>
        <section aria-labelledby="featured" className={`${catClass(fitts.domain)} bg-feature grid items-center gap-8 rounded-2xl border border-rule p-5 sm:p-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12`}>
          <figure className="overflow-hidden rounded-xl border border-rule bg-surface shadow-card">
            <ConceptIllustration slug="fitts-law" title={fitts.title} domain={fitts.domain} variant="hero" />
          </figure>
          <div className="min-w-0">
            <p className="label !text-c-ink">Featured concept · {TYPE_LABEL[fitts.primaryType]}</p>
            <h2 id="featured" className="t-editorial mt-3 text-[2.2rem] sm:text-[2.6rem]">
              {fitts.title}
            </h2>
            <p className="t-lede mt-3 text-base sm:text-lg">{richToPlain(fitts.summary)}</p>
            <blockquote className="mt-5 rounded-lg bg-surface/80 p-4">
              <p className="t-quote text-lg text-ink">Halving the distance to a target and doubling its width are mathematically identical.</p>
              <footer className="t-caption mt-2">Only the ratio D/W enters the law — the source of most good target-sizing decisions.</footer>
            </blockquote>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link href="/library/fitts-law" className="inline-flex h-11 items-center gap-2 rounded-sm bg-accent px-5 font-medium text-surface hover:bg-accent-ink">
                Read the concept <Icon name="arrow-right" size={18} />
              </Link>
              <Link href="/labs/fitts-lab" className="link text-sm">
                Measure your own pointing
              </Link>
              <EvidenceMark evidence={fitts.evidence} />
            </div>
          </div>
        </section>
      </Container>

      {/* ---------------- Learning journeys ---------------- */}
      <Container>
        <section aria-labelledby="paths">
          <SectionHead id="paths" kicker="Learning journeys" title="From understanding to evaluation, in levels" href="/learn" linkLabel={`All ${learningPaths.length} paths`} />
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {FEATURED_PATHS.map((id) => {
              const p = learningPaths.find((x) => x.id === id)!;
              const s = pathStats(p);
              const first = s.firstPublished!;
              return (
                <li key={id}>
                  <PathCard
                    path={p}
                    stats={s}
                    domain={first.domain}
                    writtenSteps={p.stages.flatMap((st) => st.steps).filter((st) => entryBySlug.has(st))}
                    plate={<ConceptIllustration slug={first.slug} title={first.title} domain={first.domain} decorative />}
                  />
                </li>
              );
            })}
          </ul>
        </section>
      </Container>

      {/* ---------------- Evidence as a research feature ---------------- */}
      <Container>
        <section aria-labelledby="ledger" className="rounded-2xl border border-rule bg-soft p-5 sm:p-8">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-end">
            <div>
              <p className="label">The evidence ledger</p>
              <h2 id="ledger" className="t-editorial mt-2 text-[2rem] sm:text-[2.4rem]">
                Not every “law of UX” is a law.
              </h2>
            </div>
            <p className="text-ink-2">
              Every concept is classified by the kind of evidence behind it, cites its primary sources, and states where it stops working. Four
              examples, read from the most replicated to the most contested:
            </p>
          </div>
          <ul className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {EVIDENCE_EXAMPLES.map((slug) => {
              const e = entryBySlug.get(slug)!;
              const primary = e.references.find((r) => r.role === "primary");
              const src = primary ? sourceById.get(primary.source) : undefined;
              return (
                <li key={slug} className={`${catClass(e.domain)} card relative flex flex-col p-5`}>
                  <EvidenceMark evidence={e.evidence} />
                  <h3 className="t-sub mt-3 text-lg">
                    <Link href={`/library/${slug}#evidence`} className="after:absolute after:inset-0 after:rounded-[inherit] hover:text-accent-ink">
                      {e.title}
                    </Link>
                  </h3>
                  <dl className="mt-3 space-y-3 text-sm">
                    {src && (
                      <div>
                        <dt className="label">Primary reference</dt>
                        <dd className="mt-1 text-ink-2">
                          {citationLine(src)}
                          {(src.container ?? src.publisher) && <span className="text-ink-3"> · {src.container ?? src.publisher}</span>}
                        </dd>
                      </div>
                    )}
                    <div>
                      <dt className="label">Limitation</dt>
                      <dd className="mt-1 line-clamp-4 text-ink-2">{richToPlain(e.limitations[0])}</dd>
                    </div>
                  </dl>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-rule pt-5 text-sm">
            <p className="label">Concepts per class</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {EVIDENCE_ORDER.map((ev) => (
                <li key={ev}>
                  <Link href={`/library?evidence=${ev}`} className="inline-flex items-center gap-2 text-ink-2 hover:text-ink">
                    <EvidenceMark evidence={ev} showLabel={false} />
                    {EVIDENCE_LABEL[ev]} <span className="tabular font-semibold text-ink">{published.filter((p) => p.evidence === ev).length}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/method" className="link ml-auto">
              How evidence is classified
            </Link>
          </div>
        </section>
      </Container>

      {/* ---------------- Labs ---------------- */}
      <Container>
        <section aria-labelledby="labs">
          <SectionHead id="labs" kicker="Learn by doing" title="Measure yourself, move the variables" href="/labs" linkLabel={`All ${labs.length} labs`} />
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {LAB_PREVIEW.map((id) => {
              const l = labs.find((x) => x.id === id)!;
              const concept = entryBySlug.get(l.concepts[0])!;
              return (
                <li key={id}>
                  <article className={`${catClass(concept.domain)} card group relative flex h-full overflow-hidden`}>
                    <div className="flex w-2/5 shrink-0 items-center border-r border-rule bg-c-wash">
                      <ConceptIllustration slug={concept.slug} title={concept.title} domain={concept.domain} decorative />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col p-4">
                      <p className="label">{l.kind === "experiment" ? "Experiment" : l.kind === "tool" ? "Tool" : "Simulation"}</p>
                      <h3 className="t-sub mt-1 text-base group-hover:text-accent-ink">
                        <Link href={`/labs/${l.id}`} className="after:absolute after:inset-0">
                          {l.title}
                        </Link>
                      </h3>
                      <p className="mt-1 line-clamp-3 text-sm text-ink-2">{l.summary}</p>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </section>
      </Container>

      {/* ---------------- Recommendations ---------------- */}
      <Container>
        <section aria-labelledby="start">
          <SectionHead id="start" kicker="Recommended first" title="Three ideas everything else builds on" href="/library" linkLabel="Open the library" />
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {STARTERS.map((slug) => {
              const e = entryBySlug.get(slug)!;
              return (
                <li key={slug}>
                  <KnowledgeCard d={cardFor(e)} variant="standard" plate={<ConceptIllustration slug={slug} title={e.title} domain={e.domain} decorative />} />
                </li>
              );
            })}
          </ul>
        </section>
      </Container>
    </div>
  );
}
