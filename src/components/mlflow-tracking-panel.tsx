"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import type { LanguageCode } from "@/lib/i18n/languages";
import { localizeMlPhrase } from "@/lib/i18n/ml-phrase-copy";
import { mlflowRunSummaries, mlflowTrackingPrinciples } from "@/lib/ml/mlflow-tracking";

const copy: Record<LanguageCode, { eyebrow: string; title: string; description: string; principles: string; stage: Record<string, string>; family: Record<string, string> }> = {
  en: {
    eyebrow: "Experiment Tracking",
    title: "Models need history, metrics and artifacts.",
    description:
      "The tracking layer shows which model runs support the current app logic. It keeps the project evidence traceable without turning the app into a full clinical ML system.",
    principles: "Tracking principles",
    stage: { research: "Research", app_bridge: "App bridge", candidate: "Candidate" },
    family: { regression: "Regression", classification: "Classification", clustering: "Clustering", projection: "Projection" },
  },
  bg: {
    eyebrow: "Проследяване на експерименти",
    title: "Моделите имат нужда от история, метрики и артефакти.",
    description:
      "Слоят за проследяване показва кои model runs подкрепят текущата логика на приложението. Така проектните доказателства остават проследими, без приложението да се представя като клинична ML система.",
    principles: "Принципи за проследяване",
    stage: { research: "Изследване", app_bridge: "Връзка с app", candidate: "Кандидат" },
    family: { regression: "Регресия", classification: "Класификация", clustering: "Групиране", projection: "Проекция" },
  },
  it: {
    eyebrow: "Tracciamento esperimenti",
    title: "I modelli hanno bisogno di storia, metriche e artefatti.",
    description:
      "Il livello di tracciamento mostra quali run supportano la logica attuale dell’app. Mantiene le evidenze del progetto tracciabili senza trasformare l’app in un sistema ML clinico.",
    principles: "Principi di tracking",
    stage: { research: "Ricerca", app_bridge: "Bridge app", candidate: "Candidato" },
    family: { regression: "Regressione", classification: "Classificazione", clustering: "Clustering", projection: "Proiezione" },
  },
};

export function MlflowTrackingPanel() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="usg-readable-card rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
      <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">{t.eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">{t.title}</h2>
      <p className="mt-4 max-w-3xl text-base leading-7 text-stone-400">{t.description}</p>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {mlflowRunSummaries.map((run) => (
          <article key={run.runId} className="rounded-3xl border border-stone-700 bg-black/25 p-5">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-amber-200/15 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-100">
                {t.family[run.modelFamily] ?? run.modelFamily}
              </span>
              <span className="rounded-full border border-stone-700 px-3 py-1 text-xs text-stone-400">
                {t.stage[run.stage] ?? run.stage}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white">{localizeMlPhrase(run.name, language)}</h3>
            <div className="mt-4 grid gap-2">
              {run.metrics.map((metric) => (
                <div key={metric.label} className="flex justify-between rounded-2xl bg-white/[0.04] px-3 py-2 text-sm">
                  <span className="text-stone-400">{metric.label}</span>
                  <span className="font-semibold text-white">{metric.value}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 break-words text-xs leading-5 text-stone-500">{run.artifacts.join(" · ")}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-amber-200/10 bg-amber-300/10 p-5">
        <p className="text-sm font-semibold text-amber-100">{t.principles}</p>
        <ul className="mt-3 grid gap-2 text-sm leading-6 text-amber-100/80 md:grid-cols-2">
          {mlflowTrackingPrinciples.map((principle) => (
            <li key={principle}>• {localizeMlPhrase(principle, language)}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
