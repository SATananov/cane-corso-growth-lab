# Breed Classifier Training Notebook Plan

This document defines the first professional plan for training the visual ML side of the Cane Corso Growth Geometry Lab.

The goal is not to prove whether a dog is a “real Cane Corso” from an image. The goal is to learn visual evidence in a safe pipeline:

1. Check whether the photo is usable.
2. Detect the type of photo.
3. Classify visual breed similarity against Cane Corso and similar/non-target dog classes.
4. Compare the image with a curated Cane Corso reference set.
5. Combine image and geometry evidence into an explainable **Visual Cane Corso Match** signal.

## Pipeline

| Stage | Purpose | Output |
|---|---|---|
| Photo Readiness Model | Decide whether the uploaded image is usable for visual comparison. | `accepted`, `limited`, `rejected` |
| Photo Type Classifier | Detect side body, front body, head profile, head front or unsuitable images. | view type |
| Breed Visual Classifier | Learn Cane Corso vs similar and negative dog classes. | class probabilities |
| Reference Similarity Model | Compare the image to a curated Cane Corso visual reference set. | similarity score |
| Geometry + Vision Fusion | Combine photo quality, breed probability, similarity and geometry ratios. | visual match + explanation |

## Initial classes

| Class | Role |
|---|---|
| `cane_corso` | Target visual class |
| `presa_canario` | Similar molosser comparison class |
| `boerboel` | Similar molosser comparison class |
| `rottweiler` | Strong negative working-breed class |
| `american_bully` | Similar muscular/body-mass confusion class |
| `mixed_large_dog` | General negative class |
| `not_suitable_photo` | Quality-gate class |

## Model strategy

The first realistic training approach should use transfer learning rather than training a neural network from scratch.

Candidate backbones:

- MobileNetV3
- EfficientNet-B0
- ResNet50

The notebook should compare metrics before any result is promoted to the app UI.

## Safe result wording

Use:

> Visual Cane Corso Match

Do not use:

> Breed purity percentage

A photo can support visual similarity, but it cannot prove pedigree, official registration, genetic origin or breed purity.
