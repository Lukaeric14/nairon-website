import { DelicateAsciiDots } from "@/components/ui/delicate-ascii-dots";
import { cn } from "@/lib/utils";

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
	const colors = {
		pink: {
			background: "#FFF8FB",
			text: "217, 54, 127",
			glow: "bg-[#F7B5D3]/45",
			grid: "rgba(217,54,127,0.08)",
		},
		blue: {
			background: "#FFF8FB",
			text: "217, 54, 127",
			glow: "bg-[#F7B5D3]/45",
			grid: "rgba(217,54,127,0.08)",
		},
		green: {
			background: "#FFF8FB",
			text: "217, 54, 127",
			glow: "bg-[#F7B5D3]/45",
			grid: "rgba(217,54,127,0.08)",
		},
	}[tone];

	return (
		<div
			aria-hidden="true"
			className={cn(
				"group relative overflow-hidden rounded-[8px] bg-[#FFF8FB]",
				className,
			)}
		>
			<div
				className="absolute inset-0 opacity-[0.65]"
				style={{
					backgroundImage: `linear-gradient(${colors.grid} 1px, transparent 1px), linear-gradient(90deg, ${colors.grid} 1px, transparent 1px)`,
					backgroundSize: compact ? "30px 30px" : "36px 36px",
				}}
			/>
			<div
				className={cn(
					"absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl",
					compact ? "w-[64%]" : "w-[76%]",
					colors.glow,
				)}
			/>
			<DelicateAsciiDots
				backgroundColor={colors.background}
				textColor={colors.text}
				gridSize={compact ? 42 : 54}
				animationSpeed={0.86}
				className="contrast-[1.22] saturate-[1.12]"
				playOnHover
				burstDurationMs={980}
			/>
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_48%_46%,transparent_0%,transparent_46%,rgba(255,248,251,0.34)_74%,rgba(255,248,251,0.72)_100%)]" />
			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FFF8FB] to-transparent" />
		</div>
	);
}
