# Step 4 — GitHub README & Project Identity

## Purpose

This patch gives the new repository a clear public identity and documents the scope of the project.

## Files added or updated

```txt
README.md
docs/project/project-scope.md
docs/project/ml-foundation-plan.md
docs/project/data-policy.md
docs/patches/step4-github-readme-identity.md
```

## Boundaries

This patch is documentation-only.

It does not change:

- Next.js app runtime code;
- calculator logic;
- visual components;
- package configuration;
- GitHub remote settings;
- deployment settings.

## Verification

Recommended commands after applying:

```powershell
pnpm lint
pnpm build
git status
```
