# Cane Corso Growth Geometry Lab

**Cane Corso Growth Geometry Lab** is an experimental web app for exploring Cane Corso growth patterns through coordinates, curves and machine learning concepts.

The project is built as a separate research-and-application lab. It is not part of the main USG / Cane Corso Platform codebase, but it can later become a foundation for a future growth intelligence module.

## Project idea

I use this project to experiment with a simple but visual idea:

> A Cane Corso can be represented as a point in a coordinate system. Growth can be represented as a trajectory. Regression models can estimate curves, classification models can mark review zones, and clustering can later group similar growth profiles.

The app is designed to be understandable for a beginner-friendly machine learning project while still feeling like a real product prototype.

## Current app status

The current version includes:

- premium landing page
- dedicated navigation
- growth calculator page
- interactive Cane Corso profile input
- prediction summary panel
- coordinate-based growth map concept
- ML experiments page
- scope and limitations page
- educational safety disclaimer

## Tech stack

- **Next.js** with App Router
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Python / Jupyter notebooks** planned for the ML foundation
- **pandas, numpy, scikit-learn** planned for model experiments

## App routes

```txt
/             Home / product concept
/calculator   Growth calculator and prediction panel
/experiments  ML experiment overview
/about        Scope, limitations and project direction
```

## Machine learning direction

The app is planned around these ML ideas:

1. **Linear Regression** — simple weight prediction based on age.
2. **Polynomial Regression** — curved growth trajectory.
3. **Multi-dimensional Regression** — age, weight, height, sex and body condition score.
4. **Classification** — educational growth status signal, such as normal growth or needs review.
5. **Clustering** — future experiment for grouping similar growth profiles.
6. **Coordinate interpretation** — visualizing the dog as a point and the growth process as a curve or zone.

## Important limitation

This project is an educational machine learning and visualization experiment.

It is **not** a veterinary diagnostic system. It does not replace professional veterinary advice, physical examination, laboratory tests, breeder expertise or long-term health monitoring.

The app should only be interpreted as an orientation and learning tool.

## Local development

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Run code checks:

```bash
pnpm lint
pnpm build
```

Open the app locally:

```txt
http://localhost:3000
```

## Git workflow

The project is developed step by step. After every stable patch:

```bash
pnpm lint
pnpm build
git status
git add .
git commit -m "Describe the step"
git push
```

## Repository purpose

This repository is a separate experimental app.

The main goals are:

- to build a clean ML-based app prototype;
- to keep it separate from the main Cane Corso Platform;
- to use the previous notebook project only as a research foundation;
- to create a future-ready concept that may later inspire a production module.

## Planned next steps

- Add project datasets and notebook foundation.
- Add real experiment summaries from regression and classification notebooks.
- Improve the calculator with structured model coefficients.
- Add visual comparison between expected and entered growth data.
- Add clustering / growth profile zones as a future experiment.
- Prepare a clean project report for educational submission.

## License and responsibility

This repository is currently an experimental learning project. Any future public or production use must include proper data review, veterinary safety boundaries and responsible communication.
