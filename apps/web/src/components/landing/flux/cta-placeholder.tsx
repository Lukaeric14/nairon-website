import { FLUX_CTA_PLACEHOLDER } from "@/data/flux";
import { LinearGlassCard, FluxSection } from "@/components/landing/flux/primitives";

export function FluxCtaPlaceholder() {
	return (
		<FluxSection className="pb-16 pt-8 md:pb-22 md:pt-12">
			<LinearGlassCard
				className="mx-auto max-w-5xl"
				innerClassName="relative overflow-hidden bg-[linear-gradient(180deg,rgba(16,16,16,0.98)_0%,rgba(8,8,8,0.99)_100%)] px-6 py-10 text-center md:px-10 md:py-14"
			>
				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(102,255,143,0.16),transparent_48%)]" />
				<div className="relative">
					<div className="inline-flex items-center rounded-full border border-[#0C0C0C]/12 bg-[#0C0C0C]/[0.03] px-3 py-1 font-inter text-[11px] uppercase tracking-[0.12em] text-[#1A1916]/62">
						{FLUX_CTA_PLACEHOLDER.badge}
					</div>
					<h2 className="mx-auto mt-5 max-w-[16ch] font-inter text-[36px] font-[540] leading-[1.05] tracking-[-0.03em] text-[#1A1916] md:text-[52px]">
						{FLUX_CTA_PLACEHOLDER.title}
					</h2>
					<p className="mx-auto mt-4 max-w-2xl font-inter text-[16px] leading-[1.55] text-[#1A1916]/56 md:text-[18px]">
						{FLUX_CTA_PLACEHOLDER.description}
					</p>
					<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
						<button
							type="button"
							className="rounded-[12px] border border-[#0C0C0C]/18 bg-[linear-gradient(180deg,rgba(12, 12, 12, 0.16),rgba(12, 12, 12, 0.06))] px-5 py-2.5 font-inter text-[15px] font-[520] text-[#1A1916]"
						>
							{FLUX_CTA_PLACEHOLDER.primary}
						</button>
						<button
							type="button"
							className="rounded-[12px] border border-[#0C0C0C]/12 bg-[#0C0C0C]/[0.02] px-5 py-2.5 font-inter text-[15px] font-[520] text-[#1A1916]/78"
						>
							{FLUX_CTA_PLACEHOLDER.secondary}
						</button>
					</div>
				</div>
			</LinearGlassCard>
		</FluxSection>
	);
}
