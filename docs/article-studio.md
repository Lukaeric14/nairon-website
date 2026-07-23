# Signals Writing Studio

> Status: Core V1 implemented on 2026-07-23. Production rollout and the follow-up work listed below are still pending.

## Product intent

The Signals Writing Studio is an admin-only article-builder product inside the Nairon site. It helps Nairon develop original technical thinking, turn it into a public Signals article, and serve readers at two depths without handing authorship to AI.

The primary outcome is reader understanding. A reader should leave able to explain the core idea and use it. Publication speed and qualified demand are important guardrails, but they do not override clarity or intellectual honesty.

## Audience and reading modes

- The **Deep Read** is written for technical builders and preserves mechanisms, evidence, tradeoffs, and nuance.
- The **Brief** serves time-poor nontechnical readers with the bottom line, practical consequences, supporting evidence, and important limits.
- Both modes belong to one Signals article. The Writing Coach proposes a starting Brief from the Deep Read, then the admin edits and approves the Brief as its own saved reading mode.

For a public visitor's first article visit, the Brief is the default. A prominent control opens the Deep Read. The browser remembers the visitor's reading mode and reading position, and switching modes takes them to the closest matching section rather than the top.

## Public reading experience

The public article page is a continuous, responsive reading surface with optional aids rather than an enforced step-by-step reader. It includes:

- text-size, reading-width, and reduced-motion controls;
- an optional **Focus mode** that emphasizes the active section and quiets the surrounding article;
- local restoration of the visitor's last reading mode and position;
- visible controls for switching between the Brief and Deep Read at the corresponding section;
- an on-demand explanation panel for selected published text, with `Explain simply`, `Give an example`, and `Go deeper` actions.

Reader explanations may use only the selected passage and the public **Published revision**. They must not expose Drafts or private References, and they must be clearly labeled as AI-generated supporting explanations rather than new article claims. The endpoint requires caching, rate limits, and abuse controls before public release.

## Authorship boundary

The Writing Coach follows the behavioral boundary demonstrated by Hermes:

- It reads the current article context and acts as a rigorous thinking partner.
- It asks questions and surfaces structural, evidentiary, voice, and clarity problems.
- It may propose beats and small, specific edits.
- It never silently changes prose or accepts its own suggestions.
- A human author approves every claim and accepted edit and remains publicly accountable for the article.

## Draft and article canvas

Creating an article immediately creates a saved **Draft** with one large, distraction-free, Hermes-like **Article canvas**. An admin may reopen an existing Draft and continue at any time.

The canvas is intentionally free-form. The admin may type, paste, or dictate **Raw thoughts** anywhere in it. The product does not force the author to complete fields, follow visible phases, or organize an idea before capturing it.

Imported **References** live beside the Draft as context for the Writing Coach. A Reference does not enter the article body unless the admin deliberately uses or cites it. Image intake is out of V1 scope.

The admin may explicitly invoke `Run first pass` on the current canvas and References. The Writing Coach then:

1. preserves the intake unchanged;
2. summarizes the apparent argument;
3. adds 3–5 high-value inline highlights;
4. asks one important next question.

The assistant does not run continuously or trigger after an idle timer. Other explicit Hermes actions may review, highlight, edit, or reorganize the Draft. Every proposed change requires human acceptance.

The full editor is desktop-first. On mobile, an admin can quickly type or dictate into a Draft without navigating the full editorial interface. Dictation inserts a transcript at the current cursor and discards the source recording after transcription.

Drafts autosave continuously and keep restorable version history. Only one admin actively edits a Draft at a time; another admin opening it sees the active editor and may not silently overwrite their work.

Unsynced local edits remain recoverable when the network drops. Reconnecting must reconcile them explicitly rather than silently choosing the server or browser copy.

The Writing Coach combines a collapsible side panel with inline highlights. Small changes are accepted or rejected individually. A reorganization first appears as a complete preview, and nothing moves until the admin accepts it.

## Workspace and lifecycle

The visible product remains one Article canvas with supporting References and Hermes controls. Intake, shaping, writing, and publishing are actions the admin can take, not separate locked workspaces. The product does not gate ordinary writing or navigation. Publication still requires explicit checks.

The V1 lifecycle is **Draft → Ready → Published**. Publishing creates an immutable **Published revision** while subsequent edits continue in the next Draft.

If the Deep Read changes after its Brief was approved, the Brief becomes **Possibly outdated**. The admin may regenerate it as a starting point or edit it directly, then approves it again. It never rewrites itself silently.

## Writing standard

The Writing Coach and publishing review apply these rules:

