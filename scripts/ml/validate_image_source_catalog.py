from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CATALOG = ROOT / "data" / "images" / "source-catalog.json"
MANIFEST = ROOT / "data" / "images" / "labels" / "source-manifest-template.csv"

REQUIRED_SOURCE_FIELDS = {
    "id", "name", "url", "type", "priority", "knownContent", "bestUse", "licenseAction", "repoPolicy", "status"
}
REQUIRED_CLASS_FIELDS = {"label", "purpose", "minimumPrototypeImages", "recommendedImages"}


def fail(message: str) -> None:
    raise SystemExit(f"FAIL {message}")


def main() -> None:
    if not CATALOG.exists():
        fail(f"Missing catalog: {CATALOG}")
    data = json.loads(CATALOG.read_text(encoding="utf-8"))
    sources = data.get("candidateSources")
    if not isinstance(sources, list) or not sources:
        fail("candidateSources must be a non-empty list")
    ids = set()
    for source in sources:
        missing = REQUIRED_SOURCE_FIELDS.difference(source)
        if missing:
            fail(f"source {source.get('id', '<unknown>')} missing fields: {sorted(missing)}")
        if source["id"] in ids:
            fail(f"duplicate source id: {source['id']}")
        ids.add(source["id"])
        if not isinstance(source["bestUse"], list) or not source["bestUse"]:
            fail(f"source {source['id']} bestUse must be a non-empty list")
        action = source["licenseAction"].lower()
        if "review" not in action and "permission" not in action and "verify" not in action:
            fail(f"source {source['id']} should mention license review, permission or verification")
    classes = data.get("targetClasses")
    if not isinstance(classes, list) or not classes:
        fail("targetClasses must be a non-empty list")
    for item in classes:
        missing = REQUIRED_CLASS_FIELDS.difference(item)
        if missing:
            fail(f"class {item.get('label', '<unknown>')} missing fields: {sorted(missing)}")
        if item["minimumPrototypeImages"] <= 0:
            fail(f"class {item['label']} minimumPrototypeImages must be positive")
        if item["recommendedImages"] < item["minimumPrototypeImages"]:
            fail(f"class {item['label']} recommendedImages must be >= minimumPrototypeImages")
    checklist = data.get("sourceReviewChecklist")
    if not isinstance(checklist, list) or len(checklist) < 5:
        fail("sourceReviewChecklist should contain at least five review items")
    if not MANIFEST.exists():
        fail(f"Missing source manifest template: {MANIFEST}")
    print("PASS image source catalog validation")
    print(f"sources: {len(sources)}")
    print(f"target classes: {len(classes)}")


if __name__ == "__main__":
    main()
