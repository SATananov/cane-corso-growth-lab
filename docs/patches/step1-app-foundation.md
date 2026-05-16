# Step 1 — App Foundation Patch

This patch replaces the default Next.js starter page with the first real app foundation for **Cane Corso Growth Geometry Lab**.

## Included changes

- `src/app/page.tsx` — loads the new app shell.
- `src/app/layout.tsx` — updates metadata for the new project identity.
- `src/components/app-shell.tsx` — adds the premium landing page, growth map concept, ML foundation cards and disclaimer.
- `src/lib/app-copy.ts` — centralizes project copy, cards and stat labels.

## Safe boundaries

- No backend.
- No database.
- No authentication.
- No external API.
- No GitHub configuration changes.
- No medical/veterinary diagnostic claims.

## After applying

Run:

```powershell
pnpm lint
pnpm build
git status
```

If green:

```powershell
git add .
git commit -m "Add initial Growth Geometry Lab landing page"
git push
```
