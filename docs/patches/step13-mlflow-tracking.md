# Step 13 — MLflow Experiment Tracking

This step adds an MLflow-ready tracking layer without making MLflow required for the app build.

## Added

- `src/lib/ml/mlflow-tracking.ts`
- `src/components/mlflow-tracking-panel.tsx`
- `scripts/ml/run_mlflow_tracking_demo.py`
- `reports/mlflow/experiment-tracking-plan.json`
- `requirements-mlflow.txt`

## Updated

- `/experiments` now shows experiment tracking summaries.

## Usage

Optional:

```bash
pip install -r requirements-mlflow.txt
python scripts/ml/run_mlflow_tracking_demo.py
```

If MLflow is not installed, the script prints the tracking payload instead of failing.
