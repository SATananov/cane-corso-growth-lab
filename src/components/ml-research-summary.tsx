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
  assets: { notebooks: string; data: string; figures: string; appUse: string; referenceFile: string };
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
    assets: { notebooks: "Notebooks", data: "Data", figures: "Figures", appUse: "App use", referenceFile: "Reference file" },
  },
  bg: {
    methodologyStatus: "РЎС‚Р°С‚СѓСЃ РЅР° РјРµС‚РѕРґРѕР»РѕРіРёСЏС‚Р°",
    notebookConnected: "Notebook РѕСЃРЅРѕРІР°С‚Р° Рµ СЃРІСЉСЂР·Р°РЅР° СЃ РїСЂРёР»РѕР¶РµРЅРёРµС‚Рѕ",
    bestRegression: "РќР°Р№-РґРѕР±СЉСЂ regression РјРѕРґРµР»",
    bestClassifier: "РќР°Р№-РґРѕР±СЉСЂ classification РјРѕРґРµР»",
    methodologyAssets: "РњРµС‚РѕРґРѕР»РѕРіРёС‡РЅРё С„Р°Р№Р»РѕРІРµ",
    notebooks: "notebook-Рё",
    dataFiles: "С„Р°Р№Р»Р° СЃ РґР°РЅРЅРё",
    figures: "С„РёРіСѓСЂРё",
    regressionEvidence: "Regression РґРѕРєР°Р·Р°С‚РµР»СЃС‚РІР°",
    growthCurveModels: "РњРѕРґРµР»Рё Р·Р° РєСЂРёРІР° РЅР° СЂР°СЃС‚РµР¶",
    classificationEvidence: "Classification РґРѕРєР°Р·Р°С‚РµР»СЃС‚РІР°",
    reviewZoneModels: "РњРѕРґРµР»Рё Р·Р° Р·РѕРЅРё Р·Р° РїСЂРµРіР»РµРґ",
    bestCurrentResult: "РќР°Р№-РґРѕР±СЉСЂ С‚РµРєСѓС‰ СЂРµР·СѓР»С‚Р°С‚",
    safetyBoundary: "Р“СЂР°РЅРёС†Р° Р·Р° Р±РµР·РѕРїР°СЃРЅРѕСЃС‚",
    safetyFallback: "РњРµС‚РѕРґРѕР»РѕРіРёСЏС‚Р° РїРѕРєР°Р·РІР° РѕСЂРёРµРЅС‚РёСЂРѕРІСЉС‡РЅРё СЃРёРіРЅР°Р»Рё Рё РЅРµ РґРѕРєР°Р·РІР° РґРёР°РіРЅРѕР·Р°, РїРѕСЂРѕРґРЅР° С‡РёСЃС‚РѕС‚Р°, СЂРѕРґРѕСЃР»РѕРІРёРµ, РіРµРЅРµС‚РёС‡РµРЅ РїСЂРѕРёР·С…РѕРґ РёР»Рё РѕС„РёС†РёР°Р»РµРЅ СЃС‚Р°С‚СѓСЃ.",
    assets: { notebooks: "Notebook-Рё", data: "Р”Р°РЅРЅРё", figures: "Р¤РёРіСѓСЂРё", appUse: "РЈРїРѕС‚СЂРµР±Р° РІ РїСЂРёР»РѕР¶РµРЅРёРµС‚Рѕ", referenceFile: "Р РµС„РµСЂРµРЅС‚РµРЅ С„Р°Р№Р»" },
  },
  it: {
    methodologyStatus: "Stato metodologia",
    notebookConnected: "La base notebook ГЁ collegata allвЂ™app",
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
    assets: { notebooks: "Notebook", data: "Dati", figures: "Figure", appUse: "Uso nellвЂ™app", referenceFile: "File di riferimento" },
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
        <SummaryCard label={t.methodologyStatus} value={mlFoundationSummary.status} hint={t.notebookConnected} />
        <SummaryCard label={t.bestRegression} value={mlFoundationSummary.regressionBestModel} hint={`RВІ ${formatMetric(mlFoundationSummary.regressionBestR2)}`} />
        <SummaryCard label={t.bestClassifier} value={mlFoundationSummary.classificationBestModel} hint={`F1 ${formatMetric(mlFoundationSummary.classificationBestF1)}`} />
        <SummaryCard label={t.methodologyAssets} value={`${mlFoundationSummary.notebookCount} ${t.notebooks}`} hint={`${mlFoundationSummary.dataFiles} ${t.dataFiles} / ${mlFoundationSummary.figures} ${t.figures}`} />
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <ModelTable eyebrow={t.regressionEvidence} title={t.growthCurveModels} bestLabel={t.bestCurrentResult} rows={regressionResults.map((result) => ({ name: result.model, type: result.geometry, metricOne: `MAE ${formatMetric(result.mae)}`, metricTwo: `RВІ ${formatMetric(result.r2Score)}`, isBest: result.model === bestRegression?.model }))} />
        <ModelTable eyebrow={t.classificationEvidence} title={t.reviewZoneModels} bestLabel={t.bestCurrentResult} rows={classificationResults.map((result) => ({ name: result.model, type: result.geometry, metricOne: `Recall ${formatPercent(result.recall)}`, metricTwo: `F1 ${formatMetric(result.f1Score)}`, isBest: result.model === bestClassification?.model }))} />
      </section>

      <section className="rounded-[2rem] border border-amber-200/10 bg-amber-300/[0.06] p-6">
        <p className="text-sm font-semibold text-amber-100">{t.safetyBoundary}</p>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-stone-300">{language === "en" ? mlFoundationSummary.safetyNote : t.safetyFallback}</p>
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        <AssetPanel title={t.assets.notebooks} assets={notebookAssets} />
        <AssetPanel title={t.assets.data} assets={dataAssets} />
        <AssetPanel title={t.assets.figures} assets={figureAssets} />
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

type AssetPanelProps = { title: string; assets: ResearchAsset[] };
function AssetPanel({ title, assets }: AssetPanelProps) {
  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      <div className="mt-5 grid gap-3">
        {assets.map((asset) => (
          <article key={asset.path} className="rounded-2xl border border-stone-700 bg-black/25 p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="font-semibold text-white">{asset.title}</p>
              <span className="rounded-full border border-amber-200/15 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-amber-100/80">{asset.type}</span>
            </div>
            <p className="mt-2 font-mono text-xs text-amber-100/60">{asset.path}</p>
            <p className="mt-3 text-sm leading-6 text-stone-400">{asset.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

