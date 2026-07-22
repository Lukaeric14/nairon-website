# Ubiquitous Language

> Status: Accepted for the Signals Writing Studio specification on 2026-07-23.

## Editorial product

| Term | Definition | Aliases to avoid |
| --- | --- | --- |
| **Signals article** | A public Nairon editorial work published under `/signals`. | Blog post, post |
| **Writing Studio** | The admin-only product used to develop, review, and publish a **Signals article**. | Article builder, CMS, thoughtful writing app |
| **Reading mode** | A reader-selectable presentation of the same **Signals article** for a distinct depth and time commitment. | Version, format |
| **Deep Read** | The complete **reading mode** that preserves the article's reasoning, evidence, and nuance. | Long version, deep understanding mode |
| **Brief** | The short **reading mode** that states the bottom line, evidence, practical consequences, and limits. | TLDR, summary |
| **Focus mode** | An optional public reading aid that emphasizes the active section without hiding the article's structure or changing its content. | ADHD mode, paginated article |
| **Reader explanation** | An on-demand explanation of selected text that uses only the public **Published revision**. | New article claim, private-reference answer |
| **Draft** | An unpublished, editable state of a **Signals article**. | Working copy |
| **Published revision** | An immutable public snapshot of a **Signals article** and all of its **reading modes**. | Live draft, current copy |

## Writing process

| Term | Definition | Aliases to avoid |
| --- | --- | --- |
| **Fragment** | A raw human-authored observation, claim, example, source, or question collected before the article is structured. | Note, snippet |
| **Article canvas** | The persistent free-form body of a **Draft**, where an admin may type, paste, or dictate raw thoughts anywhere. | Intake form, content form |
| **Raw thought** | Unstructured author material added directly to the **Article canvas** before or during organization. | Prompt, generated copy |
| **Reference** | Imported content available to the Writing Coach as context but excluded from the article unless the admin deliberately uses it. | Attachment, article content |
| **First pass** | An admin-triggered Writing Coach review of the current **Article canvas** and **References** that preserves the Draft, adds a few high-value highlights, and asks one important next question. | Light pass, initial generation |
| **Beat** | An ordered unit of reasoning developed from one or more **fragments**. | Section, step |
| **Voice profile** | The approved rules and examples that define how Nairon writing should sound. | Style prompt, tone preset |
| **Writing coach** | AI assistance that questions, critiques, and suggests changes while leaving consequential authorship decisions to the admin. | AI writer, copilot |
| **Writing signal** | A diagnostic about the draft, such as sentence-length rhythm, unsupported claims, repetition, or voice drift. | Score, lint error |
| **Attention test** | The editorial check that each word, sentence, and section advances the reader's understanding enough to justify the attention it costs. | Engagement score, brevity score |
| **Slop check** | An admin-triggered style review that finds clusters of formulaic writing patterns without guessing whether AI wrote the text. | AI detector, AI score |
| **Slop finding** | A review note attached to an exact passage that names a pattern, explains its effect, and offers an optional local edit that requires admin acceptance. | Proof of AI, violation |
| **Possibly outdated** | The state of a previously approved **Brief** after its Deep Read changes, requiring another human review. | Automatically synchronized, broken |

## Explanatory visuals

| Term | Definition | Aliases to avoid |
| --- | --- | --- |
| **Concept model** | An interactive article block that lets a reader inspect a system, sequence, state change, or tradeoff. | Animated diagram, illustration |
| **Diagram skill** | An agent skill that turns approved article reasoning into an implementation brief or code for a **concept model**. | Diagram generator, visualizer |
| **Reduced-motion state** | A complete, understandable presentation of a **concept model** that does not depend on animation. | Static fallback |

## People and access

| Term | Definition | Aliases to avoid |
| --- | --- | --- |
| **Admin** | An authenticated Nairon team member authorized to use the **Writing Studio**. | Careers admin, author |
| **Author** | The person publicly accountable for the claims in a **Signals article**. | Admin, AI writer |
| **Reader** | A public visitor consuming a **Signals article** in a chosen **reading mode**. | User, viewer |

## Relationships

- A **Signals article** has one or more **Drafts** and zero or more **Published revisions**.
- A **Signals article** has one **Deep Read** and one **Brief** when it is published.
- A first-time **Reader** sees the **Brief** and may switch to the **Deep Read** at the corresponding section.
- An **Admin** may edit a **Draft**, but an **Author** remains accountable for its claims.
- A **Beat** develops one or more **Fragments** into ordered reasoning.
- A **Draft** owns one **Article canvas** and zero or more **References**.
- A **Raw thought** may be typed, pasted, or dictated anywhere in an **Article canvas**.
- A **Writing coach** applies a **Voice profile** and produces **Writing signals**.
- The **Writing coach** applies the **Attention test** without silently deleting or rewriting prose.
- A **Slop check** produces zero or more **Slop findings** and never changes a **Draft** without admin acceptance.
- A changed **Deep Read** makes its approved **Brief** **Possibly outdated** until an admin approves it again.
- A **Reader explanation** can use public article content but never a private **Reference** or **Draft**.
- A **Signals article** may contain zero or more **Concept models**.
- Every animated **Concept model** has a **Reduced-motion state**.

## Example dialogue

> **Dev:** "Does the **Writing Studio** generate a **Signals article** from one prompt?"
>
> **Domain expert:** "No. The **Author** captures **Fragments**, develops them into **Beats**, and uses the **Writing coach** to test the reasoning and voice."
>
> **Dev:** "When the article is published, does the **Reader** choose between the **Deep Read** and the **Brief**?"
>
> **Domain expert:** "Yes. Both belong to one **Published revision**, and any **Concept model** must still make sense in its **Reduced-motion state**."

## Flagged ambiguities

- The current UI labels Signals as “Blog,” while repository content and SEO code call the public collection “Signals.” Use **Signals article** unless the product deliberately renames the collection.
- “TLDR” can mean a lossy summary or a complete short answer. Use **Brief** for the approved reader-facing mode.
- “Animated diagram” could mean decorative motion or an explorable explanation. Use **Concept model** for the Momito-style interactive blocks and reserve “illustration” for decorative art.
- The existing careers admin uses an email allowlist plus a shared token. That is not yet the canonical **Admin** access model for the **Writing Studio**.
- “Plain language” does not mean removing necessary technical terms. Explain a necessary term plainly on first use and flag it when left unexplained.
- A **Reference** is not part of the published article merely because it was imported; the author must deliberately use or cite it.
- A **Slop finding** identifies a checkable writing pattern, not the author or tool that produced the passage.
- “ADHD mode” incorrectly implies one presentation works for every person with ADHD. Use the concrete control name, such as **Focus mode**, text size, reading width, or reduced motion.
