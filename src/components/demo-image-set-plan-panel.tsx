import {
  demoImageManifestColumns,
  demoImageSetGates,
  demoImageSetGroups,
  demoImageSetPlan,
} from "@/lib/ml";

export function DemoImageSetPlanPanel() {
  const totalMinimum = demoImageSetGroups.reduce(
    (sum, group) => sum + group.minimumCount,
    0,
  );
  const totalTarget = demoImageSetGroups.reduce(
    (sum, group) => sum + group.targetCount,
    0,
  );

  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/20">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
            Demo image set
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-white">
            Small curated visual dataset plan
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-300">
            {demoImageSetPlan.purpose} This is a controlled starter plan: it
            keeps images licensed, labeled and useful for the future photo
            readiness gate, breed classifier and visual similarity pipeline.
          </p>
        </div>

        <div className="rounded-3xl border border-amber-200/10 bg-black/25 p-5 text-sm text-stone-300">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
            Status
          </p>
          <p className="mt-2 font-semibold text-amber-100">
            {demoImageSetPlan.status.replaceAll("_", " ")}
          </p>
          <p className="mt-2 text-stone-400">
            Minimum starter: {totalMinimum} images · Target demo: {totalTarget}
            images
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {demoImageSetGroups.map((group) => (
          <article
            key={group.key}
            className="rounded-3xl border border-stone-700/70 bg-black/25 p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {group.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-stone-400">
                  {group.purpose}
                </p>
              </div>
              <span className="rounded-full border border-amber-200/15 px-3 py-1 text-xs text-amber-100/80">
                {group.minimumCount}–{group.targetCount}
              </span>
            </div>

            <div className="mt-4 rounded-2xl border border-amber-200/10 bg-white/[0.025] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                View types
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.acceptedViewTypes.map((viewType) => (
                  <span
                    key={viewType}
                    className="rounded-full bg-amber-300/10 px-3 py-1 text-xs text-amber-100"
                  >
                    {viewType.replaceAll("_", " ")}
                  </span>
                ))}
              </div>
            </div>

            <ul className="mt-4 space-y-2 text-sm leading-6 text-stone-400">
              {group.qualityRules.map((rule) => (
                <li key={rule} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-3xl border border-amber-200/10 bg-black/25 p-5">
          <h3 className="text-xl font-semibold text-white">
            Collection gates before demo use
          </h3>
          <div className="mt-4 space-y-3">
            {demoImageSetGates.map((gate) => (
              <div
                key={gate.title}
                className="rounded-2xl border border-stone-700/70 bg-white/[0.025] p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-white">{gate.title}</p>
                  <span className="rounded-full border border-amber-200/15 px-3 py-1 text-xs text-amber-100/80">
                    {gate.required ? "Required" : "Recommended"}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-stone-400">
                  {gate.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-amber-200/10 bg-black/25 p-5">
          <h3 className="text-xl font-semibold text-white">
            Starter manifest columns
          </h3>
          <p className="mt-2 text-sm leading-6 text-stone-400">
            Each image must be described before it can be used for a demo model
            or visual comparison. The manifest becomes the bridge between raw
            images, labels and future neural training notebooks.
          </p>

          <div className="mt-4 overflow-x-auto rounded-2xl border border-stone-700/70">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.18em] text-stone-500">
                <tr>
                  <th className="px-4 py-3">Column</th>
                  <th className="px-4 py-3">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800 text-stone-300">
                {demoImageManifestColumns.map((column) => (
                  <tr key={column}>
                    <td className="px-4 py-3 font-semibold text-amber-100">
                      {column}
                    </td>
                    <td className="px-4 py-3 text-stone-400">
                      Required metadata for source, license, breed/view label,
                      readiness and demo usability.
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-amber-300/15 bg-amber-300/10 p-5 text-sm leading-7 text-amber-50">
        {demoImageSetPlan.recommendedFirstMilestone} Until this milestone is
        complete, the app should keep reporting visual AI as planned or demo
        only, not trained production evidence.
      </div>
    </section>
  );
}
