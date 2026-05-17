export type VisionDatasetReadinessStatus =
  | "not_ready"
  | "collection_needed"
  | "labeling_needed"
  | "ready_for_dry_run"
  | "ready_for_training";

export type VisionReadinessPhase = {
  id: string;
  title: string;
  status: VisionDatasetReadinessStatus;
  goal: string;
  currentEvidence: string;
  nextAction: string;
};

export type VisionTrainingGate = {
  id: string;
  label: string;
  requiredBeforeTraining: boolean;
  explanation: string;
};

export type VisionDatasetReadinessSummary = {
  projectLabel: string;
  currentStatus: VisionDatasetReadinessStatus;
  labeledRowsInSample: number;
  imageFilesRequiredForPrototype: number;
  recommendedImageFiles: number;
  trainingAllowedNow: boolean;
  reason: string;
  phases: VisionReadinessPhase[];
  gates: VisionTrainingGate[];
};

export const visionDatasetReadinessSummary: VisionDatasetReadinessSummary = {
  projectLabel: "Cane Corso Visual ML Dataset Readiness",
  currentStatus: "collection_needed",
  labeledRowsInSample: 4,
  imageFilesRequiredForPrototype: 710,
  recommendedImageFiles: 3600,
  trainingAllowedNow: false,
  reason:
    "The repository contains the folder structure, class map and sample labels, but it does not contain a real licensed image dataset yet. The neural model must not be trained until curated images and labels are available.",
  phases: [
    {
      id: "source_review",
      title: "Source and license review",
      status: "ready_for_dry_run",
      goal: "Identify candidate datasets and confirm whether their images can be used for the project.",
      currentEvidence:
        "Source catalog and acquisition notes are present. Raw images are intentionally not committed.",
      nextAction:
        "Select one approved source and document license/usage notes before importing images locally.",
    },
    {
      id: "image_collection",
      title: "Image collection",
      status: "collection_needed",
      goal: "Collect Cane Corso, similar-breed and unsuitable-photo examples across train/validation/test splits.",
      currentEvidence:
        "Only folder placeholders and sample label rows are present. No real training images are included in Git.",
      nextAction:
        "Populate data/images/external locally, then prepare train/validation/test folders from approved images.",
    },
    {
      id: "labeling",
      title: "Labeling and photo gate annotation",
      status: "labeling_needed",
      goal: "Label breed class, view type, quality, readiness and visible photo issues for each image.",
      currentEvidence:
        "A schema, CSV template and JSONL annotation template are present.",
      nextAction:
        "Annotate real images with breed_label, view_type, photo_quality, comparison_readiness and issues.",
    },
    {
      id: "photo_readiness_training",
      title: "Photo readiness model",
      status: "not_ready",
      goal: "Train the first neural model to accept, limit or reject uploaded photos before comparison.",
      currentEvidence:
        "The expected output is defined, but there are not enough accepted/limited/rejected image examples yet.",
      nextAction:
        "Collect deliberately bad examples: cropped bodies, wrong angle, low light, sitting dogs and motion blur.",
    },
    {
      id: "breed_classifier_training",
      title: "Breed visual classifier",
      status: "not_ready",
      goal: "Train a classifier to separate Cane Corso visual type from similar molosser and large-dog classes.",
      currentEvidence:
        "The class map is ready, but the image dataset is not large or balanced enough for training.",
      nextAction:
        "Collect balanced examples for Cane Corso, Presa Canario, Boerboel, Rottweiler, American Bully, mixed large dog and not suitable photos.",
    },
  ],
  gates: [
    {
      id: "licensed_or_owned_images",
      label: "Images are licensed, owned or explicitly permitted",
      requiredBeforeTraining: true,
      explanation:
        "The project should not train on random scraped images without permission or clear dataset terms.",
    },
    {
      id: "balanced_classes",
      label: "Classes are balanced enough for learning",
      requiredBeforeTraining: true,
      explanation:
        "Cane Corso examples must be compared against similar breeds, not only unrelated negative images.",
    },
    {
      id: "quality_labels",
      label: "Photo quality and readiness labels exist",
      requiredBeforeTraining: true,
      explanation:
        "The model must first learn which photos are valid for comparison before it predicts visual match.",
    },
    {
      id: "holdout_test_split",
      label: "Validation and test splits are separated",
      requiredBeforeTraining: true,
      explanation:
        "The app must be evaluated on unseen images to avoid memorizing the training set.",
    },
    {
      id: "safe_output_language",
      label: "Output language says visual match, not breed purity",
      requiredBeforeTraining: true,
      explanation:
        "A photo can support visual similarity, but it cannot prove pedigree, registration or genetic origin.",
    },
  ],
};

export function getVisionReadinessStatusLabel(
  status: VisionDatasetReadinessStatus,
) {
  const labels: Record<VisionDatasetReadinessStatus, string> = {
    not_ready: "Not ready",
    collection_needed: "Collection needed",
    labeling_needed: "Labeling needed",
    ready_for_dry_run: "Ready for dry run",
    ready_for_training: "Ready for training",
  };

  return labels[status];
}
