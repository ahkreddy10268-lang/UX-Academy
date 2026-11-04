/**
 * Plates: domains — one subject emblem per taxonomy domain (slug = domain id).
 * Bolder and simpler than concept plates so they read at tile size.
 * Authored to docs/ILLUSTRATION_SYSTEM.md rules ("ia" lives in core-plates.tsx).
 */
import type { IllustrationEntry } from "../illustration-types";
import { Arrow, C, CurveArrow, Cursor, HatchDefs, Label, Lines, Node, STROKE, Window } from "../primitives";

/* ---------------- Foundations: person ↔ product, inside a context ---------------- */
const foundations: IllustrationEntry = {
  slug: "foundations",
  title: "UX & UI Fundamentals subject plate",
  description:
    "A person on the left and a product window on the right are joined by arrows running both ways, showing use and response. Both sit inside a large outlined field labelled context, because experience depends on who, what and where.",
  Art: ({ detail }) => (
    <g>
      <ellipse cx="200" cy="150" rx="172" ry="118" fill={C.soft} opacity="0.45" stroke={C.line} strokeWidth={STROKE.fine} strokeDasharray="5 5" />
      {/* person */}
      <circle cx="100" cy="118" r="20" fill={C.base} stroke={C.line} strokeWidth={STROKE.main} />
      <path d="M66 196 Q100 142 134 196 Z" fill={C.base} stroke={C.line} strokeWidth={STROKE.main} strokeLinejoin="round" />
      {/* product */}
      <Window x={236} y={96} w={110} h={100}>
        <rect x={246} y={120} width={44} height={10} fill={C.base} />
        <Lines x={246} y={146} w={88} n={3} gap={11} />
      </Window>
      <Arrow x1={146} y1={136} x2={226} y2={136} width={STROKE.main} />
      <Arrow x1={226} y1={164} x2={146} y2={164} width={STROKE.main} />
      <Label x={100} y={224} show={detail}>person</Label>
      <Label x={291} y={224} show={detail}>product</Label>
      <Label x={186} y={126} show={detail} tone="mute">use</Label>
      <Label x={186} y={184} show={detail} tone="mute">response</Label>
      <Label x={200} y={262} show={detail}>context of use</Label>
    </g>
  ),
};

/* ---------------- Laws & effects: a regularity across many trials ---------------- */
const lawsEffects: IllustrationEntry = {
  slug: "laws-effects",
  title: "UX Laws & Cognitive Effects subject plate",
  description:
    "A scatter of many small measurement dots on a pair of axes forms a rising band, and a single fitted line runs through it. It shows a law as a regularity that appears again and again across many observed trials.",
  Art: ({ detail }) => {
    // deterministic pseudo-random scatter around y = 230 - 0.5x
    const pts = Array.from({ length: 34 }, (_, i) => {
      const x = 64 + i * 8.6;
      const noise = Math.sin(i * 12.9898) * 43758.5453;
      const r = (noise - Math.floor(noise) - 0.5) * 46;
      return [x, 238 - (x - 50) * 0.58 + r];
    });
    return (
      <g>
        <line x1="48" y1="252" x2="364" y2="252" stroke={C.line} strokeWidth={STROKE.main} />
        <line x1="48" y1="252" x2="48" y2="40" stroke={C.line} strokeWidth={STROKE.main} />
        <path d="M60 220 L360 60 L360 112 L60 272 Z" fill={C.soft} opacity="0.5" />
        {pts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={5} fill={C.base} stroke={C.line} strokeWidth={STROKE.hair} />
        ))}
        <line x1="60" y1="246" x2="360" y2="72" stroke={C.ink} strokeWidth={STROKE.main * 1.3} strokeLinecap="round" />
        <Label x={66} y={52} anchor="start" show={detail}>fitted regularity</Label>
        <Label x={360} y={272} anchor="end" show={detail} tone="mute">many trials →</Label>
      </g>
    );
  },
};

/* ---------------- Psychology: an attention spotlight over a field ---------------- */
const psychology: IllustrationEntry = {
  slug: "psychology",
  title: "Cognition, Behaviour & Human Factors subject plate",
  description:
    "A field of identical outlined squares fills the plate. A soft circular spotlight falls on part of the field, and only the items inside it are filled in, showing that attention selects a small part of what is available.",
  animated: true,
  Art: ({ detail, animate }) => {
    const cells: [number, number][] = [];
    for (let r = 0; r < 6; r++) for (let c = 0; c < 9; c++) cells.push([52 + c * 37, 52 + r * 38]);
    const sx = 186;
    const sy = 138;
    const inside = ([x, y]: [number, number]) => (x - sx) ** 2 + (y - sy) ** 2 < 66 ** 2;
    return (
      <g>
        <g className={animate ? "anim-drift" : undefined}>
          <circle cx={sx} cy={sy} r="78" fill={C.soft} opacity="0.75" stroke={C.ink} strokeWidth={STROKE.fine} />
        </g>
        {cells.map(([x, y], i) => (
          <rect key={i} x={x - 9} y={y - 9} width={18} height={18} rx={2} fill={inside([x, y]) ? C.base : "none"} stroke={inside([x, y]) ? C.line : C.mute} strokeWidth={inside([x, y]) ? STROKE.fine : STROKE.hair} />
        ))}
        <Label x={sx} y={32} show={detail}>attended</Label>
        <Label x={360} y={286} anchor="end" show={detail} tone="mute">unattended field</Label>
      </g>
    );
  },
};

