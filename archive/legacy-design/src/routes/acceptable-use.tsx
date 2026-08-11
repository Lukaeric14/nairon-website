import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing-v2/hero";
import { Footer } from "@/components/landing-v2/footer";
import { useCalInit } from "@/components/landing-v2/cal";
import { seoHead, breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/acceptable-use")({
	component: AcceptableUsePage,
	head: () => ({
		...seoHead({
			title: "Acceptable Use Policy - Nairon AI",
			description:
				"Rules and guidelines for using the Nairon AI platform and Signals content.",
			path: "/acceptable-use",
		}),
		scripts: [
			{
				type: "application/ld+json",
				children: JSON.stringify(breadcrumbJsonLd([
					{ name: "Home", path: "/" },
					{ name: "Acceptable Use Policy", path: "/acceptable-use" },
				])),
			},
		],
	}),
});

function AcceptableUsePage() {
	useCalInit();
	return (
		<div className="font-geist min-h-screen" style={{ backgroundColor: "var(--ds-shell)" }}>
			<Navbar />
			<main className="pt-32 pb-20 px-6">
				<div className="max-w-3xl mx-auto">
					<h1 className="text-4xl md:text-5xl font-medium tracking-[-1.5px] text-ds-text-primary mb-4">
						Acceptable Use Policy
					</h1>
					<p className="text-ds-text-tertiary text-sm mb-12">
						Last updated: February 24, 2026
					</p>

					<div className="space-y-10 text-ds-text-secondary text-base leading-relaxed">
						<section>
							<h2 className="text-xl font-medium text-ds-text-primary mb-4">
								1. Purpose
							</h2>
							<p>
								This Acceptable Use Policy outlines the rules and expectations
								for using the Nairon AI platform (naironai.com), including our
								AI workforce services and all Signals and editorial content. By
								accessing or using our services, you agree to comply with this policy.
							</p>
						</section>

						<section>
							<h2 className="text-xl font-medium text-ds-text-primary mb-4">
								2. Prohibited Conduct
							</h2>
							<p className="mb-3">
								You may not use our services to engage in any of the following
								activities:
							</p>
							<ul className="list-disc pl-6 space-y-2">
								<li>
									<strong className="text-ds-text-primary">Misrepresentation</strong>:{" "}
									providing false, misleading, or fraudulent information in
									any communication with Nairon AI or its clients.
								</li>
								<li>
									<strong className="text-ds-text-primary">Scraping and data harvesting</strong>:{" "}
									using automated tools, bots, or scripts to scrape,
									crawl, or extract data from our website or platform
									without prior written consent.
								</li>
								<li>
									<strong className="text-ds-text-primary">Unauthorized access</strong>:{" "}
									attempting to gain access to accounts, systems, or data
									that you are not authorized to access, including bypassing
									authentication or security measures.
								</li>
								<li>
									<strong className="text-ds-text-primary">Spam and unsolicited communications</strong>:{" "}
									using our platform to send bulk unsolicited messages,
									advertisements, or promotional content to other users.
								</li>
								<li>
									<strong className="text-ds-text-primary">Illegal activity</strong>:{" "}
									using our services for any purpose that violates
									applicable laws or regulations, including those applicable
									in the United States.
								</li>
								<li>
									<strong className="text-ds-text-primary">Disruption of services</strong>:{" "}
									interfering with the availability, performance, or
									security of our platform, including denial-of-service
									attacks or introducing malicious code.
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-xl font-medium text-ds-text-primary mb-4">
								3. User-Generated Content
							</h2>
							<p className="mb-3">
								When submitting any content to our platform, you agree that:
							</p>
							<ul className="list-disc pl-6 space-y-2">
								<li>
									All information you provide is accurate, current, and
									complete to the best of your knowledge.
								</li>
								<li>
									You will not upload or share content that is defamatory,
									obscene, hateful, or infringes on the intellectual property
									rights of others.
								</li>
								<li>
									You retain ownership of your content but grant Nairon AI a
									license to use it in connection with our services as
									described in our Terms and Conditions.
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-xl font-medium text-ds-text-primary mb-4">
								4. Signals and Editorial Content
							</h2>
							<p>
								Our Signals content is provided for informational purposes. You
								may share and reference our articles with proper attribution.
								Reproducing, republishing, or redistributing our content in
								full without written permission is prohibited.
							</p>
						</section>

						<section>
							<h2 className="text-xl font-medium text-ds-text-primary mb-4">
								5. Enforcement
							</h2>
							<p className="mb-3">
								Nairon AI reserves the right to take action against any user
								who violates this policy. Actions may include:
							</p>
							<ul className="list-disc pl-6 space-y-2">
								<li>Issuing a warning for minor or first-time violations.</li>
								<li>
									Temporarily suspending your access to our platform and
									services.
								</li>
								<li>
									Permanently terminating your account and revoking access to
									all Nairon AI services.
								</li>
								<li>Reporting illegal activity to the relevant authorities.</li>
							</ul>
						</section>

						<section>
							<h2 className="text-xl font-medium text-ds-text-primary mb-4">
								6. Reporting Violations
							</h2>
							<p>
								If you become aware of any conduct that violates this policy,
								please report it to us. We take all reports seriously and will
								investigate promptly.
							</p>
						</section>

						<section>
							<h2 className="text-xl font-medium text-ds-text-primary mb-4">
								7. Contact
							</h2>
							<p>
								For questions about this policy or to report a violation,
								contact us at{" "}
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
