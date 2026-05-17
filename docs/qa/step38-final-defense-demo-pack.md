# Step 38 — Final Defense & Demo Walkthrough Pack QA

## Scope

Step 38 adds final presentation and defense documentation for Cane Corso Growth Lab. It is a documentation and QA guardrail step only.

## Added files

```txt
docs/submission/defense-script.md
docs/submission/demo-walkthrough.md
docs/submission/screenshot-checklist.md
reports/final-project-summary-for-defense.md
docs/qa/step38-final-defense-demo-pack.md
scripts/qa-step38-final-defense-demo-pack.mjs
```

## Updated files

```txt
README.md
docs/submission/final-submission-guide.md
reports/final-submission-report.md
package.json
```

## Guardrails

Step 38 must:

- preserve the Step 37 neural-network UI panel;
- preserve the Step 36 tabular neural-network training scope;
- provide a clear demo route order;
- provide a defense script;
- provide a screenshot checklist;
- keep veterinary, certification, pedigree and image-classifier boundaries;
- avoid unsafe claims that the project proves breed purity, diagnoses a dog or certifies a Cane Corso from a photo.

## Verification

Run:

```bash
pnpm step38:defense-pack:qa
pnpm step37:neural-results-ui:qa
pnpm step36:neural-growth:qa
pnpm step35:submission-docs:qa
pnpm step34:visual-review-polish:qa
pnpm step33-4:language-layout:qa
pnpm ml:python:syntax
pnpm lint
pnpm build
```

Optional neural-network training check:

```bash
python scripts/ml/train_growth_neural_network.py
```
