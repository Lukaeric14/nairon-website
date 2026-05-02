import { createFileRoute } from "@tanstack/react-router";
import { Footer, Navbar } from "@/components/landing";
import { ModalProvider } from "@/components/landing/modal-provider";
import { HireModal } from "@/components/landing/hire-modal";
import { CandidateModal } from "@/components/landing/candidate-modal";
import { seoHead } from "@/lib/seo";

// DEPRECATED: Flux is no longer an active public product surface.
// The old landing page imports are intentionally commented out so they do not
// render, fetch release data, or promote installs from the Nairon website.
// import { seoHead, fluxProductJsonLd, breadcrumbJsonLd } from "@/lib/seo";
// import HeroSection from "@/components/hero-section";
// import ExpandableFeatures from "@/components/expandable-features-10";
// import { FluxWorkflow } from "@/components/flux/workflow";
// import { FluxCTA } from "@/components/flux/cta";
// import ComparatorSection from "@/components/comparator-7";
// import StatsSection from "@/components/stats-4";
// import FAQs from "@/components/faqs-1";
// const fluxJsonLd = JSON.stringify(fluxProductJsonLd());
// const breadcrumbsJsonLd = JSON.stringify(
// 	breadcrumbJsonLd([
// 		{ name: "Home", path: "/" },
// 		{ name: "Flux", path: "/flux" },
// 	]),
// );

export const Route = createFileRoute("/flux")({
	component: FluxPage,
	head: () =>
		seoHead({
			title: "Flux is deprecated | Nairon AI",
			description:
				"Flux has been deprecated on the Nairon website. Nairon is focused on AI employees, Hive, and client automation work.",
			path: "/flux",
			noindex: true,
		}),
});

function FluxPage() {
	return (
		<ModalProvider>
			<div className="min-h-screen bg-[#F8F5ED] font-inter text-[#171612]">
				<Navbar />
				<main className="mx-auto flex min-h-[72vh] max-w-3xl flex-col justify-center px-6 py-32 text-center">
					<p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#A77A15]">
						Deprecated
					</p>
					<h1 className="text-4xl font-semibold tracking-[-0.03em] text-[#171612] md:text-6xl">
						Flux is no longer an active Nairon website surface.
					</h1>
					<p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#5F5A50] md:text-lg">
						We're focusing our public work on AI employees, client automation,
						and Hive. For current writing and product thinking, read Signals or
						book a discovery call.
					</p>
					<div className="mt-9 flex flex-wrap justify-center gap-3">
						<a
							href="/signals"
							className="inline-flex h-11 items-center justify-center bg-[#171612] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#2A2822]"
						>
							Read Signals
						</a>
						<a
							href="/contact"
							className="inline-flex h-11 items-center justify-center border border-[#171612]/15 px-5 text-sm font-semibold text-[#171612] transition-colors hover:border-[#171612]/30 hover:bg-white/60"
						>
							Book a discovery call
						</a>
					</div>
				</main>
				<Footer />
			</div>
			<HireModal />
			<CandidateModal />
		</ModalProvider>
	)
}
