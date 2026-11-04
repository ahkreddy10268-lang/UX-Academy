/** Path scenes, part A (the Phase 4 prototypes): UX Fundamentals, HCI, UI, Design Systems, UX Research. */
import { Bars, Bubble, Canvas, Chair, Clock, Desk, Figure, Flow, IsoBox, IsoFloor, IsoShadow, Laptop, Marker, Monitor, Phone, Pill, Plant, Scene, Sticky, V, Wall, Win, iso, plane } from "@/components/illustrations/system/kit";
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
