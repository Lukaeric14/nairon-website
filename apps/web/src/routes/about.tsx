import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { Navbar } from "@/components/landing-v2/hero";
import { Footer } from "@/components/landing-v2/footer";
import { CAL_ATTRS, useCalInit } from "@/components/landing-v2/cal";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
	component: AboutPage,
	head: () =>
		seoHead({
			title: "About | Nairon AI",
			description:
				"Nairon builds AI employees around your real workflows and deploys them inside the systems you already run. Measurable outcomes, no migrations.",
			path: "/about",
		}),
});

/* ── Content ─────────────────────────────────────────────────────── */

const STATS: { value: string; label: string }[] = [
	{
		value: "Weeks",
		label: "From a scoped workflow to a working AI employee, not quarters.",
	},
	{
		value: "Zero",
		label: "Migrations. Agents run on top of the tools your team already uses.",
	},
	{
		value: "100%",
		label: "Human-in-the-loop. Someone on your team stays accountable for every agent.",
	},
];

const PRINCIPLES: { title: string; body: string }[] = [
	{
		title: "Start from the workflow",
		body: "We map a real, high-leverage workflow before we build anything. The agent is shaped around how the work actually happens.",
	},
	{
		title: "Run on your stack",
		body: "Agents slot into the systems you already run. Nothing to migrate to, nothing new for your team to learn.",
	},
	{
		title: "Context is the hard part",
		body: "The model is the easy bit. Business context, permissions, and reliability loops are what make an agent safe to trust.",
	},
	{
		title: "A human stays in charge",
		body: "Every agent runs with role-based access and human approvals. People assign work and sign off, like any teammate.",
	},
];

const TEAM: { name: string; title: string; image: string; linkedin: string }[] = [
	{
		name: "Luka Erić",
		title: "CEO",
		image: "/assets/framer/SSmGx1bjs3koY1aPdILAeuc.webp",
		linkedin: "https://www.linkedin.com/in/lukaeric/",
	},
	{
		name: "Obaid Ur-Rahmaan",
		title: "CTO / Head of Product",
		image: "/assets/framer/Xse9UYp1XHtcxoFdIq5x3WbveBc.webp",
		linkedin: "https://www.linkedin.com/in/obaid-ur-rahmaan-5bb29814b/",
	},
	{
		name: "Mahan Javaheri",
		title: "CMO",
		image: "/team/founder-2.png",
		linkedin: "https://www.linkedin.com/in/mahan-javaheri-b70430173/",
	},
	{
		name: "Filip Kocanovic",
		title: "COO",
		image: "/team/founder-1.jpeg",
		linkedin: "https://www.linkedin.com/in/filip-kocanovic/",
	},
];

/* ── Page ────────────────────────────────────────────────────────── */

function AboutPage() {
	useCalInit();
	return (
		<div className="font-geist bg-ds-surface text-ds-text-primary">
			<Navbar />
			<main>
				<Hero />
				<Mission />
				<Stats />
				<Approach />
				<Team />
			</main>
			<Footer />
		</div>
	);
}

/** Reusable eyebrow: glowing brand dot + uppercase mono label. */
function Eyebrow({ label }: { label: string }) {
	return (
		<div className="flex items-center gap-2.5">
			<span className="relative grid place-items-center">
				<span
					className="size-2.5 rounded-full"
					style={{ backgroundColor: "var(--brand-blue)" }}
				/>
				<span
					className="absolute size-3.5 rounded-full blur-[3px]"
					style={{
						backgroundColor:
							"color-mix(in srgb, var(--brand-blue) 40%, transparent)",
					}}
				/>
			</span>
			<span className="font-geist-mono text-[0.75rem] font-medium uppercase tracking-[0.16em] text-ds-text-primary">
				{label}
			</span>
		</div>
	);
}

function Hero() {
	return (
		<section className="relative overflow-hidden border-b border-ds-border/60">
			{/* faint grid texture */}
			<div
				aria-hidden="true"
				className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(16,16,20,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(16,16,20,0.04)_1px,transparent_1px)] [background-size:72px_72px]"
			/>
			<div className="relative mx-auto max-w-6xl px-5 pb-20 pt-28 sm:pt-32">
				<Eyebrow label="About Nairon" />
				<h1 className="mt-7 max-w-3xl text-balance text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl">
					AI employees.
					<br />
					Real outcomes.
				</h1>
				<p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ds-text-secondary">
					We build AI workers around your real workflows and deploy them inside
					the systems you already run. Measurable results, no migrations.
				</p>
			</div>
		</section>
	);
}

