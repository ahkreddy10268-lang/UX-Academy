"use client";

import { useLocalString, writeLocal } from "@/lib/store/local";

type Theme = "system" | "light" | "dark";
const KEY = "ux-academy:theme";
const ORDER: Theme[] = ["system", "light", "dark"];
const LABEL: Record<Theme, string> = { system: "Auto", light: "Light", dark: "Dark" };

export function ThemeToggle() {
  const stored = useLocalString(KEY);
  const theme: Theme = stored === "light" || stored === "dark" ? stored : "system";

  function cycle() {
    const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length];
    if (next === "system") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", next);
    writeLocal(KEY, next === "system" ? null : next);
  }

  return (
    <button
      type="button"
      onClick={cycle}
      className="inline-flex h-9 items-center gap-2 rounded-sm px-3 text-sm font-medium text-ink-2 hover:bg-sunken hover:text-ink"
      aria-label={`Theme: ${LABEL[theme]}. Activate to change.`}
      title="Change theme"
    >
      <ThemeGlyph theme={theme} />
      <span className="hidden sm:inline">{LABEL[theme]}</span>
    </button>
  );
}

function ThemeGlyph({ theme }: { theme: Theme }) {
  // A disc: outline = light, filled = dark, half-filled = follow the system.
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {theme === "dark" && <circle cx="8" cy="8" r="6.25" fill="currentColor" />}
      {theme === "system" && <path d="M8 1.75a6.25 6.25 0 0 1 0 12.5z" fill="currentColor" />}
    </svg>
  );
}
