import type { Metadata } from "next";
import { DatasetExplorerSummary } from "@/components/dataset-explorer-summary";
import { FeatureEngineeringSummary } from "@/components/feature-engineering-summary";
import { DatasetOverviewCard } from "@/components/dataset-overview-card";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { datasetOverview } from "@/lib/ml/dataset-overview";

export const metadata: Metadata = {
  title: "Data Overview | Cane Corso Growth Geometry Lab",
  description:
    "Dataset explorer and data transparency page for the Cane Corso Growth Geometry Lab ML app.",
};

export default function DataOverviewPage() {
  return (
    <PageShell>
      <div className="grid gap-8">
        <PageHero
          eyebrow="Dataset Explorer"
          title="The app shows what data supports the ML experiments."
          description="This page explains the prototype, processed and classification datasets used by the research layer. It keeps the app transparent: what is included, how each dataset is used and where the educational limits are."
          badge="Step 7 Data Overview"
        />

        <DatasetExplorerSummary />

        <FeatureEngineeringSummary />

        <section className="grid gap-6">
          {datasetOverview.map((dataset) => (
            <DatasetOverviewCard key={dataset.id} dataset={dataset} />
          ))}
        </section>
      </div>
    </PageShell>
  );
}
