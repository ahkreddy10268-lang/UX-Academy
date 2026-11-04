/** Path scenes, part B. Same kit and conventions as scenes-a.tsx. */
import type { ReactNode } from "react";
import { Bars, Bubble, Canvas, Chair, Check, Desk, Figure, Flow, IsoBox, IsoFloor, IsoShadow, Laptop, Monitor, Pill, Plant, Scene, Sticky, V, Wall, Win, iso, plane, type Pt } from "@/components/illustrations/system/kit";

const at = (o: Pt, x: number, y: number, z = 0) => iso(o, x, y, z);
import { FIT, type Fit } from "./fit";
const S = ({ fit, children }: { fit: Fit; children: ReactNode }) => (
  <Canvas>
    <Scene k={fit.k} dx={fit.dx} dy={fit.dy}>
      {children}
    </Scene>
  </Canvas>
);

/** A standing screen (slab with a face) on the y = const side. */
function Screen({ o, x, y, z = 0, w, h, children, tone = "neutral" as const }: { o: Pt; x: number; y: number; z?: number; w: number; h: number; children?: ReactNode; tone?: "neutral" | "cat" }) {
  return (
    <g>
      <IsoShadow o={o} x={x} y={y} w={w} d={4} spread={2} />
      <IsoBox o={o} x={x} y={y - 3} z={z} w={w} d={3} h={h} tone={tone} />
      <g transform={plane.left(o, x + 2, y, z + h - 2)}>
        <rect width={w - 4} height={h - 4} rx={1.6} fill={V.hi} className="m" />
        {children}
      </g>
    </g>
  );
}

/** Pointing hand (index finger extended), tip at (x, y). */
function Hand({ x, y, s = 1, skin = 2 }: { x: number; y: number; s?: number; skin?: 1 | 2 | 3 | 4 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 C -1.6 0 -2.2 1 -2.2 2.4 L -2.2 9 C -4 8 -6.4 8.6 -5.6 10.8 L -2.6 16 C -1.4 18.4 1.2 20 4.4 20 L 8 20 C 11 20 12.6 18 12.6 15 L 12.6 10.4 C 12.6 8.6 10.4 8 9.6 9.6 C 9.6 7.4 7.2 7 6.4 8.8 C 6.4 6.8 4 6.4 3.2 8.2 L 2.2 2.4 C 2.2 1 1.6 0 0 0 Z" fill={`var(--ill-skin-${skin})`} className="e" />
      <path d="M-2 25 L 12 25 L 13 20 L -3 19 Z" fill={V.focal} className="e" />
    </g>
  );
}

/* ---------------- Product Design: discovery → decision → delivery → outcome ---------------- */
export function ProductScene() {
  const o: Pt = [140, 60];
  const [fx, fy] = at(o, 30, 70);
  return (
    <S fit={FIT["product-design"]}>
      <IsoFloor o={o} w={190} d={70} />
      {/* discovery board */}
      <Screen o={o} x={4} y={20} w={46} h={46}>
        {[[3, 4], [15, 3], [27, 5], [5, 17], [18, 16], [30, 18]].map(([x, y], i) => (
          <Sticky key={i} x={x} y={y} w={9} rot={i % 2 ? 4 : -4} fill={i === 4 ? V.focal : i % 2 ? V.top : V.left} />
        ))}
        <rect x={5} y={30} width={32} height={7} rx={1.5} fill={V.focalL} />
      </Screen>
      <Figure x={fx} y={fy} s={0.95} pose="point" skin={2} hair="bun" hairTone={1} top={V.right} />
      {/* decision table: two options, one chosen */}
      <Desk o={o} x={70} y={26} w={40} d={26} h={20} />
      <g transform={plane.top(o, 74, 30, 20.1)}>
        <rect width={14} height={18} rx={1.5} fill={V.hi} className="e" />
        <rect x={2} y={3} width={9} height={1.5} rx={0.7} fill={V.mid} />
        <rect x={18} width={14} height={18} rx={1.5} fill={V.hi} className="e" opacity={0.55} />
        <line x1={20} y1={3} x2={30} y2={15} className="m" />
      </g>
      {(() => {
        const [x, y] = at(o, 81, 39, 30);
        return (
          <g>
            <circle cx={x} cy={y} r={5} fill={V.good} />
            <Check x={x + 0.3} y={y + 0.6} s={0.8} color={V.hi} />
          </g>
        );
      })()}
      {/* delivery: the shipped product */}
      <Screen o={o} x={128} y={18} w={26} h={44}>
        <Bars x={3} y={4} w={12} n={1} />
        <rect x={3} y={9} width={18} height={12} rx={1.5} fill={V.left} className="h" />
        <Bars x={3} y={25} w={16} n={2} gap={3.6} />
        <Pill x={3} y={33} w={18} h={4} />
      </Screen>
      {/* outcome: measured over time */}
      {[0, 1, 2, 3].map((i) => (
        <IsoBox key={i} o={o} x={166 + i * 6} y={6} z={0} w={4} d={4} h={10 + i * 9} tone={i === 3 ? "focal" : "cat"} />
      ))}
      <Flow d={`M${at(o, 50, 20, 40)[0]} ${at(o, 50, 20, 40)[1]} Q ${at(o, 64, 20, 54)[0]} ${at(o, 64, 20, 54)[1]} ${at(o, 80, 30, 36)[0]} ${at(o, 80, 30, 36)[1]}`} tip={at(o, 80, 30, 36)} angle={0.7} />
      <Flow d={`M${at(o, 108, 30, 30)[0]} ${at(o, 108, 30, 30)[1]} Q ${at(o, 120, 22, 52)[0]} ${at(o, 120, 22, 52)[1]} ${at(o, 130, 18, 50)[0]} ${at(o, 130, 18, 50)[1]}`} tip={at(o, 130, 18, 50)} angle={0.4} />
      <Flow d={`M${at(o, 190, 8, 50)[0]} ${at(o, 190, 8, 50)[1]} C ${at(o, 160, -30, 110)[0]} ${at(o, 160, -30, 110)[1]}, ${at(o, 30, -10, 110)[0]} ${at(o, 30, -10, 110)[1]}, ${at(o, 26, 18, 70)[0]} ${at(o, 26, 18, 70)[1]}`} tip={at(o, 26, 18, 70)} angle={1.9} />
    </S>
  );
}

