/** Plates: frameworks-visual. Authored to docs/ILLUSTRATION_SYSTEM.md rules. */
import type { IllustrationEntry } from "../illustration-types";
import { Arrow, C, CurveArrow, Cursor, HatchDefs, Label, Lines, Node, STROKE } from "../primitives";

/* ---------------- Usability (ISO 9241-11) ---------------- */
const usability: IllustrationEntry = {
  slug: "usability",
  title: "Usability plate",
  description:
    "A dashed boundary marks the context of use. Inside it, a user on the left reaches a goal on the right by two routes: a short direct path and a long wandering one. Above, three meters measure the attempt: effectiveness (was the goal reached), efficiency (how much effort it took) and satisfaction.",
  Art: ({ detail }) => (
    <g>
      <rect x="26" y="34" width="348" height="232" rx="14" fill="none" stroke={C.ink} strokeWidth={STROKE.fine} strokeDasharray="6 5" />
      {/* meters */}
      {[0.92, 0.55, 0.75].map((f, i) => (
        <g key={i}>
          <rect x={64 + i * 98} y={66} width={80} height={12} rx={6} fill={C.surface} stroke={C.line} strokeWidth={STROKE.fine} />
          <rect x={64 + i * 98} y={66} width={80 * f} height={12} rx={6} fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} />
        </g>
      ))}
      {/* routes */}
      <path d="M86 190 C 120 120, 170 250, 210 200 S 260 130, 300 186" fill="none" stroke={C.mute} strokeWidth={STROKE.fine} strokeDasharray="3 5" />
      <Arrow x1={88} y1={196} x2={298} y2={196} color={C.line} width={STROKE.main} />
      <Node cx={74} cy={196} r={13} fill={C.paper} width={STROKE.main} />
      <circle cx="74" cy="192" r="4" fill={C.line} />
      <rect x="304" y="174" width="40" height="44" rx="3" fill={C.base} stroke={C.line} strokeWidth={STROKE.main} />
      <path d="M314 196 l7 7 13 -15" fill="none" stroke={C.paper} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <Label x={104} y={98} show={detail}>effectiveness</Label>
      <Label x={202} y={98} show={detail}>efficiency</Label>
      <Label x={300} y={98} show={detail}>satisfaction</Label>
      <Label x={74} y={232} show={detail}>user</Label>
      <Label x={324} y={238} show={detail}>goal</Label>
      <Label x={200} y={254} show={detail} tone="mute">context of use: users · tasks · environment</Label>
    </g>
  ),
};

/* ---------------- User-centred design (ISO 9241-210 activities) ---------------- */
const userCentredDesign: IllustrationEntry = {
  slug: "user-centred-design",
  title: "User-centred design plate",
  description:
    "Four activities sit on a square loop around a central group of users: understand the context of use, specify user requirements, produce design solutions, and evaluate against requirements. Arrows run clockwise, a dashed arrow returns from evaluation to iterate, and an exit arrow leaves the loop once requirements are met.",
  Art: ({ detail }) => {
    const nodes = [
      { x: 200, y: 62 },
      { x: 300, y: 150 },
      { x: 200, y: 238 },
      { x: 100, y: 150 },
    ];
    return (
      <g>
        <Arrow x1={232} y1={62} x2={300} y2={112} color={C.line} />
        <Arrow x1={300} y1={186} x2={234} y2={238} color={C.line} />
        <Arrow x1={166} y1={238} x2={100} y2={188} color={C.line} />
        <CurveArrow d="M 100 112 C 100 80, 130 64, 164 62" tip={[164, 62]} angle={0} dashed color={C.ink} />
        {nodes.map((n, i) => (
          <rect key={i} x={n.x - 32} y={n.y - 16} width={64} height={32} rx={4} fill={i === 3 ? C.base : C.surface} stroke={C.line} strokeWidth={STROKE.main} />
        ))}
        {nodes.map((n, i) => (
          <text key={`t${i}`} x={n.x} y={n.y + 5} textAnchor="middle" fontSize="13" fill={i === 3 ? C.paper : C.line} fontFamily="var(--font-plex-mono), monospace">
            {i + 1}
          </text>
        ))}
        {/* users at the centre */}
        <circle cx="200" cy="150" r="34" fill={C.soft} stroke={C.line} strokeWidth={STROKE.fine} />
        {[[186, 144], [214, 144], [200, 164]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y - 6} r={5} fill={C.line} />
            <path d={`M${x - 8} ${y + 8} a8 8 0 0 1 16 0`} fill={C.line} />
          </g>
        ))}
        <Arrow x1={336} y1={150} x2={372} y2={150} color={C.ink} width={STROKE.main} />
        <Label x={200} y={36} show={detail}>understand context</Label>
        <Label x={300} y={186} show={detail}>requirements</Label>
        <Label x={200} y={274} show={detail}>produce design</Label>
        <Label x={52} y={190} anchor="middle" show={detail}>evaluate</Label>
        <Label x={356} y={140} show={detail} tone="mute">met</Label>
      </g>
    );
  },
};

