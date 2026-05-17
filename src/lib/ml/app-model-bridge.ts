import type { DogGrowthInput, GrowthStatus } from "@/lib/growth-model";
import {
  classificationResults,
  formatMetric,
  regressionResults,
} from "@/lib/ml/model-results";

export type ExportedLinearCoefficientSet = {
  intercept: number;
  ageMonths: number;
  equation: string;
};

export type ExportedFeatureCoefficient = {
  feature: string;
  coefficient: number;
  appMeaning: string;
};

export type AppModelFeature = {
  key: keyof Pick<
    DogGrowthInput,
    | "ageMonths"
    | "weightKg"
    | "heightCm"
    | "sex"
    | "bodyConditionScore"
    | "adultReferenceWeightKg"
  >;
  label: string;
  source: "owner-input" | "owner-estimate" | "derived";
  appUsage: string;
};

export type AppModelBridgeMetric = {
  label: string;
  value: string;
  detail: string;
};

export type AppModelBridgeOutput = {
  version: string;
  sourceNotebook: string;
  regression: {
    modelName: string;
    evidenceMetric: string;
    exportedEquation: string;
    appUsage: string;
  };
  classification: {
    modelName: string;
    evidenceMetric: string;
    appUsage: string;
  };
  featureVector: AppModelBridgeMetric[];
  appSignals: AppModelBridgeMetric[];
  safetyNote: string;
};

export const appModelBridgeVersion = "app-model-bridge-v0.1";

export const exportedRegressionCoefficients = {
  sourceNotebook: "notebooks/01_growth_regression_geometry.ipynb",
  exportedAt: "2026-05-16",
  simpleLinear: {
    intercept: 6.308015768725344,
    ageMonths: 3.5599211563731954,
    equation: "weight_kg = 6.3080 + 3.5599 * age_months",
  } satisfies ExportedLinearCoefficientSet,
  multiDimensional: [
    {
      feature: "age_months",
      coefficient: 1.078118,
      appMeaning: "Age remains the main growth-axis input.",
    },
    {
      feature: "height_cm",
      coefficient: 0.806786,
      appMeaning: "Height adds a body-size signal beyond age alone.",
    },
    {
      feature: "sex_male",
      coefficient: 1.565315,
      appMeaning: "Male profiles are represented as a separate feature signal.",
    },
    {
      feature: "activity_level_low",
      coefficient: -1.555904,
      appMeaning: "Activity can shift the expected growth estimate in the reference model.",
    },
    {
      feature: "activity_level_medium",
      coefficient: -0.916491,
      appMeaning: "Medium activity is represented as a smaller adjustment signal.",
    },
  ] satisfies ExportedFeatureCoefficient[],
};

export const appGrowthCurveAnchors = [
  { ageMonths: 2, progress: 0.18 },
  { ageMonths: 3, progress: 0.28 },
  { ageMonths: 4, progress: 0.4 },
  { ageMonths: 5, progress: 0.52 },
  { ageMonths: 6, progress: 0.62 },
  { ageMonths: 8, progress: 0.74 },
  { ageMonths: 10, progress: 0.84 },
  { ageMonths: 12, progress: 0.91 },
  { ageMonths: 15, progress: 0.96 },
  { ageMonths: 18, progress: 1 },
  { ageMonths: 24, progress: 1 },
] as const;

