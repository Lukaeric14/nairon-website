---
name: threat-model
description: Generate a STRIDE-based security threat model for a repository. Use when setting up security review for a new repo, after architecture changes, or when the user asks for a threat model or security baseline.
user-invocable: false
---

# Threat Model

Generate a repository threat model using the STRIDE methodology.

## Output Files

Create or refresh:

- `.agent-security/threat-model.md`
- `.agent-security/security-config.json`

## Workflow

### 1. Analyze the Repository

Identify:

- Primary languages and frameworks
- Entry points
- External interfaces
- Data stores
- Queues, jobs, caches, and third-party services

### 2. Map Trust Boundaries

Define:

- Public entry points
- Authenticated surfaces
- Internal-only paths
- Admin-only operations

### 3. Inventory Critical Assets

Document:

- PII
- Credentials and secrets
- Business-critical data
- High-value admin actions

### 4. Run STRIDE Analysis

For each major boundary and component, evaluate:

- Spoofing
- Tampering
- Repudiation
- Information disclosure
- Denial of service
- Elevation of privilege

### 5. Write the Threat Model

The markdown file should include:

1. System overview
2. Trust boundaries
3. Asset inventory
4. Threat analysis
5. Existing mitigations
6. Vulnerability pattern library
7. Review cadence and update triggers

The JSON config should include severity thresholds and any repository-specific review hints.

## Gotchas

- The point is practical review guidance, not compliance theater.
- Keep the model specific to the actual architecture.
- Refresh it after significant auth, infrastructure, or data-flow changes.
