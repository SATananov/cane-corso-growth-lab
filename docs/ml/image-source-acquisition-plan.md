# Image Source Acquisition Plan

This document defines how the visual Cane Corso model will collect and prepare image sources before neural training begins.

## Goal

The future Computer Vision module needs to learn three different tasks:

1. **Photo readiness** — whether an uploaded image is suitable for comparison.
2. **Breed/type classification** — Cane Corso visual type vs similar breeds and non-Cane-Corso dogs.
3. **Visual similarity** — comparison between the accepted user photo and a Cane Corso reference set/geometry.

The model should never claim breed purity, pedigree or official registration from an image. The target result is a visual similarity signal.

## Candidate sources

The project tracks candidate sources in:

```txt
data/images/source-catalog.json
```

Current candidates include:

- Tsinghua Dogs Dataset — strong research candidate because the paper describes 130 breeds, 70,428 images and whole-body/head annotations.
- Stanford Dogs Dataset — useful baseline with 120 breeds, 20,580 images and bounding boxes described by TensorFlow Datasets.
- Kaggle Dog Breeds Image Dataset — candidate for fast prototype only after license review.
- Owned or consented images — best long-term source for project-specific Cane Corso examples.

## Repository policy

Raw images should normally stay outside Git. Commit source catalogs, label schema, label manifests, curation scripts and small permitted demo placeholders only if license/permission allows.

Do not commit bulk downloaded images, copyrighted images, unclear-license images or user photos without explicit permission.

## Target classes

```txt
cane_corso
presa_canario
boerboel
rottweiler
american_bully
mixed_large_dog
not_suitable_photo
```

The similar-breed classes are important because distinguishing Cane Corso from visually adjacent molosser breeds is harder and more useful than distinguishing it from unrelated objects.

## Acquisition workflow

1. Review source license/access terms.
2. Select candidate images.
3. Remove duplicates, AI-generated images, watermarks and unusable examples.
4. Label breed class, view type, photo quality, readiness and issues.
5. Split train/validation/test without leaking the same dog across splits where possible.
6. Train photo readiness first, then breed/type classification, then visual similarity.

## Why this step matters

Without a controlled source plan, the model can learn from bad labels, wrong photos or unauthorized images. This step keeps the visual ML direction professional, reproducible and safe for a real app/project hybrid.