- Use a practical form of Orwell's six writing rules: remove stale phrases, prefer short familiar words, cut words that add no meaning, prefer active voice, avoid unnecessary jargon, and break a rule when clarity requires it.
- Apply the **Attention test**: every word, sentence, and section must advance the reader's understanding enough to earn its place.
- State ideas simply and concisely, like one informed human speaking to another.
- Do not use technical language to perform expertise. Necessary technical terms are allowed, explained plainly on first use, and flagged when left unexplained.

Admins may run writing checks at any time. Moving a Draft to Ready requires reviewing unresolved findings, but a finding remains an editorial warning rather than an automatic publishing block. An admin may deliberately override it.

The **Voice profile** learns from approved human-written articles and from the AI suggestions admins accept or reject. Its derived rules remain visible and editable; it may not silently turn a statistical habit into a mandatory house rule.

## Detect AI slop

The Article canvas includes an admin-triggered `Detect AI slop` action. It is a style diagnostic, not an AI-authorship detector: it must never claim that a person or model wrote the text or return an “AI percentage.”

The diagnostic combines the concrete pattern catalogue from `petergyang/no-ai-slop` with the voice-preservation and false-positive safeguards from `blader/humanizer`. It should:

- read the whole Draft before judging individual lines;
- preserve deliberate voice, humor, uncertainty, fragments, profanity, and irregular rhythm;
- look for clusters of formulaic patterns rather than treating one word or punctuation mark as proof;
- attach each finding to the exact passage and name the pattern in plain language;
- explain briefly why the passage may weaken this specific article;
- offer an optional, local edit beside each finding;
- never invent facts, examples, claims, or sources;
- leave the Draft unchanged until the admin explicitly accepts a proposed edit.

Unresolved Slop findings do not block publication. They remain visible in the Ready review so the accountable human author can fix or knowingly override them.

## Pangram experiment

The Article canvas also includes a separate `Try Pangram` action. It sends the current Draft to Pangram's V3 API only when an admin explicitly clicks the button and a `PANGRAM_API_KEY` is configured in the Convex environment.

Pangram's response is displayed as a third-party, probabilistic classification with its label, score fractions, and highlighted windows when available. The Studio always says that this result is **not proof of authorship**. It must not block publishing, replace the local style diagnostic, or be presented as a reliable way to decide whether a human wrote the article.

## References, claims, and privacy

Core V1 References are pasted text with an optional source URL. Automated webpage, PDF, and document extraction is follow-up work. Images are not imported as article material.

The Writing Coach may flag a claim that lacks support and suggest a citation from imported References. It may not invent a citation or confirm its own suggestion. An admin reviews each source, decides whether it supports the claim, and explicitly accepts the citation.

Confidential company material is permitted only through a Nairon-approved AI provider whose configured terms prohibit training on or retaining that material. Private References remain available only to authorized admins and are never passed to public reader explanations.

Imported webpages and documents are untrusted content. The system treats their text as evidence, never as instructions, and validates file type, size, redirects, and extracted content before making it available to the Writing Coach.

An AI, transcription, scraping, or network failure must not block manual writing or lose captured text. The Studio preserves the Draft, explains which operation failed, and offers a safe retry.

## Concept models and Diagram Skill

Signals articles may contain Momito-style **Concept models**: interactive explanations with labeled actors, visible state, reader controls, and a complete reduced-motion state.

Public Concept models begin only after the visitor activates them and provide Pause and Reset. A Brief includes a Concept model only when it is essential to understanding the short argument.

The workspace skill at `.agents/skills/create-article-diagrams` must:

1. identify concepts that materially benefit from interaction;
2. produce a storyboard and explicit state model;
3. generate an implementation-ready React component;
4. include reduced-motion and accessibility behavior;
5. include a verification and test checklist;
6. require editorial and engineering review before publication.

The Diagram Skill ships in V1 and runs on demand when the Deep Read is nearly finished. It does not add a diagram merely to decorate a page. Admins may edit labels, explanations, and model data; an engineer reviews component code and motion behavior before the component can enter a Published revision.

## Access, publishing, and recovery

- A site owner grants or removes the Writing Studio **Admin** role on named authenticated accounts.
- The existing careers email-and-shared-token check is not valid authorization for the Writing Studio.
- Every Published revision names a human Author and may name human editors. AI is never the byline.
- The Ready review covers the Brief, sources, accessibility, writing findings, Concept models, and final human approval. Warnings may be overridden with a recorded reason.
- An admin may publish immediately or unpublish. Every publication creates an immutable revision at the stable article URL. Preview and scheduled publication remain follow-up work.
- Deleting a Draft moves it to Trash. Automatic permanent deletion after 30 days remains follow-up work.
- The existing Signals article is imported as a Published revision without changing its URL or SEO metadata.

