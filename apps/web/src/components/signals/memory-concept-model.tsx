import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useId, useState } from "react";

const modelSteps = [
	{
		id: "activity",
		label: "Company activity",
		shortLabel: "Source",
		detail: "A decision, transcript, document, or customer promise becomes source material.",
		x: 8,
		y: 12,
	},
	{
		id: "proposal",
		label: "Proposed memory",
		shortLabel: "Extract",
		detail: "The system extracts a useful fact. Raw transcripts are not treated as memory by default.",
		x: 62,
		y: 12,
	},
	{
		id: "governance",
		label: "Governance check",
		shortLabel: "Guard",
		detail: "Source, permission, workspace, and freshness determine whether the fact is usable.",
		x: 35,
		y: 39,
	},
	{
		id: "retrieval",
		label: "Relevant context",
		shortLabel: "Retrieve",
		detail: "The agent retrieves only context that fits the task and its access boundary.",
		x: 8,
		y: 68,
	},
	{
		id: "decision",
		label: "Informed action",
		shortLabel: "Act",
		detail: "The agent can act—or push back—using the company’s actual constraints and history.",
		x: 62,
		y: 68,
	},
] as const;

const paths = [
	"M 26 19 H 62",
	"M 72 27 V 39 H 61",
	"M 42 54 H 26 V 68",
	"M 26 76 H 62",
] as const;

export function MemoryConceptModel() {
	const [step, setStep] = useState(0);
	const [playing, setPlaying] = useState(false);
	const [reducedMotion, setReducedMotion] = useState(false);
	const titleId = useId();

	useEffect(() => {
		const media = window.matchMedia("(prefers-reduced-motion: reduce)");
		const update = () => setReducedMotion(media.matches);
		update();
		media.addEventListener("change", update);
		return () => media.removeEventListener("change", update);
	}, []);

	useEffect(() => {
		if (!playing) return;
		if (reducedMotion) {
			setStep(modelSteps.length - 1);
			setPlaying(false);
			return;
		}
		const timer = window.setInterval(() => {
			setStep((current) => {
				if (current >= modelSteps.length - 1) {
					setPlaying(false);
					return current;
				}
				return current + 1;
			});
		}, 1250);
		return () => window.clearInterval(timer);
	}, [playing, reducedMotion]);

	function togglePlayback() {
		if (step === modelSteps.length - 1) setStep(0);
		setPlaying((current) => !current);
	}

	function reset() {
		setPlaying(false);
		setStep(0);
	}

	return (
		<section className="border-y border-ds-border bg-ds-surface text-ds-text-primary" aria-labelledby={titleId}>
			<div className="grid lg:grid-cols-[0.72fr_1.28fr]">
				<div className="border-b border-ds-border px-6 py-12 sm:px-10 sm:py-16 lg:border-r lg:border-b-0 lg:px-12 lg:py-20">
					<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ds-text-tertiary">Concept model 01</p>
					<h2 id={titleId} className="mt-5 max-w-xl text-[clamp(2.1rem,4.2vw,4.7rem)] font-normal leading-[0.96] tracking-[-0.045em]">
						Memory is a governed path, not a bucket.
					</h2>
					<p className="mt-7 max-w-lg text-[17px] leading-8 text-ds-text-secondary">
						Follow one fact from company activity to an agent decision. The guard in the middle is what makes context useful instead of merely abundant.
					</p>
					<p className="mt-9 border-l-2 border-[var(--brand-gold)] pl-4 text-[14px] leading-6 text-ds-text-primary" aria-live="polite">
						<span className="mb-1 block font-mono text-[9px] uppercase tracking-[0.16em] text-ds-text-tertiary">
							{reducedMotion ? "Complete path" : `${String(step + 1).padStart(2, "0")} / ${String(modelSteps.length).padStart(2, "0")}`}
						</span>
						{reducedMotion ? "Source material is extracted, governed, retrieved inside its access boundary, and used in an informed action." : modelSteps[step].detail}
					</p>
				</div>

				<div className="relative min-h-[430px] overflow-hidden bg-[#F7F5F0] sm:min-h-[560px]">
					<div className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(20,23,31,0.18)_0.7px,transparent_0.7px)] [background-size:9px_9px]" aria-hidden="true" />
					<div className="relative flex h-14 items-center justify-end gap-1 border-b border-ds-border bg-[#F7F5F0]/90 px-3 backdrop-blur-sm sm:px-5">
						<button
							className="inline-flex h-8 items-center gap-2 border border-ds-border bg-ds-surface-raised px-3 font-mono text-[9px] uppercase tracking-[0.12em] text-ds-text-secondary transition-colors hover:border-ds-text-tertiary hover:text-ds-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ds-text-primary"
							onClick={togglePlayback}
							type="button"
						>
							{playing ? <Pause className="size-3" /> : <Play className="size-3" />}
							{playing ? "Pause" : step === modelSteps.length - 1 ? "Replay" : "Play path"}
						</button>
						<button
							className="inline-flex size-8 items-center justify-center border border-ds-border bg-ds-surface-raised text-ds-text-secondary transition-colors hover:border-ds-text-tertiary hover:text-ds-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ds-text-primary"
							onClick={reset}
							type="button"
							aria-label="Reset concept model"
						>
							<RotateCcw className="size-3" />
						</button>
					</div>

					<div className="relative h-[374px] sm:h-[506px]">
						<svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
							<defs>
								<marker id="memory-arrow" markerHeight="3" markerWidth="3" orient="auto" refX="2.3" refY="1.5">
									<path d="M 0 0 L 3 1.5 L 0 3 z" fill="rgba(20,23,31,.64)" />
								</marker>
							</defs>
							{paths.map((path, index) => (
								<path
									key={path}
									d={path}
									fill="none"
									markerEnd="url(#memory-arrow)"
									stroke={reducedMotion || index < step ? "rgba(20,23,31,.64)" : "rgba(20,23,31,.18)"}
									strokeWidth=".16"
									vectorEffect="non-scaling-stroke"
								/>
							))}
						</svg>

						{modelSteps.map((item, index) => {
							const reached = reducedMotion || index <= step;
							const active = !reducedMotion && index === step;
							return (
								<button
									key={item.id}
									type="button"
									onClick={() => {
										setPlaying(false);
										setStep(index);
									}}
									aria-current={active ? "step" : undefined}
									className={`absolute flex h-[78px] w-[30%] min-w-[112px] max-w-[210px] flex-col justify-between border bg-ds-surface-raised p-3 text-left shadow-[0_4px_18px_rgba(20,23,31,.05)] transition-[border-color,background-color,opacity,transform] duration-500 focus-visible:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ds-text-primary sm:h-[96px] sm:p-4 ${
										reached ? "border-ds-text-tertiary opacity-100" : "border-ds-border opacity-100"
									} ${active ? "z-10 -translate-y-1 border-[var(--brand-dark)] bg-[#F4EBDD]" : ""}`}
									style={{ left: `${item.x}%`, top: `${item.y}%` }}
								>
									<span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ds-text-tertiary">
										{item.shortLabel} · {String(index + 1).padStart(2, "0")}
									</span>
									<span className="text-[12px] font-medium leading-4 text-ds-text-primary sm:text-[14px] sm:leading-5">{item.label}</span>
								</button>
							);
						})}

						<div className="absolute bottom-[17%] left-[44%] hidden border border-ds-border bg-ds-surface-raised px-2 py-1 font-mono text-[8px] uppercase tracking-[0.13em] text-ds-text-tertiary sm:block">
							permissioned context
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
