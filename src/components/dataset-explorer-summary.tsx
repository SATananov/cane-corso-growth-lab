import { datasetExplorerSummary, formatNumber } from "@/lib/ml/dataset-overview";

export function DatasetExplorerSummary() {
  const stats = [
    {
      label: "Datasets",
      value: datasetExplorerSummary.totalDatasets,
      suffix: "tracked",
    },
    {
      label: "Rows",
      value: datasetExplorerSummary.totalRows,
      suffix: "sample records",
    },
    {
      label: "Columns",
      value: datasetExplorerSummary.totalColumnsTracked,
      suffix: "tracked fields",
    },
  ];

  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/20">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-amber-300/70">
            Data Overview
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Dataset transparency before model trust.
          </h2>
          <p className="mt-5 text-base leading-8 text-stone-400">
            The ML layer should explain what it uses before it explains what it
            predicts. This page keeps the source, role and limitations of each
            dataset visible inside the app.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-stone-700 bg-black/25 p-5"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                {stat.label}
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">
                {formatNumber(stat.value)}
              </p>
              <p className="mt-2 text-sm text-stone-500">{stat.suffix}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-stone-700 bg-black/25 p-5">
          <p className="text-sm uppercase tracking-[0.22em] text-amber-300/70">
            Raw data policy
          </p>
          <p className="mt-4 text-sm leading-7 text-stone-300">
            {datasetExplorerSummary.rawPolicy}
          </p>
        </div>

        <div className="rounded-3xl border border-stone-700 bg-black/25 p-5">
          <p className="text-sm uppercase tracking-[0.22em] text-amber-300/70">
            Safe use boundary
          </p>
          <p className="mt-4 text-sm leading-7 text-stone-300">
            {datasetExplorerSummary.safeUse}
          </p>
        </div>
      </div>
    </section>
  );
}
