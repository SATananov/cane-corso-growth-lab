import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
let failed = false;

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function pass(message) {
  console.log(`PASS ${message}`);
}

function fail(message) {
  failed = true;
  console.error(`FAIL ${message}`);
}

function assertIncludes(file, needle, message) {
  if (read(file).includes(needle)) pass(message);
  else fail(`${message} — missing ${needle}`);
}

function assertNotIncludes(file, needle, message) {
  if (!read(file).includes(needle)) pass(message);
  else fail(`${message} — still contains ${needle}`);
}

const formattedComponents = [
  "src/components/neural-network-results-panel.tsx",
  "src/components/breed-classifier-training-panel.tsx",
  "src/components/vision-dataset-readiness-panel.tsx",
  "src/components/visual-breed-classifier-panel.tsx",
];

assertIncludes("src/lib/number-format.ts", "formatStableInteger", "Stable integer formatter exists");
assertIncludes("src/lib/number-format.ts", "replace(/\\B(?=(\\d{3})+(?!\\d))/g", "Stable integer formatter avoids locale-dependent toLocaleString");

for (const file of formattedComponents) {
  assertIncludes(file, "formatStableInteger", `${file} uses stable integer formatting`);
  assertNotIncludes(file, ".toLocaleString()", `${file} avoids hydration-sensitive toLocaleString calls`);
}

assertIncludes(
  "src/components/neural-network-results-panel.tsx",
  "formatStableInteger(result.trainRows)",
  "Neural-network dataset split uses stable formatting",
);
assertIncludes(
  "src/components/neural-network-results-panel.tsx",
  "formatStableInteger(value)",
  "Neural-network confusion matrix uses stable formatting",
);
assertIncludes(
  "package.json",
  "step42-1:hydration-stable:qa",
  "Step 42.1 QA script is registered",
);

if (failed) {
  console.error("\nStep 42.1 hydration stable formatting QA FAIL");
  process.exit(1);
}

console.log("\nStep 42.1 hydration stable formatting QA PASS");
