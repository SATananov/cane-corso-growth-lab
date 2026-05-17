# Step 33.4 Missing Core Libs Build Fix

This hotfix restores small shared library files required by the Step 33.4 UI and navigation layer.

## Restored files

- `src/lib/app-copy.ts`
- `src/lib/demo-dogs.ts`
- `src/lib/growth-model.ts`
- `src/lib/usg-lab-visual-system.ts`

## Reason

The Visual Review restore patch included the updated page/components, but the local build still needed the shared app copy/navigation library. This patch restores the missing core lib files without changing app behavior.

## Validation

Run after applying:

```powershell
if (Test-Path .next) { Remove-Item .next -Recurse -Force }
pnpm ml:python:syntax
pnpm step33-4:language-layout:qa
pnpm lint
pnpm build
```