/* ---------------- Interaction Design: input → state → response → feedback ---------------- */
export function InteractionScene() {
  const o: Pt = [70, 90];
  const panel = (x: number, kids: ReactNode) => (
    <Screen o={o} x={x} y={x * 0.15} w={40} h={50}>
      {kids}
    </Screen>
  );
  return (
    <S fit={FIT["interaction-design"]}>
      <IsoFloor o={o} w={180} d={70} x0={-10} y0={-10} step={30} />
      {/* the timeline the states unfold along */}
      <g transform={plane.top(o, 0, 30, 0)}>
        <rect x={0} y={0} width={170} height={8} rx={4} fill={V.top} className="m" />
        {[20, 80, 140].map((u) => (
          <circle key={u} cx={u} cy={4} r={2.2} fill={V.focal} className="e" />
        ))}
      </g>
      {panel(0, (
        <g>
          <Bars x={5} y={6} w={22} n={2} gap={4} />
          <rect x={6} y={22} width={24} height={9} rx={4.5} fill={V.focal} className="e" />
        </g>
      ))}
      {panel(60, (
        <g>
          <Bars x={5} y={6} w={22} n={2} gap={4} />
          <rect x={6} y={22} width={24} height={9} rx={4.5} fill={V.focalL} className="e" />
          <circle cx={18} cy={26.5} r={2.6} fill="none" stroke={V.hi} strokeWidth={1.4} strokeDasharray="10 6" />
        </g>
      ))}
      {panel(120, (
        <g>
          <Bars x={5} y={6} w={22} n={2} gap={4} />
          <rect x={6} y={22} width={24} height={9} rx={4.5} fill={V.good} />
          <Check x={18} y={27} s={0.8} color={V.hi} />
          <rect x={4} y={36} width={28} height={7} rx={2} fill={V.edge} />
          <rect x={7} y={38.6} width={16} height={1.8} rx={0.9} fill={V.hi} />
        </g>
      ))}
      {(() => {
        const [x, y] = at(o, 14, 0, 26);
        return <Hand x={x + 4} y={y + 3} s={1.15} skin={3} />;
      })()}
      <Flow d={`M${at(o, 42, 4, 30)[0]} ${at(o, 42, 4, 30)[1]} L ${at(o, 58, 7, 30)[0]} ${at(o, 58, 7, 30)[1]}`} tip={at(o, 58, 7, 30)} angle={0.5} dashed={false} />
      <Flow d={`M${at(o, 102, 13, 30)[0]} ${at(o, 102, 13, 30)[1]} L ${at(o, 118, 16, 30)[0]} ${at(o, 118, 16, 30)[1]}`} tip={at(o, 118, 16, 30)} angle={0.5} dashed={false} />
    </S>
  );
}

