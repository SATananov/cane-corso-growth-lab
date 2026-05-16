export type VisualMatchReadiness = "accepted" | "limited" | "rejected";
export type VisualMatchLevel = "high" | "moderate" | "low" | "blocked";

export type VisualMatchInput = {
  readiness: VisualMatchReadiness;
  classifierSignal: number;
  embeddingSimilarity: number;
  geometryCloseness: number;
  confidenceAdjustment: number;
};

export type VisualMatchResult = {
  level: VisualMatchLevel;
  score: number | null;
  confidence: "High" | "Medium" | "Low" | "Blocked";
  title: string;
  summary: string;
  userMeaning: string;
  safetyBoundary: string;
  signals: Array<{
    id: string;
    label: string;
    value: string;
    weight: string;
    meaning: string;
  }>;
  warnings: string[];
  nextActions: string[];
};

export const visualMatchWeights = {
  classifierSignal: 0.35,
  embeddingSimilarity: 0.3,
  geometryCloseness: 0.25,
  confidenceAdjustment: 0.1,
} as const;

export const visualMatchContractFormula = {
  title: "Visual Cane Corso Match contract",
  readable:
    "The final score is shown only when the photo gate allows comparison. The score combines breed-classifier signal, reference-set visual similarity, geometry closeness and confidence adjustment.",
  expression:
    "match = gate(readiness) × (0.35 × classifier + 0.30 × embedding + 0.25 × geometry + 0.10 × confidence)",
  rejectedRule:
    "If readiness is rejected, the match score is blocked and the user receives a new-photo warning.",
  safety:
    "The score expresses visual similarity to Cane Corso type. It does not prove pedigree, breed purity, genetic origin, health or official registration.",
} as const;

export const visualMatchSignalDefinitions = [
  {
    id: "photo_readiness_gate",
    label: "Photo readiness gate",
    role: "Protects the system from scoring unsuitable photos.",
    source: "Photo Quality Gate / Photo Readiness Model",
    output: "accepted / limited / rejected",
  },
  {
    id: "breed_classifier_signal",
    label: "Breed classifier signal",
    role: "Estimates whether the strongest visual class is Cane Corso or a similar molosser breed.",
    source: "Visual Breed Classifier",
    output: "class probabilities",
  },
  {
    id: "embedding_similarity",
    label: "Reference-set similarity",
    role: "Compares the uploaded photo embedding with permitted Cane Corso reference examples.",
    source: "Visual Similarity / Embedding Prototype",
    output: "cosine similarity / normalized similarity",
  },
  {
    id: "geometry_closeness",
    label: "Geometry closeness",
    role: "Compares visible proportions with Cane Corso reference geometry.",
    source: "Geometry Overlay Comparison",
    output: "ratio closeness score",
  },
  {
    id: "confidence_adjustment",
    label: "Confidence adjustment",
    role: "Reduces trust when the photo is limited, ambiguous or incomplete.",
    source: "Photo quality + model confidence",
    output: "confidence multiplier",
  },
] as const;

export const demoVisualMatchScenarios: Array<{
  id: string;
  label: string;
  input: VisualMatchInput;
  purpose: string;
}> = [
  {
    id: "accepted_high_match",
    label: "Accepted photo / high visual match",
    purpose:
      "A correctly captured photo with strong classifier, similarity and geometry signals.",
    input: {
      readiness: "accepted",
      classifierSignal: 0.86,
      embeddingSimilarity: 0.82,
      geometryCloseness: 0.78,
      confidenceAdjustment: 0.9,
    },
  },
  {
    id: "limited_medium_match",
    label: "Limited photo / medium visual match",
    purpose:
      "A usable but imperfect photo. The score is shown with a reliability warning.",
    input: {
      readiness: "limited",
      classifierSignal: 0.74,
      embeddingSimilarity: 0.69,
      geometryCloseness: 0.62,
      confidenceAdjustment: 0.58,
    },
  },
  {
    id: "rejected_photo_blocked",
    label: "Rejected photo / score blocked",
    purpose:
      "An unsuitable photo. The contract blocks the score and asks for a new image.",
    input: {
      readiness: "rejected",
      classifierSignal: 0.8,
      embeddingSimilarity: 0.75,
      geometryCloseness: 0.66,
      confidenceAdjustment: 0.2,
    },
  },
];

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function roundPercent(value: number) {
  return Math.round(value * 1000) / 10;
}

