import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-page px-4 sm:px-6 lg:px-10 ${className}`}>{children}</div>;
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
              <Link href={c.href} className="tap hover:text-ink">
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

/**
 * Page header. Workspace pages get a quiet title block; with `cat` the header
 * becomes a neutral panel marked by a thin bar in the subject colour (v4, D-097).
 * `editorial` gives concepts, lessons and essays the larger display title.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  crumbs,
  children,
  aside,
  cat,
  editorial = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  /** Usually a plate; shown beside the text on large screens. */
  aside?: ReactNode;
  /** Category class (e.g. "cat-teal") — pastel panel in the subject colour. */
  cat?: string;
  editorial?: boolean;
}) {
  const body = (
    <div className={aside ? "grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12" : ""}>
      <div className="min-w-0">
        {eyebrow && <p className={`label ${cat ? "!text-c-ink" : ""}`}>{eyebrow}</p>}
        <h1 className={`${editorial ? "t-editorial" : "t-page"} mt-2.5 max-w-4xl text-[2rem] sm:text-[2.75rem]`}>{title}</h1>
        {lede && <div className="t-lede mt-3 max-w-read text-base sm:text-lg">{lede}</div>}
        {children}
      </div>
      {aside && <div className="overflow-hidden rounded-lg border border-rule bg-surface shadow-card">{aside}</div>}
    </div>
  );
  return (
    <header className={cat ?? ""}>
      <Container className="pt-6 sm:pt-8">
        {crumbs && (
          <div className="mb-5">
            <Breadcrumbs items={crumbs} />
          </div>
        )}
        {cat ? <div className="relative overflow-hidden rounded-xl border border-rule bg-surface px-5 py-7 shadow-card sm:px-8 sm:py-9"><span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-c" />{body}</div> : <div className="pb-2">{body}</div>}
      </Container>
    </header>
  );
}

/** Section heading — the consistent marker of a major section. */
export function SectionHeading({ id, kicker, children, level = 2 }: { id?: string; kicker?: string; children: ReactNode; level?: 2 | 3 }) {
  const H = level === 2 ? "h2" : "h3";
  return (
    <div className="mb-5">
      {kicker && <p className="label mb-2">{kicker}</p>}
      <H id={id} className={`t-section scroll-mt-24 ${level === 2 ? "text-[1.5rem]" : "text-lg"}`}>
        {children}
      </H>
    </div>
  );
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-rule-strong bg-soft px-6 py-10 text-center">
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
