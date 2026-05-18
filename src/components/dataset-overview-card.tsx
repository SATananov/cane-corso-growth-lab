"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import { buildGitHubSourceUrl } from "@/lib/source-links";
import type { LanguageCode } from "@/lib/i18n/languages";
import {
  type DatasetOverviewItem,
  formatNumber,
  getQualityToneClass,
} from "@/lib/ml/dataset-overview";

type DatasetOverviewCardProps = {
  dataset: DatasetOverviewItem;
};

const uiCopy: Record<LanguageCode, {
  rows: string;
  columns: string;
  sourceUse: string;
  usedFor: string;
  keyFields: string;
  preview: string;
  openDataset: string;
  qualityLabel: Record<string, string>;
}> = {
  en: {
    rows: "Rows",
    columns: "Columns",
    sourceUse: "Source and use",
    usedFor: "Used for",
    keyFields: "Key fields",
    preview: "Safe sample preview",
    openDataset: "Open dataset",
    qualityLabel: {
      "Best use": "Best use",
      Limitation: "Limitation",
      Boundary: "Boundary",
      "Safety rule": "Safety rule",
    },
  },
  bg: {
    rows: "Редове",
    columns: "Колони",
    sourceUse: "Източник и употреба",
    usedFor: "Използва се за",
    keyFields: "Ключови полета",
    preview: "Безопасен примерен преглед",
    openDataset: "Отвори данните",
    qualityLabel: {
      "Best use": "Най-подходящо за",
      Limitation: "Ограничение",
      Boundary: "Граница",
      "Safety rule": "Правило за безопасност",
    },
  },
  it: {
    rows: "Righe",
    columns: "Colonne",
    sourceUse: "Fonte e uso",
    usedFor: "Usato per",
    keyFields: "Campi chiave",
    preview: "Anteprima campione sicura",
    openDataset: "Apri dataset",
    qualityLabel: {
      "Best use": "Uso migliore",
      Limitation: "Limitazione",
      Boundary: "Limite",
      "Safety rule": "Regola di sicurezza",
    },
  },
};

const datasetCopy: Record<string, Partial<Record<LanguageCode, {
  stage: string;
  title: string;
  source: string;
  role: string;
  usedFor: string[];
  qualityValues: Record<string, string>;
}>>> = {
  "prototype-growth-sample": {
    bg: {
      stage: "Прототип",
      title: "Референтна извадка за растеж на Cane Corso",
      source: "Малка референтна извадка, създадена за лесни упражнения по регресия на растежа.",
      role: "Контролирана извадка за обяснение на връзката между възраст, тегло и височина като координатна зависимост.",
      usedFor: [
        "Първи age-to-weight регресионен базов модел",
        "Обяснение на координатната карта на растежа",
        "Демонстрации в notebook файловете",
      ],
      qualityValues: {
        "learning and visual explanation": "обучение и визуално обяснение",
        "small sample, not official evidence": "малка извадка, не официално доказателство",
      },
    },
    it: {
      stage: "Prototipo",
      title: "Campione di crescita Cane Corso di riferimento",
      source: "Piccolo campione di riferimento creato per esercizi semplici di regressione della crescita.",
      role: "Campione controllato per spiegare età, peso e altezza come relazione a coordinate.",
      usedFor: [
        "Prima baseline di regressione età-peso",
        "Spiegazione della mappa di crescita a coordinate",
        "Dimostrazioni nei notebook",
      ],
      qualityValues: {
        "learning and visual explanation": "apprendimento e spiegazione visuale",
        "small sample, not official evidence": "campione piccolo, non evidenza ufficiale",
      },
    },
  },
  "processed-public-growth-sample": {
    bg: {
      stage: "Обработени данни",
      title: "Обработена публична извадка за растеж",
      source: "Обработена публична извадка, подготвена за по-широк анализ на модели на растеж.",
      role: "По-широка референтна таблица за сравнение на модели, мислене чрез характеристики и безопасни обобщения в приложението.",
      usedFor: [
        "Многоизмерни регресионни експерименти",
        "Изследване на пространство от характеристики",
        "Сравнение на модели и бъдеща калибрация на приложението",
      ],
      qualityValues: {
        "methodology foundation and feature engineering": "методологична основа и създаване на характеристики",
        "processed sample only, raw data not committed": "само обработена извадка, raw данните не са включени",
      },
    },
    it: {
      stage: "Elaborato",
      title: "Campione pubblico elaborato di crescita",
      source: "Campione pubblico elaborato per un’analisi più ampia dei pattern di crescita.",
      role: "Tabella di riferimento più ampia per confronto modelli, ragionamento nello spazio delle feature e sintesi sicure nell’app.",
      usedFor: [
        "Esperimenti di regressione multidimensionale",
        "Esplorazione dello spazio delle feature",
        "Confronto modelli e futura calibrazione dell’app",
      ],
      qualityValues: {
        "methodology foundation and feature engineering": "base metodologica e feature engineering",
        "processed sample only, raw data not committed": "solo campione elaborato, dati grezzi non inclusi",
      },
    },
  },
  "growth-classification-sample": {
    bg: {
      stage: "Класификация",
      title: "Извадка за класификация на растежа",
      source: "Подготвена извадка с етикети за зони за преглед, използвана за сравнение на класификационни модели.",
      role: "База за обучение и оценка на класификация за зони за преглед, не за медицинска диагноза.",
      usedFor: [
        "Логистична регресия и дървовидна класификация",
        "Random Forest сигнал за зона за преглед",
        "Безопасни обяснения за нормален растеж срещу нужда от внимание",
      ],
      qualityValues: {
        "classification demo and review-zone signal": "класификационна демонстрация и сигнал за зона за преглед",
        "not a veterinary diagnosis target": "не е цел за ветеринарна диагноза",
      },
    },
    it: {
      stage: "Classificazione",
      title: "Campione per classificazione della crescita",
      source: "Campione preparato con etichette di zona di revisione per confrontare modelli di classificazione.",
      role: "Base di training e valutazione per la classificazione delle zone di revisione, non per diagnosi medica.",
      usedFor: [
        "Logistic Regression e classificazione basata su alberi",
        "Segnale Random Forest per zona di revisione",
        "Spiegazioni sicure crescita normale vs attenzione richiesta",
      ],
      qualityValues: {
        "classification demo and review-zone signal": "demo di classificazione e segnale di revisione",
        "not a veterinary diagnosis target": "non è un obiettivo di diagnosi veterinaria",
      },
    },
  },
};

