# Step 7 — Dataset Explorer / Data Overview Page

## Purpose

Add a dedicated app page that shows what data supports the ML foundation.

## Added

```txt
src/app/data/page.tsx
src/components/dataset-explorer-summary.tsx
src/components/dataset-overview-card.tsx
src/lib/ml/dataset-overview.ts
docs/ml/dataset-explorer.md
docs/patches/step7-dataset-explorer.md
```

## Updated

```txt
src/lib/app-copy.ts
README.md
```

## Route added

```txt
/data
```

## App behavior

The new page displays:

- dataset count
- total sample rows
- total tracked columns
- raw data policy
- safe use boundary
- dataset cards
- key fields
- intended ML use
- safe preview rows

## Safety notes

This step keeps the app educational and non-diagnostic. It explains dataset limitations and keeps raw large datasets out of the repository.

## Suggested validation

```bash
pnpm lint
pnpm build
git status
```
