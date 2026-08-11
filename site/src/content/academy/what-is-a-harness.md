---
title: "What is a Harness?"
seoTitle: "What is an AI harness? Claude Code and Codex explained"
description: "An AI harness is the tools, permissions, environment and loop wrapped around a model. Why Claude Code can edit your files and a chat window cannot."
youtubeId: glcoMoQ5I9A
topic: ai-fundamentals
level: advanced
order: 17
duration: 309
publishedAt: 2026-06-17
channel: "Nairon AI"
magnet: ai-agents
takeaways:
  - "The harness decides whether an agent may touch your live production data or only a staging copy, and it stops the attempt before it happens."
  - "The name comes from climbing, where the harness catches the climber when they fall and puts them back where they were."
  - "Good harnesses are told apart from bad ones by tool reliability, how tightly permissions are drawn, and whether you can see what the agent did during a run."
transcript:
  - { t: 4, text: "[music] Hey, my name is Muhammad and I'm the CEO of Nairon. My name is Luka and I'm the CEO of Nairon. Luka, we're starting to get into more advanced concepts when it comes to AI. In this video, let's talk about harnesses. I think the best way to start the topic is to actually speak of some of the most popular harnesses that are out there and people might be aware of right now." }
  - { t: 22, text: "For sure. So, one of the most popular harnesses right now is Cloud Code and OpenAI's Codex. So, they are both coding agent harnesses, which essentially means a harness is anything outside of the model that gives it all of its capabilities, all of its guardrails." }
  - { t: 39, text: "It's sort of like the body that the AI agent is able to come into to perform actions in the real world. And so, if you look over here, we can actually see the difference between a model is that it provides typically only text responses and stuff like that. Whereas a model that is inside of a harness, as you can see over here, can actually start taking more actions. Some of these actions could be like opening up a browser, running some code in a terminal, actually executing some Python code, editing a file, maybe even like finding the file. So, one of the early use cases of coding agents were that they weren't able to really traverse the code base to find exactly which file they should edit. And so, um Codex and Claude, Cloud Code, came out with this grepping feature. Grepping is just essentially this ability to search for a file across hundreds of files with sort of common keywords. And instead of using a lot of like intelligence to do some very fancy searching across code base, they can actually execute um a little piece of code, which actually just goes and searches for all that stuff. So, if you, for example, need to edit a uh notifications feature, well, you would search for all files that have the word notification in it. That build of like how do you actually build that grepping feature is part of the harness that now Cloud Code and Codex use. You would not have that feature if you just gave a model some basic tools um like, you know, looking at the web and stuff like that." }
  - { t: 131, text: "So, aside from giving the model tools, what else does a harness do? It's responsible also for permissions, um environments, and action loops. So, what do these mean? When looking at permissions, for example, the permission for a model to use a production database or to use a staging database is something that the harness will control." }
  - { t: 152, text: "So, production is where your critical um knowledge is stored, and staging is essentially just like um a mock-up of what your data would look like. The difference of what a model can do and what a model cannot do is built inside the harness itself. So, the second that the harness sees that it's attempting to access the production database, it'll actually stop. A lot of these things are actually built into the harnesses like Cloud Code and and Codex, preventing you from doing things that OpenAI and Anthropic don't want you to do. Other than permissions, it's the actual environment which it's running in." }
  - { t: 189, text: "So, all in all, the word harness actually comes from climbing. Um you can have a really good climber, they can climb really quickly, but in order for the climber to be safe during a climb, it needs to be in a harness. It needs to be in something that keeps it safe, keeps it under control. It also has the mechanism to if in case the climber in this case falls, to actually catch them and bring them back up to where they were. So, in our case, it would be if the model does something wrong, it'd be able to revert back and and and do things like that. So far, we've kind of covered the the coding harness with Cloud Code and and Codex." }
  - { t: 221, text: "What are some other types of harnesses out there? Yeah, so you can have a research harness, for example. The research harness will actually guide the the model towards more of a research application like at specific citations and documentation, actually requiring for citations to be part of the work that it's running. And so, what really differentiates the harnesses are whether the tools are reliable. So, if you have too many tools, too little tools, if all of the tools are third-party, then perhaps not as reliable. CodeX and Cloud Code, they build a lot of their tools in-house for their harness." }
  - { t: 256, text: "For example, the permissions are too vague or the permissions are too tight. That's also what kind of differentiates a good harness from a bad harness. And another really big one is observability. The ability to [music] essentially see how the LLM is performing during the run with the user. Some really big harnesses, like Cloud Code, give Anthropic a lot of information about what exactly is happening through the run, through the session in this case, um what the AI agent is thinking about, how exactly is it using the tools, and that's what actually helps further improving the harness down the road." }
  - { t: 289, text: "Another concept that's very close to what a harness is is an orchestrator. So, in the next video, we'll dive deeper into that and how those two things work hand in hand. For the time being, guys, if you enjoyed this video, you can subscribe to our newsletter, link's down in the description below. You can also follow us on LinkedIn, where we're very active on a daily basis. Until next time, we'll see you in the next video." }
