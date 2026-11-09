/**
 * Knowledge plates on the instructional sheet (D-089; docs/ILLUSTRATION_SYSTEM.md
 * § Visual Learning System). Light/dark theme-aware, built from ./system/sheet.
 * Recomposed for the text standard (D-101): every SVG text ≥ 13 units; the hero
 * draws numbered markers whose explanations are the plate's HTML `key`.
 */
import { fittsId } from "@/lib/formulas/pointing";
import type { IllustrationEntry } from "../illustration-types";
import { Marker, Measure, Pointer, S, T, TextBar, UiButton, UiChip, UiFrame, UiText } from "../system/sheet";

const hair = { vectorEffect: "non-scaling-stroke" as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/* ---------------------------------------------------------------- */
/* Fitts's law — target geometry and the index of difficulty         */
/* (checked against the entry: ID = log2(D/W + 1) (Shannon form);    */
/*  W is measured along the approach; a fast ballistic movement is    */
/*  followed by corrective submovements; MT = a + b·ID, with a and b   */
/*  fitted per device and task, so the inset has no numbers)           */
/* ---------------------------------------------------------------- */
const FD = 240;
const FW = 40;
const fID = fittsId(FD, FW, "shannon");

export const fittsPlate: IllustrationEntry = {
  slug: "fitts-law",
  title: "Fitts's law plate",
  canvas: "sheet",
  explorer: "fitts",
  animated: true,
  description: `A pointer travels from a start point to a Save button on the right. The movement distance D, from the start to the centre of the target, is 240 units; the target width W, measured along the direction of approach, is 40 units. The path is one long fast movement that slightly overshoots, then a short corrective movement onto the target; dots along it are spaced widely in the middle and closely at the ends, showing speed rising and falling. A card states the Shannon formulation ID = log₂(D/W + 1) and evaluates it for this movement: log₂(6 + 1) ≈ ${fID.toFixed(2)} bits. A small inset plots movement time (MT) against index of difficulty (ID) as a straight line, MT = a + b·ID, with this movement marked; a and b are fitted for each device and task, so no values are shown.`,
  key: [
    { n: "1", label: "Ballistic movement", detail: "dots are far apart mid-path and close at the ends: speed rises, then falls" },
    { n: "2", label: "Correction", detail: "a short submovement lands the pointer on the target" },
    { n: "3", label: "MT = a + b·ID", detail: "time grows linearly with difficulty; a and b are fitted for each device and task" },
  ],
  Art: ({ detail, animate }) => {
    const sx = 60;
    const sy = 184;
    const tx = sx + FD; // target centre
    const ty = 184;
    const P = [
      [sx, sy],
      [sx + 80, sy - 60],
      [tx - 70, ty - 52],
      [tx + 7, ty - 10],
    ];
    const path = `M${P[0][0]} ${P[0][1]} C ${P[1][0]} ${P[1][1]}, ${P[2][0]} ${P[2][1]}, ${P[3][0]} ${P[3][1]}`;
    const corr = ` Q ${tx + 10} ${ty - 2}, ${tx + 2} ${ty + 6}`;
    const bez = (t: number) => {
      const m = (a: number[], b: number[], k: number) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
      const a = m(P[0], P[1], t), b = m(P[1], P[2], t), c = m(P[2], P[3], t);
      return m(m(a, b, t), m(b, c, t), t);
    };
    const ts = Array.from({ length: 13 }, (_, i) => (1 - Math.cos((i / 12) * Math.PI)) / 2);
    const [ax, ay] = bez(0.5);
    return (
      <g>
        {/* formula card */}
        <rect x={16} y={14} width={230} height={detail ? 54 : 36} rx={6} fill={S.soft} stroke={S.rule} strokeWidth="0.8" {...hair} />
        <UiText x={28} y={37} size={T.strong} weight={600} mono>
          ID = log₂(D/W + 1)
        </UiText>
        {detail && (
          <UiText x={28} y={58} tone="ink2" mono>
            {`= log₂(6 + 1) ≈ ${fID.toFixed(2)} bits`}
          </UiText>
        )}
        {/* distance D, measured to the target centre */}
        <Measure x1={sx} y1={100} x2={tx} y2={100} value={detail ? "D = 240" : "D"} tone="ink" />
        <line x1={sx} y1={106} x2={sx} y2={sy - 8} stroke={S.ruleStrong} strokeWidth="0.7" strokeDasharray="2 2" {...hair} />
        <line x1={tx} y1={106} x2={tx} y2={ty - 42} stroke={S.ruleStrong} strokeWidth="0.7" strokeDasharray="2 2" {...hair} />
        {/* the target */}
        <rect x={tx - FW / 2} y={ty - 40} width={FW} height={80} rx={7} fill={S.accentWash} stroke={S.accent} strokeWidth="1.4" {...hair} />
        <UiText x={tx} y={ty + 30} weight={700} tone="accent" anchor="middle">
          Save
        </UiText>
        {/* width W along the approach */}
        <Measure x1={tx - FW / 2} y1={ty + 58} x2={tx + FW / 2} y2={ty + 58} value={detail ? "W = 40" : "W"} tone="accent" offset={18} />
        {/* the movement: ballistic phase then correction */}
        <path d={path} fill="none" stroke={S.ink2} strokeWidth="0.9" strokeDasharray="1 3.4" {...hair} />
        {ts.map((t, i) => {
          const [x, y] = bez(t);
          return i === 0 ? null : <circle key={i} cx={x} cy={y} r={2} fill={S.ink2} />;
        })}
        <path d={`M${P[3][0]} ${P[3][1]}${corr}`} fill="none" stroke={S.accent} strokeWidth="1.5" {...hair} />
        <circle cx={sx} cy={sy} r={6} fill={S.surface} stroke={S.ink} strokeWidth="1.3" {...hair} />
        <circle cx={sx} cy={sy} r={2.2} fill={S.ink} />
        {animate ? (
          <g style={{ offsetPath: `path("${path}${corr}")`, offsetRotate: "0deg" }} className="anim-travel">
            <Pointer x={0} y={0} s={1.1} />
          </g>
        ) : (
          <Pointer x={tx + 2} y={ty + 6} s={1.1} />
        )}
        {/* MT = a + b·ID inset */}
        <g>
          <UiText x={18} y={226} tone="ink3" mono>
            MT
          </UiText>
          <path d="M22 232 V286 H150" fill="none" stroke={S.ink3} strokeWidth="0.9" {...hair} />
          <path d="M28 280 L144 240" fill="none" stroke={S.ink2} strokeWidth="1" {...hair} />
          <circle cx={28 + (fID / 4) * 116} cy={280 - (fID / 4) * 40} r={3.4} fill={S.accent} />
          <UiText x={156} y={290} tone="ink3" mono>
            ID
          </UiText>
        </g>
        {detail && (
          <>
            <Marker x={ax} y={ay - 22} n={1} />
            <Marker x={tx + 44} y={ty - 6} n={2} />
            <Marker x={96} y={238} n={3} />
          </>
        )}
      </g>
    );
  },
};

/* ---------------------------------------------------------------- */
/* UI design — one screen, five interface decisions                  */
/* (checked against the entry and its L2 figure: hierarchy, location, */
/*  controls and states, feedback, primary action; the screen is an   */
/*  original fictional library booking page)                          */
/* ---------------------------------------------------------------- */
export const uiDesignPlate: IllustrationEntry = {
  slug: "ui-design",
  title: "User interface design plate",
  canvas: "sheet",
  description:
    "An original, fictional library screen for booking a study room, with five numbered decisions. 1, hierarchy: the title, Book a study room, is the largest text and the date sits beneath it in a quieter style. 2, location: a top bar names the service, City Library, and underlines the current section, Rooms. 3, controls and states: four start-time chips; 09:00 is booked (dashed and struck through), 11:00 is chosen (filled and outlined) and the others are free. 4, feedback: a confirmation says the room is held for 10 minutes. 5, primary action: one filled Confirm button with a quieter Cancel beside it.",
  key: [
    { n: "1", label: "Hierarchy", detail: "the title is the largest text; the date is quieter" },
    { n: "2", label: "Location", detail: "the service name and the current section, underlined" },
    { n: "3", label: "Controls and states", detail: "booked (dashed, struck through), chosen (filled) and free" },
    { n: "4", label: "Feedback", detail: "the system confirms what happened and for how long" },
    { n: "5", label: "Primary action", detail: "one filled button; Cancel is quieter" },
  ],
  Art: ({ detail }) => {
    const fx = 14;
    const fy = 10;
    const fw = 296;
    const A = (x: number, y: number): [number, number] => [fx + x, fy + 22 + y];
    return (
      <g>
        <UiFrame x={fx} y={fy} w={fw} h={280}>
          {/* location */}
          <rect x={0} y={0} width={fw} height={34} fill={S.soft} />
          <rect x={14} y={11} width={12} height={12} rx={3} fill={S.ink} />
          <UiText x={32} y={22} weight={700}>
            City Library
          </UiText>
          <UiText x={150} y={22} weight={700}>
            Rooms
          </UiText>
          <rect x={150} y={28} width={42} height={2.4} rx={1.2} fill={S.accent} />
          <UiText x={210} y={22} tone="ink2">
            Events
          </UiText>
          {/* hierarchy */}
          <UiText x={16} y={70} size={T.title} weight={700}>
            Book a study room
          </UiText>
          <UiText x={16} y={90} tone="ink2">
            Thu 12 March · up to 2 hours
          </UiText>
          {/* controls and states */}
          <UiText x={16} y={118} weight={600} tone="ink2">
            Start time
          </UiText>
          {(
            [
              ["09:00", "booked"],
              ["10:00", "free"],
              ["11:00", "chosen"],
              ["12:00", "free"],
            ] as const
          ).map(([t, st], i) => (
            <UiChip key={t} x={16 + i * 68} y={126} w={60} label={t} selected={st === "chosen"} disabled={st === "booked"} />
          ))}
          {/* feedback */}
          <rect x={16} y={164} width={260} height={32} rx={6} fill={S.okWash} stroke={S.ok} strokeWidth="0.9" {...hair} />
          <path d="M27 180 l3.4 3.4 l6.4 -7" fill="none" stroke={S.ok} strokeWidth="1.6" {...hair} />
          <UiText x={44} y={185}>
            Held for 10 minutes
          </UiText>
          {/* primary action */}
          <TextBar x={16} y={222} w={70} />
          <UiButton x={112} y={212} w={70} label="Cancel" variant="ghost" />
          <UiButton x={186} y={212} w={90} label="Confirm" />
        </UiFrame>
        {detail && (
          <>
            <Marker x={A(196, 64)[0]} y={A(196, 64)[1]} n={1} />
            <Marker x={A(272, 17)[0]} y={A(272, 17)[1]} n={2} />
            <Marker x={346} y={A(0, 138)[1]} n={3} to={[A(290, 138)[0], A(290, 138)[1]]} />
            <Marker x={346} y={A(0, 180)[1]} n={4} to={[A(278, 180)[0], A(278, 180)[1]]} />
            <Marker x={346} y={A(0, 225)[1]} n={5} to={[A(278, 225)[0], A(278, 225)[1]]} />
          </>
        )}
      </g>
    );
  },
};

/* ---------------------------------------------------------------- */
/* Double Diamond — diverge and converge, twice                      */
/* (checked against the entry: Design Council's four phases; the     */
/*  first diamond chooses the problem, the second the solution;       */
/*  teams loop back; it is a framing, not a fixed sequence)           */
/* ---------------------------------------------------------------- */
export const doubleDiamondPlate: IllustrationEntry = {
  slug: "double-diamond",
  title: "Double Diamond plate",
  canvas: "sheet",
  description:
    "Two diamonds side by side, labelled Discover, Define, Develop and Deliver. In the first, the Discover half fans out from the challenge into many scattered research notes, and the Define half draws them together into a few clusters and a single problem definition at the middle point. In the second, the Develop half fans out into several alternative prototype sketches, and the Deliver half narrows them to one tested solution at the right point. Each diamond widens (divergent thinking) and then narrows (convergent thinking). Dashed arrows beneath return from Deliver to Develop and from the second diamond back to the first, because teams loop back when evidence changes the problem; the model is a framing, not a fixed sequence.",
  key: [
    { n: "1", label: "Challenge", detail: "the starting brief; Discover opens it up" },
    { n: "2", label: "Problem defined", detail: "the decision between the diamonds: agree the problem first" },
    { n: "3", label: "Solution", detail: "tested and narrowed to what works" },
    { n: "4", label: "Loops back", detail: "evidence can send a team back to an earlier phase" },
  ],
  Art: ({ detail }) => {
    const cy = 148;
    const hh = 86;
    const d1 = [16, 108, 200] as const;
    const d2 = [200, 292, 384] as const;
    const diamond = (d: readonly [number, number, number]) => `M${d[0]} ${cy} L${d[1]} ${cy - hh} L${d[2]} ${cy} L${d[1]} ${cy + hh} Z`;
    const notes = Array.from({ length: 14 }, (_, i) => {
      const a = (i * 137.5 * Math.PI) / 180;
      const rr = 14 + ((i * 29) % 54);
      return [d1[0] + 32 + rr * 0.85 * Math.abs(Math.cos(a)), cy + Math.sin(a) * rr * 0.9] as const;
    }).filter(([x, y]) => Math.abs(y - cy) < (x - d1[0]) * (hh / (d1[1] - d1[0])) - 8);
    return (
      <g>
        {[d1, d2].map((d, k) => (
          <g key={k}>
            <path d={diamond(d)} fill={k === 0 ? S.soft : S.surface} stroke={S.ink2} strokeWidth="1" {...hair} />
            <line x1={d[1]} y1={cy - hh} x2={d[1]} y2={cy + hh} stroke={S.ruleStrong} strokeWidth="0.7" strokeDasharray="2 2.4" {...hair} />
          </g>
        ))}
        {(
          [
            [62, "Discover"],
            [154, "Define"],
            [246, "Develop"],
            [338, "Deliver"],
          ] as const
        ).map(([x, t]) => (
          <UiText key={t} x={x} y={cy - hh - 12} size={T.strong} weight={700} anchor="middle">
            {t}
          </UiText>
        ))}
        {/* Discover: scattered research notes */}
        {notes.map(([x, y], i) => (
          <rect key={i} x={x - 4.5} y={y - 3.2} width={9} height={6.4} rx={1} fill={S.surface} stroke={S.ink3} strokeWidth="0.7" {...hair} />
        ))}
        {/* Define: clusters converging */}
        {[
          [134, cy - 34],
          [140, cy],
          [134, cy + 34],
        ].map(([x, y], i) => (
          <g key={i}>
            <path d={`M${x + 11} ${y} L${d1[2] - 6} ${cy}`} stroke={S.ink3} strokeWidth="0.7" {...hair} />
            <rect x={x - 11} y={y - 8} width={22} height={16} rx={2.5} fill={S.surface} stroke={S.ink2} strokeWidth="0.8" {...hair} />
            {[0, 1, 2].map((k) => (
              <rect key={k} x={x - 7.5 + k * 5.2} y={y - 3.6} width={4} height={7.2} rx={0.8} fill={S.ink3} opacity={0.5} />
            ))}
          </g>
        ))}
        {/* Develop: alternative prototypes, inside the widening half */}
        {[
          [264, cy - 33],
          [270, cy - 11],
          [270, cy + 11],
          [264, cy + 33],
        ].map(([x, y], i) => (
          <g key={i}>
            <path d={`M${d2[0] + 6} ${cy} L${x - 12} ${y}`} stroke={S.ink3} strokeWidth="0.7" {...hair} />
            <rect x={x - 12} y={y - 8} width={24} height={16} rx={2.5} fill={S.surface} stroke={S.ink2} strokeWidth="0.8" {...hair} />
            <rect x={x - 8} y={y - 4.5} width={11} height={2.4} rx={1.2} fill={S.ink3} />
            <rect x={x - 8} y={y + 1} width={16} height={4} rx={2} fill={i === 1 ? S.accent : S.ruleStrong} />
          </g>
        ))}
        {/* Deliver: narrowed to one tested candidate */}
        {(
          [
            [310, cy - 26, false],
            [318, cy + 2, true],
            [308, cy + 30, false],
          ] as const
        ).map(([x, y, chosen], i) => (
          <g key={i} opacity={chosen ? 1 : 0.55}>
            <path d={`M${x + 10} ${y} L${d2[2] - 8} ${cy}`} stroke={chosen ? S.accent : S.ink3} strokeWidth={chosen ? 1.2 : 0.7} {...hair} />
            <rect x={x - 10} y={y - 7} width={20} height={14} rx={2.5} fill={S.surface} stroke={chosen ? S.accent : S.ink3} strokeWidth="0.9" strokeDasharray={chosen ? undefined : "1.8 1.6"} {...hair} />
            <rect x={x - 6} y={y - 1.4} width={12} height={2.8} rx={1.4} fill={chosen ? S.accent : S.ruleStrong} />
          </g>
        ))}
        {/* boundary points */}
        {[d1[0], d1[2], d2[2]].map((x, i) => (
          <circle key={i} cx={x} cy={cy} r={i === 0 ? 5 : 6} fill={i === 0 ? S.surface : S.accent} stroke={i === 0 ? S.ink : S.accent} strokeWidth="1.3" {...hair} />
        ))}
        {/* loops back, drawn below both diamonds */}
        <path d={`M340 ${cy + hh + 10} Q 292 ${cy + hh + 36}, 250 ${cy + hh + 12}`} fill="none" stroke={S.accent} strokeWidth="1.1" strokeDasharray="3.4 2.6" {...hair} />
        <polygon points={`244,${cy + hh + 8} 254,${cy + hh + 9} 249,${cy + hh + 17}`} fill={S.accent} />
        <path d={`M304 ${cy + hh + 28} Q 183 ${cy + hh + 70}, 68 ${cy + hh + 12}`} fill="none" stroke={S.ink3} strokeWidth="1" strokeDasharray="3.4 2.6" {...hair} />
        <polygon points={`62,${cy + hh + 8} 72,${cy + hh + 9} 67,${cy + hh + 17}`} fill={S.ink3} />
        {detail && (
          <>
            <Marker x={d1[0] + 10} y={cy + 30} n={1} />
            <Marker x={d1[2]} y={cy - 30} n={2} />
            <Marker x={d2[2] - 6} y={cy + 32} n={3} />
            <Marker x={183} y={cy + hh + 47} n={4} />
          </>
        )}
      </g>
    );
  },
};
