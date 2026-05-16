import type { Metadata } from "next";
import { AboutLabContent } from "@/components/about-lab-content";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { UsgLabVisualSystemPanel } from "@/components/usg-lab-visual-system-panel";

export const metadata: Metadata = {
  title: "About | Cane Corso Growth Geometry Lab",
  description:
    "Scope, limitations and technology direction for Cane Corso Growth Geometry Lab.",
};

export default function AboutPage() {
  return (
    <PageShell>
      <div className="grid gap-8">
        <PageHero copyKey="about" />

        <UsgLabVisualSystemPanel />

        <AboutLabContent />
      </div>
    </PageShell>
  );
}
