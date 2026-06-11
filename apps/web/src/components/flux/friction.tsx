import { Eye, BookOpen, RotateCcw, Brain, Target } from "lucide-react";

const frictionPatterns = [
	{
		signal: "shallow_prompts",
		description: '"Implement this" without context',
		icon: Target,
		color: "text-red-400",
		bgColor: "bg-red-500/10",
	},
	{
		signal: "blind_acceptance",
		description: "Never disagreeing with AI suggestions",
		icon: Eye,
		color: "text-orange-400",
		bgColor: "bg-orange-500/10",
	},
	{
		signal: "no_docs_lookup",
		description: "Relying on outdated training data",
		icon: BookOpen,
		color: "text-yellow-400",
		bgColor: "bg-yellow-500/10",
	},
	{
		signal: "undo_loops",
		description: "AI producing slop, needs better planning",
		icon: RotateCcw,
		color: "text-purple-400",
		bgColor: "bg-purple-500/10",
	},
	{
		signal: "memory_loss",
		description: "Context not persisting across sessions",
		icon: Brain,
		color: "text-pink-400",
		bgColor: "bg-pink-500/10",
	},
];

const recommendations = [
	{
		category: "MCP Servers",
		items: ["Context7 (live docs)", "Nia (repo research)", "Supermemory (persistence)"],
	},
	{
		category: "Skills",
		items: ["Workflow templates", "Prompt libraries", "Testing patterns"],
	},
	{
		category: "CLI Tools",
		items: ["Lefthook (git hooks)", "Beads (task tracking)", "Agent Browser"],
	},
	{
		category: "Workflows",
		items: ["Clarify-first", "Test-driven prompting", "Review checkpoints"],
	},
];

export function FluxFriction() {
	return (
		<section className="bg-background py-16 md:py-24">
			<div className="mx-auto max-w-6xl px-6">
				<div className="grid gap-16 lg:grid-cols-2">
					{/* Left: What it detects */}
					<div>
						<div className="bg-red-500/10 text-red-400 border border-red-500/20 w-fit rounded-full px-4 py-1.5 text-sm font-medium mb-6">
							Friction Detection
						</div>
						<h2 className="text-foreground text-3xl font-semibold md:text-4xl">
							What Flux detects
						</h2>
						<p className="text-muted-foreground mt-4 text-lg mb-8">
							Patterns that slow you down. Not model failures, <span className="text-foreground font-medium">process failures</span>.
						</p>

						<div className="space-y-3">
							{frictionPatterns.map((pattern) => {
								const Icon = pattern.icon;
								return (
									<div
										key={pattern.signal}
										className="flex items-center gap-4 rounded-xl border border-[#0C0C0C]/5 bg-card/30 p-4 hover:border-[#0C0C0C]/10 transition-colors"
									>
										<div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${pattern.bgColor}`}>
											<Icon className={`h-5 w-5 ${pattern.color}`} />
										</div>
										<div>
											<code className={`font-mono text-sm ${pattern.color}`}>{pattern.signal}</code>
											<p className="text-muted-foreground text-sm mt-0.5">{pattern.description}</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>

					{/* Right: What it recommends */}
					<div>
						<div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit rounded-full px-4 py-1.5 text-sm font-medium mb-6">
							Battle-tested Solutions
						</div>
						<h2 className="text-foreground text-3xl font-semibold md:text-4xl">
							What Flux recommends
						</h2>
						<p className="text-muted-foreground mt-4 text-lg mb-8">
							A curated database of <span className="text-foreground font-medium">30+ tools</span> mapped to your specific friction.
						</p>

						<div className="grid gap-4 sm:grid-cols-2">
							{recommendations.map((rec) => (
								<div
									key={rec.category}
									className="rounded-xl border border-[#0C0C0C]/5 bg-card/30 p-5"
								>
									<h3 className="text-foreground font-semibold mb-3">{rec.category}</h3>
									<ul className="space-y-2">
										{rec.items.map((item) => (
											<li key={item} className="text-muted-foreground text-sm flex items-center gap-2">
												<span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
												{item}
											</li>
										))}
									</ul>
								</div>
							))}
						</div>

						<p className="text-muted-foreground text-sm mt-6">
							Recommendations database is private during beta.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
