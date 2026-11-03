import Link from "next/link";
import { ContinueLearning } from "@/components/me/continue";
import { Container } from "@/components/ui/layout";
import { EvidenceMark, TypeMark } from "@/components/ui/marks";
import { allQuestions, domains, entries, entryBySlug, graphEdges, labs, learningPaths, libraryFormulas, sources, verification } from "@/lib/content";
import { domainCoverage } from "@/lib/content/coverage";

const LEDGER = ["fitts-law", "hick-hyman-law", "millers-law", "jakobs-law", "doherty-threshold", "aesthetic-usability-effect", "choice-overload", "peak-end-rule"];
const START = ["usability", "mental-models", "affordances", "gestalt-principles", "cognitive-load-theory", "nielsen-usability-heuristics"];

export default function Home() {
  const cov = new Map(domainCoverage().map((c) => [c.id, c]));
  const verified = sources.filter((s) => verification[s.id]?.status === "doi-verified").length;
  return (
    <>
      <section className="border-b border-rule">
        <Container className="grid gap-12 pb-16 pt-14 sm:pt-20 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <p className="label">A personal academy for the design discipline</p>
            <h1 className="display mt-5 text-4xl leading-[1.05] sm:text-[3.6rem]">
              Study design the way <span className="italic text-accent">science</span> studies people.
            </h1>
            <p className="mt-6 max-w-read font-serif text-xl leading-relaxed text-ink-2 [font-variation-settings:'opsz'_24]">
              Theories, laws, methods and metrics — each explained at three depths, classified by what it actually is, labelled by the strength of its evidence, and connected to everything it
              depends on.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/learn" className="inline-flex h-11 items-center rounded-sm bg-ink px-5 font-medium text-paper hover:bg-ink-2">
                Start a learning path
              </Link>
              <Link href="/library" className="inline-flex h-11 items-center rounded-sm border border-rule-strong px-5 font-medium text-ink hover:border-ink-3">
                Browse the library
              </Link>
            </div>
          </div>
          <dl className="grid grid-cols-2 content-start gap-x-8 gap-y-8 border-t border-rule pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-2">
            {[
              [entries.length, "researched entries", "/library"],
              [graphEdges.length, "explained connections", "/graph"],
              [libraryFormulas.length, "tested calculators", "/formulas"],
              [labs.length, "interactive labs", "/labs"],
              [allQuestions.length, "explained quiz questions", "/practice"],
              [verified, "DOIs verified against Crossref", "/sources"],
            ].map(([n, label, href]) => (
              <div key={label as string} className="flex flex-col-reverse">
                <dt className="mt-1 text-sm text-ink-2">
                  <Link href={href as string} className="hover:text-accent-ink">
                    {label}
                  </Link>
                </dt>
                <dd className="formula text-3xl text-ink">{n}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <ContinueLearning titles={Object.fromEntries(entries.map((e) => [e.slug, e.title]))} />

      <section aria-labelledby="ledger" className="border-b border-rule">
        <Container className="py-16">
          <div className="grid gap-10 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="label">The evidence ledger</p>
              <h2 id="ledger" className="display mt-3 text-3xl">
                Not every “law of UX” is a law.
              </h2>
              <p className="mt-4 text-ink-2">
                Fitts&apos;s law has seventy years of replications. Miller&apos;s “magical number seven” is routinely misapplied to menus. Choice overload fails to replicate as often as it succeeds. The academy tells you which is which.
              </p>
              <Link href="/method" className="link mt-4 inline-block text-sm">
                How evidence is classified →
              </Link>
            </div>
            <ul className="divide-y divide-rule border-y border-rule">
              {LEDGER.map((slug) => {
                const e = entryBySlug.get(slug);
                if (!e) return null;
                return (
                  <li key={slug}>
                    <Link href={`/library/${slug}`} className="group grid gap-1 py-4 sm:grid-cols-[minmax(0,1fr)_15rem] sm:items-center sm:gap-6">
                      <div>
                        <TypeMark type={e.primaryType} />
                        <p className="display mt-0.5 text-lg group-hover:text-accent-ink">{e.title}</p>
                      </div>
                      <EvidenceMark evidence={e.evidence} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </section>

      <section aria-labelledby="start" className="border-b border-rule">
        <Container className="py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label">Start here</p>
              <h2 id="start" className="display mt-3 text-3xl">
                Six ideas everything else builds on
              </h2>
            </div>
            <Link href="/learn/ux-fundamentals" className="link text-sm">
              Follow the UX Fundamentals path →
            </Link>
          </div>
          <ol className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {START.map((slug, i) => {
              const e = entryBySlug.get(slug);
              if (!e) return null;
              return (
                <li key={slug} className="border-t border-rule py-5">
                  <Link href={`/library/${slug}`} className="group block">
                    <span className="formula text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <p className="display mt-1 text-xl group-hover:text-accent-ink">{e.title}</p>
                    <p className="mt-1 text-sm text-ink-2">{e.summary}</p>
                  </Link>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="subjects" className="border-b border-rule">
        <Container className="py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label">The map</p>
              <h2 id="subjects" className="display mt-3 text-3xl">
                Twenty subjects, from perception to service design
              </h2>
            </div>
            <Link href="/coverage" className="link text-sm">
              See what&apos;s written and what&apos;s planned →
            </Link>
          </div>
          <ul className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
            {domains.map((d) => {
              const c = cov.get(d.id)!;
              return (
                <li key={d.id} className="border-t border-rule py-3">
                  <Link href={`/topics/${d.id}`} className="flex items-baseline justify-between gap-3 hover:text-accent-ink">
                    <span className="font-medium">{d.title}</span>
                    <span className="formula shrink-0 text-xs text-ink-3">
                      {c.published}/{c.total}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="practise">
        <Container className="grid gap-12 py-16 lg:grid-cols-3">
          <div>
            <p className="label">Learn by doing</p>
            <h2 id="practise" className="display mt-3 text-3xl">
              Measure yourself
            </h2>
            <p className="mt-4 text-ink-2">Run Fitts&apos;s and Hick&apos;s experiments on your own hands, test your memory&apos;s serial position curve, and fit regression lines to your own data.</p>
          </div>
          <ul className="divide-y divide-rule border-y border-rule lg:col-span-2">
            {labs.slice(0, 6).map((l) => (
              <li key={l.id}>
                <Link href={`/labs/${l.id}`} className="group grid gap-1 py-4 sm:grid-cols-[16rem_minmax(0,1fr)] sm:gap-6">
                  <span className="font-medium group-hover:text-accent-ink">{l.title}</span>
                  <span className="text-sm text-ink-2">{l.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-sm text-ink-3 lg:col-span-3">
            {learningPaths.length} learning paths · Notes, bookmarks and progress stay in your browser — <Link className="underline" href="/me">export them any time</Link>.
          </p>
        </Container>
      </section>
    </>
  );
}
