"use client";

import type { GrowthPrediction } from "@/lib/growth-model";
import { useLanguage } from "@/lib/i18n/language-context";
import type { LanguageCode } from "@/lib/i18n/languages";
import type { ReportTone } from "@/lib/ml/growth-explainability";

type GrowthIntelligenceReportProps = { prediction: GrowthPrediction };

const factorToneStyles: Record<ReportTone, string> = {
  positive: "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
  watch: "border-amber-300/20 bg-amber-300/10 text-amber-100",
  attention: "border-orange-300/20 bg-orange-300/10 text-orange-100",
  neutral: "border-stone-500/30 bg-stone-500/10 text-stone-200",
};

const copy: Record<LanguageCode, {
  eyebrow: string;
  title: string;
  confidence: string;
  explain: string;
  checklist: string;
  methodology: string;
  safety: string;
  tones: Record<ReportTone, string>;
  headline: Record<GrowthPrediction["status"], string>;
  summary: string;
  factors: string[];
  impacts: string[];
  modelSections: { title: string; detail: string }[];
  checklistItems: string[];
  technical: string;
  safetyText: string;
}> = {
  en: {
    eyebrow: "Explainability Panel",
    title: "Growth Intelligence Report",
    confidence: "Report confidence",
    explain: "How the app explains the signal",
    checklist: "Owner review checklist",
    methodology: "Methodology summary",
    safety: "Safety boundary",
    tones: { positive: "calm signal", watch: "watch trend", attention: "owner review", neutral: "context" },
    headline: {
      balanced_growth: "The current profile is inside the calm educational growth zone.",
      below_expected: "The current profile is below the reference curve and needs owner review.",
      above_expected: "The current profile is above the reference curve and needs owner review.",
      review_signal: "The current profile is close to the zone, but the next measurements matter.",
    },
    summary: "The app compares the entered point with an educational reference curve and explains the distance in plain language.",
    factors: ["Coordinate position", "Distance from curve", "Body condition score", "Age range confidence"],
    impacts: [
      "This is the main point on the growth map: age on X-axis and weight on Y-axis.",
      "This explains how far the entered weight is from the current reference curve point.",
      "This supports a review signal only and is not a diagnosis.",
      "The bridge is most useful during active growth, where repeated measurements show trajectory.",
    ],
    modelSections: [
      { title: "Regression layer", detail: "Explains growth as a curve and estimates the expected point for the selected age." },
      { title: "Classification layer", detail: "Inspires careful review zones without medical claims." },
      { title: "Geometry layer", detail: "Shows the dog as a point and explains the distance from the curve." },
    ],
    checklistItems: ["Record measurements regularly.", "Watch the trend over time.", "Use professional advice when a concern persists."],
    technical: "Inputs are transformed into growth, geometry and review-zone signals inside the app.",
    safetyText: "This report is orientation only. It is not veterinary advice, diagnosis or official evaluation.",
  },
  bg: {
    eyebrow: "Обяснителен панел",
    title: "Отчет за растежа",
    confidence: "Увереност на отчета",
    explain: "Как приложението обяснява сигнала",
    checklist: "Списък за преглед от собственика",
    methodology: "Обобщение на методологията",
    safety: "Граница за безопасност",
    tones: { positive: "спокоен сигнал", watch: "наблюдавай", attention: "за преглед", neutral: "контекст" },
    headline: {
      balanced_growth: "Текущият профил е в спокойната образователна зона на растеж.",
      below_expected: "Текущият профил е под референтната крива и изисква преглед от собственика.",
      above_expected: "Текущият профил е над референтната крива и изисква преглед от собственика.",
      review_signal: "Текущият профил е близо до зона за преглед и следващите измервания са важни.",
    },
    summary: "Приложението сравнява въведената точка с образователна референтна крива и обяснява разликата на разбираем език.",
    factors: ["Координатна позиция", "Разстояние от кривата", "Телесно състояние", "Увереност според възрастта"],
    impacts: [
      "Това е основната точка на картата: възраст по X и тегло по Y.",
      "Показва колко въведеното тегло се различава от текущата референтна точка.",
      "Използва се само като сигнал за преглед, не като диагноза.",
      "Слоят е най-полезен в активния растеж, когато повторните измервания показват траектория.",
    ],
    modelSections: [
      { title: "Регресионен слой", detail: "Обяснява растежа като крива и оценява очакваната точка за избраната възраст." },
      { title: "Класификационен слой", detail: "Подкрепя внимателни зони за преглед без медицински твърдения." },
      { title: "Геометричен слой", detail: "Показва кучето като точка и обяснява разстоянието от кривата." },
    ],
    checklistItems: ["Записвай измерванията редовно.", "Следи тенденцията във времето.", "Потърси професионален съвет, ако сигналът се повтаря."],
    technical: "Въведените данни се превръщат в сигнали за растеж, геометрия и зона за преглед.",
    safetyText: "Този отчет е само ориентация. Не е ветеринарен съвет, диагноза или официална оценка.",
  },
  it: {
    eyebrow: "Pannello spiegazione",
    title: "Report crescita",
    confidence: "Confidenza del report",
    explain: "Come l’app spiega il segnale",
    checklist: "Checklist proprietario",
    methodology: "Sintesi metodologia",
    safety: "Limite di sicurezza",
    tones: { positive: "segnale calmo", watch: "osserva", attention: "revisione", neutral: "contesto" },
    headline: {
      balanced_growth: "Il profilo attuale è nella zona educativa calma di crescita.",
      below_expected: "Il profilo attuale è sotto la curva di riferimento e richiede revisione.",
      above_expected: "Il profilo attuale è sopra la curva di riferimento e richiede revisione.",
      review_signal: "Il profilo è vicino a una zona di revisione e le prossime misurazioni contano.",
    },
    summary: "L’app confronta il punto inserito con una curva educativa di riferimento e spiega la distanza in modo chiaro.",
    factors: ["Posizione coordinata", "Distanza dalla curva", "Condizione corporea", "Confidenza per età"],
    impacts: [
      "È il punto principale sulla mappa: età sull’asse X e peso sull’asse Y.",
      "Spiega quanto il peso inserito differisce dal punto di riferimento attuale.",
      "Supporta solo un segnale di revisione, non una diagnosi.",
      "Il ponte è più utile durante la crescita attiva, quando misurazioni ripetute mostrano la traiettoria.",
    ],
    modelSections: [
      { title: "Livello Regression", detail: "Spiega la crescita come curva e stima il punto atteso per l’età selezionata." },
      { title: "Livello Classification", detail: "Supporta zone di revisione caute senza affermazioni mediche." },
      { title: "Livello geometrico", detail: "Mostra il cane come punto e spiega la distanza dalla curva." },
    ],
    checklistItems: ["Registra le misurazioni regolarmente.", "Osserva la tendenza nel tempo.", "Chiedi parere professionale se il segnale persiste."],
    technical: "Gli input diventano segnali di crescita, geometria e zona di revisione.",
    safetyText: "Questo report è solo orientativo. Non è consiglio veterinario, diagnosi o valutazione ufficiale.",
  },
};

