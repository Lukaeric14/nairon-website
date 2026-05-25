import {
	ArrowDown,
	ArrowRight,
	BadgeCheck,
	BriefcaseBusiness,
	Calendar,
	Clock3,
	Code2,
	MapPin,
	PenTool,
	Sparkles,
} from "lucide-react";
import type { ElementType, ReactNode } from "react";
import { DESIGN_ENGINEER_ROLE } from "@/data/careers";

const mailtoHref =
	"mailto:hello@naironai.com?subject=Design%20Engineer%20Internship%20Interest";

function CareersNav() {
	return (
		<header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
				<a href="/" aria-label="Nairon home" className="shrink-0">
					<img
						src="/nairon-logo.png"
						alt="nairon."
						width={600}
						height={120}
						className="h-7 w-auto"
					/>
				</a>

				<nav className="hidden items-center gap-6 text-sm text-white/60 md:flex">
					<a href="#role" className="transition-colors hover:text-white">
						Role
					</a>
					<a href="#details" className="transition-colors hover:text-white">
						Details
					</a>
					<a href="#apply" className="transition-colors hover:text-white">
						Apply
					</a>
				</nav>

				<a
					href={mailtoHref}
					className="inline-flex h-10 items-center gap-2 rounded-full bg-[#E8C878] px-4 text-sm font-semibold text-[#090806] transition-colors hover:bg-[#F4DA91]"
				>
					Get notified
					<ArrowRight className="size-4" />
				</a>
			</div>
		</header>
	);
}

function MetaItem({
	icon: Icon,
	label,
	value,
}: {
	icon: ElementType;
	label: string;
	value: string;
}) {
	return (
		<div className="border-t border-white/10 py-5">
			<div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-white/40">
				<Icon className="size-4 text-[#E8C878]" />
				{label}
			</div>
			<p className="text-base font-medium text-white">{value}</p>
		</div>
	);
}

function RolePill({ children }: { children: ReactNode }) {
	return (
		<span className="inline-flex rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-sm text-white/72">
			{children}
		</span>
	);
}

function SectionHeading({
	kicker,
	title,
	children,
}: {
	kicker: string;
	title: string;
	children?: ReactNode;
}) {
	return (
		<div className="mx-auto mb-12 max-w-3xl text-center">
			<p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#E8C878]">
				{kicker}
			</p>
			<h2 className="text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
				{title}
			</h2>
			{children && (
				<p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/55 md:text-lg">
					{children}
				</p>
			)}
		</div>
	);
}

