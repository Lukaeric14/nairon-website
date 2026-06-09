// Shared template for every Industry / Solution landing page. Three reused
// sections — vertical hero, the existing Use Cases grid, and the 1-Month Pilot
// "Our approach" video — capped by the Cal.com booking CTA, plus the shared
// navbar and footer.

import { useCalInit } from "./cal";
import { Navbar } from "./hero";
import { VerticalHero } from "./vertical-hero";
import { ToolsStrip } from "./tools-strip";
import { VerticalUseCases } from "./vertical-use-cases";
import { OurApproach } from "./our-approach";
import { DiscoveryCall } from "./discovery-call";
import { Footer } from "./footer";
import type { VerticalContent } from "@/content/verticals";

export function VerticalLanding({ content }: { content: VerticalContent }) {
	// One page-wide Cal init so every CTA with CAL_ATTRS opens the modal.
	useCalInit();
	return (
		<div className="font-geist">
			<Navbar />
			<VerticalHero headline={content.hero.headline} subcopy={content.hero.subcopy} />
			<ToolsStrip tools={content.tools} />
			<VerticalUseCases name={content.name} useCases={content.useCases} />
			<OurApproach />
			<DiscoveryCall />
			<Footer />
		</div>
	);
}

/** Minimal fallback when a slug doesn't resolve to a known vertical. */
export function VerticalNotFound() {
	return (
		<div className="font-geist">
			<Navbar />
			<section className="bg-ds-surface font-geist text-ds-text-primary">
				<div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-5 py-24 text-center">
					<h1 className="text-4xl font-medium tracking-tight sm:text-5xl">Page not found</h1>
					<p className="mt-4 text-[1.0625rem] text-ds-text-secondary">
						That page doesn&apos;t exist yet.
					</p>
					<a
						href="/"
						className="mt-8 inline-flex items-center gap-2 px-6 py-3 text-white transition-all hover:brightness-110"
						style={{ backgroundColor: "var(--brand-blue)" }}
					>
						Back to home
					</a>
				</div>
			</section>
			<Footer />
		</div>
	);
}
