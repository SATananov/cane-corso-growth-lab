# Cane Corso Growth Lab — Final Submission Report

## 1. Project overview

Cane Corso Growth Lab is an educational machine learning project focused on the question: how can Cane Corso growth be explained with data, coordinates and visual model evidence?

The project combines:

- a Next.js web application;
- Jupyter notebooks;
- sample datasets;
- model-result summaries;
- feature-engineering explanations;
- a safe Computer Vision roadmap.

The main idea is to represent a dog profile as a point in a coordinate system. Growth can then be interpreted as a movement over time, while model outputs can be explained with curves, zones, distances and confidence boundaries.

## 2. Motivation

The project was designed as a beginner-friendly but meaningful ML application. Instead of showing only isolated notebook output, it translates ML concepts into an interactive app that a user can understand.

The goal is to demonstrate not only that a model can produce a result, but also how the result can be explained safely.

## 3. Main app modules

### Home

Introduces the project concept and the USG-inspired lab identity.

### Growth calculator

Allows the user to enter or load a demo Cane Corso profile. The page shows prediction output, formula explanations, feature vectors, clustering-style interpretation, PCA-style visualization and a growth intelligence report.

### Data page

Explains sample datasets, feature columns, data policy and why the app is transparent about its inputs.

### Experiments page

Summarizes regression, classification, clustering, dimensionality-reduction and visual ML experiments.

### Course page

Maps the project to course topics such as regression, classification, clustering, feature engineering, dimensionality reduction and MLflow-ready tracking.

### Visual Review page

Prepares a future Computer Vision workflow. It explains suitable photo types, photo-quality gates, readiness states, geometry overlay concepts and visual match result boundaries.

### About page

Explains the scope, limitations and future direction of the project.

## 4. Machine learning components

The project demonstrates the following ML ideas:

| Area | Project usage |
|---|---|
| Regression | Growth curve and estimated adult-weight orientation |
| Classification | Educational review zones and status signals |
| Feature engineering | Maturity ratio, adult-weight ratio, weight-height ratio, BCS deviation and curve delta |
| Clustering | Future grouping of similar growth profiles |
| Dimensionality reduction | PCA-style growth map as a visual projection |
| Computer Vision roadmap | Photo readiness, visual type classification, similarity and geometry overlay concepts |
| MLflow-ready tracking | Optional experiment tracking plan and summary structure |
| Tabular neural network | Step 36 MLPClassifier prototype for growth review signal classification |
| Neural-network results UI | Step 37 browser panel showing Step 36 metrics, confusion matrix, evidence files and safety boundary |

### Step 36 tabular neural network

Step 36 adds a real tabular neural network using `scikit-learn`'s `MLPClassifier`. The model trains on structured growth fields and predicts `normal_growth` vs `needs_attention`. It uses age, weight, average adult breed weight and gender, while avoiding high-leakage input fields that would make the metric unrealistically perfect.

The current Step 36 training output is documented in:

```txt
reports/neural-network-growth-prototype.md
reports/neural-network-growth-prototype-results.json
notebooks/12_tabular_neural_network_growth_prediction.ipynb
```

This neural network is a growth-review prototype only. It is not a veterinary diagnostic system, not an official Cane Corso certification system and not an image-based breed classifier.

### Step 37 neural-network results UI

Step 37 adds a dedicated `/experiments` panel that makes the Step 36 neural-network result visible in the application. The panel shows the `MLPClassifier` model type, the `normal_growth vs needs_attention` task, the dataset split, accuracy, precision, recall, F1, training iterations, final loss and confusion matrix.

The panel also links the reviewer to the evidence files and repeats the safety boundary: this is a tabular growth-review prototype, not a veterinary diagnostic system, not official Cane Corso certification and not an image-based breed classifier.



### Step 38 final defense pack

Step 38 final defense pack adds the final explanation and demo material for reviewers. It includes a defense script, demo walkthrough, screenshot checklist and a compact final summary for the project defense.

These files help explain the finished project without changing the app or training logic:

```txt
docs/submission/defense-script.md
docs/submission/demo-walkthrough.md
docs/submission/screenshot-checklist.md
reports/final-project-summary-for-defense.md
```

The defense material highlights the real Step 36 tabular neural network, the Step 37 `/experiments` UI panel and the reason why image neural networks remain future work until a properly licensed labeled image dataset exists.

