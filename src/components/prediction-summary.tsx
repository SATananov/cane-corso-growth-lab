"use client";

import type { GrowthPrediction } from "@/lib/growth-model";
import { useLanguage } from "@/lib/i18n/language-context";
import type { LanguageCode } from "@/lib/i18n/languages";

type PredictionSummaryProps = { prediction: GrowthPrediction };

const statusStyles: Record<GrowthPrediction["status"], string> = {
  balanced_growth: "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
  below_expected: "border-sky-300/20 bg-sky-300/10 text-sky-100",
  above_expected: "border-orange-300/20 bg-orange-300/10 text-orange-100",
  review_signal: "border-amber-300/20 bg-amber-300/10 text-amber-100",
};

const localStatus: Record<LanguageCode, Record<GrowthPrediction["status"], { label: string; tone: string; message: string; recommendation: string }>> = {
  en: {
    balanced_growth: { label: "Balanced growth", tone: "Calm", message: "The point is close to the reference curve.", recommendation: "Keep measuring on a regular schedule and watch the trajectory over time." },
    below_expected: { label: "Below reference", tone: "Review", message: "The point is below the current reference curve.", recommendation: "Repeat the measurement and review the trend calmly before drawing conclusions." },
    above_expected: { label: "Above reference", tone: "Review", message: "The point is above the current reference curve.", recommendation: "Check body condition, feeding notes and repeat measurements over time." },
    review_signal: { label: "Review signal", tone: "Watch", message: "The point is near a review zone and the next measurements matter.", recommendation: "Add more measurements and compare the trend instead of judging one isolated value." },
  },
  bg: {
    balanced_growth: { label: "Балансиран растеж", tone: "Спокойно", message: "Точката е близо до референтната крива.", recommendation: "Продължи да измерваш редовно и наблюдавай траекторията във времето." },
    below_expected: { label: "Под референцията", tone: "За преглед", message: "Точката е под текущата референтна крива.", recommendation: "Повтори измерването и прегледай тенденцията спокойно, преди да правиш извод." },
    above_expected: { label: "Над референцията", tone: "За преглед", message: "Точката е над текущата референтна крива.", recommendation: "Провери телесното състояние, храненето и следващите измервания във времето." },
    review_signal: { label: "Сигнал за преглед", tone: "Наблюдавай", message: "Точката е близо до зона за преглед и следващите измервания са важни.", recommendation: "Добави още измервания и сравни тенденцията, вместо да оценяваш една изолирана стойност." },
  },
  it: {
    balanced_growth: { label: "Crescita bilanciata", tone: "Calmo", message: "Il punto è vicino alla curva di riferimento.", recommendation: "Continua a misurare regolarmente e osserva la traiettoria nel tempo." },
    below_expected: { label: "Sotto riferimento", tone: "Revisione", message: "Il punto è sotto la curva di riferimento attuale.", recommendation: "Ripeti la misurazione e valuta la tendenza con calma prima di trarre conclusioni." },
    above_expected: { label: "Sopra riferimento", tone: "Revisione", message: "Il punto è sopra la curva di riferimento attuale.", recommendation: "Controlla condizione corporea, note alimentari e misurazioni successive." },
    review_signal: { label: "Segnale di revisione", tone: "Osserva", message: "Il punto è vicino a una zona di revisione e le prossime misurazioni contano.", recommendation: "Aggiungi altre misurazioni e confronta la tendenza invece di giudicare un solo valore." },
  },
};

export function PredictionSummary({ prediction }: PredictionSummaryProps) {
  const { dictionary, language } = useLanguage();
  const status = localStatus[language][prediction.status];
  const cards = [
    { label: dictionary.prediction.expectedNow, value: `${prediction.expectedWeightNowKg} kg`, hint: dictionary.prediction.referenceCurvePoint },
    { label: dictionary.prediction.difference, value: `${prediction.weightDifferenceKg > 0 ? "+" : ""}${prediction.weightDifferenceKg} kg`, hint: `${prediction.weightDifferencePercent > 0 ? "+" : ""}${prediction.weightDifferencePercent}% ${dictionary.prediction.fromReference}` },
    { label: dictionary.prediction.estimatedAdult, value: `${prediction.estimatedAdultWeightKg} kg`, hint: dictionary.prediction.educationalEstimate },
    { label: dictionary.prediction.confidence, value: `${prediction.confidencePercent}%`, hint: dictionary.prediction.inputCompleteness },
  ];

  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-black/25 p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-amber-300/70">{dictionary.prediction.eyebrow}</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{prediction.dogName}: {status.label}</h3>
          <p className="mt-2 text-sm leading-6 text-stone-400">{status.message}</p>
        </div>
        <div className={`rounded-full border px-4 py-2 text-sm font-semibold ${statusStyles[prediction.status]}`}>{status.tone}</div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-stone-700 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-stone-500">{card.label}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{card.value}</p>
            <p className="mt-1 text-sm text-stone-500">{card.hint}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-amber-200/10 bg-amber-200/[0.04] p-4">
        <p className="text-sm font-semibold text-amber-100">{dictionary.prediction.recommendedNextStep}</p>
        <p className="mt-2 text-sm leading-6 text-stone-400">{status.recommendation}</p>
      </div>
    </section>
  );
}
