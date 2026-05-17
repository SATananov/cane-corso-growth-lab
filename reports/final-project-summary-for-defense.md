# Cane Corso Growth Lab — Final Project Summary for Defense

## Project identity

**Project name:** Cane Corso Growth Lab  
**Project type:** Educational machine learning web prototype  
**Main domain:** Cane Corso growth interpretation  
**Main goal:** Explain growth signals with structured data, coordinates, models and safe browser evidence.

## What was built

The project includes:

- a Next.js application;
- Jupyter notebooks;
- sample data and processed ML artifacts;
- regression/classification/clustering-style explanations;
- a real tabular neural network prototype;
- a browser-visible neural-network results panel;
- visual-review and Computer Vision roadmap documents;
- final submission and defense documentation.

## Main ML story

The project starts with a coordinate idea: a dog can be represented as a point, and growth can be interpreted as a trajectory. From this idea, the project builds ML-style evidence through:

- growth estimation;
- classification-style review states;
- feature engineering;
- clustering concepts;
- PCA-style visual projection;
- neural-network classification on structured growth data.

## Real neural-network component

Step 36 adds a real `scikit-learn` `MLPClassifier` trained on structured growth data.

Current result:

```txt
Task: normal_growth vs needs_attention
Accuracy: 0.807
Precision needs_attention: 0.7924
Recall needs_attention: 0.8320
F1 needs_attention: 0.8117
Confusion matrix: [[782, 218], [168, 832]]
```

Step 37 makes that result visible in `/experiments` through a dedicated neural-network results panel.

## Why this is not a photo AI yet

The repository does not contain a production image neural network because a real photo classifier needs a licensed, labeled and balanced image dataset. The project instead includes:

- image dataset structure;
- source-acquisition plan;
- label schema;
- photo-quality gate;
- visual similarity and geometry contracts;
- safe future-work boundaries.

This is the responsible approach because a photo alone cannot prove breed purity, pedigree, genetics, health or official status.

## Files to mention during defense

```txt
README.md
docs/submission/final-submission-guide.md
docs/submission/defense-script.md
docs/submission/demo-walkthrough.md
docs/submission/screenshot-checklist.md
reports/final-submission-report.md
reports/final-project-summary-for-defense.md
scripts/ml/train_growth_neural_network.py
notebooks/12_tabular_neural_network_growth_prediction.ipynb
reports/neural-network-growth-prototype.md
reports/neural-network-growth-prototype-results.json
src/components/neural-network-results-panel.tsx
```

## Verification commands

```bash
pnpm step38:defense-pack:qa
pnpm step37:neural-results-ui:qa
pnpm step36:neural-growth:qa
pnpm step35:submission-docs:qa
pnpm step34:visual-review-polish:qa
pnpm step33-4:language-layout:qa
pnpm ml:python:syntax
python scripts/ml/train_growth_neural_network.py
pnpm lint
pnpm build
```

## Final safe claim

The project can be described as a complete educational ML prototype with a real tabular neural network and a strong explainable UI layer. It should not be described as a veterinary diagnostic system, an official Cane Corso certification system, a pedigree proof system or an image-based breed classifier.
