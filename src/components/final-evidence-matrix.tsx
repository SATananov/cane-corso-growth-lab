import {
  finalEvidenceSummary,
  projectEvidenceChecklist,
} from "@/lib/ml/final-evidence";

export function FinalEvidenceMatrix() {
  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
            Final Evidence Matrix
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Visual clarity plus logical proof.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-stone-400">
            {finalEvidenceSummary.subtitle}
          </p>
        </div>
        <div className="grid min-w-64 grid-cols-3 gap-3 rounded-3xl border border-stone-700 bg-black/25 p-4 text-center">
          <EvidenceStat label="Formulas" value={finalEvidenceSummary.formulaRows} />
          <EvidenceStat label="Evidence" value={finalEvidenceSummary.evidenceRows} />
          <EvidenceStat label="Topics" value={finalEvidenceSummary.modelFamilies} />
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-stone-700 bg-black/25">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left text-sm">
            <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.16em] text-stone-500">
              <tr>
                <th className="px-5 py-4">Area</th>
                <th className="px-5 py-4">App surface</th>
                <th className="px-5 py-4">Evidence</th>
                <th className="px-5 py-4">Why it matters</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {projectEvidenceChecklist.map((row) => (
                <tr key={row.area}>
                  <td className="px-5 py-4 font-semibold text-white">{row.area}</td>
                  <td className="px-5 py-4 text-amber-100/80">{row.appSurface}</td>
                  <td className="px-5 py-4 text-stone-300">{row.evidence}</td>
                  <td className="px-5 py-4 text-stone-400">{row.whyItMatters}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-5 rounded-2xl border border-amber-200/15 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100/85">
        {finalEvidenceSummary.safetyStatement}
      </p>
    </section>
  );
}

type EvidenceStatProps = {
  label: string;
  value: number;
};

function EvidenceStat({ label, value }: EvidenceStatProps) {
  return (
    <div>
      <p className="text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-[0.65rem] uppercase tracking-[0.16em] text-stone-500">
        {label}
      </p>
    </div>
  );
}
