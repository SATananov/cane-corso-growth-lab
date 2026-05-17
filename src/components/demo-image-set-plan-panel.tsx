"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import type { LanguageCode } from "@/lib/i18n/languages";
import { localizeMlPhrase } from "@/lib/i18n/ml-phrase-copy";
import {
  demoImageManifestColumns,
  demoImageSetGates,
  demoImageSetGroups,
  demoImageSetPlan,
} from "@/lib/ml";

const copy: Record<LanguageCode, {
  eyebrow: string;
  title: string;
  descriptionSuffix: string;
  status: string;
  minimumStarter: string;
  targetDemo: string;
  images: string;
  viewTypes: string;
  gates: string;
  required: string;
  recommended: string;
  manifest: string;
  manifestDescription: string;
  column: string;
  purpose: string;
  metadataPurpose: string;
  milestoneSuffix: string;
}> = {
  en: {
    eyebrow: "Demo image set",
    title: "Small curated visual dataset plan",
    descriptionSuffix:
      "This is a controlled starter plan: it keeps images licensed, labeled and useful for the future photo readiness gate, breed classifier and visual similarity pipeline.",
    status: "Status",
    minimumStarter: "Minimum starter",
    targetDemo: "Target demo",
    images: "images",
    viewTypes: "View types",
    gates: "Collection gates before demo use",
    required: "Required",
    recommended: "Recommended",
    manifest: "Starter manifest columns",
    manifestDescription:
      "Each image must be described before it can be used for a demo model or visual comparison. The manifest becomes the bridge between raw images, labels and future neural training notebooks.",
    column: "Column",
    purpose: "Purpose",
    metadataPurpose: "Required metadata for source, license, breed/view label, readiness and demo usability.",
    milestoneSuffix:
      "Until this milestone is complete, the app should keep reporting visual AI as planned or demo only, not trained production evidence.",
  },
  bg: {
    eyebrow: "Demo image set",
    title: "Малък куриран план за визуален набор от данни",
    descriptionSuffix:
      "Това е контролиран начален план: снимките трябва да са лицензирани, етикетирани и полезни за бъдещата проверка на снимки, породния класификатор и процеса за визуално сходство.",
    status: "Статус",
    minimumStarter: "Минимален старт",
    targetDemo: "Цел за демо",
    images: "снимки",
    viewTypes: "Типове изглед",
    gates: "Проверки преди демо употреба",
    required: "Задължително",
    recommended: "Препоръчително",
    manifest: "Колони за начален опис",
    manifestDescription:
      "Всяка снимка трябва да бъде описана преди да се използва за демо модел или визуално сравнение. Описът е връзката между суровите снимки, етикетите и бъдещите тетрадки за невронно обучение.",
    column: "Колона",
    purpose: "Цел",
    metadataPurpose: "Задължителни метаданни за източник, лиценз, порода, изглед, готовност и демо употреба.",
    milestoneSuffix:
      "Докато този етап не е завършен, приложението трябва да показва визуалния AI като планиран или демо слой, не като обучено продукционно доказателство.",
  },
  it: {
    eyebrow: "Demo image set",
    title: "Piccolo piano dataset visuale curato",
    descriptionSuffix:
      "È un piano starter controllato: mantiene le immagini licenziate, etichettate e utili per il futuro controllo foto, breed classifier e pipeline di somiglianza visuale.",
    status: "Stato",
    minimumStarter: "Minimo starter",
    targetDemo: "Target demo",
    images: "immagini",
    viewTypes: "Tipi vista",
    gates: "Controlli prima dell’uso demo",
    required: "Richiesto",
    recommended: "Consigliato",
    manifest: "Colonne manifest starter",
    manifestDescription:
      "Ogni immagine deve essere descritta prima di essere usata per un modello demo o confronto visuale. Il manifest collega immagini raw, label e futuri notebook di training neurale.",
    column: "Colonna",
    purpose: "Scopo",
    metadataPurpose: "Metadata richiesti per fonte, licenza, razza/vista, prontezza e uso demo.",
    milestoneSuffix:
      "Finché questo milestone non è completo, l’app deve mostrare la visual AI come pianificata o demo, non come evidenza production addestrata.",
  },
};

