"use client";

import type { GrowthPrediction } from "@/lib/growth-model";
import { formatStableInteger } from "@/lib/number-format";
import { useLanguage } from "@/lib/i18n/language-context";
import type { LanguageCode } from "@/lib/i18n/languages";

type OwnerGrowthResultPanelProps = {
  prediction: GrowthPrediction;
};

type StatusCopy = {
  label: string;
  tone: string;
  plainMeaning: string;
  nextAction: string;
  takeaways: string[];
};

type OwnerGrowthCopy = {
  eyebrow: string;
  title: string;
  description: string;
  chartTitle: string;
  chartDescription: string;
  referenceBand: string;
  currentDog: string;
  expectedPoint: string;
  ageAxis: string;
  weightAxis: string;
  statusLabel: string;
  chartHint: string;
  takeawaysTitle: string;
  nextActionTitle: string;
  safetyTitle: string;
  safetyText: string;
  technicalSummary: string;
  technicalDescription: string;
  monthsSuffix: string;
  kgSuffix: string;
  statuses: Record<GrowthPrediction["status"], StatusCopy>;
};

const ownerGrowthCopy: Record<LanguageCode, OwnerGrowthCopy> = {
  en: {
    eyebrow: "Owner result",
    title: "First read the simple growth picture.",
    description:
      "This panel turns the calculator numbers into a visual owner summary: where the dog sits on the growth curve, what the signal means and what to do next.",
    chartTitle: "Growth curve view",
    chartDescription:
      "The gold line is the educational reference curve. The soft band is the calm orientation zone. The bright point is the current dog.",
    referenceBand: "calm reference zone",
    currentDog: "current dog",
    expectedPoint: "expected point",
    ageAxis: "Age in months",
    weightAxis: "Weight kg",
    statusLabel: "Current signal",
    chartHint: "The chart is an orientation aid. One point is useful, but repeated measurements are better.",
    takeawaysTitle: "Main takeaways",
    nextActionTitle: "Recommended next action",
    safetyTitle: "Safe use",
    safetyText:
      "This is an educational orientation signal. It is not a veterinary diagnosis, official certification, pedigree proof or a breeding decision tool.",
    technicalSummary: "Show the technical model explanation",
    technicalDescription:
      "Regression, feature vectors, clustering, PCA and model bridge evidence are available below for project review and learning.",
    monthsSuffix: "mo",
    kgSuffix: "kg",
    statuses: {
      balanced_growth: {
        label: "Looks calm",
        tone: "Good direction",
        plainMeaning: "The current point is close to the expected growth zone for the selected reference.",
        nextAction: "Keep measuring on a regular schedule and compare the next point with the same reference.",
        takeaways: [
          "The current weight is close to the expected curve.",
          "Use the same scale and measuring routine next time.",
          "Look for a trend over time, not one isolated number.",
        ],
      },
      below_expected: {
        label: "Below the zone",
        tone: "Needs review",
        plainMeaning: "The current point is below the calm reference zone or the condition signal is low.",
        nextAction: "Repeat the measurement, check feeding notes and speak with a veterinarian if the pattern continues.",
        takeaways: [
          "The current point sits below the educational curve.",
          "A second measurement helps separate data error from a real trend.",
          "Professional guidance is appropriate if the signal repeats or the dog looks unwell.",
        ],
      },
      above_expected: {
        label: "Above the zone",
        tone: "Needs review",
        plainMeaning: "The current point is above the calm reference zone or the condition signal is high.",
        nextAction: "Review body condition, activity and feeding amount; ask a professional if the pattern continues.",
        takeaways: [
          "The current point is higher than the educational reference curve.",
          "Body condition and feeding context matter more than weight alone.",
          "Follow the next measurements before drawing a strong conclusion.",
        ],
      },
      review_signal: {
        label: "Watch closely",
        tone: "Monitor trend",
        plainMeaning: "The point is near a review area, so the next measurements are more important than this single value.",
        nextAction: "Add a new measurement in 2–4 weeks and compare the direction of the curve.",
        takeaways: [
          "The result is not alarming by itself, but it deserves monitoring.",
          "Small changes in height, weight or condition can move the signal.",
          "The best next step is another clean measurement soon.",
        ],
      },
    },
  },
  bg: {
    eyebrow: "Резултат за собственика",
    title: "Първо виж простата картина на растежа.",
    description:
      "Този панел превежда числата от калкулатора в разбираемо обобщение: къде е кучето спрямо кривата, какво означава сигналът и какво да направиш след това.",
    chartTitle: "Крива на растежа",
    chartDescription:
      "Златната линия е образователната референтна крива. Меката зона около нея е спокойната ориентировъчна зона. Светлата точка е текущото куче.",
    referenceBand: "спокойна референтна зона",
    currentDog: "текущо куче",
    expectedPoint: "очаквана точка",
    ageAxis: "Възраст в месеци",
    weightAxis: "Тегло kg",
    statusLabel: "Текущ сигнал",
    chartHint: "Графиката е ориентир. Една точка помага, но повторните измервания са по-важни.",
    takeawaysTitle: "Основни изводи",
    nextActionTitle: "Препоръчителна следваща стъпка",
    safetyTitle: "Безопасно използване",
    safetyText:
      "Това е образователен ориентир: не е ветеринарна диагноза, не е официална сертификация, не е доказателство за родословие и не е инструмент за развъдно решение.",
    technicalSummary: "Покажи техническото обяснение на модела",
    technicalDescription:
      "Регресията, векторите от характеристики, групирането, PCA и model bridge доказателствата са достъпни по-долу за защита на проекта и обучение.",
    monthsSuffix: "мес.",
    kgSuffix: "kg",
    statuses: {
      balanced_growth: {
        label: "Изглежда спокойно",
        tone: "Добра посока",
        plainMeaning: "Текущата точка е близо до очакваната зона на растеж за избраната референция.",
        nextAction: "Продължи да измерваш по редовен график и сравни следващата точка със същата референция.",
        takeaways: [
          "Текущото тегло е близо до очакваната крива.",
          "Използвай една и съща везна и еднакъв начин на измерване следващия път.",
          "Гледай тенденцията във времето, а не една изолирана стойност.",
        ],
      },
      below_expected: {
        label: "Под зоната",
        tone: "Нужен е преглед",
        plainMeaning: "Текущата точка е под спокойната референтна зона или сигналът за кондиция е нисък.",
        nextAction: "Повтори измерването, провери храненето и говори с ветеринар, ако този модел продължи.",
        takeaways: [
          "Текущата точка е под образователната крива.",
          "Второ измерване помага да се отдели грешка в данните от реална тенденция.",
          "Професионална насока е подходяща, ако сигналът се повтори или кучето изглежда зле.",
        ],
      },
      above_expected: {
        label: "Над зоната",
        tone: "Нужен е преглед",
        plainMeaning: "Текущата точка е над спокойната референтна зона или сигналът за кондиция е висок.",
        nextAction: "Прегледай кондицията, активността и храненето; говори със специалист, ако моделът продължи.",
        takeaways: [
          "Текущата точка е по-високо от образователната референтна крива.",
          "Телесната кондиция и храненето са по-важни от теглото само по себе си.",
          "Проследи следващите измервания, преди да правиш силен извод.",
        ],
      },
      review_signal: {
        label: "Наблюдавай внимателно",
        tone: "Следи тенденцията",
        plainMeaning: "Точката е близо до зона за преглед, затова следващите измервания са по-важни от тази една стойност.",
        nextAction: "Добави ново измерване след 2–4 седмици и сравни посоката на кривата.",
        takeaways: [
          "Резултатът сам по себе си не е тревога, но заслужава наблюдение.",
          "Малки промени във височина, тегло или кондиция могат да променят сигнала.",
          "Най-добрата следваща стъпка е ново чисто измерване скоро.",
        ],
      },
    },
  },
  it: {
    eyebrow: "Risultato per il proprietario",
    title: "Prima guarda il quadro semplice della crescita.",
    description:
      "Questo pannello traduce i numeri del calcolatore in un riepilogo chiaro: dove si trova il cane sulla curva, cosa significa il segnale e cosa fare dopo.",
    chartTitle: "Vista curva di crescita",
    chartDescription:
      "La linea dorata è la curva educativa di riferimento. La fascia morbida è la zona orientativa calma. Il punto luminoso è il cane attuale.",
    referenceBand: "zona calma di riferimento",
    currentDog: "cane attuale",
    expectedPoint: "punto atteso",
    ageAxis: "Età in mesi",
    weightAxis: "Peso kg",
    statusLabel: "Segnale attuale",
    chartHint: "Il grafico è un orientamento. Un punto aiuta, ma le misurazioni ripetute sono più importanti.",
    takeawaysTitle: "Punti principali",
    nextActionTitle: "Prossimo passo consigliato",
    safetyTitle: "Uso sicuro",
    safetyText:
      "È un segnale educativo di orientamento: non è una diagnosi veterinaria, non è una certificazione ufficiale, non è una prova di pedigree e non è uno strumento per decisioni di allevamento.",
    technicalSummary: "Mostra la spiegazione tecnica del modello",
    technicalDescription:
      "Regressione, vettori di caratteristiche, clustering, PCA ed evidenze model bridge sono disponibili sotto per revisione del progetto e apprendimento.",
    monthsSuffix: "mesi",
    kgSuffix: "kg",
    statuses: {
      balanced_growth: {
        label: "Sembra calmo",
        tone: "Buona direzione",
        plainMeaning: "Il punto attuale è vicino alla zona di crescita attesa per il riferimento scelto.",
        nextAction: "Continua a misurare regolarmente e confronta il prossimo punto con lo stesso riferimento.",
        takeaways: [
          "Il peso attuale è vicino alla curva attesa.",
          "Usa la stessa bilancia e la stessa routine di misurazione la prossima volta.",
          "Osserva la tendenza nel tempo, non un singolo numero isolato.",
        ],
      },
      below_expected: {
        label: "Sotto la zona",
        tone: "Da rivedere",
        plainMeaning: "Il punto attuale è sotto la zona calma di riferimento o il segnale di condizione è basso.",
        nextAction: "Ripeti la misurazione, controlla le note alimentari e parla con un veterinario se il modello continua.",
        takeaways: [
          "Il punto attuale è sotto la curva educativa.",
          "Una seconda misurazione aiuta a separare errore nei dati e vera tendenza.",
          "Una guida professionale è appropriata se il segnale si ripete o il cane sembra stare male.",
        ],
      },
      above_expected: {
        label: "Sopra la zona",
        tone: "Da rivedere",
        plainMeaning: "Il punto attuale è sopra la zona calma di riferimento o il segnale di condizione è alto.",
        nextAction: "Rivedi condizione corporea, attività e alimentazione; chiedi a un professionista se il modello continua.",
        takeaways: [
          "Il punto attuale è più alto della curva educativa di riferimento.",
          "Condizione corporea e alimentazione contano più del peso da solo.",
          "Segui le prossime misurazioni prima di trarre una conclusione forte.",
        ],
      },
      review_signal: {
        label: "Osserva con attenzione",
        tone: "Monitora tendenza",
        plainMeaning: "Il punto è vicino a una zona di revisione, quindi le prossime misurazioni contano più di questo singolo valore.",
        nextAction: "Aggiungi una nuova misurazione tra 2–4 settimane e confronta la direzione della curva.",
        takeaways: [
          "Il risultato non è allarmante da solo, ma merita monitoraggio.",
          "Piccoli cambiamenti in altezza, peso o condizione possono spostare il segnale.",
          "Il miglior prossimo passo è una nuova misurazione pulita a breve.",
        ],
      },
    },
  },
};

