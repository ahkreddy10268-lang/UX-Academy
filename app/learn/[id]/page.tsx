import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PathProgress, StepState } from "@/components/learn/path-progress";
import { Bullets, Container, PageHeader } from "@/components/ui/layout";
import { EvidenceMark } from "@/components/ui/marks";
import { entryBySlug, labById, learningPaths, taxonomyBySlug, workshops } from "@/lib/content";
import { DIFFICULTY_LABEL, LEVEL_PURPOSE, TYPE_LABEL } from "@/lib/content/labels";

export function generateStaticParams() {
  return learningPaths.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps<"/learn/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: learningPaths.find((p) => p.id === id)?.title ?? "Learning path" };
}

export default async function PathPage({ params }: PageProps<"/learn/[id]">) {
  const { id } = await params;
  const p = learningPaths.find((x) => x.id === id);
  if (!p) notFound();
  const written = p.stages.flatMap((s) => s.steps).filter((s) => entryBySlug.has(s));

  return (
    <>
      <PageHeader eyebrow="Learning path" title={p.title} lede={p.summary} crumbs={[{ href: "/learn", label: "Learn" }, { label: p.title }]}>
        <div className="mt-6 max-w-sm">
          <PathProgress steps={written} />
        </div>
      </PageHeader>
      <Container className="lg:grid lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
        <div className="min-w-0 pt-10">
          {p.stages.map((s, si) => (
            <section key={s.title} aria-labelledby={`stage-${si}`} className="mb-14">
              <p className="label">
                Stage {si + 1} · {DIFFICULTY_LABEL[s.level]} — {LEVEL_PURPOSE[s.level]}
              </p>
              <h2 id={`stage-${si}`} className="display mt-1 text-2xl">
                {s.title}
              </h2>
              <p className="mt-1 text-ink-2">{s.description}</p>
              <ol className="mt-5 divide-y divide-rule border-y border-rule">
                {s.steps.map((slug, i) => {
                  const e = entryBySlug.get(slug);
                  const t = taxonomyBySlug.get(slug);
                  return (
                    <li key={slug} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-2 py-4 sm:grid-cols-[2rem_minmax(0,1fr)_10rem]">
                      <span className="formula pt-0.5 text-sm text-ink-3">{i + 1}</span>
                      <div>
                        <Link href={`/library/${slug}`} className={e ? "font-medium text-ink hover:text-accent-ink" : "text-ink-2 underline decoration-dotted underline-offset-4"}>
                          {e?.title ?? t?.title}
                        </Link>
                        <span className="ml-2 text-xs text-ink-3">{TYPE_LABEL[e?.primaryType ?? t!.type]}</span>
                        {e ? <p className="mt-1 text-sm text-ink-2">{e.summary}</p> : <p className="mt-1 text-sm text-ink-3">Planned topic — not yet written. Skip or read around it.</p>}
                        {e && (
                          <div className="mt-2">
                            <EvidenceMark evidence={e.evidence} />
                          </div>
                        )}
                      </div>
                      <div className="col-start-2 sm:col-start-auto sm:text-right">{e && <StepState slug={slug} />}</div>
                    </li>
                  );
                })}
              </ol>
              {s.practice.length > 0 && (
                <p className="mt-4 text-sm">
                  <span className="label mr-2">Practise</span>
                  {s.practice.map((pr, i) => {
                    const lab = labById.get(pr);
                    const ws = workshops.find((w) => w.id === pr);
                    return (
                      <span key={pr}>
                        {i > 0 && " · "}
                        <Link className="link" href={lab ? `/labs/${pr}` : `/practice/workshops/${pr}`}>
                          {lab?.title ?? ws?.title}
                        </Link>
                      </span>
                    );
                  })}
                </p>
              )}
            </section>
          ))}
        </div>
        <aside className="pt-10">
          <div className="lg:sticky lg:top-24">
            <p className="label">For</p>
            <p className="mt-1 text-sm text-ink-2">{p.audience}</p>
            <p className="label mt-6">Objectives</p>
            <Bullets className="mt-2 text-sm text-ink-2" items={p.objectives} />
            <p className="label mt-6">Prerequisites</p>
            <p className="mt-1 text-sm text-ink-2">{p.prerequisites.join("; ")}</p>
            <p className="label mt-6">Complete when</p>
            <Bullets className="mt-2 text-sm text-ink-2" items={p.completion} />
          </div>
        </aside>
      </Container>
    </>
  );
}
