import Link from "next/link";
import { Suspense } from "react";
import { SearchTrigger } from "../search/search-trigger";
import { Icon } from "./icons";
import { MobileNav, Wordmark } from "./sidebar";
import { ThemeToggle } from "./theme-toggle";

/** Top toolbar (68px): search, theme, My Learning. On small screens it also carries the drawer button and wordmark. */
export function Topbar() {
  return (
    <header className="sticky top-0 z-30 bg-paper/90 backdrop-blur-sm supports-[backdrop-filter]:bg-paper/75">
      <div className="flex h-[68px] items-center gap-2 px-3 sm:gap-3 sm:px-4 lg:px-6">
        <Suspense fallback={null}>
          <MobileNav />
        </Suspense>
        <Link href="/" aria-label="UX Academy — home" className="mr-1 shrink-0 rounded-sm lg:hidden">
          <span className="max-sm:[&_.t-sub]:hidden">
            <Wordmark />
          </span>
        </Link>
        <div className="flex min-w-0 flex-1">
          <SearchTrigger />
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <ThemeToggle />
          <Link
            href="/me"
            className="inline-flex h-10 items-center gap-2 rounded-sm border border-rule bg-surface px-2.5 text-sm font-medium text-ink-2 shadow-card hover:border-rule-strong hover:text-ink sm:px-3"
          >
            <Icon name="me" />
            <span className="hidden sm:inline">My Learning</span>
            <span className="sr-only sm:hidden">My Learning</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
