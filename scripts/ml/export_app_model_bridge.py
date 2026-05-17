"""Export the app model bridge evidence as a JSON artifact.

This script intentionally uses only the Python standard library so it can run
without a full notebook environment. It mirrors the coefficients and metrics
used by src/lib/ml/app-model-bridge.ts.
"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUTPUT_PATH = ROOT / "reports" / "model-exports" / "app-model-bridge-v0.1.json"

EXPORT = {
    "version": "app-model-bridge-v0.1",
    "exportedAt": "2026-05-16",
    "project": "Cane Corso Growth Geometry Lab",
    "sourceNotebook": "notebooks/01_growth_regression_geometry.ipynb",
    "regressionEvidence": {
        "bestModel": "Ridge Regression",
        "r2Score": 0.987582,
        "rmse": 1.404523,
        "mae": 1.136788,
    },
    "classificationEvidence": {
        "bestModel": "Random Forest",
        "f1Score": 0.844757,
        "auc": 0.911906,
        "accuracy": 0.8324,
    },
    "simpleLinearCoefficients": {
        "intercept": 6.308015768725344,
        "age_months": 3.5599211563731954,
        "equation": "weight_kg = 6.3080 + 3.5599 * age_months",
    },
    "multiDimensionalCoefficients": [
        {"feature": "age_months", "coefficient": 1.078118},
        {"feature": "height_cm", "coefficient": 0.806786},
        {"feature": "sex_male", "coefficient": 1.565315},
        {"feature": "activity_level_low", "coefficient": -1.555904},
        {"feature": "activity_level_medium", "coefficient": -0.916491},
    ],
    "liveAppBridge": {
        "type": "calibrated_growth_curve_anchor_bridge",
        "features": [
            "ageMonths",
            "weightKg",
            "heightCm",
            "sex",
            "bodyConditionScore",
            "adultReferenceWeightKg",
        ],
        "safetyBoundary": "Educational model bridge only. Not veterinary diagnosis.",
    },
}


def main() -> None:
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(EXPORT, indent=2) + "\n", encoding="utf-8")
    print(f"Exported app model bridge to {OUTPUT_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
