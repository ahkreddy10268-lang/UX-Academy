import Link from "next/link";
import { ConceptIllustration } from "@/components/illustrations/concept-illustration";
import { HomeHeroArt } from "@/components/illustrations/home-hero-art";
import { CategoryTile, KnowledgeCard } from "@/components/knowledge/knowledge-card";
import { PathCard } from "@/components/learn/path-card";
import { ContinueLearning } from "@/components/me/continue";
import { HeroSearch } from "@/components/search/hero-search";
import { Container } from "@/components/ui/layout";
import { EvidenceMark } from "@/components/ui/marks";
import { allQuestions, domainById, entries, entryBySlug, graphEdges, labs, learningPaths, sources, taxonomyItems, verification } from "@/lib/content";
import { cardFor } from "@/lib/content/cards";
import { catClass } from "@/lib/content/categories";
import { domainCoverage } from "@/lib/content/coverage";
import { EVIDENCE_DESCRIPTION, EVIDENCE_LABEL, EVIDENCE_ORDER, RELATION_LABEL, TYPE_LABEL } from "@/lib/content/labels";
import { pathStats } from "@/lib/content/learning";

const DISCIPLINES = ["laws-effects", "psychology", "research", "interaction", "visual", "accessibility", "design-systems", "metrics", "frameworks", "product"];
const FEATURED_PATHS = ["ux-fundamentals", "cognitive-psychology", "ux-research", "accessibility"];
const LAB_PREVIEW = ["fitts-lab", "serial-position-lab", "contrast-lab"];

