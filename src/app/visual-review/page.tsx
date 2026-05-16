import { BreedClassifierTrainingPanel } from "@/components/breed-classifier-training-panel";
import { DatasetAcquisitionChecklistPanel } from "@/components/dataset-acquisition-checklist-panel";
import { DemoImageSetPlanPanel } from "@/components/demo-image-set-plan-panel";
import { ImageDatasetStructurePanel } from "@/components/image-dataset-structure-panel";
import { ImageSourceAcquisitionPanel } from "@/components/image-source-acquisition-panel";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { PhotoReadinessModelPanel } from "@/components/photo-readiness-model-panel";
import { VisionDatasetReadinessPanel } from "@/components/vision-dataset-readiness-panel";
import { VisualBreedClassifierPanel } from "@/components/visual-breed-classifier-panel";
import { VisualMatchResultContractPanel } from "@/components/visual-match-result-contract-panel";
import { VisualReviewWorkspace } from "@/components/visual-review-workspace";
import { VisualSimilarityPanel } from "@/components/visual-similarity-panel";

export default function VisualReviewPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Visual ML"
        title="Photo guide, quality gate and visual model training readiness."
        description="This workspace prepares the visual side of the app: first the photo must be suitable, then the image can be compared with Cane Corso reference geometry and future neural vision models."
      />

      <div className="space-y-8">
        <VisualReviewWorkspace />
        <ImageDatasetStructurePanel />
        <ImageSourceAcquisitionPanel />
        <DatasetAcquisitionChecklistPanel />
        <DemoImageSetPlanPanel />
        <BreedClassifierTrainingPanel />
        <VisionDatasetReadinessPanel />
        <PhotoReadinessModelPanel />
        <VisualBreedClassifierPanel />
        <VisualSimilarityPanel />
        <VisualMatchResultContractPanel />
      </div>
    </PageShell>
  );
}
