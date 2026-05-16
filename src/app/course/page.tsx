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
        <PageHero copyKey="course" />

        <CourseCoverageDashboard />

        <FinalEvidenceMatrix />
      </div>
    </PageShell>
  );
}