/* ---------------- Heuristics: a checklist lens over an interface ---------------- */
const heuristics: IllustrationEntry = {
  slug: "heuristics",
  title: "Principles & Heuristics subject plate",
  description:
    "A magnifying lens rests over part of an interface window, enlarging one element for inspection. Beside it, a checklist of rules shows some items ticked and one flagged, representing judging a design against principles.",
  Art: ({ detail }) => (
    <g>
      <Window x={36} y={60} w={196} h={170}>
        <rect x={48} y={86} width={70} height={12} fill={C.soft} />
        <Lines x={48} y={118} w={170} n={4} gap={14} />
        <rect x={48} y={186} width={56} height={22} rx={3} fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} />
      </Window>
      {/* lens */}
      <circle cx="132" cy="168" r="46" fill={C.paper} opacity="0.55" stroke={C.line} strokeWidth={STROKE.main * 1.4} />
      <line x1="166" y1="202" x2="198" y2="236" stroke={C.line} strokeWidth="7" strokeLinecap="round" />
      {/* checklist */}
      <rect x="258" y="66" width="108" height="160" rx="3" fill={C.surface} stroke={C.line} strokeWidth={STROKE.fine} />
      {[0, 1, 2, 3].map((i) => {
        const y = 94 + i * 34;
        const flagged = i === 2;
        return (
          <g key={i}>
            <rect x={270} y={y - 9} width={18} height={18} rx={2} fill={flagged ? C.base : C.surface} stroke={C.line} strokeWidth={STROKE.fine} />
            {flagged ? (
              <path d={`M${275} ${y - 4} l8 8 M${283} ${y - 4} l-8 8`} stroke={C.paper} strokeWidth="2.2" strokeLinecap="round" />
            ) : (
              <path d={`M${274} ${y} l4 4 7 -8`} fill="none" stroke={C.line} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            )}
            <Lines x={298} y={y} w={56} n={1} last={1} />
          </g>
        );
      })}
      <Label x={312} y={252} show={detail}>rules</Label>
      <Label x={132} y={262} show={detail}>inspect</Label>
    </g>
  ),
};

/* ---------------- Research: observer, participant, evidence ---------------- */
const research: IllustrationEntry = {
  slug: "research",
  title: "UX Research subject plate",
  description:
    "A participant on the left works with a device while an observer on the right watches. A dotted line of sight runs from observer to participant, and an arrow leads from the observer to a notebook where observations are recorded as evidence.",
  Art: ({ detail }) => (
    <g>
      {/* participant + device */}
      <circle cx="82" cy="104" r="17" fill={C.base} stroke={C.line} strokeWidth={STROKE.main} />
      <path d="M52 172 Q82 124 112 172 Z" fill={C.base} stroke={C.line} strokeWidth={STROKE.main} strokeLinejoin="round" />
      <rect x="62" y="180" width="54" height="38" rx="4" fill={C.surface} stroke={C.line} strokeWidth={STROKE.main} />
      <Lines x={70} y={194} w={38} n={2} gap={10} />
      {/* observer */}
      <circle cx="232" cy="104" r="17" fill={C.surface} stroke={C.line} strokeWidth={STROKE.main} />
      <path d="M202 172 Q232 124 262 172 Z" fill={C.surface} stroke={C.line} strokeWidth={STROKE.main} strokeLinejoin="round" />
      <line x1="212" y1="104" x2="104" y2="196" stroke={C.ink} strokeWidth={STROKE.fine} strokeDasharray="2 5" strokeLinecap="round" />
      {/* notebook */}
      <rect x="292" y="110" width="78" height="100" rx="3" fill={C.surface} stroke={C.line} strokeWidth={STROKE.main} />
      <line x1="304" y1="110" x2="304" y2="210" stroke={C.ink} strokeWidth={STROKE.fine} />
      <Lines x={312} y={132} w={48} n={5} gap={14} />
      <rect x="312" y="186" width="30" height="8" fill={C.base} />
      <Arrow x1={256} y1={140} x2={286} y2={150} width={STROKE.main} />
      <Label x={89} y={244} show={detail}>participant</Label>
      <Label x={232} y={196} show={detail}>observer</Label>
      <Label x={331} y={232} show={detail}>evidence</Label>
    </g>
  ),
};

