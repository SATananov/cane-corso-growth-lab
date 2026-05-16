"use client";

import { useLanguage } from "@/lib/i18n/language-context";

export function AboutLabContent() {
  const { dictionary } = useLanguage();

  return (
    <>
      <div className="grid gap-5 lg:grid-cols-2">
        <section className="usg-lab-surface rounded-[2rem] p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
            {dictionary.about.technology}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {dictionary.about.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-amber-200/15 bg-black/25 px-4 py-2 text-sm text-amber-100/85"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="usg-lab-surface rounded-[2rem] p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
            {dictionary.about.boundaries}
          </p>
          <div className="mt-5 grid gap-3">
            {dictionary.about.productBoundaries.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-stone-700 bg-black/25 p-4 text-sm text-stone-300"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="usg-lab-surface rounded-[2rem] p-6">
        <p className="text-sm font-semibold text-amber-100">
          {dictionary.about.importantNote}
        </p>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-stone-300">
          {dictionary.app.disclaimer}
        </p>
      </section>
    </>
  );
}
