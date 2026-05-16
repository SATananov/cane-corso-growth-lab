# Clustering Growth Profiles

This project uses clustering as an educational unsupervised-learning concept.

Each dog profile is transformed into a feature point:

- maturity ratio
- adult weight ratio
- body condition deviation
- curve delta normalized

The app compares the current dog point to a small set of centroids. This does not replace a real K-Means or DBSCAN training run, but it gives the application a clear bridge for explaining clustering visually before a full unsupervised notebook is expanded.

## Safe interpretation

Clusters are not diagnoses. They are descriptive growth-profile groups used for visualization and learning.
