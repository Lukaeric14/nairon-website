import { ArrowUpRightIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { slugify } from "@/content/verticals";
import { CAL_ATTRS } from "./cal";
import { LINKS, MENUS } from "./hero";

/**
 * Site footer — deep-navy block with a bright-blue CTA band up top, link
 * columns, an oversized faint wordmark, and a bottom bar. Full-bleed; inner
 * content is constrained to max-w-6xl to line up with the hero and logo cloud.
 * Colors reference the locked Lapis brand via CSS vars (--brand-deep/-blue).
 */

// Footer link columns mirror the navbar mega-menus 1:1 (single source of truth
// in hero.tsx): Industries, Solutions, AI Training, Company. The standalone nav
// link (AI Academy) is surfaced under AI Training. Hrefs are resolved exactly
// the way the navbar resolves them, so the two can never drift.
type FooterLinkItem = { label: string; href: string; external?: boolean };

const resolveItemHref = (menuId: string, href: string, title: string) =>
	href && href !== "#" ? href : `/${menuId}/${slugify(title)}`;

const isExternal = (href: string) => /^https?:\/\//.test(href);

const COLUMNS: { title: string; links: FooterLinkItem[] }[] = MENUS.map((menu) => {
	const links: FooterLinkItem[] = menu.items.map((item) => ({
		label: item.title,
		href: resolveItemHref(menu.id, item.href, item.title),
		external: isExternal(item.href),
	}));
	if (menu.id === "ai-training") {
		for (const link of LINKS) {
			links.push({ label: link.label, href: link.href, external: link.external });
		}
	}
	return { title: menu.label, links };
});

function FooterLink({ label, href, external }: FooterLinkItem) {
	return (
		<li>
			<a
				href={href}
				{...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
				className="text-[0.875rem] text-white/55 transition-colors hover:text-white"
			>
				{label}
			</a>
		</li>
	);
}

// Social links (verified handles, also mirrored in lib/seo.ts sameAs).
const SOCIALS = [
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/company/nairon-ai",
		path: "M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24ZM96,176a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0ZM88,96a12,12,0,1,1,12-12A12,12,0,0,1,88,96Zm96,80a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140Z",
	},
	{
		label: "X / Twitter",
		href: "https://x.com/nairon__ai",
		path: "M218.12,209.56l-61-95.8,59.72-69.36a12,12,0,1,0-18.2-15.64L142.82,93.08,99.56,25.16A12,12,0,0,0,89.13,20H48a12,12,0,0,0-10.12,18.44l61,95.8L39.16,203.6a12,12,0,0,0,18.2,15.64l55.82-64.88L156.44,222.84A12,12,0,0,0,166.87,228H208a12,12,0,0,0,10.12-18.44ZM97.29,44l55.22,88-20.67,24L68.83,44ZM158.71,204l-55.22-88,20.67-24L187.17,204Z",
	},
];

function FooterSocials() {
	return (
		<div className="flex items-center gap-4">
			{SOCIALS.map((s) => (
				<a
					key={s.label}
					href={s.href}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={s.label}
					className="text-white/45 transition-colors hover:text-white"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 256 256"
						className="size-[1.125rem]"
						fill="currentColor"
						aria-hidden="true"
					>
						<path d={s.path} />
					</svg>
				</a>
			))}
		</div>
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
						{...CAL_ATTRS}
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
					<div className="mt-5">
						<p className="text-[0.8125rem] leading-relaxed text-white/45">
							2125 Biscayne Blvd<br />Miami, FL 33137<br />United States
						</p>
					</div>
					<div className="mt-5 flex flex-col gap-2">
						<div className="flex items-center gap-1.5 text-[0.75rem] text-white/40">
							<ShieldCheckIcon className="size-3.5 shrink-0" />
							<span>Enterprise-grade security</span>
						</div>
					</div>
				</div>

				{COLUMNS.map((col) => (
					<div key={col.title}>
						<div className="mb-3.5 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-white/40">
							{col.title}
						</div>
						<ul className="space-y-2.5">
							{col.links.map((l) => (
								<FooterLink
									key={l.label}
									label={l.label}
									href={l.href}
									external={l.external}
								/>
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
				<div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 text-[0.8125rem] text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-8">
					<div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
						<span>© 2026 Nairon, Inc. All rights reserved.</span>
						<a href="/privacy" className="transition-colors hover:text-white">
							Privacy
						</a>
						<a
							href="/terms-and-conditions"
							className="transition-colors hover:text-white"
						>
							Terms &amp; Conditions
						</a>
						<a
							href="/cookie-policy"
							className="transition-colors hover:text-white"
						>
							Cookie Policy
						</a>
						<a
							href="/acceptable-use"
							className="transition-colors hover:text-white"
						>
							Acceptable Use
						</a>
					</div>
					<FooterSocials />
				</div>
			</div>
		</footer>
	);
}
