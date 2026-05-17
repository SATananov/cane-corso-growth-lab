# Step 11 — Feature Engineering Layer

This step makes the ML input transformation visible.

## Added

- `src/lib/ml/feature-engineering.ts`
- `src/components/feature-vector-panel.tsx`
- `src/components/feature-engineering-summary.tsx`

## Updated

- `/calculator` now shows the live model-ready feature vector.
- `/data` now explains the feature engineering contract.
- `src/lib/growth-model.ts` now includes `featureEngineering` in every prediction.

## Safe interpretation

Features are educational transformations of owner input. They are not clinical measurements and should not be treated as medical evidence.
