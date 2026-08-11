---
title: "What is RAG?"
seoTitle: "What is RAG? Retrieval-augmented generation, explained"
description: "RAG stands for retrieval-augmented generation. It finds the right document in your own files and hands it to the model before it answers, so the model stops guessing at your refund policy."
youtubeId: 9XaKZuV5hM8
topic: ai-fundamentals
level: basic
order: 11
duration: 319
publishedAt: 2026-06-08
channel: "Nairon AI"
magnet: ai-agents
takeaways:
  - "RAG stands for retrieval-augmented generation. It hands a language model the right documents out of your own files before it answers, so it works from your policies instead of average internet knowledge."
  - "It cuts hallucination because the instruction you send with the documents tells the model to invent nothing and to say when the answer is not in the library."
  - "Fine-tuning retrains a model once and costs a lot, so RAG suits data that changes day to day and is good enough about 80% of the time."
transcript:
  - { t: 3, text: "[music] Hey, my name is Mahan, I'm the CMO of Nairon. My name is Luka and I'm the CEO of Nairon. Luka, over the past couple videos we've covered a broad range of topics when it comes to LLMs and AI. In this video we're going to talk about RAG. So let's dive deep into it. What is RAG and how is it useful for summarizing data?" }
  - { t: 19, text: "So the way that we use LLMs today is through a method called generative AI, which is the ability for an LLM to generate the next word or to generate a blog for example. It's good to use an LLM as a assistant in that case, but it doesn't have context on for example company specific information like a refund policy for example. And so you need to essentially feed the LLM this information ahead of time in order to answer your question. The problem becomes when you have so much information hundreds of thousands of PDFs that you need to feed the LLM that it could use different information in different [clears throat] circumstances for example. And so what the best practice is today is to use a RAG model, which is essentially acting like a librarian. So think about your company is this big library, hundreds of thousands of books, and at any point you as a as a user might need certain information that's found in a specific book all the way on some shelf. You go up to a librarian, you ask the librarian um hey, what is my refund policy? The librarian knows where to look pulls that book, hands it over to you. Now you have essentially enough information to answer that question." }
  - { t: 88, text: "Okay, and so in practice, how does it actually work on a step-by-step basis? So there's two parts. There's a part before this diagram over here, which we'll get to in another video called vector databases. But the first part is the ingestion phase and then the second part is actually the retrieval phase." }
  - { t: 103, text: "Now in this video we're going to cover the second part, which is retrievals, but just a very quick summary of how ingestion works is imagine the library has a new shipment of books. They come in, they say hey, these are the 50 books that came in today. The librarian essentially takes those books and sorts it all over the library wherever makes sense. And so, in this case, when we look at a refund policy for example, the LLM might find three or four or five books that cover the refund policy. And so, what the LLM will do is essentially give you all of the five books, pass it over into the system prompt or into that first prompt. The LLM will then look at all of that information and intellectually identify which one makes sense and which one doesn't make sense. And then it will generate the final response to you, which is the third step right over here." }
  - { t: 149, text: "Mhm. And I think a good example we can give on what it looks like when an LLM has access to RAG and when it doesn't it is something like when you're doing an exam with an open book versus one with without one. The example that we have here is just that. When you have a closed book exam, which is essentially no RAG, you don't have access to documents, the LLM can sometimes hallucinate. And we covered hallucinations in previous videos. And so, RAG is one of the best ways to combat hallucinations. We essentially tell the LLM, \"Don't create any new information. Just tell us what you know and what you don't know.\" And with RAG, the LLM now has access to more information and if [music] it comes back with this book doesn't exist, then it'll come back and tell you, \"Hey, we don't have the answer to this.\"" }
  - { t: 190, text: "Mhm. But previously in that closed book exam, it wasn't able to do that. Definitely what you don't need RAG for is any sort of general knowledge, anything that you can perhaps find on the internet, things like famous people, events, how most industries work, right? Those are sort of like average internet answers. You don't need RAG for that. RAG is for more specific information that is typically domain experience." }
  - { t: 214, text: "Mhm. Such as, you know, your internal documentations, company policies, customer history, everything that's kind of like proprietary to your to your company. What we previously used to do is we used to fine-tune the models, which is essentially retraining the models on a company-to-company basis." }
  - { t: 231, text: "But that's essentially done once and then you reuse the same model. The beauty of rag is on a day-to-day basis, the data changes. So, if I were to bring a book to the library today, take it out of the library tomorrow, after tomorrow, that book isn't there to be retrieved." }
  - { t: 247, text: "And so, here we have some more information on like when you would fine-tune and when you would use rag. One of the biggest differences time and cost, like it's very expensive to fine-tune, quite easy to implement rag especially today. You definitely want to implement rag when your data is constantly changing like I just mentioned. And you want to use fine-tuning when you have a lot of data that [music] can specifically identify patterns. So, this is sort of like your typical like ML use case where you have a bunch of images and then you kind of want to find the patterns intellectually. Rag is more for just like a library situation that I just mentioned, you know, you want to pull information when it's when it's when it's needed. Rag is definitely you know, 80% of the time a good enough system. In the 20% cases that it doesn't make sense, it doesn't give us the output, then maybe fine-tuning is is the way to go." }
  - { t: 299, text: "As you mentioned earlier in the video, behind every good rag system is a vector database. Yep. Which we're going to cover in the next video. So, guys, if you enjoyed the video, you can subscribe to the channel. You can also subscribe to our newsletter, link's down in the description below. And you can follow us on LinkedIn as well. We're very active there on a day-to-day basis. And uh we'll see you in the next video." }
