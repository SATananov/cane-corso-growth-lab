# Step 37 — Neural Network Results UI Panel QA

## Goal

Step 37 makes the Step 36 tabular neural-network result visible inside the `/experiments` browser surface. It does not retrain the model and it does not change the growth calculator, visual review logic or dataset generation scripts.

## Scope

Added:

- `src/lib/ml/neural-network-growth-results.ts`
- `src/components/neural-network-results-panel.tsx`
- `/experiments` integration through `NeuralNetworkResultsPanel`
- `scripts/qa-step37-neural-network-results-ui.mjs`
- `pnpm step37:neural-results-ui:qa`

## Guardrails

The panel must:

- show the real Step 36 metrics: accuracy `0.807`, F1 `0.8117`, confusion matrix `[[782, 218], [168, 832]]`;
- identify the model as `MLPClassifier`;
- show the task `normal_growth vs needs_attention`;
- list the evidence files used for defense and review;
- keep the safety boundary clear: this is not veterinary diagnosis, not official certification and not an image-based breed classifier;
- remain localized for BG/EN/IT copy.

## Verification

Run:

```bash
pnpm step37:neural-results-ui:qa
pnpm step36:neural-growth:qa
pnpm step35:submission-docs:qa
pnpm step34:visual-review-polish:qa
pnpm step33-4:language-layout:qa
pnpm ml:python:syntax
pnpm lint
pnpm build
```
