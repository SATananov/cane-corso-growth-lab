export type ImageDatasetSplit = "train" | "validation" | "test";
export type ImageBreedLabel =
  | "cane_corso"
  | "presa_canario"
  | "boerboel"
  | "rottweiler"
  | "american_bully"
  | "mixed_large_dog"
  | "not_suitable_photo";
export type ImageViewType =
  | "side_body"
  | "front_body"
  | "head_profile"
  | "head_front"
  | "unsuitable";
export type PhotoQualityLabel = "good" | "limited" | "low";
export type ComparisonReadinessLabel = "accepted" | "limited" | "rejected";

export type ImageDatasetClassGroup = {
  label: ImageBreedLabel;
  title: string;
  purpose: string;
  targetShare: string;
  examplesNeeded: string;
};

export type ImageLabelField = {
  field: string;
  required: boolean;
  type: string;
  purpose: string;
};

export type ImageLabelSample = {
  image_id: string;
  file_path: string;
  split: ImageDatasetSplit;
  breed_label: ImageBreedLabel;
  view_type: ImageViewType;
  photo_quality: PhotoQualityLabel;
  comparison_readiness: ComparisonReadinessLabel;
  issues: string[];
  source_type: string;
  notes: string;
};

export const imageDatasetClassGroups: ImageDatasetClassGroup[] = [
  {
    label: "cane_corso",
    title: "Cane Corso reference examples",
    purpose:
      "Positive class for learning the Cane Corso visual type from correctly licensed or owner-provided photos.",
    targetShare: "35–45%",
    examplesNeeded: "side body, front body, head profile and head front views",
  },
  {
    label: "presa_canario",
    title: "Presa Canario comparison class",
    purpose:
      "Similar molosser class that helps the model avoid learning only easy differences.",
    targetShare: "8–12%",
    examplesNeeded: "mainly side body and head profile views",
  },
  {
    label: "boerboel",
    title: "Boerboel comparison class",
    purpose:
      "Large working molosser comparison class for visual separation from Cane Corso.",
    targetShare: "8–12%",
    examplesNeeded: "body and head examples with varied coat colors",
  },
  {
    label: "rottweiler",
    title: "Rottweiler comparison class",
    purpose:
      "Common strong working breed that improves breed-level classification robustness.",
    targetShare: "8–12%",
    examplesNeeded: "clear full body and front/head views",
  },
  {
    label: "american_bully",
    title: "American Bully comparison class",
    purpose:
      "Shorter, heavier bully-type comparison class for avoiding false positives.",
    targetShare: "8–12%",
    examplesNeeded: "body format and head structure examples",
  },
  {
    label: "mixed_large_dog",
    title: "Other large or mixed dogs",
    purpose:
      "General negative class for large dogs that are not clearly one of the selected comparison breeds.",
    targetShare: "8–12%",
    examplesNeeded: "diverse body types, lighting and angles",
  },
  {
    label: "not_suitable_photo",
    title: "Not suitable for comparison",
    purpose:
      "Quality-gate class: bad angle, hidden body, low light, sitting dog, cropped photo or wrong subject.",
    targetShare: "10–15%",
    examplesNeeded: "bad-angle and cropped examples across dog types",
  },
];

export const datasetSplitPlan = [
  {
    split: "train" as const,
    target: "70%",
    purpose: "Used to fit the visual classifier and future neural image models.",
  },
  {
    split: "validation" as const,
    target: "15%",
    purpose: "Used while tuning thresholds, readiness states and model settings.",
  },
  {
    split: "test" as const,
    target: "15%",
    purpose: "Held out for final evaluation and project reporting.",
  },
];

export const imageLabelSchema: ImageLabelField[] = [
  {
    field: "image_id",
    required: true,
    type: "string",
    purpose: "Stable identifier for the image record.",
  },
  {
    field: "file_path",
    required: true,
    type: "string",
    purpose: "Relative path inside data/images/.",
  },
  {
    field: "split",
    required: true,
    type: "train | validation | test",
    purpose: "Prevents train/test leakage and keeps evaluation honest.",
  },
  {
    field: "breed_label",
    required: true,
    type: "class label",
    purpose: "Main supervised label for breed/type classification.",
  },
  {
    field: "view_type",
    required: true,
    type: "side_body | front_body | head_profile | head_front | unsuitable",
    purpose: "Tells the model what kind of comparison is allowed.",
  },
  {
    field: "photo_quality",
    required: true,
    type: "good | limited | low",
    purpose: "Supports the photo quality gate before visual comparison.",
  },
  {
    field: "comparison_readiness",
    required: true,
    type: "accepted | limited | rejected",
    purpose: "Determines whether the photo can be used for reference comparison.",
  },
  {
    field: "issues",
    required: false,
    type: "semicolon-separated issue codes",
    purpose: "Explains why a photo is limited or rejected.",
  },
  {
    field: "source_type",
    required: true,
    type: "owner_uploaded | licensed_reference | demo_placeholder | rejected_example",
    purpose: "Keeps image origin clear and avoids unknown licensing.",
  },
  {
    field: "notes",
    required: false,
    type: "string",
    purpose: "Human review notes for dataset curation.",
  },
];

export const qualityIssueCatalog = [
  "dog_not_fully_visible",
  "camera_too_high",
  "camera_too_low",
  "bad_side_angle",
  "dog_sitting_or_lying",
  "dog_in_motion",
  "low_light",
  "blurred_image",
  "body_part_hidden",
  "wrong_subject",
  "multiple_dogs",
  "heavy_perspective_distortion",
];

export const sampleImageLabels: ImageLabelSample[] = [
  {
    image_id: "cc_side_001",
    file_path: "train/cane_corso/cc_side_001.jpg",
    split: "train",
    breed_label: "cane_corso",
    view_type: "side_body",
    photo_quality: "good",
    comparison_readiness: "accepted",
    issues: [],
    source_type: "licensed_reference",
    notes: "Full body visible, natural standing pose, camera near shoulder height.",
  },
  {
    image_id: "cc_head_001",
    file_path: "train/cane_corso/cc_head_001.jpg",
    split: "train",
    breed_label: "cane_corso",
    view_type: "head_profile",
    photo_quality: "good",
    comparison_readiness: "accepted",
    issues: [],
    source_type: "licensed_reference",
    notes: "Head profile suitable for muzzle/skull proportion review.",
  },
  {
    image_id: "presa_side_001",
    file_path: "train/presa_canario/presa_side_001.jpg",
    split: "train",
    breed_label: "presa_canario",
    view_type: "side_body",
    photo_quality: "good",
    comparison_readiness: "accepted",
    issues: [],
    source_type: "licensed_reference",
    notes: "Similar molosser negative class.",
  },
  {
    image_id: "bad_001",
    file_path: "train/not_suitable_photo/bad_001.jpg",
    split: "train",
    breed_label: "not_suitable_photo",
    view_type: "unsuitable",
    photo_quality: "low",
    comparison_readiness: "rejected",
    issues: ["dog_not_fully_visible", "camera_too_high"],
    source_type: "rejected_example",
    notes: "Used to teach the photo gate what must be rejected.",
  },
];

export const visualDatasetWorkflow = [
  "Collect only owner-provided, licensed or clearly permitted images.",
  "Separate Cane Corso examples from similar molosser comparison breeds.",
  "Label every image with breed/type, view type, quality and readiness.",
  "Keep rejected examples because the model must learn which photos are not valid for comparison.",
  "Split images into train, validation and test before training to avoid leakage.",
  "Train first a photo readiness classifier, then a breed/type classifier, and only after that a similarity or geometry comparison model.",
];
