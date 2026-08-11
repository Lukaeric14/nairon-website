import {
	Section,
	SectionTag,
	SectionHeading,
	DimText,
	BodyText,
	colors,
} from "@/components/landing/primitives";
import type { StepData } from "@/data/programs";

function PhoneMockup() {
	return (
		<div className="hidden lg:flex justify-center">
			<div className="phone-frame animate-float">
				<div className="phone-notch" />
				{/* Application form mockup */}
				<div className="p-6 pt-12 flex flex-col gap-4">
					<h4 className="text-[#1A1916] text-lg font-semibold text-center mt-4">
						Apply to Nairon
					</h4>
					<p className="text-[#1A1916]/40 text-xs text-center mb-2">
						Start your application
					</p>

					{/* Form fields */}
					{["Full Name", "Email Address", "LinkedIn URL"].map(
						(label) => (
							<div key={label}>
								<label className="text-[#1A1916]/40 text-micro block mb-1">
									{label}
								</label>
								<div className="h-8 rounded-lg bg-[#0C0C0C]/[0.05] border border-[#0C0C0C]/8" />
							</div>
						),
					)}

					{/* Program selector */}
					<div>
						<label className="text-[#1A1916]/40 text-micro block mb-1">
							Choose Program
						</label>
						<div className="h-8 rounded-lg bg-[#0C0C0C]/[0.05] border border-[#0C0C0C]/8 flex items-center px-3">
							<span className="text-[#1A1916]/60 text-micro">
								Residence / Apprenticeship
							</span>
						</div>
					</div>

					{/* Submit button */}
					<div className="mt-2 h-9 rounded-full bg-[#0C0C0C] flex items-center justify-center">
						<span className="text-white text-xs font-semibold">
							Submit Application
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

function TimelineStep({
	step,
	isLast,
}: { step: StepData; isLast: boolean }) {
	return (
		<div className="flex items-start gap-4 relative">
			{/* Dot + line */}
			<div className="flex flex-col items-center">
				<div className="timeline-dot">{step.number}</div>
				{!isLast && (
					<div className="timeline-line flex-1 min-h-[60px]" />
				)}
			</div>

			{/* Content */}
			<div className="pb-8">
				<h3
					className={`text-lg md:text-xl font-medium tracking-tighter ${colors.text}`}
				>
					{step.title}
				</h3>
				<BodyText className="mt-2">{step.description}</BodyText>
			</div>
		</div>
	);
}

export function ApplicationTimeline({
	data,
}: {
	data: {
		heading: string;
		dimHeading?: string;
		steps: StepData[];
		bottomNote: string;
	};
}) {
	return (
		<Section className={`${colors.pageBg} py-10 md:py-14`}>
			<div className="max-w-6xl mx-auto">
				<SectionTag label="Application" />
				<SectionHeading className="text-2xl md:text-4xl">
					{data.heading}{" "}
					{data.dimHeading && <DimText>{data.dimHeading}</DimText>}
				</SectionHeading>

				<div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
					<PhoneMockup />
					<div>
						{data.steps.map((step, i) => (
							<TimelineStep
								key={step.number}
								step={step}
								isLast={i === data.steps.length - 1}
							/>
						))}
					</div>
				</div>

				<p
					className={`mt-8 text-lg font-medium italic ${colors.text}`}
				>
					{data.bottomNote}
				</p>
			</div>
		</Section>
	);
}
