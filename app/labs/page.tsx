import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/ui/layout";
import { labs, titleFor } from "@/lib/content";

export const metadata: Metadata = { title: "Labs" };

const KIND = { experiment: "Experiment — measures you", simulation: "Simulation", tool: "Tool" } as const;

export default function LabsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Labs"
        title="See the principles behave"
        lede="Experiments that measure your own performance, simulations you can manipulate, and tools you will use in practice. Each lab states the assumptions behind it."
      />
      <Container className="pt-6">
        <ul className="divide-y divide-rule">
          {labs.map((l) => (
            <li key={l.id} className="grid gap-2 py-6 md:grid-cols-[minmax(0,1fr)_16rem] md:gap-10">
              <div>
                <p className="label">{KIND[l.kind]}</p>
                <h2 className="mt-1">
                  <Link href={`/labs/${l.id}`} className="display text-xl hover:text-accent-ink">
                    {l.title}
                  </Link>
                </h2>
                <p className="mt-1 max-w-read text-ink-2">{l.summary}</p>
              </div>
              <p className="text-sm text-ink-3 md:pt-6">Concepts: {l.concepts.map((c) => titleFor(c) ?? c).join(", ")}</p>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
