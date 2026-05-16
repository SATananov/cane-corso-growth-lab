# Visual Match Result Contract

This document defines the future output contract for the visual Cane Corso similarity module.

The app must not show a visual match score directly after a photo upload. The score is allowed only after the photo passes the quality gate.

## Contract flow

```text
Uploaded photo
  ↓
Photo readiness gate
  ↓
Accepted / Limited / Rejected
  ↓
Breed classifier signal
  ↓
Visual embedding similarity
  ↓
Reference geometry comparison
  ↓
Visual Cane Corso Match result
```

## Formula

```text
match = gate(readiness) × (
  0.35 × classifier_signal
  + 0.30 × embedding_similarity
  + 0.25 × geometry_closeness
  + 0.10 × confidence_adjustment
)
```

## Gate behavior

- `accepted` — score can be shown with the normal visual-similarity caveat.
- `limited` — score can be shown with a reliability warning and confidence penalty.
- `rejected` — score must be blocked; the user must upload a better photo.

## User-facing result language

Use:

```text
Visual Cane Corso Match
Visual similarity with Cane Corso type
```

Do not use:

```text
Breed purity score
This dog is X% real Cane Corso
Guaranteed Cane Corso result
```

## Safety boundary

The result is a visual similarity signal only. It does not prove breed purity, pedigree, genetic origin, health or official registration.

## Current status

This step adds the result contract, demo scenarios and audit script. It does not claim that a trained vision model exists yet. The real model still requires a licensed, labeled image dataset.
