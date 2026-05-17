export type CourseCoverageItem = {
  module: string;
  covered: "implemented" | "partial" | "planned";
  appEvidence: string[];
  projectFiles: string[];
  nextImprovement: string;
};

export const courseCoverageItems: CourseCoverageItem[] = [
  {
    module: "Linear Regression, Regularization and Testing",
    covered: "implemented",
    appEvidence: ["Growth curve prediction", "Ridge evidence", "Model bridge export"],
    projectFiles: ["src/lib/ml/app-model-bridge.ts", "reports/model-exports/app-model-bridge-v0.1.json"],
    nextImprovement: "Add a notebook cell that re-exports the bridge after every model training run.",
  },
  {
    module: "Classification",
    covered: "implemented",
    appEvidence: ["Growth status signal", "Random Forest evidence", "Explainability report"],
    projectFiles: ["src/lib/ml/growth-explainability.ts", "notebooks/03_growth_classification_zones.ipynb"],
    nextImprovement: "Add threshold tuning and a clear confusion-matrix section in the notebook.",
  },
  {
    module: "Unsupervised Learning, Clustering",
    covered: "implemented",
    appEvidence: ["Growth profile groups", "Centroid comparison", "Clustering overview"],
    projectFiles: ["src/lib/ml/growth-clustering.ts", "src/components/growth-cluster-overview.tsx"],
    nextImprovement: "Train K-Means and DBSCAN over the processed sample and compare the groups.",
  },
  {
    module: "Feature Engineering and Time Series",
    covered: "partial",
    appEvidence: ["Feature vector", "Age bucket", "Curve delta", "Future trajectory direction"],
    projectFiles: ["src/lib/ml/feature-engineering.ts", "src/components/feature-vector-panel.tsx"],
    nextImprovement: "Add repeated dog measurements for true time-series tracking.",
  },
  {
    module: "Dimensionality Reduction",
    covered: "implemented",
    appEvidence: ["PCA-style growth map", "2D projection", "Reference areas"],
    projectFiles: ["src/lib/ml/dimensionality-reduction.ts", "src/components/pca-growth-map.tsx"],
    nextImprovement: "Run real PCA in Python and export the projection matrix.",
  },
  {
    module: "MLflow",
    covered: "partial",
    appEvidence: ["Run summaries", "Metrics/artifacts plan", "Optional tracking script"],
    projectFiles: ["src/lib/ml/mlflow-tracking.ts", "scripts/ml/run_mlflow_tracking_demo.py"],
    nextImprovement: "Record real MLflow runs from notebook training sessions.",
  },
];

export const finalRoadmap = [
  "Replace static coefficients with generated exports from notebooks.",
  "Add real K-Means / DBSCAN clustering comparison.",
  "Add repeated-measurement growth trajectory examples.",
  "Add MLflow run screenshots or exported tracking artifacts.",
  "Prepare a final English project report and presentation/demo script.",
];
