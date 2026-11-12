/**
 * Subject (domain) plates on the instructional sheet, session 25 (D-105).
 * Each summarises its domain by the subcategories of the frozen taxonomy, so
 * the figure key is a map of the subject, not a list of published entries.
 * Interfaces and artefacts stand for the subject; no generic people icons.
 */
import type { IllustrationEntry } from "../illustration-types";
import { Marker, Pointer, S, T, TextBar, UiButton, UiChip, UiField, UiFrame, UiText, Verdict } from "../system/sheet";
import { Card, head, Link } from "./learning-sheets";

const hair = { vectorEffect: "non-scaling-stroke" as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/* ---------------------------------------------------------------- */
/* UX & UI Fundamentals                                               */
/* ---------------------------------------------------------------- */
export const foundationsSubject: IllustrationEntry = {
  slug: "foundations",
  title: "UX and UI fundamentals plate",
  canvas: "sheet",
  description:
    "Nested frames read from the inside out. At the centre, an interface: a booking screen with a title, a field and a button, the part UI design shapes. Around it, a band of before, during and after touchpoints, the whole experience UX design is concerned with. A loop arrow around the band stands for design approaches that put people's needs and evaluation at the centre. Along the bottom, a short timeline marks that the field has a history in design and human-computer interaction.",
  key: [
    { n: "1", label: "The interface", detail: "what people see and operate: UI design" },
    { n: "2", label: "The whole experience", detail: "before, during and after use: UX design" },
    { n: "3", label: "Design approaches", detail: "user-centred and human-centred ways of working" },
    { n: "4", label: "History of design and HCI", detail: "how the field and its ideas developed" },
  ],
  Art: ({ detail }) => (
    <g>
      <rect x={20} y={14} width={360} height={214} rx={14} fill="none" stroke={S.accent} strokeWidth="1.2" strokeDasharray="5 4" {...hair} />
      <polygon points={head(380, 120, 0, 1, 7)} fill={S.accent} />
      <rect x={40} y={34} width={320} height={174} rx={10} fill={S.soft} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
      {["before", "during", "after"].map((t, i) => (
        <UiText key={t} x={[72, 200, 328][i]} y={56} mono tone="ink3" anchor="middle">
          {t}
        </UiText>
      ))}
      <rect x={56} y={70} width={32} height={44} rx={4} fill={S.surface} stroke={S.ink3} strokeWidth="0.8" {...hair} />
      <rect x={312} y={70} width={32} height={44} rx={4} fill={S.surface} stroke={S.ink3} strokeWidth="0.8" {...hair} />
      <UiFrame x={120} y={64} w={160} h={132}>
        <UiText x={12} y={24} weight={700}>
          Book a room
        </UiText>
        <UiField x={12} y={44} w={136} label="Date" value="Thu 12" />
        <UiButton x={12} y={84} w={136} label="Continue" />
      </UiFrame>
      <line x1={20} y1={262} x2={380} y2={262} stroke={S.ink2} strokeWidth="1" {...hair} />
      {[40, 120, 220, 330].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={262} r={5} fill={i === 3 ? S.ink : S.surface} stroke={S.ink} strokeWidth="1.2" {...hair} />
          <TextBar x={x - 16} y={276} w={32} />
        </g>
      ))}
      {detail && (
        <>
          <Marker x={280} y={64} n={1} />
          <Marker x={40} y={34} n={2} />
          <Marker x={380} y={160} n={3} />
          <Marker x={392} y={262} n={4} />
        </>
      )}
    </g>
  ),
};

/* ---------------------------------------------------------------- */
/* UX Laws & Cognitive Effects                                        */
/* ---------------------------------------------------------------- */
export const lawsEffectsSubject: IllustrationEntry = {
  slug: "laws-effects",
  title: "UX laws and cognitive effects plate",
  canvas: "sheet",
  description:
    "Six tiles, one for each family of regularities in this subject. Human performance laws: a pointer moving a distance D to a target of width W. Popular laws and rules of thumb: a card stamped 'rule of thumb'. Memory and attention: a list in which one item stands out. Gestalt grouping: dots grouped by spacing. Decision-making biases: two options, one marked as the default. A sixth tile shows evidence labels, because these items range from measured laws to popular claims.",
  key: [
    { n: "1", label: "Human performance laws and models", detail: "measured relations such as Fitts's law" },
    { n: "2", label: "Popular laws and rules of thumb", detail: "useful claims of varying evidence" },
    { n: "3", label: "Memory and attention effects", detail: "what is noticed and remembered" },
    { n: "4", label: "Gestalt laws of grouping", detail: "how elements are seen as groups" },
    { n: "5", label: "Decision-making biases", detail: "systematic tendencies in choices" },
    { n: "6", label: "Evidence varies", detail: "each entry states its evidence class" },
  ],
  Art: ({ detail }) => {
    const tile = (i: number) => {
      const x = 8 + (i % 3) * 132;
      const y = 8 + Math.floor(i / 3) * 146;
      return { x, y };
    };
    const t = [0, 1, 2, 3, 4, 5].map(tile);
    return (
      <g>
        {t.map((p, i) => (
          <rect key={i} x={p.x} y={p.y} width={120} height={136} rx={8} fill={S.surface} stroke={S.rule} strokeWidth="0.9" {...hair} />
        ))}
        {/* 1 Fitts */}
        <circle cx={t[0].x + 22} cy={t[0].y + 80} r={5} fill="none" stroke={S.ink} strokeWidth="1.3" {...hair} />
        <rect x={t[0].x + 84} y={t[0].y + 56} width={18} height={48} rx={3} fill={S.accentWash} stroke={S.accent} strokeWidth="1.1" {...hair} />
        <path d={`M${t[0].x + 22} ${t[0].y + 112} H${t[0].x + 93}`} stroke={S.ink} strokeWidth="1" {...hair} />
        <UiText x={t[0].x + 56} y={t[0].y + 128} mono anchor="middle">
          D
        </UiText>
        <UiText x={t[0].x + 93} y={t[0].y + 46} mono anchor="middle">
          W
        </UiText>
        {/* 2 rule of thumb */}
        <rect x={t[1].x + 16} y={t[1].y + 30} width={88} height={64} rx={4} fill={S.soft} stroke={S.ink3} strokeWidth="0.8" {...hair} />
        <TextBar x={t[1].x + 26} y={t[1].y + 44} w={60} />
        <TextBar x={t[1].x + 26} y={t[1].y + 56} w={44} />
        <rect x={t[1].x + 22} y={t[1].y + 100} width={76} height={22} rx={4} fill="none" stroke={S.ink} strokeWidth="1.1" transform={`rotate(-6 ${t[1].x + 60} ${t[1].y + 111})`} {...hair} />
        <UiText x={t[1].x + 60} y={t[1].y + 116} mono anchor="middle" weight={600}>
          rule
        </UiText>
        {/* 3 memory: isolate */}
        {[0, 1, 2, 3, 4].map((r) => (
          <rect key={r} x={t[2].x + 24} y={t[2].y + 24 + r * 20} width={72} height={14} rx={3} fill={r === 2 ? S.ink : S.soft} stroke={S.ruleStrong} strokeWidth="0.7" {...hair} />
        ))}
        {/* 4 gestalt */}
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <circle key={k} cx={t[3].x + 22 + (k % 3) * 14 + (k > 2 ? 0 : 0)} cy={t[3].y + 50 + (k > 2 ? 40 : 0)} r={5} fill={S.ink2} />
        ))}
        {[0, 1, 2].map((k) => (
          <circle key={k} cx={t[3].x + 84 + (k % 2) * 14} cy={t[3].y + 50 + Math.floor(k / 2) * 14} r={5} fill={S.ink2} />
        ))}
        {/* 5 default */}
        <UiChip x={t[4].x + 14} y={t[4].y + 40} w={92} label="Standard" selected />
        <UiChip x={t[4].x + 14} y={t[4].y + 74} w={92} label="Express" />
        <UiText x={t[4].x + 14} y={t[4].y + 122} mono tone="ink3">
          default
        </UiText>
        {/* 6 evidence */}
        {["law", "model", "rule"].map((s, k) => (
          <g key={s}>
            <rect x={t[5].x + 16} y={t[5].y + 26 + k * 34} width={88} height={24} rx={12} fill={k === 0 ? S.ink : S.surface} stroke={S.ink2} strokeWidth="0.9" strokeDasharray={k === 2 ? "3 2.4" : undefined} {...hair} />
            <UiText x={t[5].x + 60} y={t[5].y + 43 + k * 34} mono anchor="middle" tone={k === 0 ? "surface" : "ink"}>
              {s}
            </UiText>
          </g>
        ))}
        {detail &&
          t.map((p, i) => <Marker key={i} x={p.x + 118} y={p.y + 4} n={i + 1} />)}
      </g>
    );
  },
};

