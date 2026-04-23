import { useState, useCallback, useRef } from "react";
import { useViewMode, type ViewMode } from "@/contexts/view-mode-context";
import { cn } from "@/lib/utils";
import { Code2, Users } from "lucide-react";

const COLOR_PALETTES = {
	engineer: {
		pixels: [
			"rgba(34, 197, 94, 0.45)",   // primary green
			"rgba(22, 163, 74, 0.35)",   // darker green
			"rgba(74, 222, 128, 0.3)",   // bright green
			"rgba(134, 239, 172, 0.25)", // pale green
		],
		spotlight: { r: 34, g: 197, b: 94 },
		ray: "rgba(34,197,94,0.4)",
		glowBorder: "border-green-500/30",
		glowShadow: "shadow-[0_0_40px_rgba(34,197,94,0.2)]",
	},
	"hiring-manager": {
		pixels: [
			"rgba(207, 150, 17, 0.45)",  // primary gold
			"rgba(180, 130, 10, 0.35)",  // darker gold
			"rgba(220, 175, 50, 0.3)",   // bright gold
			"rgba(235, 200, 100, 0.25)", // pale gold
		],
		spotlight: { r: 207, g: 150, b: 17 },
		ray: "rgba(207,150,17,0.4)",
		glowBorder: "border-yellow-600/30",
		glowShadow: "shadow-[0_0_40px_rgba(207,150,17,0.2)]",
	},
} as const;

