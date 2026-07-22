# Context7 documentation research

Use this workflow before general web search when a frontier question depends on current or version-specific documentation for a third-party library, framework, SDK, API, or platform.

## Research

1. Inspect manifests, lockfiles, imports, and configuration to identify the dependency and installed or targeted version.
2. Use Context7 MCP. Resolve the canonical library ID unless it is already known, then query its documentation with the exact version, topic, and decision being investigated.
3. Prefer the vendor documentation Context7 returns. Record the library ID, version, source, relevant date when available, conflicts, and uncertainty in the decision log.
4. Distinguish sourced facts from inference. Documentation informs recommendations; it does not make decisions.
5. If Context7 has no coverage or cannot answer confidently, record why, then read [exa.md](exa.md) and use Exa to find official documentation or other current sources.

## Ensure Context7 is available

Before the first lookup, check whether Context7 MCP tools are loaded and inspect the client's MCP or plugin list. If `context7` is configured, do not add a duplicate; continue to [Restart](#restart) only when it was just installed but its tools are not loaded.

If missing, install it at user scope using the client's official setup:

- Codex: run `codex plugin marketplace add upstash/context7`, then `codex plugin add context7@context7-marketplace`. This plugin supplies the Context7 MCP integration and handles OAuth.
- Claude Code: run `npx ctx7 setup --claude`, complete authentication, and choose MCP mode.
- Other clients: run `npx ctx7 setup`, complete authentication, and choose the detected client's MCP mode.

Context7 setup requires Node.js 18 or newer. Let the user complete browser or device authentication when prompted. Never print credentials or put API keys in project files.

## Restart

After installation, verify `context7` appears in the client's MCP or plugin list. Save the frontier, decisions, research, and restart reason in the log. Tell the user: `Context7 MCP is installed. Restart this agent session, then invoke grill-me again; I will resume from the decision log.` Then stop; do not claim the tools work before restart.

If installation or authentication fails, report the exact blocker. Continue with other unblocked frontier questions, but defer the documentation-dependent question. Do not silently skip Context7; use Exa only after recording that Context7 installation failed or Context7 could not answer.
