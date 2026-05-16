export type RegressionModelResult = {
  model: string;
  geometry: string;
  features: string;
  mae: number;
  rmse: number;
  r2Score: number;
  interpretation: string;
};

export type ClassificationModelResult = {
  model: string;
  geometry: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  auc: number;
  interpretation: string;
};

export const regressionResults: RegressionModelResult[] = [
  {
    model: "Simple Linear Regression",
    geometry: "Line",
    features: "age_months",
    mae: 4.480092,
    rmse: 4.788877,
    r2Score: 0.855636,
    interpretation:
      "A clear first baseline. It explains the direct age-to-weight relationship, but growth is not perfectly linear.",
  },
  {
    model: "Polynomial Regression",
    geometry: "Curve",
    features: "age_months with polynomial degree 2",
    mae: 2.553559,
    rmse: 3.308937,
    r2Score: 0.931076,
    interpretation:
      "A stronger visual fit because Cane Corso growth behaves more like a curve than a straight line.",
  },
  {
    model: "Multi-Dimensional Linear Regression",
    geometry: "Surface",
    features: "age_months, height_cm, sex, activity_level",
    mae: 1.389803,
    rmse: 1.821017,
    r2Score: 0.979125,
    interpretation:
      "A better estimate because the model uses more than age and represents the profile in a wider feature space.",
  },
  {
    model: "Ridge Regression",
    geometry: "Regularized surface",
    features: "age_months, height_cm, sex, activity_level",
    mae: 1.136788,
    rmse: 1.404523,
    r2Score: 0.987582,
    interpretation:
      "The current best regression result in the imported notebook comparison, with regularization for more stable learning.",
  },
  {
    model: "Lasso Regression",
    geometry: "Sparse regularized surface",
    features: "age_months, height_cm, sex, activity_level",
    mae: 1.257905,
    rmse: 1.678562,
    r2Score: 0.982264,
    interpretation:
      "Also strong, with a simpler-feature tendency that can help explain which signals matter more.",
  },
];

export const classificationResults: ClassificationModelResult[] = [
  {
    model: "Logistic Regression",
    geometry: "Boundary",
    accuracy: 0.8116,
    precision: 0.764426,
    recall: 0.9008,
    f1Score: 0.827029,
    auc: 0.888605,
    interpretation:
      "Simple and interpretable baseline for separating normal growth from needs-attention samples.",
  },
  {
    model: "Decision Tree",
    geometry: "Decision splits",
    accuracy: 0.8228,
    precision: 0.777701,
    recall: 0.904,
    f1Score: 0.836108,
    auc: 0.888788,
    interpretation:
      "Readable rule-style model. Useful for explaining why a profile enters a review zone.",
  },
  {
    model: "Random Forest",
    geometry: "Ensemble boundary",
    accuracy: 0.8324,
    precision: 0.786749,
    recall: 0.912,
    f1Score: 0.844757,
    auc: 0.911906,
    interpretation:
      "The strongest classification result in the imported comparison by F1-score and AUC.",
  },
  {
    model: "AdaBoost",
    geometry: "Boosted boundary",
    accuracy: 0.7708,
    precision: 0.685683,
    recall: 1,
    f1Score: 0.813537,
    auc: 0.874921,
    interpretation:
      "Very high recall in this sample, but lower precision. Useful as a caution example for over-alerting.",
  },
  {
    model: "Support Vector Machine",
    geometry: "Margin boundary",
    accuracy: 0.8312,
    precision: 0.788301,
    recall: 0.9056,
    f1Score: 0.842889,
    auc: 0.89902,
    interpretation:
      "Strong boundary-based classifier with results close to Random Forest in this experiment.",
  },
];

export const mlFoundationSummary = {
  status: "Research foundation imported",
  regressionBestModel: "Ridge Regression",
  classificationBestModel: "Random Forest",
  regressionBestR2: 0.987582,
  classificationBestF1: 0.844757,
  notebookCount: 4,
  dataFiles: 3,
  figures: 4,
  safetyNote:
    "The imported ML results are educational model evidence. They are not veterinary diagnosis, medical advice or official Cane Corso evaluation.",
};

export function formatPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

export function formatMetric(value: number) {
  return value.toFixed(3);
}
