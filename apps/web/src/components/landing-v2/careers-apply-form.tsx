// Inline application form for role pages that collect details on-site instead
// of over email. Fields are declared per role in careers-data.ts. Rendered at
// the bottom of the job detail page (#apply) and submits through the shared
// form pipeline (Slack + Hive webhooks).

import { ArrowUpRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { submitJobApplication } from "@/server/job-application";
import type { ApplyField, Role } from "./careers-data";

const inputClass =
	"w-full border border-ds-border bg-ds-surface-raised px-3.5 py-3 text-[0.9375rem] text-ds-text-primary outline-none transition-colors placeholder:text-ds-text-tertiary focus:border-[var(--brand-blue)] disabled:opacity-60";

const labelClass =
	"mb-1.5 block text-[0.8125rem] font-medium text-ds-text-secondary";

function emptyForm(fields: ApplyField[]) {
	return Object.fromEntries(fields.map((field) => [field.key, ""]));
}

export function CareersApplyForm({ role }: { role: Role }) {
	const fields = role.applyForm ?? [];
	const [form, setForm] = useState(() => emptyForm(fields));
	const [submitting, setSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const update =
		(key: string) =>
		(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
			setForm((current) => ({ ...current, [key]: event.target.value }));

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setSubmitting(true);
		setError(null);

		try {
			await submitJobApplication({
				data: {
					roleTitle: role.title,
					roleSlug: role.slug,
					fields: fields.map((field) => ({
						key: field.key,
						label: field.label,
						type: field.type,
						value: form[field.key] ?? "",
					})),
				},
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

			<form onSubmit={handleSubmit} className="mt-8">
				<div className="grid gap-5 sm:grid-cols-2">
					{fields.map((field) => (
						<label
							key={field.key}
							className={
								field.type === "textarea" || field.fullWidth
									? "block sm:col-span-2"
									: "block"
							}
						>
							<span className={labelClass}>{field.label}</span>
							{field.type === "textarea" ? (
								<textarea
									required
									value={form[field.key]}
									onChange={update(field.key)}
									placeholder={field.placeholder}
									className={`${inputClass} min-h-28 resize-y`}
									disabled={submitting}
								/>
							) : (
								<input
									required
									type={field.type === "url" ? "text" : field.type}
									inputMode={field.type === "url" ? "url" : undefined}
									autoCapitalize={field.type === "url" ? "none" : undefined}
									autoCorrect={field.type === "url" ? "off" : undefined}
									value={form[field.key]}
									onChange={update(field.key)}
									placeholder={field.placeholder}
									className={inputClass}
									disabled={submitting}
								/>
							)}
							{field.hint && (
								<span className="mt-1.5 block text-[0.8125rem] text-ds-text-tertiary">
									{field.hint}
								</span>
							)}
						</label>
					))}
				</div>

				{error && (
					<p className="mt-5 text-[0.875rem] leading-relaxed text-red-500">
						{error}
					</p>
				)}

				<button
					type="submit"
					disabled={submitting}
					className="group mt-6 inline-flex items-center justify-center gap-1.5 px-6 py-3.5 text-[0.9375rem] font-medium text-white transition-all hover:brightness-110 disabled:opacity-60"
					style={{ backgroundColor: "var(--brand-blue)" }}
				>
					{submitting ? "Submitting..." : "Submit application"}
					{!submitting && (
						<ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
					)}
				</button>

				<p className="mt-5 text-[0.8125rem] leading-relaxed text-ds-text-tertiary">
					We do not need a traditional CV. We care much more about what you
					have made, how you think, and how you work.
				</p>
			</form>
		</section>
	);
}
