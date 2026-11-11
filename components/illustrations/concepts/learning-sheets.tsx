/**
 * Level-1 plates migrated to the instructional sheet in session 25 (D-105),
 * one at a time in learning-path order. Each plate was read against its
 * entry first; numbered markers in the hero are explained by the HTML figure
 * key (D-101). Text sizes follow T (system/sheet.tsx).
 */
import type { CSSProperties, ReactNode } from "react";
import { hickInformationEqual, klmTotal, parseKlm, steeringId } from "../../../lib/formulas/pointing";
import { chunk, peakEnd } from "../../../lib/formulas/experience";
import { nasaTlxRaw, nps, susScore } from "../../../lib/formulas/questionnaires";
import { problemDiscovery, sampleSizeProportion, sampleSizeTwoProportions, taskSuccess, twoProportionTest } from "../../../lib/formulas/stats";
import { contrastRatio, modularScale } from "../../../lib/formulas/visual";
import type { IllustrationEntry } from "../illustration-types";
import { Marker, Pointer, S, T, TextBar, UiButton, UiChip, UiField, UiFrame, UiText, Verdict } from "../system/sheet";

const hair = { vectorEffect: "non-scaling-stroke" as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

type Tone = "ink" | "mute" | "accent" | "ok" | "error";
const toneColor = (t: Tone) => (t === "accent" ? S.accent : t === "ok" ? S.ok : t === "error" ? S.error : t === "mute" ? S.ink3 : S.ink2);

/** Arrowhead at (x, y) pointing along (dx, dy). */
export function head(x: number, y: number, dx: number, dy: number, s = 6) {
  const l = Math.hypot(dx, dy) || 1;
  const ux = dx / l;
  const uy = dy / l;
  return `${x},${y} ${x - ux * s - uy * s * 0.55},${y - uy * s + ux * s * 0.55} ${x - ux * s + uy * s * 0.55},${y - uy * s - ux * s * 0.55}`;
}

/** Straight or quadratic connector with a head at its end. */
export function Link({ from, to, via, tone = "ink", dashed = false, width = 1.1, arrow = true }: { from: [number, number]; to: [number, number]; via?: [number, number]; tone?: Tone; dashed?: boolean; width?: number; arrow?: boolean }) {
  const c = toneColor(tone);
  const d = via ? `M${from[0]} ${from[1]} Q ${via[0]} ${via[1]} ${to[0]} ${to[1]}` : `M${from[0]} ${from[1]} L${to[0]} ${to[1]}`;
  const [px, py] = via ?? from;
  return (
    <g>
      <path d={d} fill="none" stroke={c} strokeWidth={width} strokeDasharray={dashed ? "3.4 2.8" : undefined} {...hair} />
      {arrow && <polygon points={head(to[0], to[1], to[0] - px, to[1] - py)} fill={c} />}
    </g>
  );
}

/** A titled card on the sheet. */
export function Card({ x, y, w, h, title, tone = "default", children }: { x: number; y: number; w: number; h: number; title?: string; tone?: "default" | "accent" | "soft"; children?: ReactNode }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={7} fill={tone === "soft" ? S.soft : tone === "accent" ? S.accentWash : S.surface} stroke={tone === "accent" ? S.accent : S.ruleStrong} strokeWidth={tone === "accent" ? 1.2 : 0.9} {...hair} />
      {title && (
        <UiText x={x + 12} y={y + 22} weight={600}>
          {title}
        </UiText>
      )}
      {children}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* User-centred design: four activities, one decision, iteration       */
/* ------------------------------------------------------------------ */
export const userCentredDesignPlate: IllustrationEntry = {
  slug: "user-centred-design",
  title: "User-centred design plate",
  canvas: "sheet",
  description:
    "The four activities of the human-centred design process (ISO 9241-210) as cards arranged in a clockwise loop. Context of use: two pages of field notes about people, their tasks and environments. Requirements: a checklist of three requirements. Design solutions: a rough sketch becoming a screen. Evaluate: three test results, two passed and one failed. From Evaluate an arrow reaches a decision in the middle, requirements met? A yes path leads to release; dashed no paths lead back to the context, the requirements or the designs, because a team returns to whichever activity the evidence points to rather than always starting over.",
  key: [
    { n: "1", label: "Understand and specify the context of use", detail: "who the users are, their tasks and environments" },
    { n: "2", label: "Specify the user requirements", detail: "stated so they can be tested" },
    { n: "3", label: "Produce design solutions", detail: "from sketches to working prototypes" },
    { n: "4", label: "Evaluate against the requirements", detail: "with real people, not only by inspection" },
    { n: "5", label: "Requirements met?", detail: "yes: release and keep evaluating in use; no: return to whichever activity needs it" },
  ],
  Art: ({ detail }) => {
    const cw = 150;
    const ch = 88;
    const c1: [number, number] = [14, 18];
    const c2: [number, number] = [236, 18];
    const c3: [number, number] = [236, 194];
    const c4: [number, number] = [14, 194];
    return (
      <g>
        {/* 1 context of use: field notes */}
        <Card x={c1[0]} y={c1[1]} w={cw} h={ch} title="Context of use">
          {[0, 1].map((k) => (
            <g key={k}>
              <rect x={c1[0] + 12 + k * 66} y={c1[1] + 34} width={58} height={44} rx={3} fill={S.soft} stroke={S.rule} strokeWidth="0.8" {...hair} />
              {[0, 1, 2].map((r) => (
                <rect key={r} x={c1[0] + 18 + k * 66} y={c1[1] + 42 + r * 11} width={r === 2 ? 30 : 46} height={3} rx={1.5} fill={S.ink3} opacity={0.6} />
              ))}
            </g>
          ))}
        </Card>
        {/* 2 requirements: a checklist */}
        <Card x={c2[0]} y={c2[1]} w={cw} h={ch} title="Requirements">
          {[0, 1, 2].map((r) => (
            <g key={r}>
              <rect x={c2[0] + 12} y={c2[1] + 34 + r * 16} width={10} height={10} rx={2} fill={S.surface} stroke={S.ink2} strokeWidth="0.9" {...hair} />
              <TextBar x={c2[0] + 30} y={c2[1] + 37 + r * 16} w={[96, 78, 104][r]} />
            </g>
          ))}
        </Card>
        {/* 3 design solutions: sketch to screen */}
        <Card x={c3[0]} y={c3[1]} w={cw} h={ch} title="Design solutions">
          <rect x={c3[0] + 12} y={c3[1] + 34} width={52} height={44} rx={3} fill="none" stroke={S.ink3} strokeWidth="0.9" strokeDasharray="2.6 2" {...hair} />
          <path d={`M${c3[0] + 18} ${c3[1] + 46} h30 M${c3[0] + 18} ${c3[1] + 56} h22 M${c3[0] + 18} ${c3[1] + 68} h36`} stroke={S.ink3} strokeWidth="1" {...hair} />
          <Link from={[c3[0] + 70, c3[1] + 56]} to={[c3[0] + 84, c3[1] + 56]} tone="mute" />
          <rect x={c3[0] + 88} y={c3[1] + 34} width={50} height={44} rx={4} fill={S.surface} stroke={S.ink2} strokeWidth="0.9" {...hair} />
          <rect x={c3[0] + 88} y={c3[1] + 34} width={50} height={9} rx={4} fill={S.soft} />
          <TextBar x={c3[0] + 94} y={c3[1] + 50} w={34} />
          <rect x={c3[0] + 94} y={c3[1] + 62} width={26} height={9} rx={4.5} fill={S.ink} />
        </Card>
        {/* 4 evaluate: test results */}
        <Card x={c4[0]} y={c4[1]} w={cw} h={ch} title="Evaluate">
          {[true, true, false].map((ok, r) => (
            <g key={r}>
              <Verdict x={c4[0] + 18} y={c4[1] + 40 + r * 16} ok={ok} r={6} />
              <TextBar x={c4[0] + 30} y={c4[1] + 38 + r * 16} w={[92, 80, 100][r]} />
            </g>
          ))}
        </Card>
        {/* the loop */}
        <Link from={[c1[0] + cw, 62]} to={[c2[0] - 2, 62]} />
        <Link from={[311, c2[1] + ch]} to={[311, c3[1] - 2]} />
        <Link from={[c3[0], 238]} to={[c4[0] + cw + 2, 238]} />
        {/* decision */}
        <Link from={[120, c4[1]]} via={[120, 150]} to={[168, 150]} />
        <path d="M200 124 L230 150 L200 176 L170 150 Z" fill={S.surface} stroke={S.ink} strokeWidth="1.2" {...hair} />
        <UiText x={200} y={155} weight={600} anchor="middle">
          met?
        </UiText>
        <Link from={[188, 134]} via={[170, 118]} to={[146, 108]} tone="accent" dashed />
        <Link from={[212, 134]} via={[230, 118]} to={[254, 108]} tone="accent" dashed />
        <Link from={[227, 155]} via={[242, 170]} to={[250, 192]} tone="accent" dashed />
        <Link from={[200, 176]} to={[200, 183]} tone="ok" arrow={false} />
        <rect x={168} y={183} width={64} height={22} rx={11} fill={S.okWash} stroke={S.ok} strokeWidth="0.9" {...hair} />
        <UiText x={200} y={198.5} weight={600} anchor="middle" tone="ok">
          release
        </UiText>
        {detail && (
          <>
            <Marker x={c1[0] + 2} y={c1[1] + 2} n={1} />
            <Marker x={c2[0] + cw - 2} y={c2[1] + 2} n={2} />
            <Marker x={c3[0] + cw - 2} y={c3[1] + ch - 2} n={3} />
            <Marker x={c4[0] + 2} y={c4[1] + ch - 2} n={4} />
            <Marker x={234} y={128} n={5} tone="accent" />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Cognitive load theory: presented information → working memory ⇄ LTM */
/* ------------------------------------------------------------------ */
export const cognitiveLoadPlate: IllustrationEntry = {
  slug: "cognitive-load-theory",
  title: "Cognitive load theory plate",
  canvas: "sheet",
  explorer: "cognitive-load",
  description:
    "A conceptual model, not a picture of the brain. On the left a screen presents a line chart whose legend sits in a separate box at the bottom of the screen. An arrow leads to working memory in the middle, drawn as a narrow column of four slots: two hold the material's own elements (intrinsic load), one is hatched and holds the work of matching the legend to the lines (extraneous load, caused by the presentation), and one is free for understanding. Arrows run both ways between working memory and long-term memory on the right, a stack of schema cards, each a cluster of linked elements handled as one. In the revised theory, germane processing is the working-memory resource given to the material rather than a third load.",
  key: [
    { n: "1", label: "Information presented", detail: "the material plus the way it is shown" },
    { n: "2", label: "Working memory", detail: "only a few new interacting elements at a time, and briefly" },
    { n: "3", label: "Intrinsic load", detail: "set by element interactivity relative to what the learner already knows" },
    { n: "4", label: "Extraneous load", detail: "imposed by presentation, here a legend far from its lines; design can remove it" },
    { n: "5", label: "Long-term memory", detail: "schemas let many elements be handled as one, so expertise lowers intrinsic load" },
  ],
  Art: ({ detail }) => {
    const wx = 172;
    const slotY = (i: number) => 76 + i * 40;
    const schema = (x: number, y: number) => (
      <g>
        {[
          [0, 0],
          [16, -8],
          [30, 2],
          [14, 12],
          [36, 16],
        ].map(([dx, dy], i, a) => (
          <g key={i}>
            {i > 0 && <line x1={x + a[i - 1][0]} y1={y + a[i - 1][1]} x2={x + dx} y2={y + dy} stroke={S.ink2} strokeWidth="0.9" {...hair} />}
            <circle cx={x + dx} cy={y + dy} r={3.4} fill={S.ink2} />
          </g>
        ))}
      </g>
    );
    return (
      <g>
        {/* presented information: chart with a separated legend */}
        <UiFrame x={8} y={44} w={136} h={190}>
          <UiText x={12} y={24} weight={600}>
            Sign-ups
          </UiText>
          <line x1={14} y1={110} x2={124} y2={110} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
          <path d="M16 100 L44 84 L72 76 L100 56 L122 44" fill="none" stroke={S.ink} strokeWidth="1.8" {...hair} />
          <path d="M16 96 L44 98 L72 88 L100 90 L122 82" fill="none" stroke={S.ink3} strokeWidth="1.8" strokeDasharray="4 3" {...hair} />
          <rect x={56} y={128} width={68} height={34} rx={4} fill={S.soft} stroke={S.ruleStrong} strokeWidth="0.8" {...hair} />
          <line x1={62} y1={139} x2={76} y2={139} stroke={S.ink} strokeWidth="1.8" {...hair} />
          <line x1={62} y1={152} x2={76} y2={152} stroke={S.ink3} strokeWidth="1.8" strokeDasharray="4 3" {...hair} />
          <TextBar x={82} y={137} w={34} />
          <TextBar x={82} y={150} w={28} />
        </UiFrame>
        <Link from={[146, 138]} to={[wx - 4, 138]} />
        {/* working memory */}
        <UiText x={200} y={250} weight={600} anchor="middle">
          Working memory
        </UiText>
        <rect x={wx} y={64} width={56} height={164} rx={8} fill={S.soft} stroke={S.ink} strokeWidth="1.2" {...hair} />
        {[0, 1, 2, 3].map((i) => {
          const y = slotY(i);
          return (
            <g key={i}>
              {i < 2 && <rect x={wx + 8} y={y} width={40} height={32} rx={4} fill={S.ink2} />}
              {i < 2 && (
                <path d={`M${wx + 16} ${y + 20} L${wx + 26} ${y + 11} L${wx + 38} ${y + 18}`} fill="none" stroke={S.surface} strokeWidth="1.4" {...hair} />
              )}
              {i < 2 && [16, 26, 38].map((dx, k) => <circle key={k} cx={wx + dx} cy={y + [20, 11, 18][k]} r={3} fill={S.surface} />)}
              {i === 2 && (
                <g>
                  <rect x={wx + 8} y={y} width={40} height={32} rx={4} fill={S.surface} stroke={S.ink2} strokeWidth="1" strokeDasharray="3 2" {...hair} />
                  {[0, 1, 2, 3].map((k) => (
                    <line key={k} x1={wx + 10 + k * 10} y1={y + 30} x2={wx + 22 + k * 10} y2={y + 2} stroke={S.ink3} strokeWidth="1" {...hair} />
                  ))}
                </g>
              )}
              {i === 3 && <rect x={wx + 8} y={y} width={40} height={32} rx={4} fill="none" stroke={S.ruleStrong} strokeWidth="0.9" strokeDasharray="2 2" {...hair} />}
            </g>
          );
        })}
        {/* long-term memory */}
        <Link from={[wx + 60, 112]} to={[262, 112]} />
        <Link from={[262, 182]} to={[wx + 60, 182]} />
        <UiText x={328} y={50} weight={600} anchor="middle">
          Long-term memory
        </UiText>
        {[0, 1, 2].map((k) => (
          <g key={k}>
            <rect x={268 + k * 6} y={72 + k * 52} width={112} height={44} rx={6} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
            {schema(290 + k * 6, 92 + k * 52)}
          </g>
        ))}
        {detail && (
          <>
            <Marker x={8} y={44} n={1} />
            <Marker x={wx + 70} y={232} n={2} />
            <Marker x={wx - 12} y={slotY(0) + 16} n={3} />
            <Marker x={wx - 12} y={slotY(2) + 16} n={4} />
            <Marker x={392} y={78} n={5} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Recognition over recall                                              */
/* ------------------------------------------------------------------ */
export const recognitionOverRecallPlate: IllustrationEntry = {
  slug: "recognition-over-recall",
  title: "Recognition over recall plate",
  canvas: "sheet",
  animated: true,
  description:
    "The same task, exporting a report as a PDF, in two interfaces. On the left, marked with a cross, a command line offers only a prompt and a blinking caret: the person has to recall the exact command with no cue. On the right, marked with a tick, a File menu lists New, Open and Export as; Export as is open and shows PDF, PNG and CSV, and the pointer rests on PDF. Seeing the options lets the person recognise the one they want, because a presented item is itself a strong retrieval cue.",
  key: [
    { n: "1", label: "Recall", detail: "the person must produce the command from memory, with no cue" },
    { n: "2", label: "Recognition", detail: "visible options work as retrieval cues" },
    { n: "3", label: "Revealed in steps", detail: "a menu keeps options visible without showing everything at once" },
  ],
  Art: ({ detail, animate }) => (
    <g>
      <Verdict x={101} y={18} ok={false} />
      <Verdict x={299} y={18} ok />
      {/* recall: a bare prompt */}
      <UiFrame x={8} y={38} w={186} h={214}>
        <UiText x={14} y={30} weight={600}>
          Reports
        </UiText>
        <rect x={14} y={48} width={158} height={30} rx={5} fill={S.ink} />
        <UiText x={24} y={68} mono tone="surface">
          &gt;
        </UiText>
        <rect x={40} y={56} width={7} height={14} fill={S.surface} className={animate ? "anim-blink" : undefined} />
        <TextBar x={14} y={98} w={120} />
        <TextBar x={14} y={112} w={92} />
        <TextBar x={14} y={140} w={130} />
        <TextBar x={14} y={154} w={84} />
      </UiFrame>
      {/* recognition: a menu */}
      <UiFrame x={206} y={38} w={186} h={214}>
        <UiText x={14} y={30} weight={600}>
          File
        </UiText>
        {["New", "Open", "Export as"].map((t, i) => (
          <g key={t}>
            {i === 2 && <rect x={8} y={42 + i * 26} width={170} height={24} rx={4} fill={S.accentWash} />}
            <UiText x={16} y={59 + i * 26} weight={i === 2 ? 600 : 400}>
              {t}
            </UiText>
            {i === 2 && (
              <UiText x={168} y={59 + i * 26} anchor="end" tone="ink3">
                ▾
              </UiText>
            )}
          </g>
        ))}
        <line x1={24} y1={122} x2={24} y2={190} stroke={S.ruleStrong} strokeWidth="1" {...hair} />
        {["PDF", "PNG", "CSV"].map((t, i) => (
          <g key={t}>
            <rect x={32} y={124 + i * 24} width={92} height={21} rx={4} fill={i === 0 ? S.soft : "none"} stroke={i === 0 ? S.ink2 : "none"} strokeWidth="0.9" {...hair} />
            <UiText x={42} y={139 + i * 24} mono>
              {t}
            </UiText>
          </g>
        ))}
        <Pointer x={102} y={132} />
      </UiFrame>
      {detail && (
        <>
          <Marker x={8} y={100} n={1} />
          <Marker x={206} y={100} n={2} />
          <Marker x={392} y={190} n={3} to={[332, 190]} />
        </>
      )}
    </g>
  ),
};

/* ------------------------------------------------------------------ */
/* Gulfs of execution and evaluation                                    */
/* ------------------------------------------------------------------ */
export const gulfsPlate: IllustrationEntry = {
  slug: "gulfs-of-execution-and-evaluation",
  title: "Gulfs of execution and evaluation plate",
  canvas: "sheet",
  description:
    "A person's goal on the left, a heating app on the right, and a shaded gulf between them. The upper arrow, execution, runs from the goal (the room at 21 degrees) toward the app and is broken by the gulf: the person has to work out which actions the system allows. The lower arrow, evaluation, runs back from the app to the goal and is broken too: the person has to perceive and interpret what the system did. In the app, plus and minus buttons beside the temperature map directly onto the goal, which narrows execution, and the status line 'Heating to 21°' reports the new state, which narrows evaluation. People bridge the gulfs from their side as well, with effort and experience.",
  key: [
    { n: "1", label: "Gulf of execution", detail: "from what the person intends to the actions the system allows" },
    { n: "2", label: "Gulf of evaluation", detail: "from what the system shows to judging whether the goal was met" },
    { n: "3", label: "Visible, mapped controls", detail: "narrow execution from the system's side" },
    { n: "4", label: "Feedback that states the new state", detail: "narrows evaluation" },
  ],
  Art: ({ detail }) => (
    <g>
      {/* the gulf */}
      <rect x={150} y={24} width={40} height={252} rx={6} fill={S.sunken} />
      <path d="M150 24 V276 M190 24 V276" stroke={S.ruleStrong} strokeWidth="0.8" strokeDasharray="3 3" {...hair} />
      {/* goal */}
      <Card x={8} y={104} w={124} h={92} tone="soft">
        <UiText x={20} y={128} mono tone="ink3">
          GOAL
        </UiText>
        <UiText x={20} y={156} size={T.strong} weight={700}>
          Room at
        </UiText>
        <UiText x={20} y={178} size={T.strong} weight={700}>
          21°
        </UiText>
      </Card>
      {/* execution and evaluation, each broken by the gulf */}
      <path d="M70 104 Q 74 64 144 62" fill="none" stroke={S.ink} strokeWidth="1.4" {...hair} />
      <Link from={[196, 62]} to={[236, 62]} width={1.4} />
      <path d="M236 238 L196 238" fill="none" stroke={S.ink} strokeWidth="1.4" {...hair} />
      <Link from={[144, 238]} via={[74, 236]} to={[70, 200]} width={1.4} />
      {/* the app */}
      <UiFrame x={240} y={24} w={152} h={252}>
        <UiText x={12} y={26} weight={600}>
          Heating
        </UiText>
        <UiText x={76} y={92} size={34} weight={600} anchor="middle">
          18°
        </UiText>
        <rect x={14} y={108} width={36} height={32} rx={8} fill={S.surface} stroke={S.control} strokeWidth="1" {...hair} />
        <UiText x={32} y={130} size={T.strong} weight={600} anchor="middle">
          −
        </UiText>
        <rect x={102} y={108} width={36} height={32} rx={8} fill={S.ink} />
        <UiText x={120} y={130} size={T.strong} weight={600} anchor="middle" tone="surface">
          +
        </UiText>
        <rect x={10} y={162} width={132} height={30} rx={6} fill={S.okWash} stroke={S.ok} strokeWidth="0.9" {...hair} />
        <UiText x={20} y={182} tone="ok" weight={600}>
          Heating to 21°
        </UiText>
        <TextBar x={14} y={208} w={100} />
      </UiFrame>
      {detail && (
        <>
          <Marker x={170} y={62} n={1} />
          <Marker x={170} y={238} n={2} />
          <Marker x={392} y={148} n={3} to={[380, 148]} />
          <Marker x={392} y={202} n={4} to={[382, 202]} />
        </>
      )}
    </g>
  ),
};

/* ------------------------------------------------------------------ */
/* Jakob's law: conventions learned elsewhere                           */
/* ------------------------------------------------------------------ */
function Basket({ x, y }: { x: number; y: number }) {
  return <path d={`M${x} ${y} h3 l3 10 h10 l2.5 -7 h-14`} fill="none" stroke={S.ink} strokeWidth="1.3" {...hair} />;
}
function Site({ x, y, w, h, novel = false }: { x: number; y: number; w: number; h: number; novel?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={6} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
      <rect x={x} y={y} width={w} height={26} rx={6} fill={S.soft} />
      {novel ? (
        <>
          <rect x={x + w / 2 - 9} y={y + 7} width={18} height={12} rx={2} fill={S.ink} />
          <circle cx={x + 16} cy={y + 13} r={5} fill="none" stroke={S.ink3} strokeWidth="1.2" {...hair} />
          <Basket x={x + 10} y={y + h - 22} />
        </>
      ) : (
        <>
          <rect x={x + 8} y={y + 7} width={18} height={12} rx={2} fill={S.ink} />
          <rect x={x + 34} y={y + 7} width={w - 74} height={12} rx={6} fill={S.surface} stroke={S.control} strokeWidth="0.8" {...hair} />
          <circle cx={x + 42} cy={y + 13} r={3} fill="none" stroke={S.ink3} strokeWidth="1" {...hair} />
          <Basket x={x + w - 30} y={y + 7} />
        </>
      )}
      {[0, 1, 2].map((r) => (
        <TextBar key={r} x={x + 10} y={y + 38 + r * 12} w={[w * 0.55, w * 0.7, w * 0.4][r]} />
      ))}
    </g>
  );
}

export const jakobsLawPlate: IllustrationEntry = {
  slug: "jakobs-law",
  title: "Jakob's law plate",
  canvas: "sheet",
  description:
    "Across the top, three other shops a person uses every day share the same conventions: logo at the top left, a search field across the top and a basket at the top right. Below, two versions of your shop. The left one, marked with a tick, follows those conventions, so what people learned elsewhere transfers. The right one, marked with a cross, centres the logo, hides search behind an unlabelled icon and moves the basket to the bottom left, so people have to relearn where things are. Jakob's law is a design principle about learned expectations, not a law with a measured effect size; breaking a convention can be worth it when the gain is clear.",
  key: [
    { n: "1", label: "Other products", detail: "where people spend most of their time, and learn what to expect" },
    { n: "2", label: "Shared conventions", detail: "logo top left, search at the top, basket top right" },
    { n: "3", label: "Following them", detail: "learning transfers, so the new site feels familiar" },
    { n: "4", label: "Breaking them", detail: "people must relearn; worth it only when the change clearly helps" },
  ],
  Art: ({ detail }) => (
    <g>
      {[8, 140, 272].map((x) => (
        <Site key={x} x={x} y={10} w={120} h={88} />
      ))}
      <Verdict x={101} y={116} ok />
      <Verdict x={299} y={116} ok={false} />
      <Site x={8} y={134} w={186} h={150} />
      <Site x={206} y={134} w={186} h={150} novel />
      {detail && (
        <>
          <Marker x={8} y={10} n={1} />
          <Marker x={352} y={116} n={2} to={[370, 30]} />
          <Marker x={8} y={134} n={3} />
          <Marker x={260} y={262} n={4} to={[236, 262]} />
        </>
      )}
    </g>
  ),
};

/* ------------------------------------------------------------------ */
/* Progressive disclosure                                               */
/* ------------------------------------------------------------------ */
export const progressiveDisclosurePlate: IllustrationEntry = {
  slug: "progressive-disclosure",
  title: "Progressive disclosure plate",
  canvas: "sheet",
  description:
    "The same Export dialog in two states. On the left, collapsed: Format (PDF) and Pages (All), the options most people need, then a clearly labelled 'Advanced options' control and the Export button. On the right, the same dialog after the control is opened: the essential options stay where they were and three advanced settings appear beneath them, colour profile, compression and bleed, without leaving the dialog. Progressive disclosure keeps the first view simple; the risk is that people who need a hidden option cannot find it, so the control must say what it reveals.",
  key: [
    { n: "1", label: "Essential options first", detail: "what most people need, every time" },
    { n: "2", label: "A labelled disclosure control", detail: "says what it reveals" },
    { n: "3", label: "Advanced options on request", detail: "in the same dialog, one step away" },
  ],
  Art: ({ detail }) => {
    const frame = (x: number, open: boolean) => (
      <UiFrame x={x} y={8} w={186} h={284}>
        <UiText x={14} y={26} size={T.strong} weight={600}>
          Export
        </UiText>
        <UiField x={14} y={46} w={158} label="Format" value="PDF" />
        <UiField x={14} y={100} w={158} label="Pages" value="All" />
        <UiText x={14} y={172} weight={600} tone="accent">
          {open ? "▾ Advanced options" : "▸ Advanced options"}
        </UiText>
        {open &&
          ["Colour profile", "Compression", "Bleed"].map((t, i) => (
            <g key={t}>
              <UiText x={22} y={190 + i * 18} tone="ink2">
                {t}
              </UiText>
              <rect x={130} y={179 + i * 18} width={42} height={15} rx={3} fill={S.surface} stroke={S.control} strokeWidth="0.8" {...hair} />
            </g>
          ))}
        {open && <line x1={14} y1={178} x2={14} y2={230} stroke={S.ruleStrong} strokeWidth="1" {...hair} />}
        <UiButton x={92} y={236} w={80} label="Export" />
      </UiFrame>
    );
    return (
      <g>
        {frame(8, false)}
        {frame(206, true)}
        {detail && (
          <>
            <Marker x={8} y={110} n={1} />
            <Marker x={194} y={196} n={2} to={[160, 182]} />
            <Marker x={392} y={222} n={3} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Nielsen's ten usability heuristics                                   */
/* ------------------------------------------------------------------ */
const HEURISTICS = [
  "Visibility of system status",
  "Match between system and the real world",
  "User control and freedom",
  "Consistency and standards",
  "Error prevention",
  "Recognition rather than recall",
  "Flexibility and efficiency of use",
  "Aesthetic and minimalist design",
  "Help users recognize, diagnose, and recover from errors",
  "Help and documentation",
];
const SHOWN: Record<number, string> = {
  1: "drawn: 'Saved · 10:42'",
  3: "drawn: Undo",
  5: "drawn: the past date cannot be chosen",
  9: "drawn: the error says what to fix",
  10: "drawn: help beside the field that needs it",
};

export const nielsenHeuristicsPlate: IllustrationEntry = {
  slug: "nielsen-usability-heuristics",
  title: "Nielsen's usability heuristics plate",
  canvas: "sheet",
  description:
    "A column of ten numbered tabs, one for each of Nielsen's usability heuristics, beside an event-editing screen on which five of them can be seen at work. Tabs 1, 3, 5, 9 and 10 are highlighted. On the screen: a status line 'Saved · 10:42' (1, visibility of system status); an Undo button (3, user control and freedom); a row of dates in which the past date is struck through and cannot be chosen (5, error prevention); an end-time field in an error state with a message saying what to fix (9, help users recover from errors); and a help icon beside that field (10, help and documentation). The heuristics are broad rules of thumb for inspection, not a validated checklist.",
  key: HEURISTICS.map((h, i) => ({ n: String(i + 1), label: h, detail: SHOWN[i + 1] })),
  Art: ({ detail }) => (
    <g>
      {HEURISTICS.map((_, i) => {
        const on = [1, 3, 5, 9, 10].includes(i + 1);
        const y = 10 + i * 28.4;
        return (
          <g key={i}>
            <rect x={8} y={y} width={40} height={24} rx={5} fill={on ? S.accentWash : S.surface} stroke={on ? S.accent : S.ruleStrong} strokeWidth={on ? 1.2 : 0.8} {...hair} />
            <UiText x={28} y={y + 17} mono weight={on ? 700 : 400} anchor="middle" tone={on ? "accent" : "ink3"}>
              {i + 1}
            </UiText>
          </g>
        );
      })}
      <UiFrame x={62} y={10} w={330} h={280}>
        <UiText x={16} y={30} size={T.strong} weight={600}>
          Edit event
        </UiText>
        <UiText x={314} y={30} anchor="end" tone="ink3">
          Saved · 10:42
        </UiText>
        <UiButton x={16} y={44} w={66} label="Undo" variant="secondary" />
        <UiText x={16} y={96} tone="ink2" weight={600}>
          Date
        </UiText>
        {["11", "12", "13", "14"].map((d, i) => (
          <UiChip key={d} x={16 + i * 52} y={104} w={44} label={d} disabled={i === 0} selected={i === 1} />
        ))}
        <UiField x={16} y={144} w={190} label="Ends" value="09:30" state="error" />
        <UiText x={16} y={212} tone="error">
          Must end after 10:00
        </UiText>
        <circle cx={226} cy={176} r={10} fill={S.surface} stroke={S.ink2} strokeWidth="1" {...hair} />
        <UiText x={226} y={181} weight={700} anchor="middle" tone="ink2">
          ?
        </UiText>
        <UiButton x={226} y={226} w={88} label="Save" />
      </UiFrame>
      {detail && (
        <>
          <Marker x={390} y={84} n={1} to={[372, 66]} />
          <Marker x={168} y={89} n={3} to={[146, 89]} />
          <Marker x={300} y={148} n={5} to={[280, 148]} />
          <Marker x={232} y={240} n={9} to={[214, 240]} />
          <Marker x={318} y={208} n={10} to={[300, 208]} />
        </>
      )}
    </g>
  ),
};

/* ------------------------------------------------------------------ */
/* Heuristic evaluation: independent first, then merged                 */
/* ------------------------------------------------------------------ */
const FOUND = [
  [1, 2, 4],
  [2, 5, 7],
  [3, 4, 8],
];

export const heuristicEvaluationPlate: IllustrationEntry = {
  slug: "heuristic-evaluation",
  title: "Heuristic evaluation plate",
  canvas: "sheet",
  description:
    "An illustrative evaluation with three evaluators and eight possible problems, P1 to P8. On the left, each evaluator's card shows a row of eight cells with the problems that person found filled in: evaluator A found P1, P2 and P4; B found P2, P5 and P7; C found P3, P4 and P8. Each worked alone against the heuristics. Arrows lead to one merged, de-duplicated list on the right, where seven problems are listed and P6, found by nobody, is drawn dashed. Beneath the list, a 0 to 4 severity scale stands for rating each problem independently before combining ratings. The numbers are an example, not data; the point is that evaluators find different problems and even the merged list misses some, which usability testing then checks.",
  key: [
    { n: "1", label: "Independent inspection", detail: "each evaluator works alone against the heuristics" },
    { n: "2", label: "Different evaluators, different problems", detail: "few problems are found by everyone" },
    { n: "3", label: "Merge into one list", detail: "de-duplicated across evaluators" },
    { n: "4", label: "Rate severity", detail: "independently, then combine the ratings" },
    { n: "5", label: "Still missed", detail: "confirm the findings, and look for more, with users" },
  ],
  Art: ({ detail }) => (
    <g>
      {FOUND.map((f, k) => {
        const y = 14 + k * 92;
        return (
          <g key={k}>
            <Card x={8} y={y} w={156} h={78} title={`Evaluator ${"ABC"[k]}`}>
              {Array.from({ length: 8 }, (_, i) => (
                <rect key={i} x={20 + i * 17} y={y + 40} width={13} height={13} rx={2.5} fill={f.includes(i + 1) ? S.ink : S.surface} stroke={S.ink2} strokeWidth="0.8" {...hair} />
              ))}
              <UiText x={20} y={y + 70} tone="ink3">
                {`${f.length} of 8`}
              </UiText>
            </Card>
            <Link from={[166, y + 46]} via={[184, y + 46]} to={[200, 140 + (k - 1) * 30]} tone="mute" />
          </g>
        );
      })}
      <Card x={204} y={14} w={188} h={224} title="Merged list">
        {Array.from({ length: 8 }, (_, i) => {
          const y = 48 + i * 23;
          const missed = i === 5;
          return (
            <g key={i}>
              <rect x={212} y={y - 4} width={172} height={20} rx={4} fill={missed ? "none" : S.soft} stroke={missed ? S.ink3 : "none"} strokeWidth="0.9" strokeDasharray={missed ? "3 2.4" : undefined} {...hair} />
              <UiText x={220} y={y + 11} mono tone={missed ? "ink3" : "ink"}>
                {`P${i + 1}`}
              </UiText>
              {missed ? (
                <UiText x={250} y={y + 11} tone="ink3">
                  missed
                </UiText>
              ) : (
                <TextBar x={250} y={y + 4} w={[90, 70, 104, 84, 0, 0, 96, 76][i] || 80} />
              )}
            </g>
          );
        })}
      </Card>
      <UiText x={204} y={268} tone="ink3">
        severity
      </UiText>
      {[0, 1, 2, 3, 4].map((v) => (
        <g key={v}>
          <rect x={256 + v * 25} y={252} width={21} height={22} rx={4} fill={S.surface} stroke={S.ink2} strokeWidth="0.9" {...hair} />
          <UiText x={266.5 + v * 25} y={268} mono anchor="middle">
            {v}
          </UiText>
        </g>
      ))}
      {detail && (
        <>
          <Marker x={8} y={14} n={1} />
          <Marker x={164} y={106} n={2} />
          <Marker x={392} y={14} n={3} />
          <Marker x={392} y={262} n={4} />
          <Marker x={392} y={169} n={5} to={[384, 169]} />
        </>
      )}
    </g>
  ),
};

/* ------------------------------------------------------------------ */
/* System Usability Scale: ten items to one 0–100 score                 */
/* ------------------------------------------------------------------ */
const SUS_EXAMPLE = [4, 2, 5, 1, 4, 2, 4, 1, 5, 2];

export const susPlate: IllustrationEntry = {
  slug: "system-usability-scale",
  title: "System Usability Scale plate",
  canvas: "sheet",
  description: `A completed SUS questionnaire on the left: ten statements (their wording replaced by bars) alternate between positively worded odd items and negatively worded even items, each answered on a five-point agreement scale. On the right, the conversion: odd items score the response minus 1, even items score 5 minus the response, and the sum is multiplied by 2.5. These illustrative responses give a score of ${susScore(SUS_EXAMPLE).score}, marked on a 0 to 100 bar. The score is not a percentage; it is read against published benchmarks.`,
  key: [
    { n: "1", label: "Ten statements", detail: "odd items positively worded, even items negatively worded" },
    { n: "2", label: "Five-point agreement scale", detail: "strongly disagree to strongly agree" },
    { n: "3", label: "Convert and sum", detail: "odd: response − 1; even: 5 − response; total × 2.5" },
    { n: "4", label: "A 0–100 score, not a percentage", detail: "read it against published benchmarks" },
  ],
  Art: ({ detail }) => {
    const { score } = susScore(SUS_EXAMPLE);
    const gx = (v: number) => 248 + (v / 100) * 136;
    return (
      <g>
        <Card x={8} y={10} w={222} h={280}>
          {SUS_EXAMPLE.map((r, i) => {
            const y = 32 + i * 26;
            return (
              <g key={i}>
                <UiText x={18} y={y + 5} mono tone={i % 2 ? "ink3" : "ink"}>
                  {String(i + 1).padStart(2, "0")}
                </UiText>
                <TextBar x={44} y={y} w={i % 2 ? 46 : 58} strong={i % 2 === 0} />
                {[1, 2, 3, 4, 5].map((v) => (
                  <circle key={v} cx={126 + (v - 1) * 20} cy={y + 1} r={6} fill={v === r ? S.ink : S.surface} stroke={S.ink2} strokeWidth="0.9" {...hair} />
                ))}
              </g>
            );
          })}
        </Card>
        <UiText x={248} y={40} mono>
          odd: r − 1
        </UiText>
        <UiText x={248} y={64} mono>
          even: 5 − r
        </UiText>
        <UiText x={248} y={88} mono>
          sum × 2.5
        </UiText>
        <line x1={248} y1={104} x2={384} y2={104} stroke={S.rule} strokeWidth="1" {...hair} />
        <UiText x={248} y={150} size={40} weight={700}>
          {score}
        </UiText>
        <rect x={248} y={196} width={136} height={12} rx={6} fill={S.sunken} />
        <rect x={248} y={196} width={gx(score) - 248} height={12} rx={6} fill={S.ink} />
        <line x1={gx(score)} y1={188} x2={gx(score)} y2={216} stroke={S.ink} strokeWidth="1.4" {...hair} />
        <UiText x={248} y={234} mono tone="ink3">
          0
        </UiText>
        <UiText x={384} y={234} mono tone="ink3" anchor="end">
          100
        </UiText>
        {detail && (
          <>
            <Marker x={8} y={10} n={1} />
            <Marker x={226} y={10} n={2} />
            <Marker x={392} y={64} n={3} />
            <Marker x={392} y={170} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Working memory model (Baddeley and Hitch; episodic buffer 2000)      */
/* ------------------------------------------------------------------ */
export const workingMemoryModelPlate: IllustrationEntry = {
  slug: "working-memory-model",
  title: "Working memory model plate",
  canvas: "sheet",
  description:
    "The multicomponent working memory model as a structure of boxes. At the top, the central executive, which directs attention, with a focus ring as its symbol. Beneath it, three components joined to it: the phonological loop on the left, holding the digits 7 3 9 in a rehearsal loop; the episodic buffer in the middle, binding a number and a place into one episode; and the visuospatial sketchpad on the right, holding a small map with a route. Along the bottom, long-term memory, linked to all three. The episodic buffer was added by Baddeley in 2000. The model describes functional components, not places in the brain.",
  key: [
    { n: "1", label: "Central executive", detail: "directs attention and coordinates the other parts; it stores nothing itself" },
    { n: "2", label: "Phonological loop", detail: "holds speech-based information, refreshed by rehearsal" },
    { n: "3", label: "Episodic buffer", detail: "added in 2000; binds information into integrated episodes" },
    { n: "4", label: "Visuospatial sketchpad", detail: "holds visual and spatial information" },
    { n: "5", label: "Long-term memory", detail: "language, visual knowledge and episodes the components draw on" },
  ],
  Art: ({ detail }) => {
    const box = (x: number, l1: string, l2: string) => (
      <g>
        <rect x={x} y={104} width={124} height={108} rx={8} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        <UiText x={x + 62} y={126} weight={600} anchor="middle">
          {l1}
        </UiText>
        <UiText x={x + 62} y={143} weight={600} anchor="middle">
          {l2}
        </UiText>
      </g>
    );
    return (
      <g>
        {/* central executive */}
        <rect x={120} y={12} width={160} height={56} rx={8} fill={S.soft} stroke={S.ink} strokeWidth="1.2" {...hair} />
        <circle cx={146} cy={40} r={11} fill="none" stroke={S.accent} strokeWidth="1.6" {...hair} />
        <circle cx={146} cy={40} r={3.5} fill={S.accent} />
        <UiText x={166} y={45} weight={600}>
          Central executive
        </UiText>
        {[70, 200, 330].map((x) => (
          <line key={x} x1={200} y1={68} x2={x} y2={104} stroke={S.ink2} strokeWidth="1" {...hair} />
        ))}
        {box(8, "Phonological", "loop")}
        {box(138, "Episodic", "buffer")}
        {box(268, "Visuospatial", "sketchpad")}
        {/* loop: digits rehearsed */}
        <path d="M34 186 A 36 14 0 1 1 106 186" fill="none" stroke={S.ink3} strokeWidth="1" {...hair} />
        <polygon points={head(34, 186, -2, 6)} fill={S.ink3} />
        <UiText x={70} y={180} mono weight={600} anchor="middle">
          7 3 9
        </UiText>
        {/* buffer: a bound episode */}
        <rect x={156} y={156} width={88} height={40} rx={6} fill={S.accentWash} stroke={S.accent} strokeWidth="1" {...hair} />
        <UiText x={168} y={181} mono weight={600}>
          739
        </UiText>
        <path d="M222 168 a6 6 0 1 1 0.01 0 M222 174 l0 10" fill="none" stroke={S.accentInk} strokeWidth="1.3" {...hair} />
        {/* sketchpad: map and route */}
        <rect x={286} y={156} width={88} height={44} rx={4} fill={S.soft} stroke={S.rule} strokeWidth="0.8" {...hair} />
        <path d="M292 192 L312 176 L332 184 L356 164 L368 170" fill="none" stroke={S.ink} strokeWidth="1.4" {...hair} />
        <circle cx={368} cy={170} r={3} fill={S.ink} />
        {/* long-term memory */}
        <rect x={8} y={240} width={384} height={48} rx={8} fill={S.sunken} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        <UiText x={200} y={269} weight={600} anchor="middle">
          Long-term memory
        </UiText>
        {[70, 200, 330].map((x) => (
          <g key={x}>
            <line x1={x} y1={212} x2={x} y2={240} stroke={S.ink2} strokeWidth="1" {...hair} />
            <polygon points={head(x, 240, 0, 1, 5)} fill={S.ink2} />
            <polygon points={head(x, 212, 0, -1, 5)} fill={S.ink2} />
          </g>
        ))}
        {detail && (
          <>
            <Marker x={290} y={20} n={1} />
            <Marker x={8} y={104} n={2} />
            <Marker x={262} y={104} n={3} />
            <Marker x={392} y={104} n={4} />
            <Marker x={392} y={240} n={5} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Hick-Hyman law: information in bits, reaction time linear in bits    */
/* ------------------------------------------------------------------ */
export const hickHymanPlate: IllustrationEntry = {
  slug: "hick-hyman-law",
  title: "Hick-Hyman law plate",
  canvas: "sheet",
  animated: true,
  explorer: "hick",
  description:
    "On the left, three sets of equally likely choices: 2, 4 and 8 alternatives, each beside the information it carries, log₂ n: 1, 2 and 3 bits. On the right, a graph of reaction time against information in bits, with the three sets as points on a straight line: RT = a + b · H. Each doubling of the alternatives adds one bit and so a constant step of time. The constants a and b are fitted to measured data, and the law applies when people know which response goes with which stimulus, not when they search an unfamiliar list.",
  key: [
    { n: "1", label: "n equally likely alternatives", detail: "carry H = log₂ n bits of information" },
    { n: "2", label: "Each doubling adds one bit", detail: "2 → 4 → 8 choices is 1 → 2 → 3 bits" },
    { n: "3", label: "RT = a + b · H", detail: "a straight line in bits; a and b are fitted to data" },
    { n: "4", label: "Known mappings only", detail: "it predicts deciding, not searching an unfamiliar list" },
  ],
  Art: ({ detail, animate }) => {
    const sets = [2, 4, 8].map((n) => ({ n, bits: hickInformationEqual(n) }));
    const gx = (b: number) => 232 + b * 48;
    const gy = (b: number) => 230 - (30 + b * 50);
    return (
      <g>
        {sets.map(({ n, bits }, k) => {
          const y = 22 + k * 88;
          return (
            <g key={n}>
              <UiText x={8} y={y + 14} mono tone="ink3">
                {`n = ${n}`}
              </UiText>
              {Array.from({ length: n }, (_, i) => (
                <rect key={i} x={8 + (i % 4) * 30} y={y + 24 + Math.floor(i / 4) * 30} width={24} height={24} rx={5} fill={i === 0 ? S.ink : S.surface} stroke={S.ink2} strokeWidth="0.9" {...hair} />
              ))}
              <UiText x={206} y={y + 44} mono weight={600} anchor="end">
                {`${bits} bit${bits === 1 ? "" : "s"}`}
              </UiText>
            </g>
          );
        })}
        {/* graph */}
        <line x1={232} y1={230} x2={392} y2={230} stroke={S.ink2} strokeWidth="1" {...hair} />
        <line x1={232} y1={230} x2={232} y2={30} stroke={S.ink2} strokeWidth="1" {...hair} />
        <UiText x={226} y={40} mono tone="ink3" anchor="end">
          RT
        </UiText>
        <UiText x={312} y={274} mono tone="ink3" anchor="middle">
          H (bits)
        </UiText>
        {[0, 1, 2, 3].map((b) => (
          <UiText key={b} x={gx(b)} y={250} mono tone="ink3" anchor="middle">
            {b}
          </UiText>
        ))}
        <line x1={gx(0)} y1={gy(0)} x2={gx(3.2)} y2={gy(3.2)} stroke={S.ink} strokeWidth="1.4" {...hair} />
        {sets.map(({ bits }, k) => (
          <circle key={k} cx={gx(bits)} cy={gy(bits)} r={6} fill={S.accent} stroke={S.surface} strokeWidth="1.5" className={animate ? `anim-pulse anim-delay-${k + 1}` : undefined} {...hair} />
        ))}
        <UiText x={gx(0) + 6} y={gy(0) + 18} mono tone="ink3">
          a
        </UiText>
        {detail && (
          <>
            <Marker x={140} y={22} n={1} />
            <Marker x={140} y={198} n={2} />
            <Marker x={300} y={120} n={3} />
            <Marker x={392} y={30} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Steering law: difficulty grows linearly with length / width         */
/* ------------------------------------------------------------------ */
const TUNNELS = [
  { A: 120, W: 40, y: 34 },
  { A: 240, W: 20, y: 124 },
];

export const steeringLawPlate: IllustrationEntry = {
  slug: "steering-law",
  title: "Steering law plate",
  canvas: "sheet",
  animated: true,
  description: `Two straight tunnels a pointer must travel along without leaving the edges. The upper one is ${TUNNELS[0].A} units long and ${TUNNELS[0].W} wide, an index of difficulty A / W = ${steeringId([{ length: TUNNELS[0].A, width: TUNNELS[0].W }])}; the lower one is twice as long and half as wide, ID = ${steeringId([{ length: TUNNELS[1].A, width: TUNNELS[1].W }])}, four times harder, because difficulty grows linearly with length over width rather than logarithmically as in Fitts's law. Below, a cascading menu: moving from 'Share' sideways into its submenu is steering along a narrow horizontal tunnel, where a small vertical slip opens the wrong submenu.`,
  key: [
    { n: "1", label: "A: path length", detail: "how far the pointer must travel inside the tunnel" },
    { n: "2", label: "W: path width", detail: "how far it may stray without leaving" },
    { n: "3", label: "ID = A / W", detail: "linear: twice as long and half as wide is four times as hard" },
    { n: "4", label: "Cascading menus are tunnels", detail: "wider items or a short delay make the sideways move easier" },
  ],
  Art: ({ detail, animate }) => {
    const x0 = 40;
    return (
      <g>
        {TUNNELS.map((t, i) => {
          const id = steeringId([{ length: t.A, width: t.W }]);
          const path = `M${x0} ${t.y + t.W / 2} H${x0 + t.A}`;
          return (
            <g key={i}>
              <rect x={x0} y={t.y} width={t.A} height={t.W} fill={S.soft} stroke={S.ink2} strokeWidth="1" {...hair} />
              <path d={path} stroke={S.ink3} strokeWidth="1" strokeDasharray="1 5" {...hair} />
              <g style={animate ? { offsetPath: `path("${path}")`, offsetRotate: "0deg" } : undefined} className={animate ? "anim-travel" : undefined}>
                <circle cx={animate ? 0 : x0 + t.A * 0.6} cy={animate ? 0 : t.y + t.W / 2} r={4.5} fill={S.ink} />
              </g>
              <UiText x={x0 + t.A + 14} y={t.y + t.W / 2 + 5} mono weight={600}>
                {`${t.A} / ${t.W} = ${id}`}
              </UiText>
              {i === 1 && (
                <>
                  <line x1={x0} y1={t.y + t.W + 10} x2={x0 + t.A} y2={t.y + t.W + 10} stroke={S.ink} strokeWidth="1" {...hair} />
                  <UiText x={x0 + t.A / 2} y={t.y + t.W + 26} mono anchor="middle">
                    A
                  </UiText>
                  <line x1={x0 - 10} y1={t.y} x2={x0 - 10} y2={t.y + t.W} stroke={S.ink} strokeWidth="1" {...hair} />
                  <UiText x={x0 - 16} y={t.y + t.W / 2 + 5} mono anchor="end">
                    W
                  </UiText>
                </>
              )}
            </g>
          );
        })}
        {/* cascading menu */}
        <rect x={40} y={194} width={128} height={96} rx={6} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        {["Open", "Share", "Rename"].map((t, i) => (
          <g key={t}>
            {i === 1 && <rect x={44} y={226} width={120} height={26} rx={4} fill={S.accentWash} />}
            <UiText x={54} y={216 + i * 30} weight={i === 1 ? 600 : 400}>
              {t}
            </UiText>
          </g>
        ))}
        <UiText x={152} y={246} tone="ink3" anchor="end">
          ›
        </UiText>
        <rect x={168} y={226} width={120} height={64} rx={6} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        <TextBar x={180} y={242} w={70} />
        <TextBar x={180} y={266} w={56} />
        <rect x={110} y={228} width={70} height={22} fill="none" stroke={S.accent} strokeWidth="1.2" strokeDasharray="3 2.4" {...hair} />
        <Link from={[116, 239]} to={[176, 239]} tone="accent" />
        {detail && (
          <>
            <Marker x={x0 + 160} y={TUNNELS[1].y + 52} n={1} />
            <Marker x={16} y={TUNNELS[1].y + 46} n={2} to={[30, TUNNELS[1].y + 16]} />
            <Marker x={392} y={TUNNELS[0].y + 20} n={3} />
            <Marker x={300} y={214} n={4} to={[182, 228]} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Keystroke-Level Model: a method as a sum of operator times           */
/* ------------------------------------------------------------------ */
const KLM_SEQUENCE = "M P BB H M 10K";

export const klmPlate: IllustrationEntry = {
  slug: "keystroke-level-model",
  title: "Keystroke-Level Model plate",
  canvas: "sheet",
  description: (() => {
    const { total } = klmTotal(parseKlm(KLM_SEQUENCE));
    return `Renaming a file, broken into Keystroke-Level Model operators and drawn as a timeline whose segment lengths are the standard operator times. Above, the screen: a file row, the pointer clicking it, and the name field being typed. Below, the method ${KLM_SEQUENCE}: M, mentally prepare (1.35 s); P, point to the file (1.1 s); BB, press and release the button (0.2 s); H, move the hands to the keyboard (0.4 s); M again; and 10K, nine letters and Enter at 0.28 s each. The predicted time is the sum, ${total.toFixed(1)} s, for an expert making no errors. The unit times date from the original studies and differ on modern devices.`;
  })(),
  key: [
    { n: "1", label: "M: mental preparation", detail: "1.35 s, placed by heuristic rules" },
    { n: "2", label: "P: point with a mouse", detail: "1.1 s on average" },
    { n: "3", label: "B and H", detail: "button press or release 0.1 s each; homing the hands 0.4 s" },
    { n: "4", label: "K: keystroke", detail: "0.28 s for an average typist; faster typists are quicker" },
    { n: "5", label: "Total = sum of operator times", detail: "error-free expert time for this method" },
  ],
  Art: ({ detail }) => {
    const steps = parseKlm(KLM_SEQUENCE);
    const { total } = klmTotal(steps);
    const x0 = 12;
    const span = 376;
    let acc = 0;
    const segs = steps.map((s) => {
      const t = s.seconds * s.count;
      const seg = { op: s.op, count: s.count, x: x0 + (acc / total) * span, w: (t / total) * span, t };
      acc += t;
      return seg;
    });
    return (
      <g>
        {/* the screen */}
        <UiFrame x={8} y={10} w={384} h={118}>
          <rect x={12} y={14} width={228} height={30} rx={5} fill={S.soft} />
          <rect x={22} y={21} width={14} height={16} rx={2} fill={S.ink3} />
          <UiText x={46} y={34}>
            report-q3.pdf
          </UiText>
          <Pointer x={150} y={30} />
          <rect x={12} y={56} width={228} height={30} rx={5} fill={S.surface} stroke={S.accent} strokeWidth="1.4" {...hair} />
          <UiText x={22} y={76} mono>
            summary_
          </UiText>
          <rect x={256} y={18} width={110} height={68} rx={6} fill={S.soft} stroke={S.rule} strokeWidth="0.8" {...hair} />
          {[0, 1, 2].map((r) => (
            <rect key={r} x={266 + r * 32} y={44} width={26} height={18} rx={3} fill={S.surface} stroke={S.ink3} strokeWidth="0.8" {...hair} />
          ))}
        </UiFrame>
        {/* the timeline */}
        {segs.map((g, i) => (
          <g key={i}>
            <rect x={g.x} y={160} width={Math.max(g.w - 1.5, 1)} height={36} rx={3} fill={g.op === "M" ? S.accentWash : g.op === "K" ? S.ink2 : S.soft} stroke={g.op === "M" ? S.accent : S.ink2} strokeWidth="0.9" {...hair} />
            {g.w > 30 && (
              <UiText x={g.x + g.w / 2} y={183} mono weight={600} anchor="middle" tone={g.op === "K" ? "surface" : "ink"}>
                {g.count > 1 ? `${g.count}${g.op}` : g.op}
              </UiText>
            )}
          </g>
        ))}
        {/* labels for the narrow segments */}
        {segs
          .filter((g) => g.w <= 30)
          .map((g, i) => (
            <g key={i}>
              <line x1={g.x + g.w / 2} y1={160} x2={g.x + g.w / 2} y2={i % 2 ? 138 : 150} stroke={S.ink3} strokeWidth="0.8" {...hair} />
              <UiText x={g.x + g.w / 2 + (i % 2 ? 4 : -4)} y={i % 2 ? 134 : 146} mono anchor={i % 2 ? "start" : "end"}>
                {g.count > 1 ? `${g.count}${g.op}` : g.op}
              </UiText>
            </g>
          ))}
        <line x1={x0} y1={214} x2={x0 + span} y2={214} stroke={S.ink} strokeWidth="1" {...hair} />
        <path d={`M${x0} 208 V220 M${x0 + span} 208 V220`} stroke={S.ink} strokeWidth="1" {...hair} />
        <UiText x={x0} y={240} mono tone="ink3">
          0 s
        </UiText>
        <UiText x={x0 + span} y={262} size={T.strong} mono weight={700} anchor="end">
          {`T = ${total.toFixed(1)} s`}
        </UiText>
        {detail && (
          <>
            <Marker x={segs[0].x + segs[0].w / 2} y={206} n={1} />
            <Marker x={segs[1].x + segs[1].w / 2} y={206} n={2} />
            <Marker x={segs[3].x + 44} y={144} n={3} />
            <Marker x={segs[5].x + segs[5].w / 2} y={206} n={4} />
            <Marker x={210} y={256} n={5} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Gestalt principles: one set of items, four grouping cues             */
/* ------------------------------------------------------------------ */
export const gestaltPlate: IllustrationEntry = {
  slug: "gestalt-principles",
  title: "Gestalt principles plate",
  canvas: "sheet",
  explorer: "gestalt",
  description:
    "The same six interface chips, in two rows of three, drawn four times with a different grouping cue each time. Proximity: the gap between the rows is larger than the gaps within them, so they read as two rows. Similarity: the spacing is even, but the chips in the first column are filled and the others outlined, so the filled ones read as a group. Common region: even spacing, with a shared box around the first two columns, which read as one group. Connectedness: even spacing, with lines joining pairs of chips, which read as pairs. Cues can compete; the plate isolates one at a time.",
  key: [
    { n: "1", label: "Proximity", detail: "items closer to each other than to the rest read as a group" },
    { n: "2", label: "Similarity", detail: "items alike in fill, shape or colour read as a group" },
    { n: "3", label: "Common region", detail: "items inside a shared boundary read as a group" },
    { n: "4", label: "Connectedness", detail: "items joined by a line read as a unit" },
  ],
  Art: ({ detail }) => {
    const panel = (px: number, py: number, kind: 0 | 1 | 2 | 3) => {
      const rowGap = kind === 0 ? 40 : 22;
      const pos = (r: number, c: number): [number, number] => [px + 20 + c * 54, py + 30 + r * (18 + rowGap)];
      return (
        <g>
          <rect x={px} y={py} width={186} height={136} rx={8} fill={S.surface} stroke={S.rule} strokeWidth="0.9" {...hair} />
          {kind === 2 && <rect x={px + 12} y={py + 20} width={110} height={98} rx={8} fill={S.soft} stroke={S.ink3} strokeWidth="1" {...hair} />}
          {kind === 3 &&
            [0, 1, 2].map((c) => {
              const [x, y] = pos(0, c);
              return <line key={c} x1={x + 23} y1={y + 18} x2={x + 23} y2={y + 40} stroke={S.ink} strokeWidth="1.6" {...hair} />;
            })}
          {[0, 1].map((r) =>
            [0, 1, 2].map((c) => {
              const [x, y] = pos(r, c);
              const filled = kind === 1 && c === 0;
              return <rect key={`${r}${c}`} x={x} y={y} width={46} height={18} rx={9} fill={filled ? S.ink : S.surface} stroke={S.ink2} strokeWidth="1" {...hair} />;
            }),
          )}
        </g>
      );
    };
    return (
      <g>
        {panel(8, 8, 0)}
        {panel(206, 8, 1)}
        {panel(8, 156, 2)}
        {panel(206, 156, 3)}
        {detail && (
          <>
            <Marker x={184} y={20} n={1} />
            <Marker x={382} y={20} n={2} />
            <Marker x={184} y={168} n={3} />
            <Marker x={382} y={168} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Visual hierarchy: the same card, flat and ordered                    */
/* ------------------------------------------------------------------ */
export const visualHierarchyPlate: IllustrationEntry = {
  slug: "visual-hierarchy",
  title: "Visual hierarchy plate",
  canvas: "sheet",
  animated: true,
  description:
    "The same event card twice. On the left, marked with a cross, everything has equal weight: date, title, room and two outlined buttons are the same size and tone, so nothing says where to start. On the right, marked with a tick, the title is large and bold, the date and room sit beneath it in a quieter tone, and one filled 'Book a seat' button is the single primary action beside a plain 'Details' link. A numbered reading path runs title, then details, then action. Size, weight, contrast and position set the order.",
  key: [
    { n: "1", label: "Size and weight", detail: "the largest, boldest text is read first" },
    { n: "2", label: "Lower contrast for secondary detail", detail: "date and room recede but stay legible" },
    { n: "3", label: "One primary action", detail: "a single filled button says what to do next" },
    { n: "4", label: "The intended reading path", detail: "title, then details, then action" },
  ],
  Art: ({ detail, animate }) => {
    const path = "M214 92 C 206 130, 206 196, 222 232";
    return (
      <g>
        <Verdict x={101} y={18} ok={false} />
        <Verdict x={299} y={18} ok />
        <UiFrame x={8} y={38} w={186} h={240}>
          {["Thu 12 March", "Design talk", "Room 2"].map((t, i) => (
            <UiText key={t} x={14} y={36 + i * 26}>
              {t}
            </UiText>
          ))}
          <TextBar x={14} y={104} w={150} />
          <TextBar x={14} y={118} w={120} />
          <UiButton x={14} y={168} w={74} label="Book" variant="secondary" />
          <UiButton x={96} y={168} w={74} label="Details" variant="secondary" />
        </UiFrame>
        <UiFrame x={206} y={38} w={186} h={240}>
          <UiText x={14} y={40} size={T.title} weight={700}>
            Design talk
          </UiText>
          <UiText x={14} y={64} tone="ink3">
            Thu 12 March · Room 2
          </UiText>
          <TextBar x={14} y={104} w={150} />
          <TextBar x={14} y={118} w={120} />
          <UiButton x={14} y={168} w={104} label="Book a seat" />
          <UiText x={132} y={185} tone="accent" weight={600}>
            Details
          </UiText>
        </UiFrame>
        <path d={path} fill="none" stroke={S.accent} strokeWidth="1.3" strokeDasharray="3 3" className={animate ? "anim-draw" : undefined} style={animate ? ({ "--len": 180 } as CSSProperties) : undefined} {...hair} />
        {detail && (
          <>
            <Marker x={384} y={72} n={1} to={[330, 72]} />
            <Marker x={384} y={100} n={2} />
            <Marker x={384} y={220} n={3} to={[330, 220]} />
            <Marker x={200} y={160} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Modular type scale: base × ratioⁱ                                   */
/* ------------------------------------------------------------------ */
const TS_BASE = 16;
const TS_RATIO = 1.25;

export const modularTypeScalePlate: IllustrationEntry = {
  slug: "modular-type-scale",
  title: "Modular type scale plate",
  canvas: "sheet",
  description: (() => {
    const sizes = modularScale(TS_BASE, TS_RATIO, 1, 4).map((s) => s.size.toFixed(1)).join(", ");
    return `A type scale built from a 16 px base and a 1.25 ratio (a major third), drawn as specimens of 'Aa' standing on one baseline at their relative sizes: ${sizes} px, from step −1 to step 4. Each size is the previous one multiplied by 1.25, marked by small ×1.25 arrows between the specimens, and each specimen has its step number and size beneath it. Under the scale, a heading, a subheading and body text use three of the steps. The scale is a design convention for consistent steps, not a rule derived from readability research.`;
  })(),
  key: [
    { n: "1", label: "Base size", detail: "step 0, usually the body text size" },
    { n: "2", label: "One fixed ratio", detail: "sizeᵢ = base × ratioⁱ; here 1.25, a major third" },
    { n: "3", label: "Steps below and above", detail: "negative steps for captions, positive for headings" },
    { n: "4", label: "Roles take steps", detail: "a convention for consistency, not a readability law" },
  ],
  Art: ({ detail }) => {
    const steps = modularScale(TS_BASE, TS_RATIO, 1, 4);
    const k = 1.7; // drawing scale: px → plate units
    let x = 12;
    const placed = steps.map((s) => {
      const fs = s.size * k;
      const w = fs * 1.15;
      const p = { ...s, x, fs, w };
      x += Math.max(w, 40) + 12;
      return p;
    });
    const base = 128;
    return (
      <g>
        <line x1={8} y1={base} x2={392} y2={base} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        {placed.map((p, i) => (
          <g key={p.step}>
            <UiText x={p.x} y={base} size={p.fs} weight={600} tone={p.step === 0 ? "accent" : "ink"}>
              Aa
            </UiText>
            <UiText x={p.x} y={base + 22} mono tone="ink3">
              {p.step}
            </UiText>
            <UiText x={p.x} y={base + 40} mono>
              {p.size.toFixed(1)}
            </UiText>
            {i > 0 && (
              <Link from={[placed[i - 1].x + placed[i - 1].w - 4, 40 - i * 2]} via={[(placed[i - 1].x + p.x) / 2 + 10, 20 - i * 2]} to={[p.x + 6, 40 - i * 2]} tone="mute" />
            )}
          </g>
        ))}
        <UiText x={392} y={base + 40} mono tone="ink3" anchor="end">
          px
        </UiText>
        <rect x={8} y={198} width={384} height={94} rx={8} fill={S.surface} stroke={S.rule} strokeWidth="0.9" {...hair} />
        <UiText x={20} y={228} size={26} weight={700}>
          Heading
        </UiText>
        <UiText x={20} y={254} size={19} weight={600}>
          Subheading
        </UiText>
        <TextBar x={20} y={268} w={300} />
        <TextBar x={20} y={280} w={240} />
        {detail && (
          <>
            <Marker x={placed[1].x + 30} y={base + 54} n={1} />
            <Marker x={392} y={28} n={2} />
            <Marker x={placed[0].x + 10} y={base - 50} n={3} />
            <Marker x={378} y={222} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Colour contrast ratio                                                */
/* ------------------------------------------------------------------ */
/** Fixed sRGB sample values; mirrored as --sample-* in app/globals.css (tested). */
export const CONTRAST_SAMPLES = { white: "#ffffff", pass: "#767676", fail: "#949494" } as const;

/** The illustrative palette of the token lessons; mirrored by --sample-token-* in globals.css (D-114). */
export const TOKEN_SAMPLES = {"grey-0": "#ffffff", "grey-50": "#f6f6f4", "grey-300": "#c9c8c3", "grey-500": "#8a8983", "grey-600": "#6b6a64", "grey-700": "#4f4e49", "grey-900": "#1f1e1c", "grey-950": "#141413", "red-700": "#b42318", "red-400": "#f07a6e", "blue-600": "#2457c5", "blue-400": "#5f92e8", "blue-700": "#1b449c"} as const;
const tok = (k: keyof typeof TOKEN_SAMPLES) => `var(--sample-token-${k})`;

export const colourContrastPlate: IllustrationEntry = {
  slug: "colour-contrast-ratio",
  title: "Colour contrast ratio plate",
  canvas: "sheet",
  explorer: "colour",
  description: (() => {
    const p = contrastRatio(CONTRAST_SAMPLES.pass, CONTRAST_SAMPLES.white).toFixed(2);
    const f = contrastRatio(CONTRAST_SAMPLES.fail, CONTRAST_SAMPLES.white).toFixed(2);
    return `Two text samples on white, drawn in fixed colours so the printed ratios stay true in both themes. Grey ${CONTRAST_SAMPLES.pass} on white has a contrast ratio of ${p}:1 and is marked with a tick: it meets the WCAG AA threshold of 4.5:1 for normal text. Grey ${CONTRAST_SAMPLES.fail} on white has ${f}:1 and is marked with a cross for normal text, though it reaches 3:1, the threshold for large text and for interface components. Beneath, the formula (L1 + 0.05) / (L2 + 0.05) with relative luminances, and a scale from 1 to 21 with the thresholds 3, 4.5 and 7 and both samples placed on it.`;
  })(),
  key: [
    { n: "1", label: "Relative luminance", detail: "each colour's lightness, weighted for the eye's sensitivity to red, green and blue" },
    { n: "2", label: "Contrast ratio", detail: "(L1 + 0.05) / (L2 + 0.05), lighter over darker, from 1:1 to 21:1" },
    { n: "3", label: "AA thresholds", detail: "4.5:1 for normal text; 3:1 for large text and interface components" },
    { n: "4", label: "AAA", detail: "7:1 for normal text" },
  ],
  Art: ({ detail }) => {
    const rp = contrastRatio(CONTRAST_SAMPLES.pass, CONTRAST_SAMPLES.white);
    const rf = contrastRatio(CONTRAST_SAMPLES.fail, CONTRAST_SAMPLES.white);
    const x0 = 24;
    const x1 = 376;
    const pos = (r: number) => x0 + (Math.log(r) / Math.log(21)) * (x1 - x0);
    const sample = (x: number, fill: string, r: number, ok: boolean) => (
      <g>
        <rect x={x} y={14} width={184} height={104} rx={8} fill="var(--sample-white)" stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        <text x={x + 16} y={66} fontSize={34} fontWeight={600} fill={fill} fontFamily="var(--font-plex-sans), sans-serif">
          Aa
        </text>
        <text x={x + 76} y={60} fontSize={T.ui} fill={fill} fontFamily="var(--font-plex-sans), sans-serif">
          Opening hours
        </text>
        <rect x={x + 16} y={84} width={112} height={22} rx={11} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.8" {...hair} />
        <UiText x={x + 28} y={100} mono weight={600}>
          {`${r.toFixed(2)}:1`}
        </UiText>
        <Verdict x={x + 160} y={95} ok={ok} />
      </g>
    );
    return (
      <g>
        {sample(8, "var(--sample-grey-pass)", rp, true)}
        {sample(208, "var(--sample-grey-fail)", rf, false)}
        <UiText x={200} y={156} size={T.strong} mono weight={600} anchor="middle">
          (L1 + 0.05) / (L2 + 0.05)
        </UiText>
        <line x1={x0} y1={222} x2={x1} y2={222} stroke={S.ink} strokeWidth="1.2" {...hair} />
        <rect x={pos(4.5)} y={214} width={pos(21) - pos(4.5)} height={16} fill={S.okWash} />
        <line x1={x0} y1={222} x2={x1} y2={222} stroke={S.ink} strokeWidth="1.2" {...hair} />
        {[1, 3, 4.5, 7, 21].map((t) => (
          <g key={t}>
            <line x1={pos(t)} y1={210} x2={pos(t)} y2={234} stroke={S.ink2} strokeWidth="1" {...hair} />
            <UiText x={pos(t)} y={252} mono anchor="middle" tone="ink2">
              {String(t)}
            </UiText>
          </g>
        ))}
        {[
          [rp, "var(--sample-grey-pass)"],
          [rf, "var(--sample-grey-fail)"],
        ].map(([r, c], i) => (
          <path key={i} d={`M${pos(r as number)} ${206} l-6 -11 h12 z`} fill={c as string} stroke={S.ink} strokeWidth="0.9" {...hair} />
        ))}
        {detail && (
          <>
            <Marker x={8} y={14} n={1} />
            <Marker x={384} y={150} n={2} />
            <Marker x={pos(4.5)} y={276} n={3} />
            <Marker x={pos(7)} y={276} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Design tokens: primitive → semantic → component → platforms          */
/* ------------------------------------------------------------------ */
export const designTokensPlate: IllustrationEntry = {
  slug: "design-tokens",
  title: "Design tokens plate",
  canvas: "sheet",
  description:
    "Three columns of named tokens with arrows showing which token refers to which. Primitive tokens on the left hold raw values: blue-600, grey-900 and space-4 (16 px). Semantic tokens in the middle record decisions by referring to primitives: color.action refers to blue-600, color.text to grey-900, space.inset to space-4. Component tokens on the right refer to semantic ones: button.background, button.label and button.padding. At the bottom, the button those tokens produce, and the outputs a build step generates from the same source: CSS custom properties, iOS and Android values. A theme changes what a semantic token refers to, and every component follows.",
  key: [
    { n: "1", label: "Primitive tokens", detail: "named raw values: colours, sizes, durations" },
    { n: "2", label: "Semantic tokens", detail: "decisions by purpose that refer to primitives; themes swap these references" },
    { n: "3", label: "Component tokens", detail: "where a component uses a decision" },
    { n: "4", label: "One source, many platforms", detail: "transformed into CSS, iOS, Android and design-tool variables" },
  ],
  Art: ({ detail }) => {
    const cols = [
      { x: 8, rows: ["blue-600", "grey-900", "space-4"] },
      { x: 140, rows: ["color.action", "color.text", "space.inset"] },
      { x: 272, rows: ["button.bg", "button.label", "button.padding"] },
    ];
    const ry = (i: number) => 40 + i * 40;
    return (
      <g>
        {cols.map((c, ci) => (
          <g key={ci}>
            {c.rows.map((t, i) => (
              <g key={t}>
                <rect x={c.x} y={ry(i)} width={120} height={28} rx={6} fill={S.surface} stroke={ci === 1 ? S.ink2 : S.ruleStrong} strokeWidth={ci === 1 ? 1.1 : 0.9} {...hair} />
                {ci === 0 && i < 2 && <rect x={c.x + 8} y={ry(i) + 8} width={12} height={12} rx={2} fill={i === 0 ? S.accent : S.ink} />}
                {ci === 0 && i === 2 && <rect x={c.x + 8} y={ry(i) + 11} width={12} height={6} fill={S.ink3} />}
                <UiText x={c.x + (ci === 0 ? 26 : ci === 2 ? 5 : 10)} y={ry(i) + 19} mono>
                  {t}
                </UiText>
                {ci > 0 && <Link from={[c.x, ry(i) + 14]} to={[c.x - 11, ry(i) + 14]} tone="ink" />}
              </g>
            ))}
          </g>
        ))}
        <UiText x={68} y={28} mono tone="ink3" anchor="middle">
          primitive
        </UiText>
        <UiText x={200} y={28} mono tone="ink3" anchor="middle">
          semantic
        </UiText>
        <UiText x={332} y={28} mono tone="ink3" anchor="middle">
          component
        </UiText>
        {/* the result and the outputs */}
        <line x1={8} y1={172} x2={392} y2={172} stroke={S.rule} strokeWidth="0.9" {...hair} />
        <rect x={272} y={196} width={120} height={36} rx={8} fill={S.accent} />
        <UiText x={332} y={219} weight={600} anchor="middle" tone="surface">
          Save
        </UiText>
        {["CSS", "iOS", "Android"].map((t, i) => (
          <g key={t}>
            <rect x={8 + i * 84} y={198} width={76} height={32} rx={6} fill={S.soft} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
            <UiText x={46 + i * 84} y={219} mono anchor="middle">
              {t}
            </UiText>
          </g>
        ))}
        <UiText x={8} y={262} tone="ink3">
          one source, transformed per platform and theme
        </UiText>
        {detail && (
          <>
            <Marker x={8} y={40} n={1} />
            <Marker x={140} y={40} n={2} />
            <Marker x={392} y={40} n={3} />
            <Marker x={8} y={198} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Aesthetic-usability effect                                           */
/* ------------------------------------------------------------------ */
export const aestheticUsabilityPlate: IllustrationEntry = {
  slug: "aesthetic-usability-effect",
  title: "Aesthetic-usability effect plate",
  canvas: "sheet",
  description:
    "The same sign-up form in two visual treatments with identical fields, steps and behaviour. On the left, a plain version with uneven spacing and mismatched alignment; on the right, a polished version with even spacing and a clear primary button. Beneath both, the task outcome is the same: three of three steps completed. Beside each, a rating of perceived ease drawn as an illustrative bar, higher for the polished version. People tend to rate attractive interfaces as easier to use; the correlation is well replicated, but it is a judgement, not evidence that the interface is easier, and it can hide problems during testing.",
  key: [
    { n: "1", label: "Same task, same steps", detail: "the inherent usability is identical" },
    { n: "2", label: "Visual appeal differs", detail: "spacing, alignment and a clear primary action" },
    { n: "3", label: "Perceived usability differs", detail: "illustrative ratings; the correlation is well replicated" },
    { n: "4", label: "A judgement, not a measurement", detail: "appeal can mask problems; measure performance too" },
  ],
  Art: ({ detail }) => {
    const form = (x: number, polished: boolean) => (
      <UiFrame x={x} y={10} w={186} h={186}>
        <UiText x={14} y={28} weight={600}>
          Create account
        </UiText>
        {polished ? (
          <>
            <UiField x={14} y={54} w={158} label="Email" />
            <UiField x={14} y={102} w={158} label="Password" />
            <UiButton x={14} y={134} w={158} label="Continue" />
          </>
        ) : (
          <>
            <UiText x={14} y={52} tone="ink2">
              Email
            </UiText>
            <rect x={22} y={58} width={140} height={24} rx={0} fill={S.surface} stroke={S.ink3} strokeWidth="0.8" {...hair} />
            <UiText x={30} y={98} tone="ink2">
              Password
            </UiText>
            <rect x={14} y={104} width={150} height={24} rx={0} fill={S.surface} stroke={S.ink3} strokeWidth="0.8" {...hair} />
            <rect x={96} y={140} width={66} height={22} rx={0} fill={S.soft} stroke={S.ink3} strokeWidth="0.8" {...hair} />
            <UiText x={104} y={156} tone="ink2">
              Continue
            </UiText>
          </>
        )}
      </UiFrame>
    );
    const outcome = (x: number) => (
      <g>
        {[0, 1, 2].map((i) => (
          <Verdict key={i} x={x + 14 + i * 22} y={218} ok r={8} />
        ))}
        <UiText x={x + 80} y={223} mono>
          3 / 3
        </UiText>
      </g>
    );
    const rating = (x: number, v: number) => (
      <g>
        <UiText x={x} y={258} tone="ink3">
          perceived ease
        </UiText>
        <rect x={x} y={266} width={170} height={12} rx={6} fill={S.sunken} />
        <rect x={x} y={266} width={170 * v} height={12} rx={6} fill={S.ink2} />
      </g>
    );
    return (
      <g>
        {form(8, false)}
        {form(206, true)}
        {outcome(8)}
        {outcome(206)}
        {rating(16, 0.45)}
        {rating(214, 0.8)}
        {detail && (
          <>
            <Marker x={184} y={218} n={1} />
            <Marker x={392} y={20} n={2} />
            <Marker x={392} y={272} n={3} />
            <Marker x={200} y={287} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Doherty threshold: a rule of thumb about response time               */
/* ------------------------------------------------------------------ */
export const dohertyPlate: IllustrationEntry = {
  slug: "doherty-threshold",
  title: "Doherty threshold plate",
  canvas: "sheet",
  animated: true,
  description:
    "A response-time axis on a logarithmic scale from 0.1 to 10 seconds, with a mark at about 0.4 seconds. Two exchanges start from the same action, a click on Search. In the upper one the results arrive at 0.3 seconds, inside the mark, and the next action follows straight on. In the lower one a spinner turns for 3 seconds before results appear, and the person waits. The 0.4 second figure comes from a 1982 IBM industry report on productivity; it is a performance aspiration and a rule of thumb, not a measured perceptual threshold.",
  key: [
    { n: "1", label: "The action", detail: "the moment the person asks the system for something" },
    { n: "2", label: "Response in about 0.4 s or less", detail: "the exchange keeps pace with the person" },
    { n: "3", label: "A multi-second response", detail: "the person waits and loses the thread" },
    { n: "4", label: "A rule of thumb", detail: "from a 1982 IBM report on productivity, not a perceptual law" },
  ],
  Art: ({ detail, animate }) => {
    const tx = (t: number) => 48 + ((Math.log10(t) + 1) / 2) * 330;
    const lane = (y: number, t: number, fast: boolean) => {
      const path = `M${tx(0.1)} ${y} H${tx(t)}`;
      return (
        <g>
          <rect x={14} y={y - 16} width={74} height={32} rx={6} fill={S.ink} />
          <UiText x={51} y={y + 5} weight={600} anchor="middle" tone="surface">
            Search
          </UiText>
          <line x1={tx(0.1) + 40} y1={y} x2={tx(t)} y2={y} stroke={fast ? S.ok : S.ink3} strokeWidth="2" strokeDasharray={fast ? undefined : "4 3"} {...hair} />
          {animate && (
            <g style={{ offsetPath: `path("${path}")`, offsetRotate: "0deg" }} className="anim-travel">
              <circle r={4} fill={fast ? S.ok : S.ink2} />
            </g>
          )}
          <rect x={tx(t) - 2} y={y - 16} width={78} height={32} rx={6} fill={fast ? S.okWash : S.soft} stroke={fast ? S.ok : S.ruleStrong} strokeWidth="1" {...hair} />
          <TextBar x={tx(t) + 8} y={y - 6} w={50} />
          <TextBar x={tx(t) + 8} y={y + 4} w={36} />
          <UiText x={tx(t)} y={y + 34} mono anchor="middle" tone={fast ? "ok" : "ink2"} weight={600}>
            {`${t} s`}
          </UiText>
        </g>
      );
    };
    return (
      <g>
        <rect x={tx(0.1)} y={40} width={tx(0.4) - tx(0.1)} height={190} fill={S.okWash} opacity={0.6} />
        <line x1={tx(0.4)} y1={36} x2={tx(0.4)} y2={234} stroke={S.ok} strokeWidth="1.2" strokeDasharray="3 3" {...hair} />
        <UiText x={tx(0.4)} y={30} mono weight={600} anchor="middle" tone="ok">
          ≈ 0.4 s
        </UiText>
        {lane(86, 0.3, true)}
        {lane(176, 3, false)}
        {/* spinner on the slow lane */}
        <circle cx={tx(1)} cy={148} r={8} fill="none" stroke={S.rule} strokeWidth="2" {...hair} />
        <path d={`M${tx(1)} 140 a8 8 0 0 1 8 8`} fill="none" stroke={S.ink2} strokeWidth="2" {...hair} />
        <line x1={tx(0.1)} y1={256} x2={tx(10)} y2={256} stroke={S.ink2} strokeWidth="1" {...hair} />
        {[0.1, 0.4, 1, 3, 10].map((t) => (
          <g key={t}>
            <line x1={tx(t)} y1={251} x2={tx(t)} y2={261} stroke={S.ink2} strokeWidth="1" {...hair} />
            <UiText x={tx(t)} y={280} mono tone="ink3" anchor="middle">
              {String(t)}
            </UiText>
          </g>
        ))}
        <UiText x={392} y={296} mono tone="ink3" anchor="end">
          seconds (log scale)
        </UiText>
        {detail && (
          <>
            <Marker x={14} y={60} n={1} />
            <Marker x={tx(0.3) + 88} y={86} n={2} />
            <Marker x={tx(3) + 88} y={176} n={3} />
            <Marker x={tx(0.4) + 66} y={24} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Tesler's law: complexity is moved, not removed                       */
/* ------------------------------------------------------------------ */
export const teslerPlate: IllustrationEntry = {
  slug: "teslers-law",
  title: "Tesler's law plate",
  canvas: "sheet",
  description:
    "The same phone-number field designed two ways, each above a bar of equal length that stands for the task's fixed complexity, divided between the person, the application and the platform. On the left, the field states a required format and shows an error for a number typed another way: most of the bar is the person's share. On the right, the field accepts the number as typed, detects the country and formats it: most of the bar has moved to the application. The bars are the same length because the complexity is moved, not removed. Tesler's law is a design principle, not an empirical law; the proportions are illustrative.",
  key: [
    { n: "1", label: "A fixed amount of complexity", detail: "phone numbers vary by country; someone has to handle that" },
    { n: "2", label: "The person bears it", detail: "rules to remember, errors to correct" },
    { n: "3", label: "The application absorbs it", detail: "parsing, detection and formatting in code" },
    { n: "4", label: "Moved, not removed", detail: "decide deliberately who should carry it" },
  ],
  Art: ({ detail }) => {
    const bar = (x: number, user: number, app: number) => {
      const w = 186;
      const seg = [
        { k: "person", v: user, fill: S.ink },
        { k: "application", v: app, fill: S.accent },
        { k: "platform", v: 1 - user - app, fill: S.ink3 },
      ];
      let acc = 0;
      return (
        <g>
          {seg.map((s) => {
            const sx = x + acc * w;
            acc += s.v;
            return <rect key={s.k} x={sx} y={226} width={s.v * w - 1.5} height={22} rx={3} fill={s.fill} />;
          })}
        </g>
      );
    };
    return (
      <g>
        <UiFrame x={8} y={14} w={186} h={180}>
          <UiField x={14} y={34} w={158} label="Phone" value="07700 900123" state="error" />
          <UiText x={14} y={88} tone="error">
            Use +CC NNNN NNNNNN
          </UiText>
          <TextBar x={14} y={112} w={140} />
          <UiButton x={14} y={128} w={158} label="Continue" variant="secondary" />
        </UiFrame>
        <UiFrame x={206} y={14} w={186} h={180}>
          <UiField x={14} y={34} w={158} label="Phone" value="+44 7700 900123" />
          <UiText x={14} y={88} tone="ok">
            ✓ UK number detected
          </UiText>
          <TextBar x={14} y={112} w={140} />
          <UiButton x={14} y={128} w={158} label="Continue" />
        </UiFrame>
        {bar(8, 0.7, 0.2)}
        {bar(206, 0.12, 0.72)}
        {[
          ["person", S.ink],
          ["application", S.accent],
          ["platform", S.ink3],
        ].map(([t, c], i) => (
          <g key={t}>
            <rect x={8 + i * 110} y={268} width={12} height={12} rx={2} fill={c} />
            <UiText x={26 + i * 110} y={279} tone="ink2">
              {t}
            </UiText>
          </g>
        ))}
        {detail && (
          <>
            <Marker x={200} y={237} n={1} />
            <Marker x={60} y={214} n={2} />
            <Marker x={300} y={214} n={3} />
            <Marker x={380} y={274} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Shneiderman's eight golden rules across one short dialogue           */
/* ------------------------------------------------------------------ */
const GOLDEN = [
  ["Strive for consistency", "drawn: the same button positions in every state"],
  ["Seek universal usability", "not drawn: novices and experts, shortcuts, diverse needs"],
  ["Offer informative feedback", "drawn: '3 files deleted'"],
  ["Design dialogs to yield closure", "drawn: the sequence ends with a clear result"],
  ["Prevent errors", "drawn: the dialog lists the files before deleting"],
  ["Permit easy reversal of actions", "drawn: Undo"],
  ["Keep users in control", "drawn: Cancel is always available"],
  ["Reduce short-term memory load", "drawn: the files are named, not remembered"],
] as const;

export const goldenRulesPlate: IllustrationEntry = {
  slug: "shneiderman-golden-rules",
  title: "Shneiderman's golden rules plate",
  canvas: "sheet",
  description:
    "One short dialogue, deleting three files, in three screens from left to right. First, a file list with three files ticked and a Delete button. Second, a confirmation that names the three files and offers Cancel and Delete in the same positions as before. Third, the list after deletion with a message, '3 files deleted', and an Undo action. Numbered markers place seven of Shneiderman's eight golden rules on the screens: consistency, feedback, closure, error prevention, easy reversal, user control and reduced memory load; universal usability is not drawn. The rules are principles to interpret for each setting, not a checklist.",
  key: GOLDEN.map(([label, detail], i) => ({ n: String(i + 1), label, detail })),
  Art: ({ detail }) => {
    const fx = [8, 140, 272];
    return (
      <g>
        {/* 1: selection */}
        <UiFrame x={fx[0]} y={20} w={120} h={220}>
          {[0, 1, 2, 3, 4].map((r) => (
            <g key={r}>
              <rect x={10} y={14 + r * 26} width={12} height={12} rx={2} fill={r < 3 ? S.ink : S.surface} stroke={S.ink2} strokeWidth="0.9" {...hair} />
              <TextBar x={30} y={18 + r * 26} w={[60, 48, 66, 54, 40][r]} />
            </g>
          ))}
          <UiButton x={10} y={160} w={100} label="Delete 3" />
        </UiFrame>
        {/* 2: confirmation */}
        <UiFrame x={fx[1]} y={20} w={120} h={220}>
          <UiText x={10} y={24} weight={600}>
            Delete 3 files?
          </UiText>
          {["plan.pdf", "notes.txt", "q3.xlsx"].map((t, i) => (
            <UiText key={t} x={14} y={52 + i * 20} mono tone="ink2">
              {t}
            </UiText>
          ))}
          <UiButton x={10} y={124} w={100} label="Cancel" variant="secondary" />
          <UiButton x={10} y={160} w={100} label="Delete" />
        </UiFrame>
        {/* 3: closure, feedback, reversal */}
        <UiFrame x={fx[2]} y={20} w={120} h={220}>
          {[0, 1].map((r) => (
            <g key={r}>
              <rect x={10} y={14 + r * 26} width={12} height={12} rx={2} fill={S.surface} stroke={S.ink2} strokeWidth="0.9" {...hair} />
              <TextBar x={30} y={18 + r * 26} w={[54, 40][r]} />
            </g>
          ))}
          <rect x={6} y={124} width={108} height={60} rx={6} fill={S.ink} />
          <UiText x={14} y={146} tone="surface" weight={600}>
            3 files deleted
          </UiText>
          <UiText x={14} y={170} tone="surface" weight={700}>
            Undo
          </UiText>
        </UiFrame>
        <Link from={[129, 130]} to={[139, 130]} />
        <Link from={[261, 130]} to={[271, 130]} />
        {detail && (
          <>
            <Marker x={200} y={264} n={1} to={[200, 216]} />
            <Marker x={392} y={186} n={3} />
            <Marker x={392} y={146} n={4} />
            <Marker x={262} y={112} n={5} />
            <Marker x={352} y={212} n={6} />
            <Marker x={262} y={180} n={7} />
            <Marker x={134} y={112} n={8} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Cognitive walkthrough: four questions at one step                    */
/* ------------------------------------------------------------------ */
const CW_Q = ["goal", "notice", "connect", "progress"];

export const cognitiveWalkthroughPlate: IllustrationEntry = {
  slug: "cognitive-walkthrough",
  title: "Cognitive walkthrough plate",
  canvas: "sheet",
  description:
    "One step of a walkthrough. A strip at the top shows the correct action sequence for the task 'share a photo' as five steps, with step 3 current. On the left, the screen at that step: a photo with a row of three unlabelled icons, the correct one being the share icon. On the right, the four questions asked at every step, each with an answer: will the user try to achieve the right effect (yes); will they notice the correct action is available (no, the icon has no label); will they associate it with their goal (no); will they see that progress is being made (yes). Each no becomes a failure story explaining why a first-time user would go wrong.",
  key: [
    { n: "1", label: "A defined task and the correct action sequence", detail: "for a specified first-time user" },
    { n: "2", label: "Step through each action", detail: "here step 3: tap share" },
    { n: "3", label: "Ask four questions", detail: "right goal? notice the action? connect it with the goal? see progress?" },
    { n: "4", label: "Record a failure story for each no", detail: "why a new user would go wrong here" },
  ],
  Art: ({ detail }) => (
    <g>
      {[1, 2, 3, 4, 5].map((n) => (
        <g key={n}>
          <rect x={20 + (n - 1) * 46} y={14} width={20} height={20} rx={4} fill={n === 3 ? S.ink : n < 3 ? S.soft : S.surface} stroke={S.ink2} strokeWidth="1" {...hair} />
          <UiText x={30 + (n - 1) * 46} y={29} mono anchor="middle" tone={n === 3 ? "surface" : "ink2"} weight={600}>
            {n}
          </UiText>
          {n < 5 && <line x1={40 + (n - 1) * 46} y1={24} x2={66 + (n - 1) * 46} y2={24} stroke={S.ruleStrong} strokeWidth="1" {...hair} />}
        </g>
      ))}
      <UiFrame x={8} y={50} w={172} h={240}>
        <rect x={12} y={12} width={148} height={120} rx={6} fill={S.sunken} />
        <path d="M24 120 L64 72 L94 104 L114 86 L148 120 Z" fill={S.ruleStrong} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={20 + i * 52} y={148} width={34} height={34} rx={8} fill={S.surface} stroke={i === 1 ? S.accent : S.ink2} strokeWidth={i === 1 ? 1.6 : 1} strokeDasharray={i === 1 ? "3 2" : undefined} {...hair} />
        ))}
        <path d="M82 166 l8 -6 l8 6 M90 160 v12" fill="none" stroke={S.ink} strokeWidth="1.4" {...hair} />
        <TextBar x={14} y={200} w={120} />
      </UiFrame>
      {CW_Q.map((q, i) => {
        const y = 64 + i * 46;
        const ok = i === 0 || i === 3;
        return (
          <g key={q}>
            <rect x={200} y={y} width={192} height={36} rx={6} fill={ok ? S.surface : S.errorWash} stroke={ok ? S.ruleStrong : S.error} strokeWidth="0.9" {...hair} />
            <UiText x={212} y={y + 23} mono tone="ink3">
              {`Q${i + 1}`}
            </UiText>
            <UiText x={244} y={y + 23} weight={600}>
              {q}
            </UiText>
            <Verdict x={372} y={y + 18} ok={ok} />
          </g>
        );
      })}
      <rect x={200} y={252} width={192} height={38} rx={6} fill="none" stroke={S.error} strokeWidth="1" strokeDasharray="3 2.4" {...hair} />
      <UiText x={212} y={276} tone="error" weight={600}>
        failure story
      </UiText>
      {detail && (
        <>
          <Marker x={262} y={24} n={1} />
          <Marker x={145} y={44} n={2} to={[132, 34]} />
          <Marker x={200} y={58} n={3} />
          <Marker x={392} y={252} n={4} />
        </>
      )}
    </g>
  ),
};

/* ------------------------------------------------------------------ */
/* Task success rate with an adjusted-Wald interval                     */
/* ------------------------------------------------------------------ */
const TSR = { x: 7, n: 10 };

export const taskSuccessPlate: IllustrationEntry = {
  slug: "task-success-rate",
  title: "Task success rate plate",
  canvas: "sheet",
  description: (() => {
    const r = taskSuccess(TSR.x, TSR.n);
    return `Ten illustrative participants attempt the same task against a predefined success criterion; seven succeed (ticks) and three do not (crosses). Below, the success rate, ${TSR.x}/${TSR.n} = ${Math.round(r.p * 100)}%, is placed on a 0 to 100% scale with its 95% adjusted-Wald confidence interval, about ${Math.round(r.low * 100)}% to ${Math.round(r.high * 100)}%, drawn as a wide bar. With ten participants the true rate could plausibly be anywhere in that range, which is why the interval is reported with the rate.`;
  })(),
  key: [
    { n: "1", label: "Attempts against a defined success criterion", detail: "decided before testing" },
    { n: "2", label: "Success rate x / n", detail: "a binary measure of effectiveness" },
    { n: "3", label: "95% adjusted-Wald interval", detail: "recommended for small samples" },
    { n: "4", label: "Report the interval", detail: "with small n it is wide; the point alone overstates certainty" },
  ],
  Art: ({ detail }) => {
    const r = taskSuccess(TSR.x, TSR.n);
    const sx = (v: number) => 24 + v * 352;
    return (
      <g>
        {Array.from({ length: TSR.n }, (_, i) => {
          const x = 24 + (i % 5) * 72;
          const y = 20 + Math.floor(i / 5) * 72;
          const ok = i < TSR.x;
          return (
            <g key={i}>
              <rect x={x} y={y} width={56} height={56} rx={10} fill={ok ? S.okWash : S.surface} stroke={ok ? S.ok : S.ruleStrong} strokeWidth="1" {...hair} />
              <UiText x={x + 10} y={y + 20} mono tone="ink3">
                {`P${i + 1}`}
              </UiText>
              <Verdict x={x + 36} y={y + 36} ok={ok} r={9} />
            </g>
          );
        })}
        <UiText x={24} y={200} size={T.strong} mono weight={700}>
          {`${TSR.x} / ${TSR.n} = ${Math.round(r.p * 100)}%`}
        </UiText>
        <line x1={sx(0)} y1={244} x2={sx(1)} y2={244} stroke={S.ink2} strokeWidth="1" {...hair} />
        <rect x={sx(r.low)} y={234} width={sx(r.high) - sx(r.low)} height={20} rx={4} fill={S.accentWash} stroke={S.accent} strokeWidth="1" {...hair} />
        <line x1={sx(r.p)} y1={226} x2={sx(r.p)} y2={262} stroke={S.ink} strokeWidth="2" {...hair} />
        {[0, 0.5, 1].map((v) => (
          <UiText key={v} x={sx(v)} y={282} mono tone="ink3" anchor="middle">
            {`${v * 100}%`}
          </UiText>
        ))}
        <UiText x={sx(r.low)} y={226} mono tone="accent" anchor="middle">
          {`${Math.round(r.low * 100)}`}
        </UiText>
        <UiText x={sx(r.high)} y={226} mono tone="accent" anchor="middle">
          {`${Math.round(r.high * 100)}`}
        </UiText>
        {detail && (
          <>
            <Marker x={12} y={20} n={1} />
            <Marker x={200} y={194} n={2} />
            <Marker x={sx(r.high) + 20} y={244} n={3} />
            <Marker x={392} y={200} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* NASA-TLX: six subscales, Raw TLX as their mean                       */
/* ------------------------------------------------------------------ */
const TLX_NAMES = ["Mental demand", "Physical demand", "Temporal demand", "Performance", "Effort", "Frustration"];
const TLX_EXAMPLE = [55, 10, 45, 30, 50, 25];

export const nasaTlxPlate: IllustrationEntry = {
  slug: "nasa-tlx",
  title: "NASA-TLX plate",
  canvas: "sheet",
  description: `The six NASA-TLX subscales as rating scales from 0 to 100, each with an illustrative rating for one just-completed task: ${TLX_NAMES.map((n, i) => `${n.toLowerCase()} ${TLX_EXAMPLE[i]}`).join(", ")}. The performance scale runs from good to poor, so a low number is a good result. On the right, the Raw TLX, the unweighted mean of the six ratings, is ${nasaTlxRaw(TLX_EXAMPLE).toFixed(1)}. The weighted version instead derives a weight for each subscale from 15 pairwise comparisons. TLX measures perceived workload, not performance.`,
  key: [
    { n: "1", label: "Six subscales", detail: "mental, physical and temporal demand, performance, effort, frustration" },
    { n: "2", label: "Rated 0–100 after the task", detail: "performance is anchored good (low) to poor (high)" },
    { n: "3", label: "Raw TLX", detail: "the unweighted mean of the six ratings" },
    { n: "4", label: "Weighted TLX", detail: "weights from 15 pairwise comparisons of the subscales" },
  ],
  Art: ({ detail }) => {
    const raw = nasaTlxRaw(TLX_EXAMPLE);
    const sx = (v: number) => 140 + (v / 100) * 120;
    return (
      <g>
        {TLX_NAMES.map((n, i) => {
          const y = 28 + i * 44;
          return (
            <g key={n}>
              <UiText x={8} y={y + 5} tone="ink2">
                {n}
              </UiText>
              <line x1={sx(0)} y1={y} x2={sx(100)} y2={y} stroke={S.ruleStrong} strokeWidth="1" {...hair} />
              {Array.from({ length: 21 }, (_, k) => (
                <line key={k} x1={sx(k * 5)} y1={y - (k % 10 === 0 ? 7 : 3)} x2={sx(k * 5)} y2={y + (k % 10 === 0 ? 7 : 3)} stroke={S.ink3} strokeWidth="0.8" {...hair} />
              ))}
              <rect x={sx(0)} y={y - 3} width={sx(TLX_EXAMPLE[i]) - sx(0)} height={6} rx={3} fill={S.ink2} />
              <circle cx={sx(TLX_EXAMPLE[i])} cy={y} r={6} fill={S.ink} stroke={S.surface} strokeWidth="1.5" {...hair} />
              {i === 3 && (
                <>
                  <UiText x={sx(0)} y={y + 22} mono tone="ink3" anchor="middle">
                    good
                  </UiText>
                  <UiText x={sx(100)} y={y + 22} mono tone="ink3" anchor="middle">
                    poor
                  </UiText>
                </>
              )}
            </g>
          );
        })}
        <rect x={286} y={60} width={106} height={120} rx={8} fill={S.soft} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        <UiText x={339} y={88} mono tone="ink3" anchor="middle">
          Raw TLX
        </UiText>
        <UiText x={339} y={140} size={34} weight={700} anchor="middle">
          {raw.toFixed(1)}
        </UiText>
        <UiText x={339} y={166} mono tone="ink3" anchor="middle">
          mean of 6
        </UiText>
        <rect x={286} y={200} width={106} height={56} rx={8} fill="none" stroke={S.ruleStrong} strokeWidth="0.9" strokeDasharray="3 2.4" {...hair} />
        <UiText x={339} y={224} mono tone="ink3" anchor="middle">
          weighted
        </UiText>
        <UiText x={339} y={244} mono tone="ink3" anchor="middle">
          15 pairs
        </UiText>
        {detail && (
          <>
            <Marker x={124} y={14} n={1} />
            <Marker x={272} y={160} n={2} />
            <Marker x={392} y={60} n={3} />
            <Marker x={392} y={200} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Sample size: the question sets the number                            */
/* ------------------------------------------------------------------ */
const SS = { discoverP: 0.3, discoverN: 5, estP: 0.5, estMargin: 0.1, abP1: 0.1, abP2: 0.12 };

export const sampleSizePlate: IllustrationEntry = {
  slug: "sample-size-estimation",
  title: "Sample size estimation plate",
  canvas: "sheet",
  description: (() => {
    const d = Math.round(problemDiscovery(SS.discoverP, SS.discoverN) * 100);
    const e = sampleSizeProportion(SS.estP, SS.estMargin);
    const a = sampleSizeTwoProportions(SS.abP1, SS.abP2);
    return `Three kinds of question, three very different numbers, all computed with illustrative inputs. Discovery: if a problem affects 30% of users, ${SS.discoverN} participants give a ${d}% chance of seeing it at least once. Estimation: to estimate a proportion near 50% within ±10 points at 95% confidence needs ${e} participants. Comparison: to detect a change in conversion from 10% to 12% with 80% power at α = 0.05 needs ${a.toLocaleString("en-GB")} users per variant. Each card shows a block of dots in proportion to its number, so the scale of the difference is visible. '5 users' and 'thousands per arm' answer different questions.`;
  })(),
  key: [
    { n: "1", label: "Discovery", detail: "chance of seeing a problem at least once: 1 − (1 − p)ⁿ" },
    { n: "2", label: "Estimation", detail: "participants for a stated margin of error" },
    { n: "3", label: "Comparison", detail: "users per variant to detect a minimum effect with stated power" },
    { n: "4", label: "The question sets the number", detail: "inputs here are illustrative" },
  ],
  Art: ({ detail }) => {
    const d = problemDiscovery(SS.discoverP, SS.discoverN);
    const e = sampleSizeProportion(SS.estP, SS.estMargin);
    const a = sampleSizeTwoProportions(SS.abP1, SS.abP2);
    const cards = [
      { t: "Discovery", n: SS.discoverN, sub: `${Math.round(d * 100)}% chance`, dots: SS.discoverN },
      { t: "Estimation", n: e, sub: "±10 points", dots: e },
      { t: "Comparison", n: a, sub: "per variant", dots: 400 },
    ];
    return (
      <g>
        {cards.map((c, i) => {
          const x = 8 + i * 130;
          const per = i === 2 ? 20 : 10;
          return (
            <g key={c.t}>
              <Card x={x} y={10} w={124} h={280} title={c.t}>
                <UiText x={x + 12} y={64} size={i === 2 ? 22 : 28} weight={700}>
                  {c.n.toLocaleString("en-GB")}
                </UiText>
                <UiText x={x + 12} y={86} tone="ink3">
                  {c.sub}
                </UiText>
                {Array.from({ length: c.dots }, (_, k) => (
                  <circle key={k} cx={x + 14 + (k % per) * (i === 2 ? 5 : 10)} cy={108 + Math.floor(k / per) * (i === 2 ? 5 : 10)} r={i === 2 ? 1.6 : 3} fill={S.ink2} />
                ))}
                {i === 2 && (
                  <UiText x={x + 12} y={234} tone="ink3">
                    {`each dot ≈ ${Math.round(a / 400)}`}
                  </UiText>
                )}
              </Card>
            </g>
          );
        })}
        {detail && (
          <>
            <Marker x={132} y={10} n={1} />
            <Marker x={262} y={10} n={2} />
            <Marker x={392} y={10} n={3} />
            <Marker x={392} y={290} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* A/B testing: random assignment, one metric, inference                */
/* ------------------------------------------------------------------ */
const AB = { xA: 500, nA: 5000, xB: 580, nB: 5000 };

export const abTestingPlate: IllustrationEntry = {
  slug: "ab-testing",
  title: "A/B testing plate",
  canvas: "sheet",
  animated: true,
  description: (() => {
    const t = twoProportionTest(AB.xA, AB.nA, AB.xB, AB.nB);
    return `Visitors arrive from the left and are randomly assigned to one of two versions of a checkout page: A, the control, and B, the treatment, which differ only in the button. Each version reports the same pre-chosen metric, conversion. In this illustrative test A converts ${AB.xA} of ${AB.nA.toLocaleString("en-GB")} (${((AB.xA / AB.nA) * 100).toFixed(1)}%) and B ${AB.xB} of ${AB.nB.toLocaleString("en-GB")} (${((AB.xB / AB.nB) * 100).toFixed(1)}%); the difference, ${(t.diff * 100).toFixed(1)} points, is drawn with its 95% confidence interval from ${(t.low * 100).toFixed(1)} to ${(t.high * 100).toFixed(1)} points, which excludes zero. Random assignment is what lets the difference be read as caused by the change.`;
  })(),
  key: [
    { n: "1", label: "Random assignment", detail: "each visitor has the same chance of seeing A or B" },
    { n: "2", label: "Control and treatment", detail: "differ only in the change being tested" },
    { n: "3", label: "One pre-chosen primary metric", detail: "decided before the test starts" },
    { n: "4", label: "Inference", detail: "is the difference larger than chance? read the interval, not only the point" },
  ],
  Art: ({ detail, animate }) => {
    const t = twoProportionTest(AB.xA, AB.nA, AB.xB, AB.nB);
    const dx = (v: number) => 200 + v * 2400;
    const page = (y: number, label: string, variant: boolean) => (
      <g>
        <rect x={150} y={y} width={150} height={88} rx={8} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        <UiText x={162} y={y + 24} weight={700}>
          {label}
        </UiText>
        <TextBar x={162} y={y + 36} w={90} />
        <rect x={162} y={y + 52} width={variant ? 126 : 70} height={24} rx={variant ? 12 : 4} fill={variant ? S.ink : S.surface} stroke={S.ink} strokeWidth="1" {...hair} />
        <UiText x={(variant ? 225 : 197)} y={y + 69} weight={600} anchor="middle" tone={variant ? "surface" : "ink"}>
          Pay
        </UiText>
        <UiText x={312} y={y + 50} mono weight={600}>
          {`${(((variant ? AB.xB : AB.xA) / (variant ? AB.nB : AB.nA)) * 100).toFixed(1)}%`}
        </UiText>
      </g>
    );
    return (
      <g>
        {/* arrivals and the split */}
        {Array.from({ length: 6 }, (_, i) => (
          <circle key={i} cx={16 + (i % 3) * 14} cy={92 + Math.floor(i / 3) * 14} r={4} fill={S.ink2} />
        ))}
        <path d="M60 99 H90" stroke={S.ink2} strokeWidth="1.2" {...hair} />
        <rect x={90} y={84} width={34} height={30} rx={6} fill={S.soft} stroke={S.ink} strokeWidth="1" {...hair} />
        <UiText x={107} y={104} mono weight={700} anchor="middle">
          ⚄
        </UiText>
        <Link from={[124, 92]} via={[136, 56]} to={[148, 56]} />
        <Link from={[124, 106]} via={[136, 146]} to={[148, 146]} />
        {animate && (
          <g style={{ offsetPath: 'path("M60 99 H120 Q 136 56 148 56")', offsetRotate: "0deg" }} className="anim-travel">
            <circle r={4} fill={S.accent} />
          </g>
        )}
        {page(12, "A", false)}
        {page(104, "B", true)}
        {/* the difference with its interval */}
        <line x1={dx(-0.02)} y1={246} x2={dx(0.04)} y2={246} stroke={S.ink2} strokeWidth="1" {...hair} />
        <line x1={dx(0)} y1={232} x2={dx(0)} y2={260} stroke={S.ink3} strokeWidth="1" strokeDasharray="3 3" {...hair} />
        <rect x={dx(t.low)} y={238} width={dx(t.high) - dx(t.low)} height={16} rx={4} fill={S.accentWash} stroke={S.accent} strokeWidth="1" {...hair} />
        <line x1={dx(t.diff)} y1={230} x2={dx(t.diff)} y2={262} stroke={S.ink} strokeWidth="2" {...hair} />
        <UiText x={dx(0)} y={280} mono tone="ink3" anchor="middle">
          0
        </UiText>
        <UiText x={dx(t.diff)} y={222} mono weight={600} anchor="middle">
          {`+${(t.diff * 100).toFixed(1)} pts`}
        </UiText>
        <UiText x={8} y={250} tone="ink3">
          B − A, 95% CI
        </UiText>
        {detail && (
          <>
            <Marker x={107} y={66} n={1} />
            <Marker x={300} y={12} n={2} />
            <Marker x={392} y={104} n={3} />
            <Marker x={dx(t.high) + 20} y={246} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Card sorting: items, groups, agreement                               */
/* ------------------------------------------------------------------ */
const CS_ITEMS = ["Opening hours", "Find a branch", "Renew a loan", "Fees", "Book a room", "Events"];
const CS_GROUPS = [
  { name: "Visit", items: [0, 1] },
  { name: "My account", items: [2, 3] },
  { name: "What's on", items: [4, 5] },
];
/** Illustrative share of participants who put each pair in the same group (symmetric, 0–1). */
const CS_SIM = [
  [1, 0.9, 0.1, 0.1, 0.2, 0.1],
  [0.9, 1, 0.1, 0.1, 0.2, 0.1],
  [0.1, 0.1, 1, 0.8, 0.3, 0.1],
  [0.1, 0.1, 0.8, 1, 0.2, 0.1],
  [0.2, 0.2, 0.3, 0.2, 1, 0.6],
  [0.1, 0.1, 0.1, 0.1, 0.6, 1],
];

export const cardSortingPlate: IllustrationEntry = {
  slug: "card-sorting",
  title: "Card sorting plate",
  canvas: "sheet",
  description:
    "An illustrative open card sort for a library website. On the left, six content items on separate cards: opening hours, find a branch, renew a loan, fees, book a room and events. In the middle, one participant's result: three groups they created and named themselves, Visit, My account and What's on. On the right, the aggregate across participants as a six-by-six matrix in which darker cells mean more people put that pair in the same group; strong blocks show pairs most people agree on, and book a room sits between groups. In a closed sort participants place cards into predefined categories instead. The figures are an example, not data.",
  key: [
    { n: "1", label: "Content items on cards", detail: "written in the words of the content, not the organisation" },
    { n: "2", label: "Participants group and name them", detail: "an open sort; a closed sort uses fixed categories" },
    { n: "3", label: "Aggregate agreement", detail: "how often each pair is grouped together" },
    { n: "4", label: "Items without a clear home", detail: "candidates for cross-links or a clearer label" },
  ],
  Art: ({ detail }) => (
    <g>
      {CS_ITEMS.map((t, i) => (
        <g key={t} transform={`rotate(${[-3, 2, -2, 3, -1, 2][i]} ${62} ${26 + i * 44})`}>
          <rect x={8} y={12 + i * 44} width={108} height={30} rx={4} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
          <UiText x={16} y={32 + i * 44}>
            {t}
          </UiText>
        </g>
      ))}
      {CS_GROUPS.map((g, k) => {
        const y = 12 + k * 94;
        return (
          <g key={g.name}>
            <rect x={132} y={y} width={124} height={86} rx={8} fill={S.soft} stroke={S.ink3} strokeWidth="0.9" {...hair} />
            <UiText x={142} y={y + 20} weight={700}>
              {g.name}
            </UiText>
            {g.items.map((it, j) => (
              <g key={it}>
                <rect x={140} y={y + 30 + j * 26} width={108} height={22} rx={3} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.8" {...hair} />
                <TextBar x={148} y={y + 39 + j * 26} w={[70, 56][j]} />
              </g>
            ))}
          </g>
        );
      })}
      {CS_SIM.map((row, i) =>
        row.map((v, j) => (
          <rect key={`${i}${j}`} x={274 + j * 19} y={60 + i * 19} width={17} height={17} rx={2} fill={S.ink} opacity={0.08 + v * 0.82} />
        )),
      )}
      {CS_ITEMS.map((_, i) => (
        <UiText key={i} x={274 + i * 19 + 8.5} y={52} mono tone="ink3" anchor="middle">
          {i + 1}
        </UiText>
      ))}
      <UiText x={274} y={200} tone="ink3">
        grouped together
      </UiText>
      <rect x={274} y={208} width={110} height={12} rx={3} fill={S.ink} opacity={0.9} />
      <rect x={274} y={208} width={36} height={12} rx={3} fill={S.ink} opacity={0.15} />
      {detail && (
        <>
          <Marker x={120} y={12} n={1} />
          <Marker x={256} y={12} n={2} />
          <Marker x={392} y={98} n={3} />
          <Marker x={392} y={156} n={4} to={[370, 148]} />
        </>
      )}
    </g>
  ),
};

/* ------------------------------------------------------------------ */
/* "Miller's law": limits apply to chunks                               */
/* ------------------------------------------------------------------ */
const PHONE = "07700900123";

export const millersLawPlate: IllustrationEntry = {
  slug: "millers-law",
  title: "Miller's law plate",
  canvas: "sheet",
  explorer: "chunking",
  description: `A phone number held in immediate memory, drawn as four memory slots. Above, the eleven digits arrive one by one: only four fit the slots and the rest fall away, drawn dashed. Below, the same number recoded into ${chunk(PHONE, 4).length} chunks, ${chunk(PHONE, 4).join(" ")}, fits within the slots. The limit applies to chunks, meaningful units, not raw digits; Miller's 1956 paper put it near seven, and later work puts the core capacity nearer four chunks. The finding is about holding information in mind, so it does not limit how many items a visible menu may show.`,
  key: [
    { n: "1", label: "Raw items exceed the span", detail: "eleven separate digits are too many to hold" },
    { n: "2", label: "A small capacity", detail: "about four chunks in current estimates; Miller's paper said about seven" },
    { n: "3", label: "Recoding into chunks", detail: "meaningful groups make the same information fit" },
    { n: "4", label: "Not a rule for menus", detail: "options people can see do not need to be held in memory" },
  ],
  Art: ({ detail }) => {
    const chunks = chunk(PHONE, 4);
    const slots = (y: number) => [0, 1, 2, 3].map((i) => <rect key={i} x={140 + i * 64} y={y} width={56} height={40} rx={8} fill="none" stroke={S.ink2} strokeWidth="1.2" strokeDasharray="4 3" {...hair} />);
    return (
      <g>
        <UiText x={8} y={32} mono tone="ink3">
          digits
        </UiText>
        {PHONE.split("").map((d, i) => (
          <g key={i}>
            <rect x={8 + i * 34} y={44} width={28} height={34} rx={5} fill={i < 4 ? S.surface : "none"} stroke={i < 4 ? S.ink2 : S.ruleStrong} strokeWidth="1" strokeDasharray={i < 4 ? undefined : "3 2.4"} {...hair} />
            <UiText x={22 + i * 34} y={67} mono weight={600} anchor="middle" tone={i < 4 ? "ink" : "ink3"}>
              {d}
            </UiText>
          </g>
        ))}
        <UiText x={8} y={122} mono tone="ink3">
          memory
        </UiText>
        {slots(98)}
        {[0, 1, 2, 3].map((i) => (
          <UiText key={i} x={168 + i * 64} y={124} mono weight={600} anchor="middle">
            {PHONE[i]}
          </UiText>
        ))}
        <line x1={8} y1={160} x2={392} y2={160} stroke={S.rule} strokeWidth="0.9" {...hair} />
        <UiText x={8} y={190} mono tone="ink3">
          chunks
        </UiText>
        {chunks.map((c, i) => (
          <g key={c}>
            <rect x={140 + i * 64} y={172} width={56} height={40} rx={8} fill={S.accentWash} stroke={S.accent} strokeWidth="1.2" {...hair} />
            <UiText x={168 + i * 64} y={198} mono weight={700} anchor="middle" tone="accent">
              {c}
            </UiText>
          </g>
        ))}
        <rect x={140 + 3 * 64} y={172} width={56} height={40} rx={8} fill="none" stroke={S.ink2} strokeWidth="1.2" strokeDasharray="4 3" {...hair} />
        <UiText x={140} y={244} mono weight={600}>
          {chunks.join(" ")}
        </UiText>
        <UiText x={140} y={270} tone="ink3">
          same information, three units
        </UiText>
        {detail && (
          <>
            <Marker x={300} y={30} n={1} />
            <Marker x={392} y={118} n={2} />
            <Marker x={392} y={192} n={3} />
            <Marker x={76} y={244} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Peak-end rule                                                        */
/* ------------------------------------------------------------------ */
const PE_A = [5, 6, 8, 3];
const PE_B = [5, 6, 8, 3, 5, 7];

export const peakEndPlate: IllustrationEntry = {
  slug: "peak-end-rule",
  title: "Peak-end rule plate",
  canvas: "sheet",
  animated: true,
  explorer: "peak-end",
  description: (() => {
    const a = peakEnd(PE_A);
    const b = peakEnd(PE_B);
    return `Two illustrative experiences rated moment by moment on a 0 to 10 scale, drawn as lines over time. Experience A is short: it rises to a peak of ${a.peakValue} and ends low at ${a.end}. Experience B is identical at first but continues with two better moments and ends at ${b.end}. The remembered evaluation is approximated by the average of the peak and the end: ${a.peakEndAverage} for A and ${b.peakEndAverage} for B, so B is remembered more favourably even though it lasted longer. Duration has little independent influence (duration neglect). The rule describes remembered experience, which can differ from experience moment by moment.`;
  })(),
  key: [
    { n: "1", label: "Moment-by-moment experience", detail: "how good each moment felt, in order" },
    { n: "2", label: "The peak", detail: "the most intense moment" },
    { n: "3", label: "The end", detail: "the final moment" },
    { n: "4", label: "Remembered ≈ (peak + end) / 2", detail: "length adds little: duration neglect" },
  ],
  Art: ({ detail, animate }) => {
    const sx = (i: number) => 40 + i * 64;
    const sy = (v: number) => 230 - v * 20;
    const line = (m: number[]) => m.map((v, i) => `${i ? "L" : "M"}${sx(i)} ${sy(v)}`).join(" ");
    const a = peakEnd(PE_A);
    const b = peakEnd(PE_B);
    return (
      <g>
        <line x1={40} y1={230} x2={392} y2={230} stroke={S.ink2} strokeWidth="1" {...hair} />
        <line x1={40} y1={230} x2={40} y2={20} stroke={S.ink2} strokeWidth="1" {...hair} />
        <UiText x={34} y={30} mono tone="ink3" anchor="end">
          10
        </UiText>
        <UiText x={34} y={234} mono tone="ink3" anchor="end">
          0
        </UiText>
        <UiText x={392} y={252} mono tone="ink3" anchor="end">
          time
        </UiText>
        <path d={line(PE_B)} fill="none" stroke={S.accent} strokeWidth="2" className={animate ? "anim-draw" : undefined} style={animate ? ({ "--len": 420 } as CSSProperties) : undefined} {...hair} />
        <path d={line(PE_A)} fill="none" stroke={S.ink} strokeWidth="2" strokeDasharray="5 3" {...hair} />
        {PE_B.map((v, i) => (
          <circle key={i} cx={sx(i)} cy={sy(v)} r={4} fill={i < PE_A.length ? S.ink : S.accent} />
        ))}
        <circle cx={sx(a.peakIndex)} cy={sy(a.peakValue)} r={9} fill="none" stroke={S.ink} strokeWidth="1.4" {...hair} />
        <circle cx={sx(PE_A.length - 1)} cy={sy(a.end)} r={9} fill="none" stroke={S.ink} strokeWidth="1.4" {...hair} />
        <circle cx={sx(PE_B.length - 1)} cy={sy(b.end)} r={9} fill="none" stroke={S.accent} strokeWidth="1.4" {...hair} />
        <rect x={8} y={262} width={186} height={30} rx={6} fill={S.soft} stroke={S.ink2} strokeWidth="0.9" {...hair} />
        <UiText x={20} y={282} mono weight={600}>
          {`A remembered ${a.peakEndAverage}`}
        </UiText>
        <rect x={206} y={262} width={186} height={30} rx={6} fill={S.accentWash} stroke={S.accent} strokeWidth="0.9" {...hair} />
        <UiText x={218} y={282} mono weight={600} tone="accent">
          {`B remembered ${b.peakEndAverage}`}
        </UiText>
        {detail && (
          <>
            <Marker x={sx(1) - 18} y={sy(6) - 18} n={1} />
            <Marker x={sx(a.peakIndex) + 20} y={sy(a.peakValue) - 14} n={2} />
            <Marker x={sx(PE_A.length - 1) + 20} y={sy(a.end) + 14} n={3} />
            <Marker x={200} y={250} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Von Restorff effect                                                  */
/* ------------------------------------------------------------------ */
const VR_ITEMS = ["Bread", "Milk", "Rice", "Eggs", "Tea", "Oats", "Jam"];

export const vonRestorffPlate: IllustrationEntry = {
  slug: "von-restorff-effect",
  title: "Von Restorff effect plate",
  canvas: "sheet",
  description:
    "Two lists of seven words studied for later recall. In the left list every word looks the same. In the right list one word, Tea, is set apart in a filled box. Beneath each list, an illustrative later recall: from the uniform list a few scattered words come back; from the second list Tea comes back reliably along with a few others. The isolation effect is about memory for the distinct item. A third small panel shows a list where every word is emphasised, so none is distinct: distinctiveness is relative to its context.",
  key: [
    { n: "1", label: "A uniform set", detail: "no item differs from the others" },
    { n: "2", label: "One item isolated", detail: "it differs on a dimension: here fill and weight" },
    { n: "3", label: "Later recall favours the isolate", detail: "a memory effect; illustrative recall shown" },
    { n: "4", label: "Distinctiveness is relative", detail: "when everything is emphasised, nothing stands out" },
  ],
  Art: ({ detail }) => {
    const list = (x: number, iso: number | "all" | null) =>
      VR_ITEMS.map((t, i) => {
        const on = iso === "all" || iso === i;
        return (
          <g key={t}>
            <rect x={x} y={14 + i * 26} width={92} height={22} rx={4} fill={on ? S.ink : S.surface} stroke={S.ruleStrong} strokeWidth="0.8" {...hair} />
            <UiText x={x + 10} y={30 + i * 26} weight={on ? 700 : 400} tone={on ? "surface" : "ink"}>
              {t}
            </UiText>
          </g>
        );
      });
    const recall = (x: number, words: string[], hi?: string) => (
      <g>
        <rect x={x} y={214} width={124} height={78} rx={6} fill={S.soft} stroke={S.rule} strokeWidth="0.9" {...hair} />
        <UiText x={x + 10} y={232} mono tone="ink3">
          later
        </UiText>
        {words.map((w, i) => (
          <UiText key={w} x={x + 10 + (i % 2) * 56} y={254 + Math.floor(i / 2) * 22} weight={w === hi ? 700 : 400} tone={w === hi ? "accent" : "ink2"}>
            {w}
          </UiText>
        ))}
      </g>
    );
    return (
      <g>
        {list(8, null)}
        {list(144, 4)}
        <g opacity={0.9}>{list(296, "all")}</g>
        {recall(8, ["Bread", "Jam", "Oats"])}
        {recall(144, ["Tea", "Bread", "Jam"], "Tea")}
        <Verdict x={360} y={232} ok={false} />
        {detail && (
          <>
            <Marker x={112} y={14} n={1} />
            <Marker x={248} y={130} n={2} />
            <Marker x={280} y={258} n={3} />
            <Marker x={392} y={198} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Choice overload: not a general effect                                */
/* ------------------------------------------------------------------ */
export const choiceOverloadPlate: IllustrationEntry = {
  slug: "choice-overload",
  title: "Choice overload plate",
  canvas: "sheet",
  description:
    "Above, the same product shelf with 6 options and with 24. Below, an illustrative spread of study results drawn as points around a vertical line at zero effect: some studies find fewer choices made with more options, some find more, and on average the effect is close to zero, as meta-analyses report. On the right, the conditions under which overload does appear reliably: a complex choice set, a difficult decision, uncertain preferences and a goal of choosing rather than browsing. The points are illustrative, not data from a particular meta-analysis.",
  key: [
    { n: "1", label: "More options", detail: "the manipulation studied, from few to many" },
    { n: "2", label: "Across studies, near zero on average", detail: "results vary in both directions; points are illustrative" },
    { n: "3", label: "When overload appears", detail: "complex sets, hard decisions, unclear preferences, a goal to choose" },
    { n: "4", label: "Design implication", detail: "help people compare and decide, rather than cutting options blindly" },
  ],
  Art: ({ detail }) => {
    const dots = [0.06, -0.3, 0.2, -0.04, 0.55, -0.5, 0.12, -0.1, 0.35, -0.22, 0.02];
    const ex = (v: number) => 120 + v * 140;
    return (
      <g>
        <rect x={8} y={12} width={84} height={96} rx={6} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        {Array.from({ length: 6 }, (_, i) => (
          <rect key={i} x={18 + (i % 3) * 24} y={26 + Math.floor(i / 3) * 34} width={18} height={26} rx={3} fill={S.soft} stroke={S.ink2} strokeWidth="0.8" {...hair} />
        ))}
        <UiText x={50} y={126} mono anchor="middle" tone="ink3">
          6
        </UiText>
        <rect x={104} y={12} width={168} height={96} rx={6} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        {Array.from({ length: 24 }, (_, i) => (
          <rect key={i} x={112 + (i % 8) * 20} y={20 + Math.floor(i / 8) * 28} width={14} height={22} rx={2.5} fill={S.soft} stroke={S.ink2} strokeWidth="0.8" {...hair} />
        ))}
        <UiText x={188} y={126} mono anchor="middle" tone="ink3">
          24
        </UiText>
        {/* spread of effects */}
        <line x1={ex(-0.7)} y1={248} x2={ex(0.7)} y2={248} stroke={S.ink2} strokeWidth="1" {...hair} />
        <line x1={ex(0)} y1={150} x2={ex(0)} y2={256} stroke={S.ink} strokeWidth="1.2" strokeDasharray="3 3" {...hair} />
        {dots.map((v, i) => (
          <circle key={i} cx={ex(v)} cy={160 + i * 8} r={4} fill={S.ink2} />
        ))}
        <UiText x={ex(0)} y={276} mono anchor="middle" tone="ink3">
          0
        </UiText>
        <UiText x={ex(-0.7)} y={294} mono tone="ink3">
          fewer choices
        </UiText>
        <UiText x={ex(0.7)} y={294} mono tone="ink3" anchor="end">
          more
        </UiText>
        <Card x={284} y={12} w={108} h={280} tone="soft">
          {["complex set", "hard decision", "unclear", "preferences", "goal: choose"].map((t, i) => (
            <UiText key={i} x={296} y={44 + i * 26 + (i > 2 ? -8 : 0)} tone="ink">
              {t}
            </UiText>
          ))}
          <line x1={296} y1={168} x2={380} y2={168} stroke={S.rule} strokeWidth="0.9" {...hair} />
          <UiText x={296} y={196} weight={600}>
            then overload
          </UiText>
          <UiText x={296} y={216} weight={600}>
            appears
          </UiText>
        </Card>
        {detail && (
          <>
            <Marker x={92} y={60} n={1} />
            <Marker x={ex(0) + 18} y={152} n={2} />
            <Marker x={380} y={12} n={3} />
            <Marker x={338} y={262} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Net Promoter Score                                                   */
/* ------------------------------------------------------------------ */
const NPS_EX = { promoters: 45, passives: 30, detractors: 25 };

export const npsPlate: IllustrationEntry = {
  slug: "net-promoter-score",
  title: "Net Promoter Score plate",
  canvas: "sheet",
  description: (() => {
    const r = nps(NPS_EX.promoters, NPS_EX.passives, NPS_EX.detractors);
    return `The single question, how likely are you to recommend this to a friend or colleague, answered on an eleven-point scale from 0 to 10. The scale is divided into detractors (0 to 6), passives (7 and 8) and promoters (9 and 10). For an illustrative 100 responses, ${NPS_EX.promoters} promoters, ${NPS_EX.passives} passives and ${NPS_EX.detractors} detractors, the score is ${NPS_EX.promoters}% − ${NPS_EX.detractors}% = ${Math.round(r.nps)}, placed on a scale from −100 to +100 with its margin of error of about ±${Math.round(r.marginOfError)} points. Passives do not count. The metric's claimed link to company growth is contested.`;
  })(),
  key: [
    { n: "1", label: "One question, 0 to 10", detail: "likelihood to recommend" },
    { n: "2", label: "Three groups", detail: "detractors 0–6, passives 7–8, promoters 9–10" },
    { n: "3", label: "NPS = % promoters − % detractors", detail: "from −100 to +100; passives are ignored" },
    { n: "4", label: "Report the margin of error", detail: "and treat the link to growth as contested" },
  ],
  Art: ({ detail }) => {
    const r = nps(NPS_EX.promoters, NPS_EX.passives, NPS_EX.detractors);
    const cx = (i: number) => 12 + i * 34.4;
    const group = (i: number) => (i <= 6 ? "d" : i <= 8 ? "p" : "P");
    const sx = (v: number) => 200 + v * 1.8;
    return (
      <g>
        {Array.from({ length: 11 }, (_, i) => (
          <g key={i}>
            <rect x={cx(i)} y={30} width={30} height={34} rx={6} fill={group(i) === "P" ? S.ink : group(i) === "p" ? S.soft : S.surface} stroke={S.ink2} strokeWidth="0.9" {...hair} />
            <UiText x={cx(i) + 15} y={53} mono weight={600} anchor="middle" tone={group(i) === "P" ? "surface" : "ink"}>
              {i}
            </UiText>
          </g>
        ))}
        {[
          ["detractors", 0, 6],
          ["passives", 7, 8],
          ["promoters", 9, 10],
        ].map(([t, a, b]) => (
          <g key={t as string}>
            <path d={`M${cx(a as number)} 74 v6 H${cx(b as number) + 30} v-6`} fill="none" stroke={S.ink2} strokeWidth="1" {...hair} />
            <UiText x={(cx(a as number) + cx(b as number) + 30) / 2} y={98} anchor="middle" weight={600}>
              {t as string}
            </UiText>
          </g>
        ))}
        {/* the sample */}
        {[
          [NPS_EX.detractors, S.surface, 12],
          [NPS_EX.passives, S.soft, 12 + NPS_EX.detractors * 3.76],
          [NPS_EX.promoters, S.ink, 12 + (NPS_EX.detractors + NPS_EX.passives) * 3.76],
        ].map(([n, c, x], i) => (
          <g key={i}>
            <rect x={x as number} y={124} width={(n as number) * 3.76 - 2} height={28} rx={4} fill={c as string} stroke={S.ink2} strokeWidth="0.9" {...hair} />
            <UiText x={(x as number) + 8} y={143} mono weight={600} tone={i === 2 ? "surface" : "ink"}>
              {`${n}%`}
            </UiText>
          </g>
        ))}
        <UiText x={200} y={190} size={T.strong} mono weight={700} anchor="middle">
          {`${NPS_EX.promoters} − ${NPS_EX.detractors} = ${Math.round(r.nps)}`}
        </UiText>
        <line x1={sx(-100)} y1={244} x2={sx(100)} y2={244} stroke={S.ink2} strokeWidth="1" {...hair} />
        <rect x={sx(r.nps - r.marginOfError)} y={236} width={sx(r.nps + r.marginOfError) - sx(r.nps - r.marginOfError)} height={16} rx={4} fill={S.accentWash} stroke={S.accent} strokeWidth="1" {...hair} />
        <line x1={sx(r.nps)} y1={228} x2={sx(r.nps)} y2={260} stroke={S.ink} strokeWidth="2" {...hair} />
        {[-100, 0, 100].map((v) => (
          <UiText key={v} x={sx(v)} y={280} mono tone="ink3" anchor="middle">
            {v > 0 ? `+${v}` : String(v)}
          </UiText>
        ))}
        {detail && (
          <>
            <Marker x={392} y={20} n={1} />
            <Marker x={14} y={104} n={2} />
            <Marker x={300} y={186} n={3} />
            <Marker x={sx(r.nps + r.marginOfError) + 18} y={244} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Jobs to be done                                                      */
/* ------------------------------------------------------------------ */
export const jtbdPlate: IllustrationEntry = {
  slug: "jobs-to-be-done",
  title: "Jobs to be done plate",
  canvas: "sheet",
  description:
    "An illustrative job read from left to right. The circumstance: a weekday morning, the train is cancelled and a 9:00 meeting is near. The job, the progress the person wants to make: get to the meeting on time without panic, with three dimensions beneath it, functional (arrive by 9:00), emotional (stay calm) and social (look reliable). On the right, the solutions the person could hire for that job, which compete with each other although they are different kinds of product: a taxi app, a bike-share dock, and messaging the team to join by phone. Progress, not the product category or the person's demographics, is the unit of analysis.",
  key: [
    { n: "1", label: "The circumstance", detail: "the situation that creates the need" },
    { n: "2", label: "The job", detail: "the progress the person is trying to make" },
    { n: "3", label: "Functional, emotional and social dimensions", detail: "all part of what 'done' means" },
    { n: "4", label: "Competing solutions", detail: "anything that could be hired for the job, across categories" },
  ],
  Art: ({ detail }) => (
    <g>
      <Card x={8} y={20} w={112} h={152} tone="soft">
        <UiText x={20} y={44} mono tone="ink3">
          WHEN
        </UiText>
        <UiText x={20} y={70} weight={600}>
          Train
        </UiText>
        <UiText x={20} y={88} weight={600}>
          cancelled
        </UiText>
        <UiText x={20} y={116} tone="ink2">
          meeting
        </UiText>
        <UiText x={20} y={134} tone="ink2">
          at 9:00
        </UiText>
        <rect x={20} y={146} width={56} height={14} rx={3} fill={S.errorWash} stroke={S.error} strokeWidth="0.8" {...hair} />
      </Card>
      <Link from={[122, 96]} to={[140, 96]} />
      <Card x={142} y={20} w={128} h={152} tone="accent">
        <UiText x={154} y={44} mono tone="accent">
          THE JOB
        </UiText>
        <UiText x={154} y={72} weight={700}>
          Get there on
        </UiText>
        <UiText x={154} y={90} weight={700}>
          time, calmly
        </UiText>
      </Card>
      {["functional", "emotional", "social"].map((t, i) => (
        <g key={t}>
          <rect x={142} y={186 + i * 34} width={128} height={26} rx={13} fill={S.surface} stroke={S.ink2} strokeWidth="0.9" {...hair} />
          <UiText x={206} y={204 + i * 34} anchor="middle" tone="ink2">
            {t}
          </UiText>
        </g>
      ))}
      <line x1={206} y1={172} x2={206} y2={186} stroke={S.ink2} strokeWidth="1" {...hair} />
      {["Taxi app", "Bike share", "Join by phone"].map((t, i) => (
        <g key={t}>
          <rect x={292} y={20 + i * 56} width={100} height={44} rx={8} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
          <UiText x={302} y={47 + i * 56} weight={600}>
            {t}
          </UiText>
          <Link from={[272, 96]} via={[282, 42 + i * 56]} to={[290, 42 + i * 56]} tone="mute" />
        </g>
      ))}
      <UiText x={292} y={204} tone="ink3">
        all hired for
      </UiText>
      <UiText x={292} y={222} tone="ink3">
        the same job
      </UiText>
      {detail && (
        <>
          <Marker x={8} y={20} n={1} />
          <Marker x={270} y={20} n={2} />
          <Marker x={130} y={220} n={3} />
          <Marker x={392} y={20} n={4} />
        </>
      )}
    </g>
  ),
};

/* ------------------------------------------------------------------ */
/* HEART framework with Goals–Signals–Metrics                           */
/* ------------------------------------------------------------------ */
export const heartPlate: IllustrationEntry = {
  slug: "heart-framework",
  title: "HEART framework plate",
  canvas: "sheet",
  description:
    "A grid with the five HEART categories as rows, Happiness, Engagement, Adoption, Retention and Task success, and the Goals–Signals–Metrics process as columns. One row is filled in as an illustrative example for a library app: for Task success, the goal is finding and borrowing a book quickly, the signal is a search followed by a loan, and the metric is the share of searches ending in a loan within two minutes. The other rows are left as placeholders, and Retention is shown dashed as a category this team chose not to track, because not every category fits every product.",
  key: [
    { n: "1", label: "Five categories", detail: "Happiness, Engagement, Adoption, Retention, Task success" },
    { n: "2", label: "Goals", detail: "what the user experience should achieve" },
    { n: "3", label: "Signals", detail: "behaviour or attitudes that would show progress" },
    { n: "4", label: "Metrics", detail: "specific, trackable measures of the signals" },
    { n: "5", label: "Choose what fits", detail: "skip categories that do not matter for the product" },
  ],
  Art: ({ detail }) => {
    const rows = ["Happiness", "Engagement", "Adoption", "Retention", "Task success"];
    const cols = [
      { x: 120, t: "Goal" },
      { x: 212, t: "Signal" },
      { x: 304, t: "Metric" },
    ];
    const example = ["Borrow fast", "Search, loan", "≤ 2 min"];
    return (
      <g>
        {cols.map((c) => (
          <UiText key={c.t} x={c.x + 44} y={24} mono tone="ink3" anchor="middle">
            {c.t}
          </UiText>
        ))}
        {cols.slice(0, 2).map((c) => (
          <polygon key={c.t} points={head(c.x + 92, 20, 1, 0, 5)} fill={S.ink3} />
        ))}
        {rows.map((r, i) => {
          const y = 36 + i * 52;
          const skip = r === "Retention";
          const ex = r === "Task success";
          return (
            <g key={r} opacity={skip ? 0.7 : 1}>
              <rect x={8} y={y} width={106} height={44} rx={6} fill={ex ? S.ink : S.surface} stroke={S.ink2} strokeWidth="0.9" strokeDasharray={skip ? "3 2.4" : undefined} {...hair} />
              <UiText x={18} y={y + 27} weight={700} tone={ex ? "surface" : "ink"}>
                {r}
              </UiText>
              {cols.map((c, k) => (
                <g key={c.t}>
                  <rect x={c.x} y={y} width={88} height={44} rx={6} fill={ex ? S.accentWash : S.surface} stroke={ex ? S.accent : S.rule} strokeWidth="0.9" strokeDasharray={skip ? "3 2.4" : undefined} {...hair} />
                  {ex ? (
                    <UiText x={c.x + 8} y={y + 27} tone="accent">
                      {example[k]}
                    </UiText>
                  ) : (
                    !skip && <TextBar x={c.x + 10} y={y + 20} w={[56, 48, 62][k]} />
                  )}
                </g>
              ))}
            </g>
          );
        })}
        {detail && (
          <>
            <Marker x={8} y={36} n={1} />
            <Marker x={120} y={14} n={2} />
            <Marker x={212} y={14} n={3} />
            <Marker x={304} y={14} n={4} />
            <Marker x={392} y={192} n={5} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Semantic tokens: one set of names, two mappings                      */
/* ------------------------------------------------------------------ */
export const semanticTokensPlate: IllustrationEntry = {
  slug: "semantic-tokens",
  title: "Semantic tokens plate",
  canvas: "sheet",
  description:
    "Three columns joined by arrows. In the middle, four semantic tokens named by purpose: color.surface.default, color.text.default, color.text.danger and color.action.background. Each refers to a primitive on the left in the light theme — grey.0, grey.900, red.700, blue.600 — and to a different primitive on the right in the dark theme — grey.950, grey.50, red.400, blue.400. A bracket joins text.default and surface.default as a pair whose contrast must be checked in each theme. Below, a Renew button and an error message point only at the middle column, so they follow either theme without changing.",
  key: [
    { n: "1", label: "Semantic tokens", detail: "names for the job a value does; components use only these" },
    { n: "2", label: "Light mapping", detail: "each name refers to a primitive in the light theme" },
    { n: "3", label: "Dark mapping", detail: "the same names refer to different primitives; only the references change" },
    { n: "4", label: "A pair", detail: "text on a surface; contrast is checked for the pair, in every theme" },
    { n: "5", label: "Components", detail: "point at roles, never at primitives, so a theme cannot be half-applied" },
  ],
  Art: ({ detail }) => {
    const rows = [
      { name: "surface.default", light: "grey.0", dark: "grey.950", lf: tok("grey-0"), df: tok("grey-950") },
      { name: "text.default", light: "grey.900", dark: "grey.50", lf: tok("grey-900"), df: tok("grey-50") },
      { name: "text.danger", light: "red.700", dark: "red.400", lf: tok("red-700"), df: tok("red-400") },
      { name: "action.background", light: "blue.600", dark: "blue.400", lf: tok("blue-600"), df: tok("blue-400") },
    ];
    const ry = (i: number) => 44 + i * 38;
    const chip = (x: number, y: number, label: string, fill: string) => (
      <g>
        <rect x={x} y={y} width={100} height={28} rx={6} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        <rect x={x + 7} y={y + 7} width={14} height={14} rx={3} fill={fill} stroke={S.ink2} strokeWidth="0.7" {...hair} />
        <UiText x={x + 27} y={y + 19} mono>
          {label}
        </UiText>
      </g>
    );
    return (
      <g>
        <UiText x={58} y={30} mono tone="ink3" anchor="middle">
          light
        </UiText>
        <UiText x={200} y={30} mono tone="ink3" anchor="middle">
          semantic
        </UiText>
        <UiText x={342} y={30} mono tone="ink3" anchor="middle">
          dark
        </UiText>
        {/* the pair: text.default on surface.default */}
        <rect x={119} y={ry(0) - 5} width={162} height={ry(1) - ry(0) + 38} rx={9} fill="none" stroke={S.accent} strokeWidth="1.2" strokeDasharray="4 3" {...hair} />
        {rows.map((r, i) => (
          <g key={r.name}>
            {chip(8, ry(i), r.light, r.lf)}
            {chip(292, ry(i), r.dark, r.df)}
            <rect x={124} y={ry(i)} width={152} height={28} rx={6} fill={S.soft} stroke={S.ink2} strokeWidth="1.1" {...hair} />
            <UiText x={200} y={ry(i) + 19} mono weight={600} anchor="middle">
              {r.name}
            </UiText>
            <Link from={[124, ry(i) + 14]} to={[110, ry(i) + 14]} />
            <Link from={[276, ry(i) + 14]} to={[290, ry(i) + 14]} />
          </g>
        ))}
        <line x1={8} y1={204} x2={392} y2={204} stroke={S.rule} strokeWidth="0.9" {...hair} />
        <UiButton x={152} y={224} w={96} label="Renew" />
        <UiText x={292} y={242} tone="error">
          Card expired
        </UiText>
        <Link from={[200, 224]} to={[200, ry(3) + 30]} tone="mute" dashed />
        <Link from={[330, 228]} to={[270, ry(2) + 28]} via={[330, 176]} tone="mute" dashed />
        <UiText x={8} y={276} tone="ink3">
          components use roles; a theme chooses a column
        </UiText>
        {detail && (
          <>
            <Marker x={200} y={44} n={1} />
            <Marker x={8} y={44} n={2} />
            <Marker x={392} y={44} n={3} />
            <Marker x={281} y={58} n={4} tone="accent" />
            <Marker x={152} y={224} n={5} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Primitive tokens: the options, chosen from by semantic tokens        */
/* ------------------------------------------------------------------ */
export const primitiveTokensPlate: IllustrationEntry = {
  slug: "primitive-tokens",
  title: "Primitive tokens plate",
  canvas: "sheet",
  description:
    "A grey ramp of eight swatches from lightest to darkest, labelled 0, 50, 300, 500, 600, 700, 900 and 950, with gaps in the numbering so steps can be added later. Below it, two semantic tokens, surface.default and text.default, point up to the steps they use: grey.0 and grey.900. A component token, button.label, points to text.default; a dashed line from button.label straight to the ramp is crossed out, because components should not use primitives. At the bottom, a spacing scale of six steps, space.100 to space.800, drawn as blocks of 4, 8, 12, 16, 24 and 32 pixels.",
  key: [
    { n: "1", label: "A colour ramp", detail: "the greys that exist; numbered with gaps so a step can be inserted" },
    { n: "2", label: "Semantic tokens choose", detail: "roles refer to steps; the ramp itself has no meaning" },
    { n: "3", label: "Not from components", detail: "a component that names a primitive cannot follow a theme" },
    { n: "4", label: "A spacing scale", detail: "dimension primitives, 4 to 32 px, in the same naming pattern" },
  ],
  Art: ({ detail }) => {
    const steps = ["0", "50", "300", "500", "600", "700", "900", "950"] as const;
    const sx = (i: number) => 8 + i * 48;
    const space = [
      ["100", 4],
      ["200", 8],
      ["300", 12],
      ["400", 16],
      ["600", 24],
      ["800", 32],
    ] as const;
    return (
      <g>
        <UiText x={8} y={20} mono tone="ink3">
          color.grey
        </UiText>
        {steps.map((n, i) => (
          <g key={n}>
            <rect x={sx(i)} y={30} width={44} height={40} rx={5} fill={tok(`grey-${n}`)} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
            <UiText x={sx(i) + 22} y={88} mono anchor="middle" tone="ink2">
              {n}
            </UiText>
          </g>
        ))}
        <rect x={40} y={118} width={144} height={28} rx={6} fill={S.soft} stroke={S.ink2} strokeWidth="1.1" {...hair} />
        <UiText x={112} y={137} mono weight={600} anchor="middle">
          surface.default
        </UiText>
        <rect x={248} y={118} width={144} height={28} rx={6} fill={S.soft} stroke={S.ink2} strokeWidth="1.1" {...hair} />
        <UiText x={320} y={137} mono weight={600} anchor="middle">
          text.default
        </UiText>
        <Link from={[60, 118]} to={[30, 94]} via={[36, 112]} />
        <Link from={[320, 118]} to={[sx(6) + 22, 94]} />
        <rect x={248} y={170} width={144} height={28} rx={6} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        <UiText x={320} y={189} mono anchor="middle">
          button.label
        </UiText>
        <Link from={[320, 170]} to={[320, 148]} />
        <Link from={[248, 184]} to={[sx(6) + 6, 94]} via={[206, 124]} tone="error" dashed />
        <Verdict x={220} y={164} ok={false} />
        <line x1={8} y1={212} x2={392} y2={212} stroke={S.rule} strokeWidth="0.9" {...hair} />
        <UiText x={8} y={234} mono tone="ink3">
          space
        </UiText>
        {space.map(([n, v], i) => (
          <g key={n}>
            <rect x={72 + i * 54 + (40 - v * 1.25) / 2} y={224} width={v * 1.25} height={14} rx={2} fill={S.accent} fillOpacity={0.8} />
            <UiText x={72 + i * 54 + 20} y={262} mono anchor="middle" tone="ink2">
              {n}
            </UiText>
          </g>
        ))}
        {detail && (
          <>
            <Marker x={8} y={30} n={1} />
            <Marker x={40} y={118} n={2} />
            <Marker x={220} y={164} n={3} />
            <Marker x={60} y={224} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Visibility of system status: feedback scaled to duration             */
/* ------------------------------------------------------------------ */
export const visibilityOfSystemStatusPlate: IllustrationEntry = {
  slug: "visibility-of-system-status",
  title: "Visibility of system status plate",
  canvas: "sheet",
  description:
    "A timeline of how long an operation takes, marked at about 0.1 s, 1 s and 10 s, divided into four zones. Above each zone, the feedback that fits it: under 0.1 s a Save button simply pressed; up to 1 s the button changes to 'Saving…'; up to 10 s a skeleton of the content that is loading; beyond 10 s a determinate progress bar reading 3 of 5 with a Cancel button. Below the timeline, the confirmed result 'Saved · 10:42' tagged role=\"status\", meaning it is also announced to screen-reader users without moving focus.",
  key: [
    { n: "1", label: "Under about 0.1 s", detail: "feels instantaneous; the pressed state and the result are enough" },
    { n: "2", label: "Up to about 1 s", detail: "acknowledge at once; the flow of thought continues" },
    { n: "3", label: "Up to about 10 s", detail: "show work in progress where it happens, such as a skeleton" },
    { n: "4", label: "Beyond about 10 s", detail: "show determinate progress, allow Cancel, notify when done" },
    { n: "5", label: "Announced status", detail: "the confirmed result in a status message, so screen readers hear it too" },
  ],
  Art: ({ detail }) => {
    const ticks = [
      [100, "0.1 s"],
      [196, "1 s"],
      [296, "10 s"],
    ] as const;
    return (
      <g>
        <Pointer x={70} y={98} />
        <UiButton x={18} y={78} w={72} label="Save" />
        <UiButton x={108} y={78} w={80} label="Saving…" />
        <rect x={204} y={44} width={84} height={96} rx={6} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        <TextBar x={214} y={58} w={60} strong />
        <TextBar x={214} y={74} w={64} />
        <TextBar x={214} y={88} w={52} />
        <TextBar x={214} y={108} w={64} />
        <TextBar x={214} y={122} w={44} />
        <UiText x={304} y={74} tone="ink2">
          3 of 5
        </UiText>
        <rect x={304} y={84} width={84} height={8} rx={4} fill={S.sunken} />
        <rect x={304} y={84} width={50} height={8} rx={4} fill={S.accent} />
        <UiButton x={304} y={104} w={72} label="Cancel" variant="secondary" />
        <line x1={8} y1={176} x2={392} y2={176} stroke={S.ink} strokeWidth="1.2" {...hair} />
        {ticks.map(([x, t]) => (
          <g key={t}>
            <line x1={x} y1={168} x2={x} y2={184} stroke={S.ink2} strokeWidth="1" {...hair} />
            <UiText x={x} y={202} mono anchor="middle" tone="ink2">
              {t}
            </UiText>
          </g>
        ))}
        <rect x={70} y={226} width={180} height={34} rx={6} fill={S.soft} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        <Verdict x={88} y={243} ok />
        <UiText x={104} y={248} weight={600}>
          Saved · 10:42
        </UiText>
        <UiText x={262} y={248} mono tone="ink3">
          {`role="status"`}
        </UiText>
        {detail && (
          <>
            <Marker x={18} y={78} n={1} />
            <Marker x={108} y={78} n={2} />
            <Marker x={204} y={44} n={3} />
            <Marker x={392} y={88} n={4} />
            <Marker x={70} y={226} n={5} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* User control and freedom: undo, labelled exits, keyboard escape      */
/* ------------------------------------------------------------------ */
export const userControlAndFreedomPlate: IllustrationEntry = {
  slug: "user-control-and-freedom",
  title: "User control and freedom plate",
  canvas: "sheet",
  description:
    "On the left, a reading list where one book has just been removed: its row is faded and a message at the bottom reads 'Removed Middlemarch' with an Undo button. On the right, two keys: Escape, which closes a dialog and returns focus to where it was, and Ctrl or Command plus Z, which undoes the last action. Below the keys, two ways to leave a dialog: a button labelled Cancel, marked correct, and a bare × icon, marked wrong because it could mean either close or cancel.",
  key: [
    { n: "1", label: "Undo, visible", detail: "the action happens at once and can be reversed; the message stays until dismissed" },
    { n: "2", label: "Escape", detail: "closes a dialog and returns focus to the control that opened it" },
    { n: "3", label: "Undo shortcut", detail: "Ctrl+Z or ⌘Z reverses the last action" },
    { n: "4", label: "Labelled exit", detail: "'Cancel' in words; a bare × could mean close or cancel" },
  ],
  Art: ({ detail }) => {
    const rows = ["Middlemarch", "Persuasion", "Bleak House"];
    const key = (x: number, y: number, label: string, w = 52) => (
      <g>
        <rect x={x} y={y} width={w} height={30} rx={6} fill={S.surface} stroke={S.ink2} strokeWidth="1.1" {...hair} />
        <rect x={x + 2} y={y + 26} width={w - 4} height={2} rx={1} fill={S.ruleStrong} />
        <UiText x={x + w / 2} y={y + 20} mono weight={600} anchor="middle">
          {label}
        </UiText>
      </g>
    );
    return (
      <g>
        <UiFrame x={8} y={14} w={190} h={196}>
          <UiText x={14} y={26} weight={600}>
            Reading list
          </UiText>
          {rows.map((t, i) => (
            <g key={t} opacity={i === 0 ? 0.35 : 1}>
              <rect x={10} y={40 + i * 34} width={170} height={28} rx={5} fill={S.surface} stroke={S.rule} strokeWidth="0.8" {...hair} />
              <UiText x={20} y={59 + i * 34}>
                {t}
              </UiText>
            </g>
          ))}
          <rect x={10} y={150} width={170} height={36} rx={6} fill={S.ink} />
          <UiText x={20} y={173} tone="surface">
            Removed
          </UiText>
          <rect x={118} y={156} width={54} height={24} rx={5} fill={S.surface} />
          <UiText x={145} y={173} weight={600} anchor="middle">
            Undo
          </UiText>
        </UiFrame>
        {key(222, 24, "Esc")}
        <UiText x={284} y={44} tone="ink2">
          close, focus back
        </UiText>
        {key(222, 74, "⌘Z")}
        <UiText x={284} y={94} tone="ink2">
          undo last action
        </UiText>
        <line x1={214} y1={126} x2={392} y2={126} stroke={S.rule} strokeWidth="0.9" {...hair} />
        <UiButton x={222} y={146} w={84} label="Cancel" variant="secondary" />
        <Verdict x={326} y={159} ok />
        <rect x={222} y={186} width={30} height={26} rx={6} fill={S.surface} stroke={S.control} strokeWidth="0.9" {...hair} />
        <UiText x={237} y={204} weight={600} anchor="middle">
          ×
        </UiText>
        <Verdict x={274} y={199} ok={false} />
        <UiText x={8} y={240} tone="ink3">
          act at once, offer a way back; exits are labelled
        </UiText>
        {detail && (
          <>
            <Marker x={196} y={182} n={1} />
            <Marker x={222} y={24} n={2} />
            <Marker x={222} y={74} n={3} />
            <Marker x={222} y={146} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Consistency and standards: one action, one name, one place           */
/* ------------------------------------------------------------------ */
export const consistencyPrinciplePlate: IllustrationEntry = {
  slug: "consistency-principle",
  title: "Consistency and standards plate",
  canvas: "sheet",
  description:
    "Two rows of three small screens from the same app, each with a way to save a search. In the top row, marked wrong, the action is a text button 'Save' at the top of the first screen, a 'Bookmark' button at the top right of the second, and an unlabelled star at the end of a row on the third: three names, three icons, three places. In the bottom row, marked correct, all three screens use the same labelled 'Save' button in the same position. The same component also carries the same accessible name everywhere.",
  key: [
    { n: "1", label: "Inconsistent", detail: "one action with three names, icons and positions; people wonder whether they are the same" },
    { n: "2", label: "Consistent", detail: "one name, one component, one place, so what is learned once keeps working" },
    { n: "3", label: "Same identification", detail: "the same function keeps the same label and accessible name (WCAG 2.2 SC 3.2.4)" },
  ],
  Art: ({ detail }) => {
    const screen = (x: number, y: number) => (
      <g>
        <rect x={x} y={y} width={116} height={84} rx={7} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        <TextBar x={x + 10} y={y + 40} w={70} />
        <TextBar x={x + 10} y={y + 54} w={84} />
        <TextBar x={x + 10} y={y + 68} w={58} />
      </g>
    );
    const xs = [8, 142, 276];
    return (
      <g>
        {xs.map((x) => screen(x, 20))}
        <UiButton x={18} y={28} w={56} h={24} label="Save" variant="ghost" />
        <rect x={204} y={28} width={78} height={24} rx={5} fill={S.surface} stroke={S.control} strokeWidth="0.9" {...hair} />
        <UiText x={243} y={45} anchor="middle">
          Bookmark
        </UiText>
        <path d="M371 60 l3.5 7 7.5 1 -5.5 5.2 1.3 7.6 -6.8 -3.6 -6.8 3.6 1.3 -7.6 -5.5 -5.2 7.5 -1 z" fill="none" stroke={S.ink} strokeWidth="1.1" {...hair} />
        <Verdict x={200} y={118} ok={false} />
        <line x1={8} y1={136} x2={392} y2={136} stroke={S.rule} strokeWidth="0.9" {...hair} />
        {xs.map((x) => (
          <g key={x}>
            {screen(x, 152)}
            <UiButton x={x + 54} y={160} w={52} h={24} label="Save" />
          </g>
        ))}
        <Verdict x={200} y={252} ok />
        <UiText x={8} y={276} tone="ink3">
          same action, same name, same place
        </UiText>
        {detail && (
          <>
            <Marker x={8} y={20} n={1} />
            <Marker x={8} y={152} n={2} />
            <Marker x={392} y={186} n={3} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Error prevention: slips constrained, mistakes previewed              */
/* ------------------------------------------------------------------ */
export const errorPreventionPlate: IllustrationEntry = {
  slug: "error-prevention",
  title: "Error prevention plate",
  canvas: "sheet",
  description:
    "Two halves. On the left, preventing slips: a calendar in which the days before the departure date are disabled so a return date cannot be picked before it, and a card-number field that accepts the number typed with spaces, marked correct. On the right, preventing mistakes: a confirmation that previews the consequence, 'Delete folder Reports — 24 files will be deleted', with the buttons 'Delete 24 files' and 'Cancel'. Beneath each half, the kind of error it addresses: a slip is the right goal carried out wrongly; a mistake is the wrong goal from a misunderstanding.",
  key: [
    { n: "1", label: "Constraint", detail: "dates before departure cannot be chosen, so the slip is impossible" },
    { n: "2", label: "Forgiving format", detail: "the number is accepted with spaces and normalised" },
    { n: "3", label: "Preview the consequence", detail: "say exactly what will happen before a costly, irreversible action" },
    { n: "4", label: "Slips and mistakes", detail: "slips need constraints at the point of action; mistakes need better information" },
  ],
  Art: ({ detail }) => {
    const cell = (i: number) => ({ x: 14 + (i % 7) * 24, y: 44 + Math.floor(i / 7) * 22 });
    return (
      <g>
        <UiText x={8} y={24} mono tone="ink3">
          slips
        </UiText>
        <UiText x={214} y={24} mono tone="ink3">
          mistakes
        </UiText>
        <rect x={8} y={34} width={180} height={78} rx={6} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        {Array.from({ length: 21 }, (_, i) => {
          const c = cell(i);
          const off = i < 9;
          const dep = i === 9;
          const ret = i === 13;
          return (
            <rect
              key={i}
              x={c.x}
              y={c.y}
              width={20}
              height={18}
              rx={3}
              fill={dep || ret ? S.accent : off ? S.sunken : S.surface}
              stroke={off ? S.rule : S.control}
              strokeWidth="0.8"
              strokeDasharray={off ? "2 1.8" : undefined}
              {...hair}
            />
          );
        })}
        <UiField x={8} y={134} w={180} label="Card number" value="1234 5678 9012 34" />
        <Verdict x={176} y={170} ok />
        <rect x={214} y={34} width={178} height={130} rx={8} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        <UiText x={226} y={58} weight={600}>
          {`Delete folder "Reports"?`}
        </UiText>
        <UiText x={226} y={80} tone="ink2">
          24 files will be deleted.
        </UiText>
        <UiText x={226} y={98} tone="ink2">
          This cannot be undone.
        </UiText>
        <UiButton x={226} y={122} w={104} label="Delete 24 files" />
        <UiButton x={334} y={122} w={52} label="Cancel" variant="secondary" />
        <line x1={8} y1={206} x2={392} y2={206} stroke={S.rule} strokeWidth="0.9" {...hair} />
        <UiText x={8} y={230} weight={600}>
          right goal, wrong action
        </UiText>
        <UiText x={8} y={250} tone="ink2">
          constrain, default, suggest
        </UiText>
        <UiText x={214} y={230} weight={600}>
          wrong goal
        </UiText>
        <UiText x={214} y={250} tone="ink2">
          inform, preview
        </UiText>
        {detail && (
          <>
            <Marker x={8} y={34} n={1} />
            <Marker x={196} y={152} n={2} />
            <Marker x={214} y={34} n={3} />
            <Marker x={200} y={218} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Mapping: control layout mirrors the layout of what it controls       */
/* ------------------------------------------------------------------ */
export const mappingPlate: IllustrationEntry = {
  slug: "mapping",
  title: "Mapping plate",
  canvas: "sheet",
  description:
    "Two cooker tops, each with four rings in a square. On the left, the four knobs sit in a straight line below, and dashed lines from knobs to rings cross each other, so which knob controls which ring must be worked out; marked wrong. On the right, the four knobs are arranged in the same square as the rings, so the correspondence is seen at once; marked correct. Below, two directional mappings: a slider whose value rises as it is dragged right, and a pair of buttons with plus above minus, following the convention that up means more.",
  key: [
    { n: "1", label: "Knobs in a line", detail: "the layout does not match the rings, so people must translate and make errors" },
    { n: "2", label: "Natural mapping", detail: "knobs in the same square as the rings; the right knob is found by looking" },
    { n: "3", label: "Directional mapping", detail: "movement of the control matches movement of the value" },
    { n: "4", label: "Conventional mapping", detail: "plus above minus: up means more" },
  ],
  Art: ({ detail }) => {
    const rings = (ox: number) => [
      [ox + 44, 48],
      [ox + 108, 48],
      [ox + 44, 100],
      [ox + 108, 100],
    ] as const;
    const left = rings(8);
    const right = rings(208);
    const lineKnobs = [32, 68, 104, 140].map((x) => [x + 8, 158] as const);
    const order = [2, 0, 3, 1];
    const sqKnobs = [
      [248, 144],
      [280, 144],
      [248, 168],
      [280, 168],
    ] as const;
    const hob = (x: number) => <rect x={x} y={20} width={176} height={168} rx={10} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />;
    const ring = ([x, y]: readonly [number, number], i: number) => (
      <g key={i}>
        <circle cx={x} cy={y} r={18} fill="none" stroke={S.ink2} strokeWidth="1.2" {...hair} />
        <circle cx={x} cy={y} r={10} fill="none" stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
      </g>
    );
    const knob = ([x, y]: readonly [number, number], i: number) => (
      <g key={`k${i}`}>
        <circle cx={x} cy={y} r={9} fill={S.soft} stroke={S.ink} strokeWidth="1.1" {...hair} />
        <line x1={x} y1={y - 8} x2={x} y2={y - 2} stroke={S.ink} strokeWidth="1.4" {...hair} />
      </g>
    );
    return (
      <g>
        {hob(8)}
        {hob(208)}
        {left.map(ring)}
        {right.map(ring)}
        {lineKnobs.map((k, i) => (
          <path key={`l${i}`} d={`M${k[0]} ${k[1] - 9} L${left[order[i]][0]} ${left[order[i]][1] + 18}`} fill="none" stroke={S.ink3} strokeWidth="0.9" strokeDasharray="3 2.6" {...hair} />
        ))}
        {lineKnobs.map(knob)}
        {sqKnobs.map(knob)}
        <rect x={232} y={130} width={64} height={52} rx={6} fill="none" stroke={S.accent} strokeWidth="1.1" strokeDasharray="4 3" {...hair} />
        <Verdict x={176} y={176} ok={false} />
        <Verdict x={376} y={176} ok />
        <line x1={8} y1={206} x2={392} y2={206} stroke={S.rule} strokeWidth="0.9" {...hair} />
        <rect x={8} y={236} width={180} height={6} rx={3} fill={S.sunken} />
        <rect x={8} y={236} width={118} height={6} rx={3} fill={S.accent} />
        <circle cx={126} cy={239} r={9} fill={S.surface} stroke={S.ink} strokeWidth="1.2" {...hair} />
        <Link from={[140, 222]} to={[184, 222]} tone="accent" />
        <UiText x={8} y={268} tone="ink2">
          drag right, value up
        </UiText>
        <UiButton x={232} y={218} w={40} h={22} label="+" variant="secondary" />
        <UiButton x={232} y={244} w={40} h={22} label="−" variant="secondary" />
        <UiText x={284} y={248} tone="ink2">
          up means more
        </UiText>
        {detail && (
          <>
            <Marker x={8} y={158} n={1} />
            <Marker x={232} y={130} n={2} />
            <Marker x={8} y={226} n={3} />
            <Marker x={226} y={218} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Flexibility and efficiency: visible path plus a discoverable shortcut */
/* ------------------------------------------------------------------ */
export const flexibilityEfficiencyPlate: IllustrationEntry = {
  slug: "flexibility-and-efficiency-of-use",
  title: "Flexibility and efficiency of use plate",
  canvas: "sheet",
  description: (() => {
    const menu = klmTotal(parseKlm("H M P B B P B B H")).total.toFixed(2);
    const key = klmTotal(parseKlm("M K K")).total.toFixed(2);
    return `Two routes to the same command in a library staff tool. Above, the visible path: a Loans menu is open and its item 'Renew selected' shows its keyboard shortcut, ⌘R, beside the label, so people who use the menu see the shortcut every time. Below, the accelerator: the keys ⌘ and R pressed together. Both arrive at the same result, '12 loans renewed'. Beside each route, its estimated time from the keystroke-level model computed in UX Academy's calculator: ${menu} s through the menu and ${key} s with the shortcut.`;
  })(),
  key: [
    { n: "1", label: "Visible path", detail: "a menu everyone can find; it stays for novices and occasional users" },
    { n: "2", label: "Shortcut shown beside the command", detail: "repeated exposure teaches the faster route without getting in the way" },
    { n: "3", label: "Accelerator", detail: "the same command in two keystrokes for people who have learned it" },
    { n: "4", label: "Time saved", detail: "keystroke-level model estimates for a skilled user making no errors" },
  ],
  Art: ({ detail }) => {
    const menu = klmTotal(parseKlm("H M P B B P B B H")).total;
    const key = klmTotal(parseKlm("M K K")).total;
    const cap = (x: number, y: number, label: string) => (
      <g>
        <rect x={x} y={y} width={40} height={34} rx={6} fill={S.surface} stroke={S.ink2} strokeWidth="1.1" {...hair} />
        <rect x={x + 2} y={y + 30} width={36} height={2} rx={1} fill={S.ruleStrong} />
        <UiText x={x + 20} y={y + 22} size={T.strong} mono weight={600} anchor="middle">
          {label}
        </UiText>
      </g>
    );
    return (
      <g>
        <rect x={8} y={14} width={64} height={26} rx={5} fill={S.soft} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        <UiText x={18} y={32} weight={600}>
          Loans
        </UiText>
        <rect x={8} y={42} width={200} height={92} rx={7} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        <UiText x={20} y={64}>
          Open loan
        </UiText>
        <rect x={12} y={74} width={192} height={26} rx={4} fill={S.accentWash} />
        <UiText x={20} y={92} weight={600}>
          Renew selected
        </UiText>
        <UiText x={196} y={92} mono anchor="end" tone="ink2">
          ⌘R
        </UiText>
        <UiText x={20} y={122}>
          Return
        </UiText>
        {cap(8, 172, "⌘")}
        {cap(56, 172, "R")}
        <Link from={[212, 87]} to={[262, 128]} via={[250, 90]} />
        <Link from={[100, 189]} to={[262, 150]} via={[230, 190]} />
        <rect x={264} y={120} width={128} height={38} rx={7} fill={S.soft} stroke={S.ink2} strokeWidth="1" {...hair} />
        <Verdict x={282} y={139} ok />
        <UiText x={296} y={144} weight={600}>
          12 renewed
        </UiText>
        <UiText x={8} y={160} mono tone="ink2">
          {`menu ≈ ${menu.toFixed(2)} s`}
        </UiText>
        <UiText x={8} y={232} mono tone="ink2">
          {`shortcut ≈ ${key.toFixed(2)} s`}
        </UiText>
        {detail && (
          <>
            <Marker x={8} y={14} n={1} />
            <Marker x={204} y={74} n={2} />
            <Marker x={104} y={172} n={3} />
            <Marker x={170} y={226} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Aesthetic and minimalist design: signal kept, noise removed          */
/* ------------------------------------------------------------------ */
export const aestheticMinimalistPlate: IllustrationEntry = {
  slug: "aesthetic-and-minimalist-design",
  title: "Aesthetic and minimalist design plate",
  canvas: "sheet",
  description:
    "Two versions of a library app's home screen. On the left, marked wrong, a small search box competes with a banner, a carousel, a long news list and decorative blocks; the Renew action is buried at the bottom. On the right, marked correct, the search box is prominent, the two most common tasks, Renew loans and Opening hours, are labelled buttons, and news and events are reachable through one 'More' link rather than removed. Nothing a primary task needs is missing; only what competes with it has moved.",
  key: [
    { n: "1", label: "Noise competes with signal", detail: "banners, carousels and long lists lower the visibility of the tasks people came for" },
    { n: "2", label: "Primary tasks kept and labelled", detail: "everything the main tasks need stays visible" },
    { n: "3", label: "Rarely needed, deferred", detail: "secondary content is one step away, not deleted" },
  ],
  Art: ({ detail }) => (
    <g>
      <UiFrame x={8} y={10} w={180} h={232}>
        <rect x={10} y={20} width={110} height={22} rx={5} fill={S.surface} stroke={S.control} strokeWidth="0.8" {...hair} />
        <rect x={10} y={50} width={160} height={38} rx={5} fill={S.sunken} />
        <circle cx={80} cy={96} r={2.5} fill={S.ink3} />
        <circle cx={90} cy={96} r={2.5} fill={S.ruleStrong} />
        <circle cx={100} cy={96} r={2.5} fill={S.ruleStrong} />
        <TextBar x={10} y={110} w={150} strong />
        <TextBar x={10} y={122} w={140} />
        <TextBar x={10} y={134} w={156} />
        <TextBar x={10} y={146} w={120} />
        <rect x={10} y={156} width={74} height={30} rx={5} fill={S.sunken} />
        <rect x={92} y={156} width={78} height={30} rx={5} fill={S.sunken} />
        <UiText x={10} y={208} tone="ink3">
          Renew
        </UiText>
      </UiFrame>
      <Verdict x={176} y={232} ok={false} />
      <UiFrame x={212} y={10} w={180} h={232}>
        <UiField x={10} y={24} w={160} label="Search the catalogue" />
        <UiButton x={10} y={92} w={160} h={30} label="Renew loans" />
        <UiButton x={10} y={130} w={160} h={30} label="Opening hours" variant="secondary" />
        <UiText x={10} y={190} tone="accent">
          More: news and events
        </UiText>
      </UiFrame>
      <Verdict x={380} y={232} ok />
      <UiText x={8} y={272} tone="ink3">
        keep what tasks need; move what competes
      </UiText>
      {detail && (
        <>
          <Marker x={18} y={60} n={1} />
          <Marker x={216} y={102} n={2} />
          <Marker x={216} y={196} n={3} />
        </>
      )}
    </g>
  ),
};

/* ------------------------------------------------------------------ */
/* Error recovery: recognise, diagnose, recover — input kept            */
/* ------------------------------------------------------------------ */
export const errorRecoveryPlate: IllustrationEntry = {
  slug: "error-recovery",
  title: "Error recovery plate",
  canvas: "sheet",
  description:
    "A sign-up form after a failed submit. At the top, an error summary titled 'There are 2 problems' lists each problem as a link to its field. Below, the card-number field still holds what the person typed, has a thicker border, an error icon and the text 'Enter all 14 digits' directly above it. A third field that was correct keeps its value without any error. Beside the form, three labels mark the steps of recovery: recognise (the summary and the marked field), diagnose (the precise message) and recover (the kept input and the suggested fix).",
  key: [
    { n: "1", label: "Recognise", detail: "a summary that takes focus and links to each problem" },
    { n: "2", label: "Diagnose", detail: "a precise message in plain words beside the field, with an icon, not colour alone" },
    { n: "3", label: "Recover", detail: "the typed value is kept and the message says how to fix it" },
    { n: "4", label: "Nothing else lost", detail: "correct fields keep their values" },
  ],
  Art: ({ detail }) => (
    <g>
      <UiFrame x={8} y={8} w={236} h={262}>
        <rect x={10} y={20} width={216} height={64} rx={6} fill={S.errorWash} stroke={S.error} strokeWidth="1.4" {...hair} />
        <UiText x={20} y={40} weight={600}>
          There are 2 problems
        </UiText>
        <UiText x={20} y={60} tone="accent">
          Card number
        </UiText>
        <UiText x={20} y={76} tone="accent">
          Email address
        </UiText>
        <rect x={10} y={98} width={4} height={74} rx={2} fill={S.error} />
        <UiText x={22} y={112} weight={600}>
          Library card number
        </UiText>
        <Verdict x={30} y={130} ok={false} r={7} />
        <UiText x={42} y={135} tone="error">
          Enter all 14 digits
        </UiText>
        <rect x={22} y={144} width={204} height={26} rx={5} fill={S.surface} stroke={S.error} strokeWidth="2" {...hair} />
        <UiText x={32} y={162} mono>
          1234 5678 9012
        </UiText>
        <UiField x={22} y={196} w={204} label="Name" value="Ada Byron" />
      </UiFrame>
      <UiText x={262} y={52} weight={600}>
        recognise
      </UiText>
      <UiText x={262} y={136} weight={600}>
        diagnose
      </UiText>
      <UiText x={262} y={166} weight={600}>
        recover
      </UiText>
      <UiText x={262} y={232} tone="ink2">
        other input kept
      </UiText>
      <Link from={[258, 48]} to={[238, 48]} tone="mute" />
      <Link from={[258, 132]} to={[238, 132]} tone="mute" />
      <Link from={[258, 162]} to={[238, 160]} tone="mute" />
      {detail && (
        <>
          <Marker x={18} y={28} n={1} />
          <Marker x={392} y={132} n={2} />
          <Marker x={392} y={162} n={3} />
          <Marker x={392} y={228} n={4} />
        </>
      )}
    </g>
  ),
};

/* ------------------------------------------------------------------ */
/* Help and documentation: help that escalates only as far as needed    */
/* ------------------------------------------------------------------ */
export const helpDocumentationPlate: IllustrationEntry = {
  slug: "help-and-documentation",
  title: "Help and documentation plate",
  canvas: "sheet",
  description:
    "A renewal screen with help at four depths, each linking to the next. A one-line hint sits under the date field: 'Up to 4 weeks from today'. Beside a term, a toggletip button 'What is a hold?' opens a short definition. A non-modal help panel at the side lists three numbered steps for renewing a book while the page stays usable. At the bottom, a link to the full article. The deeper the level, the more it says and the less often it is needed.",
  key: [
    { n: "1", label: "Inline hint", detail: "always visible, one sentence, where the question arises" },
    { n: "2", label: "Toggletip", detail: "opens on request (click, not hover only), a short definition" },
    { n: "3", label: "Help panel", detail: "non-modal steps people can follow while doing the task" },
    { n: "4", label: "Full article", detail: "comprehensive, searchable, titled in people's words" },
  ],
  Art: ({ detail }) => (
    <g>
      <UiFrame x={8} y={8} w={214} h={250}>
        <UiText x={14} y={26} weight={600}>
          Renew loans
        </UiText>
        <UiField x={14} y={58} w={180} label="Renew until" value="26 Nov" />
        <UiText x={14} y={106} tone="ink2">
          Up to 4 weeks from today
        </UiText>
        <rect x={14} y={118} width={130} height={24} rx={5} fill={S.surface} stroke={S.control} strokeWidth="0.9" {...hair} />
        <UiText x={22} y={135}>
          What is a hold?
        </UiText>
        <rect x={14} y={148} width={186} height={44} rx={6} fill={S.soft} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        <UiText x={22} y={166} tone="ink2">
          Another reader reserved it,
        </UiText>
        <UiText x={22} y={182} tone="ink2">
          so it cannot be renewed.
        </UiText>
        <UiButton x={14} y={212} w={120} label="Renew" />
      </UiFrame>
      <rect x={232} y={8} width={160} height={192} rx={8} fill={S.surface} stroke={S.ink2} strokeWidth="1" {...hair} />
      <UiText x={244} y={30} weight={600}>
        Renew a book
      </UiText>
      {["Open Loans", "Select books", "Renew selected"].map((t, i) => (
        <g key={t}>
          <circle cx={252} cy={52 + i * 28} r={8} fill={S.soft} stroke={S.ink2} strokeWidth="0.9" {...hair} />
          <UiText x={252} y={56 + i * 28} mono anchor="middle">
            {String(i + 1)}
          </UiText>
          <UiText x={266} y={56 + i * 28}>
            {t}
          </UiText>
        </g>
      ))}
      <UiText x={244} y={150} tone="accent">
        Full guide to renewals
      </UiText>
      <UiButton x={244} y={164} w={84} h={24} label="Close" variant="secondary" />
      <line x1={232} y1={222} x2={392} y2={222} stroke={S.rule} strokeWidth="0.9" {...hair} />
      <UiText x={232} y={246} tone="ink3">
        each level links to the next
      </UiText>
      {detail && (
        <>
          <Marker x={8} y={100} n={1} />
          <Marker x={160} y={146} n={2} />
          <Marker x={392} y={20} n={3} />
          <Marker x={232} y={146} n={4} />
        </>
      )}
    </g>
  ),
};

/* ------------------------------------------------------------------ */
/* Theme architecture: one component, roles, themes on separate axes    */
/* ------------------------------------------------------------------ */
export const themeArchitecturePlate: IllustrationEntry = {
  slug: "theme-architecture",
  title: "Theme architecture plate",
  canvas: "sheet",
  description:
    "The same library card component shown three times, in light, dark and high-contrast themes, drawn in the fixed colours of the token lessons' palette. Above the cards, one row of semantic role names — surface, text, action — that every card uses. Between the roles and each card, the theme's mapping: light points the roles to grey.0, grey.900 and blue.600; dark to grey.950, grey.50 and blue.400; high contrast to grey.0, grey.950 and blue.700. The component never changes; only the mapping does. Below, two theme axes, mode and contrast, combine in a stated order.",
  key: [
    { n: "1", label: "Semantic roles", detail: "the names components use; identical in every theme" },
    { n: "2", label: "One mapping per theme", detail: "each theme points the roles at different primitives" },
    { n: "3", label: "Same component", detail: "rendered three ways without any change to its code" },
    { n: "4", label: "Theme axes", detail: "mode and contrast vary independently and combine in a resolution order" },
  ],
  Art: ({ detail }) => {
    const themes = [
      { x: 8, name: "light", s: "grey-0", t: "grey-900", a: "blue-600", on: "grey-0" },
      { x: 140, name: "dark", s: "grey-950", t: "grey-50", a: "blue-400", on: "grey-950" },
      { x: 272, name: "high contrast", s: "grey-0", t: "grey-950", a: "blue-700", on: "grey-0" },
    ] as const;
    const hc = (k: keyof typeof TOKEN_SAMPLES) => tok(k);
    return (
      <g>
        {["surface", "text", "action"].map((r, i) => (
          <g key={r}>
            <rect x={70 + i * 92} y={12} width={80} height={26} rx={6} fill={S.soft} stroke={S.ink2} strokeWidth="1.1" {...hair} />
            <UiText x={110 + i * 92} y={30} mono weight={600} anchor="middle">
              {r}
            </UiText>
          </g>
        ))}
        {themes.map((th) => (
          <g key={th.name}>
            <UiText x={th.x + 60} y={64} mono tone="ink3" anchor="middle">
              {th.name}
            </UiText>
            <Link from={[th.x + 60, 42]} to={[th.x + 60, 52]} tone="mute" />
            <rect x={th.x} y={74} width={120} height={112} rx={8} fill={hc(th.s)} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
            <text x={th.x + 12} y={100} fontSize={T.ui} fontWeight={600} fill={hc(th.t)} fontFamily="var(--font-plex-sans), sans-serif">
              Middlemarch
            </text>
            <rect x={th.x + 12} y={110} width={70} height={5} rx={2.5} fill={hc(th.t)} opacity={0.55} />
            <rect x={th.x + 12} y={146} width={84} height={26} rx={5} fill={hc(th.a)} />
            <text x={th.x + 54} y={163} fontSize={T.ui} fontWeight={600} fill={hc(th.on)} textAnchor="middle" fontFamily="var(--font-plex-sans), sans-serif">
              Renew
            </text>
          </g>
        ))}
        <line x1={8} y1={206} x2={392} y2={206} stroke={S.rule} strokeWidth="0.9" {...hair} />
        <rect x={8} y={220} width={110} height={26} rx={6} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        <UiText x={63} y={238} mono anchor="middle">
          mode
        </UiText>
        <rect x={146} y={220} width={110} height={26} rx={6} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        <UiText x={201} y={238} mono anchor="middle">
          contrast
        </UiText>
        <Link from={[118, 233]} to={[144, 233]} />
        <UiText x={268} y={238} tone="ink2">
          later one wins
        </UiText>
        {detail && (
          <>
            <Marker x={70} y={12} n={1} />
            <Marker x={140} y={64} n={2} />
            <Marker x={392} y={74} n={3} />
            <Marker x={8} y={220} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Design language: principle → decisions → tokens → component          */
/* ------------------------------------------------------------------ */
export const designLanguagePlate: IllustrationEntry = {
  slug: "design-language",
  title: "Design language plate",
  canvas: "sheet",
  description:
    "A principle, 'calm and precise', at the top left, traced by arrows into four foundation decisions: type (one heading style), space (one spacing rhythm), colour (ink with one accent) and motion (productive by default, expressive only for rare moments). Each decision points to a named token beside it — font.heading, space.inset, color.action, motion.productive — and all four tokens feed one card component at the bottom right that expresses them. Reading the drawing from left to right traces any value in the component back to the principle that justifies it.",
  key: [
    { n: "1", label: "Principle", detail: "a short statement of intent that can settle a decision" },
    { n: "2", label: "Foundation decisions", detail: "type, space, colour and motion choices that follow from it" },
    { n: "3", label: "Tokens", detail: "each decision named once so components can consume it" },
    { n: "4", label: "Component", detail: "expresses the language; every value traces back to the principle" },
  ],
  Art: ({ detail }) => {
    const rows = [
      ["type", "one heading style", "font.heading"],
      ["space", "one spacing rhythm", "space.inset"],
      ["colour", "ink + one accent", "color.action"],
      ["motion", "productive first", "motion.productive"],
    ] as const;
    const ry = (i: number) => 64 + i * 40;
    return (
      <g>
        <rect x={8} y={12} width={150} height={32} rx={8} fill={S.soft} stroke={S.ink} strokeWidth="1.2" {...hair} />
        <UiText x={83} y={33} weight={600} anchor="middle">
          calm and precise
        </UiText>
        {rows.map(([f, d, t], i) => (
          <g key={f}>
            <Link from={[30, 44]} to={[40, ry(i) + 14]} via={[30, ry(i) + 14]} tone="mute" />
            <rect x={42} y={ry(i)} width={150} height={28} rx={6} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
            <UiText x={52} y={ry(i) + 19}>
              {d}
            </UiText>
            <Link from={[192, ry(i) + 14]} to={[214, ry(i) + 14]} />
            <rect x={216} y={ry(i)} width={176} height={28} rx={6} fill={S.soft} stroke={S.ink2} strokeWidth="1.1" {...hair} />
            <UiText x={304} y={ry(i) + 19} mono weight={600} anchor="middle">
              {t}
            </UiText>
          </g>
        ))}
        <line x1={8} y1={232} x2={392} y2={232} stroke={S.rule} strokeWidth="0.9" {...hair} />
        <rect x={216} y={244} width={176} height={40} rx={8} fill={S.surface} stroke={S.ink2} strokeWidth="1" {...hair} />
        <UiText x={228} y={268} weight={600}>
          Card
        </UiText>
        <rect x={318} y={252} width={64} height={24} rx={5} fill={S.accent} />
        <UiText x={350} y={268} weight={600} anchor="middle" tone="surface">
          Renew
        </UiText>
        <Link from={[304, 220]} to={[304, 242]} />
        <UiText x={8} y={268} tone="ink3">
          every value traces back
        </UiText>
        {detail && (
          <>
            <Marker x={8} y={12} n={1} />
            <Marker x={42} y={ry(0)} n={2} />
            <Marker x={392} y={ry(0)} n={3} />
            <Marker x={216} y={244} n={4} />
          </>
        )}
      </g>
    );
  },
};
