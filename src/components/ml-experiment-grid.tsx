import {
  classificationResults,
  formatMetric,
  formatPercent,
  regressionResults,
} from "@/lib/ml/model-results";

const conceptCards = [
  {
    title: "Coordinate Logic",
    tag: "Geometry",
    description:
      "A dog profile is represented as a point, growth is shown as a trajectory and models become lines, curves, surfaces or boundaries.",
  },
  {
    title: "Profile Grouping",
    tag: "Groups",
    description:
      "Unsupervised learning groups similar growth profiles without predefined labels.",
  },
];

export function MlExperimentGrid() {
  return (
    <section className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {regressionResults.slice(0, 4).map((experiment) => (
          <article
            key={experiment.model}
            className="rounded-[1.5rem] border border-amber-200/10 bg-black/25 p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {experiment.model}
                </h3>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-stone-500">
                  {experiment.features}
                </p>
              </div>
              <span className="rounded-full border border-amber-200/15 px-3 py-1 text-xs font-semibold text-amber-100/80">
                {experiment.geometry}
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-stone-400">
              {experiment.interpretation}
            </p>
            <div className="mt-5 grid grid-cols-3 gap-2 text-sm">
              <MetricPill label="MAE" value={formatMetric(experiment.mae)} />
              <MetricPill label="RMSE" value={formatMetric(experiment.rmse)} />
              <MetricPill label="R²" value={formatMetric(experiment.r2Score)} />
            </div>
          </article>
        ))}

        {classificationResults.slice(0, 2).map((experiment) => (
          <article
            key={experiment.model}
            className="rounded-[1.5rem] border border-amber-200/10 bg-black/25 p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold text-white">
                {experiment.model}
              </h3>
              <span className="rounded-full border border-amber-200/15 px-3 py-1 text-xs font-semibold text-amber-100/80">
                {experiment.geometry}
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-stone-400">
              {experiment.interpretation}
            </p>
            <div className="mt-5 grid grid-cols-3 gap-2 text-sm">
              <MetricPill label="Accuracy" value={formatPercent(experiment.accuracy)} />
              <MetricPill label="Recall" value={formatPercent(experiment.recall)} />
              <MetricPill label="F1" value={formatMetric(experiment.f1Score)} />
            </div>
          </article>
        ))}

        {conceptCards.map((experiment) => (
          <article
            key={experiment.title}
            className="rounded-[1.5rem] border border-amber-200/10 bg-black/25 p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold text-white">
                {experiment.title}
              </h3>
              <span className="rounded-full border border-amber-200/15 px-3 py-1 text-xs font-semibold text-amber-100/80">
                {experiment.tag}
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-stone-400">
              {experiment.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

type MetricPillProps = {
  label: string;
  value: string;
};

function MetricPill({ label, value }: MetricPillProps) {
  return (
    <div className="rounded-2xl border border-stone-700 bg-white/[0.03] p-3">
      <p className="text-[0.65rem] uppercase tracking-[0.18em] text-stone-500">
        {label}
      </p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}
