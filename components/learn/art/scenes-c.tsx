/**
 * Path scenes, part C (illustration v5.1). Compositions that are not rooms:
 * close-ups, object studies and networks, so subjects stop looking alike.
 */
import type { ReactNode } from "react";
import { Bars, Bubble, Canvas, Check, Figure, Flow, IsoBox, IsoShadow, Marker, Phone, Pill, Scene, V, iso, plane, type Pt } from "@/components/illustrations/system/kit";
import { FIT, type Fit } from "./fit";

const S = ({ fit, children }: { fit: Fit; children: ReactNode }) => (
  <Canvas>
    <Scene k={fit.k} dx={fit.dx} dy={fit.dy}>
      {children}
    </Scene>
  </Canvas>
);
const at = (o: Pt, x: number, y: number, z = 0) => iso(o, x, y, z);

/** Small round context badge (clock, place, signal). */
function Badge({ x, y, kind }: { x: number; y: number; kind: "clock" | "pin" | "signal" | "people" }) {
  return (
    <g>
      <circle cx={x} cy={y} r={9} fill={V.hi} className="e" />
      {kind === "clock" && <path d={`M${x} ${y} v-5 M${x} ${y} l3.6 2.4`} className="e" fill="none" />}
      {kind === "pin" && <path d={`M${x} ${y + 5} C ${x - 6} ${y - 1}, ${x - 4} ${y - 6}, ${x} ${y - 6} C ${x + 4} ${y - 6}, ${x + 6} ${y - 1}, ${x} ${y + 5} Z`} fill={V.left} className="e" />}
      {kind === "signal" && [0, 1, 2].map((i) => <rect key={i} x={x - 4.5 + i * 3.4} y={y + 3 - i * 3} width={2.2} height={2 + i * 3} rx={0.6} fill={i < 2 ? V.edge : V.lo} />)}
      {kind === "people" && (
        <g fill={V.left} className="e">
          <circle cx={x - 2.6} cy={y - 2} r={2} />
          <circle cx={x + 2.6} cy={y - 2} r={2} />
          <path d={`M${x - 6.4} ${y + 5} q 3.8 -6 7.6 0 M${x - 1.2} ${y + 5} q 3.8 -6 7.6 0`} fill="none" />
        </g>
      )}
    </g>
  );
}

