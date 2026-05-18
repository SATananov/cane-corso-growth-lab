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
  "docs/qa/step40-2-browser-language-ux-cleanup.md",
  "scripts/qa-step40-2-browser-language-ux-cleanup.mjs",
  "src/lib/i18n/ml-phrase-copy.ts",
  "src/components/breed-reference-geometry-panel.tsx",
  "src/components/feature-vector-panel.tsx",
  "src/components/growth-intelligence-report.tsx",
  "src/components/growth-cluster-panel.tsx",
  "src/components/pca-growth-map.tsx",
];

for (const file of requiredFiles) {
  if (fs.existsSync(path.join(root, file))) pass(`Required file exists: ${file}`);
  else fail(`Required file missing: ${file}`);
}

assertIncludes("package.json", "step40-2:browser-language-ux:qa", "Step 40.2 QA script is registered in package.json");

const phraseCopy = read("src/lib/i18n/ml-phrase-copy.ts");
const ageBucketCount = [...phraseCopy.matchAll(/"Age bucket"\s*:/g)].length;
if (ageBucketCount === 1) pass("ML phrase dictionary has only one Age bucket key");
else fail(`ML phrase dictionary has duplicate Age bucket keys: ${ageBucketCount}`);

const phraseRequirements = [
  ["The dog is still growing, so adult reference ranges are shown as orientation only.", "Кучето още расте"],
  ["Current weight should be interpreted together with age, growth curve and body condition.", "Текущото тегло трябва"],
  ["Use this layer as adult reference context.", "Използвай този слой"],
  ["Sex encoded", "Кодиран пол"],
  ["A categorical feature that makes the growth stage easier to explain.", "Категорийна характеристика"],
  ["This 2D projection compresses the engineered feature vector", "Тази 2D проекция"],
  ["Balanced arc", "Балансирана крива"],
  ["Condition review", "Преглед на кондицията"],
];

for (const [source, bg] of phraseRequirements) {
  if (phraseCopy.includes(source) && phraseCopy.includes(bg)) pass(`Phrase copy covers browser text: ${source}`);
  else fail(`Phrase copy missing browser text localization: ${source}`);
}

assertIncludes("src/components/breed-reference-geometry-panel.tsx", "localizeMlPhrase(evaluation.heightMessage, language)", "Reference geometry localizes height messages");
assertIncludes("src/components/breed-reference-geometry-panel.tsx", "localizeMlPhrase(evaluation.weightMessage, language)", "Reference geometry localizes weight messages");
assertIncludes("src/components/breed-reference-geometry-panel.tsx", "localizeMlPhrase(evaluation.readinessNote, language)", "Reference geometry localizes readiness note");
assertIncludes("src/components/breed-reference-geometry-panel.tsx", "t.ageStages[evaluation.ageStage]", "Reference geometry localizes age stage values");
assertNotIncludes("src/components/breed-reference-geometry-panel.tsx", "{evaluation.heightMessage}", "Reference geometry no longer renders raw height message");
assertNotIncludes("src/components/breed-reference-geometry-panel.tsx", "{evaluation.weightMessage}", "Reference geometry no longer renders raw weight message");
assertNotIncludes("src/components/breed-reference-geometry-panel.tsx", "{evaluation.readinessNote}", "Reference geometry no longer renders raw readiness note");
assertNotIncludes("src/components/breed-reference-geometry-panel.tsx", "· tolerance", "Reference geometry no longer hardcodes English tolerance label");

assertIncludes("src/components/feature-vector-panel.tsx", "localizeMlPhrase(feature.label, language)", "Feature vector localizes feature labels");
assertIncludes("src/components/feature-vector-panel.tsx", "localizeMlPhrase(feature.explanation, language)", "Feature vector localizes explanations");
assertIncludes("src/components/feature-vector-panel.tsx", "featureVector.featureContract.map", "Feature vector localizes contract list");
assertNotIncludes("src/components/feature-vector-panel.tsx", "t.featureLabels[feature.label]", "Feature vector no longer depends on incomplete local label map");

assertIncludes("src/components/pca-growth-map.tsx", "localizeMlPhrase(projection.interpretation, language)", "PCA panel localizes interpretation");
assertIncludes("src/components/pca-growth-map.tsx", "localizeMlPhrase(point.label, language)", "PCA SVG localizes point labels");
assertIncludes("src/components/pca-growth-map.tsx", "localizeMlPhrase(projection.nearestReference.label, language)", "PCA panel localizes nearest reference label");

assertIncludes("src/components/growth-cluster-panel.tsx", "localizeMlPhrase(label, language)", "Growth cluster falls back to shared phrase localization");
assertIncludes("src/components/growth-cluster-panel.tsx", "localizeMlPhrase(cluster.geometryNote, language)", "Growth cluster localizes geometry note");

assertIncludes("src/components/growth-intelligence-report.tsx", "mt-6 grid gap-4 md:grid-cols-2", "Explainability factors use readable two-column layout");
assertNotIncludes("src/components/growth-intelligence-report.tsx", "2xl:grid-cols-4", "Explainability factors no longer force too-narrow four-column layout");
assertNotIncludes("src/components/growth-intelligence-report.tsx", "max-w-[70%]", "Explainability factor labels no longer squeeze into narrow width");

if (failed) {
  console.error("\nStep 40.2 browser language and calculator UX cleanup QA FAIL");
  process.exit(1);
}

console.log("\nStep 40.2 browser language and calculator UX cleanup QA PASS");
