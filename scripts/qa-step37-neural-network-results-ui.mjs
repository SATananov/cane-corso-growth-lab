import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function pass(message) {
  console.log(`PASS ${message}`);
}

function fail(message) {
  console.error(`FAIL ${message}`);
  process.exitCode = 1;
}

function assertExists(relativePath, message) {
  if (exists(relativePath)) pass(message);
  else fail(`${message} — missing ${relativePath}`);
}

function assertIncludes(relativePath, needle, message) {
  const source = read(relativePath);
  if (source.includes(needle)) pass(message);
  else fail(`${message} — expected ${needle} in ${relativePath}`);
}

function assertNotIncludes(relativePath, needle, message) {
  const source = read(relativePath);
  if (!source.includes(needle)) pass(message);
  else fail(`${message} — unexpected ${needle} in ${relativePath}`);
}

assertExists("src/lib/ml/neural-network-growth-results.ts", "Step 37 neural-network results data layer exists");
assertExists("src/components/neural-network-results-panel.tsx", "Step 37 neural-network UI panel exists");
assertExists("docs/qa/step37-neural-network-results-ui.md", "Step 37 QA documentation exists");

assertIncludes("package.json", "step37:neural-results-ui:qa", "Step 37 QA script is registered in package.json");
assertIncludes("src/app/experiments/page.tsx", "NeuralNetworkResultsPanel", "Experiments page renders the neural-network panel");
assertIncludes("src/components/neural-network-results-panel.tsx", "NeuralNetworkResultsPanel", "Panel exports the expected component");
assertIncludes("src/components/neural-network-results-panel.tsx", "useLanguage", "Panel is language-aware");
assertIncludes("src/components/neural-network-results-panel.tsx", "usg-readable-card", "Panel uses readable-card layout guard");
assertIncludes("src/components/neural-network-results-panel.tsx", "Доказателства от невронна мрежа", "Panel includes Bulgarian localized copy");
assertIncludes("src/components/neural-network-results-panel.tsx", "Neural network evidence", "Panel includes English localized copy");
assertIncludes("src/components/neural-network-results-panel.tsx", "Evidenza rete neurale", "Panel includes Italian localized copy");

assertIncludes("src/lib/ml/neural-network-growth-results.ts", "MLPClassifier", "Data layer identifies the real neural-network model");
assertIncludes("src/lib/ml/neural-network-growth-results.ts", "normal_growth vs needs_attention", "Data layer records the Step 36 task");
assertIncludes("src/lib/ml/neural-network-growth-results.ts", "accuracy: 0.807", "Data layer includes Step 36 accuracy");
assertIncludes("src/lib/ml/neural-network-growth-results.ts", "f1NeedsAttention: 0.8117", "Data layer includes Step 36 F1 score");
assertIncludes("src/lib/ml/neural-network-growth-results.ts", "confusionMatrix: [[782, 218], [168, 832]]", "Data layer includes Step 36 confusion matrix");
assertIncludes("src/lib/ml/neural-network-growth-results.ts", "scripts/ml/train_growth_neural_network.py", "Data layer links the training script evidence");
assertIncludes("src/lib/ml/index.ts", "neural-network-growth-results", "ML index exports Step 37 neural-network results");

assertIncludes("src/components/neural-network-results-panel.tsx", "not a veterinary diagnostic system", "Panel keeps veterinary safety boundary");
assertIncludes("src/components/neural-network-results-panel.tsx", "not an official Cane Corso certification", "Panel keeps certification safety boundary");
assertIncludes("src/components/neural-network-results-panel.tsx", "not an image-based breed classifier", "Panel keeps image-classifier boundary");
assertNotIncludes("src/components/neural-network-results-panel.tsx", "proves breed", "Panel avoids unsafe breed proof claim");
assertNotIncludes("src/components/neural-network-results-panel.tsx", "diagnoses", "Panel avoids diagnostic claim wording");

assertIncludes("README.md", "Step 37 — Neural Network Results UI Panel", "README includes Step 37 section");
assertIncludes("README.md", "pnpm step37:neural-results-ui:qa", "README includes Step 37 verification command");
assertIncludes("reports/final-submission-report.md", "Step 37 neural-network results UI", "Final report includes Step 37 UI layer");
assertIncludes("docs/submission/final-submission-guide.md", "Step 37", "Submission guide includes Step 37 presentation path");

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log("\nStep 37 neural-network results UI QA PASS");
