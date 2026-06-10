import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
	ArrowUpRightIcon,
	EnvelopeIcon,
	CalendarDaysIcon,
	ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/landing-v2/hero";
import { Footer } from "@/components/landing-v2/footer";
import { CAL_ATTRS, useCalInit } from "@/components/landing-v2/cal";
import { submitContactForm } from "@/server/contact";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
	component: ContactPage,
	head: () =>
		seoHead({
			title: "Contact | Nairon AI",
			description:
				"Get in touch with Nairon — book a discovery call, email the team, or join the community.",
			path: "/contact",
		}),
});

const COMMUNITY_URL =
	"https://join.slack.com/t/naironaicommunity/shared_invite/zt-3iqxykjaq-U_PYxtF12xecClDIfgPsCQ";

function ContactPage() {
	useCalInit();
	return (
		<div className="font-geist bg-ds-surface text-ds-text-primary">
			<Navbar />
			<main>
				<section className="relative overflow-hidden border-b border-ds-border/60">
					<div
						aria-hidden="true"
						className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(16,16,20,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(16,16,20,0.04)_1px,transparent_1px)] [background-size:72px_72px]"
					/>
					<div className="relative mx-auto max-w-6xl px-5 pb-20 pt-28 sm:pt-32">
						<Eyebrow label="Contact" />
						<h1 className="mt-7 max-w-3xl text-balance text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl">
							Let's talk.
						</h1>
						<p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ds-text-secondary">
							Tell us about a workflow you'd hand to an AI employee, or just say
							hello. The fastest way in is to book a call — but a message works
							too.
						</p>
					</div>
				</section>

				<section>
					<div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
						<ContactChannels />
						<ContactForm />
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}

function ContactChannels() {
	return (
		<div className="flex flex-col gap-8">
			<Channel
				icon={CalendarDaysIcon}
				title="Book a discovery call"
				body="A 30-minute call to map where AI can create real leverage in your business."
				actionLabel="Pick a time"
				cal
			/>
			<Channel
				icon={EnvelopeIcon}
				title="Email us"
				body="Prefer email? Reach the team directly and we'll get back to you fast."
				actionLabel="info@naironai.com"
				href="mailto:info@naironai.com"
			/>
			<Channel
				icon={ChatBubbleLeftRightIcon}
				title="Join the community"
				body="Connect with other operators and builders working with AI employees."
				actionLabel="Join the Slack"
				href={COMMUNITY_URL}
				external
			/>
		</div>
	);
}

function Channel({
	icon: Icon,
	title,
	body,
	actionLabel,
	href,
	external,
	cal,
}: {
	icon: typeof EnvelopeIcon;
	title: string;
	body: string;
	actionLabel: string;
	href?: string;
	external?: boolean;
	cal?: boolean;
}) {
	return (
		<div className="border-t border-ds-border/60 pt-6">
			<div className="flex items-center gap-2.5">
				<Icon className="size-5 text-ds-text-tertiary" strokeWidth={1.5} />
				<h2 className="text-[1.0625rem] font-medium text-ds-text-primary">
					{title}
				</h2>
			</div>
			<p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-ds-text-secondary">
				{body}
			</p>
			<a
				href={href ?? "#book-demo"}
				{...(cal ? CAL_ATTRS : {})}
				{...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
				className="group mt-4 inline-flex items-center gap-1.5 font-medium underline-offset-4 hover:underline"
				style={{ color: "var(--brand-blue)" }}
			>
				{actionLabel}
				<ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
			</a>
		</div>
	);
}

const EMPTY = { firstName: "", lastName: "", email: "", phone: "", message: "" };

function ContactForm() {
	const [form, setForm] = useState(EMPTY);
	const [submitting, setSubmitting] = useState(false);

	const toastStyle = {
		background: "#F2F1EC",
		border: "1px solid rgba(23, 22, 18, 0.12)",
		color: "#171612",
	};

	const update =
		(field: keyof typeof form) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
			setForm((cur) => ({ ...cur, [field]: e.target.value }));

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (submitting) return;
		setSubmitting(true);
		try {
			await submitContactForm({ data: form });
			setForm(EMPTY);
			toast("Message sent.", {
				description: "Thanks — we'll get back to you shortly.",
				style: toastStyle,
			});
		} catch {
			toast("Could not send your message.", {
				description: "Please try again in a moment.",
				style: toastStyle,
			});
		} finally {
			setSubmitting(false);
		}
	}

	const labelClass = "mb-1.5 block text-[0.8125rem] text-ds-text-secondary";
	const fieldClass =
		"h-10 w-full border-0 border-b border-ds-border bg-transparent text-[0.9375rem] text-ds-text-primary outline-none transition-colors placeholder:text-ds-text-tertiary focus:border-[color:var(--brand-blue)]";

	return (
		<form
			onSubmit={handleSubmit}
			className="rounded-2xl border border-ds-border bg-ds-shell p-6 sm:p-8"
		>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
				<label className="block">
					<span className={labelClass}>First name *</span>
					<input
						type="text"
						required
						value={form.firstName}
						onChange={update("firstName")}
						placeholder="Jane"
						className={fieldClass}
					/>
				</label>
				<label className="block">
					<span className={labelClass}>Last name *</span>
					<input
						type="text"
						required
						value={form.lastName}
						onChange={update("lastName")}
						placeholder="Smith"
						className={fieldClass}
					/>
				</label>
			</div>

			<label className="mt-6 block">
				<span className={labelClass}>Work email *</span>
				<input
					type="email"
					required
					value={form.email}
					onChange={update("email")}
					placeholder="jane@acme.com"
					className={fieldClass}
				/>
			</label>

			<label className="mt-6 block">
				<span className={labelClass}>Phone</span>
				<input
					type="tel"
					value={form.phone}
					onChange={update("phone")}
					placeholder="Optional"
					className={fieldClass}
				/>
			</label>

			<label className="mt-6 block">
				<span className={labelClass}>Message *</span>
				<textarea
					required
					value={form.message}
					onChange={update("message")}
					placeholder="What would you like an AI employee to handle?"
					rows={4}
					className={`${fieldClass} h-auto resize-none py-2 leading-relaxed`}
				/>
			</label>

			<button
				type="submit"
				disabled={submitting}
				className="mt-8 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#101014] px-5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-[#2A2A33] disabled:opacity-60 sm:w-auto"
			>
				{submitting ? <Loader2 className="size-4 animate-spin" /> : "Send message"}
			</button>
		</form>
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
