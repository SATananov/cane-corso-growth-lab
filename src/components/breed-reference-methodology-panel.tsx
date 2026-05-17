"use client";

import { caneCorsoBreedReferenceGeometry } from "@/lib/ml/breed-reference-geometry";
import { useLanguage } from "@/lib/i18n/language-context";
import type { LanguageCode } from "@/lib/i18n/languages";

const copy: Record<LanguageCode, {
  eyebrow: string;
  title: string;
  description: string;
  steps: string[];
  boundary: string;
}> = {
  en: {
    eyebrow: "Breed Geometry Methodology",
    title: "From standard proportions to measurable app features.",
    description:
      "The reference layer turns standard dimensions into features that can later be compared with manual measurements or photo landmarks.",
    steps: [
      "Read adult height, weight and proportion references from the standard.",
      "Represent each reference as a formula, target and safe orientation band.",
      "Use live profile values for height/weight context in the calculator.",
      "Prepare the next visual layer: photo readiness, landmarks and geometry comparison.",
    ],
    boundary:
      "This methodology supports app transparency and project evidence. It does not replace official judging, pedigree verification or veterinary assessment.",
  },
  bg: {
    eyebrow: "Методология на породната геометрия",
    title: "От стандартни пропорции към измерими features в приложението.",
    description:
      "Референтният слой превръща стандартните размери във features, които по-късно могат да се сравняват с ръчни измервания или точки от снимка.",
    steps: [
      "Вземаме референтни стойности за височина, тегло и пропорции от стандарта.",
      "Представяме всяка референция като формула, цел и безопасна ориентировъчна зона.",
      "Използваме live профила за контекст на височина и тегло в калкулатора.",
      "Подготвяме следващия визуален слой: валидност на снимка, landmarks и геометрично сравнение.",
    ],
    boundary:
      "Тази методология помага за прозрачност и проектно доказателство. Не замества официална оценка, проверка на родословие или ветеринарна преценка.",
  },
  it: {
    eyebrow: "Metodologia della geometria di razza",
    title: "Dalle proporzioni dello standard a feature misurabili nell’app.",
    description:
      "Il livello di riferimento trasforma le dimensioni standard in feature che potranno essere confrontate con misure manuali o landmark fotografici.",
    steps: [
      "Leggere riferimenti adulti di altezza, peso e proporzioni dallo standard.",
      "Rappresentare ogni riferimento come formula, target e fascia orientativa sicura.",
      "Usare i valori live del profilo per altezza/peso nel calcolatore.",
      "Preparare il prossimo livello visivo: validità foto, landmark e confronto geometrico.",
    ],
    boundary:
      "Questa metodologia supporta trasparenza e prova progettuale. Non sostituisce giudizio ufficiale, verifica pedigree o valutazione veterinaria.",
  },
};

export function BreedReferenceMethodologyPanel() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
      <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
        {t.eyebrow}
      </p>
      <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
        {t.title}
      </h2>
      <p className="mt-4 max-w-4xl text-base leading-7 text-stone-400">
        {t.description}
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {t.steps.map((step, index) => (
          <div key={step} className="rounded-3xl border border-stone-700 bg-black/25 p-5">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-amber-300 text-sm font-bold text-stone-950">
              {index + 1}
            </div>
            <p className="mt-4 text-sm leading-6 text-stone-300">{step}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-amber-200/10 bg-black/25 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Source</p>
          <p className="mt-2 text-sm font-semibold text-white">
            {caneCorsoBreedReferenceGeometry.sourceLabel}
          </p>
          <p className="mt-1 text-xs leading-5 text-stone-500">
            {caneCorsoBreedReferenceGeometry.publicationDate} · {caneCorsoBreedReferenceGeometry.standardNumber}
          </p>
        </div>
        <p className="rounded-3xl border border-amber-200/10 bg-amber-300/10 p-5 text-sm leading-6 text-amber-50/85">
          {t.boundary}
        </p>
      </div>
    </section>
  );
}
