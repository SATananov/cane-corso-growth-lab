# Notebooks

This folder is the research foundation for the Cane Corso Growth Lab web app.

The notebooks explain the machine learning thinking behind the product prototype. The live React app uses simplified TypeScript bridges in `src/lib/ml` to present the same ideas in a browser-friendly form.

## Notebook sequence

```txt
01_growth_regression_geometry.ipynb
02_real_data_preparation.ipynb
03_growth_classification_zones.ipynb
04_growth_clustering_experiment.ipynb
05_breed_classifier_training_plan.ipynb
06_vision_dataset_readiness_training_starter.ipynb
07_photo_readiness_model.ipynb
08_visual_breed_classifier.ipynb
09_visual_similarity_embedding_prototype.ipynb
10_geometry_overlay_comparison_prototype.ipynb
11_visual_match_result_contract.ipynb
12_tabular_neural_network_growth_prediction.ipynb
```

## How to review them

For final submission, the most important notebooks are:

1. `01_growth_regression_geometry.ipynb` — introduces the core coordinate/regression idea.
2. `02_real_data_preparation.ipynb` — explains the data-preparation direction.
3. `03_growth_classification_zones.ipynb` — demonstrates classification-style review zones.
4. `04_growth_clustering_experiment.ipynb` — demonstrates unsupervised grouping as a future research direction.
5. `07_photo_readiness_model.ipynb` to `11_visual_match_result_contract.ipynb` — document the safe Computer Vision roadmap, where image-based results are treated only as readiness/similarity signals.
6. `12_tabular_neural_network_growth_prediction.ipynb` — documents the real Step 36 tabular neural-network prototype for growth review classification.

The web app is the main presentation surface. The notebooks remain the research evidence and should be read together with:

```txt
reports/final-submission-report.md
reports/final-course-coverage.md
docs/submission/final-submission-guide.md
```

## Safety boundary

The notebooks are educational. They do not produce veterinary diagnosis, medical conclusions, pedigree proof, official registry decisions or certified breed validation. The Step 36 neural network is a tabular growth-review prototype; image neural networks remain future work until a licensed labeled image dataset exists.
