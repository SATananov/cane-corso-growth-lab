# Step 33.4 Visual Review Provider Prerender Fix

This hotfix closes the `/visual-review` prerender failure reported during `pnpm build`.

## Problem

The production build compiled successfully, but prerendering `/visual-review` failed because a client component using `useLanguage()` rendered without a visible `LanguageProvider` boundary during the page prerender pass.

## Fix

- Wrap `/visual-review` content in `LanguageProvider` directly as a local safety boundary.
- Keep the page on localized `PageHero` copy via `copyKey="visualReview"`.
- Keep Visual Review imports explicit and relative so the page does not depend on alias resolution for the newly restored panels.

## Scope

No model logic, dataset logic, notebooks, scripts, or design system behavior is changed. This is a prerender/runtime guard for the Visual Review route only.
