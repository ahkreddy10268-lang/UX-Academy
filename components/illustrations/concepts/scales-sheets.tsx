/**
 * Stage 3 plates (DS Batch 4, session 34): spacing, typography, colour,
 * elevation, icon and responsive systems. Instructional sheet canvas; every
 * computed number comes from lib/formulas; sample colours use the
 * theme-independent --sample-token-* tokens (TOKEN_SAMPLES).
 */
import { contrastRatio, gridColumns } from "../../../lib/formulas/visual";
import type { IllustrationEntry } from "../illustration-types";
import { Marker, S, T, TextBar, UiText, Verdict } from "../system/sheet";
import { Link, TOKEN_SAMPLES } from "./learning-sheets";

const hair = { vectorEffect: "non-scaling-stroke" as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const tok = (k: keyof typeof TOKEN_SAMPLES) => `var(--sample-token-${k})`;
const SANS = "var(--font-plex-sans), sans-serif";
const ratio = (fg: keyof typeof TOKEN_SAMPLES, bg: keyof typeof TOKEN_SAMPLES) => contrastRatio(TOKEN_SAMPLES[fg], TOKEN_SAMPLES[bg]);

/* ------------------------------------------------------------------ */
/* Spacing scales                                                       */
/* ------------------------------------------------------------------ */
const SPACE_STEPS = [4, 8, 12, 16, 24, 32] as const;
const RADIUS = { outer: 12, padding: 8 } as const;
const innerRadius = RADIUS.outer - RADIUS.padding;

export const spacingScalesPlate: IllustrationEntry = {
  slug: "spacing-scales",
  title: "Spacing scales plate",
  canvas: "sheet",
  description: `A row of six spacing steps drawn to relative size — ${SPACE_STEPS.join(", ")} px — as the only distances the product may use. Below left, a library book card uses them: a small 4 px gap binds the title to its author, and a larger 24 px gap separates that group from the Renew button, so proximity shows grouping. Below right, a rounded card with a ${RADIUS.outer} px corner holds a button ${RADIUS.padding} px from its edge; the button's corner is ${innerRadius} px, so the two curves share a centre (outer radius = inner radius + padding). Beside the button, a 16 px icon sits inside a 24 px target.`,
  key: [
    { n: "1", label: "The scale", detail: "a few named steps from a 4 px base; every gap, padding and margin uses one" },
    { n: "2", label: "Small gaps bind, large gaps separate", detail: "proximity reads as grouping, so the step encodes structure" },
    { n: "3", label: "Concentric corners", detail: `outer radius = inner radius + padding (${RADIUS.outer} = ${innerRadius} + ${RADIUS.padding})` },
    { n: "4", label: "Target size", detail: "pad small icons to at least 24 × 24 CSS px (WCAG 2.2 SC 2.5.8, AA)" },
  ],
  Art: ({ detail }) => {
    const k = 1.6;
    let x = 14;
    const steps = SPACE_STEPS.map((s) => {
      const p = { s, x, w: s * k };
      x += s * k + 22;
      return p;
    });
    const r = 3.2; // px → plate units for the radius drawing
    const ox = 230;
    const oy = 150;
    const ow = 160;
    const oh = 92;
    return (
      <g>
        {steps.map((p) => (
          <g key={p.s}>
            <rect x={p.x} y={70 - p.w} width={p.w} height={p.w} rx={2} fill={S.accentWash} stroke={S.accent} strokeWidth="1" {...hair} />
            <UiText x={p.x + p.w / 2} y={90} mono anchor="middle">
              {p.s}
            </UiText>
          </g>
        ))}
        <UiText x={392} y={90} mono tone="ink3" anchor="end">
          px
        </UiText>
        <line x1={8} y1={110} x2={392} y2={110} stroke={S.rule} strokeWidth="0.9" {...hair} />
        {/* card using the scale */}
        <rect x={8} y={130} width={190} height={150} rx={8} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        <UiText x={22} y={158} weight={600}>
          Middlemarch
        </UiText>
        <UiText x={22} y={176} tone="ink2">
          George Eliot
        </UiText>
        <rect x={22} y={226} width={86} height={28} rx={6} fill={S.ink} />
        <UiText x={65} y={245} weight={600} anchor="middle" tone="surface">
          Renew
        </UiText>
        <line x1={150} y1={182} x2={150} y2={224} stroke={S.accent} strokeWidth="1" {...hair} />
        <line x1={144} y1={182} x2={156} y2={182} stroke={S.accent} strokeWidth="1" {...hair} />
        <line x1={144} y1={224} x2={156} y2={224} stroke={S.accent} strokeWidth="1" {...hair} />
        <UiText x={160} y={208} mono tone="accent">
          24
        </UiText>
        <UiText x={160} y={176} mono tone="accent">
          4
        </UiText>
        {/* concentric radius */}
        <rect x={ox} y={oy} width={ow} height={oh} rx={RADIUS.outer * r} fill={S.soft} stroke={S.ink2} strokeWidth="1.1" {...hair} />
        <rect
          x={ox + RADIUS.padding * r}
          y={oy + RADIUS.padding * r}
          width={ow - 2 * RADIUS.padding * r}
          height={oh - 2 * RADIUS.padding * r - 10}
          rx={innerRadius * r}
          fill={S.surface}
          stroke={S.ink2}
          strokeWidth="1.1"
          {...hair}
        />
        <circle cx={ox + RADIUS.outer * r} cy={oy + RADIUS.outer * r} r={2} fill={S.accent} />
        <UiText x={ox + ow / 2} y={oy + oh - 12} mono anchor="middle">
          {`R ${RADIUS.outer} = ${innerRadius} + ${RADIUS.padding}`}
        </UiText>
        <UiText x={ox + 2} y={oy + oh + 22} mono tone="ink3">
          {`padding ${RADIUS.padding}`}
        </UiText>
        {/* target */}
        <rect x={ox + 100} y={oy + oh + 6} width={24 * 1.2} height={24 * 1.2} rx={4} fill="none" stroke={S.accent} strokeDasharray="3 2.4" strokeWidth="1" {...hair} />
        <rect x={ox + 100 + 4 * 1.2} y={oy + oh + 6 + 4 * 1.2} width={16 * 1.2} height={16 * 1.2} rx={3} fill={S.ink2} opacity={0.75} />
        <UiText x={392} y={oy + oh + 26} mono tone="accent" anchor="end">
          24
        </UiText>
        {detail && (
          <>
            <Marker x={8} y={20} n={1} />
            <Marker x={198} y={130} n={2} />
            <Marker x={ox} y={oy - 4} n={3} />
            <Marker x={ox + 100} y={oy + oh + 44} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Typography scales                                                    */
/* ------------------------------------------------------------------ */
/** Illustrative role styles (size / line height, px) — the entry's CSS example. */
const TYPE_ROLES = [
  { role: "headline", size: 28, lh: 35, weight: 600 },
  { role: "title", size: 20, lh: 28, weight: 600 },
  { role: "body", size: 16, lh: 24, weight: 400 },
  { role: "label", size: 14, lh: 20, weight: 500 },
] as const;

export const typographyScalesPlate: IllustrationEntry = {
  slug: "typography-scales",
  title: "Typography scales plate",
  canvas: "sheet",
  description: `Four named text styles stacked as specimens, each drawn inside its line box so size and line height are seen together: ${TYPE_ROLES.map((r) => `${r.role} ${r.size}/${r.lh}`).join(", ")} (size / line height in px). On the right, the same role names keep their meaning across two breakpoints while the headline value changes from 24 px on small screens to 28 px on large ones. Below, a page outline shows heading levels h1 and h2 chosen by structure, with each level labelled by the role style it uses, so a visual size never decides a heading level.`,
  key: [
    { n: "1", label: "Roles, not sizes", detail: "components ask for headline, title, body or label" },
    { n: "2", label: "Size and line height together", detail: "each style fixes both, plus weight and letter spacing" },
    { n: "3", label: "Values adapt, names stay", detail: "breakpoints and platforms remap the role values" },
    { n: "4", label: "Structure is separate", detail: "heading level comes from the outline, not the style (WCAG 2.2 SC 1.3.1)" },
  ],
  Art: ({ detail }) => {
    const k = 0.95;
    let y = 14;
    const rows = TYPE_ROLES.map((r) => {
      const h = r.lh * k;
      const p = { ...r, y, h };
      y += h + 10;
      return p;
    });
    return (
      <g>
        {rows.map((r) => (
          <g key={r.role}>
            <rect x={8} y={r.y} width={210} height={r.h} fill={S.accentWash} stroke={S.rule} strokeWidth="0.8" {...hair} />
            <UiText x={16} y={r.y + r.h * 0.5 + r.size * k * 0.36} size={Math.max(T.min, r.size * k)} weight={r.weight}>
              {r.role === "label" ? "Renew loan" : "Middlemarch"}
            </UiText>
            <UiText x={226} y={r.y + r.h * 0.5 + 5} mono weight={600}>
              {r.role}
            </UiText>
          </g>
        ))}
        {rows.map((r) => (
          <UiText key={`${r.role}-v`} x={392} y={r.y + r.h * 0.5 + 5} mono tone="ink3" anchor="end">
            {`${r.size}/${r.lh}`}
          </UiText>
        ))}
        <line x1={8} y1={y + 2} x2={392} y2={y + 2} stroke={S.rule} strokeWidth="0.9" {...hair} />
        {/* breakpoints */}
        <rect x={8} y={y + 14} width={180} height={34} rx={6} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        <UiText x={18} y={y + 36} mono>
          sm · headline 24
        </UiText>
        <rect x={212} y={y + 14} width={180} height={34} rx={6} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        <UiText x={222} y={y + 36} mono>
          lg · headline 28
        </UiText>
        <Link from={[188, y + 31]} to={[210, y + 31]} tone="mute" />
        {/* outline */}
        <UiText x={8} y={y + 76} mono weight={600}>
          h1
        </UiText>
        <UiText x={36} y={y + 76} tone="ink2">
          Your loans · headline
        </UiText>
        <UiText x={28} y={y + 98} mono weight={600}>
          h2
        </UiText>
        <UiText x={56} y={y + 98} tone="ink2">
          Due this week · title
        </UiText>
        {detail && (
          <>
            <Marker x={318} y={rows[0].y + rows[0].h / 2} n={1} />
            <Marker x={318} y={rows[1].y + rows[1].h / 2} n={2} />
            <Marker x={392} y={y + 10} n={3} />
            <Marker x={240} y={y + 70} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Colour systems                                                       */
/* ------------------------------------------------------------------ */
const GREY_RAMP = ["grey-0", "grey-50", "grey-300", "grey-500", "grey-600", "grey-700", "grey-900", "grey-950"] as const;
const BLUE_RAMP = ["blue-400", "blue-600", "blue-700"] as const;
const RED_RAMP = ["red-400", "red-700"] as const;

export const colourSystemsPlate: IllustrationEntry = {
  slug: "colour-systems",
  title: "Colour systems plate",
  canvas: "sheet",
  description: (() => {
    const l = ratio("red-700", "grey-0").toFixed(2);
    const d1 = ratio("red-700", "grey-950").toFixed(2);
    const d2 = ratio("red-400", "grey-950").toFixed(2);
    return `Tonal ramps of the token lessons' palette at the top: eight greys from white to near-black, three blues and two reds, drawn in their fixed sample colours. Below, the role text.danger points to red 700 in the light theme and to red 400 in the dark theme. Pair checks on the right show why: red 700 on white is ${l}:1 (passes 4.5:1), red 700 on near-black is ${d1}:1 (fails), and red 400 on near-black is ${d2}:1 (passes). At the bottom, an overdue status shows a red warning icon and the word 'Overdue', so the meaning does not depend on colour alone.`;
  })(),
  key: [
    { n: "1", label: "Tonal ramps", detail: "each hue in graded steps; the raw material, with no meaning yet" },
    { n: "2", label: "Roles", detail: "names by purpose; each theme maps a role to a step" },
    { n: "3", label: "Pairs checked per theme", detail: "contrast belongs to a foreground on a background (SC 1.4.3, 4.5:1)" },
    { n: "4", label: "Not colour alone", detail: "status also carries a word and an icon (SC 1.4.1)" },
  ],
  Art: ({ detail }) => {
    const sw = 28;
    const pairs = [
      { fg: "red-700", bg: "grey-0", label: "light · red 700" },
      { fg: "red-700", bg: "grey-950", label: "dark · red 700" },
      { fg: "red-400", bg: "grey-950", label: "dark · red 400" },
    ] as const;
    return (
      <g>
        {GREY_RAMP.map((g, i) => (
          <rect key={g} x={8 + i * sw} y={14} width={sw} height={34} fill={tok(g)} stroke={S.rule} strokeWidth="0.6" {...hair} />
        ))}
        {BLUE_RAMP.map((b, i) => (
          <rect key={b} x={250 + i * sw} y={14} width={sw} height={34} fill={tok(b)} />
        ))}
        {RED_RAMP.map((c, i) => (
          <rect key={c} x={340 + i * 26} y={14} width={26} height={34} fill={tok(c)} />
        ))}
        <UiText x={8} y={66} mono tone="ink3">
          grey 0 → 950
        </UiText>
        <UiText x={250} y={66} mono tone="ink3">
          blue
        </UiText>
        <UiText x={340} y={66} mono tone="ink3">
          red
        </UiText>
        <line x1={8} y1={80} x2={392} y2={80} stroke={S.rule} strokeWidth="0.9" {...hair} />
        {/* role */}
        <rect x={8} y={130} width={118} height={28} rx={6} fill={S.soft} stroke={S.ink2} strokeWidth="1.1" {...hair} />
        <UiText x={67} y={149} mono weight={600} anchor="middle">
          text.danger
        </UiText>
        <Link from={[126, 138]} to={[180, 108]} tone="mute" />
        <Link from={[126, 150]} to={[180, 196]} tone="mute" />
        <UiText x={128} y={104} mono tone="ink3">
          light
        </UiText>
        <UiText x={128} y={206} mono tone="ink3">
          dark
        </UiText>
        {pairs.map((p, i) => {
          const y = 92 + i * 52;
          const r = ratio(p.fg, p.bg);
          return (
            <g key={p.label}>
              <rect x={184} y={y} width={120} height={38} rx={6} fill={tok(p.bg)} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
              <text x={196} y={y + 24} fontSize={T.ui} fontWeight={600} fill={tok(p.fg)} fontFamily={SANS}>
                Overdue
              </text>
              <UiText x={312} y={y + 17} mono>
                {`${r.toFixed(2)}:1`}
              </UiText>
              <UiText x={312} y={y + 33} mono tone="ink3">
                {p.label.split(" · ")[1]}
              </UiText>
              <Verdict x={384} y={y + 19} ok={r >= 4.5} />
            </g>
          );
        })}
        <line x1={8} y1={252} x2={392} y2={252} stroke={S.rule} strokeWidth="0.9" {...hair} />
        <polygon points="16,288 26,268 36,288" fill="none" stroke={S.error} strokeWidth="1.3" {...hair} />
        <line x1={26} y1={276} x2={26} y2={281} stroke={S.error} strokeWidth="1.3" {...hair} />
        <UiText x={44} y={284} weight={600} tone="error">
          Overdue
        </UiText>
        <UiText x={112} y={284} tone="ink2">
          · 2 days · Renew now
        </UiText>
        {detail && (
          <>
            <Marker x={8} y={8} n={1} />
            <Marker x={8} y={124} n={2} />
            <Marker x={184} y={86} n={3} />
            <Marker x={392} y={266} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Elevation systems                                                    */
/* ------------------------------------------------------------------ */
const LEVELS = [
  { name: "page", z: "base" },
  { name: "raised", z: "base" },
  { name: "menu", z: "200" },
  { name: "dialog", z: "400" },
  { name: "toast", z: "500" },
] as const;

export const elevationSystemsPlate: IllustrationEntry = {
  slug: "elevation-systems",
  title: "Elevation systems plate",
  canvas: "sheet",
  description:
    "On the left, a side view of five named levels stacked up the z-axis — page, raised, menu, dialog and toast — each a thin slab with its stacking band (page and raised cards share the base band; menus 200, dialogs 400, toasts 500), so whatever looks highest is also drawn on top. On the right, the same library card in a light theme, lifted by a soft offset shadow, and in a dark theme, where the shadow disappears against the near-black page and the card is instead shown as a lighter surface (tonal elevation). Below, a menu keeps a visible border so its boundary does not depend on the shadow.",
  key: [
    { n: "1", label: "Few levels, named by use", detail: "page, raised, menu, dialog, toast" },
    { n: "2", label: "Stacking bands", detail: "each level has a z-index band, so overlays never collide" },
    { n: "3", label: "Shadow in light themes", detail: "a key and an ambient layer suggest height" },
    { n: "4", label: "Tone in dark themes", detail: "higher surfaces become lighter where shadows fade" },
  ],
  Art: ({ detail }) => {
    return (
      <g>
        {LEVELS.map((l, i) => {
          const y = 250 - i * 50;
          return (
            <g key={l.name}>
              <polygon points={`${16 + i * 6},${y} ${130 + i * 6},${y} ${148 + i * 6},${y - 14} ${34 + i * 6},${y - 14}`} fill={i === 0 ? S.soft : S.surface} stroke={S.ink2} strokeWidth="1" {...hair} />
              <UiText x={16 + i * 6} y={y + 18} mono weight={600}>
                {l.name}
              </UiText>
              <UiText x={154 + i * 6} y={y + 18} mono tone="ink3" anchor="end">
                {l.z}
              </UiText>
            </g>
          );
        })}
        <Link from={[192, 258]} to={[192, 44]} tone="mute" />
        <UiText x={198} y={56} mono tone="ink3">
          z
        </UiText>
        {/* light */}
        <rect x={214} y={14} width={178} height={110} rx={8} fill={tok("grey-50")} />
        <rect x={232} y={40} width={140} height={58} rx={7} fill="var(--ill-shadow)" transform="translate(2 4)" />
        <rect x={232} y={40} width={140} height={58} rx={7} fill={tok("grey-0")} stroke={tok("grey-300")} strokeWidth="0.8" {...hair} />
        <text x={244} y={64} fontSize={T.ui} fontWeight={600} fill={tok("grey-900")} fontFamily={SANS}>
          Middlemarch
        </text>
        <rect x={244} y={74} width={80} height={5} rx={2.5} fill={tok("grey-500")} />
        <UiText x={392} y={140} mono tone="ink3" anchor="end">
          light · shadow
        </UiText>
        {/* dark */}
        <rect x={214} y={152} width={178} height={110} rx={8} fill={tok("grey-950")} />
        <rect x={232} y={178} width={140} height={58} rx={7} fill={tok("grey-900")} />
        <text x={244} y={202} fontSize={T.ui} fontWeight={600} fill={tok("grey-50")} fontFamily={SANS}>
          Middlemarch
        </text>
        <rect x={244} y={212} width={80} height={5} rx={2.5} fill={tok("grey-300")} />
        <UiText x={392} y={280} mono tone="ink3" anchor="end">
          dark · lighter surface
        </UiText>
        {detail && (
          <>
            <Marker x={8} y={36} n={1} />
            <Marker x={192} y={270} n={2} />
            <Marker x={214} y={14} n={3} />
            <Marker x={214} y={152} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Icon systems                                                         */
/* ------------------------------------------------------------------ */
const ICON_PAIRS = [
  { icon: 16, text: 14 },
  { icon: 20, text: 16 },
] as const;
const TARGET = { glyph: 16, target: 24 } as const;

export const iconSystemsPlate: IllustrationEntry = {
  slug: "icon-systems",
  title: "Icon systems plate",
  canvas: "sheet",
  description: `On the left, a 24-unit icon artboard with its keyline grid — a circle, a square and two upright rectangles — and a bookmark icon drawn on it with one fixed stroke weight. In the middle, icon sizes paired with text sizes: a ${ICON_PAIRS[0].icon} px icon beside ${ICON_PAIRS[0].text} px text and a ${ICON_PAIRS[1].icon} px icon beside ${ICON_PAIRS[1].text} px text. On the right, a ${TARGET.glyph} px glyph inside a ${TARGET.target} px target, with the accessible name 'Renew loan' attached to the button. At the bottom, one glyph keeps one meaning: the circular arrow means Refresh, and Renew gets its own calendar-plus icon and label.`,
  key: [
    { n: "1", label: "Keyline grid", detail: "shared artboard, keylines, stroke and corners make one family" },
    { n: "2", label: "Pair with type", detail: "icon sizes follow text sizes (Carbon: 16/20 px with 14/16 px)" },
    { n: "3", label: "Target and name", detail: "24 px target (SC 2.5.8) and an accessible name (SC 4.1.2)" },
    { n: "4", label: "One glyph, one meaning", detail: "never reuse a symbol for a second concept" },
  ],
  Art: ({ detail }) => {
    const g = 5; // plate units per icon unit
    const ax = 12;
    const ay = 16;
    const u = (n: number) => n * g;
    return (
      <g>
        {/* artboard */}
        <rect x={ax} y={ay} width={u(24)} height={u(24)} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        {Array.from({ length: 5 }, (_, i) => (
          <line key={`v${i}`} x1={ax + u(i * 6)} y1={ay} x2={ax + u(i * 6)} y2={ay + u(24)} stroke={S.rule} strokeWidth="0.6" {...hair} />
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <line key={`h${i}`} x1={ax} y1={ay + u(i * 6)} x2={ax + u(24)} y2={ay + u(i * 6)} stroke={S.rule} strokeWidth="0.6" {...hair} />
        ))}
        <circle cx={ax + u(12)} cy={ay + u(12)} r={u(10)} fill="none" stroke={S.accent} strokeWidth="0.8" strokeDasharray="2.5 2" {...hair} />
        <rect x={ax + u(3)} y={ay + u(3)} width={u(18)} height={u(18)} fill="none" stroke={S.accent} strokeWidth="0.8" strokeDasharray="2.5 2" {...hair} />
        <path d={`M${ax + u(7)} ${ay + u(4)} H${ax + u(17)} V${ay + u(20)} L${ax + u(12)} ${ay + u(16)} L${ax + u(7)} ${ay + u(20)} Z`} fill="none" stroke={S.ink} strokeWidth="2.2" {...hair} />
        <UiText x={ax} y={ay + u(24) + 20} mono tone="ink3">
          24 · stroke 1.5
        </UiText>
        {/* pairing */}
        {ICON_PAIRS.map((p, i) => {
          const y = 40 + i * 50;
          const s = p.icon * 1.1;
          return (
            <g key={p.icon}>
              <path d={`M162 ${y} h${s * 0.62} v${s} l${-s * 0.31} ${-s * 0.25} l${-s * 0.31} ${s * 0.25} Z`} fill="none" stroke={S.ink} strokeWidth="1.4" {...hair} />
              <UiText x={162 + s * 0.62 + 8} y={y + s * 0.78} size={Math.max(T.min, p.text * 1.1)} weight={500}>
                Save
              </UiText>
              <UiText x={268} y={y + s * 0.78} mono tone="ink3" anchor="end">
                {`${p.icon}/${p.text}`}
              </UiText>
            </g>
          );
        })}
        {/* target + name */}
        <rect x={296} y={30} width={TARGET.target * 2} height={TARGET.target * 2} rx={8} fill="none" stroke={S.accent} strokeWidth="1" strokeDasharray="3 2.4" {...hair} />
        <rect x={296 + (TARGET.target - TARGET.glyph)} y={30 + (TARGET.target - TARGET.glyph)} width={TARGET.glyph * 2} height={TARGET.glyph * 2} rx={4} fill={S.soft} stroke={S.ink2} strokeWidth="1" {...hair} />
        <UiText x={392} y={52} mono tone="accent" anchor="end">
          {TARGET.target}
        </UiText>
        <UiText x={296} y={104} mono tone="ink2">
          name:
        </UiText>
        <UiText x={296} y={122} mono weight={600}>
          Renew loan
        </UiText>
        <line x1={8} y1={186} x2={392} y2={186} stroke={S.rule} strokeWidth="0.9" {...hair} />
        {/* one glyph, one meaning */}
        <path d="M40 236 a14 14 0 1 1 6 11" fill="none" stroke={S.ink} strokeWidth="1.6" {...hair} />
        <polygon points="36,234 46,236 40,244" fill={S.ink} />
        <UiText x={76} y={240} weight={600}>
          Refresh
        </UiText>
        <Verdict x={150} y={235} ok />
        <rect x={208} y={220} width={28} height={28} rx={4} fill="none" stroke={S.ink} strokeWidth="1.6" {...hair} />
        <line x1={208} y1={229} x2={236} y2={229} stroke={S.ink} strokeWidth="1.4" {...hair} />
        <line x1={222} y1={234} x2={222} y2={244} stroke={S.ink} strokeWidth="1.6" {...hair} />
        <line x1={217} y1={239} x2={227} y2={239} stroke={S.ink} strokeWidth="1.6" {...hair} />
        <UiText x={246} y={240} weight={600}>
          Renew loan
        </UiText>
        <Verdict x={370} y={235} ok />
        <UiText x={8} y={284} tone="ink3">
          each concept gets its own glyph and a label
        </UiText>
        {detail && (
          <>
            <Marker x={ax} y={ay} n={1} />
            <Marker x={160} y={18} n={2} />
            <Marker x={296} y={18} n={3} />
            <Marker x={392} y={214} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Responsive systems                                                   */
/* ------------------------------------------------------------------ */
/** Carbon 2x Grid breakpoints with 32 px gutters; outer margin 0 at sm, 16 px above. */
const BREAKPOINTS = [
  { name: "sm", width: 320, columns: 4, margin: 0 },
  { name: "md", width: 672, columns: 8, margin: 16 },
  { name: "lg", width: 1056, columns: 16, margin: 16 },
] as const;
const GUTTER = 32;

export const responsiveSystemsPlate: IllustrationEntry = {
  slug: "responsive-systems",
  title: "Responsive systems plate",
  canvas: "sheet",
  description: (() => {
    const cols = BREAKPOINTS.map((b) => `${b.name} ${b.width} px: ${b.columns} columns of ${Math.round(gridColumns(b.width, b.columns, GUTTER, b.margin).column)} px`).join("; ");
    return `Three frames drawn to the same scale show one grid at three breakpoints with 32 px gutters — ${cols} — each column computed as (container − 2 × margin − gutters) ÷ columns. Below, the same book card appears in a narrow sidebar slot, where a container query stacks its cover above the text, and in a wide main slot, where cover and text sit side by side; the screen is the same, only the container differs. The smallest frame, 320 px wide, is also the reflow floor: every layout must work in one column at 320 CSS px.`;
  })(),
  key: [
    { n: "1", label: "Named breakpoints", detail: "sm, md, lg: width ranges, not device names" },
    { n: "2", label: "Computed columns", detail: "column = (container − 2 × margin − (n − 1) × gutter) ÷ n" },
    { n: "3", label: "Components respond to their slot", detail: "container queries, not the viewport" },
    { n: "4", label: "Reflow floor", detail: "one column at 320 CSS px without sideways scrolling (SC 1.4.10)" },
  ],
  Art: ({ detail }) => {
    const x0 = 40;
    const k = (392 - x0) / BREAKPOINTS[2].width; // px → plate units, same scale for all three
    const frames = BREAKPOINTS.map((b, i) => {
      const g = gridColumns(b.width, b.columns, GUTTER, b.margin);
      return { ...b, x: x0, y: 14 + i * 38, w: b.width * k, col: g.column };
    });
    return (
      <g>
        {frames.map((f) => (
          <g key={f.name}>
            <UiText x={8} y={f.y + 17} mono weight={600}>
              {f.name}
            </UiText>
            <rect x={f.x} y={f.y} width={f.w} height={24} rx={3} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
            {Array.from({ length: f.columns }, (_, i) => (
              <rect key={i} x={f.x + (f.margin + i * (f.col + GUTTER)) * k} y={f.y + 4} width={f.col * k} height={16} fill={S.accentWash} stroke={S.accent} strokeWidth="0.5" {...hair} />
            ))}
            {f.name !== "lg" && (
              <UiText x={f.x + f.w + 10} y={f.y + 17} mono tone="ink3">
                {`${f.width} · ${f.columns} × ${Math.round(f.col)}`}
              </UiText>
            )}
          </g>
        ))}
        <UiText x={392} y={frames[2].y + 44} mono tone="ink3" anchor="end">
          {`${frames[2].width} · ${frames[2].columns} × ${Math.round(frames[2].col)}`}
        </UiText>
        <line x1={8} y1={146} x2={392} y2={146} stroke={S.rule} strokeWidth="0.9" {...hair} />
        {/* sidebar slot: stacked */}
        <rect x={8} y={160} width={110} height={118} rx={6} fill={S.soft} stroke={S.ink2} strokeWidth="1" strokeDasharray="4 3" {...hair} />
        <rect x={20} y={172} width={44} height={50} rx={3} fill={S.ruleStrong} />
        <UiText x={20} y={242} weight={600}>
          Middlemarch
        </UiText>
        <TextBar x={20} y={254} w={70} />
        {/* main slot: side by side */}
        <rect x={140} y={160} width={252} height={84} rx={6} fill={S.soft} stroke={S.ink2} strokeWidth="1" strokeDasharray="4 3" {...hair} />
        <rect x={152} y={172} width={44} height={60} rx={3} fill={S.ruleStrong} />
        <UiText x={208} y={190} weight={600}>
          Middlemarch
        </UiText>
        <TextBar x={208} y={202} w={120} />
        <TextBar x={208} y={214} w={90} />
        <UiText x={140} y={270} mono tone="ink3">
          same screen · different container
        </UiText>
        {detail && (
          <>
            <Marker x={16} y={frames[2].y + 44} n={1} />
            <Marker x={262} y={frames[2].y + 40} n={2} />
            <Marker x={118} y={160} n={3} />
            <Marker x={frames[0].x + frames[0].w} y={frames[0].y} n={4} />
          </>
        )}
      </g>
    );
  },
};
