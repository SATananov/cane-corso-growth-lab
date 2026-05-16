# Step 8 — Export ML Coefficients / App Model Bridge

This patch connects the research layer to the live application layer.

## Added

- `src/lib/ml/app-model-bridge.ts`
- `src/components/model-bridge-panel.tsx`
- `src/components/app-model-bridge-summary.tsx`
- `reports/model-exports/app-model-bridge-v0.1.json`
- `scripts/ml/export_app_model_bridge.py`
- `docs/ml/app-model-bridge.md`

## Updated

- `src/lib/growth-model.ts`
- `src/lib/ml/index.ts`
- `src/components/dog-growth-calculator.tsx`
- `src/app/experiments/page.tsx`
- `README.md`
- `docs/project/ml-foundation-plan.md`

## Result

The calculator now exposes a visible model bridge panel. The experiments page
also shows how exported ML evidence becomes app-side logic.

The app remains educational and non-diagnostic.
