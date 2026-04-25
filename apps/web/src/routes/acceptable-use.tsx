import { createFileRoute } from "@tanstack/react-router";
import { Navbar, Footer } from "@/components/landing";
import { ModalProvider } from "@/components/landing/modal-provider";
import { HireModal } from "@/components/landing/hire-modal";
import { CandidateModal } from "@/components/landing/candidate-modal";
import { seoHead, breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/acceptable-use")({
	component: AcceptableUsePage,
	head: () => ({
		...seoHead({
			title: "Acceptable Use Policy — Nairon AI",
			description:
				"Rules and guidelines for using the Nairon AI platform, NBench tool, and blog content.",
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
	return (
		<ModalProvider>
			<div className="min-h-screen bg-white text-[#1A1916] font-inter">
				<Navbar />
				<main className="pt-32 pb-20 px-6">
					<div className="max-w-3xl mx-auto">
						<h1 className="text-4xl md:text-5xl font-normal tracking-[-1.5px] text-[#1A1916] mb-4">
							Acceptable Use Policy
						</h1>
						<p className="text-[#5C584F] text-sm mb-12">
							Last updated: February 24, 2026
						</p>

						<div className="space-y-10 text-[#5C584F] text-base leading-relaxed">
							<section>
								<h2 className="text-xl font-normal text-[#1A1916] mb-4">
									1. Purpose
								</h2>
								<p>
									This Acceptable Use Policy outlines the rules and expectations
									for using the Nairon AI platform (naironai.com), including our
									recruiting services, the NBench open-source benchmarking tool,
									and all blog and editorial content. By accessing or using our
									services, you agree to comply with this policy.
								</p>
							</section>

							<section>
								<h2 className="text-xl font-normal text-[#1A1916] mb-4">
									2. Prohibited Conduct
								</h2>
								<p className="mb-3">
									You may not use our services to engage in any of the following
									activities:
								</p>
								<ul className="list-disc pl-6 space-y-2">
									<li>
										<strong className="text-[#1A1916]">Misrepresentation</strong>{" "}
										— providing false, misleading, or fraudulent information in
										your profile, resume, or any communication with Nairon AI
										or prospective employers.
									</li>
									<li>
										<strong className="text-[#1A1916]">Scraping and data harvesting</strong>{" "}
										— using automated tools, bots, or scripts to scrape,
										crawl, or extract data from our website, APIs, or platform
										without prior written consent.
									</li>
									<li>
										<strong className="text-[#1A1916]">Unauthorized access</strong>{" "}
										— attempting to gain access to accounts, systems, or data
										that you are not authorized to access, including bypassing
										authentication or security measures.
									</li>
									<li>
										<strong className="text-[#1A1916]">Abuse of the benchmarking system</strong>{" "}
										— manipulating, gaming, or falsifying NBench assessment
										results, including but not limited to using unauthorized
										assistance, submitting work completed by others, or
										exploiting technical vulnerabilities.
									</li>
									<li>
										<strong className="text-[#1A1916]">Spam and unsolicited communications</strong>{" "}
										— using our platform to send bulk unsolicited messages,
										advertisements, or promotional content to other users.
									</li>
									<li>
										<strong className="text-[#1A1916]">Illegal activity</strong>{" "}
										— using our services for any purpose that violates
										applicable laws or regulations, including those of the
										United Arab Emirates.
									</li>
									<li>
										<strong className="text-[#1A1916]">Disruption of services</strong>{" "}
										— interfering with the availability, performance, or
										security of our platform, including denial-of-service
										attacks or introducing malicious code.
									</li>
								</ul>
							</section>

							<section>
								<h2 className="text-xl font-normal text-[#1A1916] mb-4">
									3. User-Generated Content
								</h2>
								<p className="mb-3">
									When creating profiles, submitting assessments, or
									contributing any content to our platform, you agree that:
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
										license to use it in connection with our recruiting and
										benchmarking services as described in our Terms and
										Conditions.
									</li>
									<li>
										Assessment submissions and NBench results may be shared
										with prospective employers only with your consent.
									</li>
								</ul>
							</section>

							<section>
								<h2 className="text-xl font-normal text-[#1A1916] mb-4">
									4. Blog and Editorial Content
								</h2>
								<p>
									Our blog content is provided for informational purposes. You
									may share and reference our articles with proper attribution.
									Reproducing, republishing, or redistributing our content in
									full without written permission is prohibited. The 3-article
									free reading limit is enforced per browser; circumventing this
									limit through technical means is a violation of this policy.
								</p>
							</section>

							<section>
								<h2 className="text-xl font-normal text-[#1A1916] mb-4">
									5. Enforcement
								</h2>
								<p className="mb-3">
									Nairon AI reserves the right to take action against any user
									who violates this policy. Actions may include:
								</p>
								<ul className="list-disc pl-6 space-y-2">
									<li>
										Issuing a warning for minor or first-time violations.
									</li>
									<li>
										Temporarily suspending your access to our platform and
										services.
									</li>
									<li>
										Permanently terminating your account and revoking access to
										all Nairon AI services.
									</li>
									<li>
										Invalidating NBench assessment results obtained through
										prohibited means.
									</li>
									<li>
										Reporting illegal activity to the relevant authorities.
									</li>
								</ul>
								<p className="mt-3">
									We will make reasonable efforts to notify you before taking
									enforcement action, except where immediate action is necessary
									to protect the integrity of our platform or other users.
								</p>
							</section>

							<section>
								<h2 className="text-xl font-normal text-[#1A1916] mb-4">
									6. Reporting Violations
								</h2>
								<p>
									If you become aware of any conduct that violates this policy,
									please report it to us. We take all reports seriously and will
									investigate promptly.
								</p>
							</section>

							<section>
								<h2 className="text-xl font-normal text-[#1A1916] mb-4">
									7. Contact
								</h2>
								<p>
									For questions about this policy or to report a violation,
									contact us at{" "}
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