/* ---------------- UX Design Fundamentals: the experience around one interaction ---------------- */
export function UxScene() {
  return (
    <S fit={FIT["ux-fundamentals"]}>
      {/* the experience loop: goal → interaction → feedback → outcome → (remembered) */}
      <ellipse cx={150} cy={112} rx={118} ry={84} fill="none" className="m" strokeDasharray="3 4" />
      <Flow d="M262 140 C 258 160, 248 172, 236 180" tip={[236, 180]} angle={2.4} />
      <Flow d="M44 86 C 48 66, 58 52, 72 42" tip={[72, 42]} angle={-0.8} />
      {/* the hand and phone, the interaction at the centre */}
      <g transform="translate(150 118)">
        <path d="M-26 56 C -30 40, -28 20, -22 8 L -20 -6 C -19 -10, -13 -10, -13 -6 L -12 6" fill="var(--ill-skin-2)" className="e" />
        <Phone x={0} y={0} s={4.4} rot={-6}>
          <rect x={1.2} y={1.4} width={10} height={2.2} rx={0.6} fill={V.edge} opacity={0.85} />
          <rect x={1.2} y={5} width={10} height={6.2} rx={0.8} fill={V.left} />
          <path d={`M4 9.6 L6 7.4 L8 9 L9.6 7.8`} fill="none" stroke={V.hi} strokeWidth={0.5} />
          <rect x={1.2} y={12.6} width={7} height={1} rx={0.5} fill={V.mid} />
          <rect x={1.2} y={14.4} width={8.4} height={1} rx={0.5} fill={V.mid} />
          <rect x={1.2} y={18} width={10} height={2.6} rx={1.3} fill={V.focal} />
        </Phone>
        <path d="M18 34 C 26 30, 34 30, 34 38 C 34 46, 24 58, 10 62 L -22 62 C -28 58, -28 50, -24 46" fill="var(--ill-skin-2)" className="e" />
        <path d="M20 40 C 26 36, 30 37, 30 41" fill="none" className="m" />
      </g>
      {/* 1 goal */}
      <Bubble x={18} y={14} w={56} h={34} tail="right">
        <g transform="translate(28 20)">
          <path d="M3 7 L11 3 L19 7 L19 17 L11 21 L3 17 Z" fill={V.left} className="e" />
          <path d="M3 7 L11 11 L19 7 M11 11 L11 21" fill="none" className="e" />
        </g>
        <Bars x={52} y={22} w={16} n={2} gap={5} />
      </Bubble>
      {/* context around the moment */}
      <Badge x={46} y={150} kind="clock" />
      <Badge x={34} y={122} kind="pin" />
      <Badge x={62} y={176} kind="signal" />
      <Badge x={88} y={196} kind="people" />
      {/* 3 feedback */}
      <Bubble x={214} y={46} w={64} h={22} tail="left">
        <circle cx={226} cy={57} r={6} fill={V.good} />
        <Check x={226.4} y={57.6} s={0.9} color={V.hi} />
        <rect x={236} y={52} width={34} height={2.4} rx={1.2} fill={V.mid} />
        <rect x={236} y={58} width={22} height={2.4} rx={1.2} fill={V.mid} opacity={0.6} />
      </Bubble>
      {/* 4 outcome: the parcel arrived, the goal met */}
      <g transform="translate(214 150)">
        <IsoBox o={[24, 10]} x={0} y={0} z={0} w={28} d={22} h={22} tone="focal" />
        <path d={`M${iso([24, 10], 14, 0, 22)[0]} ${iso([24, 10], 14, 0, 22)[1]} L${iso([24, 10], 14, 22, 22)[0]} ${iso([24, 10], 14, 22, 22)[1]}`} stroke={V.hi} strokeWidth={2} />
        <circle cx={62} cy={8} r={8} fill={V.good} className="e" />
        <Check x={62.4} y={8.8} s={1.1} color={V.hi} />
      </g>
      <Marker x={78} y={16} n={1} r={5.5} />
      <Marker x={192} y={60} n={2} r={5.5} />
      <Marker x={280} y={44} n={3} r={5.5} />
      <Marker x={292} y={152} n={4} r={5.5} />
    </S>
  );
}

