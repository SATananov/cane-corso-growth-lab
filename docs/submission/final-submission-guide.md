# Cane Corso Growth Lab — Final Submission Guide

## One-sentence project description

Cane Corso Growth Lab is an educational machine learning web prototype that explains Cane Corso growth with coordinates, regression-style curves, classification-style review zones, clustering concepts and a safe visual-review roadmap.

## What to submit

Recommended submission package:

```txt
1. GitHub repository or clean ZIP of the project
2. README.md
3. reports/final-submission-report.md
4. reports/final-course-coverage.md
5. notebooks/ folder
6. docs/submission/defense-script.md
7. docs/submission/demo-walkthrough.md
8. docs/submission/screenshot-checklist.md
9. reports/final-project-summary-for-defense.md
10. Optional screenshots or screen recording of the running app
```

The app routes that best demonstrate the project are:

```txt
/               Project introduction
/calculator     Interactive growth calculator and explanation panels
/data           Dataset explorer and feature/data transparency
/experiments    ML experiment summaries and visual evidence
/course         Course-topic mapping and final evidence matrix
/visual-review  Safe photo-readiness and visual-comparison prototype
/about          Scope, limitations and future direction
```

## How to run locally

```bash
pnpm install
pnpm dev
```

Then open:

```txt
http://localhost:3000
```

## Final verification commands

Run these checks before final submission:

```bash
pnpm step42:browser-evidence:qa
pnpm step41:clickable-evidence:qa
pnpm step40-3:calculator-browser-polish:qa
pnpm step39:final-submission-lock:qa
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

Expected result: all QA commands pass, the Step 37 neural-network UI guardrail passes, the Step 36 neural-network guardrail passes, lint has no warnings, and the Next.js build completes successfully. Optional training command: `python scripts/ml/train_growth_neural_network.py`.

## Presentation path

A simple presentation flow:

1. Start on `/` and explain the idea: a dog can be represented as a point, and growth can be represented as a trajectory.
2. Open `/calculator`, load a demo profile and explain how the prediction, formulas, feature vector, clustering and PCA-style map respond.
3. Open `/data` to show that the model does not hide its input fields, sample data, formulas or limitations.
4. Open `/experiments` to show regression, classification, clustering and visual research evidence.
5. Use the Step 37 neural-network results panel on `/experiments` to show the real Step 36 `MLPClassifier`, accuracy, F1 score, confusion matrix and evidence files.
6. Mention Step 36: the project now includes a real tabular neural network for a growth review signal, documented in `notebooks/12_tabular_neural_network_growth_prediction.ipynb` and `reports/neural-network-growth-prototype.md`.
7. Open `/visual-review` to explain the future Computer Vision direction and why the image neural network remains future work until a licensed labeled image dataset exists.
8. Open `/course` to connect the app to the machine learning course topics.
9. Finish on `/about` and explain limitations and future work.

## What the project demonstrates

- Regression thinking for growth estimation.
- Classification thinking for review zones.
- Feature engineering from raw dog-profile input.
- Clustering as a future grouping direction.
- Dimensionality-reduction style visualization.
- Dataset transparency and safe demo-data boundaries.
- A real Step 36 tabular neural network prototype for growth-review classification.
- A browser-visible Step 37 neural-network results panel.
- A Computer Vision roadmap that starts with photo readiness before similarity scoring.
- A product-like interface that explains ML results to a non-technical user.

## What the project does not claim

The project does not claim to diagnose a dog, replace a veterinarian, prove pedigree, certify breed purity, issue official registry status, identify health problems from photos, or make breeding decisions. Step 36 is a tabular neural-network prototype, not an image classifier or medical model.

It is a learning and visualization prototype.

## Suggested final wording for submission

This project is an educational machine learning prototype. It combines a web application with notebooks and documentation to explain how dog growth can be represented with coordinates, curves, zones and visual evidence. The focus is not only model output, but also transparency, safe interpretation and clear user-facing explanation.


## Step 38 defense pack

Step 38 adds final files for presentation and defense:

```txt
docs/submission/defense-script.md
docs/submission/demo-walkthrough.md
docs/submission/screenshot-checklist.md
reports/final-project-summary-for-defense.md
```

Use `defense-script.md` when explaining the project verbally. Use `demo-walkthrough.md` as the browser route order. Use `screenshot-checklist.md` to prepare evidence images, especially the Step 37 neural-network results panel in `/experiments`.

The defense pack keeps the same safe interpretation: Step 36 is a real tabular neural network for a growth-review signal; it is not a veterinary diagnostic system, not official Cane Corso certification and not an image-based breed classifier.


## Step 39 final readiness lock

Step 39 adds the final submission readiness lock. Use `docs/submission/final-checklist.md` as the last checklist before submitting the GitHub link, source ZIP or screenshots.

Final lock verification command:

```bash
pnpm step39:final-submission-lock:qa
```

The final source ZIP should be created from Git, not from a manual working-folder compression:

```bash
git archive --format=zip --output=cane-corso-growth-lab_step39_github_exact_source.zip HEAD
```

Before creating the ZIP, verify that `HEAD` equals `origin/main` so the archive matches GitHub.

## Step 41 evidence-card usability

Step 41 makes the evidence cards easier to verify during demo review. On `/experiments`, the notebook, data, figure and neural-network evidence cards now open their matching GitHub source files. On `/data`, each dataset card has a direct source-file action.

Use this in the presentation after showing the neural-network panel: click one notebook or metrics JSON card to demonstrate that the browser UI is connected back to project files and not just static text.

Verification command:

```bash
pnpm step41:clickable-evidence:qa
```

If the GitHub repository is private, make sure the reviewer account has access before relying on the links during a live demo.

## Step 42 final browser evidence

Step 42 adds the final browser evidence checklist for submission. Use:

```txt
docs/submission/browser-evidence-lock.md
reports/final-browser-evidence-summary.md
```

Before final handoff, capture the required screenshots from `/`, `/calculator`, `/data`, `/experiments`, `/visual-review`, `/course` and `/about`. On `/experiments` and `/data`, click at least one Step 41 evidence card to show that the browser UI opens the matching GitHub source file.

Final browser evidence command:

```bash
pnpm step42:browser-evidence:qa
```

## Step 43 — Owner Journey Review

Step 43 adds a first-time user path to the running app. During the demo, open `/` or `/calculator` and show the owner-mode panel before showing the technical evidence pages.

Recommended explanation:

> A normal owner starts by entering a Cane Corso profile. The app returns an orientation signal, explains the next step and keeps the ML evidence available for review. The neural-network and methodology pages are transparent evidence, not a replacement for veterinary advice.

Verification command:

```bash
pnpm step43:owner-journey:qa
```