/* ---------------- Jobs to be done ---------------- */
const jobsToBeDone: IllustrationEntry = {
  slug: "jobs-to-be-done",
  title: "Jobs to be done plate",
  description:
    "A thick progress arrow runs from a hatched box on the left, the struggling current situation, to a solid box on the right, the desired outcome. A product sits on the arrow, hired to make that progress. Beneath, three strands for the functional, emotional and social dimensions of the job converge on the outcome.",
  Art: ({ detail }) => (
    <g>
      <HatchDefs id="jtbd-hatch" />
      <rect x="30" y="86" width="74" height="74" rx="4" fill="url(#jtbd-hatch)" stroke={C.line} strokeWidth={STROKE.main} />
      <rect x="296" y="86" width="74" height="74" rx="4" fill={C.base} stroke={C.line} strokeWidth={STROKE.main} />
      <path d="M110 112 H270 V100 L292 123 L270 146 V134 H110 Z" fill={C.soft} stroke={C.line} strokeWidth={STROKE.fine} strokeLinejoin="round" />
      {/* the hired product */}
      <g>
        <rect x="178" y="98" width="42" height="50" rx="6" fill={C.surface} stroke={C.line} strokeWidth={STROKE.main} />
        <circle cx="199" cy="116" r="8" fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} />
        <Lines x={188} y={134} w={22} n={2} gap={6} />
      </g>
      {/* job dimensions */}
      {[0, 1, 2].map((i) => {
        const y = 196 + i * 26;
        return (
          <g key={i}>
            <path d={`M60 ${y} C 160 ${y}, 250 ${y}, 330 168`} fill="none" stroke={i === 0 ? C.line : C.ink} strokeWidth={i === 0 ? STROKE.main : STROKE.fine} strokeDasharray={i === 0 ? undefined : "4 4"} />
            <circle cx="60" cy={y} r="4.5" fill={C.line} />
          </g>
        );
      })}
      <Label x={67} y={70} show={detail}>struggle</Label>
      <Label x={333} y={70} show={detail}>progress</Label>
      <Label x={199} y={84} show={detail}>hired product</Label>
      <Label x={70} y={190} anchor="start" show={detail} tone="mute">functional</Label>
      <Label x={70} y={216} anchor="start" show={detail} tone="mute">emotional</Label>
      <Label x={70} y={242} anchor="start" show={detail} tone="mute">social</Label>
    </g>
  ),
};