/* ---------------- Accessibility: many ways in to the same interface ---------------- */
export function AccessibilityScene() {
  const W = 140;
  const ring = [
    { x: -6, y: 18, kind: "vision" },
    { x: -6, y: 104, kind: "hearing" },
    { x: 214, y: 18, kind: "motor" },
    { x: 214, y: 104, kind: "cognition" },
  ] as const;
  return (
    <S fit={FIT.accessibility}>
      {/* the interface every route leads to */}
      <g transform="translate(68 10)">
        <rect width={W} height={150} rx={6} fill={V.hi} className="e" />
        <rect width={W} height={12} rx={6} fill={V.top} className="h" />
        {[[10, 22, 64, true], [14, 32, 90, false], [14, 39, 80, false], [10, 52, 48, true]].map(([x, y, w, h], i) => (
          <g key={i}>
            <rect x={x as number} y={y as number} width={w as number} height={h ? 5 : 3} rx={1.4} fill={h ? V.edge : V.mid} opacity={h ? 0.9 : 0.75} />
            {h && <rect x={(x as number) - 7} y={(y as number) - 0.5} width={5} height={6} rx={1} fill={V.act} opacity={0.8} />}
          </g>
        ))}
        {/* a captioned video */}
        <rect x={10} y={64} width={74} height={42} rx={3} fill={V.left} className="e" />
        <path d="M42 77 l12 8 l-12 8 Z" fill={V.hi} />
        <rect x={16} y={97} width={62} height={6} rx={1.5} fill={V.edge} />
        <rect x={20} y={99} width={40} height={2} rx={1} fill={V.hi} />
        {/* text size control */}
        <rect x={92} y={64} width={38} height={18} rx={3} fill={V.top} className="e" />
        <text x={100} y={77} fontSize={8} fontWeight={600} fill={V.edge} fontFamily="var(--font-sans), system-ui">A</text>
        <text x={114} y={78} fontSize={12} fontWeight={600} fill={V.edge} fontFamily="var(--font-sans), system-ui">A</text>
        {/* the focused control */}
        <rect x={10} y={118} width={56} height={16} rx={8} fill={V.focal} className="e" />
        <rect x={6.5} y={114.5} width={63} height={23} rx={11.5} fill="none" stroke={V.act} strokeWidth={2} strokeDasharray="3 2" />
        <rect x={76} y={118} width={54} height={16} rx={8} fill={V.hi} className="e" />
      </g>
      {/* routes in: vision, hearing, motor, cognition */}
      {ring.map((r) => (
        <g key={r.kind} transform={`translate(${r.x} ${r.y})`}>
          <rect width={68} height={50} rx={8} fill={V.top} className="e" />
          {r.kind === "vision" && (
            <g>
              <circle cx={24} cy={24} r={11} fill={V.hi} className="e" />
              <rect x={17} y={20} width={14} height={8} rx={1.5} fill={V.edge} />
              <path d="M32 32 l10 10" stroke={V.edge} strokeWidth={3} strokeLinecap="round" />
              <rect x={48} y={14} width={12} height={10} rx={1.5} fill={V.edge} />
              <rect x={48} y={27} width={12} height={10} rx={1.5} fill={V.hi} className="e" />
            </g>
          )}
          {r.kind === "hearing" && (
            <g>
              <path d="M16 16 C 16 8, 30 8, 30 18 C 30 24, 24 26, 24 32 C 24 38, 16 38, 16 33" fill="none" className="e" strokeWidth={1.6} />
              <rect x={34} y={28} width={28} height={10} rx={2} fill={V.edge} />
              <rect x={37} y={31.5} width={18} height={2.4} rx={1.2} fill={V.hi} />
              <path d="M38 16 q 4 4 0 8 M44 13 q 7 7 0 14" fill="none" className="m" />
            </g>
          )}
          {r.kind === "motor" && (
            <g>
              <rect x={8} y={14} width={22} height={18} rx={3} fill={V.focal} className="e" />
              <path d="M13 23 h10 M19 19 l4 4 l-4 4" fill="none" stroke={V.hi} strokeWidth={1.4} strokeLinecap="round" />
              <circle cx={46} cy={24} r={11} fill={V.hi} className="e" />
              <circle cx={46} cy={24} r={6} fill={V.left} className="e" />
              <path d="M8 40 h52" className="h" />
            </g>
          )}
          {r.kind === "cognition" && (
            <g>
              {[0, 1, 2].map((i) => (
                <g key={i}>
                  <circle cx={14} cy={13 + i * 11} r={4} fill={i < 2 ? V.good : V.hi} className="e" />
                  {i < 2 && <Check x={14.2} y={13.6 + i * 11} s={0.55} color={V.hi} />}
                  <rect x={22} y={11.6 + i * 11} width={34 - i * 6} height={2.6} rx={1.3} fill={V.mid} />
                </g>
              ))}
            </g>
          )}
        </g>
      ))}
      {/* assistive technology: speech output from the page structure */}
      <g transform="translate(134 176)">
        <path d="M-8 -6 C -8 -16, 8 -16, 8 -6" fill="none" stroke={V.edge} strokeWidth={2} />
        <rect x={-11} y={-8} width={5} height={9} rx={2} fill={V.edge} />
        <rect x={6} y={-8} width={5} height={9} rx={2} fill={V.edge} />
        <path d="M16 -6 q 4 3 0 6 M22 -9 q 7 6 0 12" fill="none" className="m" />
      </g>
      <Flow d="M138 168 L138 162" />
      {[[62, 43, 74, 60], [62, 129, 74, 120], [214, 43, 208, 60], [214, 129, 208, 120]].map(([x1, y1, x2, y2], i) => (
        <Flow key={i} d={`M${x1} ${y1} L${x2} ${y2}`} />
      ))}
    </S>
  );
}

