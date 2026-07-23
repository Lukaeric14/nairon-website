import { Focus, Minus, Plus, Settings2 } from "lucide-react";

export type ReaderMode = "brief" | "deep";
export type ReaderSize = "small" | "medium" | "large";
export type ReaderWidth = "narrow" | "comfortable" | "wide";

export function ArticleReaderToolbar({
	mode,
	onModeChange,
	focus,
	onFocusChange,
	size,
	onSizeChange,
	width,
	onWidthChange,
}: {
	mode: ReaderMode;
	onModeChange: (mode: ReaderMode) => void;
	focus: boolean;
	onFocusChange: (focus: boolean) => void;
	size: ReaderSize;
	onSizeChange: (size: ReaderSize) => void;
	width: ReaderWidth;
	onWidthChange: (width: ReaderWidth) => void;
}) {
	const sizes: ReaderSize[] = ["small", "medium", "large"];
	const sizeIndex = sizes.indexOf(size);
	return (
		<nav aria-label="Article reading controls" className="sticky top-0 z-40 flex min-h-12 items-center border-b border-white/[0.09] bg-[#080808]/92 px-3 font-geist text-white backdrop-blur-md sm:px-5">
			<div className="flex border border-white/[0.12]">
				<button className={`px-3 py-2 font-mono text-[9px] uppercase tracking-[0.12em] transition-colors ${mode === "brief" ? "bg-white text-black" : "text-white/38 hover:text-white"}`} onClick={() => onModeChange("brief")} type="button">Brief</button>
				<button className={`border-l border-white/[0.12] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.12em] transition-colors ${mode === "deep" ? "bg-white text-black" : "text-white/38 hover:text-white"}`} onClick={() => onModeChange("deep")} type="button">Deep Read</button>
			</div>
			<span className="ml-3 hidden font-mono text-[9px] uppercase tracking-[0.1em] text-white/25 sm:inline">{mode === "brief" ? "About 2 minutes" : "Full reasoning and evidence"}</span>
			<div className="ml-auto flex items-center gap-1">
				<button aria-label={focus ? "Disable focus mode" : "Enable focus mode"} aria-pressed={focus} className={`flex h-8 items-center gap-2 border px-2.5 font-mono text-[9px] uppercase tracking-[0.1em] transition-colors ${focus ? "border-white bg-white text-black" : "border-transparent text-white/35 hover:border-white/15 hover:text-white"}`} onClick={() => onFocusChange(!focus)} type="button"><Focus className="size-3.5" /><span className="hidden sm:inline">Focus</span></button>
				<details className="relative">
					<summary className="flex size-8 cursor-pointer list-none items-center justify-center text-white/35 hover:bg-white/5 hover:text-white" aria-label="Reader settings"><Settings2 className="size-4" /></summary>
					<div className="absolute right-0 top-10 w-64 border border-white/[0.12] bg-[#101010] p-4 shadow-2xl">
						<div className="flex items-center justify-between"><span className="text-[11px] font-medium">Text size</span><div className="flex border border-white/10"><button className="grid size-8 place-items-center text-white/50 hover:text-white disabled:opacity-25" disabled={sizeIndex === 0} onClick={() => onSizeChange(sizes[sizeIndex - 1])} type="button" aria-label="Decrease article text size"><Minus className="size-3" /></button><span className="grid h-8 min-w-14 place-items-center border-x border-white/10 text-[10px] capitalize text-white/45">{size}</span><button className="grid size-8 place-items-center text-white/50 hover:text-white disabled:opacity-25" disabled={sizeIndex === sizes.length - 1} onClick={() => onSizeChange(sizes[sizeIndex + 1])} type="button" aria-label="Increase article text size"><Plus className="size-3" /></button></div></div>
						<fieldset className="mt-5"><legend className="text-[11px] font-medium">Reading width</legend><div className="mt-2 grid grid-cols-3 gap-1">{(["narrow", "comfortable", "wide"] as ReaderWidth[]).map((option) => <button aria-pressed={width === option} className={`border px-2 py-2 font-mono text-[8px] uppercase tracking-[0.08em] ${width === option ? "border-white bg-white text-black" : "border-white/10 text-white/35 hover:text-white"}`} key={option} onClick={() => onWidthChange(option)} type="button">{option}</button>)}</div></fieldset>
						<p className="mt-4 border-t border-white/10 pt-3 text-[10px] leading-4 text-white/30">These settings stay in this browser.</p>
					</div>
				</details>
			</div>
		</nav>
	);
}
