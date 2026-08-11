---
title: "What is a Token?"
seoTitle: "What is a Token in AI? How many words, and what they cost"
description: "One token is about four characters. How models split your text, why output costs three to five times more, and why turn ten of a chat gets expensive."
youtubeId: ipA5tlbPsB8
topic: ai-fundamentals
level: basic
order: 8
duration: 273
publishedAt: 2026-06-01
channel: "Nairon AI"
magnet: ai-cost
takeaways:
  - "A token is about four characters of text, and 100 tokens is roughly 75 words. The splitting is called tokenization, and every LLM has its own tokenizer."
  - "Output tokens cost three to five times more than input tokens, so the length of the reply drives the bill."
  - "Every turn of a chat carries the earlier turns back in, which is how a conversation that starts at 100 tokens reaches 10,000 by turn ten."
transcript:
  - { t: 5, text: "Hey, my name is Mahan. I'm the CMO of Nairon. My name is Luka and I'm the CEO of Nairon. Luka, tokens are the currency of AI, correct? I mean, I like to call it the alphabet. So, let's expand on that. In this video, let's break down what tokens are, why they matter, and what they actually look like in practice. So, I have an example over here." }
  - { t: 24, text: "Um if we look at a sentence, \"Customers prefer subscriptions and emoji over one-time purchases.\" What we actually see is the model is breaking down that sentence into kind of a very weird structure, right? It's It's not really uniform how we would sort of read it. Um it's looking at customers as one token or one unit. It's looking at prefer as one unit, but then it's breaking up subscriptions in three units. And then the the actual emoji is one token in its in itself." }
  - { t: 54, text: "Mhm. Essentially, a token is the way that an LLM contextually understands a sentence. Okay. And the reason why it sometimes breaks a word into multiple tokens, sometimes it keeps the word in its own, is because sometimes syllables in a word actually change the meaning of the word." }
  - { t: 73, text: "Mhm. So, for example, like unbelievable, that's actually three tokens. Un-believ-able. If you were to take away un, it changes the context of believable, right? Right. So, that's how an LLM actually understands the context of a sentence." }
  - { t: 86, text: "Okay, great. So, what's the general rule of thumb when it comes to tokens? So, typically, one token is about four characters, or 100 tokens is about 75 words. Mhm. Um for example, a tweet that's up to 280 characters, only 70 tokens. But perhaps like a 10-page paper or a document, that's like almost 7,000 tokens. So, we can kind of like attribute an average of how much tokens are per word. Um and that's kind of like what we use as a as as a measuring stick. When I give an LLM a prompt, that obviously consists of phrases that get broken down into tokens. When we receive answers from LLMs as well, does that also break down into tokens as well?" }
  - { t: 130, text: "Yes, and what you receive from an LLM are output tokens. Output tokens are typically about three to five times more expensive. The input tokens, kind of what you're putting into the LLM, that's quite cheap for the LLM to process." }
  - { t: 144, text: "What's actually quite expensive for the LLM to generate is the actual output. And so that's why the LLM providers typically charge three to five times the output. Mhm. And so is that why longer chats usually end up becoming more expensive?" }
  - { t: 157, text: "Yeah. So in the previous video we covered context windows, but a quick refresher is essentially the turns of a chat with an LLM get longer and longer, and the inputs and outputs end up getting recycled as the conversation is going. So in the diagram over here that we can see, in turn one, there's only the input, the question number one, only 100 tokens. That then generates an answer, which then get prompts a second question, and that now might have 400 tokens. And as you kind of go through turn one to 10, you end up actually at a 10,000 token context window. And so typically what we like to do is we like to make the differentiation between bloated and focused prompts. A bloated prompt can be a prompt that has a bunch of maybe useless information, maybe some information that might confuse the LLM." }
  - { t: 213, text: "This is especially the case with AI agents cuz we're used to just like throwing a bunch of information into the prompts, and it going in so many different directions. What we like to do is we like to use focused prompts. We have a certain outcome, and by the way, we have other videos where we covered like the perfect prompt, but essentially you want to give it the right amount of context, the right specification of context, who, what, when, an example, and then exactly like the criteria." }
  - { t: 242, text: "Like, don't go over 300 words or whatnot. And that's like an example of a really good focused prompt. And so, that ties into how tokens are used. You want to be really frugal with how you use tokens, because not only is it cheaper, like the actual outcomes are a lot better." }
  - { t: 256, text: "Of course, we'll dive deeper into how you can correctly prompt our agents in order to get the ideal outcome. For the time being, you can subscribe to our newsletter. Links are in the description below. You can also follow us on LinkedIn. We're very, very active on a day-to-day basis. And uh we'll see you in the next video." }
