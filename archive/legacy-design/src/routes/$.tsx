import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing-v2/hero";
import { Footer } from "@/components/landing-v2/footer";
import { useCalInit } from "@/components/landing-v2/cal";
import { seoHead } from "@/lib/seo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export const Route = createFileRoute("/$")({
	component: NotFoundPage,
	head: () =>
		seoHead({
			title: "Page Not Found - Nairon AI",
			description:
				"The page you're looking for doesn't exist. Explore Nairon AI or read our latest Signals.",
			path: "/404",
			noindex: true,
		}),
});

function NotFoundPage() {
	useCalInit();
	return (
		<div className="font-geist min-h-screen flex flex-col" style={{ backgroundColor: "var(--ds-shell)" }}>
			<Navbar />
			<main className="flex-1 flex items-center justify-center px-6 py-32">
				<div className="max-w-lg text-center">
					<p
						className="font-geist-mono text-[0.6875rem] font-medium uppercase tracking-[0.16em] mb-6"
						style={{ color: "var(--brand-blue)" }}
					>
						404
					</p>
					<h1 className="text-5xl md:text-6xl font-medium tracking-[-1.5px] text-ds-text-primary mb-5">
						Page not found
					</h1>
					<p className="text-[1.0625rem] leading-relaxed text-ds-text-tertiary mb-10 max-w-sm mx-auto">
						The page you're looking for doesn't exist or has been moved.
					</p>

					<div className="flex flex-wrap justify-center gap-3">
						<a
							href="/"
							className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[0.9375rem] font-medium text-white transition-all hover:brightness-110"
							style={{ backgroundColor: "var(--brand-blue)" }}
						>
							Back to home
							<ArrowRightIcon className="size-4" />
						</a>
						<a
							href="/signals"
							className="inline-flex items-center gap-2 rounded-xl border border-ds-border px-6 py-3 text-[0.9375rem] font-medium text-ds-text-secondary transition-colors hover:text-ds-text-primary hover:border-ds-border-strong"
						>
							Read Signals
						</a>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
