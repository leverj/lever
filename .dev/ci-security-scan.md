# CI security scan (CircleCI)

Nightly deterministic security scan that runs the `leverj/security-scan` Docker
image against the checked-out tree and files deduplicated findings into
**GitHub Project #8** (`leverj/lever-security-issues`). Mirrors the ezel/gallery
setup, minus the Supabase lane (lever isn't Supabase-backed). Slack run-summaries
are enabled (`slack.enabled: true`) — they fire only when `SLACK_WEBHOOK_URL` is
present in the CI context (step 3 below); without it the scanner skips Slack.

LLM SAST (codex + claude) is configured separately in
`.security-scan/config-llm.yaml`, driven by the host-side `security-scan-llm` CLI
(`leverj:security-scan-llm` skill), filing into the same Project #8.

## How it's wired

`.circleci/config.yml` (the dynamic-config setup pipeline) defines:

- A `run-security-scan` **pipeline parameter** (default `false`).
- The `setup` workflow is gated `when: not run-security-scan` — normal pushes do
  path-filtering / per-package tests and are unaffected.
- A `security-scan` workflow gated `when: run-security-scan`, with one
  `security-scan` job on the **self-hosted mac mini** (`resource_class:
  leverj/macos`). Colima provides the Docker runtime; the job starts it if it
  isn't already up. It pulls `leverj/security-scan:latest` and runs it with
  `--repo-dir /work`, the repo's `.security-scan/` bind-mounted at `/config:ro`.
  This is the same runner ezel/gallery's nightly scans use.

The job reads `SECURITY_SCAN_TOKEN` from the **`ezel-security-scan`** context —
the same org-level (leverj) context ezel and gallery use. CircleCI contexts are
shared across an org's projects, so lever reuses it rather than duplicating the
secret; the PAT just needs lever repo + Project #8 access too. The scanner dedups
via fingerprints, so nightly runs only file *new* findings.

## Prerequisite: the self-hosted runner

This job targets the `leverj/macos` self-hosted runner (the mac mini). It must be
registered and online in CircleCI Self-Hosted Runners, with Homebrew + Colima +
Docker CLI installed under `/opt/homebrew/bin`. Same runner ezel/gallery use; if
their nightly scans run, lever's will too.

## One-time setup (cannot be done from the repo — do these once)

### 1. Reuse ezel's `ezel-security-scan` context — just widen the PAT

No new context needed. The pipeline references the existing org-level
`ezel-security-scan` context. Its `SECURITY_SCAN_TOKEN` (a GitHub PAT with
**`repo` + `project`** scope) must be able to write issues on `leverj/lever` and
items on **Project #8** in addition to ezel/gallery. If the PAT is fine-grained,
add `leverj/lever` to its repository access and grant the org Projects
permission; if it's classic with org-wide `repo` + `project`, it already covers
lever.

(No CircleCI changes for this step — it's purely a GitHub PAT scope update.)

### 2. Create the nightly scheduled pipeline

CircleCI scheduled pipelines are created via API/UI, not in-config. This one sets
`run-security-scan: true` on branch `main` once a day (02:00 UTC).

**Key gotcha:** `run-security-scan: true` MUST be in `parameters`. Without it the
pipeline runs the normal `setup` workflow, not the scan.

```bash
export CIRCLECI_TOKEN=<token from https://app.circleci.com/settings/user/tokens>
SLUG=gh/leverj/lever

# create the schedule (daily 02:00 UTC on main; runs as the token owner so it
# inherits their access to the ezel-security-scan context)
curl -sS -X POST "https://circleci.com/api/v2/project/$SLUG/schedule" \
  -H "Circle-Token: $CIRCLECI_TOKEN" -H "Content-Type: application/json" \
  -d '{
    "name": "nightly-security-scan",
    "description": "Nightly leverj/security-scan -> Project #8",
    "attribution-actor": "current",
    "parameters": { "branch": "main", "run-security-scan": true },
    "timetable": { "per-hour": 1, "hours-of-day": [2],
      "days-of-week": ["MON","TUE","WED","THU","FRI","SAT","SUN"] }
  }'

# verify
curl -sS -H "Circle-Token: $CIRCLECI_TOKEN" \
  "https://circleci.com/api/v2/project/$SLUG/schedule" | jq '.items[] | {name,timetable,parameters}'
```

**Test it now** (one scan run immediately, without waiting for 02:00 UTC):

```bash
curl -sS -X POST "https://circleci.com/api/v2/project/$SLUG/pipeline" \
  -H "Circle-Token: $CIRCLECI_TOKEN" -H "Content-Type: application/json" \
  -d '{ "branch": "main", "parameters": { "run-security-scan": true } }'
```

The `leverj/macos` runner (mac mini) must be **online** when the pipeline fires,
or the job queues until it is.

**UI alternative:** Project → *Project Settings → Triggers → Add Trigger →
Schedule*; set branch `main`, your cadence, and under *Pipeline parameters* add
`run-security-scan` = `true`. Same result — don't skip the parameter.

### 3. Slack run-summaries (`SLACK_WEBHOOK_URL`)

`config.yaml` has `slack.enabled: true`, and the `security-scan` job forwards
`-e SLACK_WEBHOOK_URL` into the container. To make summaries post, add a
`SLACK_WEBHOOK_URL` env var to the **`ezel-security-scan`** context (CircleCI →
*Organization Settings → Contexts → ezel-security-scan*). It's wired as
`${SLACK_WEBHOOK_URL:-}`, so until the var exists the job runs fine and just skips
Slack — no failed builds. (If ezel/gallery already set it on this shared context,
lever inherits it automatically.)

## Note on first-run volume

The initial backlog can be large. GitHub's secondary rate limit caps content
creation at ~500 issues/hour, so a big first filing may need two passes an hour
apart. After that, nightly runs only file deltas and stay well under the limit.
