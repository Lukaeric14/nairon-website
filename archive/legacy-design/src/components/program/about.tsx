import { Star } from "lucide-react";
import {
	Section,
	SectionTag,
	SectionHeading,
	DimText,
	GlassCard,
	BodyText,
	BulletPoint,
	OutlineButton,
	colors,
} from "@/components/landing/primitives";
import {
	PROGRAM_QUOTE,
	PROGRAM_MISSION,
	PROGRAM_APPROACH,
	PROGRAM_STATS,
} from "@/data/landing";

function QuoteCard() {
	return (
		<div className="relative rounded-2xl overflow-hidden h-full min-h-[300px] md:min-h-[400px]">
			<img
				src={PROGRAM_QUOTE.image}
				alt="BG Image"
				className="absolute inset-0 w-full h-full object-cover"
				loading="lazy"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
			<div className="relative h-full flex flex-col justify-end p-6 md:p-8">
				<p className="text-[#1A1916] text-base md:text-lg leading-relaxed mb-4 md:mb-6">
					{PROGRAM_QUOTE.text}
				</p>
				<div className="flex items-center gap-2">
					<div>
						<span className="text-[#1A1916] font-semibold text-sm md:text-base">
							{PROGRAM_QUOTE.author}
						</span>
						<span className={`${colors.textMuted} ml-1`}>,</span>
					</div>
					<p className={`${colors.textMuted} text-sm md:text-base`}>{PROGRAM_QUOTE.role}</p>
				</div>
			</div>
		</div>
	);
}

function MissionSection() {
	return (
		<div>
			<h4
				className={`text-lg font-semibold mb-6 tracking-tighter ${colors.text}`}
			>
				Our mission
			</h4>
			<div className="space-y-4">
				{PROGRAM_MISSION.map((item, i) => {
					if (typeof item === "string") {
						return (
							<BodyText key={i}>{item}</BodyText>
						);
					}
					return (
						<BodyText key={i}>
							{item.before}
							<strong className="text-[#1A1916] font-bold">
								{item.bold}
							</strong>
							{item.after}
						</BodyText>
					);
				})}
			</div>
			<div className="mt-8">
				<OutlineButton href="/team">Meet our team</OutlineButton>
			</div>
		</div>
	);
}

function ApproachSection() {
	return (
		<div>
			<h4
				className={`text-lg font-semibold mb-6 tracking-tighter ${colors.text}`}
			>
				Our approach
			</h4>
			<div className="space-y-3">
				{PROGRAM_APPROACH.map((item) => (
					<BulletPoint key={item} color="green">
						{item}
					</BulletPoint>
				))}
			</div>
		</div>
	);
}

function StatCard({
	label,
	value,
	suffix,
	sublabel,
}: {
	label: string;
	value: string;
	suffix?: string;
	sublabel: string;
}) {
	return (
		<GlassCard className="p-4 md:p-6 flex flex-col justify-between min-h-[160px] md:min-h-[220px]">
			<h4 className={`text-xs md:text-sm font-medium ${colors.textMuted}`}>
				{label}
			</h4>
			<div className="flex items-end justify-between mt-auto">
				<div className="flex items-baseline gap-1">
					<span className="text-4xl md:text-6xl font-bold text-[#1A1916] leading-none">
						{value}
					</span>
					{suffix && (
						<span className="text-lg md:text-2xl text-[#1A1916]/70 italic">
							{suffix}
						</span>
					)}
				</div>
				<p className={`text-xs md:text-sm text-right ${colors.textMuted}`}>
					{sublabel}
				</p>
			</div>
		</GlassCard>
	);
}

function StatsRow() {
	return (
		<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-8 md:mt-12">
			<StatCard
				label="Duration"
				value={PROGRAM_STATS.duration.value}
				suffix={PROGRAM_STATS.duration.suffix}
				sublabel={PROGRAM_STATS.duration.label}
			/>

			{/* Clients + Partners - green gradient card */}
			<div className="pricing-gradient-green rounded-2xl overflow-hidden p-4 md:p-6 flex flex-col justify-between min-h-[160px] md:min-h-[220px]">
				<div>
					<div className="flex items-center gap-1 mb-1">
						{PROGRAM_STATS.avatars.map((src) => (
							<img
								key={src}
								src={src}
								alt="Avatar"
								className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-black -ml-2 first:ml-0 object-cover"
								loading="lazy"
							/>
						))}
						<span className="text-[#1A1916]/70 text-xs md:text-sm ml-1 font-medium">
							{PROGRAM_STATS.clients.value}
						</span>
					</div>
					<div className="flex items-center gap-0.5 md:gap-1 mb-1">
						{[...Array(5)].map((_, i) => (
							<Star
								key={i}
								className="w-3 h-3 md:w-3.5 md:h-3.5 fill-yellow-400 text-yellow-400"
							/>
						))}
					</div>
					<p className={`text-xs md:text-sm ${colors.textMuted}`}>
						{PROGRAM_STATS.clients.label}
					</p>
				</div>
				<div className="flex items-end justify-between mt-auto">
					<div className="flex items-baseline gap-1">
						<span className="text-4xl md:text-6xl font-bold text-[#1A1916] leading-none">
							{PROGRAM_STATS.partners.value}
						</span>
					</div>
					<p className={`text-xs md:text-sm text-right ${colors.textMuted}`}>
						{PROGRAM_STATS.partners.label}
					</p>
				</div>
			</div>

			<StatCard
				label="Cohort Size"
				value={PROGRAM_STATS.cohortSize.value}
				sublabel={PROGRAM_STATS.cohortSize.label}
			/>

			<StatCard
				label="Work Type"
				value={PROGRAM_STATS.workType.value}
				suffix={PROGRAM_STATS.workType.suffix}
				sublabel={PROGRAM_STATS.workType.label}
			/>
		</div>
	);
}

export function ProgramAbout() {
	return (
		<Section className={colors.pageBg}>
			<SectionTag label="About Nairon" />
			<SectionHeading className="mb-16">
				Inside the <DimText>Nairon AI Bootcamp</DimText>
			</SectionHeading>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<QuoteCard />
				<div className="space-y-8">
					<MissionSection />
					<p className={`text-sm ${colors.textMuted}`}>
						&copy; 2025 Nairon AI Accelerator
					</p>
				</div>
				<ApproachSection />
			</div>

			<StatsRow />
		</Section>
	);
}
