# Step 43.1 — Owner Journey Clarity Pass

This is a small user-facing clarity pass after browser review showed that the first-time owner panel existed but did not feel obvious enough.

## Goal

Make the owner journey read like a simple first-use path, not a methodology block.

The panel must clearly answer:

1. Where do I start?
2. What data do I enter?
3. What result do I read?
4. What do I do next?
5. Where are the evidence pages if I want to inspect the ML work?

## Boundaries

This step must not change:

- neural-network training logic;
- datasets;
- metrics;
- routes;
- calculator formulas;
- image AI prototype scope;
- safety boundaries.

The app remains educational orientation only. It does not diagnose health, certify a Cane Corso, prove pedigree or replace veterinary advice.

## Verification

Run:

```bash
pnpm step43-1:owner-journey-clarity:qa
pnpm step43:owner-journey:qa
pnpm step42-1:hydration-stable:qa
pnpm lint
pnpm build
```

Manual browser review:

- `/` shows a direct owner title such as `Имаш Cane Corso? Започни оттук.`
- `/calculator` shows the compact owner guidance above the calculator.
- The first visible action sends the user to the growth calculator.
- Evidence pages are clearly secondary, not the first thing a normal owner must read.
