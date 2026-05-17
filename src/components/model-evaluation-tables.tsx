"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import {
  classificationResults,
  formatMetric,
  formatPercent,
  regressionResults,
} from "@/lib/ml/model-results";

export function ModelEvaluationTables() {
  const { dictionary } = useLanguage();

  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
      <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
        {dictionary.tables.evaluationEyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
        {dictionary.tables.evaluationTitle}
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-7 text-stone-400">
        {dictionary.tables.evaluationDescription}
      </p>

      <div className="mt-6 grid gap-6">
        <EvaluationTable
          title={dictionary.tables.regressionTitle}
          description={dictionary.tables.regressionDescription}
          headers={[...dictionary.tables.regressionHeaders]}
          rows={regressionResults.map((result) => [
            result.model,
            result.geometry,
            result.features,
            formatMetric(result.mae),
            formatMetric(result.rmse),
            formatMetric(result.r2Score),
            result.model === "Ridge Regression"
              ? dictionary.tables.selectedBridgeEvidence
              : dictionary.tables.comparisonBaseline,
          ])}
        />

        <EvaluationTable
          title={dictionary.tables.classificationTitle}
          description={dictionary.tables.classificationDescription}
          headers={[...dictionary.tables.classificationHeaders]}
          rows={classificationResults.map((result) => [
            result.model,
            result.geometry,
            formatPercent(result.accuracy),
            formatPercent(result.precision),
            formatPercent(result.recall),
            formatMetric(result.f1Score),
            formatMetric(result.auc),
            result.model === "Random Forest"
              ? dictionary.tables.bestCurrentSignal
              : dictionary.tables.boundaryComparison,
          ])}
        />
      </div>
    </section>
  );
}

type EvaluationTableProps = {
  title: string;
  description: string;
  headers: string[];
  rows: string[][];
};

function EvaluationTable({ title, description, headers, rows }: EvaluationTableProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-stone-700 bg-black/25">
      <div className="border-b border-stone-700 px-5 py-4">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-stone-400">{description}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.16em] text-stone-500">
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-5 py-4">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800">
            {rows.map((row) => (
              <tr key={row.join("-")}>
                {row.map((cell, index) => (
                  <td
                    key={`${cell}-${index}`}
                    className={`px-5 py-4 ${index === 0 ? "font-semibold text-white" : "text-stone-300"}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