/* ---------------- Frameworks: a scaffold holding up work in progress ---------------- */
const frameworks: IllustrationEntry = {
  slug: "frameworks",
  title: "Design Methods & Frameworks subject plate",
  description:
    "A scaffold of vertical poles and horizontal platforms with diagonal braces surrounds a solid block that is being built up from the ground. Frameworks give structure to work without being the work itself.",
  Art: ({ detail }) => (
    <g>
      <line x1="40" y1="256" x2="360" y2="256" stroke={C.line} strokeWidth={STROKE.main} />
      {/* the work */}
      <rect x="148" y="126" width="104" height="130" fill={C.base} stroke={C.line} strokeWidth={STROKE.main} />
      <rect x="148" y="96" width="62" height="30" fill={C.soft} stroke={C.line} strokeWidth={STROKE.fine} strokeDasharray="4 3" />
      {/* scaffold */}
      <g stroke={C.line} strokeWidth={STROKE.main} strokeLinecap="round">
        {[100, 132, 268, 300].map((x) => (
          <line key={x} x1={x} y1={256} x2={x} y2={56} />
        ))}
        {[96, 156, 216].map((y) => (
          <g key={y}>
            <line x1={92} y1={y} x2={140} y2={y} />
            <line x1={260} y1={y} x2={308} y2={y} />
          </g>
        ))}
      </g>
      <g stroke={C.ink} strokeWidth={STROKE.fine}>
        {[96, 156].map((y) => (
          <g key={y}>
            <line x1={100} y1={y} x2={132} y2={y + 60} />
            <line x1={268} y1={y + 60} x2={300} y2={y} />
          </g>
        ))}
      </g>
      <Label x={116} y={46} show={detail}>structure</Label>
      <Label x={200} y={280} show={detail}>the work</Label>
    </g>
  ),
};

/* ---------------- Interaction: input → system → feedback ---------------- */
const interaction: IllustrationEntry = {
  slug: "interaction",
  title: "Interaction Design subject plate",
  description:
    "A pointer on the left sends an input arrow to a control panel representing the system. A curved arrow returns from the system to the person as feedback, closing a loop between action and response.",
  animated: true,
  Art: ({ detail, animate }) => (
    <g>
      <Cursor x={60} y={128} scale={2} />
      <Arrow x1={104} y1={150} x2={176} y2={150} width={STROKE.main} />
      <rect x="184" y="96" width="118" height="108" rx="6" fill={C.surface} stroke={C.line} strokeWidth={STROKE.main} />
      <circle cx="218" cy="132" r="16" fill={C.base} stroke={C.line} strokeWidth={STROKE.main} />
      <rect x="244" y="124" width="44" height="16" rx="8" fill={C.soft} stroke={C.line} strokeWidth={STROKE.fine} />
      <rect x="198" y="166" width="90" height="20" rx="3" fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} className={animate ? "anim-fade" : undefined} />
      <CurveArrow d="M 244 210 C 230 280, 100 278, 82 186" tip={[82, 186]} angle={-1.8} color={C.ink} width={STROKE.main} dashed />
      <Label x={140} y={138} show={detail}>input</Label>
      <Label x={243} y={84} show={detail}>system</Label>
      <Label x={160} y={286} show={detail}>feedback</Label>
    </g>
  ),
};

/* ---------------- Visual: grid, weight, hierarchy ---------------- */
const visual: IllustrationEntry = {
  slug: "visual",
  title: "UI & Visual Design subject plate",
  description:
    "A page composition sits on a six-column grid shown as faint dashed guides. A large heavy block, a medium heading bar and smaller lines of text descend in size and weight, creating a clear visual hierarchy aligned to the grid.",
  Art: ({ detail }) => {
    const cols = Array.from({ length: 7 }, (_, i) => 56 + i * 48);
    return (
      <g>
        <rect x="56" y="40" width="288" height="220" fill={C.surface} stroke={C.line} strokeWidth={STROKE.fine} />
        {cols.map((x) => (
          <line key={x} x1={x} y1={40} x2={x} y2={260} stroke={C.ink} strokeWidth={STROKE.hair} strokeDasharray="3 4" opacity="0.6" />
        ))}
        <rect x="56" y="40" width="192" height="104" fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} />
        <rect x="56" y="160" width="144" height="16" fill={C.line} />
        <Lines x={56} y={196} w={144} n={3} gap={13} />
        <rect x="248" y="160" width="96" height="76" fill={C.soft} stroke={C.line} strokeWidth={STROKE.fine} />
        <circle cx="296" cy="92" r="26" fill={C.soft} stroke={C.line} strokeWidth={STROKE.fine} />
        <Label x={152} y={282} show={detail}>large → small · heavy → light</Label>
        <Label x={344} y={32} anchor="end" show={detail} tone="mute">6-column grid</Label>
      </g>
    );
  },
};