/* ---------------- HEART framework ---------------- */
const heartFramework: IllustrationEntry = {
  slug: "heart-framework",
  title: "HEART framework plate",
  description:
    "A five-column grid headed H, E, A, R and T for happiness, engagement, adoption, retention and task success. Each column has three rows: a goal, the signal that shows progress toward it, and the metric that tracks the signal. One column is highlighted with arrows from goal to signal to metric.",
  Art: ({ detail }) => {
    const letters = ["H", "E", "A", "R", "T"];
    const x0 = 92;
    const cw = 56;
    const rows = [110, 162, 214];
    return (
      <g>
        {letters.map((l, c) => {
          const x = x0 + c * cw;
          const hi = c === 4;
          return (
            <g key={l}>
              <text x={x + 22} y={76} textAnchor="middle" fontSize="24" fill={hi ? C.ink : C.line} fontFamily="var(--font-newsreader), serif" fontWeight="500">
                {l}
              </text>
              {rows.map((y, r) => (
                <rect key={r} x={x} y={y - 18} width={44} height={34} rx={3} fill={hi ? (r === 2 ? C.base : C.soft) : C.surface} stroke={C.line} strokeWidth={hi ? STROKE.main : STROKE.fine} />
              ))}
              {hi && (
                <>
                  <Arrow x1={x + 22} y1={rows[0] + 17} x2={x + 22} y2={rows[1] - 19} color={C.line} />
                  <Arrow x1={x + 22} y1={rows[1] + 17} x2={x + 22} y2={rows[2] - 19} color={C.line} />
                </>
              )}
              {!hi && rows.map((y, r) => <Lines key={`l${r}`} x={x + 8} y={y - 4} w={28} n={2} gap={8} />)}
            </g>
          );
        })}
        <Label x={80} y={rows[0] + 4} anchor="end" show={detail}>goal</Label>
        <Label x={80} y={rows[1] + 4} anchor="end" show={detail}>signal</Label>
        <Label x={80} y={rows[2] + 4} anchor="end" show={detail}>metric</Label>
        <Label x={210} y={262} show={detail} tone="mute">goal → signal → metric, per dimension</Label>
      </g>
    );
  },
};

/* ---------------- Progressive disclosure ---------------- */
const progressiveDisclosure: IllustrationEntry = {
  slug: "progressive-disclosure",
  title: "Progressive disclosure plate",
  description:
    "A settings panel shows three essential rows in full. Below a fold, a reveal control with a chevron leads to advanced options, drawn as stacked panels that sit behind the first and are partly hidden. Only what most people need is shown at first; the rest is one deliberate step away.",
  Art: ({ detail }) => (
    <g>
      <HatchDefs id="progressive-disclosure-hatch" color={C.mute} />
      {/* deferred layers */}
      <rect x="146" y="132" width="200" height="130" rx="5" fill="url(#progressive-disclosure-hatch)" stroke={C.mute} strokeWidth={STROKE.fine} strokeDasharray="4 3" />
      <rect x="120" y="112" width="200" height="130" rx="5" fill={C.soft} stroke={C.line} strokeWidth={STROKE.fine} strokeDasharray="4 3" />
      {/* primary panel */}
      <rect x="54" y="40" width="220" height="176" rx="5" fill={C.surface} stroke={C.line} strokeWidth={STROKE.main} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="70" y={60 + i * 34} width="18" height="18" rx="3" fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} />
          <Lines x={100} y={69 + i * 34} w={140} n={1} last={1} color={C.line} />
        </g>
      ))}
      <line x1="54" y1="170" x2="274" y2="170" stroke={C.line} strokeWidth={STROKE.fine} strokeDasharray="5 4" />
      <rect x="70" y="182" width="112" height="22" rx="11" fill={C.paper} stroke={C.ink} strokeWidth={STROKE.main} />
      <Lines x={84} y={193} w={56} n={1} last={1} color={C.ink} />
      <path d="M160 189 l6 6 6 -6" fill="none" stroke={C.ink} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <Label x={290} y={58} anchor="start" show={detail}>essentials</Label>
      <Label x={352} y={280} anchor="end" show={detail} tone="mute">advanced, deferred</Label>
      <Label x={192} y={197} anchor="start" show={detail}>reveal</Label>
    </g>
  ),
};

