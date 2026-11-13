"use client";

import { useId, useState } from "react";
import { cssVariables, paletteJson, parsePaletteJson, type PaletteState, type Role } from "@/lib/formulas/colour";
import { useLocalString, writeLocal } from "@/lib/store/local";
import { CopyButton, downloadText, useAnnounce } from "./shared";

export const SAVE_KEY = "ux-academy:colour-studio:v1";

export function ExportPanel({ palette, colours, roles, onImport }: { palette: PaletteState; colours: string[]; roles: Record<Role, string>; onImport: (colours: string[], roles: Partial<Record<Role, string>>) => void }) {
  const announce = useAnnounce();
  const id = useId();
  const [format, setFormat] = useState<"css" | "json">("css");
  const [error, setError] = useState("");
  const saved = useLocalString(SAVE_KEY);
  const css = cssVariables(colours, roles);
  const json = paletteJson(palette, roles);
  const out = format === "css" ? css : json;

  const load = (text: string, from: string) => {
    try {
      const p = parsePaletteJson(text);
      onImport(p.colours, p.roles);
      setError("");
      announce(`Loaded ${p.colours.length} colours from ${from}.`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not read the palette.");
    }
  };

  return (
    <section aria-labelledby={`${id}-h`} className="space-y-3">
      <h2 id={`${id}-h`} className="t-sub">
        Export
      </h2>
      <p className="max-w-read text-sm text-ink-2">Generated from the current palette and role assignments. CSS variables name the palette colours by position and the roles by purpose.</p>
      <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Export format">
        <button type="button" aria-pressed={format === "css"} onClick={() => setFormat("css")} className="chip h-9 hover:border-rule-strong hover:text-ink">
          CSS variables
        </button>
        <button type="button" aria-pressed={format === "json"} onClick={() => setFormat("json")} className="chip h-9 hover:border-rule-strong hover:text-ink">
          JSON
        </button>
        <span className="ml-auto flex flex-wrap gap-1.5">
          <CopyButton text={out} what={format === "css" ? "CSS variables" : "palette JSON"} label="Copy" />
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => downloadText(format === "css" ? "palette.css" : "palette.json", out, format === "css" ? "text/css" : "application/json")}>
            Download
          </button>
        </span>
      </div>
      <pre tabIndex={0} aria-label={format === "css" ? "CSS variables" : "Palette JSON"} className="formula max-h-72 overflow-auto rounded-md border border-rule bg-soft p-4 text-xs leading-relaxed text-ink">
        <code>{out}</code>
      </pre>
      <div className="flex flex-wrap items-center gap-2 border-t border-rule pt-3">
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => {
            writeLocal(SAVE_KEY, json);
            announce("Palette saved in this browser.");
          }}
        >
          Save in this browser
        </button>
        <button type="button" className="btn btn-tertiary btn-sm" disabled={!saved} onClick={() => saved && load(saved, "this browser")}>
          Restore saved palette
        </button>
        <label className="btn btn-tertiary btn-sm cursor-pointer focus-within:outline focus-within:outline-2 focus-within:outline-[var(--accent)]">
          Import JSON…
          <input
            type="file"
            accept="application/json,.json"
            className="sr-only"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              e.target.value = "";
              if (!f) return;
              if (f.size > 200_000) return setError("That file is too large to be a palette.");
              load(await f.text(), f.name);
            }}
          />
        </label>
        <span className="text-xs text-ink-3">Saved palettes stay on this device; nothing is uploaded.</span>
      </div>
      {error && (
        <p role="alert" className="text-sm text-error">
          <span aria-hidden>⚠ </span>
          {error}
        </p>
      )}
    </section>
  );
}
