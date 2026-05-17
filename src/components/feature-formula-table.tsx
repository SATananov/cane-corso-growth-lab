"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import { localizeMlPhrase } from "@/lib/i18n/ml-phrase-copy";
import { featureDefinitions } from "@/lib/ml/feature-engineering";
import { growthFormulaEvidence } from "@/lib/ml/final-evidence";

const formulaByFeature: Record<string, string> = {
  maturityRatio: "age_months / 24",
  adultWeightRatio: "weight_kg / adult_reference_weight_kg",
  weightHeightRatio: "weight_kg / height_cm",
  bodyConditionDeviation: "|BCS - 5| / 4",
  curveDeltaPercent: "((weight - expected_weight) / expected_weight) × 100",
  normalizedMassIndex: "weight_kg / (height_m²)",
};

export function FeatureFormulaTable() {
  const { dictionary, language } = useLanguage();

  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
      <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
        {dictionary.tables.featureFormulaEyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
        {dictionary.tables.featureFormulaTitle}
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-7 text-stone-400">
        {dictionary.tables.featureFormulaDescription}
      </p>

      <div className="mt-6 overflow-hidden rounded-3xl border border-stone-700 bg-black/25">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.16em] text-stone-500">
              <tr>
                {dictionary.tables.featureHeaders.map((header) => (
                  <th key={header} className="px-5 py-4">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {featureDefinitions.map((feature) => (
                <tr key={feature.id}>
                  <td className="px-5 py-4 font-semibold text-white">{localizeMlPhrase(feature.label, language)}</td>
                  <td className="px-5 py-4 font-mono text-xs text-amber-100/80">
                    {formulaByFeature[feature.id] ?? dictionary.tables.derivedAppFeature}
                  </td>
                  <td className="px-5 py-4 text-stone-300">{localizeMlPhrase(feature.explanation, language)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        {growthFormulaEvidence.slice(0, 3).map((row) => (
          <article key={row.id} className="rounded-2xl border border-stone-700 bg-black/20 p-4">
            <p className="text-sm font-semibold text-white">{localizeMlPhrase(row.label, language)}</p>
            <p className="mt-2 font-mono text-xs text-amber-100/80">{row.formula}</p>
            <p className="mt-3 text-sm leading-6 text-stone-400">{localizeMlPhrase(row.appUse, language)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
