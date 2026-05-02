---
name: git-guardrails
description: Install local guardrails that block dangerous git commands before an agent executes them. Use when the user wants to prevent destructive git operations like push, reset --hard, clean -fd, branch -D, checkout ., or restore . in the current repo.
---

# Git Guardrails

Install a repo-local guard script that blocks destructive git commands before they run.

## Requirements

- Bash
- Python 3 (`python3 --version`)

The bundled script uses only the Python standard library. If `python3` is missing, install it with your OS package manager before wiring the guard into an agent hook.

## What this protects against

- `git push` and force-push variants
- `git reset --hard`
- `git clean -f` / `git clean -fd`
- `git branch -D`
- `git checkout .`
- `git restore .`

## Workflow

### 1. Create the guard script

Copy the bundled script at [scripts/block-dangerous-git.sh](scripts/block-dangerous-git.sh) into the target repo under:

```text
scripts/agent-guardrails/block-dangerous-git.sh
```

Make it executable with `chmod +x`.

### 2. Prefer hook integration when the agent supports it

If the current coding agent supports a pre-command hook, wire the script into that hook system. Merge with existing config instead of overwriting it.

If the agent does **not** support command hooks, do both of these instead:

- add a short guardrails section to `AGENTS.md` that explicitly forbids the dangerous commands above
- tell the user the repo now includes a reusable guard script they can plug into whatever agent or wrapper they use later

### 3. Keep the setup repo-local

- Do not install global hooks unless the user explicitly asks for a global install.
- Do not overwrite unrelated agent settings.
- Do not delete existing hooks; merge cleanly.

### 4. Verify

Smoke-test the script directly:

```bash
echo '{"tool_input":{"command":"git push origin main"}}' | scripts/agent-guardrails/block-dangerous-git.sh
```

Expected result:

- exits with code `2`
- prints a `BLOCKED:` message to stderr

## Gotchas

- The script blocks commands before they run. It does not replace good `AGENTS.md` rules or careful review.
- Hook config formats vary across agents. Reuse the repo-local script and adapt only the integration layer.
- Keep the installation local to the repo unless the user explicitly wants a machine-wide policy.
