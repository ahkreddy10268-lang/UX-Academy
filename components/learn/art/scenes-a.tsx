/** Path scenes, part A (the Phase 4 prototypes): UX Fundamentals, HCI, UI, Design Systems, UX Research. */
import { Bars, Bubble, Canvas, Chair, Check, Clock, Desk, Figure, Flow, IsoBox, IsoFloor, IsoShadow, Laptop, Marker, Monitor, Phone, Pill, Plant, Scene, Sticky, V, Wall, Win, iso, plane } from "@/components/illustrations/system/kit";
import { FIT } from "./fit";

const at = (o: readonly [number, number], x: number, y: number, z = 0) => iso(o, x, y, z);

/* ---------------- HCI Fundamentals: person · task · technology · context ---------------- */
export function HciScene() {
  const o = [148, 72] as const;
  const [px, py] = at(o, 62, 84);
  const [cx, cy] = at(o, 104, 30);
  return (
    <Canvas>
      <Scene {...FIT["hci-fundamentals"]}>
        <IsoFloor o={o} w={120} d={120} />
        <Wall o={o} side="left" len={120} h={62} />
        <Wall o={o} side="right" len={120} h={62} fill={V.nLeft} />
        {/* context: window with daylight and a clock on the back wall */}
        <g transform={plane.left(o, 66, 0, 52)}>
          <rect width={38} height={26} rx={1.5} fill={V.top} className="e" />
          <line x1={19} y1={0} x2={19} y2={26} className="m" />
          <line x1={0} y1={13} x2={38} y2={13} className="m" />
          <circle cx={30} cy={7} r={3.4} fill={V.hi} className="h" />
        </g>
        <Clock o={o} x={16} y={0} z={52} r={7} />
        {/* task: a card pinned to the side wall */}
        <g transform={plane.right(o, 0, 74, 50)}>
          <Win w={34} h={30} bar={false}>
            <Bars x={5} y={6} w={20} n={1} />
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x={5} y={12 + i * 5.5} width={3.4} height={3.4} rx={0.6} fill={i < 2 ? V.focal : V.hi} className="h" />
                <rect x={11} y={13 + i * 5.5} width={16 - i * 3} height={1.6} rx={0.8} fill={V.mid} opacity={0.7} />
              </g>
            ))}
          </Win>
        </g>
        {/* technology: desk, monitor, keyboard */}
        <Desk o={o} x={34} y={34} w={56} d={30} h={24} />
        <Monitor o={o} x={42} y={38} z={24} w={36} h={22}>
          <Bars x={4} y={4} w={14} n={1} />
          <rect x={4} y={9} width={26} height={4.5} rx={1} fill={V.top} className="h" />
          <Pill x={18} y={15} w={11} h={4} />
        </Monitor>
        <IsoBox o={o} x={48} y={52} z={24} w={22} d={7} h={0.9} />
        <Chair o={o} x={54} y={76} back="y" />
        {/* person */}
        <Figure x={px} y={py} s={1.02} pose="seated" skin={3} hair="curly" hairTone={1} top={V.focal} />
        {/* context: a colleague with a phone, an interruption */}
        <IsoShadow o={o} x={98} y={26} w={10} d={8} spread={1} />
        <Figure x={cx} y={cy} s={1.02} pose="hold" flip skin={1} hair="bun" hairTone={2} top={V.right}>
          <rect x={-2.5} y={-46} width={6} height={9} rx={1.2} fill={V.edge} />
        </Figure>
        <Bubble x={cx - 30} y={cy - 84} w={22} h={13} tail="right">
          <circle cx={cx - 23} cy={cy - 77.5} r={2.6} fill={V.focal} />
          <rect x={cx - 18} y={cy - 79} width={8} height={1.8} rx={0.9} fill={V.mid} />
        </Bubble>
        <Plant o={o} x={8} y={100} />
        <Marker x={at(o, 62, 84)[0] - 22} y={at(o, 62, 84)[1] - 66} n={1} r={4.4} />
        <Marker x={at(o, 0, 74, 50)[0] + 4} y={at(o, 0, 74, 50)[1] - 6} n={2} r={4.4} />
        <Marker x={at(o, 78, 38, 46)[0] + 6} y={at(o, 78, 38, 46)[1] - 6} n={3} r={4.4} />
        <Marker x={at(o, 104, 0, 52)[0] + 8} y={at(o, 104, 0, 52)[1] - 4} n={4} r={4.4} />
      </Scene>
    </Canvas>
  );
}

