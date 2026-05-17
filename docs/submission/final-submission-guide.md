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
6. Optional screenshots or screen recording of the running app
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
pnpm step35:submission-docs:qa
pnpm step34:visual-review-polish:qa
pnpm step33-4:language-layout:qa
pnpm ml:python:syntax
pnpm lint
pnpm build
```

Expected result: all QA commands pass, lint has no warnings, and the Next.js build completes successfully.

## Presentation path

A simple presentation flow:

1. Start on `/` and explain the idea: a dog can be represented as a point, and growth can be represented as a trajectory.
2. Open `/calculator`, load a demo profile and explain how the prediction, formulas, feature vector, clustering and PCA-style map respond.
3. Open `/data` to show that the model does not hide its input fields, sample data, formulas or limitations.
4. Open `/experiments` to show regression, classification, clustering and visual research evidence.
5. Open `/visual-review` to explain the future Computer Vision direction and why the app blocks unsafe visual claims.
6. Open `/course` to connect the app to the machine learning course topics.
7. Finish on `/about` and explain limitations and future work.

## What the project demonstrates

- Regression thinking for growth estimation.
- Classification thinking for review zones.
- Feature engineering from raw dog-profile input.
- Clustering as a future grouping direction.
- Dimensionality-reduction style visualization.
- Dataset transparency and safe demo-data boundaries.
- A Computer Vision roadmap that starts with photo readiness before similarity scoring.
- A product-like interface that explains ML results to a non-technical user.

## What the project does not claim

The project does not claim to diagnose a dog, replace a veterinarian, prove pedigree, certify breed purity, issue official registry status, identify health problems from photos, or make breeding decisions.

It is a learning and visualization prototype.

## Suggested final wording for submission

This project is an educational machine learning prototype. It combines a web application with notebooks and documentation to explain how dog growth can be represented with coordinates, curves, zones and visual evidence. The focus is not only model output, but also transparency, safe interpretation and clear user-facing explanation.
