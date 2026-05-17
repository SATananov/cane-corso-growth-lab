# Step 20 — Cane Corso Breed Reference Geometry

## Goal

Add a standard-based Cane Corso reference geometry layer before building photo comparison or neural vision logic.

## Added

- `src/lib/ml/breed-reference-geometry.ts`
- `src/components/breed-reference-geometry-panel.tsx`
- `src/components/breed-reference-geometry-table.tsx`
- `src/components/breed-reference-methodology-panel.tsx`
- `data/reference/cane-corso-breed-reference-geometry.json`
- `docs/ml/cane-corso-breed-reference-geometry.md`

## Updated

- `src/components/dog-growth-calculator.tsx`
- `src/app/data/page.tsx`
- `src/app/experiments/page.tsx`
- `src/lib/ml/index.ts`
- `README.md`

## What changed in the app

### Growth Check

Adds a live reference panel that compares the current dog profile with adult Cane Corso height/weight context.

### Data & References

Adds a breed reference geometry table with height, weight and proportion formulas.

### ML Methodology

Adds a methodology panel explaining how standard proportions become model/app features and prepare the future photo comparison module.

## Boundaries

No neural model is trained in this step.
No photo upload is added in this step.
No official breed verification is claimed.
No veterinary or pedigree conclusion is claimed.

This step prepares the geometry foundation needed for the next visual ML/photo readiness steps.
