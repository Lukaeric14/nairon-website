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
			title: "Nairon — Company for AI Employees",
			description:
				"Nairon builds and deploys AI employees for modern teams, then keeps them improving inside your operations, acquisition, and delivery workflows.",
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
					<WhatWeDo />
					<BuiltByBuilders />
					<SecuritySection />
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