const statusClasses: Record<GrowthPrediction["status"], { card: string; marker: string; badge: string }> = {
  balanced_growth: {
    card: "border-emerald-300/25 bg-emerald-300/10",
    marker: "left-[17%] bg-emerald-300 shadow-emerald-300/40",
    badge: "border-emerald-300/30 bg-emerald-300/10 text-emerald-100",
  },
  review_signal: {
    card: "border-amber-300/25 bg-amber-300/10",
    marker: "left-1/2 bg-amber-300 shadow-amber-300/40",
    badge: "border-amber-300/30 bg-amber-300/10 text-amber-100",
  },
  below_expected: {
    card: "border-sky-300/25 bg-sky-300/10",
    marker: "left-[83%] bg-sky-300 shadow-sky-300/40",
    badge: "border-sky-300/30 bg-sky-300/10 text-sky-100",
  },
  above_expected: {
    card: "border-orange-300/25 bg-orange-300/10",
    marker: "left-[83%] bg-orange-300 shadow-orange-300/40",
    badge: "border-orange-300/30 bg-orange-300/10 text-orange-100",
  },
};

function scale(value: number, min: number, max: number, outputMin: number, outputMax: number) {
  if (max === min) return outputMin;
  return outputMin + ((value - min) / (max - min)) * (outputMax - outputMin);
}

