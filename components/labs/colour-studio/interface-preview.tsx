"use client";

import Link from "next/link";
import { useId } from "react";
import { ROLES, ROLE_LABEL, contrastReport, type Role } from "@/lib/formulas/colour";
import { contrastRatio } from "@/lib/formulas/visual";
import { Chip, Note } from "./shared";

/** Neutrals offered beside the palette: most interfaces need them, and harmonies rarely produce them. */
export const NEUTRALS: { hex: string; name: string }[] = [
  { hex: "#ffffff", name: "White" },
  { hex: "#f6f5f2", name: "Off-white" },
  { hex: "#d9d6cf", name: "Light grey" },
  { hex: "#5b5852", name: "Dark grey" },
  { hex: "#1c1b19", name: "Near-black" },
];

/** A role points at a palette colour ("p2") or a neutral hex. "auto" (text on primary only) picks the stronger of white and near-black. */
export type RoleSource = string;
export type RoleMap = Record<Role, RoleSource>;

export const DEFAULT_ROLES: RoleMap = { primary: "p0", "on-primary": "auto", secondary: "p1", accent: "p2", background: "#f6f5f2", surface: "#ffffff", heading: "#1c1b19", text: "#5b5852" };

export function resolveRoles(roles: RoleMap, colours: string[]): Record<Role, string> {
  const pick = (src: string) => (src.startsWith("p") ? colours[Math.min(Number(src.slice(1)), colours.length - 1)] : src);
  const out = {} as Record<Role, string>;
  for (const r of ROLES) if (r !== "on-primary") out[r] = pick(roles[r]);
  const primary = out.primary;
  out["on-primary"] = roles["on-primary"] === "auto" ? (contrastRatio("#ffffff", primary) >= contrastRatio("#1c1b19", primary) ? "#ffffff" : "#1c1b19") : pick(roles["on-primary"]);
  return out;
}

/** Each check names the criterion that applies to how the pair is used in the preview. */
function roleChecks(c: Record<Role, string>) {
  const t = (fg: string, bg: string) => contrastReport(fg, bg);
  return [
    { name: "Body text on surface (16 px)", r: t(c.text, c.surface), id: "text-aa", need: "4.5:1 · normal text, 1.4.3" },
    { name: "Heading on page background (24 px, large text)", r: t(c.heading, c.background), id: "large-aa", need: "3:1 · large text, 1.4.3" },
    { name: "Button label on primary (15 px)", r: t(c["on-primary"], c.primary), id: "text-aa", need: "4.5:1 · normal text, 1.4.3" },
    { name: "Primary button against surface", r: t(c.primary, c.surface), id: "non-text-aa", need: "3:1 · component boundary, 1.4.11" },
    { name: "Secondary button outline against surface", r: t(c.secondary, c.surface), id: "non-text-aa", need: "3:1 · component boundary, 1.4.11" },
    { name: "Accent progress bar against its track", r: t(c.accent, c.surface), id: "non-text-aa", need: "3:1 · graphical object, 1.4.11" },
  ].map((x) => ({ ...x, pass: x.r.checks.find((k) => k.id === x.id)!.pass }));
}

function RoleSelect({ role, value, colours, onChange }: { role: Role; value: RoleSource; colours: string[]; onChange: (v: RoleSource) => void }) {
  const id = useId();
  const current = resolveRoles({ ...DEFAULT_ROLES, [role]: value }, colours)[role];
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {ROLE_LABEL[role]}
      </label>
      <div className="mt-1 flex items-center gap-2">
        <Chip hex={current} />
        <select id={id} className="field h-9 min-w-0 flex-1" value={value} onChange={(e) => onChange(e.target.value)}>
          {role === "on-primary" && <option value="auto">Automatic (stronger of white / near-black)</option>}
          <optgroup label="Palette">
            {colours.map((c, i) => (
              <option key={i} value={`p${i}`}>
                {c} · colour {i + 1}
              </option>
            ))}
          </optgroup>
          <optgroup label="Neutrals">
            {NEUTRALS.map((n) => (
              <option key={n.hex} value={n.hex}>
                {n.hex} · {n.name}
              </option>
            ))}
          </optgroup>
        </select>
      </div>
    </div>
  );
}

