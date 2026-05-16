export type VisualReadinessState = "empty" | "accepted" | "limited" | "rejected";

export type OverlayPermission = {
  mode: "waiting" | "allowed" | "limited" | "blocked";
  canCompare: boolean;
  severity: "neutral" | "success" | "warning" | "danger";
  title: string;
  description: string;
};

export type ReferenceRatio = {
  id: string;
  label: string;
  formula: string;
  reference: string;
  acceptedRange: string;
  whyItMatters: string;
};

export type DemoOverlayRatio = ReferenceRatio & {
  userEstimate: string;
  delta: string;
  signal: "close" | "monitor" | "review";
};

export const geometryOverlayStages = [
  {
    id: "photo-gate",
    title: "Photo quality gate",
    purpose:
      "The uploaded image must be suitable before the app displays a visual comparison result.",
  },
  {
    id: "landmark-map",
    title: "Landmark map",
    purpose:
      "Visible body or head points become coordinates that can be compared against reference geometry.",
  },
  {
    id: "ratio-comparison",
    title: "Ratio comparison",
    purpose:
      "Measured proportions are compared with Cane Corso reference ranges instead of a single dog photo.",
  },
  {
    id: "explainable-score",
    title: "Explainable match signal",
    purpose:
      "The final visual signal must show which proportions are close and which need review.",
  },
] as const;

export const referenceGeometryRatios: ReferenceRatio[] = [
  {
    id: "body-length-height",
    label: "Body length / height",
    formula: "body_length / height_at_withers",
    reference: "≈ 1.10–1.11",
    acceptedRange: "1.06–1.16 orientation band",
    whyItMatters:
      "Cane Corso is generally interpreted as slightly longer than tall, so this is the core side-view body ratio.",
  },
  {
    id: "chest-depth-height",
    label: "Chest depth / height",
    formula: "chest_depth / height_at_withers",
    reference: "≈ 0.50",
    acceptedRange: "0.46–0.54 orientation band",
    whyItMatters:
      "A side photo can estimate whether the visible chest depth is close to the reference geometry.",
  },
  {
    id: "head-height",
    label: "Head length / height",
    formula: "head_length / height_at_withers",
    reference: "≈ 0.36",
    acceptedRange: "0.32–0.40 orientation band",
    whyItMatters:
      "This supports head/body proportion review when a good side profile is available.",
  },
  {
    id: "muzzle-skull",
    label: "Muzzle / skull relation",
    formula: "muzzle_length / skull_length",
    reference: "≈ 1 : 2",
    acceptedRange: "0.42–0.58 orientation band",
    whyItMatters:
      "A head profile photo can compare visible muzzle tendency with the reference head geometry.",
  },
];

export const demoOverlayRatios: DemoOverlayRatio[] = [
  {
    id: "body-length-height",
    label: "Body length / height",
    formula: "body_length / height_at_withers",
    reference: "≈ 1.10–1.11",
    acceptedRange: "1.06–1.16 orientation band",
    whyItMatters:
      "Cane Corso is generally interpreted as slightly longer than tall, so this is the core side-view body ratio.",
    userEstimate: "1.14",
    delta: "+3.0% from central reference",
    signal: "close",
  },
  {
    id: "chest-depth-height",
    label: "Chest depth / height",
    formula: "chest_depth / height_at_withers",
    reference: "≈ 0.50",
    acceptedRange: "0.46–0.54 orientation band",
    whyItMatters:
      "A side photo can estimate whether the visible chest depth is close to the reference geometry.",
    userEstimate: "0.48",
    delta: "-4.0% from central reference",
    signal: "close",
  },
  {
    id: "head-height",
    label: "Head length / height",
    formula: "head_length / height_at_withers",
    reference: "≈ 0.36",
    acceptedRange: "0.32–0.40 orientation band",
    whyItMatters:
      "This supports head/body proportion review when a good side profile is available.",
    userEstimate: "0.34",
    delta: "-5.6% from central reference",
    signal: "monitor",
  },
  {
    id: "muzzle-skull",
    label: "Muzzle / skull relation",
    formula: "muzzle_length / skull_length",
    reference: "≈ 1 : 2",
    acceptedRange: "0.42–0.58 orientation band",
    whyItMatters:
      "A head profile photo can compare visible muzzle tendency with the reference head geometry.",
    userEstimate: "0.61",
    delta: "+22.0% from central reference",
    signal: "review",
  },
];

export const overlaySignalLabels: Record<DemoOverlayRatio["signal"], string> = {
  close: "Close",
  monitor: "Monitor",
  review: "Review",
};

export function getGeometryOverlayPermission(
  readiness: VisualReadinessState,
): OverlayPermission {
  if (readiness === "accepted") {
    return {
      mode: "allowed",
      canCompare: true,
      severity: "success",
      title: "Overlay comparison allowed",
      description:
        "The photo is suitable for geometry comparison. The app may show reference lines, user landmarks and ratio differences.",
    };
  }

  if (readiness === "limited") {
    return {
      mode: "limited",
      canCompare: true,
      severity: "warning",
      title: "Limited overlay comparison",
      description:
        "The photo can be used only as an orientation example. The result must be shown with a reliability warning.",
    };
  }

  if (readiness === "rejected") {
    return {
      mode: "blocked",
      canCompare: false,
      severity: "danger",
      title: "Overlay comparison blocked",
      description:
        "This photo does not meet the comparison criteria. The app should ask for a new image instead of showing a visual match score.",
    };
  }

  return {
    mode: "waiting",
    canCompare: false,
    severity: "neutral",
    title: "Upload a photo to begin",
    description:
      "The reference geometry is ready. Upload a side-body, front-body or head photo before the comparison gate can run.",
  };
}

export function getGeometryOverlayWorkflow() {
  return [
    "Show reference geometry first, so the user understands the target proportions.",
    "Preview the uploaded image next to the reference instead of hiding it behind a score.",
    "Block comparison when the photo quality gate rejects the image.",
    "If accepted or limited, draw landmarks and ratio lines over a normalized comparison canvas.",
    "Explain the visual match as similarity to Cane Corso type, not proof of pedigree or breed purity.",
  ];
}