/* ---------------- Type & colour: a letterform and a colour ramp ---------------- */
const typeColour: IllustrationEntry = {
  slug: "type-colour",
  title: "Typography & Colour Science subject plate",
  description:
    "A large serif letter A sits on a baseline with its cap height and x-height marked by thin guide lines. Beside it, a vertical ramp of swatches steps from light to dark, representing colour measured as lightness.",
  Art: ({ detail }) => (
    <g>
      <line x1="34" y1="226" x2="250" y2="226" stroke={C.ink} strokeWidth={STROKE.fine} />
      <line x1="34" y1="70" x2="250" y2="70" stroke={C.ink} strokeWidth={STROKE.hair} strokeDasharray="4 4" />
      <line x1="34" y1="152" x2="250" y2="152" stroke={C.ink} strokeWidth={STROKE.hair} strokeDasharray="4 4" />
      <text x="62" y="226" fontSize="210" fill={C.base} stroke={C.line} strokeWidth="1.5" fontFamily="var(--font-newsreader), Georgia, serif">
        A
      </text>
      <text x="184" y="226" fontSize="104" fill={C.line} fontFamily="var(--font-newsreader), Georgia, serif" fontStyle="italic">
        a
      </text>
      {[0.15, 0.35, 0.55, 0.75, 1].map((o, i) => (
        <g key={i}>
          <rect x="290" y={56 + i * 36} width="76" height="30" fill={C.wash} />
          <rect x="290" y={56 + i * 36} width="76" height="30" fill={C.base} opacity={o} stroke={C.line} strokeWidth={STROKE.fine} />
        </g>
      ))}
      <rect x="290" y="236" width="76" height="12" fill={C.line} />
      <Label x={40} y={64} anchor="start" show={detail} tone="mute">cap height</Label>
      <Label x={40} y={146} anchor="start" show={detail} tone="mute">x-height</Label>
      <Label x={40} y={246} anchor="start" show={detail} tone="mute">baseline</Label>
      <Label x={328} y={272} show={detail}>lightness</Label>
    </g>
  ),
};

/* ---------------- Design systems: tokens compose components ---------------- */
const designSystems: IllustrationEntry = {
  slug: "design-systems",
  title: "Design Systems subject plate",
  description:
    "On the left, a column of design tokens: a colour swatch, a spacing measure and a corner radius. Arrows carry them into two components on the right, a button and a card, which are both built from the same tokens.",
  Art: ({ detail }) => (
    <g>
      {/* tokens */}
      <rect x="40" y="58" width="44" height="44" rx="4" fill={C.base} stroke={C.line} strokeWidth={STROKE.main} />
      <g stroke={C.line} strokeWidth={STROKE.main}>
        <line x1="40" y1="150" x2="84" y2="150" />
        <line x1="40" y1="141" x2="40" y2="159" />
        <line x1="84" y1="141" x2="84" y2="159" />
      </g>
      <path d="M40 240 V212 A 16 16 0 0 1 56 196 H84" fill="none" stroke={C.line} strokeWidth={STROKE.main} />
      <circle cx="56" cy="212" r="3" fill={C.ink} />
      {/* flow */}
      <g>
        <Arrow x1={100} y1={80} x2={196} y2={112} />
        <Arrow x1={100} y1={150} x2={196} y2={150} />
        <Arrow x1={100} y1={218} x2={196} y2={186} />
      </g>
      {/* components */}
      <rect x="212" y="58" width="150" height="46" rx="10" fill={C.base} stroke={C.line} strokeWidth={STROKE.main} />
      <Lines x={232} y={81} w={80} n={1} color={C.paper} last={1} />
      <rect x="212" y="128" width="150" height="118" rx="10" fill={C.surface} stroke={C.line} strokeWidth={STROKE.main} />
      <rect x="226" y="142" width="122" height="40" rx="6" fill={C.soft} />
      <Lines x={228} y={200} w={110} n={2} gap={12} />
      <rect x="226" y="222" width="56" height="14" rx="7" fill={C.base} />
      <Label x={62} y={46} show={detail}>tokens</Label>
      <Label x={287} y={272} show={detail}>components</Label>
    </g>
  ),
};

