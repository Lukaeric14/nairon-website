import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { DISCOVERY_CALL_URL } from "@/lib/links";
import {
	Navbar,
	LogoStrip,
	Footer,
	GridSystem,
	GridSection,
} from "@/components/landing";
import { ModalProvider } from "@/components/landing/modal-provider";
import { HireModal } from "@/components/landing/hire-modal";
import { CandidateModal } from "@/components/landing/candidate-modal";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/for/real-estate")({
	component: RealEstatePage,
	head: () =>
		seoHead({
			title: "Nairon — AI Infrastructure for Real Estate Brokerages",
			description:
				"We power real estate brokerages with custom AI infrastructure. Book a discovery call to learn more.",
			path: "/for/real-estate",
		}),
});

function DiscoveryCTA() {
	return (
		<a
			href={DISCOVERY_CALL_URL}
			target="_blank"
			rel="noopener noreferrer"
			className="inline-flex items-center gap-2 bg-[#C9A96E] hover:bg-[#B8944F] text-[#0C0C0C] font-semibold text-base px-6 py-3 rounded-full transition-colors"
		>
			Book your discovery
			<ArrowUpRight className="w-4 h-4" />
		</a>
	);
}

/* ── Hero ─────────────────────────────────────────────────────── */
function HeroSection() {
	return (
		<div className="relative flex flex-col justify-center items-center text-center px-4 md:px-6 py-24 md:py-40">
			<h1
				className="font-normal tracking-[-2px] md:tracking-[-3px] text-[#1A1916] w-full whitespace-nowrap"
				style={{ fontSize: "clamp(24px, 5.2vw, 62px)", lineHeight: 1.2 }}
			>
				<span className="block">We Power Real Estate Brokerages</span>
				<span className="block font-serif italic text-[#C9A96E]">
					With Custom AI Infrastructure
				</span>
			</h1>

			<div className="mt-10">
				<DiscoveryCTA />
			</div>
		</div>
	);
}

/* ── Section 2 — Custom Solutions ─────────────────────────────── */
function CustomSolutions() {
	return (
		<div className="px-6 md:px-12 py-16 md:py-24">
			<h2 className="text-[28px] leading-[34px] md:text-[48px] md:leading-[54px] font-normal tracking-[-1px] md:tracking-[-1.5px] text-[#1A1916] max-w-3xl">
				Every Brokerage Is Different.{" "}
				<span className="font-serif italic text-[#C9A96E] whitespace-nowrap">
					We Build Custom Solutions to Match
				</span>
			</h2>
			<p className="mt-6 text-lg md:text-xl text-[#5C584F] max-w-3xl leading-relaxed">
				Nairon works with Real Estate Brokerages to design and build custom AI
				Infrastructure across all aspects of their operations.
			</p>

			{/* Venn diagram */}
			<div className="mt-12 md:mt-16 flex justify-center">
				<svg
					viewBox="0 0 520 360"
					className="w-full max-w-md md:max-w-lg"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					role="img"
					aria-label="Venn diagram showing the intersection of Your Business and AI & Tech as AI Infrastructure"
				>
					<defs>
						{/* Clip intersection area */}
						<clipPath id="venn-left-clip">
							<circle cx="190" cy="180" r="135" />
						</clipPath>
						{/* Radial glow for intersection */}
						<radialGradient id="venn-glow" cx="50%" cy="50%" r="50%">
							<stop offset="0%" stopColor="#C9A96E" stopOpacity="0.4" />
							<stop offset="70%" stopColor="#C9A96E" stopOpacity="0.15" />
							<stop offset="100%" stopColor="#C9A96E" stopOpacity="0.05" />
						</radialGradient>
						{/* Subtle outer glow */}
						<filter id="venn-outer-glow">
							<feGaussianBlur in="SourceGraphic" stdDeviation="8" />
						</filter>
					</defs>

					{/* Soft ambient glow behind intersection */}
					<circle cx="260" cy="180" r="80" fill="#C9A96E" opacity="0.06" filter="url(#venn-outer-glow)" />

					{/* Gold intersection fill */}
					<circle
						cx="330"
						cy="180"
						r="135"
						fill="url(#venn-glow)"
						clipPath="url(#venn-left-clip)"
					/>

					{/* Circle strokes */}
					<circle cx="190" cy="180" r="135" stroke="#A39E96" strokeWidth="1" fill="none" opacity="0.5" />
					<circle cx="330" cy="180" r="135" stroke="#A39E96" strokeWidth="1" fill="none" opacity="0.5" />

					{/* Intersection border highlight */}
					<circle cx="330" cy="180" r="135" stroke="#C9A96E" strokeWidth="0.5" fill="none" opacity="0.3" clipPath="url(#venn-left-clip)" />

					{/* Left label — "Your" + "Business" stacked */}
					<text x="128" y="174" textAnchor="middle" fill="#E8E4DE" fontSize="15" fontWeight="500" fontFamily="inherit">Your</text>
					<text x="128" y="194" textAnchor="middle" fill="#E8E4DE" fontSize="15" fontWeight="500" fontFamily="inherit">Business</text>

					{/* Center label — "AI" + "Infrastructure" stacked */}
					<text x="260" y="170" textAnchor="middle" fill="#C9A96E" fontSize="13" fontWeight="600" fontFamily="inherit" letterSpacing="0.05em">AI</text>
					<text x="260" y="190" textAnchor="middle" fill="#C9A96E" fontSize="13" fontWeight="600" fontFamily="inherit" letterSpacing="0.05em">Infrastructure</text>

					{/* Right label — "AI &" + "Tech" stacked */}
					<text x="392" y="174" textAnchor="middle" fill="#E8E4DE" fontSize="15" fontWeight="500" fontFamily="inherit">AI &amp;</text>
					<text x="392" y="194" textAnchor="middle" fill="#E8E4DE" fontSize="15" fontWeight="500" fontFamily="inherit">Tech</text>
				</svg>
			</div>
		</div>
	);
}

/* ── Section 3 — What We Do ───────────────────────────────────── */
const SERVICES = [
	{
		num: "1",
		label: "Build",
		description:
			"We identify the highest-impact AI use cases in your business, and build customized AI-powered automations from our agency.",
	},
	{
		num: "2",
		label: "Optimize",
		description:
			"This is not a one-time project. We continuously update & optimize your systems on new capabilities.",
	},
	{
		num: "3",
		label: "Consult",
		description:
			"We act as your ongoing AI business advisors — identifying new opportunities, setting actionable KPIs, and making sure every system we build serves the needs.",
	},
] as const;

