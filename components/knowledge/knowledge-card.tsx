/**
 * Knowledge cards. Server-safe presentation; the illustration is passed in as a
 * node so pages decide whether it is rendered (keeps plate code off the client).
 *
 * Variants:
 *  - standard  plate on top, type, title, summary, meta
 *  - featured  wide: plate left, larger title, definition-length summary
 *  - formula   standard + the expression in a mono strip
 *  - compact   no plate (list contexts)
 *  - planned   no plate, dashed, explicitly "not yet researched"
 */
import Link from "next/link";
import type { ReactNode } from "react";
import { DifficultyMark, EvidenceMark } from "@/components/ui/marks";
import { catClass } from "@/lib/content/categories";
import { TYPE_LABEL } from "@/lib/content/labels";
import type { Difficulty, EvidenceClass, KnowledgeType } from "@/lib/content/schema";
import { BookmarkToggle } from "./bookmark-toggle";

export type CardData = {
  slug: string;
  title: string;
  summary: string;
  type: KnowledgeType;
  domain: string;
  subject: string;
  difficulty?: Difficulty;
  evidence?: EvidenceClass;
  planned?: boolean;
  expression?: string;
  hasLab?: boolean;
  hasCalculator?: boolean;
};

export type CardVariant = "standard" | "featured" | "formula" | "compact" | "planned";

function Features({ d }: { d: CardData }) {
  if (!d.hasLab && !d.hasCalculator) return null;
  return (
    <span className="flex gap-1.5">
      {d.hasCalculator && <span className="rounded-xs border border-rule px-1.5 py-px text-[11px] font-medium text-ink-2">Calculator</span>}
      {d.hasLab && <span className="rounded-xs border border-rule px-1.5 py-px text-[11px] font-medium text-ink-2">Lab</span>}
    </span>
  );
}

export function KnowledgeCard({ d, variant = "standard", plate, headingLevel = 3 }: { d: CardData; variant?: CardVariant; plate?: ReactNode; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const href = `/library/${d.slug}`;

  if (variant === "planned" || d.planned) {
    return (
      <article className="flex h-full flex-col rounded-sm border border-dashed border-rule-strong p-4">
        <p className="label">{TYPE_LABEL[d.type]} · planned</p>
        <H className="mt-1.5 text-base font-medium leading-snug text-ink-2">
          <Link href={href} className="after:absolute after:inset-0 hover:text-ink">
            {d.title}
          </Link>
        </H>
        <p className="mt-auto pt-2 text-xs text-ink-3">{d.subject} · not yet researched</p>
      </article>
    );
  }

  const meta = (
    <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-4">
      {d.evidence && <EvidenceMark evidence={d.evidence} />}
      {d.difficulty && <DifficultyMark level={d.difficulty} />}
      <Features d={d} />
    </div>
  );

  const eyebrow = (
    <p className="flex items-center gap-2 text-xs">
      <span className="font-semibold uppercase tracking-[0.08em] text-ink-2">{TYPE_LABEL[d.type]}</span>
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-c" />
      <span className="text-c-ink">{d.subject}</span>
    </p>
  );

  if (variant === "compact") {
    return (
      <article className={`${catClass(d.domain)} relative flex h-full flex-col rounded-sm border border-rule bg-surface p-4 lift hover:border-ink-3`}>
        {eyebrow}
        <H className="mt-1.5 t-section text-lg">
          <Link href={href} className="after:absolute after:inset-0">
            {d.title}
          </Link>
        </H>
        <p className="mt-1 line-clamp-2 text-sm text-ink-2">{d.summary}</p>
        {meta}
      </article>
    );
  }

  if (variant === "featured") {
    return (
      <article className={`${catClass(d.domain)} group relative grid h-full grid-cols-[minmax(0,1fr)] overflow-hidden rounded-sm border border-rule bg-surface lift hover:border-ink-3 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]`}>
        <div className="flex items-center border-b border-rule bg-c-wash sm:border-b-0 sm:border-r">{plate}</div>
        <div className="flex min-w-0 flex-col p-6">
          {eyebrow}
          <H className="mt-2 t-section text-2xl group-hover:text-accent-ink">
            <Link href={href} className="after:absolute after:inset-0">
              {d.title}
            </Link>
          </H>
          <p className="mt-2 t-lede text-base">{d.summary}</p>
          {d.expression && <p className="formula mt-4 truncate rounded-xs bg-sunken px-3 py-2 text-sm text-ink">{d.expression}</p>}
          {meta}
        </div>
        <div className="absolute right-2 top-2 z-10">
          <BookmarkToggle slug={d.slug} title={d.title} />
        </div>
      </article>
    );
  }

  return (
    <article className={`${catClass(d.domain)} group relative flex h-full flex-col overflow-hidden rounded-sm border border-rule bg-surface lift hover:border-ink-3`}>
      <div className="border-b border-rule">{plate}</div>
      {variant === "formula" && d.expression && <p className="formula truncate border-b border-rule bg-sunken px-4 py-2 text-xs text-ink">{d.expression}</p>}
      <div className="flex flex-1 flex-col p-4">
        {eyebrow}
        <H className="mt-1.5 t-section text-xl group-hover:text-accent-ink">
          <Link href={href} className="after:absolute after:inset-0">
            {d.title}
          </Link>
        </H>
        <p className="mt-1.5 line-clamp-3 text-sm text-ink-2">{d.summary}</p>
        {meta}
      </div>
      <div className="absolute right-2 top-2 z-10 rounded-xs bg-surface/80">
        <BookmarkToggle slug={d.slug} title={d.title} />
      </div>
    </article>
  );
}

/** Subject tile: plate + name + description + real published count. */
export function CategoryTile({ id, title, description, published, total, plate }: { id: string; title: string; description: string; published: number; total: number; plate: ReactNode }) {
  return (
    <article className={`${catClass(id)} group relative flex h-full flex-col overflow-hidden rounded-sm border border-rule bg-surface lift hover:border-ink-3`}>
      <div className="border-b border-rule">{plate}</div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="t-sub text-base text-ink group-hover:text-accent-ink">
          <Link href={`/topics/${id}`} className="after:absolute after:inset-0">
            {title}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-ink-2">{description}</p>
        <p className="tabular mt-auto pt-3 text-xs text-ink-3">
          <span className="font-medium text-c-ink">{published} published</span> · {total - published} planned
        </p>
      </div>
    </article>
  );
}