---

A token is a chunk of text, about four characters, and it is the unit a language
model reads and writes in. Everything you send an LLM and everything it sends
back gets counted, and billed, in tokens.

Tokens get called the currency of AI, which is fair on the billing side.

> I like to call it the alphabet.
>
> Luka Eric, 0:05

Letters are the units English is built out of. Tokens are the units an LLM is
built out of, and there is nothing smaller for it to work with.

## How does tokenization work?

Take the sentence "Customers prefer subscriptions and emoji over one-time
purchases." The split is not the one you would make. "Customers" is one token.
"Prefer" is one token. "Subscriptions" is three. The emoji is a token on its own.

The splitting is called tokenization, and every model ships its own tokenizer,
so the same sentence comes out at slightly different counts on GPT and on
Claude.

Those cut points have nothing to do with meaning. A tokenizer learns the most
common chunks of text in the material it was trained on and cuts there, so
everyday words survive whole and rarer ones get sliced. "Unbelievable" comes
apart into three
pieces, un-believ-able. That is the shape to carry around: common word intact,
unusual word in fragments, and no relationship at all to where you would put a
hyphen.

## Is a token the same as a word?

No. Short common words are one token each, longer and rarer ones break into
several, and spaces, punctuation and emoji are all counted too. Over normal
English prose it averages out to about 100 tokens per 75 words, which is the
ratio to budget with.

## How many words is 100 tokens?

About 75. Every other conversion comes off the same two ratios: one token is
roughly four characters, 100 tokens is roughly 75 words.

| Text | Tokens |
| --- | --- |
| A 280-character tweet | about 70 |
| 75 words | about 100 |
| A 150-word email | about 200 |
| One page of a document | about 700 |
| 1,000 words | about 1,300 |
| A ten-page document | nearly 7,000 |
| A 300-page manual | about 210,000 |

Paste a ten-page maintenance contract into a chat and you have spent nearly
7,000 tokens before the model has written a single word back.

## Why a long chat costs more than a short one

Input tokens, the ones you send, are cheap for a model to process. Generating
the reply is the expensive part, so providers charge roughly three to five times
more for output tokens. As of July 2026, Claude Opus 4.8 lists at $5 per million
input tokens and $25 per million output, and
[Fable 5](/academy/anthropic-fable-5-explained) at $10 in and
$50 out. So when you cost a workflow, the length of the answer matters more than
the length of the question. An agent that drafts a full move-in cost breakdown for
an applicant costs more to run than the same agent answering whether a unit is
still available.

Every turn of a chat carries the earlier turns back in with it. We covered
[context windows](/academy/what-is-a-context-window) in the previous lesson, and
the short version is this. Turn one might be 100 tokens of input. The answer
comes back, you ask a second question, and the model is now reading 400 tokens,
because your first question and its answer came along for the ride. By turn ten,
that same conversation is a 10,000 token context window. You pay for the start
of the chat again on every turn.

## How do I use fewer tokens?

A bloated prompt carries information the job does not need, and you pay for that
dead weight on every turn it stays in the window. A focused prompt names one
outcome and gives only what serves it: who, what, when, one worked example, and
the criteria you will judge the result against, down to "don't go over 300
words". The full recipe is in the [prompt lesson](/academy/what-is-a-prompt).
For an after-hours intake agent it means the caller and the property, the
details you want captured, when to escalate to the on-call tech, and a word
limit. Fewer tokens is cheaper, and it also gets you a better answer.
