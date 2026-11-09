/**
 * Replacement plates for the foundations audit (D-093), recomposed for the
 * text standard (D-101): every SVG text ≥ 13 units; non-essential interface
 * copy is drawn as text bars; the hero adds numbered markers whose
 * explanations are the plate's HTML `key`. Built from ../system/sheet on the
 * instructional canvas. Every label is checked against its entry.
 */
import type { ReactNode } from "react";
import type { IllustrationEntry } from "../illustration-types";
import { Marker, S, T, TextBar, UiButton, UiFrame, UiText, Verdict } from "../system/sheet";

const hair = { vectorEffect: "non-scaling-stroke" as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/** A labelled node in a model diagram (26 high, label 13). */
function Node({ cx, cy, w = 100, label, tone = "ink", ghost = false }: { cx: number; cy: number; w?: number; label?: string; tone?: "ink" | "accent" | "error"; ghost?: boolean }) {
  const stroke = ghost ? S.ink3 : tone === "accent" ? S.accent : tone === "error" ? S.error : S.ink2;
  const fill = ghost ? "none" : tone === "accent" ? S.accentWash : tone === "error" ? S.errorWash : S.surface;
  return (
    <g>
      <rect x={cx - w / 2} y={cy - 13} width={w} height={26} rx={13} fill={fill} stroke={stroke} strokeWidth={ghost ? 0.9 : 1.1} strokeDasharray={ghost ? "2.4 2.2" : undefined} {...hair} />
      {label && (
        <UiText x={cx} y={cy + 4.6} weight={600} anchor="middle" tone={tone === "error" ? "error" : tone === "accent" ? "accent" : "ink"}>
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
      <line x1={x1} y1={y1} x2={x2 - Math.cos(a) * head} y2={y2 - Math.sin(a) * head} stroke={c} strokeWidth="1.1" strokeDasharray={dashed ? "2.6 2.2" : undefined} {...hair} />
      <polygon points={`${x2},${y2} ${l[0]},${l[1]} ${r[0]},${r[1]}`} fill={c} />
    </g>
  );
}

/** A small text label on a connector, with a background so lines never cross the text. */
function Pill({ cx, cy, text, tone = "ink3", mono = true }: { cx: number; cy: number; text: string; tone?: "ink3" | "error" | "accent"; mono?: boolean }) {
  const w = text.length * (mono ? 7.9 : 7.2) + 12;
  return (
    <g>
      <rect x={cx - w / 2} y={cy - 10} width={w} height={20} rx={10} fill={tone === "error" ? S.errorWash : S.surface} stroke={tone === "error" ? S.error : S.rule} strokeWidth="0.8" {...hair} />
      <UiText x={cx} y={cy + 4.5} anchor="middle" mono={mono} tone={tone === "ink3" ? "ink2" : tone}>
        {text}
      </UiText>
    </g>
  );
}

function Panel({ x, y, w, h, children, dashed = false }: { x: number; y: number; w: number; h: number; children?: ReactNode; dashed?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={dashed ? "none" : S.soft} stroke={dashed ? S.ink3 : S.rule} strokeWidth="0.9" strokeDasharray={dashed ? "3.4 2.6" : undefined} {...hair} />
      {children}
    </g>
  );
}

/* ---------------------------------------------------------------- */
/* Mental models — conceptual model, system image, user's model      */
/* (Norman's three models; the designer communicates only through    */
/*  the system image; the entry's autosaving-editor example)          */
/* ---------------------------------------------------------------- */
export const mentalModelsPlate: IllustrationEntry = {
  slug: "mental-models",
  title: "Mental models plate",
  canvas: "sheet",
  description:
    "Three panels joined by arrows, using an autosaving notes editor as the example. On the left, the designer's conceptual model is complete: an edit is saved automatically to a cloud copy, which syncs to the phone. In the middle, the system image is the editor itself: a document titled Trip notes with a toolbar, and an empty space where a saved-state message could be but is not. On the right, the user's mental model, formed only from that screen, has one wrong link and missing parts: it says an edit needs Save and is stored on this laptop, and the cloud copy and phone are missing, shown as an empty dashed node. Arrows run from the conceptual model to the system image and from the system image to the user's model; a dashed arc straight from designer to user is crossed out, because designers cannot hand their model to users directly.",
  key: [
    { n: "1", label: "Conceptual model", detail: "the designer's: every edit is saved to the cloud copy and synced" },
    { n: "2", label: "System image", detail: "the editor; it never shows whether work is saved" },
    { n: "3", label: "User's mental model", detail: "built from the screen alone: one wrong link and missing parts" },
    { n: "4", label: "No direct channel", detail: "designers cannot hand their model to users" },
  ],
  Art: ({ detail }) => {
    const ys = [110, 180, 250];
    return (
      <g>
        <path d="M67 74 Q 200 -6 333 74" fill="none" stroke={S.ink3} strokeWidth="1" strokeDasharray="3.4 2.8" {...hair} />
        <Verdict x={200} y={34} ok={false} r={11} />
        {/* conceptual model */}
        <Panel x={8} y={74} w={118} h={212}>
          <Node cx={67} cy={ys[0]} label="Edit" />
          <Arrow x1={67} y1={ys[0] + 13} x2={67} y2={ys[1] - 14} />
          <Pill cx={67} cy={(ys[0] + ys[1]) / 2} text="auto" />
          <Node cx={67} cy={ys[1]} label="Cloud copy" tone="accent" />
          <Arrow x1={67} y1={ys[1] + 13} x2={67} y2={ys[2] - 14} />
          <Pill cx={67} cy={(ys[1] + ys[2]) / 2} text="sync" />
          <Node cx={67} cy={ys[2]} label="Phone" />
        </Panel>
        {/* system image */}
        <UiFrame x={141} y={74} w={118} h={212}>
          <rect x={0} y={0} width={118} height={28} fill={S.soft} />
          <UiText x={10} y={19} weight={700}>
            B
          </UiText>
          <UiText x={26} y={19} tone="ink2">
            I
          </UiText>
          <rect x={64} y={6} width={46} height={16} rx={3} fill="none" stroke={S.error} strokeWidth="1" strokeDasharray="2.4 2" {...hair} />
          <UiText x={10} y={56} size={T.strong} weight={700}>
            Trip notes
          </UiText>
          {[70, 82, 94, 112, 124].map((y, i) => (
            <TextBar key={y} x={10} y={y} w={[96, 84, 60, 92, 70][i]} />
          ))}
          <UiText x={10} y={160}>
            Ferry 07:40
          </UiText>
          <rect x={90} y={149} width={1.2} height={14} fill={S.accent} />
        </UiFrame>
        {/* user's mental model */}
        <Panel x={274} y={74} w={118} h={212}>
          <Node cx={333} cy={ys[0]} label="Edit" />
          <Arrow x1={333} y1={ys[0] + 13} x2={333} y2={ys[1] - 14} tone="error" dashed />
          <Pill cx={333} cy={(ys[0] + ys[1]) / 2} text="needs Save" tone="error" />
          <Node cx={333} cy={ys[1]} label="This laptop" tone="error" />
          <Node cx={333} cy={ys[2]} ghost />
          <UiText x={333} y={ys[2] + 5} anchor="middle" tone="ink3" weight={700}>
            ?
          </UiText>
        </Panel>
        <Arrow x1={127} y1={180} x2={140} y2={180} tone="accent" head={3.4} />
        <Arrow x1={260} y1={180} x2={273} y2={180} tone="accent" head={3.4} />
        {detail && (
          <>
            <Marker x={22} y={88} n={1} />
            <Marker x={154} y={62} n={2} />
            <Marker x={378} y={88} n={3} />
            <Marker x={228} y={34} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ---------------------------------------------------------------- */
/* Affordances — possible versus perceived (Gaver, 1991)             */
/* ---------------------------------------------------------------- */
export const affordancesPlate: IllustrationEntry = {
  slug: "affordances",
  title: "Affordances plate",
  canvas: "sheet",
  description:
    "A phone inbox beside a two-by-two grid that sorts what can be done against what can be seen (Gaver's classification). 1, perceptible affordance: an Archive button on the first message, possible and visible. 2, hidden affordance: the second message can be swiped left to reveal Delete, but nothing on screen shows it; the swipe and the revealed action are drawn dashed. 3, false affordance: the section heading Promotions is coloured and underlined like a link but does nothing. In the grid, columns are perceived (tick) and not perceived (cross), rows are possible (tick) and not possible (cross); 1 sits in possible and perceived, 2 in possible but not perceived, 3 in perceived but not possible, and the fourth cell, neither, is empty.",
  key: [
    { n: "1", label: "Perceptible affordance", detail: "Archive: possible and visible" },
    { n: "2", label: "Hidden affordance", detail: "swipe left to delete: possible, but nothing shows it" },
    { n: "3", label: "False affordance", detail: "Promotions looks like a link but does nothing" },
    { n: "4", label: "The grid", detail: "columns: perceived ✓ or not ✗; rows: possible ✓ or not ✗" },
  ],
  Art: ({ detail }) => {
    const ox = 8;
    const oy = 42; // frame content origin (frame y 20 + bar 22)
    const row = (i: number) => 42 + i * 48;
    const cols = [244, 310];
    const rows = [96, 164];
    const cw = 66;
    const rh = 68;
    const cell = (ci: number, ri: number): [number, number] => [cols[ci] + cw / 2, rows[ri] + rh / 2];
    return (
      <g>
        <UiFrame x={ox} y={20} w={200} h={268}>
          <UiText x={14} y={28} size={T.strong} weight={700}>
            Inbox
          </UiText>
          {["Ana Ruiz", "Port office", "Library"].map((s, i) => (
            <g key={s}>
              <line x1={0} y1={row(i)} x2={200} y2={row(i)} stroke={S.rule} strokeWidth="0.8" {...hair} />
              <UiText x={14} y={row(i) + 21} weight={600}>
                {s}
              </UiText>
              <TextBar x={14} y={row(i) + 30} w={[80, 60, 86][i]} />
            </g>
          ))}
          <line x1={0} y1={row(3)} x2={200} y2={row(3)} stroke={S.rule} strokeWidth="0.8" {...hair} />
          <UiButton x={110} y={row(0) + 11} w={78} h={26} label="Archive" variant="secondary" />
          <rect x={128} y={row(1) + 4} width={64} height={40} rx={4} fill="none" stroke={S.ink3} strokeWidth="0.9" strokeDasharray="2.4 2" {...hair} />
          <UiText x={160} y={row(1) + 28} anchor="middle" tone="ink3">
            Delete
          </UiText>
          <Arrow x1={120} y1={row(1) + 40} x2={88} y2={row(1) + 40} tone="mute" dashed head={3} />
          <UiText x={14} y={row(3) + 28} weight={600} tone="accent">
            Promotions
          </UiText>
          <rect x={14} y={row(3) + 32} width={82} height={1.4} fill={S.accent} />
          <TextBar x={14} y={row(3) + 48} w={120} />
        </UiFrame>
        {/* numbered leaders from the interface */}
        {(
          [
            [1, ox + 188, oy + row(0) + 24],
            [2, ox + 192, oy + row(1) + 24],
            [3, ox + 98, oy + row(3) + 24],
          ] as const
        ).map(([n, x, y]) => (
          <Marker key={n} x={226} y={y} n={n} to={[x, y]} />
        ))}
        {/* the grid */}
        {rows.map((y, ri) => cols.map((x, ci) => <rect key={`${ri}${ci}`} x={x} y={y} width={cw} height={rh} fill={ri === 0 && ci === 0 ? S.okWash : S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />))}
        <Verdict x={cols[0] + cw / 2} y={rows[0] - 16} ok />
        <Verdict x={cols[1] + cw / 2} y={rows[0] - 16} ok={false} />
        <Verdict x={cols[1] + cw + 13} y={rows[0] + rh / 2} ok r={8} />
        <Verdict x={cols[1] + cw + 13} y={rows[1] + rh / 2} ok={false} r={8} />
        <Marker x={cell(0, 0)[0]} y={cell(0, 0)[1]} n={1} />
        <Marker x={cell(1, 0)[0]} y={cell(1, 0)[1]} n={2} />
        <Marker x={cell(0, 1)[0]} y={cell(0, 1)[1]} n={3} />
        <UiText x={cell(1, 1)[0]} y={cell(1, 1)[1] + 5} size={T.strong} anchor="middle" tone="ink3">
          —
        </UiText>
        {detail && <Marker x={226} y={rows[0] - 16} n={4} tone="accent" />}
      </g>
    );
  },
};

/* ---------------------------------------------------------------- */
/* Signifiers — the same control with and without cues               */
/* ---------------------------------------------------------------- */
function ReportScreen({ x, cues }: { x: number; cues: boolean }) {
  return (
    <UiFrame x={x} y={38} w={188} h={224}>
      <UiText x={12} y={28} size={T.strong} weight={700}>
        Reports
      </UiText>
      <UiText x={12} y={52} weight={600}>
        March report
      </UiText>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <line x1={12} y1={66 + i * 18} x2={176} y2={66 + i * 18} stroke={S.rule} strokeWidth="0.7" {...hair} />
          <TextBar x={12} y={72 + i * 18} w={[50, 42, 58, 36][i]} />
          <TextBar x={136} y={72 + i * 18} w={40} />
        </g>
      ))}
      <rect x={60} y={150} width={120} height={36} rx={5} fill="none" stroke={S.ink3} strokeWidth="0.8" strokeDasharray="2 2" {...hair} />
      {cues ? (
        <g>
          <rect x={66} y={155} width={108} height={26} rx={6} fill={S.accentWash} stroke={S.accent} strokeWidth="1.3" {...hair} />
          <path d="M80 161 v9 m-3.8 -3.8 l3.8 3.8 l3.8 -3.8 M75 175 h10" fill="none" stroke={S.accentInk} strokeWidth="1.3" {...hair} />
          <UiText x={132} y={172.5} weight={600} tone="accent" anchor="middle">
            Export CSV
          </UiText>
        </g>
      ) : (
        <UiText x={72} y={173} tone="ink2">
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
  key: [
    { n: "1", label: "Shape", detail: "a filled, bordered button" },
    { n: "2", label: "Icon", detail: "download: a learned convention" },
    { n: "3", label: "Label", detail: "names the result: Export CSV" },
    { n: "4", label: "Hover and cursor", detail: "the state changes as the pointer approaches" },
    { n: "5", label: "Same hit area", detail: "the affordance is identical; the left version has no cue" },
  ],
  Art: ({ detail }) => {
    const ox = 204;
    const base = 38 + 22; // frame content origin y
    return (
      <g>
        <ReportScreen x={8} cues={false} />
        <ReportScreen x={ox} cues />
        <Pointer2 x={ox + 166} y={base + 168} />
        <Verdict x={102} y={20} ok={false} />
        <Verdict x={298} y={20} ok />
        {detail && (
          <>
            <Marker x={ox + 46} y={base + 168} n={1} to={[ox + 66, base + 168]} />
            <Marker x={ox + 80} y={286} n={2} to={[ox + 80, base + 182]} />
            <Marker x={ox + 130} y={286} n={3} to={[ox + 130, base + 182]} />
            <Marker x={ox + 172} y={286} n={4} to={[ox + 172, base + 186]} />
            <Marker x={44} y={base + 168} n={5} to={[68, base + 168]} />
          </>
        )}
      </g>
    );
  },
};

function Pointer2({ x, y }: { x: number; y: number }) {
  const pts: [number, number][] = [[0, 0], [0, 14], [3.7, 10.7], [6.5, 16.3], [8.8, 15.1], [6, 9.8], [10.9, 9.8]];
  return <path d={pts.map(([a, b], i) => `${i ? "L" : "M"}${x + a} ${y + b}`).join(" ") + " Z"} fill={S.ink} stroke={S.surface} strokeWidth="0.9" strokeLinejoin="round" />;
}

/* ---------------------------------------------------------------- */
/* Usability testing — task, observed behaviour, record, findings    */
/* (illustrative session; no frequencies)                             */
/* ---------------------------------------------------------------- */
function Obs({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={10} fill={S.accent} stroke={S.surface} strokeWidth="1.4" {...hair} />
      <text x={x} y={y + 4.6} textAnchor="middle" fontSize={T.min} fontWeight={700} fill={S.surface} fontFamily="var(--font-plex-sans), ui-sans-serif, system-ui, sans-serif">
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
    "An illustrative moderated session, read from the task to the findings. A task card asks: find a train to Leeds arriving before 10:00. Below it, the interface under test lists three trains from Manchester to Leeds with a filter that offers only a departure time. Three numbered observations are marked on it: 1, the participant hesitates at the departure filter; 2, thinking aloud, they ask whether a time is when the train leaves or arrives; 3, they choose the 08:42 train, arriving 09:41, and succeed. A session record on the right places these on a timeline, with the hesitation as a shaded span and the time on task measured at 1:32. Beneath it, findings are synthesised from the observations and rated by severity with one to three bars: the filter offers departure time only (high); times are misread as departures (medium); and what worked, comparing results was easy.",
  key: [
    { n: "1", label: "Hesitation", detail: "at the departure-only filter" },
    { n: "2", label: "Thinking aloud", detail: "asks whether times are departures or arrivals" },
    { n: "3", label: "Success", detail: "chooses 08:42, arriving 09:41; time on task 1:32" },
    { n: "4", label: "Findings", detail: "synthesised from observations, rated by severity after all sessions (bars: high, medium; tick: what worked)" },
  ],
  Art: ({ detail }) => {
    const t0 = 232;
    const ts = (s: number) => t0 + s * 1.48;
    const fy = 52 + 22; // frame content origin y
    return (
      <g>
        <rect x={8} y={8} width={384} height={32} rx={6} fill={S.soft} stroke={S.rule} strokeWidth="0.9" {...hair} />
        <UiText x={18} y={29} tone="ink3" mono>
          TASK
        </UiText>
        <UiText x={62} y={29} weight={600}>
          Find a train to Leeds arriving before 10:00
        </UiText>
        {/* interface under test */}
        <UiFrame x={8} y={52} w={196} h={238}>
          <UiText x={10} y={20} weight={700}>
            Manchester → Leeds
          </UiText>
          <rect x={10} y={30} width={124} height={24} rx={5} fill={S.surface} stroke={S.control} strokeWidth="0.8" {...hair} />
          <UiText x={18} y={46.5}>
            Depart after ▾
          </UiText>
          <ellipse cx={72} cy={42} rx={70} ry={18} fill="none" stroke={S.accent} strokeWidth="1" strokeDasharray="1.8 2" {...hair} />
          {[
            ["08:12 → 09:05", false],
            ["08:42 → 09:41", true],
            ["09:12 → 10:05", false],
          ].map(([t, ok], i) => (
            <g key={t as string}>
              <rect x={10} y={70 + i * 36} width={176} height={30} rx={5} fill={ok ? S.okWash : S.surface} stroke={ok ? S.ok : S.rule} strokeWidth={ok ? 1.1 : 0.8} {...hair} />
              <UiText x={20} y={90 + i * 36} weight={600} mono>
                {t as string}
              </UiText>
            </g>
          ))}
          <rect x={10} y={182} width={176} height={32} rx={8} fill={S.surface} stroke={S.ink2} strokeWidth="0.9" {...hair} />
          <UiText x={98} y={203} anchor="middle">
            “Leaves or arrives?”
          </UiText>
        </UiFrame>
        <Obs x={166} y={fy + 42} n={1} />
        <Obs x={192} y={fy + 198} n={2} />
        <Verdict x={178} y={fy + 121} ok r={8} />
        <Obs x={196} y={fy + 106} n={3} />
        {/* session record */}
        <rect x={216} y={52} width={176} height={118} rx={6} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        <UiText x={226} y={72} weight={600}>
          Session · task 2
        </UiText>
        <line x1={t0} y1={112} x2={ts(100)} y2={112} stroke={S.ink3} strokeWidth="0.9" {...hair} />
        {[0, 60].map((s) => (
          <g key={s}>
            <line x1={ts(s)} y1={108} x2={ts(s)} y2={116} stroke={S.ink3} strokeWidth="0.8" {...hair} />
            <UiText x={ts(s)} y={132} tone="ink3" anchor={s ? "middle" : "start"} mono>
              {`${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`}
            </UiText>
          </g>
        ))}
        <rect x={ts(15)} y={106} width={ts(27) - ts(15)} height={12} rx={2} fill={S.accentWash} stroke={S.accent} strokeWidth="0.8" {...hair} />
        <circle cx={t0} cy={112} r={3} fill={S.ink} />
        <Obs x={(ts(15) + ts(27)) / 2} y={92} n={1} />
        <Obs x={ts(40)} y={92} n={2} />
        <line x1={ts(40)} y1={104} x2={ts(40)} y2={118} stroke={S.accent} strokeWidth="1.2" {...hair} />
        <Obs x={ts(92)} y={92} n={3} />
        <Verdict x={ts(92)} y={112} ok r={6} />
        <line x1={t0} y1={152} x2={ts(92)} y2={152} stroke={S.ink2} strokeWidth="0.9" {...hair} />
        <path d={`M${t0} 147 V157 M${ts(92)} 147 V157`} stroke={S.ink2} strokeWidth="0.9" {...hair} />
        <rect x={(t0 + ts(92)) / 2 - 22} y={143} width={44} height={18} rx={4} fill={S.ink2} />
        <text x={(t0 + ts(92)) / 2} y={156.5} textAnchor="middle" fontSize={T.min} fontWeight={600} fill={S.surface} fontFamily="var(--font-plex-mono), ui-monospace, monospace">
          1:32
        </text>
        {/* findings */}
        <rect x={216} y={180} width={176} height={110} rx={6} fill={S.soft} stroke={S.rule} strokeWidth="0.9" {...hair} />
        <UiText x={226} y={200} weight={700}>
          Findings
        </UiText>
        {(
          [
            [3, "Filter: depart only"],
            [2, "Times misread"],
            [0, "Easy to compare"],
          ] as const
        ).map(([sev, text], i) => {
          const y = 222 + i * 26;
          return (
            <g key={text}>
              {sev ? [0, 1, 2].map((k) => <rect key={k} x={226 + k * 6} y={y - 11} width={4.4} height={13} rx={1} fill={k < sev ? S.error : "none"} stroke={k < sev ? S.error : S.ink3} strokeWidth="0.7" {...hair} />) : <Verdict x={234} y={y - 4.5} ok r={7} />}
              <UiText x={252} y={y}>
                {text}
              </UiText>
            </g>
          );
        })}
        {detail && <Marker x={374} y={196} n={4} />}
      </g>
    );
  },
};

/* ---------------------------------------------------------------- */
/* Usability — one product, two contexts of use (ISO 9241-11)         */
/* (step counts follow the drawn routes; outcomes are illustrative)  */
/* ---------------------------------------------------------------- */
function Context({ y, tag, who, ok, steps, rating, outcome }: { y: number; tag: string; who: string; ok: boolean; steps: number; rating: number; outcome: string }) {
  const x = 150;
  const rowY = (i: number) => y + 50 + i * 28;
  return (
    <g>
      <rect x={x} y={y} width={242} height={128} rx={8} fill="none" stroke={S.ink3} strokeWidth="0.9" strokeDasharray="3.4 2.6" {...hair} />
      <circle cx={x + 18} cy={y + 20} r={10} fill={S.ink} />
      <text x={x + 18} y={y + 24.6} textAnchor="middle" fontSize={T.min} fontWeight={700} fill={S.surface} fontFamily="var(--font-plex-sans), ui-sans-serif, sans-serif">
        {tag}
      </text>
      <UiText x={x + 36} y={y + 25} tone="ink2">
        {who}
      </UiText>
      {["Effectiveness", "Efficiency", "Satisfaction"].map((h, i) => (
        <UiText key={h} x={x + 12} y={rowY(i)} weight={600} tone="ink2">
          {h}
        </UiText>
      ))}
      <Verdict x={x + 120} y={rowY(0) - 4.5} ok={ok} r={8} />
      <UiText x={x + 134} y={rowY(0)}>
        {outcome}
      </UiText>
      {Array.from({ length: steps }, (_, k) => (
        <circle key={k} cx={x + 114 + k * 10} cy={rowY(1) - 4.5} r={3.2} fill={S.ink2} />
      ))}
      <UiText x={x + 114 + steps * 10 + 4} y={rowY(1)} mono>
        {`${steps} steps`}
      </UiText>
      {[1, 2, 3, 4, 5].map((k) => (
        <rect key={k} x={x + 112 + (k - 1) * 12} y={rowY(2) - 11} width={9} height={13} rx={2} fill={k === rating ? S.ink : "none"} stroke={S.ink3} strokeWidth="0.8" {...hair} />
      ))}
      <UiText x={x + 176} y={rowY(2)} mono>
        {`${rating}/5`}
      </UiText>
    </g>
  );
}

export const usabilityPlate: IllustrationEntry = {
  slug: "usability",
  title: "Usability plate",
  canvas: "sheet",
  description:
    "One station ticket machine on the left, used in two contexts of use on the right, each inside its own dashed boundary. Context A: a daily commuter with no bags taps Leeds return under Recent and pays; the goal is reached correctly (tick), in 2 steps, and they rate the experience 5 of 5. Context B: a rushed visitor with luggage has to find the station, type it, choose it, pick a ticket type and pay; they leave with the wrong ticket (cross), after 5 steps, and rate it 2 of 5. Each context is measured by the same three components: effectiveness, efficiency and satisfaction. Because the machine is the same and the outcomes differ, usability belongs to the interaction between these users, their goal and their context, not to the product alone. The step counts follow the routes drawn on the screen; the outcomes and ratings are illustrative.",
  key: [
    { n: "1", label: "Same product", detail: "one ticket machine for both contexts" },
    { n: "2", label: "Three measures", detail: "effectiveness, efficiency and satisfaction (ISO 9241-11)" },
    { n: "A", label: "Commuter's route", detail: "Recent → Leeds return, then pay: 2 steps" },
    { n: "B", label: "Visitor's route", detail: "find station, type, choose, ticket type, pay: 5 steps" },
  ],
  Art: ({ detail }) => {
    const kx = 8;
    return (
      <g>
        <rect x={kx} y={22} width={130} height={256} rx={10} fill={S.soft} stroke={S.ruleStrong} strokeWidth="1" {...hair} />
        <rect x={kx + 8} y={34} width={114} height={196} rx={5} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        <UiText x={kx + 16} y={56} weight={700}>
          Buy a ticket
        </UiText>
        <UiText x={kx + 16} y={78} tone="ink3" mono>
          RECENT
        </UiText>
        <UiButton x={kx + 14} y={86} w={98} label="Leeds return" />
        {["Find station", "Ticket types", "Pay"].map((t, i) => (
          <UiButton key={t} x={kx + 14} y={122 + i * 34} w={98} label={t} variant="secondary" />
        ))}
        <rect x={kx + 36} y={242} width={58} height={8} rx={4} fill={S.sunken} stroke={S.ruleStrong} strokeWidth="0.8" {...hair} />
        <rect x={kx + 26} y={258} width={78} height={10} rx={2} fill={S.sunken} stroke={S.ruleStrong} strokeWidth="0.8" {...hair} />
        {(
          [
            ["A", 99],
            ["B", 135],
          ] as const
        ).map(([t, y]) => (
          <g key={t}>
            <circle cx={kx + 128} cy={y} r={10} fill={S.ink} stroke={S.surface} strokeWidth="1.4" {...hair} />
            <text x={kx + 128} y={y + 4.6} textAnchor="middle" fontSize={T.min} fontWeight={700} fill={S.surface} fontFamily="var(--font-plex-sans), ui-sans-serif, sans-serif">
              {t}
            </text>
          </g>
        ))}
        <path d={`M${kx + 130} 150 H144 V86 H150 M144 150 V214 H150`} fill="none" stroke={S.ink3} strokeWidth="0.9" {...hair} />
        <Context y={12} tag="A" who="Commuter, daily, no bags" ok steps={2} rating={5} outcome="right ticket" />
        <Context y={152} tag="B" who="Visitor, rushed, luggage" ok={false} steps={5} rating={2} outcome="wrong ticket" />
        {detail && (
          <>
            <Marker x={kx + 65} y={288} n={1} />
            <Marker x={378} y={62} n={2} />
          </>
        )}
      </g>
    );
  },
};

/* ---------------------------------------------------------------- */
/* User experience — before, during and after use                     */
/* ---------------------------------------------------------------- */
const RESPONSE_WIDTH: Record<string, number> = { "Expects fast": 77, Confident: 62, Smooth: 48, Frustrated: 65 };

function Response({ cx, y, text, trend }: { cx: number; y: number; text: string; trend: "up" | "flat" | "down" }) {
  const c = trend === "up" ? S.ok : trend === "down" ? S.error : S.ink2;
  const glyph = trend !== "flat";
  // measured advance widths (Plex Sans 600, 13 units); estimate for any other label
  const tw = RESPONSE_WIDTH[text] ?? text.length * 7;
  const inner = tw + (glyph ? 14 : 0);
  const w = Math.round(inner + 22);
  const x0 = cx - inner / 2;
  return (
    <g>
      <rect x={cx - w / 2} y={y} width={w} height={26} rx={13} fill={trend === "up" ? S.okWash : trend === "down" ? S.errorWash : S.soft} stroke={c} strokeWidth="0.9" {...hair} />
      {glyph && <path d={trend === "up" ? `M${x0} ${y + 17} l4 -7 l4 7` : `M${x0} ${y + 9} l4 7 l4 -7`} fill="none" stroke={c} strokeWidth="1.4" {...hair} />}
      <UiText x={x0 + (glyph ? 14 : 0)} y={y + 17.5} weight={600} tone={trend === "up" ? "ok" : trend === "down" ? "error" : "ink2"}>
        {text}
      </UiText>
    </g>
  );
}

function Phone({ x, y, children }: { x: number; y: number; children?: ReactNode }) {
  return (
    <g>
      <rect x={x} y={y} width={86} height={140} rx={10} fill={S.surface} stroke={S.ruleStrong} strokeWidth="1" {...hair} />
      <rect x={x + 33} y={y + 6} width={20} height={3.4} rx={1.7} fill={S.rule} />
      {children}
    </g>
  );
}

export const userExperiencePlate: IllustrationEntry = {
  slug: "user-experience",
  title: "User experience plate",
  canvas: "sheet",
  description:
    "A train journey seen as one experience across four touchpoints, grouped before, during and after use. Before: an advert promises booking in 2 minutes, and the person expects it to be fast. During: on the phone they book the 08:42 to Leeds and pay, and feel confident when it says Booked; at the station the e-ticket opens the barrier, and it feels smooth. After: an email says the train was cancelled and the refund will take 6 weeks, and the person is frustrated. A dashed line separates the top row, the touchpoints a team can design, from the bottom row, the perceptions and responses that happen in the person and cannot be designed directly. A good booking form does not rescue the refund.",
  key: [
    { n: "1", label: "Designed touchpoints / responses", detail: "above the line, what a team designs; below it, what happens in the person" },
    { n: "2", label: "The refund decides the memory", detail: "a good booking form does not rescue a six-week refund" },
    { n: "3", label: "Before, during and after use", detail: "UX covers anticipated use and what follows it (ISO 9241-210)" },
  ],
  Art: ({ detail }) => {
    const cx = [53, 153, 247, 347];
    return (
      <g>
        {(
          [
            [6, 100, "Before"],
            [104, 296, "During"],
            [300, 394, "After"],
          ] as const
        ).map(([a, b, t]) => (
          <g key={t}>
            <rect x={a} y={16} width={b - a} height={180} rx={7} fill={t === "During" ? S.soft : "none"} stroke={S.rule} strokeWidth="0.9" {...hair} />
            <UiText x={(a + b) / 2} y={35} size={T.strong} weight={700} tone="ink2" anchor="middle">
              {t}
            </UiText>
          </g>
        ))}
        {/* before: the advert */}
        <rect x={12} y={46} width={82} height={136} rx={6} fill={S.accentWash} stroke={S.accent} strokeWidth="1" {...hair} />
        <UiText x={20} y={66} tone="ink3" mono>
          AD
        </UiText>
        <UiText x={20} y={96} size={14} weight={700}>
          Book in
        </UiText>
        <UiText x={20} y={114} size={14} weight={700}>
          2 minutes
        </UiText>
        <UiButton x={20} y={144} w={66} h={24} label="Get app" />
        {/* during: booking */}
        <Phone x={110} y={44}>
          <UiText x={120} y={74} size={T.strong} weight={700}>
            08:42
          </UiText>
          <UiText x={120} y={92} tone="ink2">
            to Leeds
          </UiText>
          <UiButton x={120} y={102} w={66} h={24} label="Pay" />
          <rect x={118} y={138} width={70} height={26} rx={5} fill={S.okWash} stroke={S.ok} strokeWidth="0.9" {...hair} />
          <path d="M124 151 l3 3 l6 -6.6" fill="none" stroke={S.ok} strokeWidth="1.5" {...hair} />
          <UiText x={137} y={155.5} weight={600}>
            Booked
          </UiText>
        </Phone>
        {/* during: the ticket at the barrier */}
        <Phone x={204} y={44}>
          <UiText x={212} y={70} tone="ink2">
            Platform 4
          </UiText>
          <g>
            {Array.from({ length: 49 }, (_, k) => {
              const i = k % 7;
              const j = Math.floor(k / 7);
              const corner = (i < 2 && j < 2) || (i > 4 && j < 2) || (i < 2 && j > 4);
              return (corner || (k * 37) % 5 < 2) && <rect key={k} x={222 + i * 7.4} y={80 + j * 7.4} width={6.4} height={6.4} fill={S.ink} />;
            })}
          </g>
          <UiText x={247} y={154} weight={600} anchor="middle">
            Gate open
          </UiText>
          <path d="M229 166 h36" stroke={S.ok} strokeWidth="1.8" {...hair} />
        </Phone>
        {/* after: the refund */}
        <rect x={306} y={46} width={82} height={136} rx={6} fill={S.surface} stroke={S.ruleStrong} strokeWidth="1" {...hair} />
        <rect x={306} y={46} width={82} height={24} rx={6} fill={S.soft} />
        <UiText x={312} y={63} tone="ink3" mono>
          EMAIL
        </UiText>
        <UiText x={312} y={94} size={14} weight={700} tone="error">
          Cancelled
        </UiText>
        <UiText x={312} y={118}>
          Refund in
        </UiText>
        <UiText x={312} y={136}>
          6 weeks
        </UiText>
        <TextBar x={312} y={152} w={60} />
        <TextBar x={312} y={164} w={44} />
        {/* designed touchpoints | responses in the person */}
        <line x1={6} y1={208} x2={394} y2={208} stroke={S.ink3} strokeWidth="1" strokeDasharray="3.4 2.6" {...hair} />
        {cx.map((x) => (
          <line key={x} x1={x} y1={186} x2={x} y2={226} stroke={S.ink3} strokeWidth="0.8" {...hair} />
        ))}
        <Response cx={cx[0]} y={226} text="Expects fast" trend="flat" />
        <Response cx={cx[1]} y={226} text="Confident" trend="up" />
        <Response cx={cx[2]} y={226} text="Smooth" trend="up" />
        <Response cx={cx[3]} y={226} text="Frustrated" trend="down" />
        {detail && (
          <>
            <Marker x={200} y={208} n={1} />
            <Marker x={cx[3]} y={272} n={2} />
            <Marker x={200} y={272} n={3} />
          </>
        )}
      </g>
    );
  },
};

/* ---------------------------------------------------------------- */
/* Human-computer interaction — person, task, technology, context     */
/* ---------------------------------------------------------------- */
function Facet({ x, y, kind, children, changed = false }: { x: number; y: number; kind: string; children?: ReactNode; changed?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={128} height={72} rx={8} fill={changed ? S.accentWash : S.surface} stroke={changed ? S.accent : S.ruleStrong} strokeWidth={changed ? 1.3 : 0.9} {...hair} />
      <UiText x={x + 12} y={y + 22} tone="ink3" mono>
        {kind}
      </UiText>
      {children}
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
    "Four linked elements surround an interaction loop. Person: a driver with eyes on the road. Task: find a charger on the route. Technology: a touchscreen map with small targets. Context: a moving car, changed from a desk, which is crossed out. Every element is joined to every other. At the centre, the interaction is a loop: the person acts, the system responds, its feedback is perceived and interpreted, and the next action follows. Because the context changed, two links are highlighted: the moving car means the driver can only glance, and it makes the small targets hard to hit, even though the screen itself did not change. Along the bottom, the discipline's three strands: study people, design technology, evaluate the fit.",
  key: [
    { n: "1", label: "Interaction", detail: "a loop: act, the system responds, feedback is interpreted, act again" },
    { n: "2", label: "Context changed", detail: "from a desk to a moving car" },
    { n: "3", label: "Context → person", detail: "the driver can only glance at the screen" },
    { n: "4", label: "Context → technology", detail: "the same small targets become hard to hit" },
    { n: "5", label: "HCI's three strands", detail: "study people, design technology, evaluate the fit: a cycle" },
  ],
  Art: ({ detail }) => {
    const cx = 200;
    const cy = 134;
    const R = 40;
    const segs = [0, 1, 2, 3].map((k) => arc(cx, cy, R, -Math.PI / 2 + k * (Math.PI / 2) + 0.42, -Math.PI / 2 + (k + 1) * (Math.PI / 2) - 0.42));
    const P = { person: [70, 44], task: [330, 44], context: [70, 222], tech: [330, 222] } as const;
    return (
      <g>
        {(
          [
            [P.person, P.task],
            [P.person, P.tech],
            [P.task, P.context],
            [P.task, P.tech],
          ] as const
        ).map(([a, b], i) => (
          <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        ))}
        <line x1={P.context[0]} y1={P.context[1]} x2={P.person[0]} y2={P.person[1]} stroke={S.accent} strokeWidth="1.5" {...hair} />
        <line x1={P.context[0]} y1={P.context[1]} x2={P.tech[0]} y2={P.tech[1]} stroke={S.accent} strokeWidth="1.5" {...hair} />
        <Pill cx={70} cy={102} text="glance only" tone="accent" mono={false} />
        <Pill cx={200} cy={222} text="targets too small" tone="accent" mono={false} />
        {/* interaction loop */}
        <circle cx={cx} cy={cy} r={R + 16} fill={S.soft} stroke={S.rule} strokeWidth="0.9" {...hair} />
        {segs.map((s, k) => {
          const [ex, ey] = s.end;
          const a = s.tan;
          const h = 4;
          return (
            <g key={k}>
              <path d={s.d} fill="none" stroke={S.ink2} strokeWidth="1.1" {...hair} />
              <polygon points={`${ex + Math.cos(a) * h},${ey + Math.sin(a) * h} ${ex - Math.cos(a) * h * 0.4 + Math.cos(a - Math.PI / 2) * h},${ey - Math.sin(a) * h * 0.4 + Math.sin(a - Math.PI / 2) * h} ${ex - Math.cos(a) * h * 0.4 - Math.cos(a - Math.PI / 2) * h},${ey - Math.sin(a) * h * 0.4 - Math.sin(a - Math.PI / 2) * h}`} fill={S.ink2} />
            </g>
          );
        })}
        <Pill cx={cx} cy={cy - R} text="act" />
        <Pill cx={cx + R + 26} cy={cy} text="respond" />
        <Pill cx={cx} cy={cy + R} text="feedback" />
        <Pill cx={cx - R - 30} cy={cy} text="interpret" />
        <UiText x={cx} y={cy + 4.5} weight={700} anchor="middle">
          you ⇄ it
        </UiText>
        {/* the four elements */}
        <Facet x={6} y={8} kind="PERSON">
          <UiText x={18} y={50} size={T.strong} weight={700}>
            Driver
          </UiText>
          <UiText x={18} y={68} tone="ink2">
            eyes on the road
          </UiText>
        </Facet>
        <Facet x={266} y={8} kind="TASK">
          <UiText x={278} y={50} size={14} weight={700}>
            Find a charger
          </UiText>
          <UiText x={278} y={68} tone="ink2">
            on the route
          </UiText>
        </Facet>
        <Facet x={6} y={186} kind="CONTEXT" changed>
          <UiText x={18} y={228} size={T.strong} weight={700}>
            Moving car
          </UiText>
          <UiText x={18} y={246} tone="ink3">
            Desk
          </UiText>
          <line x1={17} y1={241.5} x2={50} y2={241.5} stroke={S.ink3} strokeWidth="1" {...hair} />
        </Facet>
        <Facet x={266} y={186} kind="TECH">
          <rect x={278} y={214} width={60} height={36} rx={3} fill={S.sunken} stroke={S.ruleStrong} strokeWidth="0.8" {...hair} />
          <path d="M281 244 C 292 230, 304 246, 334 222" fill="none" stroke={S.ruleStrong} strokeWidth="1.8" {...hair} />
          {[
            [287, 224],
            [299, 240],
            [314, 230],
            [326, 244],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={2.2} fill={S.accent} />
          ))}
          <UiText x={344} y={230} weight={600}>
            Touch
          </UiText>
          <UiText x={344} y={246} weight={600}>
            map
          </UiText>
        </Facet>
        {/* the discipline's three strands */}
        {(
          [
            [6, 104, "study people"],
            [114, 140, "design technology"],
            [262, 132, "evaluate the fit"],
          ] as const
        ).map(([x, w, t]) => (
          <g key={t}>
            <rect x={x} y={268} width={w} height={26} rx={13} fill={S.soft} stroke={S.rule} strokeWidth="0.9" {...hair} />
            <UiText x={x + w / 2} y={285.5} weight={600} tone="ink2" anchor="middle">
              {t}
            </UiText>
          </g>
        ))}
        {detail && (
          <>
            <Marker x={250} y={86} n={1} />
            <Marker x={148} y={198} n={2} />
            <Marker x={128} y={102} n={3} />
            <Marker x={200} y={250} n={4} />
            <Marker x={394 - 12} y={262} n={5} />
          </>
        )}
      </g>
    );
  },
};

/* ---------------------------------------------------------------- */
/* WCAG 2.2 — principle, guideline, success criteria, levels         */
/* (one branch opened in full: 1 → 1.4 → 1.4.3, 1.4.6, 1.4.11)       */
/* ---------------------------------------------------------------- */
function Level({ x, y, l }: { x: number; y: number; l: "A" | "AA" | "AAA" }) {
  const w = l.length * 8.4 + 10;
  return (
    <g>
      <rect x={x} y={y - 10} width={w} height={20} rx={3} fill={l === "AA" ? S.ink : l === "A" ? S.ink2 : S.surface} stroke={l === "AAA" ? S.ink2 : "none"} strokeWidth="0.9" {...hair} />
      <UiText x={x + w / 2} y={y + 4.6} weight={700} tone={l === "AAA" ? "ink" : "surface"} anchor="middle" mono>
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
    "WCAG 2.2 drawn as an indented hierarchy with one branch opened in full. Principle 1, Perceivable, contains guidelines; 1.1 to 1.3 are collapsed and guideline 1.4, Distinguishable, is opened. Under it sit three testable success criteria with their levels: 1.4.3 Contrast (Minimum) at AA, 1.4.6 Contrast (Enhanced) at AAA and 1.4.11 Non-text Contrast at AA. A dashed row at the end of the branch stands for the non-normative Understanding and Techniques documents that explain how to meet each criterion. The other principles, 2 Operable, 3 Understandable and 4 Robust, are shown collapsed. On the right, the conformance levels nest: A inside AA inside AAA, with AA, meaning every A and AA criterion, marked as the usual target.",
  key: [
    { n: "1", label: "Principle", detail: "four: perceivable, operable, understandable, robust" },
    { n: "2", label: "Guideline", detail: "13 in WCAG 2.2; guidelines are not testable" },
    { n: "3", label: "Success criterion", detail: "testable, each with a level" },
    { n: "4", label: "Conformance levels", detail: "A ⊂ AA ⊂ AAA; AA means every A and AA criterion, the usual target" },
    { n: "5", label: "Techniques", detail: "non-normative: how to meet a criterion" },
  ],
  Art: ({ detail }) => {
    const rows = [52, 84, 116, 148, 178, 208, 238];
    const tick = (x1: number, y1: number, x2: number, y2: number) => <path d={`M${x1} ${y1} V${y2} H${x2}`} fill="none" stroke={S.ink3} strokeWidth="0.9" {...hair} />;
    return (
      <g>
        <UiText x={12} y={24} tone="ink3" mono>
          WCAG 2.2
        </UiText>
        {/* principle 1 */}
        <rect x={10} y={rows[0] - 18} width={150} height={28} rx={6} fill={S.soft} stroke={S.ink2} strokeWidth="1" {...hair} />
        <UiText x={20} y={rows[0] + 1} weight={700} mono>
          1
        </UiText>
        <UiText x={36} y={rows[0] + 1} size={T.strong} weight={700}>
          Perceivable
        </UiText>
        {tick(24, rows[0] + 10, 40, rows[1] - 5)}
        {tick(24, rows[1] - 5, 40, rows[2] - 5)}
        {/* guidelines */}
        <rect x={40} y={rows[1] - 17} width={96} height={24} rx={5} fill="none" stroke={S.ruleStrong} strokeWidth="0.9" strokeDasharray="2.4 2" {...hair} />
        <UiText x={50} y={rows[1]} tone="ink3" mono>
          1.1 – 1.3
        </UiText>
        <rect x={40} y={rows[2] - 17} width={172} height={24} rx={5} fill={S.surface} stroke={S.ink2} strokeWidth="1" {...hair} />
        <UiText x={50} y={rows[2]} weight={700} mono>
          1.4
        </UiText>
        <UiText x={84} y={rows[2]} weight={600}>
          Distinguishable
        </UiText>
        {/* success criteria */}
        {(
          [
            [rows[3], "1.4.3", "Contrast (Minimum)", "AA"],
            [rows[4], "1.4.6", "Contrast (Enhanced)", "AAA"],
            [rows[5], "1.4.11", "Non-text Contrast", "AA"],
          ] as const
        ).map(([y, n, name, l]) => (
          <g key={n}>
            {tick(54, rows[2] + 7, 70, y - 5)}
            <UiText x={72} y={y} weight={700} mono>
              {n}
            </UiText>
            <UiText x={124} y={y}>
              {name}
            </UiText>
            <Level x={258} y={y - 4.5} l={l} />
          </g>
        ))}
        {/* non-normative support */}
        <path d={`M54 ${rows[5] - 5} V${rows[6] - 5} H102`} fill="none" stroke={S.ink3} strokeWidth="0.9" strokeDasharray="2.4 2" {...hair} />
        <rect x={102} y={rows[6] - 17} width={190} height={24} rx={5} fill="none" stroke={S.ink3} strokeWidth="0.9" strokeDasharray="2.4 2" {...hair} />
        <UiText x={112} y={rows[6]} tone="ink2">
          Techniques · non-normative
        </UiText>
        {/* other principles, collapsed */}
        {(
          [
            [10, 96, "2 Operable"],
            [112, 140, "3 Understandable"],
            [258, 86, "4 Robust"],
          ] as const
        ).map(([x, w, t]) => (
          <g key={t}>
            <rect x={x} y={262} width={w} height={26} rx={6} fill="none" stroke={S.ruleStrong} strokeWidth="0.9" strokeDasharray="2.4 2" {...hair} />
            <UiText x={x + 10} y={279.5} weight={600} tone="ink2">
              {t}
            </UiText>
          </g>
        ))}
        {/* conformance levels nest */}
        <rect x={302} y={40} width={90} height={150} rx={6} fill={S.surface} stroke={S.ink2} strokeWidth="1" {...hair} />
        <rect x={312} y={70} width={70} height={110} rx={5} fill={S.accentWash} stroke={S.accent} strokeWidth="1.4" {...hair} />
        <rect x={322} y={100} width={50} height={70} rx={4} fill={S.surface} stroke={S.ink} strokeWidth="0.9" {...hair} />
        <UiText x={347} y={60} weight={700} anchor="middle" mono>
          AAA
        </UiText>
        <UiText x={347} y={90} weight={700} tone="accent" anchor="middle" mono>
          AA
        </UiText>
        <UiText x={347} y={140} weight={700} anchor="middle" mono>
          A
        </UiText>
        <rect x={302} y={198} width={90} height={24} rx={12} fill={S.ink} />
        <UiText x={347} y={214.5} weight={600} tone="surface" anchor="middle">
          usual target
        </UiText>
        {detail && (
          <>
            <Marker x={176} y={rows[0] - 4} n={1} />
            <Marker x={228} y={rows[2] - 5} n={2} />
            <Marker x={44} y={rows[4] - 5} n={3} />
            <Marker x={290} y={30} n={4} />
            <Marker x={306} y={rows[6] - 5} n={5} />
          </>
        )}
      </g>
    );
  },
};
