import { useState, useEffect, useCallback, useRef } from "react";
import { GridSection, GridCell } from "./grid-system";

const points = [
	{
		title: "A ChatGPT Subscription Isn't Enough",
		description:
			"Most businesses use AI to get information and generate media - but that barely scratches the surface of what AI can do in 2026. It still leaves every repetitive, multi-step workflow in your business still running on human effort.",
	},
	{
		title: "AI Employees Close the Gap",
		description:
			"Our AI employees run on real hardware, operate 24/7, and handle end-to-end work independently. These are the kind of tasks that used to require a full-time hire.",
	},
	{
		title: "The Competitive Edge",
		description:
			"The businesses that build AI infrastructure in 2026 will outpace their competition. They'll run leaner, move faster, and get more done with less overhead.",
	},
];

const CYCLE_MS = 7000;
const FADE_MS = 800;
// How much of the progress cycle is spent "reaching" the box vs "drawing" the border
const REACH_FRAC = 0.12;

function FanLines({ active, fadingIdx }: { active: number; fadingIdx: number | null }) {
	// Card vertical centers (as % of section height). Cards are equal height (1/3 each).
	const cardCenters = [100 / 6, 50, (5 * 100) / 6];
	// Origin: branching point — right side of the title area, vertically centered
	const originX = 52;
	const originY = 50;
	// Target: just past the column boundary (which is at 60% for a 3fr/2fr split)
	const targetX = 60;
	const color = "#C9A96E";
	const thickness = 1.5; // px

	const renderArrow = (cy: number, isActive: boolean, key: string) => {
		const vTop = Math.min(originY, cy);
		const vHeight = Math.abs(cy - originY);
		const hasVertical = vHeight > 0.5;
		// For the vertical segment, it grows from the origin toward the card
		const vOrigin = cy < originY ? "bottom center" : "top center";

		const wrapperClass = isActive
			? "absolute inset-0 pointer-events-none"
			: "absolute inset-0 pointer-events-none animate-line-fade-out";

		return (
			<div key={key} className={wrapperClass}>
				{/* Vertical segment — grows from origin toward card's Y */}
				{hasVertical && (
					<div
						className={`absolute ${isActive ? "animate-line-grow-y" : ""}`}
						style={{
							left: `${originX}%`,
							top: `${vTop}%`,
							width: `${thickness}px`,
							marginLeft: `-${thickness / 2}px`,
							height: `${vHeight}%`,
							background: color,
							transformOrigin: vOrigin,
						}}
					/>
				)}
				{/* Horizontal segment — grows from origin X to target X at the card's Y */}
				<div
					className={`absolute ${isActive ? (hasVertical ? "animate-line-grow-x" : "animate-line-grow-x-immediate") : ""}`}
					style={{
						left: `${originX}%`,
						top: `${cy}%`,
						width: `${targetX - originX}%`,
						height: `${thickness}px`,
						marginTop: `-${thickness / 2}px`,
						background: color,
						transformOrigin: "left center",
					}}
				/>
			</div>
		);
	};

	return (
		<>
			{/* Subtle origin marker — a small filled circle */}
			<div
				className="absolute z-10"
				style={{
					left: `${originX}%`,
					top: `${originY}%`,
					transform: "translate(-50%, -50%)",
					width: "5px",
					height: "5px",
					borderRadius: "50%",
					background: color,
				}}
			/>
			{/* Faint origin halo for a softer feel */}
			<div
				className="absolute"
				style={{
					left: `${originX}%`,
					top: `${originY}%`,
					transform: "translate(-50%, -50%)",
					width: "14px",
					height: "14px",
					borderRadius: "50%",
					background: color,
					opacity: 0.15,
				}}
			/>

			{/* Active arrow — shoots out from the origin */}
			{cardCenters.map((cy, i) =>
				i === active ? renderArrow(cy, true, `active-${i}-${active}`) : null,
			)}

			{/* Fading arrow — stays drawn while opacity fades out */}
			{cardCenters.map((cy, i) =>
				i === fadingIdx && i !== active
					? renderArrow(cy, false, `fading-${i}`)
					: null,
			)}
		</>
	);
}

