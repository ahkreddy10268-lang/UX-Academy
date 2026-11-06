/**
 * Replacement plates for the foundations audit (D-093; docs/ILLUSTRATION_SYSTEM.md
 * § Visual Learning System). Each replaces a plate the audit marked "replace";
 * slugs, registry order and explorer flags are unchanged. Built from
 * ../system/sheet on the instructional canvas; explanatory labels appear only
 * in the hero (`detail`) and the description carries the meaning. Every label
 * is checked against its entry (see the comment on each plate).
 */
import type { ReactNode } from "react";
import type { IllustrationEntry } from "../illustration-types";
import { Measure, Note, S, UiFrame, UiText, Verdict } from "../system/sheet";

const hair = { vectorEffect: "non-scaling-stroke" as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/** A labelled node in a model diagram. */
function Node({ cx, cy, w = 62, label, tone = "ink", ghost = false }: { cx: number; cy: number; w?: number; label?: string; tone?: "ink" | "accent" | "error"; ghost?: boolean }) {
  const stroke = ghost ? S.ink3 : tone === "accent" ? S.accent : tone === "error" ? S.error : S.ink2;
  const fill = ghost ? "none" : tone === "accent" ? S.accentWash : tone === "error" ? S.errorWash : S.surface;
  return (
    <g>
      <rect x={cx - w / 2} y={cy - 8} width={w} height={16} rx={8} fill={fill} stroke={stroke} strokeWidth={ghost ? 0.8 : 1} strokeDasharray={ghost ? "2 2" : undefined} {...hair} />
      {label && (
        <UiText x={cx} y={cy + 2.2} size={6.2} weight={600} anchor="middle" tone={tone === "error" ? "error" : tone === "accent" ? "accent" : "ink"}>
          {label}
        </UiText>
      )}
    </g>
  );
}

/** A straight connector with a filled head at (x2, y2). */
function Arrow({ x1, y1, x2, y2, tone = "ink", dashed = false, head = 4 }: { x1: number; y1: number; x2: number; y2: number; tone?: "ink" | "accent" | "error" | "mute"; dashed?: boolean; head?: number }) {
  const c = { ink: S.ink2, accent: S.accent, error: S.error, mute: S.ink3 }[tone];
  const a = Math.atan2(y2 - y1, x2 - x1);
  const p = (d: number, s: number) => [x2 - Math.cos(a) * d + Math.cos(a + Math.PI / 2) * s, y2 - Math.sin(a) * d + Math.sin(a + Math.PI / 2) * s];
  const [l, r] = [p(head * 1.6, head * 0.8), p(head * 1.6, -head * 0.8)];
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2 - Math.cos(a) * head} y2={y2 - Math.sin(a) * head} stroke={c} strokeWidth="1" strokeDasharray={dashed ? "2.4 2" : undefined} {...hair} />
      <polygon points={`${x2},${y2} ${l[0]},${l[1]} ${r[0]},${r[1]}`} fill={c} />
    </g>
  );
}

/** A panel that holds a model diagram. */
function Panel({ x, y, w, h, children, tone = "soft" }: { x: number; y: number; w: number; h: number; children?: ReactNode; tone?: "soft" | "surface" }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={tone === "soft" ? S.soft : S.surface} stroke={S.rule} strokeWidth="0.8" {...hair} />
      {children}
    </g>
  );
}

/* ---------------------------------------------------------------- */
/* Mental models — conceptual model, system image, user's model      */
/* (checked against the entry: Norman's three models; the designer   */
/*  communicates only through the system image; users' models are    */
/*  incomplete; the entry's own example is an autosaving editor whose */
/*  system image does not show saved state, so users keep pressing    */
/*  Save and believe the work lives on this laptop)                  */
/* ---------------------------------------------------------------- */
export const mentalModelsPlate: IllustrationEntry = {
  slug: "mental-models",
  title: "Mental models plate",
  canvas: "sheet",
  description:
    "Three panels joined by arrows, using an autosaving notes editor as the example. On the left, the designer's conceptual model is complete: each edit is saved automatically to a cloud copy, which syncs to the phone. In the middle, the system image is the editor itself: a document titled Trip notes with a toolbar, and an empty space where a saved-state message could be but is not. On the right, the user's mental model, formed only from that screen, is wrong in one link and incomplete: it says an edit needs Save and is stored on this laptop, and the cloud copy and the phone are missing, shown as an empty dashed node. Arrows run from the conceptual model to the system image and from the system image to the user's model; a dashed arc straight from designer to user is crossed out, because designers cannot hand their model to users directly.",
  Art: ({ detail }) => {
    const cy = [116, 154, 192];
    return (
      <g>
        {/* the direct channel that does not exist */}
        <path d="M70 88 Q 204 6 336 88" fill="none" stroke={S.ink3} strokeWidth="0.9" strokeDasharray="3 2.6" {...hair} />
        <Verdict x={204} y={47} ok={false} r={7} />
        <Note x={204} y={30} show={detail} anchor="middle" tone="error">no direct channel</Note>

        {/* designer's conceptual model: complete */}
        <Panel x={18} y={88} w={104} h={128}>
          <Node cx={70} cy={cy[0]} label="Edit" />
          <Arrow x1={70} y1={cy[0] + 8} x2={70} y2={cy[1] - 9} />
          <UiText x={75} y={(cy[0] + cy[1]) / 2 + 2} size={5} tone="ink3" mono>
            auto
          </UiText>
          <Node cx={70} cy={cy[1]} label="Cloud copy" tone="accent" />
          <Arrow x1={70} y1={cy[1] + 8} x2={70} y2={cy[2] - 9} />
          <UiText x={75} y={(cy[1] + cy[2]) / 2 + 2} size={5} tone="ink3" mono>
            sync
          </UiText>
          <Node cx={70} cy={cy[2]} label="Phone" />
        </Panel>

        {/* the system image: the editor, with no saved state shown */}
        <UiFrame x={142} y={74} w={124} h={156} url="notes.example">
          <rect x={0} y={0} width={124} height={16} fill={S.soft} />
          <UiText x={8} y={10.6} size={6.4} weight={700}>
            B
          </UiText>
          <UiText x={18} y={10.6} size={6.4} tone="ink2">
            I
          </UiText>
          <rect x={27} y={5} width={0.8} height={7} fill={S.rule} />
          <rect x={32} y={6} width={14} height={5} rx={1} fill={S.ruleStrong} opacity={0.6} />
          <rect x={78} y={3.5} width={40} height={9} rx={2} fill="none" stroke={S.error} strokeWidth="0.8" strokeDasharray="2 1.6" {...hair} />
          <UiText x={10} y={34} size={9} weight={700}>
            Trip notes
          </UiText>
          {[46, 56, 66, 80, 90].map((y, i) => (
            <rect key={y} x={10} y={y} width={[96, 88, 60, 92, 70][i]} height={3.2} rx={1.6} fill={S.ruleStrong} opacity={0.7} />
          ))}
          <UiText x={10} y={110} size={6} tone="ink">
            Ferry leaves 07:40
          </UiText>
          <rect x={67} y={104} width={0.9} height={8} fill={S.accent} />
        </UiFrame>
        <Note x={266} y={70} show={detail} anchor="end" tone="error">saved state not shown</Note>

        {/* user's mental model: one wrong link, one missing part */}
        <Panel x={286} y={88} w={100} h={128}>
          <Node cx={336} cy={cy[0]} label="Edit" />
          <Arrow x1={336} y1={cy[0] + 8} x2={336} y2={cy[1] - 9} tone="error" dashed />
          <UiText x={341} y={(cy[0] + cy[1]) / 2 + 2} size={5} tone="error" mono>
            needs Save
          </UiText>
          <Node cx={336} cy={cy[1]} label="This laptop" tone="error" />
          <Node cx={336} cy={cy[2]} ghost />
          <UiText x={336} y={cy[2] + 2.2} size={6.4} tone="ink3" anchor="middle">
            ?
          </UiText>
        </Panel>

        {/* the only channel: designer → system image → user */}
        <Arrow x1={124} y1={154} x2={140} y2={154} tone="accent" />
        <Arrow x1={268} y1={154} x2={284} y2={154} tone="accent" />

        <Note x={70} y={232} show={detail} anchor="middle">conceptual model</Note>
        <Note x={204} y={246} show={detail} anchor="middle">system image</Note>
        <Note x={336} y={232} show={detail} anchor="middle">user&apos;s mental model</Note>
        <Note x={204} y={276} show={detail} anchor="middle" tone="ink2">users build their model from what they perceive</Note>
      </g>
    );
  },
};

