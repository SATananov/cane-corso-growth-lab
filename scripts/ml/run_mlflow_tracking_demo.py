"""Optional MLflow tracking demo for Cane Corso Growth Geometry Lab.

This script is intentionally safe to run without MLflow installed. If MLflow is
available, it logs a small set of educational experiment summaries. If not, it
prints the same data as JSON so the project remains easy to run for beginners.
"""

from __future__ import annotations

import json
from pathlib import Path

RUNS = [
    {
        "name": "Ridge Regression Growth Curve",
        "params": {"model_family": "regression", "stage": "app_bridge"},
        "metrics": {"mae": 1.137, "rmse": 1.405, "r2": 0.988},
        "artifacts": ["reports/model-exports/app-model-bridge-v0.1.json"],
    },
    {
        "name": "Random Forest Review Signal",
        "params": {"model_family": "classification", "stage": "research"},
        "metrics": {"accuracy": 0.832, "f1": 0.845, "auc": 0.912},
        "artifacts": ["notebooks/03_growth_classification_zones.ipynb"],
    },
]


def main() -> None:
    try:
        import mlflow  # type: ignore
    except ImportError:
        print("MLflow is not installed. Printing tracking payload instead.\n")
        print(json.dumps({"runs": RUNS}, indent=2))
        return

    mlflow.set_experiment("cane-corso-growth-geometry-lab")
    for run in RUNS:
        with mlflow.start_run(run_name=run["name"]):
            mlflow.log_params(run["params"])
            mlflow.log_metrics(run["metrics"])
            for artifact in run["artifacts"]:
                path = Path(artifact)
                if path.exists():
                    mlflow.log_artifact(str(path))

    print("MLflow demo tracking completed.")


if __name__ == "__main__":
    main()