/* ---------------- WCAG: POUR principles and conformance levels ---------------- */
const wcag: IllustrationEntry = {
  slug: "wcag",
  title: "WCAG plate",
  description:
    "Four pillars labelled P, O, U and R, for perceivable, operable, understandable and robust, stand on a base. They support three stacked bands for the conformance levels A, AA and AAA, with AA highlighted as the level most commonly required.",
  Art: ({ detail }) => (
    <g>
      {/* levels */}
      <rect x="132" y="38" width="136" height="26" rx="2" fill={C.surface} stroke={C.line} strokeWidth={STROKE.fine} />
      <rect x="96" y="64" width="208" height="30" rx="2" fill={C.base} stroke={C.line} strokeWidth={STROKE.main} />
      <rect x="60" y="94" width="280" height="30" rx="2" fill={C.soft} stroke={C.line} strokeWidth={STROKE.fine} />
      {/* pillars */}
      {["P", "O", "U", "R"].map((l, i) => {
        const x = 76 + i * 66;
        return (
          <g key={l}>
            <rect x={x} y={124} width={50} height={112} fill={C.surface} stroke={C.line} strokeWidth={STROKE.main} />
            <line x1={x + 16} y1={130} x2={x + 16} y2={230} stroke={C.mute} strokeWidth={STROKE.hair} />
            <line x1={x + 34} y1={130} x2={x + 34} y2={230} stroke={C.mute} strokeWidth={STROKE.hair} />
            <text x={x + 25} y={190} textAnchor="middle" fontSize="22" fill={C.line} fontFamily="var(--font-newsreader), serif" fontWeight="500">
              {l}
            </text>
          </g>
        );
      })}
      <rect x="50" y="236" width="300" height="16" rx="2" fill={C.line} />
      <Label x={200} y={56} show={detail} tone="line">AAA</Label>
      <Label x={200} y={84} show={detail} tone="line">AA</Label>
      <Label x={200} y={114} show={detail} tone="line">A</Label>
      <Label x={200} y={276} show={detail} tone="mute">perceivable · operable · understandable · robust</Label>
    </g>
  ),
};

/* ---------------- Colour contrast ratio ---------------- */
const colourContrastRatio: IllustrationEntry = {
  slug: "colour-contrast-ratio",
  explorer: "colour",
  title: "Colour contrast ratio plate",
  description:
    "On the left, two swatches: dark text on a light background and light text on a mid-tone background. A vertical relative-luminance scale from 0 to 1 marks each colour's luminance. On the right, a horizontal ratio scale from 1 to 21 has threshold ticks at 3, 4.5 and 7, with a marker showing where the pair falls.",
  Art: ({ detail }) => {
    // ratio scale on log axis from 1 to 21
    const x0 = 196;
    const x1 = 372;
    const pos = (r: number) => x0 + (Math.log(r) / Math.log(21)) * (x1 - x0);
    return (
      <g>
        {/* swatches */}
        <rect x="30" y="50" width="96" height="74" rx="3" fill={C.paper} stroke={C.line} strokeWidth={STROKE.main} />
        <text x="78" y="100" textAnchor="middle" fontSize="34" fill={C.line} fontFamily="var(--font-newsreader), serif" fontWeight="500">
          Aa
        </text>
        <rect x="30" y="140" width="96" height="74" rx="3" fill={C.soft} stroke={C.line} strokeWidth={STROKE.main} />
        <text x="78" y="190" textAnchor="middle" fontSize="34" fill={C.paper} fontFamily="var(--font-newsreader), serif" fontWeight="500">
          Aa
        </text>
        {/* luminance scale */}
        <rect x="146" y="40" width="14" height="184" fill={C.surface} stroke={C.line} strokeWidth={STROKE.fine} />
        <rect x="146" y="40" width="14" height="92" fill={C.mute} opacity="0.35" />
        <rect x="146" y="132" width="14" height="92" fill={C.line} />
        <Arrow x1={132} y1={88} x2={144} y2={54} color={C.ink} />
        <Arrow x1={132} y1={178} x2={144} y2={150} color={C.ink} />
        {/* ratio axis */}
        <line x1={x0} y1={150} x2={x1} y2={150} stroke={C.line} strokeWidth={STROKE.main} />
        {[3, 4.5, 7].map((t) => (
          <g key={t}>
            <line x1={pos(t)} y1={134} x2={pos(t)} y2={166} stroke={C.ink} strokeWidth={STROKE.fine} />
          </g>
        ))}
        <rect x={pos(4.5)} y={142} width={pos(21) - pos(4.5)} height={16} fill={C.soft} opacity="0.7" />
        <line x1={x0} y1={150} x2={x1} y2={150} stroke={C.line} strokeWidth={STROKE.main} />
        <path d={`M${pos(8.7)} 124 l-7 -12 h14 z`} fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} strokeLinejoin="round" />
        <Label x={153} y={34} show={detail} tone="mute">L = 1</Label>
        <Label x={153} y={240} show={detail} tone="mute">L = 0</Label>
        <Label x={x0} y={182} show={detail}>1</Label>
        <Label x={pos(3)} y={182} show={detail}>3</Label>
        <Label x={pos(4.5)} y={182} show={detail}>4.5</Label>
        <Label x={pos(7)} y={182} show={detail}>7</Label>
        <Label x={x1} y={182} show={detail}>21</Label>
        <Label x={284} y={84} show={detail} tone="line">(L₁ + 0.05) / (L₂ + 0.05)</Label>
        <Label x={284} y={214} show={detail} tone="mute">AA text ≥ 4.5 · large/UI ≥ 3</Label>
      </g>
    );
  },
};

