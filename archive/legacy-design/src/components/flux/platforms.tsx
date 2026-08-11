import { cn } from "@/lib/utils";
import { Claude } from "@/components/ui/svgs/claude";
import { OpenAI } from "@/components/ui/svgs/open-ai";
import { Replit } from "@/components/ui/svgs/replit";
import { VisualStudioCode as VSCode } from "@/components/ui/svgs/vs-code";
import { FLUX_INSTALL_COMMAND } from "@/components/flux/install-prompt";
import { Check, Clock } from "lucide-react";

const platforms = [
	{
		name: "Claude Code",
		status: "recommended",
		install: FLUX_INSTALL_COMMAND,
		icon: Claude,
	},
	{
		name: "Factory Droid",
		status: "supported",
		install: "droid plugin marketplace add https://github.com/Nairon-AI/flux",
		icon: Replit,
	},
	{
		name: "OpenAI Codex",
		status: "supported",
		install: "git clone + ./scripts/install-codex.sh flux",
		icon: OpenAI,
	},
	{
		name: "OpenCode",
		status: "coming",
		progress: "96%",
		icon: VSCode,
	},
];

export function FluxPlatforms() {
	return (
		<section className="bg-background py-16 md:py-24">
			<div className="mx-auto max-w-5xl px-6">
				{/* Header */}
				<div className="mx-auto max-w-2xl text-center mb-12">
					<div className="bg-blue-500/10 text-blue-400 border border-blue-500/20 w-fit mx-auto rounded-full px-4 py-1.5 text-sm font-medium mb-6">
						Platform Support
					</div>
					<h2 className="text-foreground text-3xl font-semibold md:text-4xl lg:text-5xl">
						One plugin. Every AI coding tool.
					</h2>
					<p className="text-muted-foreground mt-6 text-lg">
						Flux runs inside Claude Code, Factory Droid, and OpenAI Codex. Same workflow intelligence across every agent you use.
					</p>
				</div>

				{/* Platform cards */}
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{platforms.map((platform) => {
						const Icon = platform.icon;
						return (
							<div
								key={platform.name}
								className={cn(
									"rounded-xl border p-5 transition-colors",
									platform.status === "recommended"
										? "border-emerald-500/30 bg-emerald-500/5"
										: "border-[#0C0C0C]/10 bg-card/30 hover:border-[#0C0C0C]/20"
								)}
							>
								<div className="flex items-center gap-3 mb-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0C0C0C]/5">
										<Icon className="h-5 w-5" />
									</div>
									<div>
										<h3 className="text-foreground font-medium">{platform.name}</h3>
										{platform.status === "recommended" && (
											<span className="text-emerald-400 text-xs flex items-center gap-1">
												<Check className="h-3 w-3" /> Recommended
											</span>
										)}
										{platform.status === "supported" && (
											<span className="text-blue-400 text-xs flex items-center gap-1">
												<Check className="h-3 w-3" /> Supported
											</span>
										)}
										{platform.status === "coming" && (
											<span className="text-amber-400 text-xs flex items-center gap-1">
												<Clock className="h-3 w-3" /> {platform.progress}
											</span>
										)}
									</div>
								</div>
								{platform.install && (
									<code className="scroll-fade-x scrollbar-thin block overflow-x-auto rounded-lg bg-black/30 px-3 py-2 font-mono text-xs text-[#1A1916]/60">
										{platform.install}
									</code>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
