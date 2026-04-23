import { FLUX_TRUST_PLACEHOLDER } from "@/data/flux";
import { FluxSection } from "@/components/landing/flux/primitives";

export function FluxTrustPlaceholder() {
	return (
		<FluxSection className="overflow-hidden pb-20 pt-12 md:pb-28 md:pt-18">
			<div className="grid gap-10 border border-[#0C0C0C]/[0.08] p-6 md:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
				<div>
					<div className="inline-flex items-center rounded-full border border-[#0C0C0C]/12 bg-[#0C0C0C]/[0.03] px-3 py-1 font-inter text-[11px] uppercase tracking-[0.12em] text-[#1A1916]/62">
						{FLUX_TRUST_PLACEHOLDER.badge}
					</div>
					<h2 className="mt-5 max-w-[13ch] font-inter text-[38px] font-[540] leading-[1.03] tracking-[-0.03em] text-[#1A1916] md:text-[56px]">
						{FLUX_TRUST_PLACEHOLDER.title}
					</h2>
					<p className="mt-5 max-w-[48ch] font-inter text-[18px] leading-[1.5] text-[#1A1916]/54">
						{FLUX_TRUST_PLACEHOLDER.description}
					</p>

					<div className="mt-9 divide-y divide-white/[0.08] border-y border-[#0C0C0C]/[0.08]">
						{FLUX_TRUST_PLACEHOLDER.rows.map((row) => (
							<div key={row.title} className="grid gap-2 py-5 md:grid-cols-[220px_1fr] md:gap-6">
								<p className="font-inter text-[26px] leading-[1.08] tracking-[-0.02em] text-[#1A1916] md:text-[30px]">
									{row.title}
								</p>
								<p className="font-inter text-[16px] leading-[1.55] text-[#1A1916]/54">{row.copy}</p>
							</div>
						))}
					</div>
				</div>

				<div className="relative min-h-[420px] overflow-hidden border border-[#0C0C0C]/[0.08] bg-[linear-gradient(180deg,rgba(10,10,10,0.98)_0%,rgba(5,5,5,0.98)_100%)]">
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(12, 12, 12, 0.09),transparent_36%),linear-gradient(180deg,rgba(12, 12, 12, 0.04),transparent_30%)]" />
					<div className="absolute left-[10%] top-[8%] h-[84%] w-[44%] border border-[#0C0C0C]/[0.12] bg-[linear-gradient(180deg,rgba(12, 12, 12, 0.03),rgba(12, 12, 12, 0.01))]" />
					<div className="absolute left-[42%] top-[2%] h-[96%] w-[32%] border border-[#0C0C0C]/[0.12] bg-[linear-gradient(180deg,rgba(12, 12, 12, 0.04),rgba(12, 12, 12, 0.01))]" />
					<div className="absolute left-[74%] top-[24%] h-[58%] w-[20%] border border-[#0C0C0C]/[0.12] bg-[linear-gradient(180deg,rgba(12, 12, 12, 0.03),rgba(12, 12, 12, 0.01))]" />
					<div className="absolute bottom-6 left-6 font-mono text-[11px] uppercase tracking-[0.18em] text-[#1A1916]/34">
						zero trust // soc 2 type ii // aes-256 at rest
					</div>
				</div>
			</div>
		</FluxSection>
	);
}