/* ---------------------------------------------------------------- */
/* Cognition, Behaviour & Human Factors                               */
/* ---------------------------------------------------------------- */
export const psychologySubject: IllustrationEntry = {
  slug: "psychology",
  title: "Cognition, behaviour and human factors plate",
  canvas: "sheet",
  animated: true,
  description:
    "Four panels for the four strands of the subject, each shown through what it explains in an interface rather than as a picture of a head. Cognitive psychology, memory and learning: four memory slots, three filled. Behavioural science, motivation and emotion: a loop from a cue to an action to an outcome that feeds back. Visual cognition: a field of outlined shapes in which one filled shape stands out at once (in the hero it pulses, as attention is captured). Human factors and ergonomics: a control panel with a large stop button within reach and a reach arc drawn around it.",
  key: [
    { n: "1", label: "Cognitive psychology, memory and learning", detail: "limited capacity, schemas, learning" },
    { n: "2", label: "Behavioural science, motivation and emotion", detail: "why people act, persist or stop" },
    { n: "3", label: "Visual cognition", detail: "what is seen first, and how" },
    { n: "4", label: "Human factors, ergonomics and HCI theory", detail: "bodies, environments and systems" },
  ],
  Art: ({ detail, animate }) => (
    <g>
      {[
        [8, 8],
        [206, 8],
        [8, 156],
        [206, 156],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width={186} height={136} rx={8} fill={S.surface} stroke={S.rule} strokeWidth="0.9" {...hair} />
      ))}
      {[0, 1, 2, 3].map((k) => (
        <rect key={k} x={30 + k * 38} y={58} width={30} height={40} rx={6} fill={k < 3 ? S.ink2 : "none"} stroke={S.ink2} strokeWidth="1" strokeDasharray={k < 3 ? undefined : "3 2"} {...hair} />
      ))}
      {[
        ["cue", 236, 50],
        ["action", 332, 90],
        ["outcome", 236, 120],
      ].map(([t, x, y]) => (
        <g key={t as string}>
          <rect x={(x as number) - 4} y={(y as number) - 16} width={64} height={24} rx={12} fill={S.soft} stroke={S.ink2} strokeWidth="0.9" {...hair} />
          <UiText x={(x as number) + 28} y={(y as number) + 1} anchor="middle" tone="ink">
            {t as string}
          </UiText>
        </g>
      ))}
      <Link from={[296, 40]} via={[350, 44]} to={[358, 72]} />
      <Link from={[326, 100]} via={[310, 116]} to={[298, 112]} />
      <Link from={[244, 102]} via={[226, 72]} to={[236, 54]} />
      {Array.from({ length: 15 }, (_, k) => {
        const x = 30 + (k % 5) * 32;
        const y = 186 + Math.floor(k / 5) * 32;
        return k === 7 ? <rect key={k} x={x - 8} y={y - 8} width={16} height={16} rx={3} fill={S.accent} className={animate ? "anim-pulse" : undefined} /> : <rect key={k} x={x - 8} y={y - 8} width={16} height={16} rx={3} fill="none" stroke={S.ink3} strokeWidth="1" {...hair} />;
      })}
      <rect x={226} y={196} width={146} height={78} rx={6} fill={S.soft} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
      {[0, 1, 2].map((k) => (
        <rect key={k} x={238 + k * 22} y={210} width={14} height={14} rx={3} fill={S.surface} stroke={S.ink3} strokeWidth="0.8" {...hair} />
      ))}
      <circle cx={334} cy={236} r={20} fill={S.error} />
      <UiText x={334} y={241} weight={700} anchor="middle" tone="surface">
        STOP
      </UiText>
      <path d="M300 268 A 40 40 0 0 1 370 196" fill="none" stroke={S.ink3} strokeWidth="1" strokeDasharray="3 3" {...hair} />
      {detail && (
        <>
          <Marker x={194} y={8} n={1} />
          <Marker x={392} y={8} n={2} />
          <Marker x={194} y={156} n={3} />
          <Marker x={392} y={156} n={4} />
        </>
      )}
    </g>
  ),
};

/* ---------------------------------------------------------------- */
/* Principles & Heuristics                                            */
/* ---------------------------------------------------------------- */
export const heuristicsSubject: IllustrationEntry = {
  slug: "heuristics",
  title: "Principles and heuristics plate",
  canvas: "sheet",
  description:
    "A checklist card on the left with four principles, three ticked and one crossed, held against a form on the right. The crossed principle points to the field that breaks it: a password field whose rules are revealed only after an error. A small standards badge sits under the checklist. Heuristic sets, standards and cross-cutting principles are compact rules for judging a design; they guide inspection and need testing with people to confirm what they find.",
  key: [
    { n: "1", label: "Heuristic sets", detail: "short lists of broad rules for inspection" },
    { n: "2", label: "Applied to a real screen", detail: "each rule is a question asked of the interface" },
    { n: "3", label: "Standards and cross-cutting principles", detail: "agreed criteria that sit alongside heuristics" },
  ],
  Art: ({ detail }) => (
    <g>
      <Card x={8} y={14} w={150} h={206} title="Checklist">
        {[true, true, false, true].map((ok, i) => (
          <g key={i}>
            <Verdict x={28} y={60 + i * 38} ok={ok} r={8} />
            <TextBar x={44} y={57 + i * 38} w={[90, 76, 96, 70][i]} strong={!ok} />
          </g>
        ))}
      </Card>
      <rect x={8} y={234} width={96} height={34} rx={6} fill={S.soft} stroke={S.ink} strokeWidth="1" {...hair} />
      <UiText x={56} y={256} mono weight={700} anchor="middle">
        AA
      </UiText>
      <UiFrame x={196} y={14} w={196} h={272}>
        <UiText x={14} y={26} weight={700}>
          Create account
        </UiText>
        <UiField x={14} y={52} w={166} label="Email" value="ana@mail.com" />
        <UiField x={14} y={108} w={166} label="Password" value="••••••" state="error" />
        <UiText x={14} y={162} tone="error">
          Too short
        </UiText>
        <UiButton x={14} y={200} w={166} label="Continue" />
      </UiFrame>
      <Link from={[158, 136]} via={[180, 150]} to={[208, 152]} tone="error" dashed />
      {detail && (
        <>
          <Marker x={158} y={14} n={1} />
          <Marker x={392} y={150} n={2} />
          <Marker x={104} y={234} n={3} />
        </>
      )}
    </g>
  ),
};

/* ---------------------------------------------------------------- */
/* UX Research                                                        */
/* ---------------------------------------------------------------- */
export const researchSubject: IllustrationEntry = {
  slug: "research",
  title: "UX research plate",
  canvas: "sheet",
  description:
    "Research artefacts arranged from planning to findings. On the left, a research plan with a consent checkbox ticked, standing for planning, protocols and participant care. In the middle, the raw material: an interview transcript with quotations on top, a small bar chart of survey answers below. On the right, synthesis: sticky notes clustered into two themes, and a finding card with a count of supporting observations. A usability-test task card along the bottom links to evaluation.",
  key: [
    { n: "1", label: "Planning, protocols and ethics", detail: "questions, recruitment, consent and care" },
    { n: "2", label: "Qualitative methods", detail: "interviews, observation, contextual inquiry" },
    { n: "3", label: "Quantitative methods", detail: "surveys, analytics, experiments" },
    { n: "4", label: "Analysis and synthesis", detail: "from observations to themes and findings" },
    { n: "5", label: "Usability evaluation", detail: "testing designs with people" },
  ],
  Art: ({ detail }) => (
    <g>
      <Card x={8} y={14} w={104} h={200} title="Plan">
        <TextBar x={20} y={50} w={70} />
        <TextBar x={20} y={64} w={56} />
        <TextBar x={20} y={78} w={64} />
        <rect x={20} y={168} width={14} height={14} rx={3} fill={S.ink} />
        <path d="M23 175 l3 3 l6 -7" fill="none" stroke={S.surface} strokeWidth="1.5" {...hair} />
        <UiText x={40} y={180} tone="ink2">
          consent
        </UiText>
      </Card>
      <Card x={124} y={14} w={130} h={104} title="Interview">
        {[0, 1].map((k) => (
          <g key={k}>
            <UiText x={136} y={58 + k * 26} weight={700} tone="ink3">
              “
            </UiText>
            <TextBar x={148} y={50 + k * 26} w={[86, 70][k]} />
          </g>
        ))}
      </Card>
      <Card x={124} y={128} w={130} h={86} title="Survey">
        {[20, 34, 14, 28].map((h, k) => (
          <rect key={k} x={140 + k * 26} y={204 - h} width={18} height={h} rx={2} fill={S.ink2} />
        ))}
      </Card>
      {[0, 1, 2, 3, 4].map((k) => (
        <rect key={k} x={268 + (k % 3) * 40 + (k > 2 ? 20 : 0)} y={20 + Math.floor(k / 3) * 40} width={34} height={30} rx={3} fill={k < 3 ? S.accentWash : S.soft} stroke={k < 3 ? S.accent : S.ink3} strokeWidth="0.9" {...hair} />
      ))}
      <Link from={[330, 102]} to={[330, 128]} />
      <Card x={266} y={132} w={126} h={82} tone="accent">
        <UiText x={278} y={156} mono tone="accent">
          FINDING
        </UiText>
        <TextBar x={278} y={168} w={92} />
        <UiText x={278} y={202} mono weight={600}>
          7 of 9
        </UiText>
      </Card>
      <rect x={8} y={232} width={384} height={52} rx={8} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
      <UiText x={22} y={264} mono tone="ink3">
        TASK
      </UiText>
      <TextBar x={70} y={256} w={200} strong />
      <Verdict x={370} y={258} ok />
      {detail && (
        <>
          <Marker x={112} y={14} n={1} />
          <Marker x={254} y={14} n={2} />
          <Marker x={254} y={128} n={3} />
          <Marker x={392} y={20} n={4} />
          <Marker x={8} y={232} n={5} />
        </>
      )}
    </g>
  ),
};

