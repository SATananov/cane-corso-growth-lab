"""Visual breed classifier training starter.

This script intentionally does not train a neural network yet. It audits the
current image label files and writes a training-readiness report. Real training
should start only after licensed/permitted images are collected and labelled.
"""

from __future__ import annotations

import csv
import json
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
LABELS_PATH = ROOT / "data" / "images" / "labels" / "sample-image-labels.csv"
CLASS_MAP_PATH = ROOT / "data" / "images" / "labels" / "breed-classifier-class-map.json"
REPORT_PATH = ROOT / "reports" / "vision" / "visual-breed-classifier-plan.json"


def read_labels() -> list[dict[str, str]]:
    if not LABELS_PATH.exists():
        raise FileNotFoundError(f"Missing labels file: {LABELS_PATH}")

    with LABELS_PATH.open(newline="", encoding="utf-8") as handle:
        return list(csv.DictReader(handle))


def read_class_map() -> dict:
    if not CLASS_MAP_PATH.exists():
        raise FileNotFoundError(f"Missing class map: {CLASS_MAP_PATH}")

    return json.loads(CLASS_MAP_PATH.read_text(encoding="utf-8"))


def main() -> None:
    rows = read_labels()
    class_map = read_class_map()
    allowed_classes = {item["id"] for item in class_map["classes"]}

    class_counts = Counter(row["breed_label"] for row in rows)
    split_counts = Counter(row["split"] for row in rows)
    readiness_counts = Counter(row["comparison_readiness"] for row in rows)
    view_counts = Counter(row["view_type"] for row in rows)

    unknown_classes = sorted(set(class_counts) - allowed_classes)
    missing_target_classes = sorted(allowed_classes - set(class_counts))

    image_file_status = []
    for row in rows:
        file_path = ROOT / "data" / "images" / row["file_path"]
        image_file_status.append(
            {
                "image_id": row["image_id"],
                "file_path": row["file_path"],
                "exists": file_path.exists(),
            }
        )

    missing_images = [item for item in image_file_status if not item["exists"]]

    minimum_goal = sum(item.get("minimum_images", 0) for item in class_map["classes"])
    recommended_goal = sum(item.get("recommended_images", 0) for item in class_map["classes"])

    report = {
        "status": "dataset_required_before_training",
        "model_name": "visual_breed_classifier_v0_1_plan",
        "purpose": "Train a future visual classifier for Cane Corso vs similar breeds after photo readiness gating.",
        "labels_file": str(LABELS_PATH.relative_to(ROOT)),
        "class_map": str(CLASS_MAP_PATH.relative_to(ROOT)),
        "rows": len(rows),
        "class_counts": dict(class_counts),
        "split_counts": dict(split_counts),
        "readiness_counts": dict(readiness_counts),
        "view_counts": dict(view_counts),
        "unknown_classes": unknown_classes,
        "missing_target_classes_in_sample": missing_target_classes,
        "image_files_found": len(rows) - len(missing_images),
        "image_files_missing": len(missing_images),
        "minimum_labelled_images_goal": minimum_goal,
        "recommended_labelled_images_goal": recommended_goal,
        "training_ready": False,
        "blocking_reason": "The repository currently contains label templates and placeholder paths, not a real licensed image dataset.",
        "safe_user_facing_language": "Visual Cane Corso Match, not breed purity or pedigree proof.",
        "next_steps": [
            "Collect licensed or owner-permitted images outside Git.",
            "Label breed class, view type, photo quality and comparison readiness.",
            "Balance Cane Corso positives with similar-breed hard negatives.",
            "Train a transfer-learning baseline only after the dataset audit passes.",
        ],
    }

    REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
    REPORT_PATH.write_text(json.dumps(report, indent=2), encoding="utf-8")

    print("Visual breed classifier plan audit PASS")
    print(f"Rows: {len(rows)}")
    print(f"Class counts: {dict(class_counts)}")
    print(f"Training ready: {report['training_ready']}")
    print(f"Report: {REPORT_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
