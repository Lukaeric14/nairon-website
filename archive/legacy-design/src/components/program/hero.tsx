import { AnimatedGradient } from "@/components/landing/animated-gradient";
import { PrimaryButton, OutlineButton } from "@/components/landing/primitives";
import type { ProgramHeroData } from "@/data/programs";

export function ProgramHero({ data }: { data: ProgramHeroData }) {
	return (
		<section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
			{/* Background */}
			<div className="absolute inset-0">
				<AnimatedGradient />
			</div>

			{/* Content */}
			<div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
				{/* Tag */}
				<div className="flex items-center justify-center gap-3 mb-6">
					<div className="w-2 h-2 rounded-full bg-green-400" />
					<span className="text-[#1A1916]/70 text-sm md:text-base uppercase tracking-label">
						{data.tag}
					</span>
				</div>

				{/* Heading */}
				<h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-landing-text leading-none tracking-tight-2xl mb-6">
					{data.heading}
				</h1>

				{/* Stat pills */}
				<div className="flex flex-wrap items-center justify-center gap-3 mb-6">
					{data.stats.map((stat) => (
						<div
							key={stat.label}
							className="glass-card bg-[#0C0C0C]/14 border border-[#0C0C0C]/24 rounded-full px-4 py-2 flex items-center gap-2"
						>
							<span className="text-xs text-[#1A1916]/60">
								{stat.label}
							</span>
							<span className="text-sm font-semibold text-landing-text">
								{stat.value}
							</span>
						</div>
					))}
				</div>

				{/* CTAs */}
				<div className="flex items-center justify-center gap-4 mb-6">
					<PrimaryButton
						href={data.primaryCta.href}
						target="_blank"
					>
						{data.primaryCta.label}
					</PrimaryButton>
					<OutlineButton
						href={data.secondaryCta.href}
						className="bg-black/30 hover:bg-black/40"
					>
						{data.secondaryCta.label}
					</OutlineButton>
				</div>

				{/* Subtext */}
				{data.subtext ? (
					<p className="text-sm text-[#1A1916]/40">{data.subtext}</p>
				) : null}
			</div>
		</section>
	);
}
