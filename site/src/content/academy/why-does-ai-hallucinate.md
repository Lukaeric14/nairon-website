---
title: "Why Does AI Hallucinate?"
seoTitle: "Why Does AI Hallucinate? Causes and How to Reduce It"
description: "AI hallucinates because it predicts answers instead of retrieving them. The mechanic that makes a model useful is the one that makes it lie, so the fix is verification rather than a better model."
youtubeId: loOQA8I5gRs
topic: ai-fundamentals
level: basic
order: 4
duration: 212
publishedAt: 2026-05-25
channel: "Nairon AI"
magnet: ai-fundamentals
takeaways:
  - "An AI hallucination is an answer that sounds completely true and isn't, delivered in the same confident tone as a correct one."
  - "Accuracy falls as a question moves from common topics to rare and niche ones, and the model covers that gap by inventing data."
  - "Source material, live search, forced citations and stage-by-stage verification cut hallucinations. Nothing removes them, so verify anything a crew or a customer will act on."
transcript:
  - { t: 5, text: "Hi, my name is Luka and I'm the CEO of Nairon. And I'm Oate and I'm the CTO. And in this video, we're going to go over what an AI hallucination is. So, Oane, I know we all struggle with it. So, let's jump straight into it. What is an AI hallucination?" }
  - { t: 17, text: "An AI hallucination is when an AI responds with an answer that sounds completely true, but it actually isn't. I can give you a good example to demonstrate this. So in this prompt we ask what did Einstein say about creativity? And if you notice it gives us a quote back creativity is intelligence having fun. That sounds like something he would say but if you fact check this it's not actually what he said." }
  - { t: 40, text: "Okay. So where are some common situations where hallucinations come up when when working with an MLM? Some of the most common examples uh that we find hallucinations are in statistics and numbers. AI tends to exaggerate or make up numbers as it's responding. Also in citations and sources, as we just saw with that quotation from Einstein, that wasn't true, but it came up with it anyway. Quotes and attributions again." }
  - { t: 65, text: "And it may also hallucinate in names. So it may make up a name. It may come up with a name of a company that's wrong or isn't true, isn't correct or addresses and so on. Any kind of data that it thinks it knows, it might not know." }
  - { t: 77, text: "Okay. And so this is happening because of a phenomenon called the confidence gap. Correct. Yes, that's right. So, if we look at this blue line, this is the actual accuracy of the response. However, as we go from more common topics to rare and niche topics, then the accuracy drops." }
  - { t: 93, text: "However, the model now has to try to make up for that incompetence by making by creating new data. Okay, that makes a lot of sense. But the question I have is when we query a database, it gives us an exact answer of what we what we're looking for. But when we query the AI model, it's essentially giving us hallucinations." }
  - { t: 114, text: "Most of this difference comes from the fact that a database stores data and if that data doesn't change unless you physically manipulate the data, it doesn't change. However, when you query an AI model, you're asking it a question and you have to treat it like a black box. So, it doesn't know what you'll ask it and it doesn't know what the output will be until you ask the question. So what are some ways that we can actually reduce hallucinations when working with an AI model?" }
  - { t: 139, text: "So yeah, at Nairon we have several strategies that we use to reduce hallucinations. The first of which is pasting source material. So if you have transcripts, documents, uh we do that all the time. We paste them into our models and they give us far better recommendations. The second strategy we use to reduce hallucinations is connecting the models with third party tools to perform real-time web search or real-time documentation search. and that just beats the problem with the training data being out of date. So tools like Condex 7, XAI, NIA MCP, there are many tools out there that allow you to uh query and perform live web search and live doc search. The third way is to site sources or ask the LLM to site sources on your behalf so that you can prove and verify those claims that it makes. And the final one is to break down the task into smaller asks and get it to verify each stage one at a time." }
  - { t: 191, text: "Amazing. In future videos, we're going to get more indepth with AI hallucinations, how we treat them at Nairon, how we build AI agents that don't hallucinate. Obed will hopefully show us a couple of examples working with actually the tools that we just mentioned. But until then, follow us on LinkedIn, subscribe to our newsletter, and we'll see you in the next video." }
---

An AI hallucination is an answer that sounds completely true and isn't. You get
them because a large language model (LLM)
[predicts an answer rather than retrieving one](/academy/what-is-ai). When the
training text behind your question is thin, the model fills the gap with
something that reads correctly, and it comes back in the same confident tone as
an answer that happens to be right.

