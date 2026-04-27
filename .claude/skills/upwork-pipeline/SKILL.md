---
name: upwork-pipeline
description: Read, append, and update rows in the Nairon Upwork proposal tracker (Google Sheet) via the google-sheets MCP. Use when the user asks to log a proposal, update a status (replied/interview/won/lost), look up past proposals, check pipeline metrics, or sync any state between the team and the tracker. Do NOT use for drafting proposal text — pair with the `upwork-proposal` skill for that.
---

# Upwork Pipeline Skill

You operate the team's Upwork proposal tracker — a Google Sheet read/written via the `google-sheets` MCP server. This skill teaches you the schema and the safe operations.

## The canonical sheet

**Spreadsheet ID:** `1oX47YUr2aCdcdjCJXo6s4JmZAa9kVel4KTVuyIthRos`
**Title:** `Upwork_Proposal_Tracker` (v2)

> A v1 sheet (`1XCb08y5kLqCEerv97oNcZ6--YXeySBownL2tcjOPIOk`) with the same name may also be visible from `list_spreadsheets`. **Never write to v1.** It's archived.

## Tabs

| Tab | Mode | Purpose |
| --- | --- | --- |
| `Proposals` | **Read + Write** | The append-only proposal log. This is where the agent does almost all writes. |
| `Dashboard` | Read-only | Auto-calculating metrics. Never write to this tab. |
| `Targets` | Read-only (rarely write) | Daily/weekly/monthly KPI targets and cost assumptions. Only edit if the user explicitly asks. |
| `Settings` | Read-only | Reference data for dropdowns: Statuses, Team Members, Pricing Type, Yes/No, Periods. |

## Proposals schema (26 columns)

Header is on **row 5**. Data starts at **row 6**. New rows append at the next empty row (use `get_sheet_data` on column A first to find it; the tail will look like rows 6 → N where N is the last filled row, so write to row N+1).

| # | Letter | Column | Type | Notes |
|---|---|---|---|---|
| 1 | A | Date Submitted | date `YYYY-MM-DD` | Day the proposal was sent |
| 2 | B | Submitted By | string | **Must match `Settings!C4:C6`** (Member 1/2/3 placeholders today) |
| 3 | C | Connects Spent | int | What the team paid in Connects for this proposal |
| 4 | D | Job Title | string | Verbatim from the post |
| 5 | E | Job Description | string | Compressed 1–3 sentence summary of the post |
| 6 | F | Pricing Type | enum | `Hourly` or `Fixed` |
| 7 | G | Proposal Value ($) | number | What we bid (hourly rate or fixed total) |
| 8 | H | Job Connects Req'd | int | What Upwork required to apply |
| 9 | I | Client Name | string | Anonymize if not in post (e.g., "Property Mgmt Co (USA)") |
| 10 | J | Payment Verified | enum | `Yes` / `No` |
| 11 | K | Total Spent ($) | number | Client's lifetime Upwork spend |
| 12 | L | Hires | int | Client's hire count |
| 13 | M | Jobs Posted | int | Client's job count |
| 14 | N | Hire Rate (%) | number | Client's hire rate (0–100) |
| 15 | O | Avg Hourly Paid ($) | number | Client's avg hourly paid |
| 16 | P | Rating (0-5) | number | Client's star rating |
| 17 | Q | # Reviews | int | Client's review count |
| 18 | R | Country | string | Client country |
| 19 | S | Member Since (yr) | int | Year the **client's Upwork account** opened (NOT company founding year) |
| 20 | T | Opportunity Score | formula | **Do not write.** Calculated from columns J–S. Leave blank on append; the formula fills it. |
| 21 | U | Status | enum | `Submitted` / `Viewed` / `Replied` / `Interview` / `Won` / `Lost` |
| 22 | V | Status Updated | date `YYYY-MM-DD` | Set to today whenever Status changes |
| 23 | W | Response? | enum | `Yes` / `No` |
| 24 | X | Interview? | enum | `Yes` / `No` |
| 25 | Y | Contract Value ($) | number | Only fill on `Won` |
| 26 | Z | Notes | string | Short, operational. NOT the full proposal text — keep notes terse like the seed rows ("Asked clarifying questions about scope") |

## Settings reference values (must match exactly)

Read these via `get_sheet_data` on `Settings` if unsure — they may change.

