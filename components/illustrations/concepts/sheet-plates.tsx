/**
 * Knowledge plates on the instructional sheet (D-089; docs/ILLUSTRATION_SYSTEM.md
 * § Visual Learning System). Light/dark theme-aware, built from ./system/sheet.
 * Each plate is composed for its concept; explanatory labels show in the hero.
 */
import { fittsId } from "@/lib/formulas/pointing";
import type { IllustrationEntry } from "../illustration-types";
import { Marker, Measure, Note, Pointer, S, UiButton, UiChip, UiField, UiFrame, UiText } from "../system/sheet";

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
  description: `A pointer travels from a start point to a target button on the right. The movement distance D, from the start to the centre of the target, is 240 units; the target width W, measured along the direction of approach, is 40 units. The path is one long fast movement that slightly overshoots, then a short corrective movement onto the target; dots along it are spaced widely in the middle and closely at the ends, showing speed rising and falling. A card states the Shannon formulation ID = log₂(D/W + 1) and evaluates it for this movement: log₂(240/40 + 1) ≈ ${fID.toFixed(2)} bits. A small inset plots movement time against index of difficulty as a straight line, MT = a + b·ID, with this movement marked; a and b are fitted for each device and task, so no values are shown.`,
  Art: ({ detail, animate }) => {
    const sx = 70;
    const sy = 176;
    const tx = sx + FD; // target centre
    const ty = 176;
    const path = `M${sx} ${sy} C ${sx + 80} ${sy - 52}, ${tx - 70} ${ty - 44}, ${tx + 7} ${ty - 9}`;
    // sample the ballistic curve; parameter spacing that eases in and out gives the velocity profile
    const bez = (t: number) => {
      const p0 = [sx, sy];
      const p1 = [sx + 80, sy - 52];
      const p2 = [tx - 70, ty - 44];
      const p3 = [tx + 7, ty - 9];
      const m = (a: number[], b: number[], k: number) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
      const a = m(p0, p1, t), b = m(p1, p2, t), c = m(p2, p3, t);
      return m(m(a, b, t), m(b, c, t), t);
    };
    const ts = Array.from({ length: 13 }, (_, i) => (1 - Math.cos((i / 12) * Math.PI)) / 2);
    return (
      <g>
        {/* formula card */}
        <g transform="translate(34 30)">
          <rect width={170} height={detail ? 46 : 30} rx={6} fill={S.soft} stroke={S.rule} strokeWidth="0.8" {...hair} />
          <UiText x={10} y={19} size={10} weight={600} mono>
            ID = log₂(D/W + 1)
          </UiText>
          {detail && (
            <UiText x={10} y={36} size={7} tone="ink2" mono>
              {`= log₂(240/40 + 1) ≈ ${fID.toFixed(2)} bits`}
            </UiText>
          )}
        </g>
        {/* distance D, measured to the target centre */}
        <Measure x1={sx} y1={100} x2={tx} y2={100} value={detail ? "D = 240" : "D"} tone="ink" />
        <line x1={sx} y1={104} x2={sx} y2={sy - 6} stroke={S.ruleStrong} strokeWidth="0.6" strokeDasharray="2 2" {...hair} />
        <line x1={tx} y1={104} x2={tx} y2={ty - 38} stroke={S.ruleStrong} strokeWidth="0.6" strokeDasharray="2 2" {...hair} />
        {/* the target */}
        <rect x={tx - FW / 2} y={ty - 34} width={FW} height={68} rx={7} fill={S.accentWash} stroke={S.accent} strokeWidth="1.3" {...hair} />
        <UiText x={tx} y={ty + 24} size={6.4} weight={600} tone="accent" anchor="middle">
          Save
        </UiText>
        {/* width W along the approach */}
        <Measure x1={tx - FW / 2} y1={ty + 46} x2={tx + FW / 2} y2={ty + 46} value={detail ? "W = 40" : "W"} tone="accent" />
        {/* the movement: ballistic phase then correction */}
        <path d={path} fill="none" stroke={S.ink2} strokeWidth="0.9" strokeDasharray="1 3.2" {...hair} />
        {ts.map((t, i) => {
          const [x, y] = bez(t);
          return <circle key={i} cx={x} cy={y} r={i === 0 ? 0 : 1.6} fill={S.ink2} />;
        })}
        <path d={`M${tx + 7} ${ty - 9} Q ${tx + 9} ${ty - 2}, ${tx + 2} ${ty + 4}`} fill="none" stroke={S.accent} strokeWidth="1.3" {...hair} />
        <circle cx={sx} cy={sy} r={5} fill={S.surface} stroke={S.ink} strokeWidth="1.2" {...hair} />
        <circle cx={sx} cy={sy} r={1.8} fill={S.ink} />
        {animate ? (
          <g style={{ offsetPath: `path("${path} Q ${tx + 9} ${ty - 2}, ${tx + 2} ${ty + 4}")`, offsetRotate: "0deg" }} className="anim-travel">
            <Pointer x={0} y={0} s={0.9} />
          </g>
        ) : (
          <Pointer x={tx + 2} y={ty + 4} s={0.9} />
        )}
        {/* MT = a + b·ID inset */}
        <g transform="translate(34 220)">
          <path d="M0 0 V50 H112" fill="none" stroke={S.ink3} strokeWidth="0.8" {...hair} />
          <path d="M4 44 L108 8" fill="none" stroke={S.ink2} strokeWidth="0.9" {...hair} />
          <circle cx={4 + (fID / 4) * 104} cy={44 - (fID / 4) * 36} r={2.6} fill={S.accent} />
          {detail && (
            <>
              <UiText x={58} y={62} size={5.6} tone="ink3" anchor="middle" mono>
                index of difficulty (bits)
              </UiText>
              <UiText x={8} y={-4} size={5.6} tone="ink3" mono>
                MT = a + b·ID
              </UiText>
            </>
          )}
        </g>
        <Note x={sx - 8} y={sy + 22} show={detail}>start</Note>
        <Note x={(sx + tx) / 2 - 22} y={sy - 50} show={detail}>fast, then slowing</Note>
        <Note x={tx + 30} y={ty + 8} show={detail} tone="accent">correction</Note>
      </g>
    );
  },
};

