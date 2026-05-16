# Photo Readiness Model

The Photo Readiness Model is the first neural-vision training step for the visual review flow.
It does **not** decide whether a dog is a Cane Corso. Its job is safer and narrower:

> Decide whether an uploaded photo is suitable for visual comparison.

## Classes

| Class | Meaning | App behavior |
|---|---|---|
| `accepted` | The photo follows the guide closely enough. | Continue to geometry / visual comparison. |
| `limited` | The photo contains usable information but has reliability issues. | Show warning before any limited comparison. |
| `rejected` | The photo is not suitable for reliable comparison. | Block the match score and request a new photo. |

## Why this comes before breed recognition

A breed classifier can produce misleading output when the uploaded image is cropped, dark, angled, distorted or missing the full dog.
For that reason the app must run a readiness gate first.

```text
Photo upload
  ↓
Photo Readiness Model
  ↓ accepted / limited / rejected
  ↓
Breed classifier / geometry comparison only if allowed
```

## Training data needed

For a real model, the dataset should include:

- correct side-body photos;
- correct front-body photos;
- correct head-profile photos;
- bad-angle examples;
- cropped-body examples;
- sitting/moving dog examples;
- dark or blurry examples;
- images where the dog is not suitable for measurement.

The minimum target is 50 images per readiness class for a baseline experiment.
The preferred target is 200+ images per class before treating model results as meaningful.

## Current state

This step adds the notebook and audit script. It does not claim that a trained neural model already exists.
The current report remains `not_ready_for_training` until real labelled image data is added.