/* ---------------- Cognitive Psychology: perception → attention → working memory → decision ---------------- */
export function CognitionScene() {
  const shapes = [[18, 40, "c"], [30, 58, "s"], [14, 74, "t"], [34, 88, "c"], [20, 104, "s"], [40, 116, "c"], [12, 130, "t"], [32, 140, "s"]] as const;
  return (
    <S fit={FIT["cognitive-psychology"]}>
      {/* stimuli in the world */}
      <rect x={0} y={28} width={54} height={126} rx={6} fill={V.top} className="m" />
      {shapes.map(([x, y, k], i) =>
        k === "c" ? <circle key={i} cx={x} cy={y} r={5} fill={i % 3 === 0 ? V.focal : V.left} className="e" /> : k === "s" ? <rect key={i} x={x - 4.5} y={y - 4.5} width={9} height={9} rx={1.5} fill={V.right} className="e" /> : <path key={i} d={`M${x} ${y - 5} L${x + 5} ${y + 4} L${x - 5} ${y + 4} Z`} fill={V.hi} className="e" />,
      )}
      {/* perception: an eye taking in the field */}
      <path d="M70 92 C 80 76, 100 76, 110 92 C 100 108, 80 108, 70 92 Z" fill={V.hi} className="e" />
      <circle cx={90} cy={92} r={8} fill={V.focalL} className="e" />
      <circle cx={90} cy={92} r={3.4} fill={V.edge} />
      <path d="M54 40 L70 88 M54 150 L70 96" className="h" fill="none" />
      {/* attention: a spotlight selects a few */}
      <path d="M112 92 L150 62 L150 122 Z" fill={V.left} opacity={0.55} />
      <path d="M112 92 L150 62 M112 92 L150 122" className="m" fill="none" />
      {/* working memory: few slots */}
      <rect x={150} y={64} width={44} height={56} rx={5} fill={V.hi} className="e" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={157 + (i % 2) * 17} y={71 + Math.floor(i / 2) * 22} width={13} height={16} rx={2} fill={i < 3 ? V.focal : V.top} className="e" />
      ))}
      {/* long-term memory beneath, exchanging with working memory */}
      <rect x={140} y={150} width={64} height={30} rx={4} fill={V.right} className="e" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={146 + i * 9.6} y={156} width={6.4} height={18} rx={1} fill={V.hi} className="h" />
      ))}
      <path d="M166 120 L166 150 M178 150 L178 120" className="m" fill="none" />
      <path d="M163 146 L166 150 L169 146 M175 124 L178 120 L181 124" className="m" fill="none" />
      {/* decision: one path taken */}
      <path d="M194 92 L214 92 L232 70 M214 92 L232 114" className="e" fill="none" />
      <rect x={232} y={58} width={22} height={24} rx={3} fill={V.focal} className="e" />
      <Check x={243} y={71} s={0.9} color={V.hi} />
      <rect x={232} y={102} width={22} height={24} rx={3} fill={V.hi} className="e" opacity={0.6} />
    </S>
  );
}

