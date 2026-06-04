import { createFileRoute } from "@tanstack/react-router";
import { LandingHero, Navbar } from "@/components/landing-v2/hero";
import { LogoCloud } from "@/components/landing-v2/logo-cloud";
import { Features } from "@/components/landing-v2/features";
import { QuoteBand } from "@/components/landing-v2/quote-band";
import { Footer } from "@/components/landing-v2/footer";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
	component: HomePage,
	head: () =>
		seoHead({
			title: "Nairon — The AI workforce for modern teams",
			description:
				"Nairon builds AI employees around your real workflows and deploys them inside the systems you already run — measurable outcomes, no migrations.",
			path: "/",
		}),
});

function HomePage() {
	return (
		<div className="font-geist">
			<Navbar />
			<LandingHero />
			<LogoCloud />
			<Features />
			<QuoteBand />
			<Footer />
		</div>
	);
}
