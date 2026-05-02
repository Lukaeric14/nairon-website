import { createFileRoute } from "@tanstack/react-router";
import { Navbar, Footer, GridSystem, GridSection } from "@/components/landing";
import {
	UniverseHero,
	UniverseFeed,
	UniverseDirectory,
	UniverseCommunity,
	UniverseBlog,
	UniverseCTA,
} from "@/components/landing/universe";
import { ModalProvider } from "@/components/landing/modal-provider";
import { HireModal } from "@/components/landing/hire-modal";
import { CandidateModal } from "@/components/landing/candidate-modal";
import { seoHead, breadcrumbJsonLd } from "@/lib/seo";

const breadcrumbsJsonLd = JSON.stringify(
	breadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Universe", path: "/universe" },
	]),
);

export const Route = createFileRoute("/universe")({
	component: UniversePage,
	head: () => {
		const base = seoHead({
			title: "Nairon Universe — Where AI-Native Engineers Come to Learn",
			description:
				"Curated daily feed, SDLC-organized tool directory, and community for AI-native engineers.",
			path: "/universe",
		});
		return {
			...base,
			scripts: [
				{ type: "application/ld+json", children: breadcrumbsJsonLd },
			],
		};
	},
});

function UniversePage() {
	return (
		<ModalProvider>
			<div className="min-h-screen bg-white text-[#1A1916] font-inter">
				<Navbar />

				<GridSystem className="pt-16 mt-12 md:mt-16">
					{/* Hero */}
					<GridSection columns="1fr" border>
						<UniverseHero />
					</GridSection>

					{/* Daily Feed */}
					<UniverseFeed />

					{/* Tool Directory */}
					<UniverseDirectory />

					{/* Community */}
					<UniverseCommunity />

					{/* Signals */}
					<UniverseBlog />

					{/* CTA */}
					<GridSection columns="1fr" border={false}>
						<UniverseCTA />
					</GridSection>
				</GridSystem>

				<Footer />
			</div>
			<HireModal />
			<CandidateModal />
		</ModalProvider>
	);
}
