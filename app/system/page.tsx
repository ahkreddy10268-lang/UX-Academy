import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/ui/layout";
import { systemDocs } from "@/lib/content";
import { SYSTEM_SECTIONS } from "@/lib/content/system";

export const metadata: Metadata = {
  title: "Design system",
  description: "UX Academy's own design system: foundations, components and patterns, documented with anatomy, states, usage, accessibility and live examples.",
};

const SECTION: Record<(typeof SYSTEM_SECTIONS)[number], { title: string; lede: string }> = {
  foundations: { title: "Foundations", lede: "The decisions everything else is built on: colour, type, space, shape, icons, illustration, motion and accessibility." },
  components: { title: "Components", lede: "Reusable interface parts, each with anatomy, variants, states, usage, accessibility and a live example." },
  patterns: { title: "Patterns", lede: "Reusable solutions to recurring problems in a learning product, built from the components." },
};

export default function SystemPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reference"
        title="UX Academy design system"
        lede="How this product is designed and built: the tokens, components and patterns every page uses, documented the way the Design System entry recommends, with live examples rendered from the real code."
        crumbs={[{ href: "/", label: "Home" }, { label: "Design system" }]}
      >
        <p className="mt-4 text-sm text-ink-2">
          New to the subject? Start with the concept itself:{" "}
          <Link className="link" href="/library/design-system">
            Design System
          </Link>{" "}
          and{" "}
          <Link className="link" href="/library/design-tokens">
            Design Tokens
          </Link>
          .
        </p>
      </PageHeader>
      <Container className="space-y-12 pb-14 pt-8">
        <section aria-labelledby="principles" className="grid gap-px overflow-hidden rounded-lg border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          <h2 id="principles" className="sr-only">
            Principles
          </h2>
          {[
            ["Explain, don't decorate", "Every visual element teaches, orients or confirms."],
            ["Ink on paper", "A near-monochrome interface; colour reserved for interaction, status and subject identity."],
            ["One component, one result", "Shared classes and components; no page-specific variants."],
            ["Accessible by default", "WCAG 2.2 AA as the floor, enforced by tests."],
          ].map(([t, d]) => (
            <div key={t} className="bg-surface p-4">
              <p className="t-sub text-ink">{t}</p>
              <p className="mt-1 text-sm text-ink-2">{d}</p>
            </div>
          ))}
        </section>
        {SYSTEM_SECTIONS.map((s) => (
          <section key={s} id={s} aria-labelledby={`${s}-h`} className="scroll-mt-24">
            <p className="label">{SECTION[s].title}</p>
            <h2 id={`${s}-h`} className="t-section mt-2 text-[1.5rem]">
              {SECTION[s].title}
            </h2>
            <p className="mt-1 max-w-read text-ink-2">{SECTION[s].lede}</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {systemDocs
                .filter((d) => d.section === s)
                .map((d) => (
                  <li key={d.id}>
                    <Link href={`/system/${s}/${d.id}`} className="card flex h-full flex-col p-4">
                      <span className="t-sub text-ink">{d.title}</span>
                      <span className="mt-1 line-clamp-3 text-sm text-ink-2">{d.summary}</span>
                      {d.example && <span className="mt-auto pt-3 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">Live example</span>}
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </Container>
    </>
  );
}
