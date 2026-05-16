export type AcquisitionStatus = "not_started" | "in_review" | "approved" | "blocked";

export type AcquisitionMilestone = {
  id: string;
  title: string;
  description: string;
  status: AcquisitionStatus;
  evidence: string;
};

export type ManifestColumn = {
  name: string;
  purpose: string;
  required: boolean;
};

export type AcquisitionStarterRow = {
  image_id: string;
  source_id: string;
  source_url: string;
  license_status: "pending_review" | "approved" | "blocked";
  permission_status: "not_requested" | "granted" | "denied" | "not_required";
  breed_label: string;
  view_type: string;
  photo_quality: "good" | "limited" | "low";
  comparison_readiness: "accepted" | "limited" | "rejected";
  quality_issues: string;
  split: "candidate" | "train" | "validation" | "test";
  local_path: string;
  notes: string;
};

export const datasetAcquisitionMilestones: AcquisitionMilestone[] = [
  {
    id: "source-review",
    title: "Source and license review",
    description:
      "Every image source must be checked before download or use. Unclear, blocked or unverified images stay out of the model dataset.",
    status: "in_review",
    evidence: "data/images/source-catalog.json + source manifest",
  },
  {
    id: "starter-manifest",
    title: "Starter manifest",
    description:
      "Candidate rows are recorded before raw images are added. This keeps the dataset auditable and prevents unlabeled images from entering training.",
    status: "approved",
    evidence: "data/images/labels/dataset-acquisition-starter-manifest.csv",
  },
  {
    id: "class-balance",
    title: "Class balance planning",
    description:
      "Cane Corso images must be balanced against similar molosser breeds and rejected-photo examples so the model learns useful differences.",
    status: "in_review",
    evidence: "cane_corso + presa_canario + boerboel + rottweiler + american_bully + not_suitable_photo",
  },
  {
    id: "photo-readiness-labels",
    title: "Photo readiness labels",
    description:
      "Each image must carry accepted, limited or rejected readiness labels before the photo-readiness classifier can be trained.",
    status: "in_review",
    evidence: "comparison_readiness + quality_issues columns",
  },
  {
    id: "raw-image-policy",
    title: "Raw image storage policy",
    description:
      "Raw images are kept in local or external storage. The Git repository stores manifests, labels, docs and scripts, not bulk image datasets.",
    status: "approved",
    evidence: ".gitkeep placeholders + manifest policy",
  },
];

export const datasetAcquisitionManifestColumns: ManifestColumn[] = [
  { name: "image_id", purpose: "Stable internal image identifier.", required: true },
  { name: "source_id", purpose: "Reference to the approved source catalog.", required: true },
  { name: "source_url", purpose: "Original page, dataset URL or private source note.", required: true },
  { name: "license_status", purpose: "pending_review, approved or blocked.", required: true },
  { name: "permission_status", purpose: "Whether explicit permission is granted, denied, not requested or not required.", required: true },
  { name: "breed_label", purpose: "Target class such as cane_corso or a similar comparison breed.", required: true },
  { name: "view_type", purpose: "side_body, front_body, head_profile, head_front or unsuitable.", required: true },
  { name: "photo_quality", purpose: "good, limited or low.", required: true },
  { name: "comparison_readiness", purpose: "accepted, limited or rejected gate label.", required: true },
  { name: "quality_issues", purpose: "Pipe-separated issues such as bad_angle or body_cut_off.", required: false },
  { name: "split", purpose: "candidate, train, validation or test.", required: true },
  { name: "local_path", purpose: "Local/external image path; usually not committed to Git.", required: false },
  { name: "notes", purpose: "Reviewer notes for why the image is useful or blocked.", required: false },
];

export const datasetAcquisitionStarterRows: AcquisitionStarterRow[] = [
  {
    image_id: "cc_candidate_001",
    source_id: "manual-owned-or-consented-photos",
    source_url: "local_or_owner_submitted",
    license_status: "pending_review",
    permission_status: "not_requested",
    breed_label: "cane_corso",
    view_type: "side_body",
    photo_quality: "good",
    comparison_readiness: "accepted",
    quality_issues: "",
    split: "candidate",
    local_path: "data/images/external/cane_corso/cc_candidate_001.jpg",
    notes: "Example manifest row; raw image not included in Git.",
  },
  {
    image_id: "pc_candidate_001",
    source_id: "manual-owned-or-consented-photos",
    source_url: "local_or_owner_submitted",
    license_status: "pending_review",
    permission_status: "not_requested",
    breed_label: "presa_canario",
    view_type: "side_body",
    photo_quality: "good",
    comparison_readiness: "accepted",
    quality_issues: "",
    split: "candidate",
    local_path: "data/images/external/presa_canario/pc_candidate_001.jpg",
    notes: "Hard negative example for Cane Corso vs similar molosser comparison.",
  },
  {
    image_id: "bad_candidate_001",
    source_id: "manual-owned-or-consented-photos",
    source_url: "local_or_owner_submitted",
    license_status: "pending_review",
    permission_status: "not_requested",
    breed_label: "not_suitable_photo",
    view_type: "unsuitable",
    photo_quality: "low",
    comparison_readiness: "rejected",
    quality_issues: "body_cut_off|bad_angle|camera_too_high",
    split: "candidate",
    local_path: "data/images/external/not_suitable_photo/bad_candidate_001.jpg",
    notes: "Rejected-photo example for the photo-readiness gate.",
  },
];

export const datasetAcquisitionReviewRules = [
  "Do not add an image to train, validation or test until license_status is approved or permission_status is granted/not_required.",
  "Keep all uncertain rows in the candidate split until source, quality and label review are complete.",
  "Cane Corso positives must be balanced with similar molosser negative classes; otherwise the classifier may learn only superficial dog features.",
  "Rejected photos are useful training data for the photo gate, but they must not be used as positive geometry-comparison examples.",
  "The same dog should not appear in both train and validation/test when identity is known, because that would inflate evaluation metrics.",
];
