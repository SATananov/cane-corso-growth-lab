import { pcaReferencePoints } from "@/lib/ml/dimensionality-reduction";

export function PcaExperimentPanel() {
  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
      <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
        Dimensionality Reduction
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
        PCA turns many features into one visual map.
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-7 text-stone-400">
        The app uses a PCA-style projection to explain dimensionality reduction:
        several engineered features are compressed into a 2D growth space that
        can be shown in the browser.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pcaReferencePoints.map((point) => (
          <article key={point.id} className="rounded-3xl border border-stone-700 bg-black/25 p-5">
            <div className="mb-4 inline-flex rounded-full border border-amber-200/15 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-100">
              {point.type}
            </div>
            <h3 className="text-lg font-semibold text-white">{point.label}</h3>
            <p className="mt-3 text-sm leading-6 text-stone-400">
              PC1: {point.pc1} · PC2: {point.pc2}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
