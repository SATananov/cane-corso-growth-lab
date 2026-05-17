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

assertExists("scripts/ml/train_growth_neural_network.py", "Step 36 training script exists");
assertExists("notebooks/12_tabular_neural_network_growth_prediction.ipynb", "Step 36 notebook exists");
assertExists("reports/neural-network-growth-prototype.md", "Step 36 markdown report exists");
assertExists("reports/neural-network-growth-prototype-results.json", "Step 36 generated metrics JSON exists");
assertExists("docs/qa/step36-tabular-neural-network-growth.md", "Step 36 QA documentation exists");

assertIncludes("package.json", "step36:neural-growth:qa", "Step 36 QA script is registered in package.json");
assertIncludes("scripts/ml/train_growth_neural_network.py", "MLPClassifier", "Training script uses a real MLP neural network");
assertIncludes("scripts/ml/train_growth_neural_network.py", "train_test_split", "Training script uses a train/test split");
assertIncludes("scripts/ml/train_growth_neural_network.py", "StandardScaler", "Training script scales numeric features");
assertIncludes("scripts/ml/train_growth_neural_network.py", "OneHotEncoder", "Training script encodes categorical features");
assertIncludes("scripts/ml/train_growth_neural_network.py", "growth_status_binary", "Training script predicts growth status target");
assertIncludes("scripts/ml/train_growth_neural_network.py", "Not a veterinary diagnostic system", "Training script keeps veterinary safety boundary");
assertNotIncludes("scripts/ml/train_growth_neural_network.py", '"bcs_predicted"', "Training script avoids the high-leakage BCS prediction input");

assertIncludes("reports/neural-network-growth-prototype-results.json", "MLPClassifier", "Generated metrics identify the neural-network model type");
assertIncludes("reports/neural-network-growth-prototype-results.json", "accuracy", "Generated metrics include accuracy");
assertIncludes("reports/neural-network-growth-prototype-results.json", "confusion_matrix", "Generated metrics include confusion matrix");
assertIncludes("reports/neural-network-growth-prototype-results.json", "Image-based neural networks remain future work", "Generated metrics keep image NN future-work boundary");

assertIncludes("reports/neural-network-growth-prototype.md", "Accuracy: 0.8070", "Markdown report records current accuracy");
assertIncludes("reports/neural-network-growth-prototype.md", "tabular", "Markdown report explains tabular scope");
assertIncludes("reports/neural-network-growth-prototype.md", "not image-based", "Markdown report separates image neural networks from Step 36");
assertIncludes("reports/neural-network-growth-prototype.md", "not a veterinary diagnostic system", "Markdown report keeps safety boundary");

assertIncludes("notebooks/README.md", "12_tabular_neural_network_growth_prediction.ipynb", "Notebook README lists Step 36 notebook");
assertIncludes("notebooks/12_tabular_neural_network_growth_prediction.ipynb", "MLPClassifier", "Step 36 notebook includes neural-network model code");
assertIncludes("notebooks/12_tabular_neural_network_growth_prediction.ipynb", "growth_status_binary", "Step 36 notebook includes target column");
assertIncludes("notebooks/12_tabular_neural_network_growth_prediction.ipynb", "not a veterinary diagnosis", "Step 36 notebook keeps safety boundary");

assertIncludes("README.md", "Step 36 — Real Tabular Neural Network Growth Prototype", "README includes Step 36 section");
assertIncludes("README.md", "pnpm step36:neural-growth:qa", "README includes Step 36 verification command");
assertIncludes("README.md", "python scripts/ml/train_growth_neural_network.py", "README includes neural-network training command");
assertIncludes("README.md", "image neural network remains future work", "README keeps image NN boundary");

assertIncludes("reports/final-submission-report.md", "Tabular neural network", "Final report includes Step 36 neural-network component");
assertIncludes("docs/submission/final-submission-guide.md", "Step 36", "Submission guide includes Step 36 verification");

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log("\nStep 36 tabular neural network prototype QA PASS");
