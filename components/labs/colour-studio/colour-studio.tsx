"use client";

/**
 * Colour Studio: palette generation, contrast, image extraction and
 * gradients in one lab. State lives here; every calculation is in
 * lib/formulas/colour (and the reused WCAG maths in lib/formulas/visual).
 */
import { useCallback, useRef, useState, type KeyboardEvent } from "react";
import { DEFAULT_PALETTE, ROLES, paletteColours, type PaletteState, type Role } from "@/lib/formulas/colour";
import { ContrastPanel } from "./contrast-panel";
import { ExportPanel } from "./export-panel";
import { DEFAULT_GRADIENT, GradientPanel, type GradientState } from "./gradient-panel";
import { ImagePanel } from "./image-panel";
import { DEFAULT_ROLES, InterfacePreview, NEUTRALS, resolveRoles, type RoleMap } from "./interface-preview";
import { PalettePanel } from "./palette-panel";
import { AnnounceContext } from "./shared";

const TABS = [
  { id: "palette", label: "Palette Studio", hint: "Wheel, harmonies, preview, export" },
  { id: "contrast", label: "Colour Contrast", hint: "WCAG 2.2 ratios" },
  { id: "image", label: "Image Extraction", hint: "Palette from a photo" },
  { id: "gradient", label: "Gradient Studio", hint: "Linear gradients and CSS" },
] as const;
type Tab = (typeof TABS)[number]["id"];

export function ColourStudio() {
  const [tab, setTab] = useState<Tab>("palette");
  const [palette, setPalette] = useState<PaletteState>(DEFAULT_PALETTE);
  const [roles, setRoles] = useState<RoleMap>(DEFAULT_ROLES);
  const [fg, setFg] = useState("#1c1b19");
  const [bg, setBg] = useState("#f6f5f2");
  const [gradient, setGradient] = useState<GradientState>(DEFAULT_GRADIENT);
  const [message, setMessage] = useState("");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const announce = useCallback((m: string) => setMessage((prev) => (prev === m ? `${m} ` : m)), []);

  const colours = paletteColours(palette);
  const resolved = resolveRoles(roles, colours);

  const applyColours = (cs: string[], importedRoles: Partial<Record<Role, string>> = {}) => {
    setPalette({ ...palette, custom: cs, overrides: {} });
    // map imported role colours back onto palette positions or neutrals; anything else keeps its current role
    const next = { ...roles };
    for (const r of ROLES) {
      const hex = importedRoles[r];
      if (!hex) continue;
      const i = cs.indexOf(hex);
      if (i >= 0) next[r] = `p${i}`;
      else if (NEUTRALS.some((n) => n.hex === hex)) next[r] = hex;
    }
    setRoles(next);
    setTab("palette");
  };

  const onKey = (e: KeyboardEvent, i: number) => {
    const to = e.key === "ArrowRight" ? (i + 1) % TABS.length : e.key === "ArrowLeft" ? (i - 1 + TABS.length) % TABS.length : e.key === "Home" ? 0 : e.key === "End" ? TABS.length - 1 : -1;
    if (to < 0) return;
    e.preventDefault();
    setTab(TABS[to].id);
    tabs.current[to]?.focus();
  };

  return (
    <AnnounceContext.Provider value={announce}>
      <div className="space-y-6">
        <div role="tablist" aria-label="Colour Studio tools" className="grid grid-cols-2 gap-1 border-b border-rule sm:flex sm:flex-wrap sm:gap-x-2">
          {TABS.map((t, i) => {
            const on = t.id === tab;
            return (
              <button
                key={t.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`cs-tab-${t.id}`}
                aria-selected={on}
                aria-controls={`cs-panel-${t.id}`}
                tabIndex={on ? 0 : -1}
                onClick={() => setTab(t.id)}
                onKeyDown={(e) => onKey(e, i)}
                className={`-mb-px min-h-11 border-b-2 px-3 pb-2 pt-1.5 text-left ${on ? "border-accent text-ink" : "border-transparent text-ink-3 hover:text-ink-2"}`}
              >
                <span className="block text-sm font-semibold">{t.label}</span>
                <span className="block text-xs">{t.hint}</span>
              </button>
            );
          })}
        </div>

        <div role="tabpanel" id="cs-panel-palette" aria-labelledby="cs-tab-palette" hidden={tab !== "palette"} className="space-y-10">
          <PalettePanel palette={palette} setPalette={setPalette} />
          <InterfacePreview colours={colours} roles={roles} setRoles={setRoles} />
          <ExportPanel palette={palette} colours={colours} roles={resolved} onImport={applyColours} />
        </div>
        <div role="tabpanel" id="cs-panel-contrast" aria-labelledby="cs-tab-contrast" hidden={tab !== "contrast"}>
          <ContrastPanel fg={fg} bg={bg} setFg={setFg} setBg={setBg} colours={colours} />
        </div>
        <div role="tabpanel" id="cs-panel-image" aria-labelledby="cs-tab-image" hidden={tab !== "image"}>
          <ImagePanel onUse={(cs) => applyColours(cs)} />
        </div>
        <div role="tabpanel" id="cs-panel-gradient" aria-labelledby="cs-tab-gradient" hidden={tab !== "gradient"}>
          <GradientPanel gradient={gradient} setGradient={setGradient} colours={colours} />
        </div>

        <p role="status" aria-live="polite" className="sr-only">
          {message}
        </p>
      </div>
    </AnnounceContext.Provider>
  );
}
