/**
 * Cycle 3, Batch B5 plates (D-129, D-131): decision biases. Instructional
 * sheets (D-089); explanations live in each plate's figure key (D-101), never
 * as microtext in the drawing. The setting, the price and the outcomes drawn
 * here are illustrative.
 */
import type { IllustrationEntry } from "../illustration-types";
import { Marker, S, UiChip, UiText } from "../system/sheet";
import { Card } from "./learning-sheets";

const hair = { vectorEffect: "non-scaling-stroke" as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/** A right-pointing arrow between an action and its outcome. */
function Arrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={S.ink2} strokeWidth="1.1" {...hair} />
      <path d={`M${x2 - 5} ${y - 4} L${x2 + 1} ${y} L${x2 - 5} ${y + 4}`} fill="none" stroke={S.ink2} strokeWidth="1.1" {...hair} />
    </g>
  );
}

export const defaultEffectPlate: IllustrationEntry = {
  slug: "default-effect",
  title: "Default effect plate",
  canvas: "sheet",
  description:
    "How a preselected option, doing nothing and choosing otherwise interact, for one illustrative setting. Left, 'The setting': a row labelled 'Auto-renew', '£59 each year', with its switch already on; below it, 'Preselected: on'. Right, 'What happens': 'Do nothing' leads by an arrow to 'Renews, £59', with the note 'Effort: none'; 'Switch off' leads to 'Plan ends', with the note 'Needs: find, read, change'. Bottom, 'Why the default often holds': three chips, 'Effort', 'Endorsement' and 'Reference point', and two lines of text: 'Strength varies: some defaults have no effect' and 'Keeping a default is not proof of preference'.",
  key: [
    { n: "1", label: "The preselection", detail: "the designer decides what happens if the person does nothing; there is no neutral choice, only a default someone picked" },
    { n: "2", label: "Doing nothing", detail: "inaction carries out the default: the outcome happens without the person ever deciding" },
    { n: "3", label: "Choosing otherwise", detail: "the alternative costs attention and steps; the more it costs, and the less visible the setting, the more people stay with the default" },
    { n: "4", label: "Why defaults hold", detail: "effort, a sense that the default is recommended, and the default becoming the reference point; in a meta-analysis, endorsement and endowment moderated the effect and its size varied widely (Jachimowicz et al., 2019)" },
  ],
  Art: ({ detail }) => (
    <g>
      {/* the setting as the person meets it */}
      <Card x={8} y={8} w={176} h={150} title="The setting">
        <rect x={18} y={42} width={156} height={52} rx={5} fill={S.soft} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
        <UiText x={28} y={63} weight={700}>
          Auto-renew
        </UiText>
        <UiText x={28} y={82} tone="ink2">
          £59 each year
        </UiText>
        <rect x={134} y={57} width={30} height={17} rx={8.5} fill={S.ink} />
        <circle cx={155.5} cy={65.5} r={6} fill={S.surface} />
        <UiText x={18} y={120} tone="ink2">
          Preselected: on
        </UiText>
      </Card>

      {/* what each path leads to */}
      <Card x={192} y={8} w={200} h={150} title="What happens">
        <UiText x={204} y={62} weight={700}>
          Do nothing
        </UiText>
        <Arrow x1={278} x2={293} y={58} />
        <UiText x={299} y={62}>
          Renews, £59
        </UiText>
        <UiText x={204} y={80} tone="ink2">
          Effort: none
        </UiText>
        <UiText x={204} y={114} weight={700}>
          Switch off
        </UiText>
        <Arrow x1={278} x2={293} y={110} />
        <UiText x={299} y={114}>
          Plan ends
        </UiText>
        <UiText x={204} y={132} tone="ink2">
          Needs: find, read, change
        </UiText>
      </Card>

      {/* mechanisms and two cautions */}
      <Card x={8} y={166} w={384} h={126} title="Why the default often holds">
        <UiChip x={20} y={200} w={64} label="Effort" />
        <UiChip x={92} y={200} w={108} label="Endorsement" />
        <UiChip x={208} y={200} w={128} label="Reference point" />
        <UiText x={20} y={252} tone="ink2">
          Strength varies: some defaults have no effect
        </UiText>
        <UiText x={20} y={274} tone="ink2">
          Keeping a default is not proof of preference
        </UiText>
      </Card>

      {detail && (
        <>
          <Marker x={172} y={20} n={1} />
          <Marker x={380} y={20} n={2} />
          <Marker x={380} y={146} n={3} />
          <Marker x={380} y={178} n={4} />
        </>
      )}
    </g>
  ),
};


