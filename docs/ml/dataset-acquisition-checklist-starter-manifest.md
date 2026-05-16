# Dataset Acquisition Checklist & Starter Manifest

This document defines the first controlled acquisition layer for the future visual / neural model.

The project should not train a breed classifier from random internet images. Every image candidate must pass through a manifest with source, license, label and readiness metadata.

## Goal

Prepare the dataset flow for:

1. Photo Readiness Model
2. Photo Type Classifier
3. Visual Breed Classifier
4. Visual Similarity / Embedding Prototype
5. Geometry + Vision Fusion

## Starter files

```txt
data/images/labels/dataset-acquisition-starter-manifest.csv
data/images/labels/dataset-acquisition-checklist.json
scripts/ml/validate_dataset_acquisition_manifest.py
src/lib/ml/dataset-acquisition-checklist.ts
src/components/dataset-acquisition-checklist-panel.tsx
```

## Why the manifest matters

A future neural model can only learn responsibly if the data is controlled.

Each image needs:

- source id;
- source URL or private source note;
- license / permission status;
- breed label;
- view type;
- photo quality;
- comparison readiness;
- split assignment;
- reviewer notes.

## Training policy

Images stay in the `candidate` split until they are reviewed. Rows must not move into `train`, `validation` or `test` until license or permission is approved.

Raw image files should normally stay outside Git. Git stores manifests, labels, docs and scripts.

## Validation

Run:

```bash
python scripts/ml/validate_dataset_acquisition_manifest.py
```

Expected starter state:

```txt
PASS dataset acquisition manifest validation
training_ready: False
```

`training_ready: False` is the correct status at this stage because the project has not yet collected a real licensed image dataset.

## Safety wording

The future output must remain a visual similarity result:

```txt
Visual Cane Corso Match
```

It must not claim breed purity, pedigree, genetic origin or official registration from a photo.
