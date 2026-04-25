import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionTag, SectionHeading, DimText, colors } from "../landing/primitives";
import { HIRE_FAQ_ITEMS } from "@/data/hire";

function PlusIcon({ isOpen }: { isOpen: boolean }) {
	return (
		<div className="w-9 h-9 rounded-full bg-[#0C0C0C]/12 flex items-center justify-center shrink-0 relative">
			{/* Horizontal bar */}
			<div className="absolute w-3.5 h-[2px] bg-landing-text rounded-full" />
			{/* Vertical bar (hidden when open) */}
			<div
				className="absolute w-[2px] h-3.5 bg-landing-text rounded-full transition-transform duration-200"
				style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
			/>
		</div>
	);
}

function FAQItem({
	question,
	answer,
	isOpen,
	onToggle,
}: {
	question: string;
	answer: string;
	isOpen: boolean;
	onToggle: () => void;
}) {
	return (
		<div
			className="rounded-3xl overflow-hidden transition-colors cursor-pointer bg-landing-card p-6"
			onClick={onToggle}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") onToggle();
			}}
			role="button"
			tabIndex={0}
		>
			<div className="flex items-center justify-between gap-4">
				<h4
					className={`text-base font-medium ${colors.text}`}
					style={{ letterSpacing: "-0.3px" }}
				>
					{question}
				</h4>
				<PlusIcon isOpen={isOpen} />
			</div>
			{isOpen && (
				<div className="mt-4">
					<p className={`text-sm leading-relaxed ${colors.textBody}`}>{answer}</p>
				</div>
			)}
		</div>
	);
}

export function HireFAQ() {
	const [openIndex, setOpenIndex] = useState(0);

	return (
		<Section className={colors.pageBg}>
			<div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16">
				{/* Left: Heading */}
				<div>
					<SectionTag label="Questions" />
					<SectionHeading className="mt-4">
						All the Important Details Before Hiring from{" "}
						<DimText>Nairon's AI Bootcamp in Dubai, UAE</DimText>
					</SectionHeading>
					<a
						href="/bookacall"
						className={`inline-flex items-center gap-2 text-sm ${colors.textBody} hover:text-[#1A1916] transition-colors mt-8`}
					>
						Got more questions? Speak to a Partnership Manager
						<ArrowUpRight className="w-4 h-4" />
					</a>
				</div>

				{/* Right: Accordion */}
				<div className="space-y-3">
					{HIRE_FAQ_ITEMS.map((item, i) => (
						<FAQItem
							key={item.question}
							question={item.question}
							answer={item.answer}
							isOpen={openIndex === i}
							onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
						/>
					))}
				</div>
			</div>
		</Section>
	);
}