/* ---------------------------------------------------------------- */
/* UI design — one screen, five interface decisions                  */
/* (checked against the entry and its L2 figure: hierarchy, location, */
/*  controls and states, feedback, primary action, spacing; the      */
/*  screen is an original fictional library booking page)            */
/* ---------------------------------------------------------------- */
export const uiDesignPlate: IllustrationEntry = {
  slug: "ui-design",
  title: "User interface design plate",
  canvas: "sheet",
  description:
    "An original, fictional library screen for booking a study room, with five numbered decisions. 1, hierarchy: the title is the largest text and the date sits beneath it in a quieter style. 2, location: a top bar names the service and underlines the current section, Rooms. 3, controls and states: four start-time chips, one booked (dashed and labelled), one chosen (filled and outlined) and two free. 4, feedback: a confirmation message says the room is held for ten minutes. 5, primary action: one filled Confirm button with a quieter Cancel beside it. Dimension marks show a consistent 16-unit inner margin and 12-unit spacing between groups: spacing is part of the decision, not decoration.",
  Art: ({ detail }) => {
    const fx = 34;
    const fy = 26;
    const fw = 250;
    const X = (v: number) => fx + v;
    const Y = (v: number) => fy + 14 + v;
    return (
      <g>
        <UiFrame x={fx} y={fy} w={fw} h={250} url="library.example/rooms">
          {/* location bar */}
          <rect x={0} y={0} width={fw} height={20} fill={S.soft} />
          <rect x={16} y={6} width={8} height={8} rx={2} fill={S.cInk} />
          <UiText x={28} y={13} size={6.4} weight={700}>
            City Library
          </UiText>
          {["Rooms", "Events", "Account"].map((t, i) => (
            <g key={t}>
              <UiText x={130 + i * 38} y={13} size={5.8} weight={i === 0 ? 700 : 400} tone={i === 0 ? "ink" : "ink2"}>
                {t}
              </UiText>
              {i === 0 && <rect x={130} y={16} width={22} height={1.6} rx={0.8} fill={S.accent} />}
            </g>
          ))}
          {/* hierarchy */}
          <UiText x={16} y={44} size={12} weight={700}>
            Book a study room
          </UiText>
          <UiText x={16} y={56} size={6.2} tone="ink2">
            Thursday 12 March · up to 2 hours
          </UiText>
          {/* room */}
          <rect x={16} y={66} width={fw - 32} height={26} rx={5} fill={S.soft} stroke={S.rule} strokeWidth="0.7" {...hair} />
          <UiText x={24} y={77} size={7} weight={600}>
            Room 2B
          </UiText>
          <UiText x={24} y={86} size={5.4} tone="ink2">
            Seats 4 · screen · step-free access
          </UiText>
          {/* controls and states */}
          <UiText x={16} y={106} size={5.8} weight={600} tone="ink2">
            Start time
          </UiText>
          {[
            ["09:00", "booked"],
            ["10:00", "free"],
            ["11:00", "chosen"],
            ["12:00", "free"],
          ].map(([t, st], i) => (
            <UiChip key={t} x={16 + i * 55} y={110} w={49} label={st === "booked" ? `${t} booked` : t} selected={st === "chosen"} disabled={st === "booked"} />
          ))}
          <UiField x={16} y={136} w={fw - 32} label="Group name" value="Thesis group" />
          {/* feedback */}
          <rect x={16} y={160} width={fw - 32} height={16} rx={3} fill={S.okWash} stroke={S.ok} strokeWidth="0.8" {...hair} />
          <path d="M23 168 l2.2 2.2 l4.4 -4.6" fill="none" stroke={S.ok} strokeWidth="1.2" {...hair} />
          <UiText x={33} y={170.4} size={5.8} tone="ink">
            Held for 10 minutes. Confirm to keep 11:00–13:00.
          </UiText>
          {/* primary action */}
          <UiButton x={fw - 16 - 78} y={190} w={78} label="Confirm booking" />
          <UiButton x={fw - 16 - 78 - 52} y={190} w={46} label="Cancel" variant="ghost" />
        </UiFrame>
        {/* spacing measures */}
        <Measure x1={X(0)} y1={Y(79)} x2={X(16)} y2={Y(79)} value={detail ? "16" : undefined} tone="accent" offset={-8} />
        <Measure x1={X(fw - 6)} y1={Y(92)} x2={X(fw - 6)} y2={Y(104)} value={detail ? "12" : undefined} tone="accent" offset={9} />
        {/* numbered decisions */}
        {[
          [1, Y(40), X(124), "hierarchy"],
          [2, Y(10), X(fw - 2), "location"],
          [3, Y(116), X(fw - 20), "controls · states"],
          [4, Y(168), X(fw - 18), "feedback"],
          [5, Y(197), X(fw - 14), "primary action"],
        ].map(([n, y, tx, label]) => (
          <g key={n as number}>
            <Marker x={312} y={y as number} n={n as number} to={[tx as number, y as number]} />
            <Note x={322} y={(y as number) + 2.3} show={detail}>
              {label as string}
            </Note>
          </g>
        ))}
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
    "Two diamonds side by side. In the first, the Discover half fans out from the challenge into many scattered research notes, and the Define half draws them together into a few clusters and a single problem definition at the middle point. In the second, the Develop half fans out into several alternative prototype sketches, and the Deliver half narrows them to one tested solution at the right point. Each diamond widens (divergent thinking) and then narrows (convergent thinking). Dashed arrows beneath return from Deliver to Develop and from the second diamond back to the first, because teams loop back when evidence changes the problem; the model is a framing, not a fixed sequence.",
  Art: ({ detail }) => {
    const cy = 148;
    const hh = 84;
    const d1 = [34, 116, 198] as const; // left vertex, apex, right vertex
    const d2 = [202, 284, 366] as const;
    const diamond = (d: readonly [number, number, number]) => `M${d[0]} ${cy} L${d[1]} ${cy - hh} L${d[2]} ${cy} L${d[1]} ${cy + hh} Z`;
    // deterministic scatter for research notes
    const notes = Array.from({ length: 16 }, (_, i) => {
      const a = (i * 137.5 * Math.PI) / 180;
      const rr = 14 + ((i * 29) % 52);
      return [d1[0] + 30 + rr * 0.85 * Math.abs(Math.cos(a)), cy + Math.sin(a) * rr * 0.92] as const;
    }).filter(([x, y]) => Math.abs(y - cy) < (x - d1[0]) * (hh / (d1[1] - d1[0])) - 6);
    return (
      <g>
        {[d1, d2].map((d, k) => (
          <g key={k}>
            <path d={diamond(d)} fill={k === 0 ? S.soft : S.surface} stroke={S.ink2} strokeWidth="0.9" {...hair} />
            <line x1={d[1]} y1={cy - hh} x2={d[1]} y2={cy + hh} stroke={S.ruleStrong} strokeWidth="0.6" strokeDasharray="2 2.4" {...hair} />
          </g>
        ))}
        {/* Discover: many scattered notes */}
        {notes.map(([x, y], i) => (
          <rect key={i} x={x - 3.5} y={y - 2.6} width={7} height={5.2} rx={0.8} fill={S.surface} stroke={S.ink3} strokeWidth="0.6" {...hair} />
        ))}
        {/* Define: clusters converging to the problem definition */}
        {[
          [146, cy - 34],
          [152, cy + 4],
          [144, cy + 38],
        ].map(([x, y], i) => (
          <g key={i}>
            <rect x={x - 9} y={y - 7} width={18} height={14} rx={2} fill={S.surface} stroke={S.ink2} strokeWidth="0.7" {...hair} />
            {[0, 1, 2].map((k) => (
              <rect key={k} x={x - 6 + k * 4.2} y={y - 3} width={3.2} height={6} rx={0.6} fill={S.ink3} opacity={0.5} />
            ))}
            <path d={`M${x + 9} ${y} L${d1[2] - 4} ${cy}`} stroke={S.ink3} strokeWidth="0.6" {...hair} />
          </g>
        ))}
        {/* Develop: alternative prototypes */}
        {[
          [236, cy - 40],
          [246, cy - 8],
          [234, cy + 26],
          [258, cy + 46],
        ].map(([x, y], i) => (
          <g key={i}>
            <path d={`M${d2[0] + 4} ${cy} L${x - 10} ${y}`} stroke={S.ink3} strokeWidth="0.6" {...hair} />
            <rect x={x - 10} y={y - 8} width={20} height={15} rx={2} fill={S.surface} stroke={S.ink2} strokeWidth="0.7" {...hair} />
            <rect x={x - 7} y={y - 5} width={9} height={2} rx={1} fill={S.ink3} />
            <rect x={x - 7} y={y + 1} width={14} height={3} rx={1.5} fill={i === 1 ? S.accent : S.ruleStrong} />
          </g>
        ))}
        {/* Deliver: candidates tested and narrowed to one */}
        {(
          [
            [304, cy - 24, false],
            [312, cy + 2, true],
            [302, cy + 28, false],
          ] as const
        ).map(([x, y, chosen], i) => (
          <g key={i} opacity={chosen ? 1 : 0.55}>
            <path d={`M${x + 8} ${y} L${d2[2] - 6} ${cy}`} stroke={chosen ? S.accent : S.ink3} strokeWidth={chosen ? 1 : 0.6} {...hair} />
            <rect x={x - 8} y={y - 6} width={16} height={12} rx={2} fill={S.surface} stroke={chosen ? S.accent : S.ink3} strokeWidth="0.8" strokeDasharray={chosen ? undefined : "1.6 1.4"} {...hair} />
            <rect x={x - 5} y={y - 1} width={10} height={2.4} rx={1.2} fill={chosen ? S.accent : S.ruleStrong} />
          </g>
        ))}
        {/* boundary points */}
        {[d1[0], d1[2] + 2, d2[2]].map((x, i) => (
          <circle key={i} cx={x} cy={cy} r={i === 0 ? 4 : 5} fill={i === 0 ? S.surface : S.accent} stroke={i === 0 ? S.ink : S.accent} strokeWidth="1.2" {...hair} />
        ))}
        {/* loops back */}
        <path d={`M${d2[2] - 8} ${cy + hh - 30} Q ${d2[1] + 10} ${cy + hh + 18}, ${d2[0] + 44} ${cy + hh - 16}`} fill="none" stroke={S.accent} strokeWidth="1" strokeDasharray="3 2.4" {...hair} />
        <polygon points={`${d2[0] + 40},${cy + hh - 19} ${d2[0] + 47},${cy + hh - 20} ${d2[0] + 44},${cy + hh - 13}`} fill={S.accent} />
        <path d={`M${d2[1] - 20} ${cy + hh + 10} Q ${d1[2]} ${cy + hh + 34}, ${d1[1] + 14} ${cy + hh + 2}`} fill="none" stroke={S.ink3} strokeWidth="0.9" strokeDasharray="3 2.4" {...hair} />
        <polygon points={`${d1[1] + 10},${cy + hh - 1} ${d1[1] + 17},${cy + hh - 1} ${d1[1] + 15},${cy + hh + 6}`} fill={S.ink3} />
        {/* phase labels */}
        {detail &&
          (
            [
              [75, "Discover"],
              [157, "Define"],
              [243, "Develop"],
              [325, "Deliver"],
            ] as const
          ).map(([x, t]) => (
            <UiText key={t} x={x} y={cy - hh - 10} size={8} weight={600} anchor="middle">
              {t}
            </UiText>
          ))}
        <Note x={d1[0] - 2} y={cy + 16} show={detail} tone="ink2">challenge</Note>
        <Note x={d1[2] + 2} y={cy + 18} show={detail} anchor="middle" tone="accent">problem</Note>
        <Note x={d2[2] + 2} y={cy + 18} show={detail} anchor="end" tone="accent">solution</Note>
        <Note x={116} y={cy - hh - 22} show={detail} anchor="middle">diverge → converge</Note>
        <Note x={284} y={cy - hh - 22} show={detail} anchor="middle">diverge → converge</Note>
        <Note x={200} y={292} show={detail} anchor="middle" tone="ink2">loops back when evidence changes the problem</Note>
      </g>
    );
  },
};
