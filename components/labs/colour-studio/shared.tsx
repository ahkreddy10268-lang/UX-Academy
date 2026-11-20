"use client";

/**
 * Shared Colour Studio pieces: one polite announcer for the whole studio,
 * copy and download helpers, and a validated colour field (native picker +
 * hex input). Invalid text never reaches the palette: the field keeps its
 * own draft and only reports a colour once it parses.
 */
import { createContext, useContext, useId, useState, type ReactNode } from "react";
import { normaliseHex } from "@/lib/formulas/colour";

export const AnnounceContext = createContext<(message: string) => void>(() => {});
export const useAnnounce = () => useContext(AnnounceContext);

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function downloadText(filename: string, text: string, type: string) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

export function CopyButton({ text, label, what, className = "btn btn-secondary btn-sm" }: { text: string; label: ReactNode; what: string; className?: string }) {
  const announce = useAnnounce();
  return (
    <button type="button" className={className} onClick={async () => announce((await copyText(text)) ? `Copied ${what}.` : `Copy is not available here; select the text instead.`)}>
      {label}
    </button>
  );
}

/**
 * A colour input: native picker plus a hex text field. `onChange` receives a
 * normalised #rrggbb only when the text is valid; invalid text shows an error
 * and leaves the committed colour unchanged.
 */
export function ColourField({ label, value, onChange, hint, compact = false }: { label: string; value: string; onChange: (hex: string) => void; hint?: string; compact?: boolean }) {
  const id = useId();
  const [draft, setDraft] = useState<string | null>(null);
  const text = draft ?? value;
  const check = draft === null ? null : normaliseHex(draft);
  const error = check && !check.ok ? check.error : null;
  const describedBy = [hint ? `${id}-hint` : "", error ? `${id}-err` : ""].filter(Boolean).join(" ") || undefined;
  return (
    <div className="min-w-0">
      <label htmlFor={`${id}-hex`} className={compact ? "sr-only" : "field-label"}>
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="field-hint">
          {hint}
        </p>
      )}
      <div className={`mt-1 flex gap-2 ${compact ? "flex-col-reverse" : ""}`}>
        <input
          type="color"
          aria-label={`${label}: colour picker`}
          value={value}
          onChange={(e) => {
            setDraft(null);
            onChange(e.target.value.toLowerCase());
          }}
          className={`${compact ? "h-7 w-full" : "h-10 w-12"} shrink-0 cursor-pointer rounded-xs border border-line-control bg-surface p-0.5`}
        />
        <input
          id={`${id}-hex`}
          className="field formula min-w-0 flex-1"
          value={text}
          spellCheck={false}
          autoComplete="off"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onChange={(e) => {
            const v = e.target.value;
            setDraft(v);
            const n = normaliseHex(v);
            if (n.ok && /^#?[0-9a-f]{6}$/i.test(v.trim())) onChange(n.hex);
          }}
          onBlur={() => {
            if (draft === null) return;
            const n = normaliseHex(draft);
            if (n.ok) {
              onChange(n.hex);
              setDraft(null);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && draft !== null) {
              const n = normaliseHex(draft);
              if (n.ok) {
                onChange(n.hex);
                setDraft(null);
              }
            }
            if (e.key === "Escape") setDraft(null);
          }}
        />
      </div>
      {error && (
        <p id={`${id}-err`} className="mt-1 text-sm text-error">
          <span aria-hidden>⚠ </span>
          {error} The previous colour is kept.
        </p>
      )}
    </div>
  );
}

/** A small swatch with an accessible name. Colour is never the only information: the hex is always shown alongside. */
export function Chip({ hex, size = "h-6 w-6" }: { hex: string; size?: string }) {
  return <span aria-hidden className={`inline-block shrink-0 rounded-xs border border-rule-strong ${size}`} style={{ background: hex }} />;
}

/** Short teaching note shown beside a control. */
export function Note({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div role="note" aria-label={title} className="rounded-md border border-rule bg-soft p-4 text-sm leading-relaxed text-ink-2">
      <p className="label mb-1">{title}</p>
      {children}
    </div>
  );
}
