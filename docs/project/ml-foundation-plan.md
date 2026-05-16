# ML Foundation Plan

## Current status

The machine learning foundation is now imported into the repository.

The app has two layers:

1. **Research layer** — Python notebooks, CSV samples, figures and model metrics.
2. **Product layer** — Next.js UI, calculator, prediction panel and `/experiments` summary page.

## Notebook structure

```txt
notebooks/
├── 01_growth_regression_geometry.ipynb
├── 02_real_data_preparation.ipynb
├── 03_growth_classification_zones.ipynb
└── 04_growth_clustering_experiment.ipynb
```

## Regression

Regression answers questions such as:

- What weight is expected for a given age?
- How does a linear model compare with a polynomial model?
- Can additional features improve the estimate?
- How do model errors look on a coordinate chart?

Current best imported regression result:

```txt
Ridge Regression
R² Score: 0.987582
MAE: 1.136788
RMSE: 1.404523
```

## Classification

Classification answers questions such as:

- Can a profile be marked as normal growth or needs attention?
- Which model gives a better educational signal?
- How should the result be explained safely?

Current best imported classification result by F1/AUC balance:

```txt
Random Forest
Accuracy: 0.8324
Recall: 0.9120
F1-score: 0.844757
AUC: 0.911906
```

## Clustering

Clustering remains the next planned research step.

It can later answer questions such as:

- Are there natural groups of similar growth profiles?
- Can the data form growth zones?
- Can the groups be visualized in 2D space?

## Metrics

The project uses:

- R² score;
- MAE;
- RMSE;
- accuracy;
- precision;
- recall;
- F1-score;
- AUC;
- confusion matrix.

## Interpretation principle

Every model result should be explained in plain language. The output should help a user understand the pattern, not make a veterinary decision.
