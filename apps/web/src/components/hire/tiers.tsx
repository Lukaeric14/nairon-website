import { ArrowUpRight } from "lucide-react";
import { Section, SectionTag, SectionHeading, DimText, GlassCard, colors } from "../landing/primitives";
import { HIRE_TIERS, HIRE_COMPARISON } from "@/data/hire";
import type { HireTier, ComparisonSection } from "@/data/hire";

function TierCard({ tier }: { tier: HireTier }) {
	return (
		<div className="flex flex-col relative">
			{/* "Most Popular" badge above card */}
			{tier.popular && (
				<span className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 text-xs uppercase tracking-wider bg-[#0C0C0C]/24 backdrop-blur-sm text-[#1A1916] px-4 py-1.5 rounded-lg whitespace-nowrap">
					Most Popular
				</span>
			)}
			{/* Top card with image */}
			<div
				className={`${tier.gradient} rounded-t-3xl p-8 pt-10 relative overflow-hidden min-h-[280px] flex flex-col`}
			>
				{/* Background image */}
				<img
					src={tier.image}
					alt=""
					className="absolute inset-0 w-full h-full object-cover opacity-60"
					loading="lazy"
				/>
				<div className="relative z-10 flex flex-col flex-1">
					<span className="text-xs bg-black/30 text-[#1A1916]/80 px-3 py-1 rounded-md w-fit mb-4">
						{tier.badge}
					</span>
					<h3
						className="text-4xl md:text-5xl font-medium text-[#1A1916]"
						style={{ letterSpacing: "-2px" }}
					>
						{tier.name}
					</h3>
					<h4
						className={`text-base font-medium ${colors.textBody} mt-2`}
					>
						{tier.commitment}
					</h4>

					{/* CTA — full width */}
					<a
						href="/bookacall"
						className="flex items-center justify-between bg-[#0C0C0C]/10 border border-[#0C0C0C]/20 text-[#1A1916] font-semibold text-sm px-5 py-3 rounded-xl hover:bg-[#0C0C0C]/20 transition-colors mt-auto"
					>
						Book a hiring call
						<ArrowUpRight className="w-4 h-4" />
					</a>
				</div>
			</div>

			{/* Bottom card */}
			<div
				className="rounded-b-3xl p-8 flex-1"
				style={{ background: tier.bottomGradient }}
			>
				<h4
					className={`text-lg font-semibold tracking-tighter ${colors.text} mb-3`}
				>
					{tier.tagline}
				</h4>
				<p className={`text-sm ${colors.textBody} mb-6`}>{tier.description}</p>

				<div className="space-y-3">
					{tier.features.map((feature) => (
						<div key={feature} className="flex items-start gap-3">
							<div className="w-1 h-6 bg-[#0C0C0C]/12 shrink-0" />
							<p className={`text-sm ${colors.textBody}`}>{feature}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

function ComparisonTable() {
	return (
		<div className="mt-16 overflow-x-auto">
			<GlassCard className="overflow-hidden rounded-2xl min-w-[600px]">
				<table className="w-full">
					{/* Header */}
					<thead>
						<tr className="border-b border-[#0C0C0C]/8">
							<th className={`text-left p-6 text-base font-semibold ${colors.text}`}>
								Features
							</th>
							<th className={`text-center p-6`}>
								<p className={`text-lg font-semibold ${colors.text}`}>Starter</p>
								<p className={`text-sm ${colors.textMuted}`}>1 Hire</p>
							</th>
							<th className={`text-center p-6`}>
								<p className={`text-lg font-semibold ${colors.text}`}>Priority</p>
								<p className={`text-sm ${colors.textMuted}`}>3 Hires</p>
							</th>
							<th className={`text-center p-6`}>
								<p className={`text-lg font-semibold ${colors.text}`}>Exclusive</p>
								<p className={`text-sm ${colors.textMuted}`}>5+ Hires</p>
							</th>
						</tr>
					</thead>
					<tbody>
						{HIRE_COMPARISON.map((section) => (
							<ComparisonSectionRows key={section.title} section={section} />
						))}
						{/* Bottom CTAs */}
						<tr className="border-t border-[#0C0C0C]/8">
							<td className="p-6" />
							<td className="p-6 text-center">
								<a
									href="/bookacall"
									className="inline-flex items-center gap-2 bg-[#0C0C0C]/10 border border-[#0C0C0C]/12 text-[#1A1916] font-semibold text-sm px-4 py-2 rounded-full hover:bg-[#0C0C0C]/15 transition-colors"
								>
									Book a call
									<ArrowUpRight className="w-3 h-3" />
								</a>
							</td>
							<td className="p-6 text-center">
								<a
									href="/bookacall"
									className="inline-flex items-center gap-2 bg-[#0C0C0C]/10 border border-[#0C0C0C]/12 text-[#1A1916] font-semibold text-sm px-4 py-2 rounded-full hover:bg-[#0C0C0C]/15 transition-colors"
								>
									Book a call
									<ArrowUpRight className="w-3 h-3" />
								</a>
							</td>
							<td className="p-6 text-center">
								<a
									href="/bookacall"
									className="inline-flex items-center gap-2 bg-[#0C0C0C]/10 border border-[#0C0C0C]/12 text-[#1A1916] font-semibold text-sm px-4 py-2 rounded-full hover:bg-[#0C0C0C]/15 transition-colors"
								>
									Book a call
									<ArrowUpRight className="w-3 h-3" />
								</a>
							</td>
						</tr>
					</tbody>
				</table>
			</GlassCard>
		</div>
	);
}

function ComparisonSectionRows({ section }: { section: ComparisonSection }) {
	return (
		<>
			{/* Section header */}
			<tr className="border-t border-[#0C0C0C]/8">
				<td
					colSpan={4}
					className={`px-6 py-4 text-sm font-semibold ${colors.text} bg-[#0C0C0C]/[0.02]`}
				>
					{section.title}
				</td>
			</tr>
			{/* Rows */}
			{section.rows.map((row) => (
				<tr key={row.feature} className="border-t border-[#0C0C0C]/5">
					<td className={`px-6 py-4 text-sm ${colors.textBody}`}>{row.feature}</td>
					<td className={`px-6 py-4 text-sm text-center ${colors.textBody}`}>
						{row.starter}
					</td>
					<td className={`px-6 py-4 text-sm text-center ${colors.textBody}`}>
						{row.priority}
					</td>
					<td className={`px-6 py-4 text-sm text-center ${colors.textBody}`}>
						{row.exclusive}
					</td>
				</tr>
			))}
		</>
	);
}

export function HireTiers() {
	return (
		<Section className={colors.pageBg}>
			<SectionTag label="Tiers" />
			<SectionHeading className="mt-4 mb-16">
				Pick your Tier for <DimText>Nairon's AI Cohort</DimText>
			</SectionHeading>

			{/* Tier cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{HIRE_TIERS.map((tier) => (
					<TierCard key={tier.name} tier={tier} />
				))}
			</div>

			{/* Credits note */}
			<GlassCard className="p-6 mt-8">
				<p className={`text-sm ${colors.textBody}`}>
					100% of Hiring credits rollover to subsequent cohorts.
				</p>
			</GlassCard>

			{/* Comparison table */}
			<ComparisonTable />
		</Section>
	);
}