/* ---------------------------------------------------------------- */
/* Affordances — possible versus perceived (Gaver, 1991)             */
/* (checked against the entry: an affordance is an action            */
/*  possibility; Gaver separates perceptible (possible and visible),  */
/*  hidden (possible, not perceptible: an unlabelled gesture) and     */
/*  false (perceptible, not real: looks like a link, does nothing))   */
/* ---------------------------------------------------------------- */
export const affordancesPlate: IllustrationEntry = {
  slug: "affordances",
  title: "Affordances plate",
  canvas: "sheet",
  description:
    "A phone inbox beside a two-by-two grid that sorts what can be done against what can be seen (Gaver's classification). 1, perceptible affordance: an Archive button on the first message, possible and visible. 2, hidden affordance: the second message can be swiped left to reveal Delete, but nothing on screen shows it; the swipe and the revealed action are drawn dashed. 3, false affordance: the section heading Promotions is coloured and underlined like a link but does nothing. In the grid, columns are perceived (tick) and not perceived (cross), rows are possible (tick) and not possible (cross); 1 sits in possible and perceived, 2 in possible but not perceived, 3 in perceived but not possible, and the fourth cell, neither possible nor perceived, is empty.",
  Art: ({ detail }) => {
    const fx = 30;
    const fy = 34;
    const fw = 150;
    const row = (i: number) => 28 + i * 36;
    const A = (x: number, y: number): [number, number] => [fx + x, fy + 14 + y];
    const cols = [236, 308];
    const rows = [96, 164];
    const cw = 72;
    const rh = 68;
    const cells: [number, number, string, string][] = [
      [0, 0, "1", "perceptible"],
      [1, 0, "2", "hidden"],
      [0, 1, "3", "false"],
    ];
    return (
      <g>
        <UiFrame x={fx} y={fy} w={fw} h={232} url="mail.example">
          <UiText x={10} y={18} size={9} weight={700}>
            Inbox
          </UiText>
          {["Ana Ruiz", "Port office", "Library"].map((s, i) => (
            <g key={s}>
              <line x1={0} y1={row(i)} x2={fw} y2={row(i)} stroke={S.rule} strokeWidth="0.7" {...hair} />
              <UiText x={10} y={row(i) + 13} size={6.4} weight={600}>
                {s}
              </UiText>
              <rect x={10} y={row(i) + 19} width={[70, 62, 76][i]} height={3} rx={1.5} fill={S.ruleStrong} opacity={0.7} />
            </g>
          ))}
          <line x1={0} y1={row(3)} x2={fw} y2={row(3)} stroke={S.rule} strokeWidth="0.7" {...hair} />
          {/* 1 — perceptible: a visible button */}
          <rect x={96} y={row(0) + 9} width={44} height={13} rx={6.5} fill={S.surface} stroke={S.control} strokeWidth="0.8" {...hair} />
          <UiText x={118} y={row(0) + 17.6} size={6} weight={600} tone="accent" anchor="middle">
            Archive
          </UiText>
          {/* 2 — hidden: swipe to reveal Delete */}
          <rect x={112} y={row(1) + 2} width={36} height={30} rx={3} fill="none" stroke={S.ink3} strokeWidth="0.8" strokeDasharray="2 1.8" {...hair} />
          <UiText x={130} y={row(1) + 19} size={5.6} tone="ink3" anchor="middle">
            Delete
          </UiText>
          <Arrow x1={104} y1={row(1) + 27} x2={66} y2={row(1) + 27} tone="mute" dashed head={3} />
          {/* 3 — false: looks like a link, does nothing */}
          <UiText x={10} y={row(3) + 20} size={7} weight={600} tone="accent">
            Promotions
          </UiText>
          <rect x={10} y={row(3) + 22.4} width={41} height={0.9} fill={S.accent} />
          {[0, 1].map((k) => (
            <g key={k}>
              <rect x={10} y={row(3) + 34 + k * 22} width={54} height={3.4} rx={1.7} fill={S.ruleStrong} opacity={0.6} />
              <rect x={10} y={row(3) + 41 + k * 22} width={84} height={3} rx={1.5} fill={S.rule} />
            </g>
          ))}
        </UiFrame>
        {/* numbered leaders from the interface */}
        {(
          [
            [1, A(140, row(0) + 15)],
            [2, A(148, row(1) + 17)],
            [3, A(54, row(3) + 17)],
          ] as const
        ).map(([n, to]) => (
          <g key={n}>
            <line x1={198} y1={to[1]} x2={to[0]} y2={to[1]} stroke={S.ink2} strokeWidth="0.7" {...hair} />
            <circle cx={to[0]} cy={to[1]} r={1.5} fill={S.ink2} />
            <circle cx={198} cy={to[1]} r={6} fill={S.ink} />
            <text x={198} y={to[1] + 2.3} textAnchor="middle" fontSize={6.4} fontWeight={700} fill={S.surface}>
              {n}
            </text>
          </g>
        ))}
        {/* the grid: possible × perceived */}
        {rows.map((y, ri) =>
          cols.map((x, ci) => (
            <rect key={`${ri}${ci}`} x={x} y={y} width={cw} height={rh} fill={ri === 0 && ci === 0 ? S.okWash : S.surface} stroke={S.ruleStrong} strokeWidth="0.8" {...hair} />
          )),
        )}
        <Verdict x={cols[0] + cw / 2} y={rows[0] - 12} ok />
        <Verdict x={cols[1] + cw / 2} y={rows[0] - 12} ok={false} />
        <Verdict x={cols[0] - 14} y={rows[0] + rh / 2} ok />
        <Verdict x={cols[0] - 14} y={rows[1] + rh / 2} ok={false} />
        {cells.map(([ci, ri, n, label]) => {
          const x = cols[ci] + cw / 2;
          const y = rows[ri] + rh / 2 - (detail ? 6 : 0);
          return (
            <g key={n}>
              <circle cx={x} cy={y} r={9} fill={S.ink} />
              <text x={x} y={y + 3.4} textAnchor="middle" fontSize={9.6} fontWeight={700} fill={S.surface}>
                {n}
              </text>
              <Note x={x} y={y + 22} show={detail} anchor="middle">
                {label}
              </Note>
            </g>
          );
        })}
        <UiText x={cols[1] + cw / 2} y={rows[1] + rh / 2 + 2.4} size={8} tone="ink3" anchor="middle">
          —
        </UiText>
        <Note x={cols[1]} y={rows[0] - 26} show={detail} anchor="middle">perceived</Note>
        <g transform={`rotate(-90 ${cols[0] - 26} ${rows[1]})`}>
          <Note x={cols[0] - 26} y={rows[1]} show={detail} anchor="middle">
            possible
          </Note>
        </g>
        <Note x={308} y={256} show={detail} anchor="middle" tone="ink2">can it be done? can it be seen?</Note>
      </g>
    );
  },
};

