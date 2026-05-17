import fs from "node:fs";

const checks = [];

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function pass(message) {
  checks.push({ ok: true, message });
  console.log(`PASS ${message}`);
}

function fail(message) {
  checks.push({ ok: false, message });
  console.error(`FAIL ${message}`);
}

function assertFile(file, message) {
  if (fs.existsSync(file)) pass(message);
  else fail(`${message} — missing ${file}`);
}

function assertIncludes(file, needle, message) {
  const source = read(file);
  if (source.includes(needle)) pass(message);
  else fail(`${message} — missing ${needle}`);
}

const packageJson = JSON.parse(read("package.json"));
if (packageJson.scripts?.["step35:submission-docs:qa"] === "node scripts/qa-step35-submission-docs.mjs") {
  pass("Step 35 QA script is registered in package.json");
} else {
  fail("Step 35 QA script is registered in package.json");
}

assertFile("docs/submission/final-submission-guide.md", "Final submission guide exists");
assertFile("reports/final-submission-report.md", "Final submission report exists");
assertFile("docs/qa/step35-final-submission-documentation.md", "Step 35 QA documentation exists");
assertFile("notebooks/README.md", "Notebook README exists");

assertIncludes("README.md", "## Final submission snapshot", "README includes final submission snapshot");
assertIncludes("README.md", "pnpm step35:submission-docs:qa", "README includes Step 35 verification command");
assertIncludes("README.md", "## Step 35 — README + Final Submission Documentation", "README includes Step 35 documentation section");
assertIncludes("README.md", "not a veterinary diagnostic system", "README keeps veterinary safety boundary");

assertIncludes("docs/submission/final-submission-guide.md", "## What to submit", "Submission guide explains what to submit");
assertIncludes("docs/submission/final-submission-guide.md", "## Final verification commands", "Submission guide includes final verification commands");
assertIncludes("docs/submission/final-submission-guide.md", "## What the project does not claim", "Submission guide includes limitation section");
assertIncludes("docs/submission/final-submission-guide.md", "The project does not claim to diagnose a dog", "Submission guide keeps safe claim boundary");

assertIncludes("reports/final-submission-report.md", "## 4. Machine learning components", "Final report explains ML components");
assertIncludes("reports/final-submission-report.md", "## 7. Safety and ethics", "Final report includes safety and ethics");
assertIncludes("reports/final-submission-report.md", "## 9. Future work", "Final report includes future work");
assertIncludes("reports/final-submission-report.md", "Visual review is treated only as a readiness and similarity workflow", "Final report keeps visual safety boundary");

assertIncludes("notebooks/README.md", "11_visual_match_result_contract.ipynb", "Notebook README lists final visual contract notebook");
assertIncludes("notebooks/README.md", "The web app is the main presentation surface", "Notebook README explains app/notebook relationship");
assertIncludes("notebooks/README.md", "They do not produce veterinary diagnosis", "Notebook README keeps safety boundary");

const combinedDocs = [
  "README.md",
  "docs/submission/final-submission-guide.md",
  "reports/final-submission-report.md",
  "notebooks/README.md",
].map(read).join("\n").toLowerCase();

for (const forbidden of [
  "proves pedigree",
  "proves breed purity",
  "veterinary diagnosis system",
  "official breed certification from photo",
]) {
  if (!combinedDocs.includes(forbidden)) pass(`Documentation avoids unsafe absolute claim: ${forbidden}`);
  else fail(`Documentation avoids unsafe absolute claim: ${forbidden}`);
}


const failed = checks.filter((check) => !check.ok);
if (failed.length > 0) {
  console.error(`\nStep 35 submission documentation QA FAIL (${failed.length} issue(s))`);
  process.exit(1);
}

console.log("\nStep 35 submission documentation QA PASS");
