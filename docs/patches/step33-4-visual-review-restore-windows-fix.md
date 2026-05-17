# Step 33.4 Visual Review Restore + Windows QA Fix

This safety patch restores the Visual Review component files required by `src/app/visual-review/page.tsx` and keeps the Windows-safe QA scripts in `package.json`.

It addresses build failures such as `Module not found: Can't resolve "@/components/photo-readiness-model-panel"` after a partial patch extraction.

Included fixes:

- Restores the Visual Review component set.
- Restores supporting ML/i18n helper files used by those panels.
- Keeps `eslint.config.mjs` for ESLint v9.
- Updates `ml:python:syntax` to a Windows-safe command.
- Keeps the Step 33.4 language/layout QA script.
