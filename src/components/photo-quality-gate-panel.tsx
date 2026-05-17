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
      "Тази проверка превръща фото указанията в практична оценка за готовност. Бъдещият модел ще се учи от същите сигнали чрез анотирани снимки.",
    simulatedGate: "Текуща версия: контролен списък за ML дизайн и насочване на потребителя.",
    score: "Оценка на готовност",
    selectedIssues: "Открити проблеми",
    noIssues: "Няма избран блокиращ проблем. Снимката се приема като подходяща.",
    applyResult: "Приложи резултата към статуса на снимката",
    gateResult: "Резултат от проверката",
    blocksScore: "Оценката за визуално сходство трябва да бъде блокирана.",
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
    gateResult: "Risultato del controllo",
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
  Partial<Record<PhotoGateIssueId, { label: string; fix: string; modelSignal?: string }>>
> = {
  en: {},
  bg: {
    full_body_not_visible: {
      label: "Цялото куче не се вижда",
      fix: "Качи странична снимка, на която се виждат нос, гръб, гърди, крака и лапи.",
      modelSignal: "Липсват нужни точки от тялото за надеждно сравнение.",
    },
    wrong_view_angle: {
      label: "Грешен ъгъл на снимане",
      fix: "Заснеми от избрания ъгъл. За тяло първо използвай чист страничен изглед.",
      modelSignal: "Снимката не отговаря на избрания страничен, фронтален или профилен изглед.",
    },
    dog_not_standing: {
      label: "Кучето не стои естествено изправено",
      fix: "Снимай кучето спокойно изправено върху равна повърхност.",
      modelSignal: "Седнало, движещо се или завъртяно тяло прави геометрията ненадеждна.",
    },
    camera_too_high_or_low: {
      label: "Камерата е твърде високо или ниско",
      fix: "Дръж камерата близо до нивото на рамото или гърдите, не силно отгоре или отдолу.",
      modelSignal: "Перспективата може да разтегли или свие силуета.",
    },
    poor_light_or_blur: {
      label: "Лоша светлина или размазване",
      fix: "Използвай по-добра светлина и ясна снимка с четлив силует.",
      modelSignal: "Контурът и важните пропорции се разчитат трудно.",
    },
    body_part_hidden: {
      label: "Важна част от тялото е скрита",
      fix: "Заснеми кучето без предмети, хора или сенки да закриват тялото.",
      modelSignal: "Нужна точка от тялото е закрита или отрязана.",
    },
    strong_perspective_distortion: {
      label: "Силно перспективно изкривяване",
      fix: "Отдръпни се леко и избягвай екстремен широкоъгълен ефект.",
      modelSignal: "Обективът или ъгълът променя видимата геометрия прекалено силно.",
    },
  },
  it: {
    full_body_not_visible: {
      label: "Il cane intero non è visibile",
      fix: "Carica una foto laterale dove siano visibili muso, dorso, petto, zampe e piedi.",
      modelSignal: "L’immagine non mostra tutti i punti corporei necessari.",
    },
    wrong_view_angle: {
      label: "Angolazione non corretta",
      fix: "Scatta l'immagine dall'angolo richiesto. Per il corpo usa prima una vista laterale pulita.",
      modelSignal: "L’immagine non corrisponde alla vista laterale, frontale o di profilo richiesta.",
    },
    dog_not_standing: {
      label: "Il cane non è in posizione naturale in piedi",
      fix: "Fotografa il cane in piedi e calmo su una superficie piana.",
      modelSignal: "Seduto, in movimento o girato rende la geometria del corpo non affidabile.",
    },
    camera_too_high_or_low: {
      label: "Fotocamera troppo alta o troppo bassa",
      fix: "Tieni la fotocamera vicino all'altezza della spalla o del petto.",
      modelSignal: "La prospettiva può allungare o comprimere la silhouette.",
    },
    poor_light_or_blur: {
      label: "Luce scarsa o immagine sfocata",
      fix: "Usa luce migliore e un'immagine nitida con contorno leggibile.",
      modelSignal: "Il contorno e le proporzioni principali sono difficili da leggere.",
    },
    body_part_hidden: {
      label: "Parte importante del corpo nascosta",
      fix: "Riscatta la foto senza oggetti, persone o ombre che coprano il corpo.",
      modelSignal: "Un punto necessario del corpo è nascosto o tagliato.",
    },
    strong_perspective_distortion: {
      label: "Forte distorsione prospettica",
      fix: "Allontanati leggermente ed evita un effetto grandangolare estremo.",
      modelSignal: "La lente o l’angolo cambia troppo la geometria visibile.",
    },
  },
};