/* ---------------- Usability Engineering: tasks, observed behaviour, measures, findings ---------------- */
export function UsabilityScene() {
  const o: Pt = [150, 64];
  const [px, py] = at(o, 40, 84);
  const [ox, oy] = at(o, 98, 92);
  return (
    <S fit={FIT["usability-engineering"]}>
      <IsoFloor o={o} w={130} d={120} />
      <Wall o={o} side="left" len={130} h={66} />
      <Wall o={o} side="right" len={120} h={66} fill={V.nLeft} />
      {/* measures on the wall: tasks, time, errors */}
      <g transform={plane.left(o, 8, 0, 60)}>
        <Win w={40} h={38} bar={false}>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={4} y={5 + i * 10} width={6} height={6} rx={1} fill={i === 1 ? V.hi : V.good} className="h" />
              {i === 1 ? <path d={`M5.4 ${6.4 + i * 10} l3.2 3.2 m0 -3.2 l-3.2 3.2`} stroke={V.edge} strokeWidth={1.1} /> : <Check x={7} y={8.6 + i * 10} s={0.5} color={V.hi} />}
              <rect x={13} y={7 + i * 10} width={20 - i * 3} height={2} rx={1} fill={V.mid} />
            </g>
          ))}
        </Win>
        <g transform="translate(48 0)">
          <circle cx={14} cy={18} r={13} fill={V.hi} className="e" />
          <path d="M14 18 L14 8 M14 18 L21 22" className="e" fill="none" />
          <path d="M14 5 A 13 13 0 0 1 26 14" fill="none" stroke={V.focal} strokeWidth={3} />
          <rect x={11} y={2} width={6} height={3} rx={1} fill={V.edge} />
        </g>
        <g transform="translate(80 4)">
          {[16, 26, 10, 30].map((h, i) => (
            <rect key={i} x={i * 9} y={34 - h} width={6} height={h} rx={1} fill={i === 3 ? V.focal : V.right} className="h" />
          ))}
          <line x1={-2} y1={34} x2={36} y2={34} className="m" />
        </g>
      </g>
      {/* findings with severity */}
      <g transform={plane.right(o, 0, 104, 56)}>
        <Win w={44} h={34} bar={false}>
          {[3, 2, 1].map((sev, i) => (
            <g key={i}>
              {Array.from({ length: 3 }, (_, k) => (
                <circle key={k} cx={6 + k * 4} cy={8 + i * 9} r={1.5} fill={k < sev ? V.focal : V.top} />
              ))}
              <rect x={20} y={7 + i * 9} width={18} height={2} rx={1} fill={V.mid} />
            </g>
          ))}
        </Win>
      </g>
      {/* participant at the task */}
      <Desk o={o} x={30} y={40} w={46} d={28} h={22} />
      <Monitor o={o} x={36} y={44} z={22} w={32} h={20}>
        <Bars x={3} y={3} w={14} n={2} gap={3.6} />
        <Pill x={3} y={11} w={10} h={3.6} />
      </Monitor>
      <Chair o={o} x={34} y={76} back="y" />
      <Figure x={px} y={py} s={1} pose="seated" skin={2} hair="short" hairTone={2} top={V.right} />
      {/* observer with notes */}
      <Chair o={o} x={92} y={86} back="y" tone="neutral" />
      <Figure x={ox} y={oy} s={1} pose="seated" skin={4} hair="bun" hairTone={1} top={V.focal}>
        <rect x={8} y={-33} width={9} height={11} rx={1} fill={V.hi} className="e" />
      </Figure>
    </S>
  );
}

/* ---------------- Information Architecture: hierarchy, navigation and a path through it ---------------- */
export function IaScene() {
  const o: Pt = [150, 40];
  const node = (x: number, y: number, h: number, w: number, tone: "neutral" | "cat" | "focal", tag = true) => (
    <g key={`${x}-${y}`}>
      <IsoShadow o={o} x={x} y={y} w={w} d={w} spread={2} />
      <IsoBox o={o} x={x} y={y} z={0} w={w} d={w} h={h} tone={tone} />
      {tag && (
        <g transform={plane.top(o, x + 3, y + 3, h)}>
          <rect width={w - 10} height={3} rx={1.5} fill={V.mid} />
        </g>
      )}
    </g>
  );
  const bridge = (a: [number, number, number], b: [number, number, number], hot = false) => {
    const p = at(o, ...a);
    const q = at(o, ...b);
    return <line x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={hot ? V.focal : V.mid} strokeWidth={hot ? 3 : 1.2} strokeLinecap="round" strokeDasharray={hot ? undefined : "3 3"} />;
  };
  const [wx, wy] = at(o, 34, 86, 18);
  return (
    <S fit={FIT["information-architecture"]}>
      <IsoFloor o={o} w={150} d={150} step={25} />
      {bridge([30, 30, 34], [30, 82, 18], true)}
      {bridge([30, 30, 34], [82, 30, 18])}
      {bridge([30, 30, 34], [82, 82, 18])}
      {bridge([30, 82, 18], [30, 128, 8])}
      {bridge([30, 82, 18], [76, 124, 8], true)}
      {bridge([82, 30, 18], [128, 30, 8])}
      {bridge([82, 82, 18], [126, 84, 8])}
      {node(16, 16, 34, 28, "focal")}
      {node(18, 70, 18, 24, "cat")}
      {node(70, 18, 18, 24, "cat")}
      {node(70, 70, 18, 24, "cat")}
      {node(22, 120, 8, 18, "neutral", false)}
      {node(68, 116, 8, 18, "neutral", false)}
      {node(120, 22, 8, 18, "neutral", false)}
      {node(118, 76, 8, 18, "neutral", false)}
      {/* the target, flagged */}
      {(() => {
        const [x, y] = at(o, 77, 125, 8);
        return (
          <g>
            <line x1={x} y1={y} x2={x} y2={y - 22} className="e" />
            <path d={`M${x} ${y - 22} l12 3.5 l-12 3.5 Z`} fill={V.focal} className="e" />
          </g>
        );
      })()}
      <Figure x={wx} y={wy} s={0.85} pose="walk" skin={1} hair="long" hairTone={2} top={V.right} />
    </S>
  );
}