function WhatWeDo() {
	return (
		<div className="px-6 md:px-12 py-16 md:py-24">
			<h2 className="text-[28px] leading-[34px] md:text-[48px] md:leading-[54px] font-normal tracking-[-1px] md:tracking-[-1.5px] text-[#1A1916] max-w-3xl">
				What We Do For{" "}
				<span className="font-serif italic text-[#C9A96E]">
					Real Estate Brokerages
				</span>
			</h2>

			<div className="mt-12 grid gap-10 md:gap-12">
				{SERVICES.map((s) => (
					<div key={s.num} className="flex gap-6">
						<span className="text-[#C9A96E] font-mono text-sm mt-1 shrink-0">
							{s.num} —
						</span>
						<div>
							<h3 className="text-lg md:text-xl font-semibold text-[#1A1916] uppercase tracking-wide">
								{s.label}
							</h3>
							<p className="mt-2 text-[#5C584F] text-base md:text-lg leading-relaxed max-w-2xl">
								{s.description}
							</p>
						</div>
					</div>
				))}
			</div>

			<div className="mt-12">
				<DiscoveryCTA />
			</div>
		</div>
	);
}

/* ── Section 4 — The Gap ──────────────────────────────────────── */
const PAIN_POINTS = [
	"Don't have the technical ability to build AI Infrastructure.",
	"Don't know what's possible with state of the art AI technology.",
	"Don't know where to start, and what to optimize.",
] as const;

function TheGap() {
	return (
		<div className="px-6 md:px-12 py-16 md:py-24">
			<h2 className="text-[28px] leading-[34px] md:text-[48px] md:leading-[54px] font-normal tracking-[-1px] md:tracking-[-1.5px] text-[#1A1916] max-w-4xl">
				Most Brokerages Are Still Using AI{" "}
				<span className="font-serif italic text-[#C9A96E]">
					Like It's 2022.
				</span>
			</h2>

			<div className="mt-8 space-y-4 text-[#5C584F] text-base md:text-lg leading-relaxed max-w-3xl">
				<p>Remember when ChatGPT first came out?</p>
				<p>95% of business owners are still using AI the same way.</p>
				<p>
					In 2026, it's like driving a bicycle to work when you can have a
					self-driving car.
				</p>
			</div>

			<div className="mt-12">
				<h3 className="text-sm font-medium text-[#5C584F] uppercase tracking-[0.16em] mb-6">
					Most Business Owners:
				</h3>
				<ul className="space-y-4">
					{PAIN_POINTS.map((point) => (
						<li
							key={point}
							className="flex items-start gap-3 text-[#1A1916] text-base md:text-lg"
						>
							<span className="text-[#C9A96E] mt-1.5 shrink-0">•</span>
							{point}
						</li>
					))}
				</ul>
			</div>

			<p className="mt-12 text-xl md:text-2xl font-normal text-[#1A1916]">
				We're here to bridge the gap.
			</p>
		</div>
	);
}

/* ── Section 5 — Feedback Loop ────────────────────────────────── */
const LOOP_STEPS = [
	{
		num: "01",
		label: "Identify",
		description:
			"We analyze your operations and locate the highest-leverage AI opportunity most critical to your business.",
	},
	{
		num: "02",
		label: "Audit",
		description:
			"Our team conducts a thorough technical and operational audit to design the exact infrastructure your business needs.",
	},
	{
		num: "03",
		label: "Implement",
		description:
			"Our in-house Engineering team builds a custom solution that automates your internal operations.",
	},
	{
		num: "04",
		label: "Optimize",
		description:
			"We evaluate what's been learned, refine and optimize your systems as your business grows and AI capabilities evolve.",
	},
] as const;

/*
 * Animated feedback loop diagram — production-grade, JS-driven.
 *
 * Architecture: A single rAF loop drives everything from one time source.
 * The 8s cycle is divided into 4 segments (one per node). Each segment has:
 *   TRAVEL phase (35%) — pulse zips from previous node to target node
 *   DWELL  phase (65%) — pulse hidden, target node card glows gold
 *
 * Card highlighting is phase-based (segment index), NOT proximity-based.
 * This eliminates any chance of flicker or mis-sync.
 *
 * Pulse visibility uses generous dead zones at both ends of travel so the
 * stroke is always fully hidden behind node cards.
 */

const LOOP_FULL_PATH =
	"M 170 145 C 170 60, 530 60, 530 145 C 640 145, 640 405, 530 405 C 530 490, 170 490, 170 405 C 60 405, 60 145, 170 145 Z";

/* Hermite smooth-step (attempt-safe clamped) */
function smoothstep(t: number) {
	const c = Math.max(0, Math.min(1, t));
	return c * c * (3 - 2 * c);
}

/* Attempt a quintic ease-in-out for snappier travel */
function easeInOutQuint(t: number) {
	const c = Math.max(0, Math.min(1, t));
	return c < 0.5
		? 16 * c * c * c * c * c
		: 1 - (-2 * c + 2) ** 5 / 2;
}

