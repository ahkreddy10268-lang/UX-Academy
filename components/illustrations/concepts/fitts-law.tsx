import type { IllustrationEntry } from "../illustration-types";
import { C, Cursor, Dim, Label, STROKE } from "../primitives";

/** Aimed movement: origin, distance D, target width W, and the corrective sub-movements near the target. */
const path = "M70 200 C 150 120, 230 110, 292 150 S 306 162, 300 158";

export const fittsLaw: IllustrationEntry = {
  slug: "fitts-law",
  title: "Fitts's law plate",
  description:
    "A pointer starts on the left and travels along a curved path to a tall target bar on the right. A dimension line marks the distance D from the start to the target's centre, another marks the target's width W. Near the target the path makes small corrective wiggles: harder targets need more corrections.",
  animated: true,
  explorer: "fitts",
  Art: ({ detail, animate }) => (
    <g>
      {/* landing zone (effective width) */}
      <rect x="276" y="70" width="48" height="170" fill={C.soft} opacity="0.55" />
      {/* the target */}
      <rect x="288" y="70" width="24" height="170" fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} />
      {/* trajectory: ballistic phase then corrective sub-movements */}
      <path d={path} fill="none" stroke={C.line} strokeWidth={STROKE.main} strokeLinecap="round" strokeDasharray="1 6" />
      <circle cx="70" cy="200" r="7" fill={C.paper} stroke={C.line} strokeWidth={STROKE.main} />
      <g style={animate ? { offsetPath: `path("${path}")`, offsetRotate: "0deg" } : undefined} className={animate ? "anim-travel" : undefined}>
        <Cursor x={animate ? 0 : 296} y={animate ? 0 : 152} />
      </g>
      <Dim x1={70} y1={262} x2={300} y2={262} label="D  distance" show={detail} offset={-8} />
      <Dim x1={288} y1={52} x2={312} y2={52} label="W" show={detail} offset={-8} />
      <Label x={70} y={226} show={detail} tone="mute">
        start
      </Label>
      <Label x={200} y={40} show={detail} tone="line" size={12}>
        ID = log₂(D/W + 1)
      </Label>
    </g>
  ),
};
