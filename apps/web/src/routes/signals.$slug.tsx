import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Navbar } from "@/components/landing-v2/hero";
import { Footer } from "@/components/landing-v2/footer";
import {
	ArticleReaderToolbar,
	type ReaderMode,
	type ReaderSize,
	type ReaderWidth,
} from "@/components/signals/article-reader-toolbar";
import { SelectionExplainer } from "@/components/signals/selection-explainer";

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
	const revision = useQuery(api.articles.getPublishedBySlug, { slug });
	const [mode, setMode] = useState<ReaderMode>("brief");
	const [focus, setFocus] = useState(false);
	const [size, setSize] = useState<ReaderSize>("medium");
	const [width, setWidth] = useState<ReaderWidth>("comfortable");
	const restored = useRef(false);

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
	const widthClass = width === "narrow" ? "max-w-[720px]" : width === "wide" ? "max-w-[1080px]" : "max-w-[840px]";

	if (revision === undefined) return <div className="flex min-h-screen items-center justify-center bg-[#f4f2ed]"><Loader2 className="size-5 animate-spin text-black/35" aria-label="Loading article" /></div>;
	if (!revision) return <main className="flex min-h-screen items-center justify-center bg-[#f4f2ed] px-6 font-geist"><div className="max-w-lg border border-black/10 bg-[#fbfaf7] p-8"><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/35">Signals</p><h1 className="mt-5 font-serif text-5xl">This article is not published.</h1><a className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#1378e6]" href="/signals"><ArrowLeft className="size-4" />Back to Signals</a></div></main>;

	return (
		<div className={`min-h-screen font-geist text-[#171714] ${focus ? "bg-[#e9e6df]" : "bg-[#f4f2ed]"}`} data-reader-size={size}>
			{focus ? null : <Navbar />}
			<div><ArticleReaderToolbar mode={mode} onModeChange={setMode} focus={focus} onFocusChange={setFocus} size={size} onSizeChange={setSize} width={width} onWidthChange={setWidth} /></div>
			<article className={`reader-copy mx-auto min-h-[80vh] border-x border-black/10 bg-[#fbfaf7] transition-[max-width] ${widthClass}`}>
				<header className="border-b border-black/10 px-6 py-12 sm:px-12 sm:py-16 md:px-20">
					<a className="text-[11px] text-black/40 hover:text-[#1378e6]" href="/signals">Signals</a>
					<h1 className="mt-7 font-serif text-[clamp(3rem,8vw,6.4rem)] leading-[0.92] tracking-[-0.05em]">{revision.title}</h1>
					<div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-black/40"><span>{revision.authorName}</span><span aria-hidden="true">·</span><time dateTime={new Date(revision.publishedAt).toISOString()}>{new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(revision.publishedAt)}</time><span aria-hidden="true">·</span><span>{minutes} min {mode === "brief" ? "Brief" : "Deep Read"}</span></div>
				</header>
				<div className="px-6 py-12 sm:px-12 sm:py-16 md:px-20"><ArticleText text={text ?? ""} />{mode === "brief" ? <button className="mt-12 inline-flex h-11 items-center bg-[#171714] px-5 text-sm font-medium text-white hover:bg-[#1378e6]" onClick={() => setMode("deep")} type="button">Continue with the Deep Read</button> : null}</div>
			</article>
			<SelectionExplainer slug={slug} />
			{focus ? null : <Footer />}
		</div>
	);
}

function ArticleText({ text }: { text: string }) {
	const blocks = text.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);
	return <div className="space-y-7 font-serif text-[20px] leading-[1.75] tracking-[-0.01em] text-[#292821] sm:text-[22px]">{blocks.map((block, index) => {
		if (/^###\s+/.test(block)) return <h3 className="pt-6 font-geist text-xl font-semibold leading-tight tracking-[-0.025em]" key={`${block}-${index}`}>{block.replace(/^###\s+/, "")}</h3>;
		if (/^##?\s+/.test(block)) return <h2 className="pt-10 font-serif text-4xl leading-[1.05] tracking-[-0.035em] sm:text-5xl" key={`${block}-${index}`}>{block.replace(/^##?\s+/, "")}</h2>;
		const lines = block.split("\n");
		if (lines.every((line) => /^[-*]\s+/.test(line))) return <ul className="space-y-3 border-l-2 border-[#1378e6]/30 pl-5" key={`${block}-${index}`}>{lines.map((line) => <li key={line}>{line.replace(/^[-*]\s+/, "")}</li>)}</ul>;
		if (/^>\s+/.test(block)) return <blockquote className="border-l-2 border-amber-400 bg-amber-50 px-5 py-4 italic" key={`${block}-${index}`}>{block.replace(/^>\s+/gm, "")}</blockquote>;
		return <p className="whitespace-pre-wrap" key={`${block}-${index}`}>{block}</p>;
	})}</div>;
}
