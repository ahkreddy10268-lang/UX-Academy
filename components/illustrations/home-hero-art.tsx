/**
 * Homepage hero plate. Four disciplines — psychology, research, design and
 * human-computer interaction — orbit and feed one practice. Each discipline
 * node carries a miniature of a real concept plate (attention, evidence,
 * grid, pointing) in its own palette; pulses travel along the links.
 * Server component; motion is CSS-only and off under reduced motion.
 */
import { C, Cursor, STROKE } from "./primitives";

const nodes = [
  { id: "psychology", cat: "cat-violet", x: 120, y: 92, label: "Psychology" },
  { id: "research", cat: "cat-teal", x: 420, y: 96, label: "Research" },
  { id: "design", cat: "cat-peach", x: 430, y: 330, label: "Visual design" },
  { id: "hci", cat: "cat-cyan", x: 110, y: 324, label: "Interaction" },
] as const;
const centre = { x: 270, y: 210 };

function Glyph({ id }: { id: (typeof nodes)[number]["id"] }) {
  switch (id) {
    case "psychology":
      // attention: a spotlight selecting one item from a field
      return (
        <g>
          {[-22, -8, 6, 20].flatMap((dx) => [-14, 2, 18].map((dy) => <circle key={`${dx}${dy}`} cx={dx} cy={dy} r={3} fill={C.mute} />))}
          <circle cx={6} cy={2} r={13} fill="none" stroke={C.ink} strokeWidth={STROKE.main} />
          <circle cx={6} cy={2} r={4.5} fill={C.base} />
        </g>
      );
    case "research":
      // evidence: observations accumulating into a distribution
      return (
        <g>
          {[[-24, 10], [-12, -4], [0, -16], [12, -6], [24, 8]].map(([x, h], i) => (
            <rect key={i} x={x - 5} y={18 - (26 + h)} width={10} height={26 + h} fill={i === 2 ? C.base : C.soft} stroke={C.line} strokeWidth={STROKE.hair} />
          ))}
          <line x1={-32} y1={18} x2={32} y2={18} stroke={C.line} strokeWidth={STROKE.fine} />
        </g>
      );
    case "design":
      // composition: grid columns with a dominant element
      return (
        <g>
          {[-24, -8, 8, 24].map((x) => <rect key={x} x={x - 6} y={-22} width={12} height={44} fill="none" stroke={C.mute} strokeWidth={STROKE.hair} />)}
          <rect x={-30} y={-20} width={44} height={16} fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} />
          <rect x={-30} y={0} width={28} height={6} fill={C.soft} />
          <rect x={-30} y={10} width={20} height={6} fill={C.soft} />
        </g>
      );
    case "hci":
      // pointing: a cursor approaching a target
      return (
        <g>
          <rect x={14} y={-22} width={12} height={44} fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} />
          <path d="M-26 14 C -12 -12, 4 -8, 16 0" fill="none" stroke={C.line} strokeWidth={STROKE.fine} strokeDasharray="1 4" strokeLinecap="round" />
          <Cursor x={12} y={-4} scale={0.75} />
        </g>
      );
  }
}

export function HomeHeroArt() {
  const link = (n: (typeof nodes)[number]) => `M${n.x} ${n.y} Q ${(n.x + centre.x) / 2 + (n.y < 200 ? 30 : -30)} ${(n.y + centre.y) / 2} ${centre.x} ${centre.y}`;
  return (
    <svg viewBox="0 0 540 420" className="h-auto w-full" role="img" aria-labelledby="hero-art-t hero-art-d">
      <title id="hero-art-t">Four disciplines feeding one practice</title>
      <desc id="hero-art-d">
        A diagram with four discipline nodes — psychology, research, visual design and interaction — each drawn with a small concept sketch: an attention spotlight, a distribution of
        evidence, a layout grid and a pointer reaching a target. Curved links carry pulses from each discipline to a central node labelled UX, and the disciplines are also linked to their
        neighbours.
      </desc>
      <defs>
        <pattern id="hero-grid" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="11" cy="11" r="0.9" fill="var(--ink-3)" opacity="0.35" />
        </pattern>
      </defs>
      <rect width="540" height="420" rx="6" fill="var(--sunken)" />
      <rect width="540" height="420" rx="6" fill="url(#hero-grid)" />
      {/* neighbour links */}
      <g stroke="var(--rule-strong)" strokeWidth={STROKE.fine} fill="none" strokeDasharray="3 5">
        <path d="M120 92 Q 270 40 420 96" />
        <path d="M420 96 Q 500 210 430 330" />
        <path d="M430 330 Q 270 390 110 324" />
        <path d="M110 324 Q 40 210 120 92" />
      </g>
      {nodes.map((n, i) => (
        <g key={n.id} className={n.cat}>
          <path d={link(n)} fill="none" stroke="var(--c)" strokeWidth={STROKE.main} />
          <circle r="4.5" fill="var(--c)" className={`anim-travel anim-delay-${i + 1}`} style={{ offsetPath: `path("${link(n)}")` }} opacity="0" />
        </g>
      ))}
      {nodes.map((n) => (
        <g key={n.id} className={n.cat} transform={`translate(${n.x} ${n.y})`}>
          <rect x={-56} y={-46} width={112} height={92} rx={6} fill="var(--c-wash)" stroke="var(--c)" strokeWidth={STROKE.fine} />
          <Glyph id={n.id} />
          <text y={64} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--c-ink)" fontFamily="var(--font-plex-sans), sans-serif">
            {n.label}
          </text>
        </g>
      ))}
      <g transform={`translate(${centre.x} ${centre.y})`}>
        <circle r="46" fill="var(--paper)" stroke="var(--accent)" strokeWidth="2.5" className="anim-pulse" />
        <text y="10" textAnchor="middle" fontSize="30" fill="var(--accent)" fontFamily="var(--font-newsreader), serif" fontStyle="italic">
          UX
        </text>
      </g>
    </svg>
  );
}
