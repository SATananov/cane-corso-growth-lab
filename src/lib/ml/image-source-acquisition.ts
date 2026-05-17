export type ImageSourcePriority =
  | "primary_candidate"
  | "secondary_candidate"
  | "candidate_for_baseline"
  | "best_long_term_source";

export type ImageSourceStatus =
  | "candidate_requires_license_review"
  | "recommended_future_collection";

export type ImageCandidateSource = {
  id: string;
  name: string;
  url: string;
  type: "research_dataset" | "community_dataset" | "curated_private_dataset";
  priority: ImageSourcePriority;
  knownContent: string;
  bestUse: string[];
  licenseAction: string;
  repoPolicy: string;
  status: ImageSourceStatus;
};

export type ImageTargetClass = {
  label: string;
  purpose: string;
  minimumPrototypeImages: number;
  recommendedImages: number;
};

export const visualImageCandidateSources: ImageCandidateSource[] = [
  {
    id: "tsinghua-dogs-dataset",
    name: "Tsinghua Dogs Dataset",
    url: "https://link.springer.com/article/10.1007/s41095-020-0184-6",
    type: "research_dataset",
    priority: "primary_candidate",
    knownContent:
      "130 dog breeds, 70,428 real-world images, one dog per image, whole-body and head bounding-box annotations described by the paper.",
    bestUse: ["breed/type classifier", "head/body crop experiments", "reference training evidence"],
    licenseAction:
      "Review the dataset access terms before download and keep raw images out of the Git repository.",
    repoPolicy:
      "Do not commit raw images. Commit only labels, manifests, source notes and small synthetic/demo placeholders when allowed.",
    status: "candidate_requires_license_review",
  },
  {
    id: "stanford-dogs",
    name: "Stanford Dogs Dataset",
    url: "https://www.tensorflow.org/datasets/catalog/stanford_dogs",
    type: "research_dataset",
    priority: "secondary_candidate",
    knownContent:
      "120 dog breeds and 20,580 images; TensorFlow Datasets describes 12,000 train and 8,580 test images with class labels and bounding boxes for training images.",
    bestUse: ["negative/similar dog breed pretraining", "general dog breed classifier baseline", "bbox-based training workflow"],
    licenseAction:
      "Review original Stanford/ImageNet usage terms. Use as a research/educational baseline only if permitted.",
    repoPolicy: "Do not commit raw images. Use external data path or local ignored folder.",
    status: "candidate_requires_license_review",
  },
  {
    id: "kaggle-dog-breeds-image-dataset",
    name: "Kaggle Dog Breeds Image Dataset",
    url: "https://www.kaggle.com/datasets/darshanthakare/dog-breeds-image-dataset",
    type: "community_dataset",
    priority: "candidate_for_baseline",
    knownContent:
      "The data card describes 17,000+ dog breed images curated from Dog CEO API and organized by breed folders.",
    bestUse: ["baseline image classification", "quick prototype", "non-production comparison tests"],
    licenseAction:
      "Review and verify Kaggle dataset license and original Dog CEO API usage notes before use.",
    repoPolicy:
      "Do not commit raw downloaded dataset. Keep only a manifest of selected files and labels.",
    status: "candidate_requires_license_review",
  },
  {
    id: "manual-owned-or-consented-photos",
    name: "Owned / consented Cane Corso photos",
    url: "local_or_owner_submitted",
    type: "curated_private_dataset",
    priority: "best_long_term_source",
    knownContent:
      "Photos taken by the owner or submitted with permission, labeled using the project photo guide.",
    bestUse: ["visual review validation", "photo quality gate labels", "future USG-specific data"],
    licenseAction:
      "Use only photos with explicit permission for project/training/demo use.",
    repoPolicy:
      "Prefer keeping original photos outside Git. Commit only anonymized labels and derived metadata unless permission allows demo assets.",
    status: "recommended_future_collection",
  },
];

export const visualImageTargetClasses: ImageTargetClass[] = [
  { label: "cane_corso", purpose: "positive visual class", minimumPrototypeImages: 80, recommendedImages: 500 },
  { label: "presa_canario", purpose: "similar molosser comparison class", minimumPrototypeImages: 40, recommendedImages: 300 },
  { label: "boerboel", purpose: "similar large molosser comparison class", minimumPrototypeImages: 40, recommendedImages: 300 },
  { label: "rottweiler", purpose: "visually adjacent working breed comparison", minimumPrototypeImages: 40, recommendedImages: 300 },
  { label: "american_bully", purpose: "similar broad-head comparison class", minimumPrototypeImages: 40, recommendedImages: 300 },
  { label: "mixed_large_dog", purpose: "non-standard/mixed large dog comparison class", minimumPrototypeImages: 40, recommendedImages: 300 },
  { label: "not_suitable_photo", purpose: "photo gate rejection training", minimumPrototypeImages: 100, recommendedImages: 500 },
];

export const visualImageSourceReviewChecklist = [
  "Confirm image license and permitted usage before download.",
  "Record source_id and source_url in the manifest.",
  "Separate train/validation/test by image identity and, when possible, by dog identity to avoid leakage.",
  "Filter duplicates and near-duplicates before training.",
  "Reject AI-generated, watermarked, heavily edited or unclear images for training unless explicitly labeled as not_suitable_photo.",
  "Label view_type, photo_quality, comparison_readiness and quality_issues before model training.",
  "Keep raw images out of Git; use local data folders or external storage.",
];

export const visualImageAcquisitionWorkflow = [
  "Review source license and access terms.",
  "Select Cane Corso and similar-breed candidate images.",
  "Filter obvious duplicates, AI-generated images, watermarks and low-resolution samples.",
  "Label breed class, view type, quality, readiness and visible issues.",
  "Split data into train, validation and test without leaking the same dog across splits when possible.",
  "Train the photo readiness model first, then breed/type classification, then similarity experiments.",
];
