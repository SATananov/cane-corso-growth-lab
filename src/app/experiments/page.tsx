"use client";

import { AppModelBridgeSummary } from "@/components/app-model-bridge-summary";
import { BreedReferenceMethodologyPanel } from "@/components/breed-reference-methodology-panel";
import { GrowthClusterOverview } from "@/components/growth-cluster-overview";
import { MlExperimentGrid } from "@/components/ml-experiment-grid";
import { ModelEvaluationTables } from "@/components/model-evaluation-tables";
import { MlflowTrackingPanel } from "@/components/mlflow-tracking-panel";
import { MlResearchSummary } from "@/components/ml-research-summary";
import { PageHero } from "@/components/page-hero";
import { PcaExperimentPanel } from "@/components/pca-experiment-panel";
import { PageShell } from "@/components/page-shell";
import { ResearchFigureGallery } from "@/components/research-figure-gallery";
import { useLanguage } from "@/lib/i18n/language-context";
import type { LanguageCode } from "@/lib/i18n/languages";

const copy: Record<LanguageCode, {
  modelCardsEyebrow: string;
  modelCardsTitle: string;
  modelCardsDescription: string;
  workflowEyebrow: string;
  workflow: string[];
}> = {
  en: {
    modelCardsEyebrow: "Model cards",
    modelCardsTitle: "Models explained through geometry.",
    modelCardsDescription: "The metrics below keep the methodology readable: the user can use the app, while the project reviewer can still inspect the model evidence.",
    workflowEyebrow: "Methodology workflow",
    workflow: [
      "Prepare safe growth measurements and reference samples",
      "Represent each dog as a point in a coordinate or feature space",
      "Train regression models for expected growth curves",
      "Use classification models as review-zone signals",
      "Connect notebook evidence to the browser app layer",
      "Show visual evidence directly in the methodology gallery",
      "Export model coefficients and bridge them into calculator logic",
      "Use clustering and PCA to explain profile groups and visual maps",
    ],
  },
  bg: {
    modelCardsEyebrow: "Карти на моделите",
    modelCardsTitle: "Моделите са обяснени чрез геометрия.",
    modelCardsDescription: "Метриките правят методологията четима: потребителят използва приложението, а проверяващият може да види доказателствата от моделите.",
    workflowEyebrow: "Методологичен процес",
    workflow: [
      "Подготовка на безопасни измервания и референтни извадки",
      "Представяне на всяко куче като точка в координатно или feature пространство",
      "Обучение на regression модели за очаквани криви на растеж",
      "Използване на classification модели като сигнали за зона за преглед",
      "Свързване на notebook доказателства с browser слоя на приложението",
      "Показване на визуални доказателства директно в галерията на методологията",
      "Експорт на коефициенти и свързването им с calculator логиката",
      "Използване на clustering и PCA за обяснение на профилни групи и визуални карти",
    ],
  },
  it: {
    modelCardsEyebrow: "Schede modello",
    modelCardsTitle: "I modelli sono spiegati tramite geometria.",
    modelCardsDescription: "Le metriche rendono la metodologia leggibile: l’utente usa l’app, mentre chi valuta il progetto può controllare le evidenze del modello.",
    workflowEyebrow: "Flusso metodologico",
    workflow: [
      "Preparare misure di crescita sicure e campioni di riferimento",
      "Rappresentare ogni cane come punto in uno spazio di coordinate o feature",
      "Addestrare modelli di regressione per le curve di crescita attese",
      "Usare modelli di classificazione come segnali di revisione",
      "Collegare le evidenze dei notebook al livello browser dell’app",
      "Mostrare evidenze visuali direttamente nella galleria metodologica",
      "Esportare coefficienti e collegarli alla logica del calcolatore",
      "Usare clustering e PCA per spiegare gruppi di profilo e mappe visuali",
    ],
  },
};

export default function ExperimentsPage() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <PageShell>
      <div className="grid gap-8">
        <PageHero copyKey="experiments" />

        <MlResearchSummary />

        <AppModelBridgeSummary />

        <BreedReferenceMethodologyPanel />

        <ModelEvaluationTables />

        <ResearchFigureGallery />

        <GrowthClusterOverview />

        <PcaExperimentPanel />

        <MlflowTrackingPanel />

        <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">{t.modelCardsEyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">{t.modelCardsTitle}</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-stone-400">{t.modelCardsDescription}</p>
          <div className="mt-6">
            <MlExperimentGrid />
          </div>
        </section>

        <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">{t.workflowEyebrow}</p>
          <div className="mt-5 grid gap-3">
            {t.workflow.map((item, index) => (
              <div key={item} className="flex gap-4 rounded-2xl border border-stone-700 bg-black/25 p-4">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-amber-300 text-sm font-bold text-stone-950">{index + 1}</div>
                <p className="pt-2 text-sm leading-6 text-stone-300">{item}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
