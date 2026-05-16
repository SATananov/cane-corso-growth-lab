# Photo Quality Gate & Warning System

Step 23 adds the practical warning layer before any future visual Cane Corso match score is allowed.

The app must not compare every uploaded image. A bad angle, cropped body or sitting pose can make the geometry misleading. The photo gate therefore answers one question first:

> Is this photo suitable for comparison with the Cane Corso reference geometry?

## Decision levels

| Level | Score | Action |
|---|---:|---|
| Accepted | 80–100 | Allow future geometry comparison and visual match explanation. |
| Limited | 55–79 | Allow only lower-confidence comparison with a visible warning. |
| Rejected | 0–54 | Block the visual match score and ask for a new photo. |

## Issues checked

The gate checks for the problems that a future neural model should learn to detect:

- full dog is not visible;
- wrong view angle;
- dog is not standing naturally;
- camera too high or too low;
- poor light or blur;
- important body part hidden;
- strong perspective distortion.

## Why this matters

A visual model trained without a photo-readiness gate can give confident but wrong results. Step 23 keeps the system honest by making comparison readiness explicit before the overlay, landmark extraction or visual similarity score.

## Current version

The current app uses a checklist-based gate. This is intentional: it defines the logic, labels and user warnings before a real computer vision classifier is trained.

The future ML path is:

```txt
labeled images
  ↓
photo-readiness classifier
  ↓
accepted / limited / rejected
  ↓
landmark geometry or visual similarity only when allowed
```

## User-facing principle

If the image is rejected, the app should say:

> This photo does not meet the comparison criteria. Upload a new photo before asking for a Cane Corso visual match.

In Bulgarian:

> Снимката не отговаря на критериите за сравнение. Качи нова снимка преди да искаш визуално сходство с Cane Corso тип.
