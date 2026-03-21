export function UniverseCTA() {
	return (
		<div className="relative overflow-hidden">
			{/* Full-bleed painting background */}
			<img
				src="/backgrounds/nature-scene-3.webp"
				alt=""
				className="absolute inset-0 w-full h-full object-cover"
				loading="lazy"
			/>
			{/* Vignette */}
			<div
				className="absolute inset-0"
				style={{
					background:
						"linear-gradient(to bottom, rgba(12,12,12,0.3) 0%, rgba(12,12,12,0.1) 30%, rgba(12,12,12,0.1) 70%, rgba(12,12,12,0.3) 100%)",
				}}
			/>

			{/* Glass card */}
			<div className="relative z-10 flex items-center justify-center py-24 md:py-36 px-6">
				<div
					className="max-w-3xl w-full rounded-2xl p-10 md:p-14 text-center"
					style={{
						background: "rgba(20, 20, 18, 0.55)",
						backdropFilter: "blur(20px)",
						border: "1px solid rgba(255, 255, 255, 0.08)",
					}}
				>
					<h2 className="text-4xl md:text-[56px] md:leading-[60px] font-normal tracking-[-1.5px] text-[#E8E4DE] mb-4">
						Stay sharp.{" "}
						<span className="font-serif italic text-[#C9A96E]">
							Stay ahead
						</span>
						<span className="text-[#C9A96E]">.</span>
					</h2>
					<p className="text-[#A39E96] text-lg mb-8 max-w-lg mx-auto">
						The Universe is coming soon. Engineers who engage will stay at the cutting
						edge — and get matched to the best opportunities.
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<span className="inline-flex items-center gap-2 bg-white/[0.06] text-[#A39E96] font-semibold text-base px-8 py-3.5 rounded-full cursor-not-allowed opacity-70">
							Coming Soon
						</span>
						<a
							href="/flux"
							className="inline-flex items-center gap-2 border border-white/10 text-[#E8E4DE] hover:border-[#C9A96E]/50 hover:text-[#C9A96E] font-medium text-base px-6 py-3.5 rounded-full transition-colors"
						>
							Explore Flux
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
