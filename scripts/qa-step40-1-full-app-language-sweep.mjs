import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

let failed = false;
function pass(message) {
  console.log(`PASS ${message}`);
}
function fail(message) {
  failed = true;
  console.error(`FAIL ${message}`);
}
function assertIncludes(file, needle, message) {
  const source = read(file);
  if (source.includes(needle)) pass(message);
  else fail(`${message} — missing ${needle}`);
}
function assertNotIncludes(file, needle, message) {
  const source = read(file);
  if (!source.includes(needle)) pass(message);
  else fail(`${message} — found ${needle}`);
}

const requiredFiles = [
  "docs/qa/step40-1-full-app-language-sweep.md",
  "scripts/qa-step40-1-full-app-language-sweep.mjs",
  "src/lib/i18n/ml-phrase-copy.ts",
  "src/components/ml-research-summary.tsx",
  "src/components/model-evaluation-tables.tsx",
  "src/components/ml-experiment-grid.tsx",
  "src/components/research-figure-gallery.tsx",
  "src/components/final-evidence-matrix.tsx",
  "src/components/feature-formula-table.tsx",
  "src/components/feature-engineering-summary.tsx",
  "src/components/app-model-bridge-summary.tsx",
  "src/components/course-coverage-dashboard.tsx",
  "src/components/model-bridge-panel.tsx",
];

for (const file of requiredFiles) {
  if (fs.existsSync(path.join(root, file))) pass(`Required file exists: ${file}`);
  else fail(`Required file missing: ${file}`);
}

assertIncludes("package.json", "step40-1:full-language-sweep:qa", "Step 40.1 QA script is registered in package.json");

const phraseCopy = read("src/lib/i18n/ml-phrase-copy.ts");
const phraseRequirements = [
  ["Simple Linear Regression", "Проста линейна регресия"],
  ["Research foundation imported", "Методологичната основа е свързана"],
  ["Regression Coordinate System", "Координатна система за регресия"],
  ["Final ML evidence layer", "Финален слой с ML доказателства"],
  ["Linear Regression, Regularization and Testing", "Линейна регресия, регуляризация и тестване"],
  ["Age coordinate", "Координата за възраст"],
];
for (const [source, bg] of phraseRequirements) {
  if (phraseCopy.includes(source) && phraseCopy.includes(bg)) pass(`Phrase copy localizes: ${source}`);
  else fail(`Phrase copy missing localization for: ${source}`);
}

const localizedComponents = [
  "src/components/ml-research-summary.tsx",
  "src/components/model-evaluation-tables.tsx",
  "src/components/ml-experiment-grid.tsx",
  "src/components/research-figure-gallery.tsx",
  "src/components/final-evidence-matrix.tsx",
  "src/components/feature-formula-table.tsx",
  "src/components/feature-engineering-summary.tsx",
  "src/components/app-model-bridge-summary.tsx",
  "src/components/course-coverage-dashboard.tsx",
  "src/components/model-bridge-panel.tsx",
];

for (const file of localizedComponents) {
  assertIncludes(file, "localizeMlPhrase", `${file} uses the shared ML phrase localizer`);
}

assertIncludes("src/components/ml-research-summary.tsx", "localizeMlPhrase(mlFoundationSummary.status, language)", "Methodology summary localizes status card value");
assertIncludes("src/components/ml-research-summary.tsx", "localizeMlPhrase(asset.title, language)", "Methodology summary localizes asset titles");
assertIncludes("src/components/model-evaluation-tables.tsx", "localizeMlPhrase(result.model, language)", "Model tables localize model names");
assertIncludes("src/components/model-evaluation-tables.tsx", "localizeMlPhrase(result.geometry, language)", "Model tables localize geometry labels");
assertIncludes("src/components/research-figure-gallery.tsx", "localizeMlPhrase(figure.title, language)", "Research gallery localizes figure titles");
assertIncludes("src/components/final-evidence-matrix.tsx", "localizeMlPhrase(row.evidence, language)", "Final evidence matrix localizes evidence text");
assertIncludes("src/components/course-coverage-dashboard.tsx", "localizeMlPhrase(item.module, language)", "Course coverage localizes module titles");
assertIncludes("src/components/model-bridge-panel.tsx", "localizeMlPhrase(bridge.regression.modelName, language)", "Calculator model bridge localizes model names");

assertNotIncludes("src/components/ml-experiment-grid.tsx", "Unsupervised Learning групира", "Experiment grid no longer mixes English term in BG concept text");
assertNotIncludes("src/components/ml-research-summary.tsx", "value={mlFoundationSummary.status}", "Methodology summary no longer renders raw English status");
assertNotIncludes("src/components/ml-research-summary.tsx", "{asset.title}</p>", "Methodology summary no longer renders raw asset titles");
assertNotIncludes("src/components/research-figure-gallery.tsx", "{figure.title}</h3>", "Figure gallery no longer renders raw figure titles");
assertNotIncludes("src/components/final-evidence-matrix.tsx", "{row.evidence}</td>", "Final evidence matrix no longer renders raw evidence strings");

if (failed) {
  console.error("\nStep 40.1 full app language sweep QA FAIL");
  process.exit(1);
}

console.log("\nStep 40.1 full app language sweep QA PASS");
