---
title: "What is a Context Window?"
seoTitle: "What is a Context Window in AI? Size, Limits, Examples"
description: "What is in a context window, why your last message is 0.001% of it, how big the Opus and GPT-5 windows are, and when to start a fresh chat."
youtubeId: M2hwUzhIt3I
topic: ai-fundamentals
level: basic
order: 6
duration: 395
publishedAt: 2026-05-30
channel: "Nairon AI"
magnet: ai-cost
takeaways:
  - "A context window covers one session only: the system prompt, tool instructions, pasted documents, every turn so far, and your last message."
  - "Your last message is typically 0.001% of the context window, so a long, detailed prompt is not what fills it up."
  - "Opus and the GPT-5 models hold about a million tokens, but performance drops the deeper into the context window you go, so start a fresh chat per topic."
transcript:
  - { t: 5, text: "Hey, my name is Muhammad and I'm the CEO of Neuron. My name is Luka and I'm the CEO of Neuron. Luka, in the last video we covered prompts. In this video let's cover the context window and how important that can also be for getting the ideal outcome when it comes to using LLMs." }
  - { t: 18, text: "So, the context window is really important to understand as a concept because it's essentially a fancy way of saying whatever is in memory. So, what does the LLM actually see every single time we have a session where we have a chat with it." }
  - { t: 32, text: "In this case, we can see in this context window that we are looking at the prompt that we're sending. We're also looking at any assets that are in the context window. For example, if you pasted any SOPs, any documents, anything like that, that all is part of the context window." }
  - { t: 47, text: "What also a lot of people don't realize is that the chat history contributes to the context window. So, as we're having larger and larger chats, that is bloating the context window, it's making it much larger. So, what happens is we start off with a context window that's quite large and when we say with a context window that's quite large is there's a lot of room for us to have conversations and a lot of room for us to continue the conversation, get more output from it, and get more value out of it. And so, it's really important to note is that the context window does not include any previous conversations you have. It doesn't include any files that are on your computer. And that's where a lot of people get mixed up. They think that by my 40th conversation, the LLM should already know who I am." }
  - { t: 89, text: "So, if we look over here, there's really four things that contribute towards the context window. There's a system prompt and the tool instructions. So, we covered this in the previous videos. System prompt is that initial prompt that is given to an LLM even before you prompt it." }
  - { t: 104, text: "And then the tool instructions are whatever skills or whatever other tools or connections, integrations that the LLM has with other providers. So, if this was connected to Gmail, for example, it would have instructions on how to use Gmail. Every single time you start a session, it's loaded with that information. It doesn't really know how to do that from the very beginning without giving that information. The second is any documents that you pasted in. We covered that in the previous part. The third is the conversation history. And what actually happens is with every turn that you prompt the LLM, it's actually reading the entire conversation. So, just imagine if you and I are having a conversation and each time I go You replay and revisit everything you said in the last hour." }
  - { t: 148, text: "Exactly. And so, you can understand how as conversations grow, it actually gets even more complicated. And you can't really remember the first few messages or the first few things that we said. And then finally, of course, the current message or the the last message that the LLM was given. It will actually see over here, the last message is typically 0.001% of the entire context window. People typically think like, \"Oh, I don't want to give too much information because it'll bloat the context window.\" What's actually true is that contributes such a small margin of the total context window, it doesn't actually make sense." }
  - { t: 188, text: "And that's probably the only amount of of leverage that you have to kind of steer the conversation. And so, when we consult users on how to use the LLMs the best way possible, we actually say try to give as much as information as possible." }
  - { t: 204, text: "Don't think about the input on the tokens. Think more about the output, right? If we look over here, step by step, a real example of what a context window looks like with the right amount of tokens. A simple question like, you know, \"Summarize this for me.\" And then you paste a book. The actual input is only five tokens. \"Summarize this for me.\"" }
  - { t: 226, text: "pretty short. You have the system prompt that's about 2,000 tokens. You have the tool calls. So, if it needs to go search the web to verify anything from the book or whatever, 3,000 tokens. You have the document itself, that could be up to 15,000 tokens." }
  - { t: 241, text: "outside of the book. Of course. And then any of the earlier conversations that you've been having, maybe 8,000 tokens, sometimes even more. And then finally again that last five token question that you asked. And so what you're looking at for a simple question, you're looking at about 30,000 tokens." }
  - { t: 258, text: "Mhm. 30,000 tokens sounds like a very large number. But how's that actually compared to modern LLMs and what they can handle? So the modern LLMs can actually handle about a million tokens of context window. But this wasn't the case just a couple of months ago. It was at about 200, 250k depending on the model. Now Opus and the GPT-5 models can easily handle a million tokens. I will say though that the deeper that you get into the context window, the performance actually gets worse. And this is something that we call the eviction effect. It's essentially a mechanism that the model starts forgetting the earlier parts of the conversation." }
  - { t: 296, text: "And this is because it puts a a larger emphasis on the last few messages that went through. So what ends up happening is the further that you get into the session, the performance drops quite a lot because it's forgetting the first few messages." }
  - { t: 309, text: "Mhm. Interesting. And so what actually happens when you hit your context window? If you hit a million or even right before you hit about a million, the LLMs will actually compact the session. Which is essentially it takes the entire session and it says, \"Let me create a new session within the same interface that you're looking at, but let me summarize what's been said.\" And so it takes this 1 million tokens, summarizes it into maybe 100k tokens. And so you essentially start a new session at 100k." }
  - { t: 339, text: "But the performance, that's where you really start feeling the hit because it's a summary of a summary that you're now interacting with. And so, what is the best practice for say average business owner when it comes to approaching context window?" }
  - { t: 353, text: "The simplest thing to do is just to start a fresh chat whenever you have a different topic. A lot of the time we're worried that like we'll have to prompt a lot of the basic information again and again. There's ways around it and we'll cover it in future videos, but just starting a fresh session helps the LLM understand what is important and how does it deliver the best value in the shortest amount of tokens cuz it's optimized for that." }
  - { t: 378, text: "We'll cover all the workarounds when it comes to actually working with LLMs and handling context windows. So, make sure the output's always optimized. Until then, guys, make sure you subscribe to our newsletter. Link's in the description below. You can also follow us on LinkedIn. We're very active. Until next time, we'll see you in the next video." }
