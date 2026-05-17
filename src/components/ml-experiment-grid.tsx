"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import { localizeMlPhrase } from "@/lib/i18n/ml-phrase-copy";
import type { LanguageCode } from "@/lib/i18n/languages";
import {
  classificationResults,
  formatMetric,
  formatPercent,
  regressionResults,
} from "@/lib/ml/model-results";

type ExperimentCopy = {
  modelCopy: Record<string, { geometry: string; features?: string; interpretation: string }>;
  conceptCards: { title: string; tag: string; description: string }[];
  metrics: { accuracy: string; recall: string; f1: string };
};

const copy: Record<LanguageCode, ExperimentCopy> = {
  en: {
    modelCopy: {
      "Simple Linear Regression": {
        geometry: "Line",
        features: "age_months",
        interpretation:
          "A clear first baseline. It explains the direct age-to-weight relationship, but growth is not perfectly linear.",
      },
      "Polynomial Regression": {
        geometry: "Curve",
        features: "age_months with polynomial degree 2",
        interpretation:
          "A stronger visual fit because Cane Corso growth behaves more like a curve than a straight line.",
      },
      "Multi-Dimensional Linear Regression": {
        geometry: "Surface",
        features: "age_months, height_cm, sex, activity_level",
        interpretation:
          "A better estimate because the model uses more than age and represents the profile in a wider feature space.",
      },
      "Ridge Regression": {
        geometry: "Regularized surface",
        features: "age_months, height_cm, sex, activity_level",
        interpretation:
          "The current best regression result in the notebook comparison, with regularization for more stable learning.",
      },
      "Logistic Regression": {
        geometry: "Boundary",
        interpretation:
          "Simple interpretable baseline for separating calm growth from review-zone samples.",
      },
      "Decision Tree": {
        geometry: "Decision splits",
        interpretation:
          "Readable rule-style model. Useful for explaining why a profile enters a review zone.",
      },
    },
    conceptCards: [
      {
        title: "Coordinate Logic",
        tag: "Geometry",
        description:
          "A dog profile is represented as a point, growth is shown as a trajectory and models become lines, curves, surfaces or boundaries.",
      },
      {
        title: "Profile Grouping",
        tag: "Groups",
        description:
          "Unsupervised learning groups similar growth profiles without predefined labels.",
      },
    ],
    metrics: { accuracy: "Accuracy", recall: "Recall", f1: "F1" },
  },
  bg: {
    modelCopy: {
      "Simple Linear Regression": {
        geometry: "Права линия",
        features: "възраст в месеци",
        interpretation:
          "Ясен начален модел. Показва пряката връзка възраст–тегло, но растежът не е напълно линеен.",
      },
      "Polynomial Regression": {
        geometry: "Крива",
        features: "възраст с полиномиална степен 2",
        interpretation:
          "По-добро визуално приближение, защото растежът на Cane Corso се държи повече като крива, отколкото като права линия.",
      },
      "Multi-Dimensional Linear Regression": {
        geometry: "Повърхност",
        features: "възраст, височина, пол и активност",
        interpretation:
          "По-точна оценка, защото моделът използва повече данни от възрастта и разглежда профила в по-широко пространство.",
      },
      "Ridge Regression": {
        geometry: "Регулирана повърхност",
        features: "възраст, височина, пол и активност",
        interpretation:
          "Най-силният текущ регресионен резултат в сравнението, с регуляризация за по-стабилно обучение.",
      },
      "Logistic Regression": {
        geometry: "Граница",
        interpretation:
          "Ясен базов класификационен модел за разделяне на спокоен растеж от зона за преглед.",
      },
      "Decision Tree": {
        geometry: "Правила",
        interpretation:
          "Модел с лесни за четене правила. Полезен е за обяснение защо даден профил влиза в зона за преглед.",
      },
    },
    conceptCards: [
      {
        title: "Координатна логика",
        tag: "Геометрия",
        description:
          "Профилът на кучето е точка, растежът е траектория, а моделите се виждат като линии, криви, повърхности или граници.",
      },
      {
        title: "Групиране на профили",
        tag: "Групи",
        description:
          "Обучението без предварителни етикети групира сходни профили на растеж без предварително зададени класове.",
      },
    ],
    metrics: { accuracy: "Точност", recall: "Обхват", f1: "F1" },
  },
  it: {
    modelCopy: {
      "Simple Linear Regression": {
        geometry: "Linea",
        features: "età in mesi",
        interpretation:
          "Primo modello chiaro. Mostra il rapporto diretto età–peso, ma la crescita non è perfettamente lineare.",
      },
      "Polynomial Regression": {
        geometry: "Curva",
        features: "età con grado polinomiale 2",
        interpretation:
          "Adattamento visivo più forte perché la crescita del Cane Corso si comporta più come una curva che come una linea.",
      },
      "Multi-Dimensional Linear Regression": {
        geometry: "Superficie",
        features: "età, altezza, sesso e attività",
        interpretation:
          "Stima migliore perché usa più informazioni dell’età e rappresenta il profilo in uno spazio più ampio.",
      },
      "Ridge Regression": {
        geometry: "Superficie regolarizzata",
        features: "età, altezza, sesso e attività",
        interpretation:
          "Miglior risultato di regressione nel confronto attuale, con regularization per apprendimento più stabile.",
      },
      "Logistic Regression": {
        geometry: "Confine",
        interpretation:
          "Base di classificazione semplice per separare crescita calma da zone di revisione.",
      },
      "Decision Tree": {
        geometry: "Regole",
        interpretation:
          "Modello a regole leggibile. Utile per spiegare perché un profilo entra in una zona di revisione.",
      },
    },
    conceptCards: [
      {
        title: "Logica coordinata",
        tag: "Geometria",
        description:
          "Il profilo del cane è un punto, la crescita è una traiettoria e i modelli diventano linee, curve, superfici o confini.",
      },
      {
        title: "Raggruppamento profili",
        tag: "Gruppi",
        description:
          "Unsupervised Learning raggruppa profili di crescita simili senza etichette predefinite.",
      },
    ],
    metrics: { accuracy: "Accuratezza", recall: "Recall", f1: "F1" },
  },
};