## 5. Data and prototype boundaries

The project uses educational sample data and prototype-ready structures. Some parts simulate realistic workflows so the app can be demonstrated without requiring private dog records or a large production dataset.

The visual dataset area defines source-catalog, labeling and readiness structures, but it does not include a large copyrighted image dataset in the repository. This is intentional: future training images should be collected with proper licensing, permission and source tracking.

## 6. Notebooks and app relationship

The notebooks document the research path. The app translates that research into browser panels and user-facing explanations.

Important notebook themes:

- regression and growth geometry;
- data preparation;
- classification zones;
- clustering experiments;
- visual dataset readiness;
- photo readiness;
- visual breed classifier plan;
- visual similarity and geometry overlay prototypes;
- visual match result contract.

## 7. Safety and ethics

The app is intentionally conservative. It does not present model output as medical truth or official breed authority.

The project does not replace:

- veterinary advice;
- physical examination;
- laboratory tests;
- breeder expertise;
- official registry or pedigree review;
- responsible human decision-making.

Visual review is treated only as a readiness and similarity workflow. A photo cannot prove pedigree, health, breed purity or official registration status.

## 8. How to verify the project

Recommended final commands:

```bash
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

The expected final state is:

- Step 37 neural-network UI QA passes;
- Step 36 neural-network QA passes;
- documentation QA passes;
- visual review localization QA passes;
- language/layout lock QA passes;
- Python ML scripts compile;
- lint has no warnings;
- production build succeeds.

## 9. Future work

Possible future improvements:

- collect real longitudinal Cane Corso growth records with consent;
- improve regression and classification using a larger dataset;
- extend the Step 36 tabular neural network with more real longitudinal Cane Corso records;
- train a real photo-readiness model;
- train visual similarity embeddings only after dataset licensing is solved;
- add time-series tracking for repeated measurements;
- connect the lab to a future owner-facing growth module;
- keep all results explainable and safely worded.

## 10. Final conclusion

Cane Corso Growth Lab is a complete educational ML prototype with a working web interface, notebooks, sample data, model explanations, visual evidence and safety boundaries.

The strongest part of the project is the connection between machine learning concepts and a clear product experience: the user can see how raw dog-profile data becomes features, model evidence, visual coordinates, safe explanations and future research directions.


## Step 39 final submission readiness lock

Step 39 adds the final submission readiness lock. It confirms that the final project handoff is complete: GitHub is treated as the source of truth, the source archive should be created with `git archive`, the Step 36 neural-network training evidence is preserved, the Step 37 browser panel is visible, and the Step 38 defense/demo material is available.

The lock is intentionally documentation and QA only. It does not change the application behavior, UI behavior, neural-network training code or ML data pipeline.

Final readiness evidence:

- `docs/submission/final-checklist.md`;
- `docs/qa/step39-final-submission-readiness-lock.md`;
- `scripts/qa-step39-final-submission-readiness-lock.mjs`;
- `pnpm step39:final-submission-lock:qa`.

## Step 41 evidence-card usability

Step 41 adds clickable evidence cards to improve the final project review experience. The browser UI now links methodology assets, datasets, research figures and neural-network evidence files back to their GitHub source paths.

This strengthens traceability: a reviewer can move from the app surface to the notebook, dataset, figure, training script or metrics JSON that supports the claim.

This step is UI/link behavior only. It does not alter the neural-network training process, generated metrics, datasets, model outputs or safety boundaries.

## Step 42 final browser evidence

Step 42 adds the final browser evidence and screenshot pack. It documents the manual route-by-route browser pass, the screenshot naming convention, the Step 41 clickable evidence checks, and the final neural-network evidence that should be visible in `/experiments`.

This step is documentation and QA only. It does not alter training code, model metrics, datasets, routes or app behavior.

Final Step 42 evidence files:

- `docs/submission/browser-evidence-lock.md`;
- `reports/final-browser-evidence-summary.md`;
- `docs/qa/step42-browser-evidence-screenshot-pack.md`;
- `scripts/qa-step42-browser-evidence-screenshot-pack.mjs`;
- `pnpm step42:browser-evidence:qa`.

The final browser evidence confirms that the project can be presented as a complete educational ML prototype with a real tabular neural network, clickable source traceability, and safe interpretation boundaries.
