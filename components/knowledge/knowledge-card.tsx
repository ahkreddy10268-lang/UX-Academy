/**
 * Knowledge cards (v3). Server-safe presentation; the illustration is passed in
 * as a node so pages decide whether it is rendered (keeps plate code off the client).
 *
 * Variants — chosen by what the entry *is* (see `variantFor`):
 *  - standard   plate on a pastel field, type, title, summary, meta
 *  - featured   wide: plate left on a soft gradient, larger title
 *  - formula    standard + the expression in a mono well
 *  - research   methods & instruments: thumbnail, purpose/data tags, source count
 *  - framework  frameworks & models: plate + how many concepts it connects
 *  - lab        entries with an interactive lab: standard + a lab action band
 *  - compact    no plate (dense lists, related rows)
 *  - planned    dashed, explicitly "not yet researched"
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
  subcategory?: string;
  subcategoryTitle?: string;
  difficulty?: Difficulty;
  evidence?: EvidenceClass;
  planned?: boolean;
  expression?: string;
  hasLab?: boolean;
  hasCalculator?: boolean;
  /** number of references in the entry */
  refs?: number;
  /** explained relations to other entries */
  connections?: number;
  method?: { purpose: "generative" | "evaluative" | "both"; data: "qualitative" | "quantitative" | "mixed" };
};

export type CardVariant = "standard" | "featured" | "formula" | "research" | "framework" | "lab" | "compact" | "planned";

const RESEARCH_TYPES = new Set<KnowledgeType>(["method", "methodology", "technique", "research-instrument"]);
const FRAMEWORK_TYPES = new Set<KnowledgeType>(["framework", "model"]);

/** The card variant that fits a record — classification decides presentation. */
export function variantFor(d: CardData): CardVariant {
  if (d.planned) return "planned";
  if (RESEARCH_TYPES.has(d.type)) return "research";
  if (d.expression) return "formula";
  if (FRAMEWORK_TYPES.has(d.type)) return "framework";
  if (d.hasLab) return "lab";
  return "standard";
}

function Features({ d }: { d: CardData }) {
  if (!d.hasLab && !d.hasCalculator) return null;
  return (
    <span className="flex gap-1.5">
      {d.hasCalculator && <span className="rounded-full bg-sunken px-2 py-px text-[11px] font-medium text-ink-2">Calculator</span>}
      {d.hasLab && <span className="rounded-full bg-sunken px-2 py-px text-[11px] font-medium text-ink-2">Lab</span>}
    </span>
  );
}

const PURPOSE = { generative: "Generative", evaluative: "Evaluative", both: "Generative + evaluative" } as const;
const DATA = { qualitative: "Qualitative", quantitative: "Quantitative", mixed: "Mixed data" } as const;

