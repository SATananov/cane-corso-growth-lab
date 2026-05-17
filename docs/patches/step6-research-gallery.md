# Step 6 — Research Gallery / ML Visual Evidence

## Purpose

This patch makes the ML foundation visible inside the app by adding a Research Gallery to `/experiments`.

## Added

```txt
src/lib/ml/research-gallery.ts
src/components/research-figure-gallery.tsx
public/research/figures/regression_coordinate_system.png
public/research/figures/polynomial_curve_coordinate_system.png
public/research/figures/classification_feature_space_boundary.png
public/research/figures/clustering_feature_space_concept.png
docs/ml/visual-research-gallery.md
docs/patches/step6-research-gallery.md
```

## Updated

```txt
src/app/experiments/page.tsx
README.md
```

## Result

The `/experiments` page now explains the ML project through four visible concepts:

1. dog as a point in coordinate space;
2. growth as a curve;
3. classification as a review-zone boundary;
4. clustering as future profile grouping.

## Boundaries

This patch does not add backend services, authentication, database logic or medical diagnosis. It keeps the app educational and experimental.

## Recommended verification

```bash
pnpm lint
pnpm build
git status
```
