"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import type { LanguageCode } from "@/lib/i18n/languages";
import { localizeMlPhrase } from "@/lib/i18n/ml-phrase-copy";
import { growthClusterProfiles } from "@/lib/ml/growth-clustering";

const copy: Record<LanguageCode, { eyebrow: string; title: string; description: string }> = {
  en: {
    eyebrow: "Growth Profile Groups",
    title: "Similar growth profiles become groups.",
    description:
      "Unsupervised learning is represented as a growth-profile grouping layer. The app compares a dog point to reference centroids and explains the closest group without turning it into a diagnosis.",
  },
  bg: {
    eyebrow: "Групи на профили за растеж",
    title: "Сходните профили на растеж стават групи.",
    description:
      "Unsupervised learning е показан като слой за групиране на профили. Приложението сравнява точката на кучето с референтни центроиди и обяснява най-близката група без да я превръща в диагноза.",
  },
  it: {
    eyebrow: "Gruppi di profilo crescita",
    title: "I profili di crescita simili diventano gruppi.",
    description:
      "L’apprendimento non supervisionato è rappresentato come livello di raggruppamento dei profili. L’app confronta il punto del cane con centroidi di riferimento e spiega il gruppo più vicino senza trasformarlo in diagnosi.",
  },
};

export function GrowthClusterOverview() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="usg-readable-card rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
      <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">{t.eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">{t.title}</h2>
      <p className="mt-4 max-w-3xl text-base leading-7 text-stone-400">{t.description}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {growthClusterProfiles.map((profile) => (
          <article key={profile.id} className="rounded-3xl border border-stone-700 bg-black/25 p-5">
            <div className="mb-4 inline-flex rounded-full border border-amber-200/15 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-100">
              {localizeMlPhrase(profile.shortLabel, language)}
            </div>
            <h3 className="text-lg font-semibold text-white">{localizeMlPhrase(profile.label, language)}</h3>
            <p className="mt-3 text-sm leading-6 text-stone-400">{localizeMlPhrase(profile.description, language)}</p>
            <p className="mt-4 text-xs leading-5 text-stone-500">{localizeMlPhrase(profile.ownerMeaning, language)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
