import {
  getVisionReadinessStatusLabel,
  visionDatasetReadinessSummary,
} from "@/lib/ml/vision-dataset-readiness";

export function VisionDatasetReadinessPanel() {
  const summary = visionDatasetReadinessSummary;

  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-black/25 p-6 shadow-2xl shadow-black/20">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">
            Dataset readiness
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            The neural model learns only after the image set is ready.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-300">
            {summary.reason} This panel keeps the project honest: the visual ML
            pipeline is designed, but real training starts only after image
            sources, labels and validation splits are prepared.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[30rem]">
          <div className="rounded-2xl border border-amber-200/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
              Status
            </p>
            <p className="mt-2 text-lg font-semibold text-amber-100">
              {getVisionReadinessStatusLabel(summary.currentStatus)}
            </p>
          </div>
          <div className="rounded-2xl border border-amber-200/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
              Sample labels
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {summary.labeledRowsInSample}
            </p>
          </div>
          <div className="rounded-2xl border border-amber-200/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
              Prototype goal
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {summary.imageFilesRequiredForPrototype.toLocaleString()}+
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-5">
        {summary.phases.map((phase, index) => (
          <article
            key={phase.id}
            className="rounded-2xl border border-stone-700/80 bg-[#0f0d09] p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/25 bg-amber-300/10 text-sm font-semibold text-amber-100">
                {index + 1}
              </div>
              <span className="rounded-full border border-amber-200/10 bg-white/[0.03] px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-stone-400">
                {getVisionReadinessStatusLabel(phase.status)}
              </span>
            </div>
            <h3 className="mt-4 text-base font-semibold text-white">
              {phase.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-stone-400">
              {phase.goal}
            </p>
            <div className="mt-4 space-y-3 rounded-xl border border-amber-200/10 bg-black/20 p-3 text-xs leading-5 text-stone-400">
              <p>
                <span className="font-semibold text-amber-100">Now:</span>{" "}
                {phase.currentEvidence}
              </p>
              <p>
                <span className="font-semibold text-amber-100">Next:</span>{" "}
                {phase.nextAction}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-stone-700/80">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.2em] text-amber-200/75">
            <tr>
              <th className="px-4 py-4">Training gate</th>
              <th className="px-4 py-4">Required</th>
              <th className="px-4 py-4">Why it matters</th>
            </tr>
          </thead>
          <tbody>
            {summary.gates.map((gate) => (
              <tr key={gate.id} className="border-t border-stone-800">
                <td className="px-4 py-4 font-semibold text-white">
                  {gate.label}
                </td>
                <td className="px-4 py-4 text-amber-100/80">
                  {gate.requiredBeforeTraining ? "Before training" : "Optional"}
                </td>
                <td className="px-4 py-4 leading-6 text-stone-400">
                  {gate.explanation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5 text-sm leading-7 text-amber-50/90">
        <strong>Professional rule:</strong> no neural breed classifier should be
        presented as trained until enough licensed images, balanced labels and
        holdout evaluation results exist.
      </div>
    </section>
  );
}
