export type FeatureEngineeringInput = {
  sex: "male" | "female";
  ageMonths: number;
  weightKg: number;
  heightCm: number;
  bodyConditionScore: number;
  adultReferenceWeightKg: number;
};

export type FeatureEngineeringContext = {
  expectedWeightNowKg: number;
  weightDifferenceKg: number;
  weightDifferencePercent: number;
  growthProgressPercent: number;
};

export type EngineeredFeature = {
  id: string;
  label: string;
  value: number | string;
  unit?: string;
  explanation: string;
};

export type GrowthFeatureVector = {
  ageBucket: "early_puppy" | "juvenile" | "adolescent" | "young_adult";
  numericFeatures: {
    sexEncoded: number;
    maturityRatio: number;
    adultWeightRatio: number;
    weightHeightRatio: number;
    bodyConditionDeviation: number;
    curveDeltaPercent: number;
    normalizedMassIndex: number;
  };
  features: EngineeredFeature[];
  modelReadyVector: number[];
  featureContract: string[];
};

export const featureDefinitions = [
  {
    id: "maturityRatio",
    label: "Maturity ratio",
    explanation: "Age normalized against a 24-month educational maturity window.",
  },
  {
    id: "adultWeightRatio",
    label: "Adult weight ratio",
    explanation: "Current weight divided by the selected adult reference weight.",
  },
  {
    id: "weightHeightRatio",
    label: "Weight / height ratio",
    explanation: "A simple proportionality feature that links mass and height.",
  },
  {
    id: "bodyConditionDeviation",
    label: "BCS deviation",
    explanation: "Distance from the calm middle of a 1–9 body condition score scale.",
  },
  {
    id: "curveDeltaPercent",
    label: "Curve delta %",
    explanation: "How far the current weight is from the educational reference curve.",
  },
  {
    id: "normalizedMassIndex",
    label: "Normalized mass index",
    explanation: "A lightweight app feature inspired by mass/height proportionality.",
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function round(value: number, digits = 3) {
  const multiplier = 10 ** digits;
  return Math.round(value * multiplier) / multiplier;
}

function getAgeBucket(ageMonths: number): GrowthFeatureVector["ageBucket"] {
  if (ageMonths <= 4) return "early_puppy";
  if (ageMonths <= 9) return "juvenile";
  if (ageMonths <= 18) return "adolescent";
  return "young_adult";
}

export function buildGrowthFeatureVector(
  input: FeatureEngineeringInput,
  context: FeatureEngineeringContext,
): GrowthFeatureVector {
  const sexEncoded = input.sex === "male" ? 1 : 0;
  const maturityRatio = round(clamp(input.ageMonths / 24, 0.04, 1.25));
  const adultWeightRatio = round(
    clamp(input.weightKg / Math.max(input.adultReferenceWeightKg, 1), 0.02, 1.8),
  );
  const weightHeightRatio = round(input.weightKg / Math.max(input.heightCm, 1));
  const bodyConditionDeviation = round(clamp(Math.abs(input.bodyConditionScore - 5) / 4, 0, 1));
  const curveDeltaPercent = round(context.weightDifferencePercent, 2);
  const normalizedMassIndex = round(
    clamp(input.weightKg / Math.max((input.heightCm / 100) ** 2, 0.1), 0, 80),
  );

  const numericFeatures = {
    sexEncoded,
    maturityRatio,
    adultWeightRatio,
    weightHeightRatio,
    bodyConditionDeviation,
    curveDeltaPercent,
    normalizedMassIndex,
  };

  const features: EngineeredFeature[] = [
    {
      id: "ageBucket",
      label: "Age bucket",
      value: getAgeBucket(input.ageMonths),
      explanation: "A categorical feature that makes the growth stage easier to explain.",
    },
    {
      id: "sexEncoded",
      label: "Sex encoded",
      value: sexEncoded,
      explanation: "Male is represented as 1 and female as 0 for simple model input.",
    },
    {
      id: "maturityRatio",
      label: "Maturity ratio",
      value: maturityRatio,
      explanation: "This helps compare a young puppy and an older juvenile on one scale.",
    },
    {
      id: "adultWeightRatio",
      label: "Adult weight ratio",
      value: adultWeightRatio,
      explanation: "This links current growth to the selected adult reference weight.",
    },
    {
      id: "weightHeightRatio",
      label: "Weight / height ratio",
      value: weightHeightRatio,
      unit: "kg/cm",
      explanation: "This adds proportionality instead of using weight alone.",
    },
    {
      id: "bodyConditionDeviation",
      label: "BCS deviation",
      value: bodyConditionDeviation,
      explanation: "This keeps body condition visible without making a diagnosis.",
    },
    {
      id: "curveDeltaPercent",
      label: "Curve delta",
      value: curveDeltaPercent,
      unit: "%",
      explanation: "This is the difference from the educational reference curve.",
    },
    {
      id: "normalizedMassIndex",
      label: "Normalized mass index",
      value: normalizedMassIndex,
      explanation: "This is an app-specific proportionality feature for visualization.",
    },
  ];

  const featureContract = [
    "sexEncoded",
    "maturityRatio",
    "adultWeightRatio",
    "weightHeightRatio",
    "bodyConditionDeviation",
    "curveDeltaPercent",
    "normalizedMassIndex",
  ];

  return {
    ageBucket: getAgeBucket(input.ageMonths),
    numericFeatures,
    features,
    modelReadyVector: featureContract.map(
      (key) => numericFeatures[key as keyof typeof numericFeatures],
    ),
    featureContract,
  };
}
