import { createFileRoute } from "@tanstack/react-router";
import { Footer, Navbar } from "@/components/landing";
import { ModalProvider } from "@/components/landing/modal-provider";
import { HireModal } from "@/components/landing/hire-modal";
import { CandidateModal } from "@/components/landing/candidate-modal";
import { seoHead, fluxProductJsonLd, breadcrumbJsonLd } from "@/lib/seo";

// Tailark Pro components
import HeroSection from "@/components/hero-section";
import ExpandableFeatures from "@/components/expandable-features-10";
// import BentoSeven from "@/components/bento-7"; // Hidden for now
import { FluxWorkflow } from "@/components/flux/workflow";
import { FluxCTA } from "@/components/flux/cta";
import { FluxPricing } from "@/components/flux/pricing";
import ComparatorSection from "@/components/comparator-7";
import StatsSection from "@/components/stats-4";
import FAQs from "@/components/faqs-1";

const fluxJsonLd = JSON.stringify(fluxProductJsonLd());
const breadcrumbsJsonLd = JSON.stringify(
	breadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Flux", path: "/flux" },
	]),
);

export const Route = createFileRoute("/flux")({
	component: FluxPage,
	head: () => {
		const base = seoHead({
			title: "Flux — Find the gaps in your AI workflow | Nairon AI",
			description:
				"Open-source Claude Code workflow layer with a deterministic state engine. Flux keeps features, bugs, and refactors aligned through scoping progress, implementation state, and review routing.",
			path: "/flux",
		})
		return {
			...base,
			scripts: [
				{ type: "application/ld+json", children: fluxJsonLd },
				{ type: "application/ld+json", children: breadcrumbsJsonLd },
			],
		}
	},
});

function FluxPage() {
	return (
		<ModalProvider>
			<div className="dark min-h-screen bg-[#0C0C0C] font-inter text-[#E8E4DE]">
				<Navbar />

				{/* Hero Section - hero-section-16 */}
				<HeroSection />
				
				{/* Architecture - expandable-features-10 */}
				<ExpandableFeatures />
				
				{/* Deterministic workflow layer explainer */}
				<FluxWorkflow />
				
				{/* Features - bento-7 (hidden for now) */}
				{/* <BentoSeven /> */}
				
				{/* Comparator - comparator-7 */}
				<ComparatorSection />
				
				{/* Testimonials - testimonials-3 (hidden for now) */}
				{/* <Testimonials /> */}
				
				{/* Stats - stats-4 */}
				<StatsSection />

				{/* Pricing - Free vs Pro */}
				<FluxPricing />

				{/* Platforms/Integrations - integrations-6 (hidden for now) */}
				{/* <IntegrationsSection /> */}

				{/* FAQ - faqs-1 */}
				<FAQs />

				{/* CTA - Install Flux */}
				<FluxCTA />
				
				<Footer />
			</div>
			<HireModal />
			<CandidateModal />
		</ModalProvider>
	)
}
