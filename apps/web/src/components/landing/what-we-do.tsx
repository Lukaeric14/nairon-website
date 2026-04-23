import { useState, useEffect, useCallback, useRef } from "react";
import { GridSection, GridCell } from "./grid-system";

const steps = [
	{
		num: "1.0",
		title: "Identify",
		description:
			"We do a deep dive into your daily operations to map every workflow, surface the highest-leverage opportunities, and define the exact scope of what your first AI employee will take on.",
	},
	{
		num: "2.0",
		title: "Audit",
		description:
			"We run a technical audit of your existing stack and design the AI infrastructure your business needs - so what we build integrates cleanly and empowers your team, without adding complexity to your operations.",
	},
	{
		num: "3.0",
		title: "Implement",
		description:
			"Our engineers build, test, and deploy your AI employees directly into your environment - running on real hardware, integrated with your tools, and ready to operate end-to-end.",
	},
	{
		num: "4.0",
		title: "Optimize",
		description:
			"We move from deployment into a weekly operating rhythm - monitoring performance, refining output, and continuously improving your AI employees so they only get better over time.",
	},
];

const CYCLE_MS = 7000;
const FADE_MS = 800;

/**
 * Edge i connects box i → box (i+1) % 4, going clockwise around the perimeter:
 *   0: top     (box 0 Identify  → box 1 Audit)        — left → right
 *   1: right   (box 1 Audit     → box 2 Implement)    — top → bottom
 *   2: bottom  (box 2 Implement → box 3 Optimize)     — right → left
 *   3: left    (box 3 Optimize  → box 0 Identify)     — bottom → top
 *
 * Edge leading INTO active box N is edge (N - 1 + 4) % 4.
 */
function edgeLeadingTo(boxIdx: number): number {
	return (boxIdx - 1 + steps.length) % steps.length;
}

function EdgeLine({
	edge,
	variant,
}: {
	edge: number;
	variant: "active" | "fading";
}) {
	const color = "#C9A96E";
	const thickness = 1.5;

	// Each edge occupies the middle 50% of an outer side of the square.
	// transformOrigin determines the direction of shoot-out.
	const configs: Array<{
		style: React.CSSProperties;
		origin: string;
		axis: "x" | "y";
	}> = [
		// edge 0: top, left → right
		{
			style: {
				top: 0,
				left: "25%",
				right: "25%",
				height: `${thickness}px`,
				marginTop: `-${thickness / 2}px`,
			},
			origin: "left center",
			axis: "x",
		},
		// edge 1: right, top → bottom
		{
			style: {
				right: 0,
				top: "25%",
				bottom: "25%",
				width: `${thickness}px`,
				marginRight: `-${thickness / 2}px`,
			},
			origin: "top center",
			axis: "y",
		},
		// edge 2: bottom, right → left
		{
			style: {
				bottom: 0,
				left: "25%",
				right: "25%",
				height: `${thickness}px`,
				marginBottom: `-${thickness / 2}px`,
			},
			origin: "right center",
			axis: "x",
		},
		// edge 3: left, bottom → top
		{
			style: {
				left: 0,
				top: "25%",
				bottom: "25%",
				width: `${thickness}px`,
				marginLeft: `-${thickness / 2}px`,
			},
			origin: "bottom center",
			axis: "y",
		},
	];

	const config = configs[edge];
	const growClass =
		config.axis === "x" ? "animate-line-grow-x-immediate" : "animate-line-grow-y";
	const animationClass = variant === "active" ? growClass : "animate-line-fade-out";

	return (
		<div
			className={`absolute pointer-events-none ${animationClass}`}
			style={{
				...config.style,
				background: color,
				transformOrigin: config.origin,
			}}
		/>
	);
}

