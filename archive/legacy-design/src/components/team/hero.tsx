import { AnimatedGradient } from "../landing/animated-gradient";

export function TeamHero() {
	return (
		<header
			className="relative flex items-center justify-center overflow-hidden h-[250px] md:h-[350px] pt-32 md:pt-[260px] px-6 md:px-10"
		>
			{/* Animated gradient background */}
			<div className="absolute inset-0 z-0">
				<AnimatedGradient />
			</div>
			<div className="relative z-10 w-full max-w-[1440px]">
				<h1
					className="font-semibold text-[#1A1916] text-center text-6xl md:text-display-2xl tracking-tight-2xl"
					style={{ lineHeight: "1" }}
				>
					Team
				</h1>
			</div>
		</header>
	);
}
