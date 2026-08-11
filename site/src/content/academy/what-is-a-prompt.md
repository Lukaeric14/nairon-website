---
title: "What is a Prompt?"
seoTitle: "What is an AI Prompt? The 4 parts of a good one"
description: "A prompt is the brief you give ChatGPT or Claude. The four ingredients of a good one, why Google-style prompts return generic answers, and when to clear the chat."
youtubeId: XldjFjrIRUg
topic: ai-fundamentals
level: basic
order: 5
duration: 262
publishedAt: 2026-05-29
channel: "Nairon AI"
magnet: ai-prompting
takeaways:
  - "A prompt is a brief, and ChatGPT is a freelancer who never asks you a clarifying question."
  - "Four things make a prompt work: context, specifics, an example of writing you like, and constraints."
  - "When a chat starts drifting, clear it and rewrite the prompt instead of correcting course message by message."
transcript:
  - { t: 5, text: "Hey, my name is Mahan. I'm the CMO of Nairon. My name is Luka. I'm the CEO of Nairon. Luka, in this video, let's break down prompts. What they are, how we can engineer them to give us the best possible outcome. When working with a prompt, a prompt is essentially the input that we give an LLM to then give us the output that we're looking for. So, it's really important, and this is essentially the piece where we have a lot of influence on. And so the way that I like to look at it is a really good prompt is a really good brief that you give for example to a freelancer." }
  - { t: 37, text: "So a example of a bad brief that you would give a freelancer is design a logo for my company. The problem is that you'll probably have to go back and forth with the freelancer and asking for the most basic questions like what's your uh style? What's your brand voice?" }
  - { t: 55, text: "And there's probably going to be a lot of frustrations on both sides. And so an LLM is nothing different. It is essentially that freelancer. Um it's also a freelancer that never gets annoyed with you. And so if you can give it that very good structured brief ahead of time, um you'll actually get a lot further in your sessions. And so a good brief to a freelancer and to an LLM would be, hey, we are a B2B SAS company uh specifically for finance teams. This is exactly what our branding looks like." }
  - { t: 85, text: "Navy, blue, modern. These are our logos that we like to use. And specifically, this is what I need, X, Y, and Z. So, what are the core ingredients that actually make for a really good prompt? There are four very important ingredients when building out a good prompt. Number one, and this is probably what a lot of people are doing, is context. Um, saying something like, I run a B2B SAS company selling X, Y, and Z product. And that's essentially it what we give it in terms of context." }
  - { t: 112, text: "However, a very good prompt gets into specifically who, what, and when this is about. It also gives an example. If you can give it some copy that you used perhaps in the past that you like, that's also really really good to do." }
  - { t: 127, text: "Also, putting constraints. So, actually saying keep this under 100 words, uh, keep this friendly. Those are really good when um when moon building out a prompt. You could say that iterating over the prompt is the fifth also, but we'll cover that in a bit." }
  - { t: 143, text: "Okay, that's great. And I think most people when prompting an LLM, just from uh memory or muscle memory, you could say, they actually prompted like they would a search engine like Google, I think that's what makes for more so like mediocre results. Correct." }
  - { t: 158, text: "Yeah, definitely. So one very big use case of LLMs is obviously doing similar search type queries like that you would do on Google. So in this case if we were to ask Google what are the best running shoes in 2026 essentially would just do keyword matches across a very big databases database of pages and it would give you a final answer very conclusive." }
  - { t: 179, text: "However the the LLM is much better when you want a more customized solution. So saying something like, \"Hey, look, I'm flatfooted. I'm 200 lb. Um, and I'm looking for a daily trainer.\" Uh, that is much better for an LLM to really go through all the options and identify which one is best for your certain use case. And so context is extremely important in this case." }
  - { t: 201, text: "And to that end, I think it's much more difficult to get an ideal outcome if you don't start the conversation off on the right foot with an LLM with the correct prompt. Yeah, 100%. I that's one of the first things that we see when we consult with clients is um that they are trying to correct course in the middle of a session instead of just clearing the session starting again with a much better prompt. And so what we recommend is if you're not going in the right direction, clear your sessions, perhaps take even pieces of that chat that you had um and construct the best prompt possible to really get you in the right direction. Now, I know we're going to be talking about context windows in the next video, of course." }
  - { t: 242, text: "Um, but I think this is a good introduction to prompting. Yes, we'll do a deep dive into context windows and how those affect the outcome of uh of what the LLM gives you as well. In the meantime, you can subscribe to our newsletter. Links down in the description below. You can also follow us on LinkedIn. We're very, very active on there. Until next time, we'll see you in the next video." }
