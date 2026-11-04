"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLocalString, writeLocal } from "@/lib/store/local";
import { Icon } from "./icons";
import { isActive, navGroups } from "./nav";

export const SIDEBAR_KEY = "ux-academy:sidebar";

/** Wordmark: a rubric section sign before the name — the scholar's mark for "a section to study". */
export function Wordmark({ collapsible = false }: { collapsible?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden
        className="grid h-9 w-9 shrink-0 place-items-center rounded-sm bg-rubric/10 font-serif text-[1.35rem] leading-none text-rubric"
      >
        §
      </span>
      <span className={`t-sub whitespace-nowrap text-[1.05rem] tracking-tight text-ink ${collapsible ? "collapse-hide" : ""}`}>
        UX Academy
      </span>
    </span>
  );
}

function NavList({ pathname, collapsible, onNavigate }: { pathname: string; collapsible: boolean; onNavigate?: () => void }) {
  return (
    <div className="space-y-4">
      {navGroups.map((g) => (
        <div key={g.id}>
          <p className={`label px-3 text-[0.6875rem] ${collapsible ? "collapse-hide" : ""}`} id={`nav-${g.id}-${collapsible ? "s" : "d"}`}>
            {g.label}
          </p>
          {collapsible && <span aria-hidden className="collapse-show mx-auto my-1 block h-px w-6 bg-rule" />}
          <ul className="mt-1.5 space-y-0.5" aria-labelledby={`nav-${g.id}-${collapsible ? "s" : "d"}`}>
            {g.items.map((item) => {
              const active = isActive(pathname, item);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className="nav-item group relative flex h-9 items-center gap-3 rounded-sm px-3 text-sm font-medium text-ink-2 transition-colors hover:bg-sunken hover:text-ink aria-[current=page]:bg-accent-wash aria-[current=page]:text-accent-ink"
                  >
                    <Icon name={item.icon} className="shrink-0" />
                    <span className={collapsible ? "collapse-hide" : ""}>{item.label}</span>
                    {collapsible && (
                      <span aria-hidden className="nav-tip">
                        {item.label}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Desktop sidebar: 248px expanded, 76px collapsed (labels become tooltips). State persists locally. */
export function Sidebar() {
  const pathname = usePathname() ?? "";
  const stored = useLocalString(SIDEBAR_KEY);
  const collapsed = stored === "collapsed";

  function toggle() {
    const next = collapsed ? null : "collapsed";
    if (next) document.documentElement.setAttribute("data-sidebar", next);
    else document.documentElement.removeAttribute("data-sidebar");
    writeLocal(SIDEBAR_KEY, next);
  }

  return (
    <aside className="app-sidebar sticky top-0 hidden h-dvh shrink-0 flex-col overflow-y-auto overflow-x-hidden px-3 pb-4 lg:flex">
      <div className="flex h-[68px] shrink-0 items-center justify-between gap-2 pl-1">
        <Link href="/" aria-label="UX Academy — home" className="rounded-sm">
          <Wordmark collapsible />
        </Link>
      </div>
      <nav aria-label="Primary" className="flex-1">
        <NavList pathname={pathname} collapsible />
      </nav>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={!collapsed}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="nav-item relative mt-4 flex h-9 items-center gap-3 rounded-sm px-3 text-sm font-medium text-ink-3 hover:bg-sunken hover:text-ink"
      >
        <Icon name="sidebar" className="shrink-0" />
        <span className="collapse-hide">Collapse</span>
        <span aria-hidden className="nav-tip">
          Expand sidebar
        </span>
      </button>
    </aside>
  );
}

/** Mobile/tablet navigation drawer (a modal dialog: focus is contained, Escape closes). */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "";
  const dialog = useRef<HTMLDialogElement>(null);

  // Close when the route changes (state adjusted during render, not in an effect).
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="inline-flex h-10 items-center gap-2 rounded-sm px-2.5 text-sm font-medium text-ink-2 hover:bg-sunken hover:text-ink"
      >
        <Icon name="menu" />
        <span className="sr-only sm:not-sr-only">Menu</span>
      </button>
      <dialog
        id="mobile-menu"
        ref={dialog}
        aria-label="Navigation"
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === dialog.current && setOpen(false)}
        className="drawer m-0 h-dvh max-h-none w-[min(20rem,86vw)] max-w-none border-r border-rule bg-surface p-0 text-ink shadow-dialog"
      >
        {open && (
          <div className="flex h-full flex-col overflow-y-auto px-3 pb-6">
            <div className="flex h-[68px] shrink-0 items-center justify-between pl-1">
              <Link href="/" onClick={() => setOpen(false)} aria-label="UX Academy — home" className="rounded-sm">
                <Wordmark />
              </Link>
              <button
                type="button"
                autoFocus
                onClick={() => setOpen(false)}
                className="inline-flex h-10 items-center gap-2 rounded-sm px-2.5 text-sm font-medium text-ink-2 hover:bg-sunken hover:text-ink"
              >
                <Icon name="close" />
                Close
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-2">
              <NavList pathname={pathname} collapsible={false} onNavigate={() => setOpen(false)} />
            </nav>
          </div>
        )}
      </dialog>
    </div>
  );
}
