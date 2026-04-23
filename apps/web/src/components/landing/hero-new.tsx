import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Volume2, VolumeX } from "lucide-react";
import { DISCOVERY_CALL_URL } from "@/lib/links";
import { LogoStrip } from "./logo-strip";

const NOTCH_SIZE = 10;
const NOTCH_COLOR = "rgba(12, 12, 12, 0.12)";

const ROLES = [
	"Marketing Assistant",
	"Creative Director",
	"Content Manager",
	"Customer Service",
	"Operations Manager",
	"Appointment Setter",
] as const;

const VSL_YOUTUBE_ID = "uLx3ElTJbH0";

const TERMS = [
	"Free audit",
	"Free onboarding",
	"Waived implementation fee",
	"Bi-weekly strategy sessions",
	"1 month of uninterrupted operations",
] as const;

const FOOTER_NOTE = "You only cover hardware costs & LLM tokens";

const corners = [
	{ top: 0, left: 0, borderTop: true, borderLeft: true },
	{ top: 0, right: 0, borderTop: true, borderRight: true },
	{ bottom: 0, left: 0, borderBottom: true, borderLeft: true },
	{ bottom: 0, right: 0, borderBottom: true, borderRight: true },
] as const;

function CornerNotches() {
	return (
		<>
			{corners.map((corner, i) => (
				<div
					key={i}
					className="absolute pointer-events-none z-2"
					style={{
						width: NOTCH_SIZE,
						height: NOTCH_SIZE,
						top: "top" in corner ? corner.top : undefined,
						bottom: "bottom" in corner ? corner.bottom : undefined,
						left: "left" in corner ? corner.left : undefined,
						right: "right" in corner ? corner.right : undefined,
						borderTop: "borderTop" in corner ? `1px solid ${NOTCH_COLOR}` : undefined,
						borderBottom: "borderBottom" in corner ? `1px solid ${NOTCH_COLOR}` : undefined,
						borderLeft: "borderLeft" in corner ? `1px solid ${NOTCH_COLOR}` : undefined,
						borderRight: "borderRight" in corner ? `1px solid ${NOTCH_COLOR}` : undefined,
					}}
				/>
			))}
		</>
	);
}

const TYPE_SPEED_MS = 70;
const DELETE_SPEED_MS = 40;
const HOLD_MS = 2000;
const SUFFIX = " for Free";

function RollingRole() {
	const [index, setIndex] = useState(0);
	const [length, setLength] = useState(0);
	const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");

	const role = ROLES[index];
	const full = role + SUFFIX;

	useEffect(() => {
		if (phase === "typing") {
			if (length < full.length) {
				const id = setTimeout(() => setLength((n) => n + 1), TYPE_SPEED_MS);
				return () => clearTimeout(id);
			}
			setPhase("holding");
			return;
		}

		if (phase === "holding") {
			const id = setTimeout(() => setPhase("deleting"), HOLD_MS);
			return () => clearTimeout(id);
		}

		if (length > 0) {
			const id = setTimeout(() => setLength((n) => n - 1), DELETE_SPEED_MS);
			return () => clearTimeout(id);
		}
		setIndex((i) => (i + 1) % ROLES.length);
		setPhase("typing");
	}, [length, phase, full.length]);

	const longest = ROLES.reduce((a, b) => (a.length >= b.length ? a : b));
	const rolePart = full.slice(0, Math.min(length, role.length));
	const suffixPart = length > role.length ? full.slice(role.length, length) : "";

	return (
		<span className="relative inline-block align-baseline">
			{/* Invisible sizer locks width to the longest role+suffix so layout doesn't jump */}
			<span aria-hidden className="invisible whitespace-nowrap font-serif italic">
				{longest + SUFFIX}
			</span>
			<span className="absolute inset-0 flex items-center justify-center whitespace-pre font-serif italic">
				<span className="text-[#C9A96E]">{rolePart}</span>
				<span className="text-[#1A1916]">{suffixPart}</span>
				<span
					aria-hidden
					className="ml-[2px] inline-block w-[2px] self-stretch bg-[#1A1916] animate-pulse"
				/>
			</span>
		</span>
	);
}