/* ---------------------------------------------------------------- */
/* Signifiers — the same control with and without cues               */
/* (checked against the entry: the affordance (clickable here) is     */
/*  identical; signifiers communicate it: visual form, conventions    */
/*  (a download icon), text, state change on approach and the cursor; */
/*  redundant cues are robust; plain text is read as non-interactive) */
/* ---------------------------------------------------------------- */
function ReportScreen({ x, cues }: { x: number; cues: boolean }) {
  return (
    <UiFrame x={x} y={50} w={172} h={170} url="reports.example">
      <UiText x={12} y={20} size={8} weight={700}>
        Reports
      </UiText>
      <UiText x={12} y={40} size={6.4} weight={600}>
        March report
      </UiText>
      <rect x={12} y={45} width={86} height={3} rx={1.5} fill={S.ruleStrong} opacity={0.7} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <line x1={12} y1={60 + i * 12} x2={160} y2={60 + i * 12} stroke={S.rule} strokeWidth="0.6" {...hair} />
          <rect x={12} y={64 + i * 12} width={[40, 34, 46, 30][i]} height={3} rx={1.5} fill={S.rule} />
          <rect x={128} y={64 + i * 12} width={32} height={3} rx={1.5} fill={S.rule} />
        </g>
      ))}
      {/* same hit area in both versions: the affordance */}
      <rect x={98} y={110} width={68} height={22} rx={4} fill="none" stroke={S.ink3} strokeWidth="0.6" strokeDasharray="1.6 1.6" {...hair} />
      {cues ? (
        <g>
          <rect x={101} y={113} width={62} height={16} rx={8} fill={S.accentWash} stroke={S.accent} strokeWidth="1.1" {...hair} />
          <path d="M110 117 v6 m-2.6 -2.6 l2.6 2.6 l2.6 -2.6 M106.6 126 h6.8" fill="none" stroke={S.accentInk} strokeWidth="1" {...hair} />
          <UiText x={135} y={123.6} size={6} weight={600} tone="accent" anchor="middle">
            Export CSV
          </UiText>
        </g>
      ) : (
        <UiText x={106} y={124} size={6.4} tone="ink2">
          Export
        </UiText>
      )}
    </UiFrame>
  );
}

export const signifiersPlate: IllustrationEntry = {
  slug: "signifiers",
  title: "Signifiers plate",
  canvas: "sheet",
  explorer: "signifiers",
  description:
    "Two copies of the same reports screen. In both, the same area beside the March report can be clicked to export it, outlined with a faint dashed hit area: the affordance is identical. On the left, the control is the word Export in the same plain grey style as the body text, so nothing says it can be clicked; it is marked with a cross. On the right, it carries four redundant signifiers, numbered: 1, shape, a filled rounded button with a border; 2, a download icon, a learned convention; 3, a label naming the result, Export CSV; 4, a pointer cursor and hover colour as the pointer approaches. It is marked with a tick. Only the signifiers differ.",
  Art: ({ detail }) => {
    const ox = 208;
    const oy = 64;
    const marker = (x: number, y: number, n: number) => (
      <g>
        <circle cx={x} cy={y} r={6} fill={S.ink} />
        <text x={x} y={y + 2.3} textAnchor="middle" fontSize={6.4} fontWeight={700} fill={S.surface}>
          {n}
        </text>
      </g>
    );
    const below: [number, number][] = [
      [ox + 110, oy + 127],
      [ox + 135, oy + 127],
      [ox + 160, oy + 136],
    ];
    return (
      <g>
        <ReportScreen x={20} cues={false} />
        <ReportScreen x={ox} cues />
        <g transform={`translate(${ox + 154} ${oy + 122})`}>
          <path d="M0 0 L0 12 L3.2 9.2 L5.6 14 L7.6 13 L5.2 8.4 L9.4 8.4 Z" fill={S.ink} stroke={S.surface} strokeWidth="0.8" strokeLinejoin="round" />
        </g>
        <Verdict x={106} y={34} ok={false} />
        <Verdict x={294} y={34} ok />
        {/* 1 shape: from the left */}
        <line x1={ox + 84} y1={oy + 121} x2={ox + 101} y2={oy + 121} stroke={S.ink2} strokeWidth="0.7" {...hair} />
        <circle cx={ox + 101} cy={oy + 121} r={1.5} fill={S.ink2} />
        {marker(ox + 78, oy + 121, 1)}
        {/* 2 icon, 3 label, 4 hover + cursor: from below */}
        {below.map(([tx, ty], i) => {
          const mx = ox + 104 + i * 26;
          return (
            <g key={i}>
              <path d={`M${mx} 238 L${mx} 230 L${tx} ${Math.max(ty + 8, 222)} L${tx} ${ty}`} fill="none" stroke={S.ink2} strokeWidth="0.7" {...hair} />
              <circle cx={tx} cy={ty} r={1.5} fill={S.ink2} />
              {marker(mx, 244, i + 2)}
            </g>
          );
        })}
        <Note x={106} y={244} show={detail} anchor="middle" tone="error">no cue: reads as text</Note>
        <Note x={300} y={266} show={detail} anchor="middle">1 shape · 2 icon · 3 label · 4 hover</Note>
        <Note x={200} y={290} show={detail} anchor="middle" tone="ink2">same affordance; only the signifiers differ</Note>
      </g>
    );
  },
};

/* ---------------------------------------------------------------- */
/* Usability testing — task, observed behaviour, record, findings    */
/* (checked against the entry: a realistic task written without the   */
/*  answer (its own train example), a participant thinking aloud, the */
/*  researcher noting behaviour and quotes per task, time on task,    */
/*  then problems synthesised and rated by severity after sessions;   */
/*  the session is illustrative, so the plate shows no frequencies)   */
/* ---------------------------------------------------------------- */
function Severity({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      {[0, 1, 2].map((k) => (
        <rect key={k} x={x + k * 5} y={y - 6 + (2 - k) * 0} width={3.6} height={7} rx={1} fill={k < n ? S.error : "none"} stroke={k < n ? S.error : S.ink3} strokeWidth="0.6" {...hair} />
      ))}
    </g>
  );
}

function Obs({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={5} fill={S.accent} />
      <text x={x} y={y + 2} textAnchor="middle" fontSize={5.6} fontWeight={700} fill={S.surface}>
        {n}
      </text>
    </g>
  );
}

