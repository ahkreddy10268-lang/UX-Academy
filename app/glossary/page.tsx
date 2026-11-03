import type { Metadata } from "next";
import { citationLine } from "@/components/entry/references";
import { GlossaryBrowser, type GlossaryItem } from "@/components/glossary/glossary-browser";
import { Container, PageHeader } from "@/components/ui/layout";
import { entryBySlug, glossary, sourceById } from "@/lib/content";
import { resolveSlug } from "@/lib/content/context";

export const metadata: Metadata = { title: "Glossary" };

export default function GlossaryPage() {
  const items: GlossaryItem[] = glossary.map((g) => ({
    term: g.term,
    slug: g.slug,
    definition: g.definition,
    see: g.seeAlso.map(resolveSlug).filter((x) => x !== undefined),
    source: g.source && sourceById.get(g.source) ? citationLine(sourceById.get(g.source)!) : undefined,
    hasEntry: g.seeAlso.some((s) => entryBySlug.has(s)),
  }));
  return (
    <>
      <PageHeader
        eyebrow="Glossary"
        title="The vocabulary of the discipline"
        lede={`${glossary.length} short definitions. Terms marked “entry” have a full knowledge entry with the explanation, evidence and practice.`}
      />
      <Container className="pt-4">
        <GlossaryBrowser items={items} />
      </Container>
    </>
  );
}
