# Cane Corso Breed Reference Geometry

Step 20 adds a standard-based geometry reference layer to the app.

The purpose is to connect the existing growth calculator with Cane Corso reference dimensions and proportions before adding any photo-based visual comparison.

## Source

Primary reference:

- FCI Standard No. 343 — Cane Corso Italiano
- Official English publication date: 13.10.2023 / EN
- Reference URL: https://www.fci.be/nomenclature/Standards/343g02-en.pdf

## Adult reference ranges

| Sex | Height at withers | Tolerance band | Weight | Weight/height ratio |
| --- | --- | --- | --- | --- |
| Male | 64–68 cm | 62–70 cm | 45–50 kg | 0.71 kg/cm |
| Female | 60–64 cm | 58–66 cm | 40–45 kg | 0.68 kg/cm |

## Geometry formulas

| Reference | Formula | Orientation target |
| --- | --- | --- |
| Body format | `body_length_cm / height_at_withers_cm` | about `1.11` |
| Head proportion | `head_length_cm / height_at_withers_cm` | about `0.36` |
| Muzzle/skull relation | `muzzle_length_cm / skull_length_cm` | about `0.52` as ratio |
| Chest depth | `chest_depth_cm / height_at_withers_cm` | about `0.50` |

## App role

This layer supports three product/project goals:

1. It gives the calculator a transparent adult reference context for height and weight.
2. It prepares the next photo module, where side-body and head-profile photos can be checked against measurable geometry.
3. It keeps the ML project explainable: the app is not a black box; the user and reviewer can see which references are used.

## Safety boundary

This reference layer does not prove:

- pedigree;
- breed purity;
- official Cane Corso status;
- registry status;
- health condition.

It is an orientation layer only. Future photo comparison must first verify that the uploaded photo is suitable for comparison before any visual match score is calculated.
