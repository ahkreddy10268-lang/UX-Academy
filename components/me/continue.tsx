"use client";

import Link from "next/link";
import { Container } from "@/components/ui/layout";
import { isDue, useLearner } from "@/lib/store/store";

/** Shown on the home page only once the learner has some history. */
export function ContinueLearning({ titles }: { titles: Record<string, string> }) {
  const history = useLearner((s) => s.history);
  const due = useLearner((s) => Object.values(s.cards).filter(isDue).length);
  if (!history.length && !due) return null;
  const last = history[0];
  return (
    <section aria-label="Continue learning" className="border-b border-rule bg-sunken">
      <Container className="flex flex-wrap items-center justify-between gap-4 py-5 text-sm">
        {last && (
          <p>
            <span className="label mr-3">Continue</span>
            <Link className="link font-medium" href={`/library/${last.slug}`}>
              {titles[last.slug] ?? last.slug.replace(/-/g, " ")}
            </Link>
          </p>
        )}
        <p className="flex gap-6">
          {due > 0 && (
            <Link className="link" href="/practice/flashcards">
              {due} flashcards due
            </Link>
          )}
          <Link className="link" href="/me">
            My learning →
          </Link>
        </p>
      </Container>
    </section>
  );
}
