import { createFileRoute } from "@tanstack/react-router";
import { ConvexHttpClient } from "convex/browser";
import type { FunctionReturnType } from "convex/server";
import { api } from "@convex/_generated/api";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
	ArticleReaderToolbar,
	type ReaderMode,
	type ReaderSize,
	type ReaderWidth,
} from "@/components/signals/article-reader-toolbar";
import { SelectionExplainer } from "@/components/signals/selection-explainer";
import { SignalsArticleMasthead } from "@/components/signals/signals-article-masthead";

export const Route = createFileRoute("/signals/$slug")({
	component: PublishedSignalArticle,
	head: () => ({
		meta: [
			{ title: "Signals article | Nairon" },
			{ name: "description", content: "A Nairon Signal on building useful AI employees." },
		],
	}),
});

function PublishedSignalArticle() {
	const { slug } = Route.useParams();
	const [revision, setRevision] = useState<
		FunctionReturnType<typeof api.articles.getPublishedBySlug> | undefined
	>(undefined);
	const [mode, setMode] = useState<ReaderMode>("brief");
	const [focus, setFocus] = useState(false);
	const [size, setSize] = useState<ReaderSize>("medium");
	const [width, setWidth] = useState<ReaderWidth>("comfortable");
	const restored = useRef(false);

	useEffect(() => {
		let cancelled = false;
		const client = new ConvexHttpClient(import.meta.env.VITE_CONVEX_URL);
		void client
			.query(api.articles.getPublishedBySlug, { slug })
			.then((publishedRevision) => {
				if (!cancelled) setRevision(publishedRevision);
			})
			.catch(() => {
				if (!cancelled) setRevision(null);
			});
		return () => {
			cancelled = true;
		};
	}, [slug]);

	useEffect(() => {
		const savedMode = window.localStorage.getItem("signals:reader-mode");
		const savedSize = window.localStorage.getItem("signals:reader-size");
		const savedWidth = window.localStorage.getItem("signals:reader-width");
		if (savedMode === "brief" || savedMode === "deep") setMode(savedMode);
		if (savedSize === "small" || savedSize === "medium" || savedSize === "large") setSize(savedSize);
		if (savedWidth === "narrow" || savedWidth === "comfortable" || savedWidth === "wide") setWidth(savedWidth);
		const position = Number(window.localStorage.getItem(`signals:position:${slug}`));
		window.setTimeout(() => {
			if (position > 0) window.scrollTo({ top: position });
			restored.current = true;
		}, 80);
	}, [slug]);

	useEffect(() => {
		window.localStorage.setItem("signals:reader-mode", mode);
		window.localStorage.setItem("signals:reader-size", size);
		window.localStorage.setItem("signals:reader-width", width);
		function rememberPosition() {
			if (restored.current) window.localStorage.setItem(`signals:position:${slug}`, String(Math.round(window.scrollY)));
		}
		window.addEventListener("scroll", rememberPosition, { passive: true });
		return () => window.removeEventListener("scroll", rememberPosition);
	}, [mode, size, slug, width]);

	const text = mode === "brief" ? revision?.brief : revision?.deepRead;
	const minutes = useMemo(() => Math.max(1, Math.ceil((text?.trim().split(/\s+/).length ?? 0) / 220)), [text]);
	const widthClass = width === "narrow" ? "max-w-[1120px]" : width === "wide" ? "max-w-[1536px]" : "max-w-[1380px]";

	if (revision === undefined) return <div className="flex min-h-screen items-center justify-center bg-[#020202]"><Loader2 className="size-5 animate-spin text-white/35" aria-label="Loading article" /></div>;
	if (!revision) return <main className="flex min-h-screen items-center justify-center bg-[#020202] px-6 font-geist text-white"><div className="max-w-lg border border-white/10 bg-[#080808] p-8"><p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">Signals</p><h1 className="mt-5 text-5xl leading-[0.95] tracking-[-0.05em]">This article is not published.</h1><a className="mt-8 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-white/50 hover:text-white" href="/signals"><ArrowLeft className="size-4" />Back to Signals</a></div></main>;

	return (
		<div className="min-h-screen bg-[#020202] font-geist text-white" data-reader-size={size}>
			<article className={`reader-copy signals-essay mx-auto min-h-screen border-x border-white/[0.09] bg-[#080808] transition-[max-width] ${widthClass}`}>
				{focus ? null : <SignalsArticleMasthead />}
				<ArticleReaderToolbar mode={mode} onModeChange={setMode} focus={focus} onFocusChange={setFocus} size={size} onSizeChange={setSize} width={width} onWidthChange={setWidth} />
				<header className="border-b border-white/[0.09] px-6 py-16 sm:px-10 sm:py-20 md:px-[148px] md:py-28">
					<a className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/28 hover:text-white" href="/signals">Signals</a>
					<h1 className="mt-12 max-w-5xl text-balance text-[clamp(3.4rem,8.5vw,8.6rem)] font-normal leading-[0.88] tracking-[-0.065em]">{revision.title}</h1>
					<div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[9px] uppercase tracking-[0.12em] text-white/28"><span>{revision.authorName}</span><span aria-hidden="true">·</span><time dateTime={new Date(revision.publishedAt).toISOString()}>{new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(revision.publishedAt)}</time><span aria-hidden="true">·</span><span>{minutes} min {mode === "brief" ? "Brief" : "Deep Read"}</span></div>
				</header>
				<div className="px-6 py-16 sm:px-10 sm:py-20 md:px-[148px] md:py-24"><ArticleText text={text ?? ""} />{mode === "brief" ? <button className="mt-14 inline-flex h-11 items-center border border-white/20 bg-white px-5 font-mono text-[9px] uppercase tracking-[0.12em] text-black transition-colors hover:bg-transparent hover:text-white" onClick={() => setMode("deep")} type="button">Continue with the Deep Read</button> : null}</div>
			</article>
			<SelectionExplainer slug={slug} />
		</div>
	);
}

function ArticleText({ text }: { text: string }) {
	const blocks = text.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);
	return <div className="max-w-[920px] space-y-8 text-[18px] leading-[1.78] tracking-[-0.01em] text-white/68 sm:text-[21px]">{blocks.map((block, index) => {
		if (/^###\s+/.test(block)) return <h3 className="pt-8 text-2xl font-medium leading-tight tracking-[-0.035em] text-white" key={`${block}-${index}`}>{block.replace(/^###\s+/, "")}</h3>;
		if (/^##?\s+/.test(block)) return <h2 className="pt-16 text-[clamp(2.4rem,5vw,5rem)] font-normal leading-[0.98] tracking-[-0.05em] text-white" key={`${block}-${index}`}>{block.replace(/^##?\s+/, "")}</h2>;
		const lines = block.split("\n");
		if (lines.every((line) => /^[-*]\s+/.test(line))) return <ul className="space-y-4 border-l border-white/20 pl-6 text-white/62" key={`${block}-${index}`}>{lines.map((line) => <li key={line}>{line.replace(/^[-*]\s+/, "")}</li>)}</ul>;
		if (/^>\s+/.test(block)) return <blockquote className="border-l border-white/30 bg-white/[0.025] px-6 py-5 text-white/72" key={`${block}-${index}`}>{block.replace(/^>\s+/gm, "")}</blockquote>;
		return <p className="whitespace-pre-wrap" key={`${block}-${index}`}>{block}</p>;
	})}</div>;
}
