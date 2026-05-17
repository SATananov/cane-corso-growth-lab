"""Validate visual image label CSV files for the Cane Corso Growth Geometry Lab.

This script checks the planned Computer Vision dataset metadata before any
neural model training is attempted. It is intentionally lightweight and uses
only the Python standard library.
"""

from __future__ import annotations

import csv
import json
from pathlib import Path
from typing import Iterable

ROOT = Path(__file__).resolve().parents[2]
SCHEMA_PATH = ROOT / "data" / "images" / "labels" / "image-label-schema.json"
CSV_PATH = ROOT / "data" / "images" / "labels" / "sample-image-labels.csv"


def _load_schema() -> dict:
    with SCHEMA_PATH.open("r", encoding="utf-8") as file:
        return json.load(file)


def _read_rows() -> list[dict[str, str]]:
    with CSV_PATH.open("r", encoding="utf-8", newline="") as file:
        return list(csv.DictReader(file))


def _check_allowed(row: dict[str, str], field: str, allowed: Iterable[str], errors: list[str]) -> None:
    value = row.get(field, "")
    if value not in set(allowed):
        errors.append(f"{row.get('image_id', '<unknown>')}: invalid {field}={value!r}")


def main() -> None:
    schema = _load_schema()
    rows = _read_rows()
    allowed = schema["allowed_values"]
    required_fields = [field["name"] for field in schema["fields"] if field["required"]]

    errors: list[str] = []

    if not rows:
        errors.append("No label rows found.")

    for row in rows:
        for field in required_fields:
            if not row.get(field):
                errors.append(f"{row.get('image_id', '<unknown>')}: missing required field {field}")

        for field, allowed_values in allowed.items():
            _check_allowed(row, field, allowed_values, errors)

        file_path = row.get("file_path", "")
        if file_path.startswith("/") or ".." in Path(file_path).parts:
            errors.append(f"{row.get('image_id', '<unknown>')}: unsafe file_path={file_path!r}")

        if row.get("breed_label") == "not_suitable_photo" and row.get("comparison_readiness") != "rejected":
            errors.append(
                f"{row.get('image_id', '<unknown>')}: not_suitable_photo must use comparison_readiness=rejected"
            )

    if errors:
        print("Image label validation FAILED")
        for error in errors:
            print(f"- {error}")
        raise SystemExit(1)

    print("Image label validation PASS")
    print(f"Rows checked: {len(rows)}")
    print(f"Schema: {SCHEMA_PATH.relative_to(ROOT)}")
    print(f"Labels: {CSV_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
