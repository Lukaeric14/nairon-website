import { createFileRoute, useSearch } from "@tanstack/react-router"
import { useState, useCallback, useEffect, useRef } from "react"
import {
	ArrowUpRight,
	FileDown,
	Loader2,
	AlertCircle,
	CheckCircle2,
	Link2,
	Mail,
} from "lucide-react"
import { Navbar, Footer } from "@/components/landing"
import { ModalProvider } from "@/components/landing/modal-provider"
import { HireModal } from "@/components/landing/hire-modal"
import { CandidateModal } from "@/components/landing/candidate-modal"
import { seoHead } from "@/lib/seo"
import { useQuery, useMutation } from "convex/react"
import { api } from "@convex/_generated/api"
import type { Id } from "@convex/_generated/dataModel"
import type { ImageTag } from "@/server/zillow-scrape"

// Re-export the ZillowListing type shape for use in this file
interface ZillowListing {
	address: string
	city: string
	state: string
	zipCode: string
	price: number
	beds: number
	baths: number
	sqft: number
	yearBuilt: number | null
	description: string
	images: string[]
	classifiedImages: { url: string; tag: ImageTag; caption: string }[]
	lotSize: string | null
	propertyType: string
	zestimate: number | null
	daysOnZillow: number | null
	url: string
	neighborhoodDescription: string
}

export const Route = createFileRoute("/for/real-estate_/property-pdf")({
	component: PropertyPdfPage,
	validateSearch: (search: Record<string, unknown>) => ({
		job: typeof search.job === "string" ? search.job : undefined,
	}),
	head: () =>
		seoHead({
			title: "Free Property PDF Generator — Nairon",
			description:
				"Paste a Zillow link and instantly generate a beautiful, branded property PDF. Free tool for real estate brokerages.",
			path: "/for/real-estate/property-pdf",
		}),
})

type PageState =
	| { step: "input" }
	| { step: "processing"; jobId: Id<"pdfJobs"> }
	| { step: "error"; message: string }
	| { step: "ready"; listing: ZillowListing }

