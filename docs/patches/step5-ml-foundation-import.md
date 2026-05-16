# Step 5 — ML Foundation Import

## Purpose

This patch imports the previous notebook-based ML project into the new app repository as a research foundation.

## Added

```txt
notebooks/
data/
reports/figures/
scripts/ml/
docs/ml/
src/lib/ml/
src/components/ml-research-summary.tsx
requirements.txt
```

## Updated

```txt
README.md
src/app/experiments/page.tsx
src/components/ml-experiment-grid.tsx
```

## What this changes

- Adds regression notebooks and metrics.
- Adds classification notebooks and metrics.
- Adds processed datasets and prototype dataset.
- Adds coordinate-system figures.
- Adds TypeScript model result summaries used by the app.
- Upgrades `/experiments` into a real research overview page.

## Boundaries

This patch does not add:

- database;
- authentication;
- external API;
- Python server;
- veterinary diagnosis claims;
- production health recommendations.

The ML layer is educational and experimental.

## Recommended checks

```powershell
pnpm lint
pnpm build
git status
```

If everything passes:

```powershell
git add .
git commit -m "Import ML research foundation"
git push
```
