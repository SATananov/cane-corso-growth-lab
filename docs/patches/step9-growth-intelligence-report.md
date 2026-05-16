# Step 9 — Growth Intelligence Report / Explainability Panel

## Purpose

Add a human-readable explainability layer between the model bridge and the user interface.

Before this step, the calculator produced prediction values, a model bridge panel and a coordinate map. Step 9 adds a report that explains what the result means in plain language.

## Added

```txt
src/lib/ml/growth-explainability.ts
src/components/growth-intelligence-report.tsx
docs/ml/growth-intelligence-report.md
```

## Updated

```txt
src/lib/growth-model.ts
src/components/dog-growth-calculator.tsx
src/lib/ml/index.ts
README.md
```

## What appears in the app

The `/calculator` page now includes:

- explainability panel;
- plain-language model interpretation;
- key factor cards;
- owner review checklist;
- technical summary;
- explicit safety boundary.

## Boundary

No backend, database, authentication, GitHub config or external API integration is changed.

This is an app/UI/model-interpretation patch only.