function HowItWorks() {
	const [open, setOpen] = useState(false);

	return (
		<div className="mt-6 w-full max-w-2xl">
			<button
				type="button"
				onClick={() => setOpen((o) => !o)}
				aria-expanded={open}
				className="group flex w-full items-center justify-between gap-4 rounded-full border border-[#0C0C0C]/10 bg-[#0C0C0C]/[0.02] px-6 py-4 text-left text-base font-bold text-[#1A1916] transition-colors hover:bg-[#0C0C0C]/[0.05]"
			>
				<span className="flex items-center gap-2.5">
					<span className="h-2 w-2 rounded-full bg-[#C9A96E]" />
					Yes, for free - here's how it works:
				</span>
				<ChevronDown
					className={`h-5 w-5 text-[#5C584F] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
				/>
			</button>

			<AnimatePresence initial={false}>
				{open && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
						className="overflow-hidden"
					>
						<div className="mt-3 rounded-2xl border border-[#0C0C0C]/10 bg-[#0C0C0C]/[0.02] px-5 py-4 text-left text-sm text-[#5C584F]">
							<ul className="space-y-2">
								{TERMS.map((term) => (
									<li key={term} className="flex items-start gap-3">
										<span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#C9A96E]" />
										<span className="leading-relaxed">{term}</span>
									</li>
								))}
							</ul>
							<div className="mt-3 flex items-center gap-3 font-semibold text-[#1A1916]">
								<span className="h-1 w-1 shrink-0 rounded-full bg-[#C9A96E]" />
								Completely done for you
							</div>
							<p className="mt-2 pt-3 border-t border-[#0C0C0C]/10 text-[#5C584F]">{FOOTER_NOTE}</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

function VSLPlayer() {
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const [muted, setMuted] = useState(true);

	const toggleMute = () => {
		const win = iframeRef.current?.contentWindow;
		if (!win) return;
		const func = muted ? "unMute" : "mute";
		win.postMessage(
			JSON.stringify({ event: "command", func, args: [] }),
			"*",
		);
		setMuted((prev) => !prev);
	};

	return (
		<div className="relative aspect-video overflow-hidden rounded-2xl border border-[#0C0C0C]/10 bg-white shadow-[0_30px_120px_-40px_rgba(201,169,110,0.35)]">
			<iframe
				ref={iframeRef}
				src={`https://www.youtube.com/embed/${VSL_YOUTUBE_ID}?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
				title="Nairon VSL"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowFullScreen
				className="absolute inset-0 h-full w-full"
			/>
			{muted ? (
				<button
					type="button"
					onClick={toggleMute}
					className="group absolute inset-0 z-10 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer"
					aria-label="Unmute video"
				>
					<span className="flex items-center gap-2 bg-[#0C0C0C]/80 backdrop-blur-sm text-white font-semibold text-sm md:text-base px-5 py-3 rounded-full group-hover:bg-[#0C0C0C] transition-colors">
						<VolumeX className="w-4 h-4 md:w-5 md:h-5" />
						Tap to unmute
					</span>
				</button>
			) : (
				<button
					type="button"
					onClick={toggleMute}
					className="absolute bottom-4 right-4 z-10 flex items-center justify-center bg-[#0C0C0C]/70 hover:bg-[#0C0C0C] backdrop-blur-sm text-white p-2.5 rounded-full transition-colors cursor-pointer"
					aria-label="Mute video"
				>
					<Volume2 className="w-4 h-4 md:w-5 md:h-5" />
				</button>
			)}
		</div>
	);
}

export function HeroNew() {
	return (
		<div className="relative flex flex-col justify-center items-center text-center px-5 md:px-12 py-8 md:py-12">
			<CornerNotches />

			{/* Headline — 2 lines, compact */}
			<h1 className="text-[36px] leading-[42px] md:text-[72px] md:leading-[76px] font-normal tracking-[-1.2px] md:tracking-[-2.2px] text-[#1A1916] max-w-5xl">
				We'll Deploy Your First AI
				<span className="block mt-3 md:mt-4 text-[40px] md:text-[80px] leading-[44px] md:leading-[86px]">
					<RollingRole />
				</span>
			</h1>

			{/* Social proof — partner logos */}
			<div className="w-full mt-6">
				<LogoStrip />
			</div>

			{/* How it works dropdown */}
			<HowItWorks />

			{/* VSL */}
			<div className="mt-6 w-full max-w-4xl">
				<VSLPlayer />
			</div>

			{/* CTAs */}
			<div className="flex justify-center mt-6">
				<a
					href={DISCOVERY_CALL_URL}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-2.5 bg-[#C9A96E] hover:bg-[#B8944F] text-[#0C0C0C] font-semibold text-lg px-8 py-4 rounded-full transition-colors"
				>
					BOOK YOUR 15-MINUTE DISCOVERY HERE
					<ArrowUpRight className="w-5 h-5" />
				</a>
			</div>
		</div>
	);
}
