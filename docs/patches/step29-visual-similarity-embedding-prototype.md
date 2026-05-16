# Step 29 — Visual Similarity / Embedding Prototype

## Scope

Adds the visual similarity layer that will later compare accepted user photos with a permitted Cane Corso reference set.

## Added

- `src/lib/ml/visual-similarity.ts`
- `src/components/visual-similarity-panel.tsx`
- `reports/vision/visual-similarity-embedding-plan.json`
- `scripts/ml/run_visual_similarity_prototype.py`
- `docs/ml/visual-similarity-embedding-prototype.md`
- `notebooks/09_visual_similarity_embedding_prototype.ipynb`

## Updated

- `src/app/visual-review/page.tsx`
- `src/lib/ml/index.ts`
- `README.md`

## Boundary

This step does not train a real model and does not claim visual breed proof. It prepares the embedding/similarity prototype and safe scoring formula.
