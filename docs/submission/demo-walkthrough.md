# Cane Corso Growth Lab — Demo Walkthrough

## Purpose

This file provides a step-by-step route walkthrough for presenting the application in a browser.

## Before the demo

Run the app locally:

```bash
pnpm install
pnpm dev
```

Then open:

```txt
http://localhost:3000
```

Optional final verification before presenting:

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

## Route 1 — Home `/`

Show the main concept: growth as coordinates and trajectory.

Key explanation:

- The project is not only a notebook; it is an interactive ML product prototype.
- The app explains growth signals visually and safely.

## Route 2 — Calculator `/calculator`

Use a demo profile and point out:

- profile input;
- growth prediction summary;
- formula explanation;
- feature vector;
- coordinate map and model-evidence panels.

Key explanation:

- This is where user input becomes structured ML-style evidence.
- The output is educational orientation, not veterinary diagnosis.

## Route 3 — Data `/data`

Show the dataset-oriented panels.

Key explanation:

- The app is transparent about its fields and sample data.
- Data quality and feature selection are part of the learning goal.

## Route 4 — Experiments `/experiments`

Show the research panels and the Step 37 neural-network results panel.

Key explanation:

- Step 36 trains a real tabular MLP neural network.
- Step 37 makes the metrics visible in the browser.
- The model is for structured growth review, not image-based breed proof.

Say clearly:

```txt
The trained neural network is a tabular growth-review prototype. It predicts normal_growth vs needs_attention and reports accuracy 0.807 and F1 0.8117 for the needs_attention class.
```

## Route 5 — Visual Review `/visual-review`

Show photo guide, photo-quality gate and visual-comparison readiness.

Key explanation:

- This is the future Computer Vision path.
- The project already defines labels, gates and safety rules.
- It does not claim to prove breed, health or pedigree from photos.

## Route 6 — Course `/course`

Use this route to connect the project to ML course topics:

- regression;
- classification;
- feature engineering;
- clustering;
- dimensionality reduction;
- neural-network prototype;
- responsible AI boundaries.

## Route 7 — About `/about`

Finish with limitations and future work.

Key explanation:

- Future work requires real longitudinal records and properly licensed images.
- The project intentionally keeps safe wording.

## Demo ending

Suggested final sentence:

> This project shows a full learning pipeline: data idea, features, model experiments, real neural-network training, browser evidence, documentation and safety boundaries.
