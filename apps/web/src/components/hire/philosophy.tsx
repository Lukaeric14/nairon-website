import { Section, SectionTag, SectionHeading, DimText, colors } from "../landing/primitives";
import { HIRE_RESUME_QUOTES, HIRE_CANT_DO } from "@/data/hire";

function GoldCheckIcon({ size = 16 }: { size?: number }) {
	return (
		<svg width={size} height={size} viewBox="0 0 16 16" fill="none" className="shrink-0">
			<circle cx="8" cy="8" r="8" fill="#CF9611" fillOpacity="0.2" />
			<path d="M5 8L7 10L11 6" stroke="#CF9611" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

function ResumeQuote({ text }: { text: string }) {
	return (
		<div className="w-fit bg-[#0C0C0C]/[0.06] border border-[#0C0C0C]/10 rounded-full px-5 py-2.5">
			<p className={`text-sm ${colors.textBody}`}>{text}</p>
		</div>
	);
}

function CantDoItem({ text }: { text: string }) {
	return (
		<div className="flex items-center gap-3">
			<GoldCheckIcon size={20} />
			<p className={`text-base ${colors.textBody}`}>{text}</p>
		</div>
	);
}

export function HirePhilosophy() {
	return (
		<Section className={colors.pageBg}>
			<SectionTag label="Our Philosophy" />
			<SectionHeading className="mt-8 mb-12">
				Hiring AI Talent <DimText>Is Broken</DimText>
			</SectionHeading>

			<p className={`text-lg ${colors.textBody} mb-5`}>
				You've seen the resumes.
			</p>
			<div className="flex flex-col items-start gap-3 mb-10">
				{HIRE_RESUME_QUOTES.map((quote) => (
					<ResumeQuote key={quote} text={quote} />
				))}
			</div>

			<p className={`text-lg ${colors.textBody} mb-6`}>
				Then they join your team and can't:
			</p>
			<div className="space-y-5">
				{HIRE_CANT_DO.map((item) => (
					<CantDoItem key={item} text={item} />
				))}
			</div>
		</Section>
	);
}
