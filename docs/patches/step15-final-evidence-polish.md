# Step 15 — Evaluation Tables & Final Evidence Polish

## Scope

Adds final visual and logical clarity to the project:

- formula evidence layer;
- live calculator formula table;
- model evaluation tables;
- feature formula table;
- final evidence matrix;
- README and documentation updates.

## Files added

```txt
src/lib/ml/final-evidence.ts
src/components/growth-formula-panel.tsx
src/components/model-evaluation-tables.tsx
src/components/feature-formula-table.tsx
src/components/final-evidence-matrix.tsx
docs/ml/final-evidence-polish.md
docs/patches/step15-final-evidence-polish.md
```

## Files updated

```txt
src/lib/ml/index.ts
src/components/dog-growth-calculator.tsx
src/app/experiments/page.tsx
src/app/data/page.tsx
src/app/course/page.tsx
README.md
```

## QA

Run after applying:

```bash
pnpm lint
pnpm build
```

Expected: both pass.
