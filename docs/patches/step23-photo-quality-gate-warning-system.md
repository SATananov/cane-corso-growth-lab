# Step 23 — Photo Quality Gate & Warning System

## Goal

Add the warning/check layer that must run before any future visual Cane Corso similarity score.

## Added

- `src/lib/ml/photo-quality-gate.ts`
- `src/components/photo-quality-gate-panel.tsx`
- `data/reference/photo-quality-gate-rules.json`
- `docs/ml/photo-quality-gate-warning-system.md`
- `docs/patches/step23-photo-quality-gate-warning-system.md`

## Updated

- `src/components/visual-review-workspace.tsx`
- `src/lib/ml/index.ts`
- `README.md`

## Behavior

The `/visual-review` workspace now includes a readiness gate with three outcomes:

- Accepted — comparison can continue;
- Limited — comparison can continue only with warning;
- Rejected — visual match score should be blocked and the user should upload a new photo.

## Boundary

This step does not train a neural network and does not claim breed purity. It creates the quality-gate logic, labels and UI that a future ML classifier should learn.
