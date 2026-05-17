# Step 33.4 — Visual Review Import Resolution Hotfix

This patch fixes a Windows/Next build resolution issue where `src/app/visual-review/page.tsx` could still report missing `@/components/*` modules after the Visual Review restore patch had already placed the component files on disk.

Changes:
- Adds `baseUrl: "."` to `tsconfig.json` so the existing `@/* -> ./src/*` path alias is explicit for Next/TypeScript tooling.
- Updates only `src/app/visual-review/page.tsx` to use relative imports for the Visual Review page components.
- Keeps the Step 33.4 localized `PageHero copyKey="visualReview"` behavior.

Run after applying:

```powershell
if (Test-Path .next) { Remove-Item .next -Recurse -Force }
pnpm step33-4:language-layout:qa
pnpm ml:python:syntax
pnpm lint
pnpm build
```
