import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-page px-4 sm:px-6 ${className}`}>{children}</div>;
}

export type Crumb = { href?: string; label: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-ink-3">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {c.href && i < items.length - 1 ? (
              <Link href={c.href} className="hover:text-ink">
                {c.label}
              </Link>
            ) : (
              <span aria-current={i === items.length - 1 ? "page" : undefined} className={i === items.length - 1 ? "text-ink-2" : ""}>
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Page header: optional breadcrumb, eyebrow, title, lede, and an optional illustrated aside. */
export function PageHeader({
  eyebrow,
  title,
  lede,
  crumbs,
  children,
  aside,
  cat,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  /** Usually a plate; shown beside the text on large screens. */
  aside?: ReactNode;
  /** Category class (e.g. "cat-teal") — adds the subject rule and colour context. */
  cat?: string;
}) {
  return (
    <header className={`${cat ?? ""} border-b border-rule`}>
      {cat && <div aria-hidden className="h-1 bg-c" />}
      <Container className={`pb-10 pt-10 sm:pt-12 ${aside ? "grid items-center gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-14" : ""}`}>
        <div>
          {crumbs && <Breadcrumbs items={crumbs} />}
          {eyebrow && <p className={`label ${crumbs ? "mt-6" : ""}`}>{eyebrow}</p>}
          <h1 className="t-page mt-3 max-w-4xl text-4xl sm:text-5xl">{title}</h1>
          {lede && <div className="t-lede mt-4 max-w-read text-lg">{lede}</div>}
          {children}
        </div>
        {aside && <div className="overflow-hidden rounded-sm border border-rule">{aside}</div>}
      </Container>
    </header>
  );
}

/** Section heading with a rubric rule — the consistent marker of a major section. */
export function SectionHeading({ id, kicker, children, level = 2 }: { id?: string; kicker?: string; children: ReactNode; level?: 2 | 3 }) {
  const H = level === 2 ? "h2" : "h3";
  return (
    <div className="mb-5">
      {kicker && <p className="label mb-2">{kicker}</p>}
      <H id={id} className={`t-section scroll-mt-24 ${level === 2 ? "text-[1.75rem]" : "text-xl"}`}>
        {children}
      </H>
    </div>
  );
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="rounded-sm border border-dashed border-rule-strong px-6 py-10 text-center">
      <p className="font-medium text-ink">{title}</p>
      {children && <div className="mx-auto mt-2 max-w-md text-sm text-ink-2">{children}</div>}
    </div>
  );
}

export function Bullets({ items, className = "" }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={`space-y-2 ${className}`}>
      {items.map((t, i) => (
        <li key={i} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-ink-3">
          {t}
        </li>
      ))}
    </ul>
  );
}
