import { Check, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Full workflow engine. Open source.",
    features: [
      "Deterministic task engine",
      "Multi-model adversarial reviews",
      "Inline friction detection",
      "Signal cooldown + resurface",
      "20 bundled tool recommendations",
      "Local workflow score",
      "Ralph mode (autonomous)",
    ],
    cta: "Install Flux",
    ctaHref: "#flux-cta",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$10",
    period: "/mo",
    annualNote: "$96/yr (save 20%)",
    description: "Stack-aware recommendations that actually work.",
    features: [
      "Everything in Free",
      "50+ curated recommendations",
      "Stack-aware matching (Next.js ≠ Django)",
      "Community-ranked by friction reduction",
      "Weekly database updates",
      "Fresh recs on signal resurface",
      "Flux Score syncs to Universe",
    ],
    cta: "Get Flux Pro",
    ctaHref: "https://polar.sh/nairon-ai",
    highlight: true,
  },
];

export function FluxPricing() {
  return (
    <section className="bg-[#0C0C0C] relative overflow-hidden py-16 md:py-24">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(201,169,110,0.06),transparent_50%)]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="text-center mb-12">
          <div className="bg-[#C9A96E]/10 text-[#C9A96E] border border-[#C9A96E]/20 w-fit mx-auto rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            Pricing
          </div>
          <h2 className="text-[28px] leading-[32px] md:text-[40px] md:leading-[44px] lg:text-[48px] lg:leading-[52px] font-normal tracking-[-1px] text-[#E8E4DE]">
            Flux is free.{" "}
            <span className="font-serif italic text-[#C9A96E]">
              Pro makes it smarter.
            </span>
          </h2>
          <p className="text-[#A39E96] mt-4 text-lg max-w-2xl mx-auto">
            Free users get friction detection — the most valuable part. Pro adds
            the intelligence layer: recommendations matched to your stack,
            ranked by what actually works.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl p-8 ring-1 transition-all ${
                tier.highlight
                  ? "bg-[#C9A96E]/[0.06] ring-[#C9A96E]/30 hover:ring-[#C9A96E]/50"
                  : "bg-white/[0.03] ring-white/10 hover:ring-white/20"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-[#E8E4DE] text-xl font-medium">
                  {tier.name}
                </h3>
                {tier.highlight && (
                  <span className="bg-[#C9A96E]/20 text-[#C9A96E] rounded-full px-2.5 py-0.5 text-xs font-medium">
                    <Zap className="inline h-3 w-3 mr-0.5 -mt-0.5" />
                    Recommended
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-[#E8E4DE] text-4xl font-light tracking-tight">
                  {tier.price}
                </span>
                <span className="text-[#A39E96] text-sm">{tier.period}</span>
              </div>
              {tier.annualNote && (
                <p className="text-[#A39E96] text-sm mb-4">{tier.annualNote}</p>
              )}
              {!tier.annualNote && <div className="mb-4" />}

              <p className="text-[#A39E96] text-sm mb-6">{tier.description}</p>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check
                      className={`h-4 w-4 mt-0.5 shrink-0 ${
                        tier.highlight ? "text-[#C9A96E]" : "text-[#A39E96]"
                      }`}
                    />
                    <span className="text-[#E8E4DE] text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                size="lg"
                className={`w-full ${
                  tier.highlight
                    ? "bg-[#C9A96E] text-[#0C0C0C] hover:bg-[#C9A96E]/90"
                    : "bg-white/10 text-[#E8E4DE] hover:bg-white/20"
                }`}
              >
                <a
                  href={tier.ctaHref}
                  target={tier.ctaHref.startsWith("http") ? "_blank" : undefined}
                  rel={
                    tier.ctaHref.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  {tier.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-[#A39E96] text-sm mt-8">
          Enterprise observability coming soon — org-wide friction heatmaps,
          team metrics, and tool standardization.
        </p>
      </div>
    </section>
  );
}
