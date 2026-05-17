"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import type { LanguageCode } from "@/lib/i18n/languages";
import { localizeMlPhrase } from "@/lib/i18n/ml-phrase-copy";
import {
  getVisualSimilarityStatusLabel,
  visualSimilarityArtifacts,
  visualSimilarityFormula,
  visualSimilarityModelCandidates,
  visualSimilaritySignals,
  visualSimilarityStages,
} from "@/lib/ml/visual-similarity";

const copy: Record<LanguageCode, {
  eyebrow: string;
  title: string;
  description: string;
  formula: string;
  input: string;
  output: string;
  table: string[];
  modelCandidates: string;
  prototypeArtifacts: string;
  useCase: string;
  whyUseful: string;
  risk: string;
  readiness: Record<string, string>;
  status: Record<string, string>;
}> = {
  en: {
    eyebrow: "Visual similarity prototype",
    title: "Compare the uploaded photo with a Cane Corso reference set.",
    description:
      "This layer prepares the future image-embedding comparison: a valid user photo becomes a visual feature vector, then it is compared with permitted Cane Corso reference examples and the explainable geometry layer. The result is a visual match signal, not proof of pedigree.",
    formula: "Prototype formula",
    input: "Input",
    output: "Output",
    table: ["Signal", "Role", "Formula", "User meaning", "Readiness"],
    modelCandidates: "Model candidates",
    prototypeArtifacts: "Prototype artifacts",
    useCase: "Use case",
    whyUseful: "Why useful",
    risk: "Risk",
    readiness: {
      ready_as_formula: "Formula-ready",
      needs_reference_images: "Needs reference images",
      needs_trained_model: "Needs trained model",
    },
    status: {
      not_started: "Not started",
      dataset_required: "Dataset required",
      prototype_ready: "Prototype-ready",
      future_training: "Future training",
    },
  },
  bg: {
    eyebrow: "Прототип за визуално сходство",
    title: "Сравнява качената снимка с референтен Cane Corso набор.",
    description:
      "Този слой подготвя бъдещото сравнение чрез image embeddings: валидна потребителска снимка става визуален feature vector, сравнява се с разрешени Cane Corso референции и с обяснимия геометричен слой. Резултатът е сигнал за визуално сходство, не доказателство за родословие.",
    formula: "Формула на прототипа",
    input: "Вход",
    output: "Изход",
    table: ["Сигнал", "Роля", "Формула", "Значение за потребителя", "Готовност"],
    modelCandidates: "Кандидат модели",
    prototypeArtifacts: "Артефакти на прототипа",
    useCase: "Употреба",
    whyUseful: "Защо е полезно",
    risk: "Риск",
    readiness: {
      ready_as_formula: "Готово като формула",
      needs_reference_images: "Нужни са референтни снимки",
      needs_trained_model: "Нужен е обучен модел",
    },
    status: {
      not_started: "Не е започнато",
      dataset_required: "Нужен е dataset",
      prototype_ready: "Готово като прототип",
      future_training: "Бъдещо обучение",
    },
  },
  it: {
    eyebrow: "Prototipo somiglianza visuale",
    title: "Confronta la foto caricata con un set Cane Corso di riferimento.",
    description:
      "Questo livello prepara il confronto futuro con image embeddings: una foto valida diventa un feature vector visuale, poi viene confrontata con riferimenti Cane Corso autorizzati e con il livello geometrico spiegabile. Il risultato è un segnale di somiglianza visuale, non prova di pedigree.",
    formula: "Formula prototipo",
    input: "Input",
    output: "Output",
    table: ["Segnale", "Ruolo", "Formula", "Significato utente", "Prontezza"],
    modelCandidates: "Modelli candidati",
    prototypeArtifacts: "Artefatti prototipo",
    useCase: "Caso d’uso",
    whyUseful: "Perché utile",
    risk: "Rischio",
    readiness: {
      ready_as_formula: "Pronto come formula",
      needs_reference_images: "Richiede immagini riferimento",
      needs_trained_model: "Richiede modello addestrato",
    },
    status: {
      not_started: "Non iniziato",
      dataset_required: "Dataset richiesto",
      prototype_ready: "Pronto come prototipo",
      future_training: "Training futuro",
    },
  },
};

