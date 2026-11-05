import Link from "next/link";
import { secondaryNav } from "./nav";

/** Compact colophon below the workspace frame. Navigation lives in the sidebar. */
export function SiteFooter() {
  return (
    <footer className="px-4 pb-6 pt-2 sm:px-6 lg:pl-2">
      <div className="flex flex-col gap-3 text-xs text-ink-3 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl">
          <span className="font-semibold text-ink-2">UX Academy</span> — a personal academy for the design discipline. Written
          from primary research where it exists, labelled by evidence, linked to sources. Your notes and progress stay in this
          browser.
        </p>
        <nav aria-label="Reference">
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {secondaryNav.map((n) => (
              <li key={n.href}>
                <Link className="hover:text-ink" href={n.href}>
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className="hover:text-ink" href="/topics">
                Domains & Topics
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