export function calculateVisualMatchScore(input: VisualMatchInput): VisualMatchResult {
  const safetyBoundary = visualMatchContractFormula.safety;

  if (input.readiness === "rejected") {
    return {
      level: "blocked",
      score: null,
      confidence: "Blocked",
      title: "Visual match blocked",
      summary:
        "The uploaded image does not meet the comparison criteria, so the app should not show a Cane Corso visual match score.",
      userMeaning:
        "Upload a new photo where the full dog is visible, standing naturally, with a correct angle and enough light.",
      safetyBoundary,
      signals: [
        {
          id: "photo_readiness_gate",
          label: "Photo readiness gate",
          value: "Rejected",
          weight: "required",
          meaning: "The gate blocks the final score before breed or geometry comparison.",
        },
      ],
      warnings: [
        "The photo is not suitable for reliable visual comparison.",
        "A score would be misleading because the required geometry cannot be compared safely.",
      ],
      nextActions: [
        "Upload a side-body photo with the full dog visible.",
        "Use a level camera angle near shoulder height.",
        "Make sure the dog is standing naturally on a flat surface.",
      ],
    };
  }

  const classifierSignal = clamp01(input.classifierSignal);
  const embeddingSimilarity = clamp01(input.embeddingSimilarity);
  const geometryCloseness = clamp01(input.geometryCloseness);
  const confidenceAdjustment = clamp01(input.confidenceAdjustment);

  const weightedScore =
    classifierSignal * visualMatchWeights.classifierSignal +
    embeddingSimilarity * visualMatchWeights.embeddingSimilarity +
    geometryCloseness * visualMatchWeights.geometryCloseness +
    confidenceAdjustment * visualMatchWeights.confidenceAdjustment;

  const limitedPenalty = input.readiness === "limited" ? 0.88 : 1;
  const score = clamp01(weightedScore * limitedPenalty);
  const scorePercent = roundPercent(score);

  const level: VisualMatchLevel =
    score >= 0.75 ? "high" : score >= 0.55 ? "moderate" : "low";

  const confidence =
    input.readiness === "limited"
      ? "Low"
      : score >= 0.78
        ? "High"
        : score >= 0.58
          ? "Medium"
          : "Low";

  return {
    level,
    score: scorePercent,
    confidence,
    title:
      level === "high"
        ? "High visual Cane Corso match"
        : level === "moderate"
          ? "Moderate visual Cane Corso match"
          : "Low visual Cane Corso match",
    summary:
      level === "high"
        ? "The accepted photo shows strong visual alignment with the Cane Corso reference signals used by this prototype."
        : level === "moderate"
          ? "The photo shows some Cane Corso-like visual signals, but the result needs careful review and more evidence."
          : "The photo has weak or inconsistent visual alignment with the Cane Corso reference signals used by this prototype.",
    userMeaning:
      "Use the result as an orientation signal only. A full assessment would require better photos, owner data, documentation and human review.",
    safetyBoundary,
    signals: [
      {
        id: "breed_classifier_signal",
        label: "Breed classifier",
        value: `${roundPercent(classifierSignal)}%`,
        weight: "35%",
        meaning: "How strongly the visual classifier points toward Cane Corso type.",
      },
      {
        id: "embedding_similarity",
        label: "Reference similarity",
        value: `${roundPercent(embeddingSimilarity)}%`,
        weight: "30%",
        meaning: "How close the image embedding is to approved Cane Corso reference examples.",
      },
      {
        id: "geometry_closeness",
        label: "Geometry closeness",
        value: `${roundPercent(geometryCloseness)}%`,
        weight: "25%",
        meaning: "How close visible proportions are to the Cane Corso reference geometry.",
      },
      {
        id: "confidence_adjustment",
        label: "Confidence adjustment",
        value: `${roundPercent(confidenceAdjustment)}%`,
        weight: "10%",
        meaning: "How much the photo quality and model confidence support the result.",
      },
    ],
    warnings:
      input.readiness === "limited"
        ? [
            "The photo is limited, so the score should be shown with a reliability warning.",
            "A better image may change the visual match result.",
          ]
        : [
            "The result is not proof of breed purity, pedigree, health or official registration.",
          ],
    nextActions: [
      "Use at least one correct side-body photo for body geometry.",
      "Add head profile and front head photos for head-structure review.",
      "Keep documentation and human review separate from photo-based visual similarity.",
    ],
  };
}