---

An AI harness is everything wrapped around a model that lets it act in the real
world. Four parts do that work: the tools it can call, the permissions it runs
under, the environment it runs in, and the loop that keeps it going until a job
is finished.

Claude Code and OpenAI's Codex are the two you have probably heard of, and
Cursor sits in the same category. All three are coding agent harnesses. You
will also hear the same idea called agent scaffolding, or hear it mixed up with
[an agent framework](/academy/what-are-ai-frameworks), which is the plumbing a
developer installs to build one.

## What can an AI harness do that a model cannot?

On its own, a model returns text. Put that model in a harness and it opens a
browser, runs code in a terminal, executes Python, edits a file, and works out
which file to edit in the first place.

|  | Model on its own | Model in a harness |
| --- | --- | --- |
| **What comes out** | Text | Text, plus actions: a browser opened, code run, a file edited |
| **Finding a file** | Reasons about where it might be | Runs a keyword search across every file in the project |
| **Limits** | Whatever you thought to type in the prompt | Permissions checked before the action runs |
| **When it goes wrong** | You find out later | The harness reverts and puts things back |

File-finding is the clearest example. Early coding agents could not reliably
traverse a codebase to work out which file they were supposed to edit, so
Claude Code and Codex shipped grepping: a small piece of code that searches
every file for a keyword. Editing the notifications feature means pulling up
the files with the word "notification" in them. No extra intelligence involved,
just a search someone bothered to build in.

Nothing about that is specific to code. Ask an agent which of your 900 warranty
files expires in March and the useful answer comes from a tool that reads
filenames and dates, not from a cleverer model. Hand it a generic web search
instead and it starts reading warranty files one at a time until
[the context window](/academy/what-is-a-context-window) fills up.

## Why is it called a harness?

The word comes from climbing. A strong climber moves fast, and the harness is
what makes moving fast survivable: it keeps the climber under control, and when
they fall it catches them and puts them back where they were. When a model
edits the wrong file, the harness reverts the change, which is the only reason
you can let a coding agent loose on work you care about.

Most of that control shows up as permissions. The standard split in software is
production against staging. Production holds your live data; staging is a
mock-up of what that data looks like. The harness decides which one the model
may touch, and the second it sees an attempt on production it stops. That rule
sits outside the model's judgement, which is why Claude Code and Codex can
prevent you from doing things Anthropic and OpenAI would rather you did not do.

An agent that reads your dispatch board and drafts the invoice sits at one
permission level. One that emails it to the customer sits at another, and the
harness is where you draw the line: under $2,000 it sends on its own, over
$2,000 it stops and asks. Then decide what happens to the $2,400 invoice that
lands in that queue at 6pm on a Friday, because the harness will hold it until
Monday morning unless you named a second person who can approve.

Not every harness is a coding tool. A research harness aims the same model at
documentation and specific citations, and it can require a citation on every
claim before the work counts as finished. Switch that on and the model loses
the ability to hand you a confident paragraph it could not source. It hands you
a gap instead, which is more useful and reads worse.

## What separates a good harness from a bad one

Three things, and none of them is the model:

1. **Tool reliability.** A harness with too few tools cannot finish the job,
   one with too many picks the wrong one, and one that rents every tool from a
   third party breaks whenever any of them changes. Claude Code and Codex build
   most of theirs in-house.
2. **Permission calibration.** Too vague and the agent touches things you never
   sanctioned. Too tight and it stops halfway through work you wanted done.
3. **Observability.** Whether anyone can see how the model performed during a
   run. Anthropic gets a lot of that back from Claude Code sessions: what the
   agent was thinking, how it used its tools. That feed is what improves the
   next version of the harness.

## Harness vs orchestrator

The harness is where an agent acts. The orchestrator is what decides the plan
it acts on: breaking a task into steps and picking which model runs each one.
The distinction earns its keep when a run fails, because a bad plan is the
orchestrator's problem and a blocked action is the harness's.
[The orchestrator](/academy/what-is-an-orchestrator) is the next lesson.
