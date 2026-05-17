# Cane Corso Growth Lab — Defense Script

## Goal

Use this script as a calm presentation path for defending the project as a machine learning course submission. It is written so the project can be explained clearly without overstating what the models can do.

## 1. Opening statement

> Cane Corso Growth Lab is an educational machine learning prototype that explains Cane Corso growth with structured data, coordinates, model evidence and safe user-facing interpretation.

The project combines a Next.js application, Jupyter notebooks, sample datasets, model summaries and documentation. The main product idea is that a dog profile can be represented as a point in a coordinate system, and growth can be interpreted as a trajectory over time.

## 2. What problem the project explores

The project explores how a dog owner or reviewer could understand growth signals without treating a model as medical truth. It does not replace a veterinarian, official registry review or responsible human judgement.

The app demonstrates:

- regression-style growth estimation;
- classification-style review zones;
- feature engineering from dog-profile fields;
- clustering and PCA-style visual explanation;
- a real Step 36 tabular neural network for growth-review classification;
- a Step 37 browser panel that makes the neural-network result visible;
- a safe future Computer Vision roadmap.

## 3. Demo route order

Use this order during the presentation:

1. `/` — explain the project idea and product concept.
2. `/calculator` — load a demo dog profile and show how the prediction, formulas, feature vector and growth-map style evidence react.
3. `/data` — show that the project exposes sample data, features and limitations instead of hiding them.
4. `/experiments` — show ML experiments and the Step 37 neural-network results panel.
5. `/visual-review` — explain the future image workflow and why image neural networks require a licensed labeled dataset.
6. `/course` — connect the project to course topics.
7. `/about` — finish with limitations and future work.

## 4. How to explain the neural network

Suggested wording:

> Step 36 adds a real tabular neural-network prototype. It uses scikit-learn MLPClassifier and predicts whether a structured growth record is `normal_growth` or `needs_attention`. The model uses age, weight, average adult breed weight and gender. It avoids high-leakage fields such as the already-derived BCS prediction so the result stays honest.

Current result:

```txt
Model: MLPClassifier
Task: normal_growth vs needs_attention
Train/test split: 8000 / 2000
Accuracy: 0.807
Precision needs_attention: 0.7924
Recall needs_attention: 0.8320
F1 needs_attention: 0.8117
Confusion matrix: [[782, 218], [168, 832]]
```

## 5. How to explain why this is not an image classifier yet

Suggested wording:

> The project contains a Computer Vision roadmap, photo-readiness logic and visual-similarity contracts, but it does not claim to have a production image classifier. This is not image classifier evidence. A real image neural network would require a licensed, labeled and balanced image dataset. Until that dataset exists, the responsible approach is to document the workflow and keep visual output as future work.

This distinction is important because a photo cannot prove pedigree, breed purity, genetic origin, health or official registration.

## 6. Possible reviewer questions

### Where is the trained neural network?

The training script is:

```txt
scripts/ml/train_growth_neural_network.py
```

The notebook is:

```txt
notebooks/12_tabular_neural_network_growth_prediction.ipynb
```

The result files are:

```txt
reports/neural-network-growth-prototype.md
reports/neural-network-growth-prototype-results.json
```

The browser panel is in:

```txt
src/components/neural-network-results-panel.tsx
src/lib/ml/neural-network-growth-results.ts
```

### Why use a tabular neural network instead of a photo classifier?

Because the current repository has structured growth data, but it does not include a large licensed labeled image dataset. The project therefore trains a real neural network where the data is available and treats image AI as future work.

### Is 0.807 accuracy good?

It is a useful prototype result for a simulated/educational dataset. It should not be treated as medical or production quality. The result is evidence that the pipeline works and that the model can learn a non-trivial growth-review signal.

### What is the safest interpretation of `needs_attention`?

It means review signal in the educational dataset. It does not diagnose a dog and does not replace veterinary assessment.

## 7. Final closing statement

> The strongest part of this project is the connection between machine learning and explainable product experience. It does not only train or describe models; it also shows how model results can be presented safely to a user with clear boundaries and transparent evidence.
