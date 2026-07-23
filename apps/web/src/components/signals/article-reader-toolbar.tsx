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
		<nav aria-label="Article reading controls" className="sticky top-0 z-40 flex min-h-12 items-center border-b border-[#101014]/10 bg-[#fbfaf7]/95 px-3 font-geist backdrop-blur-md sm:px-5">
			<div className="flex border border-black/10 bg-[#eeece6] p-0.5">
				<button className={`px-3 py-1.5 text-[11px] font-medium ${mode === "brief" ? "bg-white text-black shadow-sm" : "text-black/45"}`} onClick={() => onModeChange("brief")} type="button">Brief</button>
				<button className={`px-3 py-1.5 text-[11px] font-medium ${mode === "deep" ? "bg-white text-black shadow-sm" : "text-black/45"}`} onClick={() => onModeChange("deep")} type="button">Deep Read</button>
			</div>
			<span className="ml-3 hidden text-[10px] text-black/35 sm:inline">{mode === "brief" ? "About 2 minutes" : "Full reasoning and evidence"}</span>
			<div className="ml-auto flex items-center gap-1">
				<button aria-pressed={focus} className={`flex h-8 items-center gap-2 px-2.5 text-[11px] ${focus ? "bg-[#171714] text-white" : "text-black/45 hover:bg-black/5"}`} onClick={() => onFocusChange(!focus)} type="button"><Focus className="size-3.5" /><span className="hidden sm:inline">Focus</span></button>
				<details className="relative">
					<summary className="flex size-8 cursor-pointer list-none items-center justify-center text-black/45 hover:bg-black/5" aria-label="Reader settings"><Settings2 className="size-4" /></summary>
					<div className="absolute right-0 top-10 w-64 border border-black/10 bg-white p-4 shadow-xl">
						<div className="flex items-center justify-between"><span className="text-[11px] font-medium">Text size</span><div className="flex border border-black/10"><button className="grid size-8 place-items-center disabled:opacity-25" disabled={sizeIndex === 0} onClick={() => onSizeChange(sizes[sizeIndex - 1])} type="button" aria-label="Decrease article text size"><Minus className="size-3" /></button><span className="grid h-8 min-w-14 place-items-center border-x border-black/10 text-[10px] capitalize text-black/45">{size}</span><button className="grid size-8 place-items-center disabled:opacity-25" disabled={sizeIndex === sizes.length - 1} onClick={() => onSizeChange(sizes[sizeIndex + 1])} type="button" aria-label="Increase article text size"><Plus className="size-3" /></button></div></div>
						<fieldset className="mt-5"><legend className="text-[11px] font-medium">Reading width</legend><div className="mt-2 grid grid-cols-3 gap-1">{(["narrow", "comfortable", "wide"] as ReaderWidth[]).map((option) => <button aria-pressed={width === option} className={`border px-2 py-2 text-[9px] capitalize ${width === option ? "border-[#1378e6] bg-blue-50 text-[#1378e6]" : "border-black/10 text-black/40"}`} key={option} onClick={() => onWidthChange(option)} type="button">{option}</button>)}</div></fieldset>
						<p className="mt-4 border-t border-black/10 pt-3 text-[10px] leading-4 text-black/35">These settings stay in this browser.</p>
					</div>
				</details>
			</div>
		</nav>
	);
}
