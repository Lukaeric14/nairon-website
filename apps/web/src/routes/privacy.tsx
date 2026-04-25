import { createFileRoute } from "@tanstack/react-router";
import { Navbar, Footer } from "@/components/landing";
import { ModalProvider } from "@/components/landing/modal-provider";
import { HireModal } from "@/components/landing/hire-modal";
import { CandidateModal } from "@/components/landing/candidate-modal";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
	component: PrivacyPage,
	head: () =>
		seoHead({
			title: "Privacy Policy — Nairon AI",
			description:
				"How Nairon AI collects, uses, and protects your personal data. Read our privacy policy.",
			path: "/privacy",
		}),
});

function PrivacyPage() {
	return (
		<ModalProvider>
			<div className="min-h-screen bg-white text-[#1A1916] font-inter">
				<Navbar />
				<main className="pt-32 pb-20 px-6">
					<div className="max-w-3xl mx-auto">
						<h1 className="text-4xl md:text-5xl font-normal tracking-[-1.5px] text-[#1A1916] mb-4">
							Privacy Policy
						</h1>
						<p className="text-[#5C584F] text-sm mb-12">
							Last updated: February 24, 2026
						</p>

						<div className="space-y-10 text-[#5C584F] text-base leading-relaxed">
							<section>
								<h2 className="text-xl font-normal text-[#1A1916] mb-4">
									1. Information We Collect
								</h2>
								<p className="mb-3">
									When you use our services, we may collect the following types of
									information:
								</p>
								<ul className="list-disc pl-6 space-y-2">
									<li>
										<strong className="text-[#1A1916]">Contact information</strong>{" "}
										— name, email address, phone number, and company name provided
										through our forms.
									</li>
									<li>
										<strong className="text-[#1A1916]">Professional information</strong>{" "}
										— resume, portfolio links, GitHub profile, and technical
										assessment results (Flux scores).
									</li>
									<li>
										<strong className="text-[#1A1916]">Usage data</strong> — pages
										visited, time spent, and interaction patterns on our website.
									</li>
								</ul>
							</section>

							<section>
								<h2 className="text-xl font-normal text-[#1A1916] mb-4">
									2. How We Use Your Information
								</h2>
								<p>We use collected information to:</p>
								<ul className="list-disc pl-6 space-y-2 mt-3">
									<li>Match candidates with appropriate engineering roles.</li>
									<li>Communicate with you about opportunities, services, and updates.</li>
									<li>Improve our platform, including Flux benchmarking tools.</li>
									<li>Comply with legal obligations.</li>
								</ul>
							</section>

							<section>
								<h2 className="text-xl font-normal text-[#1A1916] mb-4">
									3. Data Sharing
								</h2>
								<p>
									We do not sell your personal data. We may share your information
									with hiring companies only with your explicit consent during the
									recruitment process. We may share anonymized, aggregated data for
									research and benchmarking purposes.
								</p>
							</section>

							<section>
								<h2 className="text-xl font-normal text-[#1A1916] mb-4">
									4. Data Security
								</h2>
								<p>
									We implement industry-standard security measures to protect your
									personal information, including encryption in transit and at rest,
									access controls, and regular security audits.
								</p>
							</section>

							<section>
								<h2 className="text-xl font-normal text-[#1A1916] mb-4">
									5. Your Rights
								</h2>
								<p>You have the right to:</p>
								<ul className="list-disc pl-6 space-y-2 mt-3">
									<li>Access, correct, or delete your personal data.</li>
									<li>Withdraw consent for data processing at any time.</li>
									<li>Request a copy of your data in a portable format.</li>
									<li>Object to processing of your personal data.</li>
								</ul>
							</section>

							<section>
								<h2 className="text-xl font-normal text-[#1A1916] mb-4">
									6. Cookies
								</h2>
								<p>
									Our website uses essential cookies to ensure proper functionality.
									We do not use third-party tracking cookies. Analytics, if
									implemented, will respect your browser's Do Not Track preferences.
								</p>
							</section>

							<section>
								<h2 className="text-xl font-normal text-[#1A1916] mb-4">
									7. Contact
								</h2>
								<p>
									For privacy-related inquiries, contact us at{" "}
									<a
										href="mailto:privacy@naironai.com"
										className="text-[#C9A96E] hover:underline"
									>
										privacy@naironai.com
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