/* ---------------- Visual hierarchy ---------------- */
const visualHierarchy: IllustrationEntry = {
  slug: "visual-hierarchy",
  title: "Visual hierarchy plate",
  description:
    "A card layout with a large bold heading, an image area, smaller lines of body text and a solid button. Numbered markers from 1 to 4 show the predicted order in which the eye visits them, driven by size, weight, contrast and position, joined by a dashed scan path.",
  animated: true,
  Art: ({ detail, animate }) => {
    const marks: [number, number][] = [
      [82, 74],
      [250, 92],
      [82, 188],
      [96, 238],
    ];
    return (
      <g>
        <rect x="56" y="40" width="288" height="226" rx="5" fill={C.surface} stroke={C.line} strokeWidth={STROKE.main} />
        <rect x="76" y="60" width="138" height="30" rx="2" fill={C.line} />
        <rect x="76" y="98" width="96" height="10" rx="2" fill={C.mute} opacity="0.55" />
        <rect x="226" y="60" width="98" height="96" rx="3" fill={C.soft} stroke={C.line} strokeWidth={STROKE.fine} />
        <circle cx="300" cy="84" r="9" fill={C.base} />
        <path d="M232 150 l26 -32 18 20 14 -12 28 24" fill="none" stroke={C.line} strokeWidth={STROKE.fine} />
        <Lines x={76} y={176} w={248} n={3} gap={10} />
        <rect x="76" y="222" width="96" height="28" rx="4" fill={C.base} stroke={C.line} strokeWidth={STROKE.main} />
        <path d="M82 74 C 160 70, 200 92, 250 92 S 120 160, 82 188 S 70 220, 96 238" fill="none" stroke={C.ink} strokeWidth={STROKE.fine} strokeDasharray="3 4" />
        {marks.map(([x, y], i) => (
          <g key={i} className={animate ? `anim-fade anim-delay-${i + 1}` : undefined}>
            <circle cx={x} cy={y} r="11" fill={C.paper} stroke={C.ink} strokeWidth={STROKE.main} />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="12" fill={C.ink} fontFamily="var(--font-plex-mono), monospace">
              {i + 1}
            </text>
          </g>
        ))}
        <Label x={200} y={286} show={detail} tone="mute">scan order set by size, weight, contrast</Label>
      </g>
    );
  },
};

