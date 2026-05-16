"""Audit whether the visual ML dataset is ready for neural training.

This script is intentionally lightweight: it does not train a model and it does
not require TensorFlow, PyTorch or image files. It checks the class map and label
schema, counts available label rows and produces a readiness report.
"""

from __future__ import annotations

import csv
import json
from collections import Counter
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
LABELS_PATH = ROOT / "data" / "images" / "labels" / "sample-image-labels.csv"
CLASS_MAP_PATH = ROOT / "data" / "images" / "labels" / "breed-classifier-class-map.json"
REPORT_PATH = ROOT / "reports" / "vision" / "vision-dataset-readiness-report.json"

REQUIRED_LABEL_COLUMNS = {
    "image_id",
    "file_path",
    "split",
    "breed_label",
    "view_type",
    "photo_quality",
    "comparison_readiness",
    "issues",
    "source_type",
    "notes",
}

VALID_SPLITS = {"train", "validation", "test"}
VALID_READINESS = {"accepted", "limited", "rejected"}


def load_json(path: Path) -> dict[str, Any]:
    if not path.exists():
        raise FileNotFoundError(f"Missing file: {path}")
    return json.loads(path.read_text(encoding="utf-8"))


def load_labels(path: Path) -> list[dict[str, str]]:
    if not path.exists():
        raise FileNotFoundError(f"Missing file: {path}")

    with path.open("r", encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle)
        fieldnames = set(reader.fieldnames or [])
        missing = REQUIRED_LABEL_COLUMNS - fieldnames
        if missing:
            raise ValueError(f"Missing label columns: {sorted(missing)}")
        return list(reader)


def main() -> None:
    class_map = load_json(CLASS_MAP_PATH)
    labels = load_labels(LABELS_PATH)
    classes = class_map.get("classes", [])
    class_ids = {item["id"] for item in classes}

    errors: list[str] = []
    warnings: list[str] = []

    for row in labels:
        if row["split"] not in VALID_SPLITS:
            errors.append(f"Invalid split for {row['image_id']}: {row['split']}")
        if row["comparison_readiness"] not in VALID_READINESS:
            errors.append(
                f"Invalid comparison_readiness for {row['image_id']}: {row['comparison_readiness']}"
            )
        if row["breed_label"] not in class_ids:
            errors.append(
                f"Unknown breed_label for {row['image_id']}: {row['breed_label']}"
            )

        image_path = ROOT / "data" / "images" / row["file_path"]
        if not image_path.exists():
            warnings.append(
                f"Image file not present yet for {row['image_id']}: {row['file_path']}"
            )

    class_counts = Counter(row["breed_label"] for row in labels)
    split_counts = Counter(row["split"] for row in labels)
    readiness_counts = Counter(row["comparison_readiness"] for row in labels)

    minimum_goal = sum(int(item.get("minimum_images", 0)) for item in classes)
    recommended_goal = sum(int(item.get("recommended_images", 0)) for item in classes)
    current_label_rows = len(labels)

    report = {
        "version": "0.1",
        "status": "collection_needed" if current_label_rows < minimum_goal else "review_required",
        "training_allowed_now": False,
        "reason": (
            "Folder structure and sample labels are present, but a real curated image dataset "
            "is not available yet. Training should start only after licensed images, balanced "
            "classes and validation/test splits are prepared."
        ),
        "current_label_rows": current_label_rows,
        "minimum_goal": minimum_goal,
        "recommended_goal": recommended_goal,
        "class_counts": dict(class_counts),
        "split_counts": dict(split_counts),
        "readiness_counts": dict(readiness_counts),
        "warnings": warnings,
        "errors": errors,
    }

    REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
    REPORT_PATH.write_text(json.dumps(report, indent=2), encoding="utf-8")

    print("Vision dataset readiness audit")
    print(f"Labels: {current_label_rows}")
    print(f"Minimum goal: {minimum_goal}")
    print(f"Recommended goal: {recommended_goal}")
    print(f"Warnings: {len(warnings)}")
    print(f"Errors: {len(errors)}")
    print(f"Report: {REPORT_PATH}")

    if errors:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
