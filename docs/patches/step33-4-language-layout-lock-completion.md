# Step 33.4 Completion — Language & Layout QA Lock

This completion patch finishes the Step 33.4 target after the review showed remaining mixed language and cramped-card risk.

## Fixed

- Visual Review now uses the localized `PageHero copyKey="visualReview"` instead of a hardcoded English hero.
- EN and IT dictionaries no longer contain Cyrillic copy leftovers.
- Dataset overview cards localize visible labels and key dataset summaries for BG / EN / IT.
- Visual Review ML panels now use language-aware section labels and readable-card layout guards:
  - demo image set plan
  - photo readiness model
  - visual breed classifier
  - visual similarity prototype
- Methodology cards now localize visible section framing for clustering, PCA and experiment tracking.
- Technical QA fixes included:
  - `run_mlflow_tracking_demo.py` escaped print string
  - dataset sample scripts now resolve the project root with `parents[2]`

## Scope

Presentation, language consistency and technical QA only. No model coefficients, notebook logic, dataset contracts or visual AI safety boundaries were changed.

## Checks

Run:

```bash
pnpm step33-4:language-layout:qa
pnpm ml:python:syntax
pnpm lint
pnpm build
```
