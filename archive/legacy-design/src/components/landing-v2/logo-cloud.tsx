import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { PARTNERS } from "@/data/landing";

// Real Nairon customers from the previous site — single source of truth lives
// in PARTNERS so the marquee stays in sync with the rest of the landing copy.
const LOGOS = PARTNERS;

/**
 * Logo cloud (Tailark logo-cloud-3 shape, title/subtitle removed). Infinite
 * right-to-left marquee with wide fade-outs at both ends; marks resolve from
 * muted grayscale to full color on hover.
 */
export function LogoCloud() {
	return (
		<section className="border-t border-ds-border bg-ds-shell font-geist">
			<div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
				<div className="mb-8 text-center text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-ds-text-tertiary">
					Trusted by leading companies
				</div>
				<div className="relative">
					<InfiniteSlider gap={80} speed={45} speedOnHover={20}>
						{LOGOS.map(({ name, logo }) => (
							<div key={name} className="flex items-center">
								<img
									src={logo}
									alt={name}
									className="h-8 w-auto opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
									loading="lazy"
								/>
							</div>
						))}
					</InfiniteSlider>

					{/* end fades — wide enough to hide the loop wrap */}
					<div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-ds-shell to-transparent sm:w-48" />
					<div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-ds-shell to-transparent sm:w-48" />
				</div>
			</div>
		</section>
	);
}