export const lossAversionPlate: IllustrationEntry = {
  slug: "loss-aversion",
  title: "Loss aversion plate",
  canvas: "sheet",
  description: "An illustrative value curve bends around a reference point. The loss side is steeper than the gain side close to that point, while a note makes clear that the drawing is conceptual and does not prescribe a universal numerical ratio.",
  key: [
    { n: "1", label: "Reference point", detail: "The baseline separates outcomes encoded as gains from outcomes encoded as losses; changing it can change how the same final outcome is evaluated." },
    { n: "2", label: "Loss side", detail: "In the classic prospect-theory value function the loss side is steeper near the reference point than the gain side." },
    { n: "3", label: "Gain side", detail: "The gain side is usually drawn concave; curvature within a side is diminishing sensitivity, distinct from loss aversion." },
    { n: "4", label: "Illustrative curve", detail: "The slope is conceptual, not a universal coefficient. Empirical estimates depend on model, task, incentives and sample." }
  ],
  Art: ({ detail }) => (
    <g>
      <Card x={8} y={8} w={384} h={284} title="Subjective value around a reference point">
        <line x1={42} y1={244} x2={372} y2={244} stroke={S.ruleStrong} strokeWidth="1.1" {...hair} />
        <line x1={205} y1={48} x2={205} y2={244} stroke={S.ruleStrong} strokeWidth="1.1" strokeDasharray="4 4" {...hair} />
        <line x1={42} y1={166} x2={372} y2={166} stroke={S.rule} strokeWidth="0.9" strokeDasharray="3 4" {...hair} />
        <path d="M205 166 C176 177 131 203 60 224" fill="none" stroke={S.ink} strokeWidth="2.3" {...hair} />
        <path d="M205 166 C238 150 291 117 362 88" fill="none" stroke={S.ink2} strokeWidth="2.3" {...hair} />
        <circle cx={205} cy={166} r="4.5" fill={S.ink} />
        <UiText x={72} y={202} weight={700}>LOSS</UiText>
        <UiText x={309} y={112} weight={700}>GAIN</UiText>
        <UiText x={213} y={58} tone="ink2">value ↑</UiText>
        <UiText x={205} y={264} anchor="middle" tone="ink2">reference point</UiText>
        <UiText x={42} y={282} tone="ink2">objective outcome: loss ←  |  → gain</UiText>
        <UiText x={372} y={282} anchor="end" tone="ink2">illustrative</UiText>
      </Card>
      {detail && <><Marker x={205} y={150} n={1} /><Marker x={68} y={216} n={2} /><Marker x={352} y={96} n={3} /><Marker x={380} y={20} n={4} /></>}
    </g>
  ),
};