export function GrowthIntelligenceReport({ prediction }: GrowthIntelligenceReportProps) {
  const { language } = useLanguage();
  const t = copy[language];
  const report = prediction.intelligenceReport;
  const factorValues = [
    `${prediction.coordinate.xAgeMonths}m / ${prediction.coordinate.yWeightKg}kg`,
    `${prediction.weightDifferenceKg > 0 ? "+" : ""}${prediction.weightDifferenceKg} kg / ${prediction.weightDifferencePercent > 0 ? "+" : ""}${prediction.weightDifferencePercent}%`,
    report.keyFactors[2]?.value ?? "—",
    `${prediction.growthProgressPercent}%`,
  ];

  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-black/25 p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-300/70">{t.eyebrow}</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{t.title}</h3>
          <p className="mt-3 text-lg leading-7 text-amber-50">{t.headline[prediction.status]}</p>
          <p className="mt-3 text-sm leading-6 text-stone-400">{t.summary}</p>
        </div>

        <div className="rounded-3xl border border-amber-200/10 bg-amber-200/[0.04] p-4 lg:w-72">
          <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{t.confidence}</p>
          <p className="mt-2 text-3xl font-semibold text-white">{prediction.confidencePercent}%</p>
          <p className="mt-2 text-sm leading-6 text-stone-400">{language === "en" ? report.confidenceInterpretation : t.summary}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-4">
        {report.keyFactors.map((factor, index) => (
          <article key={factor.label} className="rounded-3xl border border-stone-700 bg-white/[0.03] p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.16em] text-stone-500">{t.factors[index]}</p>
              <span className={`rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] ${factorToneStyles[factor.tone]}`}>{t.tones[factor.tone]}</span>
            </div>
            <p className="mt-3 text-xl font-semibold text-white">{factorValues[index]}</p>
            <p className="mt-2 text-sm leading-6 text-stone-400">{t.impacts[index]}</p>
          </article>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-3xl border border-stone-700 bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-300/70">{t.explain}</p>
          <div className="mt-4 grid gap-3">
            {t.modelSections.map((section) => (
              <div key={section.title} className="rounded-2xl border border-amber-200/10 bg-black/20 p-4">
                <p className="font-semibold text-white">{section.title}</p>
                <p className="mt-2 text-sm leading-6 text-stone-400">{section.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-amber-200/10 bg-amber-200/[0.04] p-5">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-300/70">{t.checklist}</p>
          <ul className="mt-4 grid gap-3">
            {t.checklistItems.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-stone-300"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-300" /><span>{item}</span></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-stone-700 bg-black/20 p-4">
          <p className="text-sm font-semibold text-white">{t.methodology}</p>
          <p className="mt-2 text-sm leading-6 text-stone-400">{language === "en" ? report.technicalSummary : t.technical}</p>
        </div>
        <div className="rounded-2xl border border-orange-300/20 bg-orange-300/[0.06] p-4">
          <p className="text-sm font-semibold text-orange-100">{t.safety}</p>
          <p className="mt-2 text-sm leading-6 text-stone-400">{t.safetyText}</p>
        </div>
      </div>
    </section>
  );
}
