---
name: project-context
description: Scaffold or update a durable repo-local context vault under project-context/, route "remember this" knowledge into AGENTS.md or project-context/, and maintain the canonical business glossary. Use when starting a new repo, priming a codebase for coding agents, persisting durable repo knowledge, or defining domain terms and ubiquitous language.
---

# Project Context

Create or refresh durable repo knowledge so important context does not stay trapped in chat history.

This skill covers three related jobs:

- scaffold or refresh `project-context/`
- route "remember this" knowledge to the right durable location
- build or extend the canonical business glossary

## Target structure

Create this structure when it does not already exist:

```text
project-context/
├── index.md
├── principles.md
├── architecture/
│   └── overview.md
├── business-context/
│   ├── index.md
│   ├── context.md
│   ├── glossary.md
│   └── team.md
├── decisions/
└── pitfalls/
```

## Workflow

### 1. Detect the intent

Work out whether the user is asking for one of these:

- **Scaffold**: create or refresh the repo-local context vault
- **Remember**: persist a rule or fact for future work
- **Glossary**: define domain terms or standardize ubiquitous language

### 2. Scan the repo before asking questions

Before asking the user anything, scan the repo for the highest-signal sources of truth:

- `README*`
- `AGENTS.md`
- package manifests and lockfiles
- top-level app/service folders
- `docs/`
- CI and deployment config
- schema, migrations, and API route files
- major UI entrypoints and core domain models

Infer as much as possible from code and docs first. Only ask follow-up questions for business or ownership gaps the repo genuinely cannot answer.

### 3. Detect what already exists

- Read any existing files in `project-context/` first.
- Merge and extend them. Do not overwrite useful content with empty templates.

### 4. Route the knowledge

#### Put it in `AGENTS.md` when it is:

- an always-on rule
- a command convention
- a hard constraint
- an "always" / "never" instruction
- a verification or workflow requirement

#### Put it in `project-context/` when it is:

- business context
- stakeholder or team detail
- domain terminology
- architecture notes
- decisions with rationale
- pitfalls and lessons learned

If the user said "remember" or "don't forget", strip the trigger phrase and keep only the durable content before storing it.

### 5. Capture the starter business context

After the repo scan, ask only the minimum still needed to seed the files:

- product type
- product stage
- who the users are
- whether non-engineers propose features
- team members and roles
- domain terms likely to confuse an agent

### 6. Write the core files

Seed these files with concise, durable content:

- `project-context/business-context/context.md`
- `project-context/business-context/glossary.md`
- `project-context/business-context/team.md`
- `project-context/architecture/overview.md`
- `project-context/principles.md`

Keep them lean. Bullet points beat essays.

### 7. Build or update the glossary

When the request is about domain language:

- scan the conversation for domain-relevant nouns, verbs, and concepts
- scan the codebase's domain-facing names: models, APIs, UI copy, schemas, docs
- identify terminology problems:
  - same word used for different concepts
  - different words used for the same concept
  - vague or overloaded terms
- propose canonical terms and aliases to avoid

Write or update:

- `project-context/business-context/glossary.md`

If a standalone glossary is explicitly requested and `project-context/` is out of scope, use `UBIQUITOUS_LANGUAGE.md` instead.

### 8. Create the indexes

- `project-context/index.md` should link to the main sections.
- `project-context/business-context/index.md` should link to business context, glossary, and team files.

### 9. Use topic files for decisions and pitfalls

Do not create mega-docs for everything. When you discover a specific decision or pitfall, create one file per topic under:

- `project-context/decisions/`
- `project-context/pitfalls/`

Examples:

- `project-context/decisions/auth-provider.md`
- `project-context/pitfalls/migrations.md`

## Default file expectations

### `business-context/context.md`

Capture:

- product type
- current stage
- user segments
- constraints that affect prioritization
- any important stakeholder or launch context

### `business-context/glossary.md`

Capture domain terms that could be confused with technical language.

Prefer:

- one canonical term per concept
- aliases-to-avoid when terminology is muddy
- short relationships when they help clarify concepts

### `business-context/team.md`

Capture names, roles, ownership, and whether someone is technical or non-technical.

### `architecture/overview.md`

Summarize:

- main product surfaces
- major services or apps
- key external integrations
- main data flow
- trust boundaries worth remembering

### `principles.md`

Record high-level engineering or product principles that matter across many tasks.

## Gotchas

- Do not treat this as a template-fill exercise. Start from the repo, not from placeholders.
- `AGENTS.md` is for always-on rules. `project-context/` is for context, rationale, and shared memory.
- Keep one topic per file in `decisions/` and `pitfalls/`.
- A context vault nobody can scan is almost as bad as no vault at all. Favor short, linkable notes.
- Do not persist ephemeral task state or one-off debugging notes.
- If the note only matters for a temporary branch or session, do not store it.
