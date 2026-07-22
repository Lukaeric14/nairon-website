# Exa web research

Use this workflow when a frontier question needs broad current or external information. For current third-party library, framework, SDK, API, or platform documentation, follow [context7.md](context7.md) first. Use Exa when Context7 lacks the needed coverage or answer, or when the question needs wider web, market, competitor, or news research. Follow higher-priority project instructions when they require another specialist source.

## Research

- Use `web_search_exa` to discover current information, evidence, examples, competitors, market context, or technical sources.
- Use `web_fetch_exa` to read a known page.
- Prefer primary and authoritative sources.
- Record URLs, relevant dates, conflicts, and uncertainty in the decision log.
- Distinguish sourced facts from inference. Research informs recommendations; it does not make decisions.
- When useful, run independent Exa research in a sub-agent and return only distilled findings.

## Ensure Exa is available

Before the first search, check whether Exa MCP tools are loaded. If not, inspect the client's MCP server list.

If `exa` is already configured, do not add a duplicate; continue to [Restart](#restart). Otherwise install the hosted Exa MCP at user scope without adding project dependencies:

- Codex: `codex mcp add exa --url https://mcp.exa.ai/mcp`
- Claude Code: `claude mcp add --scope user --transport http exa https://mcp.exa.ai/mcp`
- Other clients: add `https://mcp.exa.ai/mcp` to the client's user-level MCP configuration using its native command or format.

The hosted endpoint requires no API key. Never put API keys in URLs or project files.

## Restart

After installation, verify `exa` appears in the client server list. Save the frontier, decisions, research, and restart reason in the log. Tell the user: `Exa MCP is installed. Restart this agent session, then invoke grill-me again; I will resume from the decision log.` Then stop; do not claim the tools work before restart.

If installation fails, report the exact blocker. Continue with other unblocked frontier questions, but defer questions requiring online research. Do not silently use weaker web research unless the user asks.
