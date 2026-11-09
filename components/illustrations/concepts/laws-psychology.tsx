/** Plates: laws-psychology. Authored to docs/ILLUSTRATION_SYSTEM.md rules. */
import type { CSSProperties } from "react";
import type { IllustrationEntry } from "../illustration-types";
import { C, Label, STROKE } from "../primitives";
import { recognitionOverRecallPlate as recognitionOverRecall } from "./learning-sheets";
import { gulfsPlate as gulfs } from "./learning-sheets";
import { workingMemoryModelPlate as workingMemoryModel } from "./learning-sheets";
import { steeringLawPlate as steeringLaw } from "./learning-sheets";
import { klmPlate as keystrokeLevelModel } from "./learning-sheets";
import { aestheticUsabilityPlate as aestheticUsabilityEffect } from "./learning-sheets";
import { dohertyPlate as dohertyThreshold } from "./learning-sheets";
import { teslerPlate as teslersLaw } from "./learning-sheets";
import { goldenRulesPlate as shneidermanGoldenRules } from "./learning-sheets";
import { vonRestorffPlate as vonRestorffEffect } from "./learning-sheets";
import { choiceOverloadPlate as choiceOverload } from "./learning-sheets";

const recall = [0.82, 0.68, 0.55, 0.44, 0.38, 0.35, 0.34, 0.37, 0.45, 0.62, 0.8, 0.9];

const serialPositionEffect: IllustrationEntry = {
  slug: "serial-position-effect",
  title: "Serial position effect plate",
  description:
    "A bar chart of recall probability for twelve list positions. Bars are tall for the first few items (primacy) and the last few items (recency), and lower in the middle, forming a U-shaped curve traced by a line across the bar tops.",
  animated: true,
  Art: ({ detail, animate }) => {
    const x0 = 60;
    const bw = 22;
    const gap = 3.5;
    const base = 230;
    const h = 170;
    const tops = recall.map((r, i) => [x0 + i * (bw + gap) + bw / 2, base - r * h]);
    const d = "M" + tops.map((p) => p.join(" ")).join(" L");
    return (
      <g>
        <line x1={x0 - 10} y1={base} x2={x0 + 12 * (bw + gap)} y2={base} stroke={C.line} strokeWidth={STROKE.fine} />
        <line x1={x0 - 10} y1={50} x2={x0 - 10} y2={base} stroke={C.line} strokeWidth={STROKE.fine} />
        {recall.map((r, i) => {
          const end = i < 3 || i > 8;
          return <rect key={i} x={x0 + i * (bw + gap)} y={base - r * h} width={bw} height={r * h} fill={end ? C.base : C.soft} stroke={C.line} strokeWidth={STROKE.fine} />;
        })}
        <path d={d} fill="none" stroke={C.ink} strokeWidth={STROKE.main} strokeDasharray="5 4" className={animate ? "anim-draw" : undefined} style={animate ? ({ "--len": 360 } as CSSProperties) : undefined} />
        <Label x={x0 + 1.5 * (bw + gap)} y={74} show={detail} tone="line">primacy</Label>
        <Label x={x0 + 10.2 * (bw + gap)} y={60} show={detail} tone="line">recency</Label>
        <Label x={210} y={254} show={detail} tone="mute">list position →</Label>
        <Label x={x0 - 6} y={42} anchor="start" show={detail} tone="mute">recall ↑</Label>
      </g>
    );
  },
};

const plates: IllustrationEntry[] = [
  steeringLaw,
  keystrokeLevelModel,
  dohertyThreshold,
  teslersLaw,
  serialPositionEffect,
  vonRestorffEffect,
  aestheticUsabilityEffect,
  choiceOverload,
  workingMemoryModel,
  recognitionOverRecall,
  gulfs,
  shneidermanGoldenRules,
];
export default plates;
