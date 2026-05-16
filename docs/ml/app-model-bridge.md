# App Model Bridge

Step 8 connects the imported notebook research with the live Next.js app.

The project now has two model layers:

1. **Research evidence** — notebooks, metrics, figures and exported coefficients.
2. **App bridge** — a fast TypeScript model layer used by the calculator.

The bridge does not claim to be a veterinary diagnostic model. It converts the
research foundation into transparent app logic for educational visualization.

## Source evidence

The bridge references:

- `notebooks/01_growth_regression_geometry.ipynb`
- `src/lib/ml/model-results.ts`
- `reports/model-exports/app-model-bridge-v0.1.json`

Regression evidence:

- best imported model: Ridge Regression
- R2 score: 0.987582
- RMSE: 1.404523
- MAE: 1.136788

Classification evidence:

- best imported model: Random Forest
- F1 score: 0.844757
- AUC: 0.911906
- Accuracy: 0.8324

## Exported coefficients

The simple linear baseline from the notebook is exported as:

```txt
weight_kg = 6.3080 + 3.5599 * age_months
```

The multi-dimensional coefficient evidence is also stored for transparency:

- `age_months`: 1.078118
- `height_cm`: 0.806786
- `sex_male`: 1.565315
- `activity_level_low`: -1.555904
- `activity_level_medium`: -0.916491

## Live app bridge

The live calculator uses `src/lib/ml/app-model-bridge.ts` and
`src/lib/growth-model.ts`.

The bridge uses:

- age as the X-axis coordinate;
- weight as the Y-axis coordinate;
- an expected growth curve scaled by adult reference weight;
- body condition score as a classification-style review signal;
- height and sex as context inputs;
- model metrics as visible evidence, not as medical certainty.

## Safety boundary

This bridge is for educational visualization. It is not medical advice, not a
veterinary diagnostic service and not an official Cane Corso evaluation system.
