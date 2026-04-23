import { useEffect, useRef, useState } from "react";
import { GridSection, GridCell } from "./grid-system";

export function LivesAndWorks() {
	return (
		<div id="setup" className="scroll-mt-24 md:scroll-mt-28">
			{/* Title row */}
			<GridSection columns="1fr" border>
				<GridCell className="px-6 md:px-12 py-8 md:py-10">
					<div className="flex items-center gap-3 mb-4">
						<div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
						<span className="text-[#5C584F] text-xs font-medium uppercase tracking-[0.16em]">
							The setup
						</span>
					</div>
					<h2 className="text-3xl md:text-[48px] md:leading-[57.6px] font-normal tracking-[-0.48px] text-[#1A1916] max-w-3xl">
						Your existing team,{" "}
						<span className="font-serif italic text-[#C9A96E]">doubled overnight</span>.
					</h2>
					<p className="mt-5 text-[#5C584F] text-base md:text-lg max-w-2xl leading-relaxed">
						Each AI employee runs on its own dedicated machine in our data center and
						operates inside Hive — so you can drop one under every role on your org
						chart without touching headcount.
					</p>
				</GridCell>
			</GridSection>

			{/* Two-column split */}
			<GridSection columns="1fr 1fr" border>
				{/* Left — chain of command */}
				<GridCell borderRight className="flex flex-col">
					<div className="px-6 md:px-12 pt-8 md:pt-12 pb-6">
						<div className="flex items-center gap-2 mb-3">
							<span className="h-1 w-1 rounded-full bg-[#C9A96E]" />
							<span className="text-[#5C584F] text-[11px] font-medium uppercase tracking-[0.18em]">
								Your org, augmented
							</span>
						</div>
						<h3 className="text-2xl md:text-3xl font-normal text-[#1A1916] tracking-[-0.4px] mb-3">
							Drop an AI employee under every role
						</h3>
						<p className="text-[#5C584F] text-sm md:text-base leading-relaxed">
							Same chain of command, twice the throughput. Each AI employee gets its own
							dedicated Mac Mini in our data center — running 24/7, holding context,
							executing while your team sleeps.
						</p>
					</div>

					<div className="relative flex-1 min-h-[300px] md:min-h-[360px] flex items-center justify-center px-6 md:px-12 pb-10">
						<OrgChartVisual />
					</div>
				</GridCell>

				{/* Right — Hive snapshot */}
				<GridCell className="flex flex-col">
					<div className="px-6 md:px-12 pt-8 md:pt-12 pb-6">
						<div className="flex items-center gap-2 mb-3">
							<span className="h-1 w-1 rounded-full bg-[#C9A96E]" />
							<span className="text-[#5C584F] text-[11px] font-medium uppercase tracking-[0.18em]">
								Where they work
							</span>
						</div>
						<h3 className="text-2xl md:text-3xl font-normal text-[#1A1916] tracking-[-0.4px] mb-3">
							Hive — your operations layer
						</h3>
						<p className="text-[#5C584F] text-sm md:text-base leading-relaxed">
							Brief them like a teammate. Watch every action, decision, and output in
							real time. Pause, redirect, or escalate to a human at any step.
						</p>
					</div>

					<div className="relative flex-1 min-h-[300px] md:min-h-[360px] flex items-center justify-center px-6 md:px-12 pb-10">
						<HiveVisual />
					</div>
				</GridCell>
			</GridSection>
		</div>
	);
}

/* ─── Org Chart visual ──────────────────────────────────────────
   Slow reveal: human nodes appear first, then AI employee nodes
   populate beneath each one — visualizing "double the org overnight". */

const HUMAN_NODES = [
	{ id: "ceo", x: 50, y: 12, role: "CEO" },
	{ id: "ops", x: 18, y: 40, role: "Ops" },
	{ id: "growth", x: 50, y: 40, role: "Growth" },
	{ id: "delivery", x: 82, y: 40, role: "Delivery" },
];

const AI_NODES = [
	{ id: "ai-ops", x: 18, y: 72, parent: "ops" },
	{ id: "ai-growth", x: 50, y: 72, parent: "growth" },
	{ id: "ai-delivery", x: 82, y: 72, parent: "delivery" },
];

