# Step 32 — Small Curated Demo Image Set Plan

## Purpose

Define the first safe, manually reviewed image collection plan for the visual ML direction without committing unverified raw photos.

## Added

- `src/lib/ml/demo-image-set-plan.ts`
- `src/components/demo-image-set-plan-panel.tsx`
- `data/images/demo/demo-image-set-plan.json`
- `data/images/demo/README.md`
- placeholder demo image folders with `.gitkeep`
- `data/images/labels/demo-image-manifest-template.csv`
- `reports/vision/demo-image-set-plan.json`
- `scripts/ml/validate_demo_image_set_plan.py`
- `docs/ml/small-curated-demo-image-set-plan.md`

## Updated

- `/visual-review` now includes the demo image set plan after the dataset acquisition checklist.
- `src/lib/ml/index.ts` exports the demo image set plan.
- `README.md` documents Step 32.

## Boundary

This step does not train a neural network and does not add raw images. It prepares the data governance and manifest structure needed before visual training.
