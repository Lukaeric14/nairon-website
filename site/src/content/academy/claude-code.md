---
title: "Claude Code"
seoTitle: "What is Claude Code? A plain-English answer for business owners"
description: "Claude Code reads your whole project, plans the work, then writes and tests the code itself. The one word that starts it, and the six places it runs."
youtubeId: nRzfqGpPdYc
topic: claude
level: basic
order: 1
duration: 333
publishedAt: 2026-07-21
channel: "Nairon AI"
magnet: ai-models
takeaways:
  - "Claude Code reads your entire project before your first message, so the context window is full before you ask anything."
  - "Starting it is one word: type claude in the folder you want it working on."
  - "It counts as an agent because it loops: plan, your approval, write, test, repeat until the code works."
  - "The terminal is one of six places it runs, alongside VS Code, Cursor, JetBrains, the Claude Cowork desktop app and the browser."
transcript:
  - { t: 5, text: "Hey, my name is Mahan. I'm the CMO of Nairon. My name is Luka. I'm the CEO of Nairon. Guys, in this video today, we're going to be going over Claude Code. Luka, Cloud Code's been all the hype specifically since the beginning of the year so far. And in this video, this is a quick breakdown of what it is, how it works, and how people can use it to get far better outcomes with AI than with just a regular chatbot." }
  - { t: 24, text: "Yeah. So, you just said it there. In order to really understand what claude code is, we need to kind of look at what developers used to do before cla code came out, which was essentially giving snippets of their codebase to chatt or even to claude but on the interface and essentially asking it to perform some sort of software engineering for them and it would give them the code back into the chat. The problem is you're stuck between copy pasting from claude going to your codebase and going back and forth multiple times and claude doesn't have the entire context of the entire codebase. Um there were tools out like cursor which we will get to in future videos um which were more of a onodebased solution until cloud code actually released the CLI which is essentially using cloud code in the terminal. And so just to make it very simple, there are tools like chat GBT which you can talk to and you can ask it about code or there are tools like cloud code and for example like codeex from open AAI which we'll get to in future videos which essentially help you run write and test code." }
  - { t: 83, text: "And so is cloud code then considered agentic or to be an agent? Yes. So the definition of an agent is essentially an LLM which is able to do actions because it loops around whatever the objective is. So in this case what cloud code actually does is that reads the codebase. It comes up with an approach of a plan. It works with the human in the loop to configure the plan and sort of get approval on the plan." }
  - { t: 104, text: "And then it goes ahead and writes and edits code. Keeps running that and tests until the code actually works. And do you need to use cloud code in the terminal? Cuz that is pretty scary for especially non-technical founders and nontechnical business owners um getting used to that entire setup." }
  - { t: 120, text: "So today, no, but when it started off, it was only in the terminal, but today you can use it in the terminal. You can use it in VS code which is essentially an IDE or essentially where developers write code typically. You can use it in other platforms like cursor and jet brains or you can use it in the desktop app like cloud co-work which we're going to get to in future videos or you can use it in the web app today and actually use a cloud version of cloud code." }
  - { t: 144, text: "Okay, so we've talked about the abstract idea of cloud code. Let's actually show a demo here on terminal. So I'm in my terminal here and after you set it up, it's as easy as just saying cloud. Cloud comes up and you can ask it something like what is this codebase about and then as you can see cloud code starts thinking and you don't need to just ask it about your codebase you can literally just treat it as you would the regular chatbot for sure. So actually what happens is that whenever you spin up cloud it actually reads the codebase before even your first question and so it knows what the codebase is before you've even started a session. So remember when we spoke about context window, the context windows are already filled even coming in prior to your first message. So that's very different from using chatbt or other tools like that. So in this case we can see here um that it's actually not a codebase. It's just um a file that I have with all my project files inside. And we can ask it something as simple as what if I wanted to create a newspaper website. And so you can see here you can actually brainstorm how it would go about creating a website in this case a newspaper website. And we can go ahead and ask it like what text stack should I use for this type of website." }
  - { t: 224, text: "And a lot of the initial use cases are very educational. You can essentially ask it anything to do with software engineering. You can ask it to teach you step by step on how you can build up a website, how to host a website. The thing that I really like to stress about is that there are no dumb questions. You can ask it how much will this website cost me? What if a lot of people come onto the website? If you want to bring in some type of authentication like people need to log in and register, you can ask it what are the best tools to do that. So really your creativity is the limit." }
  - { t: 256, text: "Okay. And obviously with the claw chat you have control over certain things that you can do. For example, you can change the model, you can do deep research, apply skills. How does that work on claw code? Yeah. So everything works through a slash command and it actually starts telling you how to actually use it. So you can do /help." }
  - { t: 274, text: "You can get a full list of all the commands that it has. One of the really cool ones is that you can do /model and you can actually change which model you're using. So in this case, I'm using Fable 5, really expensive model. For something simple like this, I might move to sonet 5. I can even tell it please add some more effort. So in terms of how much effort it'll put into this session, I can say please use max effort for example. And effort is a separate video on its own. So we'll get to it in future videos. Great. And guys, this was just a very very quick uh demo and explanation of what clot code is. It sounds very scary, especially to non-technical people, but once you start using it over the span of a couple days, you'll realize that really it's not much different than the chat interface itself. And it actually gives you a lot more power with regards to how custom you can make your interactions with Claude itself. So, if you enjoyed the video, you can subscribe to the channel." }
  - { t: 324, text: "You can also subscribe to our newsletter, links down in the description below. You can follow us on LinkedIn. We're very active on a daily basis. Until next time, we'll see you in the next video." }