---

A context window is everything a model can see in one session: the system
prompt, its tool instructions, any document you pasted, every turn of the
conversation so far, and the message you just sent. All of it is loaded fresh
when the chat starts, and it is the only thing the model has to work from.

## What is in a context window?

Four things fill a context window, and they load in this order.

1. **The [system prompt](/academy/what-is-a-system-prompt) and the
   [tool instructions](/academy/what-is-a-tool-call).** Both are in place before
   you type anything. If the model is connected to Gmail, the session opens
   already holding instructions on how to use Gmail, because it has no way to
   work that out on its own.
2. **Documents you pasted in.** A lease renewal packet, a maintenance SOP,
   yesterday's dispatch log.
3. **The conversation history.** On every turn the model re-reads the whole
   conversation from the first message. Picture explaining a job to someone who,
   before answering each question, silently replays everything you have said in
   the last hour. Past a certain length, most of the context window is that
   replay rather than the job.
4. **Your current message,** which is typically 0.001% of the context window.

## Does a context window include your previous conversations?

No. A new session does not carry your earlier chats, and it cannot see files on
your computer or your shared drive unless you paste them in or connect a tool
that fetches them.

By the 40th chat, people expect the model to know who they are, which sites
they run and how the business runs. It does not, because those 39
conversations were never loaded.

## How many tokens does a simple question actually use?

You type "Summarise this for me" and paste in a lease agreement. Your question
is five [tokens](/academy/what-is-a-token). Here is the rest of the context
window.

| In the window | Tokens |
| --- | --- |
| System prompt | 2,000 |
| Tool instructions and tool calls | 3,000 |
| The 20-page lease agreement you pasted | up to 15,000 |
| The dispute at another site you were working through earlier in the chat | 8,000 |
| Your question | 5 |
| **Total** | **about 30,000** |

Operators hold detail back because they are worried about bloating the window.
Five tokens against thirty thousand is not bloat, and those five tokens are
close to the only control you have over where the answer goes. Use them: the
job number, the customer, the clause you are actually asking about, and what you
plan to do with the answer. Judge the session on the output, not on the size of
the input.

## How big is a context window on current models?

Modern models hold about a million tokens of context window, so 30,000 for a
lease-agreement summary is nowhere near a ceiling.

| Model | Context window |
| --- | --- |
| Opus | about 1,000,000 tokens |
| GPT-5 models | about 1,000,000 tokens |
| Most models, as late as early 2026 | 200,000 to 250,000 tokens |

That jump is recent. As late as early 2026 the ceiling was 200,000 to 250,000
tokens depending on the model, and a long document plus a day of back and forth
was a real constraint. Size is rarely what breaks a session now. What breaks it
is where in the window your information sits.

## What happens when you hit the context window limit?

Long before you get there, performance has started sliding. The deeper into a
context window you go, the worse the model does, because it puts heavy emphasis
on the last few messages and starts forgetting the earlier parts of the
conversation. We call that the eviction effect. In practice it means the notice
terms you pasted at message three are the least reliable thing in the session by
message ninety.

At the limit, the model compacts. It takes the million tokens, summarises them
down to maybe 100,000, and carries on in the same chat as though nothing
happened, so what you are now questioning is a summary rather than the lease
agreement.
Stay in that session long enough and it is a summary of a summary, which is
where the quality drop gets hard to miss.

So start a fresh chat when the topic changes. Finish the lease review, then
open a new session for the dispute at the other site. A clean context window
helps the model work out what matters and answer in the fewest tokens, which is
what it is optimised for. The objection is always having to re-type the basics
every time, and there are real ways around that, starting with
[agent memory](/academy/what-is-agent-memory).
