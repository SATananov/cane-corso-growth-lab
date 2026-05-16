import {
  type DatasetOverviewItem,
  formatNumber,
  getQualityToneClass,
} from "@/lib/ml/dataset-overview";

type DatasetOverviewCardProps = {
  dataset: DatasetOverviewItem;
};

export function DatasetOverviewCard({ dataset }: DatasetOverviewCardProps) {
  const previewColumns = Object.keys(dataset.previewRows[0] ?? {});

  return (
    <article className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/20">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-100">
              {dataset.stage}
            </span>
            <span className="text-xs text-stone-500">{dataset.path}</span>
          </div>

          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-4xl">
            {dataset.title}
          </h2>

          <p className="mt-4 text-base leading-7 text-stone-400">
            {dataset.role}
          </p>
        </div>

        <div className="grid min-w-52 grid-cols-2 gap-3 rounded-3xl border border-stone-700 bg-black/25 p-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
              Rows
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {formatNumber(dataset.rows)}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
              Columns
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {formatNumber(dataset.columns)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="rounded-3xl border border-stone-700 bg-black/25 p-5">
          <p className="text-sm uppercase tracking-[0.24em] text-amber-300/70">
            Source and use
          </p>
          <p className="mt-4 text-sm leading-7 text-stone-300">
            {dataset.source}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {dataset.qualitySignals.map((signal) => (
              <div
                key={`${dataset.id}-${signal.label}`}
                className={`rounded-2xl border px-3 py-2 text-xs leading-5 ${getQualityToneClass(
                  signal.tone,
                )}`}
              >
                <span className="font-semibold">{signal.label}: </span>
                {signal.value}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-stone-700 bg-black/25 p-5">
          <p className="text-sm uppercase tracking-[0.24em] text-amber-300/70">
            Used for
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {dataset.usedFor.map((item) => (
              <div
                key={`${dataset.id}-${item}`}
                className="rounded-2xl border border-amber-200/10 bg-white/[0.03] p-4 text-sm leading-6 text-stone-300"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-3xl border border-stone-700 bg-black/25 p-5">
        <p className="text-sm uppercase tracking-[0.24em] text-amber-300/70">
          Key fields
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {dataset.keyFields.map((field) => (
            <span
              key={`${dataset.id}-${field}`}
              className="rounded-full border border-stone-600 bg-white/[0.03] px-3 py-1 text-xs text-stone-300"
            >
              {field}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-6 overflow-hidden rounded-3xl border border-stone-700 bg-black/25">
        <div className="border-b border-stone-700 px-5 py-4">
          <p className="text-sm uppercase tracking-[0.24em] text-amber-300/70">
            Safe sample preview
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.18em] text-stone-500">
              <tr>
                {previewColumns.map((column) => (
                  <th key={`${dataset.id}-${column}`} className="px-5 py-4">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {dataset.previewRows.map((row, rowIndex) => (
                <tr key={`${dataset.id}-preview-${rowIndex}`}>
                  {previewColumns.map((column) => (
                    <td
                      key={`${dataset.id}-${rowIndex}-${column}`}
                      className="px-5 py-4 text-stone-300"
                    >
                      {row[column]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
