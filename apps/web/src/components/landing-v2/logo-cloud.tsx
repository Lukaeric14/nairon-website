import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { OpenAIFull } from "@/components/ui/svgs/open-ai";
import { Stripe } from "@/components/ui/svgs/stripe";
import { Primevideo } from "@/components/ui/svgs/prime";
import { Shopify } from "@/components/ui/svgs/shopify";
import { VercelFull } from "@/components/ui/svgs/vercel";
import { Linear } from "@/components/ui/svgs/linear";
import { Replit } from "@/components/ui/svgs/replit";
import { Windsurf } from "@/components/ui/svgs/windsurf";
import { MistralAi } from "@/components/ui/svgs/mistral-ai";

// Enough marks that two copies always overrun the viewport — that's what keeps
// the loop seam off-screen so the marquee never looks like it "regenerates".
const LOGOS = [
	{ name: "OpenAI", Logo: OpenAIFull },
	{ name: "Stripe", Logo: Stripe },
	{ name: "Prime Video", Logo: Primevideo },
	{ name: "Shopify", Logo: Shopify },
	{ name: "Vercel", Logo: VercelFull },
	{ name: "Linear", Logo: Linear },
	{ name: "Replit", Logo: Replit },
	{ name: "Mistral", Logo: MistralAi },
	{ name: "Windsurf", Logo: Windsurf },
];

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
					Used by teams at
				</div>
				<div className="relative">
					<InfiniteSlider gap={80} speed={45} speedOnHover={20}>
						{LOGOS.map(({ name, Logo }) => (
							<div key={name} className="flex items-center">
								<Logo
									aria-label={name}
									className="h-12 w-auto text-ds-text-secondary opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
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
