import { AnimatedGradient } from "../landing/animated-gradient";

export function HireHero() {
	return (
		<header
			className="relative flex items-center justify-center overflow-hidden h-[250px] md:h-[350px] pt-24 md:pt-[260px] px-6 md:px-10"
		>
			{/* Animated gradient background */}
			<div className="absolute inset-0 z-0">
				<AnimatedGradient variant="gold" />
			</div>
			<div className="relative z-10 w-full max-w-[1440px]">
				<h1
					className="font-semibold text-[#1A1916] text-center text-4xl md:text-7xl lg:text-display-2xl tracking-tight-2xl"
					style={{
						lineHeight: "1",
					}}
				>
					Hiring Nairon Engineers
				</h1>
			</div>
		</header>
	);
}
