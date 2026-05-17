import type { DogGrowthInput, GrowthStatus } from "@/lib/growth-model";

export type ReportTone = "positive" | "watch" | "attention" | "neutral";

export type GrowthReportFactor = {
  label: string;
  value: string;
  impact: string;
  tone: ReportTone;
};

export type GrowthReportSection = {
  title: string;
  detail: string;
};

export type GrowthIntelligenceReport = {
  title: string;
  headline: string;
  plainLanguageSummary: string;
  confidenceInterpretation: string;
  keyFactors: GrowthReportFactor[];
  modelExplanation: GrowthReportSection[];
  ownerChecklist: string[];
  technicalSummary: string;
  safetyBoundary: string;
};

export type GrowthReportContext = {
  status: GrowthStatus;
  statusLabel: string;
  expectedWeightNowKg: number;
  weightDifferenceKg: number;
  weightDifferencePercent: number;
  estimatedAdultWeightKg: number;
  growthProgressPercent: number;
  confidencePercent: number;
};

function signed(value: number, suffix = "") {
  return `${value > 0 ? "+" : ""}${value}${suffix}`;
}

function reportToneForStatus(status: GrowthStatus): ReportTone {
  if (status === "balanced_growth") return "positive";
  if (status === "review_signal") return "watch";
  return "attention";
}

function describeDistance(weightDifferencePercent: number) {
  const absDifference = Math.abs(weightDifferencePercent);

  if (absDifference <= 5) {
    return "very close to the current reference curve point";
  }

  if (absDifference <= 10) {
    return "near the reference curve, but worth tracking over the next measurements";
  }

  if (weightDifferencePercent < 0) {
    return "below the current reference curve point and should be reviewed calmly";
  }

  return "above the current reference curve point and should be reviewed calmly";
}

function buildHeadline(status: GrowthStatus) {
  switch (status) {
    case "balanced_growth":
      return "The current profile is inside the calm educational growth zone.";
    case "below_expected":
      return "The current profile is below the reference curve and needs owner review.";
    case "above_expected":
      return "The current profile is above the reference curve and needs owner review.";
    case "review_signal":
      return "The current profile is close to the zone, but the next measurements matter.";
    default:
      return "The app created an educational growth orientation report.";
  }
}

function confidenceCopy(confidencePercent: number) {
  if (confidencePercent >= 82) {
    return "High app confidence for an orientation tool. This means the entered data is complete and within the main age range of the model bridge, not that the result is clinically certain.";
  }

  if (confidencePercent >= 68) {
    return "Moderate app confidence. The report can help orientation, but the trend should be confirmed with repeated measurements.";
  }

  return "Limited app confidence. The report should be treated as a rough orientation because the input range or completeness is weaker.";
}

function checklistForStatus(status: GrowthStatus) {
  if (status === "balanced_growth") {
    return [
      "Continue recording age, weight and body condition on a regular schedule.",
      "Watch the trajectory over time instead of judging one isolated point.",
      "Keep feeding, activity and health notes together with each measurement.",
    ];
  }

  if (status === "review_signal") {
    return [
      "Add at least one or two more measurements before drawing a conclusion.",
      "Check whether height, weight and body condition are moving consistently together.",
      "Discuss the trend with a knowledgeable professional if the signal repeats.",
    ];
  }

  return [
    "Review feeding, body condition and recent growth history calmly.",
    "Repeat the measurement to avoid judging from one incorrect entry.",
    "Contact a qualified veterinarian when the signal persists or the dog shows health concerns.",
  ];
}

export function buildGrowthIntelligenceReport(
  input: DogGrowthInput,
  context: GrowthReportContext,
): GrowthIntelligenceReport {
  const distanceDescription = describeDistance(context.weightDifferencePercent);
  const statusTone = reportToneForStatus(context.status);
  const conditionTone: ReportTone =
    input.bodyConditionScore >= 4 && input.bodyConditionScore <= 6
      ? "positive"
      : input.bodyConditionScore <= 3 || input.bodyConditionScore >= 7
        ? "attention"
        : "watch";

  const distanceTone: ReportTone =
    Math.abs(context.weightDifferencePercent) <= 8
      ? "positive"
      : Math.abs(context.weightDifferencePercent) <= 14
        ? "watch"
        : "attention";

  const ageTone: ReportTone =
    input.ageMonths >= 3 && input.ageMonths <= 18 ? "positive" : "watch";

  return {
    title: "Growth Intelligence Report",
    headline: buildHeadline(context.status),
    plainLanguageSummary: `${input.name.trim() || "This Cane Corso"} is plotted at ${input.ageMonths} months and ${input.weightKg} kg. The app compares this point with an educational reference curve and reads it as ${distanceDescription}.`,
    confidenceInterpretation: confidenceCopy(context.confidencePercent),
    keyFactors: [
      {
        label: "Coordinate position",
        value: `${input.ageMonths} months / ${input.weightKg} kg`,
        impact:
          "This is the main point on the growth map. Age is the X-axis and weight is the Y-axis.",
        tone: statusTone,
      },
      {
        label: "Distance from curve",
        value: `${signed(context.weightDifferenceKg, " kg")} / ${signed(
          context.weightDifferencePercent,
          "%",
        )}`,
        impact:
          "This explains how far the entered weight is from the current reference curve point.",
        tone: distanceTone,
      },
      {
        label: "Body condition score",
        value: `${input.bodyConditionScore} / 9`,
        impact:
          "This is used as a classification-style review signal, not as a diagnosis.",
        tone: conditionTone,
      },
      {
        label: "Age range confidence",
        value: `${context.growthProgressPercent}% estimated growth progress`,
        impact:
          "The bridge is most useful during the active growth period, where repeated measurements show trajectory.",
        tone: ageTone,
      },
    ],
    modelExplanation: [
      {
        title: "Regression layer",
        detail:
          "The regression layer explains growth as a curve. The app uses that idea to estimate the expected weight point for the selected age and adult reference.",
      },
      {
        title: "Classification layer",
        detail:
          "The classification layer inspires the review zones. The app translates the current point into balanced, watch or attention signals.",
      },
      {
        title: "Geometry layer",
        detail:
          "The dog is represented as a coordinate point. The report explains the point, the distance from the curve and the meaning of the visible signal.",
      },
    ],
    ownerChecklist: checklistForStatus(context.status),
    technicalSummary: `Inputs used: age=${input.ageMonths}m, weight=${input.weightKg}kg, height=${input.heightCm}cm, sex=${input.sex}, BCS=${input.bodyConditionScore}/9, adultReference=${input.adultReferenceWeightKg}kg. Expected curve point=${context.expectedWeightNowKg}kg. Estimated adult weight from current point=${context.estimatedAdultWeightKg}kg.`,
    safetyBoundary:
      "This report is generated by a machine learning orientation tool. It is not veterinary advice, not a diagnosis and not a replacement for professional examination.",
  };
}