/* ---------------------------------------------------------------- */
/* Design Methods & Frameworks                                        */
/* ---------------------------------------------------------------- */
export const frameworksSubject: IllustrationEntry = {
  slug: "frameworks",
  title: "Design methods and frameworks plate",
  canvas: "sheet",
  description:
    "Three kinds of method in three bands. At the top, a process framework: two diamonds that open and close, standing for lifecycle frameworks that structure a project. In the middle, ideation and mapping: a row of journey stages with sticky notes under each, the material of workshops and maps. At the bottom, an analytical model of interaction: a task broken into timed operators on a bar, the kind of model that predicts performance.",
  key: [
    { n: "1", label: "Process and lifecycle frameworks", detail: "how a project moves from problem to solution" },
    { n: "2", label: "Ideation, mapping and facilitation", detail: "workshops, journey maps and other shared artefacts" },
    { n: "3", label: "Analytical models of interaction", detail: "models that predict how a task will be performed" },
  ],
  Art: ({ detail }) => (
    <g>
      <path d="M24 56 L104 18 L184 56 L104 94 Z M184 56 L264 18 L344 56 L264 94 Z" fill={S.soft} stroke={S.ink2} strokeWidth="1" {...hair} />
      <circle cx={184} cy={56} r={5} fill={S.accent} />
      {["Stage 1", "Stage 2", "Stage 3", "Stage 4"].map((t, i) => (
        <g key={t}>
          <rect x={8 + i * 96} y={118} width={88} height={24} rx={4} fill={S.ink} />
          <UiText x={52 + i * 96} y={135} weight={600} anchor="middle" tone="surface">
            {t}
          </UiText>
          {[0, 1].map((k) => (
            <rect key={k} x={14 + i * 96 + k * 40} y={150 + (i % 2) * 8} width={34} height={28} rx={2} fill={k ? S.surface : S.accentWash} stroke={k ? S.ink3 : S.accent} strokeWidth="0.8" {...hair} />
          ))}
        </g>
      ))}
      {[
        ["M", 70],
        ["P", 56],
        ["K", 30],
        ["K", 30],
        ["M", 70],
        ["K", 30],
      ].map(([op, w], i, a) => {
        const x = 8 + a.slice(0, i).reduce((s, v) => s + (v[1] as number) + 4, 0);
        return (
          <g key={i}>
            <rect x={x} y={222} width={w as number} height={32} rx={3} fill={op === "M" ? S.accentWash : S.soft} stroke={S.ink2} strokeWidth="0.9" {...hair} />
            <UiText x={x + (w as number) / 2} y={243} mono weight={600} anchor="middle">
              {op as string}
            </UiText>
          </g>
        );
      })}
      <UiText x={392} y={244} mono weight={700} anchor="end">
        Σ t
      </UiText>
      {detail && (
        <>
          <Marker x={360} y={56} n={1} />
          <Marker x={392} y={150} n={2} />
          <Marker x={330} y={278} n={3} />
        </>
      )}
    </g>
  ),
};

