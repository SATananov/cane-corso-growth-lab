# ML Foundation Plan

## Goal

The machine learning foundation should explain the project clearly and visually. The goal is not to build the most complex model, but to show a strong understanding of supervised learning, model testing and coordinate-based interpretation.

## Planned notebook structure

```txt
notebooks/
├── 01_growth_regression_geometry.ipynb
├── 02_real_data_preparation.ipynb
├── 03_growth_classification_zones.ipynb
└── 04_growth_clustering_experiment.ipynb
```

## Regression

Regression should answer questions such as:

- What weight is expected for a given age?
- How does a linear model compare with a polynomial model?
- Can additional features improve the estimate?
- How do model errors look on a coordinate chart?

## Classification

Classification should answer questions such as:

- Can a profile be marked as normal growth or needs attention?
- Which model gives a better educational signal?
- How should the result be explained safely?

## Clustering

Clustering can later answer questions such as:

- Are there natural groups of similar growth profiles?
- Can the data form growth zones?
- Can the groups be visualized in 2D space?

## Metrics

The project can use:

- R² score;
- MAE;
- RMSE;
- accuracy;
- precision;
- recall;
- F1 score;
- confusion matrix.

## Interpretation principle

Every model result should be explained in plain language. The output should help a user understand the pattern, not make a veterinary decision.
