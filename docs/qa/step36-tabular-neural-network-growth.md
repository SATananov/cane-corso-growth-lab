# Step 36 QA — Tabular Neural Network Growth Prediction Prototype

Step 36 adds a real tabular neural-network prototype while keeping the locked Step 35 app and documentation stable.

## Scope

Allowed changes:

- add a neural-network training script for structured growth data;
- add a Jupyter notebook explaining the training flow;
- add a generated metrics JSON report;
- add a human-readable neural-network report;
- update README/submission docs to mention Step 36;
- add a QA guardrail and package script.

Not allowed:

- claim veterinary diagnosis;
- claim official breed certification;
- claim pedigree or breed-purity proof;
- train an image classifier without a licensed labeled image dataset;
- change the app UI or locked routes.

## Verification commands

```bash
pnpm step36:neural-growth:qa
pnpm step35:submission-docs:qa
pnpm step34:visual-review-polish:qa
pnpm step33-4:language-layout:qa
pnpm ml:python:syntax
pnpm lint
pnpm build
```

Optional real training command:

```bash
python scripts/ml/train_growth_neural_network.py
```

## Expected result

- Step 36 QA passes.
- The Python script compiles.
- The training script can write `reports/neural-network-growth-prototype-results.json`.
- Documentation clearly states that the neural network is tabular/growth-based, not image-based.
- The safety boundary remains visible.
