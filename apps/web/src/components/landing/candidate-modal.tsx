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
				<DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 w-[calc(100%-2rem)] max-w-4xl translate-x-[-50%] translate-y-[-50%] border border-white/[0.08] bg-[#141414] text-[#E8E4DE] rounded-2xl overflow-hidden shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
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
										"linear-gradient(to left, rgba(20,20,20,0.5) 0%, rgba(20,20,20,0.2) 50%, rgba(20,20,20,0.3) 100%)",
								}}
							/>
							<div className="relative z-10 flex flex-col gap-3 p-6 h-full justify-center">
								{[
									{ icon: Award, title: "Free AI-nativeness score", desc: "Benchmark yourself with Flux — used by top companies" },
									{ icon: Users, title: "Confidential matching", desc: "We connect you with roles that fit your skills and style" },
									{ icon: TrendingUp, title: "Career acceleration", desc: "Level up with our AI-native curriculum and community" },
								].map(({ icon: Icon, title, desc }) => (
									<div
										key={title}
										className="rounded-xl px-4 py-3.5 border border-white/[0.1]"
										style={{
											background: "rgba(20, 20, 18, 0.45)",
											backdropFilter: "blur(16px)",
										}}
									>
										<div className="flex items-center gap-2.5 mb-1">
											<Icon className="w-4 h-4 text-[#C9A96E]" />
											<span className="text-sm font-medium text-[#E8E4DE]">{title}</span>
										</div>
										<p className="text-xs text-[#A39E96] leading-relaxed pl-[26px]">{desc}</p>
									</div>
								))}
							</div>
						</div>

						{/* Right — Quick qualifier */}
						<div className="p-8 md:p-10 flex flex-col justify-center">
							<div className="mb-6">
								<h2 className="text-2xl font-normal text-[#E8E4DE]">
									Join the Nairon network
								</h2>
								<p className="text-[#A39E96] text-sm mt-1.5">
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
													: "bg-white/[0.03] border-white/[0.08] text-[#A39E96] hover:border-white/15 hover:text-[#E8E4DE]"
											}`}
										>
											{pill}
										</button>
									);
								})}
							</div>

							<span
								className="mt-8 w-full inline-flex items-center justify-center gap-2 font-semibold text-sm px-6 py-3 rounded-full bg-white/[0.06] text-[#A39E96] cursor-not-allowed opacity-60"
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
