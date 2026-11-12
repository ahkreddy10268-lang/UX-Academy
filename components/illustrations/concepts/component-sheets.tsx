/**
 * Stage 4 plates, Batch 5 (session 35): component libraries, architecture,
 * variants, properties and state management. Instructional sheet canvas;
 * counts come from lib/formulas/components.
 */
import { booleanVsEnum, variantCount } from "../../../lib/formulas/components";
import type { IllustrationEntry } from "../illustration-types";
import { Marker, S, UiText, Verdict } from "../system/sheet";
import { Link } from "./learning-sheets";

const hair = { vectorEffect: "non-scaling-stroke" as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function Box({ x, y, w, h, fill = S.surface, stroke = S.ruleStrong, dashed = false, rx = 6 }: { x: number; y: number; w: number; h: number; fill?: string; stroke?: string; dashed?: boolean; rx?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke={stroke} strokeWidth="1" strokeDasharray={dashed ? "4 3" : undefined} {...hair} />;
}

/* ------------------------------------------------------------------ */
/* Component libraries                                                  */
/* ------------------------------------------------------------------ */
const LIB_LAYERS = [
  { name: "product wrappers", note: "data, rules" },
  { name: "styled components", note: "tokens, variants" },
  { name: "headless primitives", note: "ARIA, focus, keys" },
  { name: "tokens", note: "decisions" },
] as const;

export const componentLibrariesPlate: IllustrationEntry = {
  slug: "component-libraries",
  title: "Component libraries plate",
  canvas: "sheet",
  description:
    "Four stacked layers of a component library, read from the bottom: tokens (decisions), headless primitives (ARIA roles, focus and keyboard behaviour), styled components (tokens and variants) and product wrappers (data and business rules). Three products sit on top and receive changes by upgrading one package. On the right, three component statuses — experimental, ready and deprecated — and a version line from 3.4.0 to 4.0.0, marking that a breaking change to a ready component raises the major version and comes with a migration path.",
  key: [
    { n: "1", label: "Tokens underneath", detail: "every styled component consumes semantic tokens" },
    { n: "2", label: "Headless behaviour", detail: "roles, states, focus and keyboard from a tested base (Radix, React Aria, Ark UI)" },
    { n: "3", label: "Status per component", detail: "experimental, ready, deprecated (Primer's model)" },
    { n: "4", label: "Breaking change = major version", detail: "products upgrade on purpose, with a migration path" },
  ],
  Art: ({ detail }) => {
    const y0 = 70;
    return (
      <g>
        {["Catalogue", "Loans", "Events"].map((p, i) => (
          <g key={p}>
            <Box x={8 + i * 82} y={14} w={74} h={30} fill={S.soft} />
            <UiText x={45 + i * 82} y={34} anchor="middle" weight={600}>
              {p}
            </UiText>
            <Link from={[45 + i * 82, 46]} to={[45 + i * 82, y0 - 4]} tone="mute" />
          </g>
        ))}
        {LIB_LAYERS.map((l, i) => {
          const y = y0 + i * 52;
          const strong = l.name === "headless primitives";
          return (
            <g key={l.name}>
              <Box x={8} y={y} w={238} h={42} fill={strong ? S.accentWash : S.surface} stroke={strong ? S.accent : S.ruleStrong} />
              <UiText x={20} y={y + 18} weight={600}>
                {l.name}
              </UiText>
              <UiText x={20} y={y + 35} mono tone="ink3">
                {l.note}
              </UiText>
            </g>
          );
        })}
        {/* statuses */}
        {[
          { s: "experimental", y: 70 },
          { s: "ready", y: 108 },
          { s: "deprecated", y: 146 },
        ].map((c) => (
          <g key={c.s}>
            <Box x={266} y={c.y} w={126} h={28} rx={14} fill={c.s === "ready" ? S.okWash : c.s === "deprecated" ? S.errorWash : S.soft} stroke={c.s === "ready" ? S.ok : c.s === "deprecated" ? S.error : S.ink3} />
            <UiText x={329} y={c.y + 19} mono anchor="middle">
              {c.s}
            </UiText>
          </g>
        ))}
        <UiText x={266} y={214} mono>
          3.4.0
        </UiText>
        <Link from={[310, 210]} to={[346, 210]} />
        <UiText x={392} y={214} mono weight={600} anchor="end">
          4.0.0
        </UiText>
        <UiText x={266} y={238} tone="ink2">
          breaking → major
        </UiText>
        <UiText x={266} y={258} tone="ink2">
          + migration guide
        </UiText>
        {detail && (
          <>
            <Marker x={246} y={y0 + 3 * 52} n={1} />
            <Marker x={246} y={y0 + 2 * 52} n={2} />
            <Marker x={392} y={66} n={3} />
            <Marker x={392} y={194} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Component architecture                                               */
/* ------------------------------------------------------------------ */
export const componentArchitecturePlate: IllustrationEntry = {
  slug: "component-architecture",
  title: "Component architecture plate",
  canvas: "sheet",
  description:
    "On the left, a book card built by configuration: one component with a long list of props such as showBadge, badgeText, coverPosition and fetchAvailability, marked as the pattern to avoid. On the right, the same card built by composition: named parts — Cover, Title, Meta and an Actions slot — arranged by the consumer, with data loading moved to a product wrapper. Below, a compound Tabs component: a root holds the selected value and generated ids in shared context, and each Tab is linked to its TabPanel by aria-controls, wired inside the component rather than by the consumer.",
  key: [
    { n: "1", label: "Configuration sprawl", detail: "every layout difference becomes another prop" },
    { n: "2", label: "Named parts and slots", detail: "consumers compose parts; data stays in a product wrapper" },
    { n: "3", label: "Compound component", detail: "a root shares state and ids with its parts through context" },
    { n: "4", label: "Relationships wired inside", detail: "aria-controls and aria-labelledby set by the component (WCAG 2.2 SC 1.3.1, 4.1.2)" },
  ],
  Art: ({ detail }) => {
    const props = ["showBadge", "badgeText", "coverPosition", "secondaryLabel", "fetchAvailability"];
    return (
      <g>
        {/* monolith */}
        <Box x={8} y={14} w={160} h={150} />
        <UiText x={20} y={36} weight={600}>
          {"<BookCard"}
        </UiText>
        {props.map((p, i) => (
          <UiText key={p} x={30} y={58 + i * 18} mono tone="ink2">
            {p}
          </UiText>
        ))}
        <UiText x={30} y={150} mono tone="ink3">
          + 18 more /&gt;
        </UiText>
        <Verdict x={160} y={22} ok={false} />
        {/* composed */}
        <Box x={192} y={14} w={200} h={150} />
        <Box x={204} y={26} w={52} h={70} fill={S.soft} dashed />
        <UiText x={230} y={66} mono tone="ink3" anchor="middle">
          Cover
        </UiText>
        <Box x={266} y={26} w={114} h={26} fill={S.soft} dashed />
        <UiText x={274} y={44} mono>
          Title
        </UiText>
        <Box x={266} y={58} w={114} h={26} fill={S.soft} dashed />
        <UiText x={274} y={76} mono>
          Meta
        </UiText>
        <Box x={204} y={110} w={176} h={40} fill={S.accentWash} stroke={S.accent} dashed />
        <UiText x={214} y={135} mono tone="accent">
          Actions slot
        </UiText>
        <Verdict x={384} y={22} ok />
        <line x1={8} y1={180} x2={392} y2={180} stroke={S.rule} strokeWidth="0.9" {...hair} />
        {/* compound tabs */}
        <Box x={8} y={194} w={110} h={94} fill={S.soft} stroke={S.ink2} />
        <UiText x={20} y={216} weight={600}>
          Tabs
        </UiText>
        <UiText x={20} y={238} mono tone="ink2">
          value
        </UiText>
        <UiText x={20} y={258} mono tone="ink2">
          ids
        </UiText>
        <UiText x={20} y={278} mono tone="ink3">
          context
        </UiText>
        <Box x={160} y={200} w={88} h={30} />
        <UiText x={204} y={220} anchor="middle">
          Tab
        </UiText>
        <Box x={160} y={250} w={88} h={30} />
        <UiText x={204} y={270} anchor="middle">
          TabPanel
        </UiText>
        <Link from={[118, 222]} to={[158, 215]} tone="mute" />
        <Link from={[118, 260]} to={[158, 265]} tone="mute" />
        <Link from={[248, 215]} via={[296, 240]} to={[250, 262]} tone="accent" />
        <UiText x={284} y={236} mono tone="accent">
          aria-controls
        </UiText>
        <UiText x={284} y={256} mono tone="ink3">
          set inside
        </UiText>
        {detail && (
          <>
            <Marker x={8} y={10} n={1} />
            <Marker x={192} y={102} n={2} />
            <Marker x={118} y={194} n={3} />
            <Marker x={392} y={280} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Variants                                                             */
/* ------------------------------------------------------------------ */
const INTENTS = ["primary", "secondary", "danger"] as const;
const SIZES = [
  { name: "sm", w: 36, h: 20 },
  { name: "md", w: 46, h: 24 },
  { name: "lg", w: 56, h: 28 },
] as const;
const FULL_SPACE = [INTENTS.length, SIZES.length, 2, 2];
const STATES = 5;
const EXCLUSIVE_FLAGS = 3;

export const variantsPlate: IllustrationEntry = {
  slug: "variants",
  title: "Variants plate",
  canvas: "sheet",
  description: (() => {
    const grid = variantCount([INTENTS.length, SIZES.length]);
    const full = variantCount(FULL_SPACE);
    const withStates = variantCount([...FULL_SPACE, STATES]);
    const b = booleanVsEnum(EXCLUSIVE_FLAGS);
    return `A grid of one button drawn ${grid} times: three intents (primary, secondary, danger) down the side and three sizes (sm, md, lg) across the top, each cell one variant. Beside the grid the count grows by multiplication: adding an icon option and a full-width option gives ${full} combinations, and drawing five interaction states as variants as well gives ${withStates}. Below, three exclusive booleans (isPrimary, isSecondary, isDanger) allow ${b.booleanCombinations} combinations of which only ${b.meaningful} make sense, while one intent enum allows exactly ${b.enumValues}.`;
  })(),
  key: [
    { n: "1", label: "Dimensions × values", detail: "each variant is one value on each named dimension" },
    { n: "2", label: "The space multiplies", detail: "variant count = product of the value counts" },
    { n: "3", label: "States are not variants", detail: "hover, focus and pressed come from the browser, not props" },
    { n: "4", label: "Enum over booleans", detail: "exclusive options as one enum make invalid states impossible" },
  ],
  Art: ({ detail }) => {
    const gx = 96;
    const gy = 40;
    const cw = 60;
    const ch = 40;
    const full = variantCount(FULL_SPACE);
    const withStates = variantCount([...FULL_SPACE, STATES]);
    const grid = variantCount([INTENTS.length, SIZES.length]);
    const b = booleanVsEnum(EXCLUSIVE_FLAGS);
    const fill = (i: (typeof INTENTS)[number]) => (i === "primary" ? S.ink : i === "danger" ? S.error : S.surface);
    return (
      <g>
        {SIZES.map((s, c) => (
          <UiText key={s.name} x={gx + c * cw + cw / 2} y={30} mono anchor="middle" tone="ink3">
            {s.name}
          </UiText>
        ))}
        {INTENTS.map((intent, r) => (
          <g key={intent}>
            <UiText x={88} y={gy + r * ch + 25} mono anchor="end">
              {intent}
            </UiText>
            {SIZES.map((s, c) => (
              <rect
                key={s.name}
                x={gx + c * cw + (cw - s.w) / 2}
                y={gy + r * ch + (ch - s.h) / 2}
                width={s.w}
                height={s.h}
                rx={5}
                fill={fill(intent)}
                stroke={intent === "secondary" ? S.ink2 : "none"}
                strokeWidth="1"
                {...hair}
              />
            ))}
          </g>
        ))}
        <UiText x={290} y={52} mono weight={600}>
          {`3 × 3 = ${grid}`}
        </UiText>
        <UiText x={290} y={78} mono>
          {`× 2 × 2 = ${full}`}
        </UiText>
        <UiText x={290} y={104} mono tone="error">
          {`× ${STATES} = ${withStates}`}
        </UiText>
        <UiText x={290} y={124} tone="ink3">
          as variants
        </UiText>
        <line x1={8} y1={176} x2={392} y2={176} stroke={S.rule} strokeWidth="0.9" {...hair} />
        {/* booleans vs enum */}
        <Box x={8} y={190} w={184} h={98} />
        {["isPrimary", "isSecondary", "isDanger"].map((f, i) => (
          <UiText key={f} x={20} y={212 + i * 20} mono tone="ink2">
            {f}
          </UiText>
        ))}
        <UiText x={20} y={278} mono tone="error">
          {`${b.booleanCombinations} combos · ${b.invalid} invalid`}
        </UiText>
        <Verdict x={180} y={204} ok={false} />
        <Box x={208} y={190} w={184} h={98} />
        <UiText x={220} y={212} mono tone="ink2">
          intent:
        </UiText>
        <UiText x={220} y={232} mono tone="ink2">
          primary | secondary
        </UiText>
        <UiText x={220} y={252} mono tone="ink2">
          | danger | default
        </UiText>
        <UiText x={220} y={278} mono tone="ok">
          {`${b.enumValues} values · 0 invalid`}
        </UiText>
        <Verdict x={380} y={204} ok />
        {detail && (
          <>
            <Marker x={gx} y={30} n={1} />
            <Marker x={392} y={50} n={2} />
            <Marker x={392} y={100} n={3} />
            <Marker x={200} y={182} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Component properties                                                 */
/* ------------------------------------------------------------------ */
const PROP_MAP = [
  { figma: "Label", kind: "text", code: "children: string" },
  { figma: "Variant", kind: "variant", code: "variant: enum" },
  { figma: "Show icon", kind: "boolean", code: "icon?: …" },
  { figma: "Icon", kind: "swap", code: "icon slot" },
] as const;

export const componentPropertiesPlate: IllustrationEntry = {
  slug: "component-properties",
  title: "Component properties plate",
  canvas: "sheet",
  description:
    "On the left, a design tool's properties panel for a Button with four properties of the four Figma types: Label (text), Variant (variant), Show icon (boolean) and Icon (instance swap). Arrows map each one-to-one to a code prop on the right: children as a string, variant as an enum, an optional icon, and an icon slot. Below, two uses of an icon-only button checked by the type system: one without a label is rejected, one with label 'Notifications' is accepted; and a pressed prop rendered by the component as aria-pressed.",
  key: [
    { n: "1", label: "Design-tool properties", detail: "text, variant, boolean and instance swap" },
    { n: "2", label: "One-to-one with code", detail: "same names, values and defaults in both" },
    { n: "3", label: "Required accessible name", detail: "the types reject an icon button without a label (WCAG 2.2 SC 4.1.2)" },
    { n: "4", label: "Meaning in, ARIA out", detail: "pressed becomes aria-pressed; the label stays constant" },
  ],
  Art: ({ detail }) => {
    return (
      <g>
        <Box x={8} y={14} w={168} h={168} fill={S.soft} />
        <UiText x={20} y={36} weight={600}>
          Button · properties
        </UiText>
        {PROP_MAP.map((p, i) => {
          const y = 52 + i * 32;
          return (
            <g key={p.figma}>
              <Box x={20} y={y} w={144} h={24} />
              <UiText x={28} y={y + 17}>
                {p.figma}
              </UiText>
              <UiText x={156} y={y + 17} mono tone="ink3" anchor="end">
                {p.kind}
              </UiText>
              <Link from={[166, y + 12]} to={[226, y + 12]} tone="accent" />
              <Box x={228} y={y} w={164} h={24} />
              <UiText x={236} y={y + 17} mono>
                {p.code}
              </UiText>
            </g>
          );
        })}
        <line x1={8} y1={198} x2={392} y2={198} stroke={S.rule} strokeWidth="0.9" {...hair} />
        <UiText x={8} y={222} mono tone="ink2">
          {`<Button variant="icon" />`}
        </UiText>
        <Verdict x={300} y={217} ok={false} />
        <UiText x={316} y={222} tone="error">
          no label
        </UiText>
        <UiText x={8} y={248} mono tone="ink2">
          {`… label="Notifications" />`}
        </UiText>
        <Verdict x={300} y={243} ok />
        <UiText x={8} y={280} mono>
          pressed
        </UiText>
        <Link from={[72, 276]} to={[118, 276]} />
        <UiText x={124} y={280} mono tone="accent">
          {`aria-pressed="true"`}
        </UiText>
        {detail && (
          <>
            <Marker x={8} y={14} n={1} />
            <Marker x={196} y={44} n={2} />
            <Marker x={392} y={222} n={3} />
            <Marker x={392} y={276} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Component state management                                           */
/* ------------------------------------------------------------------ */
export const componentStateManagementPlate: IllustrationEntry = {
  slug: "component-state-management",
  title: "Component state management plate",
  canvas: "sheet",
  description:
    "A state diagram for an asynchronous Renew button. Four states — idle, pending, renewed and error — with labelled transitions: press moves idle to pending; success moves pending to renewed; failure moves pending to error; retry moves error back to pending. A dashed loop on pending marks a second press as ignored, so the loan cannot be renewed twice. In a separate dashed region below, an independent focus region moves between blurred and focused, showing a concurrent state in the statechart sense. Beside pending, the ARIA mirror: aria-busy is true and the outcome is announced through a status message.",
  key: [
    { n: "1", label: "One state at a time", detail: "a single status value replaces contradictory booleans" },
    { n: "2", label: "Ignored events", detail: "a press while pending does nothing — no double renewal" },
    { n: "3", label: "Concurrent region", detail: "focus changes independently of the request (statecharts, Harel 1987)" },
    { n: "4", label: "ARIA mirrors state", detail: "aria-busy while pending; outcome announced as a status message (SC 4.1.3)" },
  ],
  Art: ({ detail }) => {
    const st = (x: number, y: number, label: string, tone: "ink" | "accent" | "ok" | "error" = "ink") => (
      <g>
        <Box x={x} y={y} w={84} h={34} rx={17} fill={tone === "accent" ? S.accentWash : tone === "ok" ? S.okWash : tone === "error" ? S.errorWash : S.surface} stroke={tone === "accent" ? S.accent : tone === "ok" ? S.ok : tone === "error" ? S.error : S.ink2} />
        <UiText x={x + 42} y={y + 22} mono weight={600} anchor="middle">
          {label}
        </UiText>
      </g>
    );
    return (
      <g>
        {st(8, 70, "idle")}
        {st(150, 70, "pending", "accent")}
        {st(300, 20, "renewed", "ok")}
        {st(300, 124, "error", "error")}
        <Link from={[92, 87]} to={[148, 87]} />
        <UiText x={120} y={80} mono tone="ink2" anchor="middle">
          press
        </UiText>
        <Link from={[234, 80]} to={[298, 42]} />
        <UiText x={302} y={74} mono tone="ink2">
          success
        </UiText>
        <Link from={[234, 96]} to={[298, 134]} />
        <UiText x={302} y={112} mono tone="ink2">
          failure
        </UiText>
        <Link from={[300, 152]} via={[220, 176]} to={[200, 106]} tone="mute" />
        <UiText x={250} y={186} mono tone="ink3">
          retry
        </UiText>
        <path d="M172 70 C 160 34, 222 34, 212 70" fill="none" stroke={S.ink3} strokeWidth="1" strokeDasharray="3 2.5" {...hair} />
        <UiText x={192} y={30} mono tone="ink3" anchor="middle">
          press: ignored
        </UiText>
        <UiText x={8} y={136} mono tone="accent">
          {`aria-busy="true"`}
        </UiText>
        <UiText x={8} y={156} mono tone="ink3">
          {`role="status"`}
        </UiText>
        {/* concurrent focus region */}
        <Box x={8} y={206} w={384} h={84} fill="none" stroke={S.ink3} dashed rx={10} />
        <UiText x={20} y={228} mono tone="ink3">
          focus region (concurrent)
        </UiText>
        {st(60, 240, "blurred")}
        {st(240, 240, "focused")}
        <Link from={[146, 252]} to={[238, 252]} />
        <Link from={[238, 268]} to={[146, 268]} />
        {detail && (
          <>
            <Marker x={8} y={66} n={1} />
            <Marker x={124} y={40} n={2} />
            <Marker x={392} y={206} n={3} />
            <Marker x={150} y={150} n={4} />
          </>
        )}
      </g>
    );
  },
};
