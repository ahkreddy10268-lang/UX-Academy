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

const plates: IllustrationEntry[] = [defaultEffectPlate];
export default plates;
