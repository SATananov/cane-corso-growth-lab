import type { DogGrowthInput, DogSex } from "@/lib/growth-model";

export type BreedReferenceRange = {
  min: number;
  max: number;
  toleranceMin?: number;
  toleranceMax?: number;
  unit: string;
};

export type BreedReferenceRatio = {
  id: string;
  label: string;
  formula: string;
  target: number;
  min: number;
  max: number;
  unit: "ratio" | "percent";
  appUse: string;
};

export type BreedReferenceGeometry = {
  sourceLabel: string;
  sourceUrl: string;
  standardNumber: string;
  publicationDate: string;
  status: string;
  adultRanges: Record<DogSex, {
    heightAtWithersCm: BreedReferenceRange;
    weightKg: BreedReferenceRange;
    weightHeightRatioKgPerCm: number;
  }>;
  proportions: BreedReferenceRatio[];
  safetyBoundary: string;
};

export const caneCorsoBreedReferenceGeometry: BreedReferenceGeometry = {
  sourceLabel: "FCI Standard No. 343 — Cane Corso Italiano",
  sourceUrl: "https://www.fci.be/nomenclature/Standards/343g02-en.pdf",
  standardNumber: "FCI 343",
  publicationDate: "13.10.2023 / EN",
  status: "reference-only orientation layer",
  adultRanges: {
    male: {
      heightAtWithersCm: {
        min: 64,
        max: 68,
        toleranceMin: 62,
        toleranceMax: 70,
        unit: "cm",
      },
      weightKg: {
        min: 45,
        max: 50,
        unit: "kg",
      },
      weightHeightRatioKgPerCm: 0.71,
    },
    female: {
      heightAtWithersCm: {
        min: 60,
        max: 64,
        toleranceMin: 58,
        toleranceMax: 66,
        unit: "cm",
      },
      weightKg: {
        min: 40,
        max: 45,
        unit: "kg",
      },
      weightHeightRatioKgPerCm: 0.68,
    },
  },
  proportions: [
    {
      id: "bodyLengthToHeight",
      label: "Body length / height at withers",
      formula: "body_length_cm / height_at_withers_cm",
      target: 1.11,
      min: 1.08,
      max: 1.14,
      unit: "ratio",
      appUse: "Side-body photo geometry and future landmark comparison.",
    },
    {
      id: "headLengthToHeight",
      label: "Head length / height at withers",
      formula: "head_length_cm / height_at_withers_cm",
      target: 0.36,
      min: 0.33,
      max: 0.39,
      unit: "ratio",
      appUse: "Head/body proportion reference for photo review.",
    },
    {
      id: "muzzleToSkull",
      label: "Muzzle length / skull length",
      formula: "muzzle_length_cm / skull_length_cm",
      target: 0.52,
      min: 0.45,
      max: 0.58,
      unit: "ratio",
      appUse: "Head-profile review; the muzzle is shorter than the skull.",
    },
    {
      id: "chestDepthToHeight",
      label: "Chest depth / height at withers",
      formula: "chest_depth_cm / height_at_withers_cm",
      target: 0.5,
      min: 0.46,
      max: 0.54,
      unit: "ratio",
      appUse: "Side-body photo geometry and visual substance orientation.",
    },
  ],
  safetyBoundary:
    "This layer compares visible measurements with reference geometry only. It does not prove pedigree, breed purity, official registry status or health status.",
};

export type BreedReferenceSignal = "within_reference" | "within_tolerance" | "outside_reference" | "puppy_growth";

export type BreedReferenceEvaluation = {
  ageStage: "puppy" | "adolescent" | "adult";
  heightSignal: BreedReferenceSignal;
  weightSignal: BreedReferenceSignal;
  heightMessage: string;
  weightMessage: string;
  weightHeightRatio: number;
  referenceWeightHeightRatio: number;
  readinessNote: string;
};

function round(value: number, digits = 2) {
  const multiplier = 10 ** digits;
  return Math.round(value * multiplier) / multiplier;
}

function getAgeStage(ageMonths: number): BreedReferenceEvaluation["ageStage"] {
  if (ageMonths < 12) {
    return "puppy";
  }

  if (ageMonths < 24) {
    return "adolescent";
  }

  return "adult";
}

function evaluateRange(value: number, range: BreedReferenceRange): BreedReferenceSignal {
  if (value >= range.min && value <= range.max) {
    return "within_reference";
  }

  if (
    typeof range.toleranceMin === "number" &&
    typeof range.toleranceMax === "number" &&
    value >= range.toleranceMin &&
    value <= range.toleranceMax
  ) {
    return "within_tolerance";
  }

  return "outside_reference";
}

export function evaluateBreedReferenceGeometry(
  input: DogGrowthInput,
): BreedReferenceEvaluation {
  const ageStage = getAgeStage(input.ageMonths);
  const sexReference = caneCorsoBreedReferenceGeometry.adultRanges[input.sex];
  const weightHeightRatio = input.heightCm > 0 ? input.weightKg / input.heightCm : 0;

  if (ageStage !== "adult") {
    return {
      ageStage,
      heightSignal: "puppy_growth",
      weightSignal: "puppy_growth",
      heightMessage:
        "The dog is still growing, so adult reference ranges are shown as orientation only.",
      weightMessage:
        "Current weight should be interpreted together with age, growth curve and body condition.",
      weightHeightRatio: round(weightHeightRatio, 3),
      referenceWeightHeightRatio: sexReference.weightHeightRatioKgPerCm,
      readinessNote:
        "Use this layer as adult reference context. A photo-geometry module will need correct side and head photos before visual comparison.",
    };
  }

  const heightSignal = evaluateRange(input.heightCm, sexReference.heightAtWithersCm);
  const weightSignal = evaluateRange(input.weightKg, sexReference.weightKg);

  return {
    ageStage,
    heightSignal,
    weightSignal,
    heightMessage:
      heightSignal === "within_reference"
        ? "Height is inside the adult reference range for the selected sex."
        : heightSignal === "within_tolerance"
          ? "Height is outside the main range but inside the tolerance band."
          : "Height is outside the adult reference/tolerance band and should be reviewed carefully.",
    weightMessage:
      weightSignal === "within_reference"
        ? "Weight is inside the adult reference range for the selected sex."
        : "Weight is outside the adult reference range and should be interpreted with body condition and veterinary context.",
    weightHeightRatio: round(weightHeightRatio, 3),
    referenceWeightHeightRatio: sexReference.weightHeightRatioKgPerCm,
    readinessNote:
      "Adult reference comparison is available for height and weight. Photo-based visual match still requires correct comparison photos and visible landmarks.",
  };
}
