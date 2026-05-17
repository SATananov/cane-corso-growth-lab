import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

function pass(message) {
  console.log(`PASS ${message}`);
}

function fail(message) {
  failures.push(message);
  console.error(`FAIL ${message}`);
}

function expectContains(path, text, message) {
  const content = read(path);
  if (content.includes(text)) pass(message);
  else fail(`${message} (${path})`);
}

function expectNotContains(path, text, message) {
  const content = read(path);
  if (!content.includes(text)) pass(message);
  else fail(`${message} (${path})`);
}

const dictionaries = read("src/lib/i18n/dictionaries.ts");
const enSection = dictionaries.slice(dictionaries.indexOf("  en: {"), dictionaries.indexOf("  bg: {"));
const itSection = dictionaries.slice(dictionaries.indexOf("  it: {"), dictionaries.indexOf("\n} as const"));

if (/[А-Яа-яЁё]/.test(enSection)) fail("EN dictionary must not contain Cyrillic copy");
else pass("EN dictionary has no Cyrillic copy");

if (/[А-Яа-яЁё]/.test(itSection)) fail("IT dictionary must not contain Cyrillic copy");
else pass("IT dictionary has no Cyrillic copy");

expectContains("src/app/visual-review/page.tsx", '<PageHero copyKey="visualReview" />', "Visual Review page uses localized PageHero copy");
expectNotContains("src/app/visual-review/page.tsx", 'eyebrow="Visual ML"', "Visual Review page has no hardcoded hero eyebrow");
expectNotContains("src/app/visual-review/page.tsx", 'title="Photo guide', "Visual Review page has no hardcoded hero title");

for (const path of [
  "src/components/dataset-overview-card.tsx",
  "src/components/demo-image-set-plan-panel.tsx",
  "src/components/growth-cluster-overview.tsx",
  "src/components/mlflow-tracking-panel.tsx",
  "src/components/pca-experiment-panel.tsx",
  "src/components/photo-readiness-model-panel.tsx",
  "src/components/visual-breed-classifier-panel.tsx",
  "src/components/visual-similarity-panel.tsx",
]) {
  const content = read(path);
  if (content.includes("useLanguage")) pass(`${path} is language-aware`);
  else fail(`${path} must be language-aware`);

  if (content.includes("usg-readable-card")) pass(`${path} uses readable-card layout guard`);
  else fail(`${path} must use readable-card layout guard`);
}

expectContains("scripts/ml/run_mlflow_tracking_demo.py", 'Printing tracking payload instead.\\n', "MLflow tracking demo string is escaped correctly");
expectContains("scripts/ml/create_public_sample.py", "parents[2]", "Public sample script resolves project root correctly");
expectContains("scripts/ml/create_classification_sample.py", "parents[2]", "Classification sample script resolves project root correctly");

for (const path of [
  "src/components/dataset-overview-card.tsx",
  "src/components/visual-breed-classifier-panel.tsx",
  "src/components/visual-similarity-panel.tsx",
]) {
  const content = read(path);
  for (const token of ["Rows", "Columns", "Input:", "Output:", "Safety principles"]) {
    if (content.includes(`>${token}<`) || content.includes(`>${token}`) || content.includes(`${token}</span>`)) {
      fail(`${path} still contains direct hardcoded label: ${token}`);
    }
  }
}

if (failures.length > 0) {
  console.error(`\nStep 33.4 language/layout QA failed with ${failures.length} issue(s).`);
  process.exit(1);
}

console.log("\nStep 33.4 language/layout QA PASS");
