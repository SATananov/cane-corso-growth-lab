# Step 12 — PCA / Dimensionality Reduction Growth Map

This step adds a dimensionality-reduction visualization layer.

## Added

- `src/lib/ml/dimensionality-reduction.ts`
- `src/components/pca-growth-map.tsx`
- `src/components/pca-experiment-panel.tsx`

## Updated

- `/calculator` now shows a PCA-style growth space.
- `/experiments` now explains dimensionality reduction.
- `src/lib/growth-model.ts` now includes `pcaProjection`.

## Interpretation

The app compresses engineered features into a 2D map for visualization. This is PCA-style educational projection, not clinical scoring.
