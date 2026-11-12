/**
 * Renders a guide mock (lib/content/guide.ts): a small, believable interface
 * drawn with the site's tokens. The drawing is hidden from assistive
 * technology; the figure exposes its text alternative and numbered notes as
 * real text, so nothing is conveyed by the picture alone.
 */
import type { Mock, MockElement } from "@/lib/content/guide";

const TONE: Record<string, string> = {
  neutral: "border-rule bg-soft text-ink",
  ok: "border-ok/50 bg-ok-wash text-ink",
  error: "border-error/60 bg-error-wash text-ink",
  warn: "border-rule-strong bg-sunken text-ink",
  info: "border-accent/40 bg-accent-wash text-ink",
};
const TONE_ICON: Record<string, string> = { neutral: "", ok: "✓", error: "⚠", warn: "!", info: "i" };

function Mark({ n }: { n?: number }) {
  if (!n) return null;
  return <span className="ml-1.5 inline-grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink font-mono text-[11px] font-semibold text-surface">{n}</span>;
}

function Element({ el }: { el: MockElement }) {
  switch (el.k) {
    case "heading":
      return (
        <p className="flex items-center text-[15px] font-semibold text-ink">
          {el.text}
          <Mark n={el.mark} />
        </p>
      );
    case "text":
      return (
        <p className={`flex items-start ${el.small ? "text-xs" : "text-sm"} ${el.tone === "error" ? "text-error" : el.tone === "ok" ? "text-ok" : "text-ink-2"}`}>
          <span>{el.text}</span>
          <Mark n={el.mark} />
        </p>
      );
    case "field":
      return (
        <div>
          <p className="flex items-center text-xs font-medium text-ink">
            {el.label}
            <Mark n={el.mark} />
          </p>
          <div
            className={`mt-1 flex h-9 items-center rounded-sm border px-2.5 text-sm ${
              el.state === "error" ? "border-2 border-error text-ink" : el.state === "ok" ? "border-ok text-ink" : el.state === "disabled" ? "border-rule bg-sunken text-ink-3" : "border-line-control text-ink"
            }`}
          >
            {el.value ? el.value : <span className="text-ink-3">{el.placeholder ?? ""}</span>}
          </div>
          {el.hint && <p className={`mt-1 text-xs ${el.state === "error" ? "text-error" : "text-ink-3"}`}>{el.state === "error" ? `⚠ ${el.hint}` : el.hint}</p>}
        </div>
      );
    case "buttons":
      return (
        <div className="flex flex-wrap items-center gap-2">
          {el.items.map((b, i) => (
            <span
              key={i}
              className={`inline-flex h-8 items-center gap-1.5 rounded-sm px-3 text-xs font-semibold ${
                b.state === "disabled"
                  ? "border border-rule bg-sunken text-ink-3"
                  : b.variant === "secondary"
                    ? "border border-line-control bg-surface text-ink"
                    : b.variant === "danger"
                      ? "bg-error text-surface"
                      : b.variant === "ghost"
                        ? "text-ink-2"
                        : b.variant === "link"
                          ? "px-0 text-accent-ink underline"
                          : "bg-ink text-surface"
              }`}
            >
              {b.state === "busy" && <span className="h-3 w-3 rounded-full border-2 border-current border-r-transparent" />}
              {b.text}
            </span>
          ))}
          <Mark n={el.mark} />
        </div>
      );
    case "banner":
      return (
        <div className={`flex items-start gap-2 rounded-sm border px-3 py-2 text-xs ${TONE[el.tone]}`}>
          {TONE_ICON[el.tone] && <span className="font-semibold">{TONE_ICON[el.tone]}</span>}
          <span className="min-w-0 flex-1">{el.text}</span>
          {el.action && <span className="font-semibold underline">{el.action}</span>}
          <Mark n={el.mark} />
        </div>
      );
    case "toast":
      return (
        <div className="flex items-center gap-3 rounded-sm bg-ink px-3 py-2 text-xs text-surface">
          <span className="min-w-0 flex-1">{el.text}</span>
          {el.action && <span className="font-semibold underline">{el.action}</span>}
          <Mark n={el.mark} />
        </div>
      );
    case "list":
      return (
        <ul className="divide-y divide-rule rounded-sm border border-rule text-xs">
          {el.items.map((t, i) => (
            <li key={i} className="flex items-center gap-2 px-2.5 py-1.5 text-ink">
              {el.checks && <span className="h-3.5 w-3.5 shrink-0 rounded-xs border border-line-control" />}
              <span className="min-w-0 flex-1 truncate">{t}</span>
              {i === 0 && <Mark n={el.mark} />}
            </li>
          ))}
        </ul>
      );
    case "chips":
      return (
        <div className="flex flex-wrap items-center gap-1.5">
          {el.items.map((t, i) => (
            <span key={i} className={`rounded-xs border px-2 py-0.5 text-xs ${el.active === i ? "border-ink bg-ink text-surface" : "border-rule text-ink-2"}`}>
              {t}
            </span>
          ))}
          <Mark n={el.mark} />
        </div>
      );
    case "metrics":
      return (
        <div className="grid grid-cols-3 gap-1.5">
          {el.items.map((m, i) => (
            <div key={i} className="rounded-xs border border-rule px-2 py-1.5">
              <p className="truncate text-[11px] text-ink-3">{m.label}</p>
              <p className="text-sm font-semibold text-ink">{m.value}</p>
            </div>
          ))}
          {el.mark && (
            <div className="col-span-3">
              <Mark n={el.mark} />
            </div>
          )}
        </div>
      );
    case "progress":
      return (
        <div>
          <div className="flex items-center justify-between text-xs text-ink-2">
            <span>{el.label}</span>
            <span className="flex items-center">
              {el.value}%<Mark n={el.mark} />
            </span>
          </div>
          <div className="mt-1 h-2 rounded-full bg-sunken">
            <div className="h-2 rounded-full bg-accent" style={{ width: `${el.value}%` }} />
          </div>
        </div>
      );
    case "nav":
      return (
        <div className="flex flex-wrap items-center gap-3 border-b border-rule pb-1.5 text-xs">
          {el.items.map((t, i) => (
            <span key={i} className={el.active === i ? "font-semibold text-ink underline decoration-2 underline-offset-4" : "text-ink-2"}>
              {t}
            </span>
          ))}
          <Mark n={el.mark} />
        </div>
      );
    case "divider":
      return <hr className="border-rule" />;
  }
}

