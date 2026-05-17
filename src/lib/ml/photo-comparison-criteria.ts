export type VisualPhotoViewType =
  | "side_body"
  | "front_body"
  | "head_profile"
  | "head_front";

export type PhotoReadinessLevel = "accepted" | "limited" | "rejected";

export type PhotoCriterion = {
  id: string;
  title: string;
  description: string;
  requiredFor: VisualPhotoViewType[];
};

export type PhotoViewGuide = {
  viewType: VisualPhotoViewType;
  label: string;
  purpose: string;
  comparisonUse: string;
  mustShow: string[];
  avoid: string[];
};

export type ReadinessRule = {
  level: PhotoReadinessLevel;
  label: string;
  scoreRange: string;
  meaning: string;
  action: string;
};

export const visualPhotoViewGuides: PhotoViewGuide[] = [
  {
    viewType: "side_body",
    label: "Side body",
    purpose: "Primary image for body geometry and full silhouette comparison.",
    comparisonUse:
      "Used for height, body length, chest depth, stance and rectangular-format review.",
    mustShow: [
      "Full dog visible from nose to tail base and paws",
      "Dog standing naturally on a flat surface",
      "Camera close to shoulder/chest height",
      "Clear side angle with minimal perspective distortion",
      "Good light and unobstructed body outline",
    ],
    avoid: [
      "Dog sitting, jumping or turning",
      "Photo taken strongly from above or below",
      "Cut paws, hidden chest, hidden back or cropped body",
      "Extreme wide-angle lens distortion",
    ],
  },
  {
    viewType: "front_body",
    label: "Front body",
    purpose: "Secondary image for front stance and chest-width orientation.",
    comparisonUse:
      "Used for front balance, chest impression and symmetry signals only.",
    mustShow: [
      "Dog facing the camera while standing",
      "Head, chest and front legs clearly visible",
      "Camera centered and not tilted",
      "Balanced light on both sides",
    ],
    avoid: [
      "Dog angled sideways",
      "One side of the body hidden",
      "Strong shadows that hide chest or legs",
      "Close-up head-only framing",
    ],
  },
  {
    viewType: "head_profile",
    label: "Head profile",
    purpose: "Head-geometry image for muzzle/skull relation and profile review.",
    comparisonUse:
      "Used for muzzle-to-skull orientation, stop impression and head profile only.",
    mustShow: [
      "Full head visible from side profile",
      "Muzzle, stop, skull and neck outline readable",
      "Natural head position, not tilted upward or downward",
      "Good light on the facial outline",
    ],
    avoid: [
      "Open-mouth distortion when measuring muzzle impression",
      "Extreme close-up crop",
      "Head rotated toward the camera",
      "Blurred face or hidden muzzle",
    ],
  },
  {
    viewType: "head_front",
    label: "Head front",
    purpose: "Head-front image for width, expression and broad-head impression.",
    comparisonUse:
      "Used as supporting visual evidence, not as the main body-proportion comparison.",
    mustShow: [
      "Head facing forward",
      "Both eyes and muzzle visible",
      "No strong camera tilt",
      "Clear expression and facial outline",
    ],
    avoid: [
      "Side profile when front head review is selected",
      "Very close lens distortion",
      "Hidden eyes, cropped ears or cropped muzzle",
      "Low-light image with poor head contrast",
    ],
  },
];

export const photoReadinessRules: ReadinessRule[] = [
  {
    level: "accepted",
    label: "Accepted",
    scoreRange: "80–100",
    meaning:
      "The photo follows the guide closely enough for a reliable visual comparison workspace.",
    action:
      "Allow comparison, geometry overlay and visual match explanation.",
  },
  {
    level: "limited",
    label: "Limited",
    scoreRange: "55–79",
    meaning:
      "The photo may support a partial review, but perspective or visibility issues reduce confidence.",
    action:
      "Show a strong reliability warning and explain which parts of the comparison are limited.",
  },
  {
    level: "rejected",
    label: "Rejected",
    scoreRange: "0–54",
    meaning:
      "The photo does not meet the criteria for comparison with the Cane Corso reference geometry.",
    action:
      "Block the visual match score and ask for a new image following the photo guide.",
  },
];

export const photoComparisonCriteria: PhotoCriterion[] = [
  {
    id: "full_visibility",
    title: "Full required anatomy is visible",
    description:
      "The body or head region needed for the selected review type must be fully visible and not cropped.",
    requiredFor: ["side_body", "front_body", "head_profile", "head_front"],
  },
  {
    id: "correct_angle",
    title: "Correct camera angle",
    description:
      "The image must match the selected view type: side body, front body, head profile or head front.",
    requiredFor: ["side_body", "front_body", "head_profile", "head_front"],
  },
  {
    id: "natural_stance",
    title: "Natural standing position",
    description:
      "Body comparison needs a standing dog. Sitting, jumping or turning makes body geometry unreliable.",
    requiredFor: ["side_body", "front_body"],
  },
  {
    id: "low_perspective_distortion",
    title: "Low perspective distortion",
    description:
      "The camera should not be too high, too low or too close with a wide-angle lens.",
    requiredFor: ["side_body", "front_body", "head_profile", "head_front"],
  },
  {
    id: "clear_light_and_focus",
    title: "Clear light and focus",
    description:
      "The dog outline, head structure and major proportions must be readable.",
    requiredFor: ["side_body", "front_body", "head_profile", "head_front"],
  },
];

export const visualComparisonWorkflow = [
  "Guide the owner to capture the correct photo type.",
  "Check if the uploaded image is accepted, limited or rejected.",
  "Use only accepted or limited images for geometry comparison.",
  "Compare visible proportions with Cane Corso reference geometry.",
  "Show a visual match explanation without claiming pedigree, purity or official status.",
];