/* ---------------- Visual Design: hierarchy, alignment, scale, contrast ---------------- */
export function VisualScene() {
  const o: Pt = [120, 40];
  const [fx, fy] = at(o, 110, 70);
  return (
    <S fit={FIT["visual-design"]}>
      <IsoFloor o={o} w={150} d={90} />
      {/* the composition on a large board */}
      <Screen o={o} x={10} y={30} w={84} h={96}>
        {/* alignment guides */}
        <line x1={8} y1={-8} x2={8} y2={100} className="m" strokeDasharray="2 2" stroke={V.act} />
        <line x1={-8} y1={56} x2={90} y2={56} className="m" strokeDasharray="2 2" stroke={V.act} />
        <rect x={8} y={8} width={52} height={12} rx={1.5} fill={V.edge} opacity={0.9} />
        <rect x={8} y={24} width={30} height={4} rx={2} fill={V.mid} />
        <rect x={8} y={34} width={64} height={22} rx={2} fill={V.focal} className="e" />
        <circle cx={58} cy={42} r={5} fill={V.hi} opacity={0.8} />
        {[0, 1, 2].map((c) => (
          <Bars key={c} x={8 + c * 23} y={62} w={18} n={4} gap={4} />
        ))}
        <rect x={8} y={82} width={20} height={6} rx={3} fill={V.edge} />
      </Screen>
      {/* type scale and contrast swatches */}
      {[14, 11, 8.5, 6.5, 5].map((h, i) => (
        <IsoBox key={i} o={o} x={110 + i * 4} y={14} z={0} w={3} d={h * 1.6} h={h * 3} tone={i === 0 ? "focal" : "cat"} />
      ))}
      <Screen o={o} x={132} y={44} w={36} h={22}>
        <rect x={2} y={2} width={14} height={14} rx={2} fill={V.edge} />
        <rect x={5.5} y={7} width={7} height={4} rx={1} fill={V.hi} />
        <rect x={18} y={2} width={14} height={14} rx={2} fill={V.hi} className="e" />
        <rect x={21.5} y={7} width={7} height={4} rx={1} fill={V.edge} />
      </Screen>
      <Figure x={fx} y={fy} s={1} pose="point" flip skin={3} hair="long" hairTone={1} top={V.focal} />
    </S>
  );
}

/* ---------------- Accessibility: structure, focus, contrast, assistive technology ---------------- */
export function AccessibilityScene() {
  const o: Pt = [150, 60];
  const [px, py] = at(o, 52, 84);
  return (
    <S fit={FIT["accessibility"]}>
      <IsoFloor o={o} w={130} d={116} />
      <Wall o={o} side="left" len={130} h={66} />
      <Wall o={o} side="right" len={116} h={66} fill={V.nLeft} />
      {/* contrast pair on the wall */}
      <g transform={plane.right(o, 0, 90, 54)}>
        <rect width={18} height={18} rx={2} fill={V.edge} />
        <rect x={4} y={7} width={10} height={4} rx={1} fill={V.hi} />
        <rect x={22} width={18} height={18} rx={2} fill={V.hi} className="e" />
        <rect x={26} y={7} width={10} height={4} rx={1} fill={V.edge} />
      </g>
      <Desk o={o} x={36} y={38} w={56} d={30} h={24} />
      {/* screen: heading structure and a focused control */}
      <Monitor o={o} x={42} y={42} z={24} w={40} h={26}>
        {[[3, 14, true], [6, 22, false], [6, 18, false], [3, 12, true], [6, 20, false]].map(([x, w, h], i) => (
          <rect key={i} x={x as number} y={3 + i * 3.4} width={w as number} height={h ? 2.2 : 1.6} rx={0.8} fill={h ? V.edge : V.mid} />
        ))}
        <rect x={20} y={14} width={14} height={6} rx={3} fill={V.focal} />
        <rect x={18.6} y={12.6} width={16.8} height={8.8} rx={4.2} fill="none" stroke={V.act} strokeWidth={1.4} strokeDasharray="2 1.4" />
      </Monitor>
      {/* keyboard with Tab emphasised */}
      <IsoBox o={o} x={48} y={56} z={24} w={26} d={9} h={1} />
      <IsoBox o={o} x={49} y={57} z={25} w={5} d={3} h={0.8} tone="focal" />
      {/* person using a wheelchair, wearing headphones for a screen reader */}
      {(() => {
        const [wx, wy] = at(o, 56, 86, 0);
        return (
          <g>
            <IsoShadow o={o} x={46} y={78} w={18} d={16} spread={2} />
            <ellipse cx={wx - 4} cy={wy - 9} rx={7} ry={9.5} fill="none" className="e" strokeWidth={2.4} />
            <ellipse cx={wx - 4} cy={wy - 9} rx={1.6} ry={2} fill={V.edge} />
            <circle cx={wx + 10} cy={wy - 2.6} r={2.6} fill="none" className="e" />
            <path d={`M${wx - 10} ${wy - 22} L${wx + 6} ${wy - 22} L${wx + 10} ${wy - 4}`} fill="none" className="e" />
            <path d={`M${wx - 11} ${wy - 22} L${wx - 13} ${wy - 40}`} fill="none" className="e" strokeWidth={2} />
          </g>
        );
      })()}
      <Figure x={px} y={py} s={1} pose="seated" skin={4} hair="crop" hairTone={1} top={V.focal}>
        <path d="M-4.6 -55 C -4.6 -63 6.6 -63 6.6 -55" fill="none" stroke={V.edge} strokeWidth={1.6} />
        <rect x={-6.4} y={-56} width={3} height={5} rx={1.2} fill={V.edge} />
      </Figure>
      {/* speech output */}
      {[0, 1, 2].map((i) => {
        const [x, y] = at(o, 44, 66, 40);
        return <path key={i} d={`M${x - 8 - i * 4} ${y - 4 - i * 2} q -4 4 0 8`} fill="none" className="m" />;
      })}
    </S>
  );
}

