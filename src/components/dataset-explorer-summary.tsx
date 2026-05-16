"use client";

import { datasetExplorerSummary, formatNumber } from "@/lib/ml/dataset-overview";
import { useLanguage } from "@/lib/i18n/language-context";
import type { LanguageCode } from "@/lib/i18n/languages";

const copy: Record<LanguageCode, {
  stats: { datasets: string; rows: string; columns: string; tracked: string; sampleRecords: string; trackedFields: string };
  eyebrow: string;
  title: string;
  description: string;
  rawDataPolicy: string;
  safeUseBoundary: string;
  rawPolicyFallback: string;
  safeUseFallback: string;
}> = {
  en: {
    stats: { datasets: "Datasets", rows: "Rows", columns: "Columns", tracked: "tracked", sampleRecords: "sample records", trackedFields: "tracked fields" },
    eyebrow: "Data transparency",
    title: "The model shows what it uses before it shows a signal.",
    description: "This page keeps the source, role and limitations of each dataset visible. The data layer is part of the project methodology and helps the app avoid unclear black-box claims.",
    rawDataPolicy: "Raw data policy",
    safeUseBoundary: "Safe use boundary",
    rawPolicyFallback: datasetExplorerSummary.rawPolicy,
    safeUseFallback: datasetExplorerSummary.safeUse,
  },
  bg: {
    stats: { datasets: "Набори данни", rows: "Редове", columns: "Колони", tracked: "проследени", sampleRecords: "примерни записи", trackedFields: "проследени полета" },
    eyebrow: "Прозрачност на данните",
    title: "Моделът показва какво използва, преди да покаже резултат.",
    description: "Тази страница държи видими източника, ролята и ограниченията на всеки набор от данни. Слоят с данни е част от методологията и пази приложението от неясни black-box твърдения.",
    rawDataPolicy: "Политика за сурови данни",
    safeUseBoundary: "Граница за безопасно използване",
    rawPolicyFallback: "Суровите файлове се пазят отделно от Git, когато съдържат външни или неразрешени данни. В проекта се commit-ват само примерни, обработени или описателни файлове.",
    safeUseFallback: "Данните поддържат ориентировъчен ML анализ. Те не доказват здравен статус, породна чистота, родословие или официална регистрация.",
  },
  it: {
    stats: { datasets: "Dataset", rows: "Righe", columns: "Colonne", tracked: "tracciati", sampleRecords: "record di esempio", trackedFields: "campi tracciati" },
    eyebrow: "Trasparenza dei dati",
    title: "Il modello mostra cosa usa prima di mostrare un segnale.",
    description: "Questa pagina mantiene visibili fonte, ruolo e limiti di ogni dataset. Il livello dati fa parte della metodologia e aiuta l’app a evitare affermazioni black-box poco chiare.",
    rawDataPolicy: "Policy sui dati grezzi",
    safeUseBoundary: "Limite di uso sicuro",
    rawPolicyFallback: "I file grezzi restano fuori da Git quando contengono dati esterni o non autorizzati. Nel progetto si salvano solo file di esempio, processati o descrittivi.",
    safeUseFallback: "I dati supportano un’analisi ML orientativa. Non provano salute, purezza di razza, pedigree o registrazione ufficiale.",
  },
};

export function DatasetExplorerSummary() {
  const { language } = useLanguage();
  const t = copy[language];
  const stats = [
    { label: t.stats.datasets, value: datasetExplorerSummary.totalDatasets, suffix: t.stats.tracked },
    { label: t.stats.rows, value: datasetExplorerSummary.totalRows, suffix: t.stats.sampleRecords },
    { label: t.stats.columns, value: datasetExplorerSummary.totalColumnsTracked, suffix: t.stats.trackedFields },
  ];

  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/20">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-amber-300/70">{t.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">{t.title}</h2>
          <p className="mt-5 text-base leading-8 text-stone-400">{t.description}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-stone-700 bg-black/25 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{stat.label}</p>
              <p className="mt-3 text-3xl font-semibold text-white">{formatNumber(stat.value)}</p>
              <p className="mt-2 text-sm text-stone-500">{stat.suffix}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-stone-700 bg-black/25 p-5">
          <p className="text-sm uppercase tracking-[0.22em] text-amber-300/70">{t.rawDataPolicy}</p>
          <p className="mt-4 text-sm leading-7 text-stone-300">{t.rawPolicyFallback}</p>
        </div>

        <div className="rounded-3xl border border-stone-700 bg-black/25 p-5">
          <p className="text-sm uppercase tracking-[0.22em] text-amber-300/70">{t.safeUseBoundary}</p>
          <p className="mt-4 text-sm leading-7 text-stone-300">{t.safeUseFallback}</p>
        </div>
      </div>
    </section>
  );
}
