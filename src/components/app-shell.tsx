"use client";

import Link from "next/link";
import { DogGrowthCalculator } from "@/components/dog-growth-calculator";
import { MlExperimentGrid } from "@/components/ml-experiment-grid";
import { UsgLabSeal } from "@/components/usg-lab-seal";
import { OwnerJourneyPanel } from "@/components/owner-journey-panel";
import { PageShell } from "@/components/page-shell";
import { useLanguage } from "@/lib/i18n/language-context";

export function AppShell() {
  const { dictionary } = useLanguage();

  return (
    <PageShell>
      <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr]">
        <section>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            {dictionary.home.chips.map((chip) => (
              <div
                key={chip}
                className="inline-flex rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm text-amber-100"
              >
                {chip}
              </div>
            ))}
          </div>

          <div className="flex items-start gap-5">
            <UsgLabSeal variant="large" className="hidden md:grid" />
            <div>
              <h2 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight text-white md:text-7xl">
                {dictionary.app.headline}
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">
                {dictionary.app.description}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {dictionary.home.steps.map((label, index) => (
              <div key={label} className="rounded-2xl border border-amber-200/10 bg-black/25 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-amber-300/60">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 text-sm font-semibold text-white">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/calculator"
              className="rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-200"
            >
              {dictionary.home.openCalculator}
            </Link>

            <Link
              href="/experiments"
              className="rounded-full border border-amber-200/20 px-6 py-3 text-sm font-semibold text-amber-100 transition hover:border-amber-200/40 hover:bg-amber-200/10"
            >
              {dictionary.home.viewFoundation}
            </Link>
          </div>
        </section>

        <section className="usg-lab-surface rounded-[2rem] p-6">
          <div className="relative z-10 rounded-[1.5rem] border border-amber-200/10 bg-black/30 p-5">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
                  {dictionary.home.conceptEyebrow}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-white">
                  {dictionary.home.conceptTitle}
                </h3>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-full border border-amber-300/30 bg-amber-300/10 text-sm font-semibold text-amber-100">
                ML
              </div>
            </div>

            <div className="relative h-80 overflow-hidden rounded-3xl border border-stone-700 bg-[#11100d] p-5">
              <div className="absolute inset-x-8 bottom-10 top-8 border-l border-b border-amber-200/25" />
              <div className="absolute bottom-9 left-10 right-10 h-px bg-stone-700" />
              <div className="absolute bottom-20 left-10 right-10 h-px bg-stone-800" />
              <div className="absolute bottom-32 left-10 right-10 h-px bg-stone-800" />
              <div className="absolute bottom-44 left-10 right-10 h-px bg-stone-800" />
              <div className="absolute bottom-10 left-16 h-2 w-2 rounded-full bg-amber-300" />
              <div className="absolute bottom-20 left-28 h-3 w-3 rounded-full bg-amber-300" />
              <div className="absolute bottom-35 left-44 h-4 w-4 rounded-full bg-amber-300" />
              <div className="absolute bottom-48 left-64 h-5 w-5 rounded-full bg-amber-300 shadow-lg shadow-amber-300/30" />
              <div className="absolute bottom-58 left-86 h-4 w-4 rounded-full bg-amber-100" />
              <div className="absolute bottom-5 left-8 text-xs text-stone-500">
                {dictionary.home.axisAge}
              </div>
              <div className="absolute left-3 top-8 -rotate-90 text-xs text-stone-500">
                {dictionary.home.axisWeight}
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-stone-400">
              {dictionary.home.conceptDescription}
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {dictionary.home.cards.map((card) => (
                <div key={card.label} className="rounded-2xl border border-amber-200/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                    {card.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-stone-400">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <OwnerJourneyPanel />

      <section
        id="ml-foundation"
        className="usg-lab-surface mb-8 rounded-[2rem] p-6"
      >
        <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
          {dictionary.home.foundationEyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
          {dictionary.home.foundationTitle}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-stone-400">
          {dictionary.home.foundationDescription}
        </p>
        <div className="mt-6">
          <MlExperimentGrid />
        </div>
      </section>

      <DogGrowthCalculator />
    </PageShell>
  );
}
