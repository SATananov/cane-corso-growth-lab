# Cane Corso Growth Geometry Lab

**Cane Corso Growth Geometry Lab** is an experimental web app for exploring Cane Corso growth patterns through coordinates, curves and machine learning concepts.

The project is built as a separate research-and-application lab. It is not part of the main USG / Cane Corso Platform codebase, but it can later become a foundation for a future growth intelligence module.

## Product & project language lock

The app is intentionally split into two layers:

- **Product layer:** Growth Check, Data & References, About — written as a usable orientation app.
- **Project layer:** ML Methodology and Project Evidence — keeps the machine learning work reviewable for course assessment.

The visible app avoids development wording such as patch/step/route labels, while the documentation still preserves the full step history for traceability.

## Project idea

I use this project to experiment with a simple but visual idea:

> A Cane Corso can be represented as a point in a coordinate system. Growth can be represented as a trajectory. Regression models can estimate curves, classification models can mark review zones, and clustering can later group similar growth profiles.

The app is designed to be understandable for a beginner-friendly machine learning project while still feeling like a real product prototype.

## Current app status

The current version includes:

- premium landing page
- dedicated navigation
- growth calculator page
- interactive Cane Corso profile input
- prediction summary panel
- coordinate-based growth map concept
- ML experiments page
- dataset explorer page for ML transparency
- imported notebook research foundation
- model metrics summary inside the app
- Growth Intelligence Report explainability panel inside `/calculator`
- Research Gallery with ML visual evidence inside `/experiments`
- scope and limitations page
- educational safety disclaimer
- visual photo guide and comparison-readiness workspace

## Tech stack

- **Next.js** with App Router
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Python / Jupyter notebooks** for the ML foundation
- **pandas, numpy, scikit-learn, matplotlib** for model experiments

## App routes

```txt
/             Home / product concept
/calculator   Growth calculator and prediction panel
/data         Dataset explorer and ML data overview
/visual-review Photo guide and visual comparison workspace
/experiments  ML experiment overview and imported research foundation
/course       ML course coverage and final roadmap
/about        Scope, limitations and project direction
```


## Visual Review direction

The `/visual-review` page prepares the future Computer Vision layer. It explains which Cane Corso photos are suitable for comparison, previews uploaded images and defines readiness states before any visual match score is allowed.

The intended future workflow is:

```txt
photo guide → upload → photo quality gate → accepted/limited/rejected → geometry extraction → reference comparison → visual Cane Corso similarity
```

The result must remain a visual similarity signal. It cannot prove pedigree, breed purity, official registration or health status from a photo.


## Visual Image Dataset & Labeling

Step 22 prepares the future Computer Vision training structure. The app now documents how image labels will teach the model to separate:

- suitable vs unsuitable photos;
- side body, front body, head profile and head front views;
- Cane Corso visual type vs selected similar comparison classes;
- accepted, limited and rejected comparison readiness states.

The dataset contract lives in:

```txt
data/images/
data/images/labels/image-label-schema.json
data/images/labels/sample-image-labels.csv
scripts/ml/validate_image_labels.py
src/lib/ml/image-dataset-labeling.ts
```

This step does not train a neural network yet. It prepares the structure needed to train the future photo readiness classifier, breed/type classifier and visual similarity model.



## Photo Quality Gate

Step 23 adds a comparison-readiness gate inside `/visual-review`.

Before a future visual Cane Corso match score is allowed, the uploaded photo must be evaluated as:

- **Accepted** — suitable for visual geometry comparison;
- **Limited** — usable only with a visible reliability warning;
- **Rejected** — not suitable; the app should block the visual match score and ask for a new photo.

The current implementation is checklist-based. This defines the labels and warning behavior for the future neural photo-readiness model.

The gate logic lives in:

```txt
src/lib/ml/photo-quality-gate.ts
src/components/photo-quality-gate-panel.tsx
data/reference/photo-quality-gate-rules.json
docs/ml/photo-quality-gate-warning-system.md
```



## Image Source & Dataset Acquisition Plan

Step 24 adds a responsible source acquisition plan for the future visual/neural model.

The project now tracks candidate sources and dataset rules in:

```txt
data/images/source-catalog.json
data/images/labels/source-manifest-template.csv
data/images/source-acquisition-notes.md
scripts/ml/validate_image_source_catalog.py
src/lib/ml/image-source-acquisition.ts
src/components/image-source-acquisition-panel.tsx
```

This step does not download images or train a neural network. It defines which sources may be considered, how licenses/permissions must be checked, which target classes are needed and why raw images should usually stay outside Git.

The intended visual dataset will teach the model:

- whether a photo is suitable for comparison;
- whether a photo shows Cane Corso visual type or a similar breed class;
- whether the uploaded image can be compared with reference geometry;
- which photos must be rejected before a visual match score is shown.

To validate the source catalog:

```bash
python scripts/ml/validate_image_source_catalog.py
```

## Machine learning foundation

The repository now includes the ML research base:

```txt
notebooks/
├── 01_growth_regression_geometry.ipynb
├── 02_real_data_preparation.ipynb
├── 03_growth_classification_zones.ipynb
└── 04_growth_clustering_experiment.ipynb

data/
├── prototype/
├── processed/
└── raw/

reports/figures/
```

The app connects to summarized model results through:

```txt
src/lib/ml/model-results.ts
src/lib/ml/research-assets.ts
src/components/ml-research-summary.tsx
src/components/research-figure-gallery.tsx
src/lib/ml/research-gallery.ts
```


## Dataset Explorer

The `/data` page explains the datasets that support the ML layer. It summarizes:

- prototype Cane Corso growth sample
- processed public growth sample
- growth classification sample
- row and column counts
- key fields used by the experiments
- safe preview rows
- raw-data policy and educational-use limits

The goal is transparency: the app should show what data it uses before it asks the user to trust a model result.

## Research Gallery

The `/experiments` page now includes a visual research gallery. The original figures remain in:

```txt
reports/figures/
```

The app-accessible copies are placed in:

```txt
public/research/figures/
```

This allows the app to show the machine learning idea visually: the dog as a point, growth as a trajectory, classification as a review boundary and clustering as future grouping.

## Current imported model results

### Regression

| Model | MAE | RMSE | R² Score |
|---|---:|---:|---:|
| Simple Linear Regression | 4.480 | 4.789 | 0.856 |
| Polynomial Regression | 2.554 | 3.309 | 0.931 |
| Multi-Dimensional Linear Regression | 1.390 | 1.821 | 0.979 |
| Ridge Regression | 1.137 | 1.405 | 0.988 |
| Lasso Regression | 1.258 | 1.679 | 0.982 |

### Classification

| Model | Accuracy | Precision | Recall | F1 | AUC |
|---|---:|---:|---:|---:|---:|
| Logistic Regression | 0.812 | 0.764 | 0.901 | 0.827 | 0.889 |
| Decision Tree | 0.823 | 0.778 | 0.904 | 0.836 | 0.889 |
| Random Forest | 0.832 | 0.787 | 0.912 | 0.845 | 0.912 |
| AdaBoost | 0.771 | 0.686 | 1.000 | 0.814 | 0.875 |
| Support Vector Machine | 0.831 | 0.788 | 0.906 | 0.843 | 0.899 |

## Machine learning direction

The app is planned around these ML ideas:

1. **Linear Regression** — simple weight prediction based on age.
2. **Polynomial Regression** — curved growth trajectory.
3. **Multi-dimensional Regression** — age, weight, height, sex and body condition score.
4. **Classification** — educational growth status signal, such as normal growth or needs review.
5. **Clustering** — future experiment for grouping similar growth profiles.
6. **Coordinate interpretation** — visualizing the dog as a point and the growth process as a curve or zone.


## App model bridge

Step 8 adds a visible bridge between the imported ML research and the live app calculator.

The bridge is implemented in:

```txt
src/lib/ml/app-model-bridge.ts
src/lib/growth-model.ts
src/components/model-bridge-panel.tsx
reports/model-exports/app-model-bridge-v0.1.json
scripts/ml/export_app_model_bridge.py
```

The bridge exposes:

