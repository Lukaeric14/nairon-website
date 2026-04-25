import { createFileRoute } from "@tanstack/react-router";
import { Navbar, Footer } from "@/components/landing";
import { ModalProvider } from "@/components/landing/modal-provider";
import { HireModal } from "@/components/landing/hire-modal";
import { CandidateModal } from "@/components/landing/candidate-modal";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/terms-and-conditions")({
	component: TermsPage,
	head: () =>
		seoHead({
			title: "Terms & Conditions — Nairon AI",
			description:
				"Terms and conditions for using Nairon AI services, including our recruiting platform and Flux benchmarking tools.",
			path: "/terms-and-conditions",
		}),
});

function TermsPage() {
	return (
		<ModalProvider>
			<div className="min-h-screen bg-white text-[#1A1916] font-inter">
				<Navbar />
				<main className="pt-32 pb-20 px-6">
					<div className="max-w-3xl mx-auto">
						<h1 className="text-4xl md:text-5xl font-normal tracking-[-1.5px] text-[#1A1916] mb-4">
							Terms &amp; Conditions
						</h1>
						<p className="text-[#5C584F] text-sm mb-12">
							Last updated: February 24, 2026
						</p>

						<div className="space-y-10 text-[#5C584F] text-base leading-relaxed">
							<section>
								<h2 className="text-xl font-normal text-[#1A1916] mb-4">
									1. Acceptance of Terms
								</h2>
								<p>
									By accessing or using the Nairon AI website and services
									(naironai.com), you agree to be bound by these Terms and
									Conditions. If you do not agree, please do not use our services.
								</p>
							</section>

							<section>
								<h2 className="text-xl font-normal text-[#1A1916] mb-4">
									2. Services
								</h2>
								<p>
									Nairon AI provides data-driven technical recruiting services,
									including candidate sourcing, AI-nativeness benchmarking (Flux),
									and placement services. We reserve the right to modify, suspend,
									or discontinue any part of our services at any time.
								</p>
							</section>

							<section>
								<h2 className="text-xl font-normal text-[#1A1916] mb-4">
									3. User Responsibilities
								</h2>
								<ul className="list-disc pl-6 space-y-2">
									<li>
										You agree to provide accurate and truthful information when
										using our services.
									</li>
									<li>
										You will not misrepresent your qualifications, experience, or
										identity.
									</li>
									<li>
										You will not use our services for any unlawful purpose or in
										violation of any applicable laws.
									</li>
								</ul>
							</section>

							<section>
								<h2 className="text-xl font-normal text-[#1A1916] mb-4">
									4. Intellectual Property
								</h2>
								<p>
									All content on this website, including text, graphics, logos, and
									software, is the property of Nairon AI or its licensors and is
									protected by intellectual property laws. Flux is an open-source
									tool distributed under its respective license.
								</p>
							</section>

							<section>
								<h2 className="text-xl font-normal text-[#1A1916] mb-4">
									5. Placement Guarantee
								</h2>
								<p>
									Our 90-day placement guarantee is subject to the specific terms
									outlined in individual client agreements. General terms advertised
									on our website are indicative and may vary based on the scope of
									engagement.
								</p>
							</section>

							<section>
								<h2 className="text-xl font-normal text-[#1A1916] mb-4">
									6. Limitation of Liability
								</h2>
								<p>
									Nairon AI shall not be liable for any indirect, incidental,
									special, or consequential damages arising from the use of our
									services. Our total liability is limited to the fees paid for the
									specific service giving rise to the claim.
								</p>
							</section>

							<section>
								<h2 className="text-xl font-normal text-[#1A1916] mb-4">
									7. Governing Law
								</h2>
								<p>
									These terms are governed by the laws of the United Arab Emirates.
									Any disputes shall be resolved in the courts of Dubai, UAE.
								</p>
							</section>

							<section>
								<h2 className="text-xl font-normal text-[#1A1916] mb-4">
									8. Contact
								</h2>
								<p>
									For questions about these terms, contact us at{" "}
									<a
										href="mailto:legal@naironai.com"
										className="text-[#C9A96E] hover:underline"
									>
										legal@naironai.com
									</a>
									.
								</p>
							</section>
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
