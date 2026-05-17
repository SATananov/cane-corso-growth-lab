export type ResearchAsset = {
  title: string;
  path: string;
  description: string;
  type: "Notebook" | "Dataset" | "Figure" | "Documentation" | "Script";
};

export const notebookAssets: ResearchAsset[] = [
  {
    type: "Notebook",
    title: "Growth Regression Geometry",
    path: "notebooks/01_growth_regression_geometry.ipynb",
    description:
      "Regression notebook covering linear, polynomial, multi-feature and regularized models.",
  },
  {
    type: "Notebook",
    title: "Real Data Preparation",
    path: "notebooks/02_real_data_preparation.ipynb",
    description:
      "Data preparation notebook for public growth samples and project-safe processing.",
  },
  {
    type: "Notebook",
    title: "Growth Classification Zones",
    path: "notebooks/03_growth_classification_zones.ipynb",
    description:
      "Classification notebook with Logistic Regression, trees, ensembles and SVM.",
  },
  {
    type: "Notebook",
    title: "Growth Clustering Experiment",
    path: "notebooks/04_growth_clustering_experiment.ipynb",
    description:
      "Reserved notebook for the next unsupervised learning experiment.",
  },
];

export const dataAssets: ResearchAsset[] = [
  {
    type: "Dataset",
    title: "Prototype Growth Sample",
    path: "data/prototype/cane_corso_growth_sample.csv",
    description: "Small reference sample for beginner-friendly regression exercises.",
  },
  {
    type: "Dataset",
    title: "Processed Public Growth Sample",
    path: "data/processed/dog_growth_public_sample.csv",
    description: "Processed public sample used as a broader ML foundation.",
  },
  {
    type: "Dataset",
    title: "Growth Classification Sample",
    path: "data/processed/dog_growth_classification_sample.csv",
    description: "Prepared classification sample with growth status labels.",
  },
];

export const figureAssets: ResearchAsset[] = [
  {
    type: "Figure",
    title: "Regression Coordinate System",
    path: "reports/figures/regression_coordinate_system.png",
    description: "Visual explanation of age and weight as a coordinate relationship.",
  },
  {
    type: "Figure",
    title: "Polynomial Curve Coordinate System",
    path: "reports/figures/polynomial_curve_coordinate_system.png",
    description: "Curved growth trajectory concept for the app story.",
  },
  {
    type: "Figure",
    title: "Classification Feature Space Boundary",
    path: "reports/figures/classification_feature_space_boundary.png",
    description: "How classification can separate growth review zones.",
  },
  {
    type: "Figure",
    title: "Clustering Feature Space Concept",
    path: "reports/figures/clustering_feature_space_concept.png",
    description: "Future unsupervised learning concept for profile groups.",
  },
];
