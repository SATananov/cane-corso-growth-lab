# Step 42.1 — Hydration-Stable Number Formatting

## Purpose

Fix a browser hydration warning on `/experiments` caused by locale-dependent number formatting.

React reported a server/client text mismatch where the neural-network dataset split rendered as `8000 train rows / 2000 test rows` on one side and `8,000 train rows / 2,000 test rows` on the other.

## Scope

This is a UI stability patch only. It does not change the neural-network training script, metrics, datasets, routes, or business logic.

## Changes

- Added deterministic integer formatter in `src/lib/number-format.ts`.
- Replaced hydration-sensitive `.toLocaleString()` calls in visible client ML panels.
- Added QA guardrail `pnpm step42-1:hydration-stable:qa`.

## Verification

Run:

```bash
pnpm step42-1:hydration-stable:qa
pnpm step42:browser-evidence:qa
pnpm step41:clickable-evidence:qa
pnpm step40-3:calculator-browser-polish:qa
pnpm step39:final-submission-lock:qa
pnpm step37:neural-results-ui:qa
pnpm step36:neural-growth:qa
pnpm ml:python:syntax
python scripts/ml/train_growth_neural_network.py
pnpm lint
pnpm build
```

Then open `/experiments` in dev mode and confirm no hydration mismatch appears for the neural-network dataset split.
