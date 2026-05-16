export type DemoImageGroupKey =
  | "reference_cane_corso"
  | "similar_molosser_breeds"
  | "unsuitable_photos";

export type DemoImageGroup = {
  key: DemoImageGroupKey;
  title: string;
  purpose: string;
  targetCount: number;
  minimumCount: number;
  acceptedViewTypes: string[];
  qualityRules: string[];
};

export type DemoImageSetGate = {
  title: string;
  description: string;
  required: boolean;
};

export const demoImageSetGroups: DemoImageGroup[] = [
  {
    key: "reference_cane_corso",
    title: "Cane Corso reference examples",
    purpose:
      "A small, manually reviewed set of licensed Cane Corso photos used only for demo comparison, visual similarity explanation and UI testing.",
    minimumCount: 12,
    targetCount: 30,
    acceptedViewTypes: ["side_body", "front_body", "head_profile", "head_front"],
    qualityRules: [
      "The dog must be clearly visible.",
      "The source and license must be recorded.",
      "The photo must be manually labeled before use.",
      "No photo should be used as proof of breed purity.",
    ],
  },
  {
    key: "similar_molosser_breeds",
    title: "Similar molosser breed examples",
    purpose:
      "A hard-negative demo set that helps explain why the future classifier must learn Cane Corso against visually similar breeds, not against random unrelated images.",
    minimumCount: 12,
    targetCount: 30,
    acceptedViewTypes: ["side_body", "front_body", "head_profile", "head_front"],
    qualityRules: [
      "Include similar breeds such as Presa Canario, Boerboel, Rottweiler, Mastiff type and American Bully when licensing allows.",
      "Keep labels honest; do not relabel uncertain images as a known breed.",
      "Prefer clear standing photos for body comparison and clear head photos for head comparison.",
    ],
  },
  {
    key: "unsuitable_photos",
    title: "Unsuitable photo examples",
    purpose:
      "A negative demo set for the photo readiness gate: sitting dogs, cut-off bodies, bad angles, low light, motion blur and photos that should not produce a visual match score.",
    minimumCount: 12,
    targetCount: 30,
    acceptedViewTypes: ["unsuitable", "bad_angle", "body_cut_off", "low_light"],
    qualityRules: [
      "The photo must demonstrate a clear reason for rejection or limited use.",
      "The issue must be recorded in the manifest.",
      "Rejected examples should block the visual match score in the app flow.",
    ],
  },
];

export const demoImageSetGates: DemoImageSetGate[] = [
  {
    title: "License recorded",
    description:
      "Every image must have a source, license status and permission note before it can enter the demo set.",
    required: true,
  },
  {
    title: "Manual label review",
    description:
      "Breed label, view type, photo quality and comparison readiness must be checked by a human before model experiments.",
    required: true,
  },
  {
    title: "No raw bulk dataset in Git",
    description:
      "The repository stores manifests and small plans. Raw image folders should stay local or external unless images are explicitly licensed for inclusion.",
    required: true,
  },
  {
    title: "Visual similarity language",
    description:
      "The demo must report visual match or visual similarity, not breed purity, pedigree proof or official registration status.",
    required: true,
  },
];

export const demoImageManifestColumns = [
  "image_id",
  "relative_path",
  "source_name",
  "source_url_or_note",
  "license_status",
  "permission_status",
  "breed_label",
  "visual_group",
  "view_type",
  "photo_quality",
  "comparison_readiness",
  "issues",
  "split",
  "usable_for_demo",
  "review_notes",
] as const;

export const demoImageSetPlan = {
  name: "Small Curated Demo Image Set",
  version: "0.1",
  status: "planned_manifest_only",
  purpose:
    "Prepare a small, licensed and manually labeled image set for demonstrating the future visual Cane Corso match pipeline without committing unverified raw photos.",
  groups: demoImageSetGroups,
  gates: demoImageSetGates,
  manifestColumns: demoImageManifestColumns,
  recommendedFirstMilestone:
    "Collect 12 accepted Cane Corso examples, 12 similar-breed hard negatives and 12 unsuitable photos with complete manifest rows before any demo visual classifier is treated as ready.",
};
