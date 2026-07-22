# Protected-system access

Discover how the repository expects developers and agents to obtain credentials before asking the user.

## Find the approved path

Inspect relevant project instructions, nearest README and setup docs, runbooks, deployment docs, `.env.example` names, secret-manager configuration, and helper scripts. Search for the named system and terms such as `secrets`, `credentials`, `production access`, `database`, `logs`, `vault`, and `environment`.

Do not read or print raw `.env` values, keychain contents, tokens, passwords, connection strings, or private keys. The goal is to find the documented access mechanism, not extract its secret.

If the path is documented:

1. State what access is needed and why.
2. Use existing authenticated tools or the documented mechanism.
3. Ask only for the smallest missing permission, preferring read-only, time-limited, and narrowly scoped access.

If the path is missing or ambiguous, ask through the selected question surface where access is managed and how this repository expects an agent to use it. Be specific: ask for “read-only production Orders DB access through <documented mechanism>” rather than “send prod credentials.”

Once clarified, update the canonical setup or runbook with the mechanism, scope, owner, and retrieval steps. Never document a secret value.

Never place credentials in chat, native-question fields, `.context`, live diagrams, clipboard packets, PR comments, Linear tickets, screenshots, commits, or shell output. If no safe documented route exists, ask the developer to configure access outside the conversation or run the sensitive command themselves and return redacted results. Production mutation always requires separate explicit approval.
