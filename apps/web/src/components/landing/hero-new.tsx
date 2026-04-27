import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Volume2, VolumeX } from "lucide-react";
import { DISCOVERY_CALL_URL } from "@/lib/links";
import { LogoStrip } from "./logo-strip";

const NOTCH_SIZE = 10;
const NOTCH_COLOR = "rgba(12, 12, 12, 0.12)";

const ROLES = [
	"Sales Assistant",
	"Operations Assistant",
	"Support Assistant",
	"Appointment Setter",
	"Research Assistant",
	"CRM Assistant",
] as const;

const VSL_YOUTUBE_ID = "uLx3ElTJbH0";

const TERMS = [
	"1 AI employee",
	"1 workflow",
	"1 measurable business outcome",
	"Built concierge-style by Nairon",
	"WhatsApp or Telegram pilot access while Hive rolls out",
] as const;

const FOOTER_NOTE = "First month is free. You cover the Mac Mini/hardware cost and AI tokens.";

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
const SUFFIX = " in 30 Days";

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
		<span className="relative block min-h-[92px] w-full max-w-full align-baseline md:inline-block md:min-h-0 md:w-auto">
			{/* Invisible sizer locks width to the longest role+suffix so layout doesn't jump */}
			<span aria-hidden className="invisible hidden whitespace-nowrap font-serif italic md:inline">
				{longest + SUFFIX}
			</span>
			<span className="absolute inset-0 flex flex-wrap items-center justify-center gap-x-2 whitespace-normal text-center font-serif italic md:gap-x-0 md:whitespace-pre">
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
		<div className="mt-6 w-full max-w-4xl">
			<button
				type="button"
				onClick={() => setOpen((o) => !o)}
				aria-expanded={open}
				className="group relative flex w-full min-w-0 items-center justify-center gap-4 rounded-full border border-[#0C0C0C]/10 bg-[#0C0C0C]/[0.02] px-5 py-4 pr-12 text-center text-sm font-bold text-[#1A1916] transition-colors hover:bg-[#0C0C0C]/[0.05] md:px-6 md:py-5 md:text-base"
			>
				<span className="flex min-w-0 flex-wrap items-center justify-center gap-x-2.5 gap-y-1 leading-tight">
					<span className="h-2 w-2 rounded-full bg-[#C9A96E]" />
					The 1-Month AI Employee Pilot - Here's How It Works
				</span>
				<ChevronDown
					className={`absolute right-6 h-5 w-5 text-[#5C584F] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
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
								Completely done for you by our team
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
		<div className="relative flex w-full max-w-full flex-col items-center justify-center overflow-hidden px-4 py-8 text-center md:px-12 md:py-12">
			<CornerNotches />

			{/* Headline — 2 lines, compact */}
			<h1 className="w-full max-w-5xl text-[32px] leading-[36px] font-normal tracking-[-0.8px] text-[#1A1916] md:text-[72px] md:leading-[76px] md:tracking-[-2.2px]">
				Launch Your First AI
				<span className="mt-3 block text-[38px] leading-[42px] md:mt-4 md:text-[80px] md:leading-[86px]">
					<RollingRole />
				</span>
			</h1>

			<p className="mt-5 max-w-3xl text-base leading-relaxed text-[#5C584F] md:text-lg">
				We build one AI employee for one painful workflow, prove one measurable result, then help
				you decide whether to keep scaling with Nairon.
			</p>

			{/* Social proof — partner logos */}
			<div className="mt-4 w-full max-w-full md:mt-6">
				<LogoStrip />
			</div>

			{/* How it works dropdown */}
			<HowItWorks />

			{/* VSL */}
			<div id="vsl" className="mt-6 w-full max-w-4xl scroll-mt-24 md:scroll-mt-28">
				<VSLPlayer />
			</div>

			{/* CTAs */}
			<div className="flex justify-center mt-6">
				<a
					href={DISCOVERY_CALL_URL}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex w-full max-w-sm items-center justify-center gap-2.5 rounded-full bg-[#C9A96E] px-5 py-4 text-center text-sm font-semibold leading-tight text-[#0C0C0C] transition-colors hover:bg-[#B8944F] md:w-auto md:max-w-none md:px-8 md:text-lg"
				>
					<span>APPLY FOR THE 1-MONTH PILOT</span>
					<ArrowUpRight className="h-5 w-5 shrink-0" />
				</a>
			</div>
		</div>
	);
}