/* ---------------- Usability Engineering: the evidence a test produces ---------------- */
export function UsabilityScene() {
  return (
    <S fit={FIT["usability-engineering"]}>
      {/* the screen under test, with the observed path */}
      <rect x={0} y={0} width={170} height={120} rx={6} fill={V.hi} className="e" />
      <rect x={0} y={0} width={170} height={11} rx={6} fill={V.top} className="h" />
      <Bars x={10} y={20} w={60} n={2} gap={6} />
      <rect x={10} y={36} width={70} height={10} rx={2} fill={V.top} className="h" />
      <rect x={10} y={52} width={70} height={10} rx={2} fill={V.top} className="h" />
      <rect x={96} y={36} width={62} height={50} rx={3} fill={V.left} className="h" />
      <rect x={10} y={96} width={40} height={12} rx={6} fill={V.focal} className="e" />
      <path d="M30 40 L60 57 L128 60 L118 72 L30 102" fill="none" stroke={V.deep} strokeWidth={1.4} strokeDasharray="2 2.4" />
      {[[30, 40, 1], [60, 57, 2], [128, 60, 3], [30, 102, 4]].map(([x, y, n]) => (
        <g key={n}>
          <circle cx={x} cy={y} r={5} fill={n === 3 ? V.hi : V.focal} className="e" />
          <text x={x} y={y + 2.3} textAnchor="middle" fontSize={6} fontWeight={600} fill={n === 3 ? V.edge : V.hi} fontFamily="var(--font-plex-mono), ui-monospace, monospace">{n}</text>
        </g>
      ))}
      {/* an error and a hesitation */}
      <circle cx={128} cy={60} r={10} fill="none" stroke={V.focalR} strokeWidth={1.2} strokeDasharray="1.6 1.6" />
      <path d="M140 66 l5 5 m0 -5 l-5 5" stroke={V.edge} strokeWidth={1.4} />
      {/* the participant, picture in picture */}
      <g transform="translate(124 92)">
        <rect width={40} height={26} rx={3} fill={V.top} className="e" />
        <Figure x={20} y={40} s={0.55} pose="stand" skin={3} hair="long" hairTone={1} top={V.right} />
        <rect width={40} height={26} rx={3} fill="none" className="e" />
      </g>
      {/* session timeline: tasks with success and failure */}
      <g transform="translate(0 132)">
        <rect width={170} height={34} rx={4} fill={V.top} className="e" />
        {[[6, 36, true], [46, 52, false], [102, 30, true], [136, 28, true]].map(([x, w, ok], i) => (
          <g key={i}>
            <rect x={x as number} y={10} width={w as number} height={14} rx={2} fill={ok ? V.left : V.hi} className="e" />
            {ok ? <Check x={(x as number) + (w as number) - 7} y={17.6} s={0.6} color={V.good} /> : <path d={`M${(x as number) + (w as number) - 10} 14 l5 5 m0 -5 l-5 5`} stroke={V.edge} strokeWidth={1.2} />}
          </g>
        ))}
      </g>
      {/* measures: time on task, and findings by severity */}
      <g transform="translate(184 0)">
        <rect width={78} height={70} rx={5} fill={V.hi} className="e" />
        <circle cx={22} cy={32} r={14} fill={V.top} className="e" />
        <path d="M22 32 L22 21 M22 32 L30 36" className="e" fill="none" />
        <path d="M22 18 A 14 14 0 0 1 35 26" fill="none" stroke={V.focal} strokeWidth={3} />
        {[16, 24, 12, 30].map((h, i) => (
          <rect key={i} x={44 + i * 7.6} y={52 - h} width={5} height={h} rx={1} fill={i === 3 ? V.focal : V.right} className="h" />
        ))}
        <line x1={42} y1={52} x2={74} y2={52} className="m" />
      </g>
      <g transform="translate(184 80)">
        <rect width={78} height={86} rx={5} fill={V.hi} className="e" />
        {[3, 3, 2, 1].map((sev, i) => (
          <g key={i}>
            {[0, 1, 2].map((k) => (
              <circle key={k} cx={10 + k * 5} cy={16 + i * 18} r={2} fill={k < sev ? V.focal : V.top} className="h" />
            ))}
            <rect x={28} y={14.6 + i * 18} width={40 - i * 4} height={2.6} rx={1.3} fill={V.mid} />
          </g>
        ))}
      </g>
    </S>
  );
}

