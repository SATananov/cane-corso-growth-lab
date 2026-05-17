# Step 17 — BG / EN / IT Language Switcher

This step adds a professional multilingual layer to the Cane Corso Growth Geometry Lab app.

## Scope

The app now supports:

- English (`EN`)
- Bulgarian (`BG`)
- Italian (`IT`)

The visible product interface is localized through a central dictionary system.

## Implementation

Core files:

```txt
src/lib/i18n/languages.ts
src/lib/i18n/dictionaries.ts
src/lib/i18n/language-context.tsx
src/lib/i18n/index.ts
src/components/language-switcher.tsx
```

Updated UI files:

```txt
src/app/layout.tsx
src/lib/app-copy.ts
src/components/app-navigation.tsx
src/components/page-shell.tsx
src/components/page-hero.tsx
src/components/app-shell.tsx
src/components/dog-growth-calculator.tsx
src/components/prediction-summary.tsx
src/components/growth-formula-panel.tsx
src/components/model-evaluation-tables.tsx
src/components/feature-formula-table.tsx
src/components/final-evidence-matrix.tsx
src/components/about-lab-content.tsx
```

## Behavior

The active language is stored in browser `localStorage` under:

```txt
ccgl-language
```

The language provider also updates the document language attribute after hydration.

## Product boundary

The translation layer does not change:

- ML formulas;
- exported coefficients;
- notebooks;
- datasets;
- metrics;
- prediction logic;
- clustering logic;
- PCA logic;
- MLflow tracking payloads.

The goal is product clarity, not model alteration.

## Translation policy

Machine learning terms such as Regression, Classification, Clustering, PCA and MLflow may remain in English when that is clearer for a course reviewer. Supporting explanations are localized.

The safety message remains explicit in every language: this app is educational and is not a veterinary diagnostic system.
