import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/ui/layout";
import { EvidenceMark } from "@/components/ui/marks";
import { aiMoments, aiPatterns, aiPatternsFor } from "@/lib/content";

export const metadata: Metadata = {
  title: "AI UX patterns",
  description: "Interaction patterns for AI and agentic products, organised by the seven moments of an AI interaction, with live demonstrations and the published guidance each rests on.",
};

export default function AiLibraryPage() {
  const demos = aiPatterns.filter((p) => p.demo).length;
  return (
    <>
      <PageHeader
        eyebrow="AI UX & agentic experience"
        title="AI UX patterns"
        lede="How people discover, instruct, wait for, read, refine, trust and delegate to AI systems, and the interface patterns that support each moment. Every pattern explains the problem it solves, how it works, when not to use it and the published guidance it rests on."
        crumbs={[{ href: "/", label: "Home" }, { label: "AI UX patterns" }]}
      >
        <dl className="mt-5 flex flex-wrap gap-2 text-sm text-ink-2 [&>div]:flex [&>div]:items-baseline [&>div]:gap-2 [&>div]:rounded-xs [&>div]:border [&>div]:border-rule [&>div]:bg-soft [&>div]:px-3 [&>div]:py-1">
          <div>
            <dt>Moments</dt>
            <dd className="t-sub tabular text-ink">{aiMoments.length}</dd>
          </div>
          <div>
            <dt>Patterns</dt>
            <dd className="t-sub tabular text-ink">{aiPatterns.length}</dd>
          </div>
          <div>
            <dt>With a live demo</dt>
            <dd className="t-sub tabular text-ink">{demos}</dd>
          </div>
        </dl>
      </PageHeader>

      <Container className="space-y-14 pb-14 pt-8">
        {/* The sequence */}
        <section aria-labelledby="moments">
          <p className="label">A learning sequence</p>
          <h2 id="moments" className="t-section mt-2 text-[1.5rem]">
            Seven moments in every AI interaction
          </h2>
          <p className="mt-2 max-w-read text-ink-2">
            Read the moments in order to learn the field, or jump to the one your product struggles with. The organisation into seven moments is borrowed, with credit, from{" "}
            <a className="link" href="https://axpatterns.design/" rel="noopener">
              AX Patterns
            </a>
            ; the explanations and demos here are UX Academy&apos;s own.
          </p>
          <ol className="mt-6 grid gap-px overflow-hidden rounded-lg border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {aiMoments.map((m) => (
              <li key={m.id} className="bg-surface p-4">
                <a href={`#${m.id}`} className="group block">
                  <span className="font-mono text-xs text-ink-3">0{m.n}</span>
                  <span className="t-sub mt-1 block text-lg text-ink group-hover:underline group-hover:underline-offset-4">{m.title}</span>
                  <span className="mt-0.5 block text-sm text-ink-2">{m.question}</span>
                  <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">{aiPatternsFor(m.id).length} patterns</span>
                </a>
              </li>
            ))}
            <li className="bg-soft p-4">
              <p className="label">Grounded in</p>
              <p className="mt-1.5 text-sm text-ink-2">Microsoft HAX guidelines (Amershi et al., 2019), Apple&apos;s generative AI guidance, AWS Cloudscape, IBM Carbon for AI and Google PAIR. Each pattern names its sources and an evidence class.</p>
            </li>
          </ol>
        </section>

        {/* Moments with their patterns */}
        {aiMoments.map((m) => (
          <section key={m.id} id={m.id} aria-labelledby={`${m.id}-h`} className="scroll-mt-24 border-t border-rule pt-10">
            <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
              <div>
                <p className="label">Moment 0{m.n}</p>
                <h2 id={`${m.id}-h`} className="t-section mt-2 text-[1.75rem]">
                  {m.title}
                </h2>
                <p className="t-sub mt-1 text-ink-2">{m.question}</p>
                <p className="mt-3 text-sm text-ink-2">{m.summary}</p>
                <p className="mt-3 rounded-md border border-rule bg-soft px-3 py-2 text-sm text-ink-2">
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-ink">If it goes wrong · </span>
                  {m.risk}
                </p>
              </div>
              <ul className="grid content-start gap-3 sm:grid-cols-2">
                {aiPatternsFor(m.id).map((p) => (
                  <li key={p.id}>
                    <Link href={`/ai/${p.id}`} className="card flex h-full flex-col p-4">
                      <span className="t-sub text-base text-ink">{p.title}</span>
                      <span className="mt-1 line-clamp-3 text-sm text-ink-2">{p.summary}</span>
                      <span className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-3 text-xs">
                        <EvidenceMark evidence={p.evidence} />
                        {p.demo && <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-2">Live demo</span>}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </Container>
    </>
  );
}
