# Model Results Summary

## Regression results

| Model | MAE | RMSE | R² Score | Interpretation |
|---|---:|---:|---:|---|
| Simple Linear Regression | 4.480 | 4.789 | 0.856 | Clear beginner baseline using age only. |
| Polynomial Regression | 2.554 | 3.309 | 0.931 | Better visual fit because growth is curved. |
| Multi-Dimensional Linear Regression | 1.390 | 1.821 | 0.979 | Stronger result using additional features. |
| Ridge Regression | 1.137 | 1.405 | 0.988 | Best current regression result. |
| Lasso Regression | 1.258 | 1.679 | 0.982 | Strong regularized model with simpler-feature tendency. |

## Classification results

| Model | Accuracy | Precision | Recall | F1 | AUC | Interpretation |
|---|---:|---:|---:|---:|---:|---|
| Logistic Regression | 0.812 | 0.764 | 0.901 | 0.827 | 0.889 | Interpretable baseline. |
| Decision Tree | 0.823 | 0.778 | 0.904 | 0.836 | 0.889 | Easy rule-style explanation. |
| Random Forest | 0.832 | 0.787 | 0.912 | 0.845 | 0.912 | Best current classification result. |
| AdaBoost | 0.771 | 0.686 | 1.000 | 0.814 | 0.875 | High recall but lower precision. |
| Support Vector Machine | 0.831 | 0.788 | 0.906 | 0.843 | 0.899 | Strong margin-based classifier. |

## App interpretation

The app should treat these results as educational evidence. It can show model comparison, growth zones and coordinate interpretation, but it must not make veterinary or medical claims.