function formatOneDecimal(value: number) {
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

function buildPolyline(points: Array<{ ageMonths: number; weightKg: number }>, xForAge: (age: number) => number, yForWeight: (weight: number) => number) {
  return points
    .map((point) => `${xForAge(point.ageMonths)},${yForWeight(point.weightKg)}`)
    .join(" ");
}

export function OwnerGrowthResultPanel({ prediction }: OwnerGrowthResultPanelProps) {
  const { language } = useLanguage();
  const copy = ownerGrowthCopy[language];
  const status = copy.statuses[prediction.status];
  const styles = statusClasses[prediction.status];

  const width = 680;
  const height = 360;
  const chart = { left: 58, right: 34, top: 34, bottom: 56 };
  const xMin = 2;
  const xMax = 24;
  const yMin = 0;
  const yMax = Math.max(70, prediction.estimatedAdultWeightKg + 10);
  const xForAge = (age: number) => scale(age, xMin, xMax, chart.left, width - chart.right);
  const yForWeight = (weight: number) => scale(weight, yMin, yMax, height - chart.bottom, chart.top);

  const expectedPoints = prediction.curve.map((point) => ({
    ageMonths: point.ageMonths,
    weightKg: point.expectedWeightKg,
  }));
  const upperBand = prediction.curve.map((point) => ({
    ageMonths: point.ageMonths,
    weightKg: point.expectedWeightKg * 1.1,
  }));
  const lowerBand = [...prediction.curve].reverse().map((point) => ({
    ageMonths: point.ageMonths,
    weightKg: point.expectedWeightKg * 0.9,
  }));
  const calmBandPoints = [...upperBand, ...lowerBand];

  const calmBand = buildPolyline(calmBandPoints, xForAge, yForWeight);
  const expectedLine = buildPolyline(expectedPoints, xForAge, yForWeight);
  const dogX = xForAge(prediction.coordinate.xAgeMonths);
  const dogY = yForWeight(prediction.coordinate.yWeightKg);
  const expectedX = xForAge(prediction.coordinate.xAgeMonths);
  const expectedY = yForWeight(prediction.expectedWeightNowKg);
  const xTicks = [2, 6, 10, 14, 18, 22];
  const yTicks = [10, 25, 40, 55, 70];

  return (
    <section
      id="owner-growth-summary"
      className={`usg-readable-card rounded-[2rem] border p-5 ${styles.card}`}
      aria-labelledby="owner-growth-summary-title"
    >
      <div className="grid gap-6 2xl:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-amber-200/80">
            {copy.eyebrow}
          </p>
          <h3 id="owner-growth-summary-title" className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {copy.title}
          </h3>
          <p className="mt-3 text-base leading-7 text-stone-300">
            {copy.description}
          </p>

          <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
                  {copy.statusLabel}
                </p>
                <p className="mt-1 text-2xl font-semibold text-white">
                  {status.label}
                </p>
              </div>
              <span className={`rounded-full border px-4 py-2 text-sm font-semibold ${styles.badge}`}>
                {status.tone}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-stone-300">
              {status.plainMeaning}
            </p>

            <div className="mt-5">
              <div className="relative h-3 overflow-hidden rounded-full bg-stone-800">
                <div className="absolute inset-y-0 left-0 w-1/3 bg-emerald-300/35" />
                <div className="absolute inset-y-0 left-1/3 w-1/3 bg-amber-300/35" />
                <div className="absolute inset-y-0 right-0 w-1/3 bg-orange-300/35" />
                <span
                  className={`absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-black shadow-lg ${styles.marker}`}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <MetricCard
              label={language === "bg" ? "Текущо тегло" : language === "it" ? "Peso attuale" : "Current weight"}
              value={`${formatOneDecimal(prediction.coordinate.yWeightKg)} ${copy.kgSuffix}`}
            />
            <MetricCard
              label={language === "bg" ? "Очаквано сега" : language === "it" ? "Atteso ora" : "Expected now"}
              value={`${formatOneDecimal(prediction.expectedWeightNowKg)} ${copy.kgSuffix}`}
            />
            <MetricCard
              label={language === "bg" ? "Разлика" : language === "it" ? "Differenza" : "Difference"}
              value={`${prediction.weightDifferenceKg > 0 ? "+" : ""}${formatOneDecimal(prediction.weightDifferenceKg)} ${copy.kgSuffix}`}
            />
            <MetricCard
              label={language === "bg" ? "Прогрес" : language === "it" ? "Progresso" : "Progress"}
              value={`${formatStableInteger(prediction.growthProgressPercent)}%`}
            />
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">{copy.chartTitle}</p>
              <p className="mt-1 text-sm leading-6 text-stone-400">{copy.chartDescription}</p>
            </div>
            <span className="rounded-full border border-amber-200/15 px-3 py-1 text-xs font-semibold text-amber-100/80">
              {prediction.coordinate.xAgeMonths} {copy.monthsSuffix}
            </span>
          </div>

          <div className="mt-4 overflow-hidden rounded-3xl border border-stone-700 bg-[#11100d] p-3">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              role="img"
              aria-label="Owner-friendly Cane Corso growth chart"
              className="h-auto w-full"
            >
              <defs>
                <linearGradient id="owner-growth-band" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0" stopColor="rgba(16,185,129,0.18)" />
                  <stop offset="1" stopColor="rgba(251,191,36,0.2)" />
                </linearGradient>
              </defs>

              <rect width={width} height={height} rx="24" fill="#11100d" />
              {yTicks.map((tick) => {
                const y = yForWeight(tick);
                return (
                  <g key={tick}>
                    <line x1={chart.left} x2={width - chart.right} y1={y} y2={y} stroke="rgba(120,113,108,0.18)" />
                    <text x={chart.left - 12} y={y + 4} textAnchor="end" fill="rgba(214,211,209,0.55)" fontSize="12">
                      {tick}
                    </text>
                  </g>
                );
              })}
              {xTicks.map((tick) => {
                const x = xForAge(tick);
                return (
                  <g key={tick}>
                    <line x1={x} x2={x} y1={chart.top} y2={height - chart.bottom} stroke="rgba(120,113,108,0.12)" />
                    <text x={x} y={height - 24} textAnchor="middle" fill="rgba(214,211,209,0.55)" fontSize="12">
                      {tick}
                    </text>
                  </g>
                );
              })}

              <polygon points={calmBand} fill="url(#owner-growth-band)" stroke="rgba(251,191,36,0.2)" strokeWidth="1" />
              <polyline points={expectedLine} fill="none" stroke="rgba(251,191,36,0.92)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

              <line
                x1={expectedX}
                x2={dogX}
                y1={expectedY}
                y2={dogY}
                stroke="rgba(255,255,255,0.4)"
                strokeDasharray="6 6"
                strokeWidth="2"
              />
              <circle cx={expectedX} cy={expectedY} r="7" fill="rgba(251,191,36,0.95)" />
              <circle cx={dogX} cy={dogY} r="12" fill="rgba(255,255,255,0.96)" stroke="rgba(251,191,36,0.95)" strokeWidth="5" />
              <text x={dogX + 16} y={dogY - 12} fill="rgba(255,255,255,0.92)" fontSize="13" fontWeight="700">
                {copy.currentDog}
              </text>
              <text x={expectedX + 14} y={expectedY + 22} fill="rgba(251,191,36,0.9)" fontSize="12">
                {copy.expectedPoint}
              </text>
              <text x={width / 2} y={height - 6} textAnchor="middle" fill="rgba(214,211,209,0.65)" fontSize="12">
                {copy.ageAxis}
              </text>
              <text x="18" y={height / 2} transform={`rotate(-90 18 ${height / 2})`} textAnchor="middle" fill="rgba(214,211,209,0.65)" fontSize="12">
                {copy.weightAxis}
              </text>
            </svg>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 text-xs text-stone-400">
            <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-emerald-100">
              {copy.referenceBand}
            </span>
            <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-amber-100">
              {copy.expectedPoint}
            </span>
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-white">
              {copy.currentDog}
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-stone-400">{copy.chartHint}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
            {copy.takeawaysTitle}
          </p>
          <ul className="mt-3 grid gap-3">
            {status.takeaways.map((takeaway) => (
              <li key={takeaway} className="flex gap-3 text-sm leading-6 text-stone-300">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-300" aria-hidden="true" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[1.5rem] border border-amber-200/15 bg-amber-300/10 p-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-100">
            {copy.nextActionTitle}
          </p>
          <p className="mt-3 text-base leading-7 text-white">{status.nextAction}</p>
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-3">
            <p className="text-sm font-semibold text-white">{copy.safetyTitle}</p>
            <p className="mt-2 text-sm leading-6 text-stone-300">{copy.safetyText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

type MetricCardProps = {
  label: string;
  value: string;
};

function MetricCard({ label, value }: MetricCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-black/25 p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-stone-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </article>
  );
}

export function OwnerTechnicalDetailsIntro() {
  const { language } = useLanguage();
  const copy = ownerGrowthCopy[language];

  return (
    <span className="block rounded-[1.5rem] border border-stone-700 bg-white/[0.03] p-4 normal-case tracking-normal">
      <span className="block text-sm font-semibold text-white">{copy.technicalSummary}</span>
      <span className="mt-2 block text-sm font-normal leading-6 text-stone-400">
        {copy.technicalDescription}
      </span>
    </span>
  );
}