function CardBorder({ progress }: { progress: number }) {
	const p = Math.max(0, Math.min((progress - REACH_FRAC) / (1 - REACH_FRAC), 1));

	const top    = Math.min(p / 0.25, 1) * 100;
	const right  = Math.max(Math.min((p - 0.25) / 0.25, 1), 0) * 100;
	const bottom = Math.max(Math.min((p - 0.50) / 0.25, 1), 0) * 100;
	const left   = Math.max(Math.min((p - 0.75) / 0.25, 1), 0) * 100;

	const c = "#C9A96E";

	return (
		<>
			<div className="absolute top-0 left-0 h-[1.5px] pointer-events-none" style={{ width: `${top}%`, background: c, transition: "none" }} />
			<div className="absolute top-0 right-0 w-[1.5px] pointer-events-none" style={{ height: `${right}%`, background: c, transition: "none" }} />
			<div className="absolute bottom-0 right-0 h-[1.5px] pointer-events-none" style={{ width: `${bottom}%`, background: c, transition: "none" }} />
			<div className="absolute bottom-0 left-0 w-[1.5px] pointer-events-none" style={{ height: `${left}%`, background: c, transition: "none" }} />
		</>
	);
}

export function WhyNairon() {
	const [active, setActive] = useState(0);
	const [progress, setProgress] = useState(0);
	const [fadingIdx, setFadingIdx] = useState<number | null>(null);
	const activeRef = useRef(0);
	const startRef = useRef(Date.now());
	const rafRef = useRef<number>(0);
	const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const goTo = useCallback((idx: number) => {
		const prev = activeRef.current;
		if (prev !== idx) {
			setFadingIdx(prev);
			if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
			fadeTimerRef.current = setTimeout(() => setFadingIdx(null), FADE_MS);
		}
		activeRef.current = idx;
		setActive(idx);
		setProgress(0);
		startRef.current = Date.now();
	}, []);

	const advance = useCallback(() => {
		goTo((activeRef.current + 1) % points.length);
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
		<div className="relative">
			{/* Unified 2-column layout: title on left (wider), cards on right (narrower) */}
			<GridSection columns="3fr 2fr" border>
				{/* Left — title */}
				<GridCell borderRight className="relative overflow-hidden flex flex-col justify-center">
					<div className="relative px-6 md:px-12 py-10 md:py-16">
						<div className="flex items-center gap-3 mb-6">
							<div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
							<span className="text-[#5C584F] text-xs font-medium uppercase tracking-[0.16em]">
								The problem we see
							</span>
						</div>
						<h2 className="text-2xl md:text-[36px] md:leading-[44px] font-normal tracking-[-0.48px] text-[#1A1916]">
							1 in 5 Businesses{" "}
							<span className="font-serif italic text-[#C9A96E] text-[1.1em]">Use AI in 2026</span>
							<br />
							Only 1 in 100 to its{" "}
							<span className="font-serif italic text-[#C9A96E] text-[1.1em]">Full Potential</span>
						</h2>
					</div>
				</GridCell>

				{/* Right — stacked cards */}
				<GridCell className="flex flex-col">
					{points.map((point, i) => {
						const isActive = active === i;
						const isFading = fadingIdx === i;
						// When fading, freeze progress at 1 so the fully-drawn border fades out
						const cardProgress = isActive ? progress : isFading ? 1 : 0;
						const showBorder = isActive || isFading;

						return (
							<button
								type="button"
								key={point.title}
								onClick={() => goTo(i)}
								className="relative flex-1 px-8 md:px-10 py-10 md:py-14 text-left transition-colors duration-700 cursor-pointer overflow-hidden flex items-center justify-start"
								style={{
									borderBottom:
										i < points.length - 1
											? "var(--guide-width) solid var(--guide-color)"
											: "none",
									background: isActive
										? "rgba(201,169,110,0.03)"
										: "transparent",
								}}
							>
								{/* Animated border drawing — wrapped in opacity container for fade-out */}
								{showBorder && (
									<div
										className="absolute inset-0 pointer-events-none"
										style={{
											opacity: isActive ? 1 : 0,
											transition: `opacity ${FADE_MS}ms ease`,
										}}
									>
										<CardBorder progress={cardProgress} />
									</div>
								)}

								<div
									className="w-full transition-all duration-500"
									style={{
										opacity: isActive ? 1 : 0.35,
										transform: isActive ? "scale(1)" : "scale(0.97)",
										transformOrigin: "center left",
									}}
								>
									<h3 className="text-base md:text-[17px] font-semibold text-[#1A1916] mb-3 leading-snug whitespace-nowrap">
										<span className="text-[#C9A96E] mr-2">{i + 1}.0</span>
										{point.title}
									</h3>
									<p className="text-sm text-[#5C584F] leading-relaxed">
										{point.description}
									</p>
								</div>
							</button>
						);
					})}
				</GridCell>
			</GridSection>

			{/* Fan of arrows emanating from the title area out to each card — only active arrow visible */}
			<div className="hidden md:block absolute inset-0 pointer-events-none z-10">
				<FanLines active={active} fadingIdx={fadingIdx} />
			</div>
		</div>
	);
}
