# Step 3 — Navigation + App Pages

This patch turns the one-page prototype into a small app structure.

## Added

- `src/components/app-navigation.tsx`
  - sticky top navigation
  - active route styling
  - links to Home, Calculator, Experiments and About

- `src/components/page-shell.tsx`
  - shared page wrapper with navigation and footer disclaimer

- `src/components/page-hero.tsx`
  - reusable page hero component

- `src/components/ml-experiment-grid.tsx`
  - reusable ML experiment cards

- `src/app/calculator/page.tsx`
  - dedicated growth calculator route

- `src/app/experiments/page.tsx`
  - ML experiment overview route

- `src/app/about/page.tsx`
  - scope, limits and technology direction route

## Updated

- `src/components/app-shell.tsx`
  - now uses the shared page shell
  - links hero CTAs to real routes
  - uses shared experiment grid

- `src/lib/app-copy.ts`
  - adds central navigation data

## Boundaries

- No database.
- No authentication.
- No deployment config changes.
- No external API calls.
- No veterinary diagnosis claims.

## Recommended checks

```powershell
pnpm lint
pnpm build
git status
```
