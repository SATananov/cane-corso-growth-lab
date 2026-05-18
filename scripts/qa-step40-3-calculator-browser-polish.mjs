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
  "docs/qa/step40-3-calculator-browser-polish.md",
  "scripts/qa-step40-3-calculator-browser-polish.mjs",
  "src/lib/i18n/ml-phrase-copy.ts",
  "src/components/growth-formula-panel.tsx",
  "src/components/growth-intelligence-report.tsx",
  "scripts/qa-step40-2-browser-language-ux-cleanup.mjs",
  "README.md",
];

for (const file of requiredFiles) {
  if (fs.existsSync(path.join(root, file))) pass(`Required file exists: ${file}`);
  else fail(`Required file missing: ${file}`);
}

assertIncludes("package.json", "step40-3:calculator-browser-polish:qa", "Step 40.3 QA script is registered in package.json");
assertIncludes("README.md", "Step 40.3 — Calculator Browser Polish", "README documents Step 40.3 browser polish");
assertIncludes("README.md", "pnpm step40-3:calculator-browser-polish:qa", "README includes Step 40.3 verification command");

const phraseCopy = read("src/lib/i18n/ml-phrase-copy.ts");
const duplicateKeys = [...phraseCopy.matchAll(/^\s*"([^"]+)"\s*:/gm)].reduce((map, match) => {
  const key = match[1];
  map.set(key, (map.get(key) ?? 0) + 1);
  return map;
}, new Map());
const duplicates = [...duplicateKeys.entries()].filter(([, count]) => count > 1).map(([key]) => key);
if (duplicates.length === 0) pass("ML phrase dictionary has no duplicate keys");
else fail(`ML phrase dictionary has duplicate keys: ${duplicates.join(", ")}`);

const phraseRequirements = [
  ["Clustering treats the dog as a point in a multi-feature space.", "Групирането разглежда кучето"],
  ["Growth progress", "Прогрес на растежа"],
  ["Expected weight now", "Очаквано тегло сега"],
  ["Estimated adult weight", "Ориентировъчно тегло като възрастен"],
  ["A lightweight proportionality feature that prevents the app from reading weight alone.", "Лека пропорционална характеристика"],
  ["Used in feature engineering, clustering and PCA-style projection.", "Използва се при подготовка на характеристики"],
  ["Used to keep review-zone logic careful and non-diagnostic.", "недиагностична"],
];

for (const [source, bg] of phraseRequirements) {
  if (phraseCopy.includes(source) && phraseCopy.includes(bg)) pass(`Phrase copy covers calculator browser text: ${source}`);
  else fail(`Phrase copy missing calculator browser localization: ${source}`);
}

assertIncludes("src/components/growth-formula-panel.tsx", "localizeMlPhrase(row.label, language)", "Formula panel localizes evidence labels");
assertIncludes("src/components/growth-formula-panel.tsx", "localizeMlPhrase(row.meaning, language)", "Formula panel localizes evidence meanings");
assertIncludes("src/components/growth-formula-panel.tsx", "localizeMlPhrase(row.appUse, language)", "Formula panel localizes evidence app-use copy");
assertNotIncludes("src/components/growth-formula-panel.tsx", "<p className=\"text-sm font-semibold text-white\">{row.label}</p>", "Formula panel no longer renders raw evidence labels");
assertNotIncludes("src/components/growth-formula-panel.tsx", "<p className=\"mt-3 text-sm leading-6 text-stone-400\">{row.meaning}</p>", "Formula panel no longer renders raw evidence meanings");

assertIncludes("src/components/growth-intelligence-report.tsx", "mt-6 grid gap-4 md:grid-cols-2", "Explainability factors stay readable in calculator column");
assertNotIncludes("src/components/growth-intelligence-report.tsx", "2xl:grid-cols-4", "Explainability factors do not collapse into four narrow columns");
assertNotIncludes("src/components/growth-intelligence-report.tsx", "max-w-[70%]", "Explainability factor labels are no longer width-squeezed");
assertNotIncludes("src/components/growth-intelligence-report.tsx", "uppercase tracking-[0.12em]", "Explainability factor labels avoid vertical-looking uppercase tracking");

assertIncludes("scripts/qa-step40-2-browser-language-ux-cleanup.mjs", "no longer force too-narrow four-column layout", "Step 40.2 QA was aligned with the final layout fix");

if (failed) {
  console.error("\nStep 40.3 calculator browser polish QA FAIL");
  process.exit(1);
}

console.log("\nStep 40.3 calculator browser polish QA PASS");
