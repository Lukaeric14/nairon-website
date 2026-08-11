import { ArrowUpRight } from "lucide-react";

export function CTA() {
	return (
		<section className="py-24 md:py-32 bg-white">
			<div className="max-w-3xl mx-auto px-6 text-center">
				<h2 className="text-3xl md:text-[48px] md:leading-[57.6px] font-normal tracking-[-0.48px] text-[#1A1916] mb-6">
					Let's build something{" "}
					<span className="font-serif italic text-[#C9A96E]">great</span>
				</h2>
				<p className="text-[#5C584F] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
					Whether you're hiring an AI-native engineer or looking for your next role,
					we'd love to hear from you.
				</p>
				<a
					href="/contact"
					className="inline-flex items-center gap-2 bg-[#C9A96E] hover:bg-[#B8944F] text-[#0C0C0C] font-semibold text-base px-8 py-3.5 rounded-full transition-colors"
				>
					Get in touch
					<ArrowUpRight className="w-4 h-4" />
				</a>
			</div>
		</section>
	);
}
