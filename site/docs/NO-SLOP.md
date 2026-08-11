# No slop

Rules for making the articles read as written by a person. Distilled from the
public anti-slop catalogues (grahamrowe82/antislop, Rajat16nov/anti-slop,
hardikpandya/stop-slop, slop-lint) and cut down to what actually applies here.

A single instance of most of these is fine. The tell is the reflex — the same
move in paragraph after paragraph. Remove the reflex.

## Hard bans

These read as machine-written on sight. Zero instances.

1. **Em dashes.** The single highest-signal tell in plain typed prose. Use a
   comma, a full stop, a colon, or parentheses. En dashes too.
2. **"Not just X, but Y" / "It's not X, it's Y".** The most overused LLM
   rhetorical construction in existence. Restructure the sentence.
3. **Significance flags.** "It's worth noting", "importantly", "notably",
   "crucially", "it bears mentioning". Delete and state the thing.
4. **Throat-clearing openers.** "Let's dive into", "let's explore", "in this
   section", "when it comes to", "in today's fast-paced world", "here's the
   thing". Start with the content.
5. **The profound closer.** A short weighty sentence alone at the end. "And that
   changes everything." End on the last real point.
6. **"In conclusion" / "To summarise".** The reader can see it is the end.
7. **Tier-1 vocabulary:** delve, tapestry, testament, landscape (figurative),
   realm, myriad, plethora, multifaceted, paradigm, synergy, holistic, catalyse,
   elucidate, embark, endeavour, encompass, utilise, facilitate, whilst,
   ever-evolving, unlock, supercharge, game-changer, revolutionary,
   cutting-edge, transformative, best-in-class, world-class.

## Strong defaults

Cut unless there is a specific reason to keep it.

8. **Tier-2 vocabulary in clusters.** robust, comprehensive, seamless,
   innovative, streamline, empower, foster, enhance, elevate, optimise,
   pivotal, intricate, profound, resonate, underscore, harness, navigate
   (figurative), cultivate, bolster, cornerstone. One is fine. Three in a
   paragraph is a rewrite.
9. **The rule of three.** Three items because three sounds complete. Use the
   number that is true. If there are two reasons, give two.
10. **The hedge parade.** "can", "may", "might", "could potentially", "it's
    possible that", "in many ways", "to some extent". Luka states things. If the
    model genuinely does not know something, say that — it is a fact, not a hedge.
11. **Transition openers.** "Furthermore", "Moreover", "Additionally". Start the
    sentence with its subject, or just start a new one.
12. **Intensifier filler.** genuinely, truly, really, actually, simply, deeply,
    precisely, exactly. Almost always deletable with no loss.
13. **Rhetorical question then answer.** "Why does this matter? Because…" State it.
14. **List abuse.** A bulleted list where prose is clearer, or where every item
    starts with the same grammatical shape ("Enables…", "Provides…"). Lists earn
    their place when the items are genuinely parallel and countable.
15. **Overwrought verbs.** underscore, underpin, showcase, boast, speaks to,
    stands as. Use show, support, have, is.
16. **Self-narration.** "This article covers X, Y and Z." The headings do that.

## Structural tells

Harder to catch, and what separates a passable article from a real one.

17. **The uniform paragraph.** Topic sentence, elaboration, example, wrap-up —
    every paragraph, same rhythm. Break it. Some paragraphs are one sentence.
    Some end on the point instead of opening with it.
18. **Metronomic sentence length.** Every sentence 15 to 25 words. Mix in a
    six-word sentence and a thirty-word one.
19. **Symmetry addiction.** Every section the same length. Real topics are not
    balanced. One section may be twice another.
20. **False depth.** Restate the problem in fancier words, list obvious
    considerations, conclude with "it depends". The test: swap the topic. If the
    text still works, it is slop. Real depth is a number, an edge case, a
    tradeoff, or a thing that goes wrong.
21. **Synonym cycling.** Calling the same thing a "model", then "the system",
    then "the AI", then "the tool" to avoid repeating a word. Repeat the word.

## The self-check

Before returning a draft, run these and fix what they catch:

- Search the draft for `—` and `–`. Must be zero.
- Search for "not just", "it's not", "worth noting", "importantly", "dive into",
  "in conclusion", "delve", "landscape", "seamless", "robust", "leverage".
- First word of every sentence: if more than one is a transition word, rewrite.
- Count sentences of 15 to 25 words. If that is nearly all of them, vary.
- Count the items in every list. If they are all threes, at least one is padded.
- Read the opening sentence alone. Does it answer the query, or announce that an
  answer is coming?
- Swap-the-topic test on the whole piece. Would it survive? Then add specifics.
- Is there one sentence in the piece a reader would not have predicted? Human
  writing surprises. Slop never does.
