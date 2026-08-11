import {
	Section,
	SectionTag,
	SectionHeading,
	DimText,
	GlassCard,
	colors,
} from "@/components/landing/primitives";
import { PROGRAM_BENEFIT_CARDS } from "@/data/landing";

function Tag({ label }: { label: string }) {
	return (
		<span
			className={`inline-block text-xs border ${colors.borderInteractive} rounded-full px-3 py-1 text-[#1A1916]/70 mb-4`}
		>
			{label}
		</span>
	);
}

function ExperienceCard() {
	const card = PROGRAM_BENEFIT_CARDS[0];
	return (
		<GlassCard className="p-6 md:p-8 lg:p-10 lg:row-span-2 flex flex-col justify-between">
			<div>
				<Tag label={card.tag} />
				<h3
					className={`text-xl md:text-3xl lg:text-4xl font-medium mt-3 md:mt-4 mb-6 md:mb-8 ${colors.text}`}
					style={{ letterSpacing: "-1.2px" }}
				>
					{card.heading}
				</h3>
			</div>
			<div className="grid grid-cols-3 gap-3 md:gap-4">
				{card.items.map((item) => (
					<div key={item.text}>
						<span className="text-2xl md:text-3xl mb-2 md:mb-3 block text-green-400">
							{item.icon === "home" ? "\u{1F3E0}" : item.icon === "plane" ? "\u{2708}\u{FE0F}" : "\u{1F3E9}"}
						</span>
						<p className={`text-xs md:text-sm ${colors.textBody}`}>{item.text}</p>
					</div>
				))}
			</div>
		</GlassCard>
	);
}

function PremiumAccessCard() {
	const card = PROGRAM_BENEFIT_CARDS[1];
	return (
		<GlassCard className="p-6 md:p-8 lg:p-10">
			<Tag label={card.tag} />
			<h3
				className={`text-lg md:text-xl lg:text-2xl font-semibold mt-2 mb-4 md:mb-6 tracking-tighter ${colors.text}`}
			>
				{card.heading}
			</h3>
			<div className="space-y-2 md:space-y-3">
				{card.items.map((item) => (
					<p key={item} className={`text-sm md:text-base ${colors.textBody}`}>{item}</p>
				))}
			</div>
		</GlassCard>
	);
}

function CommunityCard() {
	const card = PROGRAM_BENEFIT_CARDS[2];
	return (
		<GlassCard className="p-6 md:p-8 lg:p-10">
			<Tag label={card.tag} />
			<h3
				className={`text-lg md:text-xl lg:text-2xl font-semibold mt-2 mb-4 md:mb-6 tracking-tighter ${colors.text}`}
			>
				{card.heading}
			</h3>
			<div className="space-y-2 md:space-y-3">
				{card.items.map((item) => (
					<p key={item} className={`text-sm md:text-base ${colors.textBody}`}>{item}</p>
				))}
			</div>
		</GlassCard>
	);
}

function GuaranteedCard() {
	const card = PROGRAM_BENEFIT_CARDS[3];
	return (
		<div className="pricing-gradient-green rounded-2xl overflow-hidden p-6 md:p-8 lg:p-10 relative">
			<Tag label={card.tag} />
			<h2
				className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#1A1916] mt-3 md:mt-4"
				style={{ letterSpacing: "-2px" }}
			>
				{card.heading}
			</h2>
			<p className={`mt-2 text-sm md:text-base ${colors.textMuted}`}>{card.subtext}</p>
		</div>
	);
}

export function ProgramBenefits() {
	return (
		<Section className={colors.pageBg}>
			<SectionTag label="Application" />
			<SectionHeading className="mb-16">
				Earn Your Place at{" "}
				<DimText>Nairon's AI Bootcamp Today!</DimText>
			</SectionHeading>

			<div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] lg:grid-rows-2 gap-6">
				<ExperienceCard />
				<PremiumAccessCard />
				<CommunityCard />
			</div>
			<div className="mt-6">
				<GuaranteedCard />
			</div>
		</Section>
	);
}
