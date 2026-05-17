# Step 18 — Demo Dog Profiles

Step 18 adds a demo mode to the calculator so the app can be reviewed without manually typing every value.

## What changed

- Added simulated Cane Corso demo profiles in `src/lib/demo-dogs.ts`.
- Added a `DemoDogSelector` component above the calculator form.
- Added a machine-readable prototype JSON file at `data/prototype/demo-dog-profiles.json`.
- Connected demo profile loading to the existing calculator state.
- Kept all profiles explicitly simulated and educational.

## Demo profiles

| Demo profile | Purpose |
|---|---|
| MARK I — balanced growth | Baseline profile close to the reference curve. |
| THOR — power growth profile | Heavier male trajectory for cluster/PCA movement. |
| HERA — adult reference | Near-adult profile for maturity and stable signals. |
| BRUTUS — early puppy point | Early growth point for trajectory and future time-series discussion. |
| LUNA — review signal example | Safe educational scenario for review-zone explanations. |

## Safety boundary

The demo profiles are not veterinary records and are not clinical references. They are simulated examples used to demonstrate app behavior, model explainability and visual growth geometry.
