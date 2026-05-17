"use client";

import { courseCoverageItems, finalRoadmap } from "@/lib/ml/course-coverage";
import { useLanguage } from "@/lib/i18n/language-context";
import type { LanguageCode } from "@/lib/i18n/languages";

const toneByStatus = {
  implemented: "bg-emerald-300/10 text-emerald-100 border-emerald-200/20",
  partial: "bg-amber-300/10 text-amber-100 border-amber-200/20",
  planned: "bg-stone-300/10 text-stone-200 border-stone-200/20",
};

const copy: Record<LanguageCode, {
  eyebrow: string;
  title: string;
  description: string;
  files: string;
  next: string;
  roadmap: string;
  status: Record<string, string>;
  roadmapFallback: string[];
}> = {
  en: {
    eyebrow: "Project methodology",
    title: "Machine learning topics mapped to app features.",
    description: "This page keeps the review layer separate from the user layer. A user can run the growth check, while a reviewer can see how regression, classification, clustering, feature engineering, PCA and tracking are demonstrated inside the project.",
    files: "Implementation files",
    next: "Next improvement",
    roadmap: "Final project roadmap",
    status: { implemented: "Implemented", partial: "Partial", planned: "Planned" },
    roadmapFallback: finalRoadmap,
  },
  bg: {
    eyebrow: "Методология на проекта",
    title: "Темите по машинно обучение са свързани с реални функции в приложението.",
    description: "Тази страница разделя потребителския слой от проектния слой. Потребителят може да използва проверката, а проверяващият вижда как regression, classification, clustering, feature engineering, PCA и experiment tracking са демонстрирани в проекта.",
    files: "Файлове за реализация",
    next: "Следващо подобрение",
    roadmap: "Финална пътна карта",
    status: { implemented: "Реализирано", partial: "Частично", planned: "Планирано" },
    roadmapFallback: [
      "Финален езиков преглед на видимия UI",
      "Първи малък лицензиран demo image set",
      "Обучение на photo readiness модел",
      "Обучение на визуален classifier за Cane Corso и сходни породи",
      "Финален отчет и deployment линк",
    ],
  },
  it: {
    eyebrow: "Metodologia del progetto",
    title: "Gli argomenti ML sono collegati a funzioni reali dell’app.",
    description: "Questa pagina separa il livello utente dal livello di revisione del progetto. L’utente può eseguire il controllo crescita, mentre il revisore vede come regression, classification, clustering, feature engineering, PCA e tracking sono dimostrati nel progetto.",
    files: "File di implementazione",
    next: "Prossimo miglioramento",
    roadmap: "Roadmap finale",
    status: { implemented: "Implementato", partial: "Parziale", planned: "Pianificato" },
    roadmapFallback: [
      "Revisione linguistica finale dell’interfaccia visibile",
      "Primo demo image set piccolo e autorizzato",
      "Addestramento del modello photo readiness",
      "Addestramento del classifier visivo Cane Corso e razze simili",
      "Report finale e link di deployment",
    ],
  },
};

export function CourseCoverageDashboard() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
        <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">{t.eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">{t.title}</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-stone-400">{t.description}</p>
      </section>

      <section className="grid gap-4">
        {courseCoverageItems.map((item) => (
          <article key={item.module} className="rounded-[2rem] border border-stone-700 bg-black/25 p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-white">{item.module}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.appEvidence.map((evidence) => (
                    <span key={evidence} className="rounded-full border border-amber-200/15 bg-white/[0.04] px-3 py-1 text-xs text-amber-100/80">{evidence}</span>
                  ))}
                </div>
              </div>
              <span className={`w-fit rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${toneByStatus[item.covered]}`}>{t.status[item.covered] ?? item.covered}</span>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-stone-700 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-stone-500">{t.files}</p>
                <ul className="mt-3 grid gap-2 text-sm leading-6 text-stone-300">
                  {item.projectFiles.map((file) => (<li key={file}>• {file}</li>))}
                </ul>
              </div>
              <div className="rounded-2xl border border-stone-700 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-stone-500">{t.next}</p>
                <p className="mt-3 text-sm leading-6 text-stone-300">{item.nextImprovement}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-[2rem] border border-amber-200/10 bg-amber-300/10 p-6">
        <p className="text-sm font-semibold text-amber-100">{t.roadmap}</p>
        <ul className="mt-4 grid gap-3 text-sm leading-6 text-amber-100/80 md:grid-cols-2">
          {(language === "en" ? finalRoadmap : t.roadmapFallback).map((item) => (<li key={item}>• {item}</li>))}
        </ul>
      </section>
    </div>
  );
}
