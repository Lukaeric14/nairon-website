import { ArrowLeft } from "lucide-react";

export function SignalsArticleMasthead() {
	return (
		<header className="flex h-20 items-center justify-between border-b border-ds-border bg-ds-surface px-5 sm:h-24 sm:px-8 lg:px-12">
			<a
				href="/"
				className="group inline-flex items-baseline gap-2 text-ds-text-primary"
				aria-label="Nairon home"
			>
				<span className="text-[23px] font-semibold tracking-[-0.08em]">n.</span>
				<span className="font-mono text-[9px] uppercase tracking-[0.18em] text-transparent transition-colors group-hover:text-ds-text-tertiary group-focus-visible:text-ds-text-tertiary">
					Nairon
				</span>
			</a>
			<a
				href="/signals"
				className="inline-flex h-9 items-center gap-2 border border-ds-border bg-ds-surface-raised px-3 font-mono text-[9px] uppercase tracking-[0.16em] text-ds-text-secondary transition-colors hover:border-ds-text-tertiary hover:text-ds-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ds-text-primary"
			>
				<ArrowLeft className="size-3" />
				Signals
			</a>
		</header>
	);
}
