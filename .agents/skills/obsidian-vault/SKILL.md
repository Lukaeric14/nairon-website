---
name: obsidian-vault
description: Search, create, and manage notes in the Obsidian vault with wikilinks and index notes. Use when user wants to find, create, or organize notes in Obsidian.
---

# Obsidian Vault

## Detect the vault first

Before searching or writing:

1. If the current directory or an ancestor contains `.obsidian/`, use that as the vault root.
2. Else if `OBSIDIAN_VAULT` is set, use that path.
3. Else ask the user for the vault path.

Use `VAULT_ROOT` in every command example below.

## Naming conventions

- **Index notes**: aggregate related topics (e.g., `Ralph Wiggum Index.md`, `Skills Index.md`, `RAG Index.md`)
- **Title case** for all note names
- Prefer links and index notes over deep folder trees unless the user already has a strong folder convention

## Linking

- Use Obsidian `[[wikilinks]]` syntax: `[[Note Title]]`
- Notes link to dependencies/related notes at the bottom
- Index notes are just lists of `[[wikilinks]]`

## Workflows

### Search for notes

```bash
# Search by filename
find "$VAULT_ROOT" -name "*.md" | grep -i "keyword"

# Search by content
grep -rl "keyword" "$VAULT_ROOT" --include="*.md"
```

Or use Grep/Glob tools directly on the vault path.

### Create a new note

1. Use **Title Case** for filename
2. Write content as a unit of learning (per vault rules)
3. Add `[[wikilinks]]` to related notes at the bottom
4. If part of a numbered sequence, use the hierarchical numbering scheme

### Find related notes

Search for `[[Note Title]]` across the vault to find backlinks:

```bash
grep -rl "\\[\\[Note Title\\]\\]" "$VAULT_ROOT"
```

### Find index notes

```bash
find "$VAULT_ROOT" -name "*Index*"
```
