# Cane Corso Growth Lab — Screenshot Checklist

Use this checklist when preparing screenshots for final submission or presentation slides.

## Required screenshots

### 1. Home page

Capture:

- project title and positioning;
- short product explanation;
- visible navigation.

Recommended filename:

```txt
01-home-project-concept.png
```

### 2. Growth calculator

Capture:

- demo profile loaded;
- prediction summary;
- formula or feature explanation panel.

Recommended filename:

```txt
02-calculator-growth-evidence.png
```

### 3. Data page

Capture:

- dataset overview;
- feature/data transparency panel;
- sample-data explanation.

Recommended filename:

```txt
03-data-feature-transparency.png
```

### 4. Experiments page — model overview

Capture:

- ML experiment cards;
- regression/classification/clustering evidence.

Recommended filename:

```txt
04-experiments-ml-evidence.png
```

### 5. Experiments page — neural-network panel

Capture the Step 37 neural-network results panel with:

- MLPClassifier;
- task `normal_growth vs needs_attention`;
- accuracy 0.807;
- F1 needs_attention 0.8117;
- confusion matrix or evidence-file section.

Recommended filename:

```txt
05-neural-network-results-panel.png
```

### 6. Visual Review page

Capture:

- photo guide;
- photo-quality/readiness gate;
- visual-similarity safety boundary.

Recommended filename:

```txt
06-visual-review-photo-readiness.png
```

### 7. Course page

Capture:

- course-topic mapping;
- final evidence matrix if visible.

Recommended filename:

```txt
07-course-topic-coverage.png
```

### 8. About page

Capture:

- project scope;
- limitations;
- future-work explanation.

Recommended filename:

```txt
08-about-scope-limitations.png
```

## Optional evidence screenshots

### GitHub repository

Capture:

- repository main page;
- latest Step 37 commit;
- README visible.

### Terminal verification

Capture terminal output showing:

```bash
pnpm step38:defense-pack:qa
pnpm step37:neural-results-ui:qa
pnpm step36:neural-growth:qa
python scripts/ml/train_growth_neural_network.py
pnpm lint
pnpm build
```

### Neural-network report

Capture:

```txt
reports/neural-network-growth-prototype.md
reports/neural-network-growth-prototype-results.json
```

## Screenshot safety note

Do not present screenshots as medical proof, breed-purity proof, pedigree proof or official certification evidence. The screenshots demonstrate an educational ML prototype and safe result presentation.

## Step 42 final browser evidence pass

Step 42 adds a stricter browser evidence layer on top of this screenshot checklist. Use:

```txt
docs/submission/browser-evidence-lock.md
```

Additional required screenshots for Step 42:

### 9. Clickable evidence card

Capture an opened or clearly highlighted evidence card on `/experiments` or `/data` showing that notebook, dataset, figure or neural-network evidence cards are real GitHub source links.

Recommended filename:

```txt
09-clickable-evidence-source-link.png
```

### 10. Final terminal verification

Capture terminal output showing the final QA chain:

```bash
pnpm step42:browser-evidence:qa
pnpm step41:clickable-evidence:qa
pnpm step40-3:calculator-browser-polish:qa
pnpm step39:final-submission-lock:qa
python scripts/ml/train_growth_neural_network.py
pnpm lint
pnpm build
```

Recommended filename:

```txt
10-terminal-final-verification.png
```

