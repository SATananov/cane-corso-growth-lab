"use client";

import { useMemo } from "react";
import type { DogGrowthInput } from "@/lib/growth-model";
import { useLanguage } from "@/lib/i18n/language-context";
import type { LanguageCode } from "@/lib/i18n/languages";
import {
  caneCorsoBreedReferenceGeometry,
  evaluateBreedReferenceGeometry,
  type BreedReferenceSignal,
} from "@/lib/ml/breed-reference-geometry";

type BreedReferenceGeometryPanelProps = {
  input: DogGrowthInput;
};

const copy: Record<LanguageCode, {
  eyebrow: string;
  title: string;
  description: string;
  currentOverlay: string;
  ageStage: string;
  currentHeight: string;
  currentWeight: string;
  whRatio: string;
  refRatio: string;
  heightSignal: string;
  weightSignal: string;
  nextPhotoLayer: string;
  boundary: string;
  signals: Record<BreedReferenceSignal, string>;
}> = {
  en: {
    eyebrow: "Reference Geometry",
    title: "Compare the current profile with adult Cane Corso reference context.",
    description:
      "The calculator now carries a standard-based geometry layer. For puppies and adolescents it is orientation only; final adult comparison requires maturity and correct measurements.",
    currentOverlay: "Current profile overlay",
    ageStage: "Age stage",
    currentHeight: "Current height",
    currentWeight: "Current weight",
    whRatio: "Current kg/cm",
    refRatio: "Reference kg/cm",
    heightSignal: "Height signal",
    weightSignal: "Weight signal",
    nextPhotoLayer: "Next visual layer",
    boundary:
      "This is not an official breed evaluation. It prepares the logic for later photo geometry and visual similarity review.",
    signals: {
      within_reference: "Inside reference",
      within_tolerance: "Inside tolerance",
      outside_reference: "Review carefully",
      puppy_growth: "Growing dog",
    },
  },
  bg: {
    eyebrow: "Референтна геометрия",
    title: "Сравни текущия профил с Cane Corso ориентир за възрастно куче.",
    description:
      "Калкулаторът вече има слой със стандартна геометрия. При подрастващи кучета това е само ориентация; реалното сравнение изисква зрялост и коректни измервания.",
    currentOverlay: "Текущ профил спрямо референцията",
    ageStage: "Етап на възраст",
    currentHeight: "Текуща височина",
    currentWeight: "Текущо тегло",
    whRatio: "Текущо kg/cm",
    refRatio: "Референтно kg/cm",
    heightSignal: "Сигнал за височина",
    weightSignal: "Сигнал за тегло",
    nextPhotoLayer: "Следващ визуален слой",
    boundary:
      "Това не е официална породна оценка. Слоят подготвя логиката за бъдеща фото геометрия и визуално сходство.",
    signals: {
      within_reference: "В референтната зона",
      within_tolerance: "В толеранса",
      outside_reference: "Нужен е внимателен преглед",
      puppy_growth: "Кучето още расте",
    },
  },
  it: {
    eyebrow: "Geometria di riferimento",
    title: "Confronta il profilo attuale con il riferimento adulto Cane Corso.",
    description:
      "Il calcolatore ora include un livello di geometria basato sullo standard. Per cuccioli e adolescenti è solo orientativo; il confronto adulto richiede maturità e misure corrette.",
    currentOverlay: "Profilo attuale sul riferimento",
    ageStage: "Fase di età",
    currentHeight: "Altezza attuale",
    currentWeight: "Peso attuale",
    whRatio: "kg/cm attuale",
    refRatio: "kg/cm riferimento",
    heightSignal: "Segnale altezza",
    weightSignal: "Segnale peso",
    nextPhotoLayer: "Prossimo livello visivo",
    boundary:
      "Non è una valutazione ufficiale di razza. Prepara la logica per futura geometria fotografica e revisione di somiglianza visiva.",
    signals: {
      within_reference: "Dentro il riferimento",
      within_tolerance: "Dentro la tolleranza",
      outside_reference: "Da rivedere con attenzione",
      puppy_growth: "Cane in crescita",
    },
  },
};

function statusClass(signal: BreedReferenceSignal) {
  if (signal === "within_reference") {
    return "border-emerald-300/20 bg-emerald-300/10 text-emerald-100";
  }

  if (signal === "within_tolerance" || signal === "puppy_growth") {
    return "border-amber-300/25 bg-amber-300/10 text-amber-100";
  }

  return "border-red-300/20 bg-red-300/10 text-red-100";
}

export function BreedReferenceGeometryPanel({ input }: BreedReferenceGeometryPanelProps) {
  const { language } = useLanguage();
  const t = copy[language];
  const evaluation = useMemo(() => evaluateBreedReferenceGeometry(input), [input]);
  const reference = caneCorsoBreedReferenceGeometry.adultRanges[input.sex];

  const stats = [
    {
      label: t.ageStage,
      value: evaluation.ageStage,
    },
    {
      label: t.currentHeight,
      value: `${input.heightCm} cm`,
    },
    {
      label: t.currentWeight,
      value: `${input.weightKg} kg`,
    },
    {
      label: t.whRatio,
      value: evaluation.weightHeightRatio.toFixed(3),
    },
    {
      label: t.refRatio,
      value: evaluation.referenceWeightHeightRatio.toFixed(2),
    },
  ];

  return (
    <article className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-5">
      <p className="text-xs uppercase tracking-[0.25em] text-amber-300/70">
        {t.eyebrow}
      </p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
        {t.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-stone-400">{t.description}</p>

      <div className="mt-5 rounded-3xl border border-amber-200/10 bg-black/25 p-4">
        <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
          {t.currentOverlay}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {stats.map((item) => (
            <div key={item.label} className="rounded-2xl border border-stone-700 bg-white/[0.03] p-3">
              <p className="text-xs text-stone-500">{item.label}</p>
              <p className="mt-1 text-sm font-semibold capitalize text-white">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-stone-700 bg-white/[0.03] p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-white">{t.heightSignal}</p>
              <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(evaluation.heightSignal)}`}>
                {t.signals[evaluation.heightSignal]}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-stone-400">
              {evaluation.heightMessage}
            </p>
            <p className="mt-2 text-xs text-stone-500">
              {reference.heightAtWithersCm.min}–{reference.heightAtWithersCm.max} cm · tolerance {reference.heightAtWithersCm.toleranceMin}–{reference.heightAtWithersCm.toleranceMax} cm
            </p>
          </div>

          <div className="rounded-2xl border border-stone-700 bg-white/[0.03] p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-white">{t.weightSignal}</p>
              <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(evaluation.weightSignal)}`}>
                {t.signals[evaluation.weightSignal]}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-stone-400">
              {evaluation.weightMessage}
            </p>
            <p className="mt-2 text-xs text-stone-500">
              {reference.weightKg.min}–{reference.weightKg.max} kg
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-amber-200/10 bg-amber-300/10 p-4">
        <p className="text-xs uppercase tracking-[0.22em] text-amber-200/80">
          {t.nextPhotoLayer}
        </p>
        <p className="mt-2 text-sm leading-6 text-amber-50/85">
          {evaluation.readinessNote}
        </p>
        <p className="mt-3 text-xs leading-5 text-stone-400">{t.boundary}</p>
      </div>
    </article>
  );
}
