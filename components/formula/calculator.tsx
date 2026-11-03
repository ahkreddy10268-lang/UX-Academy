"use client";

import type { CalculatorId } from "@/lib/content/schema";
import { FittsCalculator, HickCalculator, KlmCalculator, SteeringCalculator } from "./calculators-interaction";
import {
  CesCalculator,
  CsatCalculator,
  ErrorRateCalculator,
  FunnelCalculator,
  NasaTlxCalculator,
  NpsCalculator,
  ProblemDiscoveryCalculator,
  RetentionCalculator,
  SusCalculator,
  TaskSuccessCalculator,
  TimeOnTaskCalculator,
  UmuxLiteCalculator,
} from "./calculators-measurement";
import {
  CiMeanCalculator,
  ContrastCalculator,
  CorrelationCalculator,
  DescriptiveCalculator,
  EffectSizeCalculator,
  GridCalculator,
  ModularScaleCalculator,
  SampleSizeCalculator,
  TwoProportionCalculator,
} from "./calculators-stats";

const REGISTRY: Record<CalculatorId, () => React.JSX.Element> = {
  fitts: FittsCalculator,
  "hick-hyman": HickCalculator,
  steering: SteeringCalculator,
  klm: KlmCalculator,
  sus: SusCalculator,
  "umux-lite": UmuxLiteCalculator,
  "nasa-tlx": NasaTlxCalculator,
  nps: NpsCalculator,
  csat: CsatCalculator,
  ces: CesCalculator,
  "task-success": TaskSuccessCalculator,
  "time-on-task": TimeOnTaskCalculator,
  "error-rate": ErrorRateCalculator,
  "conversion-funnel": FunnelCalculator,
  "retention-churn": RetentionCalculator,
  "descriptive-stats": DescriptiveCalculator,
  "confidence-interval-mean": CiMeanCalculator,
  "two-proportion-test": TwoProportionCalculator,
  "effect-size": EffectSizeCalculator,
  "sample-size": SampleSizeCalculator,
  "problem-discovery": ProblemDiscoveryCalculator,
  "correlation-regression": CorrelationCalculator,
  "contrast-ratio": ContrastCalculator,
  "modular-scale": ModularScaleCalculator,
  "grid-columns": GridCalculator,
};

export function Calculator({ id }: { id: CalculatorId }) {
  const C = REGISTRY[id];
  return <C />;
}

export const calculatorIds = Object.keys(REGISTRY) as CalculatorId[];
