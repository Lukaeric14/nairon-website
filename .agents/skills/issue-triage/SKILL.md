---
name: issue-triage
description: Run either a conversational QA session for multiple issues or a deep-dive triage of one reported problem, then create GitHub issues or local issue drafts with durable behavior descriptions and TDD fix plans as needed. Use when the user wants to report bugs, do QA, file issues conversationally, triage an issue, or investigate and plan a fix.
---

# Issue Triage

Handle issue intake in one of two modes:

- **QA session mode** for multiple reported issues or conversational bug intake
- **Deep-dive mode** for one specific issue that needs diagnosis, root cause analysis, and a TDD fix plan

If the user says "QA session", reports several issues, or is clearly doing issue intake, use QA session mode.

If the user asks to "triage" one issue, wants root cause analysis, or needs a fix plan, use deep-dive mode.

If the repo is not on GitHub or `gh` is unavailable, write local Markdown issues under `./issues/` instead.

## QA session mode

### 1. Listen and lightly clarify

Ask at most 2-3 short questions:

- what they expected
- what actually happened
- how to reproduce

Do not over-interview.

### 2. Explore the codebase in the background

Learn the relevant domain language and behavior boundary, but do not turn the issue into a file-path dump.

### 3. Decide whether to split

Break one report into multiple issues only when there are clearly independent failure modes or parallelizable slices.

### 4. File durable issue(s)

Describe behavior from the user's perspective.

Always include:

- what happened
- what was expected
- reproduction steps
- concise additional context

Do not include stale details like file paths or line numbers.

## Deep-dive mode

### 1. Capture the problem

If needed, ask one question: "What's the problem you're seeing?"

Then investigate immediately.

### 2. Diagnose

Trace:

- where the bug manifests
- what code path is involved
- why it fails
- what adjacent tests and patterns exist

### 3. Identify the fix approach

Determine:

- the minimal durable fix
- affected modules or interfaces
- behaviors that need tests

### 4. Write the TDD fix plan

Create ordered RED-GREEN cycles:

1. **RED**: a behavior-focused failing test
2. **GREEN**: the minimal change that makes it pass

Include a final refactor step if needed.

### 5. File the issue

Use a durable issue body with:

- problem statement
- expected behavior
- reproduction
- root cause analysis
- TDD fix plan
- acceptance criteria

## Output rules

- Prefer GitHub issues when available.
- Otherwise create `./issues/<slug>.md`.
- Use the repo's domain language.
- Keep issue bodies durable across refactors.
- Print the created issue URL or file path at the end.

## Gotchas

- QA session mode is about intake and durable issue writing, not immediate root-cause analysis for every report.
- Deep-dive mode is for one issue at a time.
- Do not collapse several independent bugs into one thick issue just because the user mentioned them together.