/* ---------------- Modular type scale ---------------- */
const modularTypeScale: IllustrationEntry = {
  slug: "modular-type-scale",
  title: "Modular type scale plate",
  description:
    "Seven letter forms sit on a common baseline, each one a constant ratio larger than the one before, so sizes grow geometrically. A dashed curve through their tops traces the exponential growth, and the base size is highlighted as step zero.",
  Art: ({ detail }) => {
    const ratio = 1.333;
    const base = 14;
    const steps = [0, 1, 2, 3, 4, 5, 6];
    let x = 34;
    const items = steps.map((i) => {
      const size = base * ratio ** i;
      const w = size * 0.62;
      const item = { i, size, x, w };
      x += w + 10;
      return item;
    });
    const baseline = 212;
    const curve = items.map((it, k) => `${k === 0 ? "M" : "L"}${(it.x + it.w / 2).toFixed(1)} ${(baseline - it.size * 0.7 - 6).toFixed(1)}`).join(" ");
    return (
      <g>
        <line x1="26" y1={baseline} x2="374" y2={baseline} stroke={C.line} strokeWidth={STROKE.fine} />
        <path d={curve} fill="none" stroke={C.ink} strokeWidth={STROKE.fine} strokeDasharray="4 4" />
        {items.map((it) => (
          <g key={it.i}>
            {it.i === 0 && <rect x={it.x - 4} y={baseline - it.size * 0.8} width={it.w + 8} height={it.size * 0.8 + 4} fill={C.base} opacity="0.55" />}
            <text x={it.x + it.w / 2} y={baseline} textAnchor="middle" fontSize={it.size} fill={it.i === 0 ? C.line : C.line} fontFamily="var(--font-newsreader), serif" fontWeight="500">
              A
            </text>
            <rect x={it.x + it.w / 2 - 2} y={baseline + 8} width="4" height={4 + it.i * 4} fill={C.base} />
            <Label x={it.x + it.w / 2} y={baseline + 48} show={detail} size={10}>
              {it.i}
            </Label>
          </g>
        ))}
        <Label x={34} y={46} anchor="start" show={detail} tone="line">sizeᵢ = base × ratioⁱ</Label>
        <Label x={34} y={64} anchor="start" show={detail} tone="mute">ratio 4:3 (perfect fourth)</Label>
      </g>
    );
  },
};

/* ---------------- Design tokens ---------------- */
const designTokens: IllustrationEntry = {
  slug: "design-tokens",
  title: "Design tokens plate",
  description:
    "Three tiers from left to right. Primitive tokens are raw values: a row of colour swatches and a spacing scale. Semantic tokens are named roles, drawn as labelled slots. Component tokens apply those roles to a button. One highlighted path shows a single primitive colour flowing through a semantic role into the button's background.",
  Art: ({ detail }) => (
    <g>
      {/* primitives */}
      <rect x="26" y="56" width="96" height="186" rx="4" fill={C.surface} stroke={C.line} strokeWidth={STROKE.fine} />
      {[C.line, C.base, C.soft, C.mute].map((f, i) => (
        <circle key={i} cx={50 + (i % 2) * 48} cy={88 + Math.floor(i / 2) * 44} r={14} fill={f} stroke={C.line} strokeWidth={i === 1 ? STROKE.main : STROKE.fine} />
      ))}
      {[6, 10, 16, 26].map((w, i) => (
        <rect key={w} x={40} y={180 + i * 12} width={w * 2} height={6} fill={C.mute} opacity="0.6" />
      ))}
      {/* semantic */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="160" y={70 + i * 42} width="86" height="26" rx="13" fill={i === 1 ? C.base : C.surface} stroke={C.line} strokeWidth={i === 1 ? STROKE.main : STROKE.fine} />
          <Lines x={172} y={83 + i * 42} w={50} n={1} last={1} color={i === 1 ? C.paper : C.mute} />
        </g>
      ))}
      {/* component */}
      <rect x="282" y="120" width="92" height="40" rx="5" fill={C.base} stroke={C.line} strokeWidth={STROKE.main} />
      <Lines x={300} y={140} w={56} n={1} last={1} color={C.paper} />
      <Cursor x={346} y={146} scale={0.85} />
      {/* flow */}
      <path d="M112 88 C 136 88, 138 125, 158 125" fill="none" stroke={C.ink} strokeWidth={STROKE.main} />
      <Arrow x1={248} y1={125} x2={280} y2={136} color={C.ink} width={STROKE.main} />
      {[[112, 132, 158, 167], [112, 186, 158, 209]].map(([a, b, c, d], i) => (
        <path key={i} d={`M${a} ${b} C ${a + 24} ${b}, ${c - 20} ${d}, ${c} ${d}`} fill="none" stroke={C.mute} strokeWidth={STROKE.fine} strokeDasharray="3 4" />
      ))}
      <Label x={74} y={42} show={detail}>primitive</Label>
      <Label x={203} y={42} show={detail}>semantic</Label>
      <Label x={328} y={42} show={detail}>component</Label>
      <Label x={203} y={262} show={detail} tone="mute">value → role → use</Label>
    </g>
  ),
};

