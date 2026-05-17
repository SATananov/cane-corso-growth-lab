"""Validate the Visual Similarity / Embedding Prototype plan.

This script intentionally does not train a real neural model yet. It verifies that
Step 29 has a machine-readable plan and demonstrates the safe scoring formula
with deterministic placeholder values.
"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PLAN_PATH = ROOT / "reports" / "vision" / "visual-similarity-embedding-plan.json"

REQUIRED_KEYS = {
    "step",
    "name",
    "status",
    "purpose",
    "required_before_real_training",
    "pipeline",
    "prototype_formula",
    "signals",
    "safety_boundary",
}


def load_plan() -> dict:
    if not PLAN_PATH.exists():
        raise FileNotFoundError(f"Missing plan file: {PLAN_PATH}")

    with PLAN_PATH.open("r", encoding="utf-8") as handle:
        plan = json.load(handle)

    missing = REQUIRED_KEYS.difference(plan)
    if missing:
        raise ValueError(f"Plan file is missing required keys: {sorted(missing)}")

    return plan


def gated_visual_match(
    *,
    readiness: str,
    classifier: float,
    embedding_similarity: float,
    geometry: float,
    confidence_adjustment: float,
) -> float | None:
    """Demonstrate the future app-safe visual match formula.

    Returns None when the uploaded image should not be compared.
    """

    if readiness == "rejected":
        return None

    raw_score = (
        0.35 * classifier
        + 0.30 * embedding_similarity
        + 0.25 * geometry
        + 0.10 * confidence_adjustment
    )

    if readiness == "limited":
        raw_score *= 0.85

    return round(max(0.0, min(1.0, raw_score)) * 100, 2)


def main() -> None:
    plan = load_plan()

    demo_score = gated_visual_match(
        readiness="accepted",
        classifier=0.78,
        embedding_similarity=0.74,
        geometry=0.81,
        confidence_adjustment=0.88,
    )

    blocked_score = gated_visual_match(
        readiness="rejected",
        classifier=0.95,
        embedding_similarity=0.91,
        geometry=0.85,
        confidence_adjustment=0.20,
    )

    if demo_score is None:
        raise AssertionError("Accepted demo photo should produce a prototype score")
    if blocked_score is not None:
        raise AssertionError("Rejected demo photo must block visual scoring")

    print("Visual Similarity / Embedding Prototype audit PASS")
    print(f"Plan: {plan['name']}")
    print(f"Demo accepted score: {demo_score}%")
    print("Rejected image behavior: score blocked")
    print(plan["safety_boundary"])


if __name__ == "__main__":
    main()