export const usabilityTestingPlate: IllustrationEntry = {
  slug: "usability-testing",
  title: "Usability testing plate",
  canvas: "sheet",
  description:
    "An illustrative moderated session, read from the task to the findings. A task card asks: find a train to Leeds that arrives before 10:00. Below it, the interface under test lists three trains from Manchester to Leeds with a filter that offers only a departure time. Three numbered observations are marked on it: 1, the participant hesitates at the departure filter; 2, thinking aloud, they ask whether a time is when the train leaves or when it arrives; 3, they choose the 08:42 train, arriving 09:41, and succeed. A session record on the right places these on a timeline, with the hesitation as a shaded span and the time on task measured at 1:32. Beneath it, findings are synthesised from the observations and rated by severity with one to three bars: the filter offers departure time only (high, from observations 1 and 2); times are read as departures (medium, from observation 2); and what worked, comparing results was easy (observation 3).",
  Art: ({ detail }) => {
    const t0 = 226;
    const ts = (s: number) => t0 + s * 1.48;
    return (
      <g>
        {/* the task */}
        <rect x={18} y={22} width={180} height={46} rx={6} fill={S.soft} stroke={S.rule} strokeWidth="0.8" {...hair} />
        <UiText x={28} y={35} size={5.4} tone="ink3" mono>
          TASK 2
        </UiText>
        <UiText x={28} y={47} size={6.6} weight={600}>
          Find a train to Leeds that arrives
        </UiText>
        <UiText x={28} y={57} size={6.6} weight={600}>
          before 10:00.
        </UiText>
        <Arrow x1={108} y1={69} x2={108} y2={82} tone="mute" head={3} />

        {/* the interface under test, with observations */}
        <UiFrame x={18} y={84} w={180} h={172} url="rail.example">
          <rect x={0} y={0} width={180} height={18} fill={S.soft} />
          <UiText x={8} y={12} size={6.6} weight={700}>
            Manchester → Leeds
          </UiText>
          <rect x={8} y={25} width={70} height={12} rx={3} fill={S.surface} stroke={S.control} strokeWidth="0.7" {...hair} />
          <UiText x={13} y={33} size={5.4}>
            Depart after 08:00 ▾
          </UiText>
          <ellipse cx={43} cy={31} rx={42} ry={11} fill="none" stroke={S.accent} strokeWidth="0.9" strokeDasharray="1.4 1.6" {...hair} />
          {[
            ["08:12", "09:05", "53 min"],
            ["08:42", "09:41", "59 min"],
            ["09:12", "10:05", "53 min"],
          ].map(([d, a, m], i) => (
            <g key={d}>
              <rect x={8} y={46 + i * 25} width={164} height={21} rx={3} fill={i === 1 ? S.okWash : S.surface} stroke={i === 1 ? S.ok : S.rule} strokeWidth={i === 1 ? 1 : 0.7} {...hair} />
              <UiText x={15} y={59 + i * 25} size={6.6} weight={600} mono>
                {`${d} → ${a}`}
              </UiText>
              <UiText x={122} y={59 + i * 25} size={5.4} tone="ink3">
                {m}
              </UiText>
            </g>
          ))}
          <rect x={22} y={126} width={140} height={22} rx={6} fill={S.surface} stroke={S.ink2} strokeWidth="0.8" {...hair} />
          <path d="M40 126 l4 -5 l3 5" fill={S.surface} stroke={S.ink2} strokeWidth="0.8" {...hair} />
          <rect x={39.4} y={125.2} width={8.2} height={1.6} fill={S.surface} />
          <UiText x={92} y={140} size={6} tone="ink" anchor="middle">
            “Is that when it leaves or arrives?”
          </UiText>
        </UiFrame>
        <Obs x={98} y={115} n={1} />
        <Obs x={176} y={224} n={2} />
        <Verdict x={184} y={169} ok r={5.5} />
        <Obs x={184} y={185} n={3} />

        {/* the session record */}
        <rect x={214} y={22} width={172} height={84} rx={6} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.8" {...hair} />
        <UiText x={224} y={36} size={6.4} weight={700}>
          Session record · P2 · task 2
        </UiText>
        <line x1={t0} y1={68} x2={ts(100)} y2={68} stroke={S.ink3} strokeWidth="0.8" {...hair} />
        {[0, 30, 60, 90].map((s) => (
          <g key={s}>
            <line x1={ts(s)} y1={66} x2={ts(s)} y2={70} stroke={S.ink3} strokeWidth="0.7" {...hair} />
            <UiText x={ts(s)} y={78} size={5} tone="ink3" anchor="middle" mono>
              {`${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`}
            </UiText>
          </g>
        ))}
        <rect x={ts(15)} y={64} width={ts(27) - ts(15)} height={8} rx={1.5} fill={S.accentWash} stroke={S.accent} strokeWidth="0.6" {...hair} />
        <circle cx={t0} cy={68} r={2.4} fill={S.ink} />
        <Obs x={(ts(15) + ts(27)) / 2} y={54} n={1} />
        <line x1={ts(40)} y1={60} x2={ts(40)} y2={72} stroke={S.accent} strokeWidth="1" {...hair} />
        <Obs x={ts(40)} y={54} n={2} />
        <Obs x={ts(92)} y={54} n={3} />
        <Verdict x={ts(92)} y={68} ok r={4.6} />
        <Measure x1={t0} y1={94} x2={ts(92)} y2={94} value="1:32" tone="ink" />

        <Arrow x1={199} y1={110} x2={212} y2={92} tone="mute" head={3} />
        <Arrow x1={300} y1={107} x2={300} y2={120} tone="mute" head={3} />

        {/* findings, rated after the sessions */}
        <rect x={214} y={122} width={172} height={134} rx={6} fill={S.soft} stroke={S.rule} strokeWidth="0.8" {...hair} />
        <UiText x={224} y={137} size={6.8} weight={700}>
          Findings
        </UiText>
        {(
          [
            [3, "Filter offers departure time only", "obs 1, 2"],
            [2, "Times are read as departures", "obs 2"],
            [0, "Comparing results was easy", "obs 3"],
          ] as const
        ).map(([sev, text, ev], i) => {
          const y = 158 + i * 32;
          return (
            <g key={text}>
              <rect x={222} y={y - 12} width={156} height={26} rx={4} fill={S.surface} stroke={S.rule} strokeWidth="0.7" {...hair} />
              {sev ? <Severity x={230} y={y + 2} n={sev} /> : <Verdict x={235} y={y} ok r={4.6} />}
              <UiText x={250} y={y - 1} size={6} weight={600}>
                {text}
              </UiText>
              <UiText x={250} y={y + 8} size={5.2} tone="ink3" mono>
                {ev}
              </UiText>
            </g>
          );
        })}
        <Note x={200} y={276} show={detail} anchor="middle">task → observed behaviour → record → findings</Note>
        <Note x={200} y={290} show={detail} anchor="middle" tone="ink2">illustrative session · severity rated after all sessions</Note>
      </g>
    );
  },
};

/* ---------------------------------------------------------------- */
/* Usability — one product, two contexts of use (ISO 9241-11)         */
/* (checked against the entry: usability is a quality of the          */
/*  interaction between specified users, goals and context, measured  */
/*  as effectiveness, efficiency and satisfaction; its own analogy is */
/*  a station ticket machine that suits a commuter and fails a hurried */
/*  visitor; step counts are read from the drawn routes, the rest is   */
/*  an illustrative outcome)                                          */
/* ---------------------------------------------------------------- */
function ContextStrip({ y, tag, chips, ok, steps, rating, outcome }: { y: number; tag: string; chips: string[]; ok: boolean; steps: number; rating: number; outcome: string }) {
  const x = 172;
  const cells = [x + 8, x + 78, x + 148];
  return (
    <g>
      <rect x={x} y={y} width={214} height={104} rx={8} fill="none" stroke={S.ink3} strokeWidth="0.8" strokeDasharray="3 2.4" {...hair} />
      <circle cx={x + 14} cy={y + 15} r={6} fill={S.ink} />
      <text x={x + 14} y={y + 17.3} textAnchor="middle" fontSize={6.4} fontWeight={700} fill={S.surface}>
        {tag}
      </text>
      {chips.reduce<{ els: ReturnType<typeof UiText>[]; cx: number }>(
        (acc, c, i) => {
          const w = c.length * 3.3 + 10;
          acc.els.push(
            <g key={i}>
              <rect x={acc.cx} y={y + 9} width={w} height={12} rx={6} fill={S.soft} stroke={S.rule} strokeWidth="0.7" {...hair} />
              <UiText x={acc.cx + w / 2} y={y + 17} size={5.4} anchor="middle" tone="ink2">
                {c}
              </UiText>
            </g>,
          );
          acc.cx += w + 4;
          return acc;
        },
        { els: [], cx: x + 26 },
      ).els}
      {["Effectiveness", "Efficiency", "Satisfaction"].map((h, i) => (
        <g key={h}>
          <rect x={cells[i]} y={y + 30} width={62} height={64} rx={5} fill={S.surface} stroke={S.rule} strokeWidth="0.7" {...hair} />
          <UiText x={cells[i] + 31} y={y + 42} size={5.4} weight={600} tone="ink2" anchor="middle">
            {h}
          </UiText>
        </g>
      ))}
      <Verdict x={cells[0] + 31} y={y + 60} ok={ok} r={8} />
      <UiText x={cells[0] + 31} y={y + 84} size={5.6} anchor="middle">
        {outcome}
      </UiText>
      {Array.from({ length: steps }, (_, k) => (
        <circle key={k} cx={cells[1] + 31 - ((steps - 1) * 6) / 2 + k * 6} cy={y + 60} r={2.2} fill={S.ink2} />
      ))}
      <UiText x={cells[1] + 31} y={y + 84} size={5.6} anchor="middle" mono>
        {`${steps} steps`}
      </UiText>
      {[1, 2, 3, 4, 5].map((k) => (
        <rect key={k} x={cells[2] + 8 + (k - 1) * 9.6} y={y + 55} width={7.4} height={10} rx={1.5} fill={k === rating ? S.ink : "none"} stroke={S.ink3} strokeWidth="0.7" {...hair} />
      ))}
      <UiText x={cells[2] + 31} y={y + 84} size={5.6} anchor="middle" mono>
        {`${rating} of 5`}
      </UiText>
    </g>
  );
}

