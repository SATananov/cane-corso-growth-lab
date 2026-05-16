"use client";

import {
  getVisionReadinessStatusLabel,
  visionDatasetReadinessSummary,
} from "@/lib/ml/vision-dataset-readiness";
import { useLanguage } from "@/lib/i18n/language-context";
import type { LanguageCode } from "@/lib/i18n/languages";

const copy: Record<LanguageCode, {
  eyebrow: string;
  title: string;
  description: string;
  status: string;
  labels: string;
  goal: string;
  now: string;
  next: string;
  headers: string[];
  before: string;
  optional: string;
  boundary: string;
}> = {
  en: {
    eyebrow: "Dataset readiness",
    title: "The neural model learns only after the image set is ready.",
    description:
      "This panel keeps the project honest: the visual ML pipeline is designed, but real training starts only after image sources, labels and validation splits are prepared.",
    status: "Status",
    labels: "Sample labels",
    goal: "Prototype goal",
    now: "Now",
    next: "Next",
    headers: ["Training gate", "Required", "Why it matters"],
    before: "Before training",
    optional: "Optional",
    boundary:
      "Professional rule: no neural breed classifier should be presented as trained until enough licensed images, balanced labels and holdout evaluation results exist.",
  },
  bg: {
    eyebrow: "Готовност на dataset-а",
    title: "Невронният модел учи само след готов image set.",
    description:
      "Този панел пази проекта честен: visual ML pipeline е проектиран, но реално обучение започва само след подготвени източници, labels и validation split.",
    status: "Статус",
    labels: "Примерни labels",
    goal: "Цел за prototype",
    now: "Сега",
    next: "Следващо",
    headers: ["Training gate", "Изискване", "Защо е важно"],
    before: "Преди обучение",
    optional: "По избор",
    boundary:
      "Професионално правило: не трябва да представяме neural breed classifier като обучен, докато няма достатъчно лицензирани снимки, балансирани labels и holdout evaluation резултати.",
  },
  it: {
    eyebrow: "Prontezza dataset",
    title: "Il modello neurale impara solo quando l’image set è pronto.",
    description:
      "Questo pannello mantiene il progetto onesto: la pipeline visual ML è progettata, ma il training reale inizia solo dopo fonti, label e split di validazione preparati.",
    status: "Stato",
    labels: "Label di esempio",
    goal: "Obiettivo prototype",
    now: "Ora",
    next: "Prossimo",
    headers: ["Training gate", "Richiesto", "Perché conta"],
    before: "Prima del training",
    optional: "Opzionale",
    boundary:
      "Regola professionale: nessun neural breed classifier deve essere presentato come addestrato finché non esistono immagini autorizzate, label bilanciate e risultati holdout.",
  },
};

export function VisionDatasetReadinessPanel() {
  const { language } = useLanguage();
  const t = copy[language];
  const summary = visionDatasetReadinessSummary;

  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-black/25 p-6 shadow-2xl shadow-black/20">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">{t.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">{t.title}</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-300">{t.description}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[30rem]">
          <div className="rounded-2xl border border-amber-200/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{t.status}</p>
            <p className="mt-2 text-lg font-semibold text-amber-100">{getVisionReadinessStatusLabel(summary.currentStatus)}</p>
          </div>
          <div className="rounded-2xl border border-amber-200/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{t.labels}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{summary.labeledRowsInSample}</p>
          </div>
          <div className="rounded-2xl border border-amber-200/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{t.goal}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{summary.imageFilesRequiredForPrototype.toLocaleString()}+</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-5">
        {summary.phases.map((phase, index) => (
          <article key={phase.id} className="rounded-2xl border border-stone-700/80 bg-[#0f0d09] p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/25 bg-amber-300/10 text-sm font-semibold text-amber-100">{index + 1}</div>
              <span className="rounded-full border border-amber-200/10 bg-white/[0.03] px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-stone-400">{getVisionReadinessStatusLabel(phase.status)}</span>
            </div>
            <h3 className="mt-4 text-base font-semibold text-white">{phase.title}</h3>
            <p className="mt-3 text-sm leading-6 text-stone-400">{phase.goal}</p>
            <div className="mt-4 space-y-3 rounded-xl border border-amber-200/10 bg-black/20 p-3 text-xs leading-5 text-stone-400">
              <p><span className="font-semibold text-amber-100">{t.now}:</span> {phase.currentEvidence}</p>
              <p><span className="font-semibold text-amber-100">{t.next}:</span> {phase.nextAction}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-stone-700/80">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.2em] text-amber-200/75">
            <tr>
              {t.headers.map((header) => (<th key={header} className="px-4 py-4">{header}</th>))}
            </tr>
          </thead>
          <tbody>
            {summary.gates.map((gate) => (
              <tr key={gate.id} className="border-t border-stone-800">
                <td className="px-4 py-4 font-semibold text-white">{gate.label}</td>
                <td className="px-4 py-4 text-amber-100/80">{gate.requiredBeforeTraining ? t.before : t.optional}</td>
                <td className="px-4 py-4 leading-6 text-stone-400">{gate.explanation}</td>
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
