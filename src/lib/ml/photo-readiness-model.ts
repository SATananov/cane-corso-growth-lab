export type PhotoReadinessModelStageStatus = "planned" | "data_required" | "ready_for_notebook";

export type PhotoReadinessClassId = "accepted" | "limited" | "rejected";

export type PhotoReadinessClassDefinition = {
  id: PhotoReadinessClassId;
  label: string;
  meaning: string;
  comparisonPolicy: string;
  examples: string[];
};

export type PhotoReadinessTrainingStage = {
  title: string;
  purpose: string;
  output: string;
  status: PhotoReadinessModelStageStatus;
};

export type PhotoReadinessTrainingArtifact = {
  label: string;
  path: string;
  purpose: string;
};

export const photoReadinessClasses: PhotoReadinessClassDefinition[] = [
  {
    id: "accepted",
    label: "Accepted",
    meaning:
      "The image follows the comparison guide closely enough for visual geometry review.",
    comparisonPolicy:
      "The app may proceed to visual comparison, while still showing that the result is orientation only.",
    examples: [
      "full side-body image",
      "standing dog",
      "camera close to body height",
      "good light",
    ],
  },
  {
    id: "limited",
    label: "Limited",
    meaning:
      "The image contains usable information but has one or more issues that reduce reliability.",
    comparisonPolicy:
      "The app may show a limited result only with a visible reliability warning.",
    examples: [
      "slightly high camera angle",
      "minor body occlusion",
      "moderate light limitation",
      "stance is not ideal",
    ],
  },
  {
    id: "rejected",
    label: "Rejected",
    meaning:
      "The image does not provide enough reliable visual information for comparison.",
    comparisonPolicy:
      "The app must block the visual match score and ask the user to upload a new image.",
    examples: [
      "only head visible for body review",
      "dog sitting or lying down",
      "body cut off",
      "strong perspective distortion",
    ],
  },
];

export const photoReadinessTrainingStages: PhotoReadinessTrainingStage[] = [
  {
    title: "1. Label the image",
    purpose:
      "Each image receives readiness, view type, quality and issue labels before training.",
    output: "accepted / limited / rejected label",
    status: "ready_for_notebook",
  },
  {
    title: "2. Train the readiness classifier",
    purpose:
      "A baseline model learns which uploaded photos are suitable for comparison.",
    output: "photo readiness prediction",
    status: "data_required",
  },
  {
    title: "3. Evaluate safety behavior",
    purpose:
      "Rejected photos should not produce a visual match score, even if a breed classifier exists later.",
    output: "confusion matrix and rejection precision",
    status: "planned",
  },
  {
    title: "4. Connect to visual review UI",
    purpose:
      "The app uses the readiness model before geometry or Cane Corso similarity comparison.",
    output: "warning gate before visual match",
    status: "planned",
  },
];

export const photoReadinessTrainingArtifacts: PhotoReadinessTrainingArtifact[] = [
  {
    label: "Notebook",
    path: "notebooks/07_photo_readiness_model.ipynb",
    purpose:
      "Starter notebook for photo readiness training, evaluation and safe model export planning.",
  },
  {
    label: "Training starter script",
    path: "scripts/ml/train_photo_readiness_model.py",
    purpose:
      "A lightweight Python script that audits labels and writes a readiness training report without requiring image dependencies yet.",
  },
  {
    label: "Training report",
    path: "reports/vision/photo-readiness-model-plan.json",
    purpose:
      "Current status of the readiness model plan, classes, data requirements and safety policy.",
  },
  {
    label: "Labels source",
    path: "data/images/labels/sample-image-labels.csv",
    purpose:
      "The initial label format used by the notebook and script before real curated images are added.",
  },
];

export const photoReadinessModelPrinciples = [
  "The readiness model runs before breed recognition and before visual similarity scoring.",
  "Rejected images block the Visual Cane Corso Match result instead of producing a misleading score.",
  "Limited images may be used only with a visible reliability warning.",
  "The model learns from labelled examples, not from one ideal reference photo.",
  "The result is about photo suitability for visual comparison, not about pedigree or breed purity.",
];
