# Visual Breed Classifier

This document defines the future neural vision classifier for the visual side of the Cane Corso Growth Geometry Lab.

## Purpose

The model should learn whether an accepted or limited dog photo is visually closest to Cane Corso or to one of the comparison classes.

It must not claim:

- breed purity;
- pedigree;
- official registration;
- health status;
- veterinary diagnosis.

The safe result is:

```txt
Visual Cane Corso Match: X%
```

not:

```txt
This dog is X% real Cane Corso.
```

## Pipeline position

```txt
Photo upload
  ↓
Photo readiness gate
  ↓
Photo type detection
  ↓
Visual breed classifier
  ↓
Reference similarity model
  ↓
Breed reference geometry comparison
  ↓
Visual Cane Corso Match explanation
```

## Classes

The model needs a target class and hard negative classes:

- `cane_corso`
- `presa_canario`
- `boerboel`
- `rottweiler`
- `american_bully`
- `mixed_large_dog`
- `not_suitable_photo`

The similar breeds are important because a model that only sees Cane Corso versus unrelated images will not learn the difficult visual distinctions.

## Training approach

The recommended approach is transfer learning:

1. Use a pretrained image backbone such as MobileNet, EfficientNet or ResNet.
2. Train a classifier head on the curated image classes.
3. Evaluate class probabilities, F1, precision, recall and confusion matrix.
4. Review hard negatives manually.
5. Export only app-safe evidence.

## Current status

The project now contains the notebook and audit script structure, but it does not contain raw licensed training images yet. Training should not be presented as completed until the image dataset is collected, labelled and audited.