export function VisualSimilarityPanel() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="usg-readable-card rounded-[2rem] border border-amber-200/10 bg-black/25 p-6 shadow-2xl shadow-black/20">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-amber-300/70">{t.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">{t.title}</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-300">{t.description}</p>
        </div>

        <div className="rounded-3xl border border-amber-300/15 bg-amber-300/10 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-100/70">{t.formula}</p>
          <h3 className="mt-2 text-xl font-semibold text-amber-50">{localizeMlPhrase(visualSimilarityFormula.title, language)}</h3>
          <p className="mt-3 text-sm leading-6 text-amber-50/85">{localizeMlPhrase(visualSimilarityFormula.readable, language)}</p>
          <code className="mt-4 block break-words rounded-2xl border border-amber-200/15 bg-black/30 px-4 py-3 text-xs leading-6 text-amber-100/85">{visualSimilarityFormula.expression}</code>
          <p className="mt-4 text-sm leading-6 text-amber-50/80">{localizeMlPhrase(visualSimilarityFormula.safety, language)}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-4">
        {visualSimilarityStages.map((stage) => (
          <article key={stage.id} className="rounded-2xl border border-stone-700/80 bg-[#0f0d09] p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="font-semibold text-white">{localizeMlPhrase(stage.title, language)}</h3>
              <span className="rounded-full border border-amber-200/15 px-3 py-1 text-xs text-amber-100/80">
                {t.status[stage.status] ?? getVisualSimilarityStatusLabel(stage.status)}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-stone-400">{localizeMlPhrase(stage.purpose, language)}</p>
            <div className="mt-4 space-y-2 rounded-xl border border-amber-200/10 bg-black/20 p-3 text-xs leading-5 text-stone-400">
              <p><span className="font-semibold text-amber-100">{t.input}:</span> {localizeMlPhrase(stage.input, language)}</p>
              <p><span className="font-semibold text-amber-100">{t.output}:</span> {localizeMlPhrase(stage.output, language)}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-stone-700/80">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.2em] text-amber-200/75"><tr>{t.table.map((header) => <th key={header} className="px-4 py-4">{header}</th>)}</tr></thead>
          <tbody>
            {visualSimilaritySignals.map((signal) => (
              <tr key={signal.id} className="border-t border-stone-800">
                <td className="px-4 py-4 font-semibold text-white">{localizeMlPhrase(signal.label, language)}</td>
                <td className="px-4 py-4 text-amber-100/80">{localizeMlPhrase(signal.role, language)}</td>
                <td className="px-4 py-4"><code className="rounded-xl border border-stone-800 bg-black/30 px-3 py-2 text-xs text-amber-100/80">{signal.formula}</code></td>
                <td className="px-4 py-4 leading-6 text-stone-400">{localizeMlPhrase(signal.userMeaning, language)}</td>
                <td className="px-4 py-4 text-stone-300">{t.readiness[signal.readiness] ?? signal.readiness}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-amber-200/10 bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{t.modelCandidates}</p>
          <div className="mt-4 space-y-3">
            {visualSimilarityModelCandidates.map((model) => (
              <div key={model.name} className="rounded-2xl border border-stone-700 bg-black/20 p-4">
                <p className="font-semibold text-white">{localizeMlPhrase(model.name, language)}</p>
                <p className="mt-2 text-sm leading-6 text-stone-400"><span className="text-amber-100/90">{t.useCase}:</span> {localizeMlPhrase(model.useCase, language)}</p>
                <p className="mt-2 text-sm leading-6 text-stone-400"><span className="text-amber-100/90">{t.whyUseful}:</span> {localizeMlPhrase(model.whyUseful, language)}</p>
                <p className="mt-2 text-sm leading-6 text-stone-400"><span className="text-amber-100/90">{t.risk}:</span> {localizeMlPhrase(model.risk, language)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-amber-200/10 bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{t.prototypeArtifacts}</p>
          <div className="mt-4 space-y-3">
            {visualSimilarityArtifacts.map((artifact) => (
              <div key={artifact.path} className="rounded-2xl border border-stone-700 bg-black/20 p-4">
                <p className="font-semibold text-white">{localizeMlPhrase(artifact.label, language)}</p>
                <code className="mt-2 block break-words rounded-xl border border-stone-800 bg-black/30 px-3 py-2 text-xs text-amber-100/80">{artifact.path}</code>
                <p className="mt-2 text-sm leading-6 text-stone-400">{localizeMlPhrase(artifact.purpose, language)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