/* ---------------- Product Strategy: an object study of a decision ---------------- */
export function StrategyScene() {
  const o: Pt = [150, 30];
  return (
    <S fit={FIT["product-strategy"]}>
      <IsoShadow o={o} x={0} y={0} w={150} d={110} spread={8} />
      <IsoBox o={o} x={0} y={0} z={0} w={150} d={110} h={8} tone="neutral" />
      {/* the opportunity tree drawn on the board */}
      <g transform={plane.top(o, 6, 6, 8)}>
        <rect x={40} y={4} width={30} height={12} rx={2} fill={V.focal} className="e" />
        {[6, 42, 78].map((x, i) => (
          <g key={x}>
            <path d={`M55 16 L${x + 13} 28`} className="m" fill="none" />
            <rect x={x} y={28} width={26} height={10} rx={2} fill={i === 1 ? V.right : V.left} className="e" />
            <path d={`M${x + 6} 38 L${x + 3} 48 M${x + 20} 38 L${x + 23} 48`} className="h" fill="none" />
            <rect x={x - 3} y={48} width={12} height={8} rx={1.5} fill={V.hi} className="h" />
            <rect x={x + 17} y={48} width={12} height={8} rx={1.5} fill={V.hi} className="h" />
          </g>
        ))}
      </g>
      {/* the prioritisation matrix as a separate tile */}
      <IsoBox o={o} x={18} y={70} z={8} w={56} d={34} h={3} tone="neutral" />
      <g transform={plane.top(o, 18, 70, 11)}>
        <line x1={28} y1={0} x2={28} y2={34} className="m" />
        <line x1={0} y1={17} x2={56} y2={17} className="m" />
        <rect x={28} y={0} width={28} height={17} fill={V.top} />
        {[[10, 25, 2.4], [18, 9, 3.2], [40, 7, 4.6], [48, 26, 2.8], [14, 30, 2]].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={i === 2 ? V.focal : V.right} className="e" />
        ))}
      </g>
      {/* tokens placed on the chosen bet; the goal and its measures */}
      {[0, 1, 2].map((i) => (
        <IsoBox key={i} o={o} x={96 + i * 7} y={78} z={8} w={5} d={5} h={10 + i * 8} tone={i === 2 ? "focal" : "cat"} />
      ))}
      {(() => {
        const [x, y] = at(o, 132, 20, 8);
        return (
          <g>
            <IsoBox o={o} x={128} y={16} z={8} w={8} d={8} h={4} tone="cat" />
            <line x1={x} y1={y - 4} x2={x} y2={y - 56} className="e" />
            <path d={`M${x} ${y - 56} l17 5 l-17 5 Z`} fill={V.focal} className="e" />
          </g>
        );
      })()}
      <Flow d={`M${at(o, 60, 88, 14)[0]} ${at(o, 60, 88, 14)[1]} C ${at(o, 80, 80, 40)[0]} ${at(o, 80, 80, 40)[1]}, ${at(o, 94, 80, 40)[0]} ${at(o, 94, 80, 40)[1]}, ${at(o, 98, 80, 22)[0]} ${at(o, 98, 80, 22)[1]}`} tip={at(o, 98, 80, 22)} angle={1.4} />
    </S>
  );
}

/* ---------------- Advanced UX Metrics: estimates and their uncertainty ---------------- */
export function MetricsScene() {
  const o: Pt = [150, 40];
  const vals = [30, 42, 36, 54];
  return (
    <S fit={FIT["advanced-ux-metrics"]}>
      <IsoShadow o={o} x={0} y={0} w={120} d={70} spread={8} />
      <IsoBox o={o} x={0} y={0} z={0} w={120} d={70} h={6} tone="neutral" />
      {/* two overlapping distributions standing behind: A vs B */}
      <g transform={plane.left(o, 4, 2, 92)}>
        <rect width={112} height={84} rx={3} fill={V.hi} className="e" />
        <path d="M6 72 C 26 72, 30 24, 44 24 C 58 24, 62 72, 82 72 Z" fill={V.left} opacity={0.75} className="h" />
        <path d="M30 72 C 50 72, 54 14, 68 14 C 82 14, 86 72, 106 72 Z" fill={V.focal} opacity={0.5} className="h" />
        <line x1={44} y1={20} x2={44} y2={72} className="m" strokeDasharray="2 2" />
        <line x1={68} y1={10} x2={68} y2={72} className="m" strokeDasharray="2 2" />
        <line x1={4} y1={72} x2={108} y2={72} className="m" />
      </g>
      {/* estimates with confidence intervals, as columns */}
      {vals.map((h, i) => {
        const x = 18 + i * 24;
        const top = at(o, x + 4, 44, 6 + h);
        return (
          <g key={i}>
            <IsoBox o={o} x={x} y={40} z={6} w={8} d={8} h={h} tone={i === 3 ? "focal" : "cat"} />
            <line x1={top[0]} y1={top[1] - 10} x2={top[0]} y2={top[1] + 10} className="e" />
            <line x1={top[0] - 3} y1={top[1] - 10} x2={top[0] + 3} y2={top[1] - 10} className="e" />
            <line x1={top[0] - 3} y1={top[1] + 10} x2={top[0] + 3} y2={top[1] + 10} className="e" />
          </g>
        );
      })}
      {/* a correlation card lying on the table */}
      <g transform={plane.top(o, 84, 54, 6.1)}>
        <rect width={32} height={14} rx={1.5} fill={V.hi} className="e" />
        {[[4, 11], [8, 9], [12, 9.5], [16, 7], [20, 6], [24, 4.5], [28, 3]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={0.9} fill={V.deep} />
        ))}
      </g>
    </S>
  );
}

