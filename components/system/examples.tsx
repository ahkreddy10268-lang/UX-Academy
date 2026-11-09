/**
 * Live examples for the design-system documentation (D-099). Each renders the
 * real tokens and components, so the documentation cannot drift from the
 * implementation without the difference being visible. Server components.
 */
import type { ReactNode } from "react";
import { Callout, type CalloutRole } from "@/components/ui/callout";
import { CoverageBar } from "@/components/ui/coverage-bar";
import { DefinitionTable } from "@/components/ui/doc-layout";
import { Breadcrumbs } from "@/components/ui/layout";
import { DifficultyMark, EvidenceMark, TypeMark } from "@/components/ui/marks";
import { Icon, type IconName } from "@/components/shell/icons";

function Panel({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className="rounded-md border border-rule bg-surface p-4">
      {label && <p className="label mb-3">{label}</p>}
      {children}
    </div>
  );
}

const swatch = (name: string, note?: string) => (
  <li key={name} className="flex items-center gap-3">
    <span aria-hidden className="h-9 w-9 shrink-0 rounded-sm border border-rule" style={{ background: `var(--${name})` }} />
    <span className="min-w-0">
      <span className="block font-mono text-xs text-ink">--{name}</span>
      {note && <span className="block text-xs text-ink-3">{note}</span>}
    </span>
  </li>
);