function normalizeToken(value: string) {
  return value.replaceAll("_", " ");
}

export function DemoImageSetPlanPanel() {
  const { language } = useLanguage();
  const t = copy[language];
  const totalMinimum = demoImageSetGroups.reduce((sum, group) => sum + group.minimumCount, 0);
  const totalTarget = demoImageSetGroups.reduce((sum, group) => sum + group.targetCount, 0);

  return (
    <section className="usg-readable-card rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/20">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">{t.eyebrow}</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">{t.title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-300">
            {localizeMlPhrase(demoImageSetPlan.purpose, language)} {t.descriptionSuffix}
          </p>
        </div>

        <div className="rounded-3xl border border-amber-200/10 bg-black/25 p-5 text-sm text-stone-300">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{t.status}</p>
          <p className="mt-2 font-semibold text-amber-100">{normalizeToken(demoImageSetPlan.status)}</p>
          <p className="mt-2 text-stone-400">
            {t.minimumStarter}: {totalMinimum} {t.images} · {t.targetDemo}: {totalTarget} {t.images}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {demoImageSetGroups.map((group) => (
          <article key={group.key} className="rounded-3xl border border-stone-700/70 bg-black/25 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{localizeMlPhrase(group.title, language)}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-400">{localizeMlPhrase(group.purpose, language)}</p>
              </div>
              <span className="rounded-full border border-amber-200/15 px-3 py-1 text-xs text-amber-100/80">{group.minimumCount}–{group.targetCount}</span>
            </div>

            <div className="mt-4 rounded-2xl border border-amber-200/10 bg-white/[0.025] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{t.viewTypes}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.acceptedViewTypes.map((viewType) => <span key={viewType} className="rounded-full bg-amber-300/10 px-3 py-1 text-xs text-amber-100">{normalizeToken(viewType)}</span>)}
              </div>
            </div>

            <ul className="mt-4 space-y-2 text-sm leading-6 text-stone-400">
              {group.qualityRules.map((rule) => (
                <li key={rule} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" /><span>{localizeMlPhrase(rule, language)}</span></li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-3xl border border-amber-200/10 bg-black/25 p-5">
          <h3 className="text-xl font-semibold text-white">{t.gates}</h3>
          <div className="mt-4 space-y-3">
            {demoImageSetGates.map((gate) => (
              <div key={gate.title} className="rounded-2xl border border-stone-700/70 bg-white/[0.025] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-white">{localizeMlPhrase(gate.title, language)}</p>
                  <span className="rounded-full border border-amber-200/15 px-3 py-1 text-xs text-amber-100/80">{gate.required ? t.required : t.recommended}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-stone-400">{localizeMlPhrase(gate.description, language)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-amber-200/10 bg-black/25 p-5">
          <h3 className="text-xl font-semibold text-white">{t.manifest}</h3>
          <p className="mt-2 text-sm leading-6 text-stone-400">{t.manifestDescription}</p>

          <div className="mt-4 overflow-x-auto rounded-2xl border border-stone-700/70">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.18em] text-stone-500"><tr><th className="px-4 py-3">{t.column}</th><th className="px-4 py-3">{t.purpose}</th></tr></thead>
              <tbody className="divide-y divide-stone-800 text-stone-300">
                {demoImageManifestColumns.map((column) => (
                  <tr key={column}><td className="px-4 py-3 font-semibold text-amber-100">{column}</td><td className="px-4 py-3 text-stone-400">{t.metadataPurpose}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-amber-300/15 bg-amber-300/10 p-5 text-sm leading-7 text-amber-50">
        {localizeMlPhrase(demoImageSetPlan.recommendedFirstMilestone, language)} {t.milestoneSuffix}
      </div>
    </section>
  );
}
