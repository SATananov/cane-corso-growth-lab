import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

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
  else fail(`${message} — missing ${needle} in ${file}`);
}

function assertNotIncludes(file, needle, message) {
  const source = read(file);
  if (!source.includes(needle)) pass(message);
  else fail(`${message} — unexpected ${needle} in ${file}`);
}

function assertRegex(file, regex, message) {
  const source = read(file);
  if (regex.test(source)) pass(message);
  else fail(`${message} — pattern ${regex} not found in ${file}`);
}

function assertFile(file, message) {
  if (fs.existsSync(path.join(root, file))) pass(message);
  else fail(`${message} — missing ${file}`);
}

assertFile("src/lib/source-links.ts", "Shared GitHub source-link helper exists");
assertIncludes("src/lib/source-links.ts", "https://github.com/SATananov/cane-corso-growth-lab/blob/main", "Source-link helper uses the GitHub repository URL");
assertIncludes("src/lib/source-links.ts", "encodeURIComponent", "Source-link helper safely encodes path segments");

assertIncludes("src/components/ml-research-summary.tsx", "buildGitHubSourceUrl", "Methodology asset cards use GitHub source links");
assertRegex("src/components/ml-research-summary.tsx", /target=\"_blank\"[\s\S]*rel=\"noreferrer\"/, "Methodology asset links open safely in a new tab");
assertIncludes("src/components/ml-research-summary.tsx", "Отвори файла", "Methodology asset cards include Bulgarian open action");
assertIncludes("src/components/ml-research-summary.tsx", "hover:border-amber-300/45", "Methodology asset cards have clickable hover styling");
assertNotIncludes("src/components/ml-research-summary.tsx", "<article key={asset.path} className=\"rounded-2xl border border-stone-700 bg-black/25 p-4\">", "Static asset card block was replaced by clickable evidence cards");

assertIncludes("src/components/dataset-overview-card.tsx", "buildGitHubSourceUrl(dataset.path)", "Dataset overview cards link dataset paths to GitHub");
assertIncludes("src/components/dataset-overview-card.tsx", "Отвори данните", "Dataset overview cards include Bulgarian open dataset action");
assertRegex("src/components/dataset-overview-card.tsx", /aria-label=\{`\$\{t\.openDataset\}: \$\{dataset\.path\}`\}/, "Dataset source links include accessible labels");

assertIncludes("src/components/research-figure-gallery.tsx", "buildGitHubSourceUrl(figure.sourcePath)", "Research figure gallery links source figures to GitHub");
assertIncludes("src/components/research-figure-gallery.tsx", "Отвори фигурата", "Research figure gallery includes Bulgarian open figure action");
assertRegex("src/components/research-figure-gallery.tsx", /target=\"_blank\"[\s\S]*rel=\"noreferrer\"/, "Figure links open safely in a new tab");

assertIncludes("src/components/neural-network-results-panel.tsx", "buildGitHubSourceUrl(path)", "Neural-network evidence files use GitHub source links");
assertIncludes("src/components/neural-network-results-panel.tsx", "Отвори файла", "Neural-network evidence files include Bulgarian open action");
assertIncludes("src/components/neural-network-results-panel.tsx", "notebooks/12_tabular_neural_network_growth_prediction.ipynb", "Step 36 notebook evidence is linked");
assertIncludes("src/components/neural-network-results-panel.tsx", "reports/neural-network-growth-prototype-results.json", "Step 36 metrics JSON evidence is linked");
assertNotIncludes("src/components/neural-network-results-panel.tsx", "<p className=\"text-sm font-semibold text-amber-100\">{t.metricsTitle}</p>\n          <p className=\"text-sm font-semibold text-amber-100\">{t.metricsTitle}</p>", "Duplicate neural-network metrics title is not present");

assertIncludes("package.json", "step41:clickable-evidence:qa", "Step 41 QA script is registered in package.json");
assertFile("docs/qa/step41-clickable-evidence-cards.md", "Step 41 QA documentation exists");

if (!process.exitCode) {
  console.log("\nStep 41 clickable evidence cards QA PASS");
}
