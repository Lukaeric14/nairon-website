---
title: "What is a Tool Call?"
seoTitle: "What is a Tool Call? How AI agents take action"
description: "Ask a model to book a meeting with Sarah tomorrow at 2pm and it stops writing text and starts working. The four steps behind that, where the tools come from, and why a longer tool list makes an agent worse."
youtubeId: M6SYbRxhfDY
topic: ai-fundamentals
level: basic
order: 10
duration: 379
publishedAt: 2026-06-05
channel: "Nairon AI"
magnet: ai-agents
takeaways:
  - "A tool call is the difference between a model that drafts the email and one that sends it."
  - "Every tool an agent has is described in its system prompt before you type a word, so tools it never uses still cost you context window and tokens."
  - "Split agents by job the way you would scope a junior employee, because an agent handed every tool gets confused about which one to use."
transcript:
  - { t: 5, text: "Hey, my name is Mahan. I'm the CMO of Naom. My name is Luka and I'm the CEO of Nairon. Luka AI can now write your emails, shape your code, and do a whole bunch of different things that it wasn't capable of doing before. And all of this is largely thanks to tool calls. Correct." }
  - { t: 19, text: "Correct. Probably one of the most advanced topics which we've come to. So about time to jump in. Perfect. So let's start from the foundations and go more in depth from there. So, a tool call is essentially the ability for an LLM to perform an action. Previously, LLMs only had one ability, which was to respond to the user with text. Now, they get to actually perform different actions. They perform actions via APIs. We spoke about them in the previous video. What an LLM does is they decide off of a query from the user whether to go with option A or option B. In this case, option A is to just write some text back to the user." }
  - { t: 56, text: "Option B is to perform a tool call. So in this case, the user asked, hey, can you please, you know, book a meeting for tomorrow? The LLM decided that is an action, not something that I respond with text. In this case, create the tool call. And there's a specific format of how tool calls are set up. So the LLM knows exactly how to execute that with the API largely off of system prompts." }
  - { t: 78, text: "For sure. So the tool calls are actually embedded in the system prompt. When a session actually starts, when you start a chat with an LLM, before you even send a message, the first message, the LLM is given instructions on how to use the tools. So, in this case, send an email message, um, send a database record or query a database, search the web. All of these are tool calls and many of the times your tool calls are actually nested with different providers. So, Gmail will have a uh MCP which will have multiple tool calls for all the actions that you can do on on Gmail. Search the Gmail, create new emails, send email." }
  - { t: 116, text: "All of these are actions that are nested inside the MCP which we'll get to in other videos soon. Um those are actually instructions inside the tool calls that can be executed and actioned. Let's take the example of booking a call on your calendar. Let's actually go step by step on what a tool call would look like when uh when you want that to happen." }
  - { t: 135, text: "Yeah. So, what it would look like is this example over here. We can see you come in and you basically ask the LLM, book a meeting with Sarah tomorrow at 2 p.m. What the LLM does is it picks the first tool call. That's just step number two. After picking the tool call, it actually needs to input the actual details that the tool call is asking for. So the tool call essentially says okay if you want to create a calendar invite you need to give me the date you need to give me the attendee and a bunch of other information. Some are optional and some are required. In this case it's tomorrow 2 p.m. with Sarah. And so what the LM does is it uses the API sends that tool call and then it reverts back to you and it says hey I've done this tool call. I'm done." }
  - { t: 177, text: "Okay. And just to recap, like here is a very basic diagram of what an AI without tool calls would look like versus one that actually has access to the tool calls. Yeah. And when you look at ChatGPT, Jad GPT actually uses tool calls inside the actual interface." }
  - { t: 192, text: "However, you can give it more tool calls and if you had a CRM or you had any other sort of proprietary tech, you can essentially just give chatb to use those tool calls as well. And so, yeah, you're totally right. You could have an AI agent that has no tool calls. Um, and it could just draft emails but in text format. Summarize nodes, explain a concept, but all in text format. Tool calls go beyond the chat interface." }
  - { t: 220, text: "Actually using other tech that exists. Making it multimodal. Of course, the example of booking a call on your calendar makes sense. Now, let's make it more advanced. What would a coding agent look like for example? So what a coding agent does and again when you look at the mechanisms under the hood they're exactly the same. It's just your query is more complex. So when you give a coding agent a goal that you need it to do like implement this dashboard. What the coding agent does is first looks up your codebase. So that's one tool called then identifies where in your codebase does it need to implement the dashboard." }
  - { t: 254, text: "Then it decides what the colors need to look like. Well where do colors go? Colors go in another file. So it writes. So when it writes to a file which means it updates a file it uses another tool call and all of this sort of like thinking and working thinking and working is this loop which you can see here in this diagram where the agent is essentially just asking itself well did I finish the goal and if not then keep working it's reasoning of course and when it comes to access to tools the more the marrier correct well with some caveat there it is a double-edged sword where if you have too little tools the agent might not have enough resources to complete the task." }
  - { t: 293, text: "But sometimes actually in reality if you give it too many tool calls it actually gets confused with all of the possible things that it could do as well as and we spoke about this on context windows in the previous uh videos is that you actually burn a lot of context window and a lot of tokens. You actually burn a lot of your context window and a lot of your tokens by giving it a bunch of tool calls that they don't need. Mhm." }
  - { t: 316, text: "And so what this looks like in reality, and we do this on a day-to-day basis, is we build AI agents. And so with a finance AI agent, I'm for sure not going to give it the CRM tool calls. And likewise with the AI um sales agent, I'm for sure not going to give it the finance tool calls. And so actually having more of a sort of niche approach with your AI agent strategy, and this is a topic which we'll cover in in later videos. Um we can actually have them be more specific. The sort of guidance is consider this like a junior employee." }
  - { t: 348, text: "Imagine on day one you just give him 20 different resources to look at and they could do 20 different things. It'd be extremely tough for them to actually give you the value that you're looking for. Exactly. And this entire video series is essentially building up to how you can effectively use AI agents for your organization. We'll eventually get to a place where we go very very in-depth on on those topics. But for the time being guys, you can subscribe to our newsletter links down in the description below. You can also follow us on LinkedIn. and we're very active on a day-to-day basis. Until then, we'll see you in the next video." }
