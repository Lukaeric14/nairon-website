import { useState, useEffect, useRef } from "react";
import { ArrowRight, Loader2, X, BarChart3, Shield, Zap } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useModals } from "./modal-provider";
import { submitHireForm } from "@/server/hire-form";

type Step = "form" | "booking";

export function HireModal() {
	const { hireModalOpen, closeHireModal } = useModals();
	const [step, setStep] = useState<Step>("form");
	const [submitting, setSubmitting] = useState(false);
	const [form, setForm] = useState({
		name: "",
		company: "",
		email: "",
		useCase: "",
		teamSize: "",
	});

	function handleClose(open: boolean) {
		if (!open) {
			closeHireModal();
			setTimeout(() => {
				setStep("form");
				setForm({ name: "", company: "", email: "", useCase: "", teamSize: "" });
			}, 200);
		}
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setSubmitting(true);
		try {
			await submitHireForm({ data: form });
			setStep("booking");
		} catch {
			setStep("booking");
		} finally {
			setSubmitting(false);
		}
	}

	const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
		setForm((prev) => ({ ...prev, [field]: e.target.value }));

	const inputClass =
		"w-full bg-[#0C0C0C]/5 border border-[#0C0C0C]/10 rounded-lg px-4 py-3 text-sm text-[#1A1916] placeholder:text-[#5C584F]/60 focus:outline-none focus:ring-1 focus:ring-[#C9A96E]/50 focus:border-[#C9A96E]/50 transition-colors";

	return (
		<DialogPrimitive.Root open={hireModalOpen} onOpenChange={handleClose}>
			<DialogPrimitive.Portal>
				<DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
				<DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 w-[calc(100%-2rem)] max-w-4xl translate-x-[-50%] translate-y-[-50%] border border-[#0C0C0C]/[0.08] bg-[#F5F3EE] text-[#1A1916] rounded-2xl overflow-hidden shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
					{step === "form" ? (
						<div className="grid grid-cols-1 md:grid-cols-2 min-h-[520px]">
							{/* Left — Form */}
							<div className="p-8 md:p-10 flex flex-col justify-center">
								<div className="mb-6">
									<h2 className="text-2xl font-normal text-[#1A1916]">
										Book an AI employee discovery
									</h2>
									<p className="text-[#5C584F] text-sm mt-1.5">
										Tell us which role you want AI to own and book a call with our team.
									</p>
								</div>

								<form onSubmit={handleSubmit} className="space-y-4">
									<div className="grid grid-cols-2 gap-4">
										<div>
											<label htmlFor="hire-name" className="block text-xs text-[#5C584F] mb-1.5">
												Name *
											</label>
											<input
												id="hire-name"
												type="text"
												required
												value={form.name}
												onChange={update("name")}
												placeholder="Jane Smith"
												className={inputClass}
											/>
										</div>
										<div>
											<label htmlFor="hire-company" className="block text-xs text-[#5C584F] mb-1.5">
												Company *
											</label>
											<input
												id="hire-company"
												type="text"
												required
												value={form.company}
												onChange={update("company")}
												placeholder="Acme Inc."
												className={inputClass}
											/>
										</div>
									</div>

									<div>
										<label htmlFor="hire-email" className="block text-xs text-[#5C584F] mb-1.5">
											Work email *
										</label>
										<input
											id="hire-email"
											type="email"
											required
											value={form.email}
											onChange={update("email")}
											placeholder="jane@acme.com"
											className={inputClass}
										/>
									</div>

									<div>
										<label htmlFor="hire-role" className="block text-xs text-[#5C584F] mb-1.5">
											What should your first AI employee own? *
										</label>
										<input
											id="hire-role"
											type="text"
											required
											value={form.useCase}
											onChange={update("useCase")}
											placeholder="Lead qualification, support, transaction coordination"
											className={inputClass}
										/>
									</div>

									<div>
										<label htmlFor="hire-team-size" className="block text-xs text-[#5C584F] mb-1.5">
											Team size
										</label>
										<select
											id="hire-team-size"
											value={form.teamSize}
											onChange={update("teamSize")}
											className={inputClass}
										>
											<option value="">Select...</option>
											<option value="1-10">1-10</option>
											<option value="11-50">11-50</option>
											<option value="51-200">51-200</option>
											<option value="201-1000">201-1,000</option>
											<option value="1000+">1,000+</option>
										</select>
									</div>

									<button
										type="submit"
										disabled={submitting}
										className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-[#C9A96E] hover:bg-[#B8944F] disabled:opacity-60 text-[#0C0C0C] font-semibold text-sm px-6 py-3 rounded-full transition-colors"
									>
										{submitting ? (
											<Loader2 className="w-4 h-4 animate-spin" />
										) : (
											<>
												Continue to booking
												<ArrowRight className="w-4 h-4" />
											</>
										)}
									</button>
								</form>
							</div>

							{/* Right — Image + Glass Cards */}
							<div className="hidden md:block relative">
								<img
									src="/backgrounds/pastoral-hills.webp"
									alt="Pastoral hills landscape"
									className="absolute inset-0 w-full h-full object-cover"
								/>
								<div
									className="absolute inset-0"
									style={{
										background:
											"linear-gradient(to right, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.3) 100%)",
									}}
								/>
								<div className="relative z-10 flex flex-col gap-3 p-6 h-full justify-center">
									{[
										{ icon: BarChart3, title: "Role-first discovery", desc: "We identify the highest-leverage AI employee before we ship." },
										{ icon: Shield, title: "Guardrails from day one", desc: "Scoped permissions, approval layers, and auditability are built in." },
										{ icon: Zap, title: "Fast deployment loop", desc: "Audit, launch, stress-test, and operationalize in a tight cycle." },
									].map(({ icon: Icon, title, desc }) => (
										<div
											key={title}
											className="rounded-xl px-4 py-3.5 border border-[#0C0C0C]/[0.1]"
											style={{
												background: "rgba(255, 255, 255, 0.45)",
												backdropFilter: "blur(16px)",
											}}
										>
											<div className="flex items-center gap-2.5 mb-1">
												<Icon className="w-4 h-4 text-[#C9A96E]" />
												<span className="text-sm font-medium text-[#1A1916]">{title}</span>
											</div>
											<p className="text-xs text-[#5C584F] leading-relaxed pl-[26px]">{desc}</p>
										</div>
									))}
								</div>
							</div>
						</div>
					) : (
						<CalBookingStep />
					)}

					<DialogPrimitive.Close className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none">
						<X className="h-4 w-4" />
						<span className="sr-only">Close</span>
					</DialogPrimitive.Close>
				</DialogPrimitive.Content>
			</DialogPrimitive.Portal>
		</DialogPrimitive.Root>
	);
}

function loadCalScript(): Promise<any> {
	const win = window as any;
	if (win.Cal) return Promise.resolve(win.Cal);

	return new Promise((resolve) => {
		const script = document.createElement("script");
		script.src = "https://app.cal.com/embed/embed.js";
		script.async = true;
		script.onload = () => resolve(win.Cal);
		document.head.appendChild(script);
	});
}

function CalBookingStep() {
	const calRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = calRef.current;
		if (!el) return;

		// Use a unique namespace per mount to avoid stale references
		const ns = `hire-${Date.now()}`;

		loadCalScript().then((Cal) => {
			if (!Cal || !el.isConnected) return;

			Cal("init", ns, { origin: "https://app.cal.com" });

			Cal.ns[ns]("inline", {
				elementOrSelector: el,
				config: { layout: "month_view", theme: "dark" },
				calLink: "naironai/discovery-call",
			});

			Cal.ns[ns]("ui", {
				theme: "dark",
				hideEventTypeDetails: false,
				layout: "month_view",
			});
		});
	}, []);

	return (
		<div className="flex flex-col">
			<div className="px-8 pt-8 pb-4">
				<h2 className="text-2xl font-normal text-[#1A1916]">
					Book your intro call
				</h2>
				<p className="text-[#5C584F] text-sm mt-1">
					Pick a time that works for you.
				</p>
			</div>
			<div
				ref={calRef}
				className="scroll-fade-y scrollbar-thin w-full overflow-auto"
				style={{ minHeight: 500 }}
			/>
		</div>
	);
}