- exported simple linear regression coefficients;
- Ridge Regression and Random Forest evidence metrics;
- a calibrated growth-curve bridge for the browser app;
- a clear feature contract for age, weight, height, sex, body condition score and adult reference weight;
- visible safety boundaries so the app stays educational and non-diagnostic.

To regenerate the JSON export manually:

```bash
python scripts/ml/export_app_model_bridge.py
```


## Growth Intelligence Report

Step 9 adds a human-readable explainability panel to the `/calculator` page.

The report explains:

- the dog's current coordinate position;
- distance from the educational reference curve;
- body condition score as a review signal;
- age-range and input confidence;
- how regression, classification and geometry contribute to the app result;
- practical owner review checklist;
- technical feature summary;
- safety boundary.

The report is designed for clarity: it does not claim veterinary diagnosis or clinical certainty. It translates the model output into an educational owner-facing interpretation.

Implemented in:

```txt
src/lib/ml/growth-explainability.ts
src/components/growth-intelligence-report.tsx
src/lib/growth-model.ts
```

## Clustering growth profiles

Step 10 adds an unsupervised-learning layer. The calculator now assigns the current dog point to an educational growth-profile group:

- Balanced growth arc
- Compact / later growth profile
- Power growth profile
- Condition review profile

The `/experiments` page explains these groups as clustering centroids. This is a visualization and learning layer, not a diagnostic category.

## Feature engineering layer

Step 11 adds a visible feature-engineering layer. The app now converts raw owner input into model-ready features such as maturity ratio, adult weight ratio, weight/height ratio, BCS deviation, curve delta and normalized mass index.

This is shown in `/calculator` and explained in `/data`.

## PCA-style growth map

Step 12 adds dimensionality reduction. The calculator now includes a PCA-style 2D growth space that compresses engineered features into a visual coordinate map.

This strengthens the core idea: growth can be studied geometrically as points, distances, clusters and projections.

## MLflow tracking concept

Step 13 adds an MLflow-ready tracking layer. The `/experiments` page now shows run summaries for regression, classification and clustering candidates.

The optional script can log experiment summaries when MLflow is installed:

```bash
pip install -r requirements-mlflow.txt
python scripts/ml/run_mlflow_tracking_demo.py
```

If MLflow is not installed, the script prints the tracking payload instead of failing.

## Course coverage page

Step 14 adds `/course`, a final mapping between the app and the ML course topics:

- Linear Regression, Regularization and Testing
- Classification
- Unsupervised Learning / Clustering
- Feature Engineering and Time Series
- Dimensionality Reduction
- MLflow

This page makes it easier to present the project as a course-aligned app rather than only a collection of notebooks.


## Final evidence polish

Step 15 adds the final visual-and-logical evidence layer. The app now includes:

- formula tables in the calculator;
- regression and classification evaluation tables in `/experiments`;
- feature formula table in `/data`;
- final evidence matrix in `/course`;
- clearer links between raw inputs, engineered features, model metrics, visual maps and safe owner-facing explanations.

Core formulas made visible in the UI:

```txt
growth_progress = f(age_months)
expected_weight_now = adult_reference_weight × growth_progress
curve_delta_% = ((current_weight - expected_weight_now) / expected_weight_now) × 100
estimated_adult_weight = current_weight / growth_progress
weight_height_ratio = weight_kg / height_cm
bcs_deviation = |body_condition_score - 5| / 4
```

The goal is to make the project easier to understand during review: the user can see the data, the formulas, the tables, the visual maps and the final safety boundary in the app itself.

## Important limitation

This project is an educational machine learning and visualization experiment.

It is **not** a veterinary diagnostic system. It does not replace professional veterinary advice, physical examination, laboratory tests, breeder expertise or long-term health monitoring.

The app should only be interpreted as an orientation and learning tool.

## Local development

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Run code checks:

```bash
pnpm lint
pnpm build
```

Open the app locally:

```txt
http://localhost:3000
```

## Python notebook setup

