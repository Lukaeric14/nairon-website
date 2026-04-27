# Google Sheets MCP — Setup

Connects Claude Code to Google Sheets via a shared service account. Once set up, the Claude Code agent can list, read, append, and update sheets natively — no glue code, no Bash wrappers.

> Architecture choice: **service account** (one shared credential) over per-user OAuth. Trade-off: every edit shows the service account as the editor, not the human user. Audit-by-user is lost; setup simplicity is gained.

## Who needs to do what

- **Luka (one-time, admin):** Steps 1–2 below. Creates the service account, downloads the JSON key, shares the relevant sheets, distributes the key to the team.
- **Each team member (one-time per machine):** Steps 3–4 below.
- **Already in the repo:** `.mcp.json` and `.gitignore` updates — no action needed.

---

## Step 1 — Create the service account (Luka only)

1. Go to [console.cloud.google.com](https://console.cloud.google.com).
2. Create a new project (e.g., `nairon-sheets-agent`) or reuse an existing one.
3. **APIs & Services → Library** — enable both:
   - Google Sheets API
   - Google Drive API
4. **APIs & Services → Credentials → Create Credentials → Service Account**
   - Name: `nairon-sheets-bot`
   - Skip role assignment (sheet-level sharing controls access).
   - Click **Done**.
5. Click into the service account → **Keys → Add Key → Create new key → JSON** → download.
6. **Copy the service account email** (looks like `nairon-sheets-bot@nairon-sheets-agent.iam.gserviceaccount.com`).

## Step 2 — Share the sheets + distribute the key (Luka only)

1. For each Google Sheet the agent should access:
   - Open sheet → **Share** → paste the service account email → **Editor** → uncheck "notify" → **Share**.
2. (Recommended) Create a Drive folder for agent-accessible sheets, share the folder with the service account as Editor. Get the folder ID from the URL: `https://drive.google.com/drive/folders/<FOLDER_ID>`. This becomes `NAIRON_SHEETS_DRIVE_FOLDER_ID` below — it scopes the agent's "list spreadsheets" to that folder.
3. Distribute the service account JSON to the 3 team members via **1Password** (or another secure channel). Do **not** email it, do **not** put it in Slack, do **not** commit it to the repo.

## Step 3 — Each team member: install dependencies

On macOS:

```bash
brew install uv
```

`uv` runs the Python-based MCP server (`mcp-google-sheets`) without polluting your Python environment.

Verify:

```bash
uvx mcp-google-sheets --help
```

If that prints help text, you're set.

## Step 4 — Each team member: local config

1. Save the service account JSON somewhere outside the repo:

   ```bash
   mkdir -p ~/.config/nairon
   # Move the JSON you got from 1Password into:
   #   ~/.config/nairon/sheets-key.json
   chmod 600 ~/.config/nairon/sheets-key.json
   ```

2. Add to `~/.zshrc` (or `~/.bashrc`):

   ```bash
   export NAIRON_SHEETS_KEY_PATH="$HOME/.config/nairon/sheets-key.json"
   export NAIRON_SHEETS_DRIVE_FOLDER_ID="<paste-folder-id-from-Luka>"
   ```

3. Reload your shell:

   ```bash
   source ~/.zshrc
   ```

4. Verify:

   ```bash
   echo $NAIRON_SHEETS_KEY_PATH
   ls -l "$NAIRON_SHEETS_KEY_PATH"
   ```

   You should see the JSON file with `-rw-------` permissions.

## Step 5 — First run with Claude Code

```bash
cd /path/to/nairon-website
claude
```

Claude Code will detect `.mcp.json` at the repo root and prompt you to approve the new MCP server. Approve it.

Test reads:

> "List the Google Sheets you have access to."

Test writes:

> "In sheet [name], append a row with [a, b, c]"

If the agent comes back with results and the row appears in the sheet (edited by the service account), you're done.

## How the agent will use this

Tool calls available to the agent (names may vary slightly by version):

- `mcp__google-sheets__list_spreadsheets` — discover what's in the shared folder
- `mcp__google-sheets__read_range` — read a range like `Sheet1!A1:D50`
- `mcp__google-sheets__append_row` — add a row to a sheet
- `mcp__google-sheets__update_range` — overwrite cells in a range
- `mcp__google-sheets__create_spreadsheet` — create a new sheet (in the shared folder if `DRIVE_FOLDER_ID` is set)

For the Upwork proposal agent, typical patterns:

- Read a "leads" sheet → pick the next unprocessed row → draft a proposal → write the draft back to a "drafts" column
- Append closed/won/lost outcomes to a pipeline tab
- Pull a "templates" sheet at runtime so non-engineers can edit copy without touching the repo

## Safety notes

- The service account has Editor access to every sheet you've shared with it. **A typo in a prompt can overwrite real data.** Two cheap protections:
  1. Keep one "agent scratch" sheet for testing — let the agent break it freely.
  2. For pipeline / production sheets, use **named ranges** (e.g., `agent_inbox`, `agent_outbox`) and tell the agent to write only inside those ranges.
- Rotate the service account key annually. To rotate: create a new key in GCP, redistribute via 1Password, each user replaces their local JSON, then delete the old key in GCP.
- If a user leaves the team: rotate the key. (Service-account auth has no per-user revocation.)

## Troubleshooting

**"Permission denied" when the agent tries to read a sheet**
→ The sheet wasn't shared with the service account email. Re-share, set Editor.

**"API has not been used in project ... or it is disabled"**
→ Sheets API or Drive API isn't enabled. Enable both in **APIs & Services → Library**.

**"`uvx`: command not found"**
→ `uv` isn't installed or isn't on PATH. Run `brew install uv` and reopen the terminal.

**MCP server doesn't show up in Claude Code**
→ Make sure you're running `claude` from inside the repo (the `.mcp.json` is project-level). Check `claude mcp list` to confirm it's registered. If not, run `claude mcp` to debug.

**`SERVICE_ACCOUNT_PATH` is empty inside the MCP server**
→ The env var isn't exported in the shell that launched Claude Code. Confirm with `echo $NAIRON_SHEETS_KEY_PATH` in the same terminal where you run `claude`. If running from VS Code, restart VS Code after editing `~/.zshrc`.
