---
title: "What is Prompt Engineering?"
seoTitle: "What is Prompt Engineering? The 4 parts of a good prompt"
description: "A good prompt has four parts: a role, examples, numbered steps, a hard limit. A full dispatcher prompt you can copy, and how much context is too much."
youtubeId: i6OxkLutPsM
topic: ai-fundamentals
level: basic
order: 22
duration: 297
publishedAt: 2026-06-26
channel: "Nairon AI"
magnet: ai-prompting
takeaways:
  - "Prompt engineering is neither a fad nor the skill of the decade. It sits between the two, and it matters more as agents run longer."
  - "A usable prompt has four parts: a role, examples of good work, the task broken into steps, and a hard constraint."
  - "Too little context sends an agent through the wrong documents. Too much makes it ignore your instructions altogether."
transcript:
  - { t: 5, text: "Hey, my name is Mahan. I'm the CMO of Daron. My name is Luka and I'm the CEO of N. Luka. When AI first came out, there was a terminology that was going around that, you know, people were saying this is going to be the next big skill you're going to have to learn in order to be successful in the age of AI. And that term was prompt engineering. So, in this video, let's break that down. You know, is it just a fad? Is it just something people throw around all the time? does it actually matter and um you know if it does how you can optimize your prompts in order to get the best outcome out of AI for sure. So you said it right there the reason why we do prompt engineering which is essentially the skill of writing a better prompt um is to actually get the most out of the LLM. So to get the exact desired outcome that we're looking for from the LLM and be that from an AI agent, be that from chat GBT or really whatever other AI tool comes out, prompt engineering is at the core of how do you use an LLM. Um now to answer your question, if it's a fad or if it is the skill of the decade, in reality it's somewhere in between. Um it is very important. Um, and it does differentiate a lot of really good AI users and users that are not that good at AI. So, if we take a look here and we really get to see the intent that's behind uh prompt engineering um unfortunately most people use um Chad PT just like how they used to use Google um where essentially everything was just a single line of questioning. Um it was mainly used for questions and answers like a query. Exactly. Um everything was very based around keywords and trying to get the exact question that you're looking for. Um and that I think did a little bit of harm in training us to use an LLM the same way. And then especially the first use case of the LMS were to do question and answering. And so we kind of took that bad habit into using AI agents. And so when we think of prompt engineering, we like to think about it as you're providing the LLM a brief. And most of the times I take a couple of minutes with my prompts. It's not just a question, but there's an actual structure of how you provide a LLM enough information so that it can give you the response that you're looking for. I always say to business owners, treat the LLM and the AI agent as if it was a junior employee. You wouldn't give a junior employee a one-s sentence instruction, but you would rather give it a proper brief with examples. And that's what we can see over here. We give the LLM a role. So you're a software architect. Give it examples of good work. So good critiques of of software. Um we break down the task. So do step number one, two, three, and so on. And we talked about this when doing context management. You want to keep everything within sort of a constraint." }
  - { t: 179, text: "Um don't go over, you know, two pages or 300 characters of whatever is your constraint. um and then work on iterating the same way after that. A lot of people maybe they they work on the first prompt and then their second and third iterations and interactions with the LMS tend to be just a couple of words or just a couple of sentences. The idea is how can you now have the sec second prompt, third prompt and so on also be those very structured briefs." }
  - { t: 208, text: "Now you don't have to waste all the time in the world doing this but it tends to give the best outcomes. Okay. And something that we've covered in the past as well is that um giving the AI model enough context is very important but also not going overboard with a lot of information is also very important at the same time." }
  - { t: 226, text: "Yeah, especially with the new models. If we look at the new models, they are taking more and more time to give us the answers back typically because they're actionoriented models and so they're doing a lot of work behind the scenes." }
  - { t: 238, text: "So if we give it too little instructions, it might go and check a bunch of different documents. It won't know really where to look. Um it'll spend too much time, too many tokens, not give you the response that you need. But the same way if you give it too many, like how we had the case earlier this week where we were giving our AI agents way too many tools, for example, in this case, the agents just ignored the instructions. And so what we really want to do is find that middle ground, especially with these really strong models." }
  - { t: 269, text: "Okay. And to wrap it up, essentially the the whole concept of prompt engineering without making it too complicated or making it sound like it's more than actually is giving the LLM enough context, but not too much information on what it needs to get done. So guys, if you enjoyed the video, you can subscribe to the channel. You can also subscribe to our newsletter. Links down in the description below. And you can connect with us on LinkedIn. We're very active on a day-to-day basis. We'll see you in the next video." }
---

Prompt engineering is briefing a model the way you would brief a junior
employee: a role, examples of good work, the task in numbered steps, and a hard
limit. Four parts, two minutes, and the output stops being generic.

