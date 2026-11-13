/**
 * Cycle 1, Batch 1 plates (D-129): interaction principles of feedback,
 * constraints, direct manipulation and state. Instructional sheets (D-089); explanations live in each plate's
 * figure key (D-101), never as microtext in the drawing.
 */
import type { IllustrationEntry } from "../illustration-types";
import { Marker, Pointer, S, TextBar, UiButton, UiText, Verdict } from "../system/sheet";
import { Card, head } from "./learning-sheets";

const hair = { vectorEffect: "non-scaling-stroke" as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const len = Math.hypot(x2 - x1, y2 - y1);
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={S.ink2} strokeWidth="1.1" {...hair} />
      <polygon points={head(x2, y2, (x2 - x1) / len, (y2 - y1) / len)} fill={S.ink2} />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Feedback: the action–result loop and three qualities of feedback      */
/* ------------------------------------------------------------------ */
export const feedbackPrinciplePlate: IllustrationEntry = {
  slug: "feedback-principle",
  title: "Feedback plate",
  canvas: "sheet",
  description:
    "Top row, a loop of three panels joined by arrows. Act: a pointer presses an Add button. System: out of sight, the basket changes from 1 to 2 items. Feedback: a tick with the word 'Added' and a badge showing 2. A dashed arrow runs from the feedback back under the panels to the button, closing the loop: the person compares what they see with what they meant to do. Bottom row, three comparisons. Immediate: a button already reading 'Adding…'. Informative: 'Done' marked with a cross beside 'Jacket added' marked with a tick. Proportionate: a small dialog over a dimmed screen marked with a cross beside a single inline line marked with a tick.",
  key: [
    { n: "1", label: "Act", detail: "the person does something — here, presses Add" },
    { n: "2", label: "The system changes", detail: "the basket goes from 1 to 2 items, which the person cannot see directly" },
    { n: "3", label: "Feedback", detail: "the interface shows the result: a confirmation and the new count" },
    { n: "4", label: "Evaluate", detail: "the person compares the feedback with what they intended, which closes the loop" },
    { n: "5", label: "Immediate", detail: "the control responds at once, before the work has finished" },
    { n: "6", label: "Informative", detail: "'Jacket added' says what changed; 'Done' does not" },
    { n: "7", label: "Proportionate", detail: "a routine action gets an inline message, not a blocking dialog" },
  ],
  Art: ({ detail }) => (
    <g>
      {/* the loop */}
      <Card x={12} y={34} w={112} h={86} title="Act">
        <UiButton x={24} y={72} w={88} label="Add" />
        <Pointer x={84} y={92} />
      </Card>
      <Arrow x1={126} y1={84} x2={142} y2={84} />
      <Card x={144} y={34} w={112} h={86} title="System">
        <UiText x={156} y={84} mono tone="ink2">
          basket
        </UiText>
        <UiText x={156} y={106} weight={600} size={16}>
          1 → 2
        </UiText>
      </Card>
      <Arrow x1={258} y1={84} x2={274} y2={84} />
      <Card x={276} y={34} w={112} h={86} title="Feedback">
        <Verdict x={296} y={80} ok />
        <UiText x={312} y={85} weight={600}>
          Added
        </UiText>
        <circle cx={366} cy={102} r={11} fill={S.accent} />
        <UiText x={366} y={107} anchor="middle" weight={600} tone="surface">
          2
        </UiText>
      </Card>
      <path d="M332 122 V146 H68 V128" fill="none" stroke={S.ink2} strokeWidth="1.1" strokeDasharray="4 3" {...hair} />
      <polygon points={head(68, 123, 0, -1)} fill={S.ink2} />

      {/* three qualities */}
      <rect x={12} y={170} width={112} height={110} rx={8} fill={S.soft} stroke={S.rule} strokeWidth="0.9" {...hair} />
      <UiButton x={24} y={212} w={88} label="Adding…" />

      <rect x={144} y={170} width={112} height={110} rx={8} fill={S.soft} stroke={S.rule} strokeWidth="0.9" {...hair} />
      <Verdict x={160} y={204} ok={false} />
      <UiText x={176} y={209} tone="ink2">
        Done
      </UiText>
      <Verdict x={160} y={244} ok />
      <UiText x={176} y={249} weight={600}>
        Jacket added
      </UiText>

      <rect x={276} y={170} width={112} height={110} rx={8} fill={S.soft} stroke={S.rule} strokeWidth="0.9" {...hair} />
      <rect x={286} y={184} width={44} height={60} rx={4} fill={S.ink} opacity={0.35} />
      <rect x={292} y={200} width={32} height={26} rx={3} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
      <TextBar x={296} y={210} w={22} />
      <Verdict x={308} y={262} ok={false} />
      <TextBar x={340} y={210} w={38} />
      <Verdict x={358} y={262} ok />

      {detail && (
        <>
          <Marker x={12} y={34} n={1} />
          <Marker x={144} y={34} n={2} />
          <Marker x={276} y={34} n={3} />
          <Marker x={200} y={146} n={4} />
          <Marker x={12} y={170} n={5} />
          <Marker x={144} y={170} n={6} />
          <Marker x={276} y={170} n={7} />
        </>
      )}
    </g>
  ),
};

/* ------------------------------------------------------------------ */
/* Constraints: Norman's four kinds, shown as interfaces               */
/* ------------------------------------------------------------------ */
const Panel = ({ x, y }: { x: number; y: number }) => <rect x={x} y={y} width={186} height={134} rx={8} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />;

export const constraintsPlate: IllustrationEntry = {
  slug: "constraints",
  title: "Constraints plate",
  canvas: "sheet",
  description:
    "Four interface panels, one for each kind of constraint Norman describes. Top left, physical: a volume slider whose thumb can move only along its track — a double-headed arrow along the track is allowed, an arrow pointing off the track is crossed out. Top right, cultural: a 'Discard draft?' dialog with a close × in the top right corner and Cancel before the primary Discard button, laid out the way convention leads people to expect. Bottom left, semantic: a return-date row of days 10 to 16 where departure is on the 12th, so the 10th and 11th are struck out and cannot be chosen; 'out' marks the departure day, because a return cannot come before the outward trip. Bottom right, logical: three seats for a third passenger, two already taken and crossed, one free and ticked — only one choice is left, so reasoning alone settles it.",
  key: [
    { n: "1", label: "Physical", detail: "the shape of the control allows only certain movements — the thumb stays on its track" },
    { n: "2", label: "Cultural", detail: "conventions people have learned narrow what they try: × closes, the primary action comes last" },
    { n: "3", label: "Semantic", detail: "the meaning of the task rules options out: a return date before departure makes no sense" },
    { n: "4", label: "Logical", detail: "when other options are used up, reasoning leaves one: two seats are taken, so the third is it" },
  ],
  Art: ({ detail }) => (
    <g>
      {/* 1 physical: slider confined to its track */}
      <Panel x={8} y={8} />
      <UiText x={22} y={34} weight={600}>
        Volume
      </UiText>
      <line x1={26} y1={78} x2={176} y2={78} stroke={S.ruleStrong} strokeWidth="4" strokeLinecap="round" />
      <line x1={26} y1={78} x2={110} y2={78} stroke={S.accent} strokeWidth="4" strokeLinecap="round" />
      <circle cx={110} cy={78} r={9} fill={S.surface} stroke={S.ink} strokeWidth="1.6" />
      <line x1={70} y1={104} x2={150} y2={104} stroke={S.ink2} strokeWidth="1.1" {...hair} />
      <polygon points={head(150, 104, 1, 0)} fill={S.ink2} />
      <polygon points={head(70, 104, -1, 0)} fill={S.ink2} />
      <Verdict x={110} y={122} ok />
      <line x1={110} y1={66} x2={110} y2={44} stroke={S.ink3} strokeWidth="1.1" strokeDasharray="3 2" {...hair} />
      <Verdict x={134} y={46} ok={false} />

      {/* 2 cultural: dialog laid out by convention */}
      <Panel x={206} y={8} />
      <UiText x={220} y={36} weight={600}>
        Discard draft?
      </UiText>
      <UiText x={370} y={37} anchor="middle" tone="ink2" size={18}>
        ×
      </UiText>
      <TextBar x={220} y={54} w={140} />
      <TextBar x={220} y={66} w={110} />
      <UiButton x={220} y={100} w={70} label="Cancel" variant="secondary" />
      <UiButton x={298} y={100} w={80} label="Discard" />

      {/* 3 semantic: no return before departure */}
      <Panel x={8} y={158} />
      <UiText x={22} y={184} weight={600}>
        Return
      </UiText>
      {[10, 11, 12, 13, 14, 15, 16].map((d, i) => {
        const x = 18 + i * 24;
        const before = d < 12;
        return (
          <g key={d}>
            <rect x={x} y={208} width={21} height={24} rx={4} fill={d === 12 ? S.accentWash : before ? S.sunken : S.surface} stroke={d === 12 ? S.accent : S.ruleStrong} strokeWidth="0.9" {...hair} />
            <UiText x={x + 10.5} y={225} anchor="middle" tone={before ? "ink3" : "ink"}>
              {d}
            </UiText>
            {before && <line x1={x + 3} y1={229} x2={x + 18} y2={211} stroke={S.ink3} strokeWidth="1.1" {...hair} />}
          </g>
        );
      })}
      <UiText x={76.5} y={256} anchor="middle" mono tone="ink2">
        out
      </UiText>

      {/* 4 logical: one seat left */}
      <Panel x={206} y={158} />
      <UiText x={220} y={184} weight={600}>
        Seat, passenger 3
      </UiText>
      {[0, 1, 2].map((i) => {
        const x = 230 + i * 50;
        const free = i === 2;
        return (
          <g key={i}>
            <rect x={x} y={206} width={38} height={34} rx={6} fill={free ? S.okWash : S.sunken} stroke={free ? S.ok : S.ruleStrong} strokeWidth={free ? 1.4 : 0.9} {...hair} />
            {!free && (
              <>
                <line x1={x + 8} y1={214} x2={x + 30} y2={232} stroke={S.ink3} strokeWidth="1.2" {...hair} />
                <line x1={x + 30} y1={214} x2={x + 8} y2={232} stroke={S.ink3} strokeWidth="1.2" {...hair} />
              </>
            )}
            {free && <Verdict x={x + 19} y={223} ok />}
            <UiText x={x + 19} y={260} anchor="middle" mono tone="ink2">
              {`${i + 1}C`}
            </UiText>
          </g>
        );
      })}

      {detail && (
        <>
          {/* r = 11: kept ≥ 11 units from the viewBox edge so no marker is clipped */}
          <Marker x={12} y={12} n={1} />
          <Marker x={210} y={12} n={2} />
          <Marker x={12} y={162} n={3} />
          <Marker x={210} y={162} n={4} />
        </>
      )}
    </g>
  ),
};

/* ------------------------------------------------------------------ */
/* Direct manipulation: the same move as command, drag, result, menu    */
/* ------------------------------------------------------------------ */
function FileIcon({ x, y, w = 30, h = 38, ghost = false }: { x: number; y: number; w?: number; h?: number; ghost?: boolean }) {
  const f = Math.min(10, w / 3);
  return (
    <path
      d={`M${x} ${y} H${x + w - f} L${x + w} ${y + f} V${y + h} H${x} Z M${x + w - f} ${y} V${y + f} H${x + w}`}
      fill={ghost ? "none" : S.surface}
      stroke={ghost ? S.ink3 : S.ink}
      strokeWidth={ghost ? 1 : 1.3}
      strokeDasharray={ghost ? "3 3" : undefined}
      {...hair}
    />
  );
}

function Folder({ x, y, w, h, active = false }: { x: number; y: number; w: number; h: number; active?: boolean }) {
  return (
    <g>
      <path d={`M${x} ${y + 8} V${y} H${x + w * 0.38} L${x + w * 0.46} ${y + 8}`} fill={active ? S.accentWash : S.sunken} stroke={active ? S.accent : S.ruleStrong} strokeWidth={active ? 1.4 : 0.9} {...hair} />
      <rect x={x} y={y + 8} width={w} height={h - 8} rx={4} fill={active ? S.accentWash : S.sunken} stroke={active ? S.accent : S.ruleStrong} strokeWidth={active ? 1.4 : 0.9} {...hair} />
    </g>
  );
}

export const directManipulationPlate: IllustrationEntry = {
  slug: "direct-manipulation",
  title: "Direct manipulation plate",
  canvas: "sheet",
  description:
    "Four interface panels showing one task — moving the file q3.pdf into the Archive folder — done four ways. Top left, command: a terminal where the person types 'mv q3.pdf Archive', then has to type 'ls Archive' to see that q3.pdf is there; neither the file nor the folder is ever shown. Top right, direct: the file and the folder are both visible; a pointer drags the file from its old place, shown as a dashed outline, onto the Archive folder, which is highlighted while the file is over it. Bottom left, result: the Archive folder now lists q3.pdf, and a message reads 'Moved to Archive' with an Undo action. Bottom right, without dragging: the file's row has a 'Move to…' button that opens a menu listing Drafts and Archive; Archive has a keyboard focus ring and a pointer is about to click it, so the same move can be done with a click, a tap or the keyboard.",
  key: [
    { n: "1", label: "Command", detail: "you describe the move in syntax, then have to ask again to see the result; the objects stay out of sight" },
    { n: "2", label: "Direct", detail: "the file and the folder are visible; you drag one onto the other, and the folder highlights while you are still moving" },
    { n: "3", label: "Immediate and reversible", detail: "the result shows at once, and Undo puts it back, so trying costs little" },
    { n: "4", label: "Without dragging", detail: "the same move from a menu, by click, tap or keyboard — WCAG 2.2 SC 2.5.7 requires a single-pointer alternative to dragging" },
  ],
  Art: ({ detail }) => (
    <g>
      {/* 1 command: describe, then ask to see */}
      <Panel x={8} y={8} />
      <UiText x={22} y={34} weight={600}>
        Command
      </UiText>
      <rect x={20} y={46} width={162} height={76} rx={4} fill={S.sunken} stroke={S.rule} strokeWidth="0.9" {...hair} />
      <UiText x={28} y={68} mono>
        $ mv q3.pdf Archive
      </UiText>
      <UiText x={28} y={89} mono>
        $ ls Archive
      </UiText>
      <UiText x={28} y={110} mono tone="ink2">
        q3.pdf
      </UiText>

      {/* 2 direct: drag the file onto the folder */}
      <Panel x={206} y={8} />
      <UiText x={220} y={34} weight={600}>
        Direct
      </UiText>
      <FileIcon x={224} y={54} ghost />
      <UiText x={239} y={114} anchor="middle" mono tone="ink2">
        q3.pdf
      </UiText>
      <line x1={258} y1={74} x2={282} y2={78} stroke={S.ink3} strokeWidth="1.1" strokeDasharray="3 2" {...hair} />
      <Folder x={304} y={56} w={74} h={52} active />
      <FileIcon x={288} y={64} />
      <Pointer x={308} y={86} />
      <UiText x={341} y={126} anchor="middle" tone="accent" weight={600}>
        Archive
      </UiText>

      {/* 3 result: visible at once, with Undo */}
      <Panel x={8} y={158} />
      <UiText x={22} y={184} weight={600}>
        Result
      </UiText>
      <rect x={20} y={196} width={162} height={44} rx={4} fill={S.okWash} stroke={S.ok} strokeWidth="1" {...hair} />
      <FileIcon x={30} y={204} w={20} h={26} />
      <UiText x={60} y={223} mono>
        q3.pdf
      </UiText>
      <rect x={20} y={252} width={162} height={30} rx={6} fill={S.ink} />
      <UiText x={30} y={272} tone="surface">
        Moved to Archive
      </UiText>
      <UiText x={172} y={272} anchor="end" tone="surface" weight={700}>
        Undo
      </UiText>

      {/* 4 without dragging: a menu, by click, tap or keyboard */}
      <Panel x={206} y={158} />
      <UiText x={220} y={184} weight={600}>
        Without dragging
      </UiText>
      <FileIcon x={220} y={196} w={16} h={20} />
      <UiText x={244} y={212} mono>
        q3.pdf
      </UiText>
      <UiButton x={302} y={194} w={76} label="Move to…" variant="secondary" />
      <rect x={290} y={226} width={88} height={58} rx={6} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
      <UiText x={302} y={246} tone="ink2">
        Drafts
      </UiText>
      <rect x={295} y={256} width={78} height={24} rx={4} fill={S.accentWash} stroke={S.accent} strokeWidth="1.6" {...hair} />
      <UiText x={302} y={273} weight={600}>
        Archive
      </UiText>
      <Pointer x={356} y={266} />

      {detail && (
        <>
          {/* r = 11: kept ≥ 11 units from the viewBox edge so no marker is clipped */}
          <Marker x={12} y={12} n={1} />
          <Marker x={210} y={12} n={2} />
          <Marker x={12} y={162} n={3} />
          <Marker x={210} y={162} n={4} />
        </>
      )}
    </g>
  ),
};

const plates: IllustrationEntry[] = [feedbackPrinciplePlate, constraintsPlate, directManipulationPlate];
export default plates;
