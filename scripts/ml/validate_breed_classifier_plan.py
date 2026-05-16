"""Validate the visual breed-classifier planning artifacts.

This script is intentionally lightweight: it checks class-map structure and
planned dataset thresholds without requiring ML dependencies.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CLASS_MAP = ROOT / "data" / "images" / "labels" / "breed-classifier-class-map.json"
PLAN = ROOT / "reports" / "vision" / "breed-classifier-training-plan.json"

REQUIRED_CLASS_IDS = {
    "cane_corso",
    "presa_canario",
    "boerboel",
    "rottweiler",
    "american_bully",
    "mixed_large_dog",
    "not_suitable_photo",
}

REQUIRED_STAGES = {
    "photo_readiness",
    "photo_type",
    "breed_classifier",
    "visual_similarity",
    "geometry_fusion",
}


def load_json(path: Path) -> dict:
    if not path.exists():
        raise FileNotFoundError(f"Missing file: {path}")
    return json.loads(path.read_text(encoding="utf-8"))


def main() -> None:
    class_map = load_json(CLASS_MAP)
    plan = load_json(PLAN)

    class_ids = {item["id"] for item in class_map.get("classes", [])}
    missing_classes = REQUIRED_CLASS_IDS - class_ids
    if missing_classes:
        raise AssertionError(f"Missing class ids: {sorted(missing_classes)}")

    for item in class_map["classes"]:
        if item["minimum_images"] <= 0:
            raise AssertionError(f"Invalid minimum_images for {item['id']}")
        if item["recommended_images"] < item["minimum_images"]:
            raise AssertionError(f"Recommended images below minimum for {item['id']}")

    stages = {item["stage"] for item in plan.get("pipeline", [])}
    missing_stages = REQUIRED_STAGES - stages
    if missing_stages:
        raise AssertionError(f"Missing pipeline stages: {sorted(missing_stages)}")

    unsafe = plan.get("unsafe_output_label", "").lower()
    if "purity" not in unsafe:
        raise AssertionError("Unsafe output label boundary is not explicit enough.")

    print("Breed classifier training plan validation: PASS")
    print(f"Classes: {len(class_map['classes'])}")
    print(f"Pipeline stages: {len(plan['pipeline'])}")


if __name__ == "__main__":
    main()