---

A tool call is how a language model does something instead of only saying
something. Until tool calls existed, a model had exactly one ability: write text
back to you. Now it can send the email or query the database, and it does that
through an [API](/academy/what-is-an-api). Some model providers call this
function calling in their documentation. Same mechanism, different word.

## How a tool call works, step by step

Every message you send forces one decision. The model either answers in text, or
it calls a tool. Ask it what a panel swap involves and it writes text. Ask it
to book a meeting with Sarah tomorrow at 2pm and it recognises an action.

1. **You ask.** "Book a meeting with Sarah tomorrow at 2pm."
2. **The model picks the tool.** Out of everything it has been given, it selects
   the one that creates a calendar event.
3. **The model fills in the details.** The tool says what it needs: a date, an
   attendee, and other fields on top of those. Some are required, some optional.
   Here that is tomorrow, 2pm, Sarah.
4. **The call goes out over the API.** Then the model comes back to you and says
   it has done it.

Tool calls have a strict format. That is why the model has to be told how each
one is shaped before it ever sees your first message.

## Where does an AI agent get its tools?

They sit in the [system prompt](/academy/what-is-a-system-prompt). Before you
type anything at the start of a chat, the model has already been handed the list
and the instructions for using each item on it: send an email, query a database,
search the web.

Tools usually arrive in bundles. Gmail has an [MCP](/academy/what-is-an-mcp),
which is a single connection carrying a set of related tool calls: search the
inbox and send from it.

Strip the tools out and you still have something useful, only it never leaves the
chat window. It will draft the notice to the customer and summarise your notes. It
will not send anything or change a record. ChatGPT uses tool calls inside its own
interface, and if you run a CRM or some proprietary system of your own, you can
hand it those too.

## How does a coding agent use tool calls?

A coding agent does not look like a calendar booking. The mechanism is identical.
Only the query is more complex.

Tell it to implement a dashboard. It looks up your codebase, which is one tool
call. It works out where in the codebase the dashboard belongs. It decides what
the colours should be, finds the separate file the colours live in, and writes to
that file, which is another tool call. Between each step it asks itself whether
the goal is finished, and if it is not, it keeps working, and that loop of
thinking and working is the reasoning.

## How many tools should one agent have?

Fewer than you would guess, and split across several agents rather than piled
into one. There are two ways to get this wrong and they pull in opposite
directions.

Give an agent too few tools and it does not have the resources to finish the
task. Give it too many and it gets confused by everything it could do. The
second failure costs you twice over. We went through the mechanics of this in the
[context window](/academy/what-is-a-context-window) lesson: every tool
description is loaded into the window before your first message, so tools the
agent never touches still burn window and [tokens](/academy/what-is-a-token) on
work it was never asked to do.

| | What goes wrong | What it costs you |
| --- | --- | --- |
| Too few tools | The agent runs out of resources partway through the job | The task does not finish |
| Too many tools | The agent gets confused about which of the options to use | Window and tokens spent describing tools it never calls |

So split agents by job. We build agents day to day, and a finance agent never
gets the CRM tool calls. A sales agent never gets the finance tool calls. Each
one gets the narrow set that matches the work it was hired for, which is the
opposite of how most people start, handing one assistant everything and hoping it
picks well.

Think about a junior employee on day one. Hand them 20 different resources and 20
different things they could be doing, and it will be a long time before any of it
turns into value. Give them one job and only the tools that job needs, and they
can get on with it. That narrowing is what the rest of this track builds towards:
[what an AI agent is](/academy/what-is-an-ai-agent), and how you scope one to a
real job in your organisation.
