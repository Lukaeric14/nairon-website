# Drafts Archive

Every proposal the `upwork-proposal` skill drafts gets saved here as a self-contained markdown file. Over time this corpus becomes A/B testing fuel — you can compare openers, templates, proof points, and ICP fit against actual outcomes (won / lost / ghosted).

## Why save them

- **Memory across sessions** — the KB defines the rules; this archive stores what we actually shipped against those rules.
- **A/B over time** — once the corpus is large enough, win rates can be sliced by opener formula, template, ICP segment, proof point, etc.
- **Audit trail** — every claim we made in a proposal is traceable to the file.
- **Future training** — labelled outcomes turn this into a fine-tuning / few-shot dataset.

## Filename convention

```
YYYY-MM-DD_<client-slug>.md
```

- Date = day the proposal was sent (matches the sheet's `Date Submitted` column).
- `<client-slug>` = lowercase, hyphenated, short. Anonymize if the post didn't reveal a name (`property-mgmt-ca-nv-tx-fl`).
- If two proposals to the same client land on the same day, append `_v2`, `_v3`.

## File structure

Each draft has YAML frontmatter (metadata) followed by structured markdown sections.

```yaml
---
# Submission
date: 2026-04-27               # ISO date (matches sheet)
submitted_by: Member 1         # must match Settings!C4:C6
sheet_row: 18                  # row in Proposals tab (mutable — informational only)

# Job
job_title: "AI Automation Contractor — Production Workflows for Property Management"
job_url: ""                    # link to Upwork post if available
pricing_type: Hourly           # Hourly | Fixed
proposal_value: 100            # number (USD/hr if Hourly, USD total if Fixed)
job_connects_required: 16
connects_spent: 16

# Client signals (leave blank if unknown — never fabricate)
client_name: "Property Mgmt Co (CA/NV/TX/FL)"
payment_verified: Yes          # Yes | No
total_spent: 10000             # number, USD
hires:                         # blank if unknown
jobs_posted:
hire_rate_pct:
avg_hourly_paid:
rating: 5.0
reviews_count:
country: "United States"
upwork_member_since:
opportunity_score:             # leave blank — sheet computes

# Drafting strategy
template_used: B               # A–H from 10-proposal-templates.md
opener_formula: A              # A–E from 08-proposal-writing-playbook.md
proof_points_cited:
  - CodeGPT (1M-user CS automation, 3-person team)
  - Keylead (real-estate lead-qualification: hours → seconds)
overrated_take: "Multi-agent frameworks (CrewAI/AutoGen) for most production work."
underrated_take: "Observability and replay — you can't tune what you can't see."
ab_tags:                       # free-form labels for later clustering
  - numbered-requirements
  - builder-not-advisor-framing
  - pacific-async

# Outcome (update as status changes)
status: Submitted              # Submitted | Viewed | Replied | Interview | Won | Lost
status_updated: 2026-04-27
response: No                   # Yes | No
interview: No                  # Yes | No
contract_value:                # number, only on Won
notes: "Hit all 3 hard requirements. Low competition (<5 proposals)."
---

## Job post

> Paste or summarize the original Upwork post here. If it's long, summarize the key points and quote any explicit requirements verbatim.

## Proposal sent

The exact text we submitted to Upwork. Verbatim.

## Strategy notes

Why we picked this template/opener/proof. What we leaned into. What we deliberately avoided. Anything a future agent should know when comparing this draft to others.

## Outcome log

Append-only timeline of status changes:

- 2026-04-27 — Submitted.
```

## Hard rules

1. **One file per proposal.** No batching multiple drafts into a single file.
2. **Frontmatter must be valid YAML** — empty values stay blank (`hires:`), never `null` or `"unknown"`.
3. **The `## Proposal sent` section is the canonical text.** It must match what Upwork received character-for-character.
4. **Update `status`, `status_updated`, `response`, `interview`, `contract_value`, and the `## Outcome log`** as the proposal progresses. The frontmatter stays in sync with the sheet.
5. **Never delete a draft file.** If a proposal is archived or void, set `status: Lost` and add a note — the corpus needs the negative examples.
6. **Anonymize client names** in the filename and frontmatter if the post doesn't publicly reveal them. Real names can go in the `notes` field if needed for internal lookup.

## How to query the corpus

Once you have ≥30 drafts, the corpus becomes useful:

```bash
# Win rate by template
grep -l "template_used: A" drafts/*.md | xargs grep "status: Won" | wc -l

# All real-estate proposals
grep -l "real-estate\|brokerage\|MLS" drafts/*.md

# Highest-value wins
grep -l "status: Won" drafts/*.md | xargs grep "contract_value:" | sort -t: -k2 -nr | head -10
```

For more sophisticated analysis, the agent can read the whole `drafts/` directory and compute win rates by opener, ICP, proof-point, etc.

## Linkage to the sheet

Each draft frontmatter includes `sheet_row:` (informational — rows shift if anyone deletes/reorders) and the date+client slug, which together uniquely identify the row in the `Proposals` tab. The sheet's `Notes` column should reference back: `see drafts/2026-04-27_property-mgmt-ca-nv-tx-fl.md`.