---

Claude Code is Claude pointed at your whole project instead of a snippet you
paste into a chat box. It reads your files, proposes a plan, waits for you to
approve it, then writes, edits and tests the code itself until the thing works.

## Claude Code vs ChatGPT: what is the difference?

Before it existed, the workflow was copy and paste. A developer dropped a
fragment of their codebase into ChatGPT or the Claude web app, asked for a
change, and pasted the answer back into their editor. Then did it again. The
model only ever saw the fragment, never the codebase, so the human carried the
context back and forth by hand. Pasting a snippet is quoting a roof from one
photo of one corner.

The difference shows up before you have asked anything. Claude Code reads the
project as it starts, so [the context window](/academy/what-is-a-context-window)
is already filled by the time you type your first message. ChatGPT opens empty
every session and stays empty until you paste something in.

| Chatbot with pasted code | Claude Code |
| --- | --- |
| Sees the snippet you paste | Reads the project before your first message |
| Returns code into the chat | Writes and edits the files directly |
| You run it and find out what broke | It runs and tests until the code works |
| One answer per question | Loops on the objective until the job is done |

## Is Claude Code an agent?

Yes, on the standard definition of [an agent](/academy/what-is-an-ai-agent): a
language model that takes actions because it loops around an objective rather
than answering once and stopping. The loop runs read the codebase, come up with
an approach, shape the plan with you, get your approval, then write and edit
code and keep testing until it works. Codex from OpenAI sits in the same
category, and the two get
[compared head to head](/academy/claude-code-vs-codex-which-is-better) in their
own lesson.

The approval step is the one to pay attention to. Nothing gets written until you
say so.

## Do you have to use the terminal?

Not any more. At launch the terminal was the only option, which is the part that
scares off non-technical founders. Today it is one of six places the same tool
runs.

| Where it runs | What it is |
| --- | --- |
| Terminal | The CLI it launched with |
| VS Code | The editor most developers write code in |
| Cursor | Another editor, with Claude Code available inside it |
| JetBrains | Same again, for JetBrains editors |
| [Claude Cowork](/academy/claude-cowork) | The desktop app |
| Web app | Claude Code running in the cloud |

The demo starts after setup, and from there it is one word. You type `claude` in
the folder you want it working on, it comes up, it has already read what is in
there, and you ask it something like what is this codebase about. No paste, no
upload.

Everything after that runs through slash commands, and it tells you what they
are as you go. Two of them matter on day one. `/help` prints the full list.
`/model` switches which model you are on, and that switch is about cost: Fable 5
is the expensive one, so on something simple you move to Sonnet 5 and stop
paying Fable 5 rates for a question that does not need it. You can also ask for
more effort in plain English, "please use max effort", and it thinks harder
before it acts. [Effort has its own lesson](/academy/what-is-effort-in-ai), and
what any of it does to your bill is
[subscription versus usage](/academy/subscription-vs-usage).

## Can you use Claude Code if you cannot code?

The folder in the demo is not a codebase at all. It is a set of project files.
The first question asked of it is what it would take to build a newspaper
website, followed by what tech stack to use for one.

Most of the early value is educational. There are no dumb questions here, and
nobody is watching you ask them. Ask it to teach you, step by step, how to build
a site and how to host it. Ask what a login and registration system would take
and which tools do that job best. Ask what the whole thing will cost to run, and
what happens if a lot of people show up on it at once.

Swap the newspaper for your own version and the questions hold. What would it
take to let a resident log in and see photos of a finished repair? Which
tool handles that login? What does it cost to run in a quiet month, and what
happens the morning after a storm when every resident logs in at once to report
a leak? If you run a property management business and have been
handed a quote for internal software you did not understand, those are the
questions that make the quote readable.
