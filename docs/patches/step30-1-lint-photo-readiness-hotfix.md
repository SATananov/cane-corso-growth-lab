# Step 30.1 — Lint & Photo Readiness Audit Hotfix

This patch fixes two checkpoint blockers discovered after Step 30:

1. `pnpm lint` failed because `LanguageProvider` synchronously called `setLanguageState` inside an effect while reading the stored language.
   - The fix moves initial language detection into a guarded lazy `useState` initializer.
   - The remaining effect only syncs `document.documentElement.lang`.

2. `python scripts/ml/train_photo_readiness_model.py` failed because the Step 22 labels use `comparison_readiness` and `file_path`, while the early Step 27 script expected `comparison_ready` and `filename`.
   - The fix supports both schemas.
   - The script normalizes labels internally before writing the readiness report.

No UI behavior, model claims, visual comparison scoring, datasets, or dependencies are changed.
