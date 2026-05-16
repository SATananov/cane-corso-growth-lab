import {
  photoReadinessClasses,
  photoReadinessModelPrinciples,
  photoReadinessTrainingArtifacts,
  photoReadinessTrainingStages,
} from "@/lib/ml/photo-readiness-model";

const statusLabel: Record<string, string> = {
  ready_for_notebook: "Notebook-ready",
  data_required: "Needs labelled images",
  planned: "Planned",
};

export function PhotoReadinessModelPanel() {
  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-amber-300/70">
            Photo readiness model
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white">
            Teach the model when a photo is suitable for comparison.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-300">
            This is the first neural-vision training step. Before the app compares a dog
            with Cane Corso reference geometry, the model must learn whether the photo
            is accepted, limited or rejected for visual review.
          </p>
        </div>
        <div className="rounded-full border border-amber-200/20 px-4 py-2 text-sm font-semibold text-amber-100">
          Step 27 · training notebook
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {photoReadinessClasses.map((item) => (
          <article
            key={item.id}
            className="rounded-3xl border border-amber-200/10 bg-black/25 p-5"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-amber-300/70">
              {item.label}
            </p>
            <p className="mt-3 text-sm leading-6 text-stone-300">{item.meaning}</p>
            <p className="mt-3 text-sm leading-6 text-amber-100/90">
              {item.comparisonPolicy}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-stone-400">
              {item.examples.map((example) => (
                <li key={example} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                  <span>{example}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-amber-200/10 bg-black/20 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
            Training flow
          </p>
          <div className="mt-4 space-y-3">
            {photoReadinessTrainingStages.map((stage) => (
              <div
                key={stage.title}
                className="rounded-2xl border border-stone-700 bg-white/[0.03] p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="font-semibold text-white">{stage.title}</h3>
                  <span className="rounded-full border border-amber-200/15 px-3 py-1 text-xs text-amber-100/80">
                    {statusLabel[stage.status] ?? stage.status}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-stone-400">{stage.purpose}</p>
                <p className="mt-2 text-sm text-amber-100/90">Output: {stage.output}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-amber-200/10 bg-black/20 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
            Notebook artifacts
          </p>
          <div className="mt-4 space-y-3">
            {photoReadinessTrainingArtifacts.map((artifact) => (
              <div
                key={artifact.path}
                className="rounded-2xl border border-stone-700 bg-white/[0.03] p-4"
              >
                <p className="font-semibold text-white">{artifact.label}</p>
                <code className="mt-2 block break-words rounded-xl border border-stone-800 bg-black/30 px-3 py-2 text-xs text-amber-100/80">
                  {artifact.path}
                </code>
                <p className="mt-2 text-sm leading-6 text-stone-400">
                  {artifact.purpose}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-amber-300/15 bg-amber-300/10 p-5">
        <p className="text-sm font-semibold text-amber-100">Safety principles</p>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {photoReadinessModelPrinciples.map((principle) => (
            <div key={principle} className="flex gap-2 text-sm leading-6 text-amber-50/85">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-200" />
              <span>{principle}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
