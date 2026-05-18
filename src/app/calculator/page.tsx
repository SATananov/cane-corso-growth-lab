import type { Metadata } from "next";
import { DogGrowthCalculator } from "@/components/dog-growth-calculator";
import { OwnerJourneyPanel } from "@/components/owner-journey-panel";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Growth Check | Cane Corso Growth Geometry Lab",
  description:
    "Cane Corso growth orientation check with coordinate feedback, formulas and transparent ML evidence.",
};

export default function CalculatorPage() {
  return (
    <PageShell>
      <div className="grid gap-8">
        <PageHero copyKey="calculator" />
        <OwnerJourneyPanel compact />
        <DogGrowthCalculator />
      </div>
    </PageShell>
  );
}
