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

function assert(condition, message) {
  if (condition) pass(message);
  else fail(message);
}

function assertIncludes(file, needle, message) {
  const source = read(file);
  assert(source.includes(needle), message);
}

function assertNotIncludes(file, needle, message) {
  const source = read(file);
  assert(!source.includes(needle), message);
}

const packageJson = JSON.parse(read("package.json"));

assert(
  packageJson.scripts?.["step43:owner-journey:qa"] ===
    "node scripts/qa-step43-owner-journey-mode.mjs",
  "Step 43 QA script is registered in package.json",
);

assert(exists("src/components/owner-journey-panel.tsx"), "Owner journey panel exists");
assert(exists("docs/qa/step43-owner-journey-mode.md"), "Step 43 QA documentation exists");
assert(exists("scripts/qa-step43-owner-journey-mode.mjs"), "Step 43 QA script exists");

assertIncludes(
  "src/components/app-shell.tsx",
  "<OwnerJourneyPanel />",
  "Home page includes full owner journey panel",
);
assertIncludes(
  "src/app/calculator/page.tsx",
  "<OwnerJourneyPanel compact />",
  "Calculator page includes compact owner journey panel",
);
assertIncludes(
  "src/components/owner-journey-panel.tsx",
  "href=\"/calculator#growth-calculator\"",
  "Owner journey primary CTA links to calculator anchor",
);
assertIncludes(
  "src/components/owner-journey-panel.tsx",
  "href=\"/visual-review\"",
  "Owner journey includes visual-review CTA",
);
assertIncludes(
  "src/components/owner-journey-panel.tsx",
  "href=\"/experiments\"",
  "Owner journey includes evidence CTA",
);
assertIncludes(
  "src/components/owner-journey-panel.tsx",
  "Have a Cane Corso? Start here.",
  "Owner journey includes English copy",
);
assertIncludes(
  "src/components/owner-journey-panel.tsx",
  "Имаш Cane Corso? Започни оттук.",
  "Owner journey includes Bulgarian copy",
);
assertIncludes(
  "src/components/owner-journey-panel.tsx",
  "Hai un Cane Corso? Inizia da qui.",
  "Owner journey includes Italian copy",
);
assertIncludes(
  "src/components/owner-journey-panel.tsx",
  "useLanguage",
  "Owner journey is language-aware",
);
assertIncludes(
  "src/components/owner-journey-panel.tsx",
  "usg-readable-card",
  "Owner journey uses readable-card layout guard",
);
assertIncludes(
  "src/components/owner-journey-panel.tsx",
  "not a veterinary diagnosis",
  "Owner journey keeps veterinary safety boundary",
);
assertIncludes(
  "src/components/owner-journey-panel.tsx",
  "не поставя ветеринарна диагноза",
  "Owner journey keeps Bulgarian safety boundary",
);
assertIncludes(
  "src/components/owner-journey-panel.tsx",
  "non certifica un Cane Corso",
  "Owner journey keeps Italian certification boundary",
);
assertNotIncludes(
  "src/components/owner-journey-panel.tsx",
  "proves breed purity",
  "Owner journey avoids unsafe breed-proof wording",
);
assertNotIncludes(
  "src/components/owner-journey-panel.tsx",
  "diagnoses health",
  "Owner journey avoids diagnostic claim wording",
);
assertIncludes("README.md", "Step 43 — First-Time User Journey & Owner Mode", "README includes Step 43 section");
assertIncludes("README.md", "pnpm step43:owner-journey:qa", "README includes Step 43 command");
assertIncludes(
  "docs/submission/final-submission-guide.md",
  "Step 43 — Owner Journey Review",
  "Submission guide includes Step 43 owner review",
);
assertIncludes(
  "reports/final-submission-report.md",
  "Step 43 — First-Time User Journey & Owner Mode",
  "Final report includes Step 43 owner mode",
);
assertIncludes(
  "docs/qa/step43-owner-journey-mode.md",
  "must not change",
  "Step 43 QA documentation records locked boundaries",
);

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log("\nStep 43 owner journey mode QA PASS");
