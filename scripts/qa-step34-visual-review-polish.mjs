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

function assertIncludes(file, needle, message) {
  const source = read(file);
  if (source.includes(needle)) pass(message);
  else fail(`${message} вЂ” missing ${needle}`);
}

function assertNotIncludes(file, needle, message) {
  const source = read(file);
  if (!source.includes(needle)) pass(message);
  else fail(`${message} вЂ” still contains ${needle}`);
}

const packageJson = JSON.parse(read("package.json"));
if (packageJson.scripts?.["step34:visual-review-polish:qa"] === "node scripts/qa-step34-visual-review-polish.mjs") {
  pass("Step 34 QA script is registered in package.json");
} else {
  fail("Step 34 QA script is registered in package.json");
}

assertIncludes(
  "src/components/photo-guide-panel.tsx",
  "photoGuideCopy",
  "Photo guide has localized view and criteria copy",
);
assertIncludes(
  "src/components/photo-guide-panel.tsx",
  "copy.views[guide.viewType]",
  "Photo guide renders localized view cards",
);
assertIncludes(
  "src/components/photo-guide-panel.tsx",
  "copy.criteria[criterion.id]",
  "Photo guide renders localized comparison criteria",
);
assertIncludes(
  "src/components/photo-guide-panel.tsx",
  "usg-readable-card",
  "Photo guide keeps readability layout guard on cards",
);

assertIncludes(
  "src/components/visual-review-workspace.tsx",
  "readinessRuleCopy",
  "Readiness table has localized row copy",
);
assertNotIncludes(
  "src/components/visual-review-workspace.tsx",
  "{rule.label}",
  "Readiness table no longer renders raw English rule labels",
);
assertNotIncludes(
  "src/components/visual-review-workspace.tsx",
  "{rule.meaning}",
  "Readiness table no longer renders raw English rule meanings",
);
assertNotIncludes(
  "src/components/visual-review-workspace.tsx",
  "{rule.action}",
  "Readiness table no longer renders raw English rule actions",
);

assertIncludes(
  "src/components/photo-quality-gate-panel.tsx",
  "resultTextCopy",
  "Photo quality gate result text is localized",
);
assertIncludes(
  "src/components/photo-quality-gate-panel.tsx",
  "bandCopy",
  "Photo quality gate decision bands are localized",
);
assertIncludes(
  "src/components/photo-quality-gate-panel.tsx",
  "translated.modelSignal",
  "Photo quality gate model signals are localized",
);
assertNotIncludes(
  "src/components/photo-quality-gate-panel.tsx",
  "{issue.modelSignal}",
  "Photo quality gate no longer renders raw English model signals",
);
assertNotIncludes(
  "src/components/photo-quality-gate-panel.tsx",
  "{result.title}",
  "Photo quality gate no longer renders raw English result title",
);
assertNotIncludes(
  "src/components/photo-quality-gate-panel.tsx",
  "{result.summary}",
  "Photo quality gate no longer renders raw English result summary",
);
assertNotIncludes(
  "src/components/photo-quality-gate-panel.tsx",
  "{band.meaning}",
  "Photo quality gate no longer renders raw English band meaning",
);

assertIncludes(
  "src/components/geometry-overlay-comparison-panel.tsx",
  "permissionText",
  "Geometry overlay permission result is localized",
);
assertIncludes(
  "src/components/geometry-overlay-comparison-panel.tsx",
  "t.workflowSteps",
  "Geometry overlay workflow is localized",
);
assertIncludes(
  "src/components/geometry-overlay-comparison-panel.tsx",
  "t.stages[stage.id]",
  "Geometry overlay stage cards are localized",
);
assertIncludes(
  "src/components/geometry-overlay-comparison-panel.tsx",
  "t.ratios[ratio.id]",
  "Geometry overlay ratio labels and deltas are localized",
);
assertIncludes(
  "src/components/geometry-overlay-comparison-panel.tsx",
  "t.signals[ratio.signal]",
  "Geometry overlay signal badges are localized",
);
assertNotIncludes(
  "src/components/geometry-overlay-comparison-panel.tsx",
  "permission.title",
  "Geometry overlay no longer renders raw English permission title",
);
assertNotIncludes(
  "src/components/geometry-overlay-comparison-panel.tsx",
  "permission.description",
  "Geometry overlay no longer renders raw English permission description",
);
assertNotIncludes(
  "src/components/geometry-overlay-comparison-panel.tsx",
  "stage.title",
  "Geometry overlay no longer renders raw English stage titles",
);
assertNotIncludes(
  "src/components/geometry-overlay-comparison-panel.tsx",
  "stage.purpose",
  "Geometry overlay no longer renders raw English stage purposes",
);

const failed = checks.filter((check) => !check.ok);
if (failed.length > 0) {
  console.error(`\nStep 34 visual review polish QA FAIL (${failed.length} issue(s))`);
  process.exit(1);
}

console.log("\nStep 34 visual review polish QA PASS");

