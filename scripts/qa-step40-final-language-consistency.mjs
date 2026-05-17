import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");

function pass(message) {
  console.log(`PASS ${message}`);
}

function fail(message) {
  console.error(`FAIL ${message}`);
  process.exitCode = 1;
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
  "docs/qa/step40-final-language-consistency.md",
  "scripts/qa-step40-final-language-consistency.mjs",
  "src/components/ml-research-summary.tsx",
  "src/components/neural-network-results-panel.tsx",
  "src/app/experiments/page.tsx",
  "src/components/app-model-bridge-summary.tsx",
  "src/components/dataset-acquisition-checklist-panel.tsx",
];

for (const file of requiredFiles) {
  if (fs.existsSync(file)) pass(`Required file exists: ${file}`);
  else fail(`Required file missing: ${file}`);
}

assertIncludes("package.json", "step40:language-consistency:qa", "Step 40 QA script is registered in package.json");

const sourceFiles = fs
  .readdirSync("src", { recursive: true })
  .filter((file) => file.endsWith(".ts") || file.endsWith(".tsx"))
  .map((file) => `src/${file}`);

const mojibakeNeedles = ["РЎ", "Рќ", "Рњ", "Р“", "Р”", "Р¤", "СЃ", "СЉ", "вЂ", "ГЁ", "RВІ"];
for (const file of sourceFiles) {
  const source = read(file);
  for (const needle of mojibakeNeedles) {
    if (source.includes(needle)) fail(`Visible source copy has mojibake in ${file}: ${needle}`);
  }
}
if (!process.exitCode) pass("Visible source copy has no mojibake markers");

const bgCopyGuards = [
  ["src/components/ml-research-summary.tsx", "Статус на методологията", "Methodology summary BG copy is readable"],
  ["src/components/ml-research-summary.tsx", "Jupyter тетрадките са свързани с приложението", "Methodology summary no longer renders corrupted notebook copy"],
  ["src/components/ml-research-summary.tsx", "R²", "Methodology summary uses correct R² symbol"],
  ["src/components/neural-network-results-panel.tsx", "Стъпка 36 добавя обучен MLP прототип на невронна мрежа", "Neural panel BG description avoids raw English prototype wording"],
  ["src/components/neural-network-results-panel.tsx", "обучаващи реда", "Neural panel BG train label is localized"],
  ["src/components/neural-network-results-panel.tsx", "Текущи метрики от обучението", "Neural panel BG metrics title is localized"],
  ["src/components/neural-network-results-panel.tsx", "Матрица на объркванията", "Neural panel BG confusion matrix title is localized"],
  ["src/components/neural-network-results-panel.tsx", "Снимковите невронни мрежи остават бъдеща работа", "Neural panel BG future-work line is localized"],
  ["src/app/experiments/page.tsx", "пространство от характеристики", "Experiments workflow BG feature-space copy is localized"],
  ["src/app/experiments/page.tsx", "доказателствата от Jupyter тетрадките", "Experiments workflow BG notebook/browser copy is localized"],
  ["src/components/app-model-bridge-summary.tsx", "браузърната логика остава бърза", "Bridge panel BG browser copy is localized"],
  ["src/components/course-coverage-dashboard.tsx", "проследяване на експерименти", "Course page BG tracking copy is localized"],
  ["src/components/dataset-acquisition-checklist-panel.tsx", "проверим опис", "Dataset acquisition BG manifest copy is localized"],
  ["src/components/visual-match-result-contract-panel.tsx", "проверка за качество", "Visual match BG quality gate copy is localized"],
  ["src/components/vision-dataset-readiness-panel.tsx", "визуалният ML процес", "Vision readiness BG pipeline copy is localized"],
];

for (const [file, needle, message] of bgCopyGuards) {
  assertIncludes(file, needle, message);
}

const forbiddenVisibleNeedles = [
  ["src/components/ml-research-summary.tsx", "РЎС"],
  ["src/components/ml-research-summary.tsx", "RВІ"],
  ["src/components/neural-network-results-panel.tsx", "Step 36 добавя"],
  ["src/components/neural-network-results-panel.tsx", "train реда"],
  ["src/components/neural-network-results-panel.tsx", "Текущи training метрики"],
  ["src/components/neural-network-results-panel.tsx", "Confusion matrix"],
  ["src/components/neural-network-results-panel.tsx", "Image neural networks остават future work"],
  ["src/app/experiments/page.tsx", "feature пространство"],
  ["src/app/experiments/page.tsx", "browser слоя"],
  ["src/components/app-model-bridge-summary.tsx", "app-а"],
  ["src/components/app-model-bridge-summary.tsx", "browser логиката"],
  ["src/components/dataset-acquisition-checklist-panel.tsx", "Невронните visual модели остават not ready for training"],
  ["src/components/dataset-acquisition-checklist-panel.tsx", "реалните image rows"],
  ["src/components/visual-match-result-contract-panel.tsx", "снимката мине quality gate"],
];

for (const [file, needle] of forbiddenVisibleNeedles) {
  assertNotIncludes(file, needle, `${file} no longer includes mixed visible copy: ${needle}`);
}

assertIncludes("src/components/neural-network-results-panel.tsx", "не е ветеринарна диагноза", "Neural panel keeps veterinary safety boundary");
assertIncludes("src/components/neural-network-results-panel.tsx", "не е официална Cane Corso сертификация", "Neural panel keeps certification safety boundary");
assertIncludes("src/components/neural-network-results-panel.tsx", "не е породен класификатор, базиран на снимки", "Neural panel keeps image-classifier boundary in BG");

if (process.exitCode) process.exit(process.exitCode);
console.log("\nStep 40 final language consistency QA PASS");