function FeedbackLoopDiagram() {
	const basePathRef = useRef<SVGPathElement>(null);
	const crispRef = useRef<SVGPathElement>(null);
	const glowRef = useRef<SVGPathElement>(null);
	const borderRefs = useRef<(SVGRectElement | null)[]>([]);
	const fillRefs = useRef<(SVGRectElement | null)[]>([]);
	const glowRectRefs = useRef<(SVGRectElement | null)[]>([]);

	useEffect(() => {
		const basePath = basePathRef.current;
		const crisp = crispRef.current;
		const glow = glowRef.current;
		if (!basePath || !crisp || !glow) return;

		/* ── Measure exact node positions on the SVG path ── */
		const totalLen = basePath.getTotalLength();
		const nodeCoords = [
			{ x: 170, y: 145 },
			{ x: 530, y: 145 },
			{ x: 530, y: 405 },
			{ x: 170, y: 405 },
		];
		const SAMPLES = 800;
		const nodePos: number[] = [];
		for (const nd of nodeCoords) {
			let best = 0;
			let bestD = Infinity;
			for (let i = 0; i <= SAMPLES; i++) {
				const len = (i / SAMPLES) * totalLen;
				const pt = basePath.getPointAtLength(len);
				const d = Math.hypot(pt.x - nd.x, pt.y - nd.y);
				if (d < bestD) {
					bestD = d;
					best = i / SAMPLES;
				}
			}
			nodePos.push(best);
		}

		/* ── Animation constants ── */
		const CYCLE = 8000;
		const DASH = 0.10;
		const GLOW_DASH = 0.07;
		const TRAVEL = 0.35; // 35% of each segment = travel

		/* Pulse is only visible in the CENTER of the travel phase.
		   The quintic easing moves the position to ~97% by t=0.72, so the
		   old window was too late. This tight center window guarantees the
		   pulse is always far from both nodes (hidden behind cards).
		   At 35% of quintic ≈ 8% of path (behind origin card).
		   At 65% of quintic ≈ 92% of path (behind destination card).
		   [0 ──dead── 0.35 ──fade── 0.42 ══vis══ 0.58 ──fade── 0.65 ──dead── 1] */
		const P_DEAD_START = 0.35;
		const P_FADE_IN_END = 0.42;
		const P_FADE_OUT_START = 0.58;
		const P_DEAD_END = 0.65;

		/* Card glow ramps within dwell phase.
		   Measured as fraction within the dwell sub-range [TRAVEL..1].
		   [0 ──ramp-in── 0.08 ════glow════ 0.85 ──ramp-out── 1] */
		const G_RAMP_IN = 0.08;
		const G_RAMP_OUT_START = 0.85;

		/* ── Eased position (quintic for snappy zip) ── */
		function easedPosition(t01: number): number {
			const seg = Math.floor(t01 * 4) % 4;
			const segT = t01 * 4 - seg;
			const from = nodePos[seg];
			const to = nodePos[(seg + 1) % 4];

			let delta = to - from;
			if (delta < 0) delta += 1;

			if (segT < TRAVEL) {
				return (from + delta * easeInOutQuint(segT / TRAVEL)) % 1;
			}
			return to % 1;
		}

		/* ── Init dash patterns ── */
		crisp.style.strokeDasharray = `${DASH} ${1 - DASH}`;
		glow.style.strokeDasharray = `${GLOW_DASH} ${1 - GLOW_DASH}`;
		crisp.style.opacity = "0";
		glow.style.opacity = "0";

		let start: number | null = null;
		let raf: number;

		const tick = (now: number) => {
			if (!start) start = now;
			const t01 = ((now - start) % CYCLE) / CYCLE;

			/* ── Segment & sub-phase ── */
			const seg = Math.floor(t01 * 4) % 4;
			const segT = t01 * 4 - seg; // 0-1 within segment
			const isTraveling = segT < TRAVEL;
			const targetNode = (seg + 1) % 4; // node we're traveling TO / dwelling AT

			/* ── Pulse position ── */
			const pos = easedPosition(t01);
			const offset = 1 - pos;
			crisp.style.strokeDashoffset = String(offset);
			glow.style.strokeDashoffset = String(offset);

			/* ── Pulse opacity (dead zones guarantee zero visibility near nodes) ── */
			let pulseAlpha = 0;
			if (isTraveling) {
				const tp = segT / TRAVEL; // 0-1 within travel
				if (tp <= P_DEAD_START || tp >= P_DEAD_END) {
					pulseAlpha = 0;
				} else if (tp < P_FADE_IN_END) {
					pulseAlpha = smoothstep((tp - P_DEAD_START) / (P_FADE_IN_END - P_DEAD_START));
				} else if (tp > P_FADE_OUT_START) {
					pulseAlpha = smoothstep((P_DEAD_END - tp) / (P_DEAD_END - P_FADE_OUT_START));
				} else {
					pulseAlpha = 1;
				}
			}
			crisp.style.opacity = String(0.8 * pulseAlpha);
			glow.style.opacity = String(0.3 * pulseAlpha);

			/* ── Card highlights (phase-based, not proximity) ── */
			for (let i = 0; i < 4; i++) {
				let intensity = 0;

				if (i === targetNode) {
					if (isTraveling) {
						/* During travel: ramp up in the last stretch before arriving */
						const tp = segT / TRAVEL;
						if (tp > P_DEAD_END) {
							intensity = smoothstep((tp - P_DEAD_END) / (1 - P_DEAD_END));
						}
					} else {
						/* During dwell: full glow with soft ramp-in and ramp-out */
						const dwellT = (segT - TRAVEL) / (1 - TRAVEL); // 0-1 within dwell
						if (dwellT < G_RAMP_IN) {
							intensity = smoothstep(dwellT / G_RAMP_IN);
						} else if (dwellT > G_RAMP_OUT_START) {
							intensity = smoothstep((1 - dwellT) / (1 - G_RAMP_OUT_START));
						} else {
							intensity = 1;
						}
					}
				}

				const border = borderRefs.current[i];
				const fill = fillRefs.current[i];
				const glowRect = glowRectRefs.current[i];

				if (border) {
					if (intensity > 0.005) {
						border.setAttribute("stroke", "#C9A96E");
						border.setAttribute("stroke-opacity", String(0.15 + intensity * 0.40));
						border.setAttribute("stroke-width", String(1 + intensity * 0.5));
					} else {
						border.setAttribute("stroke", "#A39E96");
						border.setAttribute("stroke-opacity", "0.15");
						border.setAttribute("stroke-width", "1");
					}
				}
				if (fill) {
					fill.setAttribute("opacity", String(intensity * 0.07));
				}
				if (glowRect) {
					glowRect.setAttribute("opacity", String(intensity * 0.12));
				}
			}

			raf = requestAnimationFrame(tick);
		};

		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, []);

	return (
		<svg
			viewBox="0 0 700 550"
			className="w-full max-w-2xl"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label="Circular feedback loop: Identify, Audit, Implement, Optimize"
		>
			<defs>
				<filter id="line-glow">
					<feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
					<feMerge>
						<feMergeNode in="blur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
				{/* Soft outer glow for active card */}
				<filter id="card-glow" x="-20%" y="-20%" width="140%" height="140%">
					<feGaussianBlur in="SourceGraphic" stdDeviation="8" />
				</filter>
				<radialGradient id="loop-center-glow" cx="50%" cy="50%" r="50%">
					<stop offset="0%" stopColor="#C9A96E" stopOpacity="0.06" />
					<stop offset="100%" stopColor="#C9A96E" stopOpacity="0" />
				</radialGradient>
			</defs>

			{/* Ambient center glow */}
			<circle cx="350" cy="275" r="160" fill="url(#loop-center-glow)" opacity="0.06" />

			{/* ── Loop path (behind nodes) ── */}
			<path
				ref={basePathRef}
				d={LOOP_FULL_PATH}
				stroke="#C9A96E"
				strokeWidth="1"
				opacity="0.08"
				fill="none"
				pathLength="1"
			/>
			{/* Wide glow — JS-driven */}
			<path
				ref={glowRef}
				d={LOOP_FULL_PATH}
				stroke="#C9A96E"
				strokeWidth="6"
				opacity="0"
				fill="none"
				pathLength="1"
				filter="url(#line-glow)"
			/>
			{/* Crisp pulse — JS-driven */}
			<path
				ref={crispRef}
				d={LOOP_FULL_PATH}
				stroke="#C9A96E"
				strokeWidth="1.5"
				opacity="0"
				fill="none"
				pathLength="1"
			/>

			{/* Center label */}
			<text x="350" y="268" textAnchor="middle" fill="#C9A96E" fontSize="11" fontWeight="400" fontFamily="inherit" letterSpacing="0.12em" opacity="0.4">
				AI IMPLEMENTATION
			</text>
			<text x="350" y="288" textAnchor="middle" fill="#C9A96E" fontSize="11" fontWeight="400" fontFamily="inherit" letterSpacing="0.12em" opacity="0.4">
				FEEDBACK LOOP
			</text>

			{/* ── Step 01 — Identify (top-left) ── */}
			<g>
				<rect ref={(el) => { glowRectRefs.current[0] = el; }} x="90" y="90" width="160" height="110" rx="6" stroke="#C9A96E" strokeWidth="1" fill="none" opacity="0" filter="url(#card-glow)" />
				<rect x="90" y="90" width="160" height="110" rx="6" fill="#FFFFFF" />
				<rect ref={(el) => { fillRefs.current[0] = el; }} x="90" y="90" width="160" height="110" rx="6" fill="#C9A96E" opacity="0" />
				<rect ref={(el) => { borderRefs.current[0] = el; }} x="90" y="90" width="160" height="110" rx="6" fill="none" stroke="#A39E96" strokeWidth="1" strokeOpacity="0.15" />
				<g transform="translate(152, 100)" stroke="#C9A96E" strokeWidth="1.5" fill="none">
					<circle cx="12" cy="12" r="8" />
					<line x1="18" y1="18" x2="24" y2="24" strokeLinecap="round" />
					<circle cx="12" cy="12" r="2.5" fill="#C9A96E" opacity="0.25" />
				</g>
				<text x="170" y="143" textAnchor="middle" fill="#C9A96E" fontSize="10" fontFamily="monospace" letterSpacing="0.1em">STEP 01</text>
				<text x="170" y="167" textAnchor="middle" fill="#E8E4DE" fontSize="18" fontWeight="600" fontFamily="inherit" letterSpacing="0.05em">IDENTIFY</text>
			</g>

			{/* ── Step 02 — Audit (top-right) ── */}
			<g>
				<rect ref={(el) => { glowRectRefs.current[1] = el; }} x="450" y="90" width="160" height="110" rx="6" stroke="#C9A96E" strokeWidth="1" fill="none" opacity="0" filter="url(#card-glow)" />
				<rect x="450" y="90" width="160" height="110" rx="6" fill="#FFFFFF" />
				<rect ref={(el) => { fillRefs.current[1] = el; }} x="450" y="90" width="160" height="110" rx="6" fill="#C9A96E" opacity="0" />
				<rect ref={(el) => { borderRefs.current[1] = el; }} x="450" y="90" width="160" height="110" rx="6" fill="none" stroke="#A39E96" strokeWidth="1" strokeOpacity="0.15" />
				<g transform="translate(514, 100)" stroke="#C9A96E" strokeWidth="1.5" fill="none">
					<rect x="2" y="0" width="20" height="26" rx="2" />
					<line x1="8" y1="8" x2="18" y2="8" strokeLinecap="round" />
					<line x1="8" y1="14" x2="16" y2="14" strokeLinecap="round" />
					<line x1="8" y1="20" x2="13" y2="20" strokeLinecap="round" />
					<path d="M16 19l1.5 1.5 3-3" strokeLinecap="round" strokeLinejoin="round" />
				</g>
				<text x="530" y="143" textAnchor="middle" fill="#C9A96E" fontSize="10" fontFamily="monospace" letterSpacing="0.1em">STEP 02</text>
				<text x="530" y="167" textAnchor="middle" fill="#E8E4DE" fontSize="18" fontWeight="600" fontFamily="inherit" letterSpacing="0.05em">AUDIT</text>
			</g>

			{/* ── Step 03 — Implement (bottom-right) ── */}
			<g>
				<rect ref={(el) => { glowRectRefs.current[2] = el; }} x="450" y="350" width="160" height="110" rx="6" stroke="#C9A96E" strokeWidth="1" fill="none" opacity="0" filter="url(#card-glow)" />
				<rect x="450" y="350" width="160" height="110" rx="6" fill="#FFFFFF" />
				<rect ref={(el) => { fillRefs.current[2] = el; }} x="450" y="350" width="160" height="110" rx="6" fill="#C9A96E" opacity="0" />
				<rect ref={(el) => { borderRefs.current[2] = el; }} x="450" y="350" width="160" height="110" rx="6" fill="none" stroke="#A39E96" strokeWidth="1" strokeOpacity="0.15" />
				<g transform="translate(514, 360)" stroke="#C9A96E" strokeWidth="1.5" fill="none">
					<rect x="0" y="2" width="24" height="20" rx="2" />
					<line x1="0" y1="8" x2="24" y2="8" />
					<circle cx="4" cy="5" r="1" fill="#C9A96E" />
					<circle cx="8" cy="5" r="1" fill="#C9A96E" />
					<circle cx="12" cy="5" r="1" fill="#C9A96E" />
					<path d="M6 14l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
					<line x1="13" y1="17" x2="18" y2="17" strokeLinecap="round" />
				</g>
				<text x="530" y="403" textAnchor="middle" fill="#C9A96E" fontSize="10" fontFamily="monospace" letterSpacing="0.1em">STEP 03</text>
				<text x="530" y="427" textAnchor="middle" fill="#E8E4DE" fontSize="18" fontWeight="600" fontFamily="inherit" letterSpacing="0.05em">IMPLEMENT</text>
			</g>

			{/* ── Step 04 — Optimize (bottom-left) ── */}
			<g>
				<rect ref={(el) => { glowRectRefs.current[3] = el; }} x="90" y="350" width="160" height="110" rx="6" stroke="#C9A96E" strokeWidth="1" fill="none" opacity="0" filter="url(#card-glow)" />
				<rect x="90" y="350" width="160" height="110" rx="6" fill="#FFFFFF" />
				<rect ref={(el) => { fillRefs.current[3] = el; }} x="90" y="350" width="160" height="110" rx="6" fill="#C9A96E" opacity="0" />
				<rect ref={(el) => { borderRefs.current[3] = el; }} x="90" y="350" width="160" height="110" rx="6" fill="none" stroke="#A39E96" strokeWidth="1" strokeOpacity="0.15" />
				<g transform="translate(152, 360)" stroke="#C9A96E" strokeWidth="1.5" fill="none">
					<polyline points="2,22 8,14 14,17 22,8" strokeLinecap="round" strokeLinejoin="round" />
					<polyline points="17,8 22,8 22,13" strokeLinecap="round" strokeLinejoin="round" />
					<line x1="2" y1="26" x2="22" y2="26" opacity="0.3" />
				</g>
				<text x="170" y="403" textAnchor="middle" fill="#C9A96E" fontSize="10" fontFamily="monospace" letterSpacing="0.1em">STEP 04</text>
				<text x="170" y="427" textAnchor="middle" fill="#E8E4DE" fontSize="18" fontWeight="600" fontFamily="inherit" letterSpacing="0.05em">OPTIMIZE</text>
			</g>
		</svg>
	);
}

function FeedbackLoop() {
	return (
		<div className="px-6 md:px-12 py-16 md:py-24">
			<h2 className="text-[28px] leading-[34px] md:text-[48px] md:leading-[54px] font-normal tracking-[-1px] md:tracking-[-1.5px] text-[#1A1916] max-w-3xl">
				Our AI Implementation{" "}
				<span className="font-serif italic text-[#C9A96E]">
					Feedback Loop
				</span>
			</h2>

			{/* ── Desktop: SVG loop diagram ────────────────────────── */}
			<div className="hidden md:flex justify-center mt-16">
				<FeedbackLoopDiagram />
			</div>

			{/* ── Desktop: step descriptions below diagram ─────────── */}
			<div className="hidden md:grid md:grid-cols-2 gap-x-16 gap-y-8 mt-12">
				{LOOP_STEPS.map((step) => (
					<div key={step.num} className="flex gap-4">
						<span className="text-[#C9A96E] font-mono text-sm mt-0.5 shrink-0">
							{step.num}
						</span>
						<div>
							<h3 className="text-base font-semibold text-[#1A1916] uppercase tracking-wide">
								{step.label}
							</h3>
							<p className="mt-1.5 text-[#5C584F] text-sm leading-relaxed">
								{step.description}
							</p>
						</div>
					</div>
				))}
			</div>

			{/* ── Mobile: stacked list ─────────────────────────────── */}
			<div className="md:hidden mt-12 grid gap-8">
				{LOOP_STEPS.map((step) => (
					<div key={step.num} className="flex gap-5">
						<div className="flex flex-col items-center shrink-0">
							<span className="font-mono text-xs text-[#C9A96E] tracking-wider">
								{step.num}
							</span>
							<div className="w-px flex-1 bg-[#C9A96E]/20 mt-2" />
						</div>
						<div>
							<h3 className="text-lg font-semibold text-[#1A1916] uppercase tracking-wide">
								{step.label}
							</h3>
							<p className="mt-2 text-[#5C584F] text-base leading-relaxed">
								{step.description}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

/* ── Testimonial ─────────────────────────────────────────────── */
function Testimonial() {
	return (
		<div className="px-6 md:px-12 py-16 md:py-24">
			<div className="relative max-w-4xl mx-auto">
				{/* Decorative quote mark */}
				<span
					className="absolute -top-4 -left-2 md:-top-6 md:-left-4 text-[80px] md:text-[120px] leading-none font-serif text-[#C9A96E] opacity-[0.08] select-none pointer-events-none"
					aria-hidden="true"
				>
					&ldquo;
				</span>

				<div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
					{/* Quote */}
					<div className="flex-1 min-w-0">
						<blockquote className="text-xl md:text-2xl leading-relaxed md:leading-[1.6] text-[#1A1916] font-normal tracking-[-0.3px]">
							Nairon&apos;s team didn&apos;t just build us a tool — they
							embedded AI into how we operate. Lead qualification that used
							to take our agents hours now happens in seconds, and the
							systems keep getting smarter. This is the kind of
							infrastructure every brokerage will need.
						</blockquote>

						<div className="mt-8 flex items-center gap-4">
							<img
								src="/nima.jpeg"
								alt="Nima Ghassemi"
								width={56}
								height={56}
								className="w-14 h-14 rounded-full object-cover border border-[#0C0C0C]/10"
								loading="lazy"
							/>
							<div>
								<p className="text-[#1A1916] font-semibold text-base">
									Nima Ghassemi
								</p>
								<p className="text-[#5C584F] text-sm mt-0.5">
									8-Figure Real Estate Marketing Tech Entrepreneur
								</p>
								<p className="text-[#C9A96E] text-xs font-medium tracking-wide mt-1">
									KEYLEAD
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

/* ── Lead Response Calculator ────────────────────────────────── */

/**
 * Qualification rate decay based on response time.
 * Derived from InsideSales / Harvard Business Review lead response data.
 * Returns a 0-1 multiplier: 1.0 = maximum qualification rate.
 */
function qualificationRate(responseMinutes: number): number {
	// Piecewise interpolation from industry benchmarks
	const points: [number, number][] = [
		[0.5, 1.0], // 30 seconds — baseline (AI speed)
		[1, 0.91],
		[5, 0.48],
		[10, 0.28],
		[30, 0.10],
		[60, 0.05],
		[120, 0.02],
	];
	if (responseMinutes <= points[0][0]) return points[0][1];
	if (responseMinutes >= points[points.length - 1][0])
		return points[points.length - 1][1];
	for (let i = 0; i < points.length - 1; i++) {
		const [t0, r0] = points[i];
		const [t1, r1] = points[i + 1];
		if (responseMinutes <= t1) {
			const frac = (responseMinutes - t0) / (t1 - t0);
			return r0 + (r1 - r0) * frac;
		}
	}
	return points[points.length - 1][1];
}

function formatUsd(n: number): string {
	if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
	if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
	return `$${n.toFixed(0)}`;
}

type Department = "sales" | "operations" | "recruiting" | "finance";

const DEPARTMENT_CONFIG: Record<
	Department,
	{
		label: string;
		headline: string;
		headlineAccent: string;
		subtitle: string;
		lostLabel: string;
		currentLabel: string;
		currentSublabel: (inputs: Record<string, number>) => string;
		aiLabel: string;
		aiSublabel: string;
		inputs: {
			key: string;
			label: string;
			min: number;
			max: number;
			step: number;
			default: number;
			prefix?: string;
			suffix?: string;
		}[];
		calculate: (inputs: Record<string, number>) => {
			current: number;
			ai: number;
			lost: number;
			multiplier: number;
		};
	}
> = {
	sales: {
		label: "Sales",
		headline: "How Much Revenue Are You",
		headlineAccent: "Leaving on the Table?",
		subtitle:
			"Leads contacted within 5 minutes are 21x more likely to qualify. Most brokerages respond in 30+ minutes. See what that's costing you.",
		lostLabel: "Estimated Revenue Left on the Table",
		currentLabel: "Current",
		currentSublabel: (i) => `${i.responseTime} min response`,
		aiLabel: "With AI",
		aiSublabel: "30s response",
		inputs: [
			{ key: "leads", label: "Monthly leads", min: 10, max: 2000, step: 10, default: 200, suffix: "leads/mo" },
			{ key: "responseTime", label: "Avg. response time", min: 1, max: 120, step: 1, default: 30, suffix: "minutes" },
			{ key: "dealValue", label: "Avg. deal value", min: 1000, max: 100000, step: 500, default: 8000, prefix: "$" },
			{ key: "closeRate", label: "Close rate", min: 0.5, max: 20, step: 0.5, default: 3, suffix: "%" },
		],
		calculate: (i) => {
			const rate = i.closeRate / 100;
			const currentQR = qualificationRate(i.responseTime);
			const aiQR = qualificationRate(0.5);
			const current = i.leads * currentQR * rate * i.dealValue;
			const ai = i.leads * aiQR * rate * i.dealValue;
			return { current, ai, lost: ai - current, multiplier: currentQR > 0 ? aiQR / currentQR : 0 };
		},
	},
	operations: {
		label: "Operations",
		headline: "How Much Are You Spending on",
		headlineAccent: "Manual Admin Work?",
		subtitle:
			"The average brokerage spends 15-20 hours per week on contract prep, compliance checks, and transaction coordination. AI handles it in minutes.",
		lostLabel: "Estimated Cost of Manual Operations",
		currentLabel: "Current",
		currentSublabel: (i) => `${i.adminHours} hrs/week manual`,
		aiLabel: "With AI",
		aiSublabel: "90% automated",
		inputs: [
			{ key: "agents", label: "Number of agents", min: 1, max: 200, step: 1, default: 25, suffix: "agents" },
			{ key: "adminHours", label: "Admin hours per agent/week", min: 1, max: 40, step: 1, default: 12, suffix: "hrs/wk" },
			{ key: "hourlyRate", label: "Admin staff hourly cost", min: 15, max: 75, step: 1, default: 28, prefix: "$" },
			{ key: "errorRate", label: "Rework/error rate", min: 1, max: 30, step: 1, default: 8, suffix: "%" },
		],
		calculate: (i) => {
			const weeklyHours = i.agents * i.adminHours;
			const monthlyCost = weeklyHours * 4.33 * i.hourlyRate;
			const reworkCost = monthlyCost * (i.errorRate / 100);
			const current = monthlyCost + reworkCost;
			const ai = current * 0.15; // AI reduces to ~15% of manual cost
			return { current, ai, lost: current - ai, multiplier: current > 0 ? current / ai : 0 };
		},
	},
	recruiting: {
		label: "Recruiting",
		headline: "How Much Does It Cost to",
		headlineAccent: "Find & Onboard Agents?",
		subtitle:
			"Brokerages lose top candidates to slow outreach and manual screening. AI sources, qualifies, and nurtures agent prospects around the clock.",
		lostLabel: "Estimated Recruiting Cost Savings",
		currentLabel: "Current",
		currentSublabel: (i) => `${i.timeToHire} day avg hire`,
		aiLabel: "With AI",
		aiSublabel: "60% faster pipeline",
		inputs: [
			{ key: "hiresPerYear", label: "Agent hires per year", min: 1, max: 100, step: 1, default: 12, suffix: "hires/yr" },
			{ key: "costPerHire", label: "Cost per hire (all-in)", min: 1000, max: 25000, step: 500, default: 6000, prefix: "$" },
			{ key: "timeToHire", label: "Avg. time to hire", min: 10, max: 180, step: 5, default: 60, suffix: "days" },
			{ key: "attritionRate", label: "First-year attrition", min: 5, max: 60, step: 1, default: 25, suffix: "%" },
		],
		calculate: (i) => {
			const annualCost = i.hiresPerYear * i.costPerHire;
			const attritionCost = annualCost * (i.attritionRate / 100);
			const current = (annualCost + attritionCost) / 12; // monthly
			const ai = current * 0.4; // AI reduces recruiting cost by ~60%
			return { current, ai, lost: current - ai, multiplier: current > 0 ? current / ai : 0 };
		},
	},
	finance: {
		label: "Finance",
		headline: "How Much Revenue Leaks Through",
		headlineAccent: "Untracked Commissions?",
		subtitle:
			"Manual commission tracking, split errors, and delayed invoicing cost brokerages 3-5% of gross revenue. AI reconciles in real time.",
		lostLabel: "Estimated Revenue Leakage",
		currentLabel: "Current",
		currentSublabel: (i) => `${i.leakageRate}% leakage`,
		aiLabel: "With AI",
		aiSublabel: "0.5% leakage",
		inputs: [
			{ key: "monthlyGCI", label: "Monthly gross commission", min: 50000, max: 5000000, step: 25000, default: 500000, prefix: "$" },
			{ key: "leakageRate", label: "Commission leakage rate", min: 0.5, max: 10, step: 0.5, default: 4, suffix: "%" },
			{ key: "transactions", label: "Monthly transactions", min: 5, max: 500, step: 5, default: 40, suffix: "txns/mo" },
			{ key: "reconcileHours", label: "Hours on reconciliation", min: 1, max: 80, step: 1, default: 20, suffix: "hrs/mo" },
		],
		calculate: (i) => {
			const leakage = i.monthlyGCI * (i.leakageRate / 100);
			const reconcileCost = i.reconcileHours * 35; // ~$35/hr bookkeeper
			const current = leakage + reconcileCost;
			const aiLeakage = i.monthlyGCI * 0.005; // AI reduces to 0.5%
			const aiReconcile = reconcileCost * 0.1; // 90% automated
			const ai = aiLeakage + aiReconcile;
			return { current, ai, lost: current - ai, multiplier: current > 0 ? current / ai : 0 };
		},
	},
};

const DEPT_KEYS = Object.keys(DEPARTMENT_CONFIG) as Department[];

function LeadResponseCalculator() {
	const [dept, setDept] = useState<Department>("sales");
	const config = DEPARTMENT_CONFIG[dept];
	const tabsRef = useRef<HTMLDivElement>(null);

	const [inputs, setInputs] = useState<Record<string, number>>(() =>
		Object.fromEntries(config.inputs.map((i) => [i.key, i.default])),
	);

	const handleDeptChange = useCallback((next: Department) => {
		setDept(next);
		const defaults = Object.fromEntries(
			DEPARTMENT_CONFIG[next].inputs.map((i) => [i.key, i.default]),
		);
		setInputs(defaults);
	}, []);

	const results = useMemo(() => config.calculate(inputs), [config, inputs]);

	return (
		<div className="px-6 md:px-12 py-16 md:py-24">
			<div className="max-w-4xl">
				<p className="text-[#C9A96E] text-xs font-medium uppercase tracking-[0.16em] mb-4">
					Cost Savings Calculator
				</p>

				{/* Headline with animated text swap */}
				<AnimatePresence mode="wait">
					<motion.div
						key={dept + "-header"}
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						transition={{ duration: 0.25, ease: "easeOut" }}
					>
						<h2 className="text-[28px] leading-[34px] md:text-[48px] md:leading-[54px] font-normal tracking-[-1px] md:tracking-[-1.5px] text-[#1A1916] max-w-3xl">
							{config.headline}{" "}
							<span className="font-serif italic text-[#C9A96E]">
								{config.headlineAccent}
							</span>
						</h2>
						<p className="mt-4 text-[#5C584F] text-base md:text-lg leading-relaxed max-w-2xl">
							{config.subtitle}
						</p>
					</motion.div>
				</AnimatePresence>

				{/* Department tabs — horizontally scrollable on mobile */}
				<div
					ref={tabsRef}
					className="mt-8 relative flex gap-1 p-1 rounded-xl bg-[#0C0C0C]/[0.03] border border-[#0C0C0C]/[0.06] w-fit max-w-full overflow-x-auto scrollbar-none"
					style={{ WebkitOverflowScrolling: "touch" }}
				>
					{DEPT_KEYS.map((key) => (
						<button
							key={key}
							type="button"
							onClick={() => handleDeptChange(key)}
							className={`relative shrink-0 px-4 sm:px-5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
								dept === key
									? "text-[#0C0C0C]"
									: "text-[#5C584F] hover:text-[#1A1916]"
							}`}
						>
							{dept === key && (
								<motion.div
									layoutId="calc-tab-bg"
									className="absolute inset-0 rounded-lg bg-[#C9A96E]"
									transition={{ type: "spring", stiffness: 400, damping: 30 }}
								/>
							)}
							<span className="relative z-10">{DEPARTMENT_CONFIG[key].label}</span>
						</button>
					))}
				</div>
			</div>

			{/* Calculator body with animated content swap */}
			<AnimatePresence mode="wait">
				<motion.div
					key={dept}
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -6 }}
					transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
					className="mt-12 grid md:grid-cols-[1fr_1fr] gap-8 md:gap-16 items-start"
				>
					{/* ── Inputs ── */}
					<div className="rounded-xl border border-[#0C0C0C]/[0.06] bg-[#0C0C0C]/[0.015] p-6 md:p-8 space-y-7">
						<p className="text-[#5C584F] text-[10px] uppercase tracking-[0.2em] font-medium mb-1">
							Your Numbers
						</p>
						{config.inputs.map((field, idx) => (
							<motion.div
								key={field.key}
								initial={{ opacity: 0, x: -8 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: idx * 0.06, duration: 0.3 }}
							>
								<InputField
									label={field.label}
									value={inputs[field.key] ?? field.default}
									onChange={(v) => setInputs((prev) => ({ ...prev, [field.key]: v }))}
									min={field.min}
									max={field.max}
									step={field.step}
									prefix={field.prefix}
									suffix={field.suffix}
								/>
							</motion.div>
						))}
					</div>

					{/* ── Results ── */}
					<div className="flex flex-col gap-5">
						{/* Lost revenue card */}
						<div className="relative overflow-hidden rounded-xl border border-[#C9A96E]/20 bg-gradient-to-br from-[#C9A96E]/[0.04] to-transparent p-7 md:p-9">
							<div className="absolute -top-12 -right-12 w-40 h-40 bg-[#C9A96E]/[0.06] rounded-full blur-3xl" />
							<div className="absolute bottom-0 left-0 w-24 h-24 bg-[#C9A96E]/[0.03] rounded-full blur-2xl" />
							<p className="relative text-[#5C584F] text-[10px] uppercase tracking-[0.2em] font-medium mb-3">
								{config.lostLabel}
							</p>
							<motion.p
								key={results.lost}
								initial={{ opacity: 0.6, scale: 0.97 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.3 }}
								className="relative text-[40px] md:text-[60px] font-light tracking-[-3px] text-[#C9A96E] leading-none tabular-nums font-mono"
							>
								{formatUsd(results.lost)}
							</motion.p>
							<p className="relative text-[#5C584F] text-sm mt-3 tracking-wide">per month</p>
						</div>

						{/* Comparison */}
						<div className="grid grid-cols-2 gap-3 sm:gap-4">
							<div className="rounded-xl border border-[#0C0C0C]/[0.06] bg-[#0C0C0C]/[0.015] p-4 sm:p-5 md:p-6">
								<p className="text-[#5C584F] text-[10px] uppercase tracking-[0.16em] mb-2 leading-tight">
									{config.currentLabel}<br />
									<span className="text-[#5C584F]/60">{config.currentSublabel(inputs)}</span>
								</p>
								<p className="text-lg sm:text-xl md:text-2xl font-light tracking-[-1px] text-[#1A1916] tabular-nums font-mono">
									{formatUsd(results.current)}
								</p>
								<p className="text-[#5C584F]/50 text-xs mt-1.5">/month</p>
							</div>
							<div className="rounded-xl border border-[#C9A96E]/15 bg-[#C9A96E]/[0.025] p-4 sm:p-5 md:p-6">
								<p className="text-[#C9A96E] text-[10px] uppercase tracking-[0.16em] mb-2 leading-tight">
									{config.aiLabel}<br />
									<span className="text-[#C9A96E]/60">{config.aiSublabel}</span>
								</p>
								<p className="text-lg sm:text-xl md:text-2xl font-light tracking-[-1px] text-[#1A1916] tabular-nums font-mono">
									{formatUsd(results.ai)}
								</p>
								<p className="text-[#C9A96E] text-xs mt-1.5 font-medium">
									{results.multiplier > 1
										? `${results.multiplier.toFixed(1)}x savings`
										: "/month"}
								</p>
							</div>
						</div>

						{/* CTA */}
						<div className="mt-1">
							<DiscoveryCTA />
						</div>
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
}

/* Styled range slider with filled track — enlarged touch target on mobile */
function InputField({
	label,
	value,
	onChange,
	min,
	max,
	step,
	prefix,
	suffix,
}: {
	label: string;
	value: number;
	onChange: (v: number) => void;
	min: number;
	max: number;
	step: number;
	prefix?: string;
	suffix?: string;
}) {
	const pct = ((value - min) / (max - min)) * 100;
	return (
		<div className="group">
			<div className="flex items-baseline justify-between mb-3">
				<label className="text-[#5C584F] text-sm tracking-wide">{label}</label>
				<span className="text-[#1A1916] text-base font-medium tabular-nums font-mono">
					{prefix}
					{value.toLocaleString()}
					{suffix ? <span className="text-[#5C584F] text-xs ml-1">{suffix}</span> : ""}
				</span>
			</div>
			<div className="relative h-8 sm:h-6 flex items-center">
				<div className="absolute inset-x-0 h-[3px] rounded-full bg-[#0C0C0C]/[0.06]" />
				<div
					className="absolute left-0 h-[3px] rounded-full bg-gradient-to-r from-[#C9A96E]/60 to-[#C9A96E] transition-[width] duration-75"
					style={{ width: `${pct}%` }}
				/>
				<input
					type="range"
					min={min}
					max={max}
					step={step}
					value={value}
					onChange={(e) => onChange(Number(e.target.value))}
					className="absolute inset-0 w-full appearance-none bg-transparent outline-none cursor-pointer z-10
						[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:h-[18px]
						[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#C9A96E]
						[&::-webkit-slider-thumb]:shadow-[0_0_0_3px_rgba(201,169,110,0.15),0_0_12px_rgba(201,169,110,0.2)]
						[&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-shadow [&::-webkit-slider-thumb]:duration-200
						[&::-webkit-slider-thumb]:hover:shadow-[0_0_0_5px_rgba(201,169,110,0.2),0_0_16px_rgba(201,169,110,0.3)]
						[&::-webkit-slider-thumb]:active:shadow-[0_0_0_6px_rgba(201,169,110,0.25),0_0_20px_rgba(201,169,110,0.35)]
						[&::-moz-range-thumb]:w-[18px] [&::-moz-range-thumb]:h-[18px]
						[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#C9A96E]
						[&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer
						[&::-moz-range-track]:bg-transparent"
				/>
			</div>
		</div>
	);
}

/* ── Final CTA ────────────────────────────────────────────────── */
function FinalCTA() {
	return (
		<div
			id="discovery"
			className="flex flex-col items-center text-center px-6 md:px-12 py-20 md:py-32"
		>
			<h2 className="text-[28px] leading-[34px] md:text-[48px] md:leading-[54px] font-normal tracking-[-1px] md:tracking-[-1.5px] text-[#1A1916] max-w-3xl">
				Ready to power your Real Estate Brokerage{" "}
				<span className="font-serif italic text-[#C9A96E]">with AI?</span>
			</h2>
			<div className="mt-10">
				<DiscoveryCTA />
			</div>
		</div>
	);
}

/* ── Page ─────────────────────────────────────────────────────── */
function RealEstatePage() {
	return (
		<ModalProvider>
			<div className="min-h-screen bg-white text-[#1A1916] font-inter">
				<Navbar minimal />

				<GridSystem className="pt-16 mt-12 md:mt-16">
					<GridSection columns="1fr" border>
						<HeroSection />
					</GridSection>

					<GridSection columns="1fr" border>
						<LogoStrip />
					</GridSection>

					<GridSection columns="1fr" border>
						<CustomSolutions />
					</GridSection>

					<GridSection columns="1fr" border>
						<WhatWeDo />
					</GridSection>

					<GridSection columns="1fr" border>
						<TheGap />
					</GridSection>

					<GridSection columns="1fr" border>
						<FeedbackLoop />
					</GridSection>

					<GridSection columns="1fr" border>
						<LeadResponseCalculator />
					</GridSection>

					{/* Testimonial — hidden until image + copy confirmed */}
					{/* <GridSection columns="1fr" border>
						<Testimonial />
					</GridSection> */}

					<GridSection columns="1fr" border={false}>
						<FinalCTA />
					</GridSection>
				</GridSystem>

				<Footer variant="real-estate" />
			</div>
			<HireModal />
			<CandidateModal />
		</ModalProvider>
	);
}
