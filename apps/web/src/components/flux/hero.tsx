import { useState, useEffect, useRef } from "react";
import { Check, Copy, Github, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FLUX_INSTALL_COMMAND } from "@/components/flux/install-prompt";

const TERMINAL_LINES = [
	{ type: "command", text: "> /flux:improve" },
	{ type: "blank" },
	{ type: "text", text: "Analyzing 23 sessions..." },
	{ type: "blank" },
	{ type: "header", text: "Friction Patterns Detected:" },
	{ type: "blank" },
	{ type: "friction", label: "shallow_prompts", count: "8x", desc: '"implement X" without context' },
	{ type: "friction", label: "blind_acceptance", count: "12x", desc: "accepted without verification" },
	{ type: "friction", label: "no_docs_lookup", count: "5x", desc: "relying on stale training data" },
	{ type: "blank" },
	{ type: "score", value: "52", max: "100" },
	{ type: "insight", text: "Top performers push back 3x more often." },
	{ type: "blank" },
	{ type: "header", text: "Recommended:" },
	{ type: "rec", name: "Context7", desc: "live docs, not hallucinations" },
	{ type: "rec", name: "Supermemory", desc: "context survives compaction" },
	{ type: "blank" },
	{ type: "prompt", text: "Install these? [Y/n]" },
	{ type: "command", text: "> yes" },
	{ type: "blank" },
	{ type: "success", text: "+ Installed 2 optimizations" },
	{ type: "success", text: "+ Score: 52 → 78 (+26)" },
];

function TerminalDemo() {
	const [visibleLines, setVisibleLines] = useState(0);
	const hasAnimatedRef = useRef(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (hasAnimatedRef.current) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !hasAnimatedRef.current) {
					hasAnimatedRef.current = true;
					let lineIndex = 0;
					const interval = setInterval(() => {
						lineIndex++;
						setVisibleLines(lineIndex);
						if (lineIndex >= TERMINAL_LINES.length) {
							clearInterval(interval);
						}
					}, 80);
				}
			},
			{ threshold: 0.3 }
		);

		if (containerRef.current) {
			observer.observe(containerRef.current);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={containerRef}
			className="relative overflow-hidden rounded-xl border border-[#0C0C0C]/10 bg-white shadow-2xl shadow-black/50"
		>
			{/* Terminal header */}
			<div className="flex items-center gap-2 border-b border-[#0C0C0C]/5 bg-[#0C0C0C]/[0.02] px-4 py-3">
				<div className="flex gap-1.5">
					<div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
					<div className="h-3 w-3 rounded-full bg-[#febc2e]" />
					<div className="h-3 w-3 rounded-full bg-[#28c840]" />
				</div>
				<span className="ml-2 text-xs text-[#1A1916]/40 font-mono">claude code</span>
			</div>

			{/* Terminal content */}
			<div className="p-5 font-mono text-sm leading-relaxed min-h-[420px]">
				{TERMINAL_LINES.slice(0, visibleLines).map((line, i) => {
					if (line.type === "blank") return <div key={i} className="h-4" />;
					if (line.type === "command") return <div key={i} className="text-[#1A1916]/90">{line.text}</div>;
					if (line.type === "text") return <div key={i} className="text-[#1A1916]/50">{line.text}</div>;
					if (line.type === "header") return <div key={i} className="text-[#1A1916]/70 font-medium">{line.text}</div>;
					if (line.type === "friction") {
						return (
							<div key={i} className="flex items-start gap-3 pl-2">
								<span className="text-red-400/80">{line.label}</span>
								<span className="text-[#1A1916]/30">({line.count})</span>
								<span className="text-[#1A1916]/40">{line.desc}</span>
							</div>
						);
					}
					if (line.type === "score") return <div key={i} className="text-amber-400 font-medium">Your Score: {line.value}/{line.max}</div>;
					if (line.type === "insight") return <div key={i} className="text-[#1A1916]/40 italic">{line.text}</div>;
					if (line.type === "rec") {
						return (
							<div key={i} className="flex items-center gap-2 pl-2">
								<span className="text-emerald-400">{line.name}</span>
								<span className="text-[#1A1916]/30">→</span>
								<span className="text-[#1A1916]/50">{line.desc}</span>
							</div>
						);
					}
					if (line.type === "prompt") return <div key={i} className="text-[#1A1916]/60">{line.text}</div>;
					if (line.type === "success") return <div key={i} className="text-emerald-400">{line.text}</div>;
					return null;
				})}
				{visibleLines < TERMINAL_LINES.length && (
					<span className="inline-block w-2 h-4 bg-[#0C0C0C]/70 animate-pulse" />
				)}
			</div>
		</div>
	);
}

