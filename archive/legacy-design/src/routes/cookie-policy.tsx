import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing-v2/hero";
import { Footer } from "@/components/landing-v2/footer";
import { useCalInit } from "@/components/landing-v2/cal";
import { seoHead, breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/cookie-policy")({
	component: CookiePolicyPage,
	head: () => ({
		...seoHead({
			title: "Cookie Policy - Nairon AI",
			description:
				"Learn how Nairon AI uses cookies and local storage on our website.",
			path: "/cookie-policy",
		}),
		scripts: [
			{
				type: "application/ld+json",
				children: JSON.stringify(breadcrumbJsonLd([
					{ name: "Home", path: "/" },
					{ name: "Cookie Policy", path: "/cookie-policy" },
				])),
			},
		],
	}),
});

function CookiePolicyPage() {
	useCalInit();
	return (
		<div className="font-geist min-h-screen" style={{ backgroundColor: "var(--ds-shell)" }}>
			<Navbar />
			<main className="pt-32 pb-20 px-6">
				<div className="max-w-3xl mx-auto">
					<h1 className="text-4xl md:text-5xl font-medium tracking-[-1.5px] text-ds-text-primary mb-4">
						Cookie Policy
					</h1>
					<p className="text-ds-text-tertiary text-sm mb-12">
						Last updated: February 24, 2026
					</p>

					<div className="space-y-10 text-ds-text-secondary text-base leading-relaxed">
						<section>
							<h2 className="text-xl font-medium text-ds-text-primary mb-4">
								1. What Are Cookies
							</h2>
							<p>
								Cookies are small text files that are stored on your device
								when you visit a website. They help the website remember your
								preferences and improve your browsing experience. We also use
								similar technologies such as localStorage, which stores data
								directly in your browser.
							</p>
						</section>

						<section>
							<h2 className="text-xl font-medium text-ds-text-primary mb-4">
								2. Essential Cookies We Use
							</h2>
							<p className="mb-3">
								We use a limited set of essential cookies that are necessary
								for the proper functioning of our website:
							</p>
							<ul className="list-disc pl-6 space-y-2">
								<li>
									<strong className="text-ds-text-primary">Authentication session cookies</strong>:{" "}
									used to keep you signed in after logging in with your
									email/password or Google account via Better-Auth. These
									cookies are strictly necessary and expire when your session
									ends or after a set period of inactivity.
								</li>
								<li>
									<strong className="text-ds-text-primary">User preference cookies</strong>:{" "}
									used to remember your settings and preferences across
									visits, such as theme or dismissed notices.
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-xl font-medium text-ds-text-primary mb-4">
								3. Local Storage Usage
							</h2>
							<p className="mb-3">
								In addition to cookies, we use your browser's localStorage to
								enhance your experience:
							</p>
							<ul className="list-disc pl-6 space-y-2">
								<li>
									<strong className="text-ds-text-primary">Article view tracking</strong>:{" "}
									we store a count of Signals articles you have viewed in
									localStorage. This data never leaves your browser and is
									not transmitted to our servers.
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-xl font-medium text-ds-text-primary mb-4">
								4. No Third-Party Tracking Cookies
							</h2>
							<p>
								We do not use any third-party tracking cookies. We do not embed
								advertising trackers, social media pixels, or cross-site
								tracking technologies. Any analytics we implement will respect
								your browser's Do Not Track (DNT) preferences.
							</p>
						</section>

						<section>
							<h2 className="text-xl font-medium text-ds-text-primary mb-4">
								5. Managing and Disabling Cookies
							</h2>
							<p className="mb-3">
								You can manage or disable cookies through your browser
								settings. Please note that disabling essential cookies may
								affect the functionality of our website, particularly
								authentication features. Here is how to manage cookies in
								common browsers:
							</p>
							<ul className="list-disc pl-6 space-y-2">
								<li>
									<strong className="text-ds-text-primary">Chrome</strong>:
									Settings &gt; Privacy and Security &gt; Cookies and other
									site data.
								</li>
								<li>
									<strong className="text-ds-text-primary">Firefox</strong>:
									Settings &gt; Privacy &amp; Security &gt; Cookies and Site
									Data.
								</li>
								<li>
									<strong className="text-ds-text-primary">Safari</strong>:
									Preferences &gt; Privacy &gt; Manage Website Data.
								</li>
								<li>
									<strong className="text-ds-text-primary">Edge</strong>:
									Settings &gt; Cookies and site permissions &gt; Manage and
									delete cookies and site data.
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-xl font-medium text-ds-text-primary mb-4">
								6. Changes to This Policy
							</h2>
							<p>
								We may update this Cookie Policy from time to time. Any changes
								will be posted on this page with an updated revision date. We
								encourage you to review this policy periodically.
							</p>
						</section>

						<section>
							<h2 className="text-xl font-medium text-ds-text-primary mb-4">
								7. Contact
							</h2>
							<p>
								For questions about our use of cookies, contact us at{" "}
								<a
									href="mailto:privacy@naironai.com"
									className="hover:underline"
									style={{ color: "var(--brand-blue)" }}
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
	);
}
