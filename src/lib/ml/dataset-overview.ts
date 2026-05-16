export type DatasetStage = "Prototype" | "Processed" | "Classification";

export type DatasetQualitySignal = {
  label: string;
  value: string;
  tone: "safe" | "caution" | "neutral";
};

export type DatasetPreviewRow = Record<string, string>;

export type DatasetOverviewItem = {
  id: string;
  stage: DatasetStage;
  title: string;
  path: string;
  rows: number;
  columns: number;
  source: string;
  role: string;
  usedFor: string[];
  keyFields: string[];
  qualitySignals: DatasetQualitySignal[];
  previewRows: DatasetPreviewRow[];
};

export const datasetOverview: DatasetOverviewItem[] = [
  {
    id: "prototype-growth-sample",
    stage: "Prototype",
    title: "Prototype Cane Corso Growth Sample",
    path: "data/prototype/cane_corso_growth_sample.csv",
    rows: 32,
    columns: 8,
    source: "Small educational prototype dataset created for beginner-friendly growth regression experiments.",
    role: "Simple controlled sample for explaining age, weight and height as a coordinate relationship.",
    usedFor: [
      "First age-to-weight regression baseline",
      "Growth coordinate map explanation",
      "Beginner-friendly notebook demonstrations",
    ],
    keyFields: [
      "dog_id",
      "dog_name",
      "sex",
      "age_months",
      "weight_kg",
      "height_cm",
      "activity_level",
      "source_type",
    ],
    qualitySignals: [
      {
        label: "Best use",
        value: "learning and visual explanation",
        tone: "safe",
      },
      {
        label: "Limitation",
        value: "small sample, not production evidence",
        tone: "caution",
      },
    ],
    previewRows: [
      {
        dog: "Ares",
        sex: "male",
        age: "2 months",
        weight: "9.5 kg",
        height: "32 cm",
      },
      {
        dog: "Ares",
        sex: "male",
        age: "3 months",
        weight: "14.2 kg",
        height: "38 cm",
      },
      {
        dog: "Ares",
        sex: "male",
        age: "4 months",
        weight: "20.1 kg",
        height: "45 cm",
      },
    ],
  },
  {
    id: "processed-public-growth-sample",
    stage: "Processed",
    title: "Processed Public Growth Sample",
    path: "data/processed/dog_growth_public_sample.csv",
    rows: 10000,
    columns: 12,
    source: "Processed public sample prepared for wider growth-pattern experimentation.",
    role: "Broader reference table for model experiments, feature-space thinking and app-safe summaries.",
    usedFor: [
      "Multi-dimensional regression experiments",
      "Feature-space exploration",
      "Model comparison and future app calibration",
    ],
    keyFields: [
      "breed_id",
      "pet_id",
      "gender",
      "visit_age_months",
      "weight_kg",
      "bcs_recorded",
      "bcs_predicted",
      "average_adult_breed_weight_kg",
      "source_type",
    ],
    qualitySignals: [
      {
        label: "Best use",
        value: "research foundation and feature engineering",
        tone: "safe",
      },
      {
        label: "Boundary",
        value: "processed sample only, raw data not committed",
        tone: "neutral",
      },
    ],
    previewRows: [
      {
        gender: "F",
        age: "3.58 months",
        weight: "16.919 kg",
        bcs: "not recorded",
        source: "public processed",
      },
      {
        gender: "M",
        age: "2.03 months",
        weight: "7.938 kg",
        bcs: "Thin",
        source: "public processed",
      },
      {
        gender: "FS",
        age: "4.26 months",
        weight: "16.964 kg",
        bcs: "not recorded",
        source: "public processed",
      },
    ],
  },
  {
    id: "growth-classification-sample",
    stage: "Classification",
    title: "Growth Classification Sample",
    path: "data/processed/dog_growth_classification_sample.csv",
    rows: 10000,
    columns: 15,
    source: "Prepared sample with educational growth-status labels derived for classification experiments.",
    role: "Training/evaluation base for review-zone classification, not for medical diagnosis.",
    usedFor: [
      "Logistic Regression and tree-based classification",
      "Random Forest review-zone signal",
      "Safe normal-growth vs needs-attention explanations",
    ],
    keyFields: [
      "visit_age_months",
      "weight_kg",
      "bcs_recorded",
      "bcs_predicted",
      "bcs_source",
      "growth_status",
      "growth_status_binary",
      "healthy_pet_diagnosis",
    ],
    qualitySignals: [
      {
        label: "Best use",
        value: "classification demo and review-zone signal",
        tone: "safe",
      },
      {
        label: "Safety rule",
        value: "not a veterinary diagnosis target",
        tone: "caution",
      },
    ],
    previewRows: [
      {
        gender: "FS",
        age: "33.25 months",
        weight: "33.384 kg",
        bcs: "Normal",
        status: "normal_growth",
      },
      {
        gender: "FS",
        age: "30.04 months",
        weight: "33.793 kg",
        bcs: "Normal",
        status: "normal_growth",
      },
      {
        gender: "FS",
        age: "35.59 months",
        weight: "37.013 kg",
        bcs: "Normal",
        status: "normal_growth",
      },
    ],
  },
];

export const datasetExplorerSummary = {
  title: "Dataset Explorer",
  subtitle: "What data supports the ML layer?",
  totalDatasets: datasetOverview.length,
  totalRows: datasetOverview.reduce((sum, item) => sum + item.rows, 0),
  totalColumnsTracked: datasetOverview.reduce((sum, item) => sum + item.columns, 0),
  rawPolicy: "Large raw files stay outside the repo. The app uses documented processed samples and small educational prototype data.",
  safeUse: "The data is used for learning, visualization and experimental model evidence only. It is not a medical record system.",
};

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function getQualityToneClass(tone: DatasetQualitySignal["tone"]) {
  if (tone === "safe") {
    return "border-emerald-300/20 bg-emerald-300/10 text-emerald-100";
  }

  if (tone === "caution") {
    return "border-amber-300/25 bg-amber-300/10 text-amber-100";
  }

  return "border-stone-500/25 bg-white/[0.04] text-stone-200";
}
