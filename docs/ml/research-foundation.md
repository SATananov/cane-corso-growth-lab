# Research Foundation

Step 5 imports the previous Cane Corso Growth Intelligence work into this separate app repository as the research foundation.

## What was imported

```txt
notebooks/
data/
reports/figures/
scripts/ml/
docs/ml/
requirements.txt
```

## Why this matters

The app is no longer only a visual prototype. It now has a notebook-backed ML layer:

- regression experiments for growth curves;
- classification experiments for review-zone signals;
- processed data samples;
- visual figures for coordinate interpretation;
- Python scripts for sample preparation.

## How the app uses it

The web app does not execute Python directly. Instead:

1. The notebooks provide the research evidence.
2. The model metrics are summarized in `src/lib/ml/model-results.ts`.
3. The `/experiments` route presents the research in app form.
4. The calculator remains a safe educational prototype.

## Boundary

This is not a veterinary diagnosis system. The ML layer is used for education, visualization and project explanation only.
