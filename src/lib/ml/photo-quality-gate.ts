import type { PhotoReadinessLevel } from "@/lib/ml/photo-comparison-criteria";

export type PhotoGateIssueId =
  | "full_body_not_visible"
  | "wrong_view_angle"
  | "dog_not_standing"
  | "camera_too_high_or_low"
  | "poor_light_or_blur"
  | "body_part_hidden"
  | "strong_perspective_distortion";

export type PhotoGateIssue = {
  id: PhotoGateIssueId;
  label: string;
  modelSignal: string;
  weight: number;
  blocksReliableComparison: boolean;
  recommendedFix: string;
};

export type PhotoGateResult = {
  level: PhotoReadinessLevel;
  score: number;
  comparisonAllowed: boolean;
  shouldBlockMatchScore: boolean;
  title: string;
  summary: string;
  requiredAction: string;
  selectedIssues: PhotoGateIssue[];
};

export const photoQualityGateIssues: PhotoGateIssue[] = [
  {
    id: "full_body_not_visible",
    label: "Full dog is not visible",
    modelSignal: "The image does not show all required body landmarks.",
    weight: 34,
    blocksReliableComparison: true,
    recommendedFix: "Upload a full side-body photo where nose, back, chest, legs and paws are visible.",
  },
  {
    id: "wrong_view_angle",
    label: "Wrong view angle",
    modelSignal: "The image does not match the requested side, front or head-profile view.",
    weight: 30,
    blocksReliableComparison: true,
    recommendedFix: "Retake the image from the selected angle. For body review, use a clean side view first.",
  },
  {
    id: "dog_not_standing",
    label: "Dog is not standing naturally",
    modelSignal: "Sitting, jumping, turning or running makes body geometry unreliable.",
    weight: 26,
    blocksReliableComparison: true,
    recommendedFix: "Photograph the dog standing calmly on a flat surface.",
  },
  {
    id: "camera_too_high_or_low",
    label: "Camera height is not suitable",
    modelSignal: "The perspective may stretch or compress the silhouette.",
    weight: 18,
    blocksReliableComparison: false,
    recommendedFix: "Keep the camera near shoulder or chest height, not far above or below the dog.",
  },
  {
    id: "poor_light_or_blur",
    label: "Poor light or blur",
    modelSignal: "The outline and important proportions are difficult to read.",
    weight: 20,
    blocksReliableComparison: false,
    recommendedFix: "Use brighter light and a sharp image where the body outline is clear.",
  },
  {
    id: "body_part_hidden",
    label: "Important body part is hidden",
    modelSignal: "A required landmark is obstructed by objects, people, shadows or cropping.",
    weight: 24,
    blocksReliableComparison: true,
    recommendedFix: "Retake the photo with the dog unobstructed and fully visible.",
  },
  {
    id: "strong_perspective_distortion",
    label: "Strong perspective distortion",
    modelSignal: "The lens or angle changes the visible geometry too much.",
    weight: 22,
    blocksReliableComparison: false,
    recommendedFix: "Step back slightly and use a more natural camera distance without extreme wide-angle distortion.",
  },
];

export const photoQualityGateBands = [
  {
    level: "accepted" as const,
    scoreRange: "80–100",
    meaning: "Photo is suitable for a visual geometry comparison.",
  },
  {
    level: "limited" as const,
    scoreRange: "55–79",
    meaning: "Photo can be reviewed, but the result must carry a reliability warning.",
  },
  {
    level: "rejected" as const,
    scoreRange: "0–54",
    meaning: "Photo is not suitable. The visual match score should be blocked.",
  },
];

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function levelFromScore(score: number): PhotoReadinessLevel {
  if (score >= 80) return "accepted";
  if (score >= 55) return "limited";
  return "rejected";
}

export function evaluatePhotoQualityGate(
  issueIds: PhotoGateIssueId[],
  hasPhoto: boolean,
): PhotoGateResult {
  const selectedIssues = photoQualityGateIssues.filter((issue) =>
    issueIds.includes(issue.id),
  );

  if (!hasPhoto) {
    return {
      level: "rejected",
      score: 0,
      comparisonAllowed: false,
      shouldBlockMatchScore: true,
      title: "No photo uploaded",
      summary: "Upload a photo before the comparison-readiness gate can run.",
      requiredAction: "Upload a clear Cane Corso photo following the guide.",
      selectedIssues: [],
    };
  }

  const scorePenalty = selectedIssues.reduce((sum, issue) => sum + issue.weight, 0);
  const hasBlockingIssue = selectedIssues.some(
    (issue) => issue.blocksReliableComparison,
  );
  const rawScore = clampScore(100 - scorePenalty);
  const score = hasBlockingIssue ? Math.min(rawScore, 54) : rawScore;
  const level = levelFromScore(score);

  if (level === "accepted") {
    return {
      level,
      score,
      comparisonAllowed: true,
      shouldBlockMatchScore: false,
      title: "Photo accepted for visual comparison",
      summary:
        "The image follows the core criteria closely enough to continue toward geometry extraction and reference comparison.",
      requiredAction: "Continue to geometry review when the visual model is available.",
      selectedIssues,
    };
  }

  if (level === "limited") {
    return {
      level,
      score,
      comparisonAllowed: true,
      shouldBlockMatchScore: false,
      title: "Photo can be reviewed with a warning",
      summary:
        "The image has quality or perspective limitations. Any future match score must be shown as lower-confidence.",
      requiredAction:
        "A new photo is recommended, but limited comparison may be allowed with a visible warning.",
      selectedIssues,
    };
  }

  return {
    level,
    score,
    comparisonAllowed: false,
    shouldBlockMatchScore: true,
    title: "Photo rejected for reliable comparison",
    summary:
      "The image does not meet the criteria required for a fair Cane Corso reference comparison.",
    requiredAction:
      "Upload a new photo: full dog, correct angle, natural standing position, clear light and minimal perspective distortion.",
    selectedIssues,
  };
}