/* ---------------- Product Strategy: problem → opportunity → priority → decision → outcome ---------------- */
export function StrategyScene() {
  const o: Pt = [150, 50];
  const [fx, fy] = at(o, 64, 92);
  return (
    <S fit={FIT["product-strategy"]}>
      <IsoFloor o={o} w={140} d={120} />
      <Wall o={o} side="left" len={140} h={60} />
      {/* opportunity tree on the wall: outcome → opportunities → solutions */}
      <g transform={plane.left(o, 10, 0, 54)}>
        <rect x={40} y={4} width={26} height={9} rx={2} fill={V.focal} className="e" />
        {[12, 44, 76].map((x) => (
          <g key={x}>
            <path d={`M53 13 L${x + 10} 22`} className="m" fill="none" />
            <rect x={x} y={22} width={20} height={8} rx={2} fill={V.left} className="e" />
            <path d={`M${x + 5} 30 L${x + 2} 38 M${x + 15} 30 L${x + 18} 38`} className="h" fill="none" />
            <rect x={x - 3} y={38} width={10} height={6} rx={1.5} fill={V.hi} className="h" />
            <rect x={x + 13} y={38} width={10} height={6} rx={1.5} fill={V.hi} className="h" />
          </g>
        ))}
      </g>
      {/* prioritisation: a 2 × 2 on the table */}
      <Desk o={o} x={40} y={44} w={60} d={40} h={22} />
      <g transform={plane.top(o, 44, 48, 22.1)}>
        <rect width={52} height={32} fill={V.hi} className="e" />
        <line x1={26} y1={0} x2={26} y2={32} className="m" />
        <line x1={0} y1={16} x2={52} y2={16} className="m" />
        <rect x={26} y={0} width={26} height={16} fill={V.top} />
        {[[8, 22, 2.2], [16, 9, 3], [36, 6, 4.4], [44, 24, 2.6], [12, 28, 1.8]].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={i === 2 ? V.focal : V.right} className="e" />
        ))}
      </g>
      <Figure x={fx} y={fy} s={1} pose="reach" skin={1} hair="short" hairTone={4} top={V.right} />
      {/* outcome: the goal and the measure that will show it */}
      {(() => {
        const [x, y] = at(o, 122, 30, 0);
        return (
          <g>
            <IsoBox o={o} x={118} y={26} z={0} w={8} d={8} h={6} tone="cat" />
            <line x1={x} y1={y - 6} x2={x} y2={y - 52} className="e" />
            <path d={`M${x} ${y - 52} l15 4.5 l-15 4.5 Z`} fill={V.focal} className="e" />
          </g>
        );
      })()}
      {[0, 1, 2].map((i) => (
        <IsoBox key={i} o={o} x={104 + i * 6} y={70} z={0} w={4} d={4} h={8 + i * 7} tone={i === 2 ? "focal" : "cat"} />
      ))}
    </S>
  );
}

