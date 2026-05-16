"use client";

import type { GrowthPrediction } from "@/lib/growth-model";
import { useLanguage } from "@/lib/i18n/language-context";

type PredictionSummaryProps = {
  prediction: GrowthPrediction;
};

const statusStyles: Record<GrowthPrediction["status"], string> = {
  balanced_growth: "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
  below_expected: "border-sky-300/20 bg-sky-300/10 text-sky-100",
  above_expected: "border-orange-300/20 bg-orange-300/10 text-orange-100",
  review_signal: "border-amber-300/20 bg-amber-300/10 text-amber-100",
};

export function PredictionSummary({ prediction }: PredictionSummaryProps) {
  const { dictionary } = useLanguage();
  const cards = [
    {
      label: dictionary.prediction.expectedNow,
      value: `${prediction.expectedWeightNowKg} kg`,
      hint: dictionary.prediction.referenceCurvePoint,
    },
    {
      label: dictionary.prediction.difference,
      value: `${prediction.weightDifferenceKg > 0 ? "+" : ""}${prediction.weightDifferenceKg} kg`,
      hint: `${prediction.weightDifferencePercent > 0 ? "+" : ""}${prediction.weightDifferencePercent}% ${dictionary.prediction.fromReference}`,
    },
    {
      label: dictionary.prediction.estimatedAdult,
      value: `${prediction.estimatedAdultWeightKg} kg`,
      hint: dictionary.prediction.educationalEstimate,
    },
    {
      label: dictionary.prediction.confidence,
      value: `${prediction.confidencePercent}%`,
      hint: dictionary.prediction.inputCompleteness,
    },
  ];

  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-black/25 p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-amber-300/70">
            {dictionary.prediction.eyebrow}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            {prediction.dogName}: {prediction.statusLabel}
          </h3>
          <p className="mt-2 text-sm leading-6 text-stone-400">
            {prediction.reviewMessage}
          </p>
        </div>

        <div
          className={`rounded-full border px-4 py-2 text-sm font-semibold ${statusStyles[prediction.status]}`}
        >
          {prediction.statusTone}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-stone-700 bg-white/[0.03] p-4"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
              {card.label}
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">{card.value}</p>
            <p className="mt-1 text-sm text-stone-500">{card.hint}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-amber-200/10 bg-amber-200/[0.04] p-4">
        <p className="text-sm font-semibold text-amber-100">{dictionary.prediction.recommendedNextStep}</p>
        <p className="mt-2 text-sm leading-6 text-stone-400">
          {prediction.recommendation}
        </p>
      </div>
    </section>
  );
}
