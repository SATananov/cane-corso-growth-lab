#!/usr/bin/env python3
"""Photo readiness model starter.

This script intentionally keeps the first vision-training step safe and light.
It does not train a real neural network until a curated image dataset exists.
Instead, it audits the current labels and writes a training-readiness report.

Later upgrade path:
1. Add licensed/owner-approved images under data/images/external/ or local storage.
2. Fill data/images/labels/*.csv with view_type, photo_quality, comparison_ready and issues.
3. Replace the audit-only section with a transfer-learning training loop.
"""

from __future__ import annotations

import csv
import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
LABELS_PATH = ROOT / "data" / "images" / "labels" / "sample-image-labels.csv"
REPORT_PATH = ROOT / "reports" / "vision" / "photo-readiness-model-plan.json"

REQUIRED_COLUMNS = {
    "filename",
    "breed_label",
    "view_type",
    "photo_quality",
    "comparison_ready",
    "issues",
}

READINESS_CLASSES = {"accepted", "limited", "rejected"}


def normalize_readiness(row: dict[str, str]) -> str:
    ready = (row.get("comparison_ready") or "").strip().lower()
    quality = (row.get("photo_quality") or "").strip().lower()
    issues = (row.get("issues") or "").strip()

    if ready in {"true", "yes", "1", "accepted"} and quality in {"good", "high"} and not issues:
        return "accepted"
    if ready in {"false", "no", "0", "rejected"}:
        return "rejected"
    return "limited"


def read_rows() -> list[dict[str, str]]:
    if not LABELS_PATH.exists():
        return []

    with LABELS_PATH.open("r", encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle)
        missing = REQUIRED_COLUMNS.difference(reader.fieldnames or [])
        if missing:
            raise SystemExit(f"Missing required label columns: {sorted(missing)}")
        return [dict(row) for row in reader]


def main() -> None:
    rows = read_rows()
    class_counts = Counter(normalize_readiness(row) for row in rows)
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
    print(f"Status: {status}")
    print(f"Report: {REPORT_PATH}")


if __name__ == "__main__":
    main()
