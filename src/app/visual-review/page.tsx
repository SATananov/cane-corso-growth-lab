import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { VisualReviewWorkspace } from "@/components/visual-review-workspace";

export const metadata: Metadata = {
  title: "Visual Review | Cane Corso Growth Geometry Lab",
  description:
    "Photo guide and visual comparison workspace for future Cane Corso image-based geometry review.",
};

export default function VisualReviewPage() {
  return (
    <PageShell>
      <div className="grid gap-8">
        <PageHero copyKey="visualReview" />
        <VisualReviewWorkspace />
      </div>
    </PageShell>
  );
}
