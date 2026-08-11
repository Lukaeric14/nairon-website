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
    <div className="mt-3 rounded-xl border border-[#0C0C0C]/10 bg-black/35 p-4">
      <div className="mb-3 flex justify-end">
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-md border border-[#0C0C0C]/15 bg-[#0C0C0C]/5 px-2.5 py-1.5 text-xs text-[#1A1916] transition-colors hover:bg-[#0C0C0C]/10"
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
      <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-[#1A1916]">
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
          "Yes. Flux is free and open source. You still use your own model plans. Codex is the primary implementation path, and Claude is optional as a secondary reviewer for adversarial review, cloud PR autofix, or importing older transcript learnings.",
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
          "It audits your real agent harness: project structure, current tools, MCP servers, skills, and repo fit. It recommends relevant MCPs, CLI tools, and secured skills for your stack, and it can turn repeated high-value patterns into reusable skills over time.",
      },
      {
        id: "item-3b",
        question: "Which agents are supported?",
        answer: (
          <>
            Codex CLI is the primary driver today. Claude stays optional and secondary for review-oriented flows, and the{" "}
            <a
              href="https://github.com/Nairon-AI/flux-opencode"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C9A96E] underline underline-offset-2 hover:text-[#1A1916]"
            >
              OpenCode port
            </a>{" "}
            is still experimental.
          </>
        ),
      },
      {
        id: "item-4",
        question: "What is the default workflow?",
        answer: (
          <div className="space-y-3">
            <p>
              <span className="font-medium text-[#1A1916]">1. Install Flux (once)</span>{" "}
              Paste the install prompt into your current agent session and let Flux choose the right platform-specific path.
            </p>
            <p>
              <span className="font-medium text-[#1A1916]">2. Setup Flux (once)</span>{" "}
              Let your agent finish the first-run setup for this environment.
            </p>
            <p>
              <span className="font-medium text-[#1A1916]">3. Prime automatically</span>{" "}
              Once setup is done, the agent should check whether this repository has already been primed. If not, Flux should run prime first automatically before any scoping or implementation work.
            </p>
            <p>
              <span className="font-medium text-[#1A1916]">4. Work by intent</span>{" "}
              After prime, just tell the agent what you want to do. Flux keeps the active objective in <code className="rounded bg-[#0C0C0C]/5 px-1.5 py-0.5 font-mono text-xs text-[#1A1916]">.flux/</code>, so natural requests like “fix this bug” or “continue this feature” can realign to the correct workflow state.
            </p>
            <p>
              <span className="font-medium text-[#1A1916]">5. Use explicit commands when needed</span>{" "}
              During{" "}
              <code className="rounded bg-[#0C0C0C]/5 px-1.5 py-0.5 font-mono text-xs text-[#1A1916]">
                /flux:scope
              </code>{" "}
              Flux shows phase progress so you always know whether you are in Start, Discover, Define, Develop, Deliver, or Handoff, but natural-language requests remain the default day-to-day UX.
            </p>
            <p>
              <span className="font-medium text-[#1A1916]">6. End each session with Reflect</span>{" "}
              Run{" "}
              <code className="rounded bg-[#0C0C0C]/5 px-1.5 py-0.5 font-mono text-xs text-[#1A1916]">
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
          "Core analysis is local-first. Flux keeps workflow state in the repo and only shares data when you explicitly export, publish, or opt into team-level reporting.",
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
            Yes. Flux is open source, but the project keeps strict contribution standards to filter out low-effort AI slop. Follow the{" "}
            <a
              href="https://github.com/Nairon-AI/flux/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C9A96E] underline underline-offset-2 hover:text-[#1A1916]"
            >
              contributing guidelines
            </a>{" "}
            before opening a PR.
          </>
        ),
      },
    ],
  },
];
export default function FAQs() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-1 md:px-6">
        <div className="grid gap-8 md:grid-cols-5 md:gap-12">
          <div className="max-w-lg max-md:px-6 md:col-span-2">
            <h2 className="text-[32px] leading-[36px] md:text-[40px] md:leading-[44px] font-normal tracking-[-1px] text-[#1A1916]">
              <span className="font-serif italic text-[#C9A96E]">FAQs</span>
            </h2>
            <p className="text-[#5C584F] mt-4 text-balance text-lg">
              Answers for engineers and engineering leaders
            </p>
          </div>

          <div className="space-y-12 md:col-span-3">
            {faqItems.map((item) => (
              <div className="space-y-4" key={item.group}>
                <h3 className="text-[#1A1916] pl-6 text-lg font-medium">
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
                        <div className="text-[#5C584F] text-base">
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
