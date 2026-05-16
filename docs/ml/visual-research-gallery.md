# Visual Research Gallery

The Research Gallery connects the notebook outputs to the web app experience.

Instead of keeping the machine learning work hidden in `.ipynb` files, the app now displays the main visual evidence directly on the `/experiments` page.

## Included visuals

| Figure | ML concept | App meaning |
|---|---|---|
| Regression Coordinate System | Linear regression | A dog measurement can be placed as a point in age-weight space. |
| Polynomial Curve Coordinate System | Polynomial regression | Growth is better explained as a curve than as a simple straight line. |
| Classification Feature Space Boundary | Classification | The app can explain review-zone signals as boundaries, not diagnoses. |
| Clustering Feature Space Concept | Unsupervised learning | Future work can group similar growth profiles visually. |

## Public app copies

The original research figures stay in:

```txt
reports/figures/
```

The web-accessible copies are placed in:

```txt
public/research/figures/
```

This keeps the research archive and the app UI separated while allowing Next.js to serve the images safely from the public directory.

## Safety boundary

The gallery must keep the same interpretation boundary as the rest of the project:

- educational machine learning experiment;
- coordinate-based visualization;
- review signal, not diagnosis;
- not a replacement for veterinary advice.
