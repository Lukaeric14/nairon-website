import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing-v2/hero";
import { Footer } from "@/components/landing-v2/footer";
import { useCalInit } from "@/components/landing-v2/cal";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/terms-and-conditions")({
	component: TermsPage,
	head: () =>
		seoHead({
			title: "Terms & Conditions — Nairon AI",
			description:
				"Terms and conditions for using Nairon AI services, including our AI workforce platform.",
			path: "/terms-and-conditions",
		}),
});

function TermsPage() {
	useCalInit();
	return (
		<div className="font-geist min-h-screen" style={{ backgroundColor: "var(--ds-shell)" }}>
			<Navbar />
			<main className="pt-32 pb-20 px-6">
				<div className="max-w-3xl mx-auto">
					<h1 className="text-4xl md:text-5xl font-medium tracking-[-1.5px] text-ds-text-primary mb-4">
						Terms &amp; Conditions
					</h1>
					<p className="text-ds-text-tertiary text-sm mb-12">
						Last updated: February 24, 2026
					</p>

					<div className="space-y-10 text-ds-text-secondary text-base leading-relaxed">
						<section>
							<h2 className="text-xl font-medium text-ds-text-primary mb-4">
								1. Acceptance of Terms
							</h2>
							<p>
								By accessing or using the Nairon AI website and services
								(naironai.com), you agree to be bound by these Terms and
								Conditions. If you do not agree, please do not use our services.
							</p>
						</section>

						<section>
							<h2 className="text-xl font-medium text-ds-text-primary mb-4">
								2. Services
							</h2>
							<p>
								Nairon AI provides AI workforce solutions, including AI employee
								design, deployment, and managed operations services. We reserve
								the right to modify, suspend, or discontinue any part of our
								services at any time.
							</p>
						</section>

						<section>
							<h2 className="text-xl font-medium text-ds-text-primary mb-4">
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
							<h2 className="text-xl font-medium text-ds-text-primary mb-4">
								4. Intellectual Property
							</h2>
							<p>
								All content on this website, including text, graphics, logos, and
								software, is the property of Nairon AI or its licensors and is
								protected by intellectual property laws.
							</p>
						</section>

						<section>
							<h2 className="text-xl font-medium text-ds-text-primary mb-4">
								5. Limitation of Liability
							</h2>
							<p>
								Nairon AI shall not be liable for any indirect, incidental,
								special, or consequential damages arising from the use of our
								services. Our total liability is limited to the fees paid for the
								specific service giving rise to the claim.
							</p>
						</section>

						<section>
							<h2 className="text-xl font-medium text-ds-text-primary mb-4">
								6. Governing Law
							</h2>
							<p>
								These terms are governed by the laws of the State of Florida, United States.
								Any disputes shall be resolved in the courts of Miami-Dade County, Florida.
							</p>
						</section>

						<section>
							<h2 className="text-xl font-medium text-ds-text-primary mb-4">
								7. Contact
							</h2>
							<p>
								For questions about these terms, contact us at{" "}
								<a
									href="mailto:legal@naironai.com"
									className="hover:underline"
									style={{ color: "var(--brand-blue)" }}
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
	);
}