export const usabilityPlate: IllustrationEntry = {
  slug: "usability",
  title: "Usability plate",
  canvas: "sheet",
  description:
    "One station ticket machine on the left, used in two contexts of use on the right, each inside its own dashed boundary. Context A: a daily commuter with no luggage taps Recent: Leeds return and pays; the goal is reached correctly (tick), in 2 steps, and they rate the experience 5 of 5. Context B: a first-time visitor in a hurry with luggage has to search for the station, type it, choose it, pick a ticket type and pay; they leave with the wrong ticket (cross), after 5 steps, and rate it 2 of 5. Each context is measured by the same three components, effectiveness, efficiency and satisfaction. Because the machine is the same and the outcomes differ, usability belongs to the interaction between these users, their goal and their context, not to the product alone. The step counts follow the routes drawn on the screen; the outcomes and ratings are illustrative.",
  Art: ({ detail }) => {
    const kx = 22;
    const ky = 46;
    return (
      <g>
        {/* the product: a ticket machine */}
        <rect x={kx} y={ky} width={126} height={208} rx={10} fill={S.soft} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        <rect x={kx + 10} y={ky + 12} width={106} height={130} rx={4} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.8" {...hair} />
        <UiText x={kx + 18} y={ky + 28} size={7.4} weight={700}>
          Buy a ticket
        </UiText>
        <rect x={kx + 18} y={ky + 36} width={90} height={18} rx={4} fill={S.accent} />
        <UiText x={kx + 63} y={ky + 47.6} size={6} weight={600} tone="surface" anchor="middle">
          Recent: Leeds return
        </UiText>
        {["Search station", "Ticket types", "Pay"].map((t, i) => (
          <g key={t}>
            <rect x={kx + 18} y={ky + 60 + i * 22} width={90} height={18} rx={4} fill={S.surface} stroke={S.control} strokeWidth="0.8" {...hair} />
            <UiText x={kx + 63} y={ky + 71.6 + i * 22} size={6} weight={600} tone="accent" anchor="middle">
              {t}
            </UiText>
          </g>
        ))}
        <rect x={kx + 38} y={ky + 156} width={50} height={6} rx={3} fill={S.sunken} stroke={S.ruleStrong} strokeWidth="0.7" {...hair} />
        <rect x={kx + 30} y={ky + 176} width={66} height={10} rx={2} fill={S.sunken} stroke={S.ruleStrong} strokeWidth="0.7" {...hair} />
        {/* the two routes on the same screen */}
        <circle cx={kx + 121} cy={ky + 45} r={5} fill={S.ink} />
        <text x={kx + 121} y={ky + 47.2} textAnchor="middle" fontSize={6} fontWeight={700} fill={S.surface}>A</text>
        <circle cx={kx + 121} cy={ky + 69} r={5} fill={S.ink} />
        <text x={kx + 121} y={ky + 71.2} textAnchor="middle" fontSize={6} fontWeight={700} fill={S.surface}>B</text>
        {/* same product, two contexts */}
        <path d={`M${kx + 126} ${ky + 80} H160 V94 H172 M160 ${ky + 80} V214 H172`} fill="none" stroke={S.ink3} strokeWidth="0.8" {...hair} />
        <ContextStrip y={42} tag="A" chips={["commuter", "daily", "no luggage"]} ok steps={2} rating={5} outcome="right ticket" />
        <ContextStrip y={162} tag="B" chips={["visitor", "first time", "luggage", "hurry"]} ok={false} steps={5} rating={2} outcome="wrong ticket" />
        <Note x={85} y={270} show={detail} anchor="middle">same product</Note>
        <Note x={279} y={282} show={detail} anchor="middle">context of use: users · goal · environment</Note>
        <Note x={279} y={30} show={detail} anchor="middle" tone="ink2">usable for whom, doing what, where?</Note>
      </g>
    );
  },
};

/* ---------------------------------------------------------------- */
/* User experience — before, during and after use, beyond the screen */
/* (checked against the entry: ISO 9241-210 — perceptions and         */
/*  responses from use or anticipated use, before, during and after;  */
/*  its own train example: booking, the ticket at the barrier and a   */
/*  refund that takes six weeks; UX design shapes the touchpoints,    */
/*  the experience happens in the person)                             */
/* ---------------------------------------------------------------- */
function Response({ cx, y, text, trend }: { cx: number; y: number; text: string; trend: "up" | "flat" | "down" }) {
  const c = trend === "up" ? S.ok : trend === "down" ? S.error : S.ink2;
  const w = 80;
  return (
    <g>
      <rect x={cx - w / 2} y={y} width={w} height={18} rx={9} fill={trend === "up" ? S.okWash : trend === "down" ? S.errorWash : S.soft} stroke={c} strokeWidth="0.8" {...hair} />
      {trend === "flat" ? (
        <path d={`M${cx - w / 2 + 9} ${y + 9} h7`} stroke={c} strokeWidth="1.3" {...hair} />
      ) : (
        <path d={trend === "up" ? `M${cx - w / 2 + 9} ${y + 12} l3.5 -6 l3.5 6` : `M${cx - w / 2 + 9} ${y + 6} l3.5 6 l3.5 -6`} fill="none" stroke={c} strokeWidth="1.3" {...hair} />
      )}
      <UiText x={cx + 6} y={y + 11.4} size={6} weight={600} anchor="middle" tone={trend === "up" ? "ok" : trend === "down" ? "error" : "ink2"}>
        {text}
      </UiText>
    </g>
  );
}

function Phone({ x, y, children }: { x: number; y: number; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={64} height={112} rx={9} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
      <rect x={24} y={5} width={16} height={3} rx={1.5} fill={S.rule} />
      {children}
    </g>
  );
}