export function MockScreen({ mock, label, verdict }: { mock: Mock; label?: string; verdict?: "bad" | "good" | "before" | "after" }) {
  const v =
    verdict === "bad" || verdict === "before"
      ? { cls: "text-error", icon: "✕", text: verdict === "bad" ? "Poor" : "Before" }
      : verdict
        ? { cls: "text-ok", icon: "✓", text: verdict === "good" ? "Better" : "After" }
        : null;
  return (
    <figure className="min-w-0">
      {(label || v) && (
        <figcaption className="mb-2 flex items-center gap-2">
          {v && (
            <span className={`label ${v.cls}`}>
              <span aria-hidden>{v.icon} </span>
              {v.text}
            </span>
          )}
          {label && <span className="text-sm font-medium text-ink">{label}</span>}
        </figcaption>
      )}
      <div aria-hidden="true" className={`overflow-hidden rounded-md border border-rule-strong bg-surface shadow-card ${mock.device === "mobile" ? "mx-auto max-w-[19rem]" : ""}`}>
        <div className="flex items-center gap-1.5 border-b border-rule bg-soft px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-rule-strong" />
          <span className="h-2 w-2 rounded-full bg-rule-strong" />
          <span className="ml-2 truncate font-mono text-[11px] text-ink-3">{mock.title}</span>
        </div>
        <div className="space-y-2.5 p-3">
          {mock.elements.map((el, i) => (
            <Element key={i} el={el} />
          ))}
        </div>
      </div>
      <p className="sr-only">{mock.alt}</p>
      {mock.notes.length > 0 && (
        <ol className="mt-2 space-y-1 text-xs text-ink-2">
          {mock.notes.map((n) => (
            <li key={n.n} className="flex gap-2">
              <span aria-hidden className="mt-px inline-grid h-4 w-4 shrink-0 place-items-center rounded-full bg-ink font-mono text-[10px] font-semibold text-surface">
                {n.n}
              </span>
              <span>
                <span className="sr-only">Note {n.n}: </span>
                {n.text}
              </span>
            </li>
          ))}
        </ol>
      )}
    </figure>
  );
}
