import { ArrowRight, Check, Loader2, X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "sonner";
import { DESIGN_ENGINEER_ROLE } from "@/data/careers";
import { submitCareerApplication } from "@/server/careers";

interface CareerApplicationModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const inputClass =
	"w-full rounded-lg border border-[#0C0C0C]/10 bg-white px-4 py-3 text-sm text-[#1A1916] outline-none transition-colors placeholder:text-[#5C584F]/55 focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/15 disabled:opacity-60";

export function CareerApplicationModal({
	open,
	onOpenChange,
}: CareerApplicationModalProps) {
	const [submitting, setSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [form, setForm] = useState({
		name: "",
		email: "",
		portfolioUrl: "",
		toolingWorkflow: "",
	});

	const update =
		(field: keyof typeof form) =>
		(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
			setForm((current) => ({ ...current, [field]: event.target.value }));

	function reset() {
		setSubmitted(false);
		setForm({ name: "", email: "", portfolioUrl: "", toolingWorkflow: "" });
	}

	function handleOpenChange(nextOpen: boolean) {
		onOpenChange(nextOpen);
		if (!nextOpen) {
			window.setTimeout(reset, 180);
		}
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setSubmitting(true);

		try {
			const result = await submitCareerApplication({
				data: {
					...form,
					roleId: DESIGN_ENGINEER_ROLE.id,
					roleTitle: DESIGN_ENGINEER_ROLE.title,
					source: "careers-page",
				},
			});

			setSubmitted(true);
			toast(
				result.alreadyExists
					? "Application interest updated."
					: "Application interest received.",
				{
					description: "We will review your portfolio before applications open.",
				},
			);
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Please try again in a moment.";
			toast("Could not submit interest.", { description: message });
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
			<DialogPrimitive.Portal>
				<DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[#0C0C0C]/55 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
				<DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 max-h-[calc(100vh-2rem)] w-[calc(100%-2rem)] max-w-[760px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-[#0C0C0C]/10 bg-[#F7F5EF] text-[#1A1916] shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
					<div className="grid md:grid-cols-[0.85fr_1.15fr]">
						<div className="border-b border-[#0C0C0C]/10 bg-white px-6 py-7 md:border-b-0 md:border-r md:px-8 md:py-9">
							<DialogPrimitive.Title className="text-2xl font-normal leading-tight tracking-[-0.035em] md:text-4xl">
								Register interest
							</DialogPrimitive.Title>
							<DialogPrimitive.Description className="mt-4 text-sm leading-6 text-[#5C584F]">
								Send the basic signal we need to review fit: who you are,
								where to reach you, and the work that shows your taste.
							</DialogPrimitive.Description>
							<div className="mt-7 border-t border-[#0C0C0C]/8 pt-5">
								<p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#5C584F]">
									Role
								</p>
								<p className="mt-2 text-sm font-semibold">
									{DESIGN_ENGINEER_ROLE.title}
								</p>
								<p className="mt-1 text-sm text-[#5C584F]">
									{DESIGN_ENGINEER_ROLE.opening} ·{" "}
									{DESIGN_ENGINEER_ROLE.duration}
								</p>
							</div>
						</div>

						<div className="px-6 py-7 md:px-8 md:py-9">
							{submitted ? (
								<div className="flex min-h-[320px] flex-col justify-center">
									<div className="mb-5 flex size-10 items-center justify-center rounded-full bg-[#C9A96E]/18 text-[#8A6418]">
										<Check className="size-5" />
									</div>
									<h3 className="text-2xl font-normal tracking-[-0.03em]">
										We have your interest.
									</h3>
									<p className="mt-3 max-w-sm text-sm leading-6 text-[#5C584F]">
										We will use your portfolio link to shortlist candidates before
										the Summer 2026 application opens.
									</p>
									<button
										type="button"
										onClick={() => handleOpenChange(false)}
										className="mt-7 inline-flex h-11 w-fit items-center justify-center rounded-full bg-[#0C0C0C] px-5 text-sm font-semibold text-white"
									>
										Done
									</button>
								</div>
							) : (
								<form onSubmit={handleSubmit} className="space-y-5">
									<label className="block">
										<span className="mb-1.5 block text-xs text-[#5C584F]">
											Name *
										</span>
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
										<span className="mb-1.5 block text-xs text-[#5C584F]">
											Email *
										</span>
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
										<span className="mb-1.5 block text-xs text-[#5C584F]">
											Portfolio link *
										</span>
										<input
											required
											type="url"
											value={form.portfolioUrl}
											onChange={update("portfolioUrl")}
											placeholder="https://your-site.com"
											className={inputClass}
											disabled={submitting}
										/>
									</label>

									<label className="block">
										<span className="mb-1.5 block text-xs text-[#5C584F]">
											How do you build with coding agents? *
										</span>
										<textarea
											required
											value={form.toolingWorkflow}
											onChange={update("toolingWorkflow")}
											placeholder="Tell us what coding agents, models, editors, review loops, and workflows you use. We are looking for agent-first builders who know how to direct, inspect, and ship with AI."
											className={`${inputClass} min-h-28 resize-y`}
											disabled={submitting}
										/>
									</label>

									<button
										type="submit"
										disabled={submitting}
										className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0C0C0C] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1A1916] disabled:opacity-60"
									>
										{submitting ? (
											<Loader2 className="size-4 animate-spin" />
										) : (
											<>
												Submit interest
												<ArrowRight className="size-4" />
											</>
										)}
									</button>

									<p className="text-xs leading-5 text-[#5C584F]">
										No resume needed right now. We are primarily looking for
										evidence of product taste, frontend craft, and thoughtful
										agent-human interface work. Tell us how you use agents,
										because agent-first building is core to how Nairon works.
										Shortlisted candidates will get a focused take-home project.
									</p>
								</form>
							)}
						</div>
					</div>

					<DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]">
						<X className="size-4" />
						<span className="sr-only">Close</span>
					</DialogPrimitive.Close>
				</DialogPrimitive.Content>
			</DialogPrimitive.Portal>
		</DialogPrimitive.Root>
	);
}
