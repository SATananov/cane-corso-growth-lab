export type MlflowRunSummary = {
  runId: string;
  name: string;
  modelFamily: "regression" | "classification" | "clustering" | "projection";
  stage: "research" | "app_bridge" | "candidate";
  metrics: Array<{ label: string; value: string }>;
  artifacts: string[];
};

export const mlflowRunSummaries: MlflowRunSummary[] = [
  {
    runId: "ccgl-regression-ridge-v0-1",
    name: "Ridge Regression Growth Curve",
    modelFamily: "regression",
    stage: "app_bridge",
    metrics: [
      { label: "MAE", value: "1.137" },
      { label: "RMSE", value: "1.405" },
      { label: "R²", value: "0.988" },
    ],
    artifacts: ["reports/model-exports/app-model-bridge-v0.1.json", "reports/figures/polynomial_curve_coordinate_system.png"],
  },
  {
    runId: "ccgl-classification-rf-v0-1",
    name: "Random Forest Review Signal",
    modelFamily: "classification",
    stage: "research",
    metrics: [
      { label: "Accuracy", value: "0.832" },
      { label: "F1", value: "0.845" },
      { label: "AUC", value: "0.912" },
    ],
    artifacts: ["notebooks/03_growth_classification_zones.ipynb", "reports/figures/classification_feature_space_boundary.png"],
  },
  {
    runId: "ccgl-clustering-centroids-v0-1",
    name: "Growth Profile Centroid Bridge",
    modelFamily: "clustering",
    stage: "candidate",
    metrics: [
      { label: "Profiles", value: "4" },
      { label: "Features", value: "4" },
      { label: "Mode", value: "educational" },
    ],
    artifacts: ["src/lib/ml/growth-clustering.ts", "docs/ml/clustering-growth-profiles.md"],
  },
];

export const mlflowTrackingPrinciples = [
  "Track parameters, metrics and artifacts for each experiment.",
  "Separate research runs from app-bridge candidates.",
  "Never treat an educational run as a production veterinary model.",
  "Keep the exported model bridge small enough for a browser app.",
];
