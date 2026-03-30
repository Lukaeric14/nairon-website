import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { ArrowUpRight, FileDown, Loader2, AlertCircle, CheckCircle2, Link2 } from "lucide-react";
import {
	Navbar,
	Footer,
} from "@/components/landing";
import { ModalProvider } from "@/components/landing/modal-provider";
import { HireModal } from "@/components/landing/hire-modal";
import { CandidateModal } from "@/components/landing/candidate-modal";
import { seoHead } from "@/lib/seo";
import { scrapeZillowListing } from "@/server/zillow-scrape";
import type { ZillowListing } from "@/server/zillow-scrape";

export const Route = createFileRoute("/for/real-estate_/property-pdf")({
	component: PropertyPdfPage,
	head: () =>
		seoHead({
			title: "Free Property PDF Generator — Nairon",
			description:
				"Paste a Zillow link and instantly generate a beautiful, branded property PDF. Free tool for real estate brokerages.",
			path: "/for/real-estate/property-pdf",
		}),
});

type PageState =
	| { step: "input" }
	| { step: "loading" }
	| { step: "error"; message: string }
	| { step: "ready"; listing: ZillowListing };

function PropertyPdfPage() {
	const [state, setState] = useState<PageState>({ step: "input" });
	const [url, setUrl] = useState("");
	const [email, setEmail] = useState("");
	const [generating, setGenerating] = useState(false);

	const handleSubmit = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();
			if (!url.trim() || !email.trim()) return;

			setState({ step: "loading" });

			try {
				const result = await scrapeZillowListing({
					data: { url: url.trim(), email: email.trim() },
				})

				if (result.success && result.listing) {
					setState({ step: "ready", listing: result.listing });
				} else {
					setState({
						step: "error",
						message: result.error || "Failed to fetch listing data",
					})
				}
			} catch (err) {
				setState({
					step: "error",
					message:
						err instanceof Error
							? err.message
							: "Something went wrong. Please try again.",
				})
			}
		},
		[url, email],
	)

	const handleDownloadPdf = useCallback(async () => {
		if (state.step !== "ready") return;
		setGenerating(true);

		try {
			// Dynamic import to avoid SSR issues with @react-pdf/renderer
			const { pdf } = await import("@react-pdf/renderer");
			const { PropertyPDF } = await import(
				"@/components/property-pdf/pdf-template"
			)
			const { createElement } = await import("react");

			const blob = await pdf(
				createElement(PropertyPDF, { listing: state.listing }) as any,
			).toBlob();

			const downloadUrl = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = downloadUrl;
			a.download = `${state.listing.address || "property"}-nairon.pdf`.replace(
				/[^a-zA-Z0-9.-]/g,
				"-",
			)
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(downloadUrl);
		} catch (err) {
			console.error("PDF generation failed:", err);
			alert("PDF generation failed. Please try again.");
		} finally {
			setGenerating(false);
		}
	}, [state]);

	return (
		<ModalProvider>
			<div className="min-h-screen bg-[#0C0C0C] text-[#E8E4DE] font-inter">
				<Navbar minimal />

				<div className="pt-16 mt-12 md:mt-16">
					{/* Hero */}
					<div className="px-6 md:px-12 py-16 md:py-24 max-w-4xl mx-auto text-center">
						<p className="text-[#C9A96E] text-xs font-medium uppercase tracking-[0.2em] mb-5">
							Free Tool for Brokerages
						</p>
						<h1
							className="font-normal tracking-[-2px] md:tracking-[-3px] text-[#E8E4DE]"
							style={{
								fontSize: "clamp(28px, 5vw, 56px)",
								lineHeight: 1.15,
							}}
						>
							Generate a Property PDF{" "}
							<span className="font-serif italic text-[#C9A96E]">
								in Seconds
							</span>
						</h1>
						<p className="mt-5 text-[#A39E96] text-base md:text-lg leading-relaxed max-w-xl mx-auto">
							Paste any Zillow listing link and get a beautifully designed,
							ready-to-share property brochure. No design skills needed.
						</p>
					</div>

					{/* Main tool area */}
					<div className="px-6 md:px-12 pb-20 md:pb-32 max-w-3xl mx-auto">
						{state.step === "input" && (
							<InputForm
								url={url}
								email={email}
								onUrlChange={setUrl}
								onEmailChange={setEmail}
								onSubmit={handleSubmit}
							/>
						)}

						{state.step === "loading" && <LoadingState />}

						{state.step === "error" && (
							<ErrorState
								message={state.message}
								onRetry={() => setState({ step: "input" })}
							/>
						)}

						{state.step === "ready" && (
							<ReadyState
								listing={state.listing}
								onDownload={handleDownloadPdf}
								generating={generating}
								onReset={() => {
									setState({ step: "input" });
									setUrl("")
								}}
							/>
						)}
					</div>

					{/* How it works */}
					<div className="border-t border-white/[0.06] px-6 md:px-12 py-16 md:py-24 max-w-4xl mx-auto">
						<p className="text-[#C9A96E] text-xs font-medium uppercase tracking-[0.2em] mb-4 text-center">
							How It Works
						</p>
						<div className="grid md:grid-cols-3 gap-8 md:gap-12 mt-10">
							{[
								{
									num: "01",
									title: "Paste a Zillow Link",
									desc: "Copy any Zillow listing URL and paste it into the tool above.",
								},
								{
									num: "02",
									title: "We Extract the Data",
									desc: "Our AI scrapes the listing details, images, and market data automatically.",
								},
								{
									num: "03",
									title: "Download Your PDF",
									desc: "Get a professionally designed property brochure ready to share with clients.",
								},
							].map((step) => (
								<div key={step.num} className="text-center">
									<span className="text-[#C9A96E] font-mono text-sm">
										{step.num}
									</span>
									<h3 className="text-[#E8E4DE] text-lg font-semibold mt-2 mb-2">
										{step.title}
									</h3>
									<p className="text-[#A39E96] text-sm leading-relaxed">
										{step.desc}
									</p>
								</div>
							))}
						</div>
					</div>

					{/* CTA */}
					<div className="border-t border-white/[0.06] px-6 md:px-12 py-16 md:py-24 text-center">
						<h2 className="text-[24px] md:text-[36px] font-normal tracking-[-1px] text-[#E8E4DE] max-w-2xl mx-auto">
							Want AI to Do This{" "}
							<span className="font-serif italic text-[#C9A96E]">
								Automatically for Every Listing?
							</span>
						</h2>
						<p className="mt-4 text-[#A39E96] text-base leading-relaxed max-w-lg mx-auto">
							Nairon builds custom AI infrastructure for brokerages — from
							instant lead response to automated marketing materials.
						</p>
						<div className="mt-8">
							<a
								href="/for/real-estate#discovery"
								className="inline-flex items-center gap-2 bg-[#C9A96E] hover:bg-[#B8944F] text-[#0C0C0C] font-semibold text-base px-6 py-3 rounded-full transition-colors"
							>
								Book your discovery
								<ArrowUpRight className="w-4 h-4" />
							</a>
						</div>
					</div>
				</div>

				<Footer variant="real-estate" />
			</div>
			<HireModal />
			<CandidateModal />
		</ModalProvider>
	)
}

