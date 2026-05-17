"use client";

import type { GrowthPrediction } from "@/lib/growth-model";
import { useLanguage } from "@/lib/i18n/language-context";
import type { LanguageCode } from "@/lib/i18n/languages";

type FeatureVectorPanelProps = {
  prediction: GrowthPrediction;
};

const copy: Record<LanguageCode, {
  eyebrow: string;
  title: string;
  description: string;
  contract: string;
  featureLabels: Record<string, string>;
  featureExplanations: Record<string, string>;
}> = {
  en: {
    eyebrow: "Feature Engineering",
    title: "Model-ready growth features",
    description:
      "User inputs are transformed into a compact feature vector before the app explains regression, classification, clustering and geometry signals.",
    contract: "Feature contract",
    featureLabels: {},
    featureExplanations: {},
  },
  bg: {
    eyebrow: "Подготовка на характеристиките",
    title: "Сигнали, готови за модел",
    description:
      "Въведените данни се превръщат в кратък вектор от характеристики, преди приложението да обясни Regression, Classification, групиране и геометрични сигнали.",
    contract: "Договор на характеристиките",
    featureLabels: {
      "Maturity ratio": "Степен на зрялост",
      "Adult weight ratio": "Съотношение към тегло като възрастен",
      "Weight / height": "Тегло / височина",
      "Curve delta": "Разлика от кривата",
      "BCS deviation": "Отклонение на телесното състояние",
    },
    featureExplanations: {
      "Age progress based on the current month of growth.": "Прогрес според текущата възраст в месеци.",
      "Current weight compared with adult reference weight.": "Текущото тегло, сравнено с референтното тегло като възрастен.",
      "A simple proportionality signal using height and weight together.": "Прост пропорционален сигнал, който използва тегло и височина заедно.",
      "How far the current point is from the expected growth curve.": "Колко текущата точка се отдалечава от очакваната крива на растеж.",
      "Distance from the neutral middle of the 1–9 body condition scale.": "Разстояние от неутралната среда на скалата 1–9 за телесно състояние.",
    },
  },
  it: {
    eyebrow: "Preparazione caratteristiche",
    title: "Segnali pronti per il modello",
    description:
      "Gli input dell’utente diventano un vettore compatto di caratteristiche prima che l’app spieghi Regression, Classification, raggruppamento e segnali geometrici.",
    contract: "Contratto delle caratteristiche",
    featureLabels: {
      "Maturity ratio": "Indice di maturità",
      "Adult weight ratio": "Rapporto con peso adulto",
      "Weight / height": "Peso / altezza",
      "Curve delta": "Differenza dalla curva",
      "BCS deviation": "Deviazione condizione corporea",
    },
    featureExplanations: {
      "Age progress based on the current month of growth.": "Progresso in base al mese di crescita attuale.",
      "Current weight compared with adult reference weight.": "Peso attuale confrontato con il peso adulto di riferimento.",
      "A simple proportionality signal using height and weight together.": "Segnale proporzionale semplice che usa peso e altezza insieme.",
      "How far the current point is from the expected growth curve.": "Quanto il punto attuale si discosta dalla curva di crescita attesa.",
      "Distance from the neutral middle of the 1–9 body condition scale.": "Distanza dal centro neutro della scala corporea 1–9.",
    },
  },
};

export function FeatureVectorPanel({ prediction }: FeatureVectorPanelProps) {
  const { language } = useLanguage();
  const t = copy[language];
  const featureVector = prediction.featureEngineering;

  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20">
      <div className="rounded-[1.5rem] border border-amber-200/10 bg-black/25 p-5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/70">{t.eyebrow}</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">{t.title}</h3>
        <p className="mt-3 text-sm leading-6 text-stone-400">{t.description}</p>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {featureVector.features.map((feature) => (
            <article key={feature.id} className="min-w-0 rounded-2xl border border-stone-700 bg-black/25 p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold text-white">
                  {t.featureLabels[feature.label] ?? feature.label}
                </p>
                <p className="shrink-0 rounded-full border border-amber-200/15 px-3 py-1 text-xs text-amber-100/80">
                  {feature.value} {feature.unit ?? ""}
                </p>
              </div>
              <p className="mt-3 text-xs leading-5 text-stone-500">
                {t.featureExplanations[feature.explanation] ?? feature.explanation}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-amber-200/10 bg-amber-300/10 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-amber-200/70">{t.contract}</p>
          <p className="mt-2 break-words text-sm leading-6 text-amber-100/90">
            {featureVector.featureContract.join(" → ")}
          </p>
        </div>
      </div>
    </section>
  );
}
