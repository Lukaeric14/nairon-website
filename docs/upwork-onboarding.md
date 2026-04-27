# Upwork Proposal System — New User Onboarding

This guide takes you from zero to "I can draft a Nairon Upwork proposal and log it to the team tracker."

Estimated time: **15–25 minutes** (most of it waiting for one Homebrew install).

---

## What you'll have when you're done

- A local clone of `nairon-website` with the Upwork knowledge base
- The `google-sheets` MCP server running locally, authenticated to the team's shared `Official Upwork Tracker`
- Two project-scoped Claude Code skills available inside this repo:
  - `upwork-proposal` — drafts proposals from the knowledge base in Luka's voice
  - `upwork-pipeline` — reads/writes the team tracker
- Every proposal you draft auto-saves to `knowledge-base/upwork-proposals/drafts/` for the team's A/B-testable corpus

---

## Prerequisites

Before you start, confirm you have these on your Mac. If any are missing, install them first.

```bash
# Should print versions, not "command not found"
git --version
bun --version          # or install: curl -fsSL https://bun.sh/install | bash
claude --version       # Claude Code CLI
brew --version
```

You'll also install `uv` in Step 3.

You also need:

- A **GitHub** account with access to `Nairon-AI/nairon-website`
- A **1Password** invite to the Nairon vault (or another secure channel where Luka shares the service account JSON)
- A **Google account** that can be added to the team's shared Drive folder (so you can view the tracker in your browser)

---

## Step 1 — Clone the repo

```bash
mkdir -p ~/Projects/Work/Nairon
cd ~/Projects/Work/Nairon
git clone https://github.com/Nairon-AI/nairon-website.git
cd nairon-website
bun install
```

The repo's `.mcp.json` is checked in and points the MCP server at `~/.config/nairon/sheets-key.json` — you don't need to set any env vars yourself, just place the credential file in the right spot in Step 4.

---

## Step 2 — Get the service account JSON from Luka

The Nairon Upwork tracker is shared with a single Google Cloud service account (`nairon-sheets-bot@naironai-hive.iam.gserviceaccount.com`). Every team member uses the **same** JSON key — Luka shares it via 1Password.

**Ask Luka for:**

1. The **`Nairon Sheets Bot.json`** file in 1Password (or whichever secure location the team is using)
2. Your **Submitted By name** added to `Settings!C4:C` of the tracker. Current values: `Luka Eric`, `Filip Kocanovic`, `Mahan Javaheri`. If you're not in that list, Luka needs to add you before you can log proposals (the dropdown will reject unknown names).

**Do not:**
- Email the JSON
- Slack the JSON
- Commit the JSON to any repo
- Share the JSON outside the Nairon team

The JSON has full read/write access to every sheet shared with the bot.

---

## Step 3 — Install `uv` (Python package runner)

The Sheets MCP server is a Python package launched via `uv`. Install once:

```bash
brew install uv
```

Verify:

```bash
uvx mcp-google-sheets --help
```

