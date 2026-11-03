import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/ui/layout";
import { Rich } from "@/components/ui/rich";
import { comparisons } from "@/lib/content";
import { richContext } from "@/lib/content/context";

export const metadata: Metadata = { title: "Comparisons" };

export default function ComparePage() {
  const ctx = richContext();
  return (
    <>
      <PageHeader eyebrow="Comparisons" title="Concepts that are easily confused" lede="Side by side, dimension by dimension — with guidance on when to choose each, and how they work together." />
      <Container className="pt-6">
        <ul className="divide-y divide-rule">
          {comparisons.map((c) => (
            <li key={c.id} className="py-6">
              <h2>
                <Link href={`/compare/${c.id}`} className="display text-xl hover:text-accent-ink">
                  {c.a.label} <span className="text-ink-3">vs</span> {c.b.label}
                </Link>
              </h2>
              <p className="mt-1 line-clamp-2 max-w-read text-ink-2">
                <Rich text={c.summary} ctx={ctx} />
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