const EXAMPLES: Record<string, () => ReactNode> = {
  colour: () => (
    <div className="grid gap-3 md:grid-cols-2">
      <Panel label="Neutrals">
        <ul className="grid gap-2 sm:grid-cols-2">{[["paper", "canvas"], ["surface", "workspace"], ["soft", "quiet panel"], ["sunken", "wells"], ["ink", "text"], ["ink-2", "secondary"], ["ink-3", "metadata"], ["line-control", "control border"]].map(([n, d]) => swatch(n, d))}</ul>
      </Panel>
      <Panel label="Accent and semantic">
        <ul className="grid gap-2 sm:grid-cols-2">{[["accent", "links, focus"], ["accent-wash", "selection"], ["ok", "success"], ["warn", "caution"], ["info", "information"], ["error", "error"], ["evidence", "evidence"], ["rubric", "editorial"]].map(([n, d]) => swatch(n, d))}</ul>
      </Panel>
      <Panel label="Subject colours (identity only)">
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">{["core", "rose", "violet", "teal", "blue", "amber", "green", "peach", "cyan", "indigo", "slate"].map((c) => swatch(`cat-${c}`))}</ul>
      </Panel>
    </div>
  ),
  type: () => (
    <Panel>
      <div className="space-y-4">
        <p className="t-editorial text-[2.6rem]">Concept title</p>
        <p className="t-page text-[2rem]">Page title</p>
        <p className="t-section text-[1.5rem]">Section heading</p>
        <p className="t-sub text-lg">Subheading</p>
        <p className="t-lede text-lg">Lede: introduces a page in one or two sentences.</p>
        <p className="text-base text-ink">Body text at 16 px for interface reading.</p>
        <p className="prose-read">Long-form reading in Newsreader at 18 px, kept within about seventy characters per line.</p>
        <p className="label">Label · metadata · kicker</p>
        <p className="formula text-base">ID = log₂(D/W + 1)</p>
      </div>
    </Panel>
  ),
  spacing: () => (
    <Panel label="Spacing scale (Tailwind steps of 4 px)">
      <ul className="space-y-1.5">
        {[1, 2, 3, 4, 6, 8, 10, 14, 16].map((n) => (
          <li key={n} className="flex items-center gap-3 text-xs text-ink-2">
            <span className="w-14 font-mono">{n * 4} px</span>
            <span aria-hidden className="h-3 rounded-xs bg-ink" style={{ width: n * 4 }} />
          </li>
        ))}
      </ul>
    </Panel>
  ),
  shape: () => (
    <div className="grid gap-3 sm:grid-cols-2">
      <Panel label="Radii">
        <ul className="flex flex-wrap gap-3">
          {["xs", "sm", "md", "lg", "xl", "2xl"].map((r) => (
            <li key={r} className="text-center text-xs text-ink-2">
              <span aria-hidden className="block h-12 w-12 border border-ink-3 bg-soft" style={{ borderRadius: `var(--radius-${r})` }} />
              {r}
            </li>
          ))}
        </ul>
      </Panel>
      <Panel label="Elevation">
        <ul className="grid grid-cols-2 gap-3">
          {["card", "hover", "raise", "dialog"].map((s) => (
            <li key={s} className="rounded-md bg-surface p-3 text-xs text-ink-2" style={{ boxShadow: `var(--shadow-${s})` }}>
              shadow-{s}
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  ),
  icons: () => (
    <Panel label="Icon family · 20 px grid · 1.5 stroke">
      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {(["home", "learn", "library", "ai", "practice", "labs", "formula", "layers", "sources", "glossary", "compare", "grid", "graph", "me", "search", "bookmark", "check", "clock"] as IconName[]).map((n) => (
          <li key={n} className="flex flex-col items-center gap-1.5 rounded-sm border border-rule p-2 text-[11px] text-ink-2">
            <Icon name={n} />
            {n}
          </li>
        ))}
      </ul>
    </Panel>
  ),
  buttons: () => (
    <div className="space-y-3">
      <Panel label="Variants">
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="btn btn-primary">Primary</button>
          <button type="button" className="btn btn-secondary">Secondary</button>
          <button type="button" className="btn btn-tertiary">Tertiary</button>
          <button type="button" className="btn btn-text">Text button</button>
          <button type="button" className="btn btn-secondary btn-icon" aria-label="Search">
            <Icon name="search" />
          </button>
        </div>
      </Panel>
      <Panel label="Sizes">
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="btn btn-primary btn-sm">Small · 32</button>
          <button type="button" className="btn btn-primary">Default · 40</button>
          <button type="button" className="btn btn-primary btn-lg">Large · 48</button>
        </div>
      </Panel>
      <Panel label="States">
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="btn btn-secondary" aria-pressed="true">Pressed</button>
          <button type="button" className="btn btn-primary" disabled>Disabled</button>
          <button type="button" className="btn btn-primary" aria-busy="true">Saving</button>
        </div>
        <p className="mt-3 text-xs text-ink-3">Hover and focus these buttons to see their states; press Tab to see the focus outline.</p>
      </Panel>
    </div>
  ),
  fields: () => (
    <Panel>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ex-name" className="field-label">Study group name</label>
          <span id="ex-name-hint" className="field-hint">Shown to other members.</span>
          <input id="ex-name" className="field mt-1.5" aria-describedby="ex-name-hint" defaultValue="Thesis group" />
        </div>
        <div>
          <label htmlFor="ex-w" className="field-label">Target width W</label>
          <input id="ex-w" className="field mt-1.5" aria-invalid="true" aria-describedby="ex-w-err" defaultValue="0" />
          <span id="ex-w-err" className="mt-1 block text-xs text-error">Width W must be greater than 0.</span>
        </div>
        <div>
          <label htmlFor="ex-level" className="field-label">Level</label>
          <select id="ex-level" className="field mt-1.5" defaultValue="intermediate">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div>
          <label htmlFor="ex-note" className="field-label">Note</label>
          <textarea id="ex-note" className="field mt-1.5" rows={2} defaultValue="Fitts: bigger, nearer targets." />
        </div>
      </div>
    </Panel>
  ),
  cards: () => (
    <div className="grid gap-3 sm:grid-cols-2">
      <a href="#cards" className="card cat-teal block p-4">
        <span className="subject-tag">Laws</span>
        <span className="t-sub mt-2 block text-ink">Concept card</span>
        <span className="mt-1 block text-sm text-ink-2">A title, two lines of description and the evidence and difficulty marks.</span>
        <span className="mt-3 flex gap-3 border-t border-rule pt-3 text-xs">
          <EvidenceMark evidence="original-empirical" />
          <DifficultyMark level="beginner" />
        </span>
      </a>
      <a href="#cards" className="card block p-4">
        <span className="t-sub block text-ink">Pattern card</span>
        <span className="mt-1 block text-sm text-ink-2">Hover to see the border strengthen; the card never moves.</span>
      </a>
    </div>
  ),
  tags: () => (
    <Panel>
      <div className="flex flex-wrap items-center gap-3">
        <span className="cat-violet subject-tag">Psychology</span>
        <span className="cat-amber subject-tag">Accessibility</span>
        <TypeMark type="law" />
        <EvidenceMark evidence="peer-reviewed" />
        <DifficultyMark level="advanced" />
        <button type="button" className="chip" aria-pressed="true">Published</button>
        <button type="button" className="chip" aria-pressed="false">Planned</button>
      </div>
    </Panel>
  ),
  callouts: () => (
    <div className="grid gap-3 md:grid-cols-2">
      {(["analogy", "example", "research", "limitation"] as CalloutRole[]).map((r) => (
        <Callout key={r} role={r}>
          <p className="text-sm">A {r} callout marks a moment the reader should notice.</p>
        </Callout>
      ))}
    </div>
  ),
  navigation: () => (
    <Panel label="Breadcrumbs">
      <Breadcrumbs items={[{ href: "/library", label: "Library" }, { href: "/topics/laws-effects", label: "Laws" }, { label: "Fitts's law" }]} />
    </Panel>
  ),
  table: () => <DefinitionTable head={["Part", "Role"]} rows={[["Label", "Says what to enter."], ["Hint", "Optional guidance."], ["Error", "What to fix."]]} />,
  progress: () => (
    <Panel>
      <CoverageBar published={52} total={558} label="Topics with a published entry (example values)" />
    </Panel>
  ),
};

export function SystemExample({ id }: { id: string }) {
  const E = EXAMPLES[id];
  return E ? <E /> : null;
}
export const hasSystemExample = (id?: string) => Boolean(id && EXAMPLES[id]);