## Measurement

Public article analytics are privacy-friendly and limited to the signals needed to improve understanding: article completion, Brief/Deep Read switches, and Concept-model interactions. They must not require an account or build an advertising profile.

## Implemented core

- Better Auth sign-in with server-enforced `admin` and `owner` access. Owners can grant or revoke Studio access by email.
- A free-form Draft canvas with browser dictation, autosave, recoverable local unsynced text, saved versions, restore, edit locks, References, Brief and Deep Read modes, and trash/restore.
- Explicit Writing Coach actions with a deterministic first-pass fallback, a local slop-and-rhythm diagnostic, and the opt-in Pangram experiment.
- Draft, Ready, Published, and Unpublished states. Publishing snapshots an immutable revision; editing afterward creates a new Draft without mutating the live article.
- Dynamic public article routes, a public Signals index, Brief-first reading, Deep Read switching, reader preferences, focus mode, reading-position memory, selected-text explanations with caching/rate limiting, and an accessible interactive Concept model.
- A reusable `.agents/skills/create-article-diagrams` workflow for deciding, storyboarding, implementing, and verifying useful article diagrams.

## Configuration

The Studio uses these Convex environment variables:

- `WRITING_STUDIO_OWNER_EMAILS` — comma-separated initial owner emails. It defaults to Nairon's owner email when omitted.
- `SITE_URL` — the trusted website origin used by Better Auth.
- `BETTER_AUTH_SECRET` — the Better Auth signing secret.
- `RESEND_API_KEY` — sends the admin account verification email required in production.
- `WRITING_STUDIO_ALLOW_UNVERIFIED_EMAIL` — local-development escape hatch only. Set it to `true` only on an isolated development deployment without production data.
- `OPENAI_API_KEY` — optional Writing Coach and public selected-passage explanations. Manual writing and local checks continue when it is absent or unavailable.
- `PANGRAM_API_KEY` — optional Pangram V3 experiment. The button shows a clear configuration message when it is absent.

## Remaining production work

- Configure and verify approved production providers, secrets, retention terms, and privacy disclosures for OpenAI, Pangram, browser speech recognition, and future source extraction.
- Add per-article server-rendered metadata, structured data, sitemap and `llms.txt` entries for database-backed Published revisions.
- Add preview URLs, scheduled publication, audit events, trash expiry, richer citation review, and safe webpage/PDF/document extraction.
- Extend offline recovery into explicit two-copy conflict reconciliation and add lock takeover/administrator recovery.
- Add privacy-friendly completion and reader-control analytics without advertising profiles.
- Expand automated authorization, publication, recovery, keyboard, screen-reader, zoom, contrast, and reduced-motion coverage before production release.

## Design and research sources

- [Hermes](https://github.com/Egotistical-Engineering/hermes/tree/0fd5bb8) — human-led writing, document-aware coaching, inline review, autosave, and immutable published pages.
- [Inside Lago voice skill](https://github.com/getlago/inside-lago-voice-skill/tree/b6339f0) — editable voice rules, human samples, audience registers, and AI-draft versus accepted-copy calibration.
- [No AI Slop](https://github.com/petergyang/no-ai-slop/tree/61c21c351da4dcb40946a11fead978f2078a2c65) and [Humanizer](https://github.com/blader/humanizer/blob/523374dee72d67c7b2b5f858ea0094ffda49c3ac/SKILL.md) — named pattern findings, minimum effective edits, false-positive safeguards, voice preservation, and no authorship scoring.
- [Words per Sentence](https://words-per-sentence.netlify.app/) — navigable sentence-length rhythm as a diagnostic rather than a quality score.
- [Rabbithole](https://github.com/shlokkhemani/rabbithole/tree/02a4bc5) — selected-text explanations, persistent context, and explanation lenses.
- [Momito's Cloudflare primitives article](https://momito.co.uk/cloudflare-primitives/) — labeled interactive explanations with visible state, Pause, and Reset.
- [W3C cognitive-accessibility design guide](https://www.w3.org/TR/coga-usable/design_guide.html) and [user-focus guidance](https://www.w3.org/WAI/WCAG2/supplemental/objectives/o5-user-focus/) — clear structure, familiar controls, reorientation, fewer distractions, and personalization.
- [CHI 2026 ADHD typography study](https://dl.acm.org/doi/10.1145/3772363.3799383) — supporting evidence for customizable, distraction-free reading, visual breaks, and shorter chunks; user testing is still required.
- [Orwell Foundation guide to style](https://www.orwellfoundation.com/wp-content/uploads/2024/09/Guide-to-style.pdf) — plain words, transparent sourcing, and cutting excess.
