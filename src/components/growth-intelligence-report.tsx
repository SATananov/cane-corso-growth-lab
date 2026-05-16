import type { GrowthPrediction } from "@/lib/growth-model";
import type { ReportTone } from "@/lib/ml/growth-explainability";

type GrowthIntelligenceReportProps = {
  prediction: GrowthPrediction;
};

const factorToneStyles: Record<ReportTone, string> = {
  positive: "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
  watch: "border-amber-300/20 bg-amber-300/10 text-amber-100",
  attention: "border-orange-300/20 bg-orange-300/10 text-orange-100",
  neutral: "border-stone-500/30 bg-stone-500/10 text-stone-200",
};

const factorToneLabels: Record<ReportTone, string> = {
  positive: "calm signal",
  watch: "watch trend",
  attention: "owner review",
  neutral: "context",
};

export function GrowthIntelligenceReport({
  prediction,
}: GrowthIntelligenceReportProps) {
  const report = prediction.intelligenceReport;

  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-black/25 p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-300/70">
            Explainability Panel
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            {report.title}
          </h3>
          <p className="mt-3 text-lg leading-7 text-amber-50">
            {report.headline}
          </p>
          <p className="mt-3 text-sm leading-6 text-stone-400">
            {report.plainLanguageSummary}
          </p>
        </div>

        <div className="rounded-3xl border border-amber-200/10 bg-amber-200/[0.04] p-4 lg:w-72">
          <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
            Report Confidence
          </p>
          <p className="mt-2 text-3xl font-semibold text-white">
            {prediction.confidencePercent}%
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-400">
            {report.confidenceInterpretation}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-4">
        {report.keyFactors.map((factor) => (
          <article
            key={factor.label}
            className="rounded-3xl border border-stone-700 bg-white/[0.03] p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                {factor.label}
              </p>
              <span
                className={`rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] ${factorToneStyles[factor.tone]}`}
              >
                {factorToneLabels[factor.tone]}
              </span>
            </div>
            <p className="mt-3 text-xl font-semibold text-white">{factor.value}</p>
            <p className="mt-2 text-sm leading-6 text-stone-400">
              {factor.impact}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-3xl border border-stone-700 bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-300/70">
            How the app explains the model
          </p>
          <div className="mt-4 grid gap-3">
            {report.modelExplanation.map((section) => (
              <div
                key={section.title}
                className="rounded-2xl border border-amber-200/10 bg-black/20 p-4"
              >
                <p className="font-semibold text-white">{section.title}</p>
                <p className="mt-2 text-sm leading-6 text-stone-400">
                  {section.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-amber-200/10 bg-amber-200/[0.04] p-5">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-300/70">
            Owner review checklist
          </p>
          <ul className="mt-4 grid gap-3">
            {report.ownerChecklist.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-stone-300">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-stone-700 bg-black/20 p-4">
          <p className="text-sm font-semibold text-white">Technical summary</p>
          <p className="mt-2 text-sm leading-6 text-stone-400">
            {report.technicalSummary}
          </p>
        </div>

        <div className="rounded-2xl border border-orange-300/20 bg-orange-300/[0.06] p-4">
          <p className="text-sm font-semibold text-orange-100">Safety boundary</p>
          <p className="mt-2 text-sm leading-6 text-stone-400">
            {report.safetyBoundary}
          </p>
        </div>
      </div>
    </section>
  );
}
