export type VisionModelStage =
  | "photo_readiness"
  | "photo_type"
  | "breed_classifier"
  | "visual_similarity"
  | "geometry_fusion";

export type TrainingReadiness = "planned" | "dataset_needed" | "ready_for_prototype";

export type BreedClassifierClass = {
  id: string;
  label: string;
  group: "target" | "similar_breed" | "negative" | "quality_gate";
  purpose: string;
  minimumImages: number;
  recommendedImages: number;
};

export type VisionTrainingStage = {
  id: VisionModelStage;
  title: string;
  goal: string;
  input: string;
  output: string;
  modelApproach: string;
  trainingNeed: string;
  userFacingResult: string;
  safetyBoundary: string;
};

export type BreedClassifierTrainingPlan = {
  projectLabel: string;
  status: TrainingReadiness;
  summary: string;
  stages: VisionTrainingStage[];
  classes: BreedClassifierClass[];
  minimumDatasetGoal: number;
  recommendedDatasetGoal: number;
  nextNotebook: string;
};

export const breedClassifierClasses: BreedClassifierClass[] = [
  {
    id: "cane_corso",
    label: "Cane Corso",
    group: "target",
    purpose:
      "Positive visual reference class used to learn the Cane Corso visual type.",
    minimumImages: 150,
    recommendedImages: 800,
  },
  {
    id: "presa_canario",
    label: "Presa Canario",
    group: "similar_breed",
    purpose:
      "Similar molosser reference class that helps the model avoid easy false positives.",
    minimumImages: 80,
    recommendedImages: 400,
  },
  {
    id: "boerboel",
    label: "Boerboel",
    group: "similar_breed",
    purpose:
      "Large molosser comparison class for broad head, mass and body-type similarity.",
    minimumImages: 80,
    recommendedImages: 400,
  },
  {
    id: "rottweiler",
    label: "Rottweiler",
    group: "similar_breed",
    purpose:
      "Common large working breed used as a strong negative comparison class.",
    minimumImages: 80,
    recommendedImages: 400,
  },
  {
    id: "american_bully",
    label: "American Bully",
    group: "similar_breed",
    purpose:
      "Visual comparison class for muscular body mass and head-width confusion cases.",
    minimumImages: 80,
    recommendedImages: 400,
  },
  {
    id: "mixed_large_dog",
    label: "Mixed / large dog",
    group: "negative",
    purpose:
      "General negative class to avoid over-confident Cane Corso predictions.",
    minimumImages: 120,
    recommendedImages: 600,
  },
  {
    id: "not_suitable_photo",
    label: "Not suitable photo",
    group: "quality_gate",
    purpose:
      "Images that should be rejected before visual comparison because the angle, pose or visibility is not usable.",
    minimumImages: 120,
    recommendedImages: 600,
  },
];

export const visionTrainingStages: VisionTrainingStage[] = [
  {
    id: "photo_readiness",
    title: "Photo Readiness Model",
    goal: "Learn whether an uploaded image is accepted, limited or rejected for visual comparison.",
    input: "Uploaded dog image + image-level labels for quality, pose, visibility and angle.",
    output: "accepted | limited | rejected plus visible issue reasons.",
    modelApproach:
      "Transfer learning image classifier, later supported by rule-based quality checks.",
    trainingNeed:
      "Good examples and deliberately bad examples: full-body side photos, bad angle photos, cropped bodies, sitting dogs, dark photos and motion blur.",
    userFacingResult:
      "The app either allows the comparison, limits the confidence, or asks for a new photo.",
    safetyBoundary:
      "No breed match score is shown for rejected photos because the visual evidence is not reliable.",
  },
  {
    id: "photo_type",
    title: "Photo Type Classifier",
    goal: "Detect what kind of visual evidence the user uploaded.",
    input: "Uploaded image after initial quality screening.",
    output: "side_body | front_body | head_profile | head_front | unsuitable.",
    modelApproach:
      "Lightweight CNN/transfer learning classifier trained on view-type labels.",
    trainingNeed:
      "Separate labels for side body, front body, head profile, head front and unsuitable images.",
    userFacingResult:
      "A head photo can be used for head review, but it is not used for full-body proportion comparison.",
    safetyBoundary:
      "The app must not compare body geometry from a head-only image.",
  },
  {
    id: "breed_classifier",
    title: "Breed Visual Classifier",
    goal: "Learn whether the image is visually closest to Cane Corso or to similar/non-target classes.",
    input: "Accepted or limited dog image with breed-class label.",
    output: "Class probabilities for Cane Corso and comparison classes.",
    modelApproach:
      "Transfer learning with MobileNet/EfficientNet/ResNet-style backbone; trained on curated image classes.",
    trainingNeed:
      "Cane Corso positives plus similar molosser and large-dog negative classes.",
    userFacingResult:
      "The app reports visual type signals, not breed purity or official status.",
    safetyBoundary:
      "The result is visual similarity, not proof of pedigree, registration or genetic origin.",
  },
  {
    id: "visual_similarity",
    title: "Reference Similarity Model",
    goal: "Compare the uploaded image against a curated Cane Corso reference set.",
    input: "Image embedding from accepted image and embeddings from reference examples.",
    output: "Similarity score and nearest reference group.",
    modelApproach:
      "Embedding-based visual similarity using a pretrained image encoder plus curated reference vectors.",
    trainingNeed:
      "A clean reference gallery of well-labeled Cane Corso examples across body/head views.",
    userFacingResult:
      "The app can show how close the image is to the reference visual set.",
    safetyBoundary:
      "Similarity to images is not the same as official breed verification.",
  },
  {
    id: "geometry_fusion",
    title: "Geometry + Vision Fusion",
    goal: "Combine image model signals with measured or estimated breed-reference geometry.",
    input: "Readiness result, photo type, breed probabilities, similarity score and geometry ratios.",
    output: "Visual Cane Corso Match score with confidence and explanation.",
    modelApproach:
      "Weighted evidence fusion: photo quality × visual class probability × reference similarity × geometry closeness.",
    trainingNeed:
      "A validation set with human-reviewed labels and geometry annotations.",
    userFacingResult:
      "A clear match score with reasons and warnings.",
    safetyBoundary:
      "The app explains the visible evidence and avoids saying that a dog is ‘real’ or ‘pure’ from a photo.",
  },
];

export const breedClassifierTrainingPlan: BreedClassifierTrainingPlan = {
  projectLabel: "Cane Corso Visual ML Training Plan",
  status: "dataset_needed",
  summary:
    "The visual ML system is planned as a staged pipeline: photo readiness first, then view-type detection, then breed visual classification, then reference similarity and geometry-based explanation.",
  stages: visionTrainingStages,
  classes: breedClassifierClasses,
  minimumDatasetGoal: breedClassifierClasses.reduce(
    (total, item) => total + item.minimumImages,
    0,
  ),
  recommendedDatasetGoal: breedClassifierClasses.reduce(
    (total, item) => total + item.recommendedImages,
    0,
  ),
  nextNotebook: "notebooks/05_breed_classifier_training_plan.ipynb",
};

export function getClassGroupLabel(group: BreedClassifierClass["group"]) {
  const labels: Record<BreedClassifierClass["group"], string> = {
    target: "Target class",
    similar_breed: "Similar breed class",
    negative: "Negative comparison class",
    quality_gate: "Photo-quality gate class",
  };

  return labels[group];
}
