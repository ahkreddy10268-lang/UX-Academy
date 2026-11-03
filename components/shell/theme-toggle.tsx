"use client";

import { useLocalString, writeLocal } from "@/lib/store/local";
import { Icon } from "./icons";

type Theme = "system" | "light" | "dark";
const KEY = "ux-academy:theme";
const ORDER: Theme[] = ["system", "light", "dark"];
const LABEL: Record<Theme, string> = { system: "Auto", light: "Light", dark: "Dark" };
const ICON = { system: "auto", light: "sun", dark: "moon" } as const;

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
      className="inline-flex h-10 items-center gap-2 rounded-sm px-2.5 text-sm font-medium text-ink-2 hover:bg-sunken hover:text-ink"
      aria-label={`Theme: ${LABEL[theme]}. Activate to change.`}
      title="Change theme (Auto → Light → Dark)"
    >
      <Icon name={ICON[theme]} />
      <span className="hidden md:inline">{LABEL[theme]}</span>
    </button>
  );
}
