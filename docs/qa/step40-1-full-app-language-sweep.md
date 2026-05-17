# Step 40.1 — Full App Language Sweep

## Goal

After Step 40, the browser still showed mixed-language evidence cards in the visible app, especially on `/experiments` and methodology/data evidence panels. Step 40.1 expands the localization pass from a few obvious strings to the shared ML data surfaces used across the app.

## Scope

This step keeps app logic, neural-network training, datasets and UI structure unchanged. It only improves visible language consistency by routing shared ML strings through the app language layer.

Covered surfaces:

- `/experiments` methodology summary cards
- regression/classification evidence tables
- model cards
- methodology figure gallery
- app/model bridge summary
- calculator model bridge panel
- `/data` feature and formula panels
- `/course` course coverage cards
- final evidence matrix

## Guardrails

- Model metrics and formulas remain unchanged.
- Neural-network training remains unchanged.
- Algorithm names may remain recognizable, but Bulgarian UI no longer renders entire English card titles/descriptions by default.
- Safety boundaries remain visible: no veterinary diagnosis, no official certification from a photo, no breed-purity proof.

## Verification

Run:

```bash
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
