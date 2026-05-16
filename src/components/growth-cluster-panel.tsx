import type { GrowthPrediction } from "@/lib/growth-model";

type GrowthClusterPanelProps = {
  prediction: GrowthPrediction;
};

export function GrowthClusterPanel({ prediction }: GrowthClusterPanelProps) {
  const cluster = prediction.clusterAnalysis;

  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20">
      <div className="rounded-[1.5rem] border border-amber-200/10 bg-black/25 p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-amber-300/70">
              Unsupervised Learning Layer
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Growth profile group
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-400">
              {cluster.summary}
            </p>
          </div>
          <div className="rounded-2xl border border-amber-200/15 bg-amber-300/10 px-4 py-3 text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-200/70">
              Assigned cluster
            </p>
            <p className="mt-1 text-lg font-semibold text-amber-100">
              {cluster.assignedCluster.shortLabel}
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {[
            ["Maturity", cluster.featurePoint.maturityRatio],
            ["Adult ratio", cluster.featurePoint.adultWeightRatio],
            ["BCS deviation", cluster.featurePoint.bodyConditionDeviation],
            ["Curve delta", cluster.featurePoint.curveDeltaNormalized],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-stone-700 bg-black/25 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
                {label}
              </p>
              <p className="mt-2 text-xl font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {cluster.nearestAlternatives.map((item) => (
            <div key={item.profile.id} className="rounded-2xl border border-stone-700 bg-black/20 p-4">
              <p className="text-sm font-semibold text-white">{item.profile.label}</p>
              <p className="mt-2 text-xs leading-5 text-stone-500">
                Alternative distance: {item.distance}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-5 rounded-2xl border border-amber-200/10 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100/85">
          {cluster.geometryNote}
        </p>
      </div>
    </section>
  );
}
