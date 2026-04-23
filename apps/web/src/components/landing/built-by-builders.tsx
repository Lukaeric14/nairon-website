import { useEffect, useRef, useState } from "react";
import { GridSection, GridCell, CornerNotches } from "./grid-system";

/* ─── Tool tiles — fill the wall ───────────────────── */
const tools: {
	name: string;
	description: string;
	col: string;
	row: string;
	mobileCol?: string;
	mobileRow?: string;
}[] = [
	// Desktop: Row 1–2
	{ name: "Outbound AI Employee", description: "Researches leads, personalises outreach, and keeps follow-up moving", col: "1 / 3", row: "1 / 3", mobileCol: "1 / 3", mobileRow: "1 / 2" },
	{ name: "Inbox AI Employee", description: "Monitors inbound requests and routes the right next step fast", col: "3 / 4", row: "1 / 2", mobileCol: "3 / 4", mobileRow: "1 / 2" },
	{ name: "Support AI Employee", description: "Handles first-response coverage and escalates edge cases cleanly", col: "4 / 5", row: "1 / 2", mobileCol: "1 / 2", mobileRow: "2 / 3" },
	{ name: "Knowledge AI Employee", description: "Maintains workflow context, memory, and operating history across the team", col: "5 / 7", row: "1 / 3", mobileCol: "2 / 4", mobileRow: "2 / 3" },
	// Desktop: Row 2
	{ name: "Scheduling AI Employee", description: "Books meetings, chases confirmations, and handles calendar coordination", col: "3 / 4", row: "2 / 3", mobileCol: "1 / 2", mobileRow: "3 / 4" },
	{ name: "Operator Alerts", description: "Sends approval requests, exceptions, and decision prompts into Slack", col: "4 / 5", row: "2 / 3", mobileCol: "2 / 3", mobileRow: "3 / 4" },
	// Desktop: Row 3–4
	{ name: "Research AI Employee", description: "Builds lists, enriches accounts, and prepares work before humans step in", col: "1 / 2", row: "3 / 4", mobileCol: "3 / 4", mobileRow: "3 / 4" },
	{ name: "Reporting AI Employee", description: "Turns activity into clean weekly summaries and KPI updates", col: "2 / 3", row: "3 / 4", mobileCol: "1 / 2", mobileRow: "4 / 5" },
	{ name: "QA AI Employee", description: "Checks output, catches misses, and flags risky actions before they ship", col: "3 / 5", row: "3 / 5", mobileCol: "2 / 4", mobileRow: "4 / 5" },
	{ name: "CRM AI Employee", description: "Keeps records updated, pipelines clean, and ownership visible", col: "5 / 7", row: "3 / 4", mobileCol: "1 / 2", mobileRow: "5 / 6" },
	// Desktop: Row 4
	{ name: "Coordination AI Employee", description: "Owns handoffs, reminders, and status-chasing across operations", col: "1 / 3", row: "4 / 5", mobileCol: "2 / 4", mobileRow: "5 / 6" },
	{ name: "Approvals Layer", description: "Human checkpoints for sensitive actions, exceptions, and final sign-off", col: "5 / 7", row: "4 / 5", mobileCol: "1 / 4", mobileRow: "6 / 7" },
];

const founders = [
	{
		name: "Luka Erić",
		title: "CEO",
		image: "/assets/framer/SSmGx1bjs3koY1aPdILAeuc.webp",
	},
	{
		name: "Obaid Ur-Rahmaan",
		title: "CTO / Head of Product",
		image: "/assets/framer/Xse9UYp1XHtcxoFdIq5x3WbveBc.webp",
	},
	{
		name: "Mahan Javaheri",
		title: "CMO",
		image: "/team/founder-2.png",
	},
	{
		name: "Filip Kocanovic",
		title: "COO",
		image: "/team/founder-1.jpeg",
	},
];