If that prints help text, `uv` is wired up. (First run will download the package — that's normal.)

---

## Step 4 — Place the credential file

```bash
mkdir -p ~/.config/nairon
# Move the JSON you got from 1Password into:
mv ~/Downloads/Nairon\ Sheets\ Bot.json ~/.config/nairon/sheets-key.json
chmod 600 ~/.config/nairon/sheets-key.json
```

That `chmod 600` makes the file readable only by you. Do not skip it.

That's all you need. The repo's `.mcp.json` already references this exact path — no shell env vars to set.

```bash
ls -l ~/.config/nairon/sheets-key.json
# Should show: -rw-------  1 <you>  staff  ...
```

---

## Step 5 — First Claude Code launch

Open a fresh terminal:

```bash
cd ~/Projects/Work/Nairon/nairon-website
claude
```

Claude Code will detect the project's `.mcp.json` and prompt you to approve the new `google-sheets` MCP server. **Approve it.**

Then verify the connection:

```bash
claude mcp list
```

You should see:

```
google-sheets: uvx mcp-google-sheets@latest - ✓ Connected
```

If it says `✗ Failed to connect`, jump to **Troubleshooting** below.

---

## Step 6 — Smoke test (read + write)

Inside Claude Code, ask:

> "Use google-sheets to list spreadsheets I have access to."

You should see one entry: **`Official Upwork Tracker`** with the ID `1GVv3V3ZAU6fXhLHM-yjFnS0qTWldze2sp_6jMh-Eu6w`.

> ⚠️ Older retired trackers (`1oX47YUr...` v2, `1XCb08y5kLqCEerv97oNcZ6...` v1) may still appear if the bot wasn't fully de-listed. **Never write to them** — the skills know to ignore those IDs.

Now ask:

> "Read the Dashboard tab of the Official Upwork Tracker."

You should see the team's current pipeline metrics (total proposals, win rate, revenue won, drafts queued, ROI, etc.).

If both reads succeed, you're online.

---

## The current sheet at a glance

The tracker has **5 tabs**:

| Tab | Mode | What it does |
|---|---|---|
| `Proposals` | Read + write | The proposal log — 40 columns, headers on row 5, data starts row 6 |
| `Dashboard` | Read-only | Auto-calculating metrics: Total / Win Rate / Revenue / Connects / Drafts queued / Status breakdown / Targets / Cost & Forecast |
| `Targets` | Read-only (rarely write) | KPI targets, cost assumptions, **Opportunity Score weights** |
| `Settings` | Read-only | Reference data: Statuses, Team Members, Pricing Type, Yes/No, Periods, Country tiers |
| `Helpers` | **Never write** | Feeds the daily-proposals chart on Dashboard — editing breaks the chart |

The full 40-column schema lives in `.claude/skills/upwork-pipeline/SKILL.md`. Highlights:

- `A` = Date Submitted (blank for drafts — that's how counters auto-exclude them)
- `V` = Opportunity Score (formula — never overwrite)
- `W` = Status: `Draft` / `Submitted` / `Viewed` / `Replied` / `Interview` / `Won` / `Lost`
- `AB` = Cover Letter (full proposal text)
- `AC`–`AL` = Q1/A1 … Q5/A5 (verbatim screening questions + our answers)
- `AM` = Notes (short, operational)
- `AN` = Job Link

---

## Daily workflow

### Saving a job as a draft (haven't applied yet)

When you find an Upwork post worth considering:

> "Save this Upwork post as a draft: <paste>"

The `upwork-pipeline` skill creates a row with `Status=Draft`, blank Date Submitted (so dashboards don't count it), client signals from the listing page, the job link, any verbatim screening questions, and a Notes line capturing activity intel + bid range.

### Drafting a proposal

When you're ready to write a proposal:

> "Draft a proposal for this Upwork post: <paste>"

The `upwork-proposal` skill will:

1. Score the post against the ICP (`03-ideal-customer-icp.md`) — and decline politely if it's a hard disqualifier
2. Load the relevant KB files (always: README + 08 + 06 + 05; conditional based on job type)
3. Pick a template (`10-proposal-templates.md`)
4. Draft the proposal in Luka's voice, mirroring the lead's language
5. Save the draft to `knowledge-base/upwork-proposals/drafts/YYYY-MM-DD_<client-slug>.md` with full frontmatter
6. Offer to log it to the sheet via `upwork-pipeline`

Say "yes, log it" and the row appears in the `Proposals` tab.

### Promoting a draft to submitted

When you actually click Submit on Upwork:

> "Promote the [client] draft to submitted"

The pipeline skill flips `Status` from `Draft` to `Submitted`, fills `Date Submitted` with today, records actual `Connects Spent`, and updates the paired draft file's frontmatter.

### Updating a proposal's status

When a lead replies / you get an interview / you win or lose:

> "Update the status of the [client] proposal to Interview"

The pipeline skill finds the row, updates `Status`, `Status Updated`, `Response?`, `Interview?`, and syncs the corresponding draft file (frontmatter + outcome log).

### Looking up pipeline state

> "How are we doing this month?"
> "How many drafts are queued?"
> "Show all open proposals."
> "Did we ever bid on Lumen Studios?"

The pipeline skill reads the sheet and answers.

---

## The two skills (quick reference)

Both live at `.claude/skills/` and only load inside this repo.

| Skill | Triggers | Reads | Writes |
|---|---|---|---|
| `upwork-proposal` | "draft a proposal", "reply to this lead", "is this job worth bidding on" | KB files, target job patterns | The drafts archive |
| `upwork-pipeline` | "log this proposal", "save as draft", "update status", "show me pipeline metrics" | The sheet (all 5 tabs) | `Proposals` tab + the matching draft frontmatter |

The proposal skill always offers the handoff to the pipeline skill at the end of a draft. You don't have to switch manually.

---

## Hard rules everyone needs to know

These are baked into the skills, but knowing them helps you spot when something's off:

1. **Proposals do NOT pitch Nairon's offering.** Mirror the lead's language, drive to a 15-min call. Save the methodology / 3-day timeline / Hive / hardware / OpenClaw / "AI employees" framing for the discovery call.
2. **Never invent metrics, clients, or case studies.** Only what's in `05-proof-case-studies.md`.
3. **Service-account writes show as the bot, not as you.** Sheets' "edited by" history won't show which teammate did what — the `Submitted By` column is the source of truth.
4. **Never write to the column V Opportunity Score formula.** When writing a full row, split into two ranges (`A:U` and `W:AN`) — passing `""` at column V in a single 40-cell write erases the formula.
5. **For numeric signal columns, use `0` when a value isn't shown.** Brand-new clients with no spend or no reviews get `0`, not blank or `-`. Exception: `A` (Date Submitted) stays BLANK for drafts (that's the trigger for date-filtered counters).
6. **Hire Rate (column N) is percent-formatted** — write `0.61`, not `61`, or it renders as `6100%`.
7. **Never delete a draft file** in `knowledge-base/upwork-proposals/drafts/` — even Lost / void proposals stay. The corpus needs the negative examples.
8. **Never commit the service account JSON** or anything matching `*service-account*.json` or `secrets/`. The `.gitignore` already excludes these, but be aware.
9. **Never write to retired trackers.** Only `Official Upwork Tracker` (`1GVv3V3ZAU6fXhLHM-yjFnS0qTWldze2sp_6jMh-Eu6w`) is canonical.

---

## Troubleshooting

### `claude mcp list` shows `google-sheets ✗ Failed to connect`

Almost always one of these:

1. **Credential file missing or wrong path** — `ls -l ~/.config/nairon/sheets-key.json` should show the file with `-rw-------` and a real size. The path in `.mcp.json` is hardcoded, so the file MUST be at exactly that location.
2. **`uv` not installed or not on PATH** — `which uvx` should print a path.
3. **First-time package download** — run `uvx mcp-google-sheets --help` once manually to warm the cache.
4. **JSON is malformed or expired** — try opening it; it should be valid JSON with `"client_email"` set to `nairon-sheets-bot@naironai-hive.iam.gserviceaccount.com`.

### MCP "connected" but tools don't show up in Claude Code

Claude Code caches the MCP tool index per session. If the server crashed once at session start and recovered later, the index is stale. **Quit Claude Code completely and relaunch from a fresh terminal.**

### "Permission denied" when reading/writing a sheet

The sheet wasn't shared with `nairon-sheets-bot@naironai-hive.iam.gserviceaccount.com`. Ping Luka — only he can grant access since he owns the service account.

### Can't find my name in the Submitted By dropdown

Your name needs to be added to `Settings!C4:C` first. Ask Luka to add it. Until then, you can't log proposals attributed to you.

### macOS won't let me access `~/Downloads`

If you see "Operation not permitted" moving the JSON, do the move in your own terminal (not via Claude Code) — macOS sandboxing blocks shells launched by other apps from touching `~/Downloads` by default.

### I want to know more

- **Sheet schema deep dive (40 columns, all conventions):** `.claude/skills/upwork-pipeline/SKILL.md`
- **Proposal-writing rules:** `.claude/skills/upwork-proposal/SKILL.md` and `knowledge-base/upwork-proposals/08-proposal-writing-playbook.md`
- **Service account / GCP setup (admin only):** `docs/sheets-setup.md`

---

## Things to ask Luka

1. **Your Submitted By name** — Luka needs to add it to `Settings!C4:C` of the tracker
2. **Credentials access** in 1Password
3. **OpenClaw GitHub access** if you'll be working on the OpenClaw contribution credibility play

---

## You're done

Test the round trip end-to-end before considering yourself onboarded:

1. Ask the agent to draft a proposal for a real or fictional Upwork post
2. Confirm the draft appears in `knowledge-base/upwork-proposals/drafts/`
3. Ask the agent to log it to the tracker
4. Open the sheet in your browser and confirm the row shows up in the `Proposals` tab with the correct Opportunity Score in column V

If all four work, you have parity with the rest of the team. Welcome aboard.
