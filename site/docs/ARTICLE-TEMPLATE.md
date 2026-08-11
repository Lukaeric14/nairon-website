# Turning a transcript into a lesson article

The transcript is source material, not the article. Google's helpful-content
system demotes lightly-reworked transcripts, and a two-person conversation
never reads as an answer. Rewrite it.

Input: `.ingest/<slug>.txt` (flat prose, names already corrected).
Output: the `article`, `takeaways`, `description` and `seoTitle` frontmatter
fields in `src/content/academy/<slug>.md`. Leave the markdown body (the
timestamped transcript) untouched.

## The shape

1. **Lede — one paragraph, ~40 words.** State the answer immediately. No
   throat-clearing, no "in this video". A reader who stops here should have
   the thing they searched for.
2. **`## ` sections, 2–4 of them.** Each heading is a question a person would
   actually type. `What actually changed since 2023` beats `Background`.
3. **One structural element the video cannot have** — a numbered list, a
   comparison table, or a definition list. This is the main reason the page
   outranks the twenty other posts on the topic.
4. **Close on the business decision**, not a summary. What does the reader do
   differently on Monday.

Target 500–900 words. Longer is not better; unpadded is better.

## Rules

- **Second person, present tense.** "Ask a model what the capital of France is
  and it does not look up an answer."
- **Keep the hosts' actual claims.** You are re-voicing, not re-arguing. If
  Luka says three-quarters of a word is a token, the article says that.
- **Kill the filler.** "Um", "kind of", "essentially", "right?", "Mhm" — all of
  it goes. Verbal tics do not survive the transition to text.
- **Attribute quotes.** If you keep a sentence verbatim as a pull quote, name
  the speaker and the timestamp.
- **Nairon's property-management readers.** Examples land in leasing, maintenance
  and dispatch, or rent and renewals, not generic SaaS.
- **No invented facts.** Numbers, dates and product claims come from the
  transcript. If the video is vague, the article is silent.

## The other fields

- **`seoTitle`** — the `<title>` tag. Lead with the query, add the qualifier:
  `What is AI? A plain-English answer for business owners`. Under 60 chars if
  you can manage it.
- **`description`** — the meta description, ~155 chars, written to earn the
  click rather than to summarise.
- **`takeaways`** — 3 lines, each a complete sentence, each standing alone.
  These render as the "In 30 seconds" block and are the first thing most
  readers actually read.

## Worked example

Transcript:

> Typically, I approach this question by giving a little analogy. You could say
> LLM or a large language model is essentially just a fancy computer that's
> been trained on a bunch of data and it's essentially retrieving that data and
> answering the question for you.

Article:

> Ask a model what the capital of France is and it does not look up an answer.
> It predicts the next most likely word, then the next, until the sentence is
> finished. "The capital of France is" reliably produces "Paris" because that
> sequence appears everywhere in the text it was trained on.

Same claim. Tighter, concrete, and it answers the search query in the first
sentence instead of the fourth.
