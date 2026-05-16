# Step 33 — Visual Match Result Contract

## Purpose

Define the final result contract for the future visual Cane Corso similarity module.

## Added

- `src/lib/ml/visual-match-result-contract.ts`
- `src/components/visual-match-result-contract-panel.tsx`
- `reports/vision/visual-match-result-contract.json`
- `scripts/ml/run_visual_match_result_contract.py`
- `docs/ml/visual-match-result-contract.md`
- `notebooks/11_visual_match_result_contract.ipynb`

## Updated

- `src/app/visual-review/page.tsx`
- `src/lib/ml/index.ts`
- `README.md`

## Contract

The visual match score is shown only if the uploaded photo is not rejected by the photo quality gate.

```text
match = gate(readiness) × (classifier + embedding + geometry + confidence)
```

Rejected photos block the score and show a warning.

## Safety

The result is a visual similarity signal only. It does not prove breed purity, pedigree, genetic origin, health or official registration.