export default function Home() {
  const cov = new Map(domainCoverage().map((c) => [c.id, c]));
  const published = entries.filter((e) => e.status === "published");
  const verified = sources.filter((s) => verification[s.id]?.status === "doi-verified").length;
  const fitts = entryBySlug.get("fitts-law")!;
  const connections = graphEdges
    .filter((g) => (g.type === "complementary-to" || g.type === "contrasts-with") && entryBySlug.has(g.from) && entryBySlug.has(g.to))
    .filter((g, i, all) => all.findIndex((x) => x.from === g.from) === i)
    .slice(0, 4);

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden border-b border-rule">
        <Container className="grid items-center gap-12 pb-16 pt-12 sm:pt-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16 lg:pb-20">
          <div className="rise-in">
            <p className="label">A personal academy for the design discipline</p>
            <h1 className="t-hero mt-5 text-[2.6rem] sm:text-[3.6rem] lg:text-[4.1rem]">
              Understand the principles behind <span className="italic text-accent">better experiences.</span>
            </h1>
            <p className="t-lede mt-6 max-w-[34rem] text-lg sm:text-xl">
              {published.length} concepts from psychology, research, interaction and visual design — explained at three depths, drawn as diagrams you can manipulate, and labelled
              by the strength of their evidence.
            </p>
            <div className="mt-8 max-w-xl">
              <HeroSearch placeholder="Search concepts, formulas, methods…" />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/library" className="inline-flex h-11 items-center rounded-sm bg-ink px-5 font-medium text-paper hover:bg-ink-2">
                Explore the library
              </Link>
              <Link href="/learn" className="inline-flex h-11 items-center rounded-sm border border-rule-strong px-5 font-medium text-ink hover:border-ink-3">
                Start a learning path
              </Link>
            </div>
          </div>
          <figure className="rise-in">
            <HomeHeroArt />
            <figcaption className="t-caption mt-3 flex justify-between gap-4">
              <span>Fig. 1 — Four disciplines, one practice.</span>
              <span className="formula">
                {graphEdges.length} explained connections · {verified} verified DOIs
              </span>
            </figcaption>
          </figure>
        </Container>
      </section>

      <ContinueLearning titles={Object.fromEntries(entries.map((e) => [e.slug, e.title]))} />

      {/* ---------------- Disciplines ---------------- */}
      <section aria-labelledby="disciplines" className="border-b border-rule">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <p className="label">Explore by discipline</p>
              <h2 id="disciplines" className="t-section mt-3 text-3xl sm:text-4xl">
                Twenty subjects, each with its own field of colour
              </h2>
            </div>
            <p className="text-ink-2 lg:pb-1">
              Colour tells you where you are in the discipline. It never tells you how true something is — that is what the evidence mark is for.{" "}
              <Link href="/topics" className="link whitespace-nowrap">
                All {domainById.size} subjects →
              </Link>
            </p>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
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
        </Container>
      </section>

      {/* ---------------- Featured concept ---------------- */}
      <section aria-labelledby="featured" className={`${catClass(fitts.domain)} border-b border-rule bg-c-wash`}>
        <Container className="grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
          <figure className="overflow-hidden rounded-sm border border-rule bg-surface">
            <ConceptIllustration slug="fitts-law" title={fitts.title} domain={fitts.domain} variant="hero" />
          </figure>
          <div>
            <p className="label !text-c-ink">Featured concept · {TYPE_LABEL[fitts.primaryType]}</p>
            <h2 id="featured" className="t-section mt-3 text-4xl">
              {fitts.title}
            </h2>
            <p className="t-lede mt-4 text-lg">{fitts.summary}</p>
            <blockquote className="mt-6 border-l-2 border-c pl-5 text-ink-2">
              <p className="font-serif text-lg italic">Halving the distance to a target and doubling its width are mathematically identical.</p>
              <footer className="t-caption mt-2">Because only the ratio D/W enters the law — the source of most good target-sizing decisions.</footer>
            </blockquote>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link href="/library/fitts-law" className="inline-flex h-11 items-center rounded-sm bg-ink px-5 font-medium text-paper hover:bg-ink-2">
                Read the entry
              </Link>
              <Link href="/labs/fitts-lab" className="link text-sm">
                Measure your own pointing →
              </Link>
              <EvidenceMark evidence={fitts.evidence} />
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------- Evidence ledger ---------------- */}
      <section aria-labelledby="ledger" className="border-b border-rule">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-end">
            <div>
              <p className="label">The evidence ledger</p>
              <h2 id="ledger" className="t-section mt-3 text-3xl sm:text-4xl">
                Not every “law of UX” is a law.
              </h2>
            </div>
            <p className="t-lede text-lg">
              Fitts&apos;s law has seventy years of replications. Miller&apos;s “magical number seven” is routinely misapplied to menus. Choice overload fails to replicate as often
              as it succeeds. Every entry in the academy is placed on this ledger — read across from the strongest evidence to the most contested.
            </p>
          </div>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-sm border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {EVIDENCE_ORDER.map((ev, i) => {
              const list = published.filter((e) => e.evidence === ev);
              return (
                <li key={ev} className="flex flex-col bg-paper p-5">
                  <p className="formula text-xs text-ink-3">{String(i + 1).padStart(2, "0")}</p>
                  <div className="mt-2">
                    <EvidenceMark evidence={ev} showLabel={false} />
                  </div>
                  <h3 className="t-sub mt-2 text-base">{EVIDENCE_LABEL[ev]}</h3>
                  <p className="mt-1 text-xs text-ink-3">{EVIDENCE_DESCRIPTION[ev]}</p>
                  {list.length ? (
                    <ul className="mt-4 space-y-1.5 border-t border-rule pt-3 text-sm">
                      {list.map((e) => (
                        <li key={e.slug} className={`${catClass(e.domain)} flex items-baseline gap-2`}>
                          <span aria-hidden className="h-1.5 w-1.5 shrink-0 translate-y-[-1px] rounded-full bg-c" />
                          <Link href={`/library/${e.slug}`} className="hover:text-accent-ink">
                            {e.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 border-t border-rule pt-3 text-sm text-ink-3">No published entry yet.</p>
                  )}
                </li>
              );
            })}
          </ol>
          <p className="mt-4 text-sm text-ink-3">
            <Link className="underline" href="/method">
              How evidence is classified
            </Link>{" "}
            · dots show each concept&apos;s subject colour, not its credibility.
          </p>
        </Container>
      </section>

      {/* ---------------- Learning paths ---------------- */}
      <section aria-labelledby="paths" className="border-b border-rule">
        <Container className="py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label">Learning paths</p>
              <h2 id="paths" className="t-section mt-3 text-3xl">
                From understanding to evaluation, in levels
              </h2>
            </div>
            <Link href="/learn" className="link text-sm">
              All {learningPaths.length} paths →
            </Link>
          </div>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_PATHS.map((id) => {
              const p = learningPaths.find((x) => x.id === id)!;
              const stats = pathStats(p);
              const first = stats.firstPublished!;
              return (
                <li key={id}>
                  <PathCard
                    path={p}
                    stats={stats}
                    domain={first.domain}
                    writtenSteps={p.stages.flatMap((s) => s.steps).filter((s) => entryBySlug.has(s))}
                    plate={<ConceptIllustration slug={first.slug} title={first.title} domain={first.domain} decorative />}
                  />
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ---------------- Interactive preview ---------------- */}
      <section aria-labelledby="labs" className="border-b border-rule bg-sunken/60">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)]">
            <div>
              <p className="label">Learn by doing</p>
              <h2 id="labs" className="t-section mt-3 text-3xl">
                Measure yourself
              </h2>
              <p className="mt-4 text-ink-2">Experiments fit a regression line to your own clicks and key presses. Simulations let you move the variables. Tools check your real work.</p>
              <Link href="/labs" className="link mt-4 inline-block text-sm">
                All {labs.length} labs →
              </Link>
            </div>
            <ul className="grid gap-5 sm:grid-cols-3">
              {LAB_PREVIEW.map((id) => {
                const l = labs.find((x) => x.id === id)!;
                const concept = entryBySlug.get(l.concepts[0])!;
                return (
                  <li key={id}>
                    <article className={`${catClass(concept.domain)} group relative flex h-full flex-col overflow-hidden rounded-sm border border-rule bg-surface lift hover:border-ink-3`}>
                      <div className="border-b border-rule">
                        <ConceptIllustration slug={concept.slug} title={concept.title} domain={concept.domain} decorative />
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <p className="label">{l.kind === "experiment" ? "Experiment · measures you" : l.kind === "tool" ? "Tool" : "Simulation"}</p>
                        <h3 className="t-section mt-1.5 text-lg group-hover:text-accent-ink">
                          <Link href={`/labs/${l.id}`} className="after:absolute after:inset-0">
                            {l.title}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-ink-2">{l.summary}</p>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </section>

      {/* ---------------- Connections ---------------- */}
      <section aria-labelledby="connections" className="border-b border-rule">
        <Container className="py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label">Connected knowledge</p>
              <h2 id="connections" className="t-section mt-3 text-3xl">
                Ideas that make more sense together
              </h2>
            </div>
            <Link href="/graph" className="link text-sm">
              Open the knowledge graph →
            </Link>
          </div>
          <ul className="mt-8 grid gap-5 lg:grid-cols-2">
            {connections.map((g) => {
              const a = entryBySlug.get(g.from)!;
              const b = entryBySlug.get(g.to)!;
              return (
                <li key={g.from + g.to} className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 rounded-sm border border-rule bg-surface p-4">
                  <Link href={`/library/${a.slug}`} className={`${catClass(a.domain)} group block`}>
                    <div className="overflow-hidden rounded-xs border border-rule">
                      <ConceptIllustration slug={a.slug} title={a.title} domain={a.domain} decorative />
                    </div>
                    <p className="t-sub mt-2 text-sm group-hover:text-accent-ink">{a.title}</p>
                  </Link>
                  <p className="label w-20 text-center">{RELATION_LABEL[g.type]}</p>
                  <Link href={`/library/${b.slug}`} className={`${catClass(b.domain)} group block`}>
                    <div className="overflow-hidden rounded-xs border border-rule">
                      <ConceptIllustration slug={b.slug} title={b.title} domain={b.domain} decorative />
                    </div>
                    <p className="t-sub mt-2 text-sm group-hover:text-accent-ink">{b.title}</p>
                  </Link>
                  <p className="col-span-3 border-t border-rule pt-3 text-sm text-ink-2">{g.note}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ---------------- Start here ---------------- */}
      <section aria-labelledby="start">
        <Container className="py-16 sm:py-20">
          <p className="label">Start here</p>
          <h2 id="start" className="t-section mt-3 text-3xl">
            Three ideas everything else builds on
          </h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {["usability", "mental-models", "cognitive-load-theory"].map((slug) => {
              const e = entryBySlug.get(slug)!;
              return (
                <li key={slug}>
                  <KnowledgeCard d={cardFor(e)} plate={<ConceptIllustration slug={slug} title={e.title} domain={e.domain} decorative />} />
                </li>
              );
            })}
          </ul>
          <p className="mt-8 text-sm text-ink-3">
            {published.length} published entries · {taxonomyItems.filter((t) => !t.entry).length} planned topics, labelled as such · {allQuestions.length} explained quiz questions · your notes and
            progress stay in this browser.
          </p>
        </Container>
      </section>
    </>
  );
}
