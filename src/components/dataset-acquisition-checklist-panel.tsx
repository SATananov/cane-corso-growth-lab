"use client";

import {
  datasetAcquisitionManifestColumns,
  datasetAcquisitionMilestones,
  datasetAcquisitionReviewRules,
  datasetAcquisitionStarterRows,
} from "@/lib/ml/dataset-acquisition-checklist";
import { useLanguage } from "@/lib/i18n/language-context";

type PanelCopy = {
  eyebrow: string;
  title: string;
  description: string;
  milestoneTitle: string;
  manifestTitle: string;
  columnsTitle: string;
  rulesTitle: string;
  starterRowsTitle: string;
  headers: {
    milestone: string;
    status: string;
    evidence: string;
    column: string;
    purpose: string;
    required: string;
    imageId: string;
    breed: string;
    readiness: string;
    license: string;
    split: string;
  };
  statusLabels: Record<string, string>;
  trainingNote: string;
  yes: string;
  no: string;
};

const copy: Record<"en" | "bg" | "it", PanelCopy> = {
  en: {
    eyebrow: "Dataset acquisition checklist",
    title: "Collect images only through a reviewable manifest, not random downloads.",
    description:
      "This checklist turns the visual ML idea into a controlled process: every candidate image gets a source, license status, breed label, view type, quality label and readiness label before model training.",
    milestoneTitle: "Acquisition gates",
    manifestTitle: "Starter manifest policy",
    columnsTitle: "Required manifest columns",
    rulesTitle: "Review rules before training",
    starterRowsTitle: "Starter manifest examples",
    headers: {
      milestone: "Milestone",
      status: "Status",
      evidence: "Evidence",
      column: "Column",
      purpose: "Purpose",
      required: "Required",
      imageId: "ID на снимка",
      breed: "Породен етикет",
      readiness: "Готовност",
      license: "License",
      split: "Разделяне",
    },
    statusLabels: { not_started: "Not started", in_review: "In review", approved: "Approved", blocked: "Blocked" },
    trainingNote:
      "The neural vision models remain not ready for training until real image rows are licensed/approved, labeled and split into train/validation/test.",
    yes: "Yes",
    no: "No",
  },
  bg: {
    eyebrow: "Checklist за събиране на снимки",
    title: "Снимките се събират чрез проверим опис, не чрез случайно теглене.",
    description:
      "Тази стъпка превръща идеята за визуален ML в контролиран процес: всяка кандидат снимка получава източник, статус на права, породен етикет, тип изглед, качество и етикет за готовност преди обучение на модел.",
    milestoneTitle: "Контролни проверки",
    manifestTitle: "Политика за начален опис",
    columnsTitle: "Задължителни колони в описа",
    rulesTitle: "Правила преди обучение",
    starterRowsTitle: "Примерни начални редове",
    headers: {
      milestone: "Етап",
      status: "Статус",
      evidence: "Доказателство",
      column: "Колона",
      purpose: "Роля",
      required: "Задължителна",
      imageId: "ID на снимка",
      breed: "Породен етикет",
      readiness: "Готовност",
      license: "Права",
      split: "Разделяне",
    },
    statusLabels: { not_started: "Не е започнат", in_review: "В проверка", approved: "Одобрен", blocked: "Блокиран" },
    trainingNote:
      "Невронните визуални модели остават неготови за обучение, докато реалните редове със снимки не са разрешени, одобрени, етикетирани и разделени на обучение, валидация и тест.",
    yes: "Да",
    no: "Не",
  },
  it: {
    eyebrow: "Checklist acquisizione dataset",
    title: "Le immagini si raccolgono con un manifest verificabile, non con download casuali.",
    description:
      "Questa checklist trasforma l’idea visual ML in un processo controllato: ogni immagine candidata riceve fonte, stato licenza, breed label, tipo vista, qualità e readiness label prima del training.",
    milestoneTitle: "Gate di acquisizione",
    manifestTitle: "Policy starter manifest",
    columnsTitle: "Colonne richieste nel manifest",
    rulesTitle: "Regole prima del training",
    starterRowsTitle: "Esempi starter manifest",
    headers: {
      milestone: "Fase",
      status: "Stato",
      evidence: "Evidenza",
      column: "Colonna",
      purpose: "Scopo",
      required: "Richiesta",
      imageId: "ID на снимка",
      breed: "Породен етикет",
      readiness: "Готовност",
      license: "Licenza",
      split: "Разделяне",
    },
    statusLabels: { not_started: "Non iniziato", in_review: "In revisione", approved: "Approvato", blocked: "Bloccato" },
    trainingNote:
      "I modelli neural vision restano not ready for training finché le immagini reali non sono autorizzate, etichettate e divise in train/validation/test.",
    yes: "Sì",
    no: "No",
  },
};

