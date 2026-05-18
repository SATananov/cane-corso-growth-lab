# Step 43 — First-Time User Journey & Owner Mode QA

## Purpose

Step 43 adds a visible owner-friendly journey panel for first-time users. The project already has strong ML evidence, but a non-technical owner needs a calmer path:

1. enter a Cane Corso profile;
2. read the growth orientation signal;
3. understand the recommended next step;
4. inspect evidence only when needed.

## Scope

This is a UX/copy layer only.

It may update:

- `src/components/owner-journey-panel.tsx`
- `src/components/app-shell.tsx`
- `src/app/calculator/page.tsx`
- final README/submission/report documentation
- QA script/package script

It must not change:

- neural-network training logic;
- datasets;
- generated metrics;
- calculator formulas;
- growth model implementation;
- app routes;
- official safety boundaries.

## Manual browser review

Open:

- `/`
- `/calculator`

Verify:

- an owner-mode panel is visible;
- the panel explains what a first-time user should do;
- the primary action leads to `/calculator#growth-calculator`;
- visual-review and evidence CTAs are present;
- BG/EN/IT copy is available;
- the wording does not claim diagnosis, certification, breed proof or pedigree proof.

## Required local commands

```bash
pnpm step43:owner-journey:qa
pnpm step42-1:hydration-stable:qa
pnpm step42:browser-evidence:qa
pnpm step41:clickable-evidence:qa
pnpm step40-3:calculator-browser-polish:qa
pnpm step39:final-submission-lock:qa
pnpm step37:neural-results-ui:qa
pnpm step36:neural-growth:qa
pnpm ml:python:syntax
python scripts/ml/train_growth_neural_network.py
pnpm lint
pnpm build
```
