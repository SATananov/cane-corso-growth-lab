import {
  getVisualBreedGroupLabel,
  visualBreedArtifacts,
  visualBreedClasses,
  visualBreedClassifierPrinciples,
  visualBreedEvidenceWeights,
  visualBreedTrainingStages,
} from "@/lib/ml/visual-breed-classifier";

const readinessLabel: Record<string, string> = {
  notebook_ready: "Notebook-ready",
  waiting_for_dataset: "Needs image dataset",
  planned: "Planned",
};

export function VisualBreedClassifierPanel() {
  const minimumTotal = visualBreedClasses.reduce(
    (total, item) => total + item.minimumImages,
    0,
  );
  const recommendedTotal = visualBreedClasses.reduce(
    (total, item) => total + item.recommendedImages,
    0,
  );

  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-black/25 p-6 shadow-2xl shadow-black/20">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-amber-300/70">
            Visual breed classifier
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            Teach the model Cane Corso vs similar breeds.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-300">
            This layer prepares the neural vision classifier that will learn Cane
            Corso visual type against similar molosser and large-dog classes. It
            comes after the photo readiness gate and before the final visual match
            score.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[22rem]">
          <div className="rounded-2xl border border-amber-200/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
              Minimum
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {minimumTotal.toLocaleString()}+
            </p>
            <p className="mt-1 text-xs text-stone-400">labelled images</p>
          </div>
          <div className="rounded-2xl border border-amber-200/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
              Recommended
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {recommendedTotal.toLocaleString()}+
            </p>
            <p className="mt-1 text-xs text-stone-400">labelled images</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-4">
        {visualBreedTrainingStages.map((stage) => (
          <article
            key={stage.id}
            className="rounded-2xl border border-stone-700/80 bg-[#0f0d09] p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="font-semibold text-white">{stage.title}</h3>
              <span className="rounded-full border border-amber-200/15 px-3 py-1 text-xs text-amber-100/80">
                {readinessLabel[stage.readiness] ?? stage.readiness}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-stone-400">
              {stage.purpose}
            </p>
            <div className="mt-4 space-y-2 rounded-xl border border-amber-200/10 bg-black/20 p-3 text-xs leading-5 text-stone-400">
              <p>
                <span className="font-semibold text-amber-100">Input:</span>{" "}
                {stage.requiredInput}
              </p>
              <p>
                <span className="font-semibold text-amber-100">Output:</span>{" "}
                {stage.expectedOutput}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-stone-700/80">
        <table className="w-full min-w-[860px] border-collapse text-left text-sm">
          <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.2em] text-amber-200/75">
            <tr>
              <th className="px-4 py-4">Class</th>
              <th className="px-4 py-4">Group</th>
              <th className="px-4 py-4">Model role</th>
              <th className="px-4 py-4">Why it matters</th>
              <th className="px-4 py-4">Images</th>
            </tr>
          </thead>
          <tbody>
            {visualBreedClasses.map((item) => (
              <tr key={item.id} className="border-t border-stone-800">
                <td className="px-4 py-4 font-semibold text-white">
                  {item.label}
                </td>
                <td className="px-4 py-4 text-amber-100/80">
                  {getVisualBreedGroupLabel(item.group)}
                </td>
                <td className="px-4 py-4 leading-6 text-stone-400">
                  {item.modelRole}
                </td>
                <td className="px-4 py-4 leading-6 text-stone-400">
                  {item.whyItMatters}
                </td>
                <td className="px-4 py-4 text-stone-300">
                  {item.minimumImages.toLocaleString()} / {" "}
                  {item.recommendedImages.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-amber-200/10 bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
            Future match evidence
          </p>
          <div className="mt-4 space-y-3">
            {visualBreedEvidenceWeights.map((item) => (
              <div
                key={item.signal}
                className="rounded-2xl border border-stone-700 bg-black/20 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-semibold text-white">{item.signal}</p>
                  <span className="rounded-full border border-amber-200/15 px-3 py-1 text-xs text-amber-100/80">
                    {item.tentativeWeight}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-stone-400">
                  <span className="text-amber-100/90">{item.role}:</span>{" "}
                  {item.userFacingMeaning}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-amber-200/10 bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
            Training artifacts
          </p>
          <div className="mt-4 space-y-3">
            {visualBreedArtifacts.map((artifact) => (
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

      <div className="mt-6 rounded-3xl border border-amber-300/15 bg-amber-300/10 p-5">
        <p className="text-sm font-semibold text-amber-100">Safety principles</p>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {visualBreedClassifierPrinciples.map((principle) => (
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
