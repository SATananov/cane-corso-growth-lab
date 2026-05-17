export type VisualBreedClassId =
  | "cane_corso"
  | "presa_canario"
  | "boerboel"
  | "rottweiler"
  | "american_bully"
  | "mixed_large_dog"
  | "not_suitable_photo";

export type VisualBreedClassGroup =
  | "target"
  | "similar_breed"
  | "negative"
  | "quality_gate";

export type VisualBreedClassDefinition = {
  id: VisualBreedClassId;
  label: string;
  group: VisualBreedClassGroup;
  modelRole: string;
  whyItMatters: string;
  minimumImages: number;
  recommendedImages: number;
};

export type VisualBreedTrainingStage = {
  id: string;
  title: string;
  purpose: string;
  requiredInput: string;
  expectedOutput: string;
  readiness: "planned" | "waiting_for_dataset" | "notebook_ready";
};

export type VisualBreedArtifact = {
  label: string;
  path: string;
  purpose: string;
};

export type EvidenceWeight = {
  signal: string;
  role: string;
  tentativeWeight: string;
  userFacingMeaning: string;
};

export const visualBreedClasses: VisualBreedClassDefinition[] = [
  {
    id: "cane_corso",
    label: "Cane Corso",
    group: "target",
    modelRole:
      "Positive visual class used to learn the Cane Corso type from curated examples.",
    whyItMatters:
      "This is the reference visual class for future similarity scoring, not proof of pedigree.",
    minimumImages: 150,
    recommendedImages: 800,
  },
  {
    id: "presa_canario",
    label: "Presa Canario",
    group: "similar_breed",
    modelRole:
      "Hard negative class because it can look close to Cane Corso in size and molosser structure.",
    whyItMatters:
      "The model must learn subtle differences instead of treating every large molosser as Cane Corso.",
    minimumImages: 80,
    recommendedImages: 400,
  },
  {
    id: "boerboel",
    label: "Boerboel",
    group: "similar_breed",
    modelRole:
      "Hard negative class for broad-bodied mastiff-type comparison.",
    whyItMatters:
      "Improves separation between Cane Corso visual type and other powerful working dogs.",
    minimumImages: 80,
    recommendedImages: 400,
  },
  {
    id: "rottweiler",
    label: "Rottweiler",
    group: "similar_breed",
    modelRole:
      "Comparison class with strong body mass and working-dog appearance.",
    whyItMatters:
      "Helps the classifier avoid relying only on dark coat, strong head or general body strength.",
    minimumImages: 80,
    recommendedImages: 400,
  },
  {
    id: "american_bully",
    label: "American Bully",
    group: "similar_breed",
    modelRole:
      "Comparison class for broad head, muscular body and compact visual signals.",
    whyItMatters:
      "Forces the model to consider proportion and silhouette, not just muscular appearance.",
    minimumImages: 80,
    recommendedImages: 400,
  },
  {
    id: "mixed_large_dog",
    label: "Mixed / large dog",
    group: "negative",
    modelRole:
      "General negative class for non-target large dogs and mixed visual types.",
    whyItMatters:
      "Reduces over-confident Cane Corso predictions on large but unrelated dogs.",
    minimumImages: 120,
    recommendedImages: 600,
  },
  {
    id: "not_suitable_photo",
    label: "Not suitable photo",
    group: "quality_gate",
    modelRole:
      "Photos that should be rejected or routed to the photo readiness gate before breed classification.",
    whyItMatters:
      "Bad photos must not produce a confident Cane Corso match score.",
    minimumImages: 120,
    recommendedImages: 600,
  },
];

