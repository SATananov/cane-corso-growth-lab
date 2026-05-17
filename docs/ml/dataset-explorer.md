# Dataset Explorer

Step 7 adds a dataset overview page to the Cane Corso Growth Geometry Lab app.

## Route

```txt
/data
```

## Goal

The app should not only show predictions and model summaries. It should also explain what data supports the ML layer.

The Dataset Explorer keeps the project transparent by showing:

- which datasets are included
- where the files live in the repository
- how many rows and columns are tracked
- which fields are important
- what each dataset is used for
- small safe preview rows
- quality and limitation signals

## Included dataset groups

### Prototype Cane Corso Growth Sample

Path:

```txt
data/prototype/cane_corso_growth_sample.csv
```

Used for:

- beginner-friendly regression
- coordinate system explanation
- first app-level growth map logic

### Processed Public Growth Sample

Path:

```txt
data/processed/dog_growth_public_sample.csv
```

Used for:

- broader feature-space thinking
- multi-dimensional regression experiments
- app-safe model summaries

### Growth Classification Sample

Path:

```txt
data/processed/dog_growth_classification_sample.csv
```

Used for:

- classification experiments
- normal-growth vs needs-attention educational signal
- model comparison and review-zone explanation

## Safety boundary

The data layer is part of an educational machine learning experiment. The app does not diagnose health issues and does not replace veterinary advice.

The classification target should be described as a review-zone signal, not a medical conclusion.
