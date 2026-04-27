---
name: upwork-pipeline
description: Read, append, and update rows in the Nairon Upwork proposal tracker (Google Sheet) via the google-sheets MCP. Use when the user asks to log a proposal, update a status (replied/interview/won/lost), look up past proposals, check pipeline metrics, or sync any state between the team and the tracker. Do NOT use for drafting proposal text — pair with the `upwork-proposal` skill for that.
---

# Upwork Pipeline Skill

You operate the team's Upwork proposal tracker — a Google Sheet read/written via the `google-sheets` MCP server. This skill teaches you the schema and the safe operations.

## The canonical sheet

**Spreadsheet ID:** `1GVv3V3ZAU6fXhLHM-yjFnS0qTWldze2sp_6jMh-Eu6w`
**Title:** `Official Upwork Tracker`

> Older trackers (`1oX47YUr2aCdcdjCJXo6s4JmZAa9kVel4KTVuyIthRos`, `1XCb08y5kLqCEerv97oNcZ6--YXeySBownL2tcjOPIOk`) have been replaced. Access has been revoked. **Never write to them** even if a stale ID is mentioned somewhere — only ever write to the `Official Upwork Tracker` ID above. Verify with `list_spreadsheets` if in doubt.

## Tabs

| Tab | Mode | Purpose |
| --- | --- | --- |
| `Proposals` | **Read + Write** | The proposal log. Almost all writes go here. |
| `Dashboard` | Read-only | Auto-calculating metrics. Never write. |
| `Targets` | Read-only (rarely write) | KPI targets, cost assumptions, and Opportunity Score weights. Only edit if the user explicitly asks. |
| `Settings` | Read-only | Reference data for dropdowns: Statuses, Team Members, Pricing Type, Yes/No, Periods, Country tiers. |
| `Helpers` | **Never write** | Feeds the daily-proposals chart on Dashboard. Editing breaks the chart. |

## Proposals schema (40 columns)

Header is on **row 5**. Data starts at **row 6**. New rows append at the next empty row (use `get_sheet_data` on column A first to find it; the tail will look like rows 6 → N where N is the last filled row, so write to row N+1).

Hire Rate (column N) is **percent-formatted** — write the decimal (`0.61`), not the integer (`61`), or it will render as `6100%`.

