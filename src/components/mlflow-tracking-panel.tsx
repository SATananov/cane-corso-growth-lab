import { mlflowRunSummaries, mlflowTrackingPrinciples } from "@/lib/ml/mlflow-tracking";

export function MlflowTrackingPanel() {
  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
      <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
        MLflow Tracking Concept
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
        Experiments need history, metrics and artifacts.
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-7 text-stone-400">
        Step 13 adds a lightweight MLflow-ready tracking plan. The app can show
        which runs produced the current model bridge and which artifacts support
        the educational signal.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {mlflowRunSummaries.map((run) => (
          <article key={run.runId} className="rounded-3xl border border-stone-700 bg-black/25 p-5">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-amber-200/15 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-100">
                {run.modelFamily}
              </span>
              <span className="rounded-full border border-stone-700 px-3 py-1 text-xs text-stone-400">
                {run.stage}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white">{run.name}</h3>
            <div className="mt-4 grid gap-2">
              {run.metrics.map((metric) => (
                <div key={metric.label} className="flex justify-between rounded-2xl bg-white/[0.04] px-3 py-2 text-sm">
                  <span className="text-stone-400">{metric.label}</span>
                  <span className="font-semibold text-white">{metric.value}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-5 text-stone-500">
              {run.artifacts.join(" · ")}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-amber-200/10 bg-amber-300/10 p-5">
        <p className="text-sm font-semibold text-amber-100">Tracking principles</p>
        <ul className="mt-3 grid gap-2 text-sm leading-6 text-amber-100/80 md:grid-cols-2">
          {mlflowTrackingPrinciples.map((principle) => (
            <li key={principle}>• {principle}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
