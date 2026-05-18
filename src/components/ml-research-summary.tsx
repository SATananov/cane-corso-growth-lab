"use client";

import {
  classificationResults,
  dataAssets,
  figureAssets,
  formatMetric,
  formatPercent,
  mlFoundationSummary,
  notebookAssets,
  regressionResults,
  type ResearchAsset,
} from "@/lib/ml";
import { useLanguage } from "@/lib/i18n/language-context";
import { localizeMlPhrase } from "@/lib/i18n/ml-phrase-copy";
import { buildGitHubSourceUrl } from "@/lib/source-links";
import type { LanguageCode } from "@/lib/i18n/languages";

const copy: Record<LanguageCode, {
  methodologyStatus: string;
  notebookConnected: string;
  bestRegression: string;
  bestClassifier: string;
  methodologyAssets: string;
  notebooks: string;
  dataFiles: string;
  figures: string;
  regressionEvidence: string;
  growthCurveModels: string;
  classificationEvidence: string;
  reviewZoneModels: string;
  bestCurrentResult: string;
  safetyBoundary: string;
  safetyFallback: string;
  assets: { notebooks: string; data: string; figures: string; appUse: string; referenceFile: string; open: string };
}> = {
  en: {
    methodologyStatus: "Methodology status",
    notebookConnected: "Notebook base is connected to the app",
    bestRegression: "Best regression",
    bestClassifier: "Best classifier",
    methodologyAssets: "Methodology assets",
    notebooks: "notebooks",
    dataFiles: "data files",
    figures: "figures",
    regressionEvidence: "Regression evidence",
    growthCurveModels: "Growth curve models",
    classificationEvidence: "Classification evidence",
    reviewZoneModels: "Growth review-zone models",
    bestCurrentResult: "Best current result",
    safetyBoundary: "Safety boundary",
    safetyFallback: mlFoundationSummary.safetyNote,
    assets: { notebooks: "Notebooks", data: "Data", figures: "Figures", appUse: "App use", referenceFile: "Reference file", open: "Open source" },
  },
  bg: {
    methodologyStatus: "Статус на методологията",
    notebookConnected: "Jupyter тетрадките са свързани с приложението",
    bestRegression: "Най-добър регресионен модел",
    bestClassifier: "Най-добър класификационен модел",
    methodologyAssets: "Методологични файлове",
    notebooks: "Jupyter тетрадки",
    dataFiles: "файла с данни",
    figures: "фигури",
    regressionEvidence: "Регресионни доказателства",
    growthCurveModels: "Модели за крива на растеж",
    classificationEvidence: "Класификационни доказателства",
    reviewZoneModels: "Модели за зони за преглед",
    bestCurrentResult: "Най-добър текущ резултат",
    safetyBoundary: "Граница за безопасност",
    safetyFallback: "Методологията показва ориентировъчни сигнали и не доказва диагноза, породна чистота, родословие, генетичен произход или официален статус.",
    assets: { notebooks: "Jupyter тетрадки", data: "Данни", figures: "Фигури", appUse: "Употреба в приложението", referenceFile: "Референтен файл", open: "Отвори файла" },
  },
  it: {
    methodologyStatus: "Stato metodologia",
    notebookConnected: "La base dei notebook è collegata all’app",
    bestRegression: "Migliore modello regression",
    bestClassifier: "Migliore modello classification",
    methodologyAssets: "Asset metodologici",
    notebooks: "notebook",
    dataFiles: "file dati",
    figures: "figure",
    regressionEvidence: "Evidenza regression",
    growthCurveModels: "Modelli curva crescita",
    classificationEvidence: "Evidenza classification",
    reviewZoneModels: "Modelli zone di revisione",
    bestCurrentResult: "Miglior risultato attuale",
    safetyBoundary: "Limite di sicurezza",
    safetyFallback: "La metodologia mostra segnali orientativi e non prova diagnosi, purezza di razza, pedigree, origine genetica o status ufficiale.",
    assets: { notebooks: "Notebook", data: "Dati", figures: "Figure", appUse: "Uso nell’app", referenceFile: "File di riferimento", open: "Apri file" },
  },
};

