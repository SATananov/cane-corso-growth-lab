# Step 33.2 — Language Hydration Hotfix

## Scope

This patch fixes the runtime hydration mismatch caused by reading the stored browser language during the first client render.

## Problem

The server renders the default English text, while the client can immediately read `localStorage` and render Bulgarian or Italian before hydration completes. React then reports that the server-rendered text does not match the client-rendered text.

## Fix

- Replaces the previous lazy `useState` language initialization with `useSyncExternalStore`.
- Uses English as the stable server snapshot during hydration.
- Reads `localStorage` only through the external store snapshot after hydration.
- Dispatches a local language-change event so the same browser tab updates immediately when the user switches language.
- Keeps `document.documentElement.lang` synchronized as an external side effect.

## Expected checks

```bash
pnpm lint
pnpm build
```

Then run the app and open `/visual-review`. Switching EN/BG/IT should not trigger a React hydration mismatch.
