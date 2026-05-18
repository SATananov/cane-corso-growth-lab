import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function pass(message) {
  console.log(`PASS ${message}`);
}

function fail(message) {
  console.error(`FAIL ${message}`);
  process.exitCode = 1;
}

function assertFile(file, message) {
  if (fs.existsSync(path.join(root, file))) pass(message);
  else fail(`${message} — missing ${file}`);
}

function assertIncludes(file, needle, message) {
  const source = read(file);
  if (source.includes(needle)) pass(message);
  else fail(`${message} — missing ${needle} in ${file}`);
}

function assertNotIncludes(file, needle, message) {
  const source = read(file);
  if (!source.includes(needle)) pass(message);
  else fail(`${message} — unexpected ${needle} in ${file}`);
}

assertFile("docs/submission/browser-evidence-lock.md", "Final browser evidence lock exists");
assertFile("reports/final-browser-evidence-summary.md", "Final browser evidence summary exists");
assertFile("docs/qa/step42-browser-evidence-screenshot-pack.md", "Step 42 QA documentation exists");
assertFile("scripts/qa-step42-browser-evidence-screenshot-pack.mjs", "Step 42 QA script exists");

assertIncludes("package.json", "step42:browser-evidence:qa", "Step 42 QA script is registered in package.json");

assertIncludes("docs/submission/browser-evidence-lock.md", "Step 41 clickable evidence checks", "Browser evidence lock includes clickable evidence checks");
assertIncludes("docs/submission/browser-evidence-lock.md", "MLPClassifier", "Browser evidence lock names the neural-network model");
assertIncludes("docs/submission/browser-evidence-lock.md", "0.807", "Browser evidence lock preserves accuracy evidence");
assertIncludes("docs/submission/browser-evidence-lock.md", "0.8117", "Browser evidence lock preserves F1 evidence");
assertIncludes("docs/submission/browser-evidence-lock.md", "notebook", "Browser evidence lock includes notebook evidence links");
assertIncludes("docs/submission/browser-evidence-lock.md", "dataset", "Browser evidence lock includes dataset evidence links");
assertIncludes("docs/submission/browser-evidence-lock.md", "figure", "Browser evidence lock includes figure evidence links");
assertIncludes("docs/submission/browser-evidence-lock.md", "neural-network evidence file", "Browser evidence lock includes neural-network evidence links");
assertIncludes("docs/submission/browser-evidence-lock.md", "Do not store screenshots in the Git repository", "Browser evidence lock keeps screenshots out of source by default");

assertIncludes("docs/submission/screenshot-checklist.md", "Step 42 final browser evidence pass", "Screenshot checklist includes Step 42 section");
assertIncludes("docs/submission/screenshot-checklist.md", "09-clickable-evidence-source-link.png", "Screenshot checklist includes clickable evidence screenshot filename");
assertIncludes("docs/submission/screenshot-checklist.md", "10-terminal-final-verification.png", "Screenshot checklist includes final terminal verification screenshot filename");

assertIncludes("reports/final-browser-evidence-summary.md", "Final Browser Evidence Summary", "Final browser evidence summary has title");
assertIncludes("reports/final-browser-evidence-summary.md", "Step 41 makes evidence cards clickable", "Final browser evidence summary references clickable cards");
assertIncludes("reports/final-browser-evidence-summary.md", "accuracy `0.807`", "Final browser evidence summary preserves accuracy metric");
assertIncludes("reports/final-browser-evidence-summary.md", "F1 `0.8117`", "Final browser evidence summary preserves F1 metric");

assertIncludes("README.md", "Step 42 — Final Browser Evidence & Screenshot Pack", "README includes Step 42 section");
assertIncludes("README.md", "pnpm step42:browser-evidence:qa", "README includes Step 42 verification command");
assertIncludes("docs/submission/final-submission-guide.md", "Step 42 final browser evidence", "Final submission guide includes Step 42 evidence section");
assertIncludes("reports/final-submission-report.md", "Step 42 final browser evidence", "Final report includes Step 42 evidence section");

for (const file of [
  "docs/submission/browser-evidence-lock.md",
  "reports/final-browser-evidence-summary.md",
  "README.md",
  "docs/submission/final-submission-guide.md",
  "reports/final-submission-report.md",
]) {
  assertNotIncludes(file, "proves pedigree", `${file} avoids unsafe pedigree claim`);
  assertNotIncludes(file, "proves breed purity", `${file} avoids unsafe breed-purity claim`);
  assertNotIncludes(file, "veterinary diagnosis system", `${file} avoids unsafe diagnosis claim`);
  assertNotIncludes(file, "official breed certification from photo", `${file} avoids unsafe certification claim`);
}

if (!process.exitCode) {
  console.log("\nStep 42 final browser evidence and screenshot pack QA PASS");
}
