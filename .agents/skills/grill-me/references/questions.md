# Question presentation

## Choose once at session start

Inspect the host's native structured user-question tool and its per-call question limit:

- Claude Code, including Claude sessions in Conductor: `AskUserQuestion`.
- Codex, including Codex sessions in Conductor: `request_user_input`.
- Other hosts: inspect the available tools for their native ask-user or structured-question equivalent.

If a native tool exists, use it for the first user-facing question:

```text
How should I show question rounds in this grilling session?

A. Native dialogs — structured controls, but the host may split a round across several dialogs.
B. One text batch — show every question in the logical round, up to 10, in one numbered message.
C. I don't understand — explain the formats more simply, then ask again.
```

Recommend and list **Native dialogs** first when the tool can show all 10 possible questions in one call. Otherwise recommend and list **One text batch** first so the developer can see the whole logical round at once. Record `question_surface: native` or `question_surface: text` in the decision log and use it until the user switches.

If no native tool exists, state the limitation once and select text mode. Do not offer a mode the host cannot support.

## Native mode

Put each question, concrete choices, recommendation, and applicable business context into the native tool's fields. Follow its schema and per-call limit. A logical round may contain up to 10 questions; if the tool accepts fewer, split the round across consecutive tool calls without recomputing the frontier until every question in that round is answered.

## One-text-batch mode

Show every question selected for the logical round, up to 10, in one numbered message. Include all material choices; text mode is not constrained by the native tool's option limit. End with:

```text
Reply by number. Use `rec all`, `1 rec`, `idu 2`, or `ask 2`.
```

Keep question numbers stable for the logical round. On a partial reply, record answered questions and show only the unanswered ones with their original numbers. Do not recompute the frontier or ask downstream questions until the batch is complete.

## Always offer simplification

Append this explicit, non-recommended choice to every question on either surface, including presentation and renderer setup, frontier decisions, clarifications, confirmations, and handoffs:

```text
Label: I don't understand
Description: Explain this question and its options more simply, give one example, then ask it again.
```

Place the recommended decision choice first and this help choice last. In native mode, do not rely on an automatic **Other** field: it does not tell the user that simplification is available. Respect the host's option limit. If all material choices plus this help choice do not fit, split the decision into smaller prerequisite questions; never hide a material choice.

Selecting it is not an answer. Do not accept the recommendation, resolve the decision, ask downstream questions, or record it as settled. Instead:

1. Keep the question on the current frontier and log that simplification was requested.
2. Explain what the decision controls and why it matters in plain words.
3. Define unavoidable technical terms once. Give one concrete example. Restate each option with its main consequence.
4. Simplify or focus the live diagram when that helps; remove it when it adds confusion.
5. Ask the same decision again through the selected question surface with the simplification choice still present.
6. If selected again, simplify further using a different example or explanation structure.

Process other answered questions from the round normally, but do not ask anything downstream of the unresolved question.

## Enable editable Codex dialogs

If the user selects native mode and Codex rejects `request_user_input` in Default mode:

1. Run `codex features list` and find `default_mode_request_user_input`.
2. If the feature exists and is disabled, run `codex features enable default_mode_request_user_input`.
3. Save the frontier, decisions, and restart reason in the decision log.
4. Tell the user to restart the agent session in Default mode, then stop.

Do not switch to Plan Mode merely to unlock the question tool. Grill Me must remain able to update its decision log and, in repo-aware sessions, approved durable documentation.

If the runtime truly exposes no native structured-question tool and no supported feature can enable one, text mode remains available.