export function MlResearchSummary() {
  const { language } = useLanguage();
  const t = copy[language];
  const bestRegression = regressionResults.find((result) => result.model === mlFoundationSummary.regressionBestModel);
  const bestClassification = classificationResults.find((result) => result.model === mlFoundationSummary.classificationBestModel);

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label={t.methodologyStatus} value={localizeMlPhrase(mlFoundationSummary.status, language)} hint={t.notebookConnected} />
        <SummaryCard label={t.bestRegression} value={localizeMlPhrase(mlFoundationSummary.regressionBestModel, language)} hint={`R² ${formatMetric(mlFoundationSummary.regressionBestR2)}`} />
        <SummaryCard label={t.bestClassifier} value={localizeMlPhrase(mlFoundationSummary.classificationBestModel, language)} hint={`F1 ${formatMetric(mlFoundationSummary.classificationBestF1)}`} />
        <SummaryCard label={t.methodologyAssets} value={`${mlFoundationSummary.notebookCount} ${t.notebooks}`} hint={`${mlFoundationSummary.dataFiles} ${t.dataFiles} / ${mlFoundationSummary.figures} ${t.figures}`} />
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <ModelTable eyebrow={t.regressionEvidence} title={t.growthCurveModels} bestLabel={t.bestCurrentResult} rows={regressionResults.map((result) => ({ name: localizeMlPhrase(result.model, language), type: localizeMlPhrase(result.geometry, language), metricOne: `MAE ${formatMetric(result.mae)}`, metricTwo: `R² ${formatMetric(result.r2Score)}`, isBest: result.model === bestRegression?.model }))} />
        <ModelTable eyebrow={t.classificationEvidence} title={t.reviewZoneModels} bestLabel={t.bestCurrentResult} rows={classificationResults.map((result) => ({ name: localizeMlPhrase(result.model, language), type: localizeMlPhrase(result.geometry, language), metricOne: `Recall ${formatPercent(result.recall)}`, metricTwo: `F1 ${formatMetric(result.f1Score)}`, isBest: result.model === bestClassification?.model }))} />
      </section>

      <section className="rounded-[2rem] border border-amber-200/10 bg-amber-300/[0.06] p-6">
        <p className="text-sm font-semibold text-amber-100">{t.safetyBoundary}</p>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-stone-300">{language === "en" ? mlFoundationSummary.safetyNote : t.safetyFallback}</p>
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        <AssetPanel title={t.assets.notebooks} assets={notebookAssets} language={language} openLabel={t.assets.open} />
        <AssetPanel title={t.assets.data} assets={dataAssets} language={language} openLabel={t.assets.open} />
        <AssetPanel title={t.assets.figures} assets={figureAssets} language={language} openLabel={t.assets.open} />
      </section>
    </div>
  );
}

type SummaryCardProps = { label: string; value: string; hint: string };
function SummaryCard({ label, value, hint }: SummaryCardProps) {
  return (
    <article className="rounded-[1.5rem] border border-amber-200/10 bg-black/25 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-stone-400">{hint}</p>
    </article>
  );
}

type ModelTableRow = { name: string; type: string; metricOne: string; metricTwo: string; isBest: boolean };
type ModelTableProps = { eyebrow: string; title: string; bestLabel: string; rows: ModelTableRow[] };
function ModelTable({ eyebrow, title, bestLabel, rows }: ModelTableProps) {
  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
      <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">{eyebrow}</p>
      <h3 className="mt-3 text-2xl font-semibold text-white">{title}</h3>
      <div className="mt-5 grid gap-3">
        {rows.map((row) => (
          <div key={row.name} className="grid gap-3 rounded-2xl border border-stone-700 bg-black/25 p-4 text-sm md:grid-cols-[1.2fr_0.8fr_0.7fr_0.7fr] md:items-center">
            <div>
              <p className="font-semibold text-white">{row.name}</p>
              {row.isBest ? <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">{bestLabel}</p> : null}
            </div>
            <p className="text-stone-400">{row.type}</p>
            <p className="text-stone-300">{row.metricOne}</p>
            <p className="text-stone-300">{row.metricTwo}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

type AssetPanelProps = { title: string; assets: ResearchAsset[]; language: LanguageCode; openLabel: string };
function AssetPanel({ title, assets, language, openLabel }: AssetPanelProps) {
  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      <div className="mt-5 grid gap-3">
        {assets.map((asset) => (
          <a
            key={asset.path}
            href={buildGitHubSourceUrl(asset.path)}
            target="_blank"
            rel="noreferrer"
            className="group block rounded-2xl border border-stone-700 bg-black/25 p-4 transition hover:border-amber-300/45 hover:bg-amber-300/[0.08] focus:outline-none focus:ring-2 focus:ring-amber-300/70"
            aria-label={`${openLabel}: ${asset.path}`}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-semibold text-white group-hover:text-amber-100">{localizeMlPhrase(asset.title, language)}</p>
              <span className="rounded-full border border-amber-200/15 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-amber-100/80">{localizeMlPhrase(asset.type, language)}</span>
            </div>
            <p className="mt-2 break-all font-mono text-xs text-amber-100/60">{asset.path}</p>
            <p className="mt-3 text-sm leading-6 text-stone-400">{localizeMlPhrase(asset.description, language)}</p>
            <span className="mt-4 inline-flex rounded-full border border-amber-200/20 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-100 transition group-hover:bg-amber-300 group-hover:text-stone-950">
              {openLabel}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

