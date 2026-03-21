import { useState } from "react";
import { Check, Copy, Github, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FLUX_INSTALL_PROMPT } from "@/components/flux/install-prompt";

export function FluxCTA() {
  const [copied, setCopied] = useState(false);

  const installPrompt = FLUX_INSTALL_PROMPT;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(installPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="flux-cta"
      className="bg-[#0C0C0C] relative overflow-hidden py-16 md:py-24"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,169,110,0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <div className="bg-[#C9A96E]/10 text-[#C9A96E] border border-[#C9A96E]/20 w-fit mx-auto rounded-full px-4 py-1.5 text-sm font-medium mb-6">
          Get Started
        </div>

        <h2 className="text-[28px] leading-[32px] md:text-[40px] md:leading-[44px] lg:text-[48px] lg:leading-[52px] font-normal tracking-[-1px] text-[#E8E4DE]">
          Find your gaps. <span className="font-serif italic text-[#C9A96E]">Fix them.</span>
        </h2>

        <p className="text-[#A39E96] mt-6 text-lg max-w-xl mx-auto">
          Copy this prompt into your current agent session for an autonomous install flow.
        </p>

        {/* Install prompt card */}
        <div
          onClick={handleCopy}
          className="bg-white/[0.03] ring-white/10 rounded-2xl p-8 ring-1 cursor-pointer transition-all hover:bg-white/[0.05] hover:ring-white/20 max-w-2xl mx-auto mt-8 text-left"
        >
          <p className="text-[#A39E96] text-sm mb-2">
            Install Flux in your agent
          </p>
          <h3 className="text-[#E8E4DE] text-xl md:text-2xl font-medium mb-6">
            {copied
              ? "Copied to clipboard!"
              : "Copy this prompt and paste it in your agent"}
          </h3>

          <div className="bg-[#0C0C0C] ring-white/10 rounded-xl px-6 py-4 font-mono text-sm ring-1 relative">
            <pre className="text-[#A39E96] whitespace-pre-wrap text-left">
              {installPrompt}
            </pre>
            <span className="absolute top-4 right-4 size-5">
              <Copy
                className={`absolute inset-0 size-5 text-muted-foreground transition-all duration-300 ${
                  copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
                }`}
              />
              <Check
                className={`absolute inset-0 size-5 text-[#C9A96E] transition-all duration-300 ${
                  copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
              />
            </span>
          </div>
        </div>

        {/* Requirements note */}
        <p className="text-[#A39E96] text-sm mt-4">
          Requires{" "}
          <a
            href="https://claude.ai/pro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E8E4DE] underline underline-offset-2 hover:text-[#A39E96]"
          >
            Claude Pro
          </a>{" "}
          and{" "}
          <a
            href="https://chatgpt.com/plus"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E8E4DE] underline underline-offset-2 hover:text-[#A39E96]"
          >
            ChatGPT Plus
          </a>{" "}
          ($20/mo each) for cross-model review.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Button asChild size="lg" className="bg-white text-[#0C0C0C] hover:bg-white/90">
            <a
              href="https://github.com/Nairon-AI/flux"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-5 w-5" />
              Open repo
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/20 hover:bg-white/5"
          >
            <a
              href="https://discord.gg/CEQMd6fmXk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Join Discord
            </a>
          </Button>
        </div>

        {/* Philosophy quote */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <blockquote className="text-muted-foreground italic text-lg">
            "Stop hoping AI makes you better. Start measuring it."
          </blockquote>
        </div>
      </div>
    </section>
  );
}
