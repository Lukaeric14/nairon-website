import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { DsButton } from "@/components/ui/ds-button";
import { HeroDots } from "./hero-dots";

const NAV = ["Product", "How it works", "Case studies", "Careers", "FAQ"];

export function Navbar() {
	return (
		<header className="sticky top-0 z-50 border-b border-ds-border/70 bg-ds-shell/85 backdrop-blur-md">
			<nav className="mx-auto relative flex max-w-6xl items-center justify-between px-5 py-4">
				<a href="/" className="flex items-center">
					<img
						src="/nairon-logo.png"
						alt="Nairon"
						width={600}
						height={120}
						className="h-7 w-auto [filter:brightness(0)]"
					/>
				</a>
				<div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 md:flex">
					{NAV.map((item) => (
						<a
							key={item}
							href="#"
							className="text-[0.875rem] font-medium text-ds-text-secondary transition-colors hover:text-ds-text-primary"
						>
							{item}
						</a>
					))}
				</div>
				<div className="flex items-center gap-2">
					<DsButton variant="ghost" size="md" className="hidden sm:inline-flex">
						Login
					</DsButton>
					<DsButton variant="brand" size="md">
						Start building
						<ArrowRightIcon />
					</DsButton>
				</div>
			</nav>
		</header>
	);
}

// Kept for re-use when there's a real announcement (see LandingHero).
export function AnnouncementPill() {
	return (
		<a
			href="#"
			className="inline-flex items-center gap-2.5 rounded-full border border-ds-border bg-ds-surface-raised py-1 pl-1 pr-3 text-[0.8125rem] shadow-sm transition-colors hover:bg-ds-surface-hover"
		>
			<span
				className="rounded-full px-2.5 py-0.5 text-[0.6875rem] font-medium text-white"
				style={{ backgroundColor: "var(--brand-blue)" }}
			>
				New
			</span>
			<span className="font-medium text-ds-text-primary">
				The Nairon brand is live
			</span>
			<ArrowRightIcon className="size-3.5 text-ds-text-tertiary" />
		</a>
	);
}

export function LandingHero() {
	return (
		<section className="relative bg-ds-surface font-geist text-ds-text-primary">
			{/* ── Hero region — prominent wave-dot field behind the content ── */}
			<div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden">
				<HeroDots className="pointer-events-none absolute inset-0 z-0" />

				<div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 py-20 text-center">
					{/* Hidden for now — re-enable when we have an announcement */}
					{/* <AnnouncementPill /> */}

					<h1 className="mt-8 text-5xl font-medium leading-[1.04] tracking-tight sm:text-6xl md:text-7xl">
						The AI workforce for
						<br />
						modern teams
						<span style={{ color: "var(--brand-blue)" }}>.</span>
					</h1>

					<p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ds-text-secondary">
						Nairon builds AI employees around your real workflows and deploys
						them inside the systems you already run — measurable outcomes,
						no migrations, no new software to learn.
					</p>

					<div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
						<DsButton variant="brand" size="lg">
							Start building
							<ArrowRightIcon />
						</DsButton>
						<DsButton variant="secondary" size="lg">
							Talk to founder
						</DsButton>
					</div>

					<a
						href="#"
						className="mt-5 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-ds-text-secondary transition-colors hover:text-ds-text-primary"
					>
						Book an AI opportunity audit
						<ArrowRightIcon className="size-3.5" />
					</a>
				</div>
			</div>
		</section>
	);
}