/** Human-centred design (ISO 9241-210): people in nested contexts, design iterating inwards towards fit. */
const humanCentredDesign: IllustrationEntry = {
  slug: "human-centred-design",
  title: "Human-centred design plate",
  description:
    "Three nested rings surround one person: the users, the wider group of people affected by the system, and the context of use with its tasks and environment. A dashed spiral starts outside the rings and winds inwards through three evaluation points, showing a design brought closer to fit with each iteration rather than in one step.",
  Art: ({ detail }) => {
    const cx = 196;
    const cy = 154;
    return (
      <g>
        <circle cx={cx} cy={cy} r={120} fill="none" stroke={C.mute} strokeWidth={STROKE.fine} strokeDasharray="4 5" />
        <circle cx={cx} cy={cy} r={84} fill={C.soft} fillOpacity={0.45} stroke={C.ink} strokeWidth={STROKE.fine} />
        <circle cx={cx} cy={cy} r={48} fill={C.soft} stroke={C.ink} strokeWidth={STROKE.main} />
        {/* the person at the centre */}
        <circle cx={cx} cy={cy - 12} r={9} fill={C.base} />
        <path d={`M${cx - 16} ${cy + 18} a16 16 0 0 1 32 0z`} fill={C.base} />
        {/* iteration spiral: outside → inwards, three evaluation points */}
        <path
          d={`M 362 44 C 330 20, 250 34, 300 92 C 330 128, 296 214, 236 214 C 190 214, 160 186, 168 160 C 172 146, 184 140, 192 146`}
          fill="none"
          stroke={C.line}
          strokeWidth={STROKE.main}
          strokeDasharray="1 6"
          strokeLinecap="round"
        />
        <Arrow x1={186} y1={142} x2={193} y2={147} color={C.line} />
        {[
          [300, 92],
          [236, 214],
          [168, 160],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={9} fill={C.surface} stroke={C.line} strokeWidth={STROKE.main} />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="10" fill={C.line} fontFamily="var(--font-plex-mono), monospace">
              {i + 1}
            </text>
          </g>
        ))}
        <Label x={cx} y={24} show={detail} tone="mute">context of use</Label>
        <Label x={cx - 70} y={100} show={detail}>people affected</Label>
        <Label x={cx} y={cy + 36} show={detail}>users</Label>
        <Label x={284} y={86} show={detail} anchor="end" tone="mute">evaluate</Label>
        <Label x={348} y={60} show={detail}>iterate</Label>
      </g>
    );
  },
};

/** Information architecture: the four systems in one picture — grouping, labels, a navigation path, search. */
const informationArchitecture: IllustrationEntry = {
  slug: "information-architecture",
  title: "Information architecture plate",
  description:
    "Content tiles are sorted into three labelled groups, showing organisation and labelling. A dotted path runs from a start point through one group label to a highlighted tile, showing navigation that follows the label's scent. A magnifying lens over the same tile shows search reaching it directly.",
  Art: ({ detail }) => {
    const groups = [
      { x: 40, label: "Visit", tiles: 4 },
      { x: 152, label: "Borrow", tiles: 5 },
      { x: 264, label: "Events", tiles: 3 },
    ];
    return (
      <g>
        {groups.map((g, gi) => (
          <g key={g.label}>
            <rect x={g.x} y={92} width={96} height={150} rx={8} fill={gi === 1 ? C.soft : C.surface} stroke={C.line} strokeWidth={STROKE.fine} />
            <rect x={g.x + 10} y={78} width={76} height={24} rx={12} fill={gi === 1 ? C.ink : C.surface} stroke={C.line} strokeWidth={STROKE.fine} />
            <text x={g.x + 48} y={94} textAnchor="middle" fontSize="11" fill={gi === 1 ? C.paper : C.line} fontFamily="var(--font-plex-mono), monospace">
              {g.label}
            </text>
            {Array.from({ length: g.tiles }, (_, i) => (
              <rect key={i} x={g.x + 14} y={116 + i * 24} width={68} height={14} rx={3} fill={gi === 1 && i === 2 ? C.base : C.wash} stroke={C.line} strokeWidth={STROKE.hair} />
            ))}
          </g>
        ))}
        {/* navigation path: start → label with scent → target tile */}
        <circle cx={30} cy={40} r={7} fill={C.surface} stroke={C.line} strokeWidth={STROKE.main} />
        <path d="M37 42 C 110 50, 190 40, 200 76" fill="none" stroke={C.line} strokeWidth={STROKE.main} strokeDasharray="1 6" strokeLinecap="round" />
        <path d="M200 104 L200 162" fill="none" stroke={C.line} strokeWidth={STROKE.main} strokeDasharray="1 6" strokeLinecap="round" />
        <Cursor x={206} y={162} />
        {/* search lens reaching the same tile */}
        <circle cx={262} cy={36} r={16} fill={C.surface} stroke={C.ink} strokeWidth={STROKE.main} />
        <path d="M273 47 L283 57" stroke={C.ink} strokeWidth={STROKE.main * 1.4} strokeLinecap="round" />
        <path d="M256 52 C 254 90, 250 130, 238 162" fill="none" stroke={C.ink} strokeWidth={STROKE.fine} strokeDasharray="4 4" />
        <Label x={30} y={22} show={detail} tone="mute">start</Label>
        <Label x={200} y={272} show={detail}>organisation · labels</Label>
        <Label x={110} y={60} show={detail} tone="mute">navigation</Label>
        <Label x={290} y={40} show={detail} anchor="start">search</Label>
      </g>
    );
  },
};

