# Cane Corso Growth Geometry Lab

**Cane Corso Growth Geometry Lab** is an experimental web app for exploring Cane Corso growth patterns through coordinates, curves and machine learning concepts.

The project is built as a separate research-and-application lab. It is not part of the main USG / Cane Corso Platform codebase, but it can later become a foundation for a future growth intelligence module.

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
- Research Gallery with ML visual evidence inside `/experiments`
- scope and limitations page
- educational safety disclaimer

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
/experiments  ML experiment overview and imported research foundation
/about        Scope, limitations and project direction
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
