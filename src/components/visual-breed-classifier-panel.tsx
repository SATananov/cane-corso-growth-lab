"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import type { LanguageCode } from "@/lib/i18n/languages";
import { localizeMlPhrase } from "@/lib/i18n/ml-phrase-copy";
import {
  getVisualBreedGroupLabel,
  visualBreedArtifacts,
  visualBreedClasses,
  visualBreedClassifierPrinciples,
  visualBreedEvidenceWeights,
  visualBreedTrainingStages,
} from "@/lib/ml/visual-breed-classifier";

const copy: Record<LanguageCode, {
  eyebrow: string;
  title: string;
  description: string;
  minimum: string;
  recommended: string;
  labelledImages: string;
  input: string;
  output: string;
  table: string[];
  futureEvidence: string;
  trainingArtifacts: string;
  safety: string;
}> = {
  en: {
    eyebrow: "Visual breed classifier",
    title: "Teach the model Cane Corso vs similar breeds.",
    description:
      "This layer prepares the neural vision classifier that will learn Cane Corso visual type against similar molosser and large-dog classes. It comes after the photo readiness gate and before the final visual match score.",
    minimum: "Minimum",
    recommended: "Recommended",
    labelledImages: "labelled images",
    input: "Input",
    output: "Output",
    table: ["Class", "Group", "Model role", "Why it matters", "Images"],
    futureEvidence: "Future match evidence",
    trainingArtifacts: "Training artifacts",
    safety: "Safety principles",
  },
  bg: {
    eyebrow: "Визуален classifier за порода",
    title: "Моделът учи Cane Corso срещу сходни породи.",
    description:
      "Този слой подготвя бъдещия vision classifier, който ще различава Cane Corso визуален тип от сходни молосоидни и големи породи. Той идва след проверката на снимката и преди финалната оценка за визуално сходство.",
    minimum: "Минимум",
    recommended: "Препоръчително",
    labelledImages: "етикетирани снимки",
    input: "Вход",
    output: "Изход",
    table: ["Клас", "Група", "Роля в модела", "Защо е важно", "Снимки"],
    futureEvidence: "Бъдещи доказателства за сходство",
    trainingArtifacts: "Артефакти за обучение",
    safety: "Принципи за безопасност",
  },
  it: {
    eyebrow: "Classifier visuale di razza",
    title: "Il modello impara Cane Corso vs razze simili.",
    description:
      "Questo livello prepara il futuro classifier visuale che distinguerà il tipo Cane Corso da classi molossoidi e cani grandi simili. Arriva dopo il controllo foto e prima del punteggio finale di somiglianza visuale.",
    minimum: "Minimo",
    recommended: "Consigliato",
    labelledImages: "immagini etichettate",
    input: "Input",
    output: "Output",
    table: ["Classe", "Gruppo", "Ruolo modello", "Perché conta", "Immagini"],
    futureEvidence: "Evidenze future di match",
    trainingArtifacts: "Artefatti di training",
    safety: "Principi di sicurezza",
  },
};

const readinessLabel: Record<LanguageCode, Record<string, string>> = {
  en: {
    notebook_ready: "Notebook-ready",
    waiting_for_dataset: "Needs image dataset",
    planned: "Planned",
  },
  bg: {
    notebook_ready: "Готово за notebook",
    waiting_for_dataset: "Нужен е набор от снимки",
    planned: "Планирано",
  },
  it: {
    notebook_ready: "Pronto per notebook",
    waiting_for_dataset: "Richiede dataset immagini",
    planned: "Pianificato",
  },
};

export function VisualBreedClassifierPanel() {
  const { language } = useLanguage();
  const t = copy[language];
  const minimumTotal = visualBreedClasses.reduce((total, item) => total + item.minimumImages, 0);
  const recommendedTotal = visualBreedClasses.reduce((total, item) => total + item.recommendedImages, 0);

  return (
    <section className="usg-readable-card rounded-[2rem] border border-amber-200/10 bg-black/25 p-6 shadow-2xl shadow-black/20">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.28em] text-amber-300/70">{t.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">{t.title}</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-300">{t.description}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[22rem]">
          <div className="rounded-2xl border border-amber-200/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{t.minimum}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{minimumTotal.toLocaleString()}+</p>
            <p className="mt-1 text-xs text-stone-400">{t.labelledImages}</p>
          </div>
          <div className="rounded-2xl border border-amber-200/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{t.recommended}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{recommendedTotal.toLocaleString()}+</p>
            <p className="mt-1 text-xs text-stone-400">{t.labelledImages}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-4">
        {visualBreedTrainingStages.map((stage) => (
          <article key={stage.id} className="rounded-2xl border border-stone-700/80 bg-[#0f0d09] p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="font-semibold text-white">{localizeMlPhrase(stage.title, language)}</h3>
              <span className="rounded-full border border-amber-200/15 px-3 py-1 text-xs text-amber-100/80">
                {readinessLabel[language][stage.readiness] ?? stage.readiness}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-stone-400">{localizeMlPhrase(stage.purpose, language)}</p>
            <div className="mt-4 space-y-2 rounded-xl border border-amber-200/10 bg-black/20 p-3 text-xs leading-5 text-stone-400">
              <p><span className="font-semibold text-amber-100">{t.input}:</span> {localizeMlPhrase(stage.requiredInput, language)}</p>
              <p><span className="font-semibold text-amber-100">{t.output}:</span> {localizeMlPhrase(stage.expectedOutput, language)}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-stone-700/80">
        <table className="w-full min-w-[860px] border-collapse text-left text-sm">
          <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.2em] text-amber-200/75">
            <tr>{t.table.map((header) => <th key={header} className="px-4 py-4">{header}</th>)}</tr>
          </thead>
          <tbody>
            {visualBreedClasses.map((item) => (
              <tr key={item.id} className="border-t border-stone-800">
                <td className="px-4 py-4 font-semibold text-white">{item.label}</td>
                <td className="px-4 py-4 text-amber-100/80">{localizeMlPhrase(getVisualBreedGroupLabel(item.group), language)}</td>
                <td className="px-4 py-4 leading-6 text-stone-400">{localizeMlPhrase(item.modelRole, language)}</td>
                <td className="px-4 py-4 leading-6 text-stone-400">{localizeMlPhrase(item.whyItMatters, language)}</td>
                <td className="px-4 py-4 text-stone-300">{item.minimumImages.toLocaleString()} / {item.recommendedImages.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-amber-200/10 bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{t.futureEvidence}</p>
          <div className="mt-4 space-y-3">
            {visualBreedEvidenceWeights.map((item) => (
              <div key={item.signal} className="rounded-2xl border border-stone-700 bg-black/20 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-semibold text-white">{localizeMlPhrase(item.signal, language)}</p>
                  <span className="rounded-full border border-amber-200/15 px-3 py-1 text-xs text-amber-100/80">{localizeMlPhrase(item.tentativeWeight, language)}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-stone-400">
                  <span className="text-amber-100/90">{localizeMlPhrase(item.role, language)}:</span> {localizeMlPhrase(item.userFacingMeaning, language)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-amber-200/10 bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{t.trainingArtifacts}</p>
          <div className="mt-4 space-y-3">
            {visualBreedArtifacts.map((artifact) => (
              <div key={artifact.path} className="rounded-2xl border border-stone-700 bg-black/20 p-4">
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
          {visualBreedClassifierPrinciples.map((principle) => (
            <div key={principle} className="flex gap-2 text-sm leading-6 text-amber-50/85">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-200" />
              <span>{localizeMlPhrase(principle, language)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