## Is prompt engineering still a real skill?

When ChatGPT landed, prompt engineering got called the skill of the decade, and
then a year later it got called a fad. It sits between the two. Nobody needs a
certificate in it, and it has not gone away either.

What it does is separate people who get usable work out of a model from people
who get slop back and conclude the tool is broken. Same model, same
subscription, different brief.

It matters more now than it did in 2023. Back then a bad prompt cost you one bad
paragraph that you read and rewrote. Now an [agent](/academy/what-is-an-ai-agent)
takes your brief and runs on it for several minutes without you watching, so a
bad brief costs you the whole run and you find out at the end.

## Why one-line prompts do not work

Google trained everyone for twenty years: keywords, one line, hit enter, scan
the results. Most people use ChatGPT the same way. The first thing language
models were good at was question and answering, which fitted that habit
perfectly, so nobody had to break it. Then agents arrived and the habit came
along with them.

I always say to business owners: treat the model and the agent as a junior
employee. You would not hand a new hire one sentence and expect the finished job
back. You would write a brief with examples of what good looks like. A
[prompt](/academy/what-is-a-prompt) is that brief, and two minutes on one is
normal for work that matters.

## What makes a good prompt? The four parts

A role, examples of good work, the task broken into steps, and a constraint. In
that order. Here is the whole thing for a job a maintenance dispatcher has,
written out rather than described:

```
You are the after-hours dispatcher for a residential property-management
company in Phoenix. You take the resident's call, work out what is
broken, and write the dispatch note the on-call vendor reads on their
phone.

Two dispatch notes we consider good:

  "Water leak at Ridgeline Apartments, unit 214, kitchen supply line
  burst. Standing water spreading toward unit 213 below. Reported
  19:40 by resident Dana Ruiz, 602-555-0148, home until 22:00.
  Access via leasing office, gate code 4471. Unit water main shut
  off. Sending Marco, plumber, ETA 21:15."

  "AC not cooling at Halden Court, unit 3B. Reported 20:05 by
  resident Ade Okonjo, 602-555-0193. Resident home, has fans,
  comfortable overnight. Not urgent. Booked tomorrow 07:00, Priya,
  HVAC."

For every call:
1. Confirm the unit, the equipment, and what has stopped working.
2. Get a name and a mobile number for whoever is home tonight.
3. Ask whether the unit is accessible now, and how.
4. Decide tonight or tomorrow morning, then write the note.

Keep the note under 300 characters. If you do not have the resident's
number, write "no contact number" in the note rather than leaving it
out.
```

**The role** does more than set a tone. "After-hours dispatcher for a residential
property-management company" tells the model that access codes matter, that a
flooding unit outranks an AC that can wait until morning,
and that it is writing for someone reading on a phone at 9pm. Swap in "you are a software architect" and
the same four steps produce a code review. The role is what the model measures
its own output against.

**The examples** are the part people skip. Those two notes teach the model the
length, the order the facts come in, what gets abbreviated, and that a phone
number appears every time. That is four rules you never had to write down.
"Write clear, professional dispatch notes" teaches it none of them.

**The steps** are numbered on purpose. Sequencing is an instruction. A paragraph
of intent is not.

**The constraint** is a number: 300 characters here, two pages elsewhere,
whatever the real limit is at your shop. Give the figure. And say what you want
when the model comes up short, which is the last line of the prompt above. That
sentence is what stops it inventing a phone number.

## How much context should you give an AI model?

The newer models are action-oriented. They take longer to come back because they
are doing work in between: opening documents, calling
[tools](/academy/what-is-a-tool-call), checking themselves.

Underspecify and that work goes sideways. The model does not know where to look,
so it reads through a pile of the wrong documents, burns time and tokens, and
hands you something you cannot use.

Overspecify and it stops listening. We did this to our own agents: we connected
every tool we had to them rather than the ones each job needed, and they ignored
the instructions altogether. The brief was fine. It just was not being read.

The middle ground is enough context to know what to do and nothing past that,
which is the same discipline as managing a
[context window](/academy/what-is-a-context-window). The stronger the model, the
more the mistake costs you.

## How to write follow-up prompts

Most people put real effort into prompt one, then follow up with "make it
shorter" or "try again". The follow-ups are where the output gets shaped, and
two words give the model nothing to shape it with. Write the second and third
prompts as briefs too: the role stays, the examples stay, and the task becomes
whatever you now want fixed.

Do this for the work you would have checked if a junior employee produced it,
and for anything you have handed to an agent that runs while you are on a roof
or on a call. How much rope that agent gets is the next lesson,
[agent autonomy](/academy/what-is-agent-autonomy).
