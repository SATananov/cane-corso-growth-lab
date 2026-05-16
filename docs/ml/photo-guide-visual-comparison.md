# Photo Guide & Visual Comparison Workspace

Step 21 introduces the first visual-review workspace for the Cane Corso Growth Geometry Lab.

The goal is not to produce a final breed score yet. The goal is to prepare the correct workflow:

1. Guide the user to upload the right photo type.
2. Check whether the image is suitable for comparison.
3. Reject or warn on unsuitable images before any visual score is shown.
4. Compare extracted user-photo geometry with Cane Corso reference geometry in later steps.
5. Keep the result as visual similarity, not proof of pedigree, purity, registration or health.

## Required photo types

The future visual model needs different image types for different comparison tasks:

| Photo type | Main use |
|---|---|
| Side body | Body length / height, chest depth, stance, full silhouette |
| Front body | Front balance, chest impression, symmetry |
| Head profile | Muzzle/skull relation, stop impression, head profile |
| Head front | Head width impression, muzzle width impression, expression |

## Readiness levels

| Level | Meaning | App action |
|---|---|---|
| Accepted | Photo follows the criteria closely enough | Allow future overlay and visual comparison |
| Limited | Photo may support partial review | Show strong reliability warning |
| Rejected | Photo is not suitable | Block visual match and request a new image |

## Why this matters

A visual match model should not compare bad images with the Cane Corso reference. A sitting dog, cropped body, bad angle or poor light can produce misleading geometry. The photo gate protects the user from false confidence and keeps the future ML pipeline honest.

## Future ML direction

This workspace prepares these later layers:

- photo quality classifier;
- photo type classifier;
- landmark / geometry extraction;
- visual Cane Corso similarity model;
- overlay comparison between reference geometry and user-photo geometry.
