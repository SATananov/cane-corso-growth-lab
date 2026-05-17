"use client";

import {
  visualImageAcquisitionWorkflow,
  visualImageCandidateSources,
  visualImageSourceReviewChecklist,
  visualImageTargetClasses,
} from "@/lib/ml/image-source-acquisition";
import { useLanguage } from "@/lib/i18n/language-context";

type PanelCopy = {
  eyebrow: string;
  title: string;
  description: string;
  sourceTitle: string;
  classTitle: string;
  workflowTitle: string;
  checklistTitle: string;
  headers: {
    source: string;
    purpose: string;
    license: string;
    repoPolicy: string;
    class: string;
    min: string;
    recommended: string;
  };
  note: string;
};

const copy: Record<"en" | "bg" | "it", PanelCopy> = {
  en: {
    eyebrow: "Image source plan",
    title: "Where the visual model will learn from — without unsafe image scraping.",
    description:
      "The future neural model needs licensed or permitted image sources, similar-breed negative classes and rejected-photo examples. This plan documents candidate sources and keeps raw images out of the Git repository.",
    sourceTitle: "Candidate sources",
    classTitle: "Target training classes",
    workflowTitle: "Acquisition workflow",
    checklistTitle: "Source review checklist",
    headers: { source: "Source", purpose: "Best use", license: "License action", repoPolicy: "Repository policy", class: "Class", min: "Prototype min.", recommended: "Recommended" },
    note:
      "This is a dataset acquisition plan, not a download step. Images should be downloaded only after license review and should usually stay outside Git.",
  },
  bg: {
    eyebrow: "План за източници на снимки",
    title: "Откъде бъдещият визуален модел ще се учи — без рисково теглене на снимки.",
    description:
      "Бъдещата невронна мрежа има нужда от разрешени източници, сходни породи за сравнение и примери за отхвърлени снимки. Този план описва кандидат източниците и пази raw снимките извън Git хранилището.",
    sourceTitle: "Кандидат източници",
    classTitle: "Класове за обучение",
    workflowTitle: "Процес за събиране",
    checklistTitle: "Проверка преди използване",
    headers: { source: "Източник", purpose: "Най-добра употреба", license: "Проверка на права", repoPolicy: "Политика за Git", class: "Клас", min: "Минимум", recommended: "Препоръчано" },
    note:
      "Това е план за събиране на набор от данни, не стъпка за автоматично сваляне. Снимки се използват само след проверка на права и обикновено не се записват в Git.",
  },
  it: {
    eyebrow: "Piano fonti immagini",
    title: "Da dove il modello visivo imparerà — senza scraping rischioso.",
    description:
      "La futura rete neurale richiede fonti consentite, razze simili per confronto e foto rifiutate come esempi. Questo piano documenta le fonti candidate e tiene le immagini raw fuori da Git.",
    sourceTitle: "Fonti candidate",
    classTitle: "Classi di training",
    workflowTitle: "Workflow di acquisizione",
    checklistTitle: "Checklist fonte",
    headers: { source: "Fonte", purpose: "Uso migliore", license: "Azione licenza", repoPolicy: "Policy repository", class: "Classe", min: "Min. prototype", recommended: "Raccomandato" },
    note:
      "Questo è un piano di acquisizione dataset, non un download automatico. Le immagini vanno scaricate solo dopo verifica della licenza e di solito restano fuori da Git.",
  },
};

export function ImageSourceAcquisitionPanel() {
  const { language } = useLanguage();
  const text = copy[language];

  return (
    <section className="grid gap-6">
      <div className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
        <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">{text.eyebrow}</p>
        <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-5xl">{text.title}</h2>
        <p className="mt-4 max-w-4xl text-base leading-7 text-stone-400">{text.description}</p>
        <div className="mt-5 rounded-2xl border border-amber-200/10 bg-amber-300/10 p-4 text-sm leading-6 text-amber-50">{text.note}</div>
      </div>

      <div className="rounded-[2rem] border border-amber-200/10 bg-black/25 p-6">
        <h3 className="text-2xl font-semibold text-white">{text.sourceTitle}</h3>
        <div className="mt-5 overflow-x-auto rounded-3xl border border-stone-700">
          <table className="min-w-full divide-y divide-stone-700 text-left text-sm">
            <thead className="bg-black/30 text-xs uppercase tracking-[0.18em] text-stone-500">
              <tr>
                <th className="px-4 py-3">{text.headers.source}</th>
                <th className="px-4 py-3">{text.headers.purpose}</th>
                <th className="px-4 py-3">{text.headers.license}</th>
                <th className="px-4 py-3">{text.headers.repoPolicy}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800 bg-black/15">
              {visualImageCandidateSources.map((source) => (
                <tr key={source.id}>
                  <td className="px-4 py-4 align-top">
                    <p className="font-semibold text-white">{source.name}</p>
                    <p className="mt-1 font-mono text-xs text-amber-100/80">{source.id}</p>
                  </td>
                  <td className="px-4 py-4 align-top text-stone-300">
                    <ul className="grid gap-1">
                      {source.bestUse.map((item) => <li key={item}>• {item}</li>)}
                    </ul>
                  </td>
                  <td className="px-4 py-4 align-top text-stone-400">{source.licenseAction}</td>
                  <td className="px-4 py-4 align-top text-stone-400">{source.repoPolicy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
          <h3 className="text-2xl font-semibold text-white">{text.classTitle}</h3>
          <div className="mt-5 overflow-x-auto rounded-3xl border border-stone-700">
            <table className="min-w-full divide-y divide-stone-700 text-left text-sm">
              <thead className="bg-black/30 text-xs uppercase tracking-[0.18em] text-stone-500">
                <tr><th className="px-4 py-3">{text.headers.class}</th><th className="px-4 py-3">{text.headers.purpose}</th><th className="px-4 py-3">{text.headers.min}</th><th className="px-4 py-3">{text.headers.recommended}</th></tr>
              </thead>
              <tbody className="divide-y divide-stone-800 bg-black/15">
                {visualImageTargetClasses.map((item) => (
                  <tr key={item.label}>
                    <td className="px-4 py-4 font-mono text-xs text-amber-100">{item.label}</td>
                    <td className="px-4 py-4 text-stone-300">{item.purpose}</td>
                    <td className="px-4 py-4 text-stone-400">{item.minimumPrototypeImages}</td>
                    <td className="px-4 py-4 text-stone-400">{item.recommendedImages}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
            <h3 className="text-2xl font-semibold text-white">{text.workflowTitle}</h3>
            <div className="mt-5 grid gap-3">
              {visualImageAcquisitionWorkflow.map((step, index) => (
                <div key={step} className="flex gap-3 rounded-2xl border border-stone-700 bg-black/20 p-4">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-amber-300 text-sm font-bold text-stone-950">{index + 1}</div>
                  <p className="text-sm leading-6 text-stone-300">{step}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-amber-200/10 bg-black/25 p-6">
            <h3 className="text-2xl font-semibold text-white">{text.checklistTitle}</h3>
            <ul className="mt-5 grid gap-3 text-sm leading-6 text-stone-300">
              {visualImageSourceReviewChecklist.map((item) => <li key={item} className="rounded-2xl border border-stone-700 bg-white/[0.025] p-4">{item}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
