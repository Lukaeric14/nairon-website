import { useEffect, useState } from "react";
import { ImageIllustration } from "@/components/ui/illustrations/image-illustration";
import { Button } from "@/components/ui/button";
import { Anchor, Users, Eye } from "lucide-react";
import {
  FLUX_RELEASE_FALLBACK,
  getFluxLatestRelease,
} from "@/server/flux-release";

const features = [
  {
    title: "Deterministic state",
    description:
      "Flux keeps repo-local workflow state in .flux so Codex can re-anchor before scoping, during implementation, and when sessions resume.",
    icon: <Anchor className="stroke-foreground fill-violet-500/15" />,
  },
  {
    title: "Evidence-based",
    description:
      "Quality is enforced through facts: tests, type checks, build outputs, and review findings before anything ships.",
    icon: <Eye className="stroke-foreground fill-blue-500/15" />,
  },
  {
    title: "Adversarial Review",
    description:
      "Codex stays the primary driver while secondary reviewers challenge assumptions, catch blind spots, and harden the final result.",
    icon: <Users className="stroke-foreground fill-emerald-500/15" />,
  },
];

const platforms = [
  {
    name: "Codex CLI",
    shortName: "Codex",
    status: "primary",
    icon: "/icons/codex.png",
  },
  {
    name: "Claude Code",
    shortName: "Claude",
    status: "secondary",
    icon: "/icons/claude-code.png",
  },
  {
    name: "OpenCode",
    shortName: "OpenCode",
    status: "experimental",
    icon: "/icons/opencode.png",
  },
];

export default function HeroSection() {
  const [release, setRelease] = useState(FLUX_RELEASE_FALLBACK);

  useEffect(() => {
    let mounted = true;

    const loadLatestRelease = async () => {
      try {
        const result = await getFluxLatestRelease();
        if (mounted && result?.version && result?.url) {
          setRelease(result);
        }
      } catch {
        // Keep the verified fallback release when GitHub is unavailable.
      }
    };

    void loadLatestRelease();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main role="main" className="overflow-hidden">
      <section>
        <div className="bg-[#0C0C0C] pt-24 sm:pt-32 lg:pt-44">
          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-12">
            <div className="text-center">
              {/* Version pill */}
              <a
                href={release.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-4 sm:mb-5 inline-flex items-center gap-1.5 rounded-full bg-[#C9A96E]/10 px-3 py-1 text-xs font-medium text-[#C9A96E] ring-1 ring-inset ring-[#C9A96E]/20 transition-colors hover:bg-[#C9A96E]/15"
              >
                Latest release: {release.version}
              </a>

              {/* Platform pills */}
              <div className="mb-4 sm:mb-6 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                {platforms.map((platform) => (
                  <span
                    key={platform.name}
                    className={`inline-flex items-center gap-1 sm:gap-1.5 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium ring-1 ring-inset ${
                      platform.status === "primary"
                        ? "bg-violet-500/10 text-violet-400 ring-violet-500/20"
                        : platform.status === "secondary"
                          ? "bg-blue-500/10 text-blue-400 ring-blue-500/20"
                        : platform.status === "experimental"
                          ? "bg-amber-500/10 text-amber-400 ring-amber-500/20"
                          : "bg-zinc-500/10 text-zinc-400 ring-zinc-500/20"
                    }`}
                  >
                    <img
                      src={platform.icon}
                      alt={platform.name}
                      className="size-3 sm:size-4 object-contain"
                    />
                    <span className="hidden sm:inline">
                      {platform.shortName}
                    </span>
                    <span className="sm:hidden">{platform.shortName}</span>
                    {platform.status === "secondary" && (
                      <span className="ml-0.5 sm:ml-1 rounded bg-blue-500/20 px-1 py-0.5 text-[8px] sm:text-[10px] uppercase tracking-wide">
                        opt
                      </span>
                    )}
                    {platform.status === "experimental" && (
                      <span className="ml-0.5 sm:ml-1 rounded bg-amber-500/20 px-1 py-0.5 text-[8px] sm:text-[10px] uppercase tracking-wide">
                        exp
                      </span>
                    )}
                  </span>
                ))}
              </div>

              <h1 className="mx-auto text-balance text-[32px] leading-[36px] sm:text-[40px] sm:leading-[44px] md:text-[56px] md:leading-[60px] lg:text-[72px] lg:leading-[76px] font-normal tracking-[-1.5px] md:tracking-[-2.4px] text-[#E8E4DE]">
                Build software{" "}
                <span className="font-serif italic text-[#C9A96E]">
                  reliably
                </span>
                .
              </h1>

              <div className="mx-auto mb-8 sm:mb-12 mt-6 max-w-2xl">
                <p className="text-lg md:text-xl text-[#A39E96] leading-relaxed mb-6 sm:mb-8 px-2 sm:px-0">
                  Flux is the missing (self-improving) harness for Coding Agents. Build software{" "}
                  <span className="font-serif italic text-[#C9A96E]">
                    deterministically
                  </span>
                  {" "}without outsourcing your thinking.
                </p>

                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <Button
                    size="sm"
                    className="sm:size-default"
                    onClick={() =>
                      document
                        .getElementById("flux-architecture")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    See architecture
                  </Button>
                  <Button
                    size="sm"
                    className="sm:size-default"
                    variant="outline"
                    onClick={() =>
                      document
                        .getElementById("flux-cta")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Install Flux
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 sm:mt-0">
            <ImageIllustration />
          </div>
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 pb-16 sm:pb-24 lg:px-12">
          <div className="grid gap-6 pt-8 sm:pt-12 text-left grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:gap-12 lg:px-12">
            {features.map((feature, index) => (
              <div key={index} className="space-y-2 sm:space-y-3">
                <div className="bg-card ring-border flex size-8 items-center justify-center rounded-md shadow ring-1 *:size-4">
                  {feature.icon}
                </div>
                <h2 className="text-base sm:text-lg font-medium text-[#E8E4DE]">
                  {feature.title}
                </h2>
                <p className="text-[#A39E96] text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