export const userExperiencePlate: IllustrationEntry = {
  slug: "user-experience",
  title: "User experience plate",
  canvas: "sheet",
  description:
    "A train journey seen as one experience across four touchpoints, grouped before, during and after use. Before: an advert promises booking in two minutes, and the person expects it to be quick. During: on the phone they book the 08:42 to Leeds and pay, and feel confident when it says Booked; at the station the e-ticket opens the barrier, and it feels smooth. After: an email says the train was cancelled and the refund will take six weeks, and the person is frustrated. A dashed line separates the top row, the touchpoints a team can design, from the bottom row, the perceptions and responses that happen in the person and cannot be designed directly. A good booking form does not rescue the refund.",
  Art: ({ detail }) => {
    const top = 48;
    const zones: [number, number, string][] = [
      [16, 104, "Before"],
      [110, 290, "During"],
      [296, 386, "After"],
    ];
    const cxs = [60, 155, 245, 341];
    return (
      <g>
        {zones.map(([a, b, t]) => (
          <g key={t}>
            <rect x={a} y={top - 18} width={b - a} height={144} rx={7} fill={t === "During" ? S.soft : "none"} stroke={S.rule} strokeWidth="0.8" {...hair} />
            <UiText x={(a + b) / 2} y={top - 6} size={6.4} weight={700} tone="ink2" anchor="middle">
              {t}
            </UiText>
          </g>
        ))}
        {/* before: the promise that sets expectations */}
        <g transform={`translate(22 ${top + 8})`}>
          <rect width={76} height={92} rx={5} fill={S.accentWash} stroke={S.accent} strokeWidth="0.9" {...hair} />
          <UiText x={8} y={14} size={5} tone="ink3" mono>
            AD · RAIL APP
          </UiText>
          <UiText x={8} y={34} size={8.6} weight={700}>
            Book in
          </UiText>
          <UiText x={8} y={46} size={8.6} weight={700}>
            two minutes
          </UiText>
          <rect x={8} y={68} width={50} height={13} rx={6.5} fill={S.accent} />
          <UiText x={33} y={76.6} size={5.6} weight={600} tone="surface" anchor="middle">
            Get the app
          </UiText>
        </g>
        {/* during: booking on the phone */}
        <Phone x={123} y={top + 2}>
          <UiText x={8} y={24} size={6.6} weight={700}>
            Leeds · 08:42
          </UiText>
          <UiText x={8} y={34} size={5.4} tone="ink2">
            Return · £24.50
          </UiText>
          <rect x={8} y={44} width={48} height={14} rx={7} fill={S.accent} />
          <UiText x={32} y={53.4} size={6} weight={600} tone="surface" anchor="middle">
            Pay
          </UiText>
          <rect x={8} y={68} width={48} height={16} rx={3} fill={S.okWash} stroke={S.ok} strokeWidth="0.8" {...hair} />
          <path d="M13 76 l2 2 l4 -4.4" fill="none" stroke={S.ok} strokeWidth="1.1" {...hair} />
          <UiText x={23} y={78.4} size={5.6} weight={600}>
            Booked
          </UiText>
        </Phone>
        {/* during: the ticket at the barrier */}
        <Phone x={213} y={top + 2}>
          <UiText x={8} y={22} size={5.4} tone="ink2">
            Platform 4
          </UiText>
          <g transform="translate(13 30)">
            {Array.from({ length: 49 }, (_, k) => {
              const i = k % 7;
              const j = Math.floor(k / 7);
              const corner = (i < 2 && j < 2) || (i > 4 && j < 2) || (i < 2 && j > 4);
              return (corner || (k * 37) % 5 < 2) && <rect key={k} x={i * 5.4} y={j * 5.4} width={4.6} height={4.6} fill={S.ink} />;
            })}
          </g>
          <UiText x={32} y={88} size={5.4} weight={600} anchor="middle">
            Gate open
          </UiText>
          <path d="M18 98 h28" stroke={S.ok} strokeWidth="1.4" {...hair} />
        </Phone>
        {/* after: the refund */}
        <g transform={`translate(304 ${top + 8})`}>
          <rect width={76} height={92} rx={5} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
          <rect width={76} height={14} rx={5} fill={S.soft} />
          <UiText x={8} y={10} size={5} tone="ink3" mono>
            FROM: RAIL APP
          </UiText>
          <UiText x={8} y={30} size={6.8} weight={700} tone="error">
            Train cancelled
          </UiText>
          <UiText x={8} y={42} size={5.8}>
            Refund in 6 weeks
          </UiText>
          {[54, 62, 70].map((y, i) => (
            <rect key={y} x={8} y={y} width={[58, 50, 36][i]} height={3} rx={1.5} fill={S.rule} />
          ))}
        </g>
        {/* designed touchpoints | responses in the person */}
        <line x1={16} y1={192} x2={386} y2={192} stroke={S.ink3} strokeWidth="0.8" strokeDasharray="3 2.4" {...hair} />
        {cxs.map((cx) => (
          <line key={cx} x1={cx} y1={top + 116} x2={cx} y2={206} stroke={S.ink3} strokeWidth="0.7" {...hair} />
        ))}
        <Response cx={cxs[0]} y={206} text="expects: quick" trend="flat" />
        <Response cx={cxs[1]} y={206} text="confident" trend="up" />
        <Response cx={cxs[2]} y={206} text="smooth" trend="up" />
        <Response cx={cxs[3]} y={206} text="frustrated" trend="down" />
        <Note x={16} y={187} show={detail}>touchpoints a team designs</Note>
        <Note x={16} y={240} show={detail}>perceptions and responses, in the person</Note>
        <Note x={200} y={270} show={detail} anchor="middle" tone="ink2">a good booking form does not rescue the refund</Note>
      </g>
    );
  },
};

/* ---------------------------------------------------------------- */
/* Human-computer interaction — person, task, technology, context     */
/* (checked against the entry: every interaction involves a person,   */
/*  a task, the technology and the context, and changing one shifts   */
/*  the others — its own example is a touchscreen that works at a     */
/*  desk and is hard to use in a moving car; the interaction is the   */
/*  exchange of actions, feedback and interpretation; HCI studies     */
/*  people, designs technology and evaluates the fit)                 */
/* ---------------------------------------------------------------- */
function Facet({ x, y, kind, children, changed = false }: { x: number; y: number; kind: string; children?: ReactNode; changed?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={112} height={58} rx={7} fill={changed ? S.accentWash : S.surface} stroke={changed ? S.accent : S.ruleStrong} strokeWidth={changed ? 1.1 : 0.8} {...hair} />
      <UiText x={x + 9} y={y + 12} size={5} tone="ink3" mono>
        {kind}
      </UiText>
      <g transform={`translate(${x} ${y})`}>{children}</g>
    </g>
  );
}

function arc(cx: number, cy: number, r: number, a0: number, a1: number) {
  const p = (a: number) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  return { d: `M${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`, end: [x1, y1] as const, tan: a1 + Math.PI / 2 };
}

