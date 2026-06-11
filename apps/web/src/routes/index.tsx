import { createFileRoute } from "@tanstack/react-router";
import { useCalInit } from "@/components/landing-v2/cal";
import { LandingHero, Navbar } from "@/components/landing-v2/hero";
import { LogoCloud } from "@/components/landing-v2/logo-cloud";
import { Platform } from "@/components/landing-v2/platform";
import { HowItWorksCards } from "@/components/landing-v2/how-it-works-cards";
import { UseCases } from "@/components/landing-v2/use-cases";
import { DiscoveryCall } from "@/components/landing-v2/discovery-call";
import { Faq } from "@/components/landing-v2/faq";
import { Newsletter } from "@/components/landing-v2/newsletter";
import { QuoteBand } from "@/components/landing-v2/quote-band";
import { Footer } from "@/components/landing-v2/footer";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
	component: HomePage,
	head: () =>
		seoHead({
			title: "Nairon - The AI workforce for modern teams",
			description:
				"Nairon builds AI employees around your real workflows and deploys them inside the systems you already run. Measurable outcomes, no migrations.",
			path: "/",
		}),
});

function HomePage() {
	// Initialise the Cal popup once so every CTA with CAL_ATTRS opens the modal.
	useCalInit();
	return (
		<div className="font-geist">
			<Navbar />
			<LandingHero />
			<LogoCloud />
			<Platform />
			<HowItWorksCards />
			<UseCases />
			<QuoteBand />
			<DiscoveryCall />
			<Newsletter />
			<Faq />
			<Footer />
		</div>
	);
}
