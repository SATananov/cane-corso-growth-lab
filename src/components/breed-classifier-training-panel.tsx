"use client";

import {
  breedClassifierTrainingPlan,
  getClassGroupLabel,
} from "@/lib/ml/breed-classifier-training";
import { useLanguage } from "@/lib/i18n/language-context";
import type { LanguageCode } from "@/lib/i18n/languages";

const copy: Record<LanguageCode, {
  eyebrow: string;
  title: string;
  description: string;
  minimum: string;
  recommended: string;
  labelled: string;
  output: string;
  headers: string[];
  boundary: string;
}> = {
  en: {
    eyebrow: "Neural vision training plan",
    title: "Breed classifier before visual match.",
    description:
      "The first model learns whether the photo is usable; only then do later models compare the visible dog with Cane Corso visual references and breed-standard geometry.",
    minimum: "Minimum set",
    recommended: "Recommended",
    labelled: "labeled images",
    output: "Output",
    headers: ["Class", "Role", "Purpose", "Minimum", "Recommended"],
    boundary:
      "Important boundary: the neural vision model will learn visual similarity and photo suitability. It must not claim pedigree, breed purity, official registration, or veterinary status from a photo.",
  },
  bg: {
    eyebrow: "План за обучение на визуален модел",
    title: "Breed classifier преди визуалния резултат.",
    description:
      "Първият модел учи дали снимката може да се използва. Едва след това следващите модели сравняват видимото куче с Cane Corso визуални референции и еталонна геометрия.",
    minimum: "Минимален набор",
    recommended: "Препоръчително",
    labelled: "етикетирани снимки",
    output: "Изход",
    headers: ["Клас", "Роля", "Цел", "Минимум", "Препоръчително"],
    boundary:
      "Важна граница: визуалният невронен модел учи визуално сходство и пригодност на снимката. Той не трябва да твърди родословие, породна чистота, официална регистрация или ветеринарен статус по снимка.",
  },
  it: {
    eyebrow: "Piano training visivo",
    title: "Breed classifier prima del risultato visuale.",
    description:
      "Il primo modello impara se la foto è utilizzabile. Solo dopo i modelli successivi confrontano il cane visibile con riferimenti visuali Cane Corso e geometria di standard.",
    minimum: "Set minimo",
    recommended: "Consigliato",
    labelled: "immagini etichettate",
    output: "Output",
    headers: ["Classe", "Ruolo", "Scopo", "Minimo", "Consigliato"],
    boundary:
      "Limite importante: il modello neurale visivo impara somiglianza visuale e idoneità della foto. Non deve dichiarare pedigree, purezza di razza, registrazione ufficiale o stato veterinario da una foto.",
  },
};

export function BreedClassifierTrainingPanel() {
  const { language } = useLanguage();
  const t = copy[language];
  const plan = breedClassifierTrainingPlan;

  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-black/25 p-6 shadow-2xl shadow-black/20">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">
            {t.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            {t.title}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-300">
            {t.description}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[22rem]">
          <div className="rounded-2xl border border-amber-200/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
              {t.minimum}
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {plan.minimumDatasetGoal.toLocaleString()}+
            </p>
            <p className="mt-1 text-xs text-stone-400">{t.labelled}</p>
          </div>
          <div className="rounded-2xl border border-amber-200/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
              {t.recommended}
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {plan.recommendedDatasetGoal.toLocaleString()}+
            </p>
            <p className="mt-1 text-xs text-stone-400">{t.labelled}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-5">
        {plan.stages.map((stage, index) => (
          <article key={stage.id} className="rounded-2xl border border-stone-700/80 bg-[#0f0d09] p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/25 bg-amber-300/10 text-sm font-semibold text-amber-100">
              {index + 1}
            </div>
            <h3 className="mt-4 text-base font-semibold text-white">{stage.title}</h3>
            <p className="mt-3 text-sm leading-6 text-stone-400">{stage.goal}</p>
            <div className="mt-4 rounded-xl border border-amber-200/10 bg-black/20 p-3 text-xs leading-5 text-stone-400">
              <span className="font-semibold text-amber-100">{t.output}:</span>{" "}
              {stage.output}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-stone-700/80">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.2em] text-amber-200/75">
            <tr>
              {t.headers.map((header) => (
                <th key={header} className="px-4 py-4">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {plan.classes.map((item) => (
              <tr key={item.id} className="border-t border-stone-800">
                <td className="px-4 py-4 font-semibold text-white">{item.label}</td>
                <td className="px-4 py-4 text-amber-100/80">{getClassGroupLabel(item.group)}</td>
                <td className="px-4 py-4 leading-6 text-stone-400">{item.purpose}</td>
                <td className="px-4 py-4 text-stone-300">{item.minimumImages.toLocaleString()}</td>
                <td className="px-4 py-4 text-stone-300">{item.recommendedImages.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5 text-sm leading-7 text-amber-50/90">
        {t.boundary}
      </div>
    </section>
  );
}
