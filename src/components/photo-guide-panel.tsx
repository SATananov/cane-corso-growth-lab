"use client";

import { photoComparisonCriteria, visualPhotoViewGuides } from "@/lib/ml/photo-comparison-criteria";
import { useLanguage } from "@/lib/i18n/language-context";

export function PhotoGuidePanel() {
  const { dictionary } = useLanguage();

  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
            {dictionary.visualReview.guide.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            {dictionary.visualReview.guide.title}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-stone-400">
            {dictionary.visualReview.guide.description}
          </p>
        </div>
        <div className="rounded-full border border-amber-200/15 bg-amber-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-100">
          Photo first
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-4">
        {visualPhotoViewGuides.map((guide) => (
          <article
            key={guide.viewType}
            className="rounded-3xl border border-stone-700 bg-black/25 p-5"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-amber-300/70">
              {guide.label}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-white">
              {guide.purpose}
            </h3>
            <p className="mt-3 text-sm leading-6 text-stone-400">
              {guide.comparisonUse}
            </p>
            <div className="mt-4 space-y-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200/80">
                  Must show
                </p>
                <ul className="mt-2 space-y-1.5 text-sm leading-6 text-stone-300">
                  {guide.mustShow.slice(0, 3).map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-200/80">
                  Avoid
                </p>
                <ul className="mt-2 space-y-1.5 text-sm leading-6 text-stone-400">
                  {guide.avoid.slice(0, 2).map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-amber-200/10 bg-black/25 p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300/70">
          {dictionary.visualReview.criteria.title}
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-5">
          {photoComparisonCriteria.map((criterion) => (
            <div
              key={criterion.id}
              className="rounded-2xl border border-stone-700 bg-white/[0.025] p-4"
            >
              <p className="text-sm font-semibold text-white">{criterion.title}</p>
              <p className="mt-2 text-xs leading-5 text-stone-400">
                {criterion.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
