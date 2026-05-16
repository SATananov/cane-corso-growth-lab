import { courseCoverageItems, finalRoadmap } from "@/lib/ml/course-coverage";

const toneByStatus = {
  implemented: "bg-emerald-300/10 text-emerald-100 border-emerald-200/20",
  partial: "bg-amber-300/10 text-amber-100 border-amber-200/20",
  planned: "bg-stone-300/10 text-stone-200 border-stone-200/20",
};

export function CourseCoverageDashboard() {
  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
        <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
          Project Methodology
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
          Machine learning topics mapped to app features.
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-stone-400">
          This page keeps the review layer separate from the user layer. A user
          can run the growth check, while a reviewer can see how regression,
          classification, clustering, feature engineering, PCA and tracking are
          demonstrated inside the project.
        </p>
      </section>

      <section className="grid gap-4">
        {courseCoverageItems.map((item) => (
          <article key={item.module} className="rounded-[2rem] border border-stone-700 bg-black/25 p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-white">{item.module}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.appEvidence.map((evidence) => (
                    <span key={evidence} className="rounded-full border border-amber-200/15 bg-white/[0.04] px-3 py-1 text-xs text-amber-100/80">
                      {evidence}
                    </span>
                  ))}
                </div>
              </div>
              <span className={`w-fit rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${toneByStatus[item.covered]}`}>
                {item.covered}
              </span>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-stone-700 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-stone-500">Implementation files</p>
                <ul className="mt-3 grid gap-2 text-sm leading-6 text-stone-300">
                  {item.projectFiles.map((file) => (
                    <li key={file}>• {file}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-stone-700 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-stone-500">Next improvement</p>
                <p className="mt-3 text-sm leading-6 text-stone-300">{item.nextImprovement}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-[2rem] border border-amber-200/10 bg-amber-300/10 p-6">
        <p className="text-sm font-semibold text-amber-100">Final project roadmap</p>
        <ul className="mt-4 grid gap-3 text-sm leading-6 text-amber-100/80 md:grid-cols-2">
          {finalRoadmap.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