/* ---------------- Accessibility: one interface, many ways in ---------------- */
const accessibility: IllustrationEntry = {
  slug: "accessibility",
  title: "Accessibility & Inclusive Design subject plate",
  description:
    "A single interface window sits at the centre. Four routes lead into it from around the edge: a keyboard, a pointer, speech shown as sound waves, and a screen reader shown as a stream of spoken text, so the same content is reachable through several input and perception modes.",
  Art: ({ detail }) => (
    <g>
      <Window x={140} y={96} w={120} h={108}>
        <rect x={152} y={120} width={46} height={10} fill={C.base} />
        <Lines x={152} y={146} w={96} n={3} gap={12} />
        <rect x={152} y={180} width={40} height={14} rx={3} fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} />
      </Window>
      {/* keyboard */}
      <rect x="30" y="54" width="82" height="44" rx="4" fill={C.surface} stroke={C.line} strokeWidth={STROKE.main} />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3, 4].map((c) => <rect key={`${r}${c}`} x={36 + c * 15} y={60 + r * 12} width={11} height={8} rx={1.5} fill={r === 2 && c > 0 && c < 4 ? C.base : C.soft} />),
      )}
      {/* pointer */}
      <Cursor x={330} y={56} scale={1.7} />
      {/* speech */}
      <g fill="none" stroke={C.line} strokeWidth={STROKE.main} strokeLinecap="round">
        <circle cx="62" cy="232" r="9" fill={C.base} />
        <path d="M80 220 a18 18 0 0 1 0 24" />
        <path d="M92 210 a32 32 0 0 1 0 44" />
      </g>
      {/* screen reader */}
      <g>
        <rect x="292" y="210" width="80" height="44" rx="4" fill={C.surface} stroke={C.line} strokeWidth={STROKE.main} />
        <Lines x={302} y={224} w={60} n={2} gap={12} color={C.ink} />
      </g>
      <g>
        <Arrow x1={114} y1={92} x2={136} y2={108} />
        <Arrow x1={320} y1={86} x2={266} y2={110} />
        <Arrow x1={110} y1={226} x2={136} y2={196} />
        <Arrow x1={264} y1={196} x2={290} y2={218} />
      </g>
      <Label x={71} y={44} show={detail}>keyboard</Label>
      <Label x={344} y={112} show={detail}>pointer</Label>
      <Label x={70} y={276} show={detail}>voice</Label>
      <Label x={332} y={276} show={detail}>screen reader</Label>
    </g>
  ),
};

/* ---------------- Content: microcopy on an interface element ---------------- */
const content: IllustrationEntry = {
  slug: "content",
  title: "UX Writing & Content Design subject plate",
  description:
    "An enlarged form field shows the words that surround it: a label above, helper text below, an error message with a marker, and a clear action on the button. The words are part of the interface, not decoration around it.",
  Art: ({ detail }) => (
    <g>
      <rect x="70" y="44" width="260" height="214" rx="6" fill={C.surface} stroke={C.line} strokeWidth={STROKE.main} />
      <rect x="92" y="68" width="88" height="10" rx="2" fill={C.line} />
      <rect x="92" y="88" width="216" height="38" rx="4" fill={C.paper} stroke={C.base} strokeWidth={STROKE.main * 1.2} />
      <Lines x={104} y={107} w={90} n={1} last={1} />
      <circle cx="98" cy="146" r="6" fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} />
      <rect x="112" y="141" width="150" height="10" rx="2" fill={C.base} />
      <Lines x={92} y={172} w={176} n={2} gap={11} />
      <rect x="92" y="208" width="112" height="32" rx="4" fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} />
      <rect x="110" y="220" width="76" height="8" rx="2" fill={C.paper} />
      <Label x={344} y={74} anchor="start" show={detail}>label</Label>
      <Label x={344} y={150} anchor="start" show={detail}>error</Label>
      <Label x={344} y={182} anchor="start" show={detail}>help</Label>
      <Label x={344} y={228} anchor="start" show={detail}>action</Label>
      <g stroke={C.ink} strokeWidth={STROKE.hair} strokeDasharray="2 3">
        <line x1="184" y1="73" x2="338" y2="73" />
        <line x1="266" y1="146" x2="338" y2="146" />
        <line x1="272" y1="178" x2="338" y2="178" />
        <line x1="208" y1="224" x2="338" y2="224" />
      </g>
    </g>
  ),
};

