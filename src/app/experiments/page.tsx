import type { Metadata } from "next";
import { AppModelBridgeSummary } from "@/components/app-model-bridge-summary";
import { GrowthClusterOverview } from "@/components/growth-cluster-overview";
import { MlExperimentGrid } from "@/components/ml-experiment-grid";
import { MlflowTrackingPanel } from "@/components/mlflow-tracking-panel";
import { MlResearchSummary } from "@/components/ml-research-summary";
import { PageHero } from "@/components/page-hero";
import { PcaExperimentPanel } from "@/components/pca-experiment-panel";
import { PageShell } from "@/components/page-shell";
import { ResearchFigureGallery } from "@/components/research-figure-gallery";

export const metadata: Metadata = {
  title: "ML Experiments | Cane Corso Growth Geometry Lab",
  description:
    "Machine learning experiment overview and imported research foundation for the Cane Corso Growth Geometry Lab app.",
};

const workflow = [
  "Prepare growth measurements and safe prototype samples",
  "Represent each dog as a point in a coordinate or feature space",
  "Train regression models for expected growth curves",
  "Use classification models as educational review-zone signals",
  "Connect the notebook evidence to the TypeScript app layer",
  "Show visual evidence directly in the Research Gallery",
  "Export app model coefficients and bridge them into calculator logic",
  "Explore clustering for similar educational growth profile groups",
];

export default function ExperimentsPage() {
  return (
    <PageShell>
      <div className="grid gap-8">
        <PageHero
          eyebrow="ML Experiments"
          title="The app now has a visible research foundation."
          description="This page connects the imported notebook work with the product layer: regression for curves, classification for review zones, clustering as the next experiment and geometry for visual understanding. The app keeps the ML educational and safe, not diagnostic."
          badge="Step 8 Model Bridge"
        />

        <MlResearchSummary />

        <AppModelBridgeSummary />

        <ResearchFigureGallery />

        <GrowthClusterOverview />

        <PcaExperimentPanel />

        <MlflowTrackingPanel />

        <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
            Experiment Cards
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Models as geometry.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-stone-400">
            The imported metrics are summarized below so the app can explain the
            ML layer without forcing the user to open every notebook first.
          </p>
          <div className="mt-6">
            <MlExperimentGrid />
          </div>
        </section>

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
