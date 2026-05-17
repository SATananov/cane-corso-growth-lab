# Step 10 — Clustering / Growth Profile Groups

This step adds an unsupervised-learning layer to the app.

## Added

- `src/lib/ml/growth-clustering.ts`
- `src/components/growth-cluster-panel.tsx`
- `src/components/growth-cluster-overview.tsx`

## Updated

- `src/lib/growth-model.ts`
- `src/components/dog-growth-calculator.tsx`
- `src/app/experiments/page.tsx`
- `src/lib/ml/index.ts`
- `README.md`

## Concept

The dog is treated as a point in a multi-feature space. The app compares that point to a small set of educational centroids:

- Balanced growth arc
- Compact / later growth profile
- Power growth profile
- Condition review profile

The assigned group is an educational cluster signal, not a medical category.
