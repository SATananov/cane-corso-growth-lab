# Step 33.4 — Language & Layout Lock for Cards

This patch is a presentation and copy-consistency pass after the visual review and calculator screenshots showed two issues:

1. Some cards still mixed EN/BG/IT copy inside localized pages.
2. Several cards became too narrow and text-heavy, especially demo profile cards in the growth check sidebar.

## Changes

- Reworked the demo dog selector into a compact dropdown + selected-profile summary.
- Localized visible ML experiment card descriptions for EN/BG/IT.
- Localized key calculator panels: prediction summary, explainability report, feature vector, cluster panel, PCA panel, model bridge, coordinate map.
- Tightened BG/IT dictionary wording for model evaluation, formulas and evidence tables.
- Added CSS readability safeguards for long text, narrow cards and table cells.

## Scope

Presentation and language consistency only. No model formulas, coefficients, dataset contracts, notebooks or visual ML logic were changed.
