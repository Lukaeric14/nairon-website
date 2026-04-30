---
name: improve-agents-md
description: Restructure an AGENTS.md file with conditional `<important if="...">` blocks so task-specific instructions are easier for coding agents to apply reliably. Use when the user wants to tighten a long AGENTS.md, improve adherence, or separate always-on rules from task-specific guidance.
user-invocable: true
---

# Improve AGENTS.md

Restructure an `AGENTS.md` file so foundational rules stay always visible and task-specific guidance is grouped under conditional blocks.

## Input

Full request: $ARGUMENTS

Accepts:

- No arguments: use `AGENTS.md` in the current directory
- Path to a specific `AGENTS.md`

## Workflow

### 1. Read and Assess

Find the target file and read it. If it is already concise, explain that no restructuring is needed.

### 2. Classify the Content

Separate content into:

- Foundational guidance: project identity, stack, commands, universal rules
- Task-specific guidance: testing, database work, UI rules, deployment, security, docs, migrations

### 3. Rewrite for Better Routing

Produce a rewritten version that:

1. Keeps foundational content unwrapped
2. Groups task-specific rules into a small number of conditional blocks
3. Uses narrow conditions
4. Preserves managed comment markers already present in the file
5. Preserves content, while improving structure

### 4. Preview and Confirm

Show the user what will move and under which conditions, then ask whether to apply it.

### 5. Apply

If approved, write the restructured file and summarize the change.

## Gotchas

- Do not create one conditional block per bullet.
- Do not wrap universal build or safety rules.
- Preserve existing managed markers and generated sections exactly.
