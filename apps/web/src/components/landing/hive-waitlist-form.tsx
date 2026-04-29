import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { HIVE_WAITLIST_SOURCE } from "@/lib/links";
import { submitHiveWaitlist } from "@/server/hive-waitlist";

type HiveWaitlistFormProps = {
	source?: string;
	compact?: boolean;
};

export function HiveWaitlistForm({
	source = HIVE_WAITLIST_SOURCE,
	compact = false,
}: HiveWaitlistFormProps) {
	const [submitting, setSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [form, setForm] = useState({
		name: "",
		company: "",
		email: "",
		role: "",
		source,
	});

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setSubmitting(true);

		try {
			await submitHiveWaitlist({ data: form });
			setSubmitted(true);
		} finally {
			setSubmitting(false);
		}
	}

	const update =
		(field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) =>
			setForm((current) => ({ ...current, [field]: event.target.value }));

	const inputClass =
		"h-12 w-full border border-[#171612]/10 bg-white px-3 text-sm text-[#171612] outline-none transition-colors placeholder:text-[#8B806F]/70 focus:border-[#A77A15]";

	if (submitted) {
		return (
			<div className="border border-[#A77A15]/30 bg-[#FBFAF6] p-5">
				<div className="flex items-start gap-3">
					<CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#A77A15]" />
					<div>
						<p className="font-medium text-[#171612]">You are on the Hive list.</p>
						<p className="mt-1 text-sm leading-6 text-[#5F5A50]">
							We will reach out when we open the next beta cohort.
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<form
			onSubmit={handleSubmit}
			className={compact ? "grid grid-cols-1 gap-3" : "grid grid-cols-1 gap-4"}
		>
			<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
				<label className="block">
					<span className="mb-1.5 block text-xs text-[#5C584F]">Name *</span>
					<input
						type="text"
						required
						value={form.name}
						onChange={update("name")}
						placeholder="Jane Smith"
						className={inputClass}
					/>
				</label>
				<label className="block">
					<span className="mb-1.5 block text-xs text-[#5C584F]">Company *</span>
					<input
						type="text"
						required
						value={form.company}
						onChange={update("company")}
						placeholder="Acme"
						className={inputClass}
					/>
				</label>
			</div>
			<label className="block">
				<span className="mb-1.5 block text-xs text-[#5C584F]">Work email *</span>
				<input
					type="email"
					required
					value={form.email}
					onChange={update("email")}
					placeholder="jane@acme.com"
					className={inputClass}
				/>
			</label>
			<label className="block">
				<span className="mb-1.5 block text-xs text-[#5C584F]">
					Role or team
				</span>
				<input
					type="text"
					value={form.role}
					onChange={update("role")}
					placeholder="Founder, ops, engineering, revenue"
					className={inputClass}
				/>
			</label>
			<button
				type="submit"
				disabled={submitting}
				className="inline-flex h-12 items-center justify-center gap-2 bg-[#171612] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#2A2822] disabled:opacity-60"
			>
				{submitting ? (
					<Loader2 className="h-4 w-4 animate-spin" />
				) : (
					<>
						Join the Hive waitlist
						<ArrowRight className="h-4 w-4" />
					</>
				)}
			</button>
		</form>
	);
}