function PropertyPdfPage() {
	const { job: jobParam } = useSearch({ from: "/for/real-estate_/property-pdf" })
	const fromEmailLink = useRef(!!jobParam)
	const [state, setState] = useState<PageState>(() => {
		if (jobParam) {
			return { step: "processing", jobId: jobParam as Id<"pdfJobs"> }
		}
		return { step: "input" }
	})
	const [url, setUrl] = useState("")
	const [generating, setGenerating] = useState(false)
	const [submitting, setSubmitting] = useState(false)

	const createJob = useMutation(api.pdfJob.createJob)

	const handleSubmit = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault()
			if (!url.trim() || submitting) return

			setSubmitting(true)
			try {
				console.log("[pdf] Creating job for:", url.trim())
				const jobId = await createJob({ zillowUrl: url.trim() })
				console.log("[pdf] Job created:", jobId)
				setState({ step: "processing", jobId })
			} catch (err) {
				console.error("[pdf] Job creation failed:", err)
				setState({
					step: "error",
					message:
						err instanceof Error
							? err.message
							: "Something went wrong. Please try again.",
				})
			} finally {
				setSubmitting(false)
			}
		},
		[url, createJob, submitting],
	)

	const personalization = {
		brokerageName: "",
		agentName: "",
	}

	const downloadPdf = useCallback(
		async (listing: ZillowListing) => {
			setGenerating(true)
			try {
				const { pdf } = await import("@react-pdf/renderer")
				const { PropertyPDF } = await import(
					"@/components/property-pdf/pdf-template"
				)
				const { createElement } = await import("react")

				const blob = await pdf(
					createElement(PropertyPDF, {
						listing,
						personalization,
					}) as any,
				).toBlob()

				const downloadUrl = URL.createObjectURL(blob)
				const a = document.createElement("a")
				a.href = downloadUrl
				a.download = `${listing.address || "property"}-nairon.pdf`.replace(
					/[^a-zA-Z0-9.-]/g,
					"-",
				)
				document.body.appendChild(a)
				a.click()
				document.body.removeChild(a)
				URL.revokeObjectURL(downloadUrl)
			} catch (err) {
				console.error("PDF generation failed:", err)
				alert(
					`PDF generation failed: ${err instanceof Error ? err.message : "Unknown error"}`,
				)
			} finally {
				setGenerating(false)
			}
		},
		[personalization],
	)

	const handleDownloadPdf = useCallback(async () => {
		if (state.step !== "ready") return
		await downloadPdf(state.listing)
	}, [state, downloadPdf])

	// Auto-download when arriving from email link
	useEffect(() => {
		if (fromEmailLink.current && state.step === "ready") {
			fromEmailLink.current = false
			downloadPdf(state.listing)
		}
	}, [state, downloadPdf])

	return (
		<ModalProvider>
			<div className="min-h-screen bg-[#0C0C0C] text-[#E8E4DE] font-inter">
				<Navbar minimal />

				<div className="pt-16 mt-12 md:mt-16 relative overflow-hidden">
					{/* Decorative: slanted faded property brochure cards */}
					<div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
						{/* Left card — luxury exterior at dusk */}
						<div
							className="absolute hidden md:block rounded-xl overflow-hidden shadow-2xl"
							style={{
								width: 280,
								height: 370,
								top: 40,
								left: "8%",
								transform: "rotate(-12deg)",
								opacity: 0.22,
							}}
						>
							<img
								src="/preview/property-1.webp"
								alt=""
								className="w-full h-[60%] object-cover"
							/>
							<div className="bg-white/90 px-4 py-3 h-[40%]">
								<div className="h-1.5 w-16 bg-[#C9A96E]/40 rounded mb-2" />
								<div className="h-2.5 w-3/4 bg-black/20 rounded mb-1.5" />
								<div className="h-2 w-1/2 bg-black/10 rounded mb-3" />
								<div className="h-1 w-full bg-black/[0.06] rounded mb-1" />
								<div className="h-1 w-full bg-black/[0.06] rounded mb-1" />
								<div className="h-1 w-2/3 bg-black/[0.06] rounded" />
							</div>
						</div>
						{/* Right card — Mediterranean villa */}
						<div
							className="absolute hidden md:block rounded-xl overflow-hidden shadow-2xl"
							style={{
								width: 260,
								height: 340,
								top: 60,
								right: "8%",
								transform: "rotate(10deg)",
								opacity: 0.20,
							}}
						>
							<img
								src="/preview/property-2.webp"
								alt=""
								className="w-full h-[55%] object-cover"
							/>
							<div className="bg-white/90 px-4 py-3 h-[45%]">
								<div className="h-1.5 w-20 bg-[#C9A96E]/40 rounded mb-2" />
								<div className="h-2.5 w-2/3 bg-black/20 rounded mb-1.5" />
								<div className="h-2 w-1/3 bg-black/10 rounded mb-3" />
								<div className="grid grid-cols-2 gap-2 mt-2">
									<div className="h-8 bg-black/[0.04] rounded" />
									<div className="h-8 bg-black/[0.04] rounded" />
								</div>
							</div>
						</div>
						{/* Bottom-left — aerial neighborhood */}
						<div
							className="absolute hidden lg:block rounded-xl overflow-hidden shadow-2xl"
							style={{
								width: 220,
								height: 290,
								top: 300,
								left: "14%",
								transform: "rotate(-5deg)",
								opacity: 0.15,
							}}
						>
							<img
								src="/preview/property-3.webp"
								alt=""
								className="w-full h-[55%] object-cover"
							/>
							<div className="bg-white/90 px-3 py-2.5 h-[45%]">
								<div className="h-1.5 w-14 bg-[#C9A96E]/40 rounded mb-2" />
								<div className="h-2 w-3/4 bg-black/15 rounded mb-1" />
								<div className="h-1.5 w-1/2 bg-black/10 rounded mb-3" />
								<div className="h-1 w-full bg-black/[0.06] rounded mb-1" />
								<div className="h-1 w-full bg-black/[0.06] rounded" />
							</div>
						</div>
						{/* Bottom-right — interior living room */}
						<div
							className="absolute hidden lg:block rounded-xl overflow-hidden shadow-2xl"
							style={{
								width: 240,
								height: 310,
								top: 280,
								right: "14%",
								transform: "rotate(14deg)",
								opacity: 0.16,
							}}
						>
							<img
								src="/preview/property-4.webp"
								alt=""
								className="w-full h-[55%] object-cover"
							/>
							<div className="bg-white/90 px-3 py-2.5 h-[45%]">
								<div className="flex gap-1.5 mb-2">
									<div className="h-5 w-5 rounded bg-[#C9A96E]/20" />
									<div className="h-5 w-5 rounded bg-[#C9A96E]/20" />
									<div className="h-5 w-5 rounded bg-[#C9A96E]/20" />
								</div>
								<div className="h-2 w-2/3 bg-black/15 rounded mb-1" />
								<div className="h-1.5 w-1/2 bg-black/10 rounded mb-3" />
								<div className="h-1 w-full bg-black/[0.06] rounded mb-1" />
								<div className="h-1 w-full bg-black/[0.06] rounded" />
							</div>
						</div>
					</div>

					{/* Hero */}
					<div className="px-6 md:px-12 py-16 md:py-24 max-w-4xl mx-auto text-center relative z-10">
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
							Generate a Deck for Your Listing{" "}
							<span className="font-serif italic text-[#C9A96E]">
								in Minutes
							</span>
						</h1>
						<p className="mt-5 text-[#A39E96] text-base md:text-lg leading-relaxed max-w-xl mx-auto">
							Paste any Zillow listing link and get a beautifully designed,
							5-page property brochure.
						</p>
					</div>

					{/* Main tool area */}
					<div className="px-6 md:px-12 pb-20 md:pb-32 max-w-3xl mx-auto">
						{state.step === "input" && (
							<InputForm
								url={url}
								onUrlChange={setUrl}
								onSubmit={handleSubmit}
								submitting={submitting}
							/>
						)}

						{state.step === "processing" && (
							<ProcessingState
								jobId={state.jobId}
								onCompleted={(listing) =>
									setState({ step: "ready", listing })
								}
								onError={(message) =>
									setState({ step: "error", message })
								}
							/>
						)}

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
									setState({ step: "input" })
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
									desc: "Copy any Zillow listing URL and paste it above.",
								},
								{
									num: "02",
									title: "We Build Your Brochure",
									desc: "AI classifies photos, enhances images, and writes a neighborhood description.",
								},
								{
									num: "03",
									title: "Download & Share",
									desc: "Get a 5-page branded PDF ready to send to clients and buyers.",
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
							Ready to Automate{" "}
							<span className="font-serif italic text-[#C9A96E]">
								More of Your Business?
							</span>
						</h2>
						<p className="mt-4 text-[#A39E96] text-base leading-relaxed max-w-lg mx-auto">
							From instant lead response to listing marketing, CRM workflows,
							and client follow-ups — we build AI systems that handle the
							repetitive work so you can focus on closing.
						</p>
						<div className="mt-8">
							<a
								href="/for/real-estate#discovery"
								className="inline-flex items-center gap-2 bg-[#C9A96E] hover:bg-[#B8944F] text-[#0C0C0C] font-semibold text-base px-6 py-3 rounded-full transition-colors"
							>
								Book a discovery call
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

const inputCls =
	"w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-4 text-[#E8E4DE] text-base placeholder:text-[#A39E96]/30 outline-none focus:border-[#C9A96E]/40 focus:ring-1 focus:ring-[#C9A96E]/20 transition-all"

function InputForm({
	url,
	onUrlChange,
	onSubmit,
	submitting,
}: {
	url: string
	onUrlChange: (v: string) => void
	onSubmit: (e: React.FormEvent) => void
	submitting: boolean
}) {
	const isValid = url.includes("zillow.com")

	return (
		<form onSubmit={onSubmit} className="space-y-5">
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
						className={`${inputCls} pl-11`}
						disabled={submitting}
					/>
				</div>
			</div>

			<button
				type="submit"
				disabled={!isValid || submitting}
				className="w-full bg-[#C9A96E] hover:bg-[#B8944F] disabled:opacity-30 disabled:cursor-not-allowed text-[#0C0C0C] font-semibold text-base px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-2"
			>
				{submitting ? (
					<>
						<Loader2 className="w-4 h-4 animate-spin" />
						Starting...
					</>
				) : (
					<>
						Generate Property PDF
						<FileDown className="w-4 h-4" />
					</>
				)}
			</button>
		</form>
	)
}

// Map Convex job status to progress step index
const STATUS_INDEX: Record<string, number> = {
	pending: 0,
	scraping: 1,
	classifying: 2,
	generating: 3,
	completed: 4,
}

const TOTAL_STEPS = 5

const EMAIL_PROMPT_DELAY = 25000 // Show email prompt after 25s

function ProcessingState({
	jobId,
	onCompleted,
	onError,
}: {
	jobId: Id<"pdfJobs">
	onCompleted: (listing: ZillowListing) => void
	onError: (message: string) => void
}) {
	const job = useQuery(api.pdfJob.getJob, { jobId })
	const addEmail = useMutation(api.pdfJob.addEmailToJob)
	const [elapsed, setElapsed] = useState(0)
	const [showEmailPrompt, setShowEmailPrompt] = useState(false)
	const [email, setEmail] = useState("")
	const [emailSubmitted, setEmailSubmitted] = useState(false)
	const startTime = useRef(Date.now())
	const completedRef = useRef(false)

	// Elapsed timer
	useEffect(() => {
		const interval = setInterval(() => {
			const ms = Date.now() - startTime.current
			setElapsed(ms)

			if (ms > EMAIL_PROMPT_DELAY && !showEmailPrompt) {
				setShowEmailPrompt(true)
			}
		}, 100)
		return () => clearInterval(interval)
	}, [showEmailPrompt])

	// React to job status changes (Convex reactive subscription)
	useEffect(() => {
		if (!job || completedRef.current) return

		if (job.status === "completed" && job.listingJson) {
			completedRef.current = true
			try {
				const listing = JSON.parse(job.listingJson) as ZillowListing
				// Small delay for the animation to feel complete
				setTimeout(() => onCompleted(listing), 800)
			} catch {
				onError("Failed to parse listing data")
			}
		} else if (job.status === "failed") {
			completedRef.current = true
			onError(job.error || "Something went wrong during processing")
		}
	}, [job, onCompleted, onError])

	const handleEmailSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!email.trim() || emailSubmitted) return
		try {
			await addEmail({ jobId, email: email.trim() })
			setEmailSubmitted(true)
		} catch {
			// silently fail
		}
	}

	const currentStatus = job?.status || "pending"
	const activeStep = STATUS_INDEX[currentStatus] ?? 0
	const totalImages = job?.totalImages ?? 0
	const processedImages = job?.processedImages ?? 0

	// Build step labels dynamically based on image counts
	const stepLabels = [
		"Queuing your request",
		totalImages > 0
			? `Found ${totalImages} images`
			: "Fetching listing from Zillow",
		activeStep === 2 && processedImages > 0
			? `Classified ${processedImages} of ${totalImages} images`
			: activeStep > 2
				? `Classified ${totalImages} images`
				: "Classifying images with AI",
		"Writing neighborhood description",
		"Assembling your brochure",
	]

	// Monotonically increasing progress — use a ref so it never drops
	const maxProgressRef = useRef(0)
	const rawProgress =
		currentStatus === "completed"
			? 100
			: Math.min(Math.round((activeStep / TOTAL_STEPS) * 85 + (processedImages > 0 && totalImages > 0 ? (processedImages / totalImages) * (85 / TOTAL_STEPS) : 0)), 99)
	if (rawProgress > maxProgressRef.current) {
		maxProgressRef.current = rawProgress
	}
	const progress = maxProgressRef.current

	const elapsedSec = Math.floor(elapsed / 1000)

	return (
		<div className="flex flex-col items-center justify-center py-16">
			{/* Progress ring */}
			<div className="relative w-20 h-20 mb-6">
				<svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
					<circle
						cx="40"
						cy="40"
						r="34"
						fill="none"
						stroke="rgba(201,169,110,0.12)"
						strokeWidth="4"
					/>
					<circle
						cx="40"
						cy="40"
						r="34"
						fill="none"
						stroke="#C9A96E"
						strokeWidth="4"
						strokeLinecap="round"
						strokeDasharray={`${2 * Math.PI * 34}`}
						strokeDashoffset={`${2 * Math.PI * 34 * (1 - progress / 100)}`}
						className="transition-all duration-500 ease-out"
					/>
				</svg>
				<span className="absolute inset-0 flex items-center justify-center text-[#C9A96E] text-sm font-semibold tabular-nums">
					{progress}%
				</span>
			</div>

			{/* Step list */}
			<div className="w-full max-w-xs space-y-3">
				{stepLabels.map((label, i) => {
					const isDone = i < activeStep
					const isCurrent = i === activeStep

					return (
						<div
							key={i}
							className={`flex items-center gap-3 transition-all duration-300 ${
								isDone
									? "opacity-50"
									: isCurrent
										? "opacity-100"
										: "opacity-25"
							}`}
						>
							{isDone ? (
								<CheckCircle2 className="w-4 h-4 text-[#C9A96E] shrink-0" />
							) : isCurrent ? (
								<Loader2 className="w-4 h-4 text-[#C9A96E] animate-spin shrink-0" />
							) : (
								<div className="w-4 h-4 rounded-full border border-[#A39E96]/30 shrink-0" />
							)}
							<span
								className={`text-sm tabular-nums ${
									isCurrent ? "text-[#E8E4DE]" : "text-[#A39E96]"
								}`}
							>
								{label}
							</span>
						</div>
					)
				})}
			</div>

			<p className="text-[#A39E96]/40 text-xs mt-6 tabular-nums">
				{elapsedSec}s elapsed
			</p>

			{/* Email prompt — appears after 25s */}
			{showEmailPrompt && !emailSubmitted && currentStatus !== "completed" && (
				<div className="mt-8 w-full max-w-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
					<div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
						<div className="flex items-start gap-3 mb-3">
							<Mail className="w-4 h-4 text-[#C9A96E] mt-0.5 shrink-0" />
							<p className="text-[#A39E96] text-sm leading-relaxed">
								Processing is taking longer than expected. Leave your email
								and we'll send you the PDF as soon as it's done.
							</p>
						</div>
						<form
							onSubmit={handleEmailSubmit}
							className="flex gap-2"
						>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="you@example.com"
								className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-[#E8E4DE] text-sm placeholder:text-[#A39E96]/30 outline-none focus:border-[#C9A96E]/40"
							/>
							<button
								type="submit"
								disabled={!email.includes("@")}
								className="bg-[#C9A96E] hover:bg-[#B8944F] disabled:opacity-30 text-[#0C0C0C] font-semibold text-sm px-4 py-2.5 rounded-lg transition-all shrink-0"
							>
								Notify me
							</button>
						</form>
						<p className="text-[#A39E96]/30 text-[10px] mt-2">
							No spam. Ever.
						</p>
					</div>
				</div>
			)}

			{emailSubmitted && currentStatus !== "completed" && (
				<div className="mt-8 flex items-center gap-2 text-emerald-400 text-sm">
					<CheckCircle2 className="w-4 h-4" />
					<span>
						We'll email you when it's ready. You can close this page.
					</span>
				</div>
			)}
		</div>
	)
}

