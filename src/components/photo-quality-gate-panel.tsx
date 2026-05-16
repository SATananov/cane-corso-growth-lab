"use client";

import { useMemo, useState } from "react";
import type { PhotoReadinessLevel } from "@/lib/ml/photo-comparison-criteria";
import {
  evaluatePhotoQualityGate,
  photoQualityGateBands,
  photoQualityGateIssues,
  type PhotoGateIssueId,
} from "@/lib/ml/photo-quality-gate";
import { useLanguage } from "@/lib/i18n/language-context";
import type { LanguageCode } from "@/lib/i18n/languages";

type PhotoQualityGatePanelProps = {
  hasPhoto: boolean;
  onReadinessChange: (level: PhotoReadinessLevel) => void;
};

const gateCopy: Record<
  LanguageCode,
  {
    eyebrow: string;
    title: string;
    description: string;
    simulatedGate: string;
    score: string;
    selectedIssues: string;
    noIssues: string;
    applyResult: string;
    gateResult: string;
    blocksScore: string;
    allowsScore: string;
    recommendedFixes: string;
    bandsTitle: string;
    warningRejected: string;
    warningLimited: string;
  }
> = {
  en: {
    eyebrow: "Photo quality gate",
    title: "The photo must pass before visual comparison.",
    description:
      "This gate turns the photo guide into a practical readiness check. The future model will learn these same signals from labeled images.",
    simulatedGate: "Current version: checklist-based gate for ML design and user guidance.",
    score: "Readiness score",
    selectedIssues: "Detected issues",
    noIssues: "No blocking issue selected. The photo is treated as suitable.",
    applyResult: "Apply gate result to readiness status",
    gateResult: "Gate result",
    blocksScore: "Visual match score should be blocked.",
    allowsScore: "Visual comparison may continue with the shown confidence level.",
    recommendedFixes: "Recommended fixes",
    bandsTitle: "Decision bands",
    warningRejected:
      "This photo does not meet the comparison criteria. Upload a new photo before asking for a Cane Corso visual match.",
    warningLimited:
      "This photo can be reviewed only with a visible reliability warning. A cleaner photo is recommended.",
  },
  bg: {
    eyebrow: "Проверка на снимката",
    title: "Снимката трябва да мине проверка преди визуално сравнение.",
    description:
      "Този gate превръща фото указанията в практична проверка за готовност. Бъдещият модел ще се учи от същите сигнали чрез анотирани снимки.",
    simulatedGate: "Текуща версия: checklist gate за ML дизайн и насочване на потребителя.",
    score: "Оценка на готовност",
    selectedIssues: "Открити проблеми",
    noIssues: "Няма избран блокиращ проблем. Снимката се приема като подходяща.",
    applyResult: "Приложи резултата към статуса на снимката",
    gateResult: "Резултат от проверката",
    blocksScore: "Visual match score трябва да бъде блокиран.",
    allowsScore: "Визуалното сравнение може да продължи с показаното ниво на увереност.",
    recommendedFixes: "Препоръчани корекции",
    bandsTitle: "Нива на решение",
    warningRejected:
      "Снимката не отговаря на критериите за сравнение. Качи нова снимка преди да искаш визуално сходство с Cane Corso тип.",
    warningLimited:
      "Снимката може да се прегледа само с ясно предупреждение за надеждност. Препоръчва се по-чиста снимка.",
  },
  it: {
    eyebrow: "Controllo qualità foto",
    title: "La foto deve superare il controllo prima del confronto visuale.",
    description:
      "Questo gate trasforma la guida fotografica in un controllo pratico di prontezza. Il modello futuro imparerà gli stessi segnali da immagini etichettate.",
    simulatedGate: "Versione attuale: gate checklist per design ML e guida utente.",
    score: "Punteggio prontezza",
    selectedIssues: "Problemi rilevati",
    noIssues: "Nessun problema bloccante selezionato. La foto è trattata come adatta.",
    applyResult: "Applica il risultato allo stato della foto",
    gateResult: "Risultato del gate",
    blocksScore: "Il punteggio di somiglianza visuale deve essere bloccato.",
    allowsScore: "Il confronto visuale può continuare con il livello di confidenza mostrato.",
    recommendedFixes: "Correzioni consigliate",
    bandsTitle: "Fasce decisionali",
    warningRejected:
      "Questa foto non soddisfa i criteri di confronto. Carica una nuova foto prima di richiedere un match visuale Cane Corso.",
    warningLimited:
      "Questa foto può essere rivista solo con un avviso di affidabilità visibile. Si consiglia una foto più chiara.",
  },
};

