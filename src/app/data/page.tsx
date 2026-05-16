import type { Metadata } from "next";
import { DatasetExplorerSummary } from "@/components/dataset-explorer-summary";
import { FeatureEngineeringSummary } from "@/components/feature-engineering-summary";
import { FeatureFormulaTable } from "@/components/feature-formula-table";
import { DatasetOverviewCard } from "@/components/dataset-overview-card";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { datasetOverview } from "@/lib/ml/dataset-overview";

export const metadata: Metadata = {
  title: "Data & References | Cane Corso Growth Geometry Lab",
  description:
    "Data sources, processed samples and feature logic for the Cane Corso Growth Geometry Lab app.",
};

export default function DataOverviewPage() {
  return (
    <PageShell>
      <div className="grid gap-8">
        <PageHero copyKey="data" />

        <DatasetExplorerSummary />

        <FeatureEngineeringSummary />

        <FeatureFormulaTable />

        <section className="grid gap-6">
          {datasetOverview.map((dataset) => (
            <DatasetOverviewCard key={dataset.id} dataset={dataset} />
          ))}
        </section>
      </div>
    </PageShell>
  );
}
