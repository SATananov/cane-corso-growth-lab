import type { Metadata } from "next";
import { DogGrowthCalculator } from "@/components/dog-growth-calculator";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Growth Calculator | Cane Corso Growth Geometry Lab",
  description:
    "Interactive educational Cane Corso growth calculator with coordinate feedback.",
};

export default function CalculatorPage() {
  return (
    <PageShell>
      <div className="grid gap-8">
        <PageHero
          eyebrow="Growth Calculator"
          title="Build the current growth point."
          description="Enter a Cane Corso profile and see how the current measurement appears inside the coordinate-based growth model. The result is an educational signal for learning and visualization."
          badge="v0.3 route"
        />
        <DogGrowthCalculator />
      </div>
    </PageShell>
  );
}
