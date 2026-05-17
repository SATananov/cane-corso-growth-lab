from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PLAN_PATH = ROOT / "reports" / "vision" / "visual-match-result-contract.json"


def clamp01(value: float) -> float:
    return min(1.0, max(0.0, value))


def compute_score(row: dict, weights: dict):
    readiness = row["readiness"]
    if readiness == "rejected":
        return None

    score = (
        clamp01(float(row["classifier_signal"])) * float(weights["classifier_signal"])
        + clamp01(float(row["embedding_similarity"])) * float(weights["embedding_similarity"])
        + clamp01(float(row["geometry_closeness"])) * float(weights["geometry_closeness"])
        + clamp01(float(row["confidence_adjustment"])) * float(weights["confidence_adjustment"])
    )

    if readiness == "limited":
        score *= 0.88

    return round(score * 100, 1)


def main() -> None:
    if not PLAN_PATH.exists():
        raise SystemExit(f"Missing visual match contract plan: {PLAN_PATH}")

    plan = json.loads(PLAN_PATH.read_text(encoding="utf-8"))
    weights = plan.get("weights", {})
    scenarios = plan.get("demo_scenarios", [])

    if not scenarios:
        raise SystemExit("No demo scenarios found in visual match result contract.")

    required_weight_keys = {
        "classifier_signal",
        "embedding_similarity",
        "geometry_closeness",
        "confidence_adjustment",
    }
    missing_weights = sorted(required_weight_keys.difference(weights))
    if missing_weights:
        raise SystemExit(f"Missing weight keys: {missing_weights}")

    total_weight = sum(float(weights[key]) for key in required_weight_keys)
    if abs(total_weight - 1.0) > 0.0001:
        raise SystemExit(f"Weights must sum to 1.0. Actual: {total_weight}")

    for row in scenarios:
        score = compute_score(row, weights)
        expected = row.get("expected_score_percent")
        if expected is None:
            if score is not None:
                raise SystemExit(f"Rejected scenario should block score: {row['id']}")
            print(f"PASS {row['id']}: score blocked")
            continue

        if abs(float(expected) - float(score)) > 0.2:
            raise SystemExit(
                f"Unexpected score for {row['id']}: expected={expected}, actual={score}"
            )
        print(f"PASS {row['id']}: score={score}%")

    print("Visual match result contract audit PASS")
    print(plan["safety_boundary"])


if __name__ == "__main__":
    main()
