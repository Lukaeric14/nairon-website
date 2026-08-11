import {
	Section,
	SectionTag,
	SectionHeading,
	DimText,
	OutlineButton,
	colors,
} from "@/components/landing/primitives";
import { PROGRAM_STEPS, PROGRAM_REVIEW } from "@/data/landing";

function StepItem({
	number,
	title,
}: { number: string; title: string }) {
	return (
		<div className="flex items-center gap-4 md:gap-6 py-4 md:py-6 border-b border-[#0C0C0C]/8">
			<span className={`text-base md:text-lg font-medium ${colors.textMuted}`}>
				{number}
			</span>
			<h3
				className={`text-lg md:text-2xl lg:text-3xl font-medium ${colors.text}`}
				style={{ letterSpacing: "-1px" }}
			>
				{title}
			</h3>
		</div>
	);
}

function ReviewSection() {
	return (
		<div>
			<p className={`text-base md:text-lg leading-relaxed mb-4 md:mb-6 ${colors.textBody}`}>
				{PROGRAM_REVIEW.intro}
				{PROGRAM_REVIEW.boldWords.map((word, i) => (
					<span key={word}>
						<strong className="text-[#1A1916] font-bold">{word}</strong>
						{i < PROGRAM_REVIEW.boldWords.length - 1 ? ", " : ""}
					</span>
				))}
				{PROGRAM_REVIEW.suffix}
				<strong className="text-[#1A1916] font-bold">
					{PROGRAM_REVIEW.boldEnd}
				</strong>{" "}
				{PROGRAM_REVIEW.afterBold}
			</p>

			<ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
				{PROGRAM_REVIEW.criteria.map((item) => (
					<li
						key={item}
						className="flex items-start gap-3"
					>
						<span className="text-[#1A1916]/40 mt-1">&#x2022;</span>
						<p className={`text-sm md:text-base ${colors.textBody}`}>{item}</p>
					</li>
				))}
			</ul>

			<p className={`text-xs md:text-sm ${colors.textMuted}`}>
				&#x23F0; {PROGRAM_REVIEW.responseTime} &#x1F4DE;
			</p>

			<div className="mt-6 md:mt-8">
				<OutlineButton href="https://apply.naironai.com">
					Need Application Help?
				</OutlineButton>
			</div>
		</div>
	);
}

export function HowToGetIn() {
	return (
		<Section className={colors.pageBg}>
			<SectionTag label="Application" />
			<SectionHeading className="mb-10 md:mb-16">
				How to get into <DimText>the Program?</DimText>
			</SectionHeading>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
				<div>
					{PROGRAM_STEPS.map((step) => (
						<StepItem
							key={step.number}
							number={step.number}
							title={step.title}
						/>
					))}
				</div>
				<ReviewSection />
			</div>
		</Section>
	);
}
