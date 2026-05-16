export type GrowthClusterInput = {
  sex: "male" | "female";
  ageMonths: number;
  weightKg: number;
  heightCm: number;
  bodyConditionScore: number;
  adultReferenceWeightKg: number;
};

export type GrowthClusterContext = {
  status: string;
  weightDifferencePercent: number;
  growthProgressPercent: number;
};

export type GrowthClusterProfile = {
  id:
    | "balanced_growth_arc"
    | "compact_late_growth"
    | "power_growth_profile"
    | "condition_review_profile";
  label: string;
  shortLabel: string;
  description: string;
  centroid: {
    maturityRatio: number;
    adultWeightRatio: number;
    bodyConditionDeviation: number;
    curveDeltaNormalized: number;
  };
  ownerMeaning: string;
};

export type GrowthClusterFeaturePoint = {
  maturityRatio: number;
  adultWeightRatio: number;
  bodyConditionDeviation: number;
  curveDeltaNormalized: number;
};

export type GrowthClusterAnalysis = {
  assignedCluster: GrowthClusterProfile;
  featurePoint: GrowthClusterFeaturePoint;
  distanceToCentroid: number;
  nearestAlternatives: Array<{
    profile: GrowthClusterProfile;
    distance: number;
  }>;
  summary: string;
  geometryNote: string;
};

export const growthClusterProfiles: GrowthClusterProfile[] = [
  {
    id: "balanced_growth_arc",
    label: "Balanced growth arc",
    shortLabel: "Balanced",
    description:
      "A calm profile close to the educational reference curve, with body condition near the middle of the scale.",
    centroid: {
      maturityRatio: 0.42,
      adultWeightRatio: 0.58,
      bodyConditionDeviation: 0.08,
      curveDeltaNormalized: 0,
    },
    ownerMeaning:
      "The dog is near the reference growth path. Continue tracking the trajectory instead of judging by one point.",
  },
  {
    id: "compact_late_growth",
    label: "Compact / later growth profile",
    shortLabel: "Compact",
    description:
      "A profile that sits below the reference curve but can still be educationally explainable when monitored over time.",
    centroid: {
      maturityRatio: 0.5,
      adultWeightRatio: 0.45,
      bodyConditionDeviation: 0.18,
      curveDeltaNormalized: -0.7,
    },
    ownerMeaning:
      "This signal is useful for observation. More repeated measurements are needed before making any conclusion.",
  },
  {
    id: "power_growth_profile",
    label: "Power growth profile",
    shortLabel: "Power",
    description:
      "A heavier profile above the reference curve, often driven by high weight ratio or strong curve difference.",
    centroid: {
      maturityRatio: 0.48,
      adultWeightRatio: 0.72,
      bodyConditionDeviation: 0.22,
      curveDeltaNormalized: 0.75,
    },
    ownerMeaning:
      "A strong growth point should still be reviewed calmly together with body condition and activity level.",
  },
  {
    id: "condition_review_profile",
    label: "Condition review profile",
    shortLabel: "Review",
    description:
      "A profile where body condition deviation has more influence than the age/weight curve itself.",
    centroid: {
      maturityRatio: 0.55,
      adultWeightRatio: 0.6,
      bodyConditionDeviation: 0.55,
      curveDeltaNormalized: 0.15,
    },
    ownerMeaning:
      "The strongest signal comes from body condition. The app stays educational and suggests owner review, not diagnosis.",
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function round(value: number, digits = 2) {
  const multiplier = 10 ** digits;
  return Math.round(value * multiplier) / multiplier;
}

function distance(a: GrowthClusterFeaturePoint, b: GrowthClusterFeaturePoint) {
  return Math.sqrt(
    (a.maturityRatio - b.maturityRatio) ** 2 +
      (a.adultWeightRatio - b.adultWeightRatio) ** 2 +
      (a.bodyConditionDeviation - b.bodyConditionDeviation) ** 2 +
      (a.curveDeltaNormalized - b.curveDeltaNormalized) ** 2,
  );
}

export function buildGrowthClusterFeaturePoint(
  input: GrowthClusterInput,
  context: GrowthClusterContext,
): GrowthClusterFeaturePoint {
  const maturityRatio = clamp(input.ageMonths / 24, 0.04, 1.25);
  const adultWeightRatio = clamp(
    input.weightKg / Math.max(input.adultReferenceWeightKg, 1),
    0.02,
    1.8,
  );
  const bodyConditionDeviation = clamp(Math.abs(input.bodyConditionScore - 5) / 4, 0, 1);
  const curveDeltaNormalized = clamp(context.weightDifferencePercent / 20, -1.5, 1.5);

  return {
    maturityRatio: round(maturityRatio),
    adultWeightRatio: round(adultWeightRatio),
    bodyConditionDeviation: round(bodyConditionDeviation),
    curveDeltaNormalized: round(curveDeltaNormalized),
  };
}

export function buildGrowthClusterAnalysis(
  input: GrowthClusterInput,
  context: GrowthClusterContext,
): GrowthClusterAnalysis {
  const featurePoint = buildGrowthClusterFeaturePoint(input, context);
  const ranked = growthClusterProfiles
    .map((profile) => ({
      profile,
      distance: round(distance(featurePoint, profile.centroid), 3),
    }))
    .sort((a, b) => a.distance - b.distance);

  const assignedCluster = ranked[0].profile;
  const summary = `${assignedCluster.label}: ${assignedCluster.ownerMeaning}`;
  const geometryNote =
    "Clustering treats the dog as a point in a multi-feature space. The closest centroid becomes an educational growth-profile group, not a medical category.";

  return {
    assignedCluster,
    featurePoint,
    distanceToCentroid: ranked[0].distance,
    nearestAlternatives: ranked.slice(1, 3),
    summary,
    geometryNote,
  };
}