export function DatasetOverviewCard({ dataset }: DatasetOverviewCardProps) {
  const { language } = useLanguage();
  const t = uiCopy[language];
  const localizedDataset = datasetCopy[dataset.id]?.[language];
  const previewColumns = Object.keys(dataset.previewRows[0] ?? {});

  const stage = localizedDataset?.stage ?? dataset.stage;
  const title = localizedDataset?.title ?? dataset.title;
  const source = localizedDataset?.source ?? dataset.source;
  const role = localizedDataset?.role ?? dataset.role;
  const usedFor = localizedDataset?.usedFor ?? dataset.usedFor;

  return (
    <article className="usg-readable-card rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/20">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-4xl min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-100">
              {stage}
            </span>
            <a
              href={buildGitHubSourceUrl(dataset.path)}
              target="_blank"
              rel="noreferrer"
              className="break-all rounded-full border border-amber-200/10 bg-black/25 px-3 py-1 text-xs text-stone-400 transition hover:border-amber-300/45 hover:text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-300/70"
              aria-label={`${t.openDataset}: ${dataset.path}`}
            >
              {dataset.path}
            </a>
          </div>

          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-4xl">
            {title}
          </h2>

          <p className="mt-4 text-base leading-7 text-stone-400">{role}</p>
          <a
            href={buildGitHubSourceUrl(dataset.path)}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex rounded-full border border-amber-200/20 bg-amber-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-amber-100 transition hover:bg-amber-300 hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-amber-300/70"
          >
            {t.openDataset}
          </a>
        </div>

        <div className="grid w-full max-w-sm grid-cols-2 gap-3 rounded-3xl border border-stone-700 bg-black/25 p-4 xl:w-72">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{t.rows}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{formatNumber(dataset.rows)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{t.columns}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{formatNumber(dataset.columns)}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-3xl border border-stone-700 bg-black/25 p-5">
          <p className="text-sm uppercase tracking-[0.24em] text-amber-300/70">{t.sourceUse}</p>
          <p className="mt-4 text-sm leading-7 text-stone-300">{source}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {dataset.qualitySignals.map((signal) => {
              const label = t.qualityLabel[signal.label] ?? signal.label;
              const value = localizedDataset?.qualityValues[signal.value] ?? signal.value;

              return (
                <div
                  key={`${dataset.id}-${signal.label}`}
                  className={`rounded-2xl border px-3 py-2 text-xs leading-5 ${getQualityToneClass(signal.tone)}`}
                >
                  <span className="font-semibold">{label}: </span>
                  {value}
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl border border-stone-700 bg-black/25 p-5">
          <p className="text-sm uppercase tracking-[0.24em] text-amber-300/70">{t.usedFor}</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {usedFor.map((item) => (
              <div
                key={`${dataset.id}-${item}`}
                className="rounded-2xl border border-amber-200/10 bg-white/[0.03] p-4 text-sm leading-6 text-stone-300"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-3xl border border-stone-700 bg-black/25 p-5">
        <p className="text-sm uppercase tracking-[0.24em] text-amber-300/70">{t.keyFields}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {dataset.keyFields.map((field) => (
            <span
              key={`${dataset.id}-${field}`}
              className="rounded-full border border-stone-600 bg-white/[0.03] px-3 py-1 text-xs text-stone-300"
            >
              {field}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-6 overflow-hidden rounded-3xl border border-stone-700 bg-black/25">
        <div className="border-b border-stone-700 px-5 py-4">
          <p className="text-sm uppercase tracking-[0.24em] text-amber-300/70">{t.preview}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.18em] text-stone-500">
              <tr>
                {previewColumns.map((column) => (
                  <th key={`${dataset.id}-${column}`} className="px-5 py-4">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {dataset.previewRows.map((row, rowIndex) => (
                <tr key={`${dataset.id}-preview-${rowIndex}`}>
                  {previewColumns.map((column) => (
                    <td key={`${dataset.id}-${rowIndex}-${column}`} className="px-5 py-4 text-stone-300">
                      {row[column]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
