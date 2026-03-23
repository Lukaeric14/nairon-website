import { createFileRoute } from "@tanstack/react-router";
import { seoHead } from "@/lib/seo";
import { useCallback, useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/pitch-deck")({
	component: PitchDeckPage,
	head: () =>
		seoHead({
			title: "Pitch Deck — Nairon",
			description:
				"Nairon pitch deck. Data-driven technical recruiting agency specializing in AI-native engineering talent.",
			path: "/pitch-deck",
		}),
});

const TOTAL_SLIDES = 11;

function PitchDeckPage() {
	const [current, setCurrent] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const [scale, setScale] = useState(0.5);

	const goNext = useCallback(() => {
		setCurrent((s) => Math.min(s + 1, TOTAL_SLIDES - 1));
	}, []);

	const goPrev = useCallback(() => {
		setCurrent((s) => Math.max(s - 1, 0));
	}, []);

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
				e.preventDefault();
				goNext();
			} else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
				e.preventDefault();
				goPrev();
			}
		};
		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, [goNext, goPrev]);

	useEffect(() => {
		const updateScale = () => {
			setScale(
				Math.min(window.innerWidth / 1920, window.innerHeight / 1080),
			);
		};
		updateScale();
		window.addEventListener("resize", updateScale);
		return () => window.removeEventListener("resize", updateScale);
	}, []);

	return (
		<div
			ref={containerRef}
			className="h-screen w-screen bg-[#0C0C0C] overflow-hidden relative select-none"
		>
			<div className="h-full w-full flex items-center justify-center">
				<div
					className="origin-center"
					style={{ width: 1920, height: 1080, transform: `scale(${scale})` }}
				>
					<SlideContent index={current} />
				</div>
			</div>

			{/* Nav */}
			<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
				<button
					type="button"
					onClick={goPrev}
					disabled={current === 0}
					className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.06] text-[#A39E96] flex items-center justify-center disabled:opacity-20 hover:bg-white/[0.06] transition-colors cursor-pointer"
				>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><title>Previous</title><path d="M15 18l-6-6 6-6" /></svg>
				</button>
				<span className="text-[#5a5a5a] text-sm font-medium tabular-nums font-[Inter,sans-serif]">
					{current + 1} / {TOTAL_SLIDES}
				</span>
				<button
					type="button"
					onClick={goNext}
					disabled={current === TOTAL_SLIDES - 1}
					className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.06] text-[#A39E96] flex items-center justify-center disabled:opacity-20 hover:bg-white/[0.06] transition-colors cursor-pointer"
				>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><title>Next</title><path d="M9 18l6-6-6-6" /></svg>
				</button>
				<a
					href="/nairon-pitch-deck.pdf"
					download
					className="ml-4 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-[#A39E96] text-sm hover:bg-white/[0.06] transition-colors"
				>
					Download PDF
				</a>
			</div>

			{/* Progress */}
			<div
				className="absolute top-0 left-0 h-[2px] bg-[#C9A96E] transition-all duration-300"
				style={{ width: `${((current + 1) / TOTAL_SLIDES) * 100}%` }}
			/>
		</div>
	);
}

/* ── Design primitives ── */

