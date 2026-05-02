import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { useAction } from "convex/react";
import { toast } from "sonner";
import { api } from "@convex/_generated/api";

type HiveWaitlistFormProps = {
	source?: string;
	compact?: boolean;
};

export function HiveWaitlistForm({
	compact = false,
}: HiveWaitlistFormProps) {
	const joinHiveWaitlist = useAction(api.hiveWaitlist.joinHiveWaitlist);
	const [submitting, setSubmitting] = useState(false);
	const [form, setForm] = useState({
		firstName: "",
		email: "",
	});

	const toastStyle = {
		background: "#F2F1EC",
		border: "1px solid rgba(23, 22, 18, 0.12)",
		color: "#171612",
	};

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setSubmitting(true);

		try {
			const result = await joinHiveWaitlist(form);
			setForm({ firstName: "", email: "" });
			toast(
				result.alreadyExists
					? "You're already on the Hive waitlist."
					: "You're on the Hive waitlist.",
				{
					description: "We'll email you when Hive is ready.",
					style: toastStyle,
				},
			);
		} catch {
			toast("Could not join the Hive waitlist.", {
				description: "Please try again in a moment.",
				style: toastStyle,
			});
		} finally {
			setSubmitting(false);
		}
	}

	const update =
		(field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) =>
			setForm((current) => ({ ...current, [field]: event.target.value }));

	const inputClass =
		"h-12 w-full border border-[#171612]/10 bg-white px-3 text-sm text-[#171612] outline-none transition-colors placeholder:text-[#8B806F]/70 focus:border-[#A77A15]";

	return (
		<form
			onSubmit={handleSubmit}
			className={compact ? "grid grid-cols-1 gap-3" : "grid grid-cols-1 gap-4"}
		>
			<label className="block">
				<span className="mb-1.5 block text-xs text-[#5C584F]">
					First name *
				</span>
				<input
					type="text"
					required
					value={form.firstName}
					onChange={update("firstName")}
					placeholder="Jane"
					className={inputClass}
				/>
			</label>
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
