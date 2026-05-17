# Step 31 — Dataset Acquisition Checklist & Starter Manifest

## Purpose

Add a controlled acquisition layer before any real neural vision training.

This step prepares the project to collect image candidates responsibly instead of downloading random images or training from unlabeled folders.

## Added

```txt
data/images/labels/dataset-acquisition-starter-manifest.csv
data/images/labels/dataset-acquisition-checklist.json
scripts/ml/validate_dataset_acquisition_manifest.py
src/lib/ml/dataset-acquisition-checklist.ts
src/components/dataset-acquisition-checklist-panel.tsx
docs/ml/dataset-acquisition-checklist-starter-manifest.md
docs/patches/step31-dataset-acquisition-checklist-starter-manifest.md
```

## Updated

```txt
src/app/visual-review/page.tsx
src/lib/ml/index.ts
README.md
```

## Scope

No raw image dataset is added.
No model is trained.
No visual match claim is made.

The patch adds the checklist, starter manifest, validation script and UI panel that explain how real image data must be collected before training.

## Validation

```bash
pnpm lint
pnpm build
python scripts/ml/validate_dataset_acquisition_manifest.py
```
