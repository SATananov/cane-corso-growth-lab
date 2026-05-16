"use client";

import {
  datasetSplitPlan,
  imageDatasetClassGroups,
  imageLabelSchema,
  qualityIssueCatalog,
  sampleImageLabels,
  visualDatasetWorkflow,
} from "@/lib/ml/image-dataset-labeling";
import { useLanguage } from "@/lib/i18n/language-context";

type Copy = {
  eyebrow: string;
  title: string;
  description: string;
  classTitle: string;
  splitTitle: string;
  schemaTitle: string;
  issuesTitle: string;
  workflowTitle: string;
  sampleTitle: string;
  headers: {
    class: string;
    purpose: string;
    share: string;
    examples: string;
    split: string;
    target: string;
    field: string;
    required: string;
    type: string;
    image: string;
    view: string;
    quality: string;
    readiness: string;
    issues: string;
  };
  note: string;
};

const copy: Record<"en" | "bg" | "it", Copy> = {
  en: {
    eyebrow: "Visual dataset foundation",
    title: "How the model will learn correct photos and Cane Corso visual type.",
    description:
      "The visual model needs labeled examples before it can decide whether a photo is suitable and whether the dog visually matches Cane Corso reference type. This structure prepares the dataset before any neural training begins.",
    classTitle: "Training classes",
    splitTitle: "Dataset split",
    schemaTitle: "Required label fields",
    issuesTitle: "Quality issue codes",
    workflowTitle: "Labeling workflow",
    sampleTitle: "Sample labels",
    headers: {
      class: "Class",
      purpose: "Purpose",
      share: "Target share",
      examples: "Examples needed",
      split: "Split",
      target: "Target",
      field: "Field",
      required: "Required",
      type: "Type",
      image: "Image",
      view: "View",
      quality: "Quality",
      readiness: "Readiness",
      issues: "Issues",
    },
    note:
      "This step does not train the neural network yet. It defines the data contract that lets us train photo readiness, breed/type classification and future visual similarity models correctly.",
  },
  bg: {
    eyebrow: "Основа за визуален dataset",
    title: "Как моделът ще се научи да разпознава правилна снимка и Cane Corso визуален тип.",
    description:
      "Преди обучение на невронна мрежа ни трябват снимки с ясни labels. Така моделът първо ще учи дали снимката става за сравнение, а след това дали кучето визуално се доближава до Cane Corso референтния тип.",
    classTitle: "Класове за обучение",
    splitTitle: "Разделяне на dataset-а",
    schemaTitle: "Задължителни label полета",
    issuesTitle: "Кодове за проблеми в снимката",
    workflowTitle: "Процес на label-ване",
    sampleTitle: "Примерни labels",
    headers: {
      class: "Клас",
      purpose: "Цел",
      share: "Дял",
      examples: "Нужни примери",
      split: "Split",
      target: "Цел",
      field: "Поле",
      required: "Задължително",
      type: "Тип",
      image: "Снимка",
      view: "Изглед",
      quality: "Качество",
      readiness: "Готовност",
      issues: "Проблеми",
    },
    note:
      "Тази стъпка още не тренира невронна мрежа. Тя дефинира структурата на данните, за да можем по-късно да обучим photo readiness модел, breed/type classifier и visual similarity модел правилно.",
  },
  it: {
    eyebrow: "Base del dataset visivo",
    title: "Come il modello imparerà foto corrette e tipo visivo Cane Corso.",
    description:
      "Prima dell’addestramento neurale servono immagini con label chiare. Così il modello impara prima se una foto è adatta al confronto, poi se il cane è visivamente vicino al tipo di riferimento Cane Corso.",
    classTitle: "Classi di training",
    splitTitle: "Divisione del dataset",
    schemaTitle: "Campi label richiesti",
    issuesTitle: "Codici dei problemi foto",
    workflowTitle: "Workflow di labeling",
    sampleTitle: "Label di esempio",
    headers: {
      class: "Classe",
      purpose: "Scopo",
      share: "Quota",
      examples: "Esempi necessari",
      split: "Split",
      target: "Target",
      field: "Campo",
      required: "Richiesto",
      type: "Tipo",
      image: "Immagine",
      view: "Vista",
      quality: "Qualità",
      readiness: "Idoneità",
      issues: "Problemi",
    },
    note:
      "Questo step non addestra ancora la rete neurale. Definisce il contratto dati per addestrare correttamente photo readiness, classificazione breed/type e futuri modelli di similarità visiva.",
  },
};

function yesNo(value: boolean, language: "en" | "bg" | "it") {
  if (language === "bg") return value ? "Да" : "Не";
  if (language === "it") return value ? "Sì" : "No";
  return value ? "Yes" : "No";
}

