"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import type { LanguageCode } from "@/lib/i18n/languages";
import { localizeMlPhrase } from "@/lib/i18n/ml-phrase-copy";
import { pcaReferencePoints } from "@/lib/ml/dimensionality-reduction";

const copy: Record<LanguageCode, { eyebrow: string; title: string; description: string; pc1: string; pc2: string }> = {
  en: {
    eyebrow: "Dimensionality Reduction",
    title: "PCA turns many features into one visual map.",
    description:
      "The PCA-style projection explains dimensionality reduction: several engineered features are compressed into a 2D growth space that can be shown directly in the browser.",
    pc1: "PC1",
    pc2: "PC2",
  },
  bg: {
    eyebrow: "Намаляване на размерността",
    title: "PCA превръща много характеристики в една визуална карта.",
    description:
      "PCA-style проекцията обяснява намаляване на размерността: няколко създадени характеристики се компресират в 2D пространство на растежа, което може да се покаже директно в браузъра.",
    pc1: "PC1",
    pc2: "PC2",
  },
  it: {
    eyebrow: "Riduzione dimensionalità",
    title: "PCA trasforma molte feature in una mappa visuale.",
    description:
      "La proiezione in stile PCA spiega la riduzione della dimensionalità: diverse feature create vengono compresse in uno spazio crescita 2D mostrabile direttamente nel browser.",
    pc1: "PC1",
    pc2: "PC2",
  },
};

export function PcaExperimentPanel() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="usg-readable-card rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
      <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">{t.eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">{t.title}</h2>
      <p className="mt-4 max-w-3xl text-base leading-7 text-stone-400">{t.description}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pcaReferencePoints.map((point) => (
          <article key={point.id} className="rounded-3xl border border-stone-700 bg-black/25 p-5">
            <div className="mb-4 inline-flex rounded-full border border-amber-200/15 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-100">
              {point.type === "reference" ? (language === "bg" ? "Референция" : language === "it" ? "Riferimento" : "Reference") : (language === "bg" ? "Група" : language === "it" ? "Gruppo" : "Cluster")}
            </div>
            <h3 className="text-lg font-semibold text-white">{localizeMlPhrase(point.label, language)}</h3>
            <p className="mt-3 text-sm leading-6 text-stone-400">
              {t.pc1}: {point.pc1} · {t.pc2}: {point.pc2}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
