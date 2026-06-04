import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

/**
 * Site footer — deep-navy block with a bright-blue CTA band up top, link
 * columns, an oversized faint wordmark, and a bottom bar. Full-bleed; inner
 * content is constrained to max-w-6xl to line up with the hero and logo cloud.
 * Colors reference the locked Lapis brand via CSS vars (--brand-deep/-blue).
 */

const COLUMNS: { title: string; links: string[] }[] = [
	{ title: "Product", links: ["How it works", "Our agents", "Case studies", "Security"] },
	{ title: "Company", links: ["About", "Careers", "Changelog", "Contact"] },
	{ title: "Resources", links: ["Docs", "Pricing", "FAQ", "Status"] },
	{ title: "Legal", links: ["Privacy", "Terms", "Acceptable use", "Cookies"] },
];

function FooterLink({ label }: { label: string }) {
	return (
		<li>
			<a
				href="#"
				className="text-[0.875rem] text-white/55 transition-colors hover:text-white"
			>
				{label}
			</a>
		</li>
	);
}

export function Footer() {
	return (
		<footer
			className="font-geist overflow-hidden text-white"
			style={{ backgroundColor: "var(--brand-deep)" }}
		>
			{/* CTA band */}
			<div className="border-b border-white/10">
				<div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
					<h2 className="max-w-xl text-3xl font-medium tracking-tight sm:text-4xl">
						Ready to put AI employees to work?
					</h2>
					<button
						type="button"
						className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl px-6 py-3.5 text-[0.9375rem] font-medium text-white transition-all hover:brightness-110"
						style={{ backgroundColor: "var(--brand-blue)" }}
					>
						Book a call
						<ArrowUpRightIcon className="size-4" />
					</button>
				</div>
			</div>

			{/* Link columns */}
			<div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.2fr_repeat(4,minmax(0,1fr))]">
				<div>
					<img
						src="/nairon-logo.png"
						alt="Nairon"
						width={600}
						height={120}
						className="h-7 w-auto"
					/>
					<p className="mt-4 max-w-[15rem] text-[0.875rem] leading-relaxed text-white/55">
						AI employees built around your workflows, deployed inside your
						existing systems.
					</p>
				</div>

				{COLUMNS.map((col) => (
					<div key={col.title}>
						<div className="mb-3.5 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-white/40">
							{col.title}
						</div>
						<ul className="space-y-2.5">
							{col.links.map((l) => (
								<FooterLink key={l} label={l} />
							))}
						</ul>
					</div>
				))}
			</div>

			{/* Oversized wordmark — full-width white logo, faint */}
			<div className="mx-auto max-w-6xl px-5 sm:px-8">
				<img
					src="/nairon-logo.png"
					alt=""
					aria-hidden
					className="w-full select-none"
					style={{
						opacity: 0.2,
						maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
						WebkitMaskImage:
							"linear-gradient(to bottom, transparent 0%, black 100%)",
					}}
				/>
			</div>

			{/* Bottom bar */}
			<div className="border-t border-white/10">
				<div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-[0.8125rem] text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-8">
					<span>© 2026 Nairon, Inc. All rights reserved.</span>
					<div className="flex items-center gap-5">
						<a href="#" className="transition-colors hover:text-white">
							X / Twitter
						</a>
						<a href="#" className="transition-colors hover:text-white">
							LinkedIn
						</a>
						<a href="#" className="transition-colors hover:text-white">
							GitHub
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