export function KnowledgeCard({ d, variant, plate, headingLevel = 3 }: { d: CardData; variant?: CardVariant; plate?: ReactNode; headingLevel?: 2 | 3 }) {
  const v = variant ?? variantFor(d);
  const H = headingLevel === 2 ? "h2" : "h3";
  const href = `/library/${d.slug}`;
  const title = (cls: string) => (
    <H className={cls}>
      <Link href={href} className="after:absolute after:inset-0 after:rounded-[inherit]">
        {d.title}
      </Link>
    </H>
  );

  if (v === "planned" || d.planned) {
    return (
      <article className="relative flex h-full flex-col rounded-md border border-dashed border-rule-strong bg-soft p-4 hover:border-ink-3">
        <p className="label">{TYPE_LABEL[d.type]} · planned</p>
        {title("mt-1.5 text-base font-medium leading-snug text-ink-2")}
        <p className="mt-auto pt-2 text-xs text-ink-3">{d.subject} · not yet researched</p>
      </article>
    );
  }

  const meta = (
    <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-rule pt-3">
      {d.evidence && <EvidenceMark evidence={d.evidence} />}
      {d.difficulty && <DifficultyMark level={d.difficulty} />}
      <Features d={d} />
    </div>
  );

  const eyebrow = (
    <p className="flex min-w-0 items-center gap-2 text-xs">
      <span className="shrink-0 rounded-full bg-c-wash px-2 py-0.5 font-semibold text-c-ink">{d.subject}</span>
      <span className="truncate text-ink-3">{TYPE_LABEL[d.type]}</span>
    </p>
  );

  const bookmark = (
    <div className="absolute right-2.5 top-2.5 z-10 rounded-xs bg-surface/90 shadow-card">
      <BookmarkToggle slug={d.slug} title={d.title} />
    </div>
  );

  if (v === "compact") {
    return (
      <article className={`${catClass(d.domain)} card group relative flex h-full flex-col p-4`}>
        {eyebrow}
        {title("t-sub mt-2 text-base group-hover:text-accent-ink")}
        <p className="mt-1 line-clamp-2 text-sm text-ink-2">{d.summary}</p>
        <div className="pt-3">{meta}</div>
      </article>
    );
  }

  if (v === "featured") {
    return (
      <article className={`${catClass(d.domain)} card group relative grid h-full overflow-hidden !rounded-xl md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]`}>
        <div className="bg-feature flex items-center p-4 sm:p-6">
          <div className="w-full overflow-hidden rounded-lg border border-rule bg-surface">{plate}</div>
        </div>
        <div className="flex min-w-0 flex-col p-6 lg:p-8">
          <p className="label !text-c-ink">Featured</p>
          <div className="mt-2">{eyebrow}</div>
          {title("t-editorial mt-3 text-[1.9rem] group-hover:text-accent-ink")}
          <p className="t-lede mt-2 text-base">{d.summary}</p>
          {d.expression && <p className="formula mt-4 truncate rounded-sm bg-sunken px-3 py-2 text-sm text-ink">{d.expression}</p>}
          <div className="pt-5">{meta}</div>
        </div>
        {bookmark}
      </article>
    );
  }

  if (v === "research") {
    return (
      <article className={`${catClass(d.domain)} card group relative flex h-full flex-col p-4`}>
        <div className="pr-9">{eyebrow}</div>
        <div className="mt-3 flex items-center gap-3">
          {plate && <div className="w-20 shrink-0 overflow-hidden rounded-sm border border-rule">{plate}</div>}
          <div className="min-w-0 flex-1">{title("t-sub text-[1.05rem] leading-snug group-hover:text-accent-ink")}</div>
        </div>
        <p className="mt-3 line-clamp-3 text-sm text-ink-2">{d.summary}</p>
        {d.method && (
          <p className="mt-3 flex flex-wrap gap-1.5 text-[11px] font-medium">
            <span className="rounded-full border border-rule px-2 py-px text-ink-2">{PURPOSE[d.method.purpose]}</span>
            <span className="rounded-full border border-rule px-2 py-px text-ink-2">{DATA[d.method.data]}</span>
          </p>
        )}
        <div className="pt-3">
          {meta}
          {d.refs !== undefined && <p className="tabular mt-2 text-xs text-ink-3">{d.refs} references</p>}
        </div>
        {bookmark}
      </article>
    );
  }

  return (
    <article className={`${catClass(d.domain)} card group relative flex h-full flex-col overflow-hidden`}>
      <div className="border-b border-rule">{plate}</div>
      {v === "formula" && d.expression && <p className="formula truncate border-b border-rule bg-sunken px-4 py-2 text-xs text-ink">{d.expression}</p>}
      <div className="flex flex-1 flex-col p-4">
        {eyebrow}
        {title("t-sub mt-2 text-[1.075rem] leading-snug group-hover:text-accent-ink")}
        <p className="mt-1.5 line-clamp-3 text-sm text-ink-2">{d.summary}</p>
        {v === "framework" && d.connections !== undefined && (
          <p className="tabular mt-3 text-xs text-ink-3">
            Connects <span className="font-semibold text-c-ink">{d.connections}</span> explained relations
          </p>
        )}
        <div className="pt-3">{meta}</div>
      </div>
      {v === "lab" && (
        <p className="flex items-center justify-between border-t border-rule bg-c-wash px-4 py-2 text-xs font-medium text-c-ink">
          Includes an interactive lab <span aria-hidden>→</span>
        </p>
      )}
      {bookmark}
    </article>
  );
}

/** Subject tile: plate + name + description + real published count. */
export function CategoryTile({ id, title, description, published, total, plate }: { id: string; title: string; description: string; published: number; total: number; plate: ReactNode }) {
  return (
    <article className={`${catClass(id)} group relative flex h-full flex-col overflow-hidden rounded-lg bg-c-wash transition-shadow hover:shadow-hover`}>
      <div className="px-3 pt-3">
        <div className="overflow-hidden rounded-md">{plate}</div>
      </div>
      <div className="flex flex-1 flex-col p-4 pt-3">
        <h3 className="t-sub text-base text-ink group-hover:text-c-ink">
          <Link href={`/topics/${id}`} className="after:absolute after:inset-0">
            {title}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-ink-2">{description}</p>
        <p className="tabular mt-auto pt-3 text-xs text-ink-2">
          <span className="font-semibold text-c-ink">{published} published</span> · {total - published} planned
        </p>
      </div>
    </article>
  );
}
