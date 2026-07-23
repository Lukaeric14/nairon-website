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

	if (revision === undefined) return <div className="flex min-h-screen items-center justify-center bg-ds-shell"><Loader2 className="size-5 animate-spin text-ds-text-tertiary" aria-label="Loading article" /></div>;
	if (!revision) return <main className="flex min-h-screen items-center justify-center bg-ds-shell px-6 font-geist text-ds-text-primary"><div className="max-w-lg border border-ds-border bg-ds-surface p-8"><p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ds-text-tertiary">Signals</p><h1 className="mt-5 text-5xl leading-[0.95] tracking-[-0.05em]">This article is not published.</h1><a className="mt-8 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-ds-text-secondary hover:text-ds-text-primary" href="/signals"><ArrowLeft className="size-4" />Back to Signals</a></div></main>;

	return (
		<div className="min-h-screen bg-ds-shell font-geist text-ds-text-primary" data-reader-size={size}>
			<article className={`reader-copy signals-essay mx-auto min-h-screen border-x border-ds-border bg-ds-surface transition-[max-width] ${widthClass}`}>
				{focus ? null : <SignalsArticleMasthead />}
				<ArticleReaderToolbar mode={mode} onModeChange={setMode} focus={focus} onFocusChange={setFocus} size={size} onSizeChange={setSize} width={width} onWidthChange={setWidth} />
				<header className="border-b border-ds-border px-6 py-16 sm:px-10 sm:py-20 md:px-[clamp(5rem,10.7vw,9.25rem)] md:py-28">
					<a className="font-mono text-[10px] uppercase tracking-[0.16em] text-ds-text-tertiary hover:text-ds-text-primary" href="/signals">Signals</a>
					<h1 className="mt-10 max-w-5xl text-balance text-[clamp(3rem,7.5vw,7.2rem)] font-normal leading-[0.92] tracking-[-0.06em]">{revision.title}</h1>
					<div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ds-text-secondary"><span>{revision.authorName}</span><span aria-hidden="true">·</span><time dateTime={new Date(revision.publishedAt).toISOString()}>{new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(revision.publishedAt)}</time><span aria-hidden="true">·</span><span>{minutes} min {mode === "brief" ? "Brief" : "Deep Read"}</span></div>
				</header>
				<div className="px-6 py-16 sm:px-10 sm:py-20 md:px-[clamp(5rem,10.7vw,9.25rem)] md:py-24"><ArticleText text={text ?? ""} />{mode === "brief" ? <button className="mt-14 inline-flex h-11 items-center border border-ds-text-primary bg-ds-text-primary px-5 font-mono text-[9px] uppercase tracking-[0.12em] text-white transition-colors hover:bg-transparent hover:text-ds-text-primary" onClick={() => setMode("deep")} type="button">Continue with the Deep Read</button> : null}</div>
			</article>
			<SelectionExplainer slug={slug} />
		</div>
	);
}

function ArticleText({ text }: { text: string }) {
	const blocks = text.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);
	return <div className="article-prose max-w-[760px] space-y-8 text-[18px] leading-[1.78] tracking-[-0.008em] text-ds-text-primary sm:text-[20px]">{blocks.map((block, index) => {
		if (/^###\s+/.test(block)) return <h3 className="pt-8 text-2xl font-semibold leading-tight tracking-[-0.035em] text-ds-text-primary" key={`${block}-${index}`}>{block.replace(/^###\s+/, "")}</h3>;
		if (/^##?\s+/.test(block)) return <h2 className="pt-16 text-[clamp(2.3rem,5vw,4.6rem)] font-normal leading-[0.98] tracking-[-0.05em] text-ds-text-primary" key={`${block}-${index}`}>{block.replace(/^##?\s+/, "")}</h2>;
		const lines = block.split("\n");
		if (lines.every((line) => /^[-*]\s+/.test(line))) return <ul className="space-y-4 border-l-2 border-[var(--brand-gold)] pl-6 text-ds-text-primary" key={`${block}-${index}`}>{lines.map((line) => <li key={line}>{line.replace(/^[-*]\s+/, "")}</li>)}</ul>;
		if (/^>\s+/.test(block)) return <blockquote className="border-l-2 border-[var(--brand-gold)] bg-[#F7F5F0] px-6 py-5 text-ds-text-primary" key={`${block}-${index}`}>{block.replace(/^>\s+/gm, "")}</blockquote>;
		return <p className="whitespace-pre-wrap" key={`${block}-${index}`}>{block}</p>;
	})}</div>;
}
