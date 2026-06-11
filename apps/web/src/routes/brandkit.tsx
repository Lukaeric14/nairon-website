import { createFileRoute } from "@tanstack/react-router";
import { useState, type CSSProperties } from "react";
import {
	WrenchScrewdriverIcon,
	FunnelIcon,
	SparklesIcon,
	BoltIcon,
	UserGroupIcon,
	CalendarDaysIcon,
	ChartBarIcon,
	InboxStackIcon,
	DocumentTextIcon,
	Cog6ToothIcon,
	BellIcon,
	CheckBadgeIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { AgentShowcase } from "@/components/brandkit/agent-showcase";
import { HeroSection } from "@/components/brandkit/hero-section";
import { StepsSection } from "@/components/brandkit/steps-section";
import { GradientCardsSection } from "@/components/brandkit/gradient-cards-section";
import { FooterSection } from "@/components/brandkit/footer-section";
import { DsButton } from "@/components/ui/ds-button";
import { PALETTES, DEFAULT_PALETTE, type Palette } from "@/components/brandkit/palettes";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/brandkit")({
	component: BrandKitPage,
	head: () =>
		seoHead({
			title: "Nairon - Brand Kit",
			description: "Design tokens, typography, and palette tests for the Nairon rebrand.",
			path: "/brandkit",
		}),
});

