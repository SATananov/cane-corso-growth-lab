# Feature Engineering Layer

The app uses feature engineering to convert simple owner-friendly inputs into model-friendly signals.

Examples:

- `maturityRatio` = age normalized against 24 months
- `adultWeightRatio` = current weight divided by adult reference weight
- `weightHeightRatio` = current weight divided by height
- `bodyConditionDeviation` = distance from the calm middle BCS value
- `curveDeltaPercent` = difference from the educational reference curve

This layer makes the app easier to explain because the user can see what the model receives before a signal is produced.