/* ---------------- Cognitive Psychology: processes that feed each other ---------------- */
export function CognitionScene() {
  const node = (x: number, y: number, w: number, h: number, kids: ReactNode, tone: string = V.hi) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={tone} className="e" />
      {kids}
    </g>
  );
  return (
    <S fit={FIT["cognitive-psychology"]}>
      {/* the world: stimuli */}
      {node(0, 40, 54, 100, (
        <g>
          {[[14, 58, "c"], [34, 68, "s"], [18, 88, "t"], [38, 100, "c"], [16, 118, "s"], [36, 126, "t"]].map(([x, y, k], i) =>
            k === "c" ? <circle key={i} cx={x as number} cy={y as number} r={5} fill={i === 0 ? V.focal : V.left} className="e" /> : k === "s" ? <rect key={i} x={(x as number) - 4.5} y={(y as number) - 4.5} width={9} height={9} rx={1.5} fill={V.right} className="e" /> : <path key={i} d={`M${x} ${(y as number) - 5} l5 9 h-10 Z`} fill={V.hi} className="e" />,
          )}
        </g>
      ), V.top)}
      {/* perception */}
      {node(86, 8, 64, 44, (
        <g>
          <path d="M98 30 C 106 18, 130 18, 138 30 C 130 42, 106 42, 98 30 Z" fill={V.hi} className="e" />
          <circle cx={118} cy={30} r={7} fill={V.focalL} className="e" />
          <circle cx={118} cy={30} r={3} fill={V.edge} />
        </g>
      ))}
      {/* attention */}
      {node(86, 70, 64, 44, (
        <g>
          <path d="M98 92 L128 78 L128 106 Z" fill={V.left} opacity={0.7} />
          <circle cx={134} cy={86} r={4} fill={V.focal} className="e" />
          <circle cx={134} cy={98} r={3} fill={V.right} className="e" />
        </g>
      ))}
      {/* working memory */}
      {node(182, 40, 60, 56, (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={190 + (i % 2) * 24} y={48 + Math.floor(i / 2) * 22} width={20} height={16} rx={3} fill={i < 3 ? V.focal : V.top} className="e" />
          ))}
        </g>
      ))}
      {/* long-term memory */}
      {node(150, 132, 92, 38, (
        <g>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} x={158 + i * 11.4} y={140} width={8} height={22} rx={1.5} fill={i % 3 === 0 ? V.right : V.left} className="h" />
          ))}
        </g>
      ), V.top)}
      {/* decision and action back into the world */}
      {node(262, 50, 34, 36, (
        <g>
          <path d="M270 68 h8 l8 -8 M278 68 l8 8" fill="none" className="e" />
        </g>
      ), V.focal)}
      {/* links: bottom-up, top-down and back out */}
      <Flow d="M54 70 C 66 50, 74 36, 86 32" tip={[86, 32]} angle={-0.3} dashed={false} />
      <Flow d="M118 52 L118 70" tip={[118, 70]} angle={Math.PI / 2} dashed={false} />
      <Flow d="M150 92 C 162 90, 170 80, 182 74" tip={[182, 74]} angle={-0.5} dashed={false} />
      <Flow d="M212 96 L212 132" tip={[212, 132]} angle={Math.PI / 2} />
      <Flow d="M226 132 L226 96" tip={[226, 96]} angle={-Math.PI / 2} />
      <Flow d="M150 150 C 120 150, 100 120, 116 52" tip={[116, 54]} angle={-1.4} />
      <Flow d="M242 68 L262 68" tip={[262, 68]} angle={0} dashed={false} />
      <Flow d="M280 86 C 280 170, 40 186, 26 140" tip={[26, 142]} angle={-1.8} />
    </S>
  );
}

