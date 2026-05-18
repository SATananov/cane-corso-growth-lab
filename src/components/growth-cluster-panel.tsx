"use client";

import type { GrowthPrediction } from "@/lib/growth-model";
import { useLanguage } from "@/lib/i18n/language-context";
import { localizeMlPhrase } from "@/lib/i18n/ml-phrase-copy";
import type { LanguageCode } from "@/lib/i18n/languages";

type GrowthClusterPanelProps = { prediction: GrowthPrediction };

const copy: Record<LanguageCode, {
  eyebrow: string;
  title: string;
  assigned: string;
  metrics: string[];
  alternativeDistance: string;
  clusterLabels: Record<string, string>;
  summaryFallback: string;
  geometryFallback: string;
}> = {
  en: {
    eyebrow: "Unsupervised Learning Layer",
    title: "Growth profile group",
    assigned: "Assigned group",
    metrics: ["Maturity", "Adult ratio", "BCS deviation", "Curve delta"],
    alternativeDistance: "Alternative distance",
    clusterLabels: {},
    summaryFallback: "The app compares the current point with reference growth-profile groups.",
    geometryFallback: "The group is an orientation signal based on engineered features, not a health conclusion.",
  },
  bg: {
    eyebrow: "Групиране без предварителни етикети",
    title: "Група на профила на растеж",
    assigned: "Избрана група",
    metrics: ["Зрялост", "Съотношение към възрастен", "Отклонение BCS", "Разлика от кривата"],
    alternativeDistance: "Разстояние до алтернатива",
    clusterLabels: {
      balanced: "Балансиран",
      power: "Силен растеж",
      review: "За преглед",
      puppy: "Кученце",
      adult: "Зрял профил",
    },
    summaryFallback: "Приложението сравнява текущата точка с референтни групи на профили на растеж.",
    geometryFallback: "Групата е ориентировъчен сигнал от създадените характеристики, не здравно заключение.",
  },
  it: {
    eyebrow: "Raggruppamento senza etichette",
    title: "Gruppo del profilo di crescita",
    assigned: "Gruppo assegnato",
    metrics: ["Maturità", "Rapporto adulto", "Deviazione BCS", "Differenza curva"],
    alternativeDistance: "Distanza alternativa",
    clusterLabels: {
      balanced: "Bilanciato",
      power: "Crescita potente",
      review: "Da rivedere",
      puppy: "Cucciolo",
      adult: "Profilo maturo",
    },
    summaryFallback: "L’app confronta il punto attuale con gruppi di profili di crescita di riferimento.",
    geometryFallback: "Il gruppo è un segnale orientativo basato sulle caratteristiche, non una conclusione sanitaria.",
  },
};

function localClusterLabel(label: string, labels: Record<string, string>, language: LanguageCode) {
  const normalized = label.toLowerCase();
  for (const [key, value] of Object.entries(labels)) {
    if (normalized.includes(key)) return value;
  }
  return localizeMlPhrase(label, language);
}

export function GrowthClusterPanel({ prediction }: GrowthClusterPanelProps) {
  const { language } = useLanguage();
  const t = copy[language];
  const cluster = prediction.clusterAnalysis;

  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20">
      <div className="rounded-[1.5rem] border border-amber-200/10 bg-black/25 p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-amber-300/70">{t.eyebrow}</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">{t.title}</h3>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-400">
              {language === "en" ? cluster.summary : t.summaryFallback}
            </p>
          </div>
          <div className="rounded-2xl border border-amber-200/15 bg-amber-300/10 px-4 py-3 text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-200/70">{t.assigned}</p>
            <p className="mt-1 text-lg font-semibold text-amber-100">
              {localClusterLabel(cluster.assignedCluster.shortLabel, t.clusterLabels, language)}
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {[
            [t.metrics[0], cluster.featurePoint.maturityRatio],
            [t.metrics[1], cluster.featurePoint.adultWeightRatio],
            [t.metrics[2], cluster.featurePoint.bodyConditionDeviation],
            [t.metrics[3], cluster.featurePoint.curveDeltaNormalized],
          ].map(([label, value]) => (
            <div key={label} className="min-w-0 rounded-2xl border border-stone-700 bg-black/25 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-stone-500">{label}</p>
              <p className="mt-2 text-xl font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {cluster.nearestAlternatives.map((item) => (
            <div key={item.profile.id} className="rounded-2xl border border-stone-700 bg-black/20 p-4">
              <p className="text-sm font-semibold text-white">{localClusterLabel(item.profile.label, t.clusterLabels, language)}</p>
              <p className="mt-2 text-xs leading-5 text-stone-500">
                {t.alternativeDistance}: {item.distance}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-5 rounded-2xl border border-amber-200/10 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100/85">
          {localizeMlPhrase(cluster.geometryNote, language)}
        </p>
      </div>
    </section>
  );
}
