"use client";

import Image from "next/image";
import { researchFigures } from "@/lib/ml/research-gallery";
import { useLanguage } from "@/lib/i18n/language-context";
import { localizeMlPhrase } from "@/lib/i18n/ml-phrase-copy";
import { buildGitHubSourceUrl } from "@/lib/source-links";
import type { LanguageCode } from "@/lib/i18n/languages";

const copy: Record<LanguageCode, { eyebrow: string; title: string; description: string; count: string; appUse: string; referenceFile: string; openFigure: string }> = {
  en: {
    eyebrow: "Methodology gallery",
    title: "Visual evidence for the growth model.",
    description: "These figures make the methodology visible inside the app: points, lines, curves, boundaries and profile groups.",
    count: "visual concepts",
    appUse: "App use",
    referenceFile: "Reference file",
    openFigure: "Open figure",
  },
  bg: {
    eyebrow: "Галерия на методологията",
    title: "Визуални доказателства за модела на растеж.",
    description: "Фигурите правят методологията видима в приложението: точки, линии, криви, граници и профилни групи.",
    count: "визуални концепции",
    appUse: "Употреба в приложението",
    referenceFile: "Референтен файл",
    openFigure: "Отвори фигурата",
  },
  it: {
    eyebrow: "Galleria metodologica",
    title: "Evidenze visuali per il modello di crescita.",
    description: "Le figure rendono la metodologia visibile nell’app: punti, linee, curve, confini e gruppi di profilo.",
    count: "concetti visuali",
    appUse: "Uso nell’app",
    referenceFile: "File di riferimento",
    openFigure: "Apri figura",
  },
};

export function ResearchFigureGallery() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">{t.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">{t.title}</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-stone-400">{t.description}</p>
        </div>
        <div className="rounded-full border border-amber-200/15 bg-black/25 px-4 py-2 text-sm font-semibold text-amber-100/80">{researchFigures.length} {t.count}</div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {researchFigures.map((figure, index) => (
          <article key={figure.title} className="overflow-hidden rounded-[1.75rem] border border-amber-200/10 bg-black/25">
            <div className="relative aspect-[3/2] border-b border-amber-200/10 bg-[#11100d]">
              <Image src={figure.src} alt={localizeMlPhrase(figure.title, language)} width={1440} height={960} priority={index === 0} className="h-full w-full object-cover" />
            </div>
            <div className="p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-amber-300 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-stone-950">{localizeMlPhrase(figure.category, language)}</span>
                <span className="rounded-full border border-amber-200/15 px-3 py-1 text-xs font-semibold text-amber-100/80">{localizeMlPhrase(figure.geometry, language)}</span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-white">{localizeMlPhrase(figure.title, language)}</h3>
              <p className="mt-3 text-sm leading-6 text-stone-400">{localizeMlPhrase(figure.description, language)}</p>
              <div className="mt-5 rounded-2xl border border-stone-700 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{t.appUse}</p>
                <p className="mt-2 text-sm leading-6 text-stone-300">{localizeMlPhrase(figure.appConnection, language)}</p>
              </div>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="break-all text-xs leading-5 text-stone-500">{t.referenceFile}: <span className="text-stone-400">{figure.sourcePath}</span></p>
                <a
                  href={buildGitHubSourceUrl(figure.sourcePath)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit rounded-full border border-amber-200/20 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-100 transition hover:bg-amber-300 hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-amber-300/70"
                  aria-label={`${t.openFigure}: ${figure.sourcePath}`}
                >
                  {t.openFigure}
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
