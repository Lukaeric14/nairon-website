import { createFileRoute } from "@tanstack/react-router";
import { Navbar, Footer } from "@/components/landing";
import { ModalProvider } from "@/components/landing/modal-provider";
import { HireModal } from "@/components/landing/hire-modal";
import { CandidateModal } from "@/components/landing/candidate-modal";
import { seoHead } from "@/lib/seo";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/$")({
	component: NotFoundPage,
	head: () =>
		seoHead({
			title: "Page Not Found — Nairon AI",
			description:
				"The page you're looking for doesn't exist. Find AI-native engineers or explore Flux at Nairon AI.",
			path: "/404",
			noindex: true,
		}),
});

function NotFoundPage() {
	return (
		<ModalProvider>
			<div className="min-h-screen bg-white text-[#1A1916] font-inter">
				<Navbar />
				<main className="pt-32 pb-20 px-6">
					<div className="max-w-2xl mx-auto text-center">
						<p className="text-[#C9A96E] text-sm font-medium uppercase tracking-[0.16em] mb-4">
							404
						</p>
						<h1 className="text-4xl md:text-6xl font-normal tracking-[-1.5px] text-[#1A1916] mb-6">
							Page not found
						</h1>
						<p className="text-[#5C584F] text-lg leading-relaxed mb-10 max-w-md mx-auto">
							The page you're looking for doesn't exist or has been moved.
						</p>

						<div className="flex flex-wrap justify-center gap-4">
							<a
								href="/"
								className="inline-flex items-center gap-2 bg-[#C9A96E] hover:bg-[#B8944F] text-[#0C0C0C] font-semibold text-base px-6 py-3 rounded-full transition-colors"
							>
								Back to home
								<ArrowUpRight className="w-4 h-4" />
							</a>
							<a 
								href="/flux"
								className="inline-flex items-center gap-2 border border-[#0C0C0C]/10 text-[#1A1916] hover:border-[#C9A96E]/50 hover:text-[#C9A96E] font-medium text-base px-6 py-3 rounded-full transition-colors"
							>
								Explore Flux
							</a>
						</div>
					</div>
				</main>
				<Footer />
			</div>
			<HireModal />
			<CandidateModal />
		</ModalProvider>
	);
}
