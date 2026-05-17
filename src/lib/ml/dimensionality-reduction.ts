import type { GrowthClusterAnalysis } from "@/lib/ml/growth-clustering";
import type { GrowthFeatureVector } from "@/lib/ml/feature-engineering";

export type PcaReferencePoint = {
  id: string;
  label: string;
  pc1: number;
  pc2: number;
  type: "reference" | "cluster";
};

export type PcaProjection = {
  pc1: number;
  pc2: number;
  normalizedX: number;
  normalizedY: number;
  interpretation: string;
  nearestReference: PcaReferencePoint;
  referencePoints: PcaReferencePoint[];
};

export const pcaReferencePoints: PcaReferencePoint[] = [
  { id: "balanced", label: "Balanced arc", pc1: 0.12, pc2: -0.08, type: "cluster" },
  { id: "compact", label: "Compact profile", pc1: -0.72, pc2: 0.18, type: "cluster" },
  { id: "power", label: "Power profile", pc1: 0.84, pc2: 0.32, type: "cluster" },
  { id: "condition", label: "Condition review", pc1: 0.18, pc2: 0.92, type: "cluster" },
  { id: "early", label: "Early puppy", pc1: -0.55, pc2: -0.52, type: "reference" },
  { id: "adolescent", label: "Adolescent", pc1: 0.42, pc2: -0.34, type: "reference" },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function round(value: number, digits = 3) {
  const multiplier = 10 ** digits;
  return Math.round(value * multiplier) / multiplier;
}

function normalize(value: number) {
  return clamp(((value + 1.2) / 2.4) * 100, 4, 96);
}

function distance(a: { pc1: number; pc2: number }, b: { pc1: number; pc2: number }) {
  return Math.sqrt((a.pc1 - b.pc1) ** 2 + (a.pc2 - b.pc2) ** 2);
}

export function projectGrowthToPcaSpace(
  featureVector: GrowthFeatureVector,
  clusterAnalysis: GrowthClusterAnalysis,
): PcaProjection {
  const f = featureVector.numericFeatures;

  const pc1 = round(
    f.adultWeightRatio * 1.15 +
      f.maturityRatio * 0.55 +
      f.curveDeltaPercent * 0.018 -
      0.88,
  );
  const pc2 = round(
    f.bodyConditionDeviation * 1.25 +
      f.weightHeightRatio * 0.5 +
      (clusterAnalysis.distanceToCentroid - 0.35) * 0.6 -
      0.42,
  );

  const nearestReference = pcaReferencePoints
    .map((point) => ({ point, distance: distance({ pc1, pc2 }, point) }))
    .sort((a, b) => a.distance - b.distance)[0].point;

  const interpretation =
    "This 2D projection compresses the engineered feature vector into a visual growth space. It is a PCA-style educational visualization, not a clinical measurement.";

  return {
    pc1,
    pc2,
    normalizedX: round(normalize(pc1), 1),
    normalizedY: round(100 - normalize(pc2), 1),
    interpretation,
    nearestReference,
    referencePoints: pcaReferencePoints,
  };
}
