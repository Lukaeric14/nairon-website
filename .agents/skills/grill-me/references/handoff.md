# Cross-developer grilling handoff

Keep this inside `grill-me`; do not create a second pickup skill.

Commands:

- `pass`: transfer the current repository-aware session through its current PR.
- `pass @developer`: transfer it to a GitHub login through the current PR.
- `pass <PR URL> [@developer]`: transfer it through an explicit PR.
- `pickup <PR URL>`: claim and resume the newest eligible handoff on that PR.

This protocol requires a GitHub PR both developers can access. Without one, use `handoff` when available. Otherwise write a redacted OS-temp handoff with canonical pointers, unresolved state, evidence, and suggested skills; share only through a user-approved channel.

## Pass

Treat an explicit `pass` command as permission to publish one PR comment.

1. Finish processing answers already given. Keep unanswered questions unresolved.
2. Update canonical documents with settled answers and retain their in-progress markers.
3. Update the local decision log. Do not delete it: grilling is unfinished.
4. Resolve the PR from the supplied URL or current branch. Record its URL and current head SHA. If the workspace has no PR, ask for one or use the non-PR fallback above.
5. Resolve the sender and optional recipient as GitHub logins. If a named recipient is ambiguous, ask once.
6. Publish the packet below with the next handoff id in this lineage. Reference canonical decisions by path or URL; do not repeat their prose.
7. Verify the comment URL, report who can pick it up, and stop grilling. Do not continue asking questions after a successful pass.

Use an append-only marker so another agent can discover the packet. Set `parent` to the handoff this session claimed, or JSON `null` for the first handoff; use the same rule for an unaddressed `to` value.

````markdown
<!-- grill-me-handoff:v1 {"id":"GMH-<timestamp>-<short-id>","parent":null,"head":"<sha>","to":null} -->
## Grill Me handoff: <topic>

**From:** @<login>

**To:** @<login> or first claimant

**PR head:** `<sha>`

### Business context
<current behavior, intended outcome, customer or operational stakes, and constraints>

### Canonical record
- <path or URL plus what it owns>

### Settled since the last handoff
- <pointer and one-line gist; no duplicated decision prose>

### Unresolved frontier
1. <standalone question>
   - Blocked by: <none or prerequisite>
   - Current recommendation: <answer, business impact, and tradeoff>

### Research and verification
- <sources, versions, code paths, tests, running or deferred research>

### Decision map
```mermaid
<portable focused diagram>
```

### Live visual
- Renderer: <Sideshow or Grill Visuals>
- Shareable deep link: <approved HTTPS URL or none>
- Grill Visuals ownership receipt: <non-secret `grill-visuals handoff --json` output or none>

### Pick up
Run `/grill-me pickup <PR URL>` from a clean workspace for this PR.
````

Never include secrets, inaccessible local paths, private file contents, credentials, or localhost URLs. Include a shareable renderer link only when the original developer approved sharing. Include a Grill Visuals ownership receipt only when the original developer confirmed publication and the PR is an approved handoff channel. Always include a portable diagram so pickup can recover without the hosted page.

## Pick up

Treat `pickup <PR URL>` as permission to read the PR and publish one claim comment.

1. Fetch the PR metadata, head SHA, diff, comments, canonical documents, and relevant code. Use the host's safe PR-workspace flow. Never overwrite local changes; if the current workspace cannot safely inspect or update the PR branch, ask the user to open a clean PR workspace and rerun pickup.
2. Parse `grill-me-handoff:v1` markers and claim markers chronologically. Select the newest unclaimed handoff addressed to the current GitHub login, or the newest unaddressed handoff. If none exists, stop and say why.
3. Re-fetch comments immediately before claiming. Publish:

```markdown
<!-- grill-me-handoff-claim:v1 {"handoff_id":"<id>","head":"<current-pr-sha>","by":"<github-login>"} -->
@<sender> picked up by @<github-login>.
```

4. Re-fetch claims. The earliest claim wins; if another claim is earlier, stop without modifying grilling documents.
5. Compare the handoff SHA with the current PR head. If they differ, inspect intervening changes, invalidate stale facts, and recompute affected frontier branches before asking anything.
6. Recreate `.context/grill-me-<topic>.md` from pointers, evidence, and unresolved state. Read canonical docs for settled decisions instead of copying them into the log.
7. Recreate the decision map with the renderer chosen at the start of this pickup session. If Grill Visuals was chosen and the handoff has a receipt, show its exact project and URLs through the selected question surface. After explicit confirmation, import it with `grill-visuals pickup --session <id> --receipt <file> --yes`; this transfers no credential. Otherwise recreate it from the portable diagram and use any approved shareable link only as reference. Update it from current repository facts.
8. Resume at the current frontier through the selected question surface. Do not re-ask settled questions.

When this developer later runs `pass`, create a new handoff whose `parent` is the handoff they claimed. This supports transfers back to the original developer or onward to another developer while keeping a clear lineage on one PR.