export const framingEffectPlate: IllustrationEntry = {
  slug: "framing-effect",
  title: "Framing effect plate",
  canvas: "sheet",
  description: "Two cards show equivalent life-outcome options described as gains and as losses. A lower band separates risky-choice, attribute and goal framing so the three research paradigms are not mistaken for one effect.",
  key: [
    { n: "1", label: "Gain description", detail: "The certain outcome is 200 people saved; the alternative is a one-third chance to save all 600 and a two-thirds chance to save none." },
    { n: "2", label: "Loss description", detail: "The logically equivalent outcomes are 400 certain deaths, or a one-third chance that nobody dies and a two-thirds chance that 600 die." },
    { n: "3", label: "Equivalent outcomes", detail: "Only the description changes. Options, numbers and probabilities must remain the same in a strict risky-choice framing test." },
    { n: "4", label: "Three paradigms", detail: "Risky-choice, attribute and goal framing have different tasks and outcomes; do not generalise one paradigm's effect size to all three." }
  ],
  Art: ({ detail }) => (
    <g>
      <Card x={8} y={8} w={186} h={164} title="Gain frame">
        <UiText x={20} y={54} weight={700}>Sure option</UiText>
        <UiText x={20} y={75} tone="ink2">200 people saved</UiText>
        <line x1={20} y1={88} x2={180} y2={88} stroke={S.rule} strokeWidth="1" />
        <UiText x={20} y={111} weight={700}>Gamble</UiText>
        <UiText x={20} y={132} tone="ink2">1/3 save 600</UiText>
        <UiText x={20} y={150} tone="ink2">2/3 save none</UiText>
      </Card>
      <Card x={206} y={8} w={186} h={164} title="Loss frame">
        <UiText x={218} y={54} weight={700}>Sure option</UiText>
        <UiText x={218} y={75} tone="ink2">400 people die</UiText>
        <line x1={218} y1={88} x2={378} y2={88} stroke={S.rule} strokeWidth="1" />
        <UiText x={218} y={111} weight={700}>Gamble</UiText>
        <UiText x={218} y={132} tone="ink2">1/3 nobody dies</UiText>
        <UiText x={218} y={150} tone="ink2">2/3 all 600 die</UiText>
      </Card>
      <Card x={8} y={180} w={384} h={112} title="Framing research has different forms">
        <UiChip x={18} y={210} w={112} label="Risky choice" />
        <UiChip x={142} y={210} w={94} label="Attribute" />
        <UiChip x={248} y={210} w={104} label="Goal framing" />
        <UiText x={18} y={254} tone="ink2">Same outcomes in the top cards; different words</UiText>
        <UiText x={18} y={274} tone="ink2">Different groups saw the two original versions</UiText>
      </Card>
      {detail && <><Marker x={20} y={20} n={1} /><Marker x={380} y={20} n={2} /><Marker x={200} y={164} n={3} /><Marker x={380} y={190} n={4} /></>}
    </g>
  ),
};


export const anchoringEffectPlate: IllustrationEntry = {
  slug: "anchoring-effect",
  title: "Anchoring effect plate",
  canvas: "sheet",
  description:
    "Two groups receive different starting values before estimating the same quantity. Their group median estimates shift toward the low or high anchor; a lower strip separates three proposed mechanisms.",
  key: [
    { n: "1", label: "Low anchor", detail: "One group first considered the value 10. Its median estimate was 25 in the classic UN-country example." },
    { n: "2", label: "High anchor", detail: "Another group first considered the value 65. Its median estimate was 45 in the same study." },
    { n: "3", label: "Estimate", detail: "The medians moved in the anchor direction, but did not simply repeat the starting value. They are group medians, not individual changes." },
    { n: "4", label: "Different mechanisms", detail: "Insufficient adjustment, selective accessibility and scale distortion are distinct accounts; the diagram does not claim they explain every case." }
  ],
  Art: ({ detail }) => (
    <g>
      <Card x={8} y={8} w={384} h={176} title="Same question · different starting values">
        <UiText x={22} y={60} weight={700}>Low anchor</UiText>
        <UiChip x={22} y={76} w={70} label="10" selected />
        <line x1={102} y1={88} x2={206} y2={88} stroke={S.ink2} strokeWidth="1.2" {...hair} />
        <path d="M200 83 L208 88 L200 93" fill="none" stroke={S.ink2} strokeWidth="1.2" {...hair} />
        <UiChip x={218} y={76} w={80} label="Median 25" />
        <UiText x={316} y={92} tone="ink2">group A</UiText>
        <line x1={22} y1={105} x2={378} y2={105} stroke={S.rule} strokeWidth="0.9" {...hair} />
        <UiText x={22} y={133} weight={700}>High anchor</UiText>
        <UiChip x={22} y={145} w={70} label="65" selected />
        <line x1={102} y1={157} x2={206} y2={157} stroke={S.ink2} strokeWidth="1.2" {...hair} />
        <path d="M200 152 L208 157 L200 162" fill="none" stroke={S.ink2} strokeWidth="1.2" {...hair} />
        <UiChip x={218} y={145} w={80} label="Median 45" />
        <UiText x={316} y={161} tone="ink2">group B</UiText>
      </Card>
      <Card x={8} y={192} w={384} h={100} title="Three proposed explanations">
        <UiChip x={18} y={222} w={112} label="Adjustment" />
        <UiChip x={142} y={222} w={112} label="Accessibility" />
        <UiChip x={266} y={222} w={112} label="Scale" />
        <UiText x={18} y={268} tone="ink2">Different tasks may involve different processes.</UiText>
      </Card>
      {detail && <><Marker x={24} y={20} n={1} /><Marker x={372} y={20} n={2} /><Marker x={304} y={76} n={3} /><Marker x={372} y={204} n={4} /></>}
    </g>
  ),
};

