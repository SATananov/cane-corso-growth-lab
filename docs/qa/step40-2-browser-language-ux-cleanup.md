# Step 40.2 — Browser Language & Calculator UX Cleanup

## Purpose

Step 40.2 responds to the browser review after Step 40.1. The remaining visible issues were concentrated in the calculator / methodology surfaces:

- adult-reference geometry still rendered raw English messages from the data layer;
- feature cards still rendered raw English labels and explanations;
- PCA reference labels still appeared in English in Bulgarian mode;
- some explainability cards were too narrow and caused vertical-looking labels;
- the shared ML phrase dictionary contained a duplicate `Age bucket` key that broke `pnpm build`.

## Scope

This is a presentation and localization cleanup only. It does not change:

- neural-network training logic;
- generated metrics;
- model formulas;
- datasets;
- route structure;
- submission documentation boundaries.

## Verification

Run:

```bash
pnpm step40-2:browser-language-ux:qa
pnpm step40-1:full-language-sweep:qa
pnpm step40:language-consistency:qa
pnpm step39:final-submission-lock:qa
pnpm step37:neural-results-ui:qa
pnpm step36:neural-growth:qa
pnpm ml:python:syntax
python scripts/ml/train_growth_neural_network.py
pnpm lint
pnpm build
```

Then inspect in the browser:

- `/calculator`
- `/experiments`
- `/data`
- `/course`
- `/visual-review`

## Expected browser result

Bulgarian mode should no longer show raw English explanatory copy in the calculator feature cards, geometry messages, PCA labels, or bridge sections, except for intentional technical identifiers such as model names, file paths, `PCA`, `MLPClassifier`, `R²`, `F1`, `PC1`, and `PC2`.
