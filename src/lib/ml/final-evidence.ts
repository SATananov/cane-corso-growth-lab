import {
  classificationResults,
  regressionResults,
  type ClassificationModelResult,
  type RegressionModelResult,
} from "@/lib/ml/model-results";

export type EvidencePriority = "primary" | "supporting" | "safety";

export type FormulaEvidenceRow = {
  id: string;
  label: string;
  formula: string;
  meaning: string;
  appUse: string;
  priority: EvidencePriority;
};

export type ModelEvidenceRow = {
  family: "Regression" | "Classification";
  model: string;
  geometry: string;
  primaryMetric: string;
  supportingMetrics: string;
  appDecision: string;
};

export type ProjectEvidenceChecklistRow = {
  area: string;
  appSurface: string;
  evidence: string;
  whyItMatters: string;
};

export const growthFormulaEvidence: FormulaEvidenceRow[] = [
  {
    id: "growth-progress",
    label: "Growth progress",
    formula: "growth_progress = f(age_months)",
    meaning:
      "The app maps age to an educational maturity progress value. This creates a curve instead of treating growth as a straight line.",
    appUse:
      "Used to estimate the expected weight for the selected age and adult reference weight.",
    priority: "primary",
  },
  {
    id: "expected-weight",
    label: "Expected weight now",
    formula: "expected_weight_now = adult_reference_weight × growth_progress",
    meaning:
      "This produces the current point on the educational reference growth curve.",
    appUse:
      "Shown in the prediction summary and used by the coordinate map.",
    priority: "primary",
  },
  {
    id: "curve-delta",
    label: "Curve delta",
    formula: "curve_delta_% = ((current_weight - expected_weight_now) / expected_weight_now) × 100",
    meaning:
      "This measures how far the current dog point is from the reference curve.",
    appUse:
      "Used by the explainability report, feature engineering layer and review-zone signal.",
    priority: "primary",
  },
  {
    id: "adult-estimate",
    label: "Estimated adult weight",
    formula: "estimated_adult_weight = current_weight / growth_progress",
    meaning:
      "This gives an orientation estimate based on the current weight and maturity progress.",
    appUse:
      "Shown as a simple owner-facing result, with the safe warning that this is not a medical conclusion.",
    priority: "supporting",
  },
  {
    id: "weight-height-ratio",
    label: "Weight / height ratio",
    formula: "weight_height_ratio = weight_kg / height_cm",
    meaning:
      "A lightweight proportionality feature that prevents the app from reading weight alone.",
    appUse:
      "Used in feature engineering, clustering and PCA-style projection.",
    priority: "supporting",
  },
  {
    id: "bcs-deviation",
    label: "BCS deviation",
    formula: "bcs_deviation = |body_condition_score - 5| / 4",
    meaning:
      "This turns body condition into a neutral review signal around the middle of the 1–9 scale.",
    appUse:
      "Used to keep review-zone logic careful and non-diagnostic.",
    priority: "safety",
  },
];

export const projectEvidenceChecklist: ProjectEvidenceChecklistRow[] = [
  {
    area: "Input clarity",
    appSurface: "/calculator",
    evidence: "Dog profile form with age, weight, height, sex, BCS and adult reference weight.",
    whyItMatters:
      "The user can see exactly which data creates the growth point and ML-style output.",
  },
  {
    area: "Visual ML logic",
    appSurface: "/calculator + /experiments",
    evidence: "Coordinate map, PCA-style map, research gallery and model bridge summary.",
    whyItMatters:
      "The project explains models visually as points, curves, boundaries, groups and projections.",
  },
  {
    area: "Model evidence",
    appSurface: "/experiments",
    evidence: "Regression and classification tables with R², MAE, RMSE, accuracy, precision, recall, F1 and AUC.",
    whyItMatters:
      "The app is backed by visible evaluation results instead of only a nice UI.",
  },
  {
    area: "Data transparency",
    appSurface: "/data",
    evidence: "Dataset cards, safe preview tables, row/column counts and feature formula table.",
    whyItMatters:
      "The reviewer can inspect what data is used and how raw inputs become model features.",
  },
  {
    area: "Safety boundary",
    appSurface: "All ML pages",
    evidence: "Educational wording, non-diagnostic labels and owner review language.",
    whyItMatters:
      "The app avoids medical claims while still being useful as a learning and visualization tool.",
  },
];

function formatRegressionMetric(value: number) {
  return value.toFixed(3);
}

function formatPercentMetric(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

function regressionToEvidenceRow(result: RegressionModelResult): ModelEvidenceRow {
  return {
    family: "Regression",
    model: result.model,
    geometry: result.geometry,
    primaryMetric: `R² ${formatRegressionMetric(result.r2Score)}`,
    supportingMetrics: `MAE ${formatRegressionMetric(result.mae)} · RMSE ${formatRegressionMetric(result.rmse)}`,
    appDecision:
      result.model === "Ridge Regression"
        ? "Best current curve evidence for the app bridge."
        : "Used as comparison evidence for model choice.",
  };
}

function classificationToEvidenceRow(result: ClassificationModelResult): ModelEvidenceRow {
  return {
    family: "Classification",
    model: result.model,
    geometry: result.geometry,
    primaryMetric: `F1 ${formatRegressionMetric(result.f1Score)}`,
    supportingMetrics: `Accuracy ${formatPercentMetric(result.accuracy)} · Precision ${formatPercentMetric(
      result.precision,
    )} · Recall ${formatPercentMetric(result.recall)} · AUC ${formatRegressionMetric(result.auc)}`,
    appDecision:
      result.model === "Random Forest"
        ? "Best current review-zone classifier evidence."
        : "Used to compare caution, recall and boundary behavior.",
  };
}

export const modelEvidenceRows: ModelEvidenceRow[] = [
  ...regressionResults.map(regressionToEvidenceRow),
  ...classificationResults.map(classificationToEvidenceRow),
];

export const finalEvidenceSummary = {
  title: "Final ML evidence layer",
  subtitle:
    "The project now connects formulas, tables, visual maps, model metrics and safety wording into one explainable app flow.",
  modelFamilies: 6,
  formulaRows: growthFormulaEvidence.length,
  evidenceRows: projectEvidenceChecklist.length,
  safetyStatement:
    "The app produces an educational growth review signal. It does not diagnose, prescribe or replace veterinary advice.",
};