function OrgChartVisual() {
	const ref = useRef<HTMLDivElement>(null);
	const [stage, setStage] = useState<0 | 1 | 2>(0);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setTimeout(() => setStage(1), 250);
					setTimeout(() => setStage(2), 1400);
					observer.disconnect();
				}
			},
			{ threshold: 0.4 },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (stage !== 2) return;
		const id = setInterval(() => {
			setStage(0);
			setTimeout(() => setStage(1), 350);
			setTimeout(() => setStage(2), 1500);
		}, 6000);
		return () => clearInterval(id);
	}, [stage]);

	return (
		<div ref={ref} className="relative w-full max-w-[340px] aspect-[4/3]">
			<div
				className="absolute inset-0 rounded-full blur-3xl opacity-70"
				style={{
					background:
						"radial-gradient(circle at 50% 60%, rgba(201,169,110,0.18) 0%, transparent 65%)",
				}}
			/>

			<svg
				viewBox="0 0 100 75"
				className="absolute inset-0 w-full h-full"
				preserveAspectRatio="xMidYMid meet"
			>
				{HUMAN_NODES.slice(1).map((node) => (
					<line
						key={`c-${node.id}`}
						x1={50}
						y1={14}
						x2={node.x}
						y2={38}
						stroke="rgba(26,25,22,0.18)"
						strokeWidth={0.4}
						style={{
							opacity: stage >= 1 ? 1 : 0,
							transition: "opacity 0.6s ease",
						}}
					/>
				))}
				{AI_NODES.map((node, i) => {
					const parent = HUMAN_NODES.find((h) => h.id === node.parent)!;
					return (
						<line
							key={`ai-c-${node.id}`}
							x1={parent.x}
							y1={parent.y + 2}
							x2={node.x}
							y2={node.y}
							stroke="rgba(201,169,110,0.55)"
							strokeWidth={0.4}
							strokeDasharray="0.8 0.8"
							style={{
								opacity: stage >= 2 ? 1 : 0,
								transition: `opacity 0.5s ease ${i * 0.12}s`,
							}}
						/>
					);
				})}
			</svg>

			{HUMAN_NODES.map((node, i) => (
				<Node
					key={node.id}
					x={node.x}
					y={node.y}
					role={node.role}
					tone="human"
					visible={stage >= 1}
					delay={i * 120}
				/>
			))}

			{AI_NODES.map((node, i) => {
				const parent = HUMAN_NODES.find((h) => h.id === node.parent)!;
				return (
					<Node
						key={node.id}
						x={node.x}
						y={node.y}
						role={`AI ${parent.role}`}
						tone="ai"
						visible={stage >= 2}
						delay={i * 180}
					/>
				);
			})}

			<div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] whitespace-nowrap">
				<span className="flex items-center gap-1.5 text-[#5C584F]">
					<span className="h-1.5 w-1.5 rounded-full bg-[#1A1916]/40" />
					Human
				</span>
				<span className="flex items-center gap-1.5 text-[#5C584F]">
					<span className="h-1.5 w-1.5 rounded-full bg-[#C9A96E]" />
					AI
				</span>
			</div>
		</div>
	);
}

function Node({
	x,
	y,
	role,
	tone,
	visible,
	delay,
}: {
	x: number;
	y: number;
	role: string;
	tone: "human" | "ai";
	visible: boolean;
	delay: number;
}) {
	const isAI = tone === "ai";
	return (
		<div
			className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out"
			style={{
				left: `${x}%`,
				top: `${y}%`,
				opacity: visible ? 1 : 0,
				transform: `translate(-50%, ${visible ? "-50%" : "-30%"})`,
				transitionDelay: visible ? `${delay}ms` : "0ms",
			}}
		>
			<div className="flex flex-col items-center gap-1.5">
				<div
					className={`relative h-7 w-7 rounded-full border flex items-center justify-center ${
						isAI
							? "border-[#C9A96E]/55 bg-[#C9A96E]/12"
							: "border-[#1A1916]/15 bg-white"
					}`}
					style={{
						boxShadow: isAI
							? "0 4px 12px -4px rgba(201,169,110,0.35)"
							: "0 2px 6px -2px rgba(26,25,22,0.12)",
					}}
				>
					<span
						className={`h-1.5 w-1.5 rounded-full ${
							isAI ? "bg-[#C9A96E]" : "bg-[#1A1916]/55"
						}`}
					/>
					{isAI && (
						<span className="absolute inset-0 rounded-full border border-[#C9A96E]/40 animate-ping opacity-60" />
					)}
				</div>
				<span
					className={`text-[9px] uppercase tracking-[0.14em] whitespace-nowrap ${
						isAI ? "text-[#C9A96E]" : "text-[#5C584F]"
					}`}
				>
					{role}
				</span>
			</div>
		</div>
	);
}

