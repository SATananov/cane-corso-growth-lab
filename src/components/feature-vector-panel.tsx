import type { GrowthPrediction } from "@/lib/growth-model";

type FeatureVectorPanelProps = {
  prediction: GrowthPrediction;
};

export function FeatureVectorPanel({ prediction }: FeatureVectorPanelProps) {
  const featureVector = prediction.featureEngineering;

  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20">
      <div className="rounded-[1.5rem] border border-amber-200/10 bg-black/25 p-5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/70">
          Feature Engineering Layer
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-white">
          Model-ready growth features
        </h3>
        <p className="mt-3 text-sm leading-6 text-stone-400">
          The app transforms owner input into a compact feature vector before it
          explains regression, classification, clustering and geometry signals.
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {featureVector.features.map((feature) => (
            <article key={feature.id} className="rounded-2xl border border-stone-700 bg-black/25 p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold text-white">{feature.label}</p>
                <p className="rounded-full border border-amber-200/15 px-3 py-1 text-xs text-amber-100/80">
                  {feature.value} {feature.unit ?? ""}
                </p>
              </div>
              <p className="mt-3 text-xs leading-5 text-stone-500">{feature.explanation}</p>
            </article>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-amber-200/10 bg-amber-300/10 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-amber-200/70">
            Feature contract
          </p>
          <p className="mt-2 break-words text-sm leading-6 text-amber-100/90">
            {featureVector.featureContract.join(" → ")}
          </p>
        </div>
      </div>
    </section>
  );
}
