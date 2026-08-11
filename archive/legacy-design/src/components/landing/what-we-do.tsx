import { useState, useEffect, useCallback, useRef, Fragment } from "react";
import { GridSection, GridCell } from "./grid-system";

const steps = [
	{
		num: "Step 1:",
		title: "Pick",
		description:
			"We pick one painful workflow, agree what success looks like, and define the exact job your first AI employee needs to own.",
	},
	{
		num: "Step 2:",
		title: "Setup",
		description:
			"We set up the dedicated runtime, accounts, tools, and safe access the AI employee needs to work without exposing the rest of your business.",
	},
	{
		num: "Step 3:",
		title: "Build",
		description:
			"Our engineers build, test, and deploy the AI employee into the real workflow, usually through WhatsApp or Telegram first while the Hive workspace rolls out.",
	},
	{
		num: "Step 4:",
		title: "Prove",
		description:
			"We measure the result, improve the workflow, and decide the next step together: scale with Nairon, keep a lighter platform plan, or stop after the pilot.",
	},
];

const CYCLE_MS = 7000;
const FADE_MS = 800;
// Arrow grow animation duration (must match .animate-line-grow-* in globals.css)
const ARROW_REACH_MS = 500;
// Fraction of the cycle reserved for the arm reaching the card before the border starts drawing
const REACH_FRAC = ARROW_REACH_MS / CYCLE_MS;

const COLOR = "#C9A96E";
const LINE_THICKNESS = 1.5;

type ArrowDir = "right" | "down" | "left" | "up";
const edgeDirections: ArrowDir[] = ["right", "down", "left", "up"];

function edgeLeadingTo(boxIdx: number): number {
	return (boxIdx - 1 + steps.length) % steps.length;
}

// Positioning for each arrow within the container.
// Layout: 2x2 with 15% gap (horizontal and vertical), boxes are 42.5% wide/tall.
// Box centers sit at 21.25% and 78.75% of the container in each axis.
function arrowWrapperStyle(direction: ArrowDir): React.CSSProperties {
	const half = LINE_THICKNESS / 2;
	switch (direction) {
		case "right":
			return {
				top: `calc(21.25% - ${half}px)`,
				left: "42.5%",
				width: "15%",
				height: `${LINE_THICKNESS}px`,
			};
		case "down":
			return {
				left: `calc(78.75% - ${half}px)`,
				top: "42.5%",
				height: "15%",
				width: `${LINE_THICKNESS}px`,
			};
		case "left":
			return {
				top: `calc(78.75% - ${half}px)`,
				left: "42.5%",
				width: "15%",
				height: `${LINE_THICKNESS}px`,
			};
		case "up":
			return {
				left: `calc(21.25% - ${half}px)`,
				top: "42.5%",
				height: "15%",
				width: `${LINE_THICKNESS}px`,
			};
	}
}

function transformOrigin(direction: ArrowDir): string {
	switch (direction) {
		case "right":
			return "left center";
		case "down":
			return "center top";
		case "left":
			return "right center";
		case "up":
			return "center bottom";
	}
}

function FlowArrow({
	direction,
	variant,
}: {
	direction: ArrowDir;
	variant: "active" | "fading";
}) {
	const isAxisX = direction === "right" || direction === "left";
	const growClass = isAxisX ? "animate-line-grow-x-immediate" : "animate-line-grow-y";
	const animationClass = variant === "active" ? growClass : "animate-line-fade-out";

	return (
		<div
			className={`absolute pointer-events-none ${animationClass}`}
			style={{
				...arrowWrapperStyle(direction),
				background: COLOR,
				transformOrigin: transformOrigin(direction),
			}}
		/>
	);
}

type EntrySide = "top" | "right" | "bottom" | "left";

// SVG viewBox is sized to the box's 2:1 aspect ratio so percentage-based
// border-radius on the button scales identically to the arcs here.
const VIEW_W = 200;
const VIEW_H = 100;
const STROKE = 1;
const INSET = STROKE / 2;
const CORNER_R = 7.5;

