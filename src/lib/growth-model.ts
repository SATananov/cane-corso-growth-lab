import {
  buildAppModelBridgeOutput,
  buildBridgeExpectedGrowthCurve,
  estimateGrowthProgressFromBridge,
  type AppModelBridgeOutput,
} from "@/lib/ml/app-model-bridge";
import {
  buildGrowthIntelligenceReport,
  type GrowthIntelligenceReport,
} from "@/lib/ml/growth-explainability";

export type DogSex = "male" | "female";

export type GrowthStatus =
  | "balanced_growth"
  | "below_expected"
  | "above_expected"
  | "review_signal";

export type DogGrowthInput = {
  name: string;
  sex: DogSex;
  ageMonths: number;
  weightKg: number;
  heightCm: number;
  bodyConditionScore: number;
  adultReferenceWeightKg: number;
};

export type GrowthCurvePoint = {
  ageMonths: number;
  expectedWeightKg: number;
};

export type GrowthPrediction = {
  dogName: string;
  status: GrowthStatus;
  statusLabel: string;
  statusTone: string;
  expectedWeightNowKg: number;
  weightDifferenceKg: number;
  weightDifferencePercent: number;
  estimatedAdultWeightKg: number;
  growthProgressPercent: number;
  confidencePercent: number;
  reviewMessage: string;
  recommendation: string;
  coordinate: {
    xAgeMonths: number;
    yWeightKg: number;
  };
  curve: GrowthCurvePoint[];
  modelBridge: AppModelBridgeOutput;
  intelligenceReport: GrowthIntelligenceReport;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function round(value: number, digits = 1) {
  const multiplier = 10 ** digits;
  return Math.round(value * multiplier) / multiplier;
}

export function estimateGrowthProgress(ageMonths: number) {
  return estimateGrowthProgressFromBridge(ageMonths);
}

export function buildExpectedGrowthCurve(adultReferenceWeightKg: number) {
  return buildBridgeExpectedGrowthCurve(adultReferenceWeightKg);
}

export function calculateGrowthPrediction(input: DogGrowthInput): GrowthPrediction {
  const adultReferenceWeightKg = clamp(input.adultReferenceWeightKg, 30, 80);
  const ageMonths = clamp(input.ageMonths, 1, 30);
  const weightKg = clamp(input.weightKg, 1, 90);
  const heightCm = clamp(input.heightCm, 25, 90);
  const bodyConditionScore = clamp(input.bodyConditionScore, 1, 9);
  const growthProgress = estimateGrowthProgress(ageMonths);
  const expectedWeightNowKg = adultReferenceWeightKg * growthProgress;
  const weightDifferenceKg = weightKg - expectedWeightNowKg;
  const weightDifferencePercent = expectedWeightNowKg
    ? (weightDifferenceKg / expectedWeightNowKg) * 100
    : 0;

  const heightSignal = input.sex === "male" ? heightCm >= 58 : heightCm >= 55;
  const bcsBalanced = bodyConditionScore >= 4 && bodyConditionScore <= 6;

  let status: GrowthStatus = "balanced_growth";
  let statusLabel = "Balanced growth signal";
  let statusTone = "Within orientation zone";
  let reviewMessage =
    "The current point is close to the educational reference curve for this setup.";
  let recommendation =
    "Keep tracking age, weight and body condition over time. One point is useful, but the trajectory matters more.";

  if (weightDifferencePercent < -14 || bodyConditionScore <= 3) {
    status = "below_expected";
    statusLabel = "Below expected zone";
    statusTone = "Needs owner review";
    reviewMessage =
      "The current point is below the expected educational curve or the body condition score is low.";
    recommendation =
      "Check feeding routine, growth history and overall condition with a qualified veterinarian if this continues.";
  } else if (weightDifferencePercent > 14 || bodyConditionScore >= 7) {
    status = "above_expected";
    statusLabel = "Above expected zone";
    statusTone = "Needs owner review";
    reviewMessage =
      "The current point is above the expected educational curve or the body condition score is high.";
    recommendation =
      "Review body condition, activity level and feeding amount. This is an orientation signal, not a diagnosis.";
  } else if (!heightSignal || Math.abs(weightDifferencePercent) > 9) {
    status = "review_signal";
    statusLabel = "Review signal";
    statusTone = "Watch the next measurements";
    reviewMessage =
      "The point is near the reference zone, but one or more inputs suggest that the trend should be watched.";
    recommendation =
      "Add more measurements over time before making conclusions. Growth is better understood as a curve, not one value.";
  } else if (!bcsBalanced) {
    status = "review_signal";
    statusLabel = "Body condition review";
    statusTone = "Monitor condition";
    reviewMessage =
      "The growth point is acceptable, but the body condition score is outside the calm middle range.";
    recommendation =
      "Use body condition as an owner review signal and confirm concerns with a professional when needed.";
  }

  const dataCompleteness = [
    input.name.trim().length > 0,
    ageMonths > 0,
    weightKg > 0,
    heightCm > 0,
    adultReferenceWeightKg > 0,
  ].filter(Boolean).length;

  const confidencePercent = clamp(
    46 + dataCompleteness * 7 + (ageMonths >= 3 && ageMonths <= 18 ? 12 : 4),
    45,
    92,
  );

  const roundedExpectedWeightNowKg = round(expectedWeightNowKg);
  const roundedWeightDifferenceKg = round(weightDifferenceKg);
  const roundedWeightDifferencePercent = round(weightDifferencePercent);
  const roundedConfidencePercent = round(confidencePercent, 0);
  const estimatedAdultWeightKg = round(weightKg / growthProgress);
  const growthProgressPercent = round(growthProgress * 100, 0);

  const normalizedInput = {
    ...input,
    ageMonths,
    weightKg,
    heightCm,
    bodyConditionScore,
    adultReferenceWeightKg,
  };

  const reportContext = {
    status,
    statusLabel,
    expectedWeightNowKg: roundedExpectedWeightNowKg,
    weightDifferenceKg: roundedWeightDifferenceKg,
    weightDifferencePercent: roundedWeightDifferencePercent,
    estimatedAdultWeightKg,
    growthProgressPercent,
    confidencePercent: roundedConfidencePercent,
  };

  return {
    dogName: input.name.trim() || "Cane Corso",
    status,
    statusLabel,
    statusTone,
    expectedWeightNowKg: roundedExpectedWeightNowKg,
    weightDifferenceKg: roundedWeightDifferenceKg,
    weightDifferencePercent: roundedWeightDifferencePercent,
    estimatedAdultWeightKg,
    growthProgressPercent,
    confidencePercent: roundedConfidencePercent,
    reviewMessage,
    recommendation,
    coordinate: {
      xAgeMonths: round(ageMonths),
      yWeightKg: round(weightKg),
    },
    curve: buildExpectedGrowthCurve(adultReferenceWeightKg),
    modelBridge: buildAppModelBridgeOutput(normalizedInput, reportContext),
    intelligenceReport: buildGrowthIntelligenceReport(normalizedInput, reportContext),
  };
}
