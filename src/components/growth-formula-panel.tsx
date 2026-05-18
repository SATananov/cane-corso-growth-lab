"use client";

import type { GrowthPrediction } from "@/lib/growth-model";
import { useLanguage } from "@/lib/i18n/language-context";
import { localizeMlPhrase } from "@/lib/i18n/ml-phrase-copy";
import { growthFormulaEvidence } from "@/lib/ml/final-evidence";

type GrowthFormulaPanelProps = {
  prediction: GrowthPrediction;
};

function formatSigned(value: number) {
  return value > 0 ? `+${value}` : `${value}`;
}

export function GrowthFormulaPanel({ prediction }: GrowthFormulaPanelProps) {
  const { dictionary, language } = useLanguage();
  const adultReferenceApprox = prediction.growthProgressPercent
    ? prediction.expectedWeightNowKg / (prediction.growthProgressPercent / 100)
    : prediction.estimatedAdultWeightKg;

  const liveFormulaRows = [
    {
      label: dictionary.formulas.rows.growthProgress,
      formula: "f(age_months)",
      value: `${prediction.growthProgressPercent}%`,
    },
    {
      label: dictionary.formulas.rows.expectedWeightNow,
      formula: "adult_reference × growth_progress",
      value: `${adultReferenceApprox.toFixed(1)} × ${prediction.growthProgressPercent}% = ${prediction.expectedWeightNowKg} kg`,
    },
    {
      label: dictionary.formulas.rows.curveDelta,
      formula: "current_weight - expected_weight_now",
      value: `${formatSigned(prediction.weightDifferenceKg)} kg / ${formatSigned(
        prediction.weightDifferencePercent,
      )}%`,
    },
    {
      label: dictionary.formulas.rows.estimatedAdultWeight,
      formula: "current_weight / growth_progress",
      value: `${prediction.estimatedAdultWeightKg} kg`,
    },
  ];

  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-amber-300/70">
            {dictionary.formulas.eyebrow}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            {dictionary.formulas.title}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-400">
            {dictionary.formulas.description}
          </p>
        </div>
        <span className="w-fit rounded-full border border-amber-200/15 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-100">
          {dictionary.formulas.badge}
        </span>
      </div>

      <div className="mt-5 overflow-hidden rounded-3xl border border-stone-700 bg-black/25">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.16em] text-stone-500">
              <tr>
                {dictionary.formulas.tableHeaders.map((header) => (
                  <th key={header} className="px-5 py-4">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {liveFormulaRows.map((row) => (
                <tr key={row.label}>
                  <td className="px-5 py-4 font-semibold text-white">{row.label}</td>
                  <td className="px-5 py-4 font-mono text-xs text-amber-100/80">
                    {row.formula}
                  </td>
                  <td className="px-5 py-4 text-stone-300">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {growthFormulaEvidence.slice(4).map((row) => (
          <article key={row.id} className="rounded-2xl border border-stone-700 bg-black/20 p-4">
            <p className="text-sm font-semibold text-white">{localizeMlPhrase(row.label, language)}</p>
            <p className="mt-2 font-mono text-xs text-amber-100/80">{row.formula}</p>
            <p className="mt-3 text-sm leading-6 text-stone-400">{localizeMlPhrase(row.meaning, language)}</p>
            <p className="mt-3 text-xs leading-5 text-amber-100/70">{localizeMlPhrase(row.appUse, language)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