export const visualBreedTrainingStages: VisualBreedTrainingStage[] = [
  {
    id: "dataset_audit",
    title: "1. Audit labelled image data",
    purpose:
      "Check that the image labels cover Cane Corso, similar breeds and not-suitable photos before training.",
    requiredInput:
      "data/images/labels/sample-image-labels.csv or a real curated labels file.",
    expectedOutput:
      "Class counts, split counts, missing-image warnings and a training readiness decision.",
    readiness: "notebook_ready",
  },
  {
    id: "baseline_classifier",
    title: "2. Train baseline visual classifier",
    purpose:
      "Use transfer learning to classify Cane Corso visual type against similar and negative classes.",
    requiredInput:
      "Licensed or owner-permitted images split into train, validation and test sets.",
    expectedOutput:
      "Class probabilities and evaluation metrics: accuracy, precision, recall, F1 and confusion matrix.",
    readiness: "waiting_for_dataset",
  },
  {
    id: "hard_negative_review",
    title: "3. Review hard negatives",
    purpose:
      "Focus on visually similar breeds where mistakes are most likely.",
    requiredInput:
      "Validation examples from Presa Canario, Boerboel, Rottweiler, American Bully and mixed large dogs.",
    expectedOutput:
      "Error analysis table and improvement list for data balancing or label cleanup.",
    readiness: "planned",
  },
  {
    id: "safe_app_export",
    title: "4. Export app-safe model evidence",
    purpose:
      "Export probabilities and model notes in a form the app can present as visual similarity, not breed proof.",
    requiredInput:
      "Evaluated model, class map, metrics and safety wording.",
    expectedOutput:
      "Visual Cane Corso Match evidence that combines classifier, similarity and geometry signals.",
    readiness: "planned",
  },
];

export const visualBreedEvidenceWeights: EvidenceWeight[] = [
  {
    signal: "Photo readiness",
    role: "Gatekeeper",
    tentativeWeight: "Required before scoring",
    userFacingMeaning:
      "A rejected image blocks the visual match result because the photo is not reliable.",
  },
  {
    signal: "Breed classifier probability",
    role: "Visual class signal",
    tentativeWeight: "35%",
    userFacingMeaning:
      "Shows whether Cane Corso is the strongest visual class among comparison classes.",
  },
  {
    signal: "Reference similarity",
    role: "Image embedding signal",
    tentativeWeight: "30%",
    userFacingMeaning:
      "Compares the image with a curated reference set of permitted Cane Corso examples.",
  },
  {
    signal: "Breed geometry closeness",
    role: "Explainable proportion signal",
    tentativeWeight: "25%",
    userFacingMeaning:
      "Uses body/head proportions and reference geometry to explain the visible comparison.",
  },
  {
    signal: "Photo confidence penalty",
    role: "Reliability adjustment",
    tentativeWeight: "10% / penalty",
    userFacingMeaning:
      "Limited photos reduce confidence even when the visual class score is high.",
  },
];

export const visualBreedArtifacts: VisualBreedArtifact[] = [
  {
    label: "Notebook",
    path: "notebooks/08_visual_breed_classifier.ipynb",
    purpose:
      "Training-plan notebook for Cane Corso vs similar breed visual classification.",
  },
  {
    label: "Training starter script",
    path: "scripts/ml/train_visual_breed_classifier.py",
    purpose:
      "Audits class labels and writes a visual breed classifier readiness report without requiring image libraries yet.",
  },
  {
    label: "Class map",
    path: "data/images/labels/breed-classifier-class-map.json",
    purpose:
      "Defines the visual classes used by the future breed classifier.",
  },
  {
    label: "Training report",
    path: "reports/vision/visual-breed-classifier-plan.json",
    purpose:
      "Documents dataset status, class coverage, safety boundary and next training requirements.",
  },
];

export const visualBreedClassifierPrinciples = [
  "The breed classifier runs only after photo readiness checks.",
  "The model compares Cane Corso visual type against similar breeds, not against random unrelated images only.",
  "The app must present the result as visual similarity, not proof of breed purity or pedigree.",
  "Hard negatives such as Presa Canario, Boerboel, Rottweiler and American Bully are essential for meaningful learning.",
  "Geometry and image similarity should explain the result instead of showing only a percentage.",
];

export function getVisualBreedGroupLabel(group: VisualBreedClassGroup) {
  const labels: Record<VisualBreedClassGroup, string> = {
    target: "Target",
    similar_breed: "Similar breed",
    negative: "Negative",
    quality_gate: "Quality gate",
  };

  return labels[group];
}