/* ---------------- Advanced UX Metrics: estimates, uncertainty, relationships ---------------- */
export function MetricsScene() {
  const o: Pt = [150, 56];
  const [fx, fy] = at(o, 112, 78);
  const vals = [22, 30, 26, 38, 34];
  return (
    <S fit={FIT["advanced-ux-metrics"]}>
      <IsoFloor o={o} w={140} d={110} />
      <Wall o={o} side="left" len={140} h={64} />
      <Wall o={o} side="right" len={110} h={64} fill={V.nLeft} />
      {/* trend with a confidence band on the wall */}
      <g transform={plane.left(o, 10, 0, 58)}>
        <rect width={84} height={44} rx={2} fill={V.hi} className="e" />
        <path d="M6 30 L20 26 L34 28 L48 18 L62 14 L78 10 L78 24 L62 26 L48 30 L34 38 L20 36 L6 40 Z" fill={V.left} opacity={0.8} />
        <path d="M6 35 L20 31 L34 33 L48 24 L62 20 L78 17" fill="none" stroke={V.deep} strokeWidth={1.6} />
        <line x1={4} y1={41} x2={80} y2={41} className="h" />
      </g>
      {/* relationship: a scatter on the side wall */}
      <g transform={plane.right(o, 0, 96, 54)}>
        <rect width={46} height={38} rx={2} fill={V.hi} className="e" />
        {[[8, 30], [13, 26], [18, 27], [22, 20], [28, 19], [32, 14], [38, 10], [16, 22], [35, 16]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={1.6} fill={V.focalR} />
        ))}
        <line x1={6} y1={31} x2={40} y2={9} className="m" />
      </g>
      {/* estimates with error bars, as columns on the table */}
      <Desk o={o} x={30} y={40} w={64} d={30} h={20} />
      {vals.map((h, i) => {
        const x = 36 + i * 11;
        const top = at(o, x + 3, 52, 20 + h);
        return (
          <g key={i}>
            <IsoBox o={o} x={x} y={50} z={20} w={6} d={6} h={h} tone={i === 3 ? "focal" : "cat"} />
            <line x1={top[0]} y1={top[1] - 7} x2={top[0]} y2={top[1] + 7} className="e" />
            <line x1={top[0] - 2.4} y1={top[1] - 7} x2={top[0] + 2.4} y2={top[1] - 7} className="e" />
            <line x1={top[0] - 2.4} y1={top[1] + 7} x2={top[0] + 2.4} y2={top[1] + 7} className="e" />
          </g>
        );
      })}
      <Figure x={fx} y={fy} s={1} pose="point" flip skin={2} hair="bun" hairTone={3} top={V.right} />
    </S>
  );
}

/* ---------------- AI UX: intent, response, uncertainty, verification, control ---------------- */
export function AiScene() {
  const o: Pt = [150, 70];
  const [px, py] = at(o, 52, 96);
  return (
    <S fit={FIT["ai-ux"]}>
      <IsoFloor o={o} w={130} d={120} />
      <Desk o={o} x={36} y={50} w={50} d={28} h={22} />
      <Laptop o={o} x={44} y={56} z={22} w={30} d={18} screenH={18}>
        <Bars x={3} y={3} w={16} n={3} gap={3.2} />
      </Laptop>
      <Chair o={o} x={44} y={88} back="y" />
      <Figure x={px} y={py} s={1} pose="seated" skin={3} hair="long" hairTone={1} top={V.right} />
      {/* intent */}
      <Bubble x={px - 44} y={py - 92} w={40} h={14} tail="right">
        <rect x={px - 39} y={py - 87} width={26} height={2} rx={1} fill={V.mid} />
        <rect x={px - 39} y={py - 83} width={18} height={2} rx={1} fill={V.mid} opacity={0.6} />
      </Bubble>
      {/* response with confidence, sources and human control */}
      {(() => {
        const [x, y] = at(o, 96, 20, 90);
        return (
          <g>
            <rect x={x - 8} y={y} width={78} height={60} rx={5} fill={V.hi} className="e" />
            <path d={`M${x + 2} ${y + 9} l2 -5 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 Z`} fill={V.focal} />
            <Bars x={x + 14} y={y + 6} w={46} n={3} gap={4.4} />
            {/* confidence */}
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={i} x={x + i * 7} y={y + 24} width={5.4} height={4} rx={1} fill={i < 3 ? V.focal : V.top} className="h" />
            ))}
            {/* sources to verify */}
            {[0, 1].map((i) => (
              <g key={i}>
                <rect x={x + 38 + i * 15} y={y + 22} width={13} height={9} rx={1.5} fill={V.top} className="e" />
                <path d={`M${x + 41 + i * 15} ${y + 28} l2.6 -2.6 m-1.2 0 h1.2 v1.2`} className="m" fill="none" />
              </g>
            ))}
            {/* control: accept, edit, undo */}
            <rect x={x} y={y + 40} width={20} height={8} rx={4} fill={V.focal} className="e" />
            <rect x={x + 24} y={y + 40} width={16} height={8} rx={4} fill={V.hi} className="e" />
            <rect x={x + 44} y={y + 40} width={16} height={8} rx={4} fill={V.hi} className="e" />
            <Flow d={`M${x - 8} ${y + 40} C ${x - 30} ${y + 48}, ${x - 38} ${y + 70}, ${x - 46} ${y + 76}`} tip={[x - 46, y + 76]} angle={2.4} />
          </g>
        );
      })()}
      <Plant o={o} x={110} y={104} />
    </S>
  );
}

