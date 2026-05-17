from __future__ import annotations

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MANIFEST = ROOT / "data" / "images" / "labels" / "demo-image-manifest-template.csv"
PLAN = ROOT / "data" / "images" / "demo" / "demo-image-set-plan.json"

REQUIRED_COLUMNS = {
    "image_id",
    "relative_path",
    "source_name",
    "source_url_or_note",
    "license_status",
    "permission_status",
    "breed_label",
    "visual_group",
    "view_type",
    "photo_quality",
    "comparison_readiness",
    "issues",
    "split",
    "usable_for_demo",
    "review_notes",
}

ALLOWED_GROUPS = {
    "reference_cane_corso",
    "similar_molosser_breeds",
    "unsuitable_photos",
}

ALLOWED_READINESS = {"accepted", "limited", "rejected"}


def main() -> None:
    if not PLAN.exists():
        raise SystemExit(f"Missing demo image set plan: {PLAN}")
    if not MANIFEST.exists():
        raise SystemExit(f"Missing demo image manifest: {MANIFEST}")

    plan = json.loads(PLAN.read_text(encoding="utf-8"))
    if plan.get("raw_images_committed") is not False:
        raise SystemExit("raw_images_committed must be false for the starter plan")

    with MANIFEST.open("r", encoding="utf-8", newline="") as file:
        reader = csv.DictReader(file)
        columns = set(reader.fieldnames or [])
        missing = sorted(REQUIRED_COLUMNS - columns)
        if missing:
            raise SystemExit(f"Missing manifest columns: {missing}")
        rows = list(reader)

    if len(rows) < 4:
        raise SystemExit("Expected at least four starter manifest rows")

    for row in rows:
        group = row["visual_group"]
        readiness = row["comparison_readiness"]
        if group not in ALLOWED_GROUPS:
            raise SystemExit(f"Invalid visual_group for {row['image_id']}: {group}")
        if readiness not in ALLOWED_READINESS:
            raise SystemExit(
                f"Invalid comparison_readiness for {row['image_id']}: {readiness}"
            )
        if row["usable_for_demo"].lower() == "true" and row["license_status"] == "pending_review":
            raise SystemExit(
                f"{row['image_id']} cannot be usable_for_demo while license is pending"
            )

    print("Demo image set plan validation PASS")
    print(f"Rows: {len(rows)}")
    print(f"Plan status: {plan.get('status')}")
    print("Training ready: False")


if __name__ == "__main__":
    main()
