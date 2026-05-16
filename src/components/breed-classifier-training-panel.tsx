import {
  breedClassifierTrainingPlan,
  getClassGroupLabel,
} from "@/lib/ml/breed-classifier-training";

export function BreedClassifierTrainingPanel() {
  const plan = breedClassifierTrainingPlan;

  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-black/25 p-6 shadow-2xl shadow-black/20">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">
            Neural Vision Training Plan
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            Breed classifier before visual match.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-300">
            {plan.summary} The first model learns whether the photo is usable;
            only then do later models compare the visible dog with Cane Corso
            visual references and breed-standard geometry.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[22rem]">
          <div className="rounded-2xl border border-amber-200/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
              Minimum set
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {plan.minimumDatasetGoal.toLocaleString()}+
            </p>
            <p className="mt-1 text-xs text-stone-400">labeled images</p>
          </div>
          <div className="rounded-2xl border border-amber-200/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
              Recommended
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {plan.recommendedDatasetGoal.toLocaleString()}+
            </p>
            <p className="mt-1 text-xs text-stone-400">labeled images</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-5">
        {plan.stages.map((stage, index) => (
          <article
            key={stage.id}
            className="rounded-2xl border border-stone-700/80 bg-[#0f0d09] p-4"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/25 bg-amber-300/10 text-sm font-semibold text-amber-100">
              {index + 1}
            </div>
            <h3 className="mt-4 text-base font-semibold text-white">
              {stage.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-stone-400">
              {stage.goal}
            </p>
            <div className="mt-4 rounded-xl border border-amber-200/10 bg-black/20 p-3 text-xs leading-5 text-stone-400">
              <span className="font-semibold text-amber-100">Output:</span>{" "}
              {stage.output}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-stone-700/80">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.2em] text-amber-200/75">
            <tr>
              <th className="px-4 py-4">Class</th>
              <th className="px-4 py-4">Role</th>
              <th className="px-4 py-4">Purpose</th>
              <th className="px-4 py-4">Minimum</th>
              <th className="px-4 py-4">Recommended</th>
            </tr>
          </thead>
          <tbody>
            {plan.classes.map((item) => (
              <tr key={item.id} className="border-t border-stone-800">
                <td className="px-4 py-4 font-semibold text-white">
                  {item.label}
                </td>
                <td className="px-4 py-4 text-amber-100/80">
                  {getClassGroupLabel(item.group)}
                </td>
                <td className="px-4 py-4 leading-6 text-stone-400">
                  {item.purpose}
                </td>
                <td className="px-4 py-4 text-stone-300">
                  {item.minimumImages.toLocaleString()}
                </td>
                <td className="px-4 py-4 text-stone-300">
                  {item.recommendedImages.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5 text-sm leading-7 text-amber-50/90">
        <strong>Important boundary:</strong> the neural vision model will learn
        visual similarity and photo suitability. It must not claim pedigree,
        breed purity, official registration, or veterinary status from a photo.
      </div>
    </section>
  );
}
