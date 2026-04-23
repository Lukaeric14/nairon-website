import { ArrowUpRight } from "lucide-react";
import { DISCOVERY_CALL_URL } from "@/lib/links";

export function CTASection() {
	return (
		<div className="relative overflow-hidden">
			{/* Full-bleed painting background */}
			<img
				src="/backgrounds/nature-scene-3.webp"
				alt=""
				className="absolute inset-0 w-full h-full object-cover"
				loading="lazy"
			/>
			{/* Subtle vignette so edges blend */}
			<div
				className="absolute inset-0"
				style={{
					background:
						"linear-gradient(to bottom, rgba(12,12,12,0.3) 0%, rgba(12,12,12,0.1) 30%, rgba(12,12,12,0.1) 70%, rgba(12,12,12,0.3) 100%)",
				}}
			/>

			{/* Glass card centered over painting */}
			<div className="relative z-10 flex items-center justify-center py-24 md:py-36 px-6">
				<div
					className="max-w-3xl w-full rounded-2xl p-10 md:p-14 text-center"
					style={{
						background: "rgba(255, 255, 255, 0.55)",
						backdropFilter: "blur(20px)",
						border: "1px solid rgba(12, 12, 12, 0.08)",
					}}
				>
					<h2 className="text-3xl md:text-[56px] md:leading-[60px] font-normal tracking-[-1px] md:tracking-[-1.5px] text-[#1A1916] mb-6">
						Ready to deploy your{" "}
						<span className="font-serif italic text-[#C9A96E]">
							first AI employee
						</span>
						<span className="text-[#C9A96E]">?</span>
					</h2>
					<div className="flex flex-wrap justify-center gap-4">
						<a
							href={DISCOVERY_CALL_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 bg-[#C9A96E] hover:bg-[#B8944F] text-[#0C0C0C] font-semibold text-base px-8 py-3.5 rounded-full transition-colors"
						>
							Book a call
							<ArrowUpRight className="w-4 h-4" />
						</a>
						<a 
							href="/for/real-estate"
							className="inline-flex items-center gap-2 border border-[#0C0C0C]/10 text-[#1A1916] hover:border-[#C9A96E]/50 hover:text-[#C9A96E] font-medium text-base px-6 py-3.5 rounded-full transition-colors"
						>
							See real estate
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