---

A prompt is the input you give a language model (an LLM) to get the output you
want. [The model](/academy/what-is-ai) is fixed. The prompt is the one part of
the exchange you control, which makes it the main lever you have over the
quality of what comes back.

## What makes a good prompt? Four ingredients

Treat it as a brief for a freelancer. "Design a logo for my company" gets you a
freelancer coming straight back at you: what is your style, what does your brand
sound like. Go back and forth like that a few times and both sides are
frustrated. ChatGPT is the same freelancer with one difference. It never gets
annoyed with you, and it never asks. It fills the gaps in your brief itself,
picks the most average answer available for each one, and hands you something
generic.

Filling those gaps yourself, on purpose, is what people mean by
[prompt engineering](/academy/what-is-prompt-engineering). It is four things.

1. **Context.** Almost everyone does this part and almost everyone stops early.
   "I run a maintenance company" is a category, not a brief.
2. **Specifics.** Who this is about, what it is, and when it is happening. A
   model cannot guess that the email goes to the primary applicant rather than
   the co-signer, or that the install is Thursday.
3. **An example.** A piece of copy you have written before and liked. One
   approved example tells a model more about your voice than a paragraph
   describing your voice.
4. **Constraints.** "Keep this under 100 words." "Keep it friendly." They take
   one line each and rule out whole categories of wrong answer.

Iterating on the prompt is the fifth ingredient, if you want to count it. The
first brief is rarely the right one.

Put together, the logo request stops being one line. We run maintenance and
dispatch for a 200-unit apartment portfolio, our branding is navy and modern,
here is the logo we use today, and here is specifically what I need. Same
request. Answerable on the first attempt.

## Why are ChatGPT's answers so generic?

Because most people type into it the way they type into a search box, out of
muscle memory. Ask Google for the best running shoes in 2026 and it matches
keywords across an enormous database of pages, then returns one conclusive
answer: the same answer it gives everybody else who asks.

Now ask ChatGPT or Claude this instead. I am flatfooted, I weigh 200 lb, and I
am looking for a daily trainer. Three facts, and the reply stops being a list of
popular shoes. That is the job a search engine handles badly and a model handles
well, because it works through the options against your situation rather than
ranking pages.

Your own work has the same shape. "Write a follow-up email to a customer"
produces a template you would not send. "Write a follow-up to an applicant who
toured unit 4B last Tuesday and has not called back, under 100 words, friendly,
no concession" produces something you can send as written. The second prompt is
longer by one sentence, and everything in that sentence is something you already
knew before you opened the chat.

Both examples side by side:

| Bad prompt | Good prompt | What changed |
| --- | --- | --- |
| Design a logo for my company | We run maintenance and dispatch for a 200-unit apartment portfolio, our branding is navy and modern, here is the logo we use today, and here is what I need | Who you are, and what you already have |
| Write a follow-up email to a customer | Write a follow-up to an applicant who toured unit 4B last Tuesday and has not called back, under 100 words, friendly, no concession | Who it goes to, when it happened, and the limits on it |

## When should you start a new chat?

One of the first things we see when we start consulting with a business is
people trying to correct course in the middle of a session. The answers drift,
so they add a correction, then another, and now half the chat is bad
instructions the model is still reading.

Clear it. Pull the useful pieces out of that conversation, fold them into one
new prompt, and start again. The corrections you typed all afternoon are the
brief you should have opened with.

A long session drifts because of the
[context window](/academy/what-is-a-context-window): the whole chat, your wrong
turns included, gets read again on every message you send. That is the next
lesson, along with the [tokens](/academy/what-is-a-token) the window is measured
in.
