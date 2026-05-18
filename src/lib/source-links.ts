export const githubSourceBaseUrl = "https://github.com/SATananov/cane-corso-growth-lab/blob/main";

export function buildGitHubSourceUrl(path: string) {
  const normalizedPath = path.replace(/^\.\//, "").replace(/\\/g, "/");
  return `${githubSourceBaseUrl}/${normalizedPath.split("/").map(encodeURIComponent).join("/")}`;
}