const resultTextCopy: Record<
  LanguageCode,
  Record<"no_photo" | PhotoReadinessLevel, { title: string; summary: string }>
> = {
  en: {
    no_photo: {
      title: "No photo uploaded",
      summary: "Upload a photo before the comparison-readiness gate can run.",
    },
    accepted: {
      title: "Photo accepted for visual comparison",
      summary:
        "The image follows the core criteria closely enough to continue toward geometry extraction and reference comparison.",
    },
    limited: {
      title: "Photo can be reviewed with a warning",
      summary:
        "The image has quality or perspective limitations. Any future match score must be shown as lower-confidence.",
    },
    rejected: {
      title: "Photo rejected for reliable comparison",
      summary:
        "The image does not meet the criteria required for a fair Cane Corso reference comparison.",
    },
  },
  bg: {
    no_photo: {
      title: "Още няма качена снимка",
      summary: "Качи снимка, преди проверката за готовност да може да започне.",
    },
    accepted: {
      title: "Снимката е приета за визуално сравнение",
      summary:
        "Изображението покрива основните критерии достатъчно добре, за да продължи към извличане на геометрия и сравнение с еталона.",
    },
    limited: {
      title: "Снимката може да се прегледа с предупреждение",
      summary:
        "Изображението има ограничения в качество или перспектива. Бъдещ резултат за сходство трябва да се показва с по-ниска увереност.",
    },
    rejected: {
      title: "Снимката е отхвърлена за надеждно сравнение",
      summary:
        "Изображението не покрива критериите за коректно сравнение с Cane Corso еталон.",
    },
  },
  it: {
    no_photo: {
      title: "Nessuna foto caricata",
      summary: "Carica una foto prima di avviare il controllo di prontezza al confronto.",
    },
    accepted: {
      title: "Foto accettata per il confronto visuale",
      summary:
        "L’immagine segue i criteri principali abbastanza bene per continuare verso estrazione geometrica e confronto con il riferimento.",
    },
    limited: {
      title: "Foto revisionabile con avviso",
      summary:
        "L’immagine ha limiti di qualità o prospettiva. Qualsiasi punteggio futuro deve essere mostrato con confidenza più bassa.",
    },
    rejected: {
      title: "Foto respinta per confronto affidabile",
      summary:
        "L’immagine non soddisfa i criteri necessari per un confronto equo con il riferimento Cane Corso.",
    },
  },
};

const bandCopy: Record<
  LanguageCode,
  Record<PhotoReadinessLevel, { label: string; meaning: string }>
> = {
  en: {
    accepted: { label: "Accepted", meaning: "Photo is suitable for a visual geometry comparison." },
    limited: {
      label: "Limited",
      meaning: "Photo can be reviewed, but the result must carry a reliability warning.",
    },
    rejected: {
      label: "Rejected",
      meaning: "Photo is not suitable. The visual match score should be blocked.",
    },
  },
  bg: {
    accepted: { label: "Подходяща", meaning: "Снимката е подходяща за визуално геометрично сравнение." },
    limited: {
      label: "Ограничена",
      meaning: "Снимката може да се прегледа, но резултатът трябва да има предупреждение за надеждност.",
    },
    rejected: {
      label: "Неподходяща",
      meaning: "Снимката не е подходяща. Оценката за визуално сходство трябва да бъде блокирана.",
    },
  },
  it: {
    accepted: { label: "Accettata", meaning: "La foto è adatta per un confronto geometrico visuale." },
    limited: {
      label: "Limitata",
      meaning: "La foto può essere rivista, ma il risultato deve mostrare un avviso di affidabilità.",
    },
    rejected: {
      label: "Respinta", meaning: "La foto non è adatta. Il punteggio visuale deve essere bloccato." },
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
    modelSignal: translated?.modelSignal ?? issue?.modelSignal ?? "Photo quality signal.",
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
  const resultText = resultTextCopy[language][hasPhoto ? result.level : "no_photo"];

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
                      {translated.modelSignal}
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
            <h5 className="mt-2 text-lg font-semibold text-white">{resultText.title}</h5>
            <p className="mt-2 text-sm leading-6 opacity-90">{resultText.summary}</p>
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
          {photoQualityGateBands.map((band) => {
            const localizedBand = bandCopy[language][band.level];

            return (
              <div key={band.level} className={`rounded-2xl border p-4 ${resultStyles[band.level]}`}>
                <p className="text-sm font-semibold">{localizedBand.label}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] opacity-75">
                  {band.scoreRange}
                </p>
                <p className="mt-2 text-sm leading-6 opacity-90">
                  {localizedBand.meaning}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
