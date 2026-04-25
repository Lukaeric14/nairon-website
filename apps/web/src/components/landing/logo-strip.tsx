import { PARTNERS } from "@/data/landing";

export function LogoStrip() {
	const logos = [...PARTNERS, ...PARTNERS, ...PARTNERS];

	return (
		<div className="py-6 md:py-10">
			<div className="px-6 md:px-12 mb-6">
				<p className="text-[#5C584F] text-xs font-medium uppercase tracking-[0.16em]">
					Trusted by leading companies
				</p>
			</div>
			<div
				className="overflow-hidden"
				style={{
					maskImage:
						"linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
					WebkitMaskImage:
						"linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
				}}
			>
				<div className="flex animate-marquee">
					{logos.map((partner, i) => (
						<div
							key={`${partner.name}-${i}`}
							className="relative flex-shrink-0 px-8 flex items-center justify-center"
						>
							<img
								src={partner.logo}
								alt={partner.name}
								width={120}
								height={32}
								className="h-8 w-auto opacity-50 grayscale"
								loading="lazy"
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