export function InterfacePreview({ colours, roles, setRoles }: { colours: string[]; roles: RoleMap; setRoles: (r: RoleMap) => void }) {
  const c = resolveRoles(roles, colours);
  const checks = roleChecks(c);
  const failing = checks.filter((x) => !x.pass).length;
  return (
    <section aria-labelledby="cs-preview" className="space-y-5">
      <div>
        <h2 id="cs-preview" className="t-sub">
          Preview in an interface
        </h2>
        <p className="mt-1 max-w-read text-sm text-ink-2">Assign colours to roles and see them do a job. A palette can look balanced as swatches and still fail as an interface: text needs contrast with what it sits on, controls need to stand out from their surroundings, and most screens are mostly neutrals.</p>
      </div>
      <div className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {ROLES.map((r) => (
            <RoleSelect key={r} role={r} value={roles[r]} colours={colours} onChange={(v) => setRoles({ ...roles, [r]: v })} />
          ))}
        </div>
        <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {/* the preview: colours come only from the assigned roles */}
          <div className="overflow-hidden rounded-lg border border-rule-strong shadow-card" style={{ background: c.background }} role="img" aria-label={`Interface preview using the assigned roles: page background ${c.background}, surface ${c.surface}, primary ${c.primary}, secondary ${c.secondary}, accent ${c.accent}, heading ${c.heading}, body text ${c.text}.`}>
            <div className="flex items-center justify-between gap-3 px-4 py-3" style={{ background: c.primary, color: c["on-primary"] }}>
              <span className="text-sm font-semibold">Studio Library</span>
              <span className="text-xs" style={{ opacity: 1 }}>
                Signed in
              </span>
            </div>
            <div className="space-y-4 p-4 sm:p-5">
              <p className="text-2xl font-semibold" style={{ color: c.heading }}>
                Your loans
              </p>
              <div className="rounded-md p-4" style={{ background: c.surface, border: `1px solid ${c.secondary}` }}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-base font-semibold" style={{ color: c.heading }}>
                    The Design of Everyday Things
                  </p>
                  <span className="rounded-xs px-2 py-0.5 text-xs font-semibold" style={{ border: `1.5px solid ${c.accent}`, color: c.heading }}>
                    ★ New
                  </span>
                </div>
                <p className="mt-1 text-base" style={{ color: c.text }}>
                  Due back on 14 March. You can renew it twice more.
                </p>
                <div className="mt-3 h-2 rounded-full" style={{ background: c.background }} aria-hidden>
                  <div className="h-2 w-2/3 rounded-full" style={{ background: c.accent }} />
                </div>
                <p className="mt-1 text-xs" style={{ color: c.text }}>
                  ✓ 2 of 3 renewals left
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex h-9 items-center rounded-md px-4 text-[15px] font-semibold" style={{ background: c.primary, color: c["on-primary"] }}>
                    Renew
                  </span>
                  <span className="inline-flex h-9 items-center rounded-md px-4 text-[15px] font-semibold" style={{ border: `1.5px solid ${c.secondary}`, color: c.heading, background: c.surface }}>
                    Return
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="label">How these roles hold up · {failing === 0 ? "every pair shown meets its criterion" : `${failing} of ${checks.length} pairs below their criterion`}</p>
            <ul className="mt-2 divide-y divide-rule rounded-md border border-rule bg-surface text-sm">
              {checks.map((x) => (
                <li key={x.name} className="grid grid-cols-[4.25rem_minmax(0,1fr)_auto] items-baseline gap-x-3 px-3 py-2">
                  <span className={`font-semibold ${x.pass ? "text-ok" : "text-error"}`}>
                    <span aria-hidden>{x.pass ? "✓ " : "✕ "}</span>
                    {x.pass ? "Meets" : "Below"}
                  </span>
                  <span className="min-w-0 text-ink">
                    {x.name}
                    <span className="block text-xs text-ink-3">needs {x.need}</span>
                  </span>
                  <span className="formula text-ink-2">{x.r.display}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Note title="Beautiful palette, usable system">
        <p>
          Harmony is about how colours relate to each other; usability is about whether each colour can do its job where it is used. Assign roles first, then adjust lightness until every pair passes — that is how{" "}
          <Link className="link" href="/library/semantic-tokens">
            semantic tokens
          </Link>{" "}
          work in a design system. These checks cover only the pairs in this preview: passing them does not make a whole product accessible.
        </p>
      </Note>
    </section>
  );
}