export function BuiltByBuilders() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const [visibleCount, setVisibleCount] = useState(0);
	const [showFounders, setShowFounders] = useState(false);
	const [showTitle, setShowTitle] = useState(false);

	useEffect(() => {
		const el = sectionRef.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					for (let i = 0; i < tools.length; i++) {
						setTimeout(() => setVisibleCount((c) => Math.max(c, i + 1)), i * 120);
					}
					const foundersDelay = tools.length * 120 + 200;
					setTimeout(() => setShowFounders(true), foundersDelay);
					setTimeout(() => setShowTitle(true), foundersDelay + 600);
					observer.disconnect();
				}
			},
			{ threshold: 0.3 },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<div ref={sectionRef}>
			{/* Mosaic wall + Founders + Title — all in one section */}
			<GridSection columns="1fr" border>
				<GridCell className="relative overflow-hidden">
					{/* ── Tool mosaic — 6-col desktop, 3-col mobile ── */}
					<div
						className="hidden md:grid gap-3 p-4"
						style={{
							gridTemplateColumns: "repeat(6, 1fr)",
							gridTemplateRows: "repeat(4, minmax(120px, 1fr))",
						}}
					>
						{tools.map((tool, i) => (
							<div
								key={tool.name}
								className={`relative bg-[#0C0C0C]/[0.03] border border-[#0C0C0C]/[0.06] p-5 flex flex-col justify-between transition-all duration-500 ease-out ${
									i < visibleCount
										? "opacity-100 scale-100"
										: "opacity-0 scale-95"
								}`}
								style={{
									gridColumn: tool.col,
									gridRow: tool.row,
								}}
							>
								<CornerNotches size={8} color="rgba(12, 12, 12, 0.08)" />
								<div>
									<span className="text-[#1A1916] text-sm font-medium leading-tight">
										{tool.name}
									</span>
									<p className="text-[#5C584F] text-xs mt-1.5 leading-relaxed">
										{tool.description}
									</p>
								</div>
								<div className="mt-auto pt-4">
									<div className="w-6 h-0.5 bg-[#C9A96E]/30 rounded-full" />
								</div>
							</div>
						))}
					</div>

					{/* Mobile grid — 3 columns */}
					<div
						className="md:hidden grid gap-2 p-3"
						style={{
							gridTemplateColumns: "repeat(3, 1fr)",
							gridTemplateRows: "repeat(6, minmax(80px, 1fr))",
						}}
					>
						{tools.map((tool, i) => (
							<div
								key={`mobile-${tool.name}`}
								className={`relative bg-[#0C0C0C]/[0.03] border border-[#0C0C0C]/[0.06] p-3 flex flex-col justify-between transition-all duration-500 ease-out ${
									i < visibleCount
										? "opacity-100 scale-100"
										: "opacity-0 scale-95"
								}`}
								style={{
									gridColumn: tool.mobileCol || "auto",
									gridRow: tool.mobileRow || "auto",
								}}
							>
								<CornerNotches size={6} color="rgba(12, 12, 12, 0.08)" />
								<div>
									<span className="text-[#1A1916] text-xs font-medium leading-tight">
										{tool.name}
									</span>
									<p className="text-[#5C584F] text-[10px] mt-1 leading-snug">
										{tool.description}
									</p>
								</div>
								<div className="mt-auto pt-2">
									<div className="w-4 h-0.5 bg-[#C9A96E]/30 rounded-full" />
								</div>
							</div>
						))}
					</div>

					{/* ── Founders + title — centered overlay ── */}
					<div
						className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
					>
						{/* Light overlay from underneath for contrast */}
						<div
							className="absolute inset-0"
							style={{
								background:
									"linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.75) 35%, rgba(255,255,255,0.35) 60%, transparent 100%)",
							}}
						/>

						{/* Radial vignette behind founders */}
						<div
							className="absolute inset-0"
							style={{
								background:
									"radial-gradient(ellipse 55% 60% at 50% 55%, rgba(255,255,255,0.85) 0%, transparent 100%)",
							}}
						/>

						{/* Founder cards */}
						<div
							className={`relative flex items-end gap-3 md:gap-6 transition-all duration-700 ease-out ${
								showFounders
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8"
							}`}
						>
							{founders.map((founder) => (
								<div
									key={founder.name}
									className="relative w-36 md:w-56 bg-[#F5F3EE]/90 border border-[#0C0C0C]/[0.08] overflow-hidden pointer-events-auto backdrop-blur-sm"
								>
									<CornerNotches size={10} color="rgba(201, 169, 110, 0.2)" />
									<div
										className="w-full h-44 md:h-72"
										style={{
											maskImage:
												"linear-gradient(to bottom, black 70%, transparent 100%)",
											WebkitMaskImage:
												"linear-gradient(to bottom, black 70%, transparent 100%)",
										}}
									>
										<img
											src={founder.image}
											alt={founder.name}
											className="w-full h-full object-cover object-top"
										/>
									</div>
									<div className="px-3 md:px-4 pb-4 md:pb-5 -mt-4 relative">
										<span className="block text-[#1A1916] text-sm md:text-base font-medium">
											{founder.name}
										</span>
										<span className="block text-[#C9A96E] text-[10px] md:text-xs font-medium tracking-wide mt-0.5">
											{founder.title}
										</span>
									</div>
								</div>
							))}
						</div>

						{/* Title — directly under cards */}
						<div
							className={`relative mt-4 md:mt-6 text-center px-4 md:px-6 transition-all duration-700 ease-out ${
								showTitle
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-4"
							}`}
						>
							<h2 className="text-xl md:text-[40px] md:leading-[48px] font-normal tracking-[-0.48px] text-[#1A1916]">
								Built by builders and the{" "}
								<span className="font-serif italic text-[#C9A96E] text-[1.1em]">systems they deploy</span>
							</h2>
						</div>
					</div>
				</GridCell>
			</GridSection>
		</div>
	);
}
