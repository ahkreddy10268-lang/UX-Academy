"use client";

/**
 * Marks the section the reader is in: every link inside a `[data-toc]` list
 * whose target is the last heading above the reading line gets
 * `aria-current="location"` (styled by the list). Progressive enhancement:
 * without JavaScript the lists still work as plain anchor links. Scrolls a
 * long sticky list so the current link stays visible, without moving the page.
 */
import { useEffect } from "react";

const LINE = 200; // px from the top: a heading reached by an anchor lands at ~176 px (scroll padding + scroll margin)

export function TocSpy() {
  useEffect(() => {
    const links = [
      ...document.querySelectorAll<HTMLAnchorElement>(
        '[data-toc] a[href^="#"]',
      ),
    ];
    const ids = [
      ...new Set(links.map((a) => decodeURIComponent(a.hash.slice(1)))),
    ];
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!targets.length) return;
    let frame = 0;
    let current = "";
    const update = () => {
      frame = 0;
      let active = targets[0].id;
      for (const t of targets) {
        if (t.getBoundingClientRect().top - LINE <= 0) active = t.id;
        else break;
      }
      if (active === current) return;
      current = active;
      for (const a of links) {
        const on = a.hash.slice(1) === active;
        if (on) a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
        const list = a.closest<HTMLElement>("[data-toc]");
        if (on && list && list.scrollHeight > list.clientHeight) {
          const top = a.offsetTop - list.offsetTop;
          if (
            top < list.scrollTop ||
            top > list.scrollTop + list.clientHeight - a.offsetHeight
          )
            list.scrollTop = top - list.clientHeight / 3;
        }
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("hashchange", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("hashchange", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
