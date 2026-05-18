# Step 40.3 — Calculator Browser Polish

## Purpose

This step is a targeted follow-up to the browser review after Step 40.2.
It fixes the remaining Bulgarian-mode issues visible in the calculator path:

- raw English evidence rows in the formula cards;
- untranslated clustering geometry note;
- overly narrow explainability cards that made labels look vertical;
- Step 40.2 QA expectations that still allowed the narrow four-column layout.

## Boundary

This step does not change model training, generated metrics, dataset rows, neural-network logic, or routing.
It only improves localization and readability of already existing browser surfaces.

## Verification

Run:

```bash
pnpm step40-3:calculator-browser-polish:qa
pnpm step40-2:browser-language-ux:qa
pnpm step40-1:full-language-sweep:qa
pnpm step40:language-consistency:qa
pnpm step39:final-submission-lock:qa
pnpm ml:python:syntax
python scripts/ml/train_growth_neural_network.py
pnpm lint
pnpm build
```

Then visually check `/calculator` in Bulgarian mode.