function Mission() {
	return (
		<section className="border-b border-ds-border/60">
			<div className="mx-auto grid max-w-6xl gap-8 px-5 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
				<h2 className="text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
					We build AI that fits
					<br />
					your business.
				</h2>
				<div className="space-y-5 text-[1.0625rem] leading-relaxed text-ds-text-secondary lg:pt-1.5">
					<p>
						Most AI tools ask you to change how you work. We do the opposite. We
						map a real workflow, build an AI employee around it, and run it inside
						the tools your team already uses.
					</p>
					<p>
						The hard part was never the model. It's the business context, the
						permissions, and the human checkpoints that make an agent safe to
						trust. That's exactly what we build, with{" "}
						<a
							href="/signals/solving-the-agent-memory-problem"
							className="font-medium underline-offset-4 hover:underline"
							style={{ color: "var(--brand-blue)" }}
						>
							Hive
						</a>{" "}
						as the operating system underneath.
					</p>
				</div>
			</div>
		</section>
	);
}

function Stats() {
	return (
		<section className="border-b border-ds-border/60">
			<div className="mx-auto grid max-w-6xl grid-cols-1 gap-px overflow-hidden md:grid-cols-3">
				{STATS.map((s) => (
					<div key={s.value} className="px-5 py-14 sm:px-8">
						<div className="text-5xl font-medium tracking-tight sm:text-6xl">
							{s.value}
						</div>
						<p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-ds-text-secondary">
							{s.label}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}

function Approach() {
	return (
		<section className="border-b border-ds-border/60">
			<div className="mx-auto max-w-6xl px-5 py-24">
				<Eyebrow label="How we work" />
				<div className="mt-7 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
					<h2 className="text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
						Most AI projects stall.
						<br />
						Ours ship.
					</h2>
					<p className="text-[1.0625rem] leading-relaxed text-ds-text-secondary lg:pb-1.5">
						Pilots fail on everything around the model: unclear scope, missing
						context, no owner, no path to production. We do that unglamorous
						upfront work so the agent actually goes live, and stays useful.
					</p>
				</div>

				<div className="mt-14 grid grid-cols-1 gap-px border-t border-ds-border/60 md:grid-cols-2">
					{PRINCIPLES.map((p) => (
						<div key={p.title} className="border-b border-ds-border/60 py-8 md:pr-10">
							<h3 className="text-[1.0625rem] font-medium text-ds-text-primary">
								{p.title}
							</h3>
							<p className="mt-2 max-w-md text-[0.9375rem] leading-relaxed text-ds-text-secondary">
								{p.body}
							</p>
						</div>
					))}
				</div>

				<a
					href="#book-demo"
					{...CAL_ATTRS}
					className="mt-12 inline-flex items-center justify-center gap-1.5 rounded-lg px-5 py-3 text-[0.9375rem] font-medium text-white transition-all hover:brightness-110"
					style={{ backgroundColor: "var(--brand-blue)" }}
				>
					Book an AI audit
					<ArrowUpRightIcon className="size-4" />
				</a>
			</div>
		</section>
	);
}

function Team() {
	return (
		<section>
			<div className="mx-auto max-w-6xl px-5 py-24">
				<Eyebrow label="The team" />
				<h2 className="mt-7 max-w-2xl text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
					Builders, not a layer
					<br />
					of consultants.
				</h2>
				<p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ds-text-secondary">
					A small, senior team that designs, deploys, and tunes every AI
					employee, and uses the same platform inside Nairon every day.
				</p>

				<div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
					{TEAM.map((person) => (
						<a
							key={person.name}
							href={person.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							className="group block"
						>
							<div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-ds-border bg-ds-shell">
								<img
									src={person.image}
									alt={person.name}
									className="size-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
									loading="lazy"
									decoding="async"
								/>
								<span className="absolute right-3 top-3 grid size-8 place-items-center rounded-lg bg-black/35 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
									<LinkedInIcon className="size-4" />
								</span>
							</div>
							<div className="mt-4 flex items-center justify-between gap-2">
								<div>
									<div className="text-[0.9375rem] font-medium text-ds-text-primary">
										{person.name}
									</div>
									<div className="text-[0.8125rem] text-ds-text-tertiary">
										{person.title}
									</div>
								</div>
							</div>
						</a>
					))}
				</div>
			</div>
		</section>
	);
}

function LinkedInIcon({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 256 256"
			className={className}
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24ZM96,176a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0ZM88,96a12,12,0,1,1,12-12A12,12,0,0,1,88,96Zm96,80a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140Z" />
		</svg>
	);
}
