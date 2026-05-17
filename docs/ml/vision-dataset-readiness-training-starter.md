# Vision Dataset Readiness & Training Starter

This step turns the visual model plan into a concrete readiness check. It does not train a neural network yet. It verifies that the project has the correct structure before training starts.

## Why this is needed

A neural vision model must not be trained from random images without labels. For this project, every image should have at least:

- breed label
- split: train, validation or test
- view type: side body, front body, head profile, head front or unsuitable
- photo quality
- comparison readiness: accepted, limited or rejected
- source/permission notes

The first model learns whether the photo is suitable. Only after that can later models compare the dog with Cane Corso reference geometry.

## Readiness stages

1. Source and license review
2. Image collection
3. Labeling and photo gate annotation
4. Photo readiness model training
5. Breed visual classifier training

## Training rule

The project can describe the neural training pipeline now, but it should not claim a trained visual model until a real curated dataset exists.

The user-facing result must remain:

> Visual Cane Corso Match

not:

> Breed purity proof

## Local audit command

```powershell
python scripts/ml/audit_vision_dataset_readiness.py
```

The script writes:

```txt
reports/vision/vision-dataset-readiness-report.json
```
