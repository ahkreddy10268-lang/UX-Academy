import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LabView } from "@/components/labs/lab";
import { Bullets, Container, PageHeader } from "@/components/ui/layout";
import { labById, labs } from "@/lib/content";
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
  return (
    <>
      <PageHeader eyebrow={lab.kind === "experiment" ? "Experiment" : lab.kind === "tool" ? "Tool" : "Simulation"} title={lab.title} lede={lab.summary} crumbs={[{ href: "/labs", label: "Labs" }, { label: lab.title }]} />
      <Container className="pt-10">
        <LabView id={lab.id} />
        <div className="mt-14 grid gap-10 border-t border-rule pt-8 md:grid-cols-2">
          <div>
            <p className="label">Assumptions behind this lab</p>
            <Bullets className="mt-3 text-sm text-ink-2" items={lab.assumptions} />
          </div>
          <div>
            <p className="label">Learn the concepts</p>
            <ul className="mt-3 space-y-1.5 text-sm">
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
        </div>
      </Container>
    </>
  );
}
