import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { IsoSceneRenderer } from "@/components/iso";
import { IsoZoomReveal } from "@/components/iso/iso-zoom-reveal";
import { SCENE_LIST, SCENES } from "@/components/iso/scenes";
import type { IsoSceneSpec } from "@/components/iso/core/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/iso-lab")({
	component: IsoLab,
	head: () => ({
		meta: [
			{ title: "Iso Lab — Nairon" },
			{ name: "robots", content: "noindex, nofollow" },
		],
	}),
});

/** Lever state lives outside the spec; merged onto it at render time. */
interface Levers {
	unit: number;
	strokeWidth: number;
	dash: string;
	linejoin: "round" | "miter" | "bevel";
	enableColors: boolean;
	ink: string;
	surface: string;
	accent: string;
	stagger: number;
	riseDuration: number;
	drawDuration: number;
	flow: boolean;
	grow: boolean;
	drop: boolean;
	sink: boolean;
	pulse: boolean;
	reduceMotion: boolean;
}

function leversFromSpec(spec: IsoSceneSpec): Levers {
	return {
		unit: spec.unit ?? 30,
		strokeWidth: spec.style?.strokeWidth ?? 0.8,
		dash: spec.style?.dash ?? "4 4",
		linejoin: spec.style?.linejoin ?? "round",
		enableColors: false,
		ink: spec.style?.ink ?? "#1a1916",
		surface: spec.style?.surface ?? "#fbfaf8",
		accent: spec.style?.accent ?? "#beff00",
		stagger: spec.animation?.stagger ?? 0.08,
		riseDuration: spec.animation?.riseDuration ?? 0.6,
		drawDuration: spec.animation?.drawDuration ?? 1.1,
		flow: spec.animation?.flow ?? false,
		grow: spec.animation?.grow ?? false,
		drop: spec.animation?.drop ?? false,
		sink: spec.animation?.sink ?? false,
		pulse: spec.animation?.pulse ?? false,
		reduceMotion: false,
	};
}

/** Named multi-scene sequences (outer → zoom → inner), previewed via IsoZoomReveal. */
const SEQUENCES = [
	{ id: "▶ step2: bars→chip", outer: "twoBars", inner: "systemsDesignChip", holdMs: 2000, zoomMs: 700 },
] as const;