export function MlExperimentGrid() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {regressionResults.slice(0, 4).map((experiment) => {
          const localized = t.modelCopy[experiment.model] ?? {
            geometry: experiment.geometry,
            features: experiment.features,
            interpretation: experiment.interpretation,
          };

          return (
            <article
              key={experiment.model}
              className="min-w-0 rounded-[1.5rem] border border-amber-200/10 bg-black/25 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold text-white">{localizeMlPhrase(experiment.model, language)}</h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-stone-500">
                    {localized.features}
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-amber-200/15 px-3 py-1 text-xs font-semibold text-amber-100/80">
                  {localized.geometry}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-stone-400">{localized.interpretation}</p>
              <div className="mt-5 grid grid-cols-3 gap-2 text-sm">
                <MetricPill label="MAE" value={formatMetric(experiment.mae)} />
                <MetricPill label="RMSE" value={formatMetric(experiment.rmse)} />
                <MetricPill label="R²" value={formatMetric(experiment.r2Score)} />
              </div>
            </article>
          );
        })}

        {classificationResults.slice(0, 2).map((experiment) => {
          const localized = t.modelCopy[experiment.model] ?? {
            geometry: experiment.geometry,
            interpretation: experiment.interpretation,
          };

          return (
            <article
              key={experiment.model}
              className="min-w-0 rounded-[1.5rem] border border-amber-200/10 bg-black/25 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="min-w-0 text-xl font-semibold text-white">{experiment.model}</h3>
                <span className="shrink-0 rounded-full border border-amber-200/15 px-3 py-1 text-xs font-semibold text-amber-100/80">
                  {localized.geometry}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-stone-400">{localized.interpretation}</p>
              <div className="mt-5 grid grid-cols-3 gap-2 text-sm">
                <MetricPill label={t.metrics.accuracy} value={formatPercent(experiment.accuracy)} />
                <MetricPill label={t.metrics.recall} value={formatPercent(experiment.recall)} />
                <MetricPill label={t.metrics.f1} value={formatMetric(experiment.f1Score)} />
              </div>
            </article>
          );
        })}

        {t.conceptCards.map((experiment) => (
          <article
            key={experiment.title}
            className="min-w-0 rounded-[1.5rem] border border-amber-200/10 bg-black/25 p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="min-w-0 text-xl font-semibold text-white">{experiment.title}</h3>
              <span className="shrink-0 rounded-full border border-amber-200/15 px-3 py-1 text-xs font-semibold text-amber-100/80">
                {experiment.tag}
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-stone-400">{experiment.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

type MetricPillProps = { label: string; value: string };
function MetricPill({ label, value }: MetricPillProps) {
  return (
    <div className="min-w-0 rounded-2xl border border-stone-700 bg-white/[0.03] p-3">
      <p className="text-[0.65rem] uppercase tracking-[0.14em] text-stone-500">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}