function BrandKitPage() {
	const [palette, setPalette] = useState<Palette>(DEFAULT_PALETTE);
	const [dark, setDark] = useState(false);
	const [slide, setSlide] = useState(0);

	const slides: { id: string; label: string; node: React.ReactNode }[] = [
		{ id: "hero", label: "Hero", node: <HeroSection /> },
		{ id: "steps", label: "How it works", node: <StepsSection /> },
		{ id: "agents", label: "Agents in production", node: <AgentShowcase /> },
		{ id: "gradient", label: "Gradient card", node: <GradientCardsSection /> },
		{ id: "footer", label: "Footer", node: <FooterSection /> },
	];
	const total = slides.length;
	const go = (dir: number) => setSlide((s) => (s + dir + total) % total);
	const current = slides[slide];

	const paletteVars = {
		"--brand-blue": palette.bright,
		"--brand-deep": palette.deep,
		"--brand-mid": palette.mid,
	} as CSSProperties;

	return (
		<div
			// Own scroll container + data-lenis-prevent so `sticky top-0` works:
			// the global Lenis smooth-scroll + `overflow-x:hidden` on html/body
			// otherwise defeat sticky-against-the-window.
			data-lenis-prevent
			className={`${dark ? "dark" : ""} font-geist h-screen overflow-y-auto overflow-x-hidden bg-ds-surface text-ds-text-primary`}
			style={paletteVars}
		>
			{/* ── Sticky control bar ── */}
			<header className="sticky top-0 z-30 border-b border-ds-border bg-ds-surface/85 backdrop-blur-md">
				<div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-3.5 lg:flex-row lg:items-center lg:justify-between">
					<div className="flex items-center gap-3">
						<span
							className="grid size-7 place-items-center rounded-md text-[0.8125rem] font-semibold text-white"
							style={{ backgroundColor: "var(--brand-blue)" }}
						>
							N
						</span>
						<div>
							<div className="text-sm font-medium leading-none">Brand Kit</div>
							<div className="mt-1 text-[0.6875rem] text-ds-text-tertiary">
								{PALETTES.length > 1
									? `Testing ${PALETTES.length} blue palettes`
									: `Locked: ${PALETTES[0].name}`}
							</div>
						</div>
					</div>

					<div className="flex flex-wrap items-center gap-2">
						{PALETTES.map((p) => (
							<button
								type="button"
								key={p.id}
								onClick={() => setPalette(p)}
								className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 transition-all ${
									palette.id === p.id
										? "border-ds-text-primary bg-ds-surface-hover"
										: "border-ds-border hover:bg-ds-surface-hover"
								}`}
							>
								<span className="flex">
									<span
										className="size-3.5 rounded-l-[3px]"
										style={{ backgroundColor: p.bright }}
									/>
									<span className="size-3.5" style={{ backgroundColor: p.mid }} />
									<span
										className="size-3.5 rounded-r-[3px]"
										style={{ backgroundColor: p.deep }}
									/>
								</span>
								<span className="text-[0.8125rem] font-medium">{p.name}</span>
							</button>
						))}
						<button
							type="button"
							onClick={() => setDark((v) => !v)}
							className="ml-1 rounded-lg border border-ds-border px-3 py-1.5 text-[0.8125rem] font-medium hover:bg-ds-surface-hover"
						>
							{dark ? "Light" : "Dark"}
						</button>
					</div>
				</div>
			</header>

			<main className="mx-auto max-w-6xl space-y-20 px-5 py-12">
				{/* ── Active palette readout ── */}
				<section>
					<Eyebrow>Active palette</Eyebrow>
					<h1 className="mt-2 text-4xl font-medium tracking-tight sm:text-5xl">
						{palette.name}
					</h1>
					<p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-ds-text-secondary">
						{palette.blurb}
					</p>
					<div className="mt-6 grid gap-3 sm:grid-cols-3">
						<BlueSwatch label="Bright" role="CTA / loud card" hex={palette.bright} />
						<BlueSwatch label="Mid" role="Icons / links" hex={palette.mid} />
						<BlueSwatch label="Deep" role="Navy card / ink" hex={palette.deep} />
					</div>
				</section>

				{/* ── Component slider — flip through real components in the palette ── */}
				<section>
					<div className="mb-5 flex items-center justify-between">
						<Eyebrow>Component preview: swap palettes above to compare</Eyebrow>
						<div className="flex items-center gap-3">
							<span className="text-[0.8125rem] font-medium text-ds-text-secondary">
								{current.label}
							</span>
							<span className="font-geist-mono text-[0.75rem] text-ds-text-tertiary">
								{slide + 1}/{total}
							</span>
							<div className="flex items-center gap-1.5">
								<button
									type="button"
									onClick={() => go(-1)}
									aria-label="Previous component"
									className="grid size-8 place-items-center rounded-lg border border-ds-border hover:bg-ds-surface-hover"
								>
									<ChevronLeftIcon className="size-4" />
								</button>
								<button
									type="button"
									onClick={() => go(1)}
									aria-label="Next component"
									className="grid size-8 place-items-center rounded-lg border border-ds-border hover:bg-ds-surface-hover"
								>
									<ChevronRightIcon className="size-4" />
								</button>
							</div>
						</div>
					</div>

					{/* Framed canvas */}
					<div className="rounded-2xl border border-ds-border bg-ds-shell p-3 sm:p-5">
						<div key={current.id} className="animate-fade-in">
							{current.node}
						</div>
					</div>

					{/* Slide dots */}
					<div className="mt-4 flex justify-center gap-2">
						{slides.map((s, i) => (
							<button
								type="button"
								key={s.id}
								aria-label={`Go to ${s.label}`}
								onClick={() => setSlide(i)}
								className={`h-1.5 rounded-full transition-all ${
									i === slide
										? "w-6 bg-ds-text-primary"
										: "w-1.5 bg-ds-border hover:bg-ds-text-tertiary"
								}`}
							/>
						))}
					</div>
				</section>

				{/* ── Color tokens ── */}
				<section>
					<SectionTitle>Color</SectionTitle>
					<SectionNote>
						Neutral surface ladder, text scale, and semantic colors, pulled from
						Hive. These stay constant across palettes; only the three blues move.
					</SectionNote>

					<TokenGroup title="Surfaces">
						<TokenSwatch className="bg-ds-shell" name="ds-shell" hex="#F1F1F1" />
						<TokenSwatch className="bg-ds-surface" name="ds-surface" hex="#FBFBFB" />
						<TokenSwatch
							className="bg-ds-surface-raised"
							name="ds-surface-raised"
							hex="#FFFFFF"
						/>
						<TokenSwatch
							className="bg-ds-surface-hover"
							name="ds-surface-hover"
							hex="#F4F4F4"
						/>
					</TokenGroup>

					<TokenGroup title="Text">
						<TokenSwatch className="bg-ds-text-primary" name="ds-text-primary" hex="#14171F" dark />
						<TokenSwatch className="bg-ds-text-secondary" name="ds-text-secondary" hex="#5B6170" dark />
						<TokenSwatch className="bg-ds-text-tertiary" name="ds-text-tertiary" hex="#8A90A0" dark />
						<TokenSwatch className="bg-ds-icon" name="ds-icon" hex="#505868" dark />
					</TokenGroup>

					<TokenGroup title="Semantic">
						<TokenSwatch className="bg-ds-success" name="ds-success" hex="#1F8552" dark />
						<TokenSwatch className="bg-ds-warning" name="ds-warning" hex="#E5A823" />
						<TokenSwatch className="bg-ds-error" name="ds-error" hex="#D43838" dark />
						<TokenSwatch
							name="brand-blue"
							hex="active"
							style={{ backgroundColor: "var(--brand-blue)" }}
							dark
						/>
					</TokenGroup>
				</section>

				{/* ── Typography ── */}
				<section>
					<SectionTitle>Typography</SectionTitle>
					<SectionNote>
						Geist for everything. Two weights only: Regular (400) and Medium
						(500). Hierarchy comes from size and color, never from bold.
					</SectionNote>
					<div className="mt-6 divide-y divide-ds-border-subtle rounded-xl border border-ds-border bg-ds-surface-raised">
						<TypeRow size="48px / 500" name="Display" cls="text-5xl font-medium tracking-tight">
							Page hero title
						</TypeRow>
						<TypeRow size="32px / 500" name="Title" cls="text-3xl font-medium tracking-tight">
							Section title
						</TypeRow>
						<TypeRow size="20px / 500" name="Heading" cls="text-xl font-medium">
							Card heading
						</TypeRow>
						<TypeRow size="15px / 400" name="Body" cls="text-[0.9375rem]">
							Body copy carries the paragraph text across the marketing site.
						</TypeRow>
						<TypeRow size="13px / 500" name="Label" cls="text-[0.8125rem] font-medium">
							Interface label
						</TypeRow>
						<TypeRow
							size="11px / 500"
							name="Overline"
							cls="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-ds-text-tertiary"
						>
							Eyebrow / overline
						</TypeRow>
						<TypeRow size="13px / mono" name="Mono" cls="font-geist-mono text-[0.8125rem]">
							const token = "#1E50FF";
						</TypeRow>
					</div>
				</section>

				{/* ── Iconography ── */}
				<section>
					<SectionTitle>Iconography</SectionTitle>
					<SectionNote>
						Heroicons (outline), 1.5px stroke, the same set the Hive product uses.
						Icons take the mid blue or a neutral, never the loud bright blue.
					</SectionNote>
					<div className="mt-6 flex flex-wrap gap-3">
						{[
							WrenchScrewdriverIcon,
							FunnelIcon,
							SparklesIcon,
							BoltIcon,
							UserGroupIcon,
							CalendarDaysIcon,
							ChartBarIcon,
							InboxStackIcon,
							DocumentTextIcon,
							Cog6ToothIcon,
							BellIcon,
							CheckBadgeIcon,
						].map((Ico, i) => (
							<div
								key={i}
								className="grid size-12 place-items-center rounded-xl border border-ds-border bg-ds-surface-raised"
							>
								<Ico
									className="size-5"
									strokeWidth={1.5}
									style={{ color: "var(--brand-mid)" }}
								/>
							</div>
						))}
					</div>
				</section>

				{/* ── Buttons ── */}
				<section>
					<SectionTitle>Buttons</SectionTitle>
					<SectionNote>
						Ported from the Hive button atom (shadcn + cva). One 3D dark primary,
						a brand-blue CTA tied to the active palette, and quiet secondaries.
					</SectionNote>

					<div className="mt-6 space-y-6 rounded-xl border border-ds-border bg-ds-surface-raised p-6">
						<div className="flex flex-wrap items-center gap-3">
							<DsButton variant="primary">Primary</DsButton>
							<DsButton variant="brand">Brand</DsButton>
							<DsButton variant="secondary">Secondary</DsButton>
							<DsButton variant="outline">Outline</DsButton>
							<DsButton variant="ghost">Ghost</DsButton>
							<DsButton variant="link">Link</DsButton>
							<DsButton variant="danger">Danger</DsButton>
							<DsButton variant="success">Success</DsButton>
						</div>
						<div className="flex flex-wrap items-center gap-3">
							<DsButton variant="brand" size="sm">Small</DsButton>
							<DsButton variant="brand" size="md">Medium</DsButton>
							<DsButton variant="brand" size="lg">Large</DsButton>
							<DsButton variant="brand" size="icon">
								<SparklesIcon />
							</DsButton>
							<DsButton variant="brand" size="icon-sm">
								<BoltIcon />
							</DsButton>
						</div>
					</div>
				</section>

				<footer className="border-t border-ds-border pt-8 text-[0.8125rem] text-ds-text-tertiary">
					Nairon Brand Kit: pick a palette, feel the component, then we lock the
					three blues and roll the rest of the site behind it.
				</footer>
			</main>
		</div>
	);
}

/* ── Small presentational helpers ── */

function Eyebrow({ children }: { children: React.ReactNode }) {
	return (
		<div className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-ds-text-tertiary">
			{children}
		</div>
	);
}

function SectionTitle({ children }: { children: React.ReactNode }) {
	return <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">{children}</h2>;
}

function SectionNote({ children }: { children: React.ReactNode }) {
	return (
		<p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-ds-text-secondary">
			{children}
		</p>
	);
}

function BlueSwatch({ label, role, hex }: { label: string; role: string; hex: string }) {
	return (
		<div className="overflow-hidden rounded-xl border border-ds-border bg-ds-surface-raised">
			<div className="h-20" style={{ backgroundColor: hex }} />
			<div className="px-4 py-3">
				<div className="flex items-center justify-between">
					<span className="text-sm font-medium">{label}</span>
					<span className="font-geist-mono text-[0.75rem] text-ds-text-tertiary">
						{hex}
					</span>
				</div>
				<div className="mt-0.5 text-[0.75rem] text-ds-text-tertiary">{role}</div>
			</div>
		</div>
	);
}

function TokenGroup({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<div className="mt-6">
			<div className="mb-3 text-[0.8125rem] font-medium text-ds-text-secondary">
				{title}
			</div>
			<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{children}</div>
		</div>
	);
}

function TokenSwatch({
	className,
	name,
	hex,
	dark,
	style,
}: {
	className?: string;
	name: string;
	hex: string;
	dark?: boolean;
	style?: CSSProperties;
}) {
	return (
		<div className="overflow-hidden rounded-xl border border-ds-border bg-ds-surface-raised">
			<div
				className={`flex h-16 items-end p-2.5 ${className ?? ""}`}
				style={style}
			>
				<span
					className={`font-geist-mono text-[0.6875rem] ${dark ? "text-white/80" : "text-ds-text-tertiary"}`}
				>
					{hex}
				</span>
			</div>
			<div className="px-3 py-2 font-geist-mono text-[0.75rem] text-ds-text-secondary">
				{name}
			</div>
		</div>
	);
}

function TypeRow({
	size,
	name,
	cls,
	children,
}: {
	size: string;
	name: string;
	cls: string;
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between">
			<div className={`min-w-0 flex-1 truncate ${cls}`}>{children}</div>
			<div className="flex shrink-0 items-baseline gap-3 sm:w-44 sm:justify-end">
				<span className="text-[0.8125rem] font-medium text-ds-text-secondary">
					{name}
				</span>
				<span className="font-geist-mono text-[0.6875rem] text-ds-text-tertiary">
					{size}
				</span>
			</div>
		</div>
	);
}
