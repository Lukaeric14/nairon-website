import { useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FLUX_INSTALL_PROMPT,
  FLUX_UNINSTALL_PROMPT,
} from "@/components/flux/install-prompt";

function PromptBlock({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mt-3 rounded-xl border border-white/10 bg-black/35 p-4">
      <div className="mb-3 flex justify-end">
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-2.5 py-1.5 text-xs text-[#CFCAC2] transition-colors hover:bg-white/10"
          aria-label={`Copy ${label} prompt to clipboard`}
        >
          {copied ? (
            <>
              <Check className="size-3.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-[#CFCAC2]">
        {text}
      </pre>
    </div>
  );
}

const faqItems: {
  group: string;
  items: { id: string; question: string; answer: ReactNode }[];
}[] = [
  {
    group: "Product",
    items: [
      {
        id: "item-1",
        question: "Is it free?",
        answer:
          "Yes - Flux itself is free and open-source because it is a plugin/workflow layer. You still use your own model plans. In practice, the strongest setup is having both a Claude Code plan and a Codex plan: Claude can use Codex for deep implementation review and spin up Codex sub-agents for codebase discovery/research when needed.",
      },
      {
        id: "item-2",
        question: "How do I install it?",
        answer: (
          <>
            <p>Copy-paste this prompt into your current agent session:</p>
            <PromptBlock text={FLUX_INSTALL_PROMPT} label="install" />
          </>
        ),
      },
      {
        id: "item-2b",
        question: "How do I uninstall it?",
        answer: (
          <>
            <p>Copy-paste this prompt into your current agent session:</p>
            <PromptBlock text={FLUX_UNINSTALL_PROMPT} label="uninstall" />
          </>
        ),
      },
      {
        id: "item-3",
        question: "What does /flux:improve actually do?",
        answer:
          "It audits your real agent harness: recent conversation history, current tools, MCP servers, skills, project structure, and what you are building. It then fetches from the Flux recommendation engine to find the best tools, MCP servers, skills, and agentic strategies to improve your harness. This means Flux improves itself with you over time — the more you work with it, the better your harness naturally becomes.",
      },
      {
        id: "item-3b",
        question: "Which agents are supported?",
        answer: (
          <>
            Claude Code is the first-class, default agent. The{" "}
            <a
              href="https://github.com/Nairon-AI/flux-opencode"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C9A96E] underline underline-offset-2 hover:text-[#E8E4DE]"
            >
              OpenCode port
            </a>{" "}
            is currently experimental — we're working hard to make it a fully supported agent.
          </>
        ),
      },
      {
        id: "item-4",
        question: "What is the default workflow?",
        answer: (
          <div className="space-y-3">
            <p>
              <span className="font-medium text-[#E8E4DE]">1. Install Flux (once)</span>{" "}
              Let your agent install Flux in the current environment and handle the right platform-specific path for you.
            </p>
            <p>
              <span className="font-medium text-[#E8E4DE]">2. Setup Flux (once)</span>{" "}
              Let your agent finish the first-run setup for this environment.
            </p>
            <p>
              <span className="font-medium text-[#E8E4DE]">3. Prime automatically</span>{" "}
              Once setup is done, the agent should check whether this repository has already been primed. If not, Flux should run prime first automatically before any scoping or implementation work.
            </p>
            <p>
              <span className="font-medium text-[#E8E4DE]">4. Work by intent</span>{" "}
              After prime, just tell the agent what you want to do. Flux keeps the active objective in <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-xs text-[#E8E4DE]">.flux/</code>, so natural requests like “fix this bug” or “continue this feature” can realign to the correct workflow state.
            </p>
            <p>
              <span className="font-medium text-[#E8E4DE]">5. Track scoping progress</span>{" "}
              During{" "}
              <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-xs text-[#E8E4DE]">
                /flux:scope
              </code>{" "}
              Flux shows phase progress so you always know whether you are in Start, Discover, Define, Develop, Deliver, or Handoff.
            </p>
            <p>
              <span className="font-medium text-[#E8E4DE]">6. End each session with Reflect</span>{" "}
              Run{" "}
              <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-xs text-[#E8E4DE]">
                /flux:reflect
              </code>{" "}
              to capture learnings and continuously improve your agent workflow.
            </p>
          </div>
        ),
      },
    ],
  },
  {
    group: "Security & rollout",
    items: [
      {
        id: "item-1",
        question: "Does session data leave the machine?",
        answer:
          "Core analysis is local-first. Data is only shared when teams explicitly export or publish reports.",
      },
      {
        id: "item-3",
        question: "Can enterprise teams run this across multiple engineers?",
        answer:
          "Coming soon. Enterprise mode will add observability dashboards, team-wide capability tracking, and shared recommendations to help standardize high-quality agent collaboration across your org.",
      },
      {
        id: "item-4",
        question: "When is the Observability Layer launching?",
        answer:
          "We're actively building it. Join the waitlist above to get early access when it's ready. The CLI Runtime and Recommendation Engine are available now.",
      },
    ],
  },
  {
    group: "Community",
    items: [
      {
        id: "item-1",
        question: "Can I contribute to Flux?",
        answer: (
          <>
            Yes! Flux is open source. But we have strict contribution guidelines
            to filter out low-effort AI slop. You must use AI, export your
            conversation history, include a demo video, and post to social media
            (on X, tag @_7obaid_). PRs that don't follow the{" "}
            <a
              href="https://github.com/Nairon-AI/flux/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C9A96E] underline underline-offset-2 hover:text-[#E8E4DE]"
            >
              contributing guidelines
            </a>{" "}
            are automatically closed.
          </>
        ),
      },
    ],
  },
];
export default function FAQs() {
  return (
    <section className="bg-[#0C0C0C] py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-1 md:px-6">
        <div className="grid gap-8 md:grid-cols-5 md:gap-12">
          <div className="max-w-lg max-md:px-6 md:col-span-2">
            <h2 className="text-[32px] leading-[36px] md:text-[40px] md:leading-[44px] font-normal tracking-[-1px] text-[#E8E4DE]">
              <span className="font-serif italic text-[#C9A96E]">FAQs</span>
            </h2>
            <p className="text-[#A39E96] mt-4 text-balance text-lg">
              Answers for engineers and engineering leaders
            </p>
          </div>

          <div className="space-y-12 md:col-span-3">
            {faqItems.map((item) => (
              <div className="space-y-4" key={item.group}>
                <h3 className="text-[#E8E4DE] pl-6 text-lg font-medium">
                  {item.group}
                </h3>
                <Accordion type="single" collapsible className="-space-y-1">
                  {item.items.map((item) => (
                    <AccordionItem
                      key={item.id}
                      value={item.id}
                      className="data-[state=open]:bg-card data-[state=open]:ring-border data-[state=open]:shadow-black/6.5 peer rounded-xl border-none px-6 py-1 data-[state=open]:border-none data-[state=open]:shadow-sm data-[state=open]:ring-1"
                    >
                      <AccordionTrigger className="cursor-pointer rounded-none border-b text-base transition-none hover:no-underline data-[state=open]:border-transparent">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="text-[#A39E96] text-base">
                          {item.answer}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