const issueTranslations: Record<
  LanguageCode,
  Partial<Record<PhotoGateIssueId, { label: string; fix: string }>>
> = {
  en: {},
  bg: {
    full_body_not_visible: {
      label: "Цялото куче не се вижда",
      fix: "Качи странична снимка, на която се виждат нос, гръб, гърди, крака и лапи.",
    },
    wrong_view_angle: {
      label: "Грешен ъгъл на снимане",
      fix: "Заснеми от избрания ъгъл. За тяло първо използвай чист страничен изглед.",
    },
    dog_not_standing: {
      label: "Кучето не стои естествено изправено",
      fix: "Снимай кучето спокойно изправено върху равна повърхност.",
    },
    camera_too_high_or_low: {
      label: "Камерата е твърде високо или ниско",
      fix: "Дръж камерата близо до нивото на рамото или гърдите, не силно отгоре или отдолу.",
    },
    poor_light_or_blur: {
      label: "Лоша светлина или размазване",
      fix: "Използвай по-добра светлина и ясна снимка с четлив силует.",
    },
    body_part_hidden: {
      label: "Важна част от тялото е скрита",
      fix: "Заснеми кучето без предмети, хора или сенки да закриват тялото.",
    },
    strong_perspective_distortion: {
      label: "Силно перспективно изкривяване",
      fix: "Отдръпни се леко и избягвай екстремен широкоъгълен ефект.",
    },
  },
  it: {
    full_body_not_visible: {
      label: "Il cane intero non è visibile",
      fix: "Carica una foto laterale dove siano visibili muso, dorso, petto, zampe e piedi.",
    },
    wrong_view_angle: {
      label: "Angolazione non corretta",
      fix: "Scatta l'immagine dall'angolo richiesto. Per il corpo usa prima una vista laterale pulita.",
    },
    dog_not_standing: {
      label: "Il cane non è in posizione naturale in piedi",
      fix: "Fotografa il cane in piedi e calmo su una superficie piana.",
    },
    camera_too_high_or_low: {
      label: "Fotocamera troppo alta o troppo bassa",
      fix: "Tieni la fotocamera vicino all'altezza della spalla o del petto.",
    },
    poor_light_or_blur: {
      label: "Luce scarsa o immagine sfocata",
      fix: "Usa luce migliore e un'immagine nitida con contorno leggibile.",
    },
    body_part_hidden: {
      label: "Parte importante del corpo nascosta",
      fix: "Riscatta la foto senza oggetti, persone o ombre che coprano il corpo.",
    },
    strong_perspective_distortion: {
      label: "Forte distorsione prospettica",
      fix: "Allontanati leggermente ed evita un effetto grandangolare estremo.",
    },
  },
};

const resultStyles: Record<PhotoReadinessLevel, string> = {
  accepted: "border-emerald-300/30 bg-emerald-300/10 text-emerald-100",
  limited: "border-amber-300/30 bg-amber-300/10 text-amber-100",
  rejected: "border-red-300/30 bg-red-300/10 text-red-100",
};

function translateIssue(issueId: PhotoGateIssueId, language: LanguageCode) {
  const issue = photoQualityGateIssues.find((item) => item.id === issueId);
  const translated = issueTranslations[language][issueId];

  return {
    label: translated?.label ?? issue?.label ?? issueId,
    fix: translated?.fix ?? issue?.recommendedFix ?? "Retake the photo following the guide.",
  };
}