function Cross({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
	const posMap = {
		tl: "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
		tr: "top-0 right-0 translate-x-1/2 -translate-y-1/2",
		bl: "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
		br: "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
	};
	return (
		<div className={`absolute ${posMap[position]} w-[21px] h-[21px] z-10`}>
			<div className="absolute top-1/2 left-0 w-full border-b border-white/20" />
			<div className="absolute left-1/2 top-0 h-full border-r border-white/20" />
		</div>
	);
}

function CornerNotches({ className = "" }: { className?: string }) {
	const notch = "absolute w-[10px] h-[10px]";
	return (
		<>
			<div className={`${notch} top-0 left-0 border-t border-l border-white/[0.12] ${className}`} />
			<div className={`${notch} top-0 right-0 border-t border-r border-white/[0.12] ${className}`} />
			<div className={`${notch} bottom-0 left-0 border-b border-l border-white/[0.12] ${className}`} />
			<div className={`${notch} bottom-0 right-0 border-b border-r border-white/[0.12] ${className}`} />
		</>
	);
}

function SectionLabel({ text }: { text: string }) {
	return (
		<div className="flex items-center gap-3 mb-6">
			<div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
			<span className="text-[#A39E96] text-[12px] font-medium uppercase tracking-[0.16em]">
				{text}
			</span>
		</div>
	);
}

function GridDivider({ orientation = "v" }: { orientation?: "v" | "h" }) {
	if (orientation === "h") {
		return <div className="w-full border-b border-white/[0.06]" />;
	}
	return <div className="h-full border-r border-white/[0.06]" />;
}

/* Notched grid — adds corner notches at every cell intersection */
function NotchedGrid({
	cols,
	children,
	className = "",
}: { cols: number; children: React.ReactNode; className?: string }) {
	return (
		<div className={`relative border border-white/[0.06] ${className}`}>
			<CornerNotches />
			<div className={`grid`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
				{children}
			</div>
		</div>
	);
}

function NotchedCell({
	children,
	className = "",
	borderRight = false,
	borderBottom = false,
}: {
	children: React.ReactNode;
	className?: string;
	borderRight?: boolean;
	borderBottom?: boolean;
}) {
	return (
		<div
			className={`relative ${borderRight ? "border-r border-white/[0.06]" : ""} ${borderBottom ? "border-b border-white/[0.06]" : ""} ${className}`}
		>
			{/* Notch at bottom-right intersection */}
			{borderRight && borderBottom && (
				<>
					<div className="absolute w-[10px] h-[10px] bottom-0 right-0 border-b border-r border-white/[0.12] translate-x-1/2 translate-y-1/2 z-10" />
				</>
			)}
			{borderRight && !borderBottom && (
				<div className="absolute w-[10px] h-[10px] bottom-[-1px] right-0 border-b border-r border-white/[0.12] translate-x-1/2 translate-y-1/2 z-10" />
			)}
			{children}
		</div>
	);
}

function SlideFrame({ children, num }: { children: React.ReactNode; num?: string }) {
	return (
		<div className="w-[1920px] h-[1080px] bg-[#0C0C0C] text-[#E8E4DE] relative overflow-hidden font-[Inter,sans-serif]">
			{/* Corner crosses */}
			<Cross position="tl" />
			<Cross position="tr" />
			{/* Top/bottom guide lines */}
			<div className="absolute top-[60px] left-0 w-full border-b border-white/[0.06]" />
			<div className="absolute bottom-[60px] left-0 w-full border-t border-white/[0.06]" />
			{children}
			{num && (
				<span className="absolute bottom-[20px] left-[100px] text-[13px] text-white/[0.15] font-medium tracking-[0.16em] uppercase">
					{num} / 11
				</span>
			)}
			<span className="absolute bottom-[20px] right-[100px] font-[Urbanist,sans-serif] font-normal text-[14px] text-white/[0.12] tracking-[0.22em] uppercase">
				Nairon
			</span>
		</div>
	);
}

/* ── Slides ── */

function SlideContent({ index }: { index: number }) {
	const slides = [
		/* ── 1. Business Overview ── */
		<SlideFrame key="1">
			<div className="w-full h-full flex flex-col items-center justify-center text-center px-[200px]">
				<h1 className="font-[Urbanist,sans-serif] text-[120px] font-normal tracking-[-3px] leading-[1.05] text-[#E8E4DE]">
					<span className="font-[Instrument_Serif,serif] italic text-[#C9A96E]">Nairon</span>
				</h1>
				<p className="font-[Urbanist,sans-serif] text-[48px] font-normal tracking-[-0.48px] mt-6 text-[#E8E4DE] leading-[1.2]">
					Find AI-native engineers{" "}
					<span className="font-[Instrument_Serif,serif] italic text-[#C9A96E]">who ship</span>
				</p>
				<p className="text-[22px] mt-10 text-[#A39E96] max-w-[800px] leading-[1.7]">
					Nairon is a data-driven technical recruiting agency. We use proprietary benchmarks to match companies with AI-native engineers who build.
				</p>
				<div className="flex items-center gap-6 mt-14">
					<div className="bg-[#C9A96E] text-[#0C0C0C] px-8 py-3 rounded-full text-[16px] font-medium">
						Hire engineers
					</div>
					<div className="border border-white/[0.15] text-[#E8E4DE] px-8 py-3 rounded-full text-[16px] font-medium">
						I'm a candidate
					</div>
				</div>
				<p className="text-[14px] text-white/[0.2] mt-16 tracking-[0.16em] uppercase">
					Dubai, UAE &middot; naironai.com
				</p>
			</div>
		</SlideFrame>,

		/* ── 2. Executive Summary ── */
		<SlideFrame key="2" num="02">
			<div className="w-full h-full flex flex-col justify-center px-[120px] py-[100px]">
				<SectionLabel text="Executive Summary" />
				<h2 className="font-[Urbanist,sans-serif] text-[56px] font-normal tracking-[-0.48px] leading-[1.15] text-[#E8E4DE] mb-6">
					Bridging the{" "}
					<span className="font-[Instrument_Serif,serif] italic text-[#C9A96E]">AI-native</span>{" "}
					talent gap
				</h2>
				<p className="text-[22px] text-[#A39E96] max-w-[1100px] mb-16 leading-[1.7]">
					Nairon is a data-driven technical recruiting agency that uses proprietary benchmarks to match companies with AI-native engineers — developers who don't just use AI tools, but build systems where AI is a first-class citizen.
				</p>
				{/* Stats grid with dividers */}
				<NotchedGrid cols={4}>
					{[
						{ value: "100+", label: "Engineers assessed" },
						{ value: "Flux", label: "AI workflow tool" },
						{ value: "UAE", label: "HQ — Global reach" },
						{ value: "2026", label: "Founded" },
					].map((stat, i) => (
						<NotchedCell key={stat.label} borderRight={i < 3}>
							<div className="text-center py-10 px-8">
								<div className="font-[Urbanist,sans-serif] text-[42px] font-normal tracking-[-1px] text-[#C9A96E] tabular-nums mb-3">
									{stat.value}
								</div>
								<p className="text-[#A39E96] text-[13px] leading-snug">{stat.label}</p>
							</div>
						</NotchedCell>
					))}
				</NotchedGrid>
			</div>
		</SlideFrame>,

		/* ── 3. Product/Service Description ── */
		<SlideFrame key="3" num="03">
			<div className="w-full h-full flex flex-col justify-center px-[120px] py-[100px]">
				<SectionLabel text="Product & Services" />
				<h2 className="font-[Urbanist,sans-serif] text-[56px] font-normal tracking-[-0.48px] leading-[1.15] text-[#E8E4DE] mb-12">
					What we{" "}
					<span className="font-[Instrument_Serif,serif] italic text-[#C9A96E]">offer</span>
				</h2>
				<div className="grid grid-cols-2 gap-6">
					{[
						{
							title: "Technical Recruiting",
							desc: "End-to-end hiring pipeline for AI-native engineers. From sourcing to placement, powered by data — not gut feel.",
						},
						{
							title: "Technical Assessments",
							desc: "Measuring agent-first thinking, eval discipline, and token efficiency — the signals that matter.",
						},
						{
							title: "Flux — AI Workflow Tool",
							desc: "Open-source structured scoping, execution, and review plugin for AI-augmented development. 30+ curated tools.",
						},
						{
							title: "Programs",
							desc: "Residence & Apprenticeship programs that train and certify engineers in AI-native development practices.",
						},
					].map((item) => (
						<div key={item.title} className="relative border border-white/[0.06] rounded-[16px] p-10">
							<CornerNotches />
							<h3 className="font-[Urbanist,sans-serif] text-[28px] font-normal tracking-[-0.48px] text-[#E8E4DE] mb-4">
								{item.title}
							</h3>
							<p className="text-[18px] text-[#A39E96] leading-[1.7]">{item.desc}</p>
						</div>
					))}
				</div>
			</div>
		</SlideFrame>,

		/* ── 4. Value Proposition ── */
		<SlideFrame key="4" num="04">
			<div className="w-full h-full flex flex-col justify-center px-[120px] py-[100px]">
				<SectionLabel text="Value Proposition" />
				<h2 className="font-[Urbanist,sans-serif] text-[56px] font-normal tracking-[-0.48px] leading-[1.15] text-[#E8E4DE] mb-6">
					Why{" "}
					<span className="font-[Instrument_Serif,serif] italic text-[#C9A96E]">Nairon</span>
				</h2>
				<p className="text-[20px] text-[#A39E96] max-w-[900px] mb-12 leading-[1.7]">
					Traditional recruiting relies on resumes and interviews. We measure what actually predicts performance in the AI era.
				</p>
				<NotchedGrid cols={3}>
					{[
						{
							title: "Agent-first thinking",
							desc: "They design systems where agents are first-class citizens. The codebase, the CI pipeline, the review process.",
						},
						{
							title: "Eval discipline",
							desc: "They treat AI output like an untrusted junior's PR. They catch hallucinations systematically.",
						},
						{
							title: "Token efficiency",
							desc: "They think about context windows, model selection, and cost-per-output like senior engineers think about queries.",
						},
					].map((item, i) => (
						<NotchedCell
							key={item.title}
							borderRight={i < 2}
							borderBottom={true}
						>
							<div className="p-10">
								<h3 className="font-[Urbanist,sans-serif] text-[26px] font-normal tracking-[-0.48px] text-[#E8E4DE] mb-4">
									{item.title}
								</h3>
								<p className="text-[17px] text-[#A39E96] leading-[1.7]">{item.desc}</p>
							</div>
						</NotchedCell>
					))}
					{[
						{ value: "Data-backed", label: "Every engineer comes with benchmark scores" },
						{ value: "Faster hiring", label: "Pre-vetted talent pool, no guesswork" },
						{ value: "Quality signal", label: "Real builders, real metrics, real outcomes" },
					].map((item, i) => (
						<NotchedCell
							key={item.value}
							borderRight={i < 2}
						>
							<div className="py-8 px-10">
								<div className="font-[Urbanist,sans-serif] text-[22px] font-normal text-[#C9A96E] mb-2">
									{item.value}
								</div>
								<p className="text-[15px] text-[#A39E96] leading-[1.5]">{item.label}</p>
							</div>
						</NotchedCell>
					))}
				</NotchedGrid>
			</div>
		</SlideFrame>,

		/* ── 5. Marketing Strategies ── */
		<SlideFrame key="5" num="05">
			<div className="w-full h-full flex flex-col justify-center px-[120px] py-[100px]">
				<SectionLabel text="Marketing Strategy" />
				<h2 className="font-[Urbanist,sans-serif] text-[56px] font-normal tracking-[-0.48px] leading-[1.15] text-[#E8E4DE] mb-12">
					Go-to-market{" "}
					<span className="font-[Instrument_Serif,serif] italic text-[#C9A96E]">approach</span>
				</h2>
				<NotchedGrid cols={4}>
					{[
						{
							step: "01",
							title: "Community-led growth",
							desc: "Slack community, open-source Flux tool, and Universe platform to attract engineers organically",
						},
						{
							step: "02",
							title: "Content & thought leadership",
							desc: "Blog, podcast, events, and benchmark publications establishing authority on AI-native talent",
						},
						{
							step: "03",
							title: "Product-led acquisition",
							desc: "Flux as a free developer tool drives adoption. Users become candidates in the talent network",
						},
						{
							step: "04",
							title: "Enterprise outreach",
							desc: "Targeted outreach to CTOs and engineering leaders at companies building AI-native teams",
						},
					].map((item, i) => (
						<NotchedCell key={item.step} borderRight={i < 3}>
							<div className="p-8">
								<div className="font-[Urbanist,sans-serif] text-[42px] font-normal tracking-[-1px] text-[#C9A96E] mb-5 tabular-nums">
									{item.step}
								</div>
								<h3 className="font-[Urbanist,sans-serif] text-[22px] font-normal tracking-[-0.48px] text-[#E8E4DE] mb-3">
									{item.title}
								</h3>
								<p className="text-[16px] text-[#A39E96] leading-[1.6]">{item.desc}</p>
							</div>
						</NotchedCell>
					))}
				</NotchedGrid>
			</div>
		</SlideFrame>,

		/* ── 6. Financial Projections ── */
		<SlideFrame key="6" num="06">
			<div className="w-full h-full flex flex-col justify-center px-[120px] py-[100px]">
				<div className="grid grid-cols-[1fr_1px_1fr] gap-0">
					{/* Left: Revenue model */}
					<div className="pr-16">
						<SectionLabel text="Financial Projections" />
						<h2 className="font-[Urbanist,sans-serif] text-[48px] font-normal tracking-[-0.48px] leading-[1.15] text-[#E8E4DE] mb-4">
							Revenue{" "}
							<span className="font-[Instrument_Serif,serif] italic text-[#C9A96E]">model</span>
						</h2>
						<p className="text-[18px] text-[#A39E96] leading-[1.7] mb-12">
							Multiple revenue streams built around data-driven recruiting and AI-native assessment.
						</p>
						<div className="space-y-8">
							{[
								{ title: "Placement fees", desc: "Success-based fees for permanent and contract AI-native engineer placements" },
								{ title: "Assessment services", desc: "Enterprise licensing of assessments for internal team evaluation" },
								{ title: "Programs & training", desc: "Residence and apprenticeship program enrollment fees" },
							].map((item) => (
								<div key={item.title} className="border-l-[2px] border-[#C9A96E]/30 pl-6">
									<h3 className="font-[Urbanist,sans-serif] text-[22px] font-normal text-[#E8E4DE] mb-2">
										{item.title}
									</h3>
									<p className="text-[16px] text-[#A39E96] leading-[1.6]">{item.desc}</p>
								</div>
							))}
						</div>
					</div>
					{/* Divider */}
					<GridDivider />
					{/* Right: Growth targets */}
					<div className="pl-16">
						<SectionLabel text="Growth Targets" />
						<div className="space-y-0">
							{[
								{ year: "Year 1", desc: "Establish talent pipeline, 50+ engineer placements, Flux adoption among 1,000+ developers" },
								{ year: "Year 2", desc: "Scale placement volume, enterprise assessment contracts, regional expansion" },
								{ year: "Year 3", desc: "Platform monetization, international presence, 500+ annual placements" },
							].map((item, i) => (
								<div
									key={item.year}
									className={`py-10 ${i < 2 ? "border-b border-white/[0.06]" : ""}`}
								>
									<div className="font-[Urbanist,sans-serif] text-[42px] font-normal tracking-[-1px] text-[#C9A96E] tabular-nums mb-3">
										{item.year}
									</div>
									<p className="text-[18px] text-[#A39E96] leading-[1.7]">{item.desc}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</SlideFrame>,

		/* ── 7. Human Resources ── */
		<SlideFrame key="7" num="07">
			<div className="w-full h-full flex flex-col justify-center px-[120px] py-[100px]">
				<SectionLabel text="Human Resources" />
				<h2 className="font-[Urbanist,sans-serif] text-[56px] font-normal tracking-[-0.48px] leading-[1.15] text-[#E8E4DE] mb-12">
					Building the{" "}
					<span className="font-[Instrument_Serif,serif] italic text-[#C9A96E]">team</span>
				</h2>
				<div className="grid grid-cols-[1fr_1px_1fr] gap-0">
					<div className="pr-16">
						<div className="flex items-center gap-3 mb-8">
							<div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
							<span className="text-[#C9A96E] text-[13px] font-medium uppercase tracking-[0.16em]">
								Current team
							</span>
						</div>
						<div className="space-y-6">
							{[
								["3 founding members", "CEO, CTO, and Founding AI Engineer"],
								["AI-native operations", "Lean team amplified by AI tooling and automation"],
								["Full-stack capability", "Product, engineering, business development covered in-house"],
							].map(([title, desc]) => (
								<div key={title} className="border-l-[2px] border-white/[0.06] pl-6">
									<p className="text-[20px] text-[#E8E4DE] font-normal mb-1">{title}</p>
									<p className="text-[16px] text-[#A39E96] leading-[1.6]">{desc}</p>
								</div>
							))}
						</div>
					</div>
					<GridDivider />
					<div className="pl-16">
						<div className="flex items-center gap-3 mb-8">
							<div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
							<span className="text-[#C9A96E] text-[13px] font-medium uppercase tracking-[0.16em]">
								Hiring plan
							</span>
						</div>
						<div className="space-y-0">
							{[
								["Q2 2026", "Talent acquisition specialist, community manager"],
								["Q3 2026", "Senior recruiter, marketing lead"],
								["Q4 2026", "Enterprise sales, additional engineers"],
								["2027", "Scale to 12–15 team members across functions"],
							].map(([period, desc], i) => (
								<div
									key={period}
									className={`py-6 ${i < 3 ? "border-b border-white/[0.06]" : ""}`}
								>
									<span className="font-[Urbanist,sans-serif] text-[22px] font-normal text-[#C9A96E] tabular-nums">
										{period}
									</span>
									<p className="text-[17px] text-[#A39E96] leading-[1.6] mt-1">{desc}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</SlideFrame>,

		/* ── 8. Management Team ── */
		<SlideFrame key="8" num="08">
			<div className="w-full h-full flex flex-col justify-center px-[120px] py-[100px]">
				<SectionLabel text="Management Team" />
				<h2 className="font-[Urbanist,sans-serif] text-[56px] font-normal tracking-[-0.48px] leading-[1.15] text-[#E8E4DE] mb-14">
					Built by{" "}
					<span className="font-[Instrument_Serif,serif] italic text-[#C9A96E]">builders</span>
				</h2>
				<NotchedGrid cols={1}>
					<NotchedCell>
						<div className="p-12">
							<div className="w-[56px] h-[56px] rounded-full bg-gradient-to-br from-[#C9A96E] to-[#A67A0D] mb-8 flex items-center justify-center font-[Urbanist,sans-serif] text-[20px] font-medium text-[#0C0C0C]">
								OR
							</div>
							<div className="font-[Urbanist,sans-serif] text-[28px] font-normal tracking-[-0.48px] text-[#E8E4DE] mb-2">
								Obaid Ur-Rahmaan
							</div>
							<div className="text-[15px] text-[#C9A96E] mb-6 tracking-[0.04em]">
								CEO
							</div>
							<p className="text-[17px] text-[#A39E96] leading-[1.6]">Technical leadership across the full stack. Architecting Flux and the Nairon platform.</p>
						</div>
					</NotchedCell>
				</NotchedGrid>
			</div>
		</SlideFrame>,

		/* ── 9. Expectations from in5 ── */
		<SlideFrame key="9" num="09">
			<div className="w-full h-full flex flex-col justify-center px-[120px] py-[100px]">
				<SectionLabel text="Expectations from in5" />
				<h2 className="font-[Urbanist,sans-serif] text-[56px] font-normal tracking-[-0.48px] leading-[1.15] text-[#E8E4DE] mb-12">
					How in5 accelerates{" "}
					<span className="font-[Instrument_Serif,serif] italic text-[#C9A96E]">Nairon</span>
				</h2>
				<NotchedGrid cols={2}>
					{[
						{
							num: "01",
							title: "Workspace & infrastructure",
							desc: "Dedicated workspace to build, collaborate, and host client meetings in Dubai's innovation ecosystem",
						},
						{
							num: "02",
							title: "Network & partnerships",
							desc: "Access to in5's corporate network, mentors, and potential enterprise clients seeking AI talent",
						},
						{
							num: "03",
							title: "Licensing & legal",
							desc: "Business licensing support to operate as a recruiting agency in the UAE market",
						},
						{
							num: "04",
							title: "Visibility & credibility",
							desc: "Association with TECOM and in5 strengthens trust with enterprise clients and international talent",
						},
					].map((item, i) => (
						<NotchedCell
							key={item.num}
							borderRight={i % 2 === 0}
							borderBottom={i < 2}
						>
							<div className="p-10">
								<span className="font-[Urbanist,sans-serif] text-[36px] font-normal tracking-[-1px] text-[#C9A96E] tabular-nums">
									{item.num}
								</span>
								<h3 className="font-[Urbanist,sans-serif] text-[24px] font-normal tracking-[-0.48px] text-[#E8E4DE] mt-4 mb-3">
									{item.title}
								</h3>
								<p className="text-[17px] text-[#A39E96] leading-[1.6]">{item.desc}</p>
							</div>
						</NotchedCell>
					))}
				</NotchedGrid>
			</div>
		</SlideFrame>,

		/* ── 10. Additional Details ── */
		<SlideFrame key="10" num="10">
			<div className="w-full h-full flex flex-col justify-center px-[120px] py-[100px]">
				<div className="grid grid-cols-[1fr_1px_1fr] gap-0 mb-14">
					<div className="pr-16">
						<SectionLabel text="The Ecosystem" />
						<h2 className="font-[Urbanist,sans-serif] text-[48px] font-normal tracking-[-0.48px] leading-[1.15] text-[#E8E4DE]">
							Backed by{" "}
							<span className="font-[Instrument_Serif,serif] italic text-[#C9A96E]">Flux</span>{" "}
							data
						</h2>
					</div>
					<GridDivider />
					<div className="pl-16 flex items-center">
						<p className="text-[18px] text-[#A39E96] leading-[1.7]">
							Our proprietary AI-nativeness benchmark scores every candidate on architecture, eval discipline, token spend, and tooling freshness.
						</p>
					</div>
				</div>
				{/* Stats + ecosystem grid */}
				<NotchedGrid cols={4}>
					{[
						{ value: "2,000+", label: "Engineers in our network" },
						{ value: "94%", label: "Placement success rate" },
						{ value: "30", label: "Average days to placement" },
						{ value: "4.8", label: "Average Flux score" },
					].map((stat, i) => (
						<NotchedCell key={stat.label} borderRight={i < 3} borderBottom={true}>
							<div className="text-center py-12 px-8">
								<div className="font-[Urbanist,sans-serif] text-[42px] font-normal tracking-[-1px] text-[#C9A96E] tabular-nums mb-3">
									{stat.value}
								</div>
								<p className="text-[#A39E96] text-[14px] leading-snug">{stat.label}</p>
							</div>
						</NotchedCell>
					))}
					{[
						{ title: "Flux", desc: "Open-source AI workflow plugin. 30+ tools, 5 scoring dimensions." },
						{ title: "Universe", desc: "Engineer profiles, benchmark scores, and matching platform." },
						{ title: "Assessments", desc: "Technical evaluation for AI-native capabilities." },
						{ title: "Community", desc: "Active Slack, blog, podcast, and events network." },
					].map((item, i) => (
						<NotchedCell key={item.title} borderRight={i < 3}>
							<div className="p-8">
								<h3 className="font-[Urbanist,sans-serif] text-[20px] font-normal text-[#E8E4DE] mb-2">
									{item.title}
								</h3>
								<p className="text-[15px] text-[#A39E96] leading-[1.5]">{item.desc}</p>
							</div>
						</NotchedCell>
					))}
				</NotchedGrid>
			</div>
		</SlideFrame>,

		/* ── 11. Contact Details ── */
		<SlideFrame key="11">
			<div className="w-full h-full flex flex-col items-center justify-center text-center px-[200px]">
				<h1 className="font-[Urbanist,sans-serif] text-[72px] font-normal tracking-[-0.48px] leading-[1.15] text-[#E8E4DE] mb-2">
					Let's{" "}
					<span className="font-[Instrument_Serif,serif] italic text-[#C9A96E]">connect</span>
				</h1>
				<div className="w-[60px] h-[2px] bg-[#C9A96E]/40 mt-8 mb-12 mx-auto" />
				<NotchedGrid cols={3} className="w-full max-w-[1200px] mb-12">
					{[
						{ label: "Email", value: "info@naironai.com" },
						{ label: "Phone", value: "+971 58 588 9750" },
						{ label: "Web", value: "naironai.com" },
					].map((item, i) => (
						<NotchedCell key={item.label} borderRight={i < 2}>
							<div className="py-10 px-8 text-center">
								<p className="text-[#A39E96] text-[12px] uppercase tracking-[0.16em] mb-3">{item.label}</p>
								<p className="text-[24px] text-[#E8E4DE] font-normal">{item.value}</p>
							</div>
						</NotchedCell>
					))}
				</NotchedGrid>
				<div className="flex gap-12 justify-center">
					{[
						["LinkedIn", "/company/nairon-ai", "https://www.linkedin.com/company/nairon-ai/"],
						["X", "@nairon__ai", "https://x.com/nairon__ai"],
						["GitHub", "Nairon-AI", "https://github.com/Nairon-AI/"],
					].map(([platform, handle, url]) => (
						<a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="text-center group">
							<p className="text-[#A39E96] text-[12px] uppercase tracking-[0.16em] mb-2">
								{platform}
							</p>
							<p className="text-[18px] text-[#E8E4DE]/60 group-hover:text-[#E8E4DE] transition-colors">{handle}</p>
						</a>
					))}
				</div>
				<p className="text-[13px] text-white/[0.15] mt-16 tracking-[0.16em] uppercase">
					Dubai, UAE
				</p>
			</div>
		</SlideFrame>,
	];

	return slides[index];
}