export function WhatWeDo() {
	const [active, setActive] = useState(0);
	const [activeEdge, setActiveEdge] = useState<number | null>(null);
	const [fadingEdge, setFadingEdge] = useState<number | null>(null);
	const activeRef = useRef(0);
	const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const goTo = useCallback(
		(idx: number) => {
			const prev = activeRef.current;
			if (prev === idx) return;
			const newEdge = edgeLeadingTo(idx);
			setFadingEdge(activeEdge);
			setActiveEdge(newEdge);
			if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
			fadeTimerRef.current = setTimeout(() => setFadingEdge(null), FADE_MS);
			activeRef.current = idx;
			setActive(idx);
		},
		[activeEdge],
	);

	const advance = useCallback(() => {
		goTo((activeRef.current + 1) % steps.length);
	}, [goTo]);

	useEffect(() => {
		const timer = setTimeout(advance, CYCLE_MS);
		return () => clearTimeout(timer);
	}, [active, advance]);

	return (
		<div id="what-we-do">
			{/* Header */}
			<GridSection columns="1fr" border>
				<GridCell className="px-6 md:px-12 py-10 md:py-14">
					<div className="flex items-center gap-3 mb-6">
						<div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
						<span className="text-[#5C584F] text-xs font-medium uppercase tracking-[0.16em]">
							What we do
						</span>
					</div>
					<h2 className="text-2xl md:text-[36px] md:leading-[44px] font-normal tracking-[-0.48px] text-[#1A1916]">
						We Deploy Your AI Employee{" "}
						<span className="font-serif italic text-[#C9A96E] text-[1.1em]">in 4 Steps</span>
					</h2>
				</GridCell>
			</GridSection>

			{/* Description area with fade-in on change */}
			<GridSection columns="1fr" border>
				<GridCell className="px-6 md:px-12 py-10 md:py-14 min-h-[200px] flex items-center justify-center">
					<p
						key={active}
						className="max-w-3xl text-center text-base md:text-lg text-[#5C584F] leading-relaxed animate-fade-in"
					>
						{steps[active].description}
					</p>
				</GridCell>
			</GridSection>

			{/* 2x2 grid of step boxes with edge lines on the perimeter */}
			<GridSection columns="1fr" border>
				<GridCell className="px-6 md:px-12 py-10 md:py-14 flex items-center justify-center">
					<div className="relative w-full max-w-[640px] aspect-square">
						{/* 2x2 box grid */}
						<div className="grid grid-cols-2 grid-rows-2 w-full h-full">
							{steps.map((step, i) => {
								const isActive = active === i;
								const gridPos = [
									{ col: 1, row: 1 },
									{ col: 2, row: 1 },
									{ col: 2, row: 2 },
									{ col: 1, row: 2 },
								][i];
								return (
									<button
										key={step.num}
										type="button"
										onClick={() => goTo(i)}
										className="relative flex items-center justify-center p-6 md:p-10 cursor-pointer transition-all duration-700"
										style={{
											gridColumnStart: gridPos.col,
											gridRowStart: gridPos.row,
											borderRight:
												gridPos.col === 1
													? "var(--guide-width) solid var(--guide-color)"
													: undefined,
											borderBottom:
												gridPos.row === 1
													? "var(--guide-width) solid var(--guide-color)"
													: undefined,
											background: isActive ? "rgba(201,169,110,0.03)" : "transparent",
										}}
									>
										<h3
											className="text-base md:text-lg font-semibold whitespace-nowrap transition-all duration-700"
											style={{
												color: isActive ? "#1A1916" : "#8A857C",
												opacity: isActive ? 1 : 0.45,
											}}
										>
											<span className="text-[#C9A96E] mr-2">{step.num}</span>
											{step.title}
										</h3>
									</button>
								);
							})}
						</div>

						{/* Edge lines — shoot out along the perimeter, box → box */}
						{activeEdge !== null && (
							<EdgeLine
								key={`active-edge-${activeEdge}`}
								edge={activeEdge}
								variant="active"
							/>
						)}
						{fadingEdge !== null && fadingEdge !== activeEdge && (
							<EdgeLine
								key={`fading-edge-${fadingEdge}`}
								edge={fadingEdge}
								variant="fading"
							/>
						)}
					</div>
				</GridCell>
			</GridSection>
		</div>
	);
}
