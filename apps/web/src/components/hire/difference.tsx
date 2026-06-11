import { ArrowUpRight } from "lucide-react";
import {
	Section,
	SectionTag,
	SectionHeading,
	DimText,
	GlassCard,
	colors,
} from "../landing/primitives";
import { HIRE_CAPABILITIES } from "@/data/hire";

function GoldCheckCircle() {
	return (
		<svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="shrink-0">
			<circle cx="20" cy="20" r="20" fill="#CF9611" fillOpacity="0.1" />
			<circle cx="20" cy="20" r="10" fill="#CF9611" fillOpacity="0.3" />
			<path d="M15 20L18.75 23.75L25 16.25" stroke="#CF9611" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

function CapabilityCard({
	number,
	title,
	description,
}: { number: string; title: string; description: string }) {
	return (
		<GlassCard className="p-8 md:p-10 relative overflow-hidden">
			{/* Large background number */}
			<span
				className="absolute top-4 right-6 text-display-2xl font-bold leading-none text-amber-600/20 select-none pointer-events-none tracking-tight-2xl"
			>
				{number}
			</span>

			{/* Icon */}
			<div className="relative z-10">
				<GoldCheckCircle />
				<h4
					className={`text-xl font-semibold ${colors.text} mt-6 mb-3 tracking-tighter`}
				>
					→ {title}
				</h4>
				<p className={`text-sm leading-relaxed ${colors.textBody}`}>{description}</p>
			</div>
		</GlassCard>
	);
}

function BeforeAfterComparison() {
	return (
		<div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mt-16">
			{/* Before */}
			<GlassCard className="p-8 text-center flex-1 w-full">
				<p className="text-xs uppercase tracking-widest text-amber-400/60 mb-3">Before</p>
				<h4
					className={`text-2xl font-semibold ${colors.text} mb-2 tracking-tighter`}
				>
					Experienced Engineers
				</h4>
				<p className={`text-sm ${colors.textBody}`}>
					Backend, frontend, infra. Already shipping code in production
				</p>
			</GlassCard>

			{/* Arrow / 10 Weeks */}
			<div className="flex items-center gap-4 shrink-0">
				<div className="w-10 h-[2px] bg-amber-500/40 hidden md:block" />
				<span
					className="text-xs uppercase tracking-widest text-amber-400 font-semibold px-4 py-2 border border-amber-500/30 rounded-full"
				>
					10 weeks
				</span>
				<div className="w-10 h-[2px] bg-amber-500/40 hidden md:block" />
			</div>

			{/* After — gold gradient */}
			<div className="flex-1 w-full rounded-2xl p-8 text-center bg-gradient-to-br from-amber-600/50 via-amber-700/35 to-amber-900/25 border border-amber-500/30">
				<p className="text-xs uppercase tracking-widest text-amber-400 mb-3">After</p>
				<h4
					className={`text-2xl font-semibold ${colors.text} mb-2 tracking-tighter`}
				>
					AI-First Engineers
				</h4>
				<p className={`text-sm ${colors.textBody}`}>
					Production AI systems, architectural decisions, stakeholder communication
				</p>
			</div>
		</div>
	);
}

export function HireDifference() {
	return (
		<Section className={colors.pageBg}>
			{/* Header */}
			<SectionTag label="Nairon Difference" />
			<SectionHeading className="mt-4 mb-12">
				What makes <DimText>Nairon's Engineers Different?</DimText>
			</SectionHeading>

			{/* Text block with amber left border */}
			<div className="border-l-2 border-amber-500/40 pl-6 mb-6 max-w-3xl">
				<p className={`text-lg ${colors.text} mb-1`}>
					Our 10-week program is designed to be failed.{" "}
					<span className="text-amber-400">99% of applicants don't make it in.</span>
				</p>
				<p className={`text-base ${colors.textBody} mt-3`}>
					Of those who do, we push them through the most intensive AI engineering
					training outside of Big Tech.
				</p>
			</div>

			{/* Second text line with CTA */}
			<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
				<p className={`text-lg ${colors.text}`}>
					They're not beginners learning AI.{" "}
					<span className="text-amber-400">
						They're experienced engineers becoming AI-first.
					</span>
				</p>
				<a
					href="/bookacall"
					className="inline-flex items-center gap-2 bg-[#0C0C0C]/10 border border-[#0C0C0C]/12 text-[#1A1916] font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-[#0C0C0C]/15 transition-colors shrink-0"
				>
					Meet the Engineers
					<ArrowUpRight className="w-4 h-4" />
				</a>
			</div>

			{/* Capability cards */}
			<p className={`text-xl font-medium ${colors.text} mb-8`}>
				Every Nairon graduate can:
			</p>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{HIRE_CAPABILITIES.map((cap) => (
					<CapabilityCard
						key={cap.number}
						number={cap.number}
						title={cap.title}
						description={cap.description}
					/>
				))}
			</div>

			{/* Note */}
			<GlassCard className="p-6 mt-8">
				<p className={`text-sm leading-relaxed ${colors.textBody}`}>
					We're looking for engineers who've shipped code to production and understand
					the full development lifecycle. Experience with real users, deployment, and
					maintenance helps you get the most from the program.
				</p>
			</GlassCard>

			{/* Before / After */}
			<BeforeAfterComparison />

			{/* Bottom CTA */}
			<div className="flex justify-center mt-12">
				<a
					href="/bookacall"
					className="inline-flex items-center gap-2 bg-[#0C0C0C]/10 border border-[#0C0C0C]/12 text-[#1A1916] font-semibold text-base px-6 py-3 rounded-full hover:bg-[#0C0C0C]/15 transition-colors"
				>
					Meet the Engineers
					<ArrowUpRight className="w-4 h-4" />
				</a>
			</div>
		</Section>
	);
}
