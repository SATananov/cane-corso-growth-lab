export type NeuralNetworkGrowthResults = {
  step: string;
  modelType: string;
  task: string;
  targetLabels: [string, string];
  numericFeatures: string[];
  categoricalFeatures: string[];
  trainRows: number;
  testRows: number;
  hiddenLayerSizes: [number, number];
  accuracy: number;
  precisionNeedsAttention: number;
  recallNeedsAttention: number;
  f1NeedsAttention: number;
  trainingIterations: number;
  finalTrainingLoss: number;
  confusionMatrix: [[number, number], [number, number]];
  reportPath: string;
  notebookPath: string;
  trainingScriptPath: string;
};

export const neuralNetworkGrowthResults: NeuralNetworkGrowthResults = {
  step: "Step 36 — Tabular Neural Network Growth Prediction Prototype",
  modelType: "scikit-learn MLPClassifier",
  task: "normal_growth vs needs_attention",
  targetLabels: ["normal_growth", "needs_attention"],
  numericFeatures: [
    "visit_age_months",
    "weight_kg",
    "average_adult_breed_weight_kg",
  ],
  categoricalFeatures: ["gender"],
  trainRows: 8000,
  testRows: 2000,
  hiddenLayerSizes: [16, 8],
  accuracy: 0.807,
  precisionNeedsAttention: 0.7924,
  recallNeedsAttention: 0.832,
  f1NeedsAttention: 0.8117,
  trainingIterations: 43,
  finalTrainingLoss: 0.364478,
  confusionMatrix: [[782, 218], [168, 832]],
  reportPath: "reports/neural-network-growth-prototype.md",
  notebookPath: "notebooks/12_tabular_neural_network_growth_prediction.ipynb",
  trainingScriptPath: "scripts/ml/train_growth_neural_network.py",
};
