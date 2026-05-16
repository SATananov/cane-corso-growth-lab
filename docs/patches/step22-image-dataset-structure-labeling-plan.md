# Step 22 — Image Dataset Structure & Labeling Plan

## Purpose

Prepare the data contract required before training the future Computer Vision / neural image model.

## Added

- `src/lib/ml/image-dataset-labeling.ts`
- `src/components/image-dataset-structure-panel.tsx`
- `data/images/README.md`
- `data/images/labels/image-label-schema.json`
- `data/images/labels/sample-image-labels.csv`
- `data/images/labels/annotation-template.jsonl`
- image class folders with README placeholders
- `scripts/ml/validate_image_labels.py`
- `docs/ml/image-dataset-labeling-plan.md`

## Updated

- `src/app/visual-review/page.tsx`
- `src/lib/ml/index.ts`
- `README.md`

## Notes

This step does not train a neural network yet. It defines the dataset structure, labels, quality issue codes and validation script needed before training.

The result remains safety-aware: the future model may produce visual similarity signals, but it cannot prove pedigree, breed purity, official registration or health status from a photo.