/* ---------------- Design Systems: one decision traced from token to interface ---------------- */
export function DsScene() {
  const o: Pt = [20, 116];
  const tier = (x: number, y: number, h: number, kids: ReactNode) => (
    <g>
      <IsoShadow o={o} x={x} y={y} w={46} d={46} spread={3} />
      <IsoBox o={o} x={x} y={y} z={0} w={46} d={46} h={h} tone="neutral" />
      <g transform={plane.top(o, x, y, h)}>{kids}</g>
    </g>
  );
  const p = (x: number, y: number, z: number) => at(o, x, y, z);
  const link = (a: Pt, b: Pt) => <path d={`M${a[0]} ${a[1]} C ${a[0] + 10} ${a[1] - 28}, ${b[0] - 10} ${b[1] - 28}, ${b[0]} ${b[1]}`} fill="none" stroke={V.focalR} strokeWidth={1.3} strokeDasharray="3 2" />;
  return (
    <S fit={FIT["design-systems"]}>
      {/* tokens: the brand colour is the traced decision */}
      {tier(10, 70, 10, (
        <g>
          <rect x={6} y={6} width={9} height={9} rx={1.8} fill={V.focal} className="e" />
          {[V.left, V.right, V.edge].map((f, i) => (
            <rect key={i} x={19 + i * 8} y={6} width={6} height={6} rx={1.2} fill={f} className="h" />
          ))}
          {[3, 5, 8, 12].map((s, i) => (
            <rect key={i} x={6 + i * 9} y={22} width={s * 0.6} height={6} fill={V.right} className="h" />
          ))}
          {[2, 4, 6].map((r, i) => (
            <rect key={i} x={6 + i * 12} y={34} width={9} height={7} rx={r * 0.5} fill={V.hi} className="h" />
          ))}
        </g>
      ))}
      {/* components: the button uses the token */}
      {tier(62, 34, 26, (
        <g>
          <rect x={6} y={6} width={22} height={8} rx={4} fill={V.focal} className="e" />
          <rect x={6} y={18} width={34} height={7} rx={1.5} fill={V.hi} className="e" />
          <rect x={6} y={30} width={12} height={7} rx={3.5} fill={V.hi} className="e" />
          <rect x={24} y={30} width={7} height={7} rx={1.2} fill={V.hi} className="e" />
        </g>
      ))}
      {/* pattern: a form uses the button */}
      {tier(114, -2, 42, (
        <g>
          <rect x={5} y={5} width={36} height={36} rx={2} fill={V.hi} className="e" />
          <rect x={9} y={9} width={18} height={2.4} rx={1.2} fill={V.mid} />
          <rect x={9} y={14} width={28} height={5} rx={1} fill={V.top} className="h" />
          <rect x={9} y={22} width={28} height={5} rx={1} fill={V.top} className="h" />
          <rect x={9} y={31} width={16} height={6} rx={3} fill={V.focal} className="e" />
        </g>
      ))}
      {/* interface: the screen uses the form */}
      <IsoShadow o={o} x={166} y={-40} w={60} d={6} spread={3} />
      <IsoBox o={o} x={166} y={-40} z={0} w={62} d={3} h={80} tone="neutral" />
      <g transform={plane.left(o, 168, -37, 77)}>
        <rect width={58} height={74} rx={2} fill={V.hi} className="m" />
        <rect width={58} height={9} fill={V.top} className="h" />
        <rect x={4} y={14} width={22} height={4} rx={1} fill={V.edge} opacity={0.85} />
        <rect x={4} y={22} width={50} height={16} rx={2} fill={V.left} className="h" />
        <rect x={4} y={42} width={30} height={28} rx={2} fill={V.hi} className="e" />
        <rect x={8} y={47} width={22} height={3.6} rx={1} fill={V.top} className="h" />
        <rect x={8} y={53} width={22} height={3.6} rx={1} fill={V.top} className="h" />
        <rect x={8} y={61} width={14} height={5} rx={2.5} fill={V.focal} className="e" />
        <rect x={38} y={42} width={16} height={28} rx={2} fill={V.top} className="h" />
      </g>
      {/* the lineage, drawn between the same element on each level */}
      {link(p(20, 80, 10), p(70, 44, 26))}
      {link(p(76, 46, 26), p(128, 33, 42))}
      {link(p(132, 34, 42), p(176, -37, 18))}
    </S>
  );
}

