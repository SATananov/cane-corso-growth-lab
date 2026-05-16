import type { Metadata } from "next";
import { MlExperimentGrid } from "@/components/ml-experiment-grid";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "ML Experiments | Cane Corso Growth Geometry Lab",
  description:
    "Machine learning experiment overview for the Cane Corso Growth Geometry Lab app.",
};

const workflow = [
  "Collect or prepare growth measurements",
  "Represent each dog as a point in a feature space",
  "Train regression models for expected growth curves",
  "Use classification as an owner review signal",
  "Explore clustering later for similar growth profiles",
];

export default function ExperimentsPage() {
  return (
    <PageShell>
      <div className="grid gap-8">
        <PageHero
          eyebrow="ML Experiments"
          title="From notebook models to app behavior."
          description="This page explains how the app connects with the machine learning foundation: regression for curves, classification for zones and geometry for visual understanding."
          badge="Research layer"
        />

        <MlExperimentGrid />

        <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
            Project Workflow
          </p>
          <div className="mt-5 grid gap-3">
            {workflow.map((item, index) => (
              <div
                key={item}
                className="flex gap-4 rounded-2xl border border-stone-700 bg-black/25 p-4"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-amber-300 text-sm font-bold text-stone-950">
                  {index + 1}
                </div>
                <p className="pt-2 text-sm leading-6 text-stone-300">{item}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
