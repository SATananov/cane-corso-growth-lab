export type VisualSimilarityStageStatus =
  | "not_started"
  | "dataset_required"
  | "prototype_ready"
  | "future_training";

export type VisualSimilarityStage = {
  id: string;
  title: string;
  purpose: string;
  input: string;
  output: string;
  status: VisualSimilarityStageStatus;
};

export type VisualSimilaritySignal = {
  id: string;
  label: string;
  role: string;
  formula: string;
  userMeaning: string;
  readiness: "ready_as_formula" | "needs_reference_images" | "needs_trained_model";
};

export type VisualSimilarityArtifact = {
  label: string;
  path: string;
  purpose: string;
};

export type VisualSimilarityModelCandidate = {
  name: string;
  useCase: string;
  whyUseful: string;
  risk: string;
};

export const visualSimilarityStages: VisualSimilarityStage[] = [
  {
    id: "reference_set",
    title: "1. Build a permitted reference set",
    purpose:
      "Collect curated Cane Corso reference images with clear permission, view type and readiness labels.",
    input:
      "Accepted side-body, front-body, head-profile and head-front images with source/license metadata.",
    output:
      "Reference image groups and future embedding centroids for each view type.",
    status: "dataset_required",
  },
  {
    id: "embedding_extraction",
    title: "2. Extract visual embeddings",
    purpose:
      "Convert each image into a numeric vector so that visual similarity can be measured consistently.",
    input: "Reference images and uploaded user image after the photo quality gate.",
    output: "Image embedding vectors for reference and user images.",
    status: "future_training",
  },
  {
    id: "similarity_score",
    title: "3. Compare user photo to reference geometry and images",
    purpose:
      "Calculate how close the uploaded image is to the Cane Corso reference image set, while keeping geometry as an explainable layer.",
    input:
      "User embedding, reference centroid, breed classifier probabilities and geometry features.",
    output:
      "Visual Cane Corso Match signal with confidence and explanation.",
    status: "prototype_ready",
  },
  {
    id: "safe_app_export",
    title: "4. Export safe app evidence",
    purpose:
      "Expose the result as visual similarity evidence, never as proof of pedigree, breed purity or official status.",
    input: "Evaluated model outputs, metrics and safety copy.",
    output: "App-safe Visual Cane Corso Match report.",
    status: "prototype_ready",
  },
];

export const visualSimilaritySignals: VisualSimilaritySignal[] = [
  {
    id: "photo_readiness_gate",
    label: "Photo readiness gate",
    role: "Blocks invalid comparison",
    formula: "if readiness = rejected → no visual match score",
    userMeaning:
      "The app must first decide whether the photo is suitable before showing a comparison score.",
    readiness: "ready_as_formula",
  },
  {
    id: "embedding_similarity",
    label: "Embedding similarity",
    role: "Neural visual closeness",
    formula: "similarity = cosine(user_embedding, reference_centroid)",
    userMeaning:
      "Measures how close the uploaded image is to permitted Cane Corso reference images in feature space.",
    readiness: "needs_reference_images",
  },
  {
    id: "breed_classifier_probability",
    label: "Breed classifier probability",
    role: "Cane Corso vs similar breeds",
    formula: "classifier_signal = P(cane_corso | image)",
    userMeaning:
      "Shows whether Cane Corso is the strongest visual class among similar comparison breeds.",
    readiness: "needs_trained_model",
  },
  {
    id: "geometry_closeness",
    label: "Geometry closeness",
    role: "Explainable standard comparison",
    formula: "geometry_score = 1 - normalized_ratio_error",
    userMeaning:
      "Compares visible body/head proportions with the Cane Corso reference geometry layer.",
    readiness: "ready_as_formula",
  },
  {
    id: "confidence_adjustment",
    label: "Confidence adjustment",
    role: "Reliability guardrail",
    formula: "confidence = base_confidence × photo_quality_weight",
    userMeaning:
      "Limited photos reduce confidence even when classifier or similarity values are high.",
    readiness: "ready_as_formula",
  },
];

export const visualSimilarityFormula = {
  title: "Visual Cane Corso Match prototype formula",
  readable:
    "Final visual match = gated blend of photo readiness, image similarity, breed classifier signal and geometry closeness.",
  expression:
    "match = gate(readiness) × (0.35 × classifier + 0.30 × embedding_similarity + 0.25 × geometry + 0.10 × confidence_adjustment)",
  safety:
    "The output is a visual similarity signal only. It does not prove pedigree, breed purity, genetic origin or official Cane Corso status.",
};

export const visualSimilarityModelCandidates: VisualSimilarityModelCandidate[] = [
  {
    name: "MobileNet / EfficientNet transfer learning",
    useCase: "Lightweight image embeddings and breed classification.",
    whyUseful:
      "Good candidate for a small app-oriented prototype because it can reuse pretrained visual features.",
    risk:
      "Needs a carefully labelled dataset and class balance; otherwise it may learn background or pose bias.",
  },
  {
    name: "ResNet-style feature extractor",
    useCase: "Stronger baseline for image embeddings and visual class separation.",
    whyUseful:
      "Useful for comparing Cane Corso images with similar molosser breeds in feature space.",
    risk:
      "Can be heavier for deployment and still requires curated reference images.",
  },
  {
    name: "Manual geometry + neural embeddings fusion",
    useCase: "Final app-safe score that combines explainable ratios with learned visual similarity.",
    whyUseful:
      "Prevents the app from becoming a black-box percentage by showing both geometry and model signals.",
    risk:
      "Needs clear wording because the score is still visual similarity, not proof of origin.",
  },
];

export const visualSimilarityArtifacts: VisualSimilarityArtifact[] = [
  {
    label: "Notebook",
    path: "notebooks/09_visual_similarity_embedding_prototype.ipynb",
    purpose:
      "Plans the future image embedding workflow: reference set, user photo, cosine similarity and safe scoring.",
  },
  {
    label: "Prototype script",
    path: "scripts/ml/run_visual_similarity_prototype.py",
    purpose:
      "Validates the plan and demonstrates the similarity formula without requiring real images yet.",
  },
  {
    label: "Vision report",
    path: "reports/vision/visual-similarity-embedding-plan.json",
    purpose:
      "Machine-readable plan for visual similarity signals, formulas and required dataset conditions.",
  },
];

export function getVisualSimilarityStatusLabel(status: VisualSimilarityStageStatus) {
  const labels: Record<VisualSimilarityStageStatus, string> = {
    not_started: "Not started",
    dataset_required: "Dataset required",
    prototype_ready: "Prototype-ready",
    future_training: "Future training",
  };

  return labels[status];
}
