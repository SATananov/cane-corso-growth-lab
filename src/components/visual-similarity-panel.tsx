import {
  getVisualSimilarityStatusLabel,
  visualSimilarityArtifacts,
  visualSimilarityFormula,
  visualSimilarityModelCandidates,
  visualSimilaritySignals,
  visualSimilarityStages,
} from "@/lib/ml/visual-similarity";

const readinessLabel: Record<string, string> = {
  ready_as_formula: "Formula-ready",
  needs_reference_images: "Needs reference images",
  needs_trained_model: "Needs trained model",
};

export function VisualSimilarityPanel() {
  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-black/25 p-6 shadow-2xl shadow-black/20">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-amber-300/70">
            Visual similarity prototype
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            Compare the uploaded photo with a Cane Corso reference set.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-300">
            This layer prepares the future image-embedding comparison: a valid
            user photo becomes a visual feature vector, then it is compared with
            permitted Cane Corso reference examples and the explainable geometry
            layer. The result is a visual match signal, not proof of pedigree.
          </p>
        </div>

        <div className="rounded-3xl border border-amber-300/15 bg-amber-300/10 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-100/70">
            Prototype formula
          </p>
          <h3 className="mt-2 text-xl font-semibold text-amber-50">
            {visualSimilarityFormula.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-amber-50/85">
            {visualSimilarityFormula.readable}
          </p>
          <code className="mt-4 block break-words rounded-2xl border border-amber-200/15 bg-black/30 px-4 py-3 text-xs leading-6 text-amber-100/85">
            {visualSimilarityFormula.expression}
          </code>
          <p className="mt-4 text-sm leading-6 text-amber-50/80">
            {visualSimilarityFormula.safety}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-4">
        {visualSimilarityStages.map((stage) => (
          <article
            key={stage.id}
            className="rounded-2xl border border-stone-700/80 bg-[#0f0d09] p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="font-semibold text-white">{stage.title}</h3>
              <span className="rounded-full border border-amber-200/15 px-3 py-1 text-xs text-amber-100/80">
                {getVisualSimilarityStatusLabel(stage.status)}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-stone-400">
              {stage.purpose}
            </p>
            <div className="mt-4 space-y-2 rounded-xl border border-amber-200/10 bg-black/20 p-3 text-xs leading-5 text-stone-400">
              <p>
                <span className="font-semibold text-amber-100">Input:</span>{" "}
                {stage.input}
              </p>
              <p>
                <span className="font-semibold text-amber-100">Output:</span>{" "}
                {stage.output}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-stone-700/80">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.2em] text-amber-200/75">
            <tr>
              <th className="px-4 py-4">Signal</th>
              <th className="px-4 py-4">Role</th>
              <th className="px-4 py-4">Formula</th>
              <th className="px-4 py-4">User meaning</th>
              <th className="px-4 py-4">Readiness</th>
            </tr>
          </thead>
          <tbody>
            {visualSimilaritySignals.map((signal) => (
              <tr key={signal.id} className="border-t border-stone-800">
                <td className="px-4 py-4 font-semibold text-white">
                  {signal.label}
                </td>
                <td className="px-4 py-4 text-amber-100/80">{signal.role}</td>
                <td className="px-4 py-4">
                  <code className="rounded-xl border border-stone-800 bg-black/30 px-3 py-2 text-xs text-amber-100/80">
                    {signal.formula}
                  </code>
                </td>
                <td className="px-4 py-4 leading-6 text-stone-400">
                  {signal.userMeaning}
                </td>
                <td className="px-4 py-4 text-stone-300">
                  {readinessLabel[signal.readiness] ?? signal.readiness}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-amber-200/10 bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
            Model candidates
          </p>
          <div className="mt-4 space-y-3">
            {visualSimilarityModelCandidates.map((model) => (
              <div
                key={model.name}
                className="rounded-2xl border border-stone-700 bg-black/20 p-4"
              >
                <p className="font-semibold text-white">{model.name}</p>
                <p className="mt-2 text-sm leading-6 text-stone-400">
                  <span className="text-amber-100/90">Use case:</span>{" "}
                  {model.useCase}
                </p>
                <p className="mt-2 text-sm leading-6 text-stone-400">
                  <span className="text-amber-100/90">Why useful:</span>{" "}
                  {model.whyUseful}
                </p>
                <p className="mt-2 text-sm leading-6 text-stone-400">
                  <span className="text-amber-100/90">Risk:</span> {model.risk}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-amber-200/10 bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
            Prototype artifacts
          </p>
          <div className="mt-4 space-y-3">
            {visualSimilarityArtifacts.map((artifact) => (
              <div
                key={artifact.path}
                className="rounded-2xl border border-stone-700 bg-black/20 p-4"
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
    </section>
  );
}
