import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

function readJsonIfExists(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
}

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
}

function appendGithubOutput(line) {
  const outputPath = process.env.GITHUB_OUTPUT;
  if (!outputPath) return;
  fs.appendFileSync(outputPath, line + "\n");
}

function runGhJson(args) {
  const stdout = execFileSync("gh", args, { encoding: "utf8" });
  return JSON.parse(stdout);
}

function stableJson(value) {
  return JSON.stringify(value, Object.keys(value).sort());
}

const prRepo = process.env.PR_REPO || "santifer/career-ops";
const prNumber = process.env.PR_NUMBER || "591";
const statePath = process.env.STATE_PATH || ".cache/pr591/state.json";
const htmlPath = process.env.HTML_PATH || ".cache/pr591/email.html";
const alwaysSend = (process.env.ALWAYS_SEND || "").toLowerCase() === "true";

const pr = runGhJson([
  "pr",
  "view",
  prNumber,
  "--repo",
  prRepo,
  "--json",
  [
    "number",
    "state",
    "title",
    "url",
    "author",
    "baseRefName",
    "headRefName",
    "headRepository",
    "mergeable",
    "reviewDecision",
    "statusCheckRollup",
    "updatedAt",
    "mergedAt",
    "closedAt",
  ].join(","),
]);

const checks = Array.isArray(pr.statusCheckRollup) ? pr.statusCheckRollup : [];
const failingChecks = checks
  .filter((c) => {
    const conclusion = (c?.conclusion || "").toLowerCase();
    const status = (c?.status || "").toLowerCase();
    if (!status) return false;
    if (status !== "completed") return true;
    if (!conclusion) return false;
    return conclusion !== "success" && conclusion !== "skipped" && conclusion !== "neutral";
  })
  .map((c) => ({
    name: c?.name || c?.context || "unknown",
    status: c?.status || null,
    conclusion: c?.conclusion || null,
    detailsUrl: c?.detailsUrl || null,
  }));

const snapshot = {
  repo: prRepo,
  number: pr.number,
  state: pr.state,
  title: pr.title,
  url: pr.url,
  updatedAt: pr.updatedAt,
  mergedAt: pr.mergedAt,
  closedAt: pr.closedAt,
  mergeable: pr.mergeable,
  reviewDecision: pr.reviewDecision,
  baseRefName: pr.baseRefName,
  headRefName: pr.headRefName,
  headRepository: pr.headRepository?.nameWithOwner || null,
  failingChecks,
};

const prev = readJsonIfExists(statePath);
const changed = !prev || stableJson(prev) !== stableJson(snapshot);
const sendEmail = alwaysSend || changed;

const subject = `[career-ops] PR #${snapshot.number} ${snapshot.state}: ${snapshot.title}`;

fs.mkdirSync(path.dirname(htmlPath), { recursive: true });
fs.writeFileSync(
  htmlPath,
  `<!doctype html>
<html>
  <body style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
    <h2>career-ops PR monitor</h2>
    <p><b>PR:</b> <a href="${snapshot.url}">#${snapshot.number} ${snapshot.title}</a></p>
    <ul>
      <li><b>State:</b> ${snapshot.state}</li>
      <li><b>Mergeable:</b> ${snapshot.mergeable ?? "unknown"}</li>
      <li><b>Review decision:</b> ${snapshot.reviewDecision ?? "unknown"}</li>
      <li><b>Updated:</b> ${snapshot.updatedAt ?? "unknown"}</li>
      <li><b>Base:</b> ${snapshot.baseRefName ?? "unknown"}</li>
      <li><b>Head:</b> ${snapshot.headRepository ?? "unknown"}:${snapshot.headRefName ?? "unknown"}</li>
    </ul>
    <h3>Failing checks (${snapshot.failingChecks.length})</h3>
    ${
      snapshot.failingChecks.length === 0
        ? "<p>None 🎉</p>"
        : `<ul>${snapshot.failingChecks
            .map(
              (c) =>
                `<li><b>${c.name}</b> — ${c.status ?? "unknown"} / ${c.conclusion ?? "unknown"}${
                  c.detailsUrl ? ` — <a href="${c.detailsUrl}">details</a>` : ""
                }</li>`,
            )
            .join("")}</ul>`
    }
    <p style="color: #666; font-size: 12px;">Sent by GitHub Actions from ${process.env.GITHUB_REPOSITORY || "unknown"}.</p>
  </body>
</html>
`,
);

if (sendEmail) {
  writeJson(statePath, snapshot);
}

appendGithubOutput(`send_email=${sendEmail ? "true" : "false"}`);
appendGithubOutput(`subject=${subject}`);
appendGithubOutput(`html_path=${htmlPath}`);

