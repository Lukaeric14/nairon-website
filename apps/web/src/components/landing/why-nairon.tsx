import { useState, useEffect, useCallback, useRef } from "react";
import { GridSection, GridCell, CornerNotches } from "./grid-system";

const points = [
	{
		title: "Automation is not enough",
		description:
			"Automations follow a script. AI employees operate inside a role. They handle messy inputs, bounded decisions, and exceptions while humans stay in control.",
		image: "/backgrounds/pastoral-hills.webp",
	},
	{
		title: "Role-first deployment",
		description:
			"We do not try to make AI your executive team. We place it into a specific business function where the KPI, permissions, and oversight model are clear.",
		image: "/backgrounds/hazy-landscape.webp",
	},
	{
		title: "Operator oversight",
		description:
			"Your human team becomes the operator, not every moving part in the train. They review, direct, and improve the system while repetitive work gets delegated.",
		image: "/backgrounds/rolling-hills.webp",
	},
];

const tools = ["Cursor", "ChatGPT", "Claude Code"];
const TOOL_CYCLE_DURATION = 2500; // ms per tool name
const CYCLE_DURATION = 5000; // ms per card

export function WhyNairon() {
	const [active, setActive] = useState(0);
	const [progress, setProgress] = useState(0);
	const [paused, setPaused] = useState(false);
	const startTimeRef = useRef(Date.now());
	const pausedProgressRef = useRef(0);
	const [activeTool, setActiveTool] = useState(0);

	// Cycle through tool names
	useEffect(() => {
		const timer = setInterval(() => {
			setActiveTool((prev) => (prev + 1) % tools.length);
		}, TOOL_CYCLE_DURATION);
		return () => clearInterval(timer);
	}, []);

	const advance = useCallback(() => {
		setActive((prev) => (prev + 1) % points.length);
		setProgress(0);
		startTimeRef.current = Date.now();
		pausedProgressRef.current = 0;
	}, []);

	// Auto-cycle timer
	useEffect(() => {
		if (paused) return;

		startTimeRef.current = Date.now();
		const remaining = CYCLE_DURATION * (1 - pausedProgressRef.current);

		const timer = setTimeout(() => {
			advance();
		}, remaining);

		return () => clearTimeout(timer);
	}, [active, paused, advance]);

	// Progress animation frame
	useEffect(() => {
		if (paused) return;

		let raf: number;
		const baseProgress = pausedProgressRef.current;
		const start = Date.now();
		const remaining = CYCLE_DURATION * (1 - baseProgress);

		const tick = () => {
			const elapsed = Date.now() - start;
			const p = Math.min(baseProgress + (elapsed / remaining) * (1 - baseProgress), 1);
			setProgress(p);
			if (p < 1) raf = requestAnimationFrame(tick);
		};

		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [active, paused]);

	const handleCardClick = (index: number) => {
		if (index === active) return;
		setActive(index);
		setProgress(0);
		startTimeRef.current = Date.now();
		pausedProgressRef.current = 0;
	};

	const handleMouseEnter = () => {
		setPaused(true);
		pausedProgressRef.current = progress;
	};

	const handleMouseLeave = () => {
		pausedProgressRef.current = progress;
		setPaused(false);
	};

	return (
		<div>
			{/* Title row */}
			<GridSection columns="1fr" border>
				<GridCell className="px-6 md:px-12 py-8 md:py-10">
					<div className="flex items-center gap-3 mb-4">
						<div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
						<span className="text-[#A39E96] text-xs font-medium uppercase tracking-[0.16em]">
							Why this model works
						</span>
					</div>
					<h2 className="text-3xl md:text-[48px] md:leading-[57.6px] font-normal tracking-[-0.48px] text-[#E8E4DE] max-w-3xl">
						Using{" "}
						<span className="inline-block relative font-serif italic text-[#C9A96E]">
							{/* Invisible sizer — longest tool name reserves width */}
							<span className="invisible whitespace-nowrap">{tools.reduce((a, b) => a.length >= b.length ? a : b)}</span>
							{tools.map((tool) => (
								<span
									key={tool}
									className="absolute left-0 top-0 transition-all duration-500 ease-in-out whitespace-nowrap"
									style={{
										opacity: tools[activeTool] === tool ? 1 : 0,
										transform: tools[activeTool] === tool ? "translateY(0)" : "translateY(8px)",
									}}
								>
									{tool}
								</span>
							))}
						</span>
						<br />
						doesn&#8217;t mean you deployed AI employees
					</h2>
				</GridCell>
			</GridSection>

			{/* Mobile: cards first, image second. Desktop: image left + cards right */}
			<GridSection columns="1fr 1fr" border>
				{/* Image — order-2 on mobile (below cards), order-1 on md+ (left) */}
				<GridCell borderRight className="relative min-h-[280px] md:min-h-[480px] overflow-hidden order-2 md:order-1">
					{points.map((point, i) => (
						<img
							key={point.image}
							src={point.image}
							alt=""
							width={800}
							height={800}
							className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
							style={{ opacity: active === i ? 1 : 0 }}
							loading="lazy"
						/>
					))}
					<div
						className="absolute inset-0"
						style={{
							background:
								"linear-gradient(to bottom, rgba(12,12,12,0.1) 0%, rgba(12,12,12,0.25) 100%)",
						}}
					/>
				</GridCell>

				{/* Cards — order-1 on mobile (above image), order-2 on md+ (right) */}
				<GridCell className="flex flex-col order-1 md:order-2">
					{points.map((point, i) => {
						const isActive = active === i;
						const cardProgress = isActive ? progress : i < active ? 1 : 0;

						return (
							<button
								type="button"
								key={point.title}
								className="relative flex-1 px-6 py-6 md:px-12 md:py-10 flex flex-col justify-center text-left transition-colors duration-300 cursor-pointer"
								style={{
									borderBottom:
										i < points.length - 1
											? "var(--guide-width) solid var(--guide-color)"
											: "none",
									background: isActive
										? "rgba(255, 255, 255, 0.03)"
										: "transparent",
								}}
								onClick={() => handleCardClick(i)}
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
							>
								<CornerNotches
									size={10}
									corners={["top-right", "bottom-right"]}
									color={
										isActive
											? "rgba(201, 169, 110, 0.3)"
											: "rgba(255, 255, 255, 0.12)"
									}
								/>

								{/* Gold progress line on the left */}
								<div
									className="absolute left-0 top-0 w-[2px] transition-colors duration-300"
									style={{
										height: `${cardProgress * 100}%`,
										background:
											cardProgress > 0
												? "linear-gradient(to bottom, rgba(201, 169, 110, 0.1), #C9A96E)"
												: "transparent",
									}}
								/>

								{/* Static left border hint for inactive cards */}
								{!isActive && i < active && (
									<div
										className="absolute left-0 top-0 w-[2px] h-full"
										style={{ background: "rgba(201, 169, 110, 0.15)" }}
									/>
								)}

								<h3
									className="text-lg md:text-2xl font-normal mb-2 md:mb-3 transition-colors duration-300"
									style={{
										color: isActive ? "#E8E4DE" : "#A39E96",
									}}
								>
									{point.title}
								</h3>
								<p
									className="text-sm md:text-base leading-relaxed transition-colors duration-300"
									style={{
										color: isActive
											? "rgba(163, 158, 150, 1)"
											: "rgba(163, 158, 150, 0.6)",
									}}
								>
									{point.description}
								</p>
							</button>
						);
					})}
				</GridCell>
			</GridSection>
		</div>
	);
}
