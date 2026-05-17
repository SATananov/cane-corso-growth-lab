"""Train a small tabular neural-network prototype for dog growth status review.

This script is intentionally safe and educational:
- It trains a real feed-forward neural network with scikit-learn's MLPClassifier.
- It predicts a review signal (normal_growth vs needs_attention), not a diagnosis.
- It does not certify breed purity, pedigree, health, or veterinary status.
- It writes reproducible metrics to reports/neural-network-growth-prototype-results.json.

Run from the project root:
    python scripts/ml/train_growth_neural_network.py
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.metrics import accuracy_score, confusion_matrix, precision_recall_fscore_support
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

PROJECT_ROOT = Path(__file__).resolve().parents[2]
DATASET_PATH = PROJECT_ROOT / "data" / "processed" / "dog_growth_classification_sample.csv"
REPORT_PATH = PROJECT_ROOT / "reports" / "neural-network-growth-prototype-results.json"

NUMERIC_FEATURES = ["visit_age_months", "weight_kg", "average_adult_breed_weight_kg"]
CATEGORICAL_FEATURES = ["gender"]
TARGET = "growth_status_binary"
TARGET_LABELS = {0: "normal_growth", 1: "needs_attention"}
RANDOM_STATE = 36


def load_dataset(path: Path = DATASET_PATH) -> pd.DataFrame:
    """Load and validate the tabular growth dataset used by the prototype."""
    if not path.exists():
        raise FileNotFoundError(f"Dataset not found: {path}")

    dataset = pd.read_csv(path)
    required_columns = NUMERIC_FEATURES + CATEGORICAL_FEATURES + [TARGET, "growth_status"]
    missing = [column for column in required_columns if column not in dataset.columns]
    if missing:
        raise ValueError(f"Dataset is missing required columns: {missing}")

    return dataset.dropna(subset=required_columns).copy()


def build_pipeline() -> Pipeline:
    """Create a preprocessing + MLP neural-network classification pipeline."""
    preprocessor = ColumnTransformer(
        transformers=[
            ("numeric", StandardScaler(), NUMERIC_FEATURES),
            ("categorical", OneHotEncoder(handle_unknown="ignore"), CATEGORICAL_FEATURES),
        ]
    )

    neural_network = MLPClassifier(
        hidden_layer_sizes=(16, 8),
        activation="relu",
        solver="adam",
        alpha=0.0005,
        learning_rate_init=0.005,
        max_iter=500,
        early_stopping=True,
        validation_fraction=0.15,
        n_iter_no_change=20,
        random_state=RANDOM_STATE,
    )

    return Pipeline(
        steps=[
            ("preprocess", preprocessor),
            ("neural_network", neural_network),
        ]
    )


def train_and_evaluate() -> dict[str, Any]:
    """Train the neural network and return a compact, reproducible metrics report."""
    dataset = load_dataset()
    features = NUMERIC_FEATURES + CATEGORICAL_FEATURES
    x_train, x_test, y_train, y_test = train_test_split(
        dataset[features],
        dataset[TARGET],
        test_size=0.2,
        stratify=dataset[TARGET],
        random_state=RANDOM_STATE,
    )

    pipeline = build_pipeline()
    pipeline.fit(x_train, y_train)

    predictions = pipeline.predict(x_test)
    precision, recall, f1, _ = precision_recall_fscore_support(
        y_test,
        predictions,
        average="binary",
        zero_division=0,
    )

    model = pipeline.named_steps["neural_network"]
    matrix = confusion_matrix(y_test, predictions, labels=[0, 1])

    report: dict[str, Any] = {
        "step": "Step 36 — Tabular Neural Network Growth Prediction Prototype",
        "model_type": "scikit-learn MLPClassifier feed-forward neural network",
        "task": "binary growth review signal classification",
        "target": {
            "column": TARGET,
            "labels": TARGET_LABELS,
            "meaning": "0 = normal_growth, 1 = needs_attention",
        },
        "features": {
            "numeric": NUMERIC_FEATURES,
            "categorical": CATEGORICAL_FEATURES,
        },
        "dataset": {
            "path": str(DATASET_PATH.relative_to(PROJECT_ROOT)),
            "rows_total_after_dropna": int(len(dataset)),
            "train_rows": int(len(x_train)),
            "test_rows": int(len(x_test)),
            "class_balance": dataset[TARGET].value_counts().sort_index().to_dict(),
        },
        "model_config": {
            "hidden_layer_sizes": list(model.hidden_layer_sizes),
            "activation": model.activation,
            "solver": model.solver,
            "alpha": model.alpha,
            "early_stopping": model.early_stopping,
            "random_state": RANDOM_STATE,
        },
        "metrics": {
            "accuracy": round(float(accuracy_score(y_test, predictions)), 4),
            "precision_needs_attention": round(float(precision), 4),
            "recall_needs_attention": round(float(recall), 4),
            "f1_needs_attention": round(float(f1), 4),
            "confusion_matrix_labels": ["normal_growth", "needs_attention"],
            "confusion_matrix": matrix.tolist(),
            "training_iterations": int(model.n_iter_),
            "final_training_loss": round(float(model.loss_), 6),
        },
        "safety_boundary": [
            "Educational neural-network prototype only.",
            "Not a veterinary diagnostic system.",
            "Not an official Cane Corso growth certification.",
            "Not a replacement for breeder, owner, or veterinarian review.",
            "Image-based neural networks remain future work until a licensed labeled image dataset exists.",
        ],
    }

    REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
    REPORT_PATH.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    return report


def main() -> None:
    report = train_and_evaluate()
    metrics = report["metrics"]
    print("Step 36 tabular neural network training PASS")
    print(f"Accuracy: {metrics['accuracy']}")
    print(f"F1 needs_attention: {metrics['f1_needs_attention']}")
    print(f"Report: {REPORT_PATH.relative_to(PROJECT_ROOT)}")


if __name__ == "__main__":
    main()
