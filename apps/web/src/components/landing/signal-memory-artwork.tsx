import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const ASCII_WIDTH = 96;
const ASCII_HEIGHT = 54;
const ASCII_RAMP = " .:-=+*#%@";
const ASCII_FRAME_COUNT = 14;

function ellipse(x: number, y: number, cx: number, cy: number, rx: number, ry: number) {
	return ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2;
}

function buildAsciiBrainFrame(phase: number) {
	const rows: string[] = [];

	for (let y = 0; y < ASCII_HEIGHT; y++) {
		let row = "";
		const ny = (y / (ASCII_HEIGHT - 1)) * 2 - 1;

		for (let x = 0; x < ASCII_WIDTH; x++) {
			const nx = (x / (ASCII_WIDTH - 1)) * 2 - 1;
			const left = ellipse(nx, ny, -0.34, -0.08, 0.68, 0.62);
			const right = ellipse(nx, ny, 0.35, -0.08, 0.7, 0.62);
			const crown = ellipse(nx, ny, 0.02, -0.42, 0.82, 0.32);
			const base = ellipse(nx, ny, 0.03, 0.22, 0.78, 0.36);
			const stemWidth = 0.14 - Math.max(0, ny - 0.44) * 0.09;
			const stem = ny > 0.28 && ny < 0.96 && Math.abs(nx + 0.02) < stemWidth;
			const brain = left < 1 || right < 1 || crown < 1 || base < 1;
			const notch = ellipse(nx, ny, 0.02, 0.0, 0.075, 0.7) < 1.05 && ny < 0.5;
			const inside = (brain && !notch) || stem;
			const edge =
				Math.min(left, right, crown, base) > 0.88 ||
				(stem && Math.abs(Math.abs(nx + 0.02) - stemWidth) < 0.035);
			const halo = !inside && Math.min(left, right, crown, base) < 1.18;

			if (!(inside || halo)) {
				row += " ";
				continue;
			}

			const fold =
				Math.sin(nx * 18 + ny * 7 + phase) * 0.18 +
				Math.cos(nx * 8 - ny * 15 - phase * 0.8) * 0.16 +
				Math.sin((x + phase * 3) * 0.42) * 0.08;
			const scan = Math.sin((y + phase * 4) * 0.72) * 0.12;
			const hemisphere = Math.abs(nx) < 0.08 && ny < 0.5 ? -0.16 : 0;
			const stemShade = stem ? -0.16 + (1 - ny) * 0.28 : 0;
			const grain = ((x * 17 + y * 31 + Math.round(phase * 11)) % 19) / 95;
			let density = 0.5 - ny * 0.22 + fold + scan + hemisphere + stemShade + grain;

			if (edge) density -= 0.2;
			if (halo) density -= 0.5;

			const rowCut =
				inside &&
				!edge &&
				(y + Math.floor(phase * 3)) % 6 === 0 &&
				Math.sin(nx * 9 + phase) > -0.6;
			if (rowCut) {
				row += density > 0.46 ? "-" : ".";
				continue;
			}

			const index = Math.max(
				0,
				Math.min(ASCII_RAMP.length - 1, Math.round(density * (ASCII_RAMP.length - 1))),
			);
			row += ASCII_RAMP[index];
		}

		rows.push(row.trimEnd());
	}

	return rows.join("\n");
}

const asciiBrainFrames = Array.from({ length: ASCII_FRAME_COUNT }, (_, index) =>
	buildAsciiBrainFrame(index * 0.46),
);

type SignalMemoryArtworkProps = {
	className?: string;
	tone?: "pink" | "blue" | "green";
	compact?: boolean;
};

export function SignalMemoryArtwork({
	className,
	tone = "pink",
	compact = false,
}: SignalMemoryArtworkProps) {
	const [frameIndex, setFrameIndex] = useState(0);
	const accents = {
		pink: {
			text: "text-[#D9367F]",
			shadow: "[text-shadow:0_0_18px_rgba(217,54,127,0.22)]",
			glow: "bg-[#F7B5D3]/45",
			dot: "bg-[#D9367F]",
		},
		blue: {
			text: "text-[#D9367F]",
			shadow: "[text-shadow:0_0_18px_rgba(217,54,127,0.22)]",
			glow: "bg-[#F7B5D3]/45",
			dot: "bg-[#D9367F]",
		},
		green: {
			text: "text-[#D9367F]",
			shadow: "[text-shadow:0_0_18px_rgba(217,54,127,0.22)]",
			glow: "bg-[#F7B5D3]/45",
			dot: "bg-[#D9367F]",
		},
	}[tone];

	useEffect(() => {
		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

		if (reduceMotion.matches) {
			return;
		}

		const interval = window.setInterval(() => {
			setFrameIndex((current) => (current + 1) % asciiBrainFrames.length);
		}, 140);

		return () => window.clearInterval(interval);
	}, []);

	return (
		<div
			aria-hidden="true"
			className={cn(
				"relative overflow-hidden rounded-[8px] border border-[#171612]/10 bg-[#FFF8FB]",
				className,
			)}
		>
			<style>{`
				@keyframes signalAsciiBreathe {
					0%, 100% { transform: translate3d(-50%, -50%, 0) scale(0.985); }
					50% { transform: translate3d(-50%, -50%, 0) scale(1.025); }
				}

				@keyframes signalAsciiScan {
					0% { transform: translateY(-120%); opacity: 0; }
					12% { opacity: 0.5; }
					55% { opacity: 0.16; }
					100% { transform: translateY(120%); opacity: 0; }
				}

				@media (prefers-reduced-motion: reduce) {
					.signal-ascii-brain,
					.signal-ascii-scan {
						animation: none !important;
					}
				}
			`}</style>
			<div className="absolute inset-0 opacity-[0.55] [background-image:linear-gradient(rgba(217,54,127,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(217,54,127,0.08)_1px,transparent_1px)] [background-size:36px_36px]" />
			<div
				className={cn(
					"absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl",
					compact ? "w-[58%]" : "w-[68%]",
					accents.glow,
				)}
			/>
			<div
				className={cn(
					"signal-ascii-brain absolute left-1/2 top-1/2 flex items-center justify-center",
					compact ? "w-[96%]" : "w-[108%]",
				)}
				style={{
					animation: "signalAsciiBreathe 4.8s ease-in-out infinite",
				}}
			>
				<pre
					className={cn(
						"signal-ascii-frame select-none whitespace-pre font-mono font-semibold leading-[0.72]",
						compact
							? "text-[3.8px] sm:text-[4.3px] md:text-[4.8px]"
							: "text-[4.8px] sm:text-[5.4px] md:text-[6px]",
						accents.text,
						accents.shadow,
					)}
				>
					{asciiBrainFrames[frameIndex]}
				</pre>
			</div>
			<div
				className="signal-ascii-scan absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-[#F05A9D]/18 to-transparent"
				style={{
					animation: "signalAsciiScan 4.8s ease-in-out infinite",
				}}
			/>
			<div
				className={cn("absolute bottom-6 left-6 h-2 w-2", accents.dot)}
			/>
			<div
				className={cn(
					"absolute right-8 top-8 h-2 w-2",
					accents.dot,
					"opacity-50",
				)}
			/>
		</div>
	);
}
