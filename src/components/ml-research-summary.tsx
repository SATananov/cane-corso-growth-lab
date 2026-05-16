import {
  classificationResults,
  dataAssets,
  figureAssets,
  formatMetric,
  formatPercent,
  mlFoundationSummary,
  notebookAssets,
  regressionResults,
  type ResearchAsset,
} from "@/lib/ml";

export function MlResearchSummary() {
  const bestRegression = regressionResults.find(
    (result) => result.model === mlFoundationSummary.regressionBestModel,
  );
  const bestClassification = classificationResults.find(
    (result) => result.model === mlFoundationSummary.classificationBestModel,
  );

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Research Status"
          value={mlFoundationSummary.status}
          hint="Notebook base is now inside the repo"
        />
        <SummaryCard
          label="Best Regression"
          value={mlFoundationSummary.regressionBestModel}
          hint={`R² ${formatMetric(mlFoundationSummary.regressionBestR2)}`}
        />
        <SummaryCard
          label="Best Classifier"
          value={mlFoundationSummary.classificationBestModel}
          hint={`F1 ${formatMetric(mlFoundationSummary.classificationBestF1)}`}
        />
        <SummaryCard
          label="Research Assets"
          value={`${mlFoundationSummary.notebookCount} notebooks`}
          hint={`${mlFoundationSummary.dataFiles} data files / ${mlFoundationSummary.figures} figures`}
        />
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <ModelTable
          eyebrow="Regression Evidence"
          title="Growth curve models"
          rows={regressionResults.map((result) => ({
            name: result.model,
            type: result.geometry,
            metricOne: `MAE ${formatMetric(result.mae)}`,
            metricTwo: `R² ${formatMetric(result.r2Score)}`,
            isBest: result.model === bestRegression?.model,
          }))}
        />
        <ModelTable
          eyebrow="Classification Evidence"
          title="Growth review-zone models"
          rows={classificationResults.map((result) => ({
            name: result.model,
            type: result.geometry,
            metricOne: `Recall ${formatPercent(result.recall)}`,
            metricTwo: `F1 ${formatMetric(result.f1Score)}`,
            isBest: result.model === bestClassification?.model,
          }))}
        />
      </section>

      <section className="rounded-[2rem] border border-amber-200/10 bg-amber-300/[0.06] p-6">
        <p className="text-sm font-semibold text-amber-100">Safety boundary</p>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-stone-300">
          {mlFoundationSummary.safetyNote}
        </p>
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        <AssetPanel title="Notebooks" assets={notebookAssets} />
        <AssetPanel title="Data" assets={dataAssets} />
        <AssetPanel title="Figures" assets={figureAssets} />
      </section>
    </div>
  );
}

type SummaryCardProps = {
  label: string;
  value: string;
  hint: string;
};

function SummaryCard({ label, value, hint }: SummaryCardProps) {
  return (
    <article className="rounded-[1.5rem] border border-amber-200/10 bg-black/25 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-stone-400">{hint}</p>
    </article>
  );
}

type ModelTableRow = {
  name: string;
  type: string;
  metricOne: string;
  metricTwo: string;
  isBest: boolean;
};

type ModelTableProps = {
  eyebrow: string;
  title: string;
  rows: ModelTableRow[];
};

function ModelTable({ eyebrow, title, rows }: ModelTableProps) {
  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
      <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
        {eyebrow}
      </p>
      <h3 className="mt-3 text-2xl font-semibold text-white">{title}</h3>
      <div className="mt-5 grid gap-3">
        {rows.map((row) => (
          <div
            key={row.name}
            className="grid gap-3 rounded-2xl border border-stone-700 bg-black/25 p-4 text-sm md:grid-cols-[1.2fr_0.8fr_0.7fr_0.7fr] md:items-center"
          >
            <div>
              <p className="font-semibold text-white">{row.name}</p>
              {row.isBest ? (
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                  Best current result
                </p>
              ) : null}
            </div>
            <p className="text-stone-400">{row.type}</p>
            <p className="text-stone-300">{row.metricOne}</p>
            <p className="text-stone-300">{row.metricTwo}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

type AssetPanelProps = {
  title: string;
  assets: ResearchAsset[];
};

function AssetPanel({ title, assets }: AssetPanelProps) {
  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      <div className="mt-5 grid gap-3">
        {assets.map((asset) => (
          <article
            key={asset.path}
            className="rounded-2xl border border-stone-700 bg-black/25 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-semibold text-white">{asset.title}</p>
              <span className="rounded-full border border-amber-200/15 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-amber-100/80">
                {asset.type}
              </span>
            </div>
            <p className="mt-2 font-mono text-xs text-amber-100/60">{asset.path}</p>
            <p className="mt-3 text-sm leading-6 text-stone-400">
              {asset.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
