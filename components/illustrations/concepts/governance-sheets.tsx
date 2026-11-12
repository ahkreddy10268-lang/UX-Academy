/**
 * Stage 5 plates, Batch 7 (session 37): design governance, versioning, design
 * QA, audits and multi-brand systems. Version numbers, adoption rates and
 * contrast ratios are computed with lib/formulas.
 */
import { adoptionRate, bumpVersion, releaseBump, type Bump } from "../../../lib/formulas/components";
import { contrastRatio } from "../../../lib/formulas/visual";
import type { IllustrationEntry } from "../illustration-types";
import { Marker, S, T, UiText, Verdict } from "../system/sheet";
import { BRAND_SAMPLES, Link, TOKEN_SAMPLES } from "./learning-sheets";

const hair = { vectorEffect: "non-scaling-stroke" as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const SANS = "var(--font-plex-sans), sans-serif";

function Box({ x, y, w, h, fill = S.surface, stroke = S.ruleStrong, dashed = false, rx = 6 }: { x: number; y: number; w: number; h: number; fill?: string; stroke?: string; dashed?: boolean; rx?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke={stroke} strokeWidth="1" strokeDasharray={dashed ? "4 3" : undefined} {...hair} />;
}
function Pill({ x, y, w, label, tone = "ink" }: { x: number; y: number; w: number; label: string; tone?: "ink" | "accent" | "ok" | "error" }) {
  const fill = tone === "accent" ? S.accentWash : tone === "ok" ? S.okWash : tone === "error" ? S.errorWash : S.surface;
  const stroke = tone === "accent" ? S.accent : tone === "ok" ? S.ok : tone === "error" ? S.error : S.ink2;
  return (
    <g>
      <Box x={x} y={y} w={w} h={26} rx={13} fill={fill} stroke={stroke} />
      <UiText x={x + w / 2} y={y + 18} mono weight={600} anchor="middle">
        {label}
      </UiText>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Design governance                                                    */
/* ------------------------------------------------------------------ */
const CRITERIA = ["useful", "unique", "usable", "consistent", "versatile"] as const;

export const designGovernancePlate: IllustrationEntry = {
  slug: "design-governance",
  title: "Design governance plate",
  canvas: "sheet",
  description:
    "Top row, a contribution path from left to right: propose (a discussion with evidence of user needs), review against five criteria — useful, unique, usable, consistent, versatile — and develop with the core team. Middle row, the lifecycle a component then follows: trial, stable after six months without negative feedback, deprecated with a warning in a minor release, and removed only in a major. Bottom row, three ownership models drawn as nodes: centralised (one core team building everything), federated (teams contributing to each other) and hybrid (a core team at the centre reviewing contributions from every team).",
  key: [
    { n: "1", label: "Propose with evidence", detail: "anyone can propose; check for duplicates first" },
    { n: "2", label: "Explicit criteria", detail: "useful, unique, usable, consistent, versatile (GOV.UK)" },
    { n: "3", label: "Lifecycle statuses", detail: "trial → stable → deprecated (minor) → removed (major)" },
    { n: "4", label: "Ownership model", detail: "centralised, federated or hybrid decision rights" },
  ],
  Art: ({ detail }) => {
    return (
      <g>
        <Box x={8} y={14} w={96} h={40} fill={S.soft} />
        <UiText x={56} y={39} anchor="middle" weight={600}>
          propose
        </UiText>
        <Link from={[104, 34]} to={[120, 34]} />
        <Box x={122} y={14} w={168} h={40} />
        {CRITERIA.map((c, i) => (
          <rect key={c} x={130 + i * 31} y={24} width={26} height={20} rx={4} fill={S.okWash} stroke={S.ok} strokeWidth="0.8" {...hair} />
        ))}
        {CRITERIA.map((c, i) => (
          <UiText key={`${c}-t`} x={143 + i * 31} y={39} mono anchor="middle">
            {c[0].toUpperCase()}
          </UiText>
        ))}
        <Link from={[290, 34]} to={[306, 34]} />
        <Box x={308} y={14} w={84} h={40} fill={S.soft} />
        <UiText x={350} y={39} anchor="middle" weight={600}>
          develop
        </UiText>
        <UiText x={8} y={74} tone="ink3">
          useful · unique · usable · consistent · versatile
        </UiText>
        <line x1={8} y1={86} x2={392} y2={86} stroke={S.rule} strokeWidth="0.9" {...hair} />
        {/* lifecycle */}
        <Pill x={8} y={102} w={72} label="trial" tone="accent" />
        <Pill x={110} y={102} w={80} label="stable" tone="ok" />
        <Pill x={220} y={102} w={96} label="deprecated" />
        <Pill x={340} y={102} w={52} label="✕" tone="error" />
        <Link from={[80, 115]} to={[108, 115]} />
        <Link from={[190, 115]} to={[218, 115]} />
        <Link from={[316, 115]} to={[338, 115]} />
        <UiText x={94} y={148} mono tone="ink3" anchor="middle">
          6 months
        </UiText>
        <UiText x={268} y={148} mono tone="ink3" anchor="middle">
          minor
        </UiText>
        <UiText x={366} y={148} mono tone="ink3" anchor="middle">
          major
        </UiText>
        <line x1={8} y1={164} x2={392} y2={164} stroke={S.rule} strokeWidth="0.9" {...hair} />
        {/* models */}
        {[
          { x: 70, label: "centralised" },
          { x: 200, label: "federated" },
          { x: 330, label: "hybrid" },
        ].map((m, mi) => {
          const cy = 222;
          const pts = [0, 1, 2, 3, 4].map((i) => {
            const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
            return [m.x + Math.cos(a) * 34, cy + Math.sin(a) * 34] as [number, number];
          });
          return (
            <g key={m.label}>
              {mi !== 1 && <circle cx={m.x} cy={cy} r={11} fill={mi === 0 ? S.ink : S.accentWash} stroke={S.ink2} strokeWidth="1" {...hair} />}
              {pts.map(([px, py], i) => (
                <g key={i}>
                  {mi === 0 && <line x1={m.x} y1={cy} x2={px} y2={py} stroke={S.ink3} strokeWidth="0.9" {...hair} />}
                  {mi === 1 && <line x1={px} y1={py} x2={pts[(i + 1) % 5][0]} y2={pts[(i + 1) % 5][1]} stroke={S.ink3} strokeWidth="0.9" {...hair} />}
                  {mi === 2 && <line x1={m.x} y1={cy} x2={px} y2={py} stroke={S.accent} strokeWidth="0.9" strokeDasharray="3 2" {...hair} />}
                  <circle cx={px} cy={py} r={6} fill={S.surface} stroke={S.ink2} strokeWidth="1" {...hair} />
                </g>
              ))}
              <UiText x={m.x} y={284} mono anchor="middle">
                {m.label}
              </UiText>
            </g>
          );
        })}
        {detail && (
          <>
            <Marker x={8} y={10} n={1} />
            <Marker x={290} y={10} n={2} />
            <Marker x={8} y={98} n={3} />
            <Marker x={392} y={180} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Design system versioning                                             */
/* ------------------------------------------------------------------ */
const BASE_VERSION = "3.4.2";
const CHANGES: { label: string; bump: Bump }[] = [
  { label: "fix focus ring", bump: "patch" },
  { label: "add startIcon slot", bump: "minor" },
  { label: "fix RTL padding", bump: "patch" },
];

export const designSystemVersioningPlate: IllustrationEntry = {
  slug: "design-system-versioning",
  title: "Design system versioning plate",
  canvas: "sheet",
  description: (() => {
    const rel = releaseBump(CHANGES.map((c) => c.bump));
    return `A version number, ${BASE_VERSION}, split into MAJOR, MINOR and PATCH with what each signals: breaking, added, fixed. Below, three changesets — ${CHANGES.map((c) => `${c.label} (${c.bump})`).join(", ")} — combine into one release that takes the largest bump, ${rel}, giving version ${bumpVersion(BASE_VERSION, rel)}. At the bottom, a deprecation path: the icon prop is deprecated with a warning in ${bumpVersion(BASE_VERSION, "minor")}, still present in the next minor, and removed in ${bumpVersion(BASE_VERSION, "major")} together with a codemod.`;
  })(),
  key: [
    { n: "1", label: "MAJOR.MINOR.PATCH", detail: "breaking · backward-compatible addition · backward-compatible fix" },
    { n: "2", label: "Changesets per change", detail: "each change declares its bump and changelog text" },
    { n: "3", label: "Largest bump wins", detail: "lower parts reset: a minor resets PATCH to 0" },
    { n: "4", label: "Deprecate, then remove", detail: "warning in a minor; removal and codemod in the next major" },
  ],
  Art: ({ detail }) => {
    const rel = releaseBump(CHANGES.map((c) => c.bump));
    const next = bumpVersion(BASE_VERSION, rel);
    const parts = BASE_VERSION.split(".");
    const labels = [
      { p: "MAJOR", s: "breaking" },
      { p: "MINOR", s: "added" },
      { p: "PATCH", s: "fixed" },
    ];
    const minor1 = bumpVersion(BASE_VERSION, "minor");
    const minor2 = bumpVersion(minor1, "minor");
    const major = bumpVersion(BASE_VERSION, "major");
    return (
      <g>
        {parts.map((n, i) => (
          <g key={i}>
            <Box x={40 + i * 118} y={10} w={92} h={50} fill={i === 1 ? S.accentWash : S.surface} stroke={i === 1 ? S.accent : S.ruleStrong} />
            <UiText x={86 + i * 118} y={44} size={26} weight={700} anchor="middle">
              {n}
            </UiText>
            <UiText x={86 + i * 118} y={78} mono weight={600} anchor="middle">
              {labels[i].p}
            </UiText>
            <UiText x={86 + i * 118} y={96} mono tone="ink3" anchor="middle">
              {labels[i].s}
            </UiText>
          </g>
        ))}
        <line x1={8} y1={110} x2={392} y2={110} stroke={S.rule} strokeWidth="0.9" {...hair} />
        {CHANGES.map((c, i) => (
          <g key={c.label}>
            <Box x={8} y={120 + i * 30} w={210} h={24} rx={4} />
            <UiText x={16} y={137 + i * 30}>
              {c.label}
            </UiText>
            <UiText x={210} y={137 + i * 30} mono tone={c.bump === "minor" ? "accent" : "ink3"} anchor="end">
              {c.bump}
            </UiText>
            <Link from={[218, 132 + i * 30]} to={[262, 160]} tone="mute" />
          </g>
        ))}
        <Box x={264} y={142} w={128} h={36} fill={S.okWash} stroke={S.ok} />
        <UiText x={328} y={166} mono weight={700} anchor="middle">
          {next}
        </UiText>
        <UiText x={328} y={196} mono tone="ink3" anchor="middle">
          {`release: ${rel}`}
        </UiText>
        <line x1={8} y1={214} x2={392} y2={214} stroke={S.rule} strokeWidth="0.9" {...hair} />
        <line x1={20} y1={250} x2={380} y2={250} stroke={S.ink3} strokeWidth="1" {...hair} />
        {[
          { x: 40, v: minor1, n: "deprecate" },
          { x: 190, v: minor2, n: "warning" },
          { x: 318, v: major, n: "remove · codemod" },
        ].map((s, i) => (
          <g key={s.v}>
            <circle cx={s.x} cy={250} r={6} fill={i === 2 ? S.error : S.accent} />
            <UiText x={s.x} y={238} mono weight={600} anchor="middle">
              {s.v}
            </UiText>
            <UiText x={s.x} y={276} mono tone="ink2" anchor="middle">
              {s.n}
            </UiText>
          </g>
        ))}
        {detail && (
          <>
            <Marker x={18} y={34} n={1} />
            <Marker x={8} y={116} n={2} />
            <Marker x={392} y={142} n={3} />
            <Marker x={392} y={236} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Design QA                                                            */
/* ------------------------------------------------------------------ */
const GATES = ["lint", "interaction", "visual diff", "axe", "pair review"] as const;
const CHECKLIST = ["tokens", "layout · 320 px", "states", "content", "accessibility", "behaviour"] as const;

export const designQaPlate: IllustrationEntry = {
  slug: "design-qa",
  title: "Design QA plate",
  canvas: "sheet",
  description:
    "A pull request passes through five gates from left to right: lint (no raw colours or px font sizes), interaction tests, visual diff, an axe accessibility scan and a human pair review on the preview, with the first four automated and the last manual. Below, a visual diff: a baseline button and a new build whose label is a raw grey, with the changed area outlined and the hex value flagged by the lint rule. On the right, the six-part review checklist: tokens, layout at 320 px, states, content, accessibility and behaviour. A note marks that automated checks catch only part of accessibility issues, so manual evaluation remains.",
  key: [
    { n: "1", label: "Automated gates", detail: "lint, interaction tests, visual diff and axe run on every pull request" },
    { n: "2", label: "Human pair review", detail: "designer and engineer on the preview, keyboard first" },
    { n: "3", label: "Visual diff", detail: "unexpected changes are flagged and approved explicitly" },
    { n: "4", label: "Checklist", detail: "tokens, layout, states, content, accessibility, behaviour" },
  ],
  Art: ({ detail }) => {
    return (
      <g>
        {GATES.map((g, i) => {
          const x = 8 + i * 78;
          const manual = g === "pair review";
          return (
            <g key={g}>
              <Box x={x} y={14} w={70} h={40} fill={manual ? S.accentWash : S.soft} stroke={manual ? S.accent : S.ruleStrong} />
              <UiText x={x + 35} y={39} mono anchor="middle" weight={600}>
                {g === "visual diff" ? "visual" : g === "pair review" ? "review" : g === "interaction" ? "tests" : g}
              </UiText>
              {i < GATES.length - 1 && <Link from={[x + 70, 34]} to={[x + 78, 34]} />}
            </g>
          );
        })}
        <UiText x={8} y={74} mono tone="ink3">
          automated
        </UiText>
        <UiText x={392} y={74} mono tone="accent" anchor="end">
          manual
        </UiText>
        <line x1={8} y1={88} x2={392} y2={88} stroke={S.rule} strokeWidth="0.9" {...hair} />
        {/* visual diff */}
        <UiText x={8} y={110} mono tone="ink3">
          baseline
        </UiText>
        <Box x={8} y={118} w={110} h={40} rx={6} fill={S.ink} stroke={S.ink} />
        <UiText x={63} y={143} anchor="middle" tone="surface" weight={600}>
          Place hold
        </UiText>
        <UiText x={8} y={180} mono tone="ink3">
          build
        </UiText>
        <Box x={8} y={188} w={110} h={40} rx={6} fill={S.ink} stroke={S.ink} />
        <text x={63} y={213} fontSize={T.ui} fontWeight={600} fill={`var(--sample-token-grey-500)`} textAnchor="middle" fontFamily={SANS}>
          Place hold
        </text>
        <rect x={20} y={196} width={86} height={24} fill="none" stroke={S.error} strokeWidth="1.2" strokeDasharray="3 2" {...hair} />
        <UiText x={128} y={213} mono tone="error">
          color: #8a8983
        </UiText>
        <UiText x={128} y={233} mono tone="ink3">
          color-no-hex ✕
        </UiText>
        <UiText x={8} y={262} tone="ink3">
          axe finds part of the issues;
        </UiText>
        <UiText x={8} y={282} tone="ink3">
          manual checks remain
        </UiText>
        {/* checklist */}
        <Box x={262} y={100} w={130} h={186} />
        {CHECKLIST.map((c, i) => (
          <g key={c}>
            <rect x={272} y={114 + i * 28} width={12} height={12} rx={2} fill={S.okWash} stroke={S.ok} strokeWidth="0.9" {...hair} />
            <UiText x={292} y={125 + i * 28}>
              {c}
            </UiText>
          </g>
        ))}
        {detail && (
          <>
            <Marker x={8} y={10} n={1} />
            <Marker x={320} y={10} n={2} />
            <Marker x={118} y={188} n={3} />
            <Marker x={392} y={100} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Design system audits                                                 */
/* ------------------------------------------------------------------ */
const SCAN = { system: 312, custom: 88 } as const;
const VARIANTS = [
  [26, 6], [28, 4], [30, 6], [26, 13], [32, 2], [28, 6], [30, 0], [26, 8],
  [24, 6], [34, 6], [28, 13], [30, 4], [26, 2], [32, 8], [28, 0], [30, 6],
  [26, 6], [28, 10], [30, 3], [24, 2], [34, 4], [28, 6], [26, 12],
] as const;
const FINDINGS = [
  { s: 0.9, r: 0.85, l: "keyboard" },
  { s: 0.66, r: 0.15, l: "contrast" },
  { s: 0.3, r: 0.85, l: "radius" },
  { s: 0.2, r: 0.2, l: "copy" },
] as const;

export const designSystemAuditsPlate: IllustrationEntry = {
  slug: "design-system-audits",
  title: "Design system audits plate",
  canvas: "sheet",
  description: (() => {
    const pct = Math.round(adoptionRate(SCAN.system, SCAN.custom) * 100);
    return `An interface inventory wall of ${VARIANTS.length} buttons found in production, each a slightly different height and corner radius, the kind of variation an audit makes visible. Below left, an adoption bar from a static code scan: ${SCAN.system} system instances and ${SCAN.custom} custom ones, ${pct}% adoption, with a note to read it alongside overrides and quality. Below right, a prioritisation matrix of severity against reach: a keyboard failure high on both is fixed first, a contrast failure with low reach is still high priority because it fails WCAG, a radius inconsistency with high reach comes next, and a low-severity copy issue last.`;
  })(),
  key: [
    { n: "1", label: "Interface inventory", detail: "every instance, side by side, with all disciplines (Frost)" },
    { n: "2", label: "Measured adoption", detail: "system ÷ (system + custom), with overrides and detaches" },
    { n: "3", label: "Severity × reach", detail: "WCAG failures first, then by reach" },
    { n: "4", label: "Findings become a roadmap", detail: "each linked to a system component and an owner" },
  ],
  Art: ({ detail }) => {
    const rate = adoptionRate(SCAN.system, SCAN.custom);
    return (
      <g>
        {VARIANTS.map(([h, r], i) => {
          const col = i % 8;
          const row = Math.floor(i / 8);
          return <rect key={i} x={10 + col * 48} y={12 + row * 40 + (34 - h) / 2} width={40} height={h} rx={r} fill={i % 5 === 0 ? S.ink2 : S.ink} opacity={0.85} />;
        })}
        <line x1={8} y1={136} x2={392} y2={136} stroke={S.rule} strokeWidth="0.9" {...hair} />
        {/* adoption */}
        <UiText x={8} y={160} weight={600}>
          Adoption
        </UiText>
        <rect x={8} y={172} width={180} height={18} rx={4} fill={S.soft} stroke={S.ruleStrong} strokeWidth="0.8" {...hair} />
        <rect x={8} y={172} width={180 * rate} height={18} rx={4} fill={S.accent} />
        <UiText x={8} y={212} mono>
          {`${SCAN.system} / ${SCAN.system + SCAN.custom} = ${Math.round(rate * 100)}%`}
        </UiText>
        <UiText x={8} y={234} mono tone="ink3">
          + overrides
        </UiText>
        <UiText x={8} y={254} mono tone="ink3">
          + detaches
        </UiText>
        {/* matrix */}
        <Box x={220} y={150} w={172} h={130} rx={4} />
        <line x1={306} y1={150} x2={306} y2={280} stroke={S.rule} strokeWidth="0.8" {...hair} />
        <line x1={220} y1={215} x2={392} y2={215} stroke={S.rule} strokeWidth="0.8" {...hair} />
        {FINDINGS.map((f) => {
          const cx = 228 + f.r * 156;
          const cy = 272 - f.s * 114;
          const urgent = f.l === "keyboard" || f.l === "contrast"; // WCAG failures
          return (
            <g key={f.l}>
              <circle cx={cx} cy={cy} r={6} fill={urgent ? S.error : S.ink3} />
              <UiText x={cx + (f.r > 0.6 ? -10 : 10)} y={cy + 5} mono anchor={f.r > 0.6 ? "end" : "start"}>
                {f.l}
              </UiText>
            </g>
          );
        })}
        <UiText x={306} y={298} mono tone="ink3" anchor="middle">
          reach →
        </UiText>
        <UiText x={214} y={160} mono tone="ink3" anchor="end">
          sev
        </UiText>
        {detail && (
          <>
            <Marker x={8} y={8} n={1} />
            <Marker x={188} y={168} n={2} />
            <Marker x={392} y={146} n={3} />
            <Marker x={110} y={234} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Multi-brand systems                                                  */
/* ------------------------------------------------------------------ */
const sample = (k: string) => `var(--sample-token-${k})`;
const ALL = { ...TOKEN_SAMPLES, ...BRAND_SAMPLES } as Record<string, string>;
const CONTRACT = ["action.background", "action.text", "radius.control", "font.body"] as const;

export const multiBrandSystemsPlate: IllustrationEntry = {
  slug: "multi-brand-systems",
  title: "Multi-brand systems plate",
  canvas: "sheet",
  description: (() => {
    const lib = contrastRatio(ALL["grey-0"], ALL["blue-600"]).toFixed(2);
    const bad = contrastRatio(ALL["grey-0"], ALL["orange-500"]).toFixed(2);
    const good = contrastRatio(ALL["grey-0"], ALL["orange-700"]).toFixed(2);
    return `In the middle, one shared contract of semantic tokens — action.background, action.text, radius.control and font.body — that the single Button component uses. On the left, the library brand maps them to blue 600, white, a 6 px radius and a sans-serif face; its button reads 'Renew' at ${lib}:1. On the right, the museum brand maps them to orange, white, a square 0 px radius and a serif face. Its logo orange 500 with white text is only ${bad}:1 and is crossed out; the action role is mapped to orange 700 instead, at ${good}:1, which passes. The component code is identical for both brands.`;
  })(),
  key: [
    { n: "1", label: "One token contract", detail: "every brand provides the same semantic names" },
    { n: "2", label: "Brand mappings", detail: "each brand points the contract at its own primitives: colour, type, shape" },
    { n: "3", label: "Contrast per brand", detail: "a brand colour can fail as a text background; remap the role (WCAG 2.2 SC 1.4.3)" },
    { n: "4", label: "Same component", detail: "no brand logic inside components" },
  ],
  Art: ({ detail }) => {
    const lib = contrastRatio(ALL["grey-0"], ALL["blue-600"]);
    const bad = contrastRatio(ALL["grey-0"], ALL["orange-500"]);
    const good = contrastRatio(ALL["grey-0"], ALL["orange-700"]);
    return (
      <g>
        {/* contract */}
        <Box x={128} y={14} w={144} h={128} fill={S.soft} stroke={S.ink2} />
        {CONTRACT.map((c, i) => (
          <UiText key={c} x={200} y={40 + i * 28} mono anchor="middle">
            {c}
          </UiText>
        ))}
        <Link from={[128, 56]} to={[112, 56]} tone="mute" />
        <Link from={[272, 56]} to={[300, 56]} tone="mute" />
        <UiText x={8} y={30} mono tone="ink3">
          library
        </UiText>
        <UiText x={392} y={30} mono tone="ink3" anchor="end">
          museum
        </UiText>
        {/* library */}
        <rect x={8} y={44} width={30} height={22} rx={4} fill={sample("blue-600")} />
        <UiText x={44} y={60} mono>
          blue 600
        </UiText>
        <UiText x={8} y={88} mono>
          6 px · sans
        </UiText>
        {/* museum */}
        <rect x={304} y={44} width={30} height={22} rx={0} fill={sample("orange-700")} />
        <UiText x={340} y={60} mono>
          or. 700
        </UiText>
        <UiText x={304} y={88} mono>
          0 px · serif
        </UiText>
        <line x1={8} y1={160} x2={392} y2={160} stroke={S.rule} strokeWidth="0.9" {...hair} />
        {/* rendered buttons */}
        <rect x={8} y={178} width={110} height={36} rx={6} fill={sample("blue-600")} />
        <text x={63} y={201} fontSize={T.ui} fontWeight={600} fill={sample("grey-0")} textAnchor="middle" fontFamily={SANS}>
          Renew
        </text>
        <UiText x={8} y={236} mono>
          {`${lib.toFixed(2)}:1`}
        </UiText>
        <Verdict x={100} y={231} ok={lib >= 4.5} />
        <rect x={150} y={178} width={110} height={36} rx={0} fill={sample("orange-500")} />
        <text x={205} y={201} fontSize={T.ui} fontWeight={600} fill={sample("grey-0")} textAnchor="middle" fontFamily="var(--font-newsreader), serif">
          Renew
        </text>
        <line x1={150} y1={214} x2={260} y2={178} stroke={S.error} strokeWidth="1.4" {...hair} />
        <UiText x={150} y={236} mono tone="error">
          {`${bad.toFixed(2)}:1`}
        </UiText>
        <Verdict x={242} y={231} ok={bad >= 4.5} />
        <rect x={282} y={178} width={110} height={36} rx={0} fill={sample("orange-700")} />
        <text x={337} y={201} fontSize={T.ui} fontWeight={600} fill={sample("grey-0")} textAnchor="middle" fontFamily="var(--font-newsreader), serif">
          Renew
        </text>
        <UiText x={282} y={236} mono>
          {`${good.toFixed(2)}:1`}
        </UiText>
        <Verdict x={374} y={231} ok={good >= 4.5} />
        <UiText x={200} y={276} mono tone="ink3" anchor="middle">
          {"<Button> — same code for every brand"}
        </UiText>
        {detail && (
          <>
            <Marker x={128} y={10} n={1} />
            <Marker x={8} y={106} n={2} />
            <Marker x={150} y={250} n={3} />
            <Marker x={392} y={268} n={4} />
          </>
        )}
      </g>
    );
  },
};
