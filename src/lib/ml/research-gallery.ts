export type ResearchFigure = {
  title: string;
  src: string;
  sourcePath: string;
  category: "Regression" | "Classification" | "Clustering";
  geometry: string;
  description: string;
  appConnection: string;
};

export const researchFigures: ResearchFigure[] = [
  {
    title: "Regression Coordinate System",
    src: "/research/figures/regression_coordinate_system.png",
    sourcePath: "reports/figures/regression_coordinate_system.png",
    category: "Regression",
    geometry: "Line in age-weight space",
    description:
      "The first visual foundation: age is the horizontal axis, weight is the vertical axis and each dog measurement becomes a point.",
    appConnection:
      "This supports the calculator's basic idea: the entered dog profile is placed on a coordinate map before the app explains the growth signal.",
  },
  {
    title: "Polynomial Growth Curve",
    src: "/research/figures/polynomial_curve_coordinate_system.png",
    sourcePath: "reports/figures/polynomial_curve_coordinate_system.png",
    category: "Regression",
    geometry: "Curved trajectory",
    description:
      "Cane Corso growth is easier to explain as a curve than as a perfectly straight line, especially during the fast puppy-growth phase.",
    appConnection:
      "This is the direction for the expected-growth curve that will later be shown beside the user's current dog point.",
  },
  {
    title: "Classification Feature Boundary",
    src: "/research/figures/classification_feature_space_boundary.png",
    sourcePath: "reports/figures/classification_feature_space_boundary.png",
    category: "Classification",
    geometry: "Review-zone boundary",
    description:
      "Classification is presented as a separation between normal-growth samples and samples that should be reviewed with more attention.",
    appConnection:
      "This supports the app's safe wording: the output is a review signal, not a diagnosis or veterinary decision.",
  },
  {
    title: "Clustering Feature Space Concept",
    src: "/research/figures/clustering_feature_space_concept.png",
    sourcePath: "reports/figures/clustering_feature_space_concept.png",
    category: "Clustering",
    geometry: "Groups in feature space",
    description:
      "The future unsupervised-learning idea is to discover similar growth profiles without predefined labels.",
    appConnection:
      "This prepares the next stage of the project: grouping dogs by growth profile patterns and explaining those groups visually.",
  },
];
