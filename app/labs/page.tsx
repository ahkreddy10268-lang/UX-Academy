import type { Metadata } from "next";
import Link from "next/link";
import { ConceptIllustration } from "@/components/illustrations/concept-illustration";
import { Container, PageHeader } from "@/components/ui/layout";
import { entryBySlug, labs, taxonomyBySlug, titleFor } from "@/lib/content";
import { catClass } from "@/lib/content/categories";

export const metadata: Metadata = { title: "Labs" };

const KINDS = [
  { kind: "experiment", title: "Experiments", lede: "Measure your own performance and fit the model to your data." },
  { kind: "simulation", title: "Simulations", lede: "Move the variables and watch the principle respond. Nothing is measured." },
  { kind: "tool", title: "Tools", lede: "Check real work against standards and scales." },
] as const;

export default function LabsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Labs"
        title="See the principles behave"
        lede="Experiments that measure you, simulations you manipulate, and tools you will use in practice. Each lab says which it is and states the assumptions behind it."
      />
      <Container className="space-y-12 pb-12 pt-6">
        {KINDS.map((k) => (
          <section key={k.kind} aria-labelledby={`k-${k.kind}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-rule pb-3">
              <h2 id={`k-${k.kind}`} className="t-section text-xl">
                {k.title}
              </h2>
              <p className="text-sm text-ink-3">{k.lede}</p>
            </div>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {labs
                .filter((l) => l.kind === k.kind)
                .map((l) => {
                  const c = entryBySlug.get(l.concepts[0]);
                  const domain = c?.domain ?? taxonomyBySlug.get(l.concepts[0])?.domain ?? "visual";
                  return (
                    <li key={l.id}>
                      <article className={`${catClass(domain)} card group relative flex h-full flex-col overflow-hidden`}>
                        <div className="border-b border-rule">
                          <ConceptIllustration slug={c?.slug ?? domain} title={l.title} domain={domain} decorative />
                        </div>
                        <div className="flex flex-1 flex-col p-4">
                          <p className="label">{k.kind === "experiment" ? "Experiment · measures you" : k.kind === "tool" ? "Tool" : "Simulation"}</p>
                          <h3 className="t-sub mt-1.5 text-lg group-hover:text-accent-ink">
                            <Link href={`/labs/${l.id}`} className="after:absolute after:inset-0">
                              {l.title}
                            </Link>
                          </h3>
                          <p className="mt-1 text-sm text-ink-2">{l.summary}</p>
                          <p className="mt-auto pt-3 text-xs text-ink-3">Concepts: {l.concepts.map((x) => titleFor(x) ?? x).join(", ")}</p>
                        </div>
                      </article>
                    </li>
                  );
                })}
            </ul>
          </section>
        ))}
      </Container>
    </>
  );
}