/* ---------------- UX Fundamentals: goal → interface → feedback → outcome ---------------- */
export function UxScene() {
  const o = [70, 30] as const;
  const P = (x: number, y: number, z = 0) => at(o, x, y, z);
  const [f1x, f1y] = P(30, 150);
  const [f2x, f2y] = P(150, 40);
  return (
    <Canvas>
      <Scene {...FIT["ux-fundamentals"]}>
        <IsoFloor o={o} w={210} d={180} step={30} />
        {/* the route across the ground */}
        <g transform={plane.top(o, 0, 0, 0)}>
          <path d="M30 168 C 40 120, 90 130, 92 96 S 120 50, 170 40" fill="none" stroke={V.edge} strokeWidth={17} strokeLinecap="round" />
          <path d="M30 168 C 40 120, 90 130, 92 96 S 120 50, 170 40" fill="none" stroke={V.top} strokeWidth={15.6} strokeLinecap="round" />
          <path d="M30 168 C 40 120, 90 130, 92 96 S 120 50, 170 40" fill="none" className="m" strokeDasharray="3 4" />
        </g>
        {/* 1 goal: a person sets out with a need */}
        <Figure x={f1x} y={f1y} s={1} pose="hold" skin={2} hair="long" hairTone={2} top={V.focal}>
          <rect x={-2.2} y={-46} width={6} height={9.5} rx={1.2} fill={V.edge} />
        </Figure>
        <Bubble x={f1x - 34} y={f1y - 94} w={28} h={20} tail="right">
          <g transform={`translate(${f1x - 27} ${f1y - 90})`}>
            <path d="M3 6 L9 2.5 L15 6 L15 13 L9 16 L3 13 Z" fill={V.left} className="e" />
            <path d="M3 6 L9 9.5 L15 6 M9 9.5 L9 16" fill="none" className="e" />
          </g>
        </Bubble>
        {/* 2 interface: the app, standing as a large screen */}
        <IsoShadow o={o} x={76} y={108} w={26} d={4} />
        <IsoBox o={o} x={76} y={108} z={0} w={28} d={3} h={48} tone="neutral" />
        <g transform={plane.left(o, 78, 111, 46)}>
          <rect width={24} height={44} rx={2} fill={V.hi} className="m" />
          <Bars x={4} y={5} w={12} n={1} />
          <rect x={4} y={10} width={16} height={11} rx={1.5} fill={V.left} className="h" />
          <Bars x={4} y={25} w={15} n={2} gap={4} />
          <Pill x={4} y={35} w={16} h={5} />
        </g>
        {/* 3 feedback: a confirmation arrives */}
        <Bubble x={P(118, 64)[0] - 6} y={P(118, 64)[1] - 56} w={40} h={16} tail="left">
          <circle cx={P(118, 64)[0] + 2} cy={P(118, 64)[1] - 48} r={4} fill={V.good} />
          <Check x={P(118, 64)[0] + 2.3} y={P(118, 64)[1] - 47.6} s={0.7} color={V.hi} />
          <rect x={P(118, 64)[0] + 9} y={P(118, 64)[1] - 50.5} width={20} height={1.8} rx={0.9} fill={V.mid} />
          <rect x={P(118, 64)[0] + 9} y={P(118, 64)[1] - 46.5} width={13} height={1.8} rx={0.9} fill={V.mid} opacity={0.6} />
        </Bubble>
        {/* 4 outcome: the parcel at the door, the person satisfied */}
        <IsoShadow o={o} x={160} y={10} w={30} d={22} />
        <IsoBox o={o} x={160} y={10} z={0} w={30} d={22} h={40} tone="cat" />
        <g transform={plane.left(o, 166, 32, 30)}>
          <rect width={11} height={30} rx={1} fill={V.focalL} className="e" />
          <circle cx={9} cy={16} r={0.9} fill={V.hi} />
        </g>
        <IsoBox o={o} x={180} y={34} z={0} w={8} d={7} h={6} tone="neutral" />
        <Figure x={f2x} y={f2y} s={1} pose="stand" skin={2} hair="long" hairTone={2} top={V.focal} />
        <Marker x={f1x + 12} y={f1y - 70} n={1} r={4.4} />
        <Marker x={P(104, 108, 50)[0] + 6} y={P(104, 108, 50)[1]} n={2} r={4.4} />
        <Marker x={P(118, 64)[0] + 40} y={P(118, 64)[1] - 58} n={3} r={4.4} />
        <Marker x={P(190, 10, 44)[0] + 6} y={P(190, 10, 44)[1]} n={4} r={4.4} />
      </Scene>
    </Canvas>
  );
}