export const socialProofPlate: IllustrationEntry = {
  slug: "social-proof",
  title: "Social proof plate",
  canvas: "sheet",
  description:
    "Four cards separate the ideas social proof is often reduced to. Top left, 'What people do': 'Descriptive norm', with the example 'Most guests here reuse their towels'. Top right, 'What people approve': 'Injunctive norm', with the example 'Most guests think reusing is right'. Middle, 'Why someone follows others': under 'Informational', a chip 'To be right'; under 'Normative', a chip 'To fit in'. Bottom, 'Popularity is not quality': three chips joined by arrows, 'Early votes', 'Shown higher', 'More votes', with a line returning from the last to the second to show the loop, and the caption 'A rating is a signal, not a measurement'.",
  key: [
    { n: "1", label: "Descriptive norm", detail: "what most people actually do; in hotel field experiments, signs reporting that most guests reused towels raised reuse over an environmental appeal (Goldstein, Cialdini and Griskevicius, 2008)" },
    { n: "2", label: "Injunctive norm", detail: "what most people approve of; the two norms can conflict, and behaviour tends to follow the one the situation makes salient (Cialdini, Reno and Kallgren, 1990)" },
    { n: "3", label: "Two motives", detail: "the same choice can come from wanting to be right (informational) or wanting to be accepted (normative) (Deutsch and Gerard, 1955)" },
    { n: "4", label: "Popularity loop", detail: "visible ratings feed later ratings: one artificial up-vote raised final scores by 25% in a randomised experiment (Muchnik, Aral and Taylor, 2013); ratings are constructed signals, not measures of quality" },
  ],
  Art: ({ detail }) => (
    <g>
      <Card x={8} y={8} w={188} h={96} title="What people do">
        <UiText x={20} y={52} tone="ink2">Descriptive norm</UiText>
        <UiText x={20} y={74}>“Most guests here</UiText>
        <UiText x={20} y={92}>reuse their towels”</UiText>
      </Card>
      <Card x={204} y={8} w={188} h={96} title="What people approve">
        <UiText x={216} y={52} tone="ink2">Injunctive norm</UiText>
        <UiText x={216} y={74}>“Most guests think</UiText>
        <UiText x={216} y={92}>reusing is right”</UiText>
      </Card>

      <Card x={8} y={112} w={384} h={86} title="Why someone follows others">
        <UiText x={20} y={158} tone="ink2">Informational</UiText>
        <UiChip x={20} y={166} w={120} label="To be right" />
        <UiText x={210} y={158} tone="ink2">Normative</UiText>
        <UiChip x={210} y={166} w={104} label="To fit in" />
      </Card>

      <Card x={8} y={206} w={384} h={86} title="Popularity is not quality">
        <UiChip x={20} y={238} w={96} label="Early votes" />
        <Arrow x1={120} x2={132} y={250} />
        <UiChip x={138} y={238} w={104} label="Shown higher" />
        <Arrow x1={246} x2={258} y={250} />
        <UiChip x={264} y={238} w={96} label="More votes" />
        <path d="M360 250 H372 V271 H190 V266" fill="none" stroke={S.ink2} strokeWidth="1.1" {...hair} />
        <path d="M186 268 L190 262 L194 268" fill="none" stroke={S.ink2} strokeWidth="1.1" {...hair} />
        <UiText x={20} y={287} tone="ink2">A rating is a signal, not a measurement</UiText>
      </Card>

      {detail && (
        <>
          <Marker x={184} y={20} n={1} />
          <Marker x={380} y={20} n={2} />
          <Marker x={380} y={124} n={3} />
          <Marker x={380} y={218} n={4} />
        </>
      )}
    </g>
  ),
};

const plates: IllustrationEntry[] = [defaultEffectPlate, lossAversionPlate, framingEffectPlate, anchoringEffectPlate, socialProofPlate];
export default plates;
