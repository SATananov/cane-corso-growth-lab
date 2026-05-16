import {
  appModelBridgeSummary,
  appModelFeatures,
  exportedRegressionCoefficients,
} from "@/lib/ml";

export function AppModelBridgeSummary() {
  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
            App Model Bridge
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Model evidence becomes app logic.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-stone-400">
            The bridge connects notebook results with the live growth check. It
            documents which model evidence is imported, what coefficients are
            used and how the browser-side logic stays fast, visible and safe.
          </p>
        </div>

        <div className="w-fit rounded-full border border-amber-200/15 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-100">
          {appModelBridgeSummary.version}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <BridgeMetric
          label="Regression evidence"
          value={appModelBridgeSummary.regressionEvidenceModel}
          detail="Best imported regression result by R²."
        />
        <BridgeMetric
          label="Classification evidence"
          value={appModelBridgeSummary.classificationEvidenceModel}
          detail="Best imported classification result by F1/AUC."
        />
        <BridgeMetric
          label="Live app curve"
          value={appModelBridgeSummary.liveAppCurve}
          detail="Fast TypeScript bridge used by the growth check."
        />
        <BridgeMetric
          label="Export file"
          value="JSON + TS"
          detail={appModelBridgeSummary.exportFile}
        />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-2xl border border-stone-700 bg-black/25 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
            Baseline equation
          </p>
          <p className="mt-3 font-mono text-sm leading-7 text-amber-100/90">
            {exportedRegressionCoefficients.simpleLinear.equation}
          </p>
          <p className="mt-3 text-sm leading-6 text-stone-400">
            This coefficient set is kept as explainable model evidence. The live
            app uses a calibrated growth curve so the user experience remains
            readable while the project methodology remains reviewable.
          </p>
        </article>

        <article className="rounded-2xl border border-stone-700 bg-black/25 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
            Feature contract
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {appModelFeatures.map((feature) => (
              <div
                key={feature.key}
                className="rounded-2xl border border-stone-800 bg-white/[0.03] p-4"
              >
                <p className="text-sm font-semibold text-white">{feature.label}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-amber-100/60">
                  {feature.source}
                </p>
                <p className="mt-2 text-sm leading-6 text-stone-500">
                  {feature.appUsage}
                </p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

type BridgeMetricProps = {
  label: string;
  value: string;
  detail: string;
};

function BridgeMetric({ label, value, detail }: BridgeMetricProps) {
  return (
    <article className="rounded-2xl border border-stone-700 bg-black/25 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-stone-400">{detail}</p>
    </article>
  );
}
