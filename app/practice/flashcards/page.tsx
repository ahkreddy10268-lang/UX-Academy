import type { Metadata } from "next";
import { FlashcardReview } from "@/components/practice/flashcards";
import { Container, PageHeader } from "@/components/ui/layout";
import { allFlashcards } from "@/lib/content";

export const metadata: Metadata = { title: "Flashcards" };

export default function FlashcardsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Practice · Flashcards"
        title="Spaced review"
        crumbs={[{ href: "/practice", label: "Practice" }, { label: "Flashcards" }]}
        lede="Try to recall the answer before you reveal it — the effort of retrieval is what strengthens memory. Remembered cards wait 1, 3, 7, 14 then 30 days; forgotten cards return tomorrow."
      />
      <Container className="max-w-[52rem] pt-10">
        <FlashcardReview cards={allFlashcards.map((c) => ({ id: c.id, front: c.front, back: c.back, entry: c.entry, entryTitle: c.entryTitle }))} />
      </Container>
    </>
  );
}
