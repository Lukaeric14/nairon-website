// "Newsletter" — a Signals-themed subscribe band placed before the FAQ.
// Left: a dark "edition" cover card linking to our latest Signal (the Agent
// Memory deep-dive). Right: eyebrow + heading + a simple email/subscribe form
// that writes to the newsletterSubscribers table via a server fn.

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { subscribeNewsletter } from "@/server/newsletter";

// The Signal the cover card points at — kept in sync with the Signals index.
const FEATURED_SIGNAL = {
	edition: "01",
	href: "/signals/solving-the-agent-memory-problem",
	title: "Solving the Agent Memory problem",
	teaser:
		"A practical look at Supermemory, Mem0, Zep, Letta, LangMem, and the memory layer we need for Hive.",
};

export function Newsletter() {
	return (
		<section className="bg-ds-shell font-geist text-ds-text-primary">
			<div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 lg:grid-cols-2 lg:gap-16">
				<EditionCard />
				<SubscribePanel />
			</div>
		</section>
	);
}

/** Dark cover card evoking a newsletter edition, linking to the Signal. */
function EditionCard() {
	return (
		<a
			href={FEATURED_SIGNAL.href}
			className="group relative block select-none overflow-hidden rounded-xl bg-[#0E0E12] ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-0.5"
			style={{ clipPath: "polygon(0 0, calc(100% - 44px) 0, 100% 44px, 100% 100%, 0 100%)" }}
		>
			{/* signal art — white/light dithered curves on the dark cover,
			    mirroring the article's ArticleSignalArt aesthetic. */}
			<div aria-hidden="true" className="absolute inset-0 overflow-hidden">
				<div className="absolute inset-0 opacity-[0.16] [background-image:radial-gradient(#ffffff_0.8px,transparent_0.8px)] [background-size:8px_8px]" />
				<div
					className="absolute inset-x-0 top-[48%] h-44 -translate-y-1/2 blur-2xl"
					style={{ background: "radial-gradient(ellipse at 62% 50%, color-mix(in srgb, var(--brand-blue) 40%, transparent), transparent 64%)" }}
				/>
				<div className="absolute left-1/2 top-[40%] h-52 w-[150%] -translate-x-1/2 -translate-y-1/2 rotate-[8deg] rounded-[50%] border-t border-white/25" />
				<div className="absolute left-1/2 top-[58%] h-44 w-[140%] -translate-x-1/2 -translate-y-1/2 rotate-[-6deg] rounded-[50%] border-t border-white/15" />
				<div className="absolute left-1/2 top-[51%] h-36 w-[126%] -translate-x-1/2 -translate-y-1/2 rotate-[5deg] rounded-[50%] border-t border-white/10" />
				<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,14,18,0.35)_0%,transparent_30%,transparent_62%,rgba(14,14,18,0.55)_100%)]" />
			</div>

			<div className="relative flex min-h-[420px] flex-col p-8 md:p-10">
				{/* top row */}
				<div className="flex items-start justify-between gap-4">
					<span className="inline-flex items-center bg-white px-2.5 py-1 font-geist-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[#0E0E12]">
						Edition {FEATURED_SIGNAL.edition}
					</span>
					<span className="text-right font-geist-mono text-[0.625rem] uppercase leading-4 tracking-[0.18em] text-white/40">
						Signals
						<br />
						Edition #{FEATURED_SIGNAL.edition}
					</span>
				</div>

				{/* title */}
				<h3 className="mt-12 max-w-[16ch] text-balance text-4xl font-medium leading-[1.05] tracking-tight text-white md:text-5xl">
					{FEATURED_SIGNAL.title}
				</h3>

				<span className="mt-auto" />
			</div>

			{/* caption strip */}
			<div className="relative border-t border-white/10 bg-white/[0.04] px-8 py-6 md:px-10">
				<p className="max-w-md text-pretty text-[0.9375rem] leading-6 text-white/70">
					{FEATURED_SIGNAL.teaser}
				</p>
			</div>
		</a>
	);
}

/** Eyebrow + heading + the email/subscribe form. */
function SubscribePanel() {
	const [email, setEmail] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const toastStyle = {
		background: "#F2F1EC",
		border: "1px solid rgba(23, 22, 18, 0.12)",
		color: "#171612",
	};

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (submitting) return;
		setSubmitting(true);

		try {
			const result = await subscribeNewsletter({
				data: { email, source: "Landing newsletter" },
			});
			setEmail("");
			toast(
				result.alreadyExists
					? "You're already subscribed to Signals."
					: "You're subscribed to Signals.",
				{
					description: "Field notes from building AI employees, straight to your inbox.",
					style: toastStyle,
				},
			);
		} catch {
			toast("Could not subscribe.", {
				description: "Please try again in a moment.",
				style: toastStyle,
			});
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<div className="lg:pl-2">
			{/* eyebrow */}
			<div className="flex items-center gap-2.5">
				<span className="relative grid place-items-center">
					<span
						className="size-2.5 rounded-full"
						style={{ backgroundColor: "var(--brand-blue)" }}
					/>
					<span
						className="absolute size-3.5 rounded-full blur-[3px]"
						style={{
							backgroundColor: "color-mix(in srgb, var(--brand-blue) 40%, transparent)",
						}}
					/>
				</span>
				<span className="font-geist-mono text-[0.75rem] font-medium uppercase tracking-[0.16em] text-ds-text-primary">
					Newsletter
				</span>
			</div>

			<h2 className="mt-6 max-w-[14ch] text-balance text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
				Join hundreds of operators looking to stay ahead with AI
			</h2>
			<p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-ds-text-secondary">
				Practical field notes on AI employees, company memory, and agent
				infrastructure — from our client work and from building Hive. No noise.
			</p>

			<form
				onSubmit={handleSubmit}
				className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end"
			>
				<label className="block flex-1">
					<input
						type="email"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
						className="h-10 w-full border-0 border-b border-ds-border bg-transparent text-[0.9375rem] text-ds-text-primary outline-none transition-colors placeholder:text-ds-text-tertiary focus:border-[color:var(--brand-blue)]"
					/>
				</label>
				<button
					type="submit"
					disabled={submitting}
					className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md bg-[#101014] px-5 font-geist-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#2A2A33] disabled:opacity-60"
				>
					{submitting ? (
						<Loader2 className="size-4 animate-spin" />
					) : (
						"Subscribe"
					)}
				</button>
			</form>
		</div>
	);
}
