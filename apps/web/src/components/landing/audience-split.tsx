import { ArrowUpRight } from "lucide-react";
import { DISCOVERY_CALL_URL } from "@/lib/links";
import { GridSection, GridCell, CornerNotches } from "./grid-system";

export function AudienceSplit() {
	return (
		<div>
			{/* Heading row */}
			<GridSection columns="1fr" border>
				<GridCell className="px-6 md:px-12 pt-10 md:pt-12 pb-8 md:pb-10">
					<div className="flex items-center gap-3 mb-4 md:mb-6">
						<div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
						<span className="text-[#A39E96] text-xs font-medium uppercase tracking-[0.16em]">
							Who we serve
						</span>
					</div>
					<h2 className="text-3xl md:text-[48px] md:leading-[57.6px] font-normal tracking-[-0.48px] text-[#E8E4DE] max-w-3xl">
						Two paths,{" "}
						<span className="text-[#E8E4DE]/55">one mission</span>
					</h2>
				</GridCell>
			</GridSection>

			{/* Two cards — stacked on mobile, side by side on desktop */}
			<GridSection columns="1fr 1fr" border>
				{/* For Companies */}
				<GridCell borderRight className="p-6 md:p-12">
					<CornerNotches size={12} />
					<span className="text-[#C9A96E] text-xs font-medium uppercase tracking-[0.16em]">
						For companies
					</span>
					<h3 className="text-xl md:text-3xl font-normal text-[#E8E4DE] mt-3 md:mt-4 mb-3 md:mb-4">
						Deploy AI employees into the core business
					</h3>
					<p className="text-[#A39E96] text-sm md:text-base leading-relaxed mb-6 md:mb-8">
						We help companies turn repetitive, high-leverage workflows into operational
						AI systems across acquisition, fulfillment, support, and internal ops.
					</p>
					<ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
						{[
							"Role-first AI deployment",
							"Human oversight by design",
							"Ongoing optimization on subscription",
						].map((item) => (
							<li key={item} className="flex items-start gap-3">
								<div className="w-1 h-1 rounded-full bg-[#C9A96E] mt-2.5 shrink-0" />
								<span className="text-[#A39E96] text-sm">{item}</span>
							</li>
						))}
					</ul>
					<a
						href={DISCOVERY_CALL_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 bg-[#C9A96E] hover:bg-[#B8944F] text-[#0C0C0C] font-semibold text-sm px-5 py-2.5 rounded-full transition-colors"
					>
						Book discovery
						<ArrowUpRight className="w-3.5 h-3.5" />
					</a>
				</GridCell>

				{/* Real estate ICP */}
				<GridCell className="p-6 md:p-12">
					<CornerNotches size={12} />
					<span className="text-[#C9A96E] text-xs font-medium uppercase tracking-[0.16em]">
						For real estate
					</span>
					<h3 className="text-xl md:text-3xl font-normal text-[#E8E4DE] mt-3 md:mt-4 mb-3 md:mb-4">
						See the ICP-specific version of the offer
					</h3>
					<p className="text-[#A39E96] text-sm md:text-base leading-relaxed mb-6 md:mb-8">
						The main landing page stays broad because the business model is broad.
						`/for/real-estate` exists so we can speak directly to one focused wedge.
					</p>
					<ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
						{[
							"Brokerage-specific messaging",
							"Real estate workflow examples",
							"Same company model, narrower ICP",
						].map((item) => (
							<li key={item} className="flex items-start gap-3">
								<div className="w-1 h-1 rounded-full bg-[#C9A96E] mt-2.5 shrink-0" />
								<span className="text-[#A39E96] text-sm">{item}</span>
							</li>
						))}
					</ul>
					<a
						href="/for/real-estate"
						className="inline-flex items-center gap-2 border border-white/10 text-[#E8E4DE] font-medium text-sm px-5 py-2.5 rounded-full hover:bg-white/5 transition-colors"
					>
						View real estate page
						<ArrowUpRight className="w-3.5 h-3.5" />
					</a>
				</GridCell>
			</GridSection>
		</div>
	);
}
