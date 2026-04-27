import { createFileRoute } from "@tanstack/react-router";
import {
	Navbar,
	HeroNew,
	Qualifier,
	WhyNairon,
	WhatWeDo,
	SecuritySection,
	BuiltByBuilders,
	AIFaqSection,
	CTASection,
	Footer,
	GridSystem,
	GridSection,
} from "@/components/landing";
import { ModalProvider } from "@/components/landing/modal-provider";
import { HireModal } from "@/components/landing/hire-modal";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
	component: HomePage,
	head: () =>
		seoHead({
			title: "Nairon — 1-Month AI Employee Pilot",
			description:
				"Nairon builds your first AI employee around one workflow, one measurable business outcome, and a clear path from pilot to Hive workspace.",
			path: "/",
		}),
});

function HomePage() {
	return (
		<ModalProvider>
			<div className="min-h-screen bg-white text-[#1A1916] font-inter">
				<Navbar />

				<GridSystem className="pt-16 mt-12 md:mt-16">
					<GridSection columns="1fr" border>
						<HeroNew />
					</GridSection>

					<Qualifier />

					<WhyNairon />
					<SecuritySection />
					<WhatWeDo />
					<BuiltByBuilders />
					<AIFaqSection />

					<GridSection columns="1fr" border={false}>
						<CTASection />
					</GridSection>
				</GridSystem>

				<Footer />
			</div>
			<HireModal />
		</ModalProvider>
	);
}