/* ---------------------------------------------------------------- */
/* Interaction Design                                                 */
/* ---------------------------------------------------------------- */
export const interactionSubject: IllustrationEntry = {
  slug: "interaction",
  title: "Interaction design plate",
  canvas: "sheet",
  animated: true,
  description:
    "One button followed through its states in a row: default, hover, pressed, loading and done, joined by arrows, standing for interaction patterns and state. Below, three input modalities beside each other: a pointer, a finger touch target and a keyboard focus ring around the same button. At the bottom right, an easing curve from a motion specification, standing for motion and microinteractions. In the hero a dot travels the row of states in order. Interaction principles such as feedback and visibility run through all of them.",
  key: [
    { n: "1", label: "Interaction principles", detail: "feedback, visibility, mapping, constraints" },
    { n: "2", label: "Patterns, state and forms", detail: "how controls change and what each state says" },
    { n: "3", label: "Input and modalities", detail: "pointer, touch, keyboard, voice" },
    { n: "4", label: "Motion and microinteractions", detail: "timing and easing that confirm what happened" },
  ],
  Art: ({ detail, animate }) => {
    const states = ["default", "hover", "pressed", "loading", "done"];
    return (
      <g>
        {animate && (
          <g style={{ offsetPath: 'path("M41 100 H353")', offsetRotate: "0deg" }} className="anim-travel">
            <circle r={4} fill={S.accent} />
          </g>
        )}
        {states.map((s, i) => {
          const x = 8 + i * 78;
          return (
            <g key={s}>
              <rect x={x} y={36} width={66} height={30} rx={8} fill={i === 2 ? S.ink2 : i === 4 ? S.okWash : i === 1 ? S.soft : S.ink} stroke={i === 4 ? S.ok : S.ink} strokeWidth="1" {...hair} />
              {i === 3 ? (
                <g>
                  <circle cx={x + 33} cy={51} r={7} fill="none" stroke={S.ruleStrong} strokeWidth="2" {...hair} />
                  <path d={`M${x + 33} 44 a7 7 0 0 1 7 7`} fill="none" stroke={S.surface} strokeWidth="2" {...hair} />
                </g>
              ) : i === 4 ? (
                <path d={`M${x + 25} 51 l6 6 l11 -12`} fill="none" stroke={S.ok} strokeWidth="2" {...hair} />
              ) : (
                <UiText x={x + 33} y={56} weight={600} anchor="middle" tone={i === 1 ? "ink" : "surface"}>
                  Pay
                </UiText>
              )}
              <UiText x={x + 33} y={88} mono tone="ink3" anchor="middle">
                {s}
              </UiText>
              {i < 4 && <polygon points={head(x + 76, 51, 1, 0, 5)} fill={S.ink3} />}
            </g>
          );
        })}
        {/* modalities */}
        <rect x={8} y={124} width={120} height={80} rx={8} fill={S.surface} stroke={S.rule} strokeWidth="0.9" {...hair} />
        <rect x={36} y={150} width={60} height={26} rx={8} fill={S.ink} />
        <Pointer x={80} y={164} />
        <rect x={140} y={124} width={120} height={80} rx={8} fill={S.surface} stroke={S.rule} strokeWidth="0.9" {...hair} />
        <rect x={168} y={150} width={60} height={26} rx={8} fill={S.ink} />
        <circle cx={208} cy={170} r={14} fill={S.accent} opacity={0.25} />
        <circle cx={208} cy={170} r={6} fill={S.accent} />
        <rect x={272} y={124} width={120} height={80} rx={8} fill={S.surface} stroke={S.rule} strokeWidth="0.9" {...hair} />
        <rect x={296} y={146} width={72} height={34} rx={10} fill="none" stroke={S.accent} strokeWidth="2" {...hair} />
        <rect x={302} y={150} width={60} height={26} rx={8} fill={S.ink} />
        <UiText x={332} y={198} mono tone="ink3" anchor="middle">
          Tab
        </UiText>
        {/* easing */}
        <rect x={232} y={222} width={160} height={70} rx={8} fill={S.soft} stroke={S.rule} strokeWidth="0.9" {...hair} />
        <path d="M246 280 C 286 280, 296 236, 378 234" fill="none" stroke={S.ink} strokeWidth="1.8" {...hair} />
        <UiText x={246} y={244} mono tone="ink3">
          ease-out
        </UiText>
        <TextBar x={8} y={240} w={180} />
        <TextBar x={8} y={256} w={140} />
        {detail && (
          <>
            <Marker x={200} y={250} n={1} />
            <Marker x={392} y={20} n={2} />
            <Marker x={392} y={124} n={3} />
            <Marker x={392} y={222} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ---------------------------------------------------------------- */
/* UI & Visual Design                                                 */
/* ---------------------------------------------------------------- */
export const visualSubject: IllustrationEntry = {
  slug: "visual",
  title: "UI and visual design plate",
  canvas: "sheet",
  description:
    "An article card laid out on a visible four-column grid. Alignment guides run down the left edge shared by the image, title, text and button. The title is large and bold, the text smaller and quieter, and the single primary button sits on the same left edge. A spacing measure marks the larger gap between groups and the smaller gap within a group. Small icon and button samples at the right stand for interface elements and iconography.",
  key: [
    { n: "1", label: "Visual communication foundations", detail: "contrast, emphasis and hierarchy" },
    { n: "2", label: "Composition and alignment", detail: "shared edges and grouping by space" },
    { n: "3", label: "Layout and proportion", detail: "grids, columns and measure" },
    { n: "4", label: "Interface elements and iconography", detail: "the parts an interface is built from" },
  ],
  Art: ({ detail }) => (
    <g>
      {[0, 1, 2, 3].map((c) => (
        <rect key={c} x={20 + c * 66} y={12} width={56} height={276} fill={S.accentWash} opacity={0.5} />
      ))}
      <line x1={20} y1={8} x2={20} y2={292} stroke={S.accent} strokeWidth="1" strokeDasharray="3 3" {...hair} />
      <rect x={20} y={28} width={254} height={92} rx={6} fill={S.sunken} />
      <path d="M40 108 L96 64 L136 96 L164 76 L220 108 Z" fill={S.ruleStrong} />
      <UiText x={20} y={156} size={T.title} weight={700}>
        Reading in winter
      </UiText>
      <TextBar x={20} y={170} w={230} />
      <TextBar x={20} y={184} w={190} />
      <TextBar x={20} y={198} w={210} />
      <UiButton x={20} y={232} w={110} label="Read more" />
      <path d="M262 120 V138 M256 120 H268 M256 138 H268" stroke={S.ink} strokeWidth="1" {...hair} />
      <path d="M262 206 V230 M256 206 H268 M256 230 H268" stroke={S.ink} strokeWidth="1" {...hair} />
      {[0, 1, 2].map((k) => (
        <rect key={k} x={318} y={40 + k * 52} width={40} height={40} rx={8} fill={S.surface} stroke={S.ink2} strokeWidth="1" {...hair} />
      ))}
      <path d="M330 60 l6 6 l12 -12" fill="none" stroke={S.ink} strokeWidth="1.6" {...hair} />
      <circle cx={338} cy={112} r={9} fill="none" stroke={S.ink} strokeWidth="1.6" {...hair} />
      <path d="M328 164 h20 M338 154 v20" stroke={S.ink} strokeWidth="1.6" {...hair} />
      {detail && (
        <>
          <Marker x={220} y={150} n={1} />
          <Marker x={20} y={232} n={2} />
          <Marker x={290} y={12} n={3} />
          <Marker x={380} y={40} n={4} />
        </>
      )}
    </g>
  ),
};

/* ---------------------------------------------------------------- */
/* Typography & Colour Science                                        */
/* ---------------------------------------------------------------- */
export const typeColourSubject: IllustrationEntry = {
  slug: "type-colour",
  title: "Typography and colour science plate",
  canvas: "sheet",
  description:
    "Above, a type specimen 'Hxg' set large on its metrics: baseline, x-height, cap height and descender lines, labelled. Below left, a lightness ramp of seven steps from light to dark, standing for colour models and the measurement of colour. Below right, two text samples on the same background, one with enough contrast and ticked, one too faint and crossed, standing for colour in design and accessibility.",
  key: [
    { n: "1", label: "Typography", detail: "the anatomy and metrics of type" },
    { n: "2", label: "Colour science and models", detail: "how colour is described and measured" },
    { n: "3", label: "Colour in design and accessibility", detail: "contrast, meaning and use" },
  ],
  Art: ({ detail }) => (
    <g>
      {[
        [56, "cap"],
        [80, "x"],
        [138, "base"],
        [164, "desc"],
      ].map(([y, t]) => (
        <g key={t as string}>
          <line x1={8} y1={y as number} x2={392} y2={y as number} stroke={t === "base" ? S.ink : S.ruleStrong} strokeWidth={t === "base" ? 1.2 : 0.8} strokeDasharray={t === "base" ? undefined : "4 3"} {...hair} />
          <UiText x={392} y={(y as number) - 5} mono tone="ink3" anchor="end">
            {t as string}
          </UiText>
        </g>
      ))}
      <UiText x={28} y={138} size={112} weight={600}>
        Hxg
      </UiText>
      {[0.08, 0.2, 0.34, 0.5, 0.66, 0.8, 0.94].map((o, i) => (
        <rect key={i} x={8 + i * 26} y={206} width={22} height={64} rx={4} fill={S.ink} opacity={o} />
      ))}
      <rect x={210} y={196} width={182} height={88} rx={8} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
      <UiText x={226} y={228} weight={600}>
        Readable text
      </UiText>
      <Verdict x={372} y={224} ok />
      <text x={226} y={262} fontSize={T.ui} fontWeight={600} fill={S.ink} opacity={0.3} fontFamily="var(--font-plex-sans), sans-serif">
        Faint text
      </text>
      <Verdict x={372} y={258} ok={false} />
      {detail && (
        <>
          <Marker x={20} y={40} n={1} />
          <Marker x={196} y={196} n={2} />
          <Marker x={392} y={190} n={3} />
        </>
      )}
    </g>
  ),
};

/* ---------------------------------------------------------------- */
/* Design Systems (subject)                                           */
/* ---------------------------------------------------------------- */
export const designSystemsSubject: IllustrationEntry = {
  slug: "design-systems",
  title: "Design systems plate",
  canvas: "sheet",
  description:
    "Four columns for the four strands of the subject. System foundations: a short list of named tokens. Scales and visual systems: a spacing scale drawn as bars that double in length. Components and patterns: a sheet of button variants and a small form pattern built from them. Governance and operations: a release card with a version number and a short changelog, joined back to the foundations by a dashed arrow, because changes flow through releases.",
  key: [
    { n: "1", label: "System foundations", detail: "principles and named decisions (tokens)" },
    { n: "2", label: "Scales and visual systems", detail: "spacing, type and colour scales" },
    { n: "3", label: "Components and patterns", detail: "reusable parts and the solutions built from them" },
    { n: "4", label: "Governance and operations", detail: "contribution, versioning and releases" },
  ],
  Art: ({ detail }) => (
    <g>
      <Card x={8} y={14} w={90} h={200} title="Tokens">
        {["color", "space", "type", "radius"].map((t, i) => (
          <UiText key={t} x={20} y={62 + i * 30} mono tone="ink2">
            {t}
          </UiText>
        ))}
      </Card>
      <Card x={106} y={14} w={90} h={200} title="Scale">
        {[4, 8, 16, 32, 48].map((v, i) => (
          <rect key={v} x={118} y={48 + i * 30} width={Math.min(v * 1.4, 66)} height={14} rx={2} fill={S.ink2} />
        ))}
      </Card>
      <Card x={204} y={14} w={90} h={200} title="Parts">
        <rect x={216} y={44} width={66} height={22} rx={6} fill={S.ink} />
        <rect x={216} y={74} width={66} height={22} rx={6} fill={S.surface} stroke={S.ink} strokeWidth="1" {...hair} />
        <rect x={216} y={104} width={66} height={22} rx={6} fill={S.soft} />
        <rect x={216} y={142} width={66} height={60} rx={6} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.8" {...hair} />
        <rect x={224} y={152} width={50} height={12} rx={2} fill="none" stroke={S.ink3} strokeWidth="0.8" {...hair} />
        <rect x={224} y={182} width={50} height={12} rx={4} fill={S.ink} />
      </Card>
      <Card x={302} y={14} w={90} h={200} title="v2.3">
        {[0, 1, 2].map((k) => (
          <g key={k}>
            <UiText x={314} y={62 + k * 26} mono tone="ink3">
              +
            </UiText>
            <TextBar x={328} y={55 + k * 26} w={50} />
          </g>
        ))}
        <rect x={314} y={150} width={66} height={24} rx={12} fill={S.okWash} stroke={S.ok} strokeWidth="0.9" {...hair} />
        <UiText x={347} y={167} mono anchor="middle" tone="ok">
          release
        </UiText>
      </Card>
      <Link from={[347, 216]} via={[200, 282]} to={[53, 218]} tone="accent" dashed />
      {detail && (
        <>
          <Marker x={98} y={14} n={1} />
          <Marker x={196} y={14} n={2} />
          <Marker x={294} y={14} n={3} />
          <Marker x={392} y={14} n={4} />
        </>
      )}
    </g>
  ),
};

/* ---------------------------------------------------------------- */
/* Accessibility & Inclusive Design                                   */
/* ---------------------------------------------------------------- */
export const accessibilitySubject: IllustrationEntry = {
  slug: "accessibility",
  title: "Accessibility and inclusive design plate",
  canvas: "sheet",
  description:
    "One control, a Pay £45 button, reached by four routes around it. A screen reader announces its name and role, 'Pay £45, button'. A keyboard reaches it with a visible focus ring. Magnification shows it enlarged without loss. A caption bar stands for alternatives to sound in the same product. Beneath, a conformance badge for the standard the work is checked against, and a short line of plain-language content. The button is the same in every route; access comes from its structure, not from a separate version.",
  key: [
    { n: "1", label: "Foundations and disability models", detail: "access arises between people, technology and context" },
    { n: "2", label: "Standards and conformance", detail: "agreed, testable criteria such as WCAG" },
    { n: "3", label: "Techniques and assistive technology", detail: "screen readers, keyboards, magnification, captions" },
    { n: "4", label: "Access needs, inclusive content and research", detail: "plain language and research with disabled people" },
  ],
  Art: ({ detail }) => (
    <g>
      <rect x={140} y={108} width={120} height={44} rx={10} fill={S.ink} />
      <UiText x={200} y={136} size={T.strong} weight={700} anchor="middle" tone="surface">
        Pay £45
      </UiText>
      <rect x={134} y={102} width={132} height={56} rx={14} fill="none" stroke={S.accent} strokeWidth="2" {...hair} />
      <rect x={8} y={14} width={176} height={44} rx={22} fill={S.soft} stroke={S.ink2} strokeWidth="0.9" {...hair} />
      <UiText x={22} y={41} mono>
        “Pay £45, button”
      </UiText>
      <Link from={[96, 58]} via={[110, 96]} to={[136, 112]} tone="mute" />
      <rect x={224} y={14} width={168} height={44} rx={8} fill={S.surface} stroke={S.ink2} strokeWidth="0.9" {...hair} />
      {["Tab", "⇧", "↵"].map((k, i) => (
        <g key={k}>
          <rect x={236 + i * 50} y={22} width={42} height={28} rx={5} fill={S.soft} stroke={S.ink3} strokeWidth="0.9" {...hair} />
          <UiText x={257 + i * 50} y={41} mono anchor="middle">
            {k}
          </UiText>
        </g>
      ))}
      <Link from={[300, 58]} via={[290, 92]} to={[264, 108]} tone="mute" />
      <circle cx={68} cy={200} r={44} fill={S.surface} stroke={S.ink2} strokeWidth="1.2" {...hair} />
      <UiText x={68} y={210} size={30} weight={700} anchor="middle">
        £45
      </UiText>
      <line x1={100} y1={232} x2={122} y2={254} stroke={S.ink2} strokeWidth="3" {...hair} />
      <Link from={[104, 176]} via={[124, 150]} to={[138, 140]} tone="mute" />
      <rect x={240} y={180} width={152} height={44} rx={6} fill={S.ink} />
      <UiText x={252} y={207} tone="surface">
        [door closes]
      </UiText>
      <Link from={[300, 180]} via={[290, 160]} to={[262, 150]} tone="mute" />
      <rect x={140} y={250} width={64} height={32} rx={6} fill={S.surface} stroke={S.ink} strokeWidth="1.2" {...hair} />
      <UiText x={172} y={271} mono weight={700} anchor="middle">
        AA
      </UiText>
      <TextBar x={220} y={262} w={150} />
      <TextBar x={220} y={276} w={110} />
      {detail && (
        <>
          <Marker x={200} y={86} n={1} />
          <Marker x={140} y={250} n={2} />
          <Marker x={392} y={36} n={3} />
          <Marker x={392} y={262} n={4} />
        </>
      )}
    </g>
  ),
};

/* ---------------------------------------------------------------- */
/* UX Writing & Content Design                                        */
/* ---------------------------------------------------------------- */
export const contentSubject: IllustrationEntry = {
  slug: "content",
  title: "UX writing and content design plate",
  canvas: "sheet",
  description:
    "A sign-in form whose words do the work: a label above the field, a hint under it saying what format to use, an error message that says what went wrong and how to fix it, and a button whose verb says what will happen, 'Sign in'. Beside the form, a style-guide card for the product's content system: use 'Sign in', avoid 'Login' as a verb, so the same action has the same words everywhere.",
  key: [
    { n: "1", label: "Labels and hints", detail: "tell people what to enter, before they make a mistake" },
    { n: "2", label: "Error messages", detail: "say what happened and how to fix it" },
    { n: "3", label: "Action labels", detail: "a verb that says what will happen" },
    { n: "4", label: "Content systems, strategy and governance", detail: "style guides and terminology kept consistent" },
  ],
  Art: ({ detail }) => (
    <g>
      <UiFrame x={8} y={14} w={224} h={272}>
        <UiText x={14} y={28} size={T.strong} weight={700}>
          Sign in
        </UiText>
        <UiField x={14} y={58} w={196} label="Library card number" value="1234 567" state="error" />
        <UiText x={14} y={110} tone="ink3">
          12 digits, on the back
        </UiText>
        <UiText x={14} y={136} tone="error" weight={600}>
          Enter all 12 digits
        </UiText>
        <UiButton x={14} y={196} w={196} label="Sign in" />
      </UiFrame>
      <Card x={250} y={14} w={142} h={190} title="Style guide">
        <Verdict x={268} y={64} ok r={8} />
        <UiText x={284} y={69} weight={600}>
          Sign in
        </UiText>
        <Verdict x={268} y={98} ok={false} r={8} />
        <UiText x={284} y={103} tone="ink3">
          Login
        </UiText>
        <line x1={262} y1={124} x2={380} y2={124} stroke={S.rule} strokeWidth="0.9" {...hair} />
        <TextBar x={262} y={140} w={110} />
        <TextBar x={262} y={154} w={90} />
      </Card>
      {detail && (
        <>
          <Marker x={232} y={124} n={1} />
          <Marker x={232} y={152} n={2} />
          <Marker x={232} y={232} n={3} />
          <Marker x={392} y={14} n={4} />
        </>
      )}
    </g>
  ),
};

/* ---------------------------------------------------------------- */
/* Product Design & Strategy                                          */
/* ---------------------------------------------------------------- */
export const productSubject: IllustrationEntry = {
  slug: "product",
  title: "Product design and strategy plate",
  canvas: "sheet",
  description:
    "The strands of product work read left to right and back. A discovery card holds an observed problem with evidence behind it. A strategy card states a goal. A roadmap with Now, Next and Later columns orders the work. A user story card with acceptance criteria defines one piece. On the right, an outcome chart shows a metric moving after release, and a dashed arrow returns from the outcome to discovery, because results feed the next decision.",
  key: [
    { n: "1", label: "Discovery", detail: "understanding problems worth solving" },
    { n: "2", label: "Strategy and definition", detail: "goals and the bets that serve them" },
    { n: "3", label: "Roadmaps and prioritisation", detail: "ordering work by value and evidence" },
    { n: "4", label: "Requirements, stories and acceptance", detail: "what done means for each piece" },
    { n: "5", label: "Outcomes, experimentation and operations", detail: "measuring change and learning from it" },
  ],
  Art: ({ detail }) => (
    <g>
      <Card x={8} y={14} w={112} h={84} title="Problem">
        <TextBar x={20} y={50} w={80} />
        <UiText x={20} y={84} mono tone="ink3">
          9 interviews
        </UiText>
      </Card>
      <Card x={8} y={110} w={112} h={84} title="Goal">
        <TextBar x={20} y={146} w={84} strong />
        <TextBar x={20} y={160} w={60} />
      </Card>
      {["Now", "Next", "Later"].map((t, i) => (
        <g key={t}>
          <rect x={136 + i * 56} y={14} width={50} height={180} rx={6} fill={S.soft} stroke={S.rule} strokeWidth="0.9" {...hair} />
          <UiText x={161 + i * 56} y={34} weight={600} anchor="middle">
            {t}
          </UiText>
          {Array.from({ length: 3 - i }, (_, k) => (
            <rect key={k} x={142 + i * 56} y={46 + k * 30} width={38} height={22} rx={3} fill={S.surface} stroke={S.ink3} strokeWidth="0.8" {...hair} />
          ))}
        </g>
      ))}
      <Card x={8} y={208} w={292} h={80} title="Story">
        <TextBar x={20} y={242} w={200} />
        {[0, 1].map((k) => (
          <g key={k}>
            <rect x={20} y={254 + k * 16} width={10} height={10} rx={2} fill={S.ink} />
            <TextBar x={38} y={257 + k * 16} w={[150, 120][k]} />
          </g>
        ))}
      </Card>
      <Card x={308} y={14} w={84} h={180} title="Outcome">
        <line x1={318} y1={170} x2={384} y2={170} stroke={S.ink3} strokeWidth="0.9" {...hair} />
        <path d="M318 160 L336 156 L350 150 L362 120 L380 100" fill="none" stroke={S.ink} strokeWidth="1.8" {...hair} />
        <line x1={356} y1={60} x2={356} y2={170} stroke={S.accent} strokeWidth="1" strokeDasharray="3 3" {...hair} />
      </Card>
      <path d="M350 196 V296 H3 V56 H6" fill="none" stroke={S.accent} strokeWidth="1.1" strokeDasharray="3.4 2.8" {...hair} />
      <polygon points={head(8, 56, 1, 0, 5)} fill={S.accent} />
      {detail && (
        <>
          <Marker x={120} y={14} n={1} />
          <Marker x={120} y={110} n={2} />
          <Marker x={302} y={14} n={3} />
          <Marker x={300} y={208} n={4} />
          <Marker x={392} y={14} n={5} />
        </>
      )}
    </g>
  ),
};

/* ---------------------------------------------------------------- */
/* Service Design & Systems Thinking                                  */
/* ---------------------------------------------------------------- */
export const serviceSubject: IllustrationEntry = {
  slug: "service",
  title: "Service design and systems thinking plate",
  canvas: "sheet",
  description:
    "A service blueprint for returning a library book, in four rows and three steps. The top row is what the person does: drop the book at a kiosk, get a receipt, receive an email. The second row is the frontstage touchpoints they meet: the kiosk, the printed receipt, the email. A dashed line of visibility separates them from the backstage row, where staff check the returned book in, and from the support row, the catalogue system that updates the loan. Arrows run down through the rows, showing what each visible step depends on.",
  key: [
    { n: "1", label: "Customer actions", detail: "what the person does across the service" },
    { n: "2", label: "Frontstage touchpoints", detail: "what they see and use" },
    { n: "3", label: "Line of visibility", detail: "what the person does not see starts here" },
    { n: "4", label: "Backstage and support processes", detail: "the people and systems that make it work" },
  ],
  Art: ({ detail }) => {
    const rows = [
      { y: 14, t: "Person", items: ["Drop book", "Receipt", "Email"] },
      { y: 84, t: "Front", items: ["Kiosk", "Printout", "Message"] },
      { y: 174, t: "Back", items: ["Check-in", "Shelve", ""] },
      { y: 238, t: "Support", items: ["Catalogue", "", "Notify"] },
    ];
    const cx = (i: number) => 106 + i * 98;
    return (
      <g>
        {rows.map((r, ri) => (
          <g key={r.t}>
            <UiText x={8} y={r.y + 30} mono tone="ink3">
              {r.t}
            </UiText>
            {r.items.map((it, i) =>
              it ? (
                <g key={i}>
                  <rect x={cx(i) - 6} y={r.y + 10} width={90} height={32} rx={6} fill={ri === 0 ? S.ink : ri === 1 ? S.accentWash : S.surface} stroke={ri === 1 ? S.accent : S.ink2} strokeWidth="0.9" {...hair} />
                  <UiText x={cx(i) + 39} y={r.y + 31} weight={600} anchor="middle" tone={ri === 0 ? "surface" : "ink"}>
                    {it}
                  </UiText>
                </g>
              ) : null,
            )}
          </g>
        ))}
        <line x1={8} y1={150} x2={392} y2={150} stroke={S.ink} strokeWidth="1.2" strokeDasharray="5 4" {...hair} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <Link from={[cx(i) + 39, 52]} to={[cx(i) + 39, 92]} tone="mute" />
            <Link from={[cx(i) + 39, 126]} to={[cx(i) + 39, i === 2 ? 246 : 182]} tone="mute" dashed={i === 2} />
          </g>
        ))}
        <Link from={[cx(0) + 39, 216]} to={[cx(0) + 39, 246]} tone="mute" />
        {detail && (
          <>
            <Marker x={392} y={40} n={1} />
            <Marker x={392} y={110} n={2} />
            <Marker x={392} y={150} n={3} />
            <Marker x={392} y={226} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ---------------------------------------------------------------- */
/* Metrics, Formulas & Statistics                                     */
/* ---------------------------------------------------------------- */
export const metricsSubject: IllustrationEntry = {
  slug: "metrics",
  title: "Metrics, formulas and statistics plate",
  canvas: "sheet",
  description:
    "Measurement from instrument to inference in three panels. Left, a questionnaire item on a five-point scale with one answer chosen, standing for research instruments. Middle, a funnel of four steps narrowing from visits to purchases, standing for product and customer metrics. Right, an estimate drawn as a point with a confidence interval beside a second, overlapping estimate, standing for descriptive and inferential statistics and the uncertainty every number carries. A small formula card underneath stands for the calculations behind them.",
  key: [
    { n: "1", label: "Research instruments and questionnaires", detail: "standardised ways to ask" },
    { n: "2", label: "UX, usability, product and customer metrics", detail: "what is counted, and why" },
    { n: "3", label: "Statistics and estimation", detail: "every number with its uncertainty" },
    { n: "4", label: "Formulas and experimental design", detail: "calculations, power and effect sizes" },
  ],
  Art: ({ detail }) => (
    <g>
      <Card x={8} y={14} w={120} h={180} title="Ask">
        <TextBar x={20} y={50} w={90} />
        {[1, 2, 3, 4, 5].map((v) => (
          <circle key={v} cx={24 + (v - 1) * 20} cy={90} r={7} fill={v === 4 ? S.ink : S.surface} stroke={S.ink2} strokeWidth="1" {...hair} />
        ))}
        <UiText x={20} y={122} mono tone="ink3">
          1 … 5
        </UiText>
      </Card>
      <Card x={140} y={14} w={120} h={180} title="Count">
        {[96, 70, 44, 26].map((w, i) => (
          <rect key={w} x={200 - w / 2} y={44 + i * 34} width={w} height={26} rx={3} fill={S.ink2} opacity={1 - i * 0.18} />
        ))}
      </Card>
      <Card x={272} y={14} w={120} h={180} title="Estimate">
        {[
          [300, 96, 60, 130],
          [356, 110, 70, 150],
        ].map(([x, y, lo, hi], i) => (
          <g key={i}>
            <line x1={x} y1={lo} x2={x} y2={hi} stroke={i ? S.accent : S.ink} strokeWidth="1.6" {...hair} />
            <path d={`M${x - 6} ${lo} h12 M${x - 6} ${hi} h12`} stroke={i ? S.accent : S.ink} strokeWidth="1.6" {...hair} />
            <circle cx={x} cy={y} r={5} fill={i ? S.accent : S.ink} />
          </g>
        ))}
      </Card>
      <rect x={8} y={214} width={384} height={70} rx={8} fill={S.soft} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
      <UiText x={200} y={256} size={T.strong} mono weight={600} anchor="middle">
        x̄ ± z · s / √n
      </UiText>
      {detail && (
        <>
          <Marker x={128} y={14} n={1} />
          <Marker x={260} y={14} n={2} />
          <Marker x={392} y={14} n={3} />
          <Marker x={392} y={214} n={4} />
        </>
      )}
    </g>
  ),
};

/* ---------------------------------------------------------------- */
/* Data Visualisation                                                 */
/* ---------------------------------------------------------------- */
const DV = [42, 58, 35, 64];

export const datavizSubject: IllustrationEntry = {
  slug: "dataviz",
  title: "Data visualisation plate",
  canvas: "sheet",
  description:
    "The same four numbers, 42, 58, 35 and 64, shown three ways. On the left, as a small table. In the middle, encoded as lengths of bars on a common baseline, where the order and differences can be read directly. On the right, encoded as circle areas, where the same differences are harder to judge. Below, a line chart with a shaded band around the line, standing for showing uncertainty honestly and telling a story without overstating the data.",
  key: [
    { n: "1", label: "Data", detail: "the values before any chart" },
    { n: "2", label: "Perception and encoding", detail: "the same values as position or length, and as area" },
    { n: "3", label: "Chart design and practice", detail: "choosing the form for the question" },
    { n: "4", label: "Storytelling, uncertainty and integrity", detail: "show the range, not just the line" },
  ],
  Art: ({ detail }) => (
    <g>
      <Card x={8} y={14} w={84} h={150}>
        {DV.map((v, i) => (
          <g key={i}>
            <UiText x={20} y={44 + i * 30} mono tone="ink3">
              {"ABCD"[i]}
            </UiText>
            <UiText x={80} y={44 + i * 30} mono weight={600} anchor="end">
              {v}
            </UiText>
          </g>
        ))}
      </Card>
      <line x1={110} y1={158} x2={250} y2={158} stroke={S.ink2} strokeWidth="1" {...hair} />
      {DV.map((v, i) => (
        <rect key={i} x={118 + i * 34} y={158 - v * 2} width={24} height={v * 2} rx={2} fill={S.ink2} />
      ))}
      {DV.map((v, i) => (
        <circle key={i} cx={[290, 352, 296, 356][i]} cy={[50, 56, 124, 124][i]} r={Math.sqrt(v) * 3.4} fill={S.ink2} opacity={0.7} />
      ))}
      <rect x={8} y={190} width={384} height={98} rx={8} fill={S.surface} stroke={S.rule} strokeWidth="0.9" {...hair} />
      <path d="M24 256 L90 240 L160 246 L230 222 L300 214 L376 200 L376 236 L300 244 L230 250 L160 270 L90 266 L24 276 Z" fill={S.accentWash} />
      <path d="M24 266 L90 253 L160 258 L230 236 L300 229 L376 218" fill="none" stroke={S.accent} strokeWidth="2" {...hair} />
      {detail && (
        <>
          <Marker x={92} y={14} n={1} />
          <Marker x={260} y={30} n={2} />
          <Marker x={392} y={30} n={3} />
          <Marker x={392} y={190} n={4} />
        </>
      )}
    </g>
  ),
};

/* ---------------------------------------------------------------- */
/* Ethical & Responsible Design                                       */
/* ---------------------------------------------------------------- */
export const ethicsSubject: IllustrationEntry = {
  slug: "ethics",
  title: "Ethical and responsible design plate",
  canvas: "sheet",
  description:
    "Two cookie-consent dialogs side by side. The left one, crossed, nudges: optional tracking is pre-ticked, 'Accept all' is a large filled button and the way to refuse is a small grey link. The right one, ticked, is even-handed: nothing optional is pre-selected, and 'Accept all' and 'Reject all' are the same size and weight, with a way to choose. Beneath both, a short row of stakeholders, the person, other people affected and the organisation, stands for the wider responsibility a design carries.",
  key: [
    { n: "1", label: "Privacy and consent", detail: "choices people make freely and can understand" },
    { n: "2", label: "Manipulation", detail: "designs that steer against people's interests" },
    { n: "3", label: "Ethical frameworks and responsibility", detail: "who is affected, beyond the user" },
  ],
  Art: ({ detail }) => {
    const dialog = (x: number, fair: boolean) => (
      <UiFrame x={x} y={30} w={186} h={196}>
        <UiText x={14} y={24} weight={700}>
          Cookies
        </UiText>
        {["Needed", "Analytics", "Ads"].map((t, i) => (
          <g key={t}>
            <rect x={14} y={38 + i * 26} width={14} height={14} rx={3} fill={i === 0 || !fair ? S.ink : S.surface} stroke={S.ink2} strokeWidth="1" {...hair} />
            <UiText x={36} y={50 + i * 26} tone="ink2">
              {t}
            </UiText>
          </g>
        ))}
        {fair ? (
          <>
            <UiButton x={14} y={122} w={74} label="Accept all" variant="secondary" />
            <UiButton x={96} y={122} w={74} label="Reject all" variant="secondary" />
            <UiText x={14} y={168} tone="accent" weight={600}>
              Choose
            </UiText>
          </>
        ) : (
          <>
            <UiButton x={14} y={118} w={156} h={32} label="Accept all" />
            <UiText x={14} y={172} tone="ink3">
              reject
            </UiText>
          </>
        )}
      </UiFrame>
    );
    return (
      <g>
        <Verdict x={101} y={14} ok={false} />
        <Verdict x={299} y={14} ok />
        {dialog(8, false)}
        {dialog(206, true)}
        {["person", "others", "organisation"].map((t, i) => (
          <g key={t}>
            <rect x={8 + i * 130} y={244} width={122} height={40} rx={20} fill={S.soft} stroke={S.ink2} strokeWidth="0.9" {...hair} />
            <UiText x={69 + i * 130} y={269} anchor="middle" tone="ink">
              {t}
            </UiText>
          </g>
        ))}
        {detail && (
          <>
            <Marker x={206} y={84} n={1} />
            <Marker x={194} y={164} n={2} />
            <Marker x={392} y={244} n={3} />
          </>
        )}
      </g>
    );
  },
};

/* ---------------------------------------------------------------- */
/* Emerging & Specialised Disciplines                                 */
/* ---------------------------------------------------------------- */
export const emergingSubject: IllustrationEntry = {
  slug: "emerging",
  title: "Emerging and specialised disciplines plate",
  canvas: "sheet",
  animated: true,
  description:
    "Three new kinds of interface. On the left, a conversation with an AI assistant whose answer shows its sources, a note that it may be wrong, and controls to give feedback, with typing dots for a reply still being generated, standing for human-AI interaction. In the middle, a voice interaction drawn as a waveform with a spoken request beneath it. On the right, a camera view with a label anchored to a real object, standing for spatial and augmented interfaces. Specialist disciplines apply the same foundations to new settings.",
  key: [
    { n: "1", label: "Human-AI interaction", detail: "sources, uncertainty, correction and control" },
    { n: "2", label: "New modalities", detail: "voice, spatial and other inputs and outputs" },
    { n: "3", label: "Specialist disciplines", detail: "the same foundations in new settings" },
  ],
  Art: ({ detail, animate }) => (
    <g>
      <UiFrame x={8} y={14} w={168} h={272}>
        {[0, 1, 2].map((k) => (
          <circle key={k} cx={24 + k * 12} cy={226} r={3.5} fill={S.ink3} className={animate ? `anim-blink anim-delay-${k + 1}` : undefined} />
        ))}
        <rect x={60} y={12} width={96} height={30} rx={10} fill={S.soft} />
        <TextBar x={70} y={25} w={70} />
        <rect x={10} y={54} width={146} height={142} rx={10} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        <TextBar x={20} y={68} w={120} />
        <TextBar x={20} y={82} w={100} />
        <rect x={20} y={100} width={58} height={20} rx={10} fill={S.accentWash} stroke={S.accent} strokeWidth="0.8" {...hair} />
        <UiText x={49} y={115} mono anchor="middle" tone="accent">
          src 1
        </UiText>
        <UiText x={20} y={146} tone="ink3">
          May be wrong
        </UiText>
        <rect x={20} y={160} width={26} height={22} rx={5} fill={S.surface} stroke={S.ink3} strokeWidth="0.9" {...hair} />
        <rect x={52} y={160} width={26} height={22} rx={5} fill={S.surface} stroke={S.ink3} strokeWidth="0.9" {...hair} />
        <path d="M27 173 l6 -6 l6 6 M59 167 l6 6 l6 -6" fill="none" stroke={S.ink2} strokeWidth="1.3" {...hair} />
      </UiFrame>
      <rect x={188} y={14} width={100} height={272} rx={10} fill={S.surface} stroke={S.rule} strokeWidth="0.9" {...hair} />
      {Array.from({ length: 13 }, (_, i) => {
        const h = [10, 24, 40, 18, 52, 30, 60, 26, 44, 16, 34, 20, 8][i];
        return <rect key={i} x={196 + i * 6.6} y={110 - h / 2} width={4} height={h} rx={2} fill={S.ink2} />;
      })}
      <UiText x={238} y={180} anchor="middle" tone="ink2">
        “Next train
      </UiText>
      <UiText x={238} y={198} anchor="middle" tone="ink2">
        to Leeds?”
      </UiText>
      <rect x={300} y={14} width={92} height={272} rx={10} fill={S.sunken} />
      <rect x={322} y={150} width={48} height={80} rx={4} fill={S.ruleStrong} />
      <line x1={346} y1={150} x2={346} y2={110} stroke={S.ink} strokeWidth="1.2" {...hair} />
      <rect x={312} y={84} width={68} height={28} rx={6} fill={S.surface} stroke={S.ink} strokeWidth="1" {...hair} />
      <UiText x={346} y={103} mono weight={600} anchor="middle">
        Gate 4
      </UiText>
      {detail && (
        <>
          <Marker x={176} y={14} n={1} />
          <Marker x={288} y={14} n={2} />
          <Marker x={392} y={14} n={3} />
        </>
      )}
    </g>
  ),
};

/* ---------------------------------------------------------------- */
/* Design Practice & Technical Literacy                               */
/* ---------------------------------------------------------------- */
export const practiceSubject: IllustrationEntry = {
  slug: "practice",
  title: "Design practice and technical literacy plate",
  canvas: "sheet",
  description:
    "The path from a design to a working product. On the left, a design frame with a redline measure between a field and a button, the specification a team hands over. In the middle, the same button as front-end code, a short HTML element with its type and label. On the right, a loading timeline with the moment content appears marked, standing for performance. Along the bottom, a board of three columns, to do, doing and done, standing for the delivery operations that coordinate the work.",
  key: [
    { n: "1", label: "Professional practice and documentation", detail: "specifications, critiques and handover" },
    { n: "2", label: "Web foundations", detail: "the HTML, CSS and platform the design becomes" },
    { n: "3", label: "Front-end architecture and performance", detail: "how fast and robust it is in use" },
    { n: "4", label: "DesignOps and delivery operations", detail: "how teams plan, track and ship" },
  ],
  Art: ({ detail }) => (
    <g>
      <rect x={8} y={14} width={120} height={170} rx={8} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
      <rect x={20} y={40} width={96} height={26} rx={4} fill={S.surface} stroke={S.control} strokeWidth="1" {...hair} />
      <rect x={20} y={110} width={96} height={30} rx={6} fill={S.ink} />
      <path d="M68 70 V106 M62 70 H74 M62 106 H74" stroke={S.error} strokeWidth="1" {...hair} />
      <UiText x={80} y={94} mono tone="error">
        24
      </UiText>
      <rect x={140} y={14} width={140} height={170} rx={8} fill={S.ink} />
      {["<button", ' type="submit">', "  Save", "</button>"].map((t, i) => (
        <UiText key={i} x={152} y={48 + i * 22} mono tone="surface">
          {t}
        </UiText>
      ))}
      <rect x={292} y={14} width={100} height={170} rx={8} fill={S.surface} stroke={S.rule} strokeWidth="0.9" {...hair} />
      {[0, 1, 2, 3].map((k) => (
        <rect key={k} x={302} y={36 + k * 26} width={[30, 52, 70, 80][k]} height={14} rx={2} fill={k === 2 ? S.accent : S.ink3} opacity={k === 2 ? 1 : 0.5} />
      ))}
      <line x1={372} y1={30} x2={372} y2={150} stroke={S.accent} strokeWidth="1" strokeDasharray="3 3" {...hair} />
      <UiText x={302} y={170} mono tone="ink3">
        time
      </UiText>
      {["to do", "doing", "done"].map((t, i) => (
        <g key={t}>
          <rect x={8 + i * 130} y={200} width={122} height={88} rx={8} fill={S.soft} stroke={S.rule} strokeWidth="0.9" {...hair} />
          <UiText x={20 + i * 130} y={222} mono tone="ink3">
            {t}
          </UiText>
          {Array.from({ length: 2 - (i === 2 ? 1 : 0) }, (_, k) => (
            <rect key={k} x={20 + i * 130} y={232 + k * 26} width={98} height={20} rx={3} fill={S.surface} stroke={S.ink3} strokeWidth="0.8" {...hair} />
          ))}
        </g>
      ))}
      {detail && (
        <>
          <Marker x={128} y={14} n={1} />
          <Marker x={280} y={14} n={2} />
          <Marker x={392} y={14} n={3} />
          <Marker x={392} y={200} n={4} />
        </>
      )}
    </g>
  ),
};

/* ---------------------------------------------------------------- */
/* Information Architecture (subject)                                 */
/* ---------------------------------------------------------------- */
export const iaSubject: IllustrationEntry = {
  slug: "ia",
  title: "Information architecture plate",
  canvas: "sheet",
  description:
    "Three views of the same website's structure. On the left, a site map: a home page branching into three sections, one of which branches again. At the top right, the navigation people see: a menu bar with the same three section names and a breadcrumb trail showing the path to the current page. Below it, a search box with a query and two results drawn from the same structure. The structure, its labels, the navigation and search are four views of one design.",
  key: [
    { n: "1", label: "IA foundations and practice", detail: "organising and labelling content for people" },
    { n: "2", label: "Structures and models", detail: "hierarchies, facets and the site map" },
    { n: "3", label: "Navigation", detail: "menus and breadcrumbs that expose the structure" },
    { n: "4", label: "Search, information scent and findability", detail: "a second route, using people's words" },
  ],
  Art: ({ detail }) => {
    const node = (x: number, y: number, t: string, hi = false) => (
      <g>
        <rect x={x} y={y} width={90} height={26} rx={5} fill={hi ? S.accentWash : S.surface} stroke={hi ? S.accent : S.ink2} strokeWidth="1" {...hair} />
        <UiText x={x + 45} y={y + 18} anchor="middle" weight={hi ? 600 : 400} tone={hi ? "accent" : "ink"}>
          {t}
        </UiText>
      </g>
    );
    return (
      <g>
        {(
          [
            [0, "Home", false],
            [1, "Visit", false],
            [1, "Borrow", true],
            [2, "Renew", true],
            [2, "Reserve", false],
            [1, "Events", false],
          ] as const
        ).map(([lvl, t, hi], i) => (
          <g key={t}>
            {lvl > 0 && <path d={`M${lvl * 24 - 10} ${20 + (i - 1) * 36 + 26} V${20 + i * 36 + 13} H${8 + lvl * 24}`} fill="none" stroke={hi ? S.accent : S.ink3} strokeWidth={hi ? 1.2 : 1} {...hair} />}
            {node(8 + lvl * 24, 20 + i * 36, t, hi)}
          </g>
        ))}
        <rect x={210} y={14} width={182} height={40} rx={8} fill={S.ink} />
        {["Visit", "Borrow", "Events"].map((t, i) => (
          <UiText key={t} x={234 + i * 58} y={39} anchor="middle" weight={i === 1 ? 700 : 400} tone="surface">
            {t}
          </UiText>
        ))}
        <UiText x={210} y={80} tone="ink2">
          Home › Borrow › Renew
        </UiText>
        <rect x={210} y={110} width={182} height={34} rx={17} fill={S.surface} stroke={S.ink2} strokeWidth="1" {...hair} />
        <circle cx={228} cy={127} r={6} fill="none" stroke={S.ink2} strokeWidth="1.4" {...hair} />
        <UiText x={242} y={132}>
          extend loan
        </UiText>
        {["Renew a loan", "Due dates"].map((t, i) => (
          <g key={t}>
            <rect x={210} y={154 + i * 40} width={182} height={32} rx={6} fill={i === 0 ? S.accentWash : S.surface} stroke={i === 0 ? S.accent : S.rule} strokeWidth="0.9" {...hair} />
            <UiText x={222} y={175 + i * 40} weight={i === 0 ? 600 : 400}>
              {t}
            </UiText>
          </g>
        ))}
        <TextBar x={8} y={256} w={170} />
        <TextBar x={8} y={270} w={130} />
        {detail && (
          <>
            <Marker x={196} y={262} n={1} />
            <Marker x={110} y={20} n={2} />
            <Marker x={392} y={60} n={3} />
            <Marker x={392} y={100} n={4} />
          </>
        )}
      </g>
    );
  },
};

/* ---------------------------------------------------------------- */
/* Planned topics (no published entry yet; the plate shows the idea)  */
/* ---------------------------------------------------------------- */
export const designThinkingPlanned: IllustrationEntry = {
  slug: "design-thinking",
  title: "Design thinking plate",
  canvas: "sheet",
  description:
    "A planned topic. Five stages of a commonly taught design-thinking model as cards along a curve: empathise, define, ideate, prototype and test. Forward arrows join them in order, and dashed arrows return from test to earlier stages, because the model is used iteratively rather than as a one-way sequence. Each card carries a small artefact: notes, a problem statement, many sketches, a paper prototype, and a test with a person's result.",
  key: [
    { n: "1", label: "Empathise and define", detail: "understand people, then frame the problem" },
    { n: "2", label: "Ideate", detail: "many ideas before choosing" },
    { n: "3", label: "Prototype and test", detail: "make ideas tangible and try them" },
    { n: "4", label: "Iterate", detail: "test results send the team back to earlier stages" },
  ],
  Art: ({ detail }) => {
    const st = ["Empathise", "Define", "Ideate", "Prototype", "Test"];
    const pos: [number, number][] = [
      [4, 150],
      [84, 92],
      [162, 60],
      [240, 92],
      [320, 150],
    ];
    return (
      <g>
        {st.map((t, i) => {
          const [x, y] = pos[i];
          return (
            <g key={t}>
              <rect x={x} y={y} width={76} height={84} rx={8} fill={i === 2 ? S.accentWash : S.surface} stroke={i === 2 ? S.accent : S.ink2} strokeWidth="1" {...hair} />
              <UiText x={x + 38} y={y + 22} weight={600} anchor="middle">
                {t}
              </UiText>
              {i === 0 && [0, 1].map((k) => <TextBar key={k} x={x + 10} y={y + 40 + k * 12} w={46} />)}
              {i === 1 && <rect x={x + 10} y={y + 38} width={52} height={26} rx={3} fill={S.ink} />}
              {i === 2 && [0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={x + 10 + (k % 3) * 18} y={y + 36 + Math.floor(k / 3) * 20} width={14} height={14} rx={2} fill={S.surface} stroke={S.accent} strokeWidth="0.8" {...hair} />)}
              {i === 3 && <rect x={x + 18} y={y + 34} width={36} height={40} rx={4} fill="none" stroke={S.ink2} strokeWidth="1" strokeDasharray="3 2" {...hair} />}
              {i === 4 && <Verdict x={x + 36} y={y + 56} ok r={10} />}
              {i < 4 && <Link from={[x + 72, y + (i < 2 ? 30 : 50)]} to={[pos[i + 1][0] - 2, pos[i + 1][1] + (i < 2 ? 50 : 30)]} />}
            </g>
          );
        })}
        <Link from={[340, 236]} via={[200, 300]} to={[60, 236]} tone="accent" dashed />
        <Link from={[330, 236]} via={[220, 262]} to={[200, 146]} tone="accent" dashed />
        <rect x={150} y={6} width={100} height={22} rx={11} fill="none" stroke={S.ink3} strokeWidth="0.9" strokeDasharray="3 2.4" {...hair} />
        <UiText x={200} y={22} mono tone="ink3" anchor="middle">
          planned
        </UiText>
        {detail && (
          <>
            <Marker x={80} y={150} n={1} />
            <Marker x={236} y={60} n={2} />
            <Marker x={392} y={150} n={3} />
            <Marker x={200} y={284} n={4} />
          </>
        )}
      </g>
    );
  },
};

export const atomicDesignPlate: IllustrationEntry = {
  slug: "atomic-design",
  title: "Atomic design plate",
  canvas: "sheet",
  description:
    "Brad Frost's five stages of atomic design built up from left to right. Atoms: a label, an input and a button on their own. A molecule: the three combined into a search form. An organism: a site header that contains the search form beside a logo and navigation. A template: a page wireframe that places the header above grey content areas. A page: the same template with real content in it. Each stage is assembled from the one before, and the page stage tests the parts with real content.",
  key: [
    { n: "1", label: "Atoms", detail: "the smallest interface parts: a label, an input, a button" },
    { n: "2", label: "Molecules", detail: "small groups that work as a unit: a search form" },
    { n: "3", label: "Organisms", detail: "larger sections: a header containing the form" },
    { n: "4", label: "Templates and pages", detail: "layouts without content, then with real content" },
  ],
  Art: ({ detail }) => (
    <g>
      {/* atoms */}
      <UiText x={8} y={66} tone="ink2" weight={600}>
        Search
      </UiText>
      <rect x={8} y={78} width={66} height={22} rx={4} fill={S.surface} stroke={S.control} strokeWidth="1" {...hair} />
      <rect x={8} y={110} width={44} height={22} rx={6} fill={S.ink} />
      {/* molecule */}
      <rect x={96} y={58} width={96} height={80} rx={6} fill={S.soft} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
      <TextBar x={104} y={68} w={40} />
      <rect x={104} y={82} width={58} height={20} rx={4} fill={S.surface} stroke={S.control} strokeWidth="1" {...hair} />
      <rect x={104} y={110} width={40} height={20} rx={6} fill={S.ink} />
      {/* organism */}
      <rect x={210} y={58} width={182} height={80} rx={6} fill={S.surface} stroke={S.ink2} strokeWidth="1" {...hair} />
      <rect x={220} y={70} width={22} height={22} rx={4} fill={S.ink} />
      {[0, 1, 2].map((k) => (
        <TextBar key={k} x={252 + k * 30} y={78} w={22} />
      ))}
      <rect x={300} y={98} width={86} height={32} rx={4} fill={S.soft} stroke={S.ruleStrong} strokeWidth="0.8" {...hair} />
      <rect x={306} y={106} width={48} height={16} rx={3} fill={S.surface} stroke={S.control} strokeWidth="0.8" {...hair} />
      <rect x={358} y={106} width={22} height={16} rx={4} fill={S.ink} />
      {/* template and page */}
      {[0, 1].map((k) => {
        const x = 8 + k * 196;
        return (
          <g key={k}>
            <rect x={x} y={166} width={188} height={126} rx={6} fill={S.surface} stroke={S.ink2} strokeWidth="1" {...hair} />
            <rect x={x + 8} y={174} width={172} height={22} rx={3} fill={S.soft} />
            {k === 0 ? (
              <>
                <rect x={x + 8} y={204} width={110} height={78} rx={3} fill={S.sunken} />
                <rect x={x + 126} y={204} width={54} height={78} rx={3} fill={S.sunken} />
              </>
            ) : (
              <>
                <rect x={x + 8} y={204} width={110} height={52} rx={3} fill={S.ruleStrong} />
                <TextBar x={x + 8} y={264} w={100} strong />
                <TextBar x={x + 126} y={208} w={50} />
                <TextBar x={x + 126} y={222} w={40} />
              </>
            )}
            <UiText x={x + 8} y={160} mono tone="ink3">
              {k === 0 ? "template" : "page"}
            </UiText>
          </g>
        );
      })}
      <polygon points={head(92, 98, 1, 0, 6)} fill={S.ink3} />
      <polygon points={head(206, 98, 1, 0, 6)} fill={S.ink3} />
      {detail && (
        <>
          <Marker x={74} y={58} n={1} />
          <Marker x={192} y={58} n={2} />
          <Marker x={392} y={58} n={3} />
          <Marker x={392} y={166} n={4} />
        </>
      )}
    </g>
  ),
};

export const humanCentredDesignPlanned: IllustrationEntry = {
  slug: "human-centred-design",
  title: "Human-centred design plate",
  canvas: "sheet",
  description:
    "A planned topic. Three nested rings around a product screen: the users who operate it, the wider group of people affected by it, and the context of use with its tasks and environments. An arrowed loop passes through the rings three times, each pass ending at an evaluation mark, standing for a design brought closer to fit with each iteration. Human-centred design widens the focus from users to everyone the system affects; ISO 9241-210 describes the process.",
  key: [
    { n: "1", label: "Users", detail: "the people who operate the system" },
    { n: "2", label: "Other people affected", detail: "stakeholders beyond the users" },
    { n: "3", label: "Context of use", detail: "tasks, environments and resources" },
    { n: "4", label: "Iterate with evaluation", detail: "each pass is checked against people's needs" },
  ],
  Art: ({ detail }) => (
    <g>
      <rect x={150} y={6} width={100} height={22} rx={11} fill="none" stroke={S.ink3} strokeWidth="0.9" strokeDasharray="3 2.4" {...hair} />
      <UiText x={200} y={22} mono tone="ink3" anchor="middle">
        planned
      </UiText>
      {[124, 92, 60].map((r, i) => (
        <circle key={r} cx={200} cy={164} r={r} fill={[S.soft, S.surface, S.accentWash][i]} stroke={i === 2 ? S.accent : S.ink3} strokeWidth="1" strokeDasharray={i === 0 ? "4 3" : undefined} {...hair} />
      ))}
      <rect x={172} y={138} width={56} height={52} rx={6} fill={S.surface} stroke={S.ink} strokeWidth="1.2" {...hair} />
      <rect x={180} y={170} width={40} height={12} rx={4} fill={S.ink} />
      <TextBar x={180} y={150} w={34} />
      <UiText x={200} y={124} mono anchor="middle" tone="accent">
        users
      </UiText>
      <UiText x={200} y={90} mono anchor="middle" tone="ink2">
        affected
      </UiText>
      <UiText x={200} y={58} mono anchor="middle" tone="ink3">
        context
      </UiText>
      {[0, 1, 2].map((k) => (
        <Verdict key={k} x={[316, 276, 246][k]} y={[164, 186, 196][k]} ok={k === 2} r={8} />
      ))}
      <path d="M372 112 L326 158 M306 170 L286 182 M266 190 L256 194" fill="none" stroke={S.ink2} strokeWidth="1.3" strokeDasharray="4 3" {...hair} />
      {detail && (
        <>
          <Marker x={262} y={128} n={1} />
          <Marker x={290} y={86} n={2} />
          <Marker x={330} y={60} n={3} />
          <Marker x={352} y={198} n={4} />
        </>
      )}
    </g>
  ),
};
