# Step 24 — Image Source & Dataset Acquisition Plan

## Summary

Adds the image source acquisition layer for the future Cane Corso visual/neural model.

## Added

- `data/images/source-catalog.json`
- `data/images/labels/source-manifest-template.csv`
- `data/images/source-acquisition-notes.md`
- external image class folders with `.gitkeep` placeholders
- `src/lib/ml/image-source-acquisition.ts`
- `src/components/image-source-acquisition-panel.tsx`
- `scripts/ml/validate_image_source_catalog.py`
- `docs/ml/image-source-acquisition-plan.md`

## Updated

- `/visual-review` page now displays the acquisition/source plan.
- `README.md` records the Step 24 visual ML data plan.
- `src/lib/ml/index.ts` exports the acquisition module.

## Boundary

This step does not download images, train a neural network or add a visual match score. It prepares a responsible source and dataset acquisition plan before model training.