/** User experience: a person's response across before / during / after use, built from pragmatic and hedonic qualities. */
const userExperience: IllustrationEntry = {
  slug: "user-experience",
  title: "User experience plate",
  description:
    "A timeline runs from before use through during use to after use. A line traces how the person's response rises and dips across the three phases, ending in a remembered judgement. Under the during-use phase, a product window sits above two bars labelled pragmatic and hedonic, the task-related and non-task qualities that both feed the experience.",
  Art: ({ detail }) => (
    <g>
      {[
        [40, 136, "before"],
        [136, 272, "during"],
        [272, 360, "after"],
      ].map(([x1, x2, l], i) => (
        <g key={l as string}>
          <rect x={x1 as number} y={44} width={(x2 as number) - (x1 as number) - 6} height={128} rx={6} fill={i === 1 ? C.soft : C.surface} stroke={C.line} strokeWidth={STROKE.fine} />
          <Label x={((x1 as number) + (x2 as number) - 6) / 2} y={34} show={detail} tone="mute">{l as string}</Label>
        </g>
      ))}
      {/* response over time */}
      <path d="M48 128 C 80 118, 110 96, 140 100 C 170 104, 180 78, 206 82 C 230 86, 236 120, 258 112 C 280 104, 300 70, 330 74 L 350 74" fill="none" stroke={C.ink} strokeWidth={STROKE.main} strokeLinecap="round" />
      <circle cx={350} cy={74} r={6} fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} />
      {/* the product, during use */}
      <rect x={168} y={188} width={72} height={46} rx={5} fill={C.surface} stroke={C.line} strokeWidth={STROKE.main} />
      <Lines x={178} y={200} w={44} n={3} gap={9} />
      {/* pragmatic and hedonic qualities */}
      <rect x={112} y={248} width={70} height={14} rx={3} fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} />
      <rect x={226} y={248} width={70} height={14} rx={3} fill={C.soft} stroke={C.line} strokeWidth={STROKE.fine} />
      <path d="M147 248 L190 234 M261 248 L218 234" stroke={C.line} strokeWidth={STROKE.fine} />
      <Label x={147} y={280} show={detail}>pragmatic</Label>
      <Label x={261} y={280} show={detail}>hedonic</Label>
      <Label x={346} y={96} show={detail} anchor="end" tone="mute">remembered</Label>
    </g>
  ),
};

const plates: IllustrationEntry[] = [
  usability,
  userCentredDesign,
  humanCentredDesign,
  userExperience,
  informationArchitecture,
  jobsToBeDone,
  heartFramework,
  progressiveDisclosure,
  wcag,
  colourContrastRatio,
  visualHierarchy,
  modularTypeScale,
  designTokens,
];
export default plates;

