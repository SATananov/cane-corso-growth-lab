"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import {
  calculateVisualMatchScore,
  demoVisualMatchScenarios,
  visualMatchContractFormula,
  visualMatchSignalDefinitions,
} from "@/lib/ml/visual-match-result-contract";

const copy = {
  en: {
    eyebrow: "Visual match result contract",
    title: "One final score, only after the photo passes the quality gate.",
    description:
      "This contract defines how the future visual result should behave: rejected photos block the score, limited photos show a warning, and accepted photos combine classifier, similarity and geometry evidence.",
    formula: "Result formula",
    scenarios: "Demo scenarios",
    signals: "Evidence signals",
    warnings: "Warnings",
    next: "Recommended next actions",
    score: "Visual Cane Corso Match",
    blocked: "Score blocked",
    confidence: "Confidence",
    safety: "Safety boundary",
    purpose: "Purpose",
    source: "Source",
    output: "Output",
  },
  bg: {
    eyebrow: "Договор за финален визуален резултат",
    title: "Един финален резултат, само след като снимката мине проверка за качество.",
    description:
      "Този договор определя как трябва да се държи бъдещият визуален резултат: отхвърлени снимки блокират оценката, ограничени снимки показват предупреждение, а приети снимки комбинират класификатор, сходство и геометрично доказателство.",
    formula: "Формула на резултата",
    scenarios: "Демо сценарии",
    signals: "Сигнали за доказателство",
    warnings: "Предупреждения",
    next: "Препоръчани следващи действия",
    score: "Визуално сходство с Cane Corso тип",
    blocked: "Резултатът е блокиран",
    confidence: "Увереност",
    safety: "Безопасна граница",
    purpose: "Цел",
    source: "Източник",
    output: "Изход",
  },
  it: {
    eyebrow: "Contratto del risultato visivo",
    title: "Un punteggio finale, solo dopo che la foto supera il quality gate.",
    description:
      "Questo contract definisce il comportamento del risultato visivo futuro: le foto rejected bloccano il punteggio, le foto limited mostrano un avviso e le foto accepted combinano classifier, similarity e geometry evidence.",
    formula: "Formula del risultato",
    scenarios: "Scenari demo",
    signals: "Segnali di evidenza",
    warnings: "Avvisi",
    next: "Azioni consigliate",
    score: "Somiglianza visiva con il tipo Cane Corso",
    blocked: "Punteggio bloccato",
    confidence: "Confidenza",
    safety: "Limite di sicurezza",
    purpose: "Scopo",
    source: "Fonte",
    output: "Output",
  },
} as const;

const levelStyles = {
  high: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  moderate: "border-amber-300/25 bg-amber-300/10 text-amber-100",
  low: "border-red-300/25 bg-red-300/10 text-red-100",
  blocked: "border-red-300/25 bg-red-300/10 text-red-100",
} as const;

export function VisualMatchResultContractPanel() {
  const { language } = useLanguage();
  const t = copy[language];
  const [scenarioId, setScenarioId] = useState(demoVisualMatchScenarios[0].id);
  const scenario =
    demoVisualMatchScenarios.find((item) => item.id === scenarioId) ??
    demoVisualMatchScenarios[0];
  const result = useMemo(
    () => calculateVisualMatchScore(scenario.input),
    [scenario.input],
  );

  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-black/25 p-6 shadow-2xl shadow-black/20">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-amber-300/70">
            {t.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            {t.title}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-300">
            {t.description}
          </p>
        </div>

        <div className="rounded-3xl border border-amber-300/15 bg-amber-300/10 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-100/70">
            {t.formula}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-amber-50">
            {visualMatchContractFormula.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-amber-50/85">
            {visualMatchContractFormula.readable}
          </p>
          <code className="mt-4 block break-words rounded-2xl border border-amber-200/15 bg-black/30 px-4 py-3 text-xs leading-6 text-amber-100/85">
            {visualMatchContractFormula.expression}
          </code>
          <p className="mt-4 text-sm leading-6 text-amber-50/80">
            {visualMatchContractFormula.rejectedRule}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl border border-amber-200/10 bg-white/[0.035] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
            {t.scenarios}
          </p>
          <div className="mt-4 space-y-3">
            {demoVisualMatchScenarios.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setScenarioId(item.id)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  item.id === scenarioId
                    ? "border-amber-300/40 bg-amber-300/10"
                    : "border-stone-700 bg-black/20 hover:border-amber-200/25"
                }`}
              >
                <p className="font-semibold text-white">{item.label}</p>
                <p className="mt-2 text-sm leading-6 text-stone-400">
                  {item.purpose}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-amber-200/10 bg-white/[0.035] p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                {t.score}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                {result.title}
              </h3>
            </div>
            <span className={`rounded-full border px-4 py-2 text-sm font-semibold ${levelStyles[result.level]}`}>
              {result.score === null ? t.blocked : `${result.score}%`}
            </span>
          </div>

          <p className="mt-4 text-sm leading-7 text-stone-300">
            {result.summary}
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-stone-700 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                {t.confidence}
              </p>
              <p className="mt-2 font-semibold text-white">{result.confidence}</p>
            </div>
            <div className="rounded-2xl border border-stone-700 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                Photo gate
              </p>
              <p className="mt-2 font-semibold text-white">
                {scenario.input.readiness}
              </p>
            </div>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-stone-700/80">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.2em] text-amber-200/75">
                <tr>
                  <th className="px-4 py-4">Signal</th>
                  <th className="px-4 py-4">Value</th>
                  <th className="px-4 py-4">Weight</th>
                  <th className="px-4 py-4">Meaning</th>
                </tr>
              </thead>
              <tbody>
                {result.signals.map((signal) => (
                  <tr key={signal.id} className="border-t border-stone-800">
                    <td className="px-4 py-4 font-semibold text-white">
                      {signal.label}
                    </td>
                    <td className="px-4 py-4 text-amber-100/90">
                      {signal.value}
                    </td>
                    <td className="px-4 py-4 text-stone-300">
                      {signal.weight}
                    </td>
                    <td className="px-4 py-4 leading-6 text-stone-400">
                      {signal.meaning}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 rounded-2xl border border-amber-200/10 bg-black/20 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-amber-300/70">
              {t.safety}
            </p>
            <p className="mt-2 text-sm leading-6 text-stone-300">
              {result.safetyBoundary}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-red-300/15 bg-red-300/5 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-red-100/70">
            {t.warnings}
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-red-50/85">
            {result.warnings.map((warning) => (
              <li key={warning}>• {warning}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-emerald-300/5 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-emerald-100/70">
            {t.next}
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-emerald-50/85">
            {result.nextActions.map((action) => (
              <li key={action}>• {action}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-stone-700/80">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.2em] text-amber-200/75">
            <tr>
              <th className="px-4 py-4">Signal</th>
              <th className="px-4 py-4">{t.purpose}</th>
              <th className="px-4 py-4">{t.source}</th>
              <th className="px-4 py-4">{t.output}</th>
            </tr>
          </thead>
          <tbody>
            {visualMatchSignalDefinitions.map((signal) => (
              <tr key={signal.id} className="border-t border-stone-800">
                <td className="px-4 py-4 font-semibold text-white">
                  {signal.label}
                </td>
                <td className="px-4 py-4 leading-6 text-stone-400">
                  {signal.role}
                </td>
                <td className="px-4 py-4 text-amber-100/80">
                  {signal.source}
                </td>
                <td className="px-4 py-4 text-stone-300">
                  {signal.output}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
