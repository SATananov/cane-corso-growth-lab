import { UsgLabSeal } from "@/components/usg-lab-seal";
import {
  usgLabEvidencePillars,
  usgLabVisualPrinciples,
} from "@/lib/usg-lab-visual-system";

export function UsgLabVisualSystemPanel() {
  return (
    <section className="usg-lab-surface rounded-[2rem] p-6 md:p-8">
      <div className="relative z-10 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <div>
          <div className="flex items-center gap-4">
            <UsgLabSeal variant="large" />
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-amber-300/70">
                USG Lab Visual Lock
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Premium, readable and clearly experimental.
              </h2>
            </div>
          </div>
          <p className="mt-5 text-sm leading-7 text-stone-400">
            The visual system keeps the black-gold USG identity, but the copy and
            evidence panels make it clear that this is a growth intelligence lab:
            an orientation app with transparent formulas, tables and limits.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {usgLabEvidencePillars.map((pillar) => (
              <span key={pillar} className="usg-lab-chip rounded-full px-4 py-2 text-xs font-semibold">
                {pillar}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {usgLabVisualPrinciples.map((principle) => (
            <div
              key={principle.title}
              className="rounded-3xl border border-amber-200/10 bg-black/25 p-5"
            >
              <p className="text-base font-semibold text-white">{principle.title}</p>
              <p className="mt-3 text-sm leading-6 text-stone-400">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
