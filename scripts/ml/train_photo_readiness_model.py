#!/usr/bin/env python3
"""Photo readiness model starter.

This script intentionally keeps the first vision-training step safe and light.
It does not train a real neural network until a curated image dataset exists.
Instead, it audits the current labels and writes a training-readiness report.

Supported label schemas:
- Step 22 schema: image_id, file_path, comparison_readiness
- Early Step 27 schema: filename, comparison_ready

Later upgrade path:
1. Add licensed/owner-approved images under data/images/external/ or local storage.
2. Fill data/images/labels/*.csv with view_type, photo_quality, comparison readiness and issues.
3. Replace the audit-only section with a transfer-learning training loop.
"""

from __future__ import annotations

import csv
import json
from collections import Counter
from pathlib import Path
from typing import Iterable

ROOT = Path(__file__).resolve().parents[2]
LABELS_PATH = ROOT / "data" / "images" / "labels" / "sample-image-labels.csv"
REPORT_PATH = ROOT / "reports" / "vision" / "photo-readiness-model-plan.json"

REQUIRED_ANY_COLUMNS = {
    "image_reference": ("filename", "file_path", "image_id"),
    "readiness": ("comparison_ready", "comparison_readiness"),
}

REQUIRED_BASE_COLUMNS = {
    "breed_label",
    "view_type",
    "photo_quality",
    "issues",
}

READINESS_CLASSES = {"accepted", "limited", "rejected"}


def first_value(row: dict[str, str], keys: Iterable[str]) -> str:
    for key in keys:
        value = (row.get(key) or "").strip()
        if value:
            return value
    return ""


def normalize_readiness(row: dict[str, str]) -> str:
    ready = first_value(row, ("comparison_readiness", "comparison_ready")).lower()
    quality = (row.get("photo_quality") or "").strip().lower()
    issues = (row.get("issues") or "").strip()

    if ready in {"accepted", "true", "yes", "1"} and quality in {"good", "high"} and not issues:
        return "accepted"

    if ready in {"rejected", "false", "no", "0"}:
        return "rejected"

    if ready in {"limited"}:
        return "limited"

    return "limited"


def validate_columns(fieldnames: list[str] | None) -> None:
    columns = set(fieldnames or [])
    missing_base = REQUIRED_BASE_COLUMNS.difference(columns)
    missing_any = [
        label
        for label, aliases in REQUIRED_ANY_COLUMNS.items()
        if not any(alias in columns for alias in aliases)
    ]

    if missing_base or missing_any:
        details = {
            "missing_base_columns": sorted(missing_base),
            "missing_any_column_groups": missing_any,
            "available_columns": sorted(columns),
        }
        raise SystemExit(f"Invalid label schema for photo readiness audit: {json.dumps(details, ensure_ascii=False)}")


def normalize_row(row: dict[str, str]) -> dict[str, str]:
    normalized = dict(row)
    normalized["filename"] = first_value(row, ("filename", "file_path", "image_id"))
    normalized["comparison_ready"] = first_value(row, ("comparison_ready", "comparison_readiness"))
    normalized["comparison_readiness_class"] = normalize_readiness(row)
    return normalized


def read_rows() -> list[dict[str, str]]:
    if not LABELS_PATH.exists():
        return []

    with LABELS_PATH.open("r", encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle)
        validate_columns(reader.fieldnames)
        return [normalize_row(dict(row)) for row in reader]


def main() -> None:
    rows = read_rows()
    class_counts = Counter(row["comparison_readiness_class"] for row in rows)
    view_counts = Counter((row.get("view_type") or "unknown").strip() for row in rows)
    breed_counts = Counter((row.get("breed_label") or "unknown").strip() for row in rows)

    minimum_per_class = 50
    recommended_per_class = 200
    classes_ready = all(class_counts.get(cls, 0) >= minimum_per_class for cls in READINESS_CLASSES)
    recommended_ready = all(
        class_counts.get(cls, 0) >= recommended_per_class for cls in READINESS_CLASSES
    )

    status = "ready_for_baseline_training" if classes_ready else "not_ready_for_training"

    report = {
        "model": "photo_readiness_classifier",
        "status": status,
        "purpose": "Classify uploaded dog photos as accepted, limited, or rejected before visual Cane Corso comparison.",
        "labels_path": str(LABELS_PATH.relative_to(ROOT)),
        "rows": len(rows),
        "readiness_class_counts": dict(class_counts),
        "view_type_counts": dict(view_counts),
        "breed_label_counts": dict(breed_counts),
        "minimum_per_class": minimum_per_class,
        "recommended_per_class": recommended_per_class,
        "classes_ready": classes_ready,
        "recommended_ready": recommended_ready,
        "schema_compatibility": {
            "accepted_image_reference_columns": list(REQUIRED_ANY_COLUMNS["image_reference"]),
            "accepted_readiness_columns": list(REQUIRED_ANY_COLUMNS["readiness"]),
            "normalized_output_columns": ["filename", "comparison_ready", "comparison_readiness_class"],
        },
        "safety_policy": {
            "accepted": "Allow comparison with orientation-only disclaimer.",
            "limited": "Allow limited comparison only with visible warning.",
            "rejected": "Block visual match score and request a new photo.",
        },
        "next_steps": [
            "Collect licensed or owner-approved images.",
            "Label photo readiness, view type, quality and issues.",
            "Balance accepted, limited and rejected examples.",
            "Train a lightweight baseline classifier, then a transfer-learning image model.",
        ],
    }

    REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
    REPORT_PATH.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    print("Photo readiness model audit complete")
    print(f"Rows: {len(rows)}")
    print(f"Class counts: {dict(class_counts)}")
    print(f"Status: {status}")
    print(f"Report: {REPORT_PATH}")


if __name__ == "__main__":
    main()
