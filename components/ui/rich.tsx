import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { parseRich, type RichNode } from "@/lib/content/rich";

export type LinkInfo = { title: string; href: string; planned: boolean };
export type RichContext = {
  resolve?: (slug: string) => LinkInfo | undefined;
  cite?: (sourceId: string) => number | undefined;
};

/** Renders content markup. Contains no hooks, so it works in server and client components. */
export function Rich({ text, ctx = {} }: { text: string; ctx?: RichContext }) {
  return <>{parseRich(text).map((n, i) => renderNode(n, i, ctx))}</>;
}

function renderNode(n: RichNode, key: number, ctx: RichContext): ReactNode {
  switch (n.kind) {
    case "text":
      return <Fragment key={key}>{n.value}</Fragment>;
    case "strong":
      return <strong key={key} className="font-semibold">{n.children.map((c, i) => renderNode(c, i, ctx))}</strong>;
    case "em":
      return <em key={key}>{n.children.map((c, i) => renderNode(c, i, ctx))}</em>;
    case "code":
      return (
        <code key={key} className="formula rounded-xs bg-sunken px-1 py-px text-[0.88em]">
          {n.value}
        </code>
      );
    case "link": {
      const info = ctx.resolve?.(n.slug);
      const label = n.label ?? info?.title ?? n.slug.replace(/-/g, " ");
      if (!info) return <Fragment key={key}>{label}</Fragment>;
      return (
        <Link
          key={key}
          href={info.href}
          className={info.planned ? "text-ink underline decoration-ink-3 decoration-dotted underline-offset-[0.2em] hover:decoration-ink" : "link"}
          title={info.planned ? `${info.title} — planned topic, not yet written` : info.title}
        >
          {label}
          {info.planned && <span className="sr-only"> (planned topic)</span>}
        </Link>
      );
    }
    case "cite": {
      const n2 = ctx.cite?.(n.source);
      if (!n2) return null;
      return (
        <sup key={key} className="ml-px">
          <a href={`#ref-${n.source}`} className="link font-sans text-[0.7em] no-underline" aria-label={`Reference ${n2}`}>
            [{n2}]
          </a>
        </sup>
      );
    }
  }
}

export function RichParagraphs({ items, ctx, className = "" }: { items: string[]; ctx?: RichContext; className?: string }) {
  return (
    <div className={`prose-read ${className}`}>
      {items.map((p, i) => (
        <p key={i}>
          <Rich text={p} ctx={ctx} />
        </p>
      ))}
    </div>
  );
}
