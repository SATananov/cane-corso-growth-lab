"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import type { LanguageCode } from "@/lib/i18n/languages";
import { localizeMlPhrase } from "@/lib/i18n/ml-phrase-copy";
import {
  photoReadinessClasses,
  photoReadinessModelPrinciples,
  photoReadinessTrainingArtifacts,
  photoReadinessTrainingStages,
} from "@/lib/ml/photo-readiness-model";

const copy: Record<LanguageCode, {
  eyebrow: string;
  title: string;
  description: string;
  badge: string;
  flow: string;
  artifacts: string;
  output: string;
  safety: string;
  status: Record<string, string>;
}> = {
  en: {
    eyebrow: "Photo readiness model",
    title: "Teach the model when a photo is suitable for comparison.",
    description:
      "This is the first neural-vision training step. Before the app compares a dog with Cane Corso reference geometry, the model must learn whether the photo is accepted, limited or rejected for visual review.",
    badge: "Step 27 · training notebook",
    flow: "Training flow",
    artifacts: "Notebook artifacts",
    output: "Output",
    safety: "Safety principles",
    status: { ready_for_notebook: "Notebook-ready", data_required: "Needs labelled images", planned: "Planned" },
  },
  bg: {
    eyebrow: "Модел за готовност на снимка",
    title: "Моделът учи кога снимката е подходяща за сравнение.",
    description:
      "Това е първата neural-vision стъпка за обучение. Преди приложението да сравнява куче с Cane Corso еталонна геометрия, моделът трябва да научи дали снимката е подходяща, ограничена или неподходяща за визуален преглед.",
    badge: "Step 27 · training notebook",
    flow: "Процес на обучение",
    artifacts: "Notebook артефакти",
    output: "Изход",
    safety: "Принципи за безопасност",
    status: { ready_for_notebook: "Готово за notebook", data_required: "Нужни са етикетирани снимки", planned: "Планирано" },
  },
  it: {
    eyebrow: "Modello prontezza foto",
    title: "Il modello impara quando una foto è adatta al confronto.",
    description:
      "Questo è il primo passo neural-vision. Prima che l’app confronti un cane con la geometria Cane Corso di riferimento, il modello deve imparare se la foto è accettata, limitata o rifiutata per la revisione visuale.",
    badge: "Step 27 · training notebook",
    flow: "Flusso training",
    artifacts: "Artefatti notebook",
    output: "Output",
    safety: "Principi di sicurezza",
    status: { ready_for_notebook: "Pronto per notebook", data_required: "Richiede immagini etichettate", planned: "Pianificato" },
  },
};

export function PhotoReadinessModelPanel() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="usg-readable-card rounded-[2rem] border border-amber-200/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-amber-300/70">{t.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">{t.title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-300">{t.description}</p>
        </div>
        <div className="rounded-full border border-amber-200/20 px-4 py-2 text-sm font-semibold text-amber-100">{t.badge}</div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {photoReadinessClasses.map((item) => (
          <article key={item.id} className="rounded-3xl border border-amber-200/10 bg-black/25 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-amber-300/70">{localizeMlPhrase(item.label, language)}</p>
            <p className="mt-3 text-sm leading-6 text-stone-300">{localizeMlPhrase(item.meaning, language)}</p>
            <p className="mt-3 text-sm leading-6 text-amber-100/90">{localizeMlPhrase(item.comparisonPolicy, language)}</p>
            <ul className="mt-4 space-y-2 text-sm text-stone-400">
              {item.examples.map((example) => (
                <li key={example} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" /><span>{localizeMlPhrase(example, language)}</span></li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-amber-200/10 bg-black/20 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{t.flow}</p>
          <div className="mt-4 space-y-3">
            {photoReadinessTrainingStages.map((stage) => (
              <div key={stage.title} className="rounded-2xl border border-stone-700 bg-white/[0.03] p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="font-semibold text-white">{localizeMlPhrase(stage.title, language)}</h3>
                  <span className="rounded-full border border-amber-200/15 px-3 py-1 text-xs text-amber-100/80">{t.status[stage.status] ?? stage.status}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-stone-400">{localizeMlPhrase(stage.purpose, language)}</p>
                <p className="mt-2 text-sm text-amber-100/90">{t.output}: {localizeMlPhrase(stage.output, language)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-amber-200/10 bg-black/20 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{t.artifacts}</p>
          <div className="mt-4 space-y-3">
            {photoReadinessTrainingArtifacts.map((artifact) => (
              <div key={artifact.path} className="rounded-2xl border border-stone-700 bg-white/[0.03] p-4">
                <p className="font-semibold text-white">{localizeMlPhrase(artifact.label, language)}</p>
                <code className="mt-2 block break-words rounded-xl border border-stone-800 bg-black/30 px-3 py-2 text-xs text-amber-100/80">{artifact.path}</code>
                <p className="mt-2 text-sm leading-6 text-stone-400">{localizeMlPhrase(artifact.purpose, language)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-amber-300/15 bg-amber-300/10 p-5">
        <p className="text-sm font-semibold text-amber-100">{t.safety}</p>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {photoReadinessModelPrinciples.map((principle) => (
            <div key={principle} className="flex gap-2 text-sm leading-6 text-amber-50/85"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-200" /><span>{localizeMlPhrase(principle, language)}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}
