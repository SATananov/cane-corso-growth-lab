# Visual Image Dataset Structure

This folder prepares the future Computer Vision training set for the Cane Corso Growth Geometry Lab.

The goal is not to prove pedigree or breed purity from an image. The goal is to train models for:

1. photo readiness — whether the uploaded photo is suitable for visual comparison;
2. photo type detection — side body, front body, head profile, head front or unsuitable;
3. breed/type classification — Cane Corso visual type vs similar comparison classes;
4. future visual similarity — comparison with a curated Cane Corso reference set.

Only owner-provided, licensed or clearly permitted images should be used. Do not commit copyrighted images from the internet unless the license allows it.

## Folder structure

```txt
data/images/
├── train/
│   ├── cane_corso/
│   ├── presa_canario/
│   ├── boerboel/
│   ├── rottweiler/
│   ├── american_bully/
│   ├── mixed_large_dog/
│   └── not_suitable_photo/
├── validation/
├── test/
└── labels/
    ├── image-label-schema.json
    ├── sample-image-labels.csv
    └── annotation-template.jsonl
```

The `not_suitable_photo` class is intentionally included because the model must learn when to reject a photo before comparison.
