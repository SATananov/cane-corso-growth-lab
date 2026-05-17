# Image Dataset Structure & Labeling Plan

This document defines the first real data structure for the future Computer Vision layer of the Cane Corso Growth Geometry Lab.

The goal is not to claim that a photo proves whether a dog is a purebred Cane Corso. The goal is to train models for visual orientation:

1. Is the photo suitable for comparison?
2. What type of photo is it?
3. Does the image visually match the Cane Corso reference type more strongly than selected comparison classes?
4. Can future geometry extraction compare visible proportions with the reference geometry?

## Training classes

The dataset intentionally includes similar molosser or strong working breeds. This is important because a model trained only on easy negatives will not learn the difficult visual boundary around Cane Corso type.

Planned labels:

```txt
cane_corso
presa_canario
boerboel
rottweiler
american_bully
mixed_large_dog
not_suitable_photo
```

The `not_suitable_photo` label is required. It teaches the photo gate to reject images that should not be compared.

## View types

```txt
side_body
front_body
head_profile
head_front
unsuitable
```

A head-only photo can support a head review, but it cannot support full body proportion comparison. A side-body photo is required for body geometry.

## Readiness labels

```txt
accepted  — the photo is suitable for comparison
limited   — comparison is possible, but confidence should be reduced
rejected  — comparison should be blocked and the user should upload a new photo
```

## Quality issue codes

Examples:

```txt
dog_not_fully_visible
camera_too_high
camera_too_low
bad_side_angle
dog_sitting_or_lying
dog_in_motion
low_light
blurred_image
body_part_hidden
wrong_subject
multiple_dogs
heavy_perspective_distortion
```

These issue codes are useful for both model training and user-friendly warnings.

## Data split

The planned split is:

```txt
train       70%
validation 15%
test        15%
```

The split should happen before model training to prevent data leakage. Images from the same dog/session should stay in the same split when possible.

## Files added

```txt
data/images/README.md
data/images/labels/image-label-schema.json
data/images/labels/sample-image-labels.csv
data/images/labels/annotation-template.jsonl
scripts/ml/validate_image_labels.py
src/lib/ml/image-dataset-labeling.ts
src/components/image-dataset-structure-panel.tsx
```

## Future model pipeline

```txt
Photo upload
   ↓
Photo readiness classifier
   ↓
Photo type classifier
   ↓
Breed/type classifier
   ↓
Visual embedding / similarity model
   ↓
Landmark geometry extraction
   ↓
Cane Corso reference comparison
```

The app result should remain a visual similarity signal, not proof of pedigree, breed purity, official registration or health status.