function statusClass(status: string) {
  if (status === "approved") return "border-emerald-300/20 bg-emerald-300/10 text-emerald-100";
  if (status === "blocked") return "border-red-300/20 bg-red-300/10 text-red-100";
  if (status === "in_review") return "border-amber-300/20 bg-amber-300/10 text-amber-100";
  return "border-stone-600 bg-stone-900 text-stone-300";
}

export function DatasetAcquisitionChecklistPanel() {
  const { language } = useLanguage();
  const text = copy[language];

  return (
    <section className="grid gap-6">
      <div className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
        <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">{text.eyebrow}</p>
        <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-5xl">{text.title}</h2>
        <p className="mt-4 max-w-4xl text-base leading-7 text-stone-400">{text.description}</p>
        <div className="mt-5 rounded-2xl border border-amber-200/10 bg-amber-300/10 p-4 text-sm leading-6 text-amber-50">
          {text.trainingNote}
        </div>
      </div>

      <div className="rounded-[2rem] border border-amber-200/10 bg-black/25 p-6">
        <h3 className="text-2xl font-semibold text-white">{text.milestoneTitle}</h3>
        <div className="mt-5 overflow-x-auto rounded-3xl border border-stone-700">
          <table className="min-w-full divide-y divide-stone-700 text-left text-sm">
            <thead className="bg-black/30 text-xs uppercase tracking-[0.18em] text-stone-500">
              <tr>
                <th className="px-4 py-3">{text.headers.milestone}</th>
                <th className="px-4 py-3">{text.headers.status}</th>
                <th className="px-4 py-3">{text.headers.evidence}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800 bg-black/15">
              {datasetAcquisitionMilestones.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-4 align-top">
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="mt-1 max-w-2xl text-stone-400">{item.description}</p>
                  </td>
                  <td className="px-4 py-4 align-top">
                    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(item.status)}`}>
                      {text.statusLabels[item.status] ?? item.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 align-top font-mono text-xs text-amber-100/80">{item.evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
          <h3 className="text-2xl font-semibold text-white">{text.columnsTitle}</h3>
          <div className="mt-5 overflow-x-auto rounded-3xl border border-stone-700">
            <table className="min-w-full divide-y divide-stone-700 text-left text-sm">
              <thead className="bg-black/30 text-xs uppercase tracking-[0.18em] text-stone-500">
                <tr>
                  <th className="px-4 py-3">{text.headers.column}</th>
                  <th className="px-4 py-3">{text.headers.purpose}</th>
                  <th className="px-4 py-3">{text.headers.required}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800 bg-black/15">
                {datasetAcquisitionManifestColumns.map((column) => (
                  <tr key={column.name}>
                    <td className="px-4 py-4 align-top font-mono text-xs text-amber-100">{column.name}</td>
                    <td className="px-4 py-4 align-top text-stone-300">{column.purpose}</td>
                    <td className="px-4 py-4 align-top text-stone-400">{column.required ? text.yes : text.no}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[2rem] border border-amber-200/10 bg-black/25 p-6">
          <h3 className="text-2xl font-semibold text-white">{text.rulesTitle}</h3>
          <ul className="mt-5 grid gap-3 text-sm leading-6 text-stone-300">
            {datasetAcquisitionReviewRules.map((rule) => (
              <li key={rule} className="rounded-2xl border border-stone-700 bg-white/[0.025] p-4">{rule}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-[2rem] border border-amber-200/10 bg-black/25 p-6">
        <h3 className="text-2xl font-semibold text-white">{text.starterRowsTitle}</h3>
        <div className="mt-5 overflow-x-auto rounded-3xl border border-stone-700">
          <table className="min-w-full divide-y divide-stone-700 text-left text-sm">
            <thead className="bg-black/30 text-xs uppercase tracking-[0.18em] text-stone-500">
              <tr>
                <th className="px-4 py-3">{text.headers.imageId}</th>
                <th className="px-4 py-3">{text.headers.breed}</th>
                <th className="px-4 py-3">{text.headers.readiness}</th>
                <th className="px-4 py-3">{text.headers.license}</th>
                <th className="px-4 py-3">{text.headers.split}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800 bg-black/15">
              {datasetAcquisitionStarterRows.map((row) => (
                <tr key={row.image_id}>
                  <td className="px-4 py-4 align-top font-mono text-xs text-amber-100">{row.image_id}</td>
                  <td className="px-4 py-4 align-top text-stone-300">{row.breed_label}</td>
                  <td className="px-4 py-4 align-top text-stone-300">{row.comparison_readiness}</td>
                  <td className="px-4 py-4 align-top text-stone-400">{row.license_status}</td>
                  <td className="px-4 py-4 align-top text-stone-400">{row.split}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