- **Statuses** (`Settings!A4:A9`): `Submitted`, `Viewed`, `Replied`, `Interview`, `Won`, `Lost`
- **Team Members** (`Settings!C4:C6`): `Member 1`, `Member 2`, `Member 3` (placeholders — Luka may rename)
- **Pricing Type** (`Settings!E4:E5`): `Hourly`, `Fixed`
- **Yes/No** (`Settings!G4:G5`): `Yes`, `No`

If a value doesn't match the dropdown, the cell still writes but the dropdown will mark it invalid. **Always validate** the four enum columns (B, F, J, U, W, X) before writing.

## Standard workflows

### 1. Log a new proposal

```
1. Get today's date in YYYY-MM-DD.
2. Pull the post details (job title, pricing, client signals).
3. Read get_sheet_data(Proposals, range="A:A") to find the next empty row N+1.
4. Build the 26-cell row. Leave unknown client signals BLANK — never fabricate.
   Leave column T (Opportunity Score) blank — it's a formula.
5. Status="Submitted", Status Updated=today, Response?="No", Interview?="No".
6. update_cells(Proposals, range="A{N+1}:Z{N+1}", data=[<row>]).
```

### 2. Update an existing proposal's status

```
1. find_in_spreadsheet(spreadsheet_id, query=<client name OR job title>) to locate the row.
   - If multiple matches, ask the user which row.
2. Read the row to confirm.
3. update_cells(Proposals, range="U{row}:X{row}", data=[[<status>, <today>, <response>, <interview>]]).
4. If Status=Won: also write Contract Value to column Y, and a short Notes update.
5. Sync the corresponding draft file in knowledge-base/upwork-proposals/drafts/:
   - Find by date + client slug (frontmatter has sheet_row for cross-reference).
   - Update frontmatter (status, status_updated, response, interview, contract_value, notes).
   - Append a line to ## Outcome log: "YYYY-MM-DD — Status changed from X to Y. <short reason>"
```

The draft archive and the sheet must stay in sync — both are sources of truth.

### 3. Look up pipeline state

```
- "How are we doing this month?" → get_sheet_data(Dashboard) — read the precomputed metrics.
- "Show all open proposals" → get_sheet_data(Proposals) and filter where Status in {Submitted, Viewed, Replied, Interview}.
- "Did we ever bid on <client>?" → find_in_spreadsheet(query=<client>).
```

## Hard rules

1. **Never write to v1** (`1XCb08y5kLqCEerv97oNcZ6--YXeySBownL2tcjOPIOk`).
2. **Never write to the `Dashboard` tab.** It's formula-driven.
3. **Never write to column T (Opportunity Score).** Formula-driven.
4. **Never fabricate client signals.** If the post doesn't say payment-verified status, hire rate, etc., leave the cell blank. The Opportunity Score will reflect the missing data — that's the right behavior.
5. **Never put the full proposal text in Notes.** Keep Notes short and operational. The full text lives in the chat / Slack; the sheet is for tracking.
6. **Never overwrite an existing row.** Only update the specific columns the workflow specifies.
7. **Always validate enum columns** against `Settings` before writing.
8. **Date format is `YYYY-MM-DD`** everywhere. Do not use `MM/DD/YY` or other formats.

## Read-first reflexes

Before any write:
- Confirm the spreadsheet ID is the v2 ID.
- Confirm the target row by reading it.
- Confirm enum values exist in `Settings`.

Before any update of status:
- Read the existing row first; preserve any data you're not explicitly changing.

## Tool inventory (google-sheets MCP)

Read-mostly tools to prefer:
- `mcp__google-sheets__list_spreadsheets`
- `mcp__google-sheets__list_sheets`
- `mcp__google-sheets__get_sheet_data`
- `mcp__google-sheets__get_multiple_sheet_data`
- `mcp__google-sheets__find_in_spreadsheet`

Write tools (use carefully):
- `mcp__google-sheets__update_cells` — primary write path
- `mcp__google-sheets__batch_update_cells` — multi-range writes
- `mcp__google-sheets__add_rows` — only if you need to insert blank rows in the middle (rare)

Do not use without explicit user instruction:
- `mcp__google-sheets__create_spreadsheet`
- `mcp__google-sheets__share_spreadsheet`
- `mcp__google-sheets__rename_sheet`
- `mcp__google-sheets__copy_sheet`
- `mcp__google-sheets__batch_update`

## When to hand off

- If the user asks to **draft proposal text**, use the `upwork-proposal` skill instead. This skill only logs/tracks; it does not write proposal copy.
- If the user asks for **business strategy** (new ICP, pricing decisions, KB updates), surface it but don't change anything in the sheet beyond what was asked.