function IsoLab() {
	const [sceneId, setSceneId] = useState(SCENE_LIST[0].id);
	const [seqId, setSeqId] = useState<string | null>(null);
	const activeSeq = SEQUENCES.find((q) => q.id === seqId) ?? null;
	const seqOuter = activeSeq ? SCENES[activeSeq.outer] : undefined;
	const seqInner = activeSeq ? SCENES[activeSeq.inner] : undefined;
	const baseScene = useMemo(
		() => SCENE_LIST.find((s) => s.id === sceneId) ?? SCENE_LIST[0],
		[sceneId],
	);

	// Layout/blocks: edited as JSON. Levers: style + animation + unit.
	const [spec, setSpec] = useState<IsoSceneSpec>(baseScene);
	const [levers, setLevers] = useState<Levers>(() => leversFromSpec(baseScene));
	const [draft, setDraft] = useState(() => JSON.stringify(baseScene, null, 2));
	const [jsonError, setJsonError] = useState<string | null>(null);
	const [playKey, setPlayKey] = useState(0);
	const [dark, setDark] = useState(false);
	const [copied, setCopied] = useState<string | null>(null);
	// null = playing live; 0–1 = reveal frozen at that point for scrubbing.
	const [scrub, setScrub] = useState<number | null>(null);

	// Re-seed everything when the scene changes.
	useEffect(() => {
		setSpec(baseScene);
		setLevers(leversFromSpec(baseScene));
		setDraft(JSON.stringify(baseScene, null, 2));
		setJsonError(null);
		setPlayKey((k) => k + 1);
		setScrub(null);
	}, [baseScene]);

	const liveSpec = useMemo<IsoSceneSpec>(
		() => ({
			...spec,
			unit: levers.unit,
			style: {
				strokeWidth: levers.strokeWidth,
				dash: levers.dash,
				linejoin: levers.linejoin,
				...(levers.enableColors
					? { ink: levers.ink, surface: levers.surface, accent: levers.accent }
					: {}),
			},
			animation: {
				mode: "reveal",
				stagger: levers.stagger,
				riseDuration: levers.riseDuration,
				drawDuration: levers.drawDuration,
				flow: levers.flow,
				grow: levers.grow,
				drop: levers.drop,
				sink: levers.sink,
				pulse: levers.pulse,
			},
		}),
		[spec, levers],
	);

	const set = <K extends keyof Levers>(key: K, val: Levers[K]) =>
		setLevers((l) => ({ ...l, [key]: val }));

	const applyJson = () => {
		try {
			const parsed = JSON.parse(draft) as IsoSceneSpec;
			if (!parsed.nodes || !parsed.viewBox) throw new Error("Spec needs `nodes` and `viewBox`.");
			setSpec(parsed);
			setLevers(leversFromSpec(parsed));
			setJsonError(null);
			setPlayKey((k) => k + 1);
		} catch (e) {
			setJsonError(e instanceof Error ? e.message : "Invalid JSON");
		}
	};

	const copy = async (label: string, text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(label);
			setTimeout(() => setCopied(null), 1400);
		} catch {
			setCopied("clipboard blocked");
		}
	};

	const exportJson = JSON.stringify(liveSpec, null, 2);
	const exportJsx = `import { IsoSceneRenderer } from "@/components/iso";\n\nconst spec = ${exportJson} as const;\n\nexport function Illustration() {\n\treturn <IsoSceneRenderer spec={spec} />;\n}\n`;

	return (
		<div className="min-h-screen bg-[#fbfaf8] text-[#1a1916] font-inter">
			<header className="border-b border-[#1a1916]/10 px-6 py-4">
				<div className="flex items-baseline gap-3">
					<h1 className="font-serif text-2xl">Iso Lab</h1>
					<span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#1a1916]/45">
						Isometric illustration playground
					</span>
				</div>
			</header>

			<div className="grid grid-cols-1 gap-px bg-[#1a1916]/10 lg:grid-cols-[320px_1fr]">
				{/* ── Controls ───────────────────────────────────── */}
				<aside className="space-y-6 bg-[#fbfaf8] p-5">
					<Section label="Scene">
						<div className="flex flex-wrap gap-1.5">
							{SCENE_LIST.map((s) => (
								<button
									key={s.id}
									type="button"
									onClick={() => {
										setSceneId(s.id);
										setSeqId(null);
									}}
									className={cn(
										"rounded-md border px-2.5 py-1 font-mono text-[11px] transition-colors",
										s.id === sceneId && !seqId
											? "border-[#1a1916] bg-[#1a1916] text-[#fbfaf8]"
											: "border-[#1a1916]/15 hover:border-[#1a1916]/40",
									)}
								>
									{s.id}
								</button>
							))}
						</div>
					</Section>

					<Section label="Sequences">
						<div className="flex flex-wrap gap-1.5">
							{SEQUENCES.map((q) => (
								<button
									key={q.id}
									type="button"
									onClick={() => setSeqId(q.id)}
									className={cn(
										"rounded-md border px-2.5 py-1 font-mono text-[11px] transition-colors",
										seqId === q.id
											? "border-[#1378E6] bg-[#1378E6] text-white"
											: "border-[#1378E6]/40 text-[#1378E6] hover:border-[#1378E6]",
									)}
								>
									{q.id}
								</button>
							))}
						</div>
					</Section>

					<Section label="Geometry">
						<Range label="Unit" min={16} max={56} step={1} value={levers.unit} onChange={(v) => set("unit", v)} />
						<Range label="Stroke" min={0.5} max={3} step={0.1} value={levers.strokeWidth} onChange={(v) => set("strokeWidth", v)} />
						<Field label="Dash">
							<input
								value={levers.dash}
								onChange={(e) => set("dash", e.target.value)}
								className="w-full rounded border border-[#1a1916]/15 bg-white px-2 py-1 font-mono text-[11px]"
							/>
						</Field>
						<Field label="Linejoin">
							<div className="flex gap-1.5">
								{(["round", "miter", "bevel"] as const).map((j) => (
									<button
										key={j}
										type="button"
										onClick={() => set("linejoin", j)}
										className={cn(
											"flex-1 rounded border px-2 py-1 font-mono text-[10px] capitalize",
											levers.linejoin === j ? "border-[#1a1916] bg-[#1a1916] text-[#fbfaf8]" : "border-[#1a1916]/15",
										)}
									>
										{j}
									</button>
								))}
							</div>
						</Field>
					</Section>

					<Section label="Color">
						<Toggle label="Override theme colors" checked={levers.enableColors} onChange={(v) => set("enableColors", v)} />
						{levers.enableColors && (
							<div className="space-y-2">
								<Color label="Ink" value={levers.ink} onChange={(v) => set("ink", v)} />
								<Color label="Surface" value={levers.surface} onChange={(v) => set("surface", v)} />
								<Color label="Accent" value={levers.accent} onChange={(v) => set("accent", v)} />
							</div>
						)}
					</Section>

					<Section label="Animation">
						<Range label="Stagger" min={0} max={0.4} step={0.01} value={levers.stagger} onChange={(v) => set("stagger", v)} />
						<Range label="Rise dur" min={0.2} max={1.6} step={0.05} value={levers.riseDuration} onChange={(v) => set("riseDuration", v)} />
						<Range label="Draw dur" min={0.4} max={2.4} step={0.05} value={levers.drawDuration} onChange={(v) => set("drawDuration", v)} />
						<Toggle label="Dash flow loop" checked={levers.flow} onChange={(v) => set("flow", v)} />
						<Toggle label="Grow from flat" checked={levers.grow} onChange={(v) => set("grow", v)} />
						<Toggle label="Drop from top" checked={levers.drop} onChange={(v) => set("drop", v)} />
						<Toggle label="Sink into hole" checked={levers.sink} onChange={(v) => set("sink", v)} />
						<Toggle label="Power-up pulse" checked={levers.pulse} onChange={(v) => set("pulse", v)} />
						<Toggle label="Simulate reduced motion" checked={levers.reduceMotion} onChange={(v) => set("reduceMotion", v)} />
					</Section>
				</aside>

				{/* ── Preview + IO ───────────────────────────────── */}
				<main className="space-y-px bg-[#1a1916]/10">
					<div className="flex items-center justify-between bg-[#fbfaf8] px-5 py-3">
						<div className="flex gap-2">
							<button type="button" onClick={() => { setScrub(null); setPlayKey((k) => k + 1); }} className="rounded-md bg-[#1a1916] px-3 py-1.5 font-mono text-[11px] text-[#fbfaf8]">
								↻ Replay
							</button>
							<button type="button" onClick={() => setDark((d) => !d)} className="rounded-md border border-[#1a1916]/15 px-3 py-1.5 font-mono text-[11px]">
								{dark ? "☾ Dark" : "☀ Light"}
							</button>
						</div>
						<div className="flex gap-2">
							<button type="button" onClick={() => copy("JSON", exportJson)} className="rounded-md border border-[#1a1916]/15 px-3 py-1.5 font-mono text-[11px]">
								Copy JSON
							</button>
							<button type="button" onClick={() => copy("JSX", exportJsx)} className="rounded-md border border-[#1a1916]/15 px-3 py-1.5 font-mono text-[11px]">
								Copy JSX
							</button>
							{copied && <span className="self-center font-mono text-[11px] text-[#1a1916]/50">{copied} ✓</span>}
						</div>
					</div>

					{!activeSeq && (
						<div className="flex items-center gap-3 bg-[#fbfaf8] px-5 py-2.5">
							<span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#1a1916]/45">Scrub</span>
							<input
								type="range"
								min={0}
								max={1}
								step={0.004}
								value={scrub ?? 0}
								onChange={(e) => setScrub(Number(e.target.value))}
								className="h-1 flex-1 accent-[#1378E6]"
							/>
							<span className="w-12 text-right font-mono text-[11px] text-[#1a1916]/55">
								{scrub == null ? "live" : `${Math.round(scrub * 100)}%`}
							</span>
							{scrub != null && (
								<button
									type="button"
									onClick={() => { setScrub(null); setPlayKey((k) => k + 1); }}
									className="rounded-md border border-[#1a1916]/15 px-2.5 py-1 font-mono text-[10px]"
								>
									▶ Play
								</button>
							)}
						</div>
					)}

					<div className={cn("flex items-center justify-center p-10", dark && "dark")}>
						<div className={cn("iso-blueprint w-full max-w-2xl rounded-xl border p-6", dark ? "border-white/10 bg-[#0f0f12]" : "border-[#1a1916]/10 bg-white")}>
							{activeSeq && seqOuter && seqInner ? (
								<IsoZoomReveal
									key={`${activeSeq.id}-${dark}-${playKey}`}
									outer={seqOuter}
									inner={seqInner}
									holdMs={activeSeq.holdMs}
									zoomMs={activeSeq.zoomMs}
									trigger="mount"
									playKey={playKey}
									reduceMotion={levers.reduceMotion}
								/>
							) : (
								<IsoSceneRenderer
									key={`${sceneId}-${dark}`}
									spec={liveSpec}
									trigger="mount"
									playKey={playKey}
									reduceMotion={levers.reduceMotion}
									scrub={scrub}
								/>
							)}
						</div>
					</div>

					<div className="grid grid-cols-1 gap-px bg-[#1a1916]/10 xl:grid-cols-2">
						<div className="bg-[#fbfaf8] p-5">
							<div className="mb-2 flex items-center justify-between">
								<span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#1a1916]/45">Layout / blocks (JSON)</span>
								<button type="button" onClick={applyJson} className="rounded-md bg-[#1a1916] px-3 py-1 font-mono text-[11px] text-[#fbfaf8]">
									Apply
								</button>
							</div>
							<textarea
								value={draft}
								onChange={(e) => setDraft(e.target.value)}
								spellCheck={false}
								className="h-[420px] w-full resize-none rounded-md border border-[#1a1916]/15 bg-white p-3 font-mono text-[11px] leading-relaxed"
							/>
							{jsonError && <p className="mt-2 font-mono text-[11px] text-red-600">{jsonError}</p>}
						</div>
						<div className="bg-[#fbfaf8] p-5">
							<span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-[#1a1916]/45">Export (merged with levers)</span>
							<pre className="h-[420px] w-full overflow-auto rounded-md border border-[#1a1916]/15 bg-white p-3 font-mono text-[11px] leading-relaxed">
								{exportJsx}
							</pre>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}

/* ── Tiny hand-rolled controls ──────────────────────────────────── */

function Section({ label, children }: { label: string; children: React.ReactNode }) {
	return (
		<section className="space-y-2.5">
			<h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#1a1916]/45">{label}</h2>
			{children}
		</section>
	);
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
	return (
		<label className="block space-y-1">
			<span className="font-mono text-[11px] text-[#1a1916]/60">{label}</span>
			{children}
		</label>
	);
}

function Range({ label, min, max, step, value, onChange }: { label: string; min: number; max: number; step: number; value: number; onChange: (v: number) => void }) {
	return (
		<label className="block space-y-1">
			<span className="flex justify-between font-mono text-[11px] text-[#1a1916]/60">
				<span>{label}</span>
				<span className="text-[#1a1916]/40">{value}</span>
			</span>
			<input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-[#1a1916]" />
		</label>
	);
}

function Color({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
	return (
		<label className="flex items-center justify-between gap-2">
			<span className="font-mono text-[11px] text-[#1a1916]/60">{label}</span>
			<span className="flex items-center gap-2">
				<input value={value} onChange={(e) => onChange(e.target.value)} className="w-24 rounded border border-[#1a1916]/15 bg-white px-2 py-1 font-mono text-[10px]" />
				<input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="h-7 w-7 rounded border border-[#1a1916]/15" />
			</span>
		</label>
	);
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
	return (
		<label className="flex cursor-pointer items-center justify-between gap-2">
			<span className="font-mono text-[11px] text-[#1a1916]/60">{label}</span>
			<input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="size-4 accent-[#1a1916]" />
		</label>
	);
}
