import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
let failed = false;

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function exists(file) {
  return fs.existsSync(path.join(root, file));
}

function pass(message) {
  console.log(`PASS ${message}`);
}

function fail(message) {
  failed = true;
  console.error(`FAIL ${message}`);
}

function assert(condition, message) {
  if (condition) pass(message);
  else fail(message);
}

function assertIncludes(file, needle, message) {
  assert(read(file).includes(needle), message);
}

function assertNotIncludes(file, needle, message) {
  assert(!read(file).includes(needle), message);
}

const packageJson = JSON.parse(read("package.json"));

assert(
  packageJson.scripts?.["step44:owner-visual-summary:qa"] ===
    "node scripts/qa-step44-owner-visual-result-summary.mjs",
  "Step 44 QA script is registered in package.json",
);

assert(exists("src/components/owner-growth-result-panel.tsx"), "Owner visual result panel exists");
assert(exists("docs/qa/step44-owner-visual-result-summary.md"), "Step 44 QA documentation exists");

assertIncludes(
  "src/components/dog-growth-calculator.tsx",
  "OwnerGrowthResultPanel prediction={prediction}",
  "Calculator renders owner visual result summary before technical details",
);
assertIncludes(
  "src/components/dog-growth-calculator.tsx",
  "data-owner-technical-details",
  "Calculator groups technical evidence behind an owner-friendly disclosure",
);
assertIncludes(
  "src/components/dog-growth-calculator.tsx",
  "OwnerTechnicalDetailsIntro",
  "Calculator keeps technical explanation discoverable",
);

const panel = "src/components/owner-growth-result-panel.tsx";
assertIncludes(panel, "Крива на растежа", "Panel includes Bulgarian growth chart title");
assertIncludes(panel, "Първо виж простата картина на растежа", "Panel gives simple Bulgarian owner framing");
assertIncludes(panel, "Основни изводи", "Panel includes Bulgarian key takeaways section");
assertIncludes(panel, "Препоръчителна следваща стъпка", "Panel includes Bulgarian next-action section");
assertIncludes(panel, "спокойна референтна зона", "Panel explains the reference band in Bulgarian");
assertIncludes(panel, "Growth curve view", "Panel includes English chart copy");
assertIncludes(panel, "Vista curva di crescita", "Panel includes Italian chart copy");
assertIncludes(panel, "<svg", "Panel renders a visual chart instead of only numbers");
assertIncludes(panel, "<polygon points={calmBand}", "Panel renders a calm reference band");
assertIncludes(panel, "<polyline points={expectedLine}", "Panel renders the expected growth curve");
assertIncludes(panel, "circle cx={dogX}", "Panel renders the current dog point");
assertIncludes(panel, "formatStableInteger", "Panel uses hydration-stable formatting");
assertNotIncludes(panel, ".toLocaleString()", "Panel avoids hydration-sensitive toLocaleString calls");
assertIncludes(panel, "не е ветеринарна диагноза", "Panel keeps veterinary safety boundary in Bulgarian");
assertIncludes(panel, "не е официална сертификация", "Panel keeps certification safety boundary in Bulgarian");
assertIncludes(panel, "не е доказателство за родословие", "Panel keeps pedigree-proof boundary in Bulgarian");
assertIncludes(panel, "not a veterinary diagnosis", "Panel keeps English veterinary safety boundary");
assertIncludes(panel, "non è una diagnosi veterinaria", "Panel keeps Italian veterinary safety boundary");
assertNotIncludes(panel, "proves breed purity", "Panel avoids unsafe breed-proof claim wording");
assertNotIncludes(panel, "diagnoses health", "Panel avoids diagnostic claim wording");

assertIncludes("README.md", "Step 44", "README includes Step 44 section");
assertIncludes(
  "docs/submission/final-submission-guide.md",
  "Step 44",
  "Final submission guide includes Step 44 presentation guidance",
);
assertIncludes(
  "reports/final-submission-report.md",
  "Step 44",
  "Final report records Step 44 owner visual summary",
);

if (failed) {
  console.error("\nStep 44 owner visual result summary QA FAIL");
  process.exit(1);
}

console.log("\nStep 44 owner visual result summary QA PASS");
