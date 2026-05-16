import type { Metadata } from "next";
import { CourseCoverageDashboard } from "@/components/course-coverage-dashboard";
import { FinalEvidenceMatrix } from "@/components/final-evidence-matrix";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Course Coverage | Cane Corso Growth Geometry Lab",
  description:
    "Machine learning course coverage map for the Cane Corso Growth Geometry Lab app.",
};

export default function CourseCoveragePage() {
  return (
    <PageShell>
      <div className="grid gap-8">
        <PageHero
          eyebrow="Final ML Roadmap"
          title="From course topics to a working growth intelligence app."
          description="This page maps the project to the main machine learning topics: regression, classification, clustering, feature engineering, dimensionality reduction and MLflow. It helps keep the app aligned with the course while staying product-like and safe."
          badge="Step 14 Course Coverage"
        />

        <CourseCoverageDashboard />

        <FinalEvidenceMatrix />
      </div>
    </PageShell>
  );
}
