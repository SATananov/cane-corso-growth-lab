# Visual Similarity / Embedding Prototype

This layer prepares the future image-comparison part of Cane Corso Growth Geometry Lab.

The purpose is to compare a valid uploaded photo with a curated Cane Corso reference image set through visual embeddings and reference geometry.

## Safe wording

The app must not say that a dog is a certain percentage “real Cane Corso”.

The safe user-facing output is:

> Visual Cane Corso Match

or:

> Visual similarity with the Cane Corso type

This result does not prove pedigree, breed purity, genetic origin or official registration.

## Pipeline

```text
Uploaded photo
  ↓
Photo readiness gate
  ↓
Photo type detection
  ↓
Visual breed classifier
  ↓
Image embedding similarity
  ↓
Breed reference geometry comparison
  ↓
Visual Cane Corso Match report
```

## Prototype formula

```text
match = gate(readiness) × (
  0.35 × classifier_signal
  + 0.30 × embedding_similarity
  + 0.25 × geometry_closeness
  + 0.10 × confidence_adjustment
)
```

If photo readiness is `rejected`, the visual match score is blocked.

## Why embeddings

A breed classifier gives class probabilities. Embeddings allow a second question:

> How close is this photo to the permitted Cane Corso reference set in visual feature space?

This is useful because two images can both be classified as Cane Corso-like, but one may be much closer to the reference set than the other.

## Required before real training

- Licensed or owner-permitted reference images.
- View type labels.
- Photo readiness labels.
- Breed class labels.
- Train / validation / test split.
- Metrics and error review.

## App boundary

The app should present this as an orientation signal, not as an official breed judgment.