## What is an AI hallucination?

**An AI hallucination is an answer that sounds completely true and isn't.**

Ask a model what Einstein said about creativity and it hands back a quote.
"Creativity is intelligence having fun." It sounds like him. Fact check it and
he never said it. Nothing in the wording of the response separates that quote
from a real one.

AI hallucinations cluster in four predictable places.

- **Statistics and numbers.** Models exaggerate or invent figures mid-sentence.
- **Citations and sources.** A document, a clause or a page reference that does
  not exist.
- **Quotes and attributions.** The Einstein line.
- **Names and addresses.** A supplier that does not exist, a company name that
  is close but wrong, a service address nobody has ever driven to.

Any kind of data the model thinks it knows, it might not know.

## What causes AI hallucinations?

The first cause is what we call the confidence gap. Plot the model's real
accuracy against how common the topic is, and accuracy sits high on common
topics and drops away as the topic gets rare and niche. Confidence stays flat
across the whole range. To cover the gap, the model creates new data.

| Your question | What the training text holds | What the model does |
| --- | --- | --- |
| How does a tankless water heater work? | Textbooks, manuals, forum threads | Recalls a well-worn answer |
| What is the part number on this discontinued water heater? | Almost nothing | Invents a plausible number |
| What does this county require at inspection? | Almost nothing | Invents a plausible rule |

All three answers arrive in the same tone at the same speed, and one of them
sends a tech out with the wrong part.

The second cause is the age of the training text. GPT-3.5, the model that put
ChatGPT in front of everyone in 2023, was trained on data up to September 2022
and knew nothing after that date. Models today notice the edge of what they know
and can [call a tool](/academy/what-is-a-tool-call) to go and search, but every
model still has a cutoff, and the price list you changed last week sits outside
it until you hand it over.

## Why a database gives you the right answer and a model does not

Query your CRM for a customer's address and you get the row that is there. Data in
a database does not change unless someone changes it. Query a model and you are
dealing with a black box. It does not know what you will ask, and it does not
know what the output will be until you ask the question. The same question asked
twice can come back two different ways.

## Can you eliminate AI hallucinations?

No. Prediction is the same property that makes a model useful on questions
nobody has ever written a database query for, so patching out the hallucination
means losing the thing you came for. What you can do is shrink the number of
places a wrong answer can survive, and check the output before anyone acts on
it.

## Do all AI models hallucinate?

Yes. Anything that predicts its output hallucinates, whichever provider's logo
is on it. Newer models are better at recognising the edge of their knowledge and
reaching for a search tool, which is why the same question can come back sourced
from one model and invented by another. Plan around the guess, because the
answer looks identical either way.

## How to reduce AI hallucinations

Four controls, roughly in order of how much they buy you.

1. **Paste in the source material.** Transcripts, documents, the actual invoice
   or quote. A ten-page contract is
   [nearly 7,000 tokens](/academy/what-is-a-token), which any current model
   reads in one go. Ask a model what your cancellation terms are and you get an
   answer shaped like a cancellation clause. Paste in the contract and ask
   again, and you get the notice period your customer signed.
2. **Connect it to live search.** Third-party tools give the model real-time web
   search and real-time documentation search, which handles the training cutoff.
   Context7 does live documentation search. xAI and NIA MCP do live web search.
   Most of them plug in as [MCP servers](/academy/what-is-an-mcp).
3. **Make it cite sources.** Ask for a citation on every claim, then open one or
   two of them. Citations that point at nothing are hallucinations too, and they
   are fast to catch.
4. **Break the task into smaller asks.** Give the model one stage at a time and
   verify each stage before it moves on. A long unsupervised run takes a wrong
   figure from step two and carries it through steps three, four and five.

With all four in place you will still get hallucinations. Fewer of them, and in
places you are looking.

Pick your controls by what a wrong answer costs. A draft reply with a wrong
number costs you an apology. A price on a customer quote, a date on a permit and
an address on a dispatch turn into actions, and an action taken on invented data
is expensive to reverse. Anywhere the output becomes something a crew or a
customer acts on, put the source material in front of the model and make it show
where the answer came from. The Einstein quote sounded right too. Later in this
track we get into how [AI agents](/academy/what-is-an-ai-agent) are built to
hold up under this, with the live-search tools running against real work.
