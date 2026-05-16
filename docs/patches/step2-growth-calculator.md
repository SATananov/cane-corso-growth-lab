# Step 2 — Growth Calculator + Prediction Panel

This patch turns the landing page into an interactive app prototype.

## Added

- `src/lib/growth-model.ts`
  - deterministic educational growth prediction logic
  - reference growth curve generation
  - growth status labels and recommendation messages

- `src/components/dog-growth-calculator.tsx`
  - client-side interactive Cane Corso profile form
  - live calculation based on user inputs

- `src/components/prediction-summary.tsx`
  - prediction status, current expected weight, difference, adult estimate and confidence

- `src/components/growth-coordinate-map.tsx`
  - SVG coordinate map: age as X-axis, weight as Y-axis, dog as a point, expected growth as a curve

## Updated

- `src/components/app-shell.tsx`
  - updated hero actions
  - integrated the calculator into the page
  - upgraded version label to `v0.2 Interactive Lab`

## Boundaries

- No database.
- No authentication.
- No external API.
- No veterinary diagnosis claims.
- The result is an educational ML-style orientation signal only.

## Recommended checks

```powershell
pnpm lint
pnpm build
git status
```