/* ---------------- Product: problem → opportunity → outcome ---------------- */
const product: IllustrationEntry = {
  slug: "product",
  title: "Product Design & Strategy subject plate",
  description:
    "Three stages run left to right. A tangled knot of lines represents the problem; a branching tree of options represents the opportunities; and a target with rising bars represents the measured outcome, with one branch highlighted as the chosen path.",
  Art: ({ detail }) => (
    <g>
      {/* problem: tangle */}
      <path
        d="M40 150 C 60 100, 110 110, 92 150 S 50 200, 70 168 S 120 130, 104 182 S 56 176, 66 132 S 116 120, 112 158"
        fill="none"
        stroke={C.line}
        strokeWidth={STROKE.main}
        strokeLinecap="round"
      />
      <Arrow x1={126} y1={150} x2={152} y2={150} />
      {/* opportunity tree */}
      <g stroke={C.line} strokeWidth={STROKE.fine}>
        <line x1="166" y1="150" x2="206" y2="104" />
        <line x1="166" y1="150" x2="206" y2="150" />
        <line x1="166" y1="150" x2="206" y2="196" />
        <line x1="206" y1="150" x2="240" y2="128" />
        <line x1="206" y1="150" x2="240" y2="172" />
      </g>
      <line x1="166" y1="150" x2="206" y2="150" stroke={C.ink} strokeWidth={STROKE.main * 1.3} />
      <line x1="206" y1="150" x2="240" y2="172" stroke={C.ink} strokeWidth={STROKE.main * 1.3} />
      <Node cx={166} cy={150} r={7} fill={C.surface} />
      {[[206, 104], [206, 196], [240, 128]].map(([x, y]) => (
        <Node key={`${x}${y}`} cx={x} cy={y} r={7} fill={C.surface} />
      ))}
      <Node cx={206} cy={150} r={8} />
      <Node cx={240} cy={172} r={8} />
      <Arrow x1={256} y1={168} x2={280} y2={156} />
      {/* outcome */}
      <line x1="290" y1="226" x2="370" y2="226" stroke={C.line} strokeWidth={STROKE.main} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={298 + i * 24} y={226 - (30 + i * 28)} width={16} height={30 + i * 28} fill={i === 2 ? C.base : C.soft} stroke={C.line} strokeWidth={STROKE.fine} />
      ))}
      <circle cx="354" cy="92" r="18" fill="none" stroke={C.line} strokeWidth={STROKE.main} />
      <circle cx="354" cy="92" r="8" fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} />
      <Label x={80} y={232} show={detail}>problem</Label>
      <Label x={204} y={232} show={detail}>opportunities</Label>
      <Label x={330} y={252} show={detail}>outcome</Label>
    </g>
  ),
};

/* ---------------- Service: line of visibility ---------------- */
const service: IllustrationEntry = {
  slug: "service",
  title: "Service Design & Systems Thinking subject plate",
  description:
    "A horizontal dashed line of visibility divides the plate. Above it, a row of customer touchpoints is joined into a journey; below it, backstage staff and system steps support each touchpoint through vertical connections that cross the line.",
  Art: ({ detail }) => {
    const xs = [176, 230, 284, 338];
    return (
      <g>
        <rect x="24" y="160" width="352" height="116" fill={C.soft} opacity="0.4" />
        <line x1="24" y1="160" x2="376" y2="160" stroke={C.ink} strokeWidth={STROKE.main} strokeDasharray="8 5" />
        {xs.slice(0, -1).map((x, i) => (
          <Arrow key={x} x1={x + 20} y1={92} x2={xs[i + 1] - 20} y2={92} width={STROKE.main} />
        ))}
        {xs.map((x, i) => (
          <g key={x}>
            <line x1={x} y1={110} x2={x} y2={204} stroke={C.line} strokeWidth={STROKE.fine} strokeDasharray="3 3" />
            <circle cx={x} cy={92} r={16} fill={C.base} stroke={C.line} strokeWidth={STROKE.main} />
            <rect x={x - 18} y={206} width={36} height={26} rx={3} fill={C.surface} stroke={C.line} strokeWidth={STROKE.fine} />
            {i % 2 === 0 && <rect x={x - 12} y={246} width={24} height={16} rx={2} fill={C.surface} stroke={C.line} strokeWidth={STROKE.hair} />}
            {i % 2 === 0 && <line x1={x} y1={232} x2={x} y2={246} stroke={C.line} strokeWidth={STROKE.hair} />}
          </g>
        ))}
        <Label x={30} y={52} anchor="start" show={detail}>frontstage · customer journey</Label>
        <Label x={28} y={154} anchor="start" show={detail}>line of visibility</Label>
        <Label x={372} y={292} anchor="end" show={detail}>backstage · staff & systems</Label>
      </g>
    );
  },
};

/* ---------------- Metrics: a measurement axis with a distribution ---------------- */
const metrics: IllustrationEntry = {
  slug: "metrics",
  title: "Metrics, Formulas & Statistics subject plate",
  description:
    "A histogram of measurements rises and falls over a scale with tick marks, forming a rough bell shape. A vertical line marks the mean and a bracket beneath it marks the confidence interval, showing that every metric is an estimate with uncertainty.",
  Art: ({ detail }) => {
    const hs = [16, 34, 62, 104, 146, 128, 92, 54, 28, 12];
    return (
      <g>
        {hs.map((h, i) => (
          <rect key={i} x={60 + i * 28} y={224 - h} width={24} height={h} fill={i === 4 || i === 5 ? C.base : C.soft} stroke={C.line} strokeWidth={STROKE.fine} />
        ))}
        <line x1="48" y1="224" x2="352" y2="224" stroke={C.line} strokeWidth={STROKE.main} />
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={i} x1={58 + i * 28} y1={224} x2={58 + i * 28} y2={232} stroke={C.line} strokeWidth={STROKE.fine} />
        ))}
        <line x1="198" y1="52" x2="198" y2="224" stroke={C.ink} strokeWidth={STROKE.main} strokeDasharray="5 4" />
        <g stroke={C.ink} strokeWidth={STROKE.main}>
          <line x1="164" y1="252" x2="232" y2="252" />
          <line x1="164" y1="244" x2="164" y2="260" />
          <line x1="232" y1="244" x2="232" y2="260" />
        </g>
        <circle cx="198" cy="252" r="5" fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} />
        <Label x={206} y={60} anchor="start" show={detail}>mean</Label>
        <Label x={198} y={282} show={detail}>95% confidence interval</Label>
      </g>
    );
  },
};