| # | Letter | Column | Type | Notes |
|---|---|---|---|---|
| 1 | A | Date Submitted | date `YYYY-MM-DD` | Day the proposal was sent |
| 2 | B | Submitted By | string | **Must match `Settings!C4:C`** — currently `Luka Eric`, `Filip Kocanovic`, `Mahan Javaheri` |
| 3 | C | Connects Spent | int | What the team paid in Connects for this proposal |
| 4 | D | Job Title | string | Verbatim from the post |
| 5 | E | Job description | string | Compressed 1–3 sentence summary of the post (lowercase header `description` — that's how the sheet has it) |
| 6 | F | Pricing Type | enum | `Hourly` or `Fixed` |
| 7 | G | Proposal Value ($) | number | What we bid (hourly rate or fixed total) |
| 8 | H | Job Connects Req'd | int | What Upwork required to apply (base, before boost) |
| 9 | I | Client Name | string | Anonymize if not in post (e.g., "Property Mgmt Co (USA)") |
| 10 | J | Payment Verified | enum | `Yes` / `No` |
| 11 | K | Total Spent ($) | number | Client's lifetime Upwork spend |
| 12 | L | Hires | int | Client's hire count |
| 13 | M | Jobs Posted | int | Client's job count |
| 14 | N | Hire Rate (%) | number | Client's hire rate as a **decimal** (`0.61` for 61%). Cell is percent-formatted. |
| 15 | O | Avg Hourly Paid ($) | number | Client's avg hourly paid |
| 16 | P | Rating (0-5) | number | Client's star rating |
| 17 | Q | # Reviews | int | Client's review count |
| 18 | R | Country | string | Client country. **Must match a country in `Settings!K5:K`** for the Country Tier signal to score; unrecognized countries score 0. |
| 19 | S | Member Since (yr) | int | Year the **client's Upwork account** opened (NOT company founding year) |
| 20 | T | # Proposals on Job | int | How many freelancers had applied when we submitted (visible on the post). Lower is better. |
| 21 | U | Client Interviews on Job | int | How many interviews the client already had on this post. Lower means less competition. |
| 22 | V | Opportunity Score | formula | **Do not write.** Auto-calculates from columns J, K, L, N, O, P, R, T, U using weights defined in `Targets`. Leave blank on append; the formula fills it. |
| 23 | W | Status | enum | `Submitted` / `Viewed` / `Replied` / `Interview` / `Won` / `Lost` |
| 24 | X | Status Updated | date `YYYY-MM-DD` | Set to today whenever Status changes |
| 25 | Y | Response? | enum | `Yes` / `No` |
| 26 | Z | Interview? | enum | `Yes` / `No` |
| 27 | AA | Contract Value ($) | number | Only fill on `Won` |
| 28 | AB | Cover Letter | string | **Full proposal text we sent.** This is the home for the entire cover letter — store it verbatim. |
| 29 | AC | Q1 | string | Verbatim screening question from the job post. Blank if the post had none. |
| 30 | AD | A1 | string | Our answer to Q1. |
| 31 | AE | Q2 | string | Verbatim screening question from the job post. |
| 32 | AF | A2 | string | Our answer to Q2. |
| 33 | AG | Q3 | string | Verbatim screening question from the job post. |
| 34 | AH | A3 | string | Our answer to Q3. |
| 35 | AI | Q4 | string | Verbatim screening question from the job post. |
| 36 | AJ | A4 | string | Our answer to Q4. |
| 37 | AK | Q5 | string | Verbatim screening question from the job post. |
| 38 | AL | A5 | string | Our answer to Q5. |
| 39 | AM | Notes | string | Short, operational. Strategy, post-mortem, signal callouts. **Not** the proposal text — that goes in `AB`. |
| 40 | AN | Job Link | url | Link to the original Upwork job post. Useful for following up later or revisiting drafts. |

Columns AC–AL are interleaved Q/A pairs (Q1, A1, Q2, A2, …) under the `Q&A` banner on row 4. If a post has fewer than 5 questions, leave the unused pairs blank — never repeat the same Q to fill space.

## Settings reference values (must match exactly)

Read these via `get_sheet_data` on `Settings` if unsure — they may change.

- **Statuses** (`Settings!A4:A10`): `Draft`, `Submitted`, `Viewed`, `Replied`, `Interview`, `Won`, `Lost`
- **Team Members** (`Settings!C4:C`): currently `Luka Eric`, `Filip Kocanovic`, `Mahan Javaheri`. Always re-read before writing — Luka may add/remove names.
- **Pricing Type** (`Settings!E4:E5`): `Hourly`, `Fixed`
- **Yes/No** (`Settings!G4:G5`): `Yes`, `No`
- **Country tiers** (`Settings!K5:L`): two columns — country name + tier (1, 2, or 3). Tier 1 = US/UK; Tier 2 = most of Western Europe + ANZ + SG; Tier 3 = everywhere else listed. Countries not in the list score 0 on the Country signal.

If a value doesn't match the dropdown, the cell still writes but the dropdown will mark it invalid. **Always validate** the enum columns (B, F, J, W, Y, Z) before writing.

## Opportunity Score (read-only, but useful to understand)

The score (column V) is computed by an in-sheet formula using weights from `Targets`. Total = 100. Current weights:

| Signal | Source col | Max pts |
|---|---|---|
| Payment Verified | J | 20 |
| Total Spent | K | 20 |
| Country Tier | R (via Settings!K:L) | 15 |
| Avg Hourly Paid | O | 15 |
| Rating | P | 12 |
| Hire Rate | N | 7 |
| # Proposals on Job | T | 4 |
| Client Interviews on Job | U | 4 |
| Hires (count) | L | 3 |

This is for awareness only — the formula is in the sheet; you don't compute or write it. Tuning happens by editing weights in `Targets`, not by overwriting cells in `U`.

## Standard workflows

### 1. Log a new proposal

```
1. Get today's date in YYYY-MM-DD.
2. Pull the post details (job title, job description, pricing, all client signals incl. # Proposals + Interviews on the job).
3. Read get_sheet_data(Proposals, range="A:A") to find the next empty row N+1.
4. Build the 40-cell row. Leave unknown client signals BLANK — never fabricate.
   Leave column V (Opportunity Score) blank — it's a formula.
5. Status="Submitted", Status Updated=today, Response?="No", Interview?="No".
6. Put a compressed 1–3 sentence summary of the post into E (Job description).
7. Put the FULL cover letter into AB verbatim.
8. Capture screening Qs verbatim into AC/AE/AG/AI/AK; our answers into AD/AF/AH/AJ/AL. Leave unused pairs blank.
9. Put the original Upwork job URL into AN (Job Link) when available.
10. **Write in two segments to preserve the Opportunity Score formula at V:**
    - update_cells(Proposals, range="A{N+1}:U{N+1}", data=[<row[0:21]>])
    - update_cells(Proposals, range="W{N+1}:AN{N+1}", data=[<row[22:40]>])
   Do NOT write A:AN in one shot — passing `""` at column V will erase the formula.
```

### 1b. Save a draft (job we're considering, not yet submitted)

A draft is a row logged BEFORE we apply, so the team can revisit it later. Drafts must NOT pollute Dashboard counters — every Dashboard formula filters on Date Submitted (col A) within a period, so a blank Date Submitted auto-excludes the row.

```
1. Read get_sheet_data(Proposals, range="A:A") to find the next empty row N+1.
2. Build the row with these draft-specific rules:
   - A (Date Submitted) = BLANK. This is the trigger that hides drafts from all date-filtered counters.
   - B (Submitted By) = whoever logged it.
   - C (Connects Spent) = BLANK (not paid yet).
   - D, E, F, G = job title, summary, pricing type, our intended bid (best-guess if undecided).
   - H = Job Connects Req'd if visible on the post.
   - I-U = client signals from the post (same as a normal proposal).
   - V = blank (formula auto-fills the Opportunity Score; useful for triaging which drafts are worth applying to).
   - W (Status) = "Draft".
   - X (Status Updated) = today.
   - Y, Z, AA = blank.
   - AB (Cover Letter) = blank, or partial draft if started.
   - AC–AL = verbatim screening Qs from the post; answers blank until drafted.
   - AM (Notes) = short, e.g. "Saved as draft 2026-04-27 — revisit if SOP-X clarifies".
   - AN (Job Link) = the URL.
3. **Write in two segments** to preserve the Opportunity Score formula at V:
   - update_cells(Proposals, range="A{N+1}:U{N+1}", data=[<row[0:21]>])
   - update_cells(Proposals, range="W{N+1}:AN{N+1}", data=[<row[22:40]>])
```

### 1c. Promote a draft to submitted

```
1. find_in_spreadsheet(query=<client OR job title>) to locate the draft row.
2. Read the row to confirm it's still Status="Draft".
3. update_cells these cells:
   - A{row} = today (YYYY-MM-DD)   ← unblocks all dashboard counters for this row
   - C{row} = actual Connects Spent (incl. boost if any)
   - W{row} = "Submitted"
   - X{row} = today
   - AB{row} = final cover letter text if not yet filled
   - AC–AL = ensure all screening answers are filled
   - AM = update Notes to remove the draft callout, add submission strategy notes
4. If there's a paired draft file in knowledge-base/upwork-proposals/drafts/, update its frontmatter (status: Draft → Submitted, date_submitted) and append to ## Outcome log.
```

### 2. Update an existing proposal's status

```
1. find_in_spreadsheet(spreadsheet_id, query=<client name OR job title>) to locate the row.
   - If multiple matches, ask the user which row.
2. Read the row to confirm.
3. update_cells(Proposals, range="W{row}:Z{row}", data=[[<status>, <today>, <response>, <interview>]]).
4. If Status=Won: also write Contract Value to column AA, and a short Notes update at AM.
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
- "How many drafts are queued?" → Dashboard cell M12, or COUNTIF(Proposals!$W$6:$W$504,"Draft") directly.
- "Show me the drafts" → get_sheet_data(Proposals) and filter where Status="Draft".
```

## Hard rules

1. **Only ever write to `Official Upwork Tracker`** (`1GVv3V3ZAU6fXhLHM-yjFnS0qTWldze2sp_6jMh-Eu6w`). All older tracker IDs are revoked.
2. **Never write to the `Dashboard` tab.** It's formula-driven.
3. **Never write to the `Helpers` tab.** It feeds the daily-proposals chart; edits break the chart.
4. **Never write to column V (Opportunity Score).** Formula-driven.
5. **For numeric signal columns (C, K, L, M, N, O, P, Q, T, U, AA), use `0` when the post shows no value** — never leave blank or "-". Brand-new clients with no spend or no reviews show as 0, not empty. Exception: A (Date Submitted) must stay BLANK for drafts (that's the trigger for date-filtered counters).
6. **Never fabricate client signals that ARE shown.** If a value is on the post, record it accurately. If a value is genuinely absent (e.g., post page doesn't display Total Spent at all), use 0.
7. **Cover letter goes in `AB`, never in `AM` (Notes).** Notes is short, operational ("AI-drafted", "Boosted bid", "Asked clarifying Q on scope"). The full proposal lives in `AB`.
8. **Never overwrite an existing row.** Only update the specific columns the workflow specifies.
9. **Always validate enum columns** against `Settings` before writing.
10. **Date format is `YYYY-MM-DD`** everywhere. Do not use `MM/DD/YY` or other formats.
11. **Hire Rate (N) is percent-formatted** — write decimals (`0.61`), not integers (`61`).
12. **Never include column V in a full-row write.** Passing `""` at position V in a 40-cell array overwrites the Opportunity Score formula (an empty string IS a write to Sheets). Always split the row write into two ranges that skip V — e.g. `A{row}:U{row}` and `W{row}:AN{row}` — so the formula stays intact. If you do clobber it, restore by copying the formula from any other row and adjusting the row number.
13. **Always read back the row after writing.** Multi-segment writes have intermittently dropped cells (especially leading empty strings like `B="Luka Eric"` after `A=""`). After a write, `get_sheet_data(range="A{row}:AN{row}")` and confirm key cells (B, D, V, W, AN) are populated before reporting success.
14. **Number-format gotcha — some numeric columns display 0 as `-`.** Columns L (Hires), Q (# Reviews), and others use the format `#,##0;(#,##0);-` which substitutes `-` for 0. The underlying value IS 0 (formulas treat it correctly), but the display is misleading. To force literal `0` display, override `numberFormat.pattern` to `0` or `#,##0` via `batch_update` (requires sheetId — fetch via `get_sheet_data(include_grid_data=true)`).

## Range-bucket conventions

Upwork sometimes shows ranges or open-ended buckets instead of exact numbers. Convert as follows when writing to the sheet:

| Source | Convert to | Reason |
|---|---|---|
| `# Proposals: 10 to 15` | midpoint = `12` (or `13`) | honest single number; halfway between bounds |
| `# Proposals: 20 to 50` | midpoint = `35` | same |
| `# Proposals: 50+` | `50` | lower bound; formula gives 0 pts when ≥30 anyway |
| `Total Spent: not shown` | `0` | new client — never blank, never `-` |
| `Avg Hourly Paid: not shown` | `0` | new client — same |
| `# Reviews: 0` | `0` | always |
| `Country: not in Settings tier list` | record as-is | VLOOKUP returns 0 for unrecognized — no fabrication |

Always note the conversion in `AM` (Notes) — e.g., `# Proposals on Job recorded as 35 (midpoint of '20 to 50')`.

## Notes (column AM) content checklist

Keep terse and operational. Always include when applicable:

- **Activity intel**: `# proposals, # interviewing, # invites sent, # unanswered, last viewed`
- **Bid range from post**: `High $X / Avg $Y / Low $Z` — useful for retroactive rate-fit analysis
- **Boost board** (Submit Proposal page only): `1st X Connects, 2nd Y, 3rd Z, 4th W` — informs whether boosting helps
- **Required Connects**: integer
- **Range-bucket conversions**: e.g. `# Proposals on Job recorded as 35 (midpoint of '20 to 50')`
- **Hard requirements from post**: `'Must include lifecycle-first routing as opening line'`, `'No AI-written proposals'`, `'Must answer 5 screening Qs'`
- **Industry + company size**: when the post shows it
- **Recent client contract pattern**: e.g. `recent contracts mostly $15–45/hr Shopify ops`
- **Posting timing**: `Posted X days ago`, freshness signal

Notes is NOT for proposal text (goes in `AB`), strategic recommendations, or fit assessments. Just data and operational context.

## Read-first reflexes

Before any write:
- Confirm the spreadsheet ID is the `Official Upwork Tracker` ID.
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