export function ViewModeToggle() {
	const { viewMode, setViewMode } = useViewMode();
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [targetMode, setTargetMode] = useState<ViewMode>(viewMode);
	const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const toggleRef = useRef<HTMLDivElement>(null);

	// Canvas dot reveal animation - digital/matrix style
	const animateCanvas = useCallback((originX: number, originY: number, mode: ViewMode) => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const pixels: Array<{
			x: number;
			y: number;
			size: number;
			color: string;
			delay: number;
			flickerOffset: number;
		}> = [];

		// Tight grid for prominent pixel effect
		const spacing = 6;
		const colors = COLOR_PALETTES[mode].pixels;

		for (let x = 0; x < canvas.width; x += spacing) {
			for (let y = 0; y < canvas.height; y += spacing) {
				const distance = Math.sqrt((x - originX) ** 2 + (y - originY) ** 2);
				pixels.push({
					x,
					y,
					size: Math.random() > 0.5 ? 3 : 2, // mix of 2px and 3px pixels
					color: colors[Math.floor(Math.random() * colors.length)],
					delay: distance * 0.8, // wave speed
					flickerOffset: Math.random() * 100,
				});
			}
		}

		let startTime: number | null = null;
		let animationId: number;

		const animate = (timestamp: number) => {
			if (!startTime) startTime = timestamp;
			const elapsed = timestamp - startTime;

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			let activePixels = 0;

			pixels.forEach((pixel) => {
				const adjustedTime = elapsed - pixel.delay;
				const pixelDuration = 800; // Wider band

				if (adjustedTime > 0 && adjustedTime < pixelDuration) {
					activePixels++;

					// Subtle flicker
					const flickerTime = adjustedTime + pixel.flickerOffset;
					const flicker = Math.sin(flickerTime * 0.03) > 0.2 ? 1 : 0.6;

					// Quick fade in, brief hold, fade out
					const progress = adjustedTime / pixelDuration;
					let opacity: number;
					if (progress < 0.15) {
						opacity = progress / 0.15; // fast fade in
					} else if (progress < 0.5) {
						opacity = 1; // hold
					} else {
						opacity = 1 - (progress - 0.5) / 0.5; // fade out
					}

					ctx.fillStyle = pixel.color;
					ctx.globalAlpha = opacity * flicker * 0.9;

					// Draw square pixels for digital feel
					ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);
				}
			});

			ctx.globalAlpha = 1;

			if (elapsed < 2500 || activePixels > 0) {
				animationId = requestAnimationFrame(animate);
			}
		};

		animationId = requestAnimationFrame(animate);

		return () => cancelAnimationFrame(animationId);
	}, []);

	const handleModeChange = useCallback(
		(newMode: ViewMode, event: React.MouseEvent) => {
			if (newMode === viewMode || isTransitioning) return;

			const x = event.clientX;
			const y = event.clientY;
			setSpotlightPos({ x, y });
			setTargetMode(newMode);

			setIsTransitioning(true);
			animateCanvas(x, y, newMode);

			// Change mode at animation midpoint
			setTimeout(() => {
				setViewMode(newMode);
			}, 600);

			// End transition - slower for digital feel
			setTimeout(() => {
				setIsTransitioning(false);
			}, 1800);
		},
		[viewMode, setViewMode, isTransitioning, animateCanvas],
	);

	return (
		<>
			{/* Canvas for dot reveal effect */}
			<canvas
				ref={canvasRef}
				className={cn(
					"fixed inset-0 z-[60] pointer-events-none",
					isTransitioning ? "opacity-100" : "opacity-0",
				)}
				style={{ transition: "opacity 0.3s ease-out" }}
			/>

			{/* Spotlight sweep effect */}
			<div
				className={cn(
					"fixed inset-0 z-[55] pointer-events-none overflow-hidden",
					isTransitioning ? "opacity-100" : "opacity-0",
				)}
				style={{ transition: "opacity 0.2s ease-out" }}
			>
				{/* Main spotlight */}
				<div
					className="absolute w-[600px] h-[600px] animate-spotlight-sweep"
					style={{
						left: spotlightPos.x,
						top: spotlightPos.y,
						transform: "translate(-50%, -50%)",
						background: `
							radial-gradient(
								ellipse 40% 60% at center,
								rgba(${COLOR_PALETTES[targetMode].spotlight.r}, ${COLOR_PALETTES[targetMode].spotlight.g}, ${COLOR_PALETTES[targetMode].spotlight.b}, 0.15) 0%,
								rgba(${COLOR_PALETTES[targetMode].spotlight.r}, ${COLOR_PALETTES[targetMode].spotlight.g}, ${COLOR_PALETTES[targetMode].spotlight.b}, 0.08) 30%,
								transparent 70%
							)
						`,
						filter: "blur(20px)",
					}}
				/>

				{/* Secondary light rays */}
				<div
					className="absolute w-[800px] h-[2px] animate-light-ray"
					style={{
						left: spotlightPos.x,
						top: spotlightPos.y,
						transformOrigin: "left center",
						background: "linear-gradient(90deg, rgba(12, 12, 12, 0.3), transparent)",
					}}
				/>
				<div
					className="absolute w-[800px] h-[2px] animate-light-ray-2"
					style={{
						left: spotlightPos.x,
						top: spotlightPos.y,
						transformOrigin: "left center",
						background: `linear-gradient(90deg, ${COLOR_PALETTES[targetMode].ray}, transparent)`,
					}}
				/>
			</div>

			{/* Blur overlay — only rendered during transition to avoid blocking element inspection */}
			{isTransitioning && (
				<div
					className="fixed inset-0 z-[54] pointer-events-none transition-all duration-500 ease-out backdrop-blur-[2px] bg-black/10"
				/>
			)}

			{/* Toggle component */}
			<div ref={toggleRef} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70]">
				<div
					className={cn(
						"flex items-center gap-4 pl-5 pr-1.5 py-1.5 rounded-full",
						"bg-[#0C0C0C]/[0.03] backdrop-blur-md",
						"border border-[#0C0C0C]/8",
						"shadow-lg shadow-black/20",
						"transition-all duration-300",
						isTransitioning && `scale-105 ${COLOR_PALETTES[targetMode].glowBorder} ${COLOR_PALETTES[targetMode].glowShadow}`,
					)}
				>
					<span className="text-[#1A1916]/40 text-base font-medium">View as:</span>
					<div className="flex items-center gap-1">
						<button
							type="button"
							onClick={(e) => handleModeChange("engineer", e)}
							disabled={isTransitioning}
							className={cn(
								"flex items-center gap-2 px-5 py-2.5 rounded-full text-base font-medium transition-all duration-300",
								viewMode === "engineer"
									? "bg-[#0C0C0C] text-white shadow-lg"
									: "text-[#1A1916]/60 hover:text-[#1A1916] hover:bg-[#0C0C0C]/5",
								isTransitioning && "cursor-wait",
							)}
						>
							<Code2 className="w-5 h-5" />
							<span>Engineer</span>
						</button>
						<button
							type="button"
							onClick={(e) => handleModeChange("hiring-manager", e)}
							disabled={isTransitioning}
							className={cn(
								"flex items-center gap-2 px-5 py-2.5 rounded-full text-base font-medium transition-all duration-300",
								viewMode === "hiring-manager"
									? "bg-[#0C0C0C] text-white shadow-lg"
									: "text-[#1A1916]/60 hover:text-[#1A1916] hover:bg-[#0C0C0C]/5",
								isTransitioning && "cursor-wait",
							)}
						>
							<Users className="w-5 h-5" />
							<span>Hiring Manager</span>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
