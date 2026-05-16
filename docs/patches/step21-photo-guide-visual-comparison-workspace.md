# Step 21 — Photo Guide & Visual Comparison Workspace

## Summary

Adds a new `/visual-review` app module that prepares the photo-based ML direction.

This step does not train a neural network and does not claim breed purity. It creates the product and methodology surface needed before a visual model can safely compare an uploaded image with Cane Corso reference geometry.

## Added

- `src/app/visual-review/page.tsx`
- `src/components/visual-review-workspace.tsx`
- `src/components/photo-guide-panel.tsx`
- `src/components/cane-corso-reference-silhouette.tsx`
- `src/lib/ml/photo-comparison-criteria.ts`
- `data/reference/photo-comparison-criteria.json`
- `docs/ml/photo-guide-visual-comparison.md`

## Updated

- app navigation with Visual Review route
- EN/BG/IT dictionaries for the new module
- ML export index
- README route/status notes

## Boundaries

- No real neural network yet.
- No automatic image recognition yet.
- No claim that a dog is “real Cane Corso” by image.
- The future score must be visual similarity only.
- Bad photos must be rejected or marked as limited before comparison.
