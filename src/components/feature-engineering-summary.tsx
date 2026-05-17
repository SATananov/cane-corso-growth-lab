"use client";

import { featureDefinitions } from "@/lib/ml/feature-engineering";
import { useLanguage } from "@/lib/i18n/language-context";
import { localizeMlPhrase } from "@/lib/i18n/ml-phrase-copy";
import type { LanguageCode } from "@/lib/i18n/languages";

const copy: Record<LanguageCode, { eyebrow: string; title: string; description: string }> = {
  en: {
    eyebrow: "Feature Engineering",
    title: "Raw inputs become model features.",
    description: "The data page explains not only which datasets are used, but also how simple owner-friendly fields become features for the ML layer.",
  },
  bg: {
    eyebrow: "Подготовка на признаци",
    title: "Въведените данни се превръщат в сигнали за модела.",
    description: "Страницата с данни показва не само кои набори се използват, а и как разбираемите за собственика полета се превръщат в признаци за ML слоя.",
  },
  it: {
    eyebrow: "Preparazione delle feature",
    title: "Gli input grezzi diventano segnali per il modello.",
    description: "La pagina dati spiega non solo quali dataset sono usati, ma anche come i campi semplici per il proprietario diventano feature per il livello ML.",
  },
};

export function FeatureEngineeringSummary() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
      <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">{t.eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">{t.title}</h2>
      <p className="mt-4 max-w-3xl text-base leading-7 text-stone-400">{t.description}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {featureDefinitions.map((feature) => (
          <article key={feature.id} className="rounded-3xl border border-stone-700 bg-black/25 p-5">
            <h3 className="text-lg font-semibold text-white">{localizeMlPhrase(feature.label, language)}</h3>
            <p className="mt-3 text-sm leading-6 text-stone-400">{localizeMlPhrase(feature.explanation, language)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
