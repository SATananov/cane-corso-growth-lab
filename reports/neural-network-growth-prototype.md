# Step 36 — Tabular Neural Network Growth Prediction Prototype

## Purpose

Step 36 adds a real, trainable neural-network prototype to the Cane Corso Growth Lab project.

The model is intentionally tabular, not image-based. It works with structured growth fields and predicts a conservative review signal:

```txt
normal_growth vs needs_attention
```

This keeps the project honest: the repository can now demonstrate a real neural-network training pipeline without pretending that a photo model can certify Cane Corso type, pedigree, health or breed purity.

## Model

The prototype uses `scikit-learn`'s `MLPClassifier`, a feed-forward multi-layer perceptron neural network.

```txt
Input features:
- visit_age_months
- weight_kg
- average_adult_breed_weight_kg
- gender

Target:
- growth_status_binary
  - 0 = normal_growth
  - 1 = needs_attention
```

The script deliberately avoids using `bcs_predicted` as an input feature because it can be too close to the review target and would risk making the metric look unrealistically perfect.

## Training command

```bash
python scripts/ml/train_growth_neural_network.py
```

The script writes reproducible metrics to:

```txt
reports/neural-network-growth-prototype-results.json
```

## Current metrics

The current generated metrics from the Step 36 run are:

```txt
Accuracy: 0.8070
Precision needs_attention: 0.7924
Recall needs_attention: 0.8320
F1 needs_attention: 0.8117
Confusion matrix labels: normal_growth, needs_attention
Confusion matrix: [[782, 218], [168, 832]]
```

These metrics are useful for an educational prototype. They should not be interpreted as medical reliability or real-world production performance.

## Why this is the right neural-network step

An image neural network would require a large, licensed, carefully labeled Cane Corso photo dataset. That dataset does not exist inside this repository yet, so training an image classifier now would be misleading.

A tabular growth neural network is a better Step 36 because it can be trained from the current processed sample data and can be evaluated with clear metrics.

## Safety boundary

This model is:

- an educational ML prototype;
- a growth review signal;
- a demonstration of neural-network training and evaluation.

It is not:

- not a veterinary diagnostic system;
- a health decision engine;
- a breed-purity proof;
- an official Cane Corso registry decision;
- a replacement for owner, breeder or veterinarian review.

## Future work

A future Step can add an image neural-network pipeline only after the project has a licensed image dataset with:

- source permissions;
- class labels;
- train/validation/test split;
- similar-breed comparison classes;
- low-quality/unsuitable photo examples;
- safe wording for visual similarity results.
