# Cane Corso Growth Lab — Final Browser Evidence Lock

## Purpose

This file is the final manual browser evidence plan for the project. It is designed for the last human review after the automated QA commands pass.

The goal is to prove that the submitted project is not only buildable, but also understandable in the browser: routes load, language is consistent, cards are readable, neural-network results are visible, and Step 41 evidence cards open their GitHub source files.

## Required browser setup

Run the project locally:

```bash
pnpm dev
```

Open:

```txt
http://localhost:3000
```

Before collecting screenshots, run the final checks:

```bash
pnpm step42:browser-evidence:qa
pnpm step41:clickable-evidence:qa
pnpm step40-3:calculator-browser-polish:qa
pnpm step39:final-submission-lock:qa
pnpm step37:neural-results-ui:qa
pnpm step36:neural-growth:qa
python scripts/ml/train_growth_neural_network.py
pnpm lint
pnpm build
```

## Evidence route order

Use this order for the final screen capture pass:

| Order | Route | Evidence goal |
| --- | --- | --- |
| 1 | `/` | Project concept and navigation are visible. |
| 2 | `/calculator` | Growth calculator, explainability panels and localized formula evidence are readable. |
| 3 | `/data` | Dataset transparency and clickable source actions are visible. |
| 4 | `/experiments` | ML experiments, neural-network panel and clickable evidence cards are visible. |
| 5 | `/visual-review` | Photo readiness and visual AI safety boundaries are clear. |
| 6 | `/course` | Course-topic mapping and final evidence matrix are visible. |
| 7 | `/about` | Scope, limitations and future work are visible. |

## Screenshot naming convention

Create a local folder outside the repository, for example:

```txt
Desktop/cane-corso-growth-lab-final-screenshots
```

Recommended filenames:

```txt
01-home-project-concept.png
02-calculator-growth-evidence.png
03-data-clickable-dataset-evidence.png
04-experiments-model-evidence.png
05-experiments-neural-network-results.png
06-experiments-clickable-source-card.png
07-visual-review-photo-readiness.png
08-course-topic-coverage.png
09-about-scope-limitations.png
10-terminal-final-verification.png
```

Do not store screenshots in the Git repository unless the submission explicitly requires it.

## Step 41 clickable evidence checks

During the browser pass, click at least one item from each group:

- one notebook card on `/experiments`;
- one dataset card on `/experiments` or `/data`;
- one figure/source card on `/experiments`;
- one neural-network evidence file in the Step 37 panel.

Expected result: each link opens a GitHub file in a new browser tab. If the repository is private, the reviewer must be logged in with access.

## Language and layout checks

For Bulgarian mode, manually confirm that:

- there are no corrupted mojibake strings such as `РЎ`, `ГЁ` or `вЂ™`;
- raw English phrases are not shown in normal explanation text, except accepted technical names such as `MLPClassifier`, `PCA`, `Ridge Regression`, `Random Forest`, `GitHub`, file paths and metric names;
- calculator explainability cards do not collapse into vertical-looking labels;
- route cards do not look clickable unless they have a real source link or clear action.

## Neural-network evidence checks

On `/experiments`, capture the neural-network panel showing:

- model type: `MLPClassifier`;
- task: `normal_growth vs needs_attention`;
- accuracy: `0.807`;
- F1 for `needs_attention`: `0.8117`;
- confusion matrix;
- source evidence links to the training script, notebook, report and metrics JSON.

## Safety boundaries to preserve

The final browser evidence must not present the project as:

- veterinary diagnosis;
- official Cane Corso certification;
- pedigree proof;
- breed-purity proof;
- image-based breed classifier;
- replacement for professional review.

The correct wording is: educational machine-learning prototype, tabular growth-review neural network, and future visual AI roadmap.

## Final pass result

When the screenshots are collected and all route checks look correct, the project can be treated as final browser-ready evidence for submission and defense.
