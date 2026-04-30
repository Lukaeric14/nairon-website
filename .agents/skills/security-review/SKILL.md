---
name: security-review
description: Perform a focused security review using STRIDE threat modeling, code inspection, and exploitability checks. Use when the user asks for a security review of a repository, pull request, or change set.
user-invocable: false
---

# Security Review

Conduct a focused security review using the repository threat model plus direct code inspection.

## Prerequisites

- A git repository to review
- A threat model at `.agent-security/threat-model.md`

If the threat model is missing, generate it first with the `threat-model` skill.

## Workflow

### 1. Confirm Review Scope

Determine whether this is:

- A PR review
- A staged-change review
- A branch comparison
- A full repository audit

### 2. Load the Threat Model

Read:

- `.agent-security/threat-model.md`
- `.agent-security/security-config.json` if present

### 3. Inspect the Relevant Code

Review changed files and related code paths for STRIDE issues:

- Spoofing
- Tampering
- Repudiation
- Information disclosure
- Denial of service
- Elevation of privilege

### 4. Validate Findings

For each finding, assess:

- Reachability
- Attacker control
- Existing mitigations
- Real exploitability

### 5. Produce Structured Output

Write validated results to:

- `.agent-security/validated-findings.json`

Then summarize:

- Confirmed findings
- Rejected findings
- Severity distribution
- Concrete remediation priorities

## Gotchas

- Do not report theoretical issues without a reachability check.
- Threat-model alignment matters: review findings in system context, not in isolation.
- If a suspicious pattern is framework-mitigated, say so explicitly.