/* ---------------- Data visualisation: encodings ranked ---------------- */
const dataviz: IllustrationEntry = {
  slug: "dataviz",
  title: "Data Visualisation subject plate",
  description:
    "Three panels encode the same four values in different ways: as positions of dots on a common scale, as lengths of bars, and as angles of pie wedges. They are numbered 1 to 3 in order of how accurately people tend to read them.",
  Art: ({ detail }) => {
    const v = [0.9, 0.55, 0.7, 0.3];
    return (
      <g>
        {/* position */}
        <line x1="44" y1="66" x2="44" y2="226" stroke={C.line} strokeWidth={STROKE.main} />
        {v.map((x, i) => (
          <g key={i}>
            <line x1={44} y1={84 + i * 40} x2={118} y2={84 + i * 40} stroke={C.mute} strokeWidth={STROKE.hair} strokeDasharray="2 3" />
            <circle cx={44 + x * 74} cy={84 + i * 40} r={7} fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} />
          </g>
        ))}
        {/* length */}
        {v.map((x, i) => (
          <rect key={i} x={162 + i * 22} y={226 - x * 150} width={16} height={x * 150} fill={i === 0 ? C.base : C.soft} stroke={C.line} strokeWidth={STROKE.fine} />
        ))}
        <line x1="156" y1="226" x2="256" y2="226" stroke={C.line} strokeWidth={STROKE.main} />
        {/* angle */}
        {(() => {
          const total = v.reduce((a, b) => a + b, 0);
          let a0 = -Math.PI / 2;
          const cx = 322;
          const cy = 146;
          const r = 48;
          return v.map((x, i) => {
            const a1 = a0 + (x / total) * Math.PI * 2;
            const d = `M${cx} ${cy} L${cx + r * Math.cos(a0)} ${cy + r * Math.sin(a0)} A ${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${cx + r * Math.cos(a1)} ${cy + r * Math.sin(a1)} Z`;
            a0 = a1;
            return <path key={i} d={d} fill={i === 0 ? C.base : i % 2 ? C.soft : C.surface} stroke={C.line} strokeWidth={STROKE.fine} />;
          });
        })()}
        {[["1", 82], ["2", 206], ["3", 322]].map(([n, x]) => (
          <g key={n as string}>
            <circle cx={x as number} cy={262} r={11} fill={C.surface} stroke={C.line} strokeWidth={STROKE.fine} />
            <text x={x as number} y={266} textAnchor="middle" fontSize="12" fill={C.line} fontFamily="var(--font-plex-mono), monospace">
              {n}
            </text>
          </g>
        ))}
        <Label x={82} y={48} show={detail}>position</Label>
        <Label x={206} y={48} show={detail}>length</Label>
        <Label x={322} y={48} show={detail}>angle</Label>
      </g>
    );
  },
};

/* ---------------- Ethics: respectful vs manipulative choice architecture ---------------- */
const ethics: IllustrationEntry = {
  slug: "ethics",
  title: "Ethical & Responsible Design subject plate",
  description:
    "From a starting point, two paths lead to the person's goal. The lower path is short and direct; the upper path twists through a hatched trap before it gets there, representing a deceptive pattern that works against the user.",
  Art: ({ detail }) => (
    <g>
      <HatchDefs id="ethics-hatch" />
      <circle cx="54" cy="176" r="14" fill={C.surface} stroke={C.line} strokeWidth={STROKE.main} />
      {/* manipulative path */}
      <path
        d="M66 168 C 100 70, 140 150, 160 96 S 200 40, 214 110 S 260 150, 270 84 S 320 100, 334 160"
        fill="none"
        stroke={C.mute}
        strokeWidth={STROKE.main}
        strokeDasharray="5 5"
        strokeLinecap="round"
      />
      <rect x="186" y="62" width="58" height="50" rx="4" fill="url(#ethics-hatch)" stroke={C.ink} strokeWidth={STROKE.fine} />
      {/* respectful path */}
      <Arrow x1={70} y1={190} x2={326} y2={190} width={STROKE.main * 1.4} color={C.line} head={10} />
      <circle cx="346" cy="182" r="20" fill={C.base} stroke={C.line} strokeWidth={STROKE.main} />
      <path d="M337 182 l6 6 12 -13" fill="none" stroke={C.paper} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <Label x={54} y={214} show={detail}>start</Label>
      <Label x={215} y={52} show={detail}>trap</Label>
      <Label x={196} y={214} show={detail}>direct, honest path</Label>
      <Label x={346} y={226} show={detail}>goal</Label>
      <Label x={110} y={60} show={detail} tone="mute">deceptive path</Label>
    </g>
  ),
};