export const hciPlate: IllustrationEntry = {
  slug: "human-computer-interaction",
  title: "Human-computer interaction plate",
  canvas: "sheet",
  explorer: "hci-methods",
  description:
    "Four linked elements surround an interaction loop. Person: a driver with eyes on the road. Task: find a charger on the route. Technology: a touchscreen map with small targets. Context: a moving car, changed from a desk, which is crossed out. Every element is joined to every other. At the centre, the interaction is a loop: the person acts, the system responds, its feedback is perceived and interpreted, and the next action follows. Because the context changed, two links are highlighted: the moving car means the driver can only glance, and it makes the small targets hard to hit, even though the screen itself did not change. Along the bottom, the discipline's three strands form a cycle: study people, design technology, evaluate the fit.",
  Art: ({ detail }) => {
    const cx = 200;
    const cy = 124;
    const R = 34;
    const segs = [0, 1, 2, 3].map((k) => arc(cx, cy, R, -Math.PI / 2 + k * (Math.PI / 2) + 0.28, -Math.PI / 2 + (k + 1) * (Math.PI / 2) - 0.28));
    const P = { person: [74, 50], task: [326, 50], context: [74, 198], tech: [326, 198] } as const;
    return (
      <g>
        {/* every element links to every other */}
        {(
          [
            [P.person, P.task],
            [P.person, P.tech],
            [P.task, P.context],
            [P.task, P.tech],
          ] as const
        ).map(([a, b], i) => (
          <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={S.ruleStrong} strokeWidth="0.8" {...hair} />
        ))}
        {/* the links the changed context shifts */}
        <line x1={P.context[0]} y1={P.context[1]} x2={P.person[0]} y2={P.person[1]} stroke={S.accent} strokeWidth="1.3" {...hair} />
        <line x1={P.context[0]} y1={P.context[1]} x2={P.tech[0]} y2={P.tech[1]} stroke={S.accent} strokeWidth="1.3" {...hair} />
        <rect x={40} y={112} width={68} height={24} rx={4} fill={S.surface} stroke={S.accent} strokeWidth="0.7" {...hair} />
        <UiText x={74} y={122} size={5.4} weight={600} tone="accent" anchor="middle">
          can only glance
        </UiText>
        <UiText x={74} y={130.6} size={5} tone="ink2" anchor="middle">
          at the screen
        </UiText>
        <rect x={152} y={190} width={96} height={16} rx={4} fill={S.surface} stroke={S.accent} strokeWidth="0.7" {...hair} />
        <UiText x={200} y={200.4} size={5.4} weight={600} tone="accent" anchor="middle">
          small targets hard to hit
        </UiText>

        {/* the interaction loop */}
        <circle cx={cx} cy={cy} r={R + 14} fill={S.soft} stroke={S.rule} strokeWidth="0.8" {...hair} />
        {segs.map((s, k) => {
          const [ex, ey] = s.end;
          const a = s.tan;
          const h = 3.4;
          return (
            <g key={k}>
              <path d={s.d} fill="none" stroke={S.ink2} strokeWidth="1" {...hair} />
              <polygon points={`${ex + Math.cos(a) * h},${ey + Math.sin(a) * h} ${ex - Math.cos(a) * h * 0.4 + Math.cos(a - Math.PI / 2) * h},${ey - Math.sin(a) * h * 0.4 + Math.sin(a - Math.PI / 2) * h} ${ex - Math.cos(a) * h * 0.4 - Math.cos(a - Math.PI / 2) * h},${ey - Math.sin(a) * h * 0.4 - Math.sin(a - Math.PI / 2) * h}`} fill={S.ink2} />
            </g>
          );
        })}
        {(
          [
            [cx, cy - R + 3, "act"],
            [cx + R + 4, cy + 2, "respond"],
            [cx, cy + R + 1, "feedback"],
            [cx - R - 5, cy + 2, "interpret"],
          ] as const
        ).map(([x, y, t]) => (
          <g key={t}>
            <rect x={x - t.length * 1.75 - 3} y={y - 6} width={t.length * 3.5 + 6} height={9} rx={4.5} fill={S.surface} stroke={S.rule} strokeWidth="0.6" {...hair} />
            <UiText x={x} y={y + 0.8} size={5.4} anchor="middle" tone="ink" mono>
              {t}
            </UiText>
          </g>
        ))}
        <UiText x={cx} y={cy + 2.2} size={5.8} weight={700} anchor="middle">
          interaction
        </UiText>

        {/* the four elements */}
        <Facet x={18} y={22} kind="PERSON">
          <UiText x={9} y={30} size={7.4} weight={700}>
            Driver
          </UiText>
          <UiText x={9} y={42} size={5.6} tone="ink2">
            eyes on the road
          </UiText>
        </Facet>
        <Facet x={270} y={22} kind="TASK">
          <UiText x={9} y={30} size={7.4} weight={700}>
            Find a charger
          </UiText>
          <UiText x={9} y={42} size={5.6} tone="ink2">
            on the route
          </UiText>
        </Facet>
        <Facet x={18} y={170} kind="CONTEXT" changed>
          <UiText x={9} y={30} size={7.4} weight={700}>
            Moving car
          </UiText>
          <UiText x={9} y={42} size={5.6} tone="ink3">
            Desk
          </UiText>
          <line x1={8} y1={40} x2={24} y2={40} stroke={S.ink3} strokeWidth="0.8" {...hair} />
          <rect x={70} y={6} width={34} height={10} rx={5} fill={S.accent} />
          <UiText x={87} y={12.8} size={5} weight={600} tone="surface" anchor="middle">
            changed
          </UiText>
        </Facet>
        <Facet x={270} y={170} kind="TECHNOLOGY">
          <rect x={9} y={18} width={54} height={34} rx={3} fill={S.sunken} stroke={S.ruleStrong} strokeWidth="0.7" {...hair} />
          <path d="M12 44 C 24 30, 36 46, 60 24" fill="none" stroke={S.ruleStrong} strokeWidth="1.6" {...hair} />
          {[
            [18, 26],
            [30, 40],
            [44, 30],
            [54, 44],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={1.8} fill={S.accent} />
          ))}
          <UiText x={68} y={30} size={6} weight={600}>
            Touch
          </UiText>
          <UiText x={68} y={39} size={6} weight={600}>
            map
          </UiText>
        </Facet>

        {/* the discipline's three strands */}
        {(
          [
            [60, "study people"],
            [200, "design technology"],
            [340, "evaluate the fit"],
          ] as const
        ).map(([x, t], i) => (
          <g key={t}>
            <rect x={x - 52} y={246} width={104} height={16} rx={8} fill={S.soft} stroke={S.rule} strokeWidth="0.8" {...hair} />
            <UiText x={x} y={256.4} size={6} weight={600} tone="ink2" anchor="middle">
              {t}
            </UiText>
            {i < 2 && <Arrow x1={x + 54} y1={254} x2={x + 86} y2={254} tone="mute" head={3} />}
          </g>
        ))}
        <path d="M340 263 Q 340 280 200 280 Q 60 280 60 263" fill="none" stroke={S.ink3} strokeWidth="0.8" strokeDasharray="2.4 2" {...hair} />
        <polygon points="57,266 63,266 60,262" fill={S.ink3} />
        <Note x={200} y={238} show={detail} anchor="middle" tone="ink2">change one element and the others shift</Note>
      </g>
    );
  },
};

/* ---------------------------------------------------------------- */
/* WCAG 2.2 — principles, guidelines, success criteria, levels       */
/* (checked against the entry and W3C numbering: four principles     */
/*  hold 13 guidelines (1.1–1.4, 2.1–2.5, 3.1–3.3, 4.1); guidelines   */
/*  are not testable, success criteria are and carry a level;        */
/*  1.4.3 Contrast (Minimum) AA, 1.4.6 Contrast (Enhanced) AAA,       */
/*  1.4.11 Non-text Contrast AA, 2.1.1 Keyboard A, 2.5.8 Target Size  */
/*  (Minimum) AA; AA means every A and AA criterion; Understanding    */
/*  and Techniques are non-normative)                                 */
/* ---------------------------------------------------------------- */
function Level({ x, y, l }: { x: number; y: number; l: "A" | "AA" | "AAA" }) {
  const w = l.length * 4.2 + 6;
  return (
    <g>
      <rect x={x - w} y={y - 5} width={w} height={10} rx={2} fill={l === "AA" ? S.accent : l === "A" ? S.ink : S.surface} stroke={l === "AAA" ? S.ink2 : "none"} strokeWidth="0.7" {...hair} />
      <UiText x={x - w / 2} y={y + 2.2} size={5.6} weight={700} tone={l === "AAA" ? "ink" : "surface"} anchor="middle" mono>
        {l}
      </UiText>
    </g>
  );
}