export const appModelFeatures: AppModelFeature[] = [
  {
    key: "ageMonths",
    label: "Age months",
    source: "owner-input",
    appUsage: "X-axis coordinate and main regression driver.",
  },
  {
    key: "weightKg",
    label: "Current weight kg",
    source: "owner-input",
    appUsage: "Y-axis coordinate and difference-from-curve signal.",
  },
  {
    key: "heightCm",
    label: "Height cm",
    source: "owner-input",
    appUsage: "Body-size context for review confidence.",
  },
  {
    key: "sex",
    label: "Sex",
    source: "owner-input",
    appUsage: "Profile context used by the app review rules.",
  },
  {
    key: "bodyConditionScore",
    label: "Body condition score",
    source: "owner-input",
    appUsage: "Classification-style review-zone signal.",
  },
  {
    key: "adultReferenceWeightKg",
    label: "Adult reference kg",
    source: "owner-estimate",
    appUsage: "Scales the reference growth curve for the selected profile.",
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function round(value: number, digits = 1) {
  const multiplier = 10 ** digits;
  return Math.round(value * multiplier) / multiplier;
}

export function estimateGrowthProgressFromBridge(ageMonths: number) {
  const age = clamp(ageMonths, 1, 30);
  const first = appGrowthCurveAnchors[0];
  const last = appGrowthCurveAnchors[appGrowthCurveAnchors.length - 1];

  if (age <= first.ageMonths) {
    return round(first.progress, 3);
  }

  if (age >= last.ageMonths) {
    return last.progress;
  }

  for (let index = 0; index < appGrowthCurveAnchors.length - 1; index += 1) {
    const current = appGrowthCurveAnchors[index];
    const next = appGrowthCurveAnchors[index + 1];

    if (age >= current.ageMonths && age <= next.ageMonths) {
      const segmentProgress =
        (age - current.ageMonths) / (next.ageMonths - current.ageMonths);
      return round(
        current.progress + segmentProgress * (next.progress - current.progress),
        3,
      );
    }
  }

  return 1;
}

export function buildBridgeExpectedGrowthCurve(adultReferenceWeightKg: number) {
  const scaledAdultReferenceWeightKg = clamp(adultReferenceWeightKg, 30, 80);

  return appGrowthCurveAnchors.map((anchor) => ({
    ageMonths: anchor.ageMonths,
    expectedWeightKg: round(scaledAdultReferenceWeightKg * anchor.progress),
  }));
}

export const appModelBridgeSummary = {
  version: appModelBridgeVersion,
  sourceNotebook: exportedRegressionCoefficients.sourceNotebook,
  regressionEvidenceModel: "Ridge Regression",
  classificationEvidenceModel: "Random Forest",
  liveAppCurve: "Calibrated growth anchor bridge",
  exportFile: "reports/model-exports/app-model-bridge-v0.1.json",
  safetyBoundary:
    "The bridge connects notebook evidence to app logic for educational visualization only. It is not a trained veterinary diagnosis service.",
};

export function buildAppModelBridgeOutput(
  input: DogGrowthInput,
  context: {
    status: GrowthStatus;
    expectedWeightNowKg: number;
    weightDifferenceKg: number;
    weightDifferencePercent: number;
    confidencePercent: number;
  },
): AppModelBridgeOutput {
  const ridgeEvidence = regressionResults.find(
    (result) => result.model === appModelBridgeSummary.regressionEvidenceModel,
  );
  const randomForestEvidence = classificationResults.find(
    (result) => result.model === appModelBridgeSummary.classificationEvidenceModel,
  );

  const featureVector: AppModelBridgeMetric[] = [
    {
      label: "Age coordinate",
      value: `${round(input.ageMonths)} months`,
      detail: "Mapped to the X-axis and the growth-curve progress anchor.",
    },
    {
      label: "Weight coordinate",
      value: `${round(input.weightKg)} kg`,
      detail: "Mapped to the Y-axis and compared with the expected curve point.",
    },
    {
      label: "Height context",
      value: `${round(input.heightCm)} cm`,
      detail: "Used as body-size context for the review signal.",
    },
    {
      label: "Condition score",
      value: `${round(input.bodyConditionScore, 0)} / 9`,
      detail: "Used as a classification-style caution feature.",
    },
  ];

  const appSignals: AppModelBridgeMetric[] = [
    {
      label: "Curve point",
      value: `${round(context.expectedWeightNowKg)} kg`,
      detail: "Expected educational weight at the selected age and adult reference.",
    },
    {
      label: "Distance from curve",
      value: `${context.weightDifferenceKg > 0 ? "+" : ""}${round(
        context.weightDifferenceKg,
      )} kg`,
      detail: `${context.weightDifferencePercent > 0 ? "+" : ""}${round(
        context.weightDifferencePercent,
      )}% from the reference point.`,
    },
    {
      label: "Review zone",
      value: context.status.replaceAll("_", " "),
      detail: "Classification-style educational status derived from the app bridge.",
    },
    {
      label: "Bridge confidence",
      value: `${round(context.confidencePercent, 0)}%`,
      detail: "Input completeness and age-range confidence, not clinical certainty.",
    },
  ];

  return {
    version: appModelBridgeVersion,
    sourceNotebook: exportedRegressionCoefficients.sourceNotebook,
    regression: {
      modelName: ridgeEvidence?.model ?? appModelBridgeSummary.regressionEvidenceModel,
      evidenceMetric: ridgeEvidence
        ? `R² ${formatMetric(ridgeEvidence.r2Score)} / RMSE ${formatMetric(
            ridgeEvidence.rmse,
          )}`
        : "Ridge evidence imported",
      exportedEquation: exportedRegressionCoefficients.simpleLinear.equation,
      appUsage:
        "The live app uses a calibrated growth-curve bridge inspired by regression evidence and scaled by adult reference weight.",
    },
    classification: {
      modelName:
        randomForestEvidence?.model ?? appModelBridgeSummary.classificationEvidenceModel,
      evidenceMetric: randomForestEvidence
        ? `F1 ${formatMetric(randomForestEvidence.f1Score)} / AUC ${formatMetric(
            randomForestEvidence.auc,
          )}`
        : "Random Forest evidence imported",
      appUsage:
        "The live app uses review-zone rules inspired by classification evidence, not a medical diagnosis classifier.",
    },
    featureVector,
    appSignals,
    safetyNote: appModelBridgeSummary.safetyBoundary,
  };
}
