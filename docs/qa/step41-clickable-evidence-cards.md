# Step 41 — Clickable Evidence Cards

Step 41 fixes the browser UX issue where notebook, dataset, figure and neural-network evidence cards looked like files but did not open anything.

## Scope

This step is UI/link behavior only. It does not change:

- neural-network training logic;
- generated metrics;
- datasets;
- safety boundaries;
- app routes;
- model output.

## What changed

- Added a shared GitHub source-link helper in `src/lib/source-links.ts`.
- Turned methodology asset cards in `/experiments` into real external links.
- Added clear open actions for notebook, data and figure evidence cards.
- Added source links to dataset cards in `/data`.
- Added GitHub evidence links to the Step 37 neural-network results panel.
- Added explicit hover/focus styles so clickable evidence cards no longer look like static blocks.

## Expected browser behavior

In `/experiments`, clicking notebook/data/figure evidence cards opens the matching source file in GitHub.

In `/data`, clicking the dataset path or the `Open dataset` action opens the matching dataset source file in GitHub.

In the Step 37 neural-network panel, each evidence file opens its source file in GitHub.

If the GitHub repository is private, links require the reviewer to be logged into an account with access. If the repository is public, the links work for everyone.

## Verification

Run:

```bash
pnpm step41:clickable-evidence:qa
```

Recommended full local verification:

```bash
pnpm step41:clickable-evidence:qa
pnpm step40-3:calculator-browser-polish:qa
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
