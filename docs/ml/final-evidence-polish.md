# Step 15 — Final Evidence Polish

This step adds the last clarity layer before checkpointing the project.

The goal is not to add a new ML algorithm. The goal is to make the current app easier to understand visually and logically:

- show formulas directly in the UI;
- show model comparison tables;
- show feature formulas;
- connect course topics to actual app surfaces;
- keep the safety boundary visible.

## Core formulas

```txt
growth_progress = f(age_months)
expected_weight_now = adult_reference_weight × growth_progress
curve_delta_% = ((current_weight - expected_weight_now) / expected_weight_now) × 100
estimated_adult_weight = current_weight / growth_progress
weight_height_ratio = weight_kg / height_cm
bcs_deviation = |body_condition_score - 5| / 4
```

## Where it appears

| App surface | Evidence added |
|---|---|
| `/calculator` | live formula panel and transparent result calculation |
| `/experiments` | regression and classification evaluation tables |
| `/data` | feature formula table and raw-to-feature explanation |
| `/course` | final evidence matrix for project review |

## Safety boundary

The output remains an educational growth review signal. It is not a veterinary diagnosis, clinical score, prescription, health guarantee or official breed evaluation.
