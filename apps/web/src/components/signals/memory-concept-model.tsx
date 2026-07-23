import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

const modelSteps = [
	{
		id: "activity",
		label: "Company activity",
		detail: "A decision, transcript, document, or customer promise becomes source material.",
	},
	{
		id: "proposal",
		label: "Proposed memory",
		detail: "The system extracts a useful fact. Raw transcripts are not treated as memory by default.",
	},
	{
		id: "governance",
		label: "Governance check",
		detail: "Source, permission, workspace, and freshness determine whether the fact is usable.",
	},
	{
		id: "retrieval",
		label: "Relevant context",
		detail: "The agent retrieves only context that fits the task and its access boundary.",
	},
	{
		id: "decision",
		label: "Informed action",
		detail: "The agent can act—or push back—using the company’s actual constraints and history.",
	},
] as const;

export function MemoryConceptModel() {
	const [step, setStep] = useState(0);
	const [playing, setPlaying] = useState(false);
	const [reducedMotion, setReducedMotion] = useState(false);

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
		}, 1450);
		return () => window.clearInterval(timer);
	}, [playing, reducedMotion]);

	function reset() {
		setPlaying(false);
		setStep(0);
	}

	return (
		<section className="border-y border-[#101014]/10 bg-[#eceae4] px-5 py-12 sm:px-8 md:px-10 md:py-16" aria-labelledby="memory-model-title">
			<div className="mx-auto max-w-[900px]">
				<p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#1378e6]">Concept model</p>
				<div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
					<div><h2 id="memory-model-title" className="max-w-2xl font-serif text-4xl leading-[1.02] tracking-[-0.035em] sm:text-5xl">Memory is a governed path, not a bucket.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-black/50">Follow one fact from company activity to an agent decision. The governance step is what keeps retrieval useful and safe.</p></div>
					<div className="flex shrink-0 items-center gap-1"><button className="flex h-9 items-center gap-2 bg-[#171714] px-3 text-[11px] font-medium text-white hover:bg-[#1378e6]" onClick={() => setPlaying(!playing)} type="button">{playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}{playing ? "Pause" : step === modelSteps.length - 1 ? "Replay" : "Play"}</button><button className="grid size-9 place-items-center border border-black/10 bg-white text-black/45 hover:text-black" onClick={reset} type="button" aria-label="Reset concept model"><RotateCcw className="size-3.5" /></button></div>
				</div>
				<div className="mt-9 grid gap-2 sm:grid-cols-5" role="list" aria-label="Memory path">
					{modelSteps.map((item, index) => {
						const reached = reducedMotion || index <= step;
						const active = !reducedMotion && index === step;
						return <div className="relative" key={item.id} role="listitem"><button className={`relative flex min-h-28 w-full flex-col border p-3 text-left transition-[background-color,border-color,transform,opacity] duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1378e6] ${reached ? "border-[#1378e6]/35 bg-white opacity-100" : "border-black/10 bg-white/40 opacity-45"} ${active ? "-translate-y-1 shadow-[0_8px_22px_rgba(19,120,230,.12)]" : ""}`} onClick={() => { setPlaying(false); setStep(index); }} type="button" aria-current={active ? "step" : undefined}><span className="font-mono text-[9px] text-black/30">0{index + 1}</span><span className="mt-auto text-[12px] font-semibold leading-4">{item.label}</span>{index < modelSteps.length - 1 ? <span className={`absolute -right-2 top-1/2 z-10 hidden h-px w-2 sm:block ${reached && index < step ? "bg-[#1378e6]" : "bg-black/15"}`} aria-hidden="true" /> : null}</button></div>;
					})}
				</div>
				<div className="mt-3 min-h-24 border border-black/10 bg-[#fbfaf7] p-4 sm:p-5" aria-live="polite"><p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#1378e6]">{reducedMotion ? "Complete path" : `Step ${step + 1} of ${modelSteps.length}`}</p><p className="mt-2 max-w-2xl text-sm leading-6 text-black/65">{reducedMotion ? modelSteps.map((item) => item.detail).join(" ") : modelSteps[step].detail}</p></div>
			</div>
	</section>
	);
}
