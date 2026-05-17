"use client";

import { caneCorsoBreedReferenceGeometry } from "@/lib/ml/breed-reference-geometry";
import { useLanguage } from "@/lib/i18n/language-context";
import type { LanguageCode } from "@/lib/i18n/languages";

const copy: Record<LanguageCode, {
  eyebrow: string;
  title: string;
  description: string;
  source: string;
  adultRanges: string;
  male: string;
  female: string;
  height: string;
  weight: string;
  tolerance: string;
  ratio: string;
  proportions: string;
  headers: [string, string, string, string];
  note: string;
}> = {
  en: {
    eyebrow: "Breed Reference Geometry",
    title: "Standard-based dimensions become a transparent reference layer.",
    description:
      "The app uses Cane Corso reference geometry as orientation context. It is not an official judging decision and it cannot prove pedigree or breed purity.",
    source: "Reference source",
    adultRanges: "Adult height and weight reference",
    male: "Male",
    female: "Female",
    height: "Height at withers",
    weight: "Weight",
    tolerance: "Tolerance band",
    ratio: "kg/cm ratio",
    proportions: "Core proportion formulas",
    headers: ["Reference", "Formula", "Target band", "App use"],
    note:
      "Photo comparison will need correct side/head photos and visible landmarks before these proportions can be measured from an image.",
  },
  bg: {
    eyebrow: "Референтна геометрия на породата",
    title: "Стандартните размери стават прозрачен ориентировъчен слой.",
    description:
      "Приложението използва Cane Corso референтна геометрия само като ориентация. Това не е официална оценка и не доказва родословие или породна чистота.",
    source: "Източник на референцията",
    adultRanges: "Референтни размери при възрастно куче",
    male: "Мъжко",
    female: "Женско",
    height: "Височина при холката",
    weight: "Тегло",
    tolerance: "Толеранс",
    ratio: "kg/cm отношение",
    proportions: "Основни формули за пропорции",
    headers: ["Референция", "Формула", "Целева зона", "Употреба в приложението"],
    note:
      "Снимковото сравнение ще изисква правилни странични/главови снимки и видими точки, преди тези пропорции да могат да се измерят от изображение.",
  },
  it: {
    eyebrow: "Geometria di riferimento della razza",
    title: "Le dimensioni dello standard diventano un livello di riferimento trasparente.",
    description:
      "L’app usa la geometria di riferimento Cane Corso solo come orientamento. Non è un giudizio ufficiale e non prova pedigree o purezza di razza.",
    source: "Fonte di riferimento",
    adultRanges: "Riferimento adulto per altezza e peso",
    male: "Maschio",
    female: "Femmina",
    height: "Altezza al garrese",
    weight: "Peso",
    tolerance: "Fascia di tolleranza",
    ratio: "rapporto kg/cm",
    proportions: "Formule principali di proporzione",
    headers: ["Riferimento", "Formula", "Fascia target", "Uso nell’app"],
    note:
      "Il confronto fotografico richiederà foto laterali/testa corrette e punti visibili prima di misurare queste proporzioni dall’immagine.",
  },
};

function formatRange(min: number, max: number, unit: string) {
  return `${min}–${max} ${unit}`;
}

function formatTolerance(min?: number, max?: number, unit = "cm") {
  if (typeof min !== "number" || typeof max !== "number") {
    return "—";
  }

  return `${min}–${max} ${unit}`;
}

export function BreedReferenceGeometryTable() {
  const { language } = useLanguage();
  const t = copy[language];
  const reference = caneCorsoBreedReferenceGeometry;

  return (
    <section className="usg-lab-surface rounded-[2rem] p-6">
      <div className="relative z-10">
        <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
          {t.eyebrow}
        </p>
        <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
          {t.title}
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-7 text-stone-400">
          {t.description}
        </p>

        <div className="mt-6 rounded-3xl border border-amber-200/10 bg-black/25 p-5">
          <p className="text-xs uppercase tracking-[0.25em] text-stone-500">
            {t.source}
          </p>
          <p className="mt-2 text-sm font-semibold text-amber-100">
            {reference.sourceLabel}
          </p>
          <p className="mt-1 text-xs leading-5 text-stone-500">
            {reference.publicationDate} · {reference.standardNumber} · {reference.status}
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {(["male", "female"] as const).map((sex) => {
            const range = reference.adultRanges[sex];
            return (
              <div
                key={sex}
                className="rounded-3xl border border-amber-200/10 bg-black/25 p-5"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-amber-300/70">
                  {sex === "male" ? t.male : t.female}
                </p>
                <div className="mt-4 grid gap-3 text-sm">
                  <div className="flex items-center justify-between gap-4 rounded-2xl border border-stone-700 bg-white/[0.03] p-3">
                    <span className="text-stone-400">{t.height}</span>
                    <span className="font-semibold text-white">
                      {formatRange(
                        range.heightAtWithersCm.min,
                        range.heightAtWithersCm.max,
                        range.heightAtWithersCm.unit,
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-2xl border border-stone-700 bg-white/[0.03] p-3">
                    <span className="text-stone-400">{t.tolerance}</span>
                    <span className="font-semibold text-white">
                      {formatTolerance(
                        range.heightAtWithersCm.toleranceMin,
                        range.heightAtWithersCm.toleranceMax,
                        range.heightAtWithersCm.unit,
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-2xl border border-stone-700 bg-white/[0.03] p-3">
                    <span className="text-stone-400">{t.weight}</span>
                    <span className="font-semibold text-white">
                      {formatRange(range.weightKg.min, range.weightKg.max, range.weightKg.unit)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-2xl border border-stone-700 bg-white/[0.03] p-3">
                    <span className="text-stone-400">{t.ratio}</span>
                    <span className="font-semibold text-white">
                      {range.weightHeightRatioKgPerCm.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-amber-200/10 bg-black/25">
          <div className="border-b border-amber-200/10 p-5">
            <p className="text-sm font-semibold text-white">{t.proportions}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-stone-800 text-left text-sm">
              <thead className="bg-white/[0.03] text-xs uppercase tracking-[0.18em] text-stone-500">
                <tr>
                  {t.headers.map((header) => (
                    <th key={header} className="px-5 py-4 font-semibold">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800">
                {reference.proportions.map((item) => (
                  <tr key={item.id} className="align-top">
                    <td className="px-5 py-4 font-semibold text-white">{item.label}</td>
                    <td className="px-5 py-4 font-mono text-xs text-amber-100/90">
                      {item.formula}
                    </td>
                    <td className="px-5 py-4 text-stone-300">
                      {item.min.toFixed(2)}–{item.max.toFixed(2)} · target {item.target.toFixed(2)}
                    </td>
                    <td className="px-5 py-4 leading-6 text-stone-400">{item.appUse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-5 rounded-2xl border border-amber-200/10 bg-amber-300/10 p-4 text-sm leading-6 text-amber-50/85">
          {t.note}
        </p>
      </div>
    </section>
  );
}
