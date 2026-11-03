import Link from "next/link";
import { PALETTE_LABEL, type Palette } from "@/lib/content/categories";
import { primaryNav, secondaryNav } from "./nav";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rule bg-paper">
      <div className="mx-auto grid max-w-page gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="max-w-sm">
          <p className="t-section text-xl">
            <span className="text-accent" aria-hidden>
              §{" "}
            </span>
            UX Academy
          </p>
          <p className="mt-3 text-sm text-ink-2">
            A personal academy for the design discipline. Content is written from primary research where it exists, labelled by
            evidence, and linked to its sources. Your notes and progress stay in this browser.
          </p>
        </div>
        <nav aria-label="Footer — study">
          <p className="label">Study</p>
          <ul className="mt-3 space-y-2 text-sm">
            {primaryNav.map((n) => (
              <li key={n.href}>
                <Link className="text-ink-2 hover:text-ink" href={n.href}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Footer — subjects" className="md:order-last">
          <p className="label">Subject families</p>
          <ul className="mt-3 space-y-2 text-sm">
            {(Object.keys(PALETTE_LABEL) as Palette[]).map((p) => (
              <li key={p} className={`cat-${p}`}>
                <Link className="flex items-center gap-2 text-ink-2 hover:text-ink" href={`/topics#fam-${p}`}>
                  <span aria-hidden className="h-2 w-2 rounded-full bg-c" />
                  {PALETTE_LABEL[p]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Footer — reference">
          <p className="label">Reference</p>
          <ul className="mt-3 space-y-2 text-sm">
            {secondaryNav.map((n) => (
              <li key={n.href}>
                <Link className="text-ink-2 hover:text-ink" href={n.href}>
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className="text-ink-2 hover:text-ink" href="/topics">
                All subjects
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
