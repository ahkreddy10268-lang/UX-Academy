import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LabView } from "@/components/labs/lab";
import { Bullets, Container, PageHeader } from "@/components/ui/layout";
import { ConceptIllustration } from "@/components/illustrations/concept-illustration";
import { entryBySlug, labById, labs, taxonomyBySlug } from "@/lib/content";
import { catClass } from "@/lib/content/categories";
import { resolveSlug } from "@/lib/content/context";

export function generateStaticParams() {
  return labs.map((l) => ({ id: l.id }));
}

export async function generateMetadata({ params }: PageProps<"/labs/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: labById.get(id)?.title ?? "Lab" };
}

export default async function LabPage({ params }: PageProps<"/labs/[id]">) {
  const { id } = await params;
  const lab = labById.get(id);
  if (!lab) notFound();
  const c = entryBySlug.get(lab.concepts[0]);
  const domain = c?.domain ?? taxonomyBySlug.get(lab.concepts[0])?.domain ?? "visual";
  return (
    <>
      <PageHeader cat={catClass(domain)} eyebrow={lab.kind === "experiment" ? "Experiment · measures you" : lab.kind === "tool" ? "Tool" : "Simulation · illustrative, nothing is measured"} title={lab.title} lede={lab.summary} crumbs={[{ href: "/labs", label: "Labs" }, { label: lab.title }]} aside={<ConceptIllustration slug={c?.slug ?? domain} title={lab.title} domain={domain} variant="hero" decorative />} />
      <Container className={`${catClass(domain)} pb-12 pt-6`}>
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="min-w-0">
            <LabView id={lab.id} />
          </div>
          <aside aria-label="About this lab" className="space-y-5 text-sm xl:sticky xl:top-24 xl:self-start">
            <div className="rounded-lg border border-rule bg-soft p-4">
              <p className="label">What kind of lab</p>
              <p className="mt-1.5 text-ink">
                {lab.kind === "experiment"
                  ? "An experiment: every number comes from your own trials in this browser."
                  : lab.kind === "tool"
                    ? "A tool: it calculates from what you enter."
                    : "A simulation: it illustrates a model. Nothing about you is measured."}
              </p>
            </div>
            <div className="rounded-lg border border-rule bg-soft p-4">
              <p className="label">Assumptions</p>
              <Bullets className="mt-2 text-ink-2" items={lab.assumptions} />
            </div>
            <div className="rounded-lg border border-rule bg-soft p-4">
              <p className="label">Learn the concepts</p>
              <ul className="mt-2 space-y-1.5">
                {lab.concepts.map((c) => {
                  const info = resolveSlug(c);
                  return (
                    <li key={c}>
                      {info ? (
                        <Link className={info.planned ? "underline decoration-dotted" : "link"} href={info.href}>
                          {info.title}
                          {info.planned && " (planned)"}
                        </Link>
                      ) : (
                        c
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