/* ─── Hive snapshot visual ──────────────────────────────────── */

function HiveVisual() {
	return (
		<div className="relative w-full max-w-[360px]">
			<div
				className="relative rounded-xl border border-[#1A1916]/10 overflow-hidden bg-white"
				style={{
					boxShadow:
						"0 1px 0 rgba(26,25,22,0.04), 0 30px 60px -30px rgba(26,25,22,0.18)",
				}}
			>
				<div className="flex items-center gap-1.5 px-3 py-2 border-b border-[#1A1916]/8 bg-[#FAF8F4]">
					<span className="h-2 w-2 rounded-full bg-[#1A1916]/15" />
					<span className="h-2 w-2 rounded-full bg-[#1A1916]/15" />
					<span className="h-2 w-2 rounded-full bg-[#1A1916]/15" />
					<span className="ml-2 text-[10px] text-[#5C584F] tracking-wide">
						hive · #ai-growth
					</span>
					<span className="ml-auto flex items-center gap-1.5 text-[9px] uppercase tracking-[0.14em] text-[#5C584F]">
						<span className="relative flex h-1.5 w-1.5">
							<span className="absolute inline-flex h-full w-full rounded-full bg-[#C9A96E] opacity-75 animate-ping" />
							<span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#C9A96E]" />
						</span>
						Live
					</span>
				</div>

				<div className="p-3 space-y-2.5 text-left">
					<MessageRow
						name="You"
						text="Need you to research the top 25 prospects in the new ICP and draft personalized outreach for each."
					/>
					<MessageRow
						name="Atlas"
						accent
						text="On it. Pulling from Apollo + LinkedIn now. Drafts will land in the review queue in ~20 min."
					/>
					<MessageRow
						name="You"
						text="Run for the next 24 hours, then summarize results."
					/>

					<div className="mt-3 rounded-lg border border-[#1A1916]/10 bg-[#FAF8F4] p-2.5">
						<div className="flex items-center justify-between mb-2">
							<span className="text-[9px] uppercase tracking-[0.16em] text-[#5C584F]">
								Atlas · current task
							</span>
							<span className="text-[9px] tabular-nums text-[#C9A96E]">
								24h queued
							</span>
						</div>
						<div className="space-y-1">
							{[
								{ label: "Pulled 25 prospects", done: true },
								{ label: "Enriched with recent activity", done: true },
								{ label: "Drafting outreach (12 / 25)", done: false },
								{ label: "Send for review", done: false },
							].map((step) => (
								<div
									key={step.label}
									className="flex items-center gap-2 text-[10px]"
								>
									<span
										className={`h-1.5 w-1.5 rounded-full ${
											step.done ? "bg-[#C9A96E]" : "bg-[#1A1916]/15"
										}`}
									/>
									<span
										className={
											step.done
												? "text-[#1A1916] line-through opacity-55"
												: "text-[#1A1916]"
										}
									>
										{step.label}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function MessageRow({
	name,
	text,
	accent = false,
}: {
	name: string;
	text: string;
	accent?: boolean;
}) {
	return (
		<div className="flex items-start gap-2">
			<div
				className={`mt-0.5 h-5 w-5 shrink-0 rounded-full flex items-center justify-center text-[9px] font-medium ${
					accent
						? "bg-[#C9A96E]/15 text-[#C9A96E] border border-[#C9A96E]/30"
						: "bg-[#1A1916]/[0.04] text-[#5C584F] border border-[#1A1916]/10"
				}`}
			>
				{name.charAt(0)}
			</div>
			<div className="flex-1 min-w-0">
				<span
					className={`block text-[11px] font-medium mb-0.5 ${
						accent ? "text-[#C9A96E]" : "text-[#1A1916]"
					}`}
				>
					{name}
				</span>
				<p className="text-[11px] leading-relaxed text-[#5C584F]">{text}</p>
			</div>
		</div>
	);
}
