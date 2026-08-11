import {
	Section,
	SectionTag,
	SectionHeading,
	DimText,
	BodyText,
	colors,
} from "@/components/landing/primitives";
import type { StatData } from "@/data/programs";

function StatItem({ stat }: { stat: StatData }) {
	return (
		<div className="py-6 border-b border-[#0C0C0C]/8 last:border-b-0">
			<div className="flex items-baseline gap-2">
				<span className="stat-number text-3xl md:text-5xl text-gradient-green">
					{stat.value}
				</span>
				{stat.suffix && (
					<span className="text-lg text-[#1A1916]/40">{stat.suffix}</span>
				)}
			</div>
			<p className="text-sm md:text-base text-[#1A1916]/40 mt-1">
				{stat.label}
			</p>
		</div>
	);
}

export function Outcomes({
	data,
}: {
	data: {
		heading: string;
		dimHeading?: string;
		stats: StatData[];
		description: string[];
	};
}) {
	return (
		<Section className={`${colors.pageBg} py-10 md:py-14`}>
			<div className="max-w-6xl mx-auto">
				<SectionTag label="After the Program" />
				<SectionHeading className="text-2xl md:text-4xl">
					{data.heading}{" "}
					{data.dimHeading && <DimText>{data.dimHeading}</DimText>}
				</SectionHeading>

				<div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
					{/* Stats column */}
					<div>
						{data.stats.map((stat) => (
							<StatItem key={stat.label} stat={stat} />
						))}
					</div>

					{/* Description column */}
					<div className="space-y-4">
						{data.description.map((paragraph) => (
							<BodyText key={paragraph.slice(0, 30)}>
								{paragraph}
							</BodyText>
						))}
					</div>
				</div>
			</div>
		</Section>
	);
}