function borderPath(entrySide: EntrySide): string {
	const x1 = INSET;
	const y1 = INSET;
	const x2 = VIEW_W - INSET;
	const y2 = VIEW_H - INSET;
	const r = CORNER_R;
	const mx = (x1 + x2) / 2;
	const my = (y1 + y2) / 2;

	switch (entrySide) {
		case "top":
			return `M ${mx} ${y1} L ${x2 - r} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y1 + r} L ${x2} ${y2 - r} A ${r} ${r} 0 0 1 ${x2 - r} ${y2} L ${x1 + r} ${y2} A ${r} ${r} 0 0 1 ${x1} ${y2 - r} L ${x1} ${y1 + r} A ${r} ${r} 0 0 1 ${x1 + r} ${y1} L ${mx} ${y1}`;
		case "right":
			return `M ${x2} ${my} L ${x2} ${y2 - r} A ${r} ${r} 0 0 1 ${x2 - r} ${y2} L ${x1 + r} ${y2} A ${r} ${r} 0 0 1 ${x1} ${y2 - r} L ${x1} ${y1 + r} A ${r} ${r} 0 0 1 ${x1 + r} ${y1} L ${x2 - r} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y1 + r} L ${x2} ${my}`;
		case "bottom":
			return `M ${mx} ${y2} L ${x1 + r} ${y2} A ${r} ${r} 0 0 1 ${x1} ${y2 - r} L ${x1} ${y1 + r} A ${r} ${r} 0 0 1 ${x1 + r} ${y1} L ${x2 - r} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y1 + r} L ${x2} ${y2 - r} A ${r} ${r} 0 0 1 ${x2 - r} ${y2} L ${mx} ${y2}`;
		case "left":
			return `M ${x1} ${my} L ${x1} ${y1 + r} A ${r} ${r} 0 0 1 ${x1 + r} ${y1} L ${x2 - r} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y1 + r} L ${x2} ${y2 - r} A ${r} ${r} 0 0 1 ${x2 - r} ${y2} L ${x1 + r} ${y2} A ${r} ${r} 0 0 1 ${x1} ${y2 - r} L ${x1} ${my}`;
	}
}

const PATH_LEN = (() => {
	const w = VIEW_W - 2 * INSET;
	const h = VIEW_H - 2 * INSET;
	return 2 * (w - 2 * CORNER_R) + 2 * (h - 2 * CORNER_R) + 2 * Math.PI * CORNER_R;
})();

/** Progressive rounded-rect border that draws clockwise from the entry midpoint. */
function CardBorder({ progress, entrySide }: { progress: number; entrySide: EntrySide }) {
	const p = Math.max(0, Math.min((progress - REACH_FRAC) / (1 - REACH_FRAC), 1));
	const d = borderPath(entrySide);
	const dash = `${p * PATH_LEN} ${PATH_LEN + 1}`;

	return (
		<svg
			className="absolute inset-0 w-full h-full pointer-events-none"
			viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
			preserveAspectRatio="none"
		>
			<path
				d={d}
				fill="none"
				stroke={COLOR}
				strokeWidth={STROKE}
				strokeDasharray={dash}
			/>
		</svg>
	);
}

// Entry side per box (arrow flow 0 → 1 → 2 → 3 → 0).
const BOX_ENTRY: EntrySide[] = ["bottom", "left", "top", "right"];

