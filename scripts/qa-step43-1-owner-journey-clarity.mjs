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
  packageJson.scripts?.["step43-1:owner-journey-clarity:qa"] ===
    "node scripts/qa-step43-1-owner-journey-clarity.mjs",
  "Step 43.1 QA script is registered in package.json",
);

assert(exists("src/components/owner-journey-panel.tsx"), "Owner journey panel exists");
assert(exists("docs/qa/step43-1-owner-journey-clarity.md"), "Step 43.1 QA documentation exists");

assertIncludes(
  "src/components/owner-journey-panel.tsx",
  "Имаш Cane Corso? Започни оттук.",
  "Owner journey has direct Bulgarian owner title",
);
assertIncludes(
  "src/components/owner-journey-panel.tsx",
  "Какво правиш първо",
  "Owner journey has simple first-action section",
);
assertIncludes(
  "src/components/owner-journey-panel.tsx",
  "1. Отвори калкулатора",
  "Owner journey tells user to open calculator first",
);
assertIncludes(
  "src/components/owner-journey-panel.tsx",
  "2. Въведи реални измервания",
  "Owner journey tells user to enter real measurements",
);
assertIncludes(
  "src/components/owner-journey-panel.tsx",
  "3. Прочети следващото действие",
  "Owner journey tells user to read next action",
);
assertIncludes(
  "src/components/owner-journey-panel.tsx",
  "Отвори доказателствата само при нужда",
  "Owner journey separates owner path from evidence pages",
);
assertIncludes(
  "src/components/owner-journey-panel.tsx",
  "Започни проверка на растежа",
  "Owner journey primary CTA is clear",
);
assertIncludes(
  "src/components/owner-journey-panel.tsx",
  "Доказателства за модела",
  "Owner journey evidence CTA is clear",
);
assertIncludes(
  "src/components/owner-journey-panel.tsx",
  "не поставя ветеринарна диагноза",
  "Owner journey keeps Bulgarian veterinary boundary",
);
assertIncludes(
  "src/components/owner-journey-panel.tsx",
  "it does not certify a Cane Corso",
  "Owner journey keeps English certification boundary",
);
assertIncludes(
  "src/components/owner-journey-panel.tsx",
  "non certifica un Cane Corso",
  "Owner journey keeps Italian certification boundary",
);
assertIncludes(
  "src/components/owner-journey-panel.tsx",
  "quickCards",
  "Owner journey includes quick action cards",
);
assertIncludes(
  "src/components/owner-journey-panel.tsx",
  "href=\"/calculator#growth-calculator\"",
  "Owner journey primary CTA still links to calculator anchor",
);
assertNotIncludes(
  "src/components/owner-journey-panel.tsx",
  "Какво става, ако използвам приложението като собственик?",
  "Owner journey no longer uses unclear Bulgarian title",
);
assertNotIncludes(
  "src/components/owner-journey-panel.tsx",
  "diagnoses health",
  "Owner journey avoids diagnostic claim wording",
);
assertNotIncludes(
  "src/components/owner-journey-panel.tsx",
  "proves breed purity",
  "Owner journey avoids breed-proof wording",
);

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log("\nStep 43.1 owner journey clarity QA PASS");
