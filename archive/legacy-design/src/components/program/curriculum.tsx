import {
	Section,
	SectionTag,
	SectionHeading,
	DimText,
	BodyText,
	colors,
} from "@/components/landing/primitives";
import type { PhaseData, WeekData } from "@/data/programs";

function GuestCard({ guest, role }: { guest: string; role: string }) {
	return (
		<div className="flex items-start gap-3">
			<img
				src="/assets/framer/47jhKH0AA1f2ZNcovBPcmjTlLM.png"
				alt=""
				className="w-[80px] h-[80px] object-cover shrink-0"
				loading="lazy"
			/>
			<div className="pt-2">
				<h4 className="text-base font-normal text-[#1A1916]">{guest}</h4>
				<p className={`text-sm font-normal ${colors.textBody}`}>
					{role}
				</p>
			</div>
		</div>
	);
}

function WeekCard({ week }: { week: WeekData }) {
	return (
		<div className="flex flex-col md:flex-row gap-4 md:gap-10">
			<div className="min-w-[160px] shrink-0">
				<h4
					className={`text-lg font-normal font-display ${colors.text} tracking-tighter`}
				>
					{week.week}
				</h4>
			</div>
			<div className="flex-1 rounded-2xl bg-landing-card p-5 md:py-5 md:px-7">
				<h3
					className={`font-display text-lg md:text-xl font-medium mb-3 ${colors.text} tracking-tight-lg`}
					style={{ lineHeight: "1.3" }}
				>
					{week.title}
				</h3>
				<BodyText>{week.description}</BodyText>
				{week.guest && week.guestRole && (
					<div className="mt-5">
						<GuestCard guest={week.guest} role={week.guestRole} />
					</div>
				)}
			</div>
		</div>
	);
}

function PhaseHeader({ phase }: { phase: PhaseData }) {
	return (
		<div className="flex overflow-hidden">
			<div className="bg-brand-dark rounded-l-2xl px-5 py-3.5 min-w-[120px] md:min-w-[200px] flex items-center">
				<h3 className="text-lg md:text-2xl font-medium font-display text-[#1A1916] tracking-tight-lg">
					{phase.phase}
				</h3>
			</div>
			<div className="bg-[#0C0C0C]/12 rounded-r-2xl flex-1 flex items-center px-6 md:px-10">
				<h3
					className={`text-lg md:text-2xl font-medium font-display ${colors.text} tracking-tight-lg`}
				>
					{phase.title}
				</h3>
			</div>
		</div>
	);
}

function PhaseBlock({ phase }: { phase: PhaseData }) {
	const hasPhaseHeader = phase.phase && phase.title;
	return (
		<div className="flex flex-col gap-8">
			{hasPhaseHeader && <PhaseHeader phase={phase} />}
			{phase.weeks.map((week) => (
				<WeekCard key={week.week} week={week} />
			))}
		</div>
	);
}

export function Curriculum({
	data,
}: {
	data: {
		heading: string;
		dimHeading?: string;
		subheading: string;
		phases: PhaseData[];
	};
}) {
	return (
		<Section className={`${colors.pageBg} py-10 md:py-14`} id="curriculum">
			<div className="max-w-6xl mx-auto">
				<SectionTag label="Program Agenda" />
				<SectionHeading className="text-2xl md:text-4xl">
					{data.heading}{" "}
					{data.dimHeading && <DimText>{data.dimHeading}</DimText>}
				</SectionHeading>
				<BodyText className="mt-3 max-w-2xl">{data.subheading}</BodyText>

				<div className="mt-10 flex flex-col gap-10">
					{data.phases.map((phase, i) => (
						<PhaseBlock key={phase.phase || i} phase={phase} />
					))}
				</div>
			</div>
		</Section>
	);
}