export function FluxHero() {
	const installCommand = FLUX_INSTALL_COMMAND;
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(installCommand);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<section className="bg-background relative overflow-hidden py-16 md:py-24 lg:py-32">
			{/* Background effects */}
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.06),transparent_50%)]" />
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.04),transparent_50%)]" />

			<div className="mx-auto max-w-6xl px-6">
				<div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
					{/* Left: Copy */}
					<div className="relative z-10 space-y-8">
						<div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit rounded-full px-4 py-1.5 text-sm font-medium">
							Open Source Plugin
						</div>

						<h1 className="text-foreground text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
							Your AI workflow has gaps.
							<span className="mt-2 block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
								Flux finds them.
							</span>
						</h1>

						<p className="text-muted-foreground text-lg max-w-xl">
							A Claude Code plugin that analyzes your sessions, detects friction patterns, 
							and recommends the tools that top performers use.
						</p>

						{/* Install command */}
						<div className="flex items-center gap-2 rounded-xl border border-[#0C0C0C]/10 bg-[#0C0C0C]/5 p-1.5 max-w-xl">
							<code className="flex-1 px-4 py-2.5 font-mono text-sm text-[#1A1916]/80 overflow-x-auto">
								{installCommand}
							</code>
							<button
								onClick={handleCopy}
								className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#0C0C0C]/10 hover:bg-[#0C0C0C]/20 transition-colors shrink-0"
								aria-label="Copy install command"
							>
								{copied ? (
									<Check className="h-4 w-4 text-emerald-400" />
								) : (
									<Copy className="h-4 w-4 text-[#1A1916]/60" />
								)}
							</button>
						</div>
						<p className="mt-2 text-xs text-[#1A1916]/45">Run in Claude Code chat input (slash command), not terminal bash.</p>

						{/* CTAs */}
						<div className="flex flex-wrap gap-4">
							<Button asChild size="lg" variant="secondary">
								<a href="https://github.com/Nairon-AI/flux" target="_blank" rel="noopener noreferrer">
									<Github className="mr-2 h-5 w-5" />
									Star on GitHub
								</a>
							</Button>
							<Button asChild size="lg" variant="outline" className="border-[#0C0C0C]/20 hover:bg-[#0C0C0C]/5">
								<a href="#workflow">
									How it works
									<ArrowRight className="ml-2 h-4 w-4" />
								</a>
							</Button>
						</div>

						{/* Stats */}
						<div className="flex gap-8 pt-6 border-t border-[#0C0C0C]/10">
							<div>
								<div className="text-2xl font-bold text-foreground">30+</div>
								<div className="text-sm text-muted-foreground">Curated tools</div>
							</div>
							<div>
								<div className="text-2xl font-bold text-foreground">5</div>
								<div className="text-sm text-muted-foreground">Scoring dimensions</div>
							</div>
							<div>
								<div className="text-2xl font-bold text-foreground">100%</div>
								<div className="text-sm text-muted-foreground">Local analysis</div>
							</div>
						</div>
					</div>

					{/* Right: Terminal */}
					<div className="relative">
						<div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-3xl opacity-20" />
						<TerminalDemo />
					</div>
				</div>
			</div>
		</section>
	);
}
