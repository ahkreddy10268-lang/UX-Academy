/** Path scenes, part B. Same kit and conventions as scenes-a.tsx. */
import type { ReactNode } from "react";
import { Bars, Bubble, Canvas, Chair, Check, Desk, Figure, Flow, IsoBox, IsoFloor, IsoShadow, Laptop, Monitor, Pill, Plant, Scene, Sticky, V, Wall, iso, plane, type Pt } from "@/components/illustrations/system/kit";

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

