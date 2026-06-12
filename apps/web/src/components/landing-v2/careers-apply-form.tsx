// Inline application form for role pages that collect details on-site instead
// of over email. Rendered at the bottom of the job detail page (#apply) and
// submits through the shared form pipeline (Slack + Hive webhooks).

import { ArrowUpRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { submitJobApplication } from "@/server/job-application";
import type { Role } from "./careers-data";

const inputClass =
	"w-full border border-ds-border bg-ds-surface-raised px-3.5 py-3 text-[0.9375rem] text-ds-text-primary outline-none transition-colors placeholder:text-ds-text-tertiary focus:border-[var(--brand-blue)] disabled:opacity-60";

const labelClass =
	"mb-1.5 block text-[0.8125rem] font-medium text-ds-text-secondary";

const EMPTY_FORM = {
	name: "",
	email: "",
	phone: "",
	portfolioUrl: "",
	tracesUrl: "",
	aiStack: "",
	projects: "",
	note: "",
};

export function CareersApplyForm({ role }: { role: Role }) {
	const [form, setForm] = useState(EMPTY_FORM);
	const [submitting, setSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const update =
		(field: keyof typeof form) =>
		(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
			setForm((current) => ({ ...current, [field]: event.target.value }));

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setSubmitting(true);
		setError(null);

		try {
			await submitJobApplication({
				data: { ...form, roleTitle: role.title },
			});
			setSubmitted(true);
		} catch (submitError) {
			setError(
				submitError instanceof Error
					? submitError.message
					: "Something went wrong. Please try again.",
			);
		} finally {
			setSubmitting(false);
		}
	}

	if (submitted) {
		return (
			<section id="apply" className="mt-14 border-t border-ds-border pt-10">
				<div
					className="mb-5 flex size-10 items-center justify-center rounded-full"
					style={{
						backgroundColor:
							"color-mix(in srgb, var(--brand-blue) 14%, transparent)",
						color: "var(--brand-blue)",
					}}
				>
					<CheckIcon className="size-5" />
				</div>
				<h2 className="text-[1.375rem] font-medium tracking-tight">
					Application received
				</h2>
				<p className="mt-3 max-w-lg text-[1rem] leading-relaxed text-ds-text-secondary">
					Thanks for applying. We review every complete application and will
					get back to you about next steps.
				</p>
			</section>
		);
	}

	return (
		<section id="apply" className="mt-14 border-t border-ds-border pt-10">
			<h2 className="text-[1.375rem] font-medium tracking-tight">
				Apply for this role
			</h2>
			<p className="mt-3 max-w-lg text-[1rem] leading-relaxed text-ds-text-secondary">
				All fields are required. Applications missing links or details will
				not be reviewed.
			</p>

			<form onSubmit={handleSubmit} className="mt-8 space-y-5">
				<div className="grid gap-5 sm:grid-cols-2">
					<label className="block">
						<span className={labelClass}>Full name</span>
						<input
							required
							type="text"
							value={form.name}
							onChange={update("name")}
							placeholder="Jane Smith"
							className={inputClass}
							disabled={submitting}
						/>
					</label>
					<label className="block">
						<span className={labelClass}>Email</span>
						<input
							required
							type="email"
							value={form.email}
							onChange={update("email")}
							placeholder="jane@example.com"
							className={inputClass}
							disabled={submitting}
						/>
					</label>
					<label className="block">
						<span className={labelClass}>Phone number</span>
						<input
							required
							type="tel"
							value={form.phone}
							onChange={update("phone")}
							placeholder="+971 50 123 4567"
							className={inputClass}
							disabled={submitting}
						/>
					</label>
					<label className="block">
						<span className={labelClass}>
							Portfolio, GitHub, or personal website
						</span>
						<input
							required
							type="url"
							value={form.portfolioUrl}
							onChange={update("portfolioUrl")}
							placeholder="https://github.com/you"
							className={inputClass}
							disabled={submitting}
						/>
					</label>
				</div>

				<label className="block">
					<span className={labelClass}>traces.com session link</span>
					<input
						required
						type="url"
						value={form.tracesUrl}
						onChange={update("tracesUrl")}
						placeholder="https://traces.com/..."
						className={inputClass}
						disabled={submitting}
					/>
					<span className="mt-1.5 block text-[0.8125rem] text-ds-text-tertiary">
						A non-sensitive coding agent session that shows how you work.
					</span>
				</label>

				<label className="block">
					<span className={labelClass}>Your full AI stack</span>
					<textarea
						required
						value={form.aiStack}
						onChange={update("aiStack")}
						placeholder="Orchestrator, coding agents, models, tools, libraries, skills, prompting patterns, review workflows, and any custom setup."
						className={`${inputClass} min-h-28 resize-y`}
						disabled={submitting}
					/>
				</label>

				<label className="block">
					<span className={labelClass}>
						2-3 projects that best show your ability
					</span>
					<textarea
						required
						value={form.projects}
						onChange={update("projects")}
						placeholder="Links, plus a sentence on what you built and what you owned."
						className={`${inputClass} min-h-28 resize-y`}
						disabled={submitting}
					/>
				</label>

				<label className="block">
					<span className={labelClass}>
						Why is this role interesting to you?
					</span>
					<textarea
						required
						value={form.note}
						onChange={update("note")}
						placeholder="A short note is enough."
						className={`${inputClass} min-h-24 resize-y`}
						disabled={submitting}
					/>
				</label>

				{error && (
					<p className="text-[0.875rem] leading-relaxed text-red-500">
						{error}
					</p>
				)}

				<button
					type="submit"
					disabled={submitting}
					className="group inline-flex items-center justify-center gap-1.5 px-6 py-3.5 text-[0.9375rem] font-medium text-white transition-all hover:brightness-110 disabled:opacity-60"
					style={{ backgroundColor: "var(--brand-blue)" }}
				>
					{submitting ? "Submitting..." : "Submit application"}
					{!submitting && (
						<ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
					)}
				</button>

				<p className="text-[0.8125rem] leading-relaxed text-ds-text-tertiary">
					We do not need a traditional CV. We care much more about what you
					have built, how you think, and how you work with AI.
				</p>
			</form>
		</section>
	);
}
