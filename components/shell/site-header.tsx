import Link from "next/link";
import { Suspense } from "react";
import { MobileMenu, NavLinks } from "./nav-links";
import { SearchTrigger } from "../search/search-trigger";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/95 backdrop-blur-[2px] supports-[backdrop-filter]:bg-paper/85">
      <div className="mx-auto flex h-16 max-w-page items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="group flex items-baseline gap-2 whitespace-nowrap" aria-label="UX Academy — home">
          <Wordmark />
        </Link>
        <nav aria-label="Primary" className="hidden flex-1 lg:block">
          <Suspense fallback={<NavLinks pathname="" />}>
            <NavLinks />
          </Suspense>
        </nav>
        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <SearchTrigger />
          <ThemeToggle />
          <Link
            href="/me"
            className="hidden h-9 items-center rounded-sm px-3 text-sm font-medium text-ink-2 hover:bg-sunken hover:text-ink sm:inline-flex"
          >
            My learning
          </Link>
          <Suspense fallback={null}>
            <MobileMenu />
          </Suspense>
        </div>
      </div>
    </header>
  );
}

/** Wordmark: a rubric section sign set before the name — the scholar's mark for "a section to study". */
function Wordmark() {
  return (
    <span className="flex items-baseline gap-1.5">
      <span aria-hidden className="display text-[1.6rem] leading-none text-accent">
        §
      </span>
      <span className="display text-xl leading-none tracking-tight">UX Academy</span>
    </span>
  );
}
