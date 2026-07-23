import { ArrowLeft } from "lucide-react";

export function SignalsArticleMasthead() {
	return (
		<header className="flex h-20 items-center justify-between border-b border-white/[0.09] px-5 sm:h-24 sm:px-8 lg:px-12">
			<a
				href="/"
				className="group inline-flex items-baseline gap-2 text-white"
				aria-label="Nairon home"
			>
				<span className="text-[23px] font-semibold tracking-[-0.08em]">n.</span>
				<span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/0 transition-colors group-hover:text-white/35 group-focus-visible:text-white/35">
					Nairon
				</span>
			</a>
			<a
				href="/signals"
				className="inline-flex h-9 items-center gap-2 border border-white/[0.12] px-3 font-mono text-[9px] uppercase tracking-[0.16em] text-white/48 transition-colors hover:border-white/30 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
			>
				<ArrowLeft className="size-3" />
				Signals
			</a>
		</header>
	);
}
