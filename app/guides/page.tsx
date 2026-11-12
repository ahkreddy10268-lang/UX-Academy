import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/ui/layout";
import { entryBySlug, guides } from "@/lib/content";

export const metadata: Metadata = {
  title: "Guides",
  description: "Long-form learning experiences that teach a framework end to end — a problem story, the ideas, worked examples, a method, a case study and an assessment — built from the library's published entries.",
};

export default function GuidesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Guides"
        title="Guides"
        lede="Long-form learning experiences that teach a framework end to end: a problem story, the ideas one by one, interactive examples, a method, a case study and an assessment. Each guide is built from the library's published entries, so it never contradicts them."
        crumbs={[{ href: "/", label: "Home" }, { label: "Guides" }]}
      />
      <Container className="pb-14 pt-8">
        <ul className="grid gap-4 md:grid-cols-2">
          {guides.map((g) => (
            <li key={g.id} className="min-w-0">
              <Link href={`/guides/${g.id}`} className="card block h-full p-5">
                <span className="label">{g.hero.eyebrow}</span>
                <span className="t-sub mt-1 block text-ink">{g.title}</span>
                <span className="mt-2 block text-sm text-ink-2">{g.hero.lede}</span>
                <span className="mt-3 block text-sm text-ink-3">
                  {g.heuristics.length} chapters · {g.caseStudy.findings.length}-finding case study · based on {entryBySlug.get(g.entry)?.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
