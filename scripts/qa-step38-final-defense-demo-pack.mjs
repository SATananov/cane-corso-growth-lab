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

const step38Files = [
  "docs/submission/defense-script.md",
  "docs/submission/demo-walkthrough.md",
  "docs/submission/screenshot-checklist.md",
  "reports/final-project-summary-for-defense.md",
  "docs/qa/step38-final-defense-demo-pack.md",
  "scripts/qa-step38-final-defense-demo-pack.mjs",
];

for (const file of step38Files) {
  assertExists(file, `Step 38 file exists: ${file}`);
}

assertIncludes("package.json", "step38:defense-pack:qa", "Step 38 QA script is registered in package.json");
assertIncludes("README.md", "Step 38 — Final Defense & Demo Walkthrough Pack", "README includes Step 38 section");
assertIncludes("README.md", "pnpm step38:defense-pack:qa", "README includes Step 38 verification command");
assertIncludes("docs/submission/final-submission-guide.md", "defense-script.md", "Submission guide links the defense script");
assertIncludes("docs/submission/final-submission-guide.md", "demo-walkthrough.md", "Submission guide links the demo walkthrough");
assertIncludes("docs/submission/final-submission-guide.md", "screenshot-checklist.md", "Submission guide links the screenshot checklist");
assertIncludes("reports/final-submission-report.md", "Step 38 final defense pack", "Final report records the Step 38 defense pack");

assertIncludes("docs/submission/defense-script.md", "MLPClassifier", "Defense script explains the neural-network model type");
assertIncludes("docs/submission/defense-script.md", "normal_growth vs needs_attention", "Defense script explains the neural-network task");
assertIncludes("docs/submission/defense-script.md", "Accuracy: 0.807", "Defense script records the current accuracy");
assertIncludes("docs/submission/defense-script.md", "F1 needs_attention: 0.8117", "Defense script records the current F1 score");
assertIncludes("docs/submission/defense-script.md", "not image classifier", "Defense script separates tabular NN from image classifier claims");

assertIncludes("docs/submission/demo-walkthrough.md", "/experiments", "Demo walkthrough includes the experiments route");
assertIncludes("docs/submission/demo-walkthrough.md", "/visual-review", "Demo walkthrough includes the visual-review route");
assertIncludes("docs/submission/demo-walkthrough.md", "pnpm step38:defense-pack:qa", "Demo walkthrough includes Step 38 verification");
assertIncludes("docs/submission/screenshot-checklist.md", "05-neural-network-results-panel.png", "Screenshot checklist includes neural-network panel evidence");
assertIncludes("reports/final-project-summary-for-defense.md", "real tabular neural network", "Defense summary highlights the real tabular neural network");
assertIncludes("reports/final-project-summary-for-defense.md", "src/components/neural-network-results-panel.tsx", "Defense summary points to the UI evidence file");

assertIncludes("docs/submission/defense-script.md", "does not replace a veterinarian", "Defense script keeps veterinary boundary");
assertIncludes("reports/final-project-summary-for-defense.md", "not be described as a veterinary diagnostic system", "Defense summary keeps diagnostic boundary");
assertIncludes("docs/submission/screenshot-checklist.md", "Do not present screenshots as medical proof", "Screenshot checklist keeps evidence boundary");
assertIncludes("docs/qa/step38-final-defense-demo-pack.md", "avoid unsafe claims", "Step 38 QA doc records unsafe-claim guardrail");

const unsafeClaims = [
  "proves breed purity",
  "proves pedigree",
  "certifies a Cane Corso from a photo",
  "diagnoses a dog",
];

for (const claim of unsafeClaims) {
  assertNotIncludes("docs/submission/defense-script.md", claim, `Defense script avoids unsafe absolute claim: ${claim}`);
  assertNotIncludes("reports/final-project-summary-for-defense.md", claim, `Defense summary avoids unsafe absolute claim: ${claim}`);
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log("\nStep 38 final defense and demo walkthrough QA PASS");
