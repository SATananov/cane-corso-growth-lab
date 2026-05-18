"use client";

import type { GrowthPrediction } from "@/lib/growth-model";
import { useLanguage } from "@/lib/i18n/language-context";
import { localizeMlPhrase } from "@/lib/i18n/ml-phrase-copy";
import type { LanguageCode } from "@/lib/i18n/languages";

type PcaGrowthMapProps = { prediction: GrowthPrediction };

const copy: Record<LanguageCode, {
  eyebrow: string;
  title: string;
  description: string;
  nearest: string;
  fallbackArea: string;
}> = {
  en: {
    eyebrow: "Dimensionality Reduction",
    title: "PCA-style growth space",
    description:
      "The projection turns several growth features into a two-dimensional visual map so the current dog can be compared with reference areas.",
    nearest: "Nearest area",
    fallbackArea: "Reference area",
  },
  bg: {
    eyebrow: "Намаляване на размерността",
    title: "PCA карта на растежа",
    description:
      "Проекцията превръща няколко характеристики на растежа в двуизмерна карта, за да може текущото куче да се сравни с референтни зони.",
    nearest: "Най-близка зона",
    fallbackArea: "Референтна зона",
  },
  it: {
    eyebrow: "Riduzione dimensionalità",
    title: "Mappa crescita in stile PCA",
    description:
      "La proiezione trasforma diverse caratteristiche di crescita in una mappa 2D per confrontare il cane attuale con aree di riferimento.",
    nearest: "Area più vicina",
    fallbackArea: "Area di riferimento",
  },
};

export function PcaGrowthMap({ prediction }: PcaGrowthMapProps) {
  const { language } = useLanguage();
  const t = copy[language];
  const projection = prediction.pcaProjection;

  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20">
      <div className="rounded-[1.5rem] border border-amber-200/10 bg-black/25 p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-amber-300/70">{t.eyebrow}</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">{t.title}</h3>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-400">
              {localizeMlPhrase(projection.interpretation, language)}
            </p>
          </div>
          <div className="rounded-2xl border border-amber-200/15 bg-amber-300/10 px-4 py-3 text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-200/70">{t.nearest}</p>
            <p className="mt-1 text-lg font-semibold text-amber-100">
              {projection.nearestReference.label ? localizeMlPhrase(projection.nearestReference.label, language) : t.fallbackArea}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-stone-700 bg-[#11100d] p-4">
          <svg viewBox="0 0 100 100" role="img" aria-label="PCA growth space" className="h-80 w-full">
            <line x1="8" y1="50" x2="94" y2="50" stroke="rgba(245, 158, 11, 0.25)" strokeWidth="0.6" />
            <line x1="50" y1="6" x2="50" y2="92" stroke="rgba(245, 158, 11, 0.25)" strokeWidth="0.6" />
            <rect x="8" y="6" width="86" height="86" fill="none" stroke="rgba(255,255,255,0.08)" rx="4" />
            {projection.referencePoints.map((point) => {
              const x = Math.min(Math.max(((point.pc1 + 1.2) / 2.4) * 100, 8), 94);
              const y = 100 - Math.min(Math.max(((point.pc2 + 1.2) / 2.4) * 100, 8), 94);
              return (
                <g key={point.id}>
                  <circle cx={x} cy={y} r={point.type === "cluster" ? 2.2 : 1.6} fill="rgba(214, 180, 90, 0.45)" />
                  <text x={x + 2.5} y={y - 2} fontSize="3" fill="rgba(231, 229, 228, 0.55)">{localizeMlPhrase(point.label, language)}</text>
                </g>
              );
            })}
            <circle cx={projection.normalizedX} cy={projection.normalizedY} r="3.4" fill="#fcd34d" />
            <circle cx={projection.normalizedX} cy={projection.normalizedY} r="6" fill="none" stroke="rgba(252, 211, 77, 0.35)" strokeWidth="1" />
            <text x={projection.normalizedX + 3.5} y={projection.normalizedY + 1.5} fontSize="3.4" fill="#fde68a">{prediction.dogName}</text>
          </svg>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-stone-700 bg-black/25 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-stone-500">PC1</p>
            <p className="mt-2 text-xl font-semibold text-white">{projection.pc1}</p>
          </div>
          <div className="rounded-2xl border border-stone-700 bg-black/25 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-stone-500">PC2</p>
            <p className="mt-2 text-xl font-semibold text-white">{projection.pc2}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
