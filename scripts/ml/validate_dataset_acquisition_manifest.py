from __future__ import annotations

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MANIFEST = ROOT / "data" / "images" / "labels" / "dataset-acquisition-starter-manifest.csv"
CHECKLIST = ROOT / "data" / "images" / "labels" / "dataset-acquisition-checklist.json"
SOURCE_CATALOG = ROOT / "data" / "images" / "source-catalog.json"

REQUIRED_COLUMNS = {
    "image_id",
    "source_id",
    "source_url",
    "license_status",
    "permission_status",
    "breed_label",
    "view_type",
    "photo_quality",
    "comparison_readiness",
    "quality_issues",
    "split",
    "local_path",
    "notes",
}

ALLOWED_LICENSE = {"pending_review", "approved", "blocked"}
ALLOWED_PERMISSION = {"not_requested", "granted", "denied", "not_required"}
ALLOWED_QUALITY = {"good", "limited", "low"}
ALLOWED_READINESS = {"accepted", "limited", "rejected"}
ALLOWED_SPLITS = {"candidate", "train", "validation", "test"}
ALLOWED_VIEW_TYPES = {"side_body", "front_body", "head_profile", "head_front", "unsuitable", "unknown"}


def fail(message: str) -> None:
    raise SystemExit(f"FAIL {message}")


def read_source_ids() -> set[str]:
    if not SOURCE_CATALOG.exists():
        fail(f"Missing source catalog: {SOURCE_CATALOG}")
    data = json.loads(SOURCE_CATALOG.read_text(encoding="utf-8"))
    return {source["id"] for source in data.get("candidateSources", []) if "id" in source}


def main() -> None:
    if not MANIFEST.exists():
        fail(f"Missing manifest: {MANIFEST}")
    if not CHECKLIST.exists():
        fail(f"Missing checklist: {CHECKLIST}")

    source_ids = read_source_ids()
    with MANIFEST.open("r", encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle)
        if reader.fieldnames is None:
            fail("Manifest has no header")
        missing = REQUIRED_COLUMNS.difference(reader.fieldnames)
        if missing:
            fail(f"Manifest missing columns: {sorted(missing)}")
        rows = list(reader)

    if not rows:
        fail("Manifest must contain starter rows")

    seen = set()
    class_counts: dict[str, int] = {}
    readiness_counts: dict[str, int] = {}

    for row in rows:
        image_id = row["image_id"].strip()
        if not image_id:
            fail("image_id cannot be empty")
        if image_id in seen:
            fail(f"duplicate image_id: {image_id}")
        seen.add(image_id)

        source_id = row["source_id"].strip()
        if source_id not in source_ids:
            fail(f"unknown source_id for {image_id}: {source_id}")

        license_status = row["license_status"].strip()
        permission_status = row["permission_status"].strip()
        view_type = row["view_type"].strip()
        quality = row["photo_quality"].strip()
        readiness = row["comparison_readiness"].strip()
        split = row["split"].strip()
        breed = row["breed_label"].strip()

        if license_status not in ALLOWED_LICENSE:
            fail(f"invalid license_status for {image_id}: {license_status}")
        if permission_status not in ALLOWED_PERMISSION:
            fail(f"invalid permission_status for {image_id}: {permission_status}")
        if view_type not in ALLOWED_VIEW_TYPES:
            fail(f"invalid view_type for {image_id}: {view_type}")
        if quality not in ALLOWED_QUALITY:
            fail(f"invalid photo_quality for {image_id}: {quality}")
        if readiness not in ALLOWED_READINESS:
            fail(f"invalid comparison_readiness for {image_id}: {readiness}")
        if split not in ALLOWED_SPLITS:
            fail(f"invalid split for {image_id}: {split}")
        if not breed:
            fail(f"breed_label cannot be empty for {image_id}")

        if split in {"train", "validation", "test"} and license_status != "approved" and permission_status not in {"granted", "not_required"}:
            fail(f"{image_id} cannot be placed in {split} without approved license or permission")
        if readiness == "rejected" and quality == "good":
            fail(f"{image_id} is rejected but marked good quality")
        if breed == "not_suitable_photo" and readiness != "rejected":
            fail(f"{image_id} is not_suitable_photo but not rejected")

        class_counts[breed] = class_counts.get(breed, 0) + 1
        readiness_counts[readiness] = readiness_counts.get(readiness, 0) + 1

    checklist = json.loads(CHECKLIST.read_text(encoding="utf-8"))
    if checklist.get("trainingReady") is not False:
        fail("Starter checklist should keep trainingReady=false until real image dataset exists")

    print("PASS dataset acquisition manifest validation")
    print(f"rows: {len(rows)}")
    print(f"classes: {class_counts}")
    print(f"readiness: {readiness_counts}")
    print("training_ready: False")


if __name__ == "__main__":
    main()
