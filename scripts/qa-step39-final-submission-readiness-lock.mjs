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

const step39Files = [
  "docs/submission/final-checklist.md",
  "docs/qa/step39-final-submission-readiness-lock.md",
  "scripts/qa-step39-final-submission-readiness-lock.mjs",
];

for (const file of step39Files) {
  assertExists(file, `Step 39 file exists: ${file}`);
}

assertIncludes("package.json", "step39:final-submission-lock:qa", "Step 39 QA script is registered in package.json");
assertIncludes("README.md", "Step 39 — Final Submission Readiness Lock", "README includes Step 39 section");
assertIncludes("README.md", "pnpm step39:final-submission-lock:qa", "README includes Step 39 verification command");
assertIncludes("README.md", "docs/submission/final-checklist.md", "README points to the final checklist");

assertIncludes("docs/submission/final-submission-guide.md", "Step 39 final readiness lock", "Submission guide includes Step 39 section");
assertIncludes("docs/submission/final-submission-guide.md", "final-checklist.md", "Submission guide links final checklist");
assertIncludes("reports/final-submission-report.md", "Step 39 final submission readiness lock", "Final report records Step 39 lock");

assertIncludes("docs/submission/final-checklist.md", "GitHub as the source of truth", "Final checklist identifies GitHub source of truth");
assertIncludes("docs/submission/final-checklist.md", "git archive --format=zip", "Final checklist requires Git archive ZIP creation");
assertIncludes("docs/submission/final-checklist.md", "HEAD equals `origin/main`", "Final checklist requires GitHub sync verification");
assertIncludes("docs/submission/final-checklist.md", "pnpm step38:defense-pack:qa", "Final checklist includes Step 38 QA command");
assertIncludes("docs/submission/final-checklist.md", "python scripts/ml/train_growth_neural_network.py", "Final checklist includes real training command");
assertIncludes("docs/submission/final-checklist.md", "MLPClassifier", "Final checklist explains neural-network model type");
assertIncludes("docs/submission/final-checklist.md", "Accuracy: `0.807`", "Final checklist records current accuracy");
assertIncludes("docs/submission/final-checklist.md", "F1", "Final checklist records F1 metric wording");
assertIncludes("docs/submission/final-checklist.md", "/experiments", "Final checklist includes experiments route");
assertIncludes("docs/submission/final-checklist.md", "Step 37 neural-network results panel", "Final checklist references UI evidence panel");
assertIncludes("docs/submission/final-checklist.md", "not an image classifier", "Final checklist keeps image-classifier boundary");
assertIncludes("docs/submission/final-checklist.md", "does not replace a veterinarian", "Final checklist keeps veterinary boundary");
assertIncludes("docs/submission/final-checklist.md", "does not issue official Cane Corso certification", "Final checklist keeps certification boundary");

assertIncludes("docs/qa/step39-final-submission-readiness-lock.md", "documentation and QA only", "Step 39 QA doc records documentation-only scope");
assertIncludes("docs/qa/step39-final-submission-readiness-lock.md", "Step 36 tabular neural network", "Step 39 QA doc references Step 36 evidence");
assertIncludes("docs/qa/step39-final-submission-readiness-lock.md", "Step 37 neural-network results UI panel", "Step 39 QA doc references Step 37 evidence");
assertIncludes("docs/qa/step39-final-submission-readiness-lock.md", "Step 38 defense and demo material", "Step 39 QA doc references Step 38 evidence");

const unsafeAbsoluteClaims = [
  "proves breed purity",
  "proves pedigree",
  "certifies a Cane Corso from a photo",
  "diagnoses a dog",
  "production medical decision system",
];

for (const claim of unsafeAbsoluteClaims) {
  assertNotIncludes("docs/submission/final-checklist.md", claim, `Final checklist avoids unsafe absolute claim: ${claim}`);
  assertNotIncludes("README.md", claim, `README avoids unsafe absolute claim: ${claim}`);
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log("\nStep 39 final submission readiness lock QA PASS");
