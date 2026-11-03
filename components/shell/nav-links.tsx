"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNav, secondaryNav } from "./nav";

function isActive(pathname: string, match: readonly string[]) {
  return match.some((m) => pathname === m || pathname.startsWith(m + "/"));
}

export function NavLinks({ pathname: fixed }: { pathname?: string }) {
  const live = usePathnameSafe(fixed);
  return (
    <ul className="flex items-center gap-1">
      {primaryNav.map((item) => {
        const active = isActive(live, item.match);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`relative inline-flex h-9 items-center rounded-sm px-3 text-sm font-medium transition-colors ${
                active ? "text-ink" : "text-ink-2 hover:bg-sunken hover:text-ink"
              }`}
            >
              {item.label}
              {active && <span aria-hidden className="absolute inset-x-3 -bottom-[13px] h-0.5 bg-accent" />}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function usePathnameSafe(fixed?: string) {
  const pathname = usePathname();
  return fixed ?? pathname ?? "";
}

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "";
  const panel = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  // Close the menu when the route changes (state adjusted during render, not in an effect).
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-9 items-center rounded-sm px-3 text-sm font-medium text-ink-2 hover:bg-sunken hover:text-ink"
      >
        {open ? "Close" : "Menu"}
      </button>
      <div
        id="mobile-menu"
        ref={panel}
        hidden={!open}
        className="absolute inset-x-0 top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-rule bg-paper px-4 pb-6 pt-2 shadow-raise"
      >
        <nav aria-label="Mobile">
          <ul className="divide-y divide-rule">
            {[...primaryNav, { href: "/me", label: "My learning", match: ["/me"] }].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.match) ? "page" : undefined}
                  className="flex py-3 text-base font-medium text-ink aria-[current=page]:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="label mt-6">More</p>
          <ul className="mt-2 grid grid-cols-2 gap-2">
            {secondaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-ink-2 hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