/* ---------------- Interaction Design: input → state → response → feedback → next action ---------------- */
export function InteractionScene() {
  const o: Pt = [70, 90];
  const panel = (x: number, kids: ReactNode) => (
    <g>
      <IsoShadow o={o} x={x} y={x * 0.15} w={40} d={4} spread={2} />
      <IsoBox o={o} x={x} y={x * 0.15 - 3} z={0} w={40} d={3} h={50} tone="neutral" />
      <g transform={plane.left(o, x + 2, x * 0.15, 48)}>
        <rect width={36} height={46} rx={1.6} fill={V.hi} className="m" />
        {kids}
      </g>
    </g>
  );
  const hand = (x: number, y: number) => (
    <g transform={`translate(${x} ${y}) scale(1.15)`}>
      <path d="M0 0 C -1.6 0 -2.2 1 -2.2 2.4 L -2.2 9 C -4 8 -6.4 8.6 -5.6 10.8 L -2.6 16 C -1.4 18.4 1.2 20 4.4 20 L 8 20 C 11 20 12.6 18 12.6 15 L 12.6 10.4 C 12.6 8.6 10.4 8 9.6 9.6 C 9.6 7.4 7.2 7 6.4 8.8 C 6.4 6.8 4 6.4 3.2 8.2 L 2.2 2.4 C 2.2 1 1.6 0 0 0 Z" fill="var(--ill-skin-3)" className="e" />
      <path d="M-2 25 L 12 25 L 13 20 L -3 19 Z" fill={V.focal} className="e" />
    </g>
  );
  const [hx, hy] = at(o, 14, 0, 26);
  const q = (x: number, y: number, z: number) => at(o, x, y, z);
  return (
    <S fit={FIT["interaction-design"]}>
      <g transform={plane.top(o, -10, 30, 0)}>
        <rect x={0} y={0} width={190} height={10} rx={5} fill={V.top} className="m" />
        {[30, 90, 150].map((u) => (
          <circle key={u} cx={u} cy={5} r={2.4} fill={V.focal} className="e" />
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
      {hand(hx + 4, hy + 3)}
      <Flow d={`M${q(42, 4, 30)[0]} ${q(42, 4, 30)[1]} L ${q(58, 7, 30)[0]} ${q(58, 7, 30)[1]}`} tip={q(58, 7, 30)} angle={0.5} dashed={false} />
      <Flow d={`M${q(102, 13, 30)[0]} ${q(102, 13, 30)[1]} L ${q(118, 16, 30)[0]} ${q(118, 16, 30)[1]}`} tip={q(118, 16, 30)} angle={0.5} dashed={false} />
      {/* the feedback informs the next action: the loop closes */}
      <Flow d={`M${q(150, 20, 58)[0]} ${q(150, 20, 58)[1]} C ${q(110, -20, 110)[0]} ${q(110, -20, 110)[1]}, ${q(30, -20, 100)[0]} ${q(30, -20, 100)[1]}, ${q(16, -2, 56)[0]} ${q(16, -2, 56)[1]}`} tip={q(16, -2, 56)} angle={1.9} />
      <Pill x={q(80, 10, 96)[0] - 10} y={q(80, 10, 96)[1] - 4} w={20} h={7} fill={V.hi} />
      <path d={`M${q(80, 10, 96)[0] - 5} ${q(80, 10, 96)[1] - 0.5} h10 M${q(80, 10, 96)[0] + 2} ${q(80, 10, 96)[1] - 3} l3 2.5 l-3 2.5`} fill="none" className="e" />
    </S>
  );
}