function BulletList({ items }: { items: string[] }) {
	return (
		<ul className="space-y-4">
			{items.map((item) => (
				<li key={item} className="flex gap-3 text-base leading-7 text-white/70">
					<span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[#E8C878]" />
					<span>{item}</span>
				</li>
			))}
		</ul>
	);
}

function DetailSection({
	title,
	children,
}: {
	title: string;
	children: ReactNode;
}) {
	return (
		<section className="border-t border-white/10 py-10 first:border-t-0 first:pt-0">
			<h3 className="mb-5 text-2xl font-semibold tracking-[-0.03em] text-white">
				{title}
			</h3>
			{children}
		</section>
	);
}

export function CareersPage() {
	const role = DESIGN_ENGINEER_ROLE;

	return (
		<div className="min-h-screen bg-[#050505] font-inter text-white">
			<CareersNav />

			<main>
				<section className="relative isolate overflow-hidden px-5 pb-28 pt-36 md:px-8 md:pb-36 md:pt-44">
					<div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(232,200,120,0.16),transparent_34%),linear-gradient(180deg,#0B0B0A_0%,#050505_72%)]" />
					<div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />

					<div className="mx-auto max-w-5xl text-center">
						<div className="mb-8 flex flex-wrap items-center justify-center gap-3">
							<RolePill>{role.opening}</RolePill>
							<RolePill>{role.duration}</RolePill>
							<RolePill>{role.type}</RolePill>
						</div>

						<h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.06em] text-white md:text-7xl lg:text-8xl">
							Design Engineer Internship
						</h1>
						<p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/60 md:text-xl">
							{role.summary}
						</p>

						<div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
							<a
								href="#role"
								className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#080807] transition-colors hover:bg-[#E8C878]"
							>
								View role
								<ArrowDown className="size-4" />
							</a>
							<a
								href={mailtoHref}
								className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
							>
								Register interest
								<ArrowRight className="size-4" />
							</a>
						</div>
					</div>
				</section>

				<section className="px-5 py-24 md:px-8" id="role">
					<div className="mx-auto max-w-6xl">
						<SectionHeading
							kicker="Why Nairon"
							title="For builders with taste."
						>
							This is not a traditional developer internship and it is not a
							"write prompts all day" role. It is for someone who wants to make
							AI-powered work feel clear, useful, and well designed.
						</SectionHeading>

						<div className="grid gap-4 md:grid-cols-3">
							{role.whyNairon.map((item, index) => {
								const icons = [Sparkles, Code2, BadgeCheck];
								const Icon = icons[index] ?? Sparkles;

								return (
									<article
										key={item.label}
										className="rounded-lg border border-white/10 bg-white/[0.035] p-7"
									>
										<Icon className="mb-10 size-6 text-[#E8C878]" />
										<h3 className="text-xl font-semibold tracking-[-0.03em] text-white">
											{item.label}
										</h3>
										<p className="mt-4 text-base leading-7 text-white/55">
											{item.text}
										</p>
									</article>
								);
							})}
						</div>
					</div>
				</section>

				<section className="border-y border-white/10 bg-[#10100F] px-5 py-20 md:px-8">
					<div className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-4">
						<MetaItem icon={Clock3} label="Duration" value={role.duration} />
						<MetaItem icon={Calendar} label="Opening" value={role.opening} />
						<MetaItem icon={MapPin} label="Location" value={role.location} />
						<MetaItem icon={BriefcaseBusiness} label="Compensation" value={role.compensation} />
					</div>
				</section>

				<section className="px-5 py-24 md:px-8" id="details">
					<div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[320px_1fr]">
						<aside className="lg:sticky lg:top-28 lg:self-start">
							<div className="rounded-lg border border-white/10 bg-white/[0.035] p-6">
								<p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E8C878]">
									Open role
								</p>
								<h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
									{role.title}
								</h2>
								<p className="mt-3 text-sm leading-6 text-white/50">
									Applications open in {role.opening}. Compensation will be
									announced before applications open.
								</p>

								<div className="mt-8">
									<MetaItem icon={PenTool} label="Department" value={role.department} />
									<MetaItem icon={BriefcaseBusiness} label="Type" value={role.type} />
									<MetaItem icon={Clock3} label="Duration" value={role.duration} />
									<MetaItem icon={MapPin} label="Location" value={role.location} />
								</div>
							</div>
						</aside>

						<div>
							<DetailSection title="What you'll work on here">
								<BulletList items={role.work} />
							</DetailSection>

							<DetailSection title="What you bring to the table">
								<BulletList items={role.bring} />
							</DetailSection>

							<DetailSection title="Why you should join the engineering team">
								<div className="space-y-5 text-base leading-7 text-white/70">
									{role.teamReasons.map((reason) => (
										<p key={reason}>{reason}</p>
									))}
								</div>
							</DetailSection>

							<DetailSection title="Internship benefits">
								<BulletList items={role.benefits} />
							</DetailSection>

							<DetailSection title="When applications open">
								<p className="mb-6 text-base leading-7 text-white/70">
									We will ask for a short note, a portfolio or project links, and
									answers to these prompts:
								</p>
								<ol className="space-y-4">
									{role.applicationPrompts.map((prompt, index) => (
										<li
											key={prompt}
											className="flex gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-4 text-base leading-7 text-white/70"
										>
											<span className="font-semibold text-[#E8C878]">
												{index + 1}
											</span>
											<span>{prompt}</span>
										</li>
									))}
								</ol>
							</DetailSection>
						</div>
					</div>
				</section>

				<section id="apply" className="px-5 pb-28 md:px-8">
					<div className="mx-auto max-w-4xl rounded-lg border border-[#E8C878]/24 bg-[#E8C878] p-8 text-center text-[#090806] md:p-12">
						<p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">
							Opening Summer 2026
						</p>
						<h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
							Want the first application link?
						</h2>
						<p className="mx-auto mt-5 max-w-2xl text-base leading-7 opacity-75 md:text-lg">
							Send a short note now and we will reach out when the Design
							Engineer internship opens.
						</p>
						<a
							href={mailtoHref}
							className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-[#080807] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1B1A17]"
						>
							Register interest
							<ArrowRight className="size-4" />
						</a>
					</div>
				</section>
			</main>
		</div>
	);
}
