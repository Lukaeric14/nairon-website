import { useAction } from "convex/react";
import { api } from "@convex/_generated/api";
import { Loader2, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";

type ExplanationStyle = "simple" | "example" | "deeper";

function cleanError(error: unknown) {
	if (!(error instanceof Error)) return "The explanation is unavailable.";
	const match = error.message.match(/Uncaught Error:\s*([^\n]+?)(?:\s+at handler|\s+Called by client|$)/);
	return match?.[1]?.trim() || error.message;
}

function visitorId() {
	const key = "signals:reader-id";
	const existing = window.localStorage.getItem(key);
	if (existing) return existing;
	const created = window.crypto.randomUUID();
	window.localStorage.setItem(key, created);
	return created;
}

export function SelectionExplainer({ slug }: { slug: string }) {
	const explain = useAction(api.writingChecks.explainPublishedPassage);
	const [passage, setPassage] = useState("");
	const [answer, setAnswer] = useState("");
	const [error, setError] = useState("");
	const [pending, setPending] = useState<ExplanationStyle | null>(null);

	useEffect(() => {
		function inspectSelection() {
			const selection = window.getSelection();
			if (!selection || selection.isCollapsed || !selection.rangeCount) return;
			const text = selection.toString().replace(/\s+/g, " ").trim();
			const range = selection.getRangeAt(0);
			const container = range.commonAncestorContainer instanceof Element
				? range.commonAncestorContainer
				: range.commonAncestorContainer.parentElement;
			if (!container?.closest(".reader-copy") || text.length < 20) return;
			setPassage(text.slice(0, 1_000));
			setAnswer("");
			setError("");
		}
		document.addEventListener("mouseup", inspectSelection);
		document.addEventListener("touchend", inspectSelection);
		document.addEventListener("selectionchange", inspectSelection);
		return () => {
			document.removeEventListener("mouseup", inspectSelection);
			document.removeEventListener("touchend", inspectSelection);
			document.removeEventListener("selectionchange", inspectSelection);
		};
	}, []);

	async function request(style: ExplanationStyle) {
		setPending(style);
		setAnswer("");
		setError("");
		try {
			const result = await explain({ slug, passage, style, visitorId: visitorId() });
			setAnswer(result.answer);
		} catch (requestError) {
			setError(cleanError(requestError));
		} finally {
			setPending(null);
		}
	}

	function close() {
		window.getSelection()?.removeAllRanges();
		setPassage("");
	}

	if (!passage) return null;
	return (
		<aside className="fixed right-3 bottom-3 z-[60] w-[min(390px,calc(100vw-24px))] border border-white/15 bg-[#0c0c0c] p-4 font-geist text-white shadow-[0_20px_70px_rgba(0,0,0,.55)]" aria-label="Explain selected article text">
			<div className="flex items-center gap-2"><Sparkles className="size-3.5 text-white/55" /><p className="text-[11px] font-semibold">Help me understand this</p><button className="ml-auto p-1 text-white/35 hover:text-white" onClick={close} type="button" aria-label="Close explanation"><X className="size-4" /></button></div>
			<blockquote className="mt-3 line-clamp-3 border-l border-white/15 pl-3 text-[13px] leading-5 text-white/42">“{passage}”</blockquote>
			<div className="mt-4 flex flex-wrap gap-1.5">{([['simple', 'Explain simply'], ['example', 'Give an example'], ['deeper', 'Go deeper']] as const).map(([style, label]) => <button className="border border-white/15 px-2.5 py-2 font-mono text-[8px] uppercase tracking-[0.08em] text-white/55 hover:border-white/35 hover:text-white disabled:opacity-40" disabled={Boolean(pending)} key={style} onClick={() => void request(style)} type="button">{pending === style ? <Loader2 className="mr-1 inline size-3 animate-spin" /> : null}{label}</button>)}</div>
			{answer ? <div className="mt-4 border-t border-white/10 pt-4 text-[12px] leading-5 text-white/66"><p>{answer}</p><p className="mt-3 font-mono text-[8px] uppercase tracking-[0.1em] text-white/25">AI support · not a new article claim</p></div> : null}
			{error ? <p className="mt-4 border border-amber-200/20 bg-amber-400/5 p-3 text-[11px] leading-5 text-amber-200/75">{error}</p> : null}
		</aside>
	);
}
