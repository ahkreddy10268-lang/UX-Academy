import type { Metadata } from "next";
import { Dashboard, type EntryMeta } from "@/components/me/dashboard";
import { Container, PageHeader } from "@/components/ui/layout";
import { allQuestions, entries, learningPaths, taxonomyBySlug } from "@/lib/content";

export const metadata: Metadata = { title: "My learning" };

export default function MePage() {
  const meta: Record<string, EntryMeta> = {};
  for (const e of entries) meta[e.slug] = { title: e.title, prerequisites: e.prerequisites, domain: e.domain, summary: e.summary };
  for (const [slug, t] of taxonomyBySlug) if (!meta[slug]) meta[slug] = { title: t.title, prerequisites: [], domain: t.domain, planned: true };
  const paths = learningPaths.map((p) => ({ id: p.id, title: p.title, steps: p.stages.flatMap((s) => s.steps).filter((s) => !meta[s]?.planned) }));
  const questionEntry = Object.fromEntries(allQuestions.map((q) => [q.id, q.entry]));
  return (
    <>
      <PageHeader
        eyebrow="My learning"
        title="Your academy"
        lede="Progress, notes, saved work and what to study next. Everything here lives only in this browser. Export it to keep a copy or to move it to another device."
      />
      <Container className="pt-10">
        <Dashboard meta={meta} paths={paths} questionEntry={questionEntry} />
      </Container>
    </>
  );
}
