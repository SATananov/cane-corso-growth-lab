# Step 34 — Visual Review Final Browser/Polish Pass

Status: prepared as a calm final polish pass after Step 33.4 Language & Layout Lock.

## Goal

Step 34 removes the most visible remaining mixed-language risk from the Visual Review workflow and keeps the layout readable in the dense photo/geometry cards.

## Scope

Changed only presentation/i18n/readability surfaces:

- `src/components/photo-guide-panel.tsx`
- `src/components/visual-review-workspace.tsx`
- `src/components/photo-quality-gate-panel.tsx`
- `src/components/geometry-overlay-comparison-panel.tsx`
- `scripts/qa-step34-visual-review-polish.mjs`
- `package.json`

## What changed

- Localized the Visual Review photo guide cards for BG/EN/IT.
- Localized the “must show / avoid” lists and comparison criteria cards.
- Localized readiness table row labels, meanings and actions.
- Localized photo quality gate model signals, result titles/summaries and decision bands.
- Localized geometry overlay permission status, SVG labels, workflow steps, ratio labels/deltas, signal badges and stage cards.
- Added `usg-readable-card` to the dense visual review cards to protect against cramped/narrow layout.

## Boundaries

No ML model logic, scoring logic, dataset files, notebook files, growth calculator logic, routes, build settings, or data-processing scripts were changed.

## QA

Run:

```bash
pnpm step34:visual-review-polish:qa
pnpm step33-4:language-layout:qa
pnpm ml:python:syntax
pnpm lint
pnpm build
```

Recommended browser review:

- `/visual-review` in BG, EN and IT.
- Upload a sample image and switch readiness between accepted / limited / rejected.
- Confirm photo guide, quality gate, readiness table, overlay card, ratio table and stage cards follow the selected language.