---

RAG stands for retrieval-augmented generation. It finds the right document in
your own files and hands it to the model before the model answers. None of that
material was in the training data. Not your policies, not your customer
history, not your job notes.

## Why can't a language model answer questions about your company?

A language model generates the next word. That makes it a decent assistant for
drafting a blog post or tidying up an email. Ask it what your refund policy says
and it has nothing of yours to work from, so it writes a plausible refund policy
instead of your one. The paragraph reads fine. It is invented.

The obvious fix is to paste the policy into the prompt. That works for one
document. It falls apart at hundreds of thousands of PDFs, where nobody knows
which one holds the answer and the right one changes with the question.

RAG is a librarian. Your company is the library, hundreds of thousands of books
on the shelves. You walk up and ask what the refund policy is. The librarian
knows where to look, pulls the book down and hands it over. Now you have enough
to answer the question, and so does the model.

## How does RAG work?

Two phases. Ingestion files the documents where they can be found again,
retrieval pulls them back out.

1. **Ingestion.** A shipment of 50 new documents arrives and gets sorted across
   the store, each one wherever it belongs. A vector database does this part,
   and it is a lesson of its own.
2. **Retrieval.** You ask about the refund policy. The system finds the three or
   four or five documents that cover it and passes all of them into the prompt.
3. **Generation.** The model reads all five, works out which parts apply and
   which do not, and writes the final answer.

Nothing about the model changed between a bad answer and a good one. What
changed is what was on the desk in front of it.

## Does RAG stop hallucinations?

Think of it as an open book exam against a closed book one. Closed book is a
model with no RAG. It has to produce something, and sometimes what it produces
is invented.

What stops that is the instruction you send with the documents, which carries as
much weight as the documents themselves. Do not create any new information. Tell
us what you know and what you do not know. When the book is not on the shelf,
the model comes back and says the answer is not there. In a closed book exam it
could not do that.

## RAG vs fine-tuning: which one?

Fine-tuning is what people used to do. Retrain the model on one company's data,
once, then reuse that model everywhere. RAG pulls the information at the moment
somebody asks for it.

|  | RAG | Fine-tuning |
| --- | --- | --- |
| **How it works** | Pulls the relevant documents in at question time | Retrains the model on your data, once |
| **Effort to set up** | Quite easy to implement today | Very expensive |
| **Data that changes daily** | Picks the change up straight away | Needs another training run |
| **Best for** | Documents you want pulled when they are needed | Large data sets where the model has to learn patterns |

Data that changes daily is what decides most cases. Bring a book into the
library today, take it out tomorrow, and the day after it is not there to be
retrieved. A model fine-tuned last quarter still believes the old book is on the
shelf. Around 80% of the time RAG on its own is good enough. In the 20% where it
is not, fine-tuning is worth a look, and the typical case there is finding
patterns across a large set of images.

## When should you not use RAG?

General knowledge. Famous people, historical events, how most industries work.
Those are average internet answers and the model already has them.

RAG is for the material only you have. Internal documentation. Company policies.
Customer history. The commissioning notes from an install three years ago that
the crew standing on the roof needs at 9am.

Write down the documents you would be embarrassed to have a model guess at, then
check whether they sit anywhere a librarian could find them.

Behind every RAG system that works there is a vector database, the part that
tells the librarian which shelf to walk to.
[That is the next lesson](/academy/what-is-a-vector-database).
