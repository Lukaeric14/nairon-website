import { FLUX_WHAT_WE_TRACK } from "@/data/flux";
import { LinearGlassCard, FluxSection } from "@/components/landing/flux/primitives";

function CyclesMock() {
	return (
		<LinearGlassCard
			className="relative mt-8 overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
			innerClassName="relative overflow-hidden border-[#0C0C0C]/[0.06] bg-[linear-gradient(165deg,rgba(16,16,16,0.98)_0%,rgba(11,11,11,0.98)_100%)] p-4 md:p-5"
		>
			<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(155deg,rgba(12, 12, 12, 0.07),transparent_35%)]" />
			<p className="font-inter text-[20px] font-[520] leading-none tracking-[-0.02em] text-[#1A1916]/90 md:text-[22px]">Cycle 55</p>
			<div className="mt-3 flex flex-wrap items-center gap-3 font-inter text-[12px] text-[#1A1916]/56 md:text-[13px]">
				<span className="inline-flex items-center gap-2">
					<span className="h-2.5 w-2.5 rounded-[2px] bg-[#0C0C0C]/65" />
					Scope
				</span>
				<span className="inline-flex items-center gap-2">
					<span className="h-2.5 w-2.5 rounded-[2px] bg-[#d3ad2f]" />
					Started
				</span>
				<span className="inline-flex items-center gap-2">
					<span className="h-2.5 w-2.5 rounded-[2px] bg-[#5967ff]" />
					Completed
				</span>
			</div>

			<svg className="mt-5 h-[145px] w-full md:h-[160px]" viewBox="0 0 980 260" fill="none" preserveAspectRatio="none">
				<path d="M30 208C158 210 236 176 332 146C414 120 505 130 590 102C680 73 789 56 951 55" stroke="rgba(12, 12, 12, 0.35)" strokeWidth="4" />
				<path d="M30 230C150 176 242 186 336 156C440 123 506 132 604 112C688 94 810 76 951 75" stroke="#d3ad2f" strokeWidth="4" />
				<path d="M30 236C154 214 220 207 322 180C423 154 524 156 602 136C686 116 804 102 951 102" stroke="#5967ff" strokeWidth="4" />
				<path d="M640 118C676 95 710 74 748 62" stroke="#5967ff" strokeWidth="4" strokeDasharray="6 18" />
			</svg>
			<div className="mt-1 flex items-center justify-between font-inter text-[11px] text-[#1A1916]/25 md:text-[12px]">
				<span>Apr 22</span>
				<span>Apr 29</span>
				<span>May 6</span>
			</div>
		</LinearGlassCard>
	);
}

function TriageMock() {
	return (
		<LinearGlassCard
			className="relative mt-8 overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
			innerClassName="relative overflow-hidden border-[#0C0C0C]/[0.06] bg-[linear-gradient(165deg,rgba(16,16,16,0.98)_0%,rgba(11,11,11,0.98)_100%)] p-4 md:p-5"
		>
			<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(155deg,rgba(12, 12, 12, 0.07),transparent_35%)]" />
			<p className="font-inter text-[20px] font-[520] leading-none tracking-[-0.02em] text-[#1A1916]/90 md:text-[22px]">Triage</p>
			<div className="relative mt-4 space-y-3">
				<div className="rounded-[10px] border border-[#0C0C0C]/[0.08] bg-[#0C0C0C]/[0.02] px-3.5 py-2.5">
					<p className="font-inter text-[13px] leading-[1.3] text-[#1A1916]/58 md:text-[14px]">Users report unexpected rate limiting</p>
					<p className="mt-1 font-inter text-[12px] text-[#1A1916]/42 md:text-[13px]">tom</p>
				</div>
				<p className="font-inter text-[13px] text-[#1A1916]/38 md:text-[14px]">RangeError: Index 0 out of range</p>
				<p className="font-inter text-[12px] text-[#1A1916]/32 md:text-[13px]">romain</p>
				<p className="font-inter text-[13px] text-[#1A1916]/38 md:text-[14px]">Pressing "Enter" quickly when logging in via email...</p>
				<p className="font-inter text-[12px] text-[#1A1916]/32 md:text-[13px]">tuomas</p>

				<LinearGlassCard
					className="absolute right-[7%] top-[28%] w-[170px] md:w-[190px]"
					innerClassName="border-[#0C0C0C]/[0.1] bg-[linear-gradient(180deg,rgba(52,52,53,0.84),rgba(33,33,34,0.88))] p-2"
				>
					<div className="space-y-1 font-inter text-[11px] text-[#1A1916]/75 md:text-[12px]">
						<p>Accept</p>
						<p>Mark as duplicate</p>
						<p>Decline</p>
					</div>
				</LinearGlassCard>
			</div>
		</LinearGlassCard>
	);
}

export function FluxWhatWeTrack() {
	return (
		<FluxSection className="overflow-hidden pb-20 pt-10 md:pb-26 md:pt-14">
			<div className="mx-auto max-w-4xl text-center">
				<div className="inline-flex items-center rounded-full border border-[#0C0C0C]/12 bg-[#0C0C0C]/[0.03] px-3 py-1 font-inter text-[11px] uppercase tracking-[0.12em] text-[#1A1916]/65">
					{FLUX_WHAT_WE_TRACK.badge}
				</div>
				<h2 className="mt-5 font-inter text-[32px] font-[530] leading-[1.1] tracking-[-0.025em] text-[#1A1916] md:text-[42px]">
					{FLUX_WHAT_WE_TRACK.title}
				</h2>
				<p className="mt-4 font-inter text-[15px] leading-[1.55] text-[#1A1916]/58 md:text-[16px]">
					{FLUX_WHAT_WE_TRACK.description}
				</p>
			</div>

			<div className="relative mt-10 border border-[#0C0C0C]/[0.08] md:mt-12">
				<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(12, 12, 12, 0.04),transparent_30%)]" />
				<div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-[#0C0C0C]/[0.08] lg:block" />
				<div className="grid lg:grid-cols-2">
					{FLUX_WHAT_WE_TRACK.cards.map((card, index) => (
						<div key={card.title} className="px-6 py-7 md:px-7 md:py-9 lg:px-8">
							<h3 className="max-w-[18ch] font-inter text-[30px] font-[530] leading-[1.05] tracking-[-0.03em] text-[#1A1916] md:text-[36px]">
								{card.title}
							</h3>
							<p className="mt-3 max-w-[35ch] font-inter text-[14px] leading-[1.5] text-[#1A1916]/58 md:text-[15px]">
								{index === 0
									? "Understand where token spend is driving output versus waste, and where model choices are overpaying for routine work."
									: "Track if workflow changes actually improve delivery speed and quality across planning, implementation, and review."}
							</p>

							{index === 0 ? <CyclesMock /> : <TriageMock />}
						</div>
					))}
				</div>
			</div>
		</FluxSection>
	);
}
