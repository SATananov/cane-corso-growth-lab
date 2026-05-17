# Growth Intelligence Report

Step 9 adds the explainability layer for the app calculator.

The goal is to make the model output understandable for a normal user while keeping the project clearly educational and non-diagnostic.

## What the report explains

The report turns the calculator output into a structured interpretation:

- current coordinate position: age and weight;
- distance from the educational reference curve;
- body condition score as a review signal;
- age-range and input confidence;
- model layers behind the app result;
- owner review checklist;
- technical summary of the feature values;
- safety boundary.

## Files

```txt
src/lib/ml/growth-explainability.ts
src/components/growth-intelligence-report.tsx
src/lib/growth-model.ts
src/components/dog-growth-calculator.tsx
```

## Safety boundary

The report must not present veterinary diagnosis, treatment advice or medical certainty. It is an educational machine learning interpretation of a single user-entered point.

The recommended wording is:

> educational signal
> owner review
> watch the trend
> consult a qualified veterinarian if the concern persists

Avoid wording such as:

> diagnosis
> disease detection
> guaranteed normal
> medically safe
