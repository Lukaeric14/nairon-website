import { AnimatedGradient } from "./animated-gradient";

export function ContactHero() {
	return (
		<header className="relative h-[340px] flex items-center justify-center overflow-hidden">
			{/* Animated gradient background */}
			<div className="absolute inset-0 z-0">
				<AnimatedGradient />
			</div>

			{/* Large CONTACT text */}
			<h1
				className="relative z-10 text-[#1A1916] font-semibold text-center select-none tracking-hero"
				style={{
					fontSize: "clamp(80px, 12vw, 160px)",
					lineHeight: 0.75,
				}}
			>
				{"CONTACT".split("").map((letter, i) => (
					<span key={i} className="inline-block">
						{letter}
					</span>
				))}
			</h1>
		</header>
	);
}