/* ---------------- UI Fundamentals: an exploded interface ---------------- */
export function UiScene() {
  const o = [96, 40] as const;
  const L = (z: number, tone: "neutral" | "cat" | "focal", kids: React.ReactNode) => (
    <g>
      <IsoBox o={o} x={0} y={0} z={z} w={80} d={64} h={2} tone={tone} />
      <g transform={plane.top(o, 0, 0, z + 2)}>{kids}</g>
    </g>
  );
  const corner = (x: number, y: number) => {
    const a = at(o, x, y, 2);
    const b = at(o, x, y, 130);
    return <line key={`${x}${y}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} className="h" strokeDasharray="2 3" />;
  };
  const [fx, fy] = at(o, 128, 40);
  return (
    <Canvas>
      <Scene {...FIT["ui-fundamentals"]}>
        <IsoFloor o={o} w={150} d={100} step={25} />
        <IsoShadow o={o} x={0} y={0} w={80} d={64} spread={6} />
        {[corner(0, 64), corner(80, 64), corner(80, 0)]}
        {/* 1 grid */}
        {L(0, "cat", (
          <g>
            {Array.from({ length: 6 }, (_, i) => (
              <rect key={i} x={6 + i * 11.6} y={6} width={8.6} height={52} fill={V.right} opacity={0.45} />
            ))}
          </g>
        ))}
        {/* 2 type and spacing */}
        {L(42, "neutral", (
          <g>
            <rect x={8} y={8} width={34} height={7} rx={1} fill={V.edge} opacity={0.85} />
            <rect x={8} y={19} width={52} height={3} rx={1.5} fill={V.mid} />
            <rect x={8} y={25} width={46} height={3} rx={1.5} fill={V.mid} />
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={8 + i * 9} y={38} width={4 + i * 2} height={4 + i * 2} fill={V.left} className="h" />
            ))}
          </g>
        ))}
        {/* 3 colour */}
        {L(84, "neutral", (
          <g>
            {[V.focal, V.focalL, V.right, V.left, V.top].map((f, i) => (
              <rect key={i} x={8 + i * 13} y={10} width={10} height={10} rx={2} fill={f} className="e" />
            ))}
            <rect x={8} y={30} width={30} height={20} rx={2} fill={V.edge} />
            <rect x={14} y={38} width={18} height={3} rx={1.5} fill={V.hi} />
          </g>
        ))}
        {/* 4 components */}
        {L(126, "focal", (
          <g>
            <rect x={8} y={8} width={44} height={10} rx={2} fill={V.hi} className="e" />
            <rect x={8} y={24} width={26} height={9} rx={4.5} fill={V.edge} />
            <rect x={40} y={25} width={14} height={7} rx={3.5} fill={V.hi} className="e" />
            <circle cx={50.5} cy={28.5} r={2.6} fill={V.focal} className="e" />
            <rect x={8} y={40} width={58} height={16} rx={2} fill={V.hi} className="e" />
          </g>
        ))}
        {/* the designer, and the assembled screen */}
        <Figure x={fx} y={fy} s={1.05} pose="point" flip skin={4} hair="crop" hairTone={4} top={V.right} />
        <Phone x={248} y={150} s={2}>
          <rect x={1.4} y={1.6} width={9.6} height={2.6} rx={0.6} fill={V.edge} opacity={0.85} />
          <rect x={1.4} y={5.6} width={9.6} height={6} rx={0.8} fill={V.left} />
          <rect x={1.4} y={13} width={7} height={1.2} rx={0.6} fill={V.mid} />
          <rect x={1.4} y={15.2} width={8} height={1.2} rx={0.6} fill={V.mid} />
          <rect x={1.4} y={18.4} width={9.6} height={2.8} rx={1.4} fill={V.focal} />
        </Phone>
        <Flow d="M196 120 C 214 120, 224 128, 228 136" tip={[228, 136]} angle={1.1} />
      </Scene>
    </Canvas>
  );
}

/* ---------------- Design Systems: token → component → pattern → interface ---------------- */
export function DsScene() {
  const o = [20, 116] as const;
  const tier = (x: number, h: number, tone: "neutral" | "cat" | "focal", kids: React.ReactNode, y = 0) => (
    <g>
      <IsoShadow o={o} x={x} y={y} w={46} d={46} spread={3} />
      <IsoBox o={o} x={x} y={y} z={0} w={46} d={46} h={h} tone={tone} />
      <g transform={plane.top(o, x, y, h)}>{kids}</g>
    </g>
  );
  return (
    <Canvas>
      <Scene {...FIT["design-systems"]}>
        <IsoFloor o={o} w={240} d={130} y0={-50} step={30} />
        {/* tokens */}
        {tier(10, 10, "cat", (
          <g>
            {[V.focal, V.focalL, V.right, V.edge].map((f, i) => (
              <rect key={i} x={6 + i * 9} y={6} width={7} height={7} rx={1.4} fill={f} className="h" />
            ))}
            {[3, 5, 8, 12].map((s, i) => (
              <rect key={i} x={6 + i * 9} y={20} width={s * 0.6} height={6} fill={V.right} className="h" />
            ))}
            {[2, 4, 6].map((r, i) => (
              <rect key={i} x={6 + i * 12} y={32} width={9} height={7} rx={r * 0.5} fill={V.hi} className="h" />
            ))}
          </g>
        ), 70)}
        {/* components */}
        {tier(62, 26, "neutral", (
          <g>
            <rect x={6} y={6} width={22} height={7} rx={3.5} fill={V.focal} className="e" />
            <rect x={6} y={18} width={34} height={7} rx={1.5} fill={V.hi} className="e" />
            <rect x={6} y={30} width={12} height={7} rx={3.5} fill={V.hi} className="e" />
            <circle cx={15} cy={33.5} r={2.6} fill={V.focal} />
            <rect x={24} y={30} width={7} height={7} rx={1.2} fill={V.hi} className="e" />
            <Check x={27.5} y={34} s={0.6} color={V.edge} />
          </g>
        ), 34)}
        {/* patterns */}
        {tier(114, 42, "neutral", (
          <g>
            <rect x={5} y={5} width={36} height={36} rx={2} fill={V.hi} className="e" />
            <rect x={9} y={9} width={18} height={2.4} rx={1.2} fill={V.mid} />
            <rect x={9} y={14} width={28} height={5} rx={1} fill={V.top} className="h" />
            <rect x={9} y={22} width={28} height={5} rx={1} fill={V.top} className="h" />
            <rect x={9} y={31} width={16} height={6} rx={3} fill={V.focal} className="e" />
          </g>
        ), -2)}
        {/* interface */}
        <IsoShadow o={o} x={166} y={-40} w={60} d={6} spread={3} />
        <IsoBox o={o} x={166} y={-40} z={0} w={62} d={3} h={80} tone="neutral" />
        <g transform={plane.left(o, 168, -37, 77)}>
          <rect width={58} height={74} rx={2} fill={V.hi} className="m" />
          <rect x={0} y={0} width={58} height={9} fill={V.top} className="h" />
          <rect x={4} y={14} width={22} height={4} rx={1} fill={V.edge} opacity={0.85} />
          <rect x={4} y={22} width={50} height={20} rx={2} fill={V.left} className="h" />
          <rect x={4} y={46} width={24} height={22} rx={2} fill={V.hi} className="h" />
          <rect x={7} y={50} width={14} height={3} rx={1} fill={V.top} className="h" />
          <rect x={7} y={55} width={14} height={3} rx={1} fill={V.top} className="h" />
          <rect x={7} y={61} width={10} height={4} rx={2} fill={V.focal} />
          <rect x={31} y={46} width={23} height={22} rx={2} fill={V.hi} className="h" />
          <rect x={34} y={61} width={10} height={4} rx={2} fill={V.focal} />
        </g>
        <Flow d={`M${at(o, 40, 72, 12)[0]} ${at(o, 40, 72, 12)[1] - 4} q 14 -26 32 -24`} tip={[at(o, 40, 72, 12)[0] + 32, at(o, 40, 72, 12)[1] - 28]} angle={0} />
        <Flow d={`M${at(o, 92, 36, 28)[0]} ${at(o, 92, 36, 28)[1] - 4} q 14 -26 32 -24`} tip={[at(o, 92, 36, 28)[0] + 32, at(o, 92, 36, 28)[1] - 28]} angle={0} />
        <Flow d={`M${at(o, 144, 0, 44)[0]} ${at(o, 144, 0, 44)[1] - 4} q 12 -22 26 -22`} tip={[at(o, 144, 0, 44)[0] + 26, at(o, 144, 0, 44)[1] - 26]} angle={0} />
        {(() => {
          const [x, y] = at(o, 70, 100);
          return (
            <g>
              <IsoShadow o={o} x={66} y={96} w={8} d={6} spread={1} />
              <Figure x={x} y={y} s={0.95} pose="hold" skin={2} hair="short" hairTone={3} top={V.focal}>
                <rect x={-4} y={-45} width={9} height={6} rx={1.5} fill={V.hi} className="e" />
              </Figure>
            </g>
          );
        })()}
      </Scene>
    </Canvas>
  );
}

/* ---------------- UX Research: session → evidence → synthesis ---------------- */
export function ResearchScene() {
  const o = [150, 64] as const;
  const [p1x, p1y] = at(o, 44, 96);
  const [p2x, p2y] = at(o, 84, 54);
  return (
    <Canvas>
      <Scene {...FIT["ux-research"]}>
        <IsoFloor o={o} w={120} d={124} />
        <Wall o={o} side="left" len={120} h={66} />
        <Wall o={o} side="right" len={124} h={66} fill={V.nLeft} />
        {/* synthesis wall: three clusters and an insight */}
        <g transform={plane.left(o, 8, 0, 60)}>
          {[[4, 6], [17, 5], [5, 19], [18, 20]].map(([x, y], i) => (
            <Sticky key={`a${i}`} x={x} y={y} w={10} rot={(i % 2 ? 4 : -3)} fill={V.left} />
          ))}
          {[[40, 8], [53, 10], [44, 22]].map(([x, y], i) => (
            <Sticky key={`b${i}`} x={x} y={y} w={10} rot={i ? -4 : 3} fill={V.top} />
          ))}
          {[[74, 6], [86, 12], [76, 20], [90, 26]].map(([x, y], i) => (
            <Sticky key={`c${i}`} x={x} y={y} w={10} rot={i % 2 ? -2 : 5} fill={V.right} />
          ))}
          <rect x={30} y={38} width={44} height={16} rx={2} fill={V.focal} className="e" />
          <rect x={35} y={43} width={28} height={2} rx={1} fill={V.hi} />
          <rect x={35} y={48} width={20} height={2} rx={1} fill={V.hi} opacity={0.8} />
          <path d="M15 30 L40 38 M50 32 L52 38 M85 37 L68 38" fill="none" className="m" strokeDasharray="2 2" />
        </g>
        {/* the session: participant with a prototype, researcher taking notes */}
        <Desk o={o} x={40} y={50} w={44} d={30} h={22} />
        <Laptop o={o} x={50} y={58} z={22} w={24} d={16} screenH={15}>
          <Bars x={3} y={3} w={12} n={2} gap={3.5} />
          <Pill x={3} y={9} w={8} h={3} />
        </Laptop>
        <Chair o={o} x={38} y={86} back="y" />
        <Chair o={o} x={88} y={46} back="x" tone="neutral" />
        <Figure x={p1x} y={p1y} s={1} pose="seated" skin={4} hair="long" hairTone={1} top={V.right} />
        <Figure x={p2x} y={p2y} s={1} pose="seated" flip skin={1} hair="crop" hairTone={3} top={V.focal}>
          <rect x={7} y={-33} width={8} height={10} rx={1} fill={V.hi} className="e" />
        </Figure>
        {/* evidence: a recorded quote travelling to the wall */}
        <Bubble x={p1x - 40} y={p1y - 92} w={30} h={13} tail="right">
          <rect x={p1x - 35} y={p1y - 88} width={20} height={1.8} rx={0.9} fill={V.mid} />
          <rect x={p1x - 35} y={p1y - 84} width={14} height={1.8} rx={0.9} fill={V.mid} opacity={0.6} />
        </Bubble>
        <Flow d={`M${p1x - 10} ${p1y - 96} C ${p1x} ${p1y - 120}, ${p1x + 30} ${p1y - 124}, ${p1x + 40} ${p1y - 112}`} tip={[p1x + 40, p1y - 112]} angle={0.9} />
        <Plant o={o} x={106} y={108} />
      </Scene>
    </Canvas>
  );
}