export function PhotoQualityGatePanel({
  hasPhoto,
  onReadinessChange,
}: PhotoQualityGatePanelProps) {
  const { language } = useLanguage();
  const copy = gateCopy[language];
  const [selectedIssues, setSelectedIssues] = useState<PhotoGateIssueId[]>([]);

  const result = useMemo(
    () => evaluatePhotoQualityGate(selectedIssues, hasPhoto),
    [hasPhoto, selectedIssues],
  );

  function toggleIssue(issueId: PhotoGateIssueId) {
    setSelectedIssues((current) =>
      current.includes(issueId)
        ? current.filter((item) => item !== issueId)
        : [...current, issueId],
    );
  }

  return (
    <section className="mt-4 rounded-3xl border border-amber-200/10 bg-white/[0.03] p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-amber-300/70">
            {copy.eyebrow}
          </p>
          <h4 className="mt-2 text-xl font-semibold text-white">{copy.title}</h4>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-400">
            {copy.description}
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-stone-500">
            {copy.simulatedGate}
          </p>
        </div>

        <div className={`rounded-2xl border px-4 py-3 text-sm ${resultStyles[result.level]}`}>
          <p className="text-xs uppercase tracking-[0.18em] opacity-80">
            {copy.score}
          </p>
          <p className="mt-1 text-3xl font-bold">{result.score}%</p>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-full border border-stone-700 bg-black/40">
        <div
          className="h-3 rounded-full bg-amber-300 transition-all"
          style={{ width: `${result.score}%` }}
        />
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-stone-700 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
            {copy.selectedIssues}
          </p>
          <div className="mt-3 grid gap-2">
            {photoQualityGateIssues.map((issue) => {
              const translated = translateIssue(issue.id, language);
              const checked = selectedIssues.includes(issue.id);

              return (
                <label
                  key={issue.id}
                  className={`flex cursor-pointer gap-3 rounded-2xl border p-3 text-sm transition ${
                    checked
                      ? "border-amber-300/30 bg-amber-300/10 text-amber-50"
                      : "border-stone-700 bg-white/[0.02] text-stone-300 hover:border-amber-200/25"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleIssue(issue.id)}
                    className="mt-1 h-4 w-4 accent-amber-300"
                    disabled={!hasPhoto}
                  />
                  <span>
                    <span className="block font-semibold">{translated.label}</span>
                    <span className="mt-1 block leading-5 text-stone-500">
                      {issue.modelSignal}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4">
          <div className={`rounded-2xl border p-4 ${resultStyles[result.level]}`}>
            <p className="text-xs uppercase tracking-[0.18em] opacity-80">
              {copy.gateResult}
            </p>
            <h5 className="mt-2 text-lg font-semibold text-white">{result.title}</h5>
            <p className="mt-2 text-sm leading-6 opacity-90">{result.summary}</p>
            <p className="mt-3 text-sm font-semibold">
              {result.shouldBlockMatchScore ? copy.blocksScore : copy.allowsScore}
            </p>
          </div>

          {result.level === "rejected" ? (
            <div className="rounded-2xl border border-red-200/15 bg-red-300/10 p-4 text-sm leading-6 text-red-100">
              {copy.warningRejected}
            </div>
          ) : null}

          {result.level === "limited" ? (
            <div className="rounded-2xl border border-amber-200/20 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100">
              {copy.warningLimited}
            </div>
          ) : null}

          <div className="rounded-2xl border border-stone-700 bg-black/20 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
              {copy.recommendedFixes}
            </p>
            {result.selectedIssues.length > 0 ? (
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-stone-300">
                {result.selectedIssues.map((issue) => {
                  const translated = translateIssue(issue.id, language);
                  return <li key={issue.id}>• {translated.fix}</li>;
                })}
              </ul>
            ) : (
              <p className="mt-3 text-sm leading-6 text-stone-400">{copy.noIssues}</p>
            )}
          </div>

          <button
            type="button"
            onClick={() => onReadinessChange(result.level)}
            disabled={!hasPhoto}
            className="rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:bg-stone-700 disabled:text-stone-400"
          >
            {copy.applyResult}
          </button>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-stone-700 bg-black/20 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
          {copy.bandsTitle}
        </p>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {photoQualityGateBands.map((band) => (
            <div key={band.level} className={`rounded-2xl border p-4 ${resultStyles[band.level]}`}>
              <p className="text-sm font-semibold capitalize">{band.level}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] opacity-75">
                {band.scoreRange}
              </p>
              <p className="mt-2 text-sm leading-6 opacity-90">{band.meaning}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