export function ImageDatasetStructurePanel() {
  const { language } = useLanguage();
  const text = copy[language];

  return (
    <section className="grid gap-6">
      <div className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
        <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
          {text.eyebrow}
        </p>
        <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
          {text.title}
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-7 text-stone-400">
          {text.description}
        </p>
        <div className="mt-5 rounded-2xl border border-amber-200/10 bg-amber-300/10 p-4 text-sm leading-6 text-amber-50">
          {text.note}
        </div>
      </div>

      <div className="rounded-[2rem] border border-amber-200/10 bg-black/25 p-6">
        <h3 className="text-2xl font-semibold text-white">{text.classTitle}</h3>
        <div className="mt-5 overflow-x-auto rounded-3xl border border-stone-700">
          <table className="min-w-full divide-y divide-stone-700 text-left text-sm">
            <thead className="bg-black/30 text-xs uppercase tracking-[0.18em] text-stone-500">
              <tr>
                <th className="px-4 py-3">{text.headers.class}</th>
                <th className="px-4 py-3">{text.headers.purpose}</th>
                <th className="px-4 py-3">{text.headers.share}</th>
                <th className="px-4 py-3">{text.headers.examples}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800 bg-black/15">
              {imageDatasetClassGroups.map((group) => (
                <tr key={group.label}>
                  <td className="px-4 py-4 font-semibold text-white">{group.title}</td>
                  <td className="px-4 py-4 text-stone-300">{group.purpose}</td>
                  <td className="px-4 py-4 text-amber-100">{group.targetShare}</td>
                  <td className="px-4 py-4 text-stone-400">{group.examplesNeeded}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
        <div className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
          <h3 className="text-2xl font-semibold text-white">{text.splitTitle}</h3>
          <div className="mt-5 grid gap-3">
            {datasetSplitPlan.map((split) => (
              <div key={split.split} className="rounded-2xl border border-stone-700 bg-black/20 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold uppercase tracking-[0.18em] text-amber-100">
                    {split.split}
                  </p>
                  <span className="rounded-full border border-amber-200/20 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-100">
                    {split.target}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-stone-400">{split.purpose}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
          <h3 className="text-2xl font-semibold text-white">{text.workflowTitle}</h3>
          <div className="mt-5 grid gap-3">
            {visualDatasetWorkflow.map((step, index) => (
              <div key={step} className="flex gap-3 rounded-2xl border border-stone-700 bg-black/20 p-4">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-amber-300 text-sm font-bold text-stone-950">
                  {index + 1}
                </div>
                <p className="text-sm leading-6 text-stone-300">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-amber-200/10 bg-black/25 p-6">
        <h3 className="text-2xl font-semibold text-white">{text.schemaTitle}</h3>
        <div className="mt-5 overflow-x-auto rounded-3xl border border-stone-700">
          <table className="min-w-full divide-y divide-stone-700 text-left text-sm">
            <thead className="bg-black/30 text-xs uppercase tracking-[0.18em] text-stone-500">
              <tr>
                <th className="px-4 py-3">{text.headers.field}</th>
                <th className="px-4 py-3">{text.headers.required}</th>
                <th className="px-4 py-3">{text.headers.type}</th>
                <th className="px-4 py-3">{text.headers.purpose}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800 bg-black/15">
              {imageLabelSchema.map((field) => (
                <tr key={field.field}>
                  <td className="px-4 py-4 font-mono text-xs text-amber-100">{field.field}</td>
                  <td className="px-4 py-4 text-stone-300">{yesNo(field.required, language)}</td>
                  <td className="px-4 py-4 text-stone-300">{field.type}</td>
                  <td className="px-4 py-4 text-stone-400">{field.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
        <div className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
          <h3 className="text-2xl font-semibold text-white">{text.issuesTitle}</h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {qualityIssueCatalog.map((issue) => (
              <span key={issue} className="rounded-full border border-stone-700 bg-black/25 px-3 py-2 font-mono text-xs text-stone-300">
                {issue}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
          <h3 className="text-2xl font-semibold text-white">{text.sampleTitle}</h3>
          <div className="mt-5 overflow-x-auto rounded-3xl border border-stone-700">
            <table className="min-w-full divide-y divide-stone-700 text-left text-sm">
              <thead className="bg-black/30 text-xs uppercase tracking-[0.18em] text-stone-500">
                <tr>
                  <th className="px-4 py-3">{text.headers.image}</th>
                  <th className="px-4 py-3">{text.headers.class}</th>
                  <th className="px-4 py-3">{text.headers.view}</th>
                  <th className="px-4 py-3">{text.headers.quality}</th>
                  <th className="px-4 py-3">{text.headers.readiness}</th>
                  <th className="px-4 py-3">{text.headers.issues}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800 bg-black/15">
                {sampleImageLabels.map((sample) => (
                  <tr key={sample.image_id}>
                    <td className="px-4 py-4 font-mono text-xs text-amber-100">{sample.image_id}</td>
                    <td className="px-4 py-4 text-stone-300">{sample.breed_label}</td>
                    <td className="px-4 py-4 text-stone-300">{sample.view_type}</td>
                    <td className="px-4 py-4 text-stone-300">{sample.photo_quality}</td>
                    <td className="px-4 py-4 text-stone-300">{sample.comparison_readiness}</td>
                    <td className="px-4 py-4 text-stone-400">{sample.issues.join(", ") || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