/* ---------------- Emerging: human–AI turn-taking with uncertainty ---------------- */
const emerging: IllustrationEntry = {
  slug: "emerging",
  title: "Emerging & Specialised Disciplines subject plate",
  description:
    "A conversation alternates between a person on the left and an AI system on the right, drawn as message bubbles. The AI's replies carry a partly filled confidence bar and a dashed outline, showing answers that come with uncertainty the interface must communicate.",
  animated: true,
  Art: ({ detail, animate }) => (
    <g>
      {/* human turns */}
      <rect x="40" y="46" width="170" height="44" rx="12" fill={C.surface} stroke={C.line} strokeWidth={STROKE.main} />
      <Lines x={56} y={64} w={130} n={2} gap={11} />
      <rect x="40" y="186" width="130" height="34" rx="12" fill={C.surface} stroke={C.line} strokeWidth={STROKE.main} />
      <Lines x={56} y={203} w={96} n={1} last={1} />
      {/* AI turns */}
      <rect x="170" y="104" width="190" height="66" rx="12" fill={C.base} stroke={C.line} strokeWidth={STROKE.main} strokeDasharray="7 4" />
      <Lines x={188} y={124} w={150} n={2} gap={12} color={C.paper} />
      <rect x="188" y="150" width="96" height="8" rx="4" fill={C.paper} opacity="0.5" />
      <rect x="188" y="150" width="60" height="8" rx="4" fill={C.paper} />
      <rect x="230" y="234" width="130" height="34" rx="12" fill={C.soft} stroke={C.line} strokeWidth={STROKE.main} strokeDasharray="7 4" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={268 + i * 16} cy={251} r={4} fill={C.line} className={animate ? `anim-blink anim-delay-${i + 1}` : undefined} />
      ))}
      <Label x={210} y={40} anchor="end" show={detail}>person</Label>
      <Label x={364} y={98} anchor="end" show={detail}>AI · confidence</Label>
    </g>
  ),
};

/* ---------------- Practice: designer → developer handoff with critique ---------------- */
const practice: IllustrationEntry = {
  slug: "practice",
  title: "Design Practice & Technical Literacy subject plate",
  description:
    "A design artboard on the left and a panel of indented code on the right are connected by spec arrows carrying measurements across. A comment pin on the artboard marks critique, showing practice as the collaboration that turns designs into working products.",
  Art: ({ detail }) => (
    <g>
      {/* artboard */}
      <rect x="32" y="54" width="146" height="190" rx="4" fill={C.surface} stroke={C.line} strokeWidth={STROKE.main} />
      <rect x="46" y="70" width="118" height="54" fill={C.soft} stroke={C.line} strokeWidth={STROKE.fine} />
      <Lines x={46} y={146} w={110} n={3} gap={13} />
      <rect x="46" y="196" width="60" height="24" rx="3" fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} />
      {/* comment pin */}
      <path d="M150 182 a14 14 0 1 1 14 14 h-14 z" fill={C.base} stroke={C.line} strokeWidth={STROKE.main} />
      <circle cx="164" cy="182" r="3" fill={C.paper} />
      {/* code panel */}
      <rect x="222" y="54" width="146" height="190" rx="4" fill={C.surface} stroke={C.line} strokeWidth={STROKE.main} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const indent = [0, 12, 24, 24, 12, 12, 24, 0][i];
        const w = [60, 80, 54, 70, 40, 76, 50, 30][i];
        return <line key={i} x1={238 + indent} y1={76 + i * 20} x2={238 + indent + w} y2={76 + i * 20} stroke={i === 3 ? C.base : C.mute} strokeWidth="4" strokeLinecap="round" opacity={i === 3 ? 1 : 0.6} />;
      })}
      <Arrow x1={170} y1={98} x2={244} y2={136} color={C.ink} dashed />
      <Arrow x1={110} y1={208} x2={244} y2={156} color={C.ink} dashed />
      <Label x={105} y={266} show={detail}>design</Label>
      <Label x={295} y={266} show={detail}>build</Label>
      <Label x={200} y={44} show={detail} tone="mute">spec · critique · handoff</Label>
    </g>
  ),
};

const plates: IllustrationEntry[] = [
  foundations,
  lawsEffects,
  psychology,
  heuristics,
  research,
  frameworks,
  interaction,
  visual,
  typeColour,
  designSystems,
  accessibility,
  content,
  product,
  service,
  metrics,
  dataviz,
  ethics,
  emerging,
  practice,
];
export default plates;