/* ---------------- Service Design: frontstage, line of visibility, backstage, systems ---------------- */
export function ServiceScene() {
  const o: Pt = [150, 40];
  const [cx, cy] = at(o, 40, 118);
  const [sx, sy] = at(o, 40, 70);
  const [bx, by] = at(o, 104, 36);
  return (
    <S fit={FIT["service-design"]}>
      <IsoFloor o={o} w={150} d={150} />
      {/* line of visibility: a glass partition between frontstage and backstage */}
      <g transform={plane.left(o, 0, 56, 46)}>
        <rect width={150} height={46} fill={V.act} opacity={0.08} />
        <line x1={0} y1={0} x2={150} y2={0} stroke={V.act} strokeWidth={1.2} strokeDasharray="5 3" />
      </g>
      <Wall o={o} side="left" len={150} h={60} />
      {/* backstage: shelves, systems and a colleague at a terminal */}
      <IsoBox o={o} x={12} y={6} z={0} w={20} d={12} h={44} tone="neutral" />
      {[10, 22, 34].map((z) => (
        <IsoBox key={z} o={o} x={14} y={14} z={z} w={16} d={5} h={6} tone="cat" />
      ))}
      <IsoBox o={o} x={52} y={8} z={0} w={14} d={14} h={40} tone="neutral" />
      {[8, 16, 24, 32].map((z) => (
        <g key={z} transform={plane.left(o, 54, 22, z + 4)}>
          <rect width={10} height={3} rx={0.8} fill={V.top} className="h" />
          <circle cx={8} cy={1.5} r={0.8} fill={V.good} />
        </g>
      ))}
      <Desk o={o} x={92} y={14} w={34} d={20} h={22} />
      <Monitor o={o} x={98} y={16} z={22} w={22} h={14}>
        <Bars x={2} y={2} w={12} n={2} gap={3} />
      </Monitor>
      <Figure x={bx} y={by} s={0.95} pose="seated" skin={1} hair="crop" hairTone={2} top={V.right} />
      {/* frontstage: the counter, a staff member and a customer */}
      <IsoBox o={o} x={20} y={76} z={0} w={70} d={14} h={22} tone="cat" />
      <g transform={plane.top(o, 66, 79, 22)}>
        <rect width={12} height={8} rx={1} fill={V.hi} className="e" />
        <Bars x={2} y={2} w={7} n={2} gap={2.4} h={1.2} />
      </g>
      <Figure x={sx} y={sy} s={1} pose="reach" skin={3} hair="bun" hairTone={1} top={V.focal} />
      <Figure x={cx} y={cy} s={1} pose="hold" flip skin={4} hair="short" hairTone={4} top={V.right}>
        <rect x={-2.5} y={-46} width={6} height={9} rx={1.2} fill={V.edge} />
      </Figure>
      {/* touchpoints and the flow behind them */}
      {[[at(o, 72, 83, 32), 1], [at(o, 40, 128, 50), 2], [at(o, 108, 18, 44), 3]].map(([p, n]) => (
        <g key={n as number}>
          <circle cx={(p as Pt)[0]} cy={(p as Pt)[1]} r={4.4} fill={V.focal} className="e" />
          <text x={(p as Pt)[0]} y={(p as Pt)[1] + 2.1} textAnchor="middle" fontSize={5.4} fontWeight={600} fill={V.hi} fontFamily="var(--font-plex-mono), ui-monospace, monospace">
            {n as number}
          </text>
        </g>
      ))}
      <Flow d={`M${at(o, 72, 80, 30)[0]} ${at(o, 72, 80, 30)[1]} C ${at(o, 80, 50, 60)[0]} ${at(o, 80, 50, 60)[1]}, ${at(o, 96, 30, 60)[0]} ${at(o, 96, 30, 60)[1]}, ${at(o, 104, 22, 44)[0]} ${at(o, 104, 22, 44)[1]}`} tip={at(o, 104, 22, 44)} angle={0.6} />
      <Plant o={o} x={128} y={120} />
    </S>
  );
}

