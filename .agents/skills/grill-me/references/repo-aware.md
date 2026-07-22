# Repository-aware grilling

Use this mode when the subject lives in an existing repository or depends on its current behavior, domain language, architecture, or durable plans.

## Establish the ubiquitous language

Before the first decision, find and read the repository's canonical domain glossary. Prefer an existing `UBIQUITOUS_LANGUAGE.md`, domain `CONTEXT.md`, or equivalent canonical home; never create a competing glossary.

If no glossary exists, run `ubiquitous-language` and create `UBIQUITOUS_LANGUAGE.md` before grilling. Seed only the terms needed for the current feature, migration, bug, and its immediately related domain boundaries; do not block the first question on a whole-repository language audit. On every later session, read it first and add new domain-specific terms, names, concepts, aliases, relationships, and ambiguities discovered through investigation or answers. Keep definitions short and exclude generic implementation words without domain meaning.

If code, tickets, documentation, or conversation conflicts with the glossary, use the canonical term in questions and briefly explain the correction so the developer can use it going forward. Record the conflicting usage as an ambiguity; do not silently redefine the glossary. Resolve the meaning with evidence or a user decision, then update the canonical entry.

## Inspect before asking

Read the nearest project instructions first. Then inspect only the relevant:

- modules, routes, components, schemas, configuration, and tests
- plan, spec, PRD, issue, or decision map being sharpened
- root `CONTEXT.md`, or relevant contexts named by `CONTEXT-MAP.md`
- system-wide and context-specific ADRs

Confirm what the system does today. Answer repository-findable questions yourself. Ask the user only for real decisions or information the repository cannot supply.

For missing external facts, use Context7 first when current or versioned third-party documentation can answer, then Exa when Context7 lacks coverage or broader online research is needed. A sourced fact narrows the decision; it is not an answer option. Label conclusions not directly established by the sources as inferences, with their evidence and remaining unknowns.

Before the first round, summarize the most relevant current behavior, vocabulary, decision history, contradictions, and gaps. For a code-linked question, name the primary file and behavior on the selected question surface. Add at most two supporting paths and only the shortest useful snippet.

## Publish to one canonical home

Identify where each kind of settled information belongs:

- plan, feature, migration, or behavior decisions: the canonical plan, spec, PRD, issue, map, or other subject document
- domain terms and relationships: the relevant `CONTEXT.md`
- hard-to-reverse, surprising architectural tradeoffs: an ADR

If a decision has no durable home, add that destination to the frontier before finishing. Never copy the same decision prose into several files. The `.context` decision log stores pointers, frontier state, blockers, and evidence; it is not a shadow spec.

After every round, update canonical docs automatically for answers that settled. Do not ask for separate write approval. Change only settled sections and preserve unrelated content.

## Mark unfinished documents

While questions remain:

- Add a short document-level banner to each canonical Markdown plan, spec, PRD, map, or `CONTEXT.md` touched by the session: `> Status: In progress — Grill Me is resolving open decisions.` Preserve an equivalent existing convention instead of adding another.
- Give new or reopened ADRs `proposed` status using the repository's ADR convention. If none exists, use `status: proposed` in YAML frontmatter.

After the user confirms shared understanding, verify publication, remove the in-progress banners, and change accepted ADRs from `proposed` to `accepted`. Do not finalize a document that still contains unresolved or deferred decisions without labeling them clearly.

## Keep the domain model honest

When answers change domain terms, relationships, boundaries, or architecture, use `domain-modeling` when available; otherwise apply the rules below directly.

- Challenge conflicts with the existing glossary immediately.
- Replace vague or overloaded terms with one precise canonical term.
- Test relationships with concrete edge cases.
- Check user claims against code and surface contradictions.
- Create `CONTEXT.md`, context maps, and ADR directories lazily.
- Keep `CONTEXT.md` implementation-free: it is a glossary and relationship model, not a feature spec.
- Create an ADR only when the choice is hard to reverse, surprising without context, and based on a real tradeoff.

Repository inspection and decision-document updates are part of grilling. Product code, migrations, configuration changes, and other implementation wait for explicit user approval after shared understanding.