Optional Python environment for the research notebooks:

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
jupyter notebook
```

On macOS/Linux, activate the environment with:

```bash
source .venv/bin/activate
```

## Git workflow

The project is developed step by step. After every stable patch:

```bash
pnpm lint
pnpm build
git status
git add .
git commit -m "Describe the step"
git push
```

## Repository purpose

This repository is a separate experimental app.

The main goals are:

- to build a clean ML-based app prototype;
- to keep it separate from the main Cane Corso Platform;
- to use the previous notebook project as a research foundation;
- to create a future-ready concept that may later inspire a production module.


## Step 16 — USG Lab Visual Lock

The app now has a locked USG-inspired visual direction: dark graphite foundation, gold signal accents, ivory readability, premium glass-like cards and a clear lab identity. The design keeps the project connected to the USG aesthetic while preserving the educational boundary: this is an experimental ML growth lab, not a veterinary diagnostic product or official registry authority.

The visual lock adds a reusable USG Lab seal, refined global background treatment, improved navigation, stronger hero panels, a premium footer disclaimer and an About-page visual system explanation.

## Multilingual app interface

Step 17 adds a professional language switcher for the visible app interface:

```txt
EN | BG | IT
```

The switcher is available in the main navigation and stores the selected language in the browser with `localStorage`. The main product UI, navigation, page heroes, calculator labels, prediction panel headings, formula labels and evidence-table headings are localized in English, Bulgarian and Italian.

Technical notebooks, raw ML artifacts and model names remain in English where that is clearer for machine learning review. The app still keeps the safety boundary visible in every language: it is an educational ML experiment, not a veterinary diagnostic system.

Implemented in:

```txt
src/lib/i18n/
src/components/language-switcher.tsx
src/components/app-navigation.tsx
src/components/page-hero.tsx
src/components/dog-growth-calculator.tsx
```


## Step 18 — Demo dog profiles

Step 18 adds a demo mode to `/calculator`. The app now includes simulated Cane Corso sample profiles that can be loaded with one click:

- MARK I — balanced growth baseline
- THOR — power growth profile
- HERA — adult reference profile
- BRUTUS — early puppy trajectory
- LUNA — review-signal example

The demo profiles make the app easier to present and test because every ML layer reacts immediately: prediction summary, formulas, explainability report, clustering panel, feature vector, PCA map, model bridge and growth coordinate map.

The source data is stored in:

```txt
src/lib/demo-dogs.ts
data/prototype/demo-dog-profiles.json
```

All demo profiles are simulated educational examples. They are not veterinary records and are not used as clinical references.


## Step 20 — Breed Reference Geometry

The app now includes a Cane Corso reference geometry layer based on standard dimensions and proportions. It adds transparent adult height/weight context, proportion formulas and a methodology bridge for future photo geometry.

Current app surfaces:

- `/calculator` shows a live reference overlay for the current dog profile.
- `/data` shows the breed reference geometry table and formulas.
- `/experiments` explains how standard geometry becomes measurable app evidence.

The layer is reference-only. It does not prove pedigree, breed purity, official registry status or health status. Future visual comparison will first require photo readiness checks before any image-based similarity score is shown.

## Visual Breed Classifier Notebook

The visual ML roadmap now includes a notebook and training starter for a future Cane Corso visual breed classifier:

- photo readiness runs first;
- the visual classifier compares Cane Corso against similar breeds;
- the output is a visual similarity signal, not proof of pedigree or breed purity;
- training remains blocked until a licensed and labelled image dataset is collected.

Key files:

```txt
notebooks/08_visual_breed_classifier.ipynb
scripts/ml/train_visual_breed_classifier.py
reports/vision/visual-breed-classifier-plan.json
```

## Step 32 — Small Curated Demo Image Set Plan

The visual ML direction now includes a starter plan for a small curated image set. The repository stores the manifest, labels and validation logic, but does not include raw images unless licensing and permission checks allow inclusion.

The first planned demo milestone is:

- 12 licensed Cane Corso reference examples;
- 12 licensed similar molosser hard-negative examples;
- 12 unsuitable-photo examples for the photo quality gate.

Validation:

```bash
python scripts/ml/validate_demo_image_set_plan.py
```

This keeps the future visual model honest: the app can demonstrate photo readiness, breed classifier planning, visual similarity and geometry overlay while clearly stating that visual output is similarity-based and not proof of breed purity, pedigree, genetics or official registration.