export function WhatWeDo() {
	const [active, setActive] = useState(0);
	const [progress, setProgress] = useState(0);
	const [activeEdge, setActiveEdge] = useState<number | null>(null);
	const [fadingEdge, setFadingEdge] = useState<number | null>(null);
	const [fadingIdx, setFadingIdx] = useState<number | null>(null);
	const activeRef = useRef(0);
	const startRef = useRef(Date.now());
	const rafRef = useRef<number>(0);
	const fadeEdgeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const fadeBoxTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const goTo = useCallback(
		(idx: number) => {
			const prev = activeRef.current;
			if (prev === idx) return;
			const newEdge = edgeLeadingTo(idx);

			setFadingEdge(activeEdge);
			setActiveEdge(newEdge);
			if (fadeEdgeTimerRef.current) clearTimeout(fadeEdgeTimerRef.current);
			fadeEdgeTimerRef.current = setTimeout(() => setFadingEdge(null), FADE_MS);

			setFadingIdx(prev);
			if (fadeBoxTimerRef.current) clearTimeout(fadeBoxTimerRef.current);
			fadeBoxTimerRef.current = setTimeout(() => setFadingIdx(null), FADE_MS);

			activeRef.current = idx;
			setActive(idx);
			setProgress(0);
			startRef.current = Date.now();
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

	useEffect(() => {
		const tick = () => {
			setProgress(Math.min((Date.now() - startRef.current) / CYCLE_MS, 1));
			rafRef.current = requestAnimationFrame(tick);
		};
		rafRef.current = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(rafRef.current);
	}, [active]);

	return (
		<div id="what-we-do">
			{/* Header */}
			<GridSection columns="1fr" border={false}>
				<GridCell className="px-6 md:px-12 py-10 md:py-14">
					<div className="flex items-center gap-3 mb-6">
						<div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
						<span className="text-[#5C584F] text-xs font-medium uppercase tracking-[0.16em]">
							What we do
						</span>
					</div>
					<h2 className="text-2xl md:text-[36px] md:leading-[44px] font-normal tracking-[-0.48px] text-[#1A1916]">
						Your Pilot Goes Live{" "}
						<span className="font-serif italic text-[#C9A96E] text-[1.1em]">in 4 Steps</span>
					</h2>
				</GridCell>
			</GridSection>

			{/* 2x2 feedback loop — wider/shorter container, shorter boxes with border-draw animation */}
			<GridSection columns="1fr" border={false}>
				<GridCell className="px-6 md:px-12 py-8 md:py-12 flex items-center justify-center">
					<div
						className="relative w-full"
						style={{ maxWidth: "720px", aspectRatio: "2 / 1" }}
					>
						{/* Boxes */}
						{steps.map((step, i) => {
							const isActive = active === i;
							const isFading = fadingIdx === i;
							const cardProgress = isActive ? progress : isFading ? 1 : 0;
							const showBorder = isActive || isFading;
							const positions = [
								{ left: "0%", top: "0%" },
								{ left: "57.5%", top: "0%" },
								{ left: "57.5%", top: "57.5%" },
								{ left: "0%", top: "57.5%" },
							];
							return (
								<button
									key={step.num}
									type="button"
									onClick={() => goTo(i)}
									className="absolute flex items-center justify-center p-3 md:p-4 cursor-pointer transition-colors duration-700 overflow-hidden"
									style={{
										...positions[i],
										width: "42.5%",
										height: "42.5%",
										borderRadius: "4% / 8%",
										boxShadow: "inset 0 0 0 1px rgba(12,12,12,0.06)",
										background: isActive
											? "rgba(201,169,110,0.04)"
											: "transparent",
									}}
								>
									{/* Animated clockwise border draw — only on active/fading, wrapped in opacity container */}
									{showBorder && (
										<div
											className="absolute inset-0 pointer-events-none"
											style={{
												opacity: isActive ? 1 : 0,
												transition: `opacity ${FADE_MS}ms ease`,
											}}
										>
											<CardBorder progress={cardProgress} entrySide={BOX_ENTRY[i]} />
										</div>
									)}

									<h3
										className="text-[1.2rem] md:text-[1.35rem] font-semibold whitespace-nowrap transition-all duration-700 relative"
										style={{
											color: isActive ? "#1A1916" : "#8A857C",
											opacity: isActive ? 1 : 0.55,
										}}
									>
										<span className="font-serif italic text-[#C9A96E] mr-2">{step.num}</span>
										{step.title}
									</h3>
								</button>
							);
						})}

						{/* Arrows between boxes — only active + fading */}
						{edgeDirections.map((dir, i) => (
							<Fragment key={`arrow-${dir}`}>
								{activeEdge === i && (
									<FlowArrow
										key={`active-${dir}-${activeEdge}`}
										direction={dir}
										variant="active"
									/>
								)}
								{fadingEdge === i && fadingEdge !== activeEdge && (
									<FlowArrow
										key={`fading-${dir}`}
										direction={dir}
										variant="fading"
									/>
								)}
							</Fragment>
						))}
					</div>
				</GridCell>
			</GridSection>

			{/* Description */}
			<GridSection columns="1fr" border>
				<GridCell className="px-6 md:px-12 pt-0 pb-8 md:pb-12 min-h-[120px] flex items-center justify-center">
					<p
						key={active}
						className="max-w-5xl text-center text-base md:text-lg text-[#5C584F] leading-relaxed animate-fade-in"
					>
						{steps[active].description}
					</p>
				</GridCell>
			</GridSection>
		</div>
	);
}
