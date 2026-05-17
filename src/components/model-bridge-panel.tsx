"use client";

import type { GrowthPrediction } from "@/lib/growth-model";
import { useLanguage } from "@/lib/i18n/language-context";
import { localizeMlPhrase } from "@/lib/i18n/ml-phrase-copy";
import type { LanguageCode } from "@/lib/i18n/languages";

export type ModelBridgePanelProps = { prediction: GrowthPrediction };

const copy: Record<LanguageCode, {
  eyebrow: string;
  title: string;
  description: string;
  regression: string;
  classification: string;
  featureVector: string;
  liveSignals: string;
  safety: string;
  safetyText: string;
}> = {
  en: {
    eyebrow: "App Model Bridge",
    title: "Notebook evidence connected to the calculator.",
    description:
      "The live app does not run a heavy Python model in the browser yet. It uses exported ML evidence, model metrics and a calibrated TypeScript bridge so the calculator remains fast, visible and safe.",
    regression: "Regression evidence",
    classification: "Classification evidence",
    featureVector: "Feature vector",
    liveSignals: "Live signals",
    safety: "Safety boundary",
    safetyText: "The bridge provides orientation only and does not replace professional assessment.",
  },
  bg: {
    eyebrow: "Връзка между модел и приложение",
    title: "Доказателствата от Jupyter тетрадките са свързани с проверката.",
    description:
      "Живото приложение още не изпълнява тежък Python модел в браузъра. То използва експортирани ML резултати, метрики и калибриран TypeScript слой, за да остане бързо, видимо и безопасно.",
    regression: "Регресионно доказателство",
    classification: "Класификационно доказателство",
    featureVector: "Вектор от характеристики",
    liveSignals: "Живи сигнали",
    safety: "Граница за безопасност",
    safetyText: "Този слой дава само ориентация и не замества професионална оценка.",
  },
  it: {
    eyebrow: "Ponte modello-app",
    title: "Le evidenze dei notebook sono collegate al controllo.",
    description:
      "L’app live non esegue ancora un modello Python pesante nel browser. Usa evidenze ML esportate, metriche e un ponte TypeScript calibrato per restare veloce, visibile e sicura.",
    regression: "Evidenza Regression",
    classification: "Evidenza Classification",
    featureVector: "Vettore caratteristiche",
    liveSignals: "Segnali live",
    safety: "Limite di sicurezza",
    safetyText: "Questo livello offre solo orientamento e non sostituisce una valutazione professionale.",
  },
};

export function ModelBridgePanel({ prediction }: ModelBridgePanelProps) {
  const { language } = useLanguage();
  const t = copy[language];
  const bridge = prediction.modelBridge;

  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-black/25 p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-amber-300/70">{t.eyebrow}</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{t.title}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-400">{t.description}</p>
        </div>
        <div className="w-fit rounded-full border border-amber-200/15 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-100">{bridge.version}</div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <EvidenceCard title={localizeMlPhrase(bridge.regression.modelName, language)} label={t.regression} metric={bridge.regression.evidenceMetric} detail={localizeMlPhrase(bridge.regression.appUsage, language)} />
        <EvidenceCard title={localizeMlPhrase(bridge.classification.modelName, language)} label={t.classification} metric={bridge.classification.evidenceMetric} detail={localizeMlPhrase(bridge.classification.appUsage, language)} />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <BridgeList title={t.featureVector} items={bridge.featureVector} language={language} />
        <BridgeList title={t.liveSignals} items={bridge.appSignals} language={language} />
      </div>

      <div className="mt-5 rounded-2xl border border-amber-200/10 bg-amber-300/[0.05] p-4">
        <p className="text-sm font-semibold text-amber-100">{t.safety}</p>
        <p className="mt-2 text-sm leading-6 text-stone-400">
          {language === "en" ? bridge.safetyNote : t.safetyText}
        </p>
      </div>
    </section>
  );
}

type EvidenceCardProps = { title: string; label: string; metric: string; detail: string };
function EvidenceCard({ title, label, metric, detail }: EvidenceCardProps) {
  return (
    <article className="rounded-2xl border border-stone-700 bg-white/[0.03] p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{label}</p>
      <h4 className="mt-2 text-xl font-semibold text-white">{title}</h4>
      <p className="mt-2 font-mono text-sm text-amber-100/80">{metric}</p>
      <p className="mt-3 text-sm leading-6 text-stone-400">{detail}</p>
    </article>
  );
}

type BridgeListProps = { title: string; items: { label: string; value: string; detail: string }[]; language: LanguageCode };
function BridgeList({ title, items, language }: BridgeListProps) {
  return (
    <div className="rounded-2xl border border-stone-700 bg-white/[0.03] p-5">
      <h4 className="text-lg font-semibold text-white">{title}</h4>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <div key={`${item.label}-${item.value}`} className="rounded-2xl border border-stone-800 bg-black/20 p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-white">{localizeMlPhrase(item.label, language)}</p>
              <p className="font-mono text-sm text-amber-100/80">{item.value}</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-stone-500">{localizeMlPhrase(item.detail, language)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
