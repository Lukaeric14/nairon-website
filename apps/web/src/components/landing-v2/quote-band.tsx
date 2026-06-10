/**
 * Full-width editorial quote band — corporate skyline under a Varick-style
 * blue duotone, with a bold thesis statement. Pure credibility/consulting
 * signal (no product UI). Palette-driven via --brand-* tokens.
 */
function QuoteMark() {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="currentColor"
			className="mx-auto size-8"
			style={{ color: "var(--brand-mid)" }}
			aria-hidden
		>
			<path d="M9 7H5a2 2 0 00-2 2v3a2 2 0 002 2h2v1a2 2 0 01-2 2H4a1 1 0 100 2h1a4 4 0 004-4V7zm10 0h-4a2 2 0 00-2 2v3a2 2 0 002 2h2v1a2 2 0 01-2 2h-1a1 1 0 100 2h1a4 4 0 004-4V7z" />
		</svg>
	);
}

export function QuoteBand() {
	return (
		<section className="relative isolate overflow-hidden font-geist">
			{/* skyline photo */}
			<img
				src="/img/brandkit/skyline.webp"
				alt=""
				aria-hidden
				loading="lazy"
				decoding="async"
				className="absolute inset-0 -z-10 h-full w-full object-cover"
			/>
			{/* recolor to brand blue (duotone) */}
			<div
				className="absolute inset-0 -z-10"
				style={{ backgroundColor: "var(--brand-blue)", mixBlendMode: "color" }}
			/>
			{/* even blue wash — keeps the skyline visible, like the reference */}
			<div
				className="absolute inset-0 -z-10"
				style={{ backgroundColor: "var(--brand-blue)", opacity: 0.5 }}
			/>
			{/* subtle vertical depth for text contrast */}
			<div
				className="absolute inset-0 -z-10"
				style={{
					background:
						"linear-gradient(180deg, rgba(9,31,64,0.35) 0%, rgba(9,31,64,0.05) 45%, rgba(9,31,64,0.45) 100%)",
				}}
			/>

			<div className="mx-auto max-w-4xl px-6 py-24 text-center text-white sm:py-28">
				<QuoteMark />
				<blockquote className="mt-6 text-2xl font-medium leading-snug tracking-tight sm:text-4xl">
					Self-improving AI agents compound. The companies that adopt them first
					won&apos;t just lead their market, they&apos;ll outrun it.
				</blockquote>
				<div className="mt-6 text-[0.875rem] text-white/70">— Nairon</div>
			</div>
		</section>
	);
}
