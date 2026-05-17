"use client";

import { appModelBridgeSummary, appModelFeatures, exportedRegressionCoefficients } from "@/lib/ml";
import { useLanguage } from "@/lib/i18n/language-context";
import { localizeMlPhrase } from "@/lib/i18n/ml-phrase-copy";
import type { LanguageCode } from "@/lib/i18n/languages";

const copy: Record<LanguageCode, {
  eyebrow: string; title: string; description: string;
  regression: string; classification: string; liveCurve: string; exportFile: string;
  regressionDetail: string; classificationDetail: string; liveCurveDetail: string;
  baseline: string; baselineDescription: string; featureContract: string;
}> = {
  en: {
    eyebrow: "App model bridge",
    title: "Model evidence becomes app logic.",
    description: "The bridge connects notebook results with the live growth check. It documents which model evidence is imported, what coefficients are used and how the browser-side logic stays fast, visible and safe.",
    regression: "Regression evidence", classification: "Classification evidence", liveCurve: "Live app curve", exportFile: "Export file",
    regressionDetail: "Best imported regression result by R².", classificationDetail: "Best imported classification result by F1/AUC.", liveCurveDetail: "Fast TypeScript bridge used by the growth check.",
    baseline: "Baseline equation", baselineDescription: "This coefficient set is kept as explainable model evidence. The live app uses a calibrated growth curve so the user experience remains readable while the project methodology remains reviewable.", featureContract: "Feature contract",
  },
  bg: {
    eyebrow: "Връзка между модел и приложение",
    title: "Доказателствата от модела стават логика в приложението.",
    description: "Този слой свързва резултатите от Jupyter тетрадките с живата проверка на растежа. Показва кои доказателства се използват, кои коефициенти са внесени и как браузърната логика остава бърза, видима и безопасна.",
    regression: "Регресионно доказателство", classification: "Класификационно доказателство", liveCurve: "Жива крива в приложението", exportFile: "Експортен файл",
    regressionDetail: "Най-добрият внесен регресионен резултат по R².", classificationDetail: "Най-добрият внесен класификационен резултат по F1/AUC.", liveCurveDetail: "Бърза TypeScript връзка, използвана от проверката на растежа.",
    baseline: "Базово уравнение", baselineDescription: "Този набор от коефициенти се пази като обяснимо доказателство от модела. Живото приложение използва калибрирана крива, за да остане разбираемо за потребителя и проверимо като проект.", featureContract: "Договор за характеристики",
  },
  it: {
    eyebrow: "Collegamento modello-app",
    title: "Le evidenze del modello diventano logica nell’app.",
    description: "Questo livello collega i risultati dei notebook al controllo crescita live. Documenta quali evidenze sono importate, quali coefficienti sono usati e come la logica browser resta veloce, visibile e sicura.",
    regression: "Evidenza regression", classification: "Evidenza classification", liveCurve: "Curva live nell’app", exportFile: "File export",
    regressionDetail: "Miglior risultato regression importato per R².", classificationDetail: "Miglior risultato classification importato per F1/AUC.", liveCurveDetail: "Bridge TypeScript veloce usato dal controllo crescita.",
    baseline: "Equazione baseline", baselineDescription: "Questo set di coefficienti resta come evidenza spiegabile del modello. L’app live usa una curva calibrata per restare leggibile per l’utente e verificabile come progetto.", featureContract: "Contratto feature",
  },
};

export function AppModelBridgeSummary() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">{t.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">{t.title}</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-stone-400">{t.description}</p>
        </div>
        <div className="w-fit rounded-full border border-amber-200/15 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-100">{appModelBridgeSummary.version}</div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <BridgeMetric label={t.regression} value={localizeMlPhrase(appModelBridgeSummary.regressionEvidenceModel, language)} detail={t.regressionDetail} />
        <BridgeMetric label={t.classification} value={localizeMlPhrase(appModelBridgeSummary.classificationEvidenceModel, language)} detail={t.classificationDetail} />
        <BridgeMetric label={t.liveCurve} value={localizeMlPhrase(appModelBridgeSummary.liveAppCurve, language)} detail={t.liveCurveDetail} />
        <BridgeMetric label={t.exportFile} value="JSON + TS" detail={appModelBridgeSummary.exportFile} />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-2xl border border-stone-700 bg-black/25 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{t.baseline}</p>
          <p className="mt-3 font-mono text-sm leading-7 text-amber-100/90">{exportedRegressionCoefficients.simpleLinear.equation}</p>
          <p className="mt-3 text-sm leading-6 text-stone-400">{t.baselineDescription}</p>
        </article>

        <article className="rounded-2xl border border-stone-700 bg-black/25 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{t.featureContract}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {appModelFeatures.map((feature) => (
              <div key={feature.key} className="rounded-2xl border border-stone-800 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-white">{localizeMlPhrase(feature.label, language)}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-amber-100/60">{localizeMlPhrase(feature.source, language)}</p>
                <p className="mt-2 text-sm leading-6 text-stone-500">{localizeMlPhrase(feature.appUsage, language)}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

type BridgeMetricProps = { label: string; value: string; detail: string };
function BridgeMetric({ label, value, detail }: BridgeMetricProps) {
  return (
    <article className="rounded-2xl border border-stone-700 bg-black/25 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-stone-400">{detail}</p>
    </article>
  );
}
