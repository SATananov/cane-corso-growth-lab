import { featureDefinitions } from "@/lib/ml/feature-engineering";

export function FeatureEngineeringSummary() {
  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
      <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
        Feature Engineering
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
        Raw inputs become model features.
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-7 text-stone-400">
        The data page now explains not only which datasets are used, but also how
        simple owner-friendly fields become features for the ML layer.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {featureDefinitions.map((feature) => (
          <article key={feature.id} className="rounded-3xl border border-stone-700 bg-black/25 p-5">
            <h3 className="text-lg font-semibold text-white">{feature.label}</h3>
            <p className="mt-3 text-sm leading-6 text-stone-400">{feature.explanation}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