function ErrorState({
	message,
	onRetry,
}: {
	message: string
	onRetry: () => void
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

const SLIDE_CONFIG: { name: string; preferredTags: ImageTag[] }[] = [
	{ name: "Cover", preferredTags: ["exterior", "aerial"] },
	{
		name: "Overview",
		preferredTags: ["living_room", "kitchen", "dining"],
	},
	{
		name: "About",
		preferredTags: ["dining", "kitchen", "bedroom", "living_room"],
	},
	{ name: "Features", preferredTags: ["bedroom", "bathroom"] },
	{
		name: "Location",
		preferredTags: ["backyard", "pool", "aerial", "exterior"],
	},
]

function SlideAssignmentPreview({ listing }: { listing: ZillowListing }) {
	const classified = listing.classifiedImages || []
	const rawImages = listing.images

	const used = new Set<string>()
	const assignments = SLIDE_CONFIG.map((slide) => {
		let picked: string | null = null
		let matchedTag: string | null = null

		if (classified.length > 0) {
			for (const tag of slide.preferredTags) {
				const match = classified.find(
					(c) => c.tag === tag && !used.has(c.url),
				)
				if (match) {
					picked = match.url
					matchedTag = match.tag
					used.add(match.url)
					break
				}
			}
		}

		if (!picked) {
			for (let i = 0; i < rawImages.length; i++) {
				if (!used.has(rawImages[i])) {
					picked = rawImages[i]
					used.add(rawImages[i])
					break
				}
			}
		}

		if (!picked && rawImages.length > 0) {
			picked = rawImages[0]
		}

		return { ...slide, imageUrl: picked, matchedTag }
	})

	return (
		<div className="mb-5">
			<p className="text-[#A39E96]/50 text-xs mb-2">
				Slide image assignments:
			</p>
			<div className="grid grid-cols-5 gap-2">
				{assignments.map((slide) => (
					<div key={slide.name} className="relative">
						<div className="aspect-[4/3] rounded overflow-hidden border-2 border-[#C9A96E]/30">
							{slide.imageUrl ? (
								<img
									src={slide.imageUrl}
									alt={slide.name}
									className="w-full h-full object-cover"
									onError={(e) => {
										;(e.target as HTMLImageElement).style.display = "none"
										;(
											e.target as HTMLImageElement
										).parentElement!.classList.add("bg-red-500/20")
									}}
								/>
							) : (
								<div className="w-full h-full bg-white/[0.04] flex items-center justify-center">
									<span className="text-[10px] text-[#A39E96]/40">
										none
									</span>
								</div>
							)}
						</div>
						<div className="mt-1 text-center">
							<p className="text-[10px] font-semibold text-[#E8E4DE]">
								{slide.name}
							</p>
							{slide.matchedTag ? (
								<p className="text-[8px] font-mono text-cyan-400">
									{slide.matchedTag}
								</p>
							) : (
								<p className="text-[8px] font-mono text-amber-400/60">
									fallback
								</p>
							)}
						</div>
					</div>
				))}
			</div>
			{classified.length === 0 && (
				<p className="text-amber-400/60 text-[10px] mt-2">
					AI classification not active — images assigned by order. Set
					FAL_KEY to enable.
				</p>
			)}
		</div>
	)
}

function ReadyState({
	listing,
	onDownload,
	generating,
	onReset,
}: {
	listing: ZillowListing
	onDownload: () => void
	generating: boolean
	onReset: () => void
}) {
	const location = [listing.city, listing.state, listing.zipCode]
		.filter(Boolean)
		.join(", ")

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
							<p className="text-[#C9A96E] text-xl md:text-2xl font-semibold tabular-nums">
								${listing.price.toLocaleString()}
							</p>
						)}
						<div className="flex items-center gap-4 text-[#A39E96] text-sm">
							{listing.beds > 0 && <span>{listing.beds} bed</span>}
							{listing.baths > 0 && <span>{listing.baths} bath</span>}
							{listing.sqft > 0 && (
								<span>{listing.sqft.toLocaleString()} sqft</span>
							)}
						</div>
					</div>

					{/* Images found */}
					<div className="flex items-center gap-2 text-emerald-400 text-sm mb-2">
						<CheckCircle2 className="w-4 h-4" />
						<span>
							{listing.images.length} photos extracted
							{listing.classifiedImages?.length > 0 && (
								<span className="text-[#A39E96]">
									{" "}
									·{" "}
									{
										listing.classifiedImages.filter(
											(c) => c.tag !== "other",
										).length
									}{" "}
									classified
								</span>
							)}
						</span>
					</div>

					{/* Slide assignment preview */}
					<SlideAssignmentPreview listing={listing} />

					{/* All scraped images */}
					{listing.images.length > 0 && (
						<details className="mb-5">
							<summary className="text-[#A39E96]/50 text-xs cursor-pointer hover:text-[#A39E96]/80 mb-2">
								All {listing.images.length} scraped images
							</summary>
							<div className="grid grid-cols-5 gap-2 mt-2">
								{listing.images.map((imgUrl, i) => {
									const classified =
										listing.classifiedImages?.find(
											(c) => c.url === imgUrl,
										)
									return (
										<div
											key={imgUrl}
											className="relative aspect-square rounded overflow-hidden border border-white/[0.08]"
										>
											<img
												src={imgUrl}
												alt={`Scraped ${i + 1}`}
												className="w-full h-full object-cover"
												onError={(e) => {
													;(
														e.target as HTMLImageElement
													).style.display = "none"
													;(
														e.target as HTMLImageElement
													).parentElement!.classList.add(
														"bg-red-500/20",
													)
												}}
											/>
											<span className="absolute top-0.5 left-1 text-[10px] font-mono text-white bg-black/60 px-1 rounded">
												{i}
											</span>
											{classified ? (
												<span className="absolute bottom-0.5 right-1 text-[8px] font-mono text-cyan-400 bg-black/70 px-1 rounded">
													{classified.tag}
												</span>
											) : (
												<span className="absolute bottom-0.5 right-1 text-[8px] font-mono text-amber-400 bg-black/60 px-1 rounded">
													no tag
												</span>
											)}
										</div>
									)
								})}
							</div>
						</details>
					)}

					<p className="text-[#A39E96]/50 text-xs mb-5">
						5-page PDF: Cover, Stats, About, Features, Location
					</p>

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
								Generating 5-page PDF...
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