/* ── Sub-components ── */

function InputForm({
	url,
	email,
	onUrlChange,
	onEmailChange,
	onSubmit,
}: {
	url: string;
	email: string;
	onUrlChange: (v: string) => void;
	onEmailChange: (v: string) => void;
	onSubmit: (e: React.FormEvent) => void;
}) {
	const isValid =
		url.includes("zillow.com") && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

	return (
		<form onSubmit={onSubmit} className="space-y-5">
			{/* URL input */}
			<div>
				<label className="text-[#A39E96] text-sm mb-2 block">
					Zillow Listing URL
				</label>
				<div className="relative">
					<Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A39E96]/50" />
					<input
						type="url"
						value={url}
						onChange={(e) => onUrlChange(e.target.value)}
						placeholder="https://www.zillow.com/homedetails/..."
						className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-11 pr-4 py-4 text-[#E8E4DE] text-base placeholder:text-[#A39E96]/30 outline-none focus:border-[#C9A96E]/40 focus:ring-1 focus:ring-[#C9A96E]/20 transition-all"
					/>
				</div>
			</div>

			{/* Email input */}
			<div>
				<label className="text-[#A39E96] text-sm mb-2 block">
					Your email
				</label>
				<input
					type="email"
					value={email}
					onChange={(e) => onEmailChange(e.target.value)}
					placeholder="you@yourbrokerage.com"
					className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-4 text-[#E8E4DE] text-base placeholder:text-[#A39E96]/30 outline-none focus:border-[#C9A96E]/40 focus:ring-1 focus:ring-[#C9A96E]/20 transition-all"
				/>
				<p className="text-[#A39E96]/40 text-xs mt-2">
					We&apos;ll send you a copy. No spam, ever.
				</p>
			</div>

			{/* Submit */}
			<button
				type="submit"
				disabled={!isValid}
				className="w-full bg-[#C9A96E] hover:bg-[#B8944F] disabled:opacity-30 disabled:cursor-not-allowed text-[#0C0C0C] font-semibold text-base px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-2"
			>
				Generate Property PDF
				<FileDown className="w-4 h-4" />
			</button>
		</form>
	)
}

function LoadingState() {
	return (
		<div className="flex flex-col items-center justify-center py-20">
			<Loader2 className="w-8 h-8 text-[#C9A96E] animate-spin mb-4" />
			<p className="text-[#A39E96] text-base">Fetching listing data...</p>
			<p className="text-[#A39E96]/50 text-sm mt-2">
				This takes a few seconds
			</p>
		</div>
	)
}

function ErrorState({
	message,
	onRetry,
}: {
	message: string;
	onRetry: () => void;
}) {
	return (
		<div className="flex flex-col items-center justify-center py-16">
			<div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
				<AlertCircle className="w-6 h-6 text-red-400" />
			</div>
			<p className="text-[#E8E4DE] text-base font-medium mb-2">
				Something went wrong
			</p>
			<p className="text-[#A39E96] text-sm text-center max-w-md mb-6">
				{message}
			</p>
			<button
				type="button"
				onClick={onRetry}
				className="text-[#C9A96E] text-sm font-medium hover:underline"
			>
				Try again
			</button>
		</div>
	)
}

function ReadyState({
	listing,
	onDownload,
	generating,
	onReset,
}: {
	listing: ZillowListing;
	onDownload: () => void;
	generating: boolean;
	onReset: () => void;
}) {
	const location = [listing.city, listing.state, listing.zipCode]
		.filter(Boolean)
		.join(", ");

	return (
		<div className="space-y-6">
			{/* Preview card */}
			<div className="rounded-xl border border-white/[0.08] overflow-hidden">
				{listing.images[0] && (
					<div className="relative h-48 md:h-64 overflow-hidden">
						<img
							src={listing.images[0]}
							alt={listing.address}
							className="w-full h-full object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] to-transparent" />
						<div className="absolute bottom-4 left-5 right-5">
							<p className="text-white text-lg md:text-xl font-semibold">
								{listing.address || "Property"}
							</p>
							{location && (
								<p className="text-white/60 text-sm">{location}</p>
							)}
						</div>
					</div>
				)}

				<div className="p-5 md:p-6 bg-white/[0.02]">
					{/* Stats row */}
					<div className="flex items-center gap-6 mb-4">
						{listing.price > 0 && (
							<div>
								<p className="text-[#C9A96E] text-xl md:text-2xl font-semibold tabular-nums">
									${listing.price.toLocaleString()}
								</p>
							</div>
						)}
						<div className="flex items-center gap-4 text-[#A39E96] text-sm">
							{listing.beds > 0 && <span>{listing.beds} bed</span>}
							{listing.baths > 0 && <span>{listing.baths} bath</span>}
							{listing.sqft > 0 && (
								<span>{listing.sqft.toLocaleString()} sqft</span>
							)}
						</div>
					</div>

					{/* Success message */}
					<div className="flex items-center gap-2 text-emerald-400 text-sm mb-5">
						<CheckCircle2 className="w-4 h-4" />
						<span>Listing data extracted successfully</span>
					</div>

					{/* Download button */}
					<button
						type="button"
						onClick={onDownload}
						disabled={generating}
						className="w-full bg-[#C9A96E] hover:bg-[#B8944F] disabled:opacity-60 text-[#0C0C0C] font-semibold text-base px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-2"
					>
						{generating ? (
							<>
								<Loader2 className="w-4 h-4 animate-spin" />
								Generating PDF...
							</>
						) : (
							<>
								<FileDown className="w-4 h-4" />
								Download Property PDF
							</>
						)}
					</button>

					<button
						type="button"
						onClick={onReset}
						className="w-full mt-3 text-[#A39E96] text-sm hover:text-[#E8E4DE] transition-colors text-center py-2"
					>
						Generate another PDF
					</button>
				</div>
			</div>
		</div>
	)
}
