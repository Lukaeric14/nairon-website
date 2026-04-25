import { ArrowUpRight } from "lucide-react";
import { DISCOVERY_CALL_URL } from "@/lib/links";

export function CTASection() {
	return (
		<div className="relative overflow-hidden">
			<div className="relative z-10 flex items-center justify-center py-12 md:py-20 px-6">
				<div
					className="max-w-5xl w-full rounded-2xl p-10 md:p-14 text-center"
					style={{
						background: "rgba(255, 255, 255, 0.55)",
						backdropFilter: "blur(20px)",
						border: "1px solid rgba(12, 12, 12, 0.08)",
					}}
				>
					<h2 className="text-3xl md:text-[56px] md:leading-[60px] font-normal tracking-[-1px] md:tracking-[-1.5px] text-[#1A1916] mb-8 md:whitespace-nowrap">
						Ready To Deploy Your{" "}
						<span className="font-serif italic text-[#C9A96E] text-[1.1em]">
							First AI Employee
						</span>
						<span className="text-[#C9A96E]">?</span>
					</h2>
					<div className="flex justify-center">
						<a
							href={DISCOVERY_CALL_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 bg-[#C9A96E] hover:bg-[#B8944F] text-[#0C0C0C] font-semibold text-base px-8 py-3.5 rounded-full transition-colors"
						>
							BOOK YOUR 15-MINUTE DISCOVERY HERE
							<ArrowUpRight className="w-4 h-4" />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
