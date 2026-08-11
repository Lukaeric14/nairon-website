import { BarChart3, Lightbulb, Trophy, Wrench } from "lucide-react";
import { FLUX_SHAREABLE_REPORTS } from "@/data/flux";
import { LinearGlassCard, FluxSection } from "@/components/landing/flux/primitives";

const FEATURE_ICONS = [BarChart3, Wrench, Lightbulb, Trophy] as const;

function ReportBrowserMock() {
	const { report } = FLUX_SHAREABLE_REPORTS;

	return (
		<LinearGlassCard
			className="relative h-full shadow-[0_36px_90px_rgba(0,0,0,0.62)]"
			innerClassName="relative h-full overflow-hidden border-[#0C0C0C]/[0.06] bg-[linear-gradient(180deg,rgba(10,10,10,0.98)_0%,rgba(6,6,7,0.98)_100%)]"
		>
			<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,transparent_44%,rgba(12, 12, 12, 0.08)_100%)]" />
			<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(12, 12, 12, 0.03),transparent_38%)]" />

			<div className="relative flex items-center gap-3 border-b border-[#0C0C0C]/[0.07] bg-[linear-gradient(180deg,rgba(12, 12, 12, 0.04),rgba(12, 12, 12, 0.01))] px-4 py-3 md:px-5">
				<div className="flex items-center gap-2.5">
					<span className="size-3 rounded-full bg-[#ff5f57]" />
					<span className="size-3 rounded-full bg-[#febc2e]" />
					<span className="size-3 rounded-full bg-[#28c840]" />
				</div>
				<div className="min-w-0 flex-1 rounded-[8px] border border-[#0C0C0C]/[0.07] bg-[#0C0C0C]/[0.05] px-3 py-1.5 font-mono text-[12px] text-[#1A1916]/52 md:text-[13px]">
					<p className="truncate">{FLUX_SHAREABLE_REPORTS.url}</p>
				</div>
				<button
					type="button"
					className="rounded-[8px] border border-[#0C0C0C]/[0.08] bg-[#0C0C0C]/[0.03] px-3 py-1.5 font-inter text-[13px] text-[#1A1916]/55"
				>
					Share
				</button>
			</div>

			<div className="relative space-y-4 px-4 pb-5 pt-5 md:px-5 md:pb-6">
				<p className="font-inter text-[11px] uppercase tracking-[0.12em] text-[#1A1916]/42">Hackathon report</p>
				<div>
					<h3 className="font-inter text-[28px] font-[540] leading-none tracking-[-0.03em] text-[#1A1916]/92 md:text-[34px]">
						{report.title}
					</h3>
					<p className="mt-1.5 font-inter text-[14px] text-[#1A1916]/54">Agent: {report.agent}</p>
				</div>

				<div className="flex items-end gap-3 border-b border-[#0C0C0C]/[0.07] pb-5">
					<p className="font-inter text-[54px] font-[540] leading-[0.86] tracking-[-0.04em] text-[#1A1916]/92 md:text-[60px]">
						{report.score}
					</p>
					<p className="pb-1.5 font-inter text-[24px] tracking-[-0.02em] text-[#1A1916]/56">/{report.maxScore}</p>
				</div>

				<div className="grid grid-cols-2 gap-y-4 md:grid-cols-4">
					{report.stats.map((item) => (
						<div key={item.label}>
							<p className="font-inter text-[30px] leading-none tracking-[-0.02em] text-[#1A1916]/90 md:text-[34px]">
								{item.value}
							</p>
							<p className="mt-1 font-inter text-[12px] text-[#1A1916]/40">{item.label}</p>
						</div>
					))}
				</div>

				<div className="space-y-2.5 border-t border-[#0C0C0C]/[0.07] pt-4">
					{report.metrics.map((item) => (
						<div key={item.label} className="grid grid-cols-[104px_1fr_24px] items-center gap-2.5">
							<p className="font-inter text-[12px] text-[#1A1916]/56 md:text-[13px]">{item.label}</p>
							<div className="h-2 overflow-hidden rounded-full bg-[#0C0C0C]/[0.06]">
								<div className={`h-full rounded-full ${item.tone}`} style={{ width: `${item.value}%` }} />
							</div>
							<p className="text-right font-inter text-[12px] text-[#1A1916]/58">{item.value}</p>
						</div>
					))}
				</div>

				<div className="grid gap-3 border-t border-[#0C0C0C]/[0.07] pt-4 md:grid-cols-2">
					<div>
						<p className="font-inter text-[11px] uppercase tracking-[0.08em] text-[#1A1916]/36">MCP servers (10)</p>
						<div className="mt-2 flex flex-wrap gap-2">
							{report.mcp.map((tag) => (
								<span
									key={tag}
									className="rounded-[6px] border border-[#2d62b4]/45 bg-[#123361]/35 px-2 py-1 font-mono text-[12px] text-[#7bb5ff]"
								>
									{tag}
								</span>
							))}
						</div>
					</div>

					<div>
						<p className="font-inter text-[11px] uppercase tracking-[0.08em] text-[#1A1916]/36">Skills (9)</p>
						<div className="mt-2 flex flex-wrap gap-2">
							{report.skills.map((tag) => (
								<span
									key={tag}
									className="rounded-[6px] border border-[#6f48b7]/45 bg-[#351c57]/38 px-2 py-1 font-mono text-[12px] text-[#c59bff]"
								>
									{tag}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
		</LinearGlassCard>
	);
}

function ReportFeatureList() {
	return (
		<div className="space-y-3 lg:self-center">
			{FLUX_SHAREABLE_REPORTS.features.map((feature, index) => {
				const Icon = FEATURE_ICONS[index];
				return (
					<LinearGlassCard
						key={feature.title}
						className="shadow-[0_18px_48px_rgba(0,0,0,0.3)]"
						innerClassName="relative overflow-hidden border-[#0C0C0C]/[0.06] bg-[linear-gradient(180deg,rgba(14,14,15,0.95),rgba(9,9,10,0.96))] p-3.5 md:p-4"
					>
						<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(12, 12, 12, 0.04),transparent_38%)]" />
						<div className="relative flex items-start gap-4">
							<div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] border border-[#0C0C0C]/[0.08] bg-[#0C0C0C]/[0.03] text-[#1A1916]/72">
								<Icon className="size-3.5" />
							</div>
							<div>
								<h3 className="font-inter text-[18px] font-[530] leading-[1.14] tracking-[-0.02em] text-[#1A1916] md:text-[21px]">
									{feature.title}
								</h3>
								<p className="mt-1.5 max-w-[44ch] font-inter text-[14px] leading-[1.5] text-[#1A1916]/52">
									{feature.description}
								</p>
							</div>
						</div>
					</LinearGlassCard>
				);
			})}
		</div>
	);
}

export function FluxReports() {
	return (
		<FluxSection className="overflow-hidden pb-20 pt-8 md:pb-26 md:pt-12">
			<div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-end md:gap-10">
				<div>
					<div className="inline-flex items-center rounded-full border border-[#0C0C0C]/12 bg-[#0C0C0C]/[0.03] px-3 py-1 font-inter text-[11px] uppercase tracking-[0.12em] text-[#1A1916]/65">
					{FLUX_SHAREABLE_REPORTS.badge}
					</div>
					<h2 className="mt-5 max-w-[22ch] text-balance font-inter text-[34px] font-[530] leading-[1.12] tracking-[-0.022em] text-[#1A1916] md:text-[42px]">
						{FLUX_SHAREABLE_REPORTS.title}
					</h2>
				</div>
			</div>

			<div className="relative mt-10 md:mt-12">
				<div className="grid gap-6 pb-0 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-center">
					<div>
						<ReportBrowserMock />
					</div>
					<ReportFeatureList />
				</div>
			</div>

		</FluxSection>
	);
}
