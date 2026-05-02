import { useState } from "react";
import { ArrowUpRight, X, Award, Users, TrendingUp } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useModals } from "./modal-provider";

const PILLS = [
	"I build with AI every day",
	"I use Cursor, Copilot, or similar",
	"I've shipped AI-powered features",
	"I want to go deeper with AI",
	"I'm exploring AI engineering",
];

export function CandidateModal() {
	const { candidateModalOpen, closeCandidateModal } = useModals();
	const [selected, setSelected] = useState<Set<string>>(new Set());

	function toggle(pill: string) {
		setSelected((prev) => {
			const next = new Set(prev);
			if (next.has(pill)) next.delete(pill);
			else next.add(pill);
			return next;
		});
	}

	return (
		<DialogPrimitive.Root open={candidateModalOpen} onOpenChange={(open) => {
			if (!open) {
				closeCandidateModal();
				setTimeout(() => setSelected(new Set()), 200);
			}
		}}>
			<DialogPrimitive.Portal>
				<DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
				<DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 w-[calc(100%-2rem)] max-w-4xl translate-x-[-50%] translate-y-[-50%] border border-[#0C0C0C]/[0.08] bg-[#F5F3EE] text-[#1A1916] rounded-2xl overflow-hidden shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
					<div className="grid grid-cols-1 md:grid-cols-2 min-h-[480px]">
						{/* Left — Image + Glass Cards */}
						<div className="hidden md:block relative">
							<img
								src="/backgrounds/rolling-hills.webp"
								alt="Rolling hills landscape"
								className="absolute inset-0 w-full h-full object-cover"
							/>
							<div
								className="absolute inset-0"
								style={{
									background:
										"linear-gradient(to left, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.3) 100%)",
								}}
							/>
							<div className="relative z-10 flex flex-col gap-3 p-6 h-full justify-center">
								{[
									{ icon: Award, title: "AI-native profile review", desc: "Show how you work with agents, tools, and real delivery loops" },
									{ icon: Users, title: "Confidential matching", desc: "We connect you with roles that fit your skills and style" },
									{ icon: TrendingUp, title: "Career acceleration", desc: "Level up with our AI-native curriculum and community" },
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

						{/* Right — Quick qualifier */}
						<div className="p-8 md:p-10 flex flex-col justify-center">
							<div className="mb-6">
								<h2 className="text-2xl font-normal text-[#1A1916]">
									Join the Nairon network
								</h2>
								<p className="text-[#5C584F] text-sm mt-1.5">
									Tap everything that sounds like you.
								</p>
							</div>

							<div className="flex flex-wrap gap-2.5">
								{PILLS.map((pill) => {
									const isSelected = selected.has(pill);
									return (
										<button
											key={pill}
											type="button"
											onClick={() => toggle(pill)}
											className={`px-4 py-2 rounded-full text-sm transition-all border ${
												isSelected
													? "bg-[#C9A96E]/15 border-[#C9A96E]/40 text-[#C9A96E]"
													: "bg-[#0C0C0C]/[0.03] border-[#0C0C0C]/[0.08] text-[#5C584F] hover:border-[#0C0C0C]/15 hover:text-[#1A1916]"
											}`}
										>
											{pill}
										</button>
									);
								})}
							</div>

							<span
								className="mt-8 w-full inline-flex items-center justify-center gap-2 font-semibold text-sm px-6 py-3 rounded-full bg-[#0C0C0C]/[0.06] text-[#5C584F] cursor-not-allowed opacity-60"
								aria-disabled="true"
							>
								Enter Nairon Universe — Coming Soon
							</span>
						</div>
					</div>

					<DialogPrimitive.Close className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none">
						<X className="h-4 w-4" />
						<span className="sr-only">Close</span>
					</DialogPrimitive.Close>
				</DialogPrimitive.Content>
			</DialogPrimitive.Portal>
		</DialogPrimitive.Root>
	);
}
