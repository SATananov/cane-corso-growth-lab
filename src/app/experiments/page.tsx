import type { Metadata } from "next";
import { AppModelBridgeSummary } from "@/components/app-model-bridge-summary";
import { GrowthClusterOverview } from "@/components/growth-cluster-overview";
import { MlExperimentGrid } from "@/components/ml-experiment-grid";
import { ModelEvaluationTables } from "@/components/model-evaluation-tables";
import { MlflowTrackingPanel } from "@/components/mlflow-tracking-panel";
import { MlResearchSummary } from "@/components/ml-research-summary";
import { PageHero } from "@/components/page-hero";
import { PcaExperimentPanel } from "@/components/pca-experiment-panel";
import { PageShell } from "@/components/page-shell";
import { ResearchFigureGallery } from "@/components/research-figure-gallery";

export const metadata: Metadata = {
  title: "ML Methodology | Cane Corso Growth Geometry Lab",
  description:
    "Machine learning methodology, model metrics and visual evidence for the Cane Corso Growth Geometry Lab app.",
};

const workflow = [
  "Prepare safe growth measurements and reference samples",
  "Represent each dog as a point in a coordinate or feature space",
  "Train regression models for expected growth curves",
  "Use classification models as review-zone signals",
  "Connect notebook evidence to the browser app layer",
  "Show visual evidence directly in the methodology gallery",
  "Export model coefficients and bridge them into calculator logic",
  "Use clustering and PCA to explain profile groups and visual maps",
];

export default function ExperimentsPage() {
  return (
    <PageShell>
      <div className="grid gap-8">
        <PageHero copyKey="experiments" />

        <MlResearchSummary />

        <AppModelBridgeSummary />

        <ModelEvaluationTables />

        <ResearchFigureGallery />

        <GrowthClusterOverview />

        <PcaExperimentPanel />

        <MlflowTrackingPanel />

        <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
            Model Cards
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Models explained through geometry.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-stone-400">
            The metrics below keep the methodology readable: the user can use the
            app, while the project reviewer can still inspect the model evidence.
          </p>
          <div className="mt-6">
            <MlExperimentGrid />
          </div>
        </section>

        <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
            Methodology Workflow
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