export const wcagPlate: IllustrationEntry = {
  slug: "wcag",
  title: "WCAG plate",
  canvas: "sheet",
  description:
    "WCAG 2.2 drawn as a hierarchy that reads left to right. Four principles: 1 Perceivable, 2 Operable, 3 Understandable and 4 Robust. Under them sit 13 guidelines, which are not testable themselves; two principles are opened. Under 1 Perceivable, guideline 1.4 Distinguishable leads to three testable success criteria: 1.4.3 Contrast (Minimum) at level AA, 1.4.6 Contrast (Enhanced) at AAA and 1.4.11 Non-text Contrast at AA. Under 2 Operable, guideline 2.1 Keyboard Accessible leads to 2.1.1 Keyboard at level A, and 2.5 Input Modalities to 2.5.8 Target Size (Minimum) at AA. The other guidelines are shown collapsed by number range. On the right, the conformance levels nest: A inside AA inside AAA, with AA, meaning every A and AA criterion, marked as the usual target. A dashed card linked to 1.4.3 stands for the non-normative Understanding and Techniques documents that explain how to meet a criterion.",
  Art: ({ detail }) => {
    const col = [16, 98, 196, 326];
    const principle = (y: number, h: number, n: string, name: string, open: boolean, sub?: string) => (
      <g>
        <rect x={col[0]} y={y} width={70} height={h} rx={6} fill={open ? S.soft : S.surface} stroke={open ? S.ink2 : S.rule} strokeWidth="0.8" {...hair} />
        <UiText x={col[0] + 8} y={y + 13} size={8} weight={700} mono>
          {n}
        </UiText>
        <UiText x={col[0] + 18} y={y + 13} size={5.8} weight={600}>
          {name}
        </UiText>
        {sub && (
          <UiText x={col[0] + 8} y={y + h - 6} size={5} tone="ink3" mono>
            {sub}
          </UiText>
        )}
      </g>
    );
    const guide = (y: number, h: number, n: string, name?: string) => (
      <g>
        <rect x={col[1]} y={y} width={86} height={h} rx={4} fill={name ? S.surface : "none"} stroke={name ? S.ink2 : S.ruleStrong} strokeWidth="0.8" strokeDasharray={name ? undefined : "2 1.8"} {...hair} />
        <UiText x={col[1] + 6} y={y + (name ? 9.6 : h / 2 + 2)} size={5.6} weight={600} tone={name ? "ink" : "ink3"} mono>
          {n}
        </UiText>
        {name && (
          <UiText x={col[1] + 6} y={y + 18} size={5.6} tone="ink2">
            {name}
          </UiText>
        )}
      </g>
    );
    const sc = (y: number, n: string, name: string, l: "A" | "AA" | "AAA") => (
      <g>
        <rect x={col[2]} y={y} width={118} height={20} rx={4} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.8" {...hair} />
        <rect x={col[2] + 6} y={y + 6} width={8} height={8} rx={1.5} fill="none" stroke={S.ink2} strokeWidth="0.8" {...hair} />
        <path d={`M${col[2] + 7.6} ${y + 10} l1.8 1.8 l3.2 -3.6`} fill="none" stroke={S.ok} strokeWidth="1" {...hair} />
        <UiText x={col[2] + 18} y={y + 8.6} size={5.4} weight={700} mono>
          {n}
        </UiText>
        <UiText x={col[2] + 18} y={y + 16} size={5.2} tone="ink2">
          {name}
        </UiText>
        <Level x={col[2] + 114} y={y + 10} l={l} />
      </g>
    );
    const link = (x1: number, y1: number, x2: number, y2: number) => <path d={`M${x1} ${y1} H${(x1 + x2) / 2} V${y2} H${x2}`} fill="none" stroke={S.ink3} strokeWidth="0.8" {...hair} />;
    return (
      <g>
        {["PRINCIPLES", "GUIDELINES", "SUCCESS CRITERIA", "LEVELS"].map((t, i) => (
          <UiText key={t} x={col[i]} y={26} size={5.2} tone="ink3" mono>
            {t}
          </UiText>
        ))}
        {/* links */}
        {link(86, 84, 98, 44)}
        {link(86, 84, 98, 84)}
        {link(184, 84, 196, 46)}
        {link(184, 84, 196, 72)}
        {link(184, 84, 196, 98)}
        {link(86, 172, 98, 141)}
        {link(86, 172, 98, 165)}
        {link(86, 172, 98, 189)}
        {link(184, 141, 196, 141)}
        {link(184, 189, 196, 189)}
        {link(86, 226, 98, 226)}
        {link(86, 256, 98, 256)}
        {/* principles */}
        {principle(36, 96, "1", "Perceivable", true, "4 guidelines")}
        {principle(138, 70, "2", "Operable", true, "5 guidelines")}
        {principle(214, 26, "3", "Understandable", false)}
        {principle(244, 26, "4", "Robust", false)}
        {/* guidelines */}
        {guide(37, 14, "1.1 – 1.3")}
        {guide(72, 24, "1.4", "Distinguishable")}
        {guide(130, 22, "2.1", "Keyboard Accessible")}
        {guide(158, 14, "2.2 – 2.4")}
        {guide(178, 22, "2.5", "Input Modalities")}
        {guide(219, 14, "3.1 – 3.3")}
        {guide(249, 14, "4.1")}
        {/* testable success criteria with levels */}
        {sc(36, "1.4.3", "Contrast (Minimum)", "AA")}
        {sc(62, "1.4.6", "Contrast (Enhanced)", "AAA")}
        {sc(88, "1.4.11", "Non-text Contrast", "AA")}
        {sc(131, "2.1.1", "Keyboard", "A")}
        {sc(179, "2.5.8", "Target Size (Minimum)", "AA")}
        {/* conformance levels nest */}
        <rect x={col[3]} y={36} width={60} height={92} rx={6} fill={S.surface} stroke={S.ink2} strokeWidth="0.8" {...hair} />
        <rect x={col[3] + 6} y={52} width={48} height={70} rx={5} fill={S.accentWash} stroke={S.accent} strokeWidth="1.2" {...hair} />
        <rect x={col[3] + 12} y={68} width={36} height={48} rx={4} fill={S.surface} stroke={S.ink} strokeWidth="0.8" {...hair} />
        <UiText x={col[3] + 30} y={46.4} size={5.6} weight={700} anchor="middle" mono>
          AAA
        </UiText>
        <UiText x={col[3] + 30} y={62.4} size={5.6} weight={700} tone="accent" anchor="middle" mono>
          AA
        </UiText>
        <UiText x={col[3] + 30} y={94} size={5.6} weight={700} anchor="middle" mono>
          A
        </UiText>
        <rect x={col[3] + 4} y={134} width={52} height={12} rx={6} fill={S.accent} />
        <UiText x={col[3] + 30} y={142} size={5.4} weight={600} tone="surface" anchor="middle">
          usual target
        </UiText>
        {/* non-normative support */}
        <path d={`M${col[2] + 118} 42 H320 V182 H${col[3]}`} fill="none" stroke={S.ink3} strokeWidth="0.8" strokeDasharray="2 1.8" {...hair} />
        <rect x={col[3]} y={160} width={60} height={44} rx={5} fill="none" stroke={S.ink3} strokeWidth="0.8" strokeDasharray="2 1.8" {...hair} />
        <UiText x={col[3] + 6} y={172} size={5.6} weight={700}>
          Techniques
        </UiText>
        <UiText x={col[3] + 6} y={182} size={5} tone="ink2">
          how to meet it
        </UiText>
        <UiText x={col[3] + 6} y={196} size={4.8} tone="ink3" mono>
          non-normative
        </UiText>
        <Note x={col[3] + 30} y={226} show={detail} anchor="middle">AA = every</Note>
        <Note x={col[3] + 30} y={236} show={detail} anchor="middle">A + AA</Note>
        <Note x={200} y={290} show={detail} anchor="middle" tone="ink2">principle → guideline → testable criterion → level</Note>
      </g>
    );
  },
};
